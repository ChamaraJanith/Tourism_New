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
          <div className="relative z-10 flex flex-1 items-center px-6 pb-12 pt-28 sm:px-12 sm:pb-16 lg:px-16 lg:pb-44 lg:pt-24 pointer-events-none">
            <div className="grid w-full max-w-screen-2xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.div
                className="lg:col-span-7"
              >
 
                <h1 className="mt-5 max-w-2xl text-balance text-3xl font-black uppercase leading-[0.96] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl xl:text-6xl">
                  Crafted journeys for
                  <span className="block text-[#f2c14f]">
                    modern
                    <span className="block">explorers</span>
                  </span>
                </h1>
                <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/80 sm:text-sm">
                  Discover unforgettable journeys where nature, culture, and adventure come together in perfect harmony.
                  Turn every trip into a timeless story worth remembering.
                </p>
 
                <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4 pointer-events-auto">
                  <BespokeButton variant="dark" href="/auth" className="!px-10 !py-4">
                    Start Your Journey
                    <ChevronDown size={14} className="-rotate-90 ml-2" />
                  </BespokeButton>
                  <BespokeButton variant="secondary" href="/lifestyle-experiences" className="!px-10 !py-4 !bg-black/25 !backdrop-blur-xl">
                    Explore Destinations
                  </BespokeButton>
                </div>
              </motion.div>
 
              <motion.div
                className="hidden lg:absolute lg:right-16 lg:top-1/2 lg:z-20 lg:flex lg:-translate-y-1/2"
              >
                <div className="w-full max-w-sm rounded-[1.8rem] border border-white/20 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)]">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-white/65">
                    Curated Excellence
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">120+</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Premium Routes
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">4.9</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Guest Rating
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">24/7</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Concierge
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">18K</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Elite Travelers
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
