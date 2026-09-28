"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Globe, Users, CalendarCheck, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RepDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [colleagues, setColleagues] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadDashboard() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      // Load Profile
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", session.user.id)
        .single();
      
      if (!profileError && profileData) {
        setProfile(profileData);

        // Filter reservations by the representative's country
        // (Assumes itinerary_requests table has a 'client_country' or similar column)
        const { data: resData } = await supabase
          .from("itinerary_requests")
          .select("*")
          .eq("client_country", profileData.country) // Make sure this column exists in DB
          .order("created_at", { ascending: false })
          .limit(10);
        
        if (resData) setReservations(resData);

        // Fetch Representatives in the SAME country
        const { data: repsData } = await supabase
          .from("users")
          .select("*")
          .eq("role", "representative")
          .eq("country", profileData.country)
          .order("custom_id", { ascending: true });
        
        if (repsData) setColleagues(repsData);
      }
      setLoadingData(false);
    }
    loadDashboard();
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
          <h3 className="text-slate-400 text-sm font-medium">{profile.country} Representatives</h3>
          <p className="text-3xl font-bold text-white mt-1">{colleagues.length}</p>
        </div>
        
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Reservations to Handle</h3>
          <p className="text-3xl font-bold text-white mt-1">{reservations.length}</p>
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

      {/* Reservations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Handle Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Serial No</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Package</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loadingData ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : reservations.length > 0 ? (
                reservations.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-mono text-[#d4af37]">REQ-{String(booking.id).padStart(4, '0')}</td>
                    <td className="px-6 py-4 text-slate-200">{booking.client_name}</td>
                    <td className="px-6 py-4 text-slate-400">{booking.package_title}</td>
                    <td className="px-6 py-4 text-amber-400">{booking.status || "Pending"}</td>
                    <td className="px-6 py-4">
                      <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition text-white">Review</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No reservations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Colleagues Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Representatives in {profile.country}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Rep ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loadingData ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : colleagues.length > 0 ? (
                colleagues.map((rep) => (
                  <tr key={rep.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-mono text-[#d4af37]">{rep.custom_id}</td>
                    <td className="px-6 py-4 text-slate-200">
                      {rep.full_name} {rep.auth_id === profile.auth_id && <span className="text-xs ml-2 bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded">You</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{rep.email}</td>
                    <td className="px-6 py-4 text-slate-400">{rep.contact_number || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No representatives found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
}
