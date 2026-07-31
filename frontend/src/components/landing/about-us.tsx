"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bike, Sparkles, Users, Leaf, ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { BespokeButton } from "@/components/ui/BespokeButton";

const pillars = [
  {
    icon: Bike,
    title: "Handcrafted Eco-Tours",
    desc: "Every trail is mapped on foot and two wheels, blending active exploration with deep respect for local topography and flora.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Community Partnerships",
    desc: "We work directly with rural families, temple communities, and local craftspeople, ensuring tourism revenue remains local.",
    color: "text-[#f2be2e]",
    bg: "bg-[#f2be2e]/10",
  },
  {
    icon: Leaf,
    title: "Carbon-Negative Vision",
    desc: "From zero-single-use plastics to local tree-planting efforts, we actively restore Southern Sri Lanka's beautiful biomes.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
  },
];

export function AboutUs() {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-black overflow-hidden border-t border-white/[0.03]">
      {/* Soft background light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#f2be2e]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Visual Grid / Image Collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-[3rem] blur-2xl -z-10" />
            
            {/* Main Image */}
            <div className="col-span-8 overflow-hidden rounded-[2.5rem] border border-white/5 aspect-[4/5] relative group shadow-2xl">
              <Image
                src="/images/lifestyle.jpeg"
                alt="Sanctuary Trail Riding"
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                sizes="(max-width: 1024px) 60vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1112] via-transparent to-transparent opacity-60" />
            </div>

            {/* Smaller floating images to create an asymmetric luxury collage */}
            <div className="col-span-4 flex flex-col justify-between h-full">
              <div className="overflow-hidden rounded-[1.8rem] border border-white/5 aspect-[3/4] relative group shadow-xl">
                <Image
                  src="/images/tourist_premium.png"
                  alt="Scenic Rice Field Trails"
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  sizes="(max-width: 1024px) 30vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-all duration-500" />
              </div>

              <div className="overflow-hidden rounded-[1.8rem] border border-white/5 aspect-square relative group shadow-xl bg-[#171b1d] p-6 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 to-transparent pointer-events-none" />
                <Sparkles className="w-6 h-6 text-[#f2be2e] mb-4" />
                <div className="text-[1.8rem] font-display font-bold leading-none text-white">100%</div>
                <div className="text-[9px] uppercase tracking-widest text-gray-400 mt-2 font-bold leading-tight">Eco Vetted</div>
              </div>
            </div>

            {/* Absolute element decoration */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-[#171b1d] border border-white/10 rounded-2xl p-6 shadow-2xl hidden sm:block max-w-[200px]"
            >
              <div className="text-xs font-semibold text-white leading-normal">
                &quot;Sri Lanka&apos;s premier eco-cycling sanctuary.&quot;
              </div>
              <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-2">
                — Trail Discovery
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copy & Value Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <span className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                OUR SANCTUARY
              </span>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
                Active luxury. Deep heritage. Low impact.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base text-gray-400 font-light leading-relaxed mb-10">
                Founded by local outdoor enthusiasts and heritage guardians, Trail Discovery Sanctuary redefines luxury travel in Sri Lanka. We believe that true luxury lies in connecting deeply with nature and rural life. By choosing cycling paths over crowded vehicle lanes, you get to breathe the wild air, interact with remote village elders, and see the southern coast from an authentic perspective.
              </p>
            </Reveal>

            {/* Value Pillars List */}
            <div className="space-y-6 sm:space-y-8 mb-12">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex gap-6 items-start"
                  >
                    <div className={`p-3.5 rounded-2xl ${pillar.bg} ${pillar.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight mb-1.5">{pillar.title}</h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">{pillar.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <BespokeButton variant="emerald" href="#contact">
                  Plan Your Trail <ArrowUpRight className="w-4 h-4 ml-1" />
                </BespokeButton>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
