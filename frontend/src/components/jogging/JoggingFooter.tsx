"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUp, Leaf, Sprout } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { fireBookingConfetti } from "@/lib/booking-confetti";
import Link from "next/link";

export const JoggingFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080a0d] pt-40 pb-16 relative overflow-hidden">
      {/* Deep Forest Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[800px] bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-12">
              <h2 className="text-4xl font-display font-bold text-white tracking-tighter">
                VITALITY<span className="text-emerald-500">TRAILS</span>
              </h2>
            </Link>
            <p className="text-emerald-50/50 font-light leading-relaxed mb-12 text-xl">
              Sri Lanka's premier destination for luxury eco-wellness, nature jogging, and holistic health retreats. Breathe pure freedom.
            </p>
            <div className="flex gap-6">
              {[FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn].map((Icon, i) => (
                <button key={i} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-500 hover:border-emerald-500/50 transition-all duration-500 bg-white/5 shadow-2xl">
                  <Icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.5em] text-[10px]">Trail Navigation</h4>
            <ul className="space-y-6">
              {["Sunrise Routes", "Lakeside Paths", "Forest Canopy", "Wellness Coaching", "Trail Safety"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-emerald-50/40 hover:text-emerald-500 transition-colors duration-500 font-light text-lg flex items-center gap-5 group">
                    <Sprout className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.5em] text-[10px]">Sanctuary</h4>
            <ul className="space-y-10">
              <li className="flex items-start gap-6">
                <MapPin className="w-7 h-7 text-emerald-500 mt-1 shrink-0" />
                <span className="text-emerald-50/40 font-light text-xl leading-relaxed">The Vitality Estate, <br /> Kandy Highlands, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-6">
                <Phone className="w-7 h-7 text-emerald-500 shrink-0" />
                <span className="text-emerald-50/40 font-light text-xl">+94 81 234 5678</span>
              </li>
              <li className="flex items-center gap-6">
                <Mail className="w-7 h-7 text-emerald-500 shrink-0" />
                <span className="text-emerald-50/40 font-light text-xl">hello@vitalitytrails.lk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.5em] text-[10px]">Pulse Newsletter</h4>
            <p className="text-emerald-50/40 font-light mb-10 text-xl leading-relaxed">Subscribe for seasonal trail updates and exclusive wellness tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Sanctuary email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-6 px-10 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-all backdrop-blur-3xl"
              />
              <button
                type="button"
                onClick={() => fireBookingConfetti("emerald")}
                className="booking-pill-btn absolute right-3 top-3 bottom-3 px-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.6em] font-light">
            &copy; 2026 Vitality Trails Collective. Part of Aether Wellness.
          </p>
        </div>
      </div>
    </footer>
  );
};
