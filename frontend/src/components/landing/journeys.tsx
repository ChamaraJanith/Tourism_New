"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./reveal";

const steps = [
  {
    title: "Listen",
    body: "We start with how you like to move—pace, privacy, and what “enough” feels like on the road.",
  },
  {
    title: "Design",
    body: "A single itinerary owner shapes flights, stays, and experiences into one coherent thread.",
  },
  {
    title: "Journey",
    body: "On-trip support and quiet upgrades when weather or inspiration shifts the day.",
  },
];

export function Journeys() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="journeys"
      className="relative overflow-hidden bg-[#0a0c0e] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f2be2e]">
            How we work
          </p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            A journey that feels inevitable—not improvised.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            From first call to touchdown, you have one team. We handle the
            logistics so you can stay present for the moments that matter.
          </p>

          <ol className="mt-12 space-y-10 border-l border-white/5 pl-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <span className="absolute -left-[2.125rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#f2be2e]/55 bg-[#111416] text-xs font-semibold text-[#f2be2e]">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-medium text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </Reveal>

        <motion.div
          style={{ y: imageY }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/5 shadow-2xl lg:aspect-[3/4]"
        >
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
            alt="Mountain landscape"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f2be2e]">
              Sample pace
            </p>
            <p className="mt-2 font-display text-2xl text-white">
              Three regions. Two flights. Zero rush.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
