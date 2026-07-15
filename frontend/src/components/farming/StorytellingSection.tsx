"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    title: "Liquid Gold",
    subtitle: "Bee Farming",
    content: "Immerse yourself in the gentle buzz of our wild sanctuary. Witness how village apiarists extract raw, golden honey using centuries-old methods, preserving the delicate balance of tropical flora and nature's finest pollinators.",
    image: "/images/farm/6.jpg",
    stats: [
      { label: "Active Colonies", value: "80+" },
      { label: "Pure Wild Honey", value: "100%" }
    ]
  },
  {
    title: "Tree of Life",
    subtitle: "Coconut Harvesting",
    content: "Scale the heights or watch in awe as masters of the tree harvest the versatile coconut. Every part of this tree tells a story of survival and sustainability in village life.",
    image: "/images/farm/4.jpg",
    stats: [
      { label: "Daily Uses", value: "99+" },
      { label: "Harvest Cycles", value: "45 Days" }
    ]
  },
  {
    title: "Verdant Hills of Tea",
    subtitle: "Tea Plantation",
    content: "Follow the mist as it rolls over emerald plantations. Learn the delicate art of plucking two leaves and a bud, and witness the transformation from fresh leaf to the world's finest brew.",
    image: "/images/farm/17.webp",
    stats: [
      { label: "Elevation (ft)", value: "6,000" },
      { label: "Export Quality", value: "100%" }
    ]
  },
  {
    title: "The Golden Harvest",
    subtitle: "Paddy Cultivation",
    content: "Step into the mud-kissed fields where generations of Sri Lankan farmers have nurtured the island's lifeblood. Experience the rhythmic dance of the harvest and the communal spirit of the 'Kamatha'.",
    image: "/images/farm/2.jpg",
    stats: [
      { label: "Centuries of Tradition", value: "2500+" },
      { label: "Rice Varieties", value: "300+" }
    ]
  },
  {
    title: "Harmony of the Wetlands",
    subtitle: "Duck Village",
    content: "Stroll through the gentle streams where hundreds of ducks play a vital role in our organic agricultural circle. Discover the natural partnership between these feathered guardians and our emerald paddy fields, illustrating a perfect, self-sustaining ecosystem.",
    image: "/images/farm/1.jpg",
    stats: [
      { label: "Feathered Helpers", value: "300+" },
      { label: "Eco-Integration", value: "Perfect" }
    ]
  }
];

export const StorytellingSection = () => {
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

      {/* Content Section */}
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-emerald-500 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
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
