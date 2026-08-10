"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FarmingParticles } from "./FarmingParticles";

export const FarmingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/farm/5.jpg"
          className="h-full w-full object-cover scale-105"
        >
          <source src="/videos/farming_hero.mp4" type="video/mp4" />
          {/* Fallback image if video fails or doesn't exist */}
          <img src="/images/farm/5.jpg" alt="Farming Hero" className="h-full w-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#111416]" />
      </div>

      {/* Floating Particles (Three.js) */}
      <FarmingParticles />

      <div ref={textRef} className="relative z-20 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 animate-text leading-tight">
          Live the Soul of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
            Sri Lankan Farming
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 animate-text font-light">
          Harvest coconuts, walk through tea gardens, care for ducks, explore paddy fields, and discover village bee farming in an immersive luxury experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-text">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-2xl shadow-emerald-900/20 cursor-pointer"
          >
            <span className="relative z-10">Book Experience</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-full font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Explore Activities</span>
          </button>
        </div>
      </div>

    </section>
  );
};
