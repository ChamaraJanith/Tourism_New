"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { YogaHero } from "@/components/yoga/YogaHero";
import { YogaShowcase } from "@/components/yoga/YogaShowcase";
import { YogaStorytelling } from "@/components/yoga/YogaStorytelling";
import { YogaTimeline } from "@/components/yoga/YogaTimeline";
import { YogaGallery } from "@/components/yoga/YogaGallery";
import { AyurvedicHealing } from "@/components/yoga/AyurvedicHealing";
import { YogaTestimonials } from "@/components/yoga/YogaTestimonials";
import { YogaBookingCTA } from "@/components/yoga/YogaBookingCTA";
import { CustomCursor } from "@/components/farming/PremiumInteractions";
import { Flower2 } from "lucide-react";

export default function YogaWellnessExperiencePage() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate high-end loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#0a0c0e] text-white selection:bg-amber-500/30 selection:text-amber-300">
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
                className="w-48 h-48 rounded-full border-2 border-amber-400/5 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-t-2 border-amber-400 animate-spin" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flower2 className="w-12 h-12 text-amber-400 animate-bounce" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-amber-400/40 uppercase tracking-[0.8em] text-[10px] font-bold"
            >
              Awakening the soul
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>



          <YogaHero />
          
          <div className="relative z-10">
            <YogaShowcase />
            <YogaStorytelling />
            <YogaTimeline />
            <YogaGallery />
            <AyurvedicHealing />
            <YogaTestimonials />
            <YogaBookingCTA />
          </div>
        </>
      )}
    </main>
  );
}
