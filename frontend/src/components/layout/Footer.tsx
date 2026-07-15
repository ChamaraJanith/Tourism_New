"use client";
 
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Bike } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";
import { fireBookingConfetti } from "@/lib/booking-confetti";
 
export const Footer = () => {
  const pathname = usePathname();
 
  // Hide footer on authentication pages
  if (pathname?.startsWith("/auth")) return null;
 
  return (
    <footer className="bg-[#080a0d] pt-24 md:pt-40 pb-12 md:pb-16 relative overflow-hidden">
      {/* Background Trail Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[800px] bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 mb-16 md:mb-32">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-8 md:mb-12">
              <h2 className="text-4xl font-display font-bold text-white tracking-tighter">
                TRAIL<span className="text-emerald-500">DISCOVERY</span>
              </h2>
            </Link>
            <p className="text-emerald-50/50 font-light leading-relaxed mb-8 md:mb-12 text-lg md:text-xl">
              Sri Lanka's premier eco-cycling destination. Discover authentic villages, scenic lakesides, and tropical forest trails on two wheels.
            </p>
            <div className="flex gap-6">
              {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube].map((Icon, i) => (
                <button key={i} className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-500 hover:border-emerald-500/50 transition-all duration-500 bg-white/5 shadow-2xl">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              ))}
            </div>
          </div>
 
          <div>
            <h4 className="text-white font-bold mb-8 md:mb-12 uppercase tracking-[0.5em] text-[10px]">Trail Navigation</h4>
            <ul className="space-y-4 md:space-y-6">
              {["Village Tours", "Lakeside Cycling", "Forest Adventures", "Cultural Rides", "Sunrise Expeditions"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-emerald-50/40 hover:text-emerald-400 transition-colors duration-500 font-light text-base md:text-lg flex items-center gap-5 group">
                    <Bike className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          <div>
            <h4 className="text-white font-bold mb-8 md:mb-12 uppercase tracking-[0.5em] text-[10px]">The Hub</h4>
            <ul className="space-y-8 md:space-y-10">
              <li className="flex items-start gap-5 md:gap-6">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-emerald-500 mt-1 shrink-0" />
                <span className="text-emerald-50/40 font-light text-lg md:text-xl leading-relaxed">Southern Adventure Hub, <br /> Galle District, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-5 md:gap-6">
                <Phone className="w-6 h-6 md:w-7 md:h-7 text-emerald-500 shrink-0" />
                <span className="text-emerald-50/40 font-light text-lg md:text-xl">+94 91 555 7777</span>
              </li>
              <li className="flex items-center gap-5 md:gap-6">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-emerald-500 shrink-0" />
                <span className="text-emerald-50/40 font-light text-lg md:text-xl">ride@traildiscovery.lk</span>
              </li>
            </ul>
          </div>
 
          <div>
            <h4 className="text-white font-bold mb-8 md:mb-12 uppercase tracking-[0.5em] text-[10px]">Trail Updates</h4>
            <p className="text-emerald-50/40 font-light mb-8 md:mb-10 text-lg md:text-xl leading-relaxed">Join our mailing list for seasonal trail maps and adventure stories.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Rider email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 md:py-6 px-8 md:px-10 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-all backdrop-blur-3xl"
              />
              <button
                type="button"
                onClick={() => fireBookingConfetti("emerald")}
                className="booking-pill-btn absolute right-2 md:right-3 top-2 md:top-3 bottom-2 md:bottom-3 px-8 md:px-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>
 
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.6em] font-light text-center md:text-left">
            &copy; 2026 Trail Discovery Sanctuary. Part of Aether Eco-Tourism.
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-white/20 hover:text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-white/20 hover:text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
