import React from 'react';
import Image from 'next/image';

export default function GlobalNetworkPage() {
  return (
    <div className="min-h-screen bg-[#111416] text-white pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest text-center">
            Our Global Strategic Partner Network
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-12">
            Connecting with world-class organizations to elevate luxury travel standards globally.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] border border-white/10 group">
          <Image
            src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=80&w=1920&h=800"
            alt="Global Strategic Partners"
            fill
            className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">World-Class Connections</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Through strategic global partnerships, we ensure our clients receive unparalleled service wherever they go.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
