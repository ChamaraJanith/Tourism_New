"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    title: "The Sunrise Pulse",
    subtitle: "Lakeside Rhythms",
    content: "There is a unique stillness at dawn. Experience the rhythmic sound of your steps meeting the earth as the lake mist clears, revealing a paradise untouched by time.",
    image: "/images/jogging/1.jpg",
    stats: [
      { label: "Trail Length", value: "12 km" },
      { label: "Elevation Gain", value: "120m" }
    ]
  },
  {
    title: "Deep Forest Immersion",
    subtitle: "Tropical Canopy",
    content: "Run beneath the ancient shades of the tropical forest. Our trails are designed to maximize oxygen intake, surrounding you with healing phytoncides from the exotic greenery.",
    image: "/images/jogging/3.jpg",
    stats: [
      { label: "Oxygen Purity", value: "98%" },
      { label: "Tree Species", value: "150+" }
    ]
  },
  {
    title: "Mindful Recovery",
    subtitle: "Wellness Philosophy",
    content: "Jogging is more than fitness; it's moving meditation. Discover strategically placed viewpoints designed for deep breathing exercises and post-run reflection.",
    image: "/images/jogging/9.jpg",
    stats: [
      { label: "Rest Stations", value: "8" },
      { label: "Recovery Rate", value: "2x" }
    ]
  }
];

export const JoggingStorytelling = () => {
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
      <div className="relative w-full lg:w-1/2 group">
        <motion.div
          style={{ y }}
          className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
        >
          <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`absolute bottom-8 ${isEven ? "-right-8" : "-left-8"} hidden md:block p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-20`}
        >
          <div className="flex gap-8">
            {story.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-emerald-500">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-emerald-500 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">{story.subtitle}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">{story.title}</h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light mb-10 max-w-xl">{story.content}</p>
        </motion.div>
      </div>
    </div>
  );
};
