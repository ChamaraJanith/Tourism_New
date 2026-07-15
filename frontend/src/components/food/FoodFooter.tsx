"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUp, Leaf } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { fireBookingConfetti } from "@/lib/booking-confetti";

export const FoodFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111416] pt-32 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-amber-950/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-10">
              <h2 className="text-3xl font-display font-bold text-white tracking-tighter">
                AETHER<span className="text-amber-500">WELLNESS</span>
              </h2>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg">
              Healing the soul through the sacred alchemy of Sri Lankan organic superfoods. Rooted in tradition, delivered with luxury.
            </p>
            <div className="flex gap-5">
              {[FaFacebookF, FaInstagram, FaXTwitter].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-500 bg-white/5">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-xs">Wellness Links</h4>
            <ul className="space-y-5">
              {["Organic Stories", "Superfood Menu", "Detox Retreats", "Village Alchemy", "Wellness Concierge"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300 font-light text-lg flex items-center gap-3 group">
                    <Leaf className="w-4 h-4 text-amber-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-xs">Sanctuary</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5">
                <MapPin className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <span className="text-gray-400 font-light text-lg leading-relaxed">The Wellness Estate, <br /> Ella Highlands, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-5">
                <Phone className="w-6 h-6 text-amber-500 shrink-0" />
                <span className="text-gray-400 font-light text-lg">+94 77 987 6543</span>
              </li>
              <li className="flex items-center gap-5">
                <Mail className="w-6 h-6 text-amber-500 shrink-0" />
                <span className="text-gray-400 font-light text-lg">wellness@aethertravel.lk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-10 uppercase tracking-[0.3em] text-xs">Inner Circle</h4>
            <p className="text-gray-400 font-light mb-8 text-lg leading-relaxed">Subscribe for seasonal superfood harvests and wellness tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Sanctuary email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-all backdrop-blur-xl"
              />
              <button
                type="button"
                onClick={() => fireBookingConfetti("amber")}
                className="booking-pill-btn absolute right-3 top-3 bottom-3 px-8 bg-amber-600 hover:bg-amber-500 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm font-light tracking-wider">
            &copy; 2026 Aether Wellness. Part of the Aether Travel Collective.
          </p>
        </div>
      </div>
    </footer>
  );
};
