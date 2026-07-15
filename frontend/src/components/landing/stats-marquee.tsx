"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Countries crafted", value: "42" },
  { label: "Avg. trip length", value: "11 days" },
  { label: "Repeat travelers", value: "73%" },
  { label: "Response time", value: "< 4 hrs" },
];

export function StatsMarquee() {
  return (
    <section className="border-y border-black/5 bg-[#f4f4ef]/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-8 px-5 sm:justify-between sm:px-8 lg:px-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center sm:text-left"
          >
            <p className="font-display text-3xl text-[#f2be2e] sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#111416]/45">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
