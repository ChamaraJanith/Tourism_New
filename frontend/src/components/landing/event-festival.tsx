"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "./reveal";

const events = [
  {
    title: "Kandy Esala Perahera",
    type: "Temple & Heritage Festival",
    date: "July – August",
    location: "Temple of the Tooth, Kandy",
    badge: "Iconic Heritage",
    desc: "One of the oldest and grandest Buddhist festivals in Asia. Elephants draped in lavish costumes, Kandyan dancers, fire performers, and drummers parade through the streets for ten nights in honor of the Sacred Tooth Relic.",
    image: "/images/perahera.jpg",
  },
  {
    title: "Sinhala & Tamil New Year",
    type: "National & Cultural Festival",
    date: "April 13 – 14",
    location: "Island-wide",
    badge: "Cultural Milestone",
    desc: "Boiling fresh milk for new beginnings, savoring Kiribath with loved ones, and diving into the fun of traditional community games. A joyous island-wide celebration of heritage, unity, and new beginnings.",
    image: "/images/milk-rice.jpg",
  },
  {
    title: "Vesak Festival of Lights",
    type: "Cultural & Spiritual Festival",
    date: "May (Full Moon)",
    location: "Island-wide",
    badge: "Rare Experience",
    desc: "Crafting lanterns by day, chasing the glow of thoranas by night. Lanterns light every home, illuminated pandals tell Jataka tales, and communities share free food and drink in the spirit of generosity.",
    image: "/images/Vesak.jpg",
  },
  {
    title: "Poson Festival",
    type: "Cultural & Spiritual Festival",
    date: "June (Full Moon)",
    location: "Mihintale & Anuradhapura",
    badge: "Sacred Celebration",
    desc: "Commemorating the arrival of Buddhism to Sri Lanka. Mihintale and Anuradhapura glow with lanterns and pandals as thousands of pilgrims gather for this deeply spiritual celebration of faith and heritage.",
    image: "/images/Poson_perahara_1.jfif",
  },
  {
    title: "Nallur Kandaswamy Festival",
    type: "Hindu Temple Festival",
    date: "August – September",
    location: "Nallur Temple, Jaffna",
    badge: "Jaffna Gem",
    desc: "A spectacular 25-day Hindu festival in the heart of Jaffna. Drummers, dancers, and a grand bull procession culminate in the striking of the ceremonial pot — a visually stunning cultural spectacle.",
    image: "/images/Nallur.jfif",
  },
  {
    title: "Kataragama Festival",
    type: "Multi-Faith Celebration",
    date: "July – August",
    location: "Kataragama Sacred Grounds",
    badge: "Multi-Faith",
    desc: "A mesmerizing multi-faith devotional gathering at one of Sri Lanka's most sacred sites. Devotees walk on fire, perform self-mortification rituals, and offer prayers in a powerful display of spiritual devotion.",
    image: "/images/Katharagama_Perahara.jfif",
  },
  {
    title: "Deepavali – Festival of Lights",
    type: "Hindu Cultural Festival",
    date: "October – November",
    location: "Island-wide",
    badge: "Festival of Lights",
    desc: "The triumph of light over darkness celebrated with rows of glowing oil lamps, vibrant kolam patterns, traditional sweets, and joyous family gatherings across Sri Lanka's Tamil communities.",
    image: "/images/Deepavali.webp",
  },
  {
    title: "Christmas & New Year",
    type: "Seasonal Celebration",
    date: "December",
    location: "Island-wide",
    badge: "Holiday Special",
    desc: "Misty air, festive carols, and cozy fireside gatherings. Streetscapes adorned with twinkling lights, colonial-style holiday galas in Nuwara Eliya, and beachside celebrations along the coast.",
    image: "/images/christmas.jpg",
  },
  {
    title: "The Gathering of Asian Elephants",
    type: "Wildlife Spectacle",
    date: "July – September",
    location: "Minneriya National Park",
    badge: "Wildlife Wonder",
    desc: "Witness one of the greatest wildlife spectacles on Earth — up to 300 wild elephants converge on the ancient reservoir of Minneriya during the dry season in a breathtaking natural drama.",
    image: "/images/Minneriya.jfif",
  },
  {
    title: "Blue Whale Watching Season",
    type: "Marine Adventure",
    date: "November – April",
    location: "Mirissa & Trincomalee",
    badge: "Ocean Giants",
    desc: "Sri Lanka's southern and eastern coasts become a gateway to the largest animals ever to have lived. Boat out at dawn to encounter blue whales, sperm whales, and pods of spinner dolphins.",
    image: "/images/Whale.jfif",
  },
  {
    title: "International Surfing Season",
    type: "Adventure Sport",
    date: "May – October",
    location: "Arugam Bay",
    badge: "Rider's Paradise",
    desc: "Consistently ranked among the world's top surf destinations. Arugam Bay's consistent swells, laid-back beach culture, and competitive international events draw surfers from every corner of the globe.",
    image: "/images/Arugambay.jfif",
  },
  {
    title: "International Cricket Series",
    type: "Sporting Event",
    date: "Seasonal",
    location: "National Stadiums",
    badge: "Sporting Passion",
    desc: "Feel the electric energy of a Sri Lankan cricket match. Whether it's a Test series under floodlights at Galle or an ODI in Colombo, the passion and pride on display is unforgettable.",
    image: "/images/Cricket.jfif",
  },
];

export function EventFestival() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % events.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + events.length) % events.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const event = events[current];

  return (
    <section className="relative py-24 sm:py-32 bg-[#111416] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#70305f]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <Reveal>
            <span className="text-[#f2be2e] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
              SEASONAL SPECTACLES
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
              Festivals & events that define Sri Lanka.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-gray-400 font-light leading-relaxed">
              Plan your travel dates around iconic national festivals and rare cultural experiences to witness Sri Lanka's heritage at its absolute peak.
            </p>
          </Reveal>
        </div>

        {/* Slideshow */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slide */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#171b1d] shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#171b1d]/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171b1d] via-transparent to-transparent lg:hidden" />

                  {/* Badge */}
                  <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#1c2224] text-white text-[9px] font-bold uppercase tracking-wider shadow-lg">
                    {event.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#f2be2e] block mb-3">
                    {event.type}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-4">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="text-sm text-gray-400 font-light">
                      📅 {event.date}
                    </span>
                    <span className="text-sm text-gray-400 font-light">
                      📍 {event.location}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#1c2224]/80 backdrop-blur-sm border border-white/10 text-white hover:bg-[#f2be2e] hover:text-black hover:border-[#f2be2e] transition-all duration-300 shadow-xl"
            aria-label="Previous festival"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#1c2224]/80 backdrop-blur-sm border border-white/10 text-white hover:bg-[#f2be2e] hover:text-black hover:border-[#f2be2e] transition-all duration-300 shadow-xl"
            aria-label="Next festival"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators + Counter */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="sm:hidden p-2 rounded-full bg-[#1c2224]/80 border border-white/10 text-white active:bg-[#f2be2e] active:text-black transition-all duration-200"
              aria-label="Previous festival"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs text-gray-500 font-mono tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
            </span>

            <div className="hidden sm:flex gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  aria-label={`Go to festival ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    index === current
                      ? "w-8 bg-[#f2be2e]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="sm:hidden p-2 rounded-full bg-[#1c2224]/80 border border-white/10 text-white active:bg-[#f2be2e] active:text-black transition-all duration-200"
              aria-label="Next festival"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
