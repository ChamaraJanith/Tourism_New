"use client";

import { motion } from "framer-motion";
import { Wind, Waves, Thermometer, ShieldCheck, Zap, Navigation } from "lucide-react";

const conditions = [
  { label: "Wave Height", value: "3-5 ft", icon: Waves, detail: "Consistent clean peelers" },
  { label: "Wind Speed", value: "8 mph", icon: Wind, detail: "Offshore mornings" },
  { label: "Water Temp", value: "28°C", icon: Thermometer, detail: "Boardshort weather" },
  { label: "Safety Level", value: "Premium", icon: ShieldCheck, detail: "Life-guard patrolled" },
];

export const SurfConditions = () => {
  return (
    <section className="py-40 bg-[#111416] relative overflow-hidden">
      {/* Decorative Wave lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-px w-full bg-cyan-400 my-40 transform -rotate-12 blur-sm" />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-cyan-400 font-bold tracking-[0.5em] uppercase text-xs mb-6 block">Ocean Intel</span>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-10 tracking-tighter">Perfect Conditions</h2>
            <p className="text-2xl text-cyan-50/60 font-light mb-16 leading-relaxed max-w-xl">
              Hiriketiya is famous for its horseshoe shape, protecting the waves from strong winds and creating the most consistent beginner-to-intermediate surf in the region.
            </p>
            
            <div className="flex flex-wrap gap-8">
              <div className="p-8 rounded-[3rem] bg-cyan-500 text-[#0a0c10] flex flex-col gap-4 w-fit group hover:scale-105 transition-transform duration-500">
                <Navigation className="w-8 h-8" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block opacity-70">Best Season</span>
                  <span className="text-2xl font-bold">Nov - April</span>
                </div>
              </div>
              <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-white flex flex-col gap-4 w-fit group hover:border-cyan-400/50 transition-all duration-500">
                <Zap className="w-8 h-8 text-cyan-400" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block opacity-50">Skill Level</span>
                  <span className="text-2xl font-bold">All Levels</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {conditions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl group hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-700"
              >
                <div className="mb-10 p-5 w-fit rounded-3xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-700">
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="text-cyan-400/50 text-xs font-bold uppercase tracking-[0.3em] mb-3 block">{item.label}</span>
                <h4 className="text-5xl font-display font-bold text-white mb-6 tracking-tighter">{item.value}</h4>
                <p className="text-white/40 text-sm font-light italic">"{item.detail}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
