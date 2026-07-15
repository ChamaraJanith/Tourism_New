"use client";

import { motion } from "framer-motion";
import { Brain, Heart, Sparkles, Trees, ShieldCheck, Landmark } from "lucide-react";

const whyLove = [
  {
    icon: Brain,
    title: "Total Detox",
    desc: "Complete mental and physical reset in absolute tropical silence.",
    color: "from-amber-500/10 to-orange-500/10"
  },
  {
    icon: Heart,
    title: "Ancient Wisdom",
    desc: "Authentic Ayurvedic healing that addresses root causes, not just symptoms.",
    color: "from-rose-500/10 to-pink-500/10"
  },
  {
    icon: Landmark,
    title: "Sacred Energy",
    desc: "Practice in a region steeped in millennia of spiritual devotion.",
    color: "from-purple-500/10 to-indigo-600/10"
  },
  {
    icon: ShieldCheck,
    title: "Luxury Retreat",
    desc: "World-class facilities seamlessly integrated with tropical nature.",
    color: "from-emerald-500/10 to-teal-500/10"
  },
];

export const YogaWhyTouristsLove = () => {
  return (
    <section className="py-40 bg-[#111416] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-28">
          <span className="text-amber-500 font-bold tracking-[0.6em] uppercase text-xs mb-6 block">The Seeker's Truth</span>
          <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-10 tracking-tighter">Why This Sanctuary?</h2>
          <div className="w-40 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {whyLove.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-12 rounded-[4rem] bg-gradient-to-br ${feature.color} border border-white/5 backdrop-blur-3xl group hover:border-amber-500/30 transition-all duration-700 text-center flex flex-col items-center shadow-2xl`}
            >
              <div className="mb-10 p-7 rounded-[2.5rem] bg-white/5 border border-white/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-700 shadow-xl">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{feature.title}</h3>
              <p className="text-amber-50/40 text-base font-light leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
