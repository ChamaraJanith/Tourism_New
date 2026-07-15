"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, Bike } from "lucide-react";
import { Reveal } from "./reveal";
import { BespokeButton } from "@/components/ui/BespokeButton";
import { fireBookingConfetti } from "@/lib/booking-confetti";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    date: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const experiencesList = [
    "Village Tours",
    "Lakeside Cycling",
    "Forest Adventures",
    "Cultural Rides",
    "Sunrise Expeditions",
    "Other Bespoke Inquiry",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.experience || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate an API submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      fireBookingConfetti("emerald");
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      experience: "",
      date: "",
      message: "",
    });
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#111416] overflow-hidden border-t border-white/[0.03]">
      {/* Background gradients */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#f2be2e]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col h-full justify-between">
            <div>
              <Reveal>
                <span className="text-[#f2be2e] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                  READY TO RIDE
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
                  Let&apos;s craft your custom trail itinerary.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-base text-gray-400 font-light leading-relaxed mb-12">
                  Have questions about custom routes, accommodation booking, bike specifications, or seasonal package deals? Drop us a line, and our southern adventure concierge team will respond with a bespoke itinerary.
                </p>
              </Reveal>

              {/* Contact Information Details */}
              <div className="space-y-8">
                <Reveal delay={0.25}>
                  <div className="flex gap-6 items-start group">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#f2be2e]/60 mb-2">Our Sanctuary Hub</h4>
                      <p className="text-base text-white font-light leading-relaxed">
                        Southern Adventure Hub,<br /> Galle District, Sri Lanka
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex gap-6 items-start group">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#f2be2e]/60 mb-2">Direct Phone Line</h4>
                      <p className="text-base text-white font-light leading-relaxed">
                        +94 91 555 7777
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.35}>
                  <div className="flex gap-6 items-start group">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#f2be2e]/60 mb-2">Inquiries Email</h4>
                      <p className="text-base text-white font-light leading-relaxed">
                        ride@traildiscovery.lk
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.4}>
                  <div className="flex gap-6 items-start group">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#f2be2e]/60 mb-2">Concierge Hours</h4>
                      <p className="text-base text-white font-light leading-relaxed">
                        Daily: 6:00 AM – 8:00 PM (IST)
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Booking/Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-[2.5rem] border border-white/5 bg-[#171b1d] p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
              
              {/* Soft decorative glow inside card */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 relative z-10"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight mb-2">Trail Request Form</h3>
                      <p className="text-xs text-gray-400 font-light">Fields marked with * are required to build your itinerary.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Clara Croft"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/35 transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. clara@domain.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/35 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Experience Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="experience" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Preferred Experience *
                        </label>
                        <div className="relative">
                          <select
                            id="experience"
                            name="experience"
                            required
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full appearance-none bg-[#171b1d] border border-white/10 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/35 transition-all cursor-pointer"
                          >
                            <option value="" disabled className="text-white/20">Select an experience...</option>
                            {experiencesList.map((exp, idx) => (
                              <option key={idx} value={exp} className="bg-[#171b1d] text-white py-2">
                                {exp}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Date Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="date" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Planned Date *
                        </label>
                        <input
                          id="date"
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/35 transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Custom Requests or Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your fitness level, bike sizing, or dietary requests..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/35 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-center">
                      <BespokeButton
                        variant="emerald"
                        className="!w-full sm:!w-auto !py-4 shadow-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Routing Itinerary...
                          </>
                        ) : (
                          <>
                            Send Trail Request <Send className="w-3.5 h-3.5 ml-1" />
                          </>
                        )}
                      </BespokeButton>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 px-4 h-full relative z-10 flex-1"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="p-6 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-8"
                    >
                      <CheckCircle2 className="w-16 h-16" />
                    </motion.div>

                    <h3 className="text-3xl font-display font-bold text-white tracking-tight mb-4">
                      Itinerary Request Logged!
                    </h3>
                    
                    <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md mb-10">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>. Our Trail Discovery concierge is already verifying routes and availability for your selected date (<span className="text-white font-medium">{formData.date}</span>). We will contact you at <span className="text-white font-medium">{formData.email}</span> shortly.
                    </p>

                    <div className="flex gap-4">
                      <BespokeButton variant="secondary" onClick={handleReset} className="!px-8 !py-3.5 !text-[0.68rem]">
                        <Bike className="w-4 h-4 mr-1.5" /> Send Another Request
                      </BespokeButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
