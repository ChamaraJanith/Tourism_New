'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Handshake, TrendingUp, Globe, Heart, ShieldCheck, Users } from 'lucide-react';

/* ─── Value Pillars ─────────────────────────────────────── */
const PILLARS = [
  {
    icon: Handshake,
    title: 'Mutual Growth',
    description:
      'Every partnership is designed to create measurable value for both parties — from revenue sharing and co-marketing to exclusive access to high-value travel segments.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Acceleration',
    description:
      'Leverage our global distribution network, established brand equity, and international client base to unlock new revenue streams and premium booking channels.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description:
      'Tap into our presence across 20+ countries and 4 continents, connecting your offerings with discerning travellers from Europe, Asia-Pacific, and the Americas.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description:
      'Our partnerships directly fund community development, wildlife conservation, and sustainable tourism initiatives across rural Sri Lanka.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Every partner is carefully vetted against our quality framework — ensuring consistency, safety, and a premium experience that protects your brand reputation.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description:
      'A named partnership manager, 24/7 operational support, and quarterly business reviews ensure your partnership thrives year after year.',
  },
];

/* ─── Process Steps ─────────────────────────────────────── */
const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    body: 'We begin with a deep-dive into your business goals, target markets, and operational strengths to identify alignment opportunities.',
  },
  {
    number: '02',
    title: 'Structure',
    body: 'A tailored partnership model is crafted — including commercial terms, co-marketing plans, and service-level commitments.',
  },
  {
    number: '03',
    title: 'Launch',
    body: 'Onboarding, training, and integration into our distribution network — with dedicated support from day one.',
  },
  {
    number: '04',
    title: 'Growth',
    body: 'Ongoing performance reviews, market expansion initiatives, and continuous optimisation to maximise mutual returns.',
  },
];

/* ─── Page ──────────────────────────────────────────────── */
export default function BuildingValuePage() {
  return (
    <div className="min-h-screen bg-[#111416] text-white pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* ── HERO TEXT ── */}
        <div className="mb-16 text-center">
          <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
            Our Philosophy
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest">
            Building Partnerships That Create Lasting Value
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            We believe in building mutually beneficial, long-term relationships that not only elevate our offerings
            but also enrich the communities we operate in — creating a legacy of sustainable tourism.
          </p>
        </div>

        {/* ── HERO IMAGE ── */}
        <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] border border-white/10 group mb-24">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920&h=800"
            alt="Building Lasting Partnerships"
            fill
            className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Sustainable Growth, Shared Prosperity
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our partnerships are deeply rooted in sustainable practices, ensuring that the beauty and
              heritage of our destinations are preserved for generations to come.
            </p>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-24">
          {[
            { value: '100+', label: 'Active Partners' },
            { value: '20+', label: 'Countries' },
            { value: '98%', label: 'Retention Rate' },
            { value: '5+', label: 'Years Average' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111416] flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">
                {stat.value}
              </span>
              <span className="text-gray-400 text-xs uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            VALUE PILLARS
        ══════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
              Why Partner With Us
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              The Pillars of Lasting Value
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Every partnership we build is anchored in six core principles that drive sustainable
              growth and meaningful impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.12)] hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-[#d4af37]/0 group-hover:bg-[#d4af37]/5 blur-[40px] transition-all duration-700 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-all duration-500">
                      <Icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Gold accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            HOW WE BUILD VALUE
        ══════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              How We Build Value Together
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              A structured, transparent partnership journey designed to deliver results from day one
              and compound value over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Connector line (hidden on last item) */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-gradient-to-r from-[#d4af37]/40 to-[#d4af37]/10 z-0" />
                )}

                <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] h-full">
                  <span className="text-4xl font-bold text-[#d4af37]/20 group-hover:text-[#d4af37]/40 transition-colors duration-500 block mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CLOSING STATEMENT
        ══════════════════════════════════════════ */}
        <div className="rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/5 via-[#111416] to-[#d4af37]/5 p-12 md:p-16 text-center relative overflow-hidden mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
              Ready to Grow?
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-5">
              Let&apos;s Create Something Exceptional Together
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10">
              Whether you&apos;re a global tour operator, a boutique hotel group, or a specialist experience provider —
              we&apos;d love to explore how a partnership with us can unlock new markets and deliver lasting value.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/partnerships/partner-with-us"
                className="inline-block bg-[#d4af37] hover:bg-[#c09b30] text-black font-bold px-10 py-4 rounded-full uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
              >
                Become a Partner
              </Link>
              <Link
                href="/partnerships/global-network"
                className="inline-block border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 font-bold px-10 py-4 rounded-full uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                View Our Network
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
