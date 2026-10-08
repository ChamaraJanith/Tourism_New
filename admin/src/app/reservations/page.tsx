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

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("itinerary_requests")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (!error) {
      setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } else {
      alert("Error updating status");
    }
  };

  const renderTable = (data: any[], title: string, isRepTable: boolean = false) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden mb-8"
    >
      <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Serial No</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Package</th>
              {isRepTable && <th className="px-6 py-4 font-medium">Representative</th>}
              {profile?.role !== "representative" && !isRepTable && <th className="px-6 py-4 font-medium">Country</th>}
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                  Loading reservations...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((booking) => {
                const repNameMatch = booking.client_notes?.match(/\[REP_NAME:\s*(.*?)\]/);
                const repName = repNameMatch ? repNameMatch[1] : "Unknown Rep";
                
                return (
                <tr key={booking.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4 font-mono text-[#d4af37]">
                    {booking.serial_number || `IHV-OTH-0000000`}
                  </td>
                  <td className="px-6 py-4 text-slate-200 font-medium">
                    {booking.client_name}
                    <span className="block text-xs text-slate-500 font-normal mt-0.5">{booking.client_email}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {booking.package_title}
                    <span className="block text-xs text-slate-500 mt-0.5">{booking.package_duration || "Custom"}</span>
                  </td>
                  {isRepTable && (
                    <td className="px-6 py-4 text-[#d4af37] font-medium">{repName}</td>
                  )}
                  {profile?.role !== "representative" && !isRepTable && (
                    <td className="px-6 py-4 text-slate-400">{booking.client_country || "Unknown"}</td>
                  )}
                  <td className="px-6 py-4 text-slate-400">{booking.created_at ? new Date(booking.created_at).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={booking.status || "Pending"}
                      onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold appearance-none cursor-pointer outline-none ${
                        booking.status === "Confirmed" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                        booking.status === "In Review" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      <option value="Pending" className="bg-[#111827] text-amber-400">Pending</option>
                      <option value="In Review" className="bg-[#111827] text-blue-400">In Review</option>
                      <option value="Confirmed" className="bg-[#111827] text-green-400">Confirmed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition text-white">Review</button>
                  </td>
                </tr>
              )})
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
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
  );

  const repReservations = reservations.filter(r => r.client_notes?.includes('[REP_NAME:'));
  const directReservations = reservations.filter(r => !r.client_notes?.includes('[REP_NAME:'));

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

      {profile?.role === "representative" ? (
        renderTable(reservations, "My Reservations", false)
      ) : (
        <>
          {renderTable(directReservations, "Direct Reservations", false)}
          {renderTable(repReservations, "Representative Reservations", true)}
        </>
      )}
    </div>
  );
}
