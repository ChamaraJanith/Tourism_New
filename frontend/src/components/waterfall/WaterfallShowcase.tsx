"use client";

import { motion } from "framer-motion";
import { Mountain, Waves, Compass, Bird, Sunset } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Jungle Trekking",
    description: "Follow expert guides through dense tropical rainforests to discover hidden cascades.",
    icon: Mountain,
    image: "/images/waterfall/4.jpg",
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "group-hover:border-emerald-400/50",
  },
  {
    title: "Natural Pool Bathing",
    description: "Swim in crystal-clear natural pools formed by ancient stone at the base of the falls.",
    icon: Waves,
    image: "/images/waterfall/2.webp",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-400/50",
  },
  {
    title: "Hidden Falls Exploration",
    description: "Venture off the beaten path to reach secluded waterfalls known only to local villagers.",
    icon: Compass,
    image: "/images/waterfall/5.jpg",
    color: "from-teal-500/20 to-blue-600/20",
    borderColor: "group-hover:border-teal-400/50",
  },
  {
    title: "Wildlife Watching",
    description: "Spot endemic birds and primates that frequent the freshwater sources of the jungle.",
    icon: Bird,
    image: "/images/waterfall/8.jpg",
    color: "from-amber-600/20 to-orange-700/20",
    borderColor: "group-hover:border-amber-500/50",
  },
  {
    title: "Sunset Nature Views",
    description: "Experience the rainforest transformation as the sun sets over the valley cascades.",
    icon: Sunset,
    image: "/images/waterfall/7.jpg",
    color: "from-pink-600/20 to-rose-800/20",
    borderColor: "group-hover:border-pink-500/50",
  },
];

export const WaterfallShowcase = () => {
  return (
    <section className="py-24 bg-[#111416] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm"
          >
            Rainforest Expeditions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 text-white"
          >
            The Heart of the Jungle
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
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
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500",
                        exp.color
                      )}
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="mb-6 p-3 w-fit rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <exp.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-display font-bold text-white mb-3">{exp.title}</h3>
                    <p className="text-gray-300 font-light mb-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {exp.description}
                    </p>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500/50 via-transparent to-blue-500/50 blur-sm rounded-3xl" />
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
