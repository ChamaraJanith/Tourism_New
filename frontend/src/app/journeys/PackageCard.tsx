'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, CheckCircle2, Info, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  pkg: {
    id: number;
    title: string;
    duration: string;
    description: string;
    images: string[];
    includes: string[];
    idealFor: string;
  };
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-slideshow when not hovering
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isHovering && pkg.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev === pkg.images.length - 1 ? 0 : prev + 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isHovering, pkg.images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === pkg.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? pkg.images.length - 1 : prev - 1));
  };

  return (
    <div 
      className={`group relative bg-[#111416] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.15)] flex flex-col ${isExpanded ? 'ring-1 ring-[#d4af37]/30' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slideshow Container */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden bg-[#070c14]">
        {pkg.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${pkg.title} - Image ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${idx === currentImage ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-black/30 z-10" />

        {/* Slideshow Controls */}
        {pkg.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#d4af37] hover:text-black ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#d4af37] hover:text-black ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {pkg.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-[#d4af37] w-4' : 'bg-white/50 hover:bg-white'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 -mt-8">
        
        {/* Duration Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#111416] border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-black/50">
            <Clock className="w-3.5 h-3.5" />
            {pkg.duration}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors leading-tight">
          {pkg.id}. {pkg.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {pkg.description}
        </p>

        {/* Expand/Collapse Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#f3e5ab] transition-colors w-max mb-6 outline-none"
        >
          <Info className="w-4 h-4" />
          {isExpanded ? 'Hide Details' : 'More Info'}
        </button>

        {/* Expandable Section */}
        <div 
          className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
        >
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                Journey Includes:
              </h4>
              <ul className="space-y-2 mb-6">
                {pkg.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-4 flex items-start gap-3">
                <Users className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white text-xs font-semibold uppercase tracking-wider mb-1">Ideal For</span>
                  <span className="text-gray-400 text-sm leading-snug">{pkg.idealFor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-white/5 to-white/5 hover:from-[#d4af37]/90 hover:to-[#c5a028] text-white hover:text-black rounded-xl transition-all duration-300 border border-white/10 hover:border-[#d4af37] font-bold uppercase tracking-wider text-xs">
            Request Itinerary
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
