"use client";
 
import Image from "next/image";
import { motion } from "framer-motion";

import { Reveal } from "./reveal";

 
const events = [
  {
    title: "Sinhala & Tamil New Year",
    type: "National & Cultural Festival",
    date: "April 13 – 14, 2026",
    location: "Galle Heritage Villa",
    badge: "Cultural Milestone",
    desc: "Boiling fresh milk for new beginnings, savoring Kiribath with loved ones, and diving into the fun of traditional community games. 🍯🌾 Wishing everyone a happy, sweet, and prosperous Sinhala & Tamil New Year!",
    image: "/images/milk-rice.jpg",
    color: "from-orange-600/30 to-[#70305f]/30"
  },
  {
    title: "Vesak Festival of Lights",
    type: "Cultural & Spiritual Festival",
    date: "May 22 – 24, 2026",
    location: "Colombo Lake Pavilion",
    badge: "Rare Experience",
    desc: (
      <>
        Glue on our fingers, light in our homes, and wonder in our eyes. Crafting lanterns by day, chasing the glow of thoranas by night. Wishing everyone a blessed and illuminated Vesak! <span className="hidden sm:inline">🪔✨</span>
      </>
    ),
    image: "/images/Vesak.jpg",
    color: "from-blue-600/30 to-[#70305f]/30"
  },
  {
    title: "Dondra Perahera Festival",
    type: "Temple & Heritage Festival",
    date: "July 27 – August 2, 2026",
    location: "Devinuwara Sacred Temple",
    badge: "Rare Experience",
    desc: "Rhythm, fire, and sacred heritage on the southern coast. 🌊🔥 Captivated by the traditional Southern dancers and beautifully adorned elephants marching in honor of Lord Vishnu at the historic Dondra Perahera Festival.",
    image: "/images/perahera.jpg",
    color: "from-yellow-600/30 to-[#70305f]/30"
  },
  {
    title: "Christmas & Winter Festivities",
    type: "Seasonal Celebration",
    date: "December 20 – 25, 2026",
    location: "Little England Nuwara Eliya",
    badge: "Holiday Special",
    desc: "Misty air, festive carols, and cozy fireside gatherings. 🎄✨ Celebrating Christmas with beautifully decorated streetscapes and colonial-style holiday gala dinners. Cold weather, warm hearts! ❄️❤️",
    image: "/images/christmas.jpg",
    color: "from-red-600/30 to-[#70305f]/30"
  }
];
 
export function EventFestival() {
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
              Upcoming festivals and rare cultural events.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-gray-400 font-light leading-relaxed">
              Plan your travel dates around iconic national festivals and our private, chef-led culinary gatherings to experience Sri Lanka's heritage at its peak of absolute vibrancy.
            </p>
          </Reveal>
        </div>
 
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative rounded-[2.5rem] border border-white/5 bg-[#171b1d] overflow-hidden hover:border-[#f2be2e]/20 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Section */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out grayscale-[10%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171b1d] via-transparent to-black/20" />
                  
                  {/* Badge */}
                  <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#1c2224] text-white text-[9px] font-bold uppercase tracking-wider shadow-lg">
                    {event.badge}
                  </span>
                </div>
 
                {/* Content Section */}
                <div className="p-8 sm:p-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#f2be2e] block mb-2">
                    {event.type}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-4 group-hover:text-[#f2be2e] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {event.desc}
                  </p>
 
                </div>
              </div>
            </motion.div>
          ))}
        </div>
 
 
      </div>
    </section>
  );
}
