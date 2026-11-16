"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  Award,
  Building2,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const MEDICAL_SERVICES = [
  {
    number: "01",
    title: "International Patient Referrals",
    desc: "Coordinating specialist referrals for overseas patients seeking tertiary clinical care in Sri Lanka.",
    image: "/images/medical-services/International Patient Referrals.png",
    badge: "Specialist Access"
  },
  {
    number: "02",
    title: "Specialist Medical Consultations",
    desc: "Preliminary medical assessments, virtual teleconsultations, and expert clinical second opinions.",
    image: "/images/medical-services/Specialist Medical Consultations.png",
    badge: "Consultations"
  },
  {
    number: "03",
    title: "Treatment Coordination",
    desc: "Obtaining personalized treatment plans, transparent hospital quotations, and guaranteed procedure schedules.",
    image: "/images/medical-services/Treatment Coordination.png",
    badge: "Clear Pricing"
  },
  {
    number: "04",
    title: "Medical Travel Management",
    desc: "Coordinating international flights, VIP airport tarmac reception, ambulance, and private luxury transfers.",
    image: "/images/medical-services/Medical Travel Management.png",
    badge: "Travel Logistics"
  },
  {
    number: "05",
    title: "Patient Assistance",
    desc: "24/7 bedside support, hospital medical visa facilitation letters, and companion logistical arrangements.",
    image: "/images/medical-services/Patient Assistance.png",
    badge: "24/7 Concierge"
  },
  {
    number: "06",
    title: "Recovery and Wellness Packages",
    desc: "Restorative convalescence in private oceanfront villas or mountain retreats with nursing and wellness.",
    image: "/images/medical-services/packages.png",
    badge: "Healing Retreats"
  }
];

export function MedicalTourismSection() {
  return (
    <section id="medical-tourism" className="py-16 sm:py-20 relative overflow-hidden bg-black border-t border-b border-white/10 scroll-mt-20">
      {/* Background glow effects */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md">
              <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
              <span>Specialist Healthcare & Recovery</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight leading-snug">
              Medical Tourism in Sri Lanka:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37]">
                A Leading Place to Be Seen
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mt-2.5">
              Access JCI-accredited tertiary hospitals, UK/US board-certified specialists, and private post-op recovery retreats with 60–80% savings and zero waiting lists.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/medical-tourism"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#d4af37] hover:bg-[#b5952f] text-black font-semibold text-xs sm:text-sm transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.6)]"
            >
              <span>Explore Medical Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/94771522718?text=Hello%20IHV%20Travel,%20I%20am%20inquiring%20about%20Medical%20Tourism%20and%20Specialist%20Healthcare%20services%20in%20Sri%20Lanka."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium text-xs sm:text-sm transition-all duration-300"
              title="Chat with Medical Concierge"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>

        {/* 6 Visual Service Cards with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {MEDICAL_SERVICES.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href="/medical-tourism"
                className="group relative flex flex-col justify-between h-full rounded-2xl bg-[#111416] border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/10"
              >
                {/* Image Container */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black/60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#d4af37] bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
                      Pillar {item.number}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-300 bg-emerald-950/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-semibold text-white group-hover:text-[#d4af37] transition-colors leading-snug mb-1.5">
                      {item.number}. {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#d4af37] font-medium">
                    <span>Learn More & Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Compact Bottom Trust Strip */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 font-light">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>JCI & ACHSI Hospital Network</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>UK & US Trained Specialists</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>60–80% Treatment Cost Savings</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Dedicated Recovery Villas</span>
            </span>
          </div>

          <Link
            href="/medical-tourism"
            className="text-xs font-semibold text-[#d4af37] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Medical Tourism Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
