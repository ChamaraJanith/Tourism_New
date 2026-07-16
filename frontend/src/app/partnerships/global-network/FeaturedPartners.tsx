import React from 'react';
import { Globe2, ArrowUpRight, Building2, Briefcase } from 'lucide-react';

const FEATURED_PARTNERS = [
  {
    name: 'Global Voyages Ltd',
    country: 'United Kingdom',
    flag: '🇬🇧',
    type: 'Inbound Tour Operator',
    specialization: 'Luxury Leisure & Culture',
    description: 'Premier operator specializing in bespoke high-end cultural and heritage tours across Asia.',
  },
  {
    name: 'Aussie Escapes Travel',
    country: 'Australia',
    flag: '🇦🇺',
    type: 'Travel Agency Network',
    specialization: 'Family & Adventure',
    description: 'Leading Australian agency connecting families and thrill-seekers with tropical adventures.',
  },
  {
    name: 'EuroMICE Connections',
    country: 'Germany',
    flag: '🇩🇪',
    type: 'Corporate & MICE',
    specialization: 'Conferences & Incentives',
    description: 'European corporate travel specialists managing large-scale incentives and global summits.',
  },
  {
    name: 'Wellness Horizons',
    country: 'Switzerland',
    flag: '🇨🇭',
    type: 'Special Interest Travel',
    specialization: 'Ayurveda & Retreats',
    description: 'Niche European operator focusing on premium wellness, yoga, and medical tourism.',
  },
  {
    name: 'Pacific Luxe Travel',
    country: 'United States',
    flag: '🇺🇸',
    type: 'Luxury Concierge',
    specialization: 'Honeymoon & VIP',
    description: 'Exclusive U.S. travel designers curating ultra-luxury honeymoon and VIP private island escapes.',
  },
  {
    name: 'Desert Oasis Tours',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    type: 'Destination Marketer',
    specialization: 'Transit & Short Breaks',
    description: 'Middle Eastern partner driving high-value short-haul and transit tourism to South Asia.',
  },
];

export default function FeaturedPartners() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111416] via-[#d4af37]/5 to-[#111416] pointer-events-none" />
      
      <div className="relative text-center mb-16">
        <span className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
          <Globe2 className="w-3.5 h-3.5" />
          Our Network Profiles
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Featured Global Partners
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          We collaborate with the world's leading travel organizations, from luxury tour operators to specialized corporate travel planners, bringing the best of Sri Lanka to the global market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {FEATURED_PARTNERS.map((partner, idx) => (
          <div 
            key={idx} 
            className="group p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/40 hover:bg-gradient-to-br from-white/10 to-transparent transition-all duration-300 flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111416] border border-[#d4af37]/30 flex items-center justify-center text-2xl shadow-inner shadow-black">
                  {partner.flag}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{partner.country}</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-[#d4af37] transition-colors" />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-300 bg-black/40 px-3 py-1.5 rounded border border-white/5">
                <Building2 className="w-3 h-3 text-[#d4af37]" />
                {partner.type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded border border-[#d4af37]/20">
                <Briefcase className="w-3 h-3" />
                {partner.specialization}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {partner.description}
            </p>

            {/* Action */}
            <button className="text-xs font-semibold uppercase tracking-widest text-white hover:text-[#d4af37] transition-colors flex items-center gap-2 group/btn mt-auto">
              Partner Profile
              <span className="w-6 h-[1px] bg-white group-hover/btn:bg-[#d4af37] group-hover/btn:w-10 transition-all duration-300" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
