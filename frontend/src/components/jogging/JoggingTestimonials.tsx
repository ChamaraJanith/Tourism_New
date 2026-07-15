"use client";

import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Marcus Thorne",
    country: "Germany",
    text: "I've run trails in the Alps and New Zealand, but the lakeside paths here offer a level of serenity I've never experienced before. The oxygen purity is noticeable.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Elena Rodriguez",
    country: "Spain",
    text: "As someone who jogs for mental health, this sanctuary was exactly what I needed. The forest canopy stops and the organic breakfast are divine.",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
  },
  {
    name: "David Chen",
    country: "Singapore",
    text: "Working remotely can be draining. Starting my morning with a 10km trail run through the tropical mist changed my entire work-life balance.",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Sarah Mitchell",
    country: "Australia",
    text: "The sunrise jogging routes are world-class. Every step felt like a reset for both body and mind in the most beautiful natural setting.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

export const JoggingTestimonials = () => {
  return (
    <section className="py-24 bg-[#111416] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-emerald-500 font-medium tracking-[0.2em] uppercase text-sm">Guest Stories</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Voices from the Trail</h2>
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
              <div className="h-full p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-emerald-500/10 transition-colors" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>

                <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-emerald-500 text-xs uppercase tracking-widest">{t.country}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #10b981 !important;
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
