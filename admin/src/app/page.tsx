"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MessageSquareQuote,
  Check,
  X,
  Star,
  ExternalLink,
  ShieldCheck,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardOverview() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [pendingTestimonials, setPendingTestimonials] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalReservations: 0,
    activeUsers: 0,
    totalTestimonials: 0,
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch recent reservations
        const { data: resData } = await supabase
          .from("itinerary_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(8);

        if (resData) setBookings(resData);

        // Fetch counts
        const { count: resCount } = await supabase
          .from("itinerary_requests")
          .select("*", { count: "exact", head: true });

        const { count: userCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });

        // Fetch pending testimonials
        let pendingReviews: any[] = [];
        let totalRevCount = 0;
        try {
          const { data: revData } = await supabase
            .from("testimonials")
            .select("*")
            .eq("status", "Pending")
            .order("created_at", { ascending: false });

          if (revData) {
            pendingReviews = revData;
            setPendingTestimonials(revData);
          }

          const { count: revCount } = await supabase
            .from("testimonials")
            .select("*", { count: "exact", head: true });
          if (revCount !== null) totalRevCount = revCount;
        } catch (e) {
          // Fallback if table not yet created
        }

        // Count pending reservations
        const pendingReservations = resData ? resData.filter((r) => r.status === "Pending" || !r.status).length : 0;
        const totalPending = pendingReservations + pendingReviews.length;

        setStats({
          totalReservations: resCount || 0,
          activeUsers: userCount || 0,
          totalTestimonials: totalRevCount,
          pendingApprovals: totalPending,
        });
      } catch (err) {
        console.warn("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleApproveReview = async (id: string) => {
    setPendingTestimonials((prev) => prev.filter((t) => t.id !== id));
    setStats((prev) => ({
      ...prev,
      pendingApprovals: Math.max(0, prev.pendingApprovals - 1)
    }));

    try {
      await supabase
        .from("testimonials")
        .update({ status: "Approved", updated_at: new Date().toISOString() })
        .eq("id", id);
    } catch (e) {
      console.warn("Could not update review status:", e);
    }
  };

  const handleRejectReview = async (id: string) => {
    setPendingTestimonials((prev) => prev.filter((t) => t.id !== id));
    setStats((prev) => ({
      ...prev,
      pendingApprovals: Math.max(0, prev.pendingApprovals - 1)
    }));

    try {
      await supabase
        .from("testimonials")
        .update({ status: "Rejected", updated_at: new Date().toISOString() })
        .eq("id", id);
    } catch (e) {
      console.warn("Could not update review status:", e);
    }
  };

  const statCards = [
    { 
      label: "Total Reservations", 
      value: String(stats.totalReservations), 
      change: "+12%", 
      positive: true, 
      icon: CalendarCheck,
      color: "text-blue-400"
    },
    { 
      label: "Registered Users", 
      value: String(stats.activeUsers), 
      change: "+8%", 
      positive: true, 
      icon: Users,
      color: "text-emerald-400"
    },
    { 
      label: "Guest Reviews", 
      value: String(stats.totalTestimonials), 
      change: `${pendingTestimonials.length} Pending`, 
      positive: pendingTestimonials.length === 0, 
      icon: MessageSquareQuote,
      color: "text-[#d4af37]"
    },
    { 
      label: "Pending Approvals", 
      value: String(stats.pendingApprovals), 
      change: stats.pendingApprovals > 0 ? "Action Required" : "Up to date", 
      positive: stats.pendingApprovals === 0, 
      icon: Clock,
      color: "text-amber-400"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back, Admin. Real-time overview of reservations and client reviews.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.positive ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"
                }`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Pending Reviews for Approval Widget */}
      {pendingTestimonials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20"
        >
          <div className="px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-500/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Guest Reviews Awaiting Approval</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-amber-500 text-black">
                    {pendingTestimonials.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Accept a review to instantly publish it on the public website story board.
                </p>
              </div>
            </div>

            <Link
              href="/testimonials"
              className="text-xs font-semibold text-[#d4af37] hover:underline flex items-center gap-1 self-start sm:self-center"
            >
              <span>Manage All in Testimonials</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/5 p-4 sm:p-6 space-y-4">
            {pendingTestimonials.slice(0, 3).map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="text-xs">{item.flag || "🌍"}</span>
                    <span className="text-xs text-slate-400">{item.country}</span>
                    <div className="flex items-center text-[#d4af37] ml-2">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic line-clamp-2">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="text-[10px] text-slate-500">
                    Category: <span className="text-[#d4af37]">{item.role || "Private Client"}</span> &bull; Submitted {item.created_at ? new Date(item.created_at).toLocaleDateString() : "recently"}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleApproveReview(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs transition shadow-md shadow-emerald-500/20"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Accept & Publish</span>
                  </button>
                  <button
                    onClick={() => handleRejectReview(item.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition border border-white/5"
                    title="Reject Review"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Reservations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Recent Reservations</h2>
          <Link href="/reservations" className="text-sm text-[#d4af37] hover:text-[#f5d061] transition font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Serial No</th>
                <th className="px-6 py-4 font-medium">Primary Contact</th>
                <th className="px-6 py-4 font-medium">Package</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Loading reservations...
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4 font-mono text-[#d4af37]">
                      {booking.serial_number || `REQ-${String(booking.id).slice(0, 6)}`}
                    </td>
                    <td className="px-6 py-4 text-slate-200 font-medium">
                      {booking.client_name}
                      <span className="block text-xs text-slate-500 font-normal mt-0.5">{booking.client_email}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {booking.package_title}
                      <span className="block text-xs text-slate-500 mt-0.5">{booking.package_duration || "Custom"}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {booking.created_at ? new Date(booking.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Confirmed" || booking.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" :
                        booking.status === "In Review" ? "bg-blue-500/10 text-blue-400" :
                        "bg-amber-500/10 text-amber-400"
                      }`}>
                        {booking.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <CalendarCheck className="w-8 h-8 text-slate-600 mb-2" />
                      <p>No recent reservations found.</p>
                      <p className="text-xs text-slate-600">New bookings will appear here.</p>
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
