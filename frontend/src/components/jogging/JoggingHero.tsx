"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Heart, Sprout } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FarmingParticles as NatureParticles } from "../farming/FarmingParticles";

export const JoggingHero = () => {
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
          poster="/images/jogging/1.jpg"
          className="h-full w-full object-cover scale-105"
        >
          <source src="/videos/jogging_hero.mp4" type="video/mp4" />
          <img src="/images/jogging/1.jpg" alt="Jogging Hero" className="h-full w-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-emerald-950/20 to-[#0a0c0e]" />
      </div>

      {/* Floating Leaves/Particles */}
      <NatureParticles />

      <div ref={textRef} className="relative z-20 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-10 animate-text leading-tight tracking-tighter">
          Experience Nature <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-amber-300">
            Through Every Step
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-emerald-50/80 mb-16 animate-text font-light leading-relaxed">
          Jog through peaceful lakeside paths, tropical greenery, sunrise trails, and wellness-focused nature experiences in the heart of Sri Lanka.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-text w-full px-6">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-2xl shadow-emerald-900/20 cursor-pointer w-full max-w-[280px] sm:w-auto"
          >
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full max-w-[280px] sm:w-auto"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Watch Trails</span>
          </button>
        </div>
      </div>

      {/* Floating Organic Element */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"
      />

    </section>
  );
};
