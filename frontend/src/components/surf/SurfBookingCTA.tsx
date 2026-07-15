"use client";

import { motion } from "framer-motion";
import { ArrowRight, Waves, Zap } from "lucide-react";
import { BookingCTAButton } from "@/components/ui/BookingCTAButton";

export const SurfBookingCTA = () => {
  return (
    <section id="booking" className="py-16 md:py-40 px-4 md:px-6 bg-[#111416]">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] md:rounded-[5rem] overflow-hidden bg-[#0d1117] p-8 sm:p-16 md:p-24 lg:p-36 text-center border border-white/10 shadow-[0_60px_150px_-30px_rgba(0,0,0,0.8)]">
          {/* Ocean Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-1/3 left-1/3 w-1/2 h-1/2 bg-cyan-500/10 blur-[180px] rounded-full"
            />
          </div>
 
          {/* Floating Wave Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -100 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  x: [0, 500],
                  y: [0, Math.sin(i) * 50],
                }}
                transition={{ 
                  duration: 8 + i * 2, 
                  repeat: Infinity, 
                  delay: i * 1.5,
                  ease: "linear"
                }}
                className="absolute text-cyan-400/20"
                style={{ 
                  top: `${10 + i * 10}%`, 
                  left: "-10%" 
                }}
              >
                <Waves className="w-12 h-12" />
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
              <div className="w-6 md:w-10 h-[1px] bg-cyan-400" />
              <span className="text-cyan-400 font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs">Seasonal Sessions Now Open</span>
              <div className="w-6 md:w-10 h-[1px] bg-cyan-400" />
            </motion.div>
 
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-8 md:mb-12 leading-tight md:leading-none tracking-tighter"
            >
              Start Your Surf <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500">Adventure Today</span>
            </motion.h2>
 
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-2xl lg:text-3xl text-cyan-50/60 font-light mb-12 md:mb-20 max-w-3xl mx-auto leading-relaxed"
            >
              Whether you're standing up for the first time or carving the tropical barrels, Hiriketiya is the bay you'll never want to leave.
            </motion.p>
            
            <BookingCTAButton
              confettiPalette="cyan"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-16 py-4 md:py-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-bold text-base md:text-2xl transition-all duration-500 shadow-[0_0_80px_rgba(34,211,238,0.4)] hover:shadow-[0_0_100px_rgba(34,211,238,0.6)] flex items-center gap-4 md:gap-6 mx-auto uppercase tracking-widest"
            >
              <span>Book Experience</span>
              <ArrowRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-3 transition-transform" />
            </BookingCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
