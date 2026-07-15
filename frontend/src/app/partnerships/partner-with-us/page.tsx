import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function PartnerWithUsPage() {
  return (
    <div className="min-h-screen bg-[#111416] text-white pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest text-center">
            Partner With Us
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-12">
            Join our exclusive network of premium tourism service providers and let's craft extraordinary experiences together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/5] border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000&h=1200"
              alt="Partner With Us"
              fill
              className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-transparent" />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Let's Collaborate</h2>
              <p className="text-gray-300">
                Whether you are a luxury hotel, a specialized tour guide, or a global travel agency, we are always looking to expand our horizons with partners who share our commitment to excellence.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30">
                  <Mail className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email</h3>
                  <p className="text-white">partnerships@tourismnetwork.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30">
                  <Phone className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Phone</h3>
                  <p className="text-white">+94 11 234 5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Office</h3>
                  <p className="text-white">Colombo 01, Sri Lanka</p>
                </div>
              </div>
            </div>

            <button className="mt-4 px-8 py-4 bg-white/5 border border-[#d4af37]/50 text-[#d4af37] font-bold uppercase tracking-widest text-sm hover:bg-[#d4af37] hover:text-[#111416] transition-all duration-300 w-fit rounded-lg">
              Submit Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
