"use client";

import { motion } from "framer-motion";
import { Reveal } from "./reveal";

export function CtaFooter() {
  return (
    <section id="contact" className="bg-white px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-br from-[#f2be2e]/10 via-[#f4f4ef] to-[#ffffff] p-10 sm:p-14 lg:p-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#f2be2e]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#4f6fa8]/10 blur-3xl" />
 
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-medium tracking-tight text-[#111416] sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  Tell us where you&apos;re dreaming—
                  <span className="text-[#111416]/50"> we&apos;ll shape the rest.</span>
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#111416]/60 sm:text-base">
                  Share dates, regions, or a mood. We&apos;ll reply with a
                  concise proposal and clear pricing—no generic brochures.
                </p>
              </div>
 
              <motion.form
                className="relative flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm text-[#111416] placeholder:text-[#111416]/35 outline-none ring-[#f2be2e]/40 transition focus:border-[#f2be2e]/50 focus:ring-2"
                />
                <textarea
                  rows={3}
                  placeholder="Where do you want to go?"
                  className="resize-none rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm text-[#111416] placeholder:text-[#111416]/35 outline-none ring-[#f2be2e]/40 transition focus:border-[#f2be2e]/50 focus:ring-2"
                />
                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center rounded-full bg-[#f2be2e] px-8 py-3.5 text-sm font-semibold text-[#1e2528] transition hover:bg-[#e0af25]"
                >
                  Request a proposal
                </button>
                <p className="text-xs text-[#111416]/40">
                  This demo form does not submit data. Wire it to your API or
                  form provider when ready.
                </p>
              </motion.form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
