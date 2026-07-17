'use client';

import React, { useState } from 'react';

const COUNTRIES = [
  { name: 'Australia', flag: '🇦🇺', x: 80.0, y: 80.5 },
  { name: 'Austria', flag: '🇦🇹', x: 50.0, y: 40.0 },
  { name: 'Azerbaijan', flag: '🇦🇿', x: 57.5, y: 47.5 },
  { name: 'Belgium', flag: '🇧🇪', x: 50.0, y: 36.5 },
  { name: 'Czech Republic', flag: '🇨🇿', x: 50.5, y: 38.5 },
  { name: 'France', flag: '🇫🇷', x: 47.0, y: 39.5 },
  { name: 'Germany', flag: '🇩🇪', x: 47.5, y: 36.0 },
  { name: 'Ireland', flag: '🇮🇪', x: 44.3, y: 34.5 },
  { name: 'Italy', flag: '🇮🇹', x: 50.5, y: 44.0 },
  { name: 'Latvia', flag: '🇱🇻', x: 52.5, y: 31.0 },
  { name: 'Luxembourg', flag: '🇱🇺', x: 48.5, y: 37.5 },
  { name: 'Monaco', flag: '🇲🇨', x: 48.0, y: 42.5 },
  { name: 'Netherlands', flag: '🇳🇱', x: 47.5, y: 35.5 },
  { name: 'Portugal', flag: '🇵🇹', x: 45.0, y: 45.5 },
  { name: 'Spain', flag: '🇪🇸', x: 46.0, y: 43.5 },
  { name: 'Sweden', flag: '🇸🇪', x: 50.5, y: 29.0 },
  { name: 'Switzerland', flag: '🇨🇭', x: 46.0, y: 37.0 },
  { name: 'Türkiye', flag: '🇹🇷', x: 54.5, y: 45.0 },
  { name: 'United Kingdom', flag: '🇬🇧', x: 46.5, y: 34.5 },
  { name: 'United States of America', flag: '🇺🇸', x: 22.5, y: 45.0 },
];

const SRI_LANKA = { name: 'Sri Lanka', flag: '🇱🇰', x: 66.5, y: 64.5 };

/* ─── SVG arc path between two percentage points ─────────── */
function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - 8; // arc curves upward
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export default function WorldMap2D() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/10
                 bg-[#070c14] shadow-[0_0_60px_rgba(212,175,55,0.06)]"
      style={{ aspectRatio: '2 / 1' }}
    >
      {/* ── World map image ── */}
      <img
        src="/images/global_image/sl_070722_51460_26.jpg"
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{
          opacity: 0.8,
        }}
        draggable={false}
      />

      {/* ── SVG overlay: animated arcs from Sri Lanka ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {COUNTRIES.map((c, i) => (
          <path
            key={c.name}
            d={arcPath(SRI_LANKA.x, SRI_LANKA.y, c.x, c.y)}
            fill="none"
            stroke={hovered === c.name ? '#d4af37' : '#d4af3740'}
            strokeWidth={hovered === c.name ? 0.15 : 0.08}
            strokeDasharray="0.6 0.4"
            filter="url(#glow)"
            style={{
              transition: 'stroke 0.3s, stroke-width 0.3s',
              strokeDashoffset: 0,
              animation: `dash ${4 + i * 0.3}s linear infinite`,
            }}
          />
        ))}

        <style>{`
          @keyframes dash {
            from { stroke-dashoffset: 2; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>

      {/* ── Partner country markers ── */}
      {COUNTRIES.map((c) => (
        <button
          key={c.name}
          className="absolute group"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => setHovered(c.name)}
          onMouseLeave={() => setHovered(null)}
          aria-label={c.name}
        >
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: '#d4af37',
              opacity: 0.5,
              width: 12,
              height: 12,
              top: -2,
              left: -2,
            }}
          />
          {/* Core dot */}
          <span
            className="relative flex items-center justify-center rounded-full border border-[#d4af37]/70
                       shadow-[0_0_6px_#d4af37]"
            style={{
              width: 8,
              height: 8,
              backgroundColor: '#d4af37',
            }}
          />

          {/* Tooltip */}
          <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                       bg-[#111416]/95 border border-[#d4af37]/40 backdrop-blur-sm
                       text-[#d4af37] text-[11px] font-semibold uppercase tracking-widest
                       px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200
                       shadow-[0_0_16px_rgba(212,175,55,0.2)] z-20"
          >
            {c.flag} {c.name}
          </span>
        </button>
      ))}

      {/* ── Sri Lanka HQ marker ── */}
      <button
        className="absolute group"
        style={{
          left: `${SRI_LANKA.x}%`,
          top: `${SRI_LANKA.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        onMouseEnter={() => setHovered(SRI_LANKA.name)}
        onMouseLeave={() => setHovered(null)}
        aria-label="Sri Lanka"
      >
        {/* Larger pulse */}
        <span
          className="absolute rounded-full animate-ping"
          style={{
            backgroundColor: '#ff5722',
            opacity: 0.5,
            width: 18,
            height: 18,
            top: -4,
            left: -4,
          }}
        />
        <span
          className="relative flex items-center justify-center rounded-full
                     border-2 border-[#ff5722] shadow-[0_0_10px_#ff5722]"
          style={{ width: 10, height: 10, backgroundColor: '#ff5722' }}
        />
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                     bg-[#111416]/95 border border-[#ff5722]/50 backdrop-blur-sm
                     text-[#ff5722] text-[11px] font-bold uppercase tracking-widest
                     px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     shadow-[0_0_16px_rgba(255,87,34,0.3)] z-20"
        >
          {SRI_LANKA.flag} Sri Lanka — HQ
        </span>
      </button>

      {/* ── Legend ── */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 text-[10px]">
          <span
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_6px_#d4af37]"
            style={{ backgroundColor: '#d4af37' }}
          />
          <span className="text-gray-400 uppercase tracking-wider">Partner Country</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_6px_#ff5722]"
            style={{ backgroundColor: '#ff5722' }}
          />
          <span className="text-gray-400 uppercase tracking-wider">Sri Lanka (HQ)</span>
        </div>
      </div>

      {/* ── Hover country name overlay ── */}
      {hovered && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-30
                        bg-[#111416]/90 border border-[#d4af37]/40 backdrop-blur-sm
                        text-[#d4af37] text-xs font-semibold uppercase tracking-widest
                        px-5 py-2 rounded-full transition-all duration-200">
          {[...COUNTRIES, SRI_LANKA].find(c => c.name === hovered)?.flag}{' '}
          {hovered}
        </div>
      )}
    </div>
  );
}
