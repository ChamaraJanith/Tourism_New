"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./reveal";

const stories = [
  {
    quote:
      "They turned a vague ‘somewhere warm in February’ into two weeks we still talk about at dinner.",
    name: "Elena M.",
    role: "New York",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    quote:
      "Every handoff was invisible. We just showed up—and everything was exactly where it should be.",
    name: "James & Priya K.",
    role: "London",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
  },
];

export function Stories() {
  return (
    <section
      id="stories"
      className="relative bg-[#0a0c0e] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f2be2e]">
              Traveler stories
            </p>
            <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Memories that outlast the itinerary.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">
            We work with a small number of trips each season so every departure
            gets the same level of care.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {stories.map((s, i) => (
            <motion.figure
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden rounded-3xl border border-white/5 bg-[#111416]"
            >
              <div className="grid gap-0 md:grid-cols-5">
                <div className="relative aspect-[16/10] md:col-span-2 md:aspect-auto md:min-h-[280px]">
                  <Image
                     src={s.image}
                     alt=""
                     fill
                     className="object-cover transition duration-700 group-hover:scale-105"
                     sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <figcaption className="flex flex-col justify-center p-8 md:col-span-3 md:p-10">
                  <blockquote className="font-display text-lg leading-relaxed text-gray-200 sm:text-xl">
                    “{s.quote}”
                  </blockquote>
                  <footer className="mt-8">
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      {s.role}
                    </p>
                  </footer>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
