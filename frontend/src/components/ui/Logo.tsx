"use client";

import { motion } from "framer-motion";

export const WildRideLogo = () => (
  <a href="/" className="flex items-center gap-3 select-none group">
    <motion.div 
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="shrink-0"
    >
      <img src="/header-logo/1.png" alt="IHV Travel Logo" className="h-10 md:h-12 w-auto object-contain" />
    </motion.div>
  </a>
);


