"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, MessageSquare, Sparkles, ChevronDown, ShieldCheck, Globe, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { BespokeButton } from "@/components/ui/BespokeButton";
import { fireBookingConfetti } from "@/lib/booking-confetti";
import Link from "next/link";

const WHATSAPP_LINK = "https://wa.me/94771522718";
const WHATSAPP_NUMBER = "+94 77 15 22 718";
const CONTACT_EMAIL = "info@ihvtravel.com";

const INQUIRY_TYPES = [
  "Bespoke Luxury Journey",
  "Lifestyle & Curated Experience",
  "Partner & B2B Alliance",
  "Corporate & MICE Events",
  "General Inquiry",
];

const FAQS = [
  {
    q: "How fast will the concierge team respond to my request?",
    a: "Our private travel desk responds to all bespoke inquiries within 4 to 12 hours. For urgent travel assistance, our WhatsApp direct line is available 24/7."
  },
  {
    q: "Can you customize itineraries for families or private groups?",
    a: "Absolutely. Every itinerary is fully tailor-made to your preferences, party size, dietary needs, and pace of travel."
  },
  {
    q: "Do you offer private luxury transport and chauffeur guides?",
    a: "Yes, all IHV Travel journeys include dedicated private chauffeur guides, luxury vehicle fleets, and seamless VIP airport transfers."
  },
  {
    q: "How do I initiate a strategic partner or B2B enquiry?",
    a: "You can select 'Partner & B2B Alliance' in the form below or explore our dedicated Partnership Network portal."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Bespoke Luxury Journey",
    guests: "2",
    date: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      fireBookingConfetti("emerald");
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "Bespoke Luxury Journey",
      guests: "2",
      date: "",
      message: "",
    });
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-hidden relative">
      {/* ── Ambient Background Glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#d4af37]/10 via-[#00ff88]/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* ═══ Page Header ═══ */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#00ff88] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              <Sparkles className="w-3 h-3" /> Concierge Desk
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-tight">
              Get in Touch with <span className="text-[#d4af37]">IHV Travel</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
              Whether planning a handcrafted luxury escape, arranging VIP logistics, or establishing a strategic partnership, our travel advisors are at your service.
            </p>
          </motion.div>
        </div>

        {/* ═══ Contact Info Cards ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          {/* Card 1: Head Office */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-zinc-950 border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-5">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-2">Head Office</h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                22/20, Sepali Place,<br />
                Yahampath Mawatha,<br />
                Maharagama, Sri Lanka
              </p>
            </div>
          </motion.div>

          {/* Card 2: Phone Line */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-zinc-950 border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">Direct Phone</h3>
              <a href="tel:+941122160252" className="text-sm text-gray-300 font-light hover:text-white transition-colors block mb-1">
                +94 112 2160252
              </a>
              <span className="text-[11px] text-gray-500 font-light block">Mon - Sat: 8:30 AM - 6:00 PM</span>
            </div>
          </motion.div>

          {/* Card 3: WhatsApp Support */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-zinc-950 border border-[#25D366]/20 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-5">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#25D366] mb-2">WhatsApp Concierge</h3>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 font-light hover:text-[#25D366] transition-colors inline-flex items-center gap-1.5 mb-1"
              >
                {WHATSAPP_NUMBER}
                <ArrowRight className="w-3 h-3 text-[#25D366]" />
              </a>
              <span className="text-[11px] text-gray-500 font-light block">Instant VIP Support (24/7)</span>
            </div>
          </motion.div>

          {/* Card 4: Email Desk */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-zinc-950 border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-5">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-2">Inquiries Email</h3>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-gray-300 font-light hover:text-white transition-colors block mb-1">
                {CONTACT_EMAIL}
              </a>
              <span className="text-[11px] text-gray-500 font-light block">Bespoke Quotations & Support</span>
            </div>
          </motion.div>

        </div>

        {/* ═══ Main Section: Contact Form + Overview ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Information & Trust */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
                Plan Your Sri Lankan Journey with Confidence
              </h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Fill out the concierge inquiry form and our travel experts will craft a personalized proposal matching your travel desires, preferred dates, and budget.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950 border border-white/5">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Licensed & Certified Partner</h4>
                  <p className="text-xs text-gray-400 font-light">Fully licensed by SLTDA & certified by Sri Lanka Tourism Development Authority.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950 border border-white/5">
                <Globe className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Global Partner Network</h4>
                  <p className="text-xs text-gray-400 font-light">Partnered with luxury hotels, private villas, and international travel agents worldwide.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950 border border-white/5">
                <Clock className="w-6 h-6 text-[#00ff88] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">24/7 On-Ground Support</h4>
                  <p className="text-xs text-gray-400 font-light">Dedicated tour coordinator available throughout your stay in Sri Lanka.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-zinc-950 border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Concierge Inquiry Form</h3>
                      <p className="text-xs text-gray-400 font-light">Complete the form below to receive a personalized itinerary.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-black/60 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00ff88] transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-black/60 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00ff88] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-black/60 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00ff88] transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Inquiry Type</label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          className="bg-zinc-900 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white focus:outline-none focus:border-[#00ff88] transition-all cursor-pointer"
                        >
                          {INQUIRY_TYPES.map((type) => (
                            <option key={type} value={type} className="bg-zinc-900 text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Estimated Travel Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="bg-black/60 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white focus:outline-none focus:border-[#00ff88] transition-all [color-scheme:dark]"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Number of Guests</label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="bg-black/60 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white focus:outline-none focus:border-[#00ff88] transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Message or Requirements *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us about your desired destinations, preferred luxury accommodation level, or special requests..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-black/60 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00ff88] transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <BespokeButton
                        variant="emerald"
                        className="!w-full !py-4 shadow-xl text-center flex justify-center items-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Sending Request...</span>
                        ) : (
                          <>
                            Submit Concierge Request <Send className="w-4 h-4" />
                          </>
                        )}
                      </BespokeButton>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-3">Request Submitted!</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md mx-auto mb-8">
                      Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our private concierge desk will review your inquiry and reach out to <span className="text-white font-semibold">{formData.email}</span> within 4 hours.
                    </p>
                    <BespokeButton variant="secondary" onClick={handleReset} className="!px-8 !py-3">
                      Submit Another Inquiry
                    </BespokeButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* ═══ FAQ Accordion Section ═══ */}
        <div className="max-w-4xl mx-auto pt-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37]">Frequently Asked Questions</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3">Everything You Need to Know</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#d4af37] shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-gray-400 font-light leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
