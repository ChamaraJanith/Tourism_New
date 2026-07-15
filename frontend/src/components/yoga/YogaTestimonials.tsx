"use client";
 
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
 
import "swiper/css";
import "swiper/css/pagination";
 
const yogaTestimonials = [
  {
    name: "Aria Thorne",
    role: "Digital Detoxer",
    text: "The sunrise yoga on the cliffs was a life-altering moment. I came here exhausted from work and left feeling like a completely different person. The Ayurvedic oils are magical.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    location: "New York, USA"
  },
  {
    name: "David Mueller",
    role: "Spiritual Seeker",
    text: "I've visited many retreats, but the authenticity here is unmatched. The temple blessing rituals and the sound healing sessions at sunset are deeply moving.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    location: "Berlin, Germany"
  },
  {
    name: "Emi Tanaka",
    role: "Yoga Instructor",
    text: "The energy of the meditation pavilion is incredibly grounding. The Ayurvedic food alone is worth the trip—so clean, so flavorful, and so nourishing for the soul.",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    location: "Tokyo, Japan"
  },
  {
    name: "Marcus Aurelius",
    role: "Mindfulness Seeker",
    text: "An absolute oasis of peace. Running trails through the jungle and finishing with a guided meditation session by the river completely restored my focus.",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    location: "Rome, Italy"
  }
];
 
export const YogaTestimonials = () => {
  return (
    <section className="py-24 bg-[#111416] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-medium tracking-[0.2em] uppercase text-sm">Guest Stories</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Voices from the Sanctuary</h2>
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
          {yogaTestimonials.map((t, index) => (
            <SwiperSlide key={index} className="flex">
              <div className="w-full flex flex-col justify-between p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:text-amber-500/10 transition-colors" />
 
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
 
                  <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
 
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-amber-500 text-xs uppercase tracking-widest">{t.location}</p>
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
          background: #f59e0b !important;
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
