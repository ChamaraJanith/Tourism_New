"use client";

import { motion } from "framer-motion";
import { Soup, Droplets, UtensilsCrossed, Apple, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Herbal Drinks",
    description: "Rejuvenate with ancient elixirs made from forest-fresh herbs and flowers.",
    icon: Droplets,
    image: "/images/food/2.jpg",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "group-hover:border-emerald-500/50",
  },
  {
    title: "Village Cooking",
    description: "Learn the secrets of clay-pot cooking over an open wood fire.",
    icon: UtensilsCrossed,
    image: "/images/food/3.jpg",
    color: "from-orange-600/20 to-red-600/20",
    borderColor: "group-hover:border-orange-500/50",
  },
  {
    title: "Ayurvedic Foods",
    description: "Balanced meals designed to heal the body and nourish the mind.",
    icon: Heart,
    image: "/images/food/4.jpg",
    color: "from-purple-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-purple-500/50",
  },
  {
    title: "Organic Fruits",
    description: "Taste the vibrant sweetness of sun-ripened tropical super-fruits.",
    icon: Apple,
    image: "/images/food/5.jpg",
    color: "from-yellow-500/20 to-lime-500/20",
    borderColor: "group-hover:border-yellow-500/50",
  },
  {
    title: "Detox Meals",
    description: "Cleanse your system with fiber-rich, traditional organic porridges.",
    icon: Soup,
    image: "/images/food/1.webp",
    color: "from-green-600/20 to-emerald-800/20",
    borderColor: "group-hover:border-green-500/50",
  },
];

export const SuperfoodsShowcase = () => {
  return (
    <section className="py-24 bg-[#111416] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 font-medium tracking-[0.2em] uppercase text-sm"
          >
            Curated Culinary Wellness
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6"
          >
            The Alchemy of Nature
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
            >
              <div className="h-full">
                <div className={cn(
                  "group relative h-[500px] rounded-3xl overflow-hidden border border-white/5 transition-all duration-500",
                  exp.borderColor
                )}>
                  {/* Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500", exp.color)} />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="mb-6 p-3 w-fit rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <exp.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-display font-bold text-white mb-3">{exp.title}</h3>
                    <p className="text-gray-300 font-light mb-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {exp.description}
                    </p>
                  </div>

                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-amber-500/50 via-transparent to-amber-500/50 blur-sm rounded-3xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
