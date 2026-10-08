"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Map, 
  Settings, 
  LogOut,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";


const ADMIN_MENU = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Reservations", href: "/reservations", icon: CalendarCheck },
  { name: "Users", href: "/users", icon: Users },
  { name: "Representatives", href: "/representatives", icon: Globe },
  { name: "Packages", href: "/packages", icon: Map },
  { name: "Settings", href: "/settings", icon: Settings },
];

const REP_MENU = [
  { name: "My Dashboard", href: "/rep-dashboard", icon: LayoutDashboard },
  { name: "Reservations", href: "/reservations", icon: CalendarCheck },
  { name: "Add Reservation", href: "/add-reservation", icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRole() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("auth_id", session.user.id)
          .single();
        if (data) setRole(data.role);
      }
    }
    fetchRole();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = role === "representative" ? REP_MENU : ADMIN_MENU;

  return (
    <aside className="w-64 border-r border-white/5 bg-[#0a0f1a] flex flex-col h-full shrink-0">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-[#d4af37]">IHV</span> {role === "representative" ? "REP" : "Admin"}
        </h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group overflow-hidden ${
                isActive ? "text-[#d4af37] bg-[#d4af37]/10" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37] rounded-r-md"
                />
              )}
              <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-[#d4af37]" : "text-slate-500 group-hover:text-slate-300"}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
