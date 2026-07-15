"use client";
 
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
 
import "swiper/css";
import "swiper/css/pagination";
 
const bicycleTestimonials = [
  {
    name: "Mark Henderson",
    role: "Cycling Enthusiast",
    text: "The forest trails are incredibly well-maintained. Riding through the villages gave me a perspective of Sri Lanka I could never get from a car. Highly recommended for any active traveler.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    location: "Sydney, Australia"
  },
  {
    name: "Elena Petrova",
    role: "Adventure Blogger",
    text: "A world-class experience. The sunrise ride along the lakeside was one of the most cinematic moments of my trip. The bikes are premium and the guides are experts.",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    location: "Moscow, Russia"
  },
  {
    name: "Sanjay Gupta",
    role: "Luxury Traveler",
    text: "I loved the blend of fitness and culture. The village breakfast was delicious and authentic. It's a premium way to explore the heart of nature.",
    image: "https://randomuser.me/api/portraits/men/94.jpg",
    location: "Delhi, India"
  },
  {
    name: "Charlotte Dubois",
    role: "Leisure Cyclist",
    text: "The couples scenic coastal bike ride was spectacular. Stopping for fresh king coconuts on a quiet beach was the absolute highlight of our entire trip.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Paris, France"
  }
];
 
export const BicycleTestimonials = () => {
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
          {bicycleTestimonials.map((t, index) => (
            <SwiperSlide key={index} className="flex">
              <div className="w-full flex flex-col justify-between p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-emerald-500/10 transition-colors" />
 
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
 
                  <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
 
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-emerald-500 text-xs uppercase tracking-widest">{t.location}</p>
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
