"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Eye, Key, FileText } from "lucide-react";

export default function PrivacyPage() {
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
      title: "1. Information We Collect",
      content:
        "We collect personal information that you provide directly to us when registering for an account, booking a travel itinerary, or subscribing to our updates. This includes your name, email address, password, phone number, and transaction details. We also collect physical metrics necessary for custom cycling equipment sizing.",
    },
    {
      title: "2. How We Use Your Data",
      content:
        "Your details are processed to process bookings, verify identities via secure JWT tokens, customize safety gear, send transaction receipts, and communicate trip itineraries. With your explicit consent, we may send seasonal trail suggestions and promotional offers.",
    },
    {
      title: "3. Data Protection & Token Security",
      content:
        "We implement advanced technical safeguards to secure your session data. Passwords are encrypted and managed directly by Supabase Auth security layers. JWT access tokens are used for stateless request authentication and are stored securely on your local device. We never sell or share user data with third-party advertising companies.",
    },
    {
      title: "4. Third-Party Integrations",
      content:
        "Aether Travel uses Supabase for cloud database services and database profile synchronization. Payment operations are handled via internationally certified payment gateways. These partners adhere to strict GDPR and PCI-DSS compliance regulations.",
    },
  ];

  return (
    <main className="min-h-screen md:h-screen bg-[#070b10] text-white py-12 pt-28 md:pt-36 pb-12 px-6 md:px-16 relative overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 items-stretch justify-start md:items-start">
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
              Privacy Policy
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-xs md:text-sm font-light tracking-wide max-w-md leading-relaxed"
            >
              Effective Date: June 10, 2026. Your privacy and digital security are fundamental pillars of our luxury hospitality standards.
            </motion.p>
          </motion.div>
        </div>

        {/* Return Home & Access Portal Link / CTA Footer (Desktop only - hidden on mobile to avoid duplication) */}
        <div className="hidden md:flex md:flex-col gap-6 pt-6 border-t border-white/5 max-w-sm">
          {/* Access Portal CTA */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <FileText className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-xs text-zinc-400 font-light leading-relaxed">
                By booking a ticket or completing registration, you confirm that you accept all of these policies.
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
                className="rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col justify-start relative overflow-hidden transition-all duration-300 hover:border-[#d4af37]/20 group"
                style={{
                  background: "rgba(10, 16, 28, 0.45)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/5 group-hover:from-amber-500/[0.02] pointer-events-none transition-colors duration-300" />
                <h3 className="text-base font-bold font-display text-white mb-3 flex items-center gap-3">
                  {idx === 2 ? (
                    <Key size={16} className="text-[#d4af37] group-hover:rotate-45 transition-transform" />
                  ) : (
                    <Eye size={16} className="text-[#10b981] group-hover:scale-110 transition-transform" />
                  )}
                  {sec.title}
                </h3>
                <p className="text-zinc-300 font-light leading-relaxed text-xs md:text-sm">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Accept Note / CTA Footer (Mobile only) */}
          <div className="flex md:hidden flex-col gap-6 pt-6 mt-4 border-t border-white/5">
            {/* Access Portal CTA */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <FileText className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-400 font-light leading-relaxed">
                  By booking a ticket or completing registration, you confirm that you accept all of these policies.
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
        </motion.div>
      </div>
    </main>
  );
}
