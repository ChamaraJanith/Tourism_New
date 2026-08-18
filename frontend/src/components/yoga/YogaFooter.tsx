"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUp, Sparkles, Heart } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";
import { fireBookingConfetti } from "@/lib/booking-confetti";

export const YogaFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080a0d] pt-40 pb-16 relative overflow-hidden">
      {/* Background Spiritual Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[800px] bg-gradient-to-t from-purple-950/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-12">
              <h2 className="text-4xl font-display font-bold text-white tracking-tighter">
                SACRED<span className="text-amber-500">HEALING</span>
              </h2>
            </Link>
            <p className="text-amber-50/50 font-light leading-relaxed mb-12 text-xl">
              Sri Lanka's premier destination for authentic Ayurvedic wellness, spiritual yoga retreats, and deep mental rejuvenation.
            </p>
            <div className="flex gap-6">
              {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube].map((Icon, i) => (
                <button key={i} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-500 bg-white/5 shadow-2xl">
                  <Icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.5em] text-[10px]">Wellness Paths</h4>
            <ul className="space-y-6">
              {["Ayurvedic Healing", "Yoga Retreats", "Meditation Silence", "Sound Therapy", "Temple Pilgrimages"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-amber-50/40 hover:text-amber-400 transition-colors duration-500 font-light text-lg flex items-center gap-5 group">
                    <Sparkles className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.5em] text-[10px]">The Sanctuary</h4>
            <ul className="space-y-10">
              <li className="flex items-start gap-6">
                <MapPin className="w-7 h-7 text-amber-500 mt-1 shrink-0" />
                <span className="text-amber-50/40 font-light text-xl leading-relaxed">Hillside Wellness Reserve, <br /> Kandy Highlands, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-6">
                <Phone className="w-7 h-7 text-amber-500 shrink-0" />
                <span className="text-amber-50/40 font-light text-xl">+94 81 555 9999</span>
              </li>
              <li className="flex items-center gap-6">
                <Mail className="w-7 h-7 text-amber-500 shrink-0" />
                <span className="text-amber-50/40 font-light text-xl">peace@sacredhealing.lk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.5em] text-[10px]">Sacred Circle</h4>
            <p className="text-amber-50/40 font-light mb-10 text-xl leading-relaxed">Join our wellness circle for seasonal spiritual guidance and retreat news.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Soulful email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-6 px-10 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-all backdrop-blur-3xl"
              />
              <button
                type="button"
                onClick={() => fireBookingConfetti("amber")}
                className="booking-pill-btn absolute right-3 top-3 bottom-3 px-10 bg-amber-600 hover:bg-amber-500 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.6em] font-light">
            &copy; 2026 Sacred Healing Sanctuary. Part of Aether Eco-Retreats.
          </p>
        </div>
      </div>
    </footer>
  );
};
