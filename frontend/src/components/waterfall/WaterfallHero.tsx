"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Waves, Droplets } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FarmingParticles as MistParticles } from "../farming/FarmingParticles";

export const WaterfallHero = () => {
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
          className="h-full w-full object-cover"
        >
          <source src="/videos/waterfall_hero.mp4" type="video/mp4" />
          <img src="/images/waterfall/2.webp" alt="Waterfall Hero" className="h-full w-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-[#0a0c0e]" />
      </div>

      {/* Mist Particles */}
      <MistParticles />

      <div ref={textRef} className="relative z-20 container mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-10 animate-text leading-tight tracking-tighter">
          Chase the Hidden <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-indigo-500">
            Waterfalls
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-blue-50/80 mb-16 animate-text font-light leading-relaxed">
          Discover the secret cascades of Sri Lanka&apos;s tropical rainforests. Experience nature&apos;s power and serenity in its purest form.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-text">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-2xl shadow-blue-900/20 cursor-pointer"
          >
            <span className="relative z-10">Book Waterfall Tour</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-full font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Explore Hidden Trails</span>
          </button>
        </div>
      </div>
    </section>
  );
};
