"use client";

import { motion } from "framer-motion";
import { Droplets, Heart, Wind, Sparkles, Brain, Shield } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const wellnessBenefits = [
  {
    icon: Droplets,
    title: "Negative Ions",
    desc: "Waterfall mist is naturally rich in negative ions, which boost oxygen flow to the brain.",
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: Wind,
    title: "Misty Healing",
    desc: "The clean, humid air of the rainforest waterfall is a natural detox for your lungs.",
    color: "from-emerald-500/10 to-teal-500/10"
  },
  {
    icon: Heart,
    title: "Rhythmic Sound",
    desc: "The constant, rhythmic sound of falling water lowers cortisol and promotes deep peace.",
    color: "from-indigo-500/10 to-blue-600/10"
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    desc: "Reconnect with your focus in an environment free from all digital and urban noise.",
    color: "from-teal-500/10 to-blue-500/10"
  },
];

export const WaterfallWellness = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="py-16 md:py-40 bg-[#111416] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          <div>
            <span className="text-blue-500 font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-xs mb-4 md:mb-8 block">Nature's Medicine</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white mb-6 md:mb-10 tracking-tighter">Healing in Motion</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-50/60 font-light mb-8 md:mb-16 max-w-xl leading-relaxed">
              We leverage the elemental power of water to create a world-class wellness retreat. Experience the transformation of your body and mind near the pulse of the falls.
            </p>
 
            <div ref={ref} className="grid grid-cols-2 gap-8 md:gap-16">
              <div className="group">
                <div className="text-5xl md:text-7xl font-bold text-blue-500 mb-2 md:mb-4 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={85} duration={3} />}{inView && "%"}
                </div>
                <div className="text-blue-500/40 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">Cortisol Reduction</div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-7xl font-bold text-emerald-500 mb-2 md:mb-4 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={100} duration={3} />}{inView && "%"}
                </div>
                <div className="text-blue-500/40 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">Oxygen Purity</div>
              </div>
            </div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {wellnessBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-gradient-to-br ${benefit.color} border border-white/5 backdrop-blur-3xl group hover:border-blue-500/40 transition-all duration-700 shadow-2xl`}
              >
                <div className="mb-6 md:mb-10 p-4 md:p-6 w-fit rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-700">
                  <benefit.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight">{benefit.title}</h3>
                <p className="text-blue-50/40 text-sm md:text-base font-light leading-relaxed">
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
