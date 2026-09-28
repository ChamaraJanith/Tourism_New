"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

const STATS = [
  { label: "Total Reservations", value: "248", change: "+12%", positive: true, icon: CalendarCheck },
  { label: "Active Users", value: "1,429", change: "+5.2%", positive: true, icon: Users },
  { label: "Total Revenue", value: "$124,500", change: "+18%", positive: true, icon: DollarSign },
  { label: "Pending Approvals", value: "14", change: "-2%", positive: false, icon: TrendingUp },
];

const RECENT_BOOKINGS = [
  { id: "IHV-GSD-IND-0012", name: "Rahul Sharma", package: "The Grand Sri Lanka Discovery", status: "Approved", date: "Oct 12, 2026" },
  { id: "IHV-LES-GBR-0045", name: "Emma Watson", package: "Luxury Escape Sri Lanka", status: "Pending", date: "Oct 11, 2026" },
  { id: "IHV-RHC-GER-0089", name: "Lukas Schmidt", package: "Romance & Honeymoon", status: "Approved", date: "Oct 10, 2026" },
  { id: "IHV-WNA-OTH-0102", name: "David Chen", package: "Wildlife & Nature Adventure", status: "Not Approved", date: "Oct 09, 2026" },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back, Admin. Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111827] border border-white/5 rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.positive ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
                }`}>
                  {stat.change}
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Recent Reservations</h2>
          <button className="text-sm text-[#d4af37] hover:text-[#f5d061] transition font-medium">View All</button>
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
              {RECENT_BOOKINGS.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4 font-mono text-[#d4af37]">{booking.id}</td>
                  <td className="px-6 py-4 text-slate-200 font-medium">{booking.name}</td>
                  <td className="px-6 py-4 text-slate-400">{booking.package}</td>
                  <td className="px-6 py-4 text-slate-400">{booking.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" :
                      booking.status === "Pending" ? "bg-amber-500/10 text-amber-400" :
                      "bg-rose-500/10 text-rose-400"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
}
