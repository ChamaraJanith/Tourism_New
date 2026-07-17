"use client";
 
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Compass, ShieldCheck, Map, Users, Leaf, Headset } from "lucide-react";
import { Reveal } from "./reveal";
 
const features = [
  {
    icon: Compass,
    title: "Authentic Local Experiences",
    desc: "Immerse yourself in deeply personal cultural journeys that go far beyond standard sightseeing.",
    glow: "rgba(242,193,79,0.15)"
  },
  {
    icon: ShieldCheck,
    title: "Verified Luxury Stays",
    desc: "Every villa, boutique pavilion, and hotel room is handpicked and thoroughly vetted for luxury.",
    glow: "rgba(59,130,246,0.15)"
  },
  {
    icon: Map,
    title: "Personalized Itineraries",
    desc: "Tailored around your individual style, pace, and passions to create the ultimate custom holiday.",
    glow: "rgba(139,92,246,0.15)"
  },
  {
    icon: Users,
    title: "Local Expert Guides",
    desc: "Learn from passionate local storytellers who hold deep knowledge of our heritage trails.",
    glow: "rgba(16,185,129,0.15)"
  },
  {
    icon: Leaf,
    title: "Sustainable Tourism",
    desc: "We support conservation efforts and give back directly to our indigenous rural communities.",
    glow: "rgba(236,72,153,0.15)"
  },
  {
    icon: Headset,
    title: "24/7 Support",
    desc: "Our personal concierge team is on call at all times to handle bookings, shifts, and advice.",
    glow: "rgba(249,115,22,0.15)"
  }
];
 
const stats = [
  { value: 10000, suffix: "+", label: "Travelers Hooked" },
  { value: 120, suffix: "+", label: "Bespoke Tours" },
  { value: 50, suffix: "+", label: "Partner Boutiques" },
  { value: 4.9, decimals: 1, label: "Guest Satisfaction" }
];
 
export function WhyTravel() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
 
  return (
    <section className="relative py-24 sm:py-32 bg-[#111416] overflow-hidden">

      {/* Dynamic background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-[#70305f]/10 to-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
 
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Title & Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <Reveal>
                <span className="text-[#f2be2e] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                  THE VALUE DIFFERENCE
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
                  Why modern explorers trust our curated escapes.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-base text-gray-400 font-light leading-relaxed mb-8">
                  We bridge the gap between pure raw nature and refined premium luxury. Every detail of your journey is crafted with meticulous local expertise and verified to exceed global design standards.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="relative mb-12 lg:mb-16 overflow-hidden rounded-3xl w-full max-w-sm aspect-square border border-white/[0.08] shadow-2xl group/img">
                  <img
                    src="/images/tourist_premium.png"
                    alt="Sri Lanka Luxury Explorer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                </div>
              </Reveal>
            </div>
 
            {/* Stats list */}
            <div ref={ref} className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight flex items-center">
                    {inView ? (
                      <CountUp 
                        end={stat.value} 
                        decimals={stat.decimals || 0} 
                        duration={2.5} 
                      />
                    ) : (
                      <span>0</span>
                    )}
                    {stat.suffix && <span className="ml-1">{stat.suffix}</span>}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f2be2e]/60 mt-2 transition-colors group-hover:text-white">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
 
          {/* Unique value items grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="group relative rounded-3xl bg-[#171b1d] border border-white/[0.03] p-8 hover:border-white/10 transition-all duration-500 shadow-xl overflow-hidden"
              >
                {/* Custom soft glow */}
                <div 
                  className="absolute -right-16 -top-16 w-36 h-36 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: feat.glow }}
                />
 
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[#f2be2e] group-hover:bg-[#f2be2e] group-hover:text-black transition-all duration-500">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
 
        </div>
      </div>
    </section>
  );
}
