"use client";

import { useEffect, useRef, type ComponentType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { fireBookingConfetti, type BookingConfettiPalette } from "@/lib/booking-confetti";

gsap.registerPlugin(ScrollTrigger);

export type TimelineStep = {
  time: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

export type TimelineAccent = "emerald" | "amber" | "cyan" | "blue";

type ExperienceTimelineScrollProps = {
  steps: TimelineStep[];
  introLabel: string;
  introTitle: ReactNode;
  outroTitle: string;
  outroButtonText: string;
  accent: TimelineAccent;
  confettiPalette: BookingConfettiPalette;
};

const accentButton: Record<TimelineAccent, string> = {
  emerald: "bg-emerald-600 hover:bg-emerald-500",
  amber: "bg-amber-600 hover:bg-amber-500",
  cyan: "bg-cyan-600 hover:bg-cyan-500",
  blue: "bg-blue-600 hover:bg-blue-500",
};

const accentLabel: Record<TimelineAccent, string> = {
  emerald: "text-emerald-500",
  amber: "text-amber-500",
  cyan: "text-cyan-500",
  blue: "text-blue-500",
};

const accentIcon: Record<TimelineAccent, string> = {
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  cyan: "text-cyan-400",
  blue: "text-blue-400",
};

const accentLine: Record<TimelineAccent, string> = {
  emerald: "from-emerald-500/0 via-emerald-500 to-emerald-500/0",
  amber: "from-amber-500/0 via-amber-500 to-amber-500/0",
  cyan: "from-cyan-500/0 via-cyan-500 to-cyan-500/0",
  blue: "from-blue-500/0 via-blue-500 to-blue-500/0",
};

const accentDot: Record<TimelineAccent, string> = {
  emerald: "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]",
  amber: "bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.8)]",
  cyan: "bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]",
  blue: "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]",
};

const accentChevron: Record<TimelineAccent, string> = {
  emerald: "border-emerald-500",
  amber: "border-amber-500",
  cyan: "border-cyan-500",
  blue: "border-blue-500",
};

const accentOutro: Record<TimelineAccent, string> = {
  emerald: "bg-emerald-600/10 border-emerald-500/20",
  amber: "bg-amber-600/10 border-amber-500/20",
  cyan: "bg-cyan-600/10 border-cyan-500/20",
  blue: "bg-blue-600/10 border-blue-500/20",
};

export function ExperienceTimelineScroll({
  steps,
  introLabel,
  introTitle,
  outroTitle,
  outroButtonText,
  accent,
  confettiPalette,
}: ExperienceTimelineScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const totalVw = 100 + steps.length * 60 + 40;
  const translateVw = steps.length * 60 + 40;
  const scrollEnd = 1500 + steps.length * 200;

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-${translateVw}vw`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `${scrollEnd} top`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, [translateVw, scrollEnd]);

  return (
    <section className="overflow-hidden bg-[#0d0f11]">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="h-screen flex items-center relative"
          style={{ width: `${totalVw}vw` }}
        >
          <div
            className={`absolute top-1/2 left-0 w-full h-px bg-gradient-to-r z-0 ${accentLine[accent]}`}
          />

          {/* Intro */}
          <div className="w-[100vw] flex flex-col items-center justify-center px-12 z-10 shrink-0">
            <span
              className={`font-medium tracking-[0.2em] uppercase text-sm mb-4 ${accentLabel[accent]}`}
            >
              {introLabel}
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white text-center">
              {introTitle}
            </h2>
            <div className="mt-12 animate-bounce">
              <div
                className={`w-10 h-10 border-r-2 border-b-2 rotate-45 ${accentChevron[accent]}`}
              />
            </div>
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-[60vw] flex flex-col items-center justify-center px-12 z-10 relative shrink-0"
            >
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-20 ${accentDot[accent]}`}
              />

              <div
                className={`flex flex-col items-center ${index % 2 === 0 ? "mb-64" : "mt-64"}`}
              >
                <div className="mb-6 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group hover:scale-110 transition-transform duration-500">
                  <step.icon className={`w-8 h-8 ${accentIcon[accent]}`} />
                </div>
                <span
                  className={`font-bold tracking-tighter text-2xl mb-2 ${accentLabel[accent]}`}
                >
                  {step.time}
                </span>
                <h3 className="text-3xl font-display font-bold text-white mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-400 font-light text-center max-w-sm text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* Outro */}
          <div className="w-[40vw] flex flex-col items-center justify-center px-12 z-10 shrink-0">
            <div
              className={`p-12 rounded-3xl border backdrop-blur-xl text-center ${accentOutro[accent]}`}
            >
              <h3 className="text-3xl font-display font-bold text-white mb-4">{outroTitle}</h3>
              <button
                type="button"
                onClick={() => fireBookingConfetti(confettiPalette)}
                className={`booking-pill-btn cursor-pointer px-8 py-3 text-white rounded-full font-medium transition-colors ${accentButton[accent]}`}
              >
                {outroButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
