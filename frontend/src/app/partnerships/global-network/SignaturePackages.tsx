import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { PACKAGES } from '../../packages/PackageData';

export default function SignaturePackages() {
  // Only show top 3 packages as a preview on the B2B page
  const featuredPackages = PACKAGES.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-16">
        <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
          Curated Experiences
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Our Signature Travel Packages
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
          We offer a diverse portfolio of meticulously crafted travel packages designed to meet the demands of global travelers. Partner with us to offer these premium experiences to your clients.
        </p>
        <Link href="/packages" className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#e5c048] transition-colors shadow-lg shadow-[#d4af37]/20">
          View All Packages in Detail
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {featuredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="group relative bg-[#111416] border border-white/5 rounded-2xl overflow-hidden hover:border-[#d4af37]/30 transition-all duration-500 hover:-translate-y-1 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative w-full h-56 overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pkg.images[0]}
                alt={pkg.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-[#111416]/80 backdrop-blur-md text-[#d4af37] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#d4af37]/30">
                  B2B Ready
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#d4af37] transition-colors">
                {pkg.title}
              </h3>
              
              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span className="text-gray-300">{pkg.duration}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span className="text-gray-400 leading-relaxed line-clamp-3">{pkg.description}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link href="/packages" className="w-full flex items-center justify-between px-6 py-3.5 bg-white/5 hover:bg-[#d4af37] text-white hover:text-black rounded-xl transition-all duration-300 group/btn border border-white/10 hover:border-[#d4af37]">
                <span className="text-xs font-bold uppercase tracking-wider">Explore Details</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
