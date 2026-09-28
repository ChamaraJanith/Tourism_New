"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== "/login") {
        router.replace("/login");
      } else {
        setChecking(false);
      }
    });

    // Listen for auth changes (sign-in / sign-out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session && pathname !== "/login") {
        router.replace("/login");
      } else if (session && pathname === "/login") {
        // Fetch role to redirect to correct dashboard
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("auth_id", session.user.id)
          .single();

        if (profile?.role === "representative") {
          router.replace("/rep-dashboard");
        } else {
          router.replace("/");
        }
      } else {
        setChecking(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
