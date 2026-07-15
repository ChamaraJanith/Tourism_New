"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, Waves, Sparkles } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: ShieldCheck,
    title: "Pure Ecosystem",
    desc: "Experience a pristine natural environment maintained with zero-carbon footprint.",
    color: "from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: Waves,
    title: "Therapeutic Waters",
    desc: "The calm waters of Dandeniya provide a natural sanctuary for mental rejuvenation.",
    color: "from-cyan-500/10 to-blue-500/10"
  },
  {
    icon: Heart,
    title: "Cultural Immersion",
    desc: "Learn boat riding from locals whose ancestors have crossed these waters for centuries.",
    color: "from-blue-600/10 to-indigo-600/10"
  },
  {
    icon: Users,
    title: "Private Journeys",
    desc: "We offer exclusive, small-group boat tours to ensure intimacy and quietude.",
    color: "from-sky-500/10 to-blue-500/10"
  },
];

export const WhyTouristsLoveLake = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="py-24 bg-[#111416] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">The Sanctuary</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              Why Travelers Seek <br /> Our Mystical Lake
            </h2>
            <p className="text-lg text-gray-400 font-light mb-12 max-w-lg">
              Dandeniya Lake is not just a destination; it's a sensory experience. It's where the whisper of the wind meets the ripple of the water, creating a harmony that lingers in your soul long after you leave.
            </p>

            <div ref={ref} className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-bold text-blue-500 mb-2">
                  {inView && <CountUp end={120} duration={2.5} />}+
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-widest">Protected Acres</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-blue-500 mb-2">
                  {inView && <CountUp end={1800} duration={2.5} />}+
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-widest">Eco-Voyagers</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-3xl bg-gradient-to-br ${feature.color} border border-white/5 backdrop-blur-sm group hover:border-blue-500/30 transition-all duration-500`}
              >
                <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 border border-white/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
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
