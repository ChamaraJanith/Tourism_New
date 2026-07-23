"use client";

import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, ArrowRight, ChevronRight, Send, Sparkles } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import Link from "next/link";
import { fireBookingConfetti } from "@/lib/booking-confetti";
import { useState } from "react";

const FOOTER_LINKS = {
  explore: [
    { name: "Lifestyle Experiences", href: "/lifestyle-experiences" },
    { name: "Signature Journeys", href: "/journeys" },
    { name: "Tourism Services", href: "/tourism-segments" },
    { name: "Festivals & Events", href: "/#festivals" },
    { name: "Destinations", href: "/lifestyle-experiences" },
  ],
  partnerships: [
    { name: "Global Partner Network", href: "/partnerships/global-network" },
    { name: "Sri Lankan Network", href: "/partnerships/sri-lankan-network" },
    { name: "Hospitality Partners", href: "/partnerships/local-hospitality" },
    { name: "Build Lasting Value", href: "/partnerships/building-value" },
    { name: "Partner With Us", href: "/partnerships/partner-with-us" },
  ],
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Board of Directors", href: "/#board" },
    { name: "Contact Us", href: "/#contact" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const SOCIALS = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaXTwitter, href: "https://x.com", label: "X (Twitter)" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaTripadvisor, href: "https://tripadvisor.com", label: "TripAdvisor" },
];

export const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith("/auth")) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      fireBookingConfetti("amber");
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#050505] overflow-hidden">
      {/* ── Ambient Glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#d4af37]/[0.02] rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════
            TOP — Brand + Newsletter
        ═══════════════════════════════════════════ */}
        <div className="border-b border-white/[0.04]">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 md:pt-16 pb-10 md:pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Brand */}
              <div>
                <Link href="/" className="inline-block mb-4 group">
                  <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                    <span className="text-white">YOUR</span>
                    <span className="text-[#d4af37]">TOURISM</span>
                  </h2>
                  <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#d4af37] to-transparent transition-all duration-700 mt-1" />
                </Link>
                <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md mb-6">
                  Sri Lanka&apos;s premier luxury tourism partner. Crafting bespoke itineraries, curated experiences, and seamless journeys for discerning travellers since 2018.
                </p>
                <div className="flex gap-3">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#d4af37] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-400"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="lg:pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-3 h-3" />
                  Stay Inspired
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Curated travel insights, delivered.
                </h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">
                  Seasonal guides, festival calendars, and exclusive offers — straight to your inbox.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-3 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-2xl px-6 py-4">
                    <div className="w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center shrink-0">
                      <Send className="w-3.5 h-3.5 text-[#00ff88]" />
                    </div>
                    <span className="text-[#00ff88] text-sm font-medium">Welcome aboard — check your inbox.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 pr-40 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00ff88]/40 focus:shadow-[0_0_20px_rgba(0,255,136,0.05)] transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 px-6 bg-[#00ff88] hover:bg-[#00cc6a] text-black rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,136,0.35)] flex items-center gap-2"
                    >
                      Subscribe
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MIDDLE — Link Columns
        ═══════════════════════════════════════════ */}
        <div className="border-b border-white/[0.04]">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16 py-10 md:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">

              {/* Explore */}
              <div>
                <h4 className="text-[#d4af37] font-bold mb-4 md:mb-5 uppercase text-[10px] tracking-[0.4em]">
                  Explore
                </h4>
                <ul className="space-y-2.5">
                  {FOOTER_LINKS.explore.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-500 hover:text-white text-sm font-light transition-colors duration-300"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#d4af37]" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partnerships */}
              <div>
                <h4 className="text-[#d4af37] font-bold mb-4 md:mb-5 uppercase text-[10px] tracking-[0.4em]">
                  Partnerships
                </h4>
                <ul className="space-y-2.5">
                  {FOOTER_LINKS.partnerships.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-500 hover:text-white text-sm font-light transition-colors duration-300"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#d4af37]" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-[#d4af37] font-bold mb-4 md:mb-5 uppercase text-[10px] tracking-[0.4em]">
                  Company
                </h4>
                <ul className="space-y-2.5">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-500 hover:text-white text-sm font-light transition-colors duration-300"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#d4af37]" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-[#d4af37] font-bold mb-4 md:mb-5 uppercase text-[10px] tracking-[0.4em]">
                  Get in Touch
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-gray-500 font-light text-sm leading-relaxed">
                      No. 12, Galle Road,<br />
                      Colombo 03, Sri Lanka
                    </span>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-gray-500 font-light text-sm">+94 11 234 5678</span>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-gray-500 font-light text-sm">hello@yourtourism.lk</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            BOTTOM — Copyright + Legal + Trust Badges
        ═══════════════════════════════════════════ */}
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16 py-5 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <p className="text-white/15 text-[10px] uppercase tracking-[0.4em] font-light text-center md:text-left">
              &copy; {new Date().getFullYear()} Your Tourism. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-3">
              {["Sri Lanka Tourism", "IATA Certified", "SLTDA Licensed"].map((badge) => (
                <span
                  key={badge}
                  className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-medium border border-white/5 rounded-full px-3 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Legal */}
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="text-white/15 hover:text-[#d4af37]/60 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-white/15 hover:text-[#d4af37]/60 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300"
              >
                Privacy
              </Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};
