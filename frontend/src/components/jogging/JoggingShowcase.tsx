"use client";

import { motion } from "framer-motion";
import { Sunrise, Waves, Trees, Sunset, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    title: "Sunrise Jogging",
    description: "The golden hour run. Activate your metabolism as the tropical sun rises.",
    icon: Sunrise,
    image: "/images/jogging/1.jpg",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "group-hover:border-amber-400/50",
  },
  {
    title: "Lakeside Running",
    description: "Flat, peaceful paths along the crystal-clear waters of scenic lakes.",
    icon: Waves,
    image: "/images/jogging/2.jpg",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-400/50",
  },
  {
    title: "Forest Trails",
    description: "Deep immersion in tropical forests. Run through ancient canopy shades.",
    icon: Trees,
    image: "/images/jogging/3.jpg",
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "group-hover:border-emerald-400/50",
  },
  {
    title: "Sunset Sessions",
    description: "Wind down the day with a cool, refreshing run as the forest settles.",
    icon: Sunset,
    image: "/images/jogging/7.jpg",
    color: "from-indigo-600/20 to-blue-800/20",
    borderColor: "group-hover:border-indigo-500/50",
  },
  {
    title: "Meditation Stops",
    description: "Strategically located viewpoints designed for mid-run mindfulness.",
    icon: MapPin,
    image: "/images/jogging/9.jpg",
    color: "from-amber-700/20 to-yellow-900/20",
    borderColor: "group-hover:border-amber-600/50",
  },
];

export const JoggingShowcase = () => {
  return (
    <section className="py-24 bg-[#111416] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-medium tracking-[0.2em] uppercase text-sm"
          >
            Curated Trail Network
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 text-white"
          >
            The Path to Wellness
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full" />
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
                <div
                  className={cn(
                    "group relative h-[500px] rounded-3xl overflow-hidden border border-white/5 transition-all duration-500",
                    exp.borderColor
                  )}
                >
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

                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="mb-6 p-3 w-fit rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <exp.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-3xl font-display font-bold text-white mb-3">{exp.title}</h3>
                    <p className="text-gray-300 font-light mb-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {exp.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-emerald-500/50 via-transparent to-emerald-500/50 blur-sm rounded-3xl" />
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
