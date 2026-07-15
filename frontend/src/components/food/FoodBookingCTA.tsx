"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { BookingCTAButton } from "@/components/ui/BookingCTAButton";

export const FoodBookingCTA = () => {
  return (
    <section id="booking" className="py-16 md:py-32 px-4 md:px-6 bg-[#111416]">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-[#0d0f11] p-8 sm:p-16 md:p-32 text-center border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
            <motion.div
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-amber-500/10 blur-[150px] rounded-full"
            />
          </div>
 
          {/* Floating Organic Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: [-20, -150],
                  x: [0, Math.sin(i) * 100],
                  rotate: [0, 180]
                }}
                transition={{ 
                  duration: 6 + i * 2, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
                className="absolute text-amber-500/20"
                style={{ 
                  left: `${10 + i * 12}%`, 
                  bottom: "5%" 
                }}
              >
                {i % 2 === 0 ? <Leaf className="w-10 h-10" /> : <Sparkles className="w-8 h-8" />}
              </motion.div>
            ))}
          </div>
 
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6 md:mb-8"
            >
              <div className="w-6 md:w-10 h-[1px] bg-amber-500" />
              <span className="text-amber-500 font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs">Start Your Renewal</span>
              <div className="w-6 md:w-10 h-[1px] bg-amber-500" />
            </motion.div>
 
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-white mb-6 md:mb-10 leading-tight"
            >
              Begin Your Organic <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Wellness Journey</span>
            </motion.h2>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl text-gray-400 font-light mb-10 md:mb-16 max-w-2xl mx-auto leading-relaxed"
            >
              Reserve your seat at our village table and experience the healing power of authentic Sri Lankan superfoods.
            </motion.p>
            
            <BookingCTAButton
              confettiPalette="amber"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full font-bold text-base md:text-xl transition-all duration-500 shadow-[0_0_60px_rgba(245,158,11,0.3)] hover:shadow-[0_0_80px_rgba(245,158,11,0.5)] flex items-center gap-2 md:gap-4 mx-auto"
            >
              <span>Book Wellness Experience</span>
              <ArrowRight className="w-5 h-5 md:w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </BookingCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
