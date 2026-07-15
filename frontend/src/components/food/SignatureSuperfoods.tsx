"use client";

import { motion } from "framer-motion";
import { Sparkles, Leaf, Zap, Droplets, Heart } from "lucide-react";

const superfoods = [
  {
    name: "Ceylon Cinnamon",
    title: "The Golden Bark",
    desc: "True Ceylon Cinnamon is a metabolic powerhouse and an ancient blood purifier.",
    icon: Sparkles,
    color: "from-amber-700/20 to-orange-900/20",
    image: "/images/farm/21.jpg"
  },
  {
    name: "Moringa",
    title: "The Miracle Tree",
    desc: "Ounce for ounce, Moringa contains more protein than yogurt and more iron than spinach.",
    icon: Leaf,
    color: "from-emerald-700/20 to-green-900/20",
    image: "/images/food/4.jpg"
  },
  {
    name: "King Coconut",
    title: "Nature's Saline",
    desc: "Harvested only in Sri Lanka, it's the ultimate natural hydrator and electrolyte source.",
    icon: Droplets,
    color: "from-amber-500/20 to-yellow-600/20",
    image: "/images/farm/2.jpg"
  },
  {
    name: "Red Rice Porridge",
    title: "The Healer's Bowl",
    desc: "Traditional 'Kanda' made with forest herbs for deep internal cleansing and gut health.",
    icon: Heart,
    color: "from-red-800/20 to-rose-900/20",
    image: "/images/food/1.webp"
  }
];

export const SignatureSuperfoods = () => {
  return (
    <section className="py-32 bg-[#111416] relative overflow-hidden">
      {/* Decorative Canvas elements could be added here */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Nature's Medicine</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8">Signature Superfoods</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            Rediscover the ancient healing wisdom locked within Sri Lanka's most powerful organic ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {superfoods.map((food, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative p-6 sm:p-8 rounded-[2rem] md:rounded-[3rem] h-full bg-gradient-to-br ${food.color} border border-white/5 backdrop-blur-xl overflow-hidden transition-all duration-700 group-hover:border-amber-500/30 group-hover:-translate-y-2`}>
                {/* Background Image Overlay */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover grayscale" />
                </div>

                <div className="relative z-10">
                  <div className="mb-8 w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-500">
                    <food.icon className="w-8 h-8" />
                  </div>
                  
                  <span className="text-amber-500/60 font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">{food.title}</span>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">{food.name}</h3>
                  <p className="text-gray-400 font-light leading-relaxed text-sm mb-8">
                    {food.desc}
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/10 mb-6 group-hover:bg-amber-500/30 transition-colors" />
                  <span className="text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                    Learn Alchemy <Zap className="w-3 h-3 text-amber-500" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
