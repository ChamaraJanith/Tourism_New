"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LakeHero } from "@/components/lake/LakeHero";
import { LakeShowcase } from "@/components/lake/LakeShowcase";
import { LakeStorytelling } from "@/components/lake/LakeStorytelling";
import { LakeTimeline } from "@/components/lake/LakeTimeline";
import { LakeGallery } from "@/components/lake/LakeGallery";
import { WhyTouristsLoveLake } from "@/components/lake/WhyTouristsLoveLake";
import { LakeTestimonials } from "@/components/lake/LakeTestimonials";
import { LakeBookingCTA } from "@/components/lake/LakeBookingCTA";
import { Waves } from "lucide-react";

export default function DandeniyaLakePage() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#111416] text-white selection:bg-blue-500/30 selection:text-blue-400">
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
                className="w-48 h-48 rounded-full border-2 border-blue-500/5 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full border-t-2 border-blue-500 animate-spin" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Waves className="w-12 h-12 text-blue-500 animate-bounce" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-16 text-blue-500/40 uppercase tracking-[0.8em] text-[10px] font-bold"
            >
              Setting Sail...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>


          <LakeHero />
          
          <div className="relative z-10">
            <LakeShowcase />
            <LakeStorytelling />
            <LakeTimeline />
            <LakeGallery />
            <WhyTouristsLoveLake />
            <LakeTestimonials />
            <LakeBookingCTA />
          </div>
        </>
      )}
    </main>
  );
}
