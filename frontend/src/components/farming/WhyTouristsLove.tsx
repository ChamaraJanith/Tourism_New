"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, Leaf, Sparkles } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: ShieldCheck,
    title: "Authentic Village Life",
    desc: "100% real experiences with local families in their own ancestral homes.",
    color: "from-emerald-500/10 to-teal-500/10"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Tourism",
    desc: "Every experience supports sustainable farming and plastic-free living.",
    color: "from-green-500/10 to-emerald-500/10"
  },
  {
    icon: Heart,
    title: "Wellness & Mindfulness",
    desc: "Reconnect with nature through rhythmic farming and serene landscapes.",
    color: "from-amber-500/10 to-orange-500/10"
  },
  {
    icon: Users,
    title: "Family-Friendly",
    desc: "Curated activities that are safe and educational for children of all ages.",
    color: "from-blue-500/10 to-cyan-500/10"
  },
];

export const WhyTouristsLove = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="py-24 bg-[#111416] relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-500 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">The Experience</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              Why Travelers Choose <br /> Traditional Living
            </h2>
            <p className="text-lg text-gray-400 font-light mb-12 max-w-lg">
              Beyond the luxury of hotels, we offer the luxury of connection. Experience the soul of Sri Lanka through the eyes of those who have nurtured it for centuries.
            </p>

            <div ref={ref} className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-bold text-emerald-500 mb-2">
                  {inView && <CountUp end={15} duration={2.5} />}+
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-widest">Village Hectares</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-emerald-500 mb-2">
                  {inView && <CountUp end={250} duration={2.5} />}+
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-widest">Happy Travelers</div>
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
                className={`p-8 rounded-3xl bg-gradient-to-br ${feature.color} border border-white/5 backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-500`}
              >
                <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 border border-white/10 text-emerald-400 group-hover:scale-110 transition-transform">
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
