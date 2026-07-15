"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

const links = [
  { href: "#top", label: "Home" },
  { href: "#journeys", label: "About us" },
  { href: "#destinations", label: "Destinations" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 48);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500",
        scrolled
          ? "border-b border-white/15 bg-[#0b1e15]/55 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8 lg:px-10">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-white sm:text-2xl"
        >
          Tr<span className="text-[#16b376]">i</span>plife
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#contact"
            className="rounded-full border border-white/60 bg-black/15 px-6 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Contact us
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={clsx(
              "block h-0.5 w-5 rounded-full bg-white transition-transform",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-5 rounded-full bg-white transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-5 rounded-full bg-white transition-transform",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        className="overflow-hidden border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl md:hidden"
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 rounded-full bg-[#c9a962] px-4 py-3 text-center text-sm font-semibold text-[#050816]"
            onClick={() => setOpen(false)}
          >
            Plan a trip
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}
