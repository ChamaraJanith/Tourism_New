"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUp, Waves, Anchor } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";
import { fireBookingConfetti } from "@/lib/booking-confetti";

export const SurfFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080a0d] pt-40 pb-16 relative overflow-hidden">
      {/* Background Deep Ocean Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[800px] bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-12">
              <h2 className="text-4xl font-display font-bold text-white tracking-tighter">
                HIRIKETIYA<span className="text-cyan-400">SURF</span>
              </h2>
            </Link>
            <p className="text-cyan-50/50 font-light leading-relaxed mb-12 text-xl">
              Sri Lanka's premier destination for tropical surfing, beach culture, and coastal wellness. Ride with us.
            </p>
            <div className="flex gap-6">
              {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube].map((Icon, i) => (
                <button key={i} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-500 bg-white/5 shadow-xl">
                  <Icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.4em] text-xs">Quick Navigation</h4>
            <ul className="space-y-6">
              {["Surf Lessons", "Beach Yoga", "Hiriketiya Guide", "Surf Camp Stays", "Contact Us"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-cyan-50/40 hover:text-cyan-400 transition-colors duration-500 font-light text-lg flex items-center gap-4 group">
                    <Waves className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.4em] text-xs">The Bay</h4>
            <ul className="space-y-10">
              <li className="flex items-start gap-6">
                <MapPin className="w-7 h-7 text-cyan-400 mt-1 shrink-0" />
                <span className="text-cyan-50/40 font-light text-xl leading-relaxed">Hiriketiya Beach Road, <br /> Dikwella, Southern Province</span>
              </li>
              <li className="flex items-center gap-6">
                <Phone className="w-7 h-7 text-cyan-400 shrink-0" />
                <span className="text-cyan-50/40 font-light text-xl">+94 41 222 3333</span>
              </li>
              <li className="flex items-center gap-6">
                <Mail className="w-7 h-7 text-cyan-400 shrink-0" />
                <span className="text-cyan-50/40 font-light text-xl">surf@hirikatiya.travel</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-12 uppercase tracking-[0.4em] text-xs">Stay in Flow</h4>
            <p className="text-cyan-50/40 font-light mb-10 text-xl leading-relaxed">Join our newsletter for weekly wave conditions and island stories.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-6 px-10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-all backdrop-blur-3xl"
              />
              <button
                type="button"
                onClick={() => fireBookingConfetti("cyan")}
                className="booking-pill-btn absolute right-3 top-3 bottom-3 px-10 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 text-center">
          <p className="text-white/20 text-sm font-light tracking-widest uppercase">
            &copy; 2026 Hiriketiya Surf Collective. Part of Aether Travel.
          </p>
        </div>
      </div>
    </footer>
  );
};
