"use client";
 
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Camera, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
 
const items = [
  {
    "title": "Local Kitchen Dining VIII",
    "tag": "Culinary Series",
    "image": "/images/food/8.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf III",
    "tag": "Surfing",
    "image": "/images/hirikatiya/3.jpg"
  },
  {
    "title": "Dandeniya Sanctuary VII",
    "tag": "Lake Retreat",
    "image": "/images/lake/7.webp"
  },
  {
    "title": "Scenic Heritage Run VII",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/7.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf VIII",
    "tag": "Surfing",
    "image": "/images/hirikatiya/8.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XI",
    "tag": "Organic Farm",
    "image": "/images/farm/11.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf I",
    "tag": "Surfing",
    "image": "/images/hirikatiya/1.webp"
  },
  {
    "title": "Visual Chronicles V",
    "tag": "Local Heritage",
    "image": "/images/5.jpg"
  },
  {
    "title": "Scenic Heritage Run IX",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/9.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting VI",
    "tag": "Organic Farm",
    "image": "/images/farm/6.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting IX",
    "tag": "Organic Farm",
    "image": "/images/farm/9.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf X",
    "tag": "Surfing",
    "image": "/images/hirikatiya/10.jpg"
  },
  {
    "title": "Cascading Diyaluma II",
    "tag": "Waterfall Expedition",
    "image": "/images/waterfall/2.webp"
  },
  {
    "title": "Zen Garden Pavilion V",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/5.jpg"
  },
  {
    "title": "Visual Chronicles II",
    "tag": "Local Heritage",
    "image": "/images/2.jpg"
  },
  {
    "title": "Cascading Diyaluma VIII",
    "tag": "Waterfall Expedition",
    "image": "/images/waterfall/8.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XIX",
    "tag": "Organic Farm",
    "image": "/images/farm/19.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting VII",
    "tag": "Organic Farm",
    "image": "/images/farm/7.png"
  },
  {
    "title": "Dandeniya Sanctuary I",
    "tag": "Lake Retreat",
    "image": "/images/lake/1.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting III",
    "tag": "Organic Farm",
    "image": "/images/farm/3.webp"
  },
  {
    "title": "Traditional Milk Rice",
    "tag": "Culinary Series",
    "image": "/images/milk-rice.jpg"
  },
  {
    "title": "Cascading Diyaluma IV",
    "tag": "Waterfall Expedition",
    "image": "/images/waterfall/4.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf XI",
    "tag": "Surfing",
    "image": "/images/hirikatiya/11.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XXIII",
    "tag": "Organic Farm",
    "image": "/images/farm/23.webp"
  },
  {
    "title": "Zen Garden Pavilion III",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/3.webp"
  },
  {
    "title": "Local Kitchen Dining III",
    "tag": "Culinary Series",
    "image": "/images/food/3.jpg"
  },
  {
    "title": "Local Kitchen Dining I",
    "tag": "Culinary Series",
    "image": "/images/food/1.webp"
  },
  {
    "title": "Ella Forest Cycling VII",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/7.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf IX",
    "tag": "Surfing",
    "image": "/images/hirikatiya/9.jpg"
  },
  {
    "title": "Scenic Heritage Run VI",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/6.jpg"
  },
  {
    "title": "Highland Christmas Magic",
    "tag": "Seasonal Festival",
    "image": "/images/christmas.jpg"
  },
  {
    "title": "Cascading Diyaluma VII",
    "tag": "Waterfall Expedition",
    "image": "/images/waterfall/7.jpg"
  },
  {
    "title": "Visual Chronicles III",
    "tag": "Local Heritage",
    "image": "/images/3.jpg"
  },
  {
    "title": "Ella Forest Cycling I",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/1.webp"
  },
  {
    "title": "Bespoke Farm Harvesting XVI",
    "tag": "Organic Farm",
    "image": "/images/farm/16.webp"
  },
  {
    "title": "Zen Garden Pavilion II",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/2.jpg"
  },
  {
    "title": "Visual Chronicles I",
    "tag": "Local Heritage",
    "image": "/images/1.jpg"
  },
  {
    "title": "Zen Garden Pavilion IX",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/9.jpg"
  },
  {
    "title": "Zen Garden Pavilion X",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/10.png"
  },
  {
    "title": "Local Kitchen Dining V",
    "tag": "Culinary Series",
    "image": "/images/food/5.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting II",
    "tag": "Organic Farm",
    "image": "/images/farm/2.jpg"
  },
  {
    "title": "Ella Forest Cycling IX",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/9.jpg"
  },
  {
    "title": "Scenic Heritage Run VIII",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/8.jpg"
  },
  {
    "title": "Scenic Heritage Run III",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/3.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XVII",
    "tag": "Organic Farm",
    "image": "/images/farm/17.webp"
  },
  {
    "title": "Bespoke Farm Harvesting XVIII",
    "tag": "Organic Farm",
    "image": "/images/farm/18.jpeg"
  },
  {
    "title": "Scenic Heritage Run IV",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/4.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting I",
    "tag": "Organic Farm",
    "image": "/images/farm/1.jpg"
  },
  {
    "title": "Ella Forest Cycling IV",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/4.jpg"
  },
  {
    "title": "Esala Perahera Pageant",
    "tag": "Local Heritage",
    "image": "/images/perahera.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting VIII",
    "tag": "Organic Farm",
    "image": "/images/farm/8.jpg"
  },
  {
    "title": "Dandeniya Sanctuary II",
    "tag": "Lake Retreat",
    "image": "/images/lake/2.jpg"
  },
  {
    "title": "Dandeniya Sanctuary IV",
    "tag": "Lake Retreat",
    "image": "/images/lake/4.webp"
  },
  {
    "title": "Scenic Heritage Run II",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/2.jpg"
  },
  {
    "title": "Dandeniya Sanctuary VI",
    "tag": "Lake Retreat",
    "image": "/images/lake/6.webp"
  },
  {
    "title": "Bespoke Farm Harvesting XV",
    "tag": "Organic Farm",
    "image": "/images/farm/15.webp"
  },
  {
    "title": "Cascading Diyaluma III",
    "tag": "Waterfall Expedition",
    "image": "/images/waterfall/3.jpg"
  },
  {
    "title": "Cascading Diyaluma V",
    "tag": "Waterfall Expedition",
    "image": "/images/waterfall/5.jpg"
  },
  {
    "title": "Zen Garden Pavilion VIII",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/8.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XX",
    "tag": "Organic Farm",
    "image": "/images/farm/20.webp"
  },
  {
    "title": "Hiriketiya Sunset Surf IV",
    "tag": "Surfing",
    "image": "/images/hirikatiya/4.png"
  },
  {
    "title": "Local Kitchen Dining IV",
    "tag": "Culinary Series",
    "image": "/images/food/4.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf V",
    "tag": "Surfing",
    "image": "/images/hirikatiya/5.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XIV",
    "tag": "Organic Farm",
    "image": "/images/farm/14.jpg"
  },
  {
    "title": "Ella Forest Cycling III",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/3.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf II",
    "tag": "Surfing",
    "image": "/images/hirikatiya/2.jpg"
  },
  {
    "title": "Hiriketiya Sunset Surf VI",
    "tag": "Surfing",
    "image": "/images/hirikatiya/6.jpg"
  },
  {
    "title": "Dandeniya Sanctuary III",
    "tag": "Lake Retreat",
    "image": "/images/lake/3.jpg"
  },
  {
    "title": "Scenic Heritage Run V",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/5.jpg"
  },
  {
    "title": "Ella Forest Cycling II",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/2.webp"
  },
  {
    "title": "Dandeniya Sanctuary IX",
    "tag": "Lake Retreat",
    "image": "/images/lake/9.webp"
  },
  {
    "title": "Zen Garden Pavilion VI",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/6.jpg"
  },
  {
    "title": "Scenic Heritage Run I",
    "tag": "Active Lifestyle",
    "image": "/images/jogging/1.jpg"
  },
  {
    "title": "Local Kitchen Dining IX",
    "tag": "Culinary Series",
    "image": "/images/food/9.jpg"
  },
  {
    "title": "Ella Forest Cycling VIII",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/8.webp"
  },
  {
    "title": "Dandeniya Sanctuary V",
    "tag": "Lake Retreat",
    "image": "/images/lake/5.webp"
  },
  {
    "title": "Bespoke Farm Harvesting X",
    "tag": "Organic Farm",
    "image": "/images/farm/10.png"
  },
  {
    "title": "Zen Garden Pavilion IV",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/4.jpg"
  },
  {
    "title": "Visual Chronicles IV",
    "tag": "Local Heritage",
    "image": "/images/4.jpg"
  },
  {
    "title": "Ella Forest Cycling V",
    "tag": "Forest Trail",
    "image": "/images/bicycle_ride/5.jpg"
  },
  {
    "title": "Local Kitchen Dining VII",
    "tag": "Culinary Series",
    "image": "/images/food/7.webp"
  },
  {
    "title": "Bespoke Farm Harvesting XII",
    "tag": "Organic Farm",
    "image": "/images/farm/12.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XXII",
    "tag": "Organic Farm",
    "image": "/images/farm/22.webp"
  },
  {
    "title": "Hiriketiya Sunset Surf VII",
    "tag": "Surfing",
    "image": "/images/hirikatiya/7.jpg"
  },
  {
    "title": "Local Kitchen Dining VI",
    "tag": "Culinary Series",
    "image": "/images/food/6.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting XXIV",
    "tag": "Organic Farm",
    "image": "/images/farm/24.webp"
  },
  {
    "title": "Vesak Festival Lights",
    "tag": "Local Heritage",
    "image": "/images/Vesak.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting V",
    "tag": "Organic Farm",
    "image": "/images/farm/5.jpg"
  },
  {
    "title": "Elite Traveler Experience",
    "tag": "Active Lifestyle",
    "image": "/images/lifestyle.jpeg"
  },
  {
    "title": "Dandeniya Sanctuary VIII",
    "tag": "Lake Retreat",
    "image": "/images/lake/8.webp"
  },
  {
    "title": "Bespoke Farm Harvesting XXI",
    "tag": "Organic Farm",
    "image": "/images/farm/21.jpg"
  },
  {
    "title": "Visual Chronicles VI",
    "tag": "Local Heritage",
    "image": "/images/6.jpg"
  },
  {
    "title": "Bespoke Farm Harvesting IV",
    "tag": "Organic Farm",
    "image": "/images/farm/4.jpg"
  },
  {
    "title": "Local Kitchen Dining II",
    "tag": "Culinary Series",
    "image": "/images/food/2.jpg"
  },
  {
    "title": "Zen Garden Pavilion VII",
    "tag": "Wellness & Spa",
    "image": "/images/yoga/7.jpg"
  }
];;;
 
export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
 
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-white font-bold tracking-[0.4em] uppercase text-xs mb-4 block flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-amber-500" />
                Visual Chronicles
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight leading-[1.1] mb-4">
                Moments of raw nature and refined luxury.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Take a look through our captured moments. Every frame represents a curated experience designed to connect you deeply with Sri Lanka&apos;s beautiful heritage.
              </p>
            </Reveal>
          </div>

          {/* Custom Navigation arrows */}
          <div className="flex items-center gap-3 self-start md:self-end z-10">
            <button className="gallery-button-prev w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="gallery-button-next w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
 
        {/* Gallery Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              nextEl: ".gallery-button-next",
              prevEl: ".gallery-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".gallery-pagination"
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="gallery-swiper py-4"
          >
            {items.map((item, index) => (
              <SwiperSlide key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 shadow-2xl cursor-pointer aspect-[4/3] w-full"
                >
                  {/* Visual Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-w-7xl) 100vw, 800px"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 filter grayscale-[15%] group-hover:grayscale-0"
                  />
                  
                  {/* Soft gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500" />
     
                  {/* Floating Meta Tag */}
                  <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest shadow-lg">
                    {item.tag}
                  </span>
     
                  {/* Detail Card Overlay */}
                  <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="max-w-[80%]">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3 fill-current" />
                        Elite Retreats
                      </span>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-white line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#1c2224] hover:border-transparent">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Element */}
          <div className="gallery-pagination mt-8 flex justify-center gap-2" />
        </div>

        {/* Custom styles for Swiper navigation and pagination */}
        <style>{`
          .gallery-pagination .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .gallery-pagination .swiper-pagination-bullet:hover {
            background: rgba(255, 255, 255, 0.4);
          }
          .gallery-pagination .swiper-pagination-bullet-active {
            background: #f59e0b; /* amber-500 */
            transform: scale(1.1);
            width: 24px;
            border-radius: 4px;
          }
        `}</style>
 
      </div>
    </section>
  );
}
