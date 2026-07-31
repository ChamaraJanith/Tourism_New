"use client";

import { motion } from "framer-motion";

export const WildRideLogo = () => (
  <a href="/" className="flex items-center gap-3 select-none group">
    <motion.div 
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="shrink-0"
    >
      <img src="/images/title2.jpeg" alt="Logo" className="w-10 h-10 object-contain rounded-lg shadow-md" />
    </motion.div>
    <div className="flex flex-col leading-none">
      <span className="text-[0.9rem] font-black tracking-widest text-[#1e2528]">IHV</span>
      <span className="text-[0.9rem] font-black tracking-widest text-[#d4af37]">TRAVEL</span>
    </div>
  </a>
);
