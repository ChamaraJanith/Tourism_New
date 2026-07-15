import React from 'react';
import Image from 'next/image';

const segments = [
  "Luxury & Ultra-Luxury Tourism",
  "Leisure & Holiday Tourism",
  "Medical Tourism",
  "Wellness & Ayurveda Tourism",
  "Long-Stay Tourism",
  "Retirement & Senior Living Hospitality",
  "Spiritual & Religious Tourism",
  "Adventure Tourism",
  "Wildlife & Nature Tourism",
  "Marine & Coastal Tourism",
  "Eco & Sustainable Tourism",
  "Cultural & Heritage Tourism",
  "Community-Based Tourism",
  "Honeymoon & Romantic Escapes",
  "Family Holidays",
  "MICE (Meetings, Incentives, Conferences & Exhibitions)",
  "Destination Weddings",
  "Culinary Tourism",
  "Educational Travel",
  "Sports Tourism",
  "Digital Nomad & Remote Working Tourism",
  "Plantation & Agricultural Tourism",
  "Film & Photography Tourism",
  "Tailor-Made & Special Interest Travel"
];

export default function TourismSegmentsPage() {
  return (
    <div className="min-h-screen bg-[#111416] text-white pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest">
            Tourism Segments We Support
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We work across a diverse range of tourism markets to provide tailored, world-class experiences. Discover our specialized segments below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {segments.map((segment, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/5 aspect-[4/3] flex items-end p-6 hover:border-[#d4af37]/30 transition-all duration-500"
            >
              {/* Image Placeholder */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&h=600&random=${index}`}
                  alt={segment}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-[#111416]/50 to-transparent" />
              </div>
              
              <div className="relative z-10 w-full">
                <h3 className="text-sm md:text-base font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300">
                  {segment}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
