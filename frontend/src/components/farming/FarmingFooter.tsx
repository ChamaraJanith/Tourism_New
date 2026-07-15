"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { fireBookingConfetti } from "@/lib/booking-confetti";

export const FarmingFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0d0f11] pt-24 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <h2 className="text-3xl font-display font-bold text-white tracking-tighter">
                AETHER<span className="text-emerald-500">TRAVEL</span>
              </h2>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed mb-8">
              Curating authentic, luxury eco-tourism experiences in the heart of Sri Lanka. Rooted in tradition, committed to sustainability.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaXTwitter].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {["Our Stories", "Farming Experiences", "Village Stays", "Sustainable Impact", "Contact Us"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 font-light flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 scale-0 group-hover:scale-100 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                <span className="text-gray-400 font-light">123 Village Road, <br /> Ella, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-400 font-light">+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-400 font-light">hello@aethertravel.lk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-gray-400 font-light mb-6">Join our community for seasonal updates and village stories.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => fireBookingConfetti("emerald")}
                className="booking-pill-btn absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-bold transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm font-light">
            &copy; 2026 Aether Travel. All rights reserved. Designed with love in Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
};
