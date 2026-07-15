"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FoodHero } from "@/components/food/FoodHero";
import { SuperfoodsShowcase } from "@/components/food/SuperfoodsShowcase";
import { FoodStorytelling } from "@/components/food/FoodStorytelling";
import { FoodTimeline } from "@/components/food/FoodTimeline";
import { FoodGallery } from "@/components/food/FoodGallery";
import { FoodWhyTouristsLove } from "@/components/food/FoodWhyTouristsLove";
import { FoodTestimonials } from "@/components/food/FoodTestimonials";
import { FoodBookingCTA } from "@/components/food/FoodBookingCTA";
import { CustomCursor, ScrollProgress } from "@/components/farming/PremiumInteractions";
import { Salad } from "lucide-react";

export default function OrganicSuperfoodsPage() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate loading for high-end feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#0a0c0e] text-white selection:bg-amber-500/30 selection:text-amber-400">
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
                className="w-48 h-48 rounded-full border-2 border-amber-500/5 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-t-2 border-amber-500 animate-spin" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Salad className="w-12 h-12 text-amber-500 animate-bounce" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-amber-500/60 uppercase tracking-[0.8em] text-[10px] font-bold text-center px-4"
            >
              Preparing your wellness sanctuary
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          <CustomCursor />



          <FoodHero />
          
          <div className="relative z-10">
            <SuperfoodsShowcase />
            <FoodStorytelling />
            <FoodTimeline />
            <FoodGallery />
            <FoodWhyTouristsLove />
            <FoodTestimonials />
            <FoodBookingCTA />
          </div>
        </>
      )}
    </main>
  );
}
