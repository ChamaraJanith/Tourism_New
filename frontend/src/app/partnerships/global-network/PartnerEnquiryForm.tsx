'use client';
import React, { useState } from 'react';
import { Send, Building2, User, Mail, Globe, MapPin, Target } from 'lucide-react';

export default function PartnerEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[#070c14] z-0" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Become a Partner
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Join Our Global Network
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Register your interest to access exclusive B2B rates, co-branded marketing materials, and dedicated ground support for your Sri Lankan operations.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#111416] border border-[#d4af37]/30 rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Request Received</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Thank you for your interest in partnering with us. Our B2B relations team will review your profile and contact you within 24 hours.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 border border-[#d4af37]/50 text-[#d4af37] rounded-xl hover:bg-[#d4af37]/10 transition-colors text-sm font-bold uppercase tracking-wider"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#111416] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#d4af37]/5 rounded-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#d4af37]" /> Full Name
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#d4af37]" /> Business Email
                </label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  placeholder="john@travelagency.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#d4af37]" /> Company Name
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  placeholder="Global Travel Solutions"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Country/Region
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  placeholder="United Kingdom"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#d4af37]" /> Website URL (Optional)
                </label>
                <input 
                  type="url" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  placeholder="https://www.yourcompany.com"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-[#d4af37]" /> Partnership Interest
                </label>
                <select 
                  required
                  id="businessType"
                  defaultValue=""
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                >
                  <option value="" disabled className="text-gray-900">Select Business Type</option>
                  <option value="tour_operator" className="text-gray-900">Inbound Tour Operator</option>
                  <option value="travel_agency" className="text-gray-900">Retail Travel Agency</option>
                  <option value="corporate_mice" className="text-gray-900">Corporate & MICE Planner</option>
                  <option value="media_pr" className="text-gray-900">Media & PR Agency</option>
                  <option value="other" className="text-gray-900">Other Strategic Partnership</option>
                </select>
              </div>

            </div>

            <div className="mt-10 relative z-10 text-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#e5c048] text-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-[0_10px_20px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_10px_30px_-5px_rgba(212,175,55,0.6)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Request
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
