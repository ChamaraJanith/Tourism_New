"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
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

  const sections = [
    {
      title: "1. Guided Journeys & Booking",
      content:
        "All expeditions, private itineraries, and eco-cycling tours must be reserved in advance through the Aether Travel platform. To secure your reservation, a valid payment method or deposit is required. All bookings are subject to availability and seasonal environmental conditions.",
    },
    {
      title: "2. Cancellation & Refund Policy",
      content:
        "We understand plans can change. Cancellations made 14 days or more prior to the scheduled departure will receive a full refund. Cancellations between 7 and 13 days prior are eligible for a 50% refund. Cancellations made less than 7 days in advance are non-refundable, as local guides and resources have already been curated.",
    },
    {
      title: "3. Safety & Physical Responsibility",
      content:
        "Participants in eco-cycling and adventure trails must be in appropriate physical condition and possess basic cycling skills. It is your responsibility to disclose any health issues prior to departure. Helmets and safety gear provided by Aether Travel must be worn at all times during the activities.",
    },
    {
      title: "4. Environmental & Cultural Integrity",
      content:
        "Aether Travel operates under strict ecological sanctuary guidelines. All participants must respect local heritage, wildlife, and natural ecosystems. Littering, damaging flora, or disrupting community shrines will result in immediate termination of the tour without refund.",
    },
    {
      title: "5. Limitation of Liability",
      content:
        "While we maintain the highest international safety standards, outdoor adventure travel carries inherent risks. Aether Travel and its local affiliates shall not be held liable for personal injury, property loss, or flight delays resulting from natural events or force majeure.",
    },
  ];

  return (
    <main className="min-h-screen md:h-screen bg-[#070b10] text-white pt-28 md:pt-36 pb-12 px-6 md:px-16 relative overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 items-stretch justify-start md:items-start">
      {/* Background Orbs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Left Column (Static - Centered Vertically) */}
      <div className="flex flex-col justify-center w-full md:w-5/12 z-10 py-6 md:py-8 shrink-0 gap-8 md:h-[calc(100vh-200px)]">
        <div>
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-0"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <Compass className="text-[#d4af37] w-5 h-5 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                AETHER ECO-TOURISM
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 leading-none"
            >
              Terms & Conditions
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-xs md:text-sm font-light tracking-wide max-w-md leading-relaxed"
            >
              Effective Date: June 10, 2026. Please read these terms carefully before embarking on a curated journey with Aether Travel.
            </motion.p>
          </motion.div>
        </div>

        {/* Accept Note / CTA Footer (Desktop only - hidden on mobile to avoid duplication) */}
        <div className="hidden md:flex md:flex-col gap-4 pt-6 border-t border-white/5 max-w-sm">
          <div className="flex items-start gap-3">
            <FileText className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-xs text-zinc-400 font-light leading-relaxed">
              By booking a ticket or completing registration, you confirm that you accept all of these terms.
            </span>
          </div>
          <Link
            href="/auth?mode=signup"
            className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-center text-[#070b10] transition-all bg-gradient-to-r from-[#d4af37] to-[#f0c040] hover:shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:scale-[1.02]"
          >
            Access Portal
          </Link>
        </div>
      </div>

      {/* Vertical Divider Line (Desktop only) */}
      <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent shrink-0 self-stretch my-8" />

      {/* Right Column (Scrollable Grid of Sections) */}
      <div className="w-full md:w-7/12 z-10 flex items-start h-full max-h-full py-4 md:py-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:max-h-[calc(100vh-200px)] overflow-y-auto md:pr-4 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 md:pt-10">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className={`rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col justify-start relative overflow-hidden transition-all duration-300 hover:border-[#d4af37]/20 group ${
                  idx === 4 ? "sm:col-span-2" : ""
                }`}
                style={{
                  background: "rgba(10, 16, 28, 0.45)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/5 group-hover:from-amber-500/[0.02] pointer-events-none transition-colors duration-300" />
                <h3 className="text-base font-bold font-display text-white mb-3 flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[#10b981] group-hover:scale-110 transition-transform" />
                  {sec.title}
                </h3>
                <p className="text-zinc-300 font-light leading-relaxed text-xs md:text-sm">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Accept Note / CTA Footer (Mobile only) */}
          <div className="flex md:hidden flex-col gap-4 pt-6 mt-4 border-t border-white/5">
            <div className="flex items-start gap-3">
              <FileText className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-xs text-zinc-400 font-light leading-relaxed">
                By booking a ticket or completing registration, you confirm that you accept all of these terms.
              </span>
            </div>
            <Link
              href="/auth?mode=signup"
              className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-center text-[#070b10] transition-all bg-gradient-to-r from-[#d4af37] to-[#f0c040] hover:shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:scale-[1.02]"
            >
              Access Portal
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
