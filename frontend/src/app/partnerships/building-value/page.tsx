import React from 'react';
import Image from 'next/image';

export default function BuildingValuePage() {
  return (
    <div className="min-h-screen bg-[#111416] text-white pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest text-center">
            Building Partnerships That Create Lasting Value
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-12">
            We believe in building mutually beneficial, long-term relationships that not only elevate our offerings but also enrich the communities we operate in.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] border border-white/10 group">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920&h=800"
            alt="Lasting Value"
            fill
            className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Sustainable Growth</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our partnerships are deeply rooted in sustainable practices, ensuring that the beauty and heritage of our destinations are preserved for generations to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
