"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ReservationsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      // Fetch user profile to check role and country
      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", session.user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);

        let query = supabase
          .from("itinerary_requests")
          .select("*")
          .order("created_at", { ascending: false });

        // If the user is a representative, only show reservations for their country
        if (profileData.role === "representative") {
          query = query.eq("client_country", profileData.country);
        }

        const { data: resData } = await query;
        if (resData) {
          setReservations(resData);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Reservations</h1>
        <p className="text-slate-400 mt-1">
          {profile?.role === "representative" 
            ? `Manage reservations for ${profile.country}`
            : "Manage all global reservations"}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">All Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Serial No</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Package</th>
                {profile?.role !== "representative" && <th className="px-6 py-4 font-medium">Country</th>}
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    Loading reservations...
                  </td>
                </tr>
              ) : reservations.length > 0 ? (
                reservations.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4 font-mono text-[#d4af37]">REQ-{String(booking.id).padStart(4, '0')}</td>
                    <td className="px-6 py-4 text-slate-200 font-medium">
                      {booking.client_name}
                      <span className="block text-xs text-slate-500 font-normal mt-0.5">{booking.client_email}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {booking.package_title}
                      <span className="block text-xs text-slate-500 mt-0.5">{booking.package_duration || "Custom"}</span>
                    </td>
                    {profile?.role !== "representative" && (
                      <td className="px-6 py-4 text-slate-400">{booking.client_country || "Unknown"}</td>
                    )}
                    <td className="px-6 py-4 text-slate-400">{booking.created_at ? new Date(booking.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" :
                        booking.status === "Pending" ? "bg-amber-500/10 text-amber-400" :
                        "bg-amber-500/10 text-amber-400"
                      }`}>
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition text-white">Review</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <CalendarCheck className="w-8 h-8 text-slate-600 mb-2" />
                      <p>No reservations found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
