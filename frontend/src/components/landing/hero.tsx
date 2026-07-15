"use client";
 
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  MapPinIcon,
  SearchIcon,
  CompassIcon,
  GlobeIcon,
  SparklesIcon,
} from "@/components/ui/Icons";
import { BespokeButton } from "@/components/ui/BespokeButton";
import { MapPin, Calendar, User, Search, Plus, Minus, X } from "lucide-react";
 
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
 
  // State for interactive booking bar
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [specialCode, setSpecialCode] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const clickedDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(clickedDateStr);
      setCheckOut("");
    } else {
      const checkInDate = new Date(checkIn);
      const clickedDate = new Date(clickedDateStr);
      if (clickedDate < checkInDate) {
        setCheckIn(clickedDateStr);
      } else {
        setCheckOut(clickedDateStr);
        setShowCalendarDropdown(false);
      }
    }
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
 
  const handleSearch = () => {
    if (destination.includes("Lake")) {
      router.push("/lifestyle-experiences/lake");
    } else if (destination.includes("Surf") || destination.includes("Mirissa")) {
      router.push("/lifestyle-experiences/surf");
    } else if (destination.includes("Jogging") || destination.includes("Ella")) {
      router.push("/lifestyle-experiences/jogging-path");
    } else if (destination.includes("Yoga") || destination.includes("Kandy")) {
      router.push("/lifestyle-experiences/yoga");
    } else if (destination.includes("Farming") || destination.includes("Bentota")) {
      router.push("/lifestyle-experiences/farming");
    } else {
      router.push("/lifestyle-experiences");
    }
  };
 
  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen lg:h-screen w-full overflow-visible lg:overflow-hidden bg-[#111416] pb-12 lg:pb-0"
    >
      {/* ── Framed card ── */}
      <div className="relative mx-auto h-full w-full overflow-visible">
        <div className="relative flex min-h-screen lg:h-full w-full flex-col overflow-visible lg:overflow-hidden">
 
          {/* ── BG Video ── */}
          <motion.div
            id="hero-video-wrap"
            className="absolute inset-0 z-0 bg-[#111416]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center transition-opacity duration-1000"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </motion.div>
 
          {/* ── HERO CONTENT AREA ── */}
          <div className="relative z-10 flex flex-1 items-center px-6 pb-12 pt-28 sm:px-12 sm:pb-16 lg:px-16 lg:pb-44 lg:pt-24 pointer-events-none">
            <div className="grid w-full max-w-screen-2xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.div
                className="lg:col-span-7"
              >
 
                <h1 className="mt-5 max-w-2xl text-balance text-3xl font-black uppercase leading-[0.96] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl xl:text-6xl">
                  Crafted journeys for
                  <span className="block text-[#f2c14f]">
                    modern
                    <span className="block">explorers</span>
                  </span>
                </h1>
                <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/80 sm:text-sm">
                  Discover unforgettable journeys where nature, culture, and adventure come together in perfect harmony.
                  Turn every trip into a timeless story worth remembering.
                </p>
 
                <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4 pointer-events-auto">
                  <BespokeButton variant="dark" href="/auth" className="!px-10 !py-4">
                    Start Your Journey
                    <ChevronDown size={14} className="-rotate-90 ml-2" />
                  </BespokeButton>
                  <BespokeButton variant="secondary" href="/lifestyle-experiences" className="!px-10 !py-4 !bg-black/25 !backdrop-blur-xl">
                    Explore Destinations
                  </BespokeButton>
                </div>
              </motion.div>
 
              <motion.div
                className="hidden lg:absolute lg:right-16 lg:top-1/2 lg:z-20 lg:flex lg:-translate-y-1/2"
              >
                <div className="w-full max-w-sm rounded-[1.8rem] border border-white/20 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)]">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-white/65">
                    Curated Excellence
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">120+</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Premium Routes
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">4.9</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Guest Rating
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">24/7</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Concierge
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3">
                      <p className="text-2xl font-black text-white">18K</p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/60">
                        Elite Travelers
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── BOOKING & SEARCH BAR ── */}
          <motion.div
            id="hero-search-wrap"
            className="relative lg:absolute lg:bottom-8 left-0 right-0 lg:left-12 lg:right-12 px-6 sm:px-12 lg:px-0 z-20 mt-12 lg:mt-0 will-change-transform transition-transform duration-700 ease-out"
          >
            <div className="relative w-full bg-[#111416]/80 backdrop-blur-xl rounded-2xl lg:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 p-2 lg:p-3 pointer-events-auto flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
              
              {/* Destination Segment */}
              <div 
                className="relative flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl lg:rounded-full cursor-pointer transition-colors" 
                onClick={() => { 
                  setShowDestinationDropdown(!showDestinationDropdown); 
                  setShowGuestDropdown(false); 
                  setShowCalendarDropdown(false);
                }}
              >
                <MapPin className="w-5 h-5 text-[#f2be2e] shrink-0" />
                <div className="flex-1 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Location</span>
                  <span className="text-sm font-semibold text-white block truncate">
                    {destination || "Select a destination or hotel"}
                  </span>
                </div>
                
                {/* Destination Dropdown */}
                {showDestinationDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bottom-full mb-4 w-72 rounded-2xl bg-[#171b1d] border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Destination</span>
                      <button onClick={(e) => { e.stopPropagation(); setShowDestinationDropdown(false); }} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {[
                        { label: "Dandeniya Lake Retreat", value: "Dandeniya Lake" },
                        { label: "Mirissa Surf & Cycling Track", value: "Mirissa Coast" },
                        { label: "Ella Nature Vitality Trail", value: "Ella Forests" },
                        { label: "Kandy Yoga & Healing Center", value: "Kandy Temple View" },
                        { label: "Bentota Organic Farming Village", value: "Bentota Village" }
                      ].map((item) => (
                        <button
                          key={item.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDestination(item.label);
                            setShowDestinationDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/5 hover:text-[#f2be2e] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
 
              <div className="hidden lg:block w-[1px] h-8 bg-white/10 shrink-0" />
 
              {/* Dates Segment */}
              <div 
                className="relative flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl lg:rounded-full cursor-pointer transition-colors"
                onClick={() => {
                  setShowCalendarDropdown(!showCalendarDropdown);
                  setShowDestinationDropdown(false);
                  setShowGuestDropdown(false);
                }}
              >
                <Calendar className="w-5 h-5 text-[#f2be2e] shrink-0" />
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Check-in</span>
                    <span className="text-sm font-semibold text-white block">
                      {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Select date"}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm font-medium">→</span>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Check-out</span>
                    <span className="text-sm font-semibold text-white block">
                      {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Select date"}
                    </span>
                  </div>
                </div>

                {/* Calendar Dropdown */}
                {showCalendarDropdown && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-80 rounded-2xl bg-[#171b1d] border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <button 
                        onClick={handlePrevMonth} 
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      >
                        <ChevronDown className="w-4 h-4 rotate-90" />
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f2be2e]">
                        {months[currentMonth]} {currentYear}
                      </span>
                      <button 
                        onClick={handleNextMonth} 
                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      >
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                    </div>

                    {/* Days of week */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {daysOfWeek.map((day) => (
                        <span key={day} className="text-[10px] font-bold text-gray-500 uppercase">
                          {day}
                        </span>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {/* Empty slots for padding */}
                      {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                      ))}

                      {/* Days of the month */}
                      {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, index) => {
                        const day = index + 1;
                        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isSelected = dateStr === checkIn || dateStr === checkOut;
                        
                        const isInRange = checkIn && checkOut && 
                          new Date(dateStr) > new Date(checkIn) && 
                          new Date(dateStr) < new Date(checkOut);
                        
                        const today = new Date();
                        today.setHours(0,0,0,0);
                        const isPast = new Date(dateStr) < today;

                        return (
                          <button
                            key={`day-${day}`}
                            disabled={isPast}
                            onClick={() => handleDateClick(day)}
                            className={`aspect-square rounded-full text-xs font-bold transition-all flex items-center justify-center
                              ${isSelected ? "bg-[#f2be2e] text-black shadow-lg" : ""}
                              ${isInRange ? "bg-[#f2be2e]/25 text-[#f2be2e]" : ""}
                              ${!isSelected && !isInRange && !isPast ? "text-gray-300 hover:bg-white/5" : ""}
                              ${isPast ? "text-gray-600 cursor-not-allowed opacity-50" : ""}
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                      <button 
                        onClick={() => {
                          setCheckIn("");
                          setCheckOut("");
                        }}
                        className="text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors"
                      >
                        Clear
                      </button>
                      <button 
                        onClick={() => setShowCalendarDropdown(false)}
                        className="px-4 py-1.5 bg-[#f2be2e] text-black rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#ffd573] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
 
              <div className="hidden lg:block w-[1px] h-8 bg-white/10 shrink-0" />
 
              {/* Guests Segment */}
              <div 
                className="relative flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl lg:rounded-full cursor-pointer transition-colors"
                onClick={() => { 
                  setShowGuestDropdown(!showGuestDropdown); 
                  setShowDestinationDropdown(false); 
                  setShowCalendarDropdown(false);
                }}
              >
                <User className="w-5 h-5 text-[#f2be2e] shrink-0" />
                <div className="flex-1 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Guests</span>
                  <span className="text-sm font-semibold text-white block">
                    {`${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children !== 1 ? 'ren' : ''}`}
                  </span>
                </div>
 
                {/* Guest Dropdown */}
                {showGuestDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 bottom-full mb-4 w-72 rounded-2xl bg-[#171b1d] border border-white/10 shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Guests</span>
                      <button onClick={(e) => { e.stopPropagation(); setShowGuestDropdown(false); }} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-semibold text-white block">Adults</span>
                          <span className="text-[10px] text-gray-400 block">Age 13 or above</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); if (adults > 1) setAdults(adults - 1); }}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-colors text-white font-medium"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold text-white w-4 text-center">{adults}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setAdults(adults + 1); }}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-colors text-white font-medium"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
 
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-semibold text-white block">Children</span>
                          <span className="text-[10px] text-gray-400 block">Ages 2 – 12</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); if (children > 0) setChildren(children - 1); }}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-colors text-white font-medium"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold text-white w-4 text-center">{children}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setChildren(children + 1); }}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-colors text-white font-medium"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowGuestDropdown(false); }}
                        className="w-full mt-2 py-2.5 bg-[#f2be2e] hover:bg-[#ffd573] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Apply Selection
                      </button>
                    </div>
                  </div>
                )}
              </div>
 
              <div className="hidden lg:block w-[1px] h-8 bg-white/10 shrink-0" />
 
              {/* Promo Code Segment */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl lg:rounded-full transition-colors">
                <div className="flex-1 text-left lg:pl-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Promo Code</span>
                  <input 
                    type="text"
                    placeholder="Special codes"
                    value={specialCode}
                    onChange={(e) => setSpecialCode(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-transparent border-none outline-none w-full text-sm font-semibold text-white placeholder-gray-500 focus:ring-0 p-0"
                  />
                </div>
              </div>
 
              {/* Search button */}
              <div className="px-2 shrink-0">
                <button 
                  onClick={handleSearch}
                  className="w-full lg:w-auto h-12 lg:h-14 px-8 rounded-xl lg:rounded-full bg-[#f2be2e] hover:bg-[#ffd573] hover:shadow-[0_10px_30px_rgba(242,193,79,0.3)] text-black flex items-center justify-center gap-3 font-bold text-xs tracking-[0.15em] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>SEARCH</span>
                  <Search className="w-4 h-4 text-black" />
                </button>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
