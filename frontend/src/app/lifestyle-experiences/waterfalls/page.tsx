"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaterfallHero } from "@/components/waterfall/WaterfallHero";
import { WaterfallShowcase } from "@/components/waterfall/WaterfallShowcase";
import { WaterfallStorytelling } from "@/components/waterfall/WaterfallStorytelling";
import { WaterfallTimeline } from "@/components/waterfall/WaterfallTimeline";
import { WaterfallGallery } from "@/components/waterfall/WaterfallGallery";
import { WaterfallWellness } from "@/components/waterfall/WaterfallWellness";
import { WaterfallTestimonials } from "@/components/waterfall/WaterfallTestimonials";
import { WaterfallBookingCTA } from "@/components/waterfall/WaterfallBookingCTA";
import { CustomCursor } from "@/components/farming/PremiumInteractions";
import { Droplets } from "lucide-react";

export default function WaterfallsExperiencePage() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate high-end loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#0a0c0e] text-white selection:bg-blue-500/30 selection:text-blue-300">
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
                className="w-48 h-48 rounded-full border-2 border-blue-400/5 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-t-2 border-blue-400 animate-spin" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Droplets className="w-12 h-12 text-blue-400 animate-bounce" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-blue-400/40 uppercase tracking-[0.8em] text-[10px] font-bold"
            >
              Descending to the falls
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>



          <WaterfallHero />
          
          <div className="relative z-10">
            <WaterfallShowcase />
            <WaterfallStorytelling />
            <WaterfallTimeline />
            <WaterfallGallery />
            <WaterfallWellness />
            <WaterfallTestimonials />
            <WaterfallBookingCTA />
          </div>
        </>
      )}
    </main>
  );
}
