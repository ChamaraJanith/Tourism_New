"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const waterfallTestimonials = [
  {
    name: "Oliver Grant",
    role: "Adventure Photographer",
    text: "Capturing the mist and the rainbow play at the hidden cascades was a career highlight. The jungle trekking is challenging but the reward is world-class.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    location: "Sydney, Australia"
  },
  {
    name: "Isabella Rossi",
    role: "Wellness Traveler",
    text: "Swimming in those natural pools felt like a complete rebirth. The energy of the falling water is something you have to experience to believe.",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    location: "Milan, Italy"
  },
  {
    name: "Thomas Berg",
    role: "Eco-Tourist",
    text: "I've been to many rainforests, but the biodiversity around these falls is incredible. The expert guides really know the secret spots.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    location: "Oslo, Norway"
  },
  {
    name: "Sophia Martinez",
    role: "Nature Enthusiast",
    text: "The sunrise trek was breathtaking. Swimming in the secluded natural pool with mist all around was a truly meditative experience. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Vancouver, Canada"
  }
];

export const WaterfallTestimonials = () => {
  return (
    <section className="py-24 bg-[#111416] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-medium tracking-[0.2em] uppercase text-sm">Guest Stories</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Voices from the Falls</h2>
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
          {waterfallTestimonials.map((t, index) => (
            <SwiperSlide key={index} className="flex">
              <div className="w-full flex flex-col justify-between p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-blue-500/10 transition-colors" />
 
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                    ))}
                  </div>
 
                  <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
 
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-blue-500 text-xs uppercase tracking-widest">{t.location}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
 
      <style jsx global>{`
        .swiper-wrapper {
          display: flex !important;
        }
        .swiper-slide {
          height: auto !important;
          display: flex !important;
        }
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
