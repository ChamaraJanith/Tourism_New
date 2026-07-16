import React from 'react';
import { Handshake, Target, BarChart3, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

const MODELS = [
  {
    icon: <Handshake className="w-6 h-6 text-[#d4af37]" />,
    title: 'Inbound Tour Operators',
    description: 'We act as your dedicated ground handler in Sri Lanka, offering seamless logistics, competitive B2B rates, and 24/7 on-ground support for your clients.'
  },
  {
    icon: <Target className="w-6 h-6 text-[#d4af37]" />,
    title: 'Destination Marketers',
    description: 'Collaborate on joint marketing campaigns, FAM trips, and global roadshows to position Sri Lanka as a top-tier destination in your source market.'
  },
  {
    icon: <Building2 className="w-6 h-6 text-[#d4af37]" />,
    title: 'Hospitality Alliances',
    description: 'Direct partnerships with global hotel chains and boutique properties to cross-promote luxury stays and exclusive member benefits.'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#d4af37]" />,
    title: 'Media & Trade Reps',
    description: 'Engage with leading travel media, PR agencies, and trade representatives to amplify our reach and build high-value brand awareness.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
    title: 'MICE & Corporate',
    description: 'Specialized support for international event planners, offering unique venues, team-building excursions, and end-to-end event logistics.'
  },
  {
    icon: <Leaf className="w-6 h-6 text-[#d4af37]" />,
    title: 'Sustainability Partners',
    description: 'Join forces with eco-conscious organizations to promote regenerative tourism, wildlife conservation, and community upliftment.'
  }
];

import { Building2 } from 'lucide-react'; // Fix import for Building2

export default function PartnershipBenefits() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-16">
        <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
          Collaboration Models
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          How We Work Together
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          We offer flexible, scalable, and highly rewarding partnership models tailored to your business objectives and target audience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {MODELS.map((model, idx) => (
          <div 
            key={idx}
            className="group p-8 rounded-2xl bg-[#111416] border border-white/5 hover:border-[#d4af37]/30 transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)] hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-all duration-500">
              {model.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#d4af37] transition-colors">
              {model.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {model.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
