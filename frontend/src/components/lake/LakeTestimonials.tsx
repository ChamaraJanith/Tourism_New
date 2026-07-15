"use client";

import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Elena Rodriguez",
    country: "Spain",
    text: "The light at dawn on Dandeniya Lake is unlike anything I've ever captured. The boat ride was so peaceful, it felt like we were the only people on earth.",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    name: "James Chen",
    country: "Singapore",
    text: "Seeing the endemic birds so close while drifting in a traditional boat was the highlight of my Sri Lanka trip. Truly an authentic, premium experience.",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Sophie Laurent",
    country: "France",
    text: "The mangrove boat tour was magical. Our guide knew every bend of the water—calm, unhurried, and deeply connected to the lake's rhythm.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Michael O'Brien",
    country: "Ireland",
    text: "Sunset on the lake was the most peaceful moment of our entire holiday. Quiet propulsion, warm hospitality, and scenery that stays with you.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

export const LakeTestimonials = () => {
  return (
    <section className="py-24 bg-[#111416] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm">Guest Stories</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Voices of the Lake</h2>
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
              <div className="h-full p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-blue-500/10 transition-colors" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                  ))}
                </div>

                <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-blue-500 text-xs uppercase tracking-widest">{t.country}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #3b82f6 !important;
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
