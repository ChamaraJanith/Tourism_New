"use client";

import { motion } from "framer-motion";
import { ArrowRight, Waves, Sparkles, Compass } from "lucide-react";
import { BookingCTAButton } from "@/components/ui/BookingCTAButton";

export const LakeBookingCTA = () => {
  return (
    <section id="booking" className="py-16 md:py-40 px-4 md:px-6 bg-[#111416]">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] md:rounded-[5rem] overflow-hidden bg-[#0a0f14] p-8 sm:p-16 md:p-24 lg:p-36 text-center border border-white/10 shadow-[0_80px_200px_-50px_rgba(0,0,0,0.9)]">
          {/* Animated Water Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.15)_0%,transparent_60%)]" />
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.25, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 18, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[200px] rounded-full"
            />
          </div>
 
          {/* Floating Water/Compass Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  y: [-30, -220],
                  x: [0, Math.sin(i) * 120],
                  rotate: [0, 180]
                }}
                transition={{ 
                  duration: 8 + i * 2.5, 
                  repeat: Infinity, 
                  delay: i * 1.2,
                  ease: "easeInOut"
                }}
                className="absolute text-blue-400/10"
                style={{ 
                  left: `${10 + i * 8}%`, 
                  bottom: "5%" 
                }}
              >
                {i % 2 === 0 ? <Waves className="w-12 h-12" /> : <Compass className="w-10 h-10" />}
              </motion.div>
            ))}
          </div>
 
          <div className="relative z-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6 md:mb-8"
            >
              <div className="w-6 md:w-10 h-[1px] bg-blue-400" />
              <span className="text-blue-400 font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs">Find Your Tranquility</span>
              <div className="w-6 md:w-10 h-[1px] bg-blue-400" />
            </motion.div>
 
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-8 md:mb-14 leading-tight md:leading-none tracking-tighter"
            >
              Begin Your Lakeside <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-indigo-400">Sanctuary Experience</span>
            </motion.h2>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl lg:text-3xl text-blue-50/60 font-light mb-12 md:mb-24 max-w-3xl mx-auto leading-relaxed"
            >
              Secure your private boat ride and immersive lake tour today. Tailored experiences for soul seekers and nature lovers.
            </motion.p>
            
            <BookingCTAButton
              confettiPalette="blue"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-16 py-4 md:py-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-base md:text-2xl transition-all duration-500 shadow-[0_0_80px_rgba(37,99,235,0.4)] hover:shadow-[0_0_100px_rgba(37,99,235,0.6)] flex items-center gap-4 md:gap-8 mx-auto uppercase tracking-widest"
            >
              <span>Book Boat Experience</span>
              <ArrowRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-4 transition-transform duration-500" />
            </BookingCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
