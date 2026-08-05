'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, CheckCircle2, Info, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/hooks/store';

interface PackageCardProps {
  pkg: {
    id: number;
    title: string;
    duration: string;
    description: string;
    images: string[];
    includes: string[];
    idealFor: string;
  };
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Modal and form states
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formNic, setFormNic] = useState('');
  const [formDob, setFormDob] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { user } = useAppSelector((state) => state.auth);

  // Pre-fill user details if logged in
  useEffect(() => {
    if (user) {
      setFormName(user.name || '');
      setFormEmail(user.email || '');
      setFormPhone(user.contactNumber || '');
      setFormCountry(user.country || '');
      setFormNic(user.nic || '');
      setFormDob(user.dob || '');
    }
  }, [user]);

  // Auto-slideshow when not hovering
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isHovering && pkg.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev === pkg.images.length - 1 ? 0 : prev + 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isHovering, pkg.images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === pkg.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? pkg.images.length - 1 : prev - 1));
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/itinerary/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageTitle: pkg.title,
          packageDuration: pkg.duration,
          clientName: formName,
          clientEmail: formEmail,
          clientPhone: formPhone,
          clientCountry: formCountry,
          clientNic: formNic,
          clientDob: formDob,
          clientNotes: formNotes,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send itinerary request.');
      }

      setSuccessMsg('Your itinerary request has been submitted successfully! We will get in touch shortly.');
      setFormNotes('');
      // Auto close modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg('');
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div 
      className={`group relative bg-[#111416] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.15)] flex flex-col ${isExpanded ? 'ring-1 ring-[#d4af37]/30' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slideshow Container */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden bg-[#070c14]">
        {pkg.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${pkg.title} - Image ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${idx === currentImage ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-black/30 z-10" />

        {/* Slideshow Controls */}
        {pkg.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#d4af37] hover:text-black ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#d4af37] hover:text-black ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {pkg.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-[#d4af37] w-4' : 'bg-white/50 hover:bg-white'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 -mt-8">
        
        {/* Duration Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#111416] border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-black/50">
            <Clock className="w-3.5 h-3.5" />
            {pkg.duration}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors leading-tight">
          {pkg.id}. {pkg.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {pkg.description}
        </p>

        {/* Expand/Collapse Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#f3e5ab] transition-colors w-max mb-6 outline-none"
        >
          <Info className="w-4 h-4" />
          {isExpanded ? 'Hide Details' : 'More Info'}
        </button>

        {/* Expandable Section */}
        <div 
          className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
        >
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                Journey Includes:
              </h4>
              <ul className="space-y-2 mb-6">
                {pkg.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-4 flex items-start gap-3">
                <Users className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white text-xs font-semibold uppercase tracking-wider mb-1">Ideal For</span>
                  <span className="text-gray-400 text-sm leading-snug">{pkg.idealFor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-white/5 to-white/5 hover:from-[#d4af37]/90 hover:to-[#c5a028] text-white hover:text-black rounded-xl transition-all duration-300 border border-white/10 hover:border-[#d4af37] font-bold uppercase tracking-wider text-xs"
          >
            Request Itinerary
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Modal Backdrop & Content */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#111416]/95 border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                disabled={isSending}
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Request Details</span>
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white mt-1">
                  {pkg.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Fill in your details and we will email you the custom curated itinerary.
                </p>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                {/* Status Message */}
                {errorMsg && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium">
                    {successMsg}
                  </div>
                )}

                {/* Client Name */}
                <div className="space-y-1">
                  <label className="text-[0.65rem] uppercase tracking-wider text-zinc-400 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    disabled={isSending}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                  />
                </div>

                {/* Client Email */}
                <div className="space-y-1">
                  <label className="text-[0.65rem] uppercase tracking-wider text-zinc-400 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    disabled={isSending}
                    placeholder="you@example.com"
                    className="w-full bg-zinc-950/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                  />
                </div>

                {/* Client Phone & Country Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Country */}
                  <div className="space-y-1">
                    <label className="text-[0.65rem] uppercase tracking-wider text-zinc-400 font-semibold">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      disabled={isSending}
                      placeholder="Country"
                      className="w-full bg-zinc-950/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                    />
                  </div>

                  {/* Client Phone */}
                  <div className="space-y-1">
                    <label className="text-[0.65rem] uppercase tracking-wider text-zinc-400 font-semibold">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      disabled={isSending}
                      placeholder="Phone Number"
                      className="w-full bg-zinc-950/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                    />
                  </div>
                </div>

                {/* Client NIC & Date of Birth Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client NIC */}
                  <div className="space-y-1">
                    <label className="text-[0.65rem] uppercase tracking-wider text-zinc-400 font-semibold">
                      NIC Number
                    </label>
                    <input
                      type="text"
                      value={formNic}
                      onChange={(e) => setFormNic(e.target.value)}
                      disabled={isSending}
                      placeholder="NIC (e.g. 199912345678)"
                      className="w-full bg-zinc-950/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                    />
                  </div>

                  {/* Client DOB */}
                  <div className="space-y-1">
                    <label className="text-[0.65rem] uppercase tracking-wider text-zinc-400 font-semibold">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formDob}
                      onChange={(e) => setFormDob(e.target.value)}
                      disabled={isSending}
                      className="w-full bg-zinc-950/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Custom Notes */}
                <div className="space-y-1">
                  <label className="text-[0.65rem] uppercase tracking-wider text-zinc-400 font-semibold">
                    Special Customization Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    disabled={isSending}
                    placeholder="E.g. Travel dates, number of guests, diet requirements..."
                    className="w-full bg-zinc-950/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:from-white hover:to-white hover:text-black transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {isSending ? "Sending Itinerary..." : "Confirm Request"}
                    {!isSending && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
