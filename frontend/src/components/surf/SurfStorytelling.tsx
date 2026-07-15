"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    title: "Morning Surf Flow",
    subtitle: "Coastal Sunrise",
    content: "Wake up to the sound of breaking waves. Start your day with a guided surf session as the first light hits the golden bay, followed by fresh coconut water on the sand.",
    image: "/images/hirikatiya/1.webp",
    stats: [
      { label: "Wave Height (ft)", value: "3-6" },
      { label: "Water Temp (°C)", value: "28" }
    ]
  },
  {
    title: "Golden Hour Magic",
    subtitle: "Beachside Bliss",
    content: "When the sky turns into a masterpiece of orange and pink, the bay becomes a sanctuary. Enjoy a sunset yoga session or a relaxed paddle as the day ends in paradise.",
    image: "/images/hirikatiya/11.jpg",
    stats: [
      { label: "Sunset Sessions", value: "Daily" },
      { label: "Beach Length", value: "400m" }
    ]
  },
  {
    title: "Tropical Café Life",
    subtitle: "Community Culture",
    content: "Hiriketiya is more than just waves. It's a community of dreamers and adventurers. Spend your afternoons in our iconic beach cafés, working or connecting with fellow travelers.",
    image: "/images/hirikatiya/10.jpg",
    stats: [
      { label: "Beach Cafés", value: "12+" },
      { label: "Community Vibe", value: "Epic" }
    ]
  }
];

export const SurfStorytelling = () => {
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
                <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-cyan-400 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">{story.subtitle}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">{story.title}</h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light mb-10 max-w-xl">{story.content}</p>
        </motion.div>
      </div>
    </div>
  );
};
