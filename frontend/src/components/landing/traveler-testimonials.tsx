"use client";
 
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, X } from "lucide-react";
import { Reveal } from "./reveal";
 
// Real mock testimonials
const testimonials = [
  {
    name: "Eleanor Vance",
    role: "Private Client",
    country: "United Kingdom",
    flag: "🇬🇧",
    avatar: "/images/reviewer1.jpg", // placeholder
    rating: 5,
    quote: "A perfectly paced exploration of Sri Lanka's hidden highlands. The expert local guides knew every secret tea plantation trail. Pure luxury coupled with wild, raw authenticity.",
    tags: ["Highland Expedition", "Culture Trails"],
    bgImage: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=1200",
    shortQuote: "The expert local guides knew every secret tea plantation trail. Pure luxury coupled with wild, raw authenticity.",
    videoUrl: "https://www.youtube.com/embed/eXbqp2u3wms?autoplay=1"
  },
  {
    name: "Marcus Aurelius",
    role: "Bespoke Adventurer",
    country: "Germany",
    flag: "🇩🇪",
    avatar: "/images/reviewer2.jpg",
    rating: 5,
    quote: "Booking the Dandeniya Lake retreat was the best wellness decision I've ever made. The sound of birds at sunrise, combined with organic food and top-tier service, was unmatched.",
    tags: ["Lake Retreat", "Ayurvedic Spa"],
    bgImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
    shortQuote: "Booking the Dandeniya Lake retreat was the best wellness decision I've ever made. Top-tier service was unmatched.",
    videoUrl: "https://www.youtube.com/embed/HdH1s90L0Q4?autoplay=1"
  },
  {
    name: "Samantha Miller",
    role: "Family Retreat",
    country: "United States",
    flag: "🇺🇸",
    avatar: "/images/reviewer3.jpg",
    rating: 5,
    quote: "Our bespoke organic farming day combined with a culinary workshop blew us away. The children learned to harvest local yams while we sipped fresh coconut water.",
    tags: ["Organic Village", "Local Kitchen"],
    bgImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200",
    shortQuote: "Our bespoke organic farming day combined with a culinary workshop blew us away. Sipping fresh coconut water.",
    videoUrl: "https://www.youtube.com/embed/8_3a7qWkP88?autoplay=1"
  }
];
 
export function TravelerTestimonials() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <section 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-24 sm:py-32 bg-[#0a0c0e] overflow-hidden"
    >
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes progress-bar-timer {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#70305f]/5 to-transparent rounded-full blur-[80px] pointer-events-none" />
 
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Headings & Trust platforms */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-white font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                GUEST REVIEWS
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1]">
                Stories from our global family of elite travelers.
              </h2>
            </Reveal>
          </div>
 
          {/* Trust Ratings Badges */}
          <div className="flex flex-wrap gap-4 items-center self-start md:self-end">
            {/* Google Reviews Badge */}
            <div className="flex items-center gap-3 bg-[#111416] px-5 py-3 rounded-2xl border border-white/5 shadow-2xl">
              <span className="w-5 h-5 flex items-center justify-center bg-red-500/10 text-red-400 rounded-full font-bold text-xs">G</span>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">
                  5.0 on Google Reviews
                </div>
              </div>
            </div>
 
            {/* TripAdvisor Badge */}
            <div className="flex items-center gap-3 bg-[#111416] px-5 py-3 rounded-2xl border border-white/5 shadow-2xl">
              <span className="w-5 h-5 flex items-center justify-center bg-emerald-500/10 text-emerald-400 rounded-full font-bold text-xs">O</span>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <div className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">
                  Excellent on TripAdvisor
                </div>
              </div>
            </div>
          </div>
        </div>
 
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Video Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[460px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#111416] shadow-2xl flex flex-col justify-end p-6 sm:p-10"
          >
            {/* Background image preview with cross-fade animation */}
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.75, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={testimonials[activeTestimonial].bgImage} 
                    alt={`${testimonials[activeTestimonial].name} Video Testimonial`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out grayscale-[20%]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
 
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlayingVideo(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/95 text-[#1c2224] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:bg-[#f2be2e] hover:text-black z-10"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            </div>
 
            {/* Floating Review Summary Card with animation */}
            <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl max-w-md self-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-1.5 mb-2 text-amber-500">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-300 italic font-medium leading-relaxed mb-3">
                    &ldquo;{testimonials[activeTestimonial].shortQuote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{testimonials[activeTestimonial].name}</span>
                    <span className="text-[10px] text-gray-400 uppercase">{testimonials[activeTestimonial].country} {testimonials[activeTestimonial].flag}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
 
          {/* Custom Interactive Review Cards Slider */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {testimonials.map((item, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`p-6 sm:p-8 rounded-[2rem] border cursor-pointer transition-all duration-500 relative overflow-hidden ${
                    idx === activeTestimonial
                      ? "bg-[#111416] border-white/10 shadow-2xl scale-100"
                      : "bg-white/5 border-white/5 opacity-60 hover:opacity-100 scale-95"
                  }`}
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/5 bg-white/5">
                        <span className={`w-full h-full flex items-center justify-center font-bold text-sm ${idx === activeTestimonial ? 'bg-[#f2be2e] text-black' : 'bg-white/10 text-white'}`}>
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{item.name}</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.flag}</span>
                      <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">{item.country}</span>
                    </div>
                  </div>
 
                  <p className="text-sm text-gray-300 leading-relaxed font-light mb-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>
 
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white/5 text-gray-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Active Progress Bar timer */}
                  {idx === activeTestimonial && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
                      <div 
                        key={activeTestimonial}
                        onAnimationEnd={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                        className="h-full bg-[#f2be2e]" 
                        style={{
                          animation: 'progress-bar-timer 6000ms linear forwards',
                          animationPlayState: (isHovered || isPlayingVideo) ? 'paused' : 'running'
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
 
        </div>
      </div>
 
      {/* Video Modal Overlay Player */}
      <AnimatePresence>
        {isPlayingVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setIsPlayingVideo(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#111416]"
            >
              {/* Clean luxury mock YouTube/Vimeo embed or local video file */}
              <iframe 
                src={testimonials[activeTestimonial].videoUrl}
                title="Bespoke Journeys Video Testimonial"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
