"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bike, Sparkles, Sprout } from "lucide-react";
import { BookingCTAButton } from "@/components/ui/BookingCTAButton";

export const BicycleBookingCTA = () => {
  return (
    <section id="booking" className="py-16 md:py-40 px-4 md:px-6 bg-[#111416]">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] md:rounded-[5rem] overflow-hidden bg-[#0d1310] p-8 sm:p-16 md:p-24 lg:p-36 text-center border border-white/10 shadow-[0_80px_200px_-50px_rgba(0,0,0,0.9)]">
          {/* Animated Trail Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.15)_0%,transparent_60%)]" />
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.3, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-emerald-500/10 blur-[200px] rounded-full"
            />
          </div>
 
          {/* Floating Trail Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: [0.5, 2],
                  y: [0, -200],
                }}
                transition={{ 
                  duration: 10 + i * 2, 
                  repeat: Infinity, 
                  delay: i * 1.2,
                  ease: "easeOut"
                }}
                className="absolute text-emerald-500/10"
                style={{ 
                  left: `${10 + i * 8}%`, 
                  top: "60%" 
                }}
              >
                <Bike className="w-40 h-40" />
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
              <div className="w-6 md:w-10 h-[1px] bg-emerald-500" />
              <span className="text-emerald-500 font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs">Your Adventure Awaits</span>
              <div className="w-6 md:w-10 h-[1px] bg-emerald-500" />
            </motion.div>
 
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-8 md:mb-14 leading-tight md:leading-none tracking-tighter"
            >
              Start Your Cycling <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">Adventure Through Paradise</span>
            </motion.h2>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl lg:text-3xl text-emerald-50/60 font-light mb-12 md:mb-24 max-w-3xl mx-auto leading-relaxed"
            >
              Reserve your premium bicycle tour and experience the authentic heart of Sri Lanka on two wheels.
            </motion.p>
            
            <BookingCTAButton
              confettiPalette="emerald"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-16 py-4 md:py-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold text-base md:text-2xl transition-all duration-700 shadow-[0_0_80px_rgba(16,185,129,0.4)] hover:shadow-[0_0_120px_rgba(16,185,129,0.6)] flex items-center gap-4 md:gap-8 mx-auto uppercase tracking-widest"
            >
              <span>Book Your Trail</span>
              <ArrowRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-4 transition-transform duration-500" />
            </BookingCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
