"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { BookingCTAButton } from "@/components/ui/BookingCTAButton";

export const BookingCTA = () => {
  return (
    <section id="booking" className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#111416] p-8 sm:p-12 md:p-24 text-center border border-white/10">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-amber-900/40" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-600/10 blur-[120px] rounded-full"
            />
          </div>
 
          {/* Floating Leaves Decoration */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  y: [-20, -120],
                  x: [0, Math.sin(i) * 50],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 5 + i * 2, 
                  repeat: Infinity, 
                  delay: i * 1,
                  ease: "easeInOut"
                }}
                className="absolute text-emerald-500/20"
                style={{ 
                  left: `${15 + i * 15}%`, 
                  bottom: "10%" 
                }}
              >
                <Leaf className="w-8 h-8" />
              </motion.div>
            ))}
          </div>
 
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6 md:mb-8"
            >
              <div className="w-6 md:w-10 h-[1px] bg-emerald-500" />
              <span className="text-emerald-500 font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs">Limited Seasonal Experience</span>
              <div className="w-6 md:w-10 h-[1px] bg-emerald-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8 leading-tight"
            >
              Become a Farmer <br /> for a Day
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 font-light mb-8 md:mb-12 leading-relaxed"
            >
              Reconnect with the earth, learn ancient traditions, and find peace in the rhythmic life of the village. Your journey to the heart of Sri Lanka begins here.
            </motion.p>
            
            <BookingCTAButton
              confettiPalette="emerald"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 md:px-10 py-4 md:py-5 bg-emerald-600 text-white rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] flex items-center gap-2 md:gap-3 mx-auto"
            >
              <span>Book Your Village Stay</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </BookingCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
