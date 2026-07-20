import React from 'react';
import { PACKAGES } from './PackageData';
import PackageCard from './PackageCard';
import { Sparkles, Map } from 'lucide-react';

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#070c14] text-white">
      <main className="pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">
          
          {/* Hero Section */}
          <section className="text-center mb-20">
            <span className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Curated Experiences
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
              Our Signature <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]">Journeys</span>
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              We offer a diverse portfolio of meticulously crafted travel packages designed to meet the demands of global travelers. Explore our signature itineraries featuring the very best of Sri Lanka.
            </p>
          </section>

          {/* Packages Grid */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {PACKAGES.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </section>

          {/* Tailor-Made Journeys & Closing */}
          <section className="relative overflow-hidden rounded-3xl border border-[#d4af37]/20 bg-[#111416] p-10 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.05)_0%,transparent_60%)]" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                    <Map className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Tailor-Made Journeys</h2>
                </div>
                
                <p className="text-gray-400 leading-relaxed text-lg mb-8">
                  Every traveler is unique, and so is every journey we create. If you have specific interests, travel dates, or special requirements, our destination specialists will design a fully customized itinerary exclusively for you.
                </p>

                <button className="bg-[#d4af37] hover:bg-[#e5c048] text-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_10px_40px_-5px_rgba(212,175,55,0.6)]">
                  Request Custom Itinerary
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl backdrop-blur-sm">
                <p className="text-gray-300 leading-relaxed text-sm md:text-base text-justify">
                  <strong className="text-white block mb-4 text-lg">International Hospitality Ventures (Private) Limited</strong>
                  transforms travel into exceptional experiences through personalized service, trusted partnerships, and authentic Sri Lankan hospitality. From luxury escapes and wellness retreats to corporate events and bespoke adventures, we are committed to delivering journeys that inspire, connect, and create lasting memories.
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
