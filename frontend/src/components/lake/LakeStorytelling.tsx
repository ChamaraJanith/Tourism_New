"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    title: "The Silent Navigator",
    subtitle: "Boat Riding Heritage",
    content:
      "Our traditional boat rides are more than just a trip; they are a bridge to the past. Glide with local guides through calm waters and lush mangrove corridors—you'll feel the same rhythm of life that has sustained this village for generations.",
    image: "/images/lake/3.jpg",
    stats: [
      { label: "Boat Craftsmen", value: "3rd Gen" },
      { label: "Quiet Propulsion", value: "100%" },
    ],
  },
  {
    title: "Nature's Mirror",
    subtitle: "Biodiversity Sanctuary",
    content: "Dandeniya Lake is a living, breathing ecosystem. From the majestic eagle circling above to the silver dance of fish below, every moment reveals a new secret of Sri Lanka's rich natural heritage.",
    image: "/images/lake/8.webp",
    stats: [
      { label: "Bird Species", value: "45+" },
      { label: "Lake Area (Acres)", value: "120" }
    ]
  }
];

export const LakeStorytelling = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
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
          className="relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
        >
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
        
        {/* Floating Accent Card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`absolute bottom-8 ${isEven ? "right-4 lg:-right-8" : "left-4 lg:-left-8"} hidden md:block p-6 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl z-20`}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
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
