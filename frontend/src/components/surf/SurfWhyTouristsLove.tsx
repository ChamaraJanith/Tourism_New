"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Waves, Users, Sun, Coffee } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: Waves,
    title: "Perfect Waves",
    desc: "Consistency is key. The bay offers reliable, clean waves almost every single day.",
    color: "from-cyan-500/10 to-blue-500/10"
  },
  {
    icon: Sun,
    title: "Hidden Paradise",
    desc: "A horseshoe-shaped bay that feels like a private tropical sanctuary.",
    color: "from-orange-500/10 to-pink-500/10"
  },
  {
    icon: Users,
    title: "Vibrant Community",
    desc: "Connect with a global network of surfers, creators, and wellness seekers.",
    color: "from-teal-500/10 to-emerald-500/10"
  },
  {
    icon: Heart,
    title: "Wellness Lifestyle",
    desc: "A perfect balance of adrenaline on the waves and peace on the sand.",
    color: "from-indigo-500/10 to-purple-500/10"
  },
];

export const SurfWhyTouristsLove = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="py-40 bg-[#111416] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-cyan-400 font-bold tracking-[0.5em] uppercase text-xs mb-6 block">Why Hiriketiya</span>
            <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-10 tracking-tighter">The Soul of <br /> the South</h2>
            <p className="text-2xl text-cyan-50/60 font-light mb-16 max-w-xl leading-relaxed">
              Travelers from around the world are drawn to Hiriketiya for its unique blend of wild natural beauty and sophisticated surf culture.
            </p>

            <div ref={ref} className="grid grid-cols-2 gap-16">
              <div className="group">
                <div className="text-7xl font-bold text-cyan-400 mb-4 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={330} duration={3} />}{inView && "+"}
                </div>
                <div className="text-cyan-400/40 text-[10px] uppercase tracking-[0.4em] font-bold">Surf Days / Year</div>
              </div>
              <div className="group">
                <div className="text-7xl font-bold text-indigo-400 mb-4 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={28} duration={3} />}{inView && "°"}
                </div>
                <div className="text-cyan-400/40 text-[10px] uppercase tracking-[0.4em] font-bold">Avg. Water Temp</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-12 rounded-[4rem] bg-gradient-to-br ${feature.color} border border-white/5 backdrop-blur-3xl group hover:border-cyan-400/30 transition-all duration-700`}
              >
                <div className="mb-10 p-6 w-fit rounded-[2rem] bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-white transition-all duration-700">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">{feature.title}</h3>
                <p className="text-cyan-50/40 text-base font-light leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
