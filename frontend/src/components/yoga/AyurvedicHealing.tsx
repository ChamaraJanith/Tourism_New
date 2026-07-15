"use client";

import { motion } from "framer-motion";
import { Sparkles, Leaf, ShieldCheck, Heart, Brain, Wind } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const ayurvedicBenefits = [
  {
    icon: Sparkles,
    title: "Dosha Balance",
    desc: "Identify and restore the balance of your Vata, Pitta, and Kapha energies.",
    color: "from-amber-500/10 to-orange-500/10"
  },
  {
    icon: Leaf,
    title: "Herbal Detox",
    desc: "Cleanse your internal systems with potent organic forest-fresh tropical herbs.",
    color: "from-emerald-500/10 to-green-500/10"
  },
  {
    icon: Heart,
    title: "Cellular Renewal",
    desc: "Promote longevity and rejuvenation through traditional oil therapies (Panchakarma).",
    color: "from-rose-500/10 to-pink-500/10"
  },
  {
    icon: Brain,
    title: "Mental Peace",
    desc: "Calm the mind with Shirodhara—the rhythmic pouring of warm sacred oils.",
    color: "from-indigo-500/10 to-purple-500/10"
  },
];

export const AyurvedicHealing = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="py-16 md:py-40 bg-[#111416] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          <div>
            <span className="text-amber-500 font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-xs mb-4 md:mb-8 block">Ayurvedic Wisdom</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white mb-6 md:mb-10 tracking-tighter">Healing Traditions</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-amber-50/60 font-light mb-8 md:mb-16 max-w-xl leading-relaxed">
              We integrate 5,000 years of Sri Lankan Hela Wedakam (traditional medicine) into every retreat experience to restore holistic harmony.
            </p>
 
            <div ref={ref} className="grid grid-cols-2 gap-8 md:gap-16">
              <div className="group">
                <div className="text-5xl md:text-7xl font-bold text-amber-500 mb-2 md:mb-4 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={90} duration={3} />}{inView && "%"}
                </div>
                <div className="text-amber-500/40 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">Renewal Success</div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-7xl font-bold text-emerald-500 mb-2 md:mb-4 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={100} duration={3} />}{inView && "%"}
                </div>
                <div className="text-amber-500/40 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">Organic Purity</div>
              </div>
            </div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {ayurvedicBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-gradient-to-br ${benefit.color} border border-white/5 backdrop-blur-3xl group hover:border-amber-500/40 transition-all duration-700 shadow-2xl`}
              >
                <div className="mb-6 md:mb-10 p-4 md:p-6 w-fit rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-700">
                  <benefit.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight">{benefit.title}</h3>
                <p className="text-amber-50/40 text-sm md:text-base font-light leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
