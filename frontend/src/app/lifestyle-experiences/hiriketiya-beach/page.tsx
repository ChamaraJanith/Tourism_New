"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SurfHero } from "@/components/surf/SurfHero";
import { SurfShowcase } from "@/components/surf/SurfShowcase";
import { SurfStorytelling } from "@/components/surf/SurfStorytelling";
import { SurfTimeline } from "@/components/surf/SurfTimeline";
import { SurfGallery } from "@/components/surf/SurfGallery";
import { SurfWhyTouristsLove } from "@/components/surf/SurfWhyTouristsLove";
import { SurfTestimonials } from "@/components/surf/SurfTestimonials";
import { SurfBookingCTA } from "@/components/surf/SurfBookingCTA";
import { Waves } from "lucide-react";

export default function HiriketiyaSurfPage() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate high-end loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#0a0c10] text-white selection:bg-cyan-500/30 selection:text-cyan-300">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a0c10] flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-2 border-cyan-400/5 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-t-2 border-cyan-400 animate-spin" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Waves className="w-12 h-12 text-cyan-400 animate-bounce" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-cyan-400/40 uppercase tracking-[0.8em] text-[10px] font-bold"
            >
              Catching the perfect wave
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>



          <SurfHero />
          
          <div className="relative z-10">
            <SurfShowcase />
            <SurfStorytelling />
            <SurfTimeline />
            <SurfGallery />
            <SurfWhyTouristsLove />
            <SurfTestimonials />
            <SurfBookingCTA />
          </div>
        </>
      )}
    </main>
  );
}
