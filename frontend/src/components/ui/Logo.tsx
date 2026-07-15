"use client";

import { motion } from "framer-motion";

export const WildRideLogo = () => (
  <a href="/" className="flex items-center gap-2 select-none group">
    <motion.div 
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="shrink-0"
    >
      <svg viewBox="0 0 36 36" width="40" height="40">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#d4af37" strokeWidth="2.5" />
        <g fill="#d4af37">
          <rect x="17" y="8" width="2" height="12" rx="1" />
          <rect x="12" y="8" width="2" height="8" rx="1" />
          <rect x="22" y="8" width="2" height="8" rx="1" />
          <rect x="12" y="15" width="12" height="2" rx="1" />
        </g>
      </svg>
    </motion.div>
    <div className="flex flex-col leading-none">
      <span className="text-[0.9rem] font-black tracking-widest text-[#1e2528]">WILD</span>
      <span className="text-[0.9rem] font-black tracking-widest text-[#d4af37]">RIDE</span>
    </div>
  </a>
);
