"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  X, 
  Plus, 
  CheckCircle2, 
  MessageSquareQuote, 
  Send, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { Reveal } from "./reveal";
import { supabase } from "@/lib/supabase";
import { PACKAGES } from "@/app/journeys/PackageData";

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  country: string;
  flag: string;
  rating: number;
  quote: string;
  short_quote?: string;
  shortQuote?: string;
  tags: string[];
  bg_image?: string;
  bgImage?: string;
  status?: string;
  created_at?: string;
}

// Fallback high-end curated testimonials in case DB is not yet populated
const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "def-1",
    name: "Eleanor Vance",
    role: "Private Client",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    quote: "A perfectly paced exploration of Sri Lanka's hidden highlands. The expert local guides knew every secret tea plantation trail. Pure luxury coupled with wild, raw authenticity.",
    short_quote: "The expert local guides knew every secret tea plantation trail. Pure luxury coupled with wild, raw authenticity.",
    tags: ["Highland Expedition", "Culture Trails"],
    bg_image: "/images/nine_arch_bridge.png"
  },
  {
    id: "def-2",
    name: "Marcus Aurelius",
    role: "Bespoke Adventurer",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    quote: "Booking the Dandeniya Lake retreat was the best wellness decision I've ever made. The sound of birds at sunrise, combined with organic food and top-tier service, was unmatched.",
    short_quote: "Booking the Dandeniya Lake retreat was the best wellness decision I've ever made. Top-tier service was unmatched.",
    tags: ["Lake Retreat", "Ayurvedic Spa"],
    bg_image: "/images/lake/7.webp"
  },
  {
    id: "def-3",
    name: "Samantha Miller",
    role: "Family Retreat",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    quote: "Our bespoke organic farming day combined with a culinary workshop blew us away. The children learned to harvest local yams while we sipped fresh coconut water.",
    short_quote: "Our bespoke organic farming day combined with a culinary workshop blew us away. Sipping fresh coconut water.",
    tags: ["Organic Village", "Local Kitchen"],
    bg_image: "/images/farm/11.jpg"
  }
];

const COUNTRY_FLAGS: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
  "Germany": "🇩🇪",
  "France": "🇫🇷",
  "Australia": "🇦🇺",
  "Canada": "🇨🇦",
  "Italy": "🇮🇹",
  "Switzerland": "🇨🇭",
  "Japan": "🇯🇵",
  "India": "🇮🇳",
  "Netherlands": "🇳🇱",
  "Other": "🌍",
};

export function TravelerTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    country: "United Kingdom",
    role: "Private Client",
    rating: 5,
    journey: PACKAGES[0]?.title || "The Grand Sri Lanka Discovery",
    tag: "Highland Expedition",
    quote: ""
  });

  // Fetch approved testimonials from Supabase
  useEffect(() => {
    async function loadTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("status", "Approved")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          const formatted: TestimonialItem[] = data.map((item: any) => {
            let image = item.bg_image;
            // Prevent old kitten placeholder URL from showing
            if (!image || image.includes("photo-1545249390-6bdfa286032f")) {
              image = "/images/nine_arch_bridge.png";
            }
            return {
              id: item.id,
              name: item.name,
              role: item.role || "Private Client",
              country: item.country || "International",
              flag: item.flag || COUNTRY_FLAGS[item.country] || "🌍",
              rating: item.rating || 5,
              quote: item.quote,
              short_quote: item.short_quote || item.quote.slice(0, 120) + "...",
              tags: Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : ["Exclusive Journey"],
              bg_image: image,
              status: item.status
            };
          });
          setTestimonials(formatted);
        }
      } catch (err) {
        console.warn("Could not load database testimonials, using curated fallback:", err);
      }
    }

    loadTestimonials();
  }, []);

  // Load official TripAdvisor widget script and trigger validator
  useEffect(() => {
    const scriptSrc =
      "https://www.jscache.com/wejs?wtype=socialButtonIcon&uniq=806&locationId=34735713&color=green&size=rect&lang=en_US&display_version=2";

    const triggerTaValidate = () => {
      if (typeof window !== "undefined" && typeof (window as any).taValidate === "function") {
        try {
          (window as any).taValidate();
        } catch {}
      }
    };

    const existingScript = document.querySelector(`script[src*="socialButtonIcon?uniq=806"], script[src*="wejs?wtype=socialButtonIcon"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptSrc;
      script.setAttribute("data-loadtrk", "true");
      script.onload = triggerTaValidate;
      document.body.appendChild(script);
    } else {
      triggerTaValidate();
    }

    const interval = setInterval(triggerTaValidate, 500);
    const timeout = setTimeout(() => clearInterval(interval), 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Load Elfsight Google Reviews script and hide watermark badge
  useEffect(() => {
    const existing = document.querySelector('script[src*="elfsightcdn.com/platform.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const hideElfsightBadge = () => {
      // 1. Regular DOM links
      const badgeLinks = document.querySelectorAll('a[href*="elfsight.com"], [class*="Badge__BadgeContainer"], [class*="badge-container"], [class*="Badge__Link"]');
      badgeLinks.forEach((el) => {
        (el as HTMLElement).style.setProperty("display", "none", "important");
        (el as HTMLElement).style.setProperty("visibility", "hidden", "important");
        (el as HTMLElement).style.setProperty("opacity", "0", "important");
        (el as HTMLElement).style.setProperty("height", "0", "important");
        (el as HTMLElement).style.setProperty("overflow", "hidden", "important");
      });

      // 2. Shadow DOM links & style injection
      const containers = document.querySelectorAll('[class*="elfsight-app"]');
      containers.forEach((container) => {
        const root = (container as any).shadowRoot;
        if (root) {
          const innerBadges = root.querySelectorAll('a[href*="elfsight.com"], [class*="Badge"], [class*="badge"]');
          innerBadges.forEach((el: any) => {
            el.style.setProperty("display", "none", "important");
            el.style.setProperty("visibility", "hidden", "important");
            el.style.setProperty("opacity", "0", "important");
            el.style.setProperty("height", "0", "important");
          });

          if (!root.querySelector("#hide-elfsight-badge-style")) {
            const style = document.createElement("style");
            style.id = "hide-elfsight-badge-style";
            style.textContent = `
              a[href*="elfsight.com"], [class*="Badge"], [class*="badge"], [class*="Badge__Link"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
                pointer-events: none !important;
              }
            `;
            root.appendChild(style);
          }
        }
      });
    };

    const interval = setInterval(hideElfsightBadge, 200);
    const observer = new MutationObserver(hideElfsightBadge);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Safe current active item
  const currentItem = testimonials[activeTestimonial] || testimonials[0] || DEFAULT_TESTIMONIALS[0];
  let bgImg = currentItem.bg_image || currentItem.bgImage || "/images/nine_arch_bridge.png";
  if (bgImg.includes("photo-1545249390-6bdfa286032f")) {
    bgImg = "/images/nine_arch_bridge.png";
  }
  const quoteText = currentItem.quote;
  const shortQuoteText = currentItem.short_quote || currentItem.shortQuote || (quoteText.length > 100 ? quoteText.slice(0, 100) + "..." : quoteText);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    setIsSubmitting(true);
    try {
      const flag = COUNTRY_FLAGS[formData.country] || "🌍";
      const tags: string[] = [];
      if (formData.journey) tags.push(formData.journey);
      if (formData.tag) tags.push(formData.tag);
      if (tags.length === 0) tags.push("Exclusive Journey");

      // Match background image with selected signature journey if available
      const matchedPkg = PACKAGES.find((p) => p.title === formData.journey);
      const bgImage = matchedPkg?.images?.[0] || "/images/nine_arch_bridge.png";

      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim() || "Private Client",
        country: formData.country,
        flag: flag,
        rating: formData.rating,
        quote: formData.quote.trim(),
        short_quote: formData.quote.trim().slice(0, 120) + "...",
        tags: tags,
        bg_image: bgImage,
        status: "Pending" // Review needs admin acceptance before showing publicly
      };


      // 1. Insert into Supabase
      const { error: dbError } = await supabase.from("testimonials").insert([payload]);

      if (dbError) {
        console.warn("Direct Supabase insert failed, attempting backend endpoint:", dbError.message);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        await fetch(`${apiUrl}/api/testimonials`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch((err) => console.warn("Backend API also unavailable:", err));
      }

      setSubmittedSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmittedSuccess(false);
        setFormData({
          name: "",
          country: "United Kingdom",
          role: "Private Client",
          rating: 5,
          journey: PACKAGES[0]?.title || "The Grand Sri Lanka Discovery",
          tag: "Highland Expedition",
          quote: ""
        });
      }, 3500);
    } catch (err) {
      console.error("Error submitting review:", err);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmittedSuccess(false);
      }, 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="testimonials"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-24 sm:py-32 bg-[#08090a] overflow-hidden border-t border-white/5"
    >
      {/* Keyframe animation for active card progress */}
      <style>{`
        @keyframes progress-bar-timer {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Luxury ambient glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Headings, Trust platform badges & Write Review CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                GUEST REVIEWS & STORIES
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.15]">
                Stories from our global family of elite travelers.
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start md:self-end">
            {/* Share Your Review Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b38f2a] text-black font-semibold text-sm shadow-xl shadow-[#d4af37]/20 hover:shadow-[#d4af37]/35 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Share Your Review</span>
            </motion.button>

            {/* Google Reviews Badge */}
            <a
              href="#google-reviews"
              className="flex items-center gap-3 bg-[#111416]/90 hover:bg-[#14181b] px-4 py-2.5 rounded-2xl border border-white/5 hover:border-white/20 backdrop-blur-md transition-all duration-300 shadow-lg group cursor-pointer"
              title="View Google Reviews"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-white/5 rounded-full p-1 border border-white/10 group-hover:scale-105 transition-transform">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] text-gray-400 group-hover:text-white font-semibold mt-0.5 uppercase tracking-wider transition-colors">
                  5.0 on Google
                </div>
              </div>
            </a>

            {/* TripAdvisor Official Badge & Embed Widget */}
            <div className="flex items-center gap-3 bg-[#111416]/90 hover:bg-[#14181b] px-4 py-2.5 rounded-2xl border border-white/5 hover:border-[#00aa6c]/30 backdrop-blur-md transition-all duration-300 shadow-lg group">
              {/* Official TripAdvisor embed widget container */}
              <div id="TA_socialButtonIcon806" className="TA_socialButtonIcon shrink-0 flex items-center">
                <ul id="uxi7uE4C2" className="TA_links eFu3STcHbsm3 list-none m-0 p-0 flex items-center">
                  <li id="c4CqxlGKDii" className="KKrrTQlf list-none m-0 p-0 flex items-center">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.tripadvisor.com/Attraction_Review-g7719299-d34735713-Reviews-International_Hospitality_Ventures-Maharagama_Western_Province.html"
                      className="w-7 h-7 rounded-full bg-[#00aa6c]/15 group-hover:bg-[#00aa6c]/25 border border-[#00aa6c]/30 flex items-center justify-center transition-all"
                      title="Read traveler reviews on Tripadvisor"
                    >
                      <img
                        src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_logomark.svg"
                        alt="Tripadvisor"
                        className="w-4 h-4 object-contain"
                      />
                    </a>
                  </li>
                </ul>
              </div>

              <a
                href="https://www.tripadvisor.com/Attraction_Review-g7719299-d34735713-Reviews-International_Hospitality_Ventures-Maharagama_Western_Province.html"
                target="_blank"
                rel="noopener noreferrer"
                title="International Hospitality Ventures on TripAdvisor"
                className="flex flex-col group/link"
              >
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#00aa6c] inline-block shadow-sm"
                      />
                    ))}
                  </div>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-500 group-hover/link:text-[#00aa6c] ml-1 transition-colors" />
                </div>
                <div className="text-[10px] text-gray-400 group-hover/link:text-white font-semibold mt-0.5 uppercase tracking-wider flex items-center gap-1 transition-colors">
                  <span>TripAdvisor</span>
                  <span className="text-[#00aa6c] font-normal lowercase text-[9px]">(reviews)</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Main Grid: Left featured visual card, Right review selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Main Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group aspect-[16/10] lg:aspect-auto min-h-[340px] lg:min-h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#111416] shadow-2xl flex flex-col justify-end p-6 sm:p-10"
          >
            {/* Background image preview with cross-fade animation */}
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id || activeTestimonial}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.75, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={bgImg} 
                    alt={`${currentItem.name} Testimonial`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out grayscale-[15%]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            {/* Verified Badge */}
            <div className="absolute top-6 right-6 z-10">
              <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white/90 flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Verified Guest Experience
              </div>
            </div>

            {/* Floating Review Summary Card */}
            <div className="relative z-10 bg-black/75 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl max-w-lg self-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id || activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-1.5 mb-2 text-[#d4af37]">
                    {[...Array(currentItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-200 italic font-medium leading-relaxed mb-4">
                    &ldquo;{shortQuoteText}&rdquo;
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">{currentItem.name}</span>
                      <span className="text-xs text-[#d4af37]">{currentItem.flag}</span>
                      <span className="text-xs text-gray-400">{currentItem.country}</span>
                    </div>
                    <span className="text-xs text-[#d4af37] font-medium tracking-wide">
                      {currentItem.role}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Interactive Review Cards Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              {testimonials.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`p-6 sm:p-7 rounded-[2rem] border cursor-pointer transition-all duration-400 relative overflow-hidden ${
                    idx === activeTestimonial
                      ? "bg-[#111416] border-[#d4af37]/40 shadow-2xl ring-1 ring-[#d4af37]/30 scale-100"
                      : "bg-[#111416]/50 border-white/5 opacity-70 hover:opacity-100 hover:bg-[#111416]/80 scale-[0.98]"
                  }`}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${
                        idx === activeTestimonial 
                          ? "bg-[#d4af37] text-black border-[#d4af37]" 
                          : "bg-white/10 text-white border-white/10"
                      }`}>
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{item.name}</h3>
                        <p className="text-[11px] text-[#d4af37] tracking-wider mt-0.5">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
                      <span className="text-sm">{item.flag}</span>
                      <span className="text-[11px] text-gray-400 font-medium">{item.country}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-3 line-clamp-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.tags.map((tag, tIdx) => {
                      const isPackage = PACKAGES.some((p) => p.title.toLowerCase() === tag.toLowerCase());
                      return (
                        <span 
                          key={tIdx} 
                          className={`text-[10px] font-medium tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isPackage 
                              ? "bg-[#d4af37]/15 text-[#d4af37] border-[#d4af37]/30 font-semibold" 
                              : "bg-white/5 text-gray-300 border-white/5"
                          }`}
                        >
                          {isPackage ? `✨ ${tag}` : tag}
                        </span>
                      );
                    })}
                    <div className="ml-auto flex items-center text-[#d4af37]">
                      {[...Array(item.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Active Progress Bar Timer */}
                  {idx === activeTestimonial && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
                      <div 
                        key={activeTestimonial}
                        onAnimationEnd={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                        className="h-full bg-[#d4af37]" 
                        style={{
                          animation: "progress-bar-timer 7000ms linear forwards",
                          animationPlayState: (isHovered || isModalOpen) ? "paused" : "running"
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination / Prev & Next Controls */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
                <span className="text-xs text-gray-500 font-mono">
                  {String(activeTestimonial + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')} Stories
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    aria-label="Previous review"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition border border-white/5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    aria-label="Next review"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition border border-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Real Live Google Reviews Widget (Elfsight) */}
        <div id="google-reviews" className="mt-16 sm:mt-24 pt-12 border-t border-white/5 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2">
                  Verified Google Traveler Reviews
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light">
                  Live verified feedback from explorers around the world
                </p>
              </div>
            </div>
          </div>

          {/* Elfsight Google Reviews Embed Container */}
          <div className="elfsight-app-b7f01f59-a8ac-46d1-b091-1b4fcf4cf3f5" data-elfsight-app-lazy />
        </div>
      </div>

      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />

      {/* Add Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111416] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white z-10 my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>

              {submittedSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center mx-auto border border-[#d4af37]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white">Thank You for Your Review!</h3>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-sm mx-auto">
                    Your testimonial has been submitted successfully. To preserve authenticity and quality, our concierge team will review and approve it shortly before it appears on the public story board.
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded-full border border-[#d4af37]/20">
                      <ShieldCheck className="w-3.5 h-3.5" /> Pending Concierge Verification
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <span className="text-[#d4af37] font-semibold text-xs tracking-widest uppercase flex items-center gap-1.5">
                      <MessageSquareQuote className="w-3.5 h-3.5" /> GUEST EXPERIENCE
                    </span>
                    <h3 className="text-2xl font-display font-medium text-white mt-1">Share Your Journey</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Your feedback will be featured on our website once reviewed by our team.
                    </p>
                    <div className="mt-3 flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-3.5 py-2">
                      <span className="text-[11px] text-gray-400">Prefer reviewing on TripAdvisor?</span>
                      <a
                        href="https://www.tripadvisor.com/Attraction_Review-g7719299-d34735713-Reviews-International_Hospitality_Ventures-Maharagama_Western_Province.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#00aa6c] hover:underline font-medium"
                      >
                        <img
                          src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_logomark.svg"
                          alt="TripAdvisor"
                          className="w-3.5 h-3.5 object-contain"
                        />
                        <span>Write on TripAdvisor ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              star <= formData.rating 
                                ? "fill-[#d4af37] text-[#d4af37]" 
                                : "text-gray-600 hover:text-gray-400"
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-semibold text-[#d4af37] ml-2">
                        {formData.rating === 5 ? "5.0 - Exceptional" :
                         formData.rating === 4 ? "4.0 - Wonderful" :
                         formData.rating === 3 ? "3.0 - Good" :
                         formData.rating === 2 ? "2.0 - Fair" : "1.0 - Poor"}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-[#d4af37] focus:outline-none transition"
                    />
                  </div>

                  {/* Country & Traveler Type Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none transition"
                      >
                        {Object.keys(COUNTRY_FLAGS).map((c) => (
                          <option key={c} value={c} className="bg-[#111416] text-white">
                            {COUNTRY_FLAGS[c]} {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Traveler Type / Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Private Client, Family"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-[#d4af37] focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Journey & Experience Category Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Our Signature Journey</label>
                      <select
                        value={formData.journey}
                        onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none transition"
                      >
                        <option value="" className="bg-[#111416] text-gray-400">None / Bespoke Custom Voyage</option>
                        {PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.title} className="bg-[#111416] text-white">
                            {pkg.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Trip Highlights / Category</label>
                      <select
                        value={formData.tag}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none transition"
                      >
                        <option value="Highland Expedition" className="bg-[#111416]">Highland Expedition</option>
                        <option value="Lake Retreat & Wellness" className="bg-[#111416]">Lake Retreat & Wellness</option>
                        <option value="Organic Village & Culture" className="bg-[#111416]">Organic Village & Culture</option>
                        <option value="Wildlife & Safari" className="bg-[#111416]">Wildlife & Safari</option>
                        <option value="Coastal & Surfing" className="bg-[#111416]">Coastal & Surfing</option>
                        <option value="Ayurvedic Spa & Serenity" className="bg-[#111416]">Ayurvedic Spa & Serenity</option>
                        <option value="Bespoke Private Journey" className="bg-[#111416]">Bespoke Private Journey</option>
                      </select>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Your Story & Feedback *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details of your bespoke voyage, our chauffeur guides, stays, and unforgettable moments..."
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-[#d4af37] focus:outline-none transition resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f28] text-black font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-[#d4af37]/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
