"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "./reveal";


const slides = [
  {
    title: "Sigiriya Rock Kingdom",
    tag: "Cultural Triangle",
    nights: "2 nights",
    image: "/images/1.jpg",
  },
  {
    title: "Golden Coast Leisure Days",
    tag: "South Coast",
    nights: "3 nights",
    image: "/images/2.jpg",
  },
  {
    title: "Sri Lankan Spirit Trails",
    tag: "Local Experiences",
    nights: "4 nights",
    image: "/images/3.jpg",
  },
  {
    title: "Highland Tea Route",
    tag: "Central Highlands",
    nights: "8 nights",
    image: "/images/4.jpg",
  },
  {
    title: "Wildlife and Heritage Escape",
    tag: "Signature Safari",
    nights: "5 nights",
    image: "/images/5.jpg",
  },
  {
    title: "Summit View Expedition",
    tag: "Adventure Series",
    nights: "3 nights",
    image: "/images/6.jpg",
  },
];

export function Destinations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      goToNext();
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const active = slides[activeIndex];

  return (
    <section
      id="destinations"
      className="relative bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(242,190,46,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f2be2e]">
            Signature routes
          </p>
          <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-[#111416] sm:text-4xl lg:text-5xl">
            Destinations designed for slow travel and sharp detail.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#111416]/60 sm:text-lg">
            Each itinerary balances iconic sights with quiet corners—local
            hosts, chef-led tables, and room to breathe.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 mx-auto max-w-4xl overflow-hidden rounded-[1.8rem] border border-black/10 bg-[#111416]"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[320px] sm:min-h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active.image}
                custom={direction}
                initial={{ x: direction > 0 ? 100 : -100, opacity: 0, scale: 1.04 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: direction > 0 ? -100 : 100, opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority={activeIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>


          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-white/10 bg-[#0c1011] px-4 py-4 sm:px-6">
            {slides.map((slide, idx) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`group relative h-16 w-24 overflow-hidden rounded-xl border transition sm:h-20 sm:w-28 ${
                  idx === activeIndex
                    ? "border-[#f2be2e] ring-1 ring-[#f2be2e]/40"
                    : "border-white/10 hover:border-white/35"
                }`}
                aria-label={`Show ${slide.title}`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={`object-cover transition duration-500 ${
                    idx === activeIndex
                      ? "scale-105 opacity-100"
                      : "opacity-70 group-hover:scale-105 group-hover:opacity-100"
                  }`}
                  sizes="112px"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
