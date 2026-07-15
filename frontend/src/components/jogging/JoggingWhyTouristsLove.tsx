"use client";

import { motion } from "framer-motion";
import { Trees, Heart, Wind, ShieldCheck, Sprout, Sparkles } from "lucide-react";

const features = [
  {
    icon: Trees,
    title: "Pure Nature",
    desc: "100% protected forest paths that offer a deep connection to the earth.",
    color: "from-emerald-500/10 to-green-500/10"
  },
  {
    icon: Wind,
    title: "Cleanest Air",
    desc: "Breathe in some of the cleanest air in Sri Lanka, far from urban centers.",
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: ShieldCheck,
    title: "Safe Trails",
    desc: "Our trails are perfectly maintained and monitored for maximum safety.",
    color: "from-amber-500/10 to-orange-500/10"
  },
  {
    icon: Sparkles,
    title: "Eco Luxury",
    desc: "Premium amenities integrated seamlessly into the natural environment.",
    color: "from-indigo-500/10 to-purple-500/10"
  },
];

export const JoggingWhyTouristsLove = () => {
  return (
    <section className="py-40 bg-[#111416] relative overflow-hidden">
      {/* Decorative leaf particles could be added here */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-28">
          <span className="text-emerald-500 font-bold tracking-[0.6em] uppercase text-xs mb-6 block">The Traveler's Choice</span>
          <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-10 tracking-tighter">Why Run With Us?</h2>
          <div className="w-40 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-12 rounded-[4rem] bg-gradient-to-br ${feature.color} border border-white/5 backdrop-blur-3xl group hover:border-emerald-500/30 transition-all duration-700 text-center flex flex-col items-center`}
            >
              <div className="mb-10 p-7 rounded-[2.5rem] bg-white/5 border border-white/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">{feature.title}</h3>
              <p className="text-emerald-50/40 text-base font-light leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
