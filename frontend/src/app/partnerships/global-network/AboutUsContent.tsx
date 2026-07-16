import React from 'react';
import { Eye, Target, BookOpen, Layers, Award, Users, Handshake } from 'lucide-react';

export default function AboutUsContent() {
  return (
    <section id="about" className="py-24 relative bg-[#070c14] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-20">
          <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
            Corporate Profile
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0 border border-[#d4af37]/20">
                <Eye className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Company Vision</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-justify">
              To become Asia's leading integrated destination management and global tourism partnership company, connecting international markets with authentic, sustainable, and world-class Sri Lankan hospitality experiences.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0 border border-[#d4af37]/20">
                <Target className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Company Mission</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-justify">
              To create exceptional travel experiences by combining destination management, strategic partnerships, hospitality expertise, and innovative tourism solutions while delivering value to travelers, business partners, local communities, and the tourism industry.
            </p>
          </div>
        </div>

        <div className="space-y-20">
          {/* Our Story */}
          <div className="bg-[#111416] p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <BookOpen className="w-6 h-6 text-[#d4af37]" />
              <h3 className="text-2xl font-bold text-white">Our Story</h3>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed text-justify relative z-10">
              <p>
                International Hospitality Ventures (Private) Limited was established with a vision to redefine how Sri Lanka is presented to the world. Rather than operating as a traditional travel agency, we serve as an integrated destination management company that connects international travel businesses, hospitality providers, investors, and local tourism partners through one trusted platform.
              </p>
              <p>
                Our approach is built on collaboration, innovation, and long-term partnerships. By combining local expertise with international standards, we create tailor-made travel experiences while contributing to the sustainable growth of Sri Lanka's tourism and hospitality sectors.
              </p>
            </div>
          </div>

          {/* Business Model */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <Layers className="w-8 h-8 text-[#d4af37]" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">Our Business Model</h3>
              </div>
            </div>
            <div className="lg:col-span-8 bg-[#111416] p-8 rounded-3xl border border-white/5 space-y-4 text-gray-400 leading-relaxed text-justify">
              <p>
                We operate as a strategic destination management partner, bringing together international tour operators, travel agencies, hotels, resorts, transportation providers, wellness centres, event organisers, and tourism stakeholders to deliver seamless travel experiences.
              </p>
              <p>
                Our business extends beyond leisure travel to include corporate travel, MICE, wellness tourism, medical tourism, educational travel, luxury hospitality, destination consulting, and hospitality investment facilitation. This integrated approach enables us to provide comprehensive solutions under one roof.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <div className="flex items-center gap-4 mb-10 justify-center">
              <Award className="w-8 h-8 text-[#d4af37]" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Core Values</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Excellence in Service",
                "Integrity and Transparency",
                "Innovation and Continuous Improvement",
                "Sustainable and Responsible Tourism",
                "Customer-Centric Experiences",
                "Collaboration and Strategic Partnerships",
                "Respect for Culture, Communities, and the Environment",
                "Professionalism and Accountability"
              ].map((value, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-colors group">
                  <span className="text-gray-300 font-medium text-sm group-hover:text-white transition-colors">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Leadership */}
            <div className="bg-[#111416] p-8 md:p-10 rounded-3xl border border-[#d4af37]/20 shadow-[0_10px_30px_-15px_rgba(212,175,55,0.1)] relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <Users className="w-6 h-6 text-[#d4af37]" />
                <h3 className="text-2xl font-bold text-white">Leadership</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-justify text-sm relative z-10">
                Our leadership team brings together professionals with diverse expertise in tourism, hospitality, business strategy, technology, finance, and international partnerships. United by a shared passion for Sri Lanka and its tourism potential, they are committed to building meaningful relationships, embracing innovation, and delivering exceptional value to clients and partners. Their vision and experience guide the company in creating sustainable growth while maintaining the highest standards of professionalism, service excellence, and ethical business practices.
              </p>
            </div>

            {/* Strategic Partnerships */}
            <div className="bg-[#111416] p-8 md:p-10 rounded-3xl border border-[#d4af37]/20 shadow-[0_10px_30px_-15px_rgba(212,175,55,0.1)] relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <Handshake className="w-6 h-6 text-[#d4af37]" />
                <h3 className="text-2xl font-bold text-white">Strategic Partnerships</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-justify text-sm relative z-10">
                Our success is built on strong and trusted partnerships. We collaborate with international tour operators, travel agencies, hotels, resorts, airlines, hospitality professionals, universities, government institutions, tourism organisations, investors, and destination experts to create mutually beneficial opportunities. Through these strategic alliances, we deliver seamless travel experiences, expand market access, encourage innovation, and contribute to the long-term development of Sri Lanka's tourism and hospitality industry.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
