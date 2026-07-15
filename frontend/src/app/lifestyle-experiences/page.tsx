"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experiences, type Experience } from "@/data/lifestyle-experiences";

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <motion.div className="group w-full cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/5 bg-gray-900">
        <a href={`/lifestyle-experiences/${exp.slug}`} className="relative block h-full w-full">
          <Image
            src={exp.image}
            alt={exp.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#f2c14f]">
              {exp.tag}
            </span>
            <h3 className="mt-2 text-2xl font-black uppercase leading-tight">{exp.title}</h3>
          </div>
        </a>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-gray-400">{exp.description}</p>
      <a
        href={`/lifestyle-experiences/${exp.slug}`}
        className="mt-4 inline-block border-b-2 border-[#f2c14f]/30 pb-1 text-[0.7rem] font-black uppercase tracking-widest text-[#f2c14f] transition-all hover:border-[#f2c14f] hover:tracking-[0.25em]"
      >
        Discover More
      </a>
    </motion.div>
  );
}

export default function LifestyleExperiences() {
  const remainder = experiences.length % 3;
  const mainExperiences = experiences.slice(0, experiences.length - remainder);
  const lastRowExperiences = experiences.slice(experiences.length - remainder);
  return (
    <main className="min-h-screen bg-[#111416] text-white">

      {/* ── HERO ── */}
      <section className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0c0e]">
        <Image
          src="/images/lifestyle.jpeg"
          alt="Lifestyle Experiences"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 text-center">
          <motion.span
            className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.3em] backdrop-blur-md"
          >
            Elite Curations
          </motion.span>
          <motion.h1
            className="mt-6 text-4xl font-black uppercase tracking-tight sm:text-6xl text-white"
          >
            Lifestyle <span className="text-[#f2c14f]">Experiences</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/80"
          >
            Beyond the destination lies the experience. We curate moments that define
            the soul of travel, from private culinary feasts to spiritual retreats.
          </motion.p>
        </div>
      </section>

      {/* ── EXPERIENCES GRID ── */}
      <section className="mx-auto max-w-screen-2xl px-6 py-24 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {mainExperiences.map((exp) => (
            <ExperienceCard key={exp.slug} exp={exp} />
          ))}

          {remainder === 1 && lastRowExperiences[0] && (
            <div className="md:col-start-2">
              <ExperienceCard exp={lastRowExperiences[0]} />
            </div>
          )}

          {remainder === 2 && (
            <div className="flex flex-col gap-12 md:col-span-3 md:flex-row md:justify-center">
              {lastRowExperiences.map((exp) => (
                <div key={exp.slug} className="w-full md:w-[calc((100%-3rem)/3)]">
                  <ExperienceCard exp={exp} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
