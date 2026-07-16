import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function BrochureCTA() {
  return (
    <section className="py-8 md:py-12">
      <div className="relative rounded-3xl overflow-hidden">
        {/* Background gradient and image overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111416] via-[#1a1f26] to-[#d4af37]/20 z-0" />
        <div 
          className="absolute inset-0 opacity-20 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture5.jpg)' }}
        />
        
        <div className="relative z-10 px-8 py-16 md:py-20 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-black/40 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <FileText className="w-3.5 h-3.5" />
              B2B Resources
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Our Signature <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]">
                Travel Packages
              </span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
              Download our comprehensive B2B brochure featuring detailed itineraries, wholesale pricing guidelines, seasonal availability, and partnership margins. Empower your sales team with our expertly crafted Sri Lankan experiences.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
            <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#c5a028] hover:from-[#e5c048] hover:to-[#d4af37] text-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_10px_40px_-5px_rgba(212,175,55,0.6)]">
              <Download className="w-5 h-5" />
              Download Brochure
            </button>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest text-center">
              PDF Format • 4.2 MB • Updated 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
