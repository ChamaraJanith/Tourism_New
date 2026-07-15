"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FarmingHero } from "@/components/farming/FarmingHero";
import { ExperienceShowcase } from "@/components/farming/ExperienceShowcase";
import { StorytellingSection } from "@/components/farming/StorytellingSection";
import { ExperienceTimeline } from "@/components/farming/ExperienceTimeline";
import { PremiumGallery } from "@/components/farming/PremiumGallery";
import { WhyTouristsLove } from "@/components/farming/WhyTouristsLove";
import { Testimonials } from "@/components/farming/Testimonials";
import { BookingCTA } from "@/components/farming/BookingCTA";
import { Sprout } from "lucide-react";

export default function TraditionalFarmingPage() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#111416] text-white selection:bg-emerald-500/30 selection:text-emerald-400">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0d0f11] flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-2 border-emerald-500/5 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-t-2 border-emerald-500 animate-spin" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sprout className="w-12 h-12 text-emerald-500 animate-bounce" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-emerald-500/40 uppercase tracking-[0.8em] text-[10px] font-bold text-center px-4"
            >
              Preparing your journey
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>



          <FarmingHero />
          
          <div className="relative z-10">
            <ExperienceShowcase />
            <StorytellingSection />
            <ExperienceTimeline />
            <PremiumGallery />
            <WhyTouristsLove />
            <Testimonials />
            <BookingCTA />
          </div>
        </>
      )}
    </main>
  );
}
