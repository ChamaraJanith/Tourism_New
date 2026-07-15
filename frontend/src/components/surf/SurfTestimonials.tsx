"use client";

import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Leo Fitzgerald",
    country: "South Africa",
    text: "Hiriketiya is the office of my dreams. I surf in the morning, work from a beach café in the afternoon, and watch the sunset with the coolest people I've met on my travels.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Emma van der Berg",
    country: "Netherlands",
    text: "I was terrified of the ocean, but the instructors here are so patient. I stood up on my very first wave! The bay feels so safe and welcoming.",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    name: "Kenji Hayashi",
    country: "Japan",
    text: "The sunrise yoga on the sand followed by a fresh King Coconut is my morning ritual here. It's a true tropical sanctuary for the mind.",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    name: "Sofia Martins",
    country: "Portugal",
    text: "The horseshoe bay is magical at golden hour. Between surf sessions and beach cafés, this became my favorite stop on the southern coast.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

export const SurfTestimonials = () => {
  return (
    <section className="py-24 bg-[#111416] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-medium tracking-[0.2em] uppercase text-sm">Guest Stories</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Voices from the Bay</h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="pb-16"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="h-full p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-500">
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-cyan-400/10 transition-colors" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-cyan-400 text-xs uppercase tracking-widest">{t.country}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #22d3ee !important;
          opacity: 0.2;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};
