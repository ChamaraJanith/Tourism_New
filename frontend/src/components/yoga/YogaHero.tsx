"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Sprout } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FarmingParticles as SpiritualParticles } from "../farming/FarmingParticles";

export const YogaHero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.querySelectorAll(".animate-text"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" }
    );
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/yoga/1.avif"
          className="h-full w-full object-cover"
        >
          <source src="/videos/yoga_hero.mp4" type="video/mp4" />
          <img src="/images/yoga/1.avif" alt="Yoga Hero" className="h-full w-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-[#0a0c0e]" />
      </div>

      {/* Spiritual Particles */}
      <SpiritualParticles />

      <div ref={textRef} className="relative z-20 container mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-10 animate-text leading-tight tracking-tighter">
          Awaken Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100">
            Inner Peace
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-amber-50/80 mb-16 animate-text font-light leading-relaxed">
          Experience yoga, Ayurveda, meditation, and ancient healing rituals in the heart of Sri Lanka&apos;s tropical sanctuaries.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-text">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-2xl shadow-amber-900/20 cursor-pointer"
          >
            <span className="relative z-10">Book Wellness Retreat</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-full font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Explore Spiritual Paths</span>
          </button>
        </div>
      </div>
    </section>
  );
};
