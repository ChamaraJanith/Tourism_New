"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    title: "Hidden Cascades",
    subtitle: "Into the Mist",
    content: "Venture deep into the mist-covered valleys where ancient stones meet falling water. Our secret trails lead to pristine cascades untouched by modern maps.",
    image: "/images/waterfall/5.jpg",
    stats: [
      { label: "Hidden Falls", value: "7" },
      { label: "Trail Difficulty", value: "Medium" }
    ]
  },
  {
    title: "Natural Sanctuary",
    subtitle: "Stone & Serenity",
    content: "Experience the healing power of negative ions as you relax in natural stone pools. The rhythmic pulse of the waterfall creates a sanctuary of absolute peace.",
    image: "/images/waterfall/2.webp",
    stats: [
      { label: "Natural Pools", value: "5" },
      { label: "Ion Density", value: "10x" }
    ]
  },
  {
    title: "Rainforest Life",
    subtitle: "Lush Canopy",
    content: "The environment around the falls is a vibrant explosion of biodiversity. Witness rare endemic orchids and colorful tropical birds in their misty habitat.",
    image: "/images/waterfall/4.jpg",
    stats: [
      { label: "Endemic Species", value: "60+" },
      { label: "Canopy Cover", value: "95%" }
    ]
  }
];

export const WaterfallStorytelling = () => {
  return (
    <section className="py-24 bg-[#111416] overflow-hidden">
      <div className="container mx-auto px-6">
        {stories.map((story, index) => (
          <StoryItem key={index} story={story} index={index} />
        ))}
      </div>
    </section>
  );
};

const StoryItem = ({ story, index }: { story: any, index: number }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const isEven = index % 2 === 0;

  return (
    <div ref={containerRef} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32 last:mb-0 ${isEven ? "" : "lg:flex-row-reverse"}`}>
      {/* Image Section */}
      <div className="relative w-full lg:w-1/2 group">
        <motion.div
          style={{ y }}
          className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
        >
          <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
        
        {/* Floating Accent Card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`absolute bottom-8 ${isEven ? "-right-8" : "-left-8"} hidden md:block p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-20`}
        >
          <div className="flex gap-8">
            {story.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
            {story.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
            {story.title}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light mb-10 max-w-xl">
            {story.content}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
