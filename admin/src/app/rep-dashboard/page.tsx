"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Globe, Users, CalendarCheck, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RepDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", session.user.id)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
    }
    loadProfile();
  }, [router]);

  if (!profile) return <div className="p-8 text-slate-400">Loading Representative Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Global Representative Dashboard</h1>
        <p className="text-[#d4af37] mt-1 font-medium text-lg">
          Welcome back, {profile.full_name} ({profile.custom_id})
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Managing operations for <strong className="text-slate-200">{profile.country}</strong>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#d4af37]" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">My Clients</h3>
          <p className="text-3xl font-bold text-white mt-1">0</p>
        </div>
        
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Active Bookings</h3>
          <p className="text-3xl font-bold text-white mt-1">0</p>
        </div>
        
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Pending Approvals</h3>
          <p className="text-3xl font-bold text-white mt-1">0</p>
        </div>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 text-center text-slate-500">
        <Globe className="w-10 h-10 mx-auto text-slate-600 mb-3" />
        <p>No recent activity for {profile.country}.</p>
      </div>
    </div>
  );
}
