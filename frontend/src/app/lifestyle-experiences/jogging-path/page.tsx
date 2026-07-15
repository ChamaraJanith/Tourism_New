"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JoggingHero } from "@/components/jogging/JoggingHero";
import { JoggingShowcase } from "@/components/jogging/JoggingShowcase";
import { JoggingStorytelling } from "@/components/jogging/JoggingStorytelling";
import { JoggingTimeline } from "@/components/jogging/JoggingTimeline";
import { JoggingGallery } from "@/components/jogging/JoggingGallery";
import { WellnessFitness } from "@/components/jogging/WellnessFitness";
import { JoggingTestimonials } from "@/components/jogging/JoggingTestimonials";
import { JoggingBookingCTA } from "@/components/jogging/JoggingBookingCTA";
import { CustomCursor, ScrollProgress } from "@/components/farming/PremiumInteractions";
import { Footprints } from "lucide-react";

export default function NatureJoggingPage() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate high-end loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#0a0c0e] text-white selection:bg-emerald-500/30 selection:text-emerald-300">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a0c0e] flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-2 border-emerald-400/5 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-t-2 border-emerald-400 animate-spin" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Footprints className="w-12 h-12 text-emerald-400 animate-bounce" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-emerald-400/40 uppercase tracking-[0.8em] text-[10px] font-bold text-center px-4"
            >
              Preparing your vitality trail
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          <CustomCursor />



          <JoggingHero />
          
          <div className="relative z-10">
            <JoggingShowcase />
            <JoggingStorytelling />
            <JoggingTimeline />
            <JoggingGallery />
            <WellnessFitness />
            <JoggingTestimonials />
            <JoggingBookingCTA />
          </div>
        </>
      )}
    </main>
  );
}
