'use client';

import React from 'react';
import dynamic from 'next/dynamic';

/* ─── Dynamically import the 2D world map (no SSR) ─────────── */
const WorldMap = dynamic(() => import('./WorldGlobe'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center rounded-2xl border border-white/10 bg-[#070c14]"
      style={{ aspectRatio: '2 / 1' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37] animate-spin" />
        <span className="text-gray-500 text-xs uppercase tracking-widest">
          Loading Map…
        </span>
      </div>
    </div>
  ),
});

/* ─── Partner countries list ─────────────────────────────── */
const COUNTRIES = [
  { name: 'Australia',               flag: '🇦🇺', continent: 'Asia-Pacific' },
  { name: 'Austria',                 flag: '🇦🇹', continent: 'Europe' },
  { name: 'Azerbaijan',              flag: '🇦🇿', continent: 'Europe/Asia' },
  { name: 'Belgium',                 flag: '🇧🇪', continent: 'Europe' },
  { name: 'Czech Republic',          flag: '🇨🇿', continent: 'Europe' },
  { name: 'France',                  flag: '🇫🇷', continent: 'Europe' },
  { name: 'Germany',                 flag: '🇩🇪', continent: 'Europe' },
  { name: 'Ireland',                 flag: '🇮🇪', continent: 'Europe' },
  { name: 'Italy',                   flag: '🇮🇹', continent: 'Europe' },
  { name: 'Latvia',                  flag: '🇱🇻', continent: 'Europe' },
  { name: 'Luxembourg',              flag: '🇱🇺', continent: 'Europe' },
  { name: 'Monaco',                  flag: '🇲🇨', continent: 'Europe' },
  { name: 'Netherlands',             flag: '🇳🇱', continent: 'Europe' },
  { name: 'Portugal',                flag: '🇵🇹', continent: 'Europe' },
  { name: 'Spain',                   flag: '🇪🇸', continent: 'Europe' },
  { name: 'Sweden',                  flag: '🇸🇪', continent: 'Europe' },
  { name: 'Switzerland',             flag: '🇨🇭', continent: 'Europe' },
  { name: 'Türkiye',                 flag: '🇹🇷', continent: 'Europe/Asia' },
  { name: 'United Kingdom',          flag: '🇬🇧', continent: 'Europe' },
  { name: 'United States of America',flag: '🇺🇸', continent: 'Americas' },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function GlobalNetworkPage() {
  return (
    <div className="min-h-screen bg-[#111416] text-white pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* ── HERO TEXT ── */}
        <div className="mb-16 text-center">
          <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
            Global Presence
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest">
            Our Global Strategic Partner Network
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Through our international partnerships, we are building stronger connections between
            Sri Lanka and key tourism markets around the world.
          </p>
        </div>


        {/* ── STATS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-20">
          {[
            { value: '20', label: 'Partner Countries' },
            { value: '4',  label: 'Continents' },
            { value: '500M+', label: 'Market Reach' },
            { value: 'Growing', label: 'Network Status' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#111416] flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">{s.value}</span>
              <span className="text-gray-400 text-xs uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            3-D GLOBE SECTION
        ══════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
              Interactive Globe
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Our Partners Around the World
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Every glowing marker represents an active strategic partner. Hover over a pin to see
              the country name and flag.
            </p>
          </div>

          {/* 2D Map */}
          <WorldMap />
        </section>

        {/* ══════════════════════════════════════════
            COUNTRY GRID
        ══════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
              Our Partners Are Located Across
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              20 Countries &amp; Growing
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {COUNTRIES.map((country, i) => (
              <div
                key={country.name}
                className="group bg-white/5 border border-white/10 rounded-2xl p-4
                           hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5
                           transition-all duration-300 hover:-translate-y-0.5
                           hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]
                           flex flex-col items-center text-center gap-2"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="text-3xl">{country.flag}</span>
                <span className="text-white text-xs font-semibold leading-tight group-hover:text-[#d4af37] transition-colors duration-300">
                  {country.name}
                </span>
                <span className="text-gray-500 text-[10px] uppercase tracking-wider">
                  {country.continent}
                </span>

                {/* Gold underline on hover */}
                <div className="w-0 group-hover:w-8 h-0.5 bg-[#d4af37]/60 transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING STATEMENT ── */}
        <div className="rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/5 via-[#111416] to-[#d4af37]/5 p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
              Why This Matters
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-5">
              Connecting Sri Lanka to the World
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              This growing international network enables us to create new tourism opportunities,
              expand market access, and facilitate sustainable cross-border business partnerships
              — positioning Sri Lanka as a premier destination for discerning global travellers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
