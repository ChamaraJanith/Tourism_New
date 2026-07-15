"use client";

import { motion } from "framer-motion";
import { ArrowRight, Waves, Sparkles, Droplets } from "lucide-react";
import { BookingCTAButton } from "@/components/ui/BookingCTAButton";

export const WaterfallBookingCTA = () => {
  return (
    <section id="booking" className="py-16 md:py-40 px-4 md:px-6 bg-[#111416]">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] md:rounded-[5rem] overflow-hidden bg-[#0d1317] p-8 sm:p-16 md:p-24 lg:p-36 text-center border border-white/10 shadow-[0_80px_200px_-50px_rgba(0,0,0,0.9)]">
          {/* Animated Water Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.3, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[200px] rounded-full"
            />
          </div>
 
          {/* Floating Mist Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [0.5, 2.5],
                  y: [0, -300],
                  x: [0, Math.sin(i) * 100]
                }}
                transition={{ 
                  duration: 8 + i * 2, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                className="absolute text-blue-400/10"
                style={{ 
                  left: `${10 + i * 6}%`, 
                  top: "70%" 
                }}
              >
                <Droplets className="w-20 h-20" />
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
              <div className="w-6 md:w-10 h-[1px] bg-blue-500" />
              <span className="text-blue-500 font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs">The Jungle is Calling</span>
              <div className="w-6 md:w-10 h-[1px] bg-blue-500" />
            </motion.div>
 
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-8 md:mb-14 leading-tight md:leading-none tracking-tighter"
            >
              Reconnect with <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-emerald-400 to-cyan-300">Nature's Hidden Wonders</span>
            </motion.h2>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl lg:text-3xl text-blue-50/60 font-light mb-12 md:mb-24 max-w-3xl mx-auto leading-relaxed"
            >
              Reserve your spot in our exclusive rainforest expedition and witness the raw power and beauty of Sri Lanka's waterfalls.
            </motion.p>
            
            <BookingCTAButton
              confettiPalette="blue"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-16 py-4 md:py-8 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full font-bold text-base md:text-2xl transition-all duration-700 shadow-[0_0_80px_rgba(37,99,235,0.4)] hover:shadow-[0_0_120px_rgba(37,99,235,0.6)] flex items-center gap-4 md:gap-8 mx-auto uppercase tracking-widest"
            >
              <span>Book Expedition</span>
              <ArrowRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-4 transition-transform duration-500" />
            </BookingCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
