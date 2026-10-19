"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, ShieldAlert, FileText, Calendar, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const CANCELLATION_POLICIES = [
  {
    tier: "31 to 22 Days",
    fee: "25%",
    text: "Cancellations received with between 31 to 22 days’ notice is subject to a 25% cancellation fee.",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    tier: "22 to 15 Days",
    fee: "50%",
    text: "Cancellations received with between 22 to 15 days’ notice is subject to a 50% cancellation fee.",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  {
    tier: "15 to 08 Days",
    fee: "75%",
    text: "Cancellations received with between 15 to 08 days’ notice is subject to a 75% cancellation fee.",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
  {
    tier: "Less than 8 Days",
    fee: "100%",
    text: "Cancellations received with less than 8 days’ notice is subject to a 100% cancellation fee.",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
  {
    tier: "Hotel No-Show",
    fee: "100%",
    text: "Failure to arrive at the hotel is subject to a 100% cancellation fee.",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
  },
];

export default function CancellationPolicyPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-[#070b10] text-white pt-28 md:pt-36 pb-20 px-6 md:px-16 relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-12 text-center md:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 mb-3 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">
            <Compass className="text-[#d4af37] w-4 h-4 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              IHV LUXURY TRAVEL & ECO-TOURISM
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4"
          >
            Cancellation Policy
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-sm md:text-base font-light tracking-wide max-w-2xl leading-relaxed"
          >
            Please review the official cancellation guidelines and applicable fees below for bookings and tour reservations.
          </motion.p>
        </motion.div>

        {/* Highlighted Policy Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-[#d4af37]/30 p-6 md:p-10 mb-10 relative overflow-hidden"
          style={{
            background: "rgba(10, 16, 28, 0.65)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-white">
                Official Cancellation Terms
              </h2>
              <p className="text-xs text-zinc-400 font-light">Applicable to all confirmed bookings</p>
            </div>
          </div>

          {/* Exact Verbatim List */}
          <ul className="space-y-4 text-sm md:text-base text-zinc-200">
            {CANCELLATION_POLICIES.map((policy, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/30 transition-all duration-300"
              >
                <span className="text-[#d4af37] font-bold text-lg leading-none mt-0.5 shrink-0">•</span>
                <span className="font-light leading-relaxed">{policy.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Visual Tier Breakdown Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-lg font-bold font-display text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#d4af37]" />
            <span>Cancellation Fee Schedule Overview</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CANCELLATION_POLICIES.map((policy, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#d4af37]/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {policy.tier}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${policy.badgeColor}`}>
                      {policy.fee} Fee
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-4">
                    {policy.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Assistance Card */}
            <div className="rounded-2xl border border-[#d4af37]/20 p-6 flex flex-col justify-between relative overflow-hidden bg-[#d4af37]/5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Need Assistance?</span>
                </div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                  Have questions about modifying or cancelling an existing itinerary? Our team is available 24/7 to assist.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/94771522718"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
                >
                  <span>Contact</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Links to Terms and Reservations */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-3">
            <FileText className="text-[#d4af37] w-5 h-5 shrink-0" />
            <span className="text-xs text-zinc-400 font-light">
              For complete booking agreements, please view our full{" "}
              <Link href="/terms" className="text-[#d4af37] hover:underline">
                Terms & Conditions
              </Link>
              .
            </span>
          </div>

          <Link
            href="/reservation"
            className="py-3 px-6 rounded-full text-xs font-bold uppercase tracking-widest text-[#070b10] bg-gradient-to-r from-[#d4af37] to-[#f0c040] hover:shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-all"
          >
            Go to Reservation
          </Link>
        </div>
      </div>
    </main>
  );
}
