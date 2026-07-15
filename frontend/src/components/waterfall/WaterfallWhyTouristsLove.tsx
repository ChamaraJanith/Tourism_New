"use client";

import { motion } from "framer-motion";
import { Waves, Mountain, Heart, Compass, ShieldCheck, Sparkles } from "lucide-react";

const whyLove = [
  {
    icon: Waves,
    title: "Hidden Beauty",
    desc: "Cascades known only to locals, offering an authentic and private adventure.",
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: Mountain,
    title: "Rainforest Trails",
    desc: "Experience the deep rainforest with expert guides and safe, premium trails.",
    color: "from-emerald-500/10 to-green-500/10"
  },
  {
    icon: Heart,
    title: "Pure Relaxation",
    desc: "Swim in natural pools and feel the rhythmic pulse of the waterfall sanctuary.",
    color: "from-indigo-500/10 to-blue-600/10"
  },
  {
    icon: Sparkles,
    title: "Luxury Eco",
    desc: "High-end amenities integrated seamlessly into the wild tropical landscape.",
    color: "from-teal-500/10 to-blue-500/10"
  },
];

export const WaterfallWhyTouristsLove = () => {
  return (
    <section className="py-40 bg-[#111416] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-28">
          <span className="text-blue-500 font-bold tracking-[0.6em] uppercase text-xs mb-6 block">The Explorer's Verdict</span>
          <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-10 tracking-tighter">Why Go Off-Trail?</h2>
          <div className="w-40 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {whyLove.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-12 rounded-[4rem] bg-gradient-to-br ${feature.color} border border-white/5 backdrop-blur-3xl group hover:border-blue-500/30 transition-all duration-700 text-center flex flex-col items-center shadow-2xl`}
            >
              <div className="mb-10 p-7 rounded-[2.5rem] bg-white/5 border border-white/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-700 shadow-xl">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{feature.title}</h3>
              <p className="text-blue-50/40 text-base font-light leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
