"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Leaf, Users, Sprout, Star } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: Sprout,
    title: "100% Organic",
    desc: "Every ingredient is sourced from ancestral village gardens using zero chemical fertilizers.",
    color: "from-emerald-500/10 to-teal-500/10"
  },
  {
    icon: ShieldCheck,
    title: "Ancient Wisdom",
    desc: "Recipes passed down through generations, optimized for detox and holistic health.",
    color: "from-amber-500/10 to-orange-500/10"
  },
  {
    icon: Heart,
    title: "Wellness Focused",
    desc: "Meals designed to balance your mind and body through the power of Ayurvedic science.",
    color: "from-red-500/10 to-rose-500/10"
  },
  {
    icon: Leaf,
    title: "Eco-Sustainable",
    desc: "Zero-waste cooking methods that respect the land and support local village farmers.",
    color: "from-green-500/10 to-emerald-500/10"
  },
];

export const FoodWhyTouristsLove = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="py-32 bg-[#0d0f11] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Impact</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              Why Travelers <br /> Choose Our Table
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12 max-w-lg leading-relaxed">
              We don't just serve food; we serve a lifestyle. Our organic experiences reconnect you with the earth's natural rhythms.
            </p>

            <div ref={ref} className="grid grid-cols-2 gap-12">
              <div className="group">
                <div className="text-6xl font-bold text-amber-500 mb-2 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={100} duration={3} />}{inView && "%"}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold">Organic Purity</div>
              </div>
              <div className="group">
                <div className="text-6xl font-bold text-emerald-500 mb-2 transition-transform group-hover:scale-110">
                  {inView && <CountUp end={45} duration={3} />}{inView && "+"}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold">Village Partners</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-10 rounded-[2.5rem] bg-gradient-to-br ${feature.color} border border-white/5 backdrop-blur-3xl group hover:border-amber-500/30 transition-all duration-700`}
              >
                <div className="mb-8 p-4 w-fit rounded-2xl bg-white/5 border border-white/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
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
