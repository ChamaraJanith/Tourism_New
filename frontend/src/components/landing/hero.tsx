"use client";
 
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "@/components/ui/Icons";
import { BespokeButton } from "@/components/ui/BespokeButton";
 
export function Hero() {
  const ref = useRef<HTMLElement>(null);
 
  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen lg:h-screen w-full overflow-visible lg:overflow-hidden bg-[#111416] pb-12 lg:pb-0"
    >
      {/* ── Framed card ── */}
      <div className="relative mx-auto h-full w-full overflow-visible">
        <div className="relative flex min-h-screen lg:h-full w-full flex-col overflow-visible lg:overflow-hidden">
 
          {/* ── BG Video ── */}
          <motion.div
            id="hero-video-wrap"
            className="absolute inset-0 z-0 bg-[#111416]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center transition-opacity duration-1000"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </motion.div>
 
          {/* ── HERO CONTENT AREA ── */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 sm:px-12 lg:px-16 pointer-events-none">
            <div className="w-full max-w-screen-2xl flex flex-col items-center text-center mt-48 lg:mt-80">
              <motion.div
                className="w-full"
              >
 
                <h1 className="mt-5 text-balance text-3xl font-black uppercase leading-[1.2] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl xl:text-6xl">
                  Crafted journeys for <span className="text-[#f2c14f]">modern explorers</span>
                </h1>
                <p className="mt-4 max-w-4xl mx-auto text-xl leading-relaxed text-white/80 sm:text-2xl lg:text-3xl font-medium">
                  Discover unforgettable journeys where nature, culture, and adventure come together in perfect harmony.
                  Turn every trip into a timeless story worth remembering.
                </p>
 
                <div className="mt-8 flex flex-wrap justify-center items-center gap-4 pointer-events-auto">
                  <BespokeButton variant="dark" href="/auth" className="!px-10 !py-4">
                    Start Your Journey
                    <ChevronDown size={14} className="-rotate-90 ml-2" />
                  </BespokeButton>
                  <BespokeButton variant="secondary" href="/lifestyle-experiences" className="!px-10 !py-4 !bg-black/25 !backdrop-blur-xl">
                    Explore Destinations
                  </BespokeButton>
                </div>
              </motion.div>
 
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
