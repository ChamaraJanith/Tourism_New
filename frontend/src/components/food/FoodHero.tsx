"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Utensils } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FarmingParticles as FoodParticles } from "../farming/FarmingParticles";

export const FoodHero = () => {
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
          className="h-full w-full object-cover scale-105"
        >
          <source src="/videos/organic_food_hero.mp4" type="video/mp4" />
          <img src="/images/food/1.webp" alt="Food Hero" className="h-full w-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#0d0f11]" />
      </div>

      {/* Wellness Particles */}
      <FoodParticles />

      <div ref={textRef} className="relative z-20 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 animate-text leading-tight">
          Taste the Soul of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-emerald-500">
            Organic Sri Lanka
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-12 animate-text font-light leading-relaxed">
          Experience farm-fresh superfoods, herbal wellness, traditional village cooking, and authentic organic living in a sanctuary of health.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-text">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all duration-500 flex items-center gap-3 overflow-hidden shadow-2xl shadow-emerald-900/30 cursor-pointer"
          >
            <span className="relative z-10">Explore Superfoods</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
          
          <button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full font-bold transition-all duration-500 flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-white text-white ml-1" />
            </div>
            <span>Watch Experience</span>
          </button>
        </div>
      </div>
    </section>
  );
};
