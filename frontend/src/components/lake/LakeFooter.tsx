"use client";

import { motion } from "framer-motion";
import { Waves, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const LakeFooter = () => {
  return (
    <footer className="bg-[#0d0f11] py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">Dandeniya Lake</span>
            </div>
            <p className="text-gray-500 font-light text-center md:text-left max-w-xs">
              A sanctuary of peace and traditional Sri Lankan lake heritage.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-6">
              {[FaInstagram, FaFacebookF, FaXTwitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              &copy; 2026 Dandeniya Lake Experiences. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
