'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  ChevronRight,
  Compass,
  ShieldCheck,
  Award,
  HeartHandshake,
  X,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Sun,
  Trees,
  HeartPulse,
  Landmark,
  Briefcase
} from 'lucide-react';

interface SegmentItem {
  id: string;
  title: string;
  badge: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  highlights: string[];
  idealFor: string;
}

interface Category {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  items: SegmentItem[];
}

const categorizedSegments: Category[] = [
  {
    id: "leisure",
    title: "Leisure & Lifestyle",
    icon: Sun,
    description: "Opulent escapes, secluded romantic retreats, and world-class hospitality crafted for unforgettable personal moments.",
    items: [
      {
        id: "luxury-ultra",
        title: "Luxury & Ultra-Luxury Tourism",
        badge: "VIP Exclusive",
        shortDesc: "Private charter flights, secluded island villas, and dedicated 24/7 butler service for UHNW travelers.",
        longDesc: "Experience the pinnacle of hospitality. Our ultra-luxury segment offers exclusive access to private estates, chartered luxury yachts, personal Michelin-level chefs, and private helicopter transfers across Ceylon's most pristine destinations.",
        image: "/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture11.jpg",
        highlights: ["Private Jet & Helicopter Charters", "7-Star Ocean & Mountain Estates", "Dedicated 24/7 Royal Butler", "Exclusive VIP Access Perks"],
        idealFor: "Ultra High Net Worth Individuals, Celebrities, & Royalty"
      },
      {
        id: "leisure-holiday",
        title: "Leisure & Holiday Tourism",
        badge: "Bespoke Escapes",
        shortDesc: "Effortless tropical vacations featuring high-end beachfront resorts, panoramic train tours, and golden coastlines.",
        longDesc: "Immerse yourself in pure relaxation. From the scenic tea hills of Nuwara Eliya to the sun-kissed beaches of Bentota, our leisure packages blend seamless transfers, boutique stays, and personalized day trips.",
        image: "/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture5.jpg",
        highlights: ["Boutique Beach & Hill Resorts", "First-Class Scenic Train Tickets", "Personalized Chauffeured Vehicles", "Tailored Day Trips & Excursions"],
        idealFor: "Couples, Solitary Seekers, & Vacationers"
      },
      {
        id: "honeymoon-romantic",
        title: "Honeymoon & Romantic Escapes",
        badge: "Romantic VIP",
        shortDesc: "Private beachfront candlelit dinners, infinity pool hideaways, and romantic sunset cruises.",
        longDesc: "Celebrate love in unmatched romance. Tailor-made couples' itineraries include secluded treehouse villas, couples' ayurvedic spa rituals, private yacht champagne cruises, and customized anniversary surprises.",
        image: "/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture28.jpg",
        highlights: ["Private Candlelit Beach Dinners", "Secluded Plunge Pool Suites", "Couples Ayurvedic Spa Treatments", "Sunset Yacht & Boat Cruises"],
        idealFor: "Honeymooners & Couples Celebrating Anniversaries"
      },
      {
        id: "family-holidays",
        title: "Family Holidays",
        badge: "Family Preferred",
        shortDesc: "Safe, engaging, and enrichment-filled multi-generational journeys with private guides and spacious villas.",
        longDesc: "Designed with safety and fun for all ages. Enjoy spacious private family villas, safe wildlife interactions, interactive cooking classes, and child-safe beach resorts with dedicated concierges.",
        image: "/images/Travel_Packages/Family_Holiday_Experience/Picture43.jpg",
        highlights: ["Spacious Multi-Bedroom Villas", "Child-Safe Adventure & Wildlife Activities", "Private Family Vehicles & Child Seats", "Interactive Cultural Masterclasses"],
        idealFor: "Multi-Generational Families & Children"
      },
      {
        id: "long-stay",
        title: "Long-Stay Tourism",
        badge: "Extended Living",
        shortDesc: "Luxury serviced residences tailored for long holidays, seasonal stays, and relaxed coastal living.",
        longDesc: "Unwind for months in paradise. Our long-stay service includes private luxury serviced apartments or villas, personal housekeeping, private chef options, and local integration benefits.",
        image: "/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture6.jpg",
        highlights: ["Luxury Serviced Residences & Condos", "Monthly Discounted Package Rates", "Private Chef & Housekeeping Options", "Full Resident Concierge Support"],
        idealFor: "Snowbirds, Extended Travelers, & Slow Travel Enthusiasts"
      },
      {
        id: "senior-living",
        title: "Retirement & Senior Living",
        badge: "Tranquil Care",
        shortDesc: "Peaceful, high-comfort wellness retreats with barrier-free access and optional 24/7 medical assistance.",
        longDesc: "Tailored hospitality for mature travelers. Features serene low-elevation resorts, barrier-free luxury suites, customized nutrition, gentle leisure activities, and optional dedicated healthcare concierges.",
        image: "/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture51.jpg",
        highlights: ["Accessible & Barrier-Free Suites", "24/7 On-Call Medical Assistance", "Gentle Wellness & Walking Trails", "Customized Dietary Care Meals"],
        idealFor: "Retirees, Senior Travelers, & Rejuvenation Seekers"
      }
    ]
  },
  {
    id: "nature",
    title: "Nature & Adventure",
    icon: Trees,
    description: "Thrill-seeking expeditions, wild safaris, and eco-certified natural retreats surrounded by pristine biodiversity.",
    items: [
      {
        id: "adventure-tourism",
        title: "Adventure Tourism",
        badge: "High Adrenaline",
        shortDesc: "White-water rafting, mountain peak trekking, rock climbing, and zip-lining with certified safety professionals.",
        longDesc: "Push your limits safely. Explore Sri Lanka's rugged terrain through Kitulgala white-water rapids, Ella rock climbs, Knuckles mountain range wilderness treks, and paragliding with expert guides.",
        image: "/images/Travel_Packages/Adventure_Sri_Lanka/Picture36.jpg",
        highlights: ["Grade 3 & 4 White-Water Rafting", "Certified Mountain Guides & Safety Gear", "Knuckles Wilderness Expeditions", "Extreme Rock & Waterfall Climbing"],
        idealFor: "Thrill Seekers & Outdoor Enthusiasts"
      },
      {
        id: "wildlife-nature",
        title: "Wildlife & Nature Tourism",
        badge: "Biodiversity Focus",
        shortDesc: "Private 4x4 safaris for leopard tracking, elephant gatherings, and rare birdwatching guided by top naturalists.",
        longDesc: "Get up close with wild majesty. Journey through Yala, Wilpattu, and Minneriya in luxury modified 4x4 vehicles accompanied by veteran wildlife biologists and wildlife photographers.",
        image: "/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture16.jpg",
        highlights: ["Custom Luxury Open 4x4 Safaris", "Expert Veteran Wildlife Biologists", "Whale & Dolphin Deep-Sea Tracking", "VIP National Park Permits"],
        idealFor: "Wildlife Photographers & Nature Lovers"
      },
      {
        id: "marine-coastal",
        title: "Marine & Coastal Tourism",
        badge: "Oceanic Luxury",
        shortDesc: "Deep-sea diving, blue whale spotting, catamaran cruising, and kite-surfing on golden shores.",
        longDesc: "Discover marine marvels. Experience PADI master-guided reef diving, private luxury catamaran charters in Mirissa or Trincomalee, and world-class kite surfing in Kalpitiya.",
        image: "C:\Globalsoft\Tourism_New\frontend\public\images\whale.jpg",
        highlights: ["Private Catamaran & Yacht Rentals", "PADI Master-Certified Scuba Diving", "Seasonal Blue Whale Expeditions", "Pro Kite-Surfing & Wave Spots"],
        idealFor: "Divers, Sailors, & Coastal Enthusiasts"
      },
      {
        id: "eco-sustainable",
        title: "Eco & Sustainable Tourism",
        badge: "100% Eco-Certified",
        shortDesc: "Carbon-neutral treehouse glamping, wildlife conservation retreats, and community-first eco-lodges.",
        longDesc: "Travel responsibly without compromising comfort. Our eco-tours feature solar-powered luxury lodges, rainforest re-wilding participation, zero-waste dining, and direct community conservation funding.",
        image: "/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture20.jpg",
        highlights: ["100% Carbon-Neutral Travel", "Solar-Powered Luxury Eco-Lodges", "Tree Planting & Forest Conservation", "Zero-Waste Farm-to-Table Meals"],
        idealFor: "Eco-Conscious Travelers & Conservationists"
      },
      {
        id: "plantation-agri",
        title: "Plantation & Agri-Tourism",
        badge: "Heritage Estates",
        shortDesc: "Colonial Ceylon tea estate stays, artisanal tea plucking, spice garden walks, and organic farm dining.",
        longDesc: "Step into historic grandeur. Stay in restored 19th-century colonial tea planter bungalows, pick fine tea leaves alongside master pluckers, learn tea tasting techniques, and tour organic spice gardens.",
        image: "/images/Travel_Packages/The_Grand_Srilanka_Discovery/Picture3.jpg",
        highlights: ["Historic Colonial Planter Bungalows", "Master Tea Tasting & Plucking", "Organic Spice Garden Excursions", "Farm-Fresh Gourmet Culinary Stays"],
        idealFor: "Heritage Lovers, Tea Connoisseurs, & Relaxed Travelers"
      }
    ]
  },
  {
    id: "wellness",
    title: "Wellness & Spirituality",
    icon: HeartPulse,
    description: "Authentic Ayurvedic healing, holistic body rejuvenation, and ancient spiritual meditation retreats.",
    items: [
      {
        id: "medical-tourism",
        title: "Medical Tourism",
        badge: "World-Class Care",
        shortDesc: "Accredited hospital surgical/dental packages combined with private luxury recovery villas and nurses.",
        longDesc: "Seamless medical care with luxury recovery. Partnered with JCI-accredited international hospitals offering cosmetic, orthopedic, and dental procedures with dedicated medical concierges and private post-op recovery retreats.",
        image: "/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture54.jpg",
        highlights: ["JCI-Accredited Hospital Network", "Private Post-Op Recovery Villas", "24/7 Registered Nursing Support", "VIP Airport & Medical Transport"],
        idealFor: "International Patients & Healthcare Seekers"
      },
      {
        id: "ayurveda-wellness",
        title: "Wellness & Ayurveda Tourism",
        badge: "Holistic Detox",
        shortDesc: "Authentic Panchakarma detox, herbal body therapies, custom herbal dining, and sunrise yoga sessions.",
        longDesc: "Rebalance your body and mind. Under the guidance of certified Ayurvedic doctors, undergo tailored multi-day Panchakarma treatments, herbal oil baths, organic detox diets, and yoga in serene sanctuaries.",
        image: "/images/Travel_Packages/Wellness_and_Ayurveda_Retreat/Picture22.jpg",
        highlights: ["Certified Ayurvedic Doctor Consults", "Authentic Panchakarma Detox Programs", "Personalized Herbal Nutrition", "Daily Sunrise Yoga & Meditation"],
        idealFor: "Wellness Enthusiasts, Stress Recovery, & Detox Seekers"
      },
      {
        id: "spiritual-religious",
        title: "Spiritual & Religious Tourism",
        badge: "Sacred Passages",
        shortDesc: "Monastery retreats, VIP access to ancient temples, sacred stupa pilgrimages, and monk blessings.",
        longDesc: "Nourish the soul. Journey through 2,500 years of Buddhist and Hindu heritage, including VIP access at the Temple of the Sacred Tooth Relic, silent forest monastery retreats, and personal blessing rituals.",
        image: "/images/Katharagama_Perahara.jfif",
        highlights: ["VIP Access to Sacred Shrines", "Guided Meditation by Monks", "Sacred Heritage Pilgrimage Circuits", "Traditional Blessing Ceremonies"],
        idealFor: "Spiritual Seekers, Pilgrims, & Mindfulness Travelers"
      }
    ]
  },
  {
    id: "culture",
    title: "Culture & Special Interest",
    icon: Landmark,
    description: "Immersive history, culinary masterclasses, authentic community living, and custom hobby-driven journeys.",
    items: [
      {
        id: "cultural-heritage",
        title: "Cultural & Heritage Tourism",
        badge: "UNESCO Heritage",
        shortDesc: "Fast-track access to Sigiriya, Anuradhapura, Polonnaruwa, and traditional Kandyan dance performances.",
        longDesc: "Uncover ancient civilizations. Explore UNESCO world heritage monuments, royal palace ruins, rock fortresses, and traditional art performances led by renowned historians.",
        image: "/images/Travel_Packages/Heritage_Cultural_Discovery/Picture12.jpg",
        highlights: ["Fast-Track VIP Access Passes", "Guided Tours by Senior Historians", "Traditional Cultural Dance Shows", "Ancient Architectural Expeditions"],
        idealFor: "History Buffs, Architects, & Culture Explorers"
      },
      {
        id: "community-tourism",
        title: "Community-Based Tourism",
        badge: "Ethical Impact",
        shortDesc: "Authentic village stays, local artisan pottery workshops, and direct economic support for rural families.",
        longDesc: "Connect authentically with locals. Experience warm village hospitality, learn traditional handicraft techniques, cook home dishes over clay stoves, and directly fund community empowerment projects.",
        image: "/images/milk-rice.jpg",
        highlights: ["Authentic Village Homestays", "Artisan Pottery & Weaving Workshops", "Traditional Clay-Stove Cooking", "Direct Fair-Trade Community Support"],
        idealFor: "Culture Enthusiasts & Ethical Travelers"
      },
      {
        id: "culinary-tourism",
        title: "Culinary & Gastronomic Tourism",
        badge: "Gourmet Flavors",
        shortDesc: "Spice masterclasses, street food night safaris, Michelin-chef collaborations, and seafood feasts.",
        longDesc: "Savor Ceylon's rich flavors. From street food crawls in Colombo to private seafood BBQ on the sand and cooking masterclasses using rare native spices, treat your palate to sensory delight.",
        image: "/images/food/1.webp",
        highlights: ["Masterchef Culinary Classes", "Guided Street Food Night Tours", "Beachfront Fresh Seafood Dinners", "Ceylon Spice & Curry Workshops"],
        idealFor: "Foodies, Chefs, & Gastronomy Lovers"
      },
      {
        id: "educational-travel",
        title: "Educational & Student Travel",
        badge: "Academic Focus",
        shortDesc: "Marine biology field research, botanical surveys, and university exchange study programs.",
        longDesc: "Enriching experiential learning. Designed for schools, universities, and researchers covering marine conservation, tropical forestry, historical archaeology, and sustainable development.",
        image: "/images/Travel_Packages/Heritage_Cultural_Discovery/Picture14.jpg",
        highlights: ["Fieldwork with Marine Scientists", "University-Accredited Excursions", "Botanical & Forestry Studies", "Safety-Monitored Student Logistics"],
        idealFor: "University Groups, Researchers, & Students"
      },
      {
        id: "sports-tourism",
        title: "Sports & Golf Tourism",
        badge: "Championship Level",
        shortDesc: "PGA green fees at Victoria Golf Resort, international cricket match VIP boxes, and marathon trips.",
        longDesc: "Play in paradise. Access world-class 18-hole golf courses, reserve VIP hospitality boxes for international cricket matches, or take part in surf and marathon events.",
        image: "/images/Cricket.jfif",
        highlights: ["Championship 18-Hole Golf Passes", "VIP Stadium Boxes for Cricket", "Professional Surf Coaching Camps", "Marathon & Cycling Escorts"],
        idealFor: "Golfers, Athletes, & Sports Fans"
      },
      {
        id: "film-photography",
        title: "Film & Photography Tourism",
        badge: "Cinematic Access",
        shortDesc: "Drone permits, golden hour photo safaris, location scouting, and film crew logistics support.",
        longDesc: "Capture breathtaking visuals. We manage government film permits, drone clearance, golden-hour photography routes, high-grade equipment rentals, and crew logistics.",
        image: "/images/Travel_Packages/Adventure_Sri_Lanka/Picture40.jpg",
        highlights: ["Government Film & Drone Permits", "Golden Hour Location Scouting", "Professional Camera Gear Support", "Dedicated Local Logistics Crew"],
        idealFor: "Photographers, Film Crews, & Content Creators"
      },
      {
        id: "tailor-made",
        title: "Tailor-Made & Special Interest",
        badge: "100% Custom",
        shortDesc: "Blank canvas travel itineraries custom designed around niche hobbies, genealogy, or bucket-list dreams.",
        longDesc: "If you can dream it, we build it. Work 1-on-1 with senior travel architects to construct specialized journeys tailored to astronomy, birding, architectural studies, or family roots tracing.",
        image: "/images/Travel_Packages/The_Grand_Srilanka_Discovery/Picture1.jpg",
        highlights: ["1-on-1 Travel Architect Design", "Unlimited Itinerary Adjustments", "Niche Hobby & Interest Matching", "24/7 Dedicated Concierge Support"],
        idealFor: "Travelers with Unique Specific Passions"
      }
    ]
  },
  {
    id: "corporate",
    title: "Corporate & Events",
    icon: Briefcase,
    description: "High-impact corporate meetings, grand destination weddings, and seamless remote worker hospitality.",
    items: [
      {
        id: "mice-corporate",
        title: "MICE (Meetings & Conferences)",
        badge: "Corporate Elite",
        shortDesc: "High-tech convention halls, executive retreat resorts, team galas, and VIP transport fleets.",
        longDesc: "Elevate business events. We deliver end-to-end management for international conferences, corporate incentive trips, executive board retreats, and product launch galas.",
        image: "/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture57.jpg",
        highlights: ["High-Tech AV Convention Venues", "Executive Board & Team Retreats", "Gala Dinners & Cultural Entertainment", "Luxury Fleet Airport Transfers"],
        idealFor: "Corporate Executives, MNCs, & Event Planners"
      },
      {
        id: "destination-weddings",
        title: "Destination Weddings",
        badge: "Royal Celebrations",
        shortDesc: "Grand oceanfront weddings, royal ballroom receptions, master floral design, and guest concierges.",
        longDesc: "Make your dream wedding unforgettable. From beachside vows under palm trees to opulent ballroom galas, our dedicated master planners coordinate catering, decor, entertainment, and guest travel.",
        image: "/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture34.jpg",
        highlights: ["Dedicated Master Wedding Planner", "Bespoke Floral & Stage Production", "Multi-Day Guest Hospitality Care", "Luxury Honeymoon Suite Upgrades"],
        idealFor: "Bridal Couples & Event Hosts"
      },
      {
        id: "digital-nomad",
        title: "Digital Nomad & Remote Work",
        badge: "Work-From-Paradise",
        shortDesc: "High-speed fiber co-working spaces, luxury co-living villas, and long-term visa assistance.",
        longDesc: "Work productively while living in paradise. Includes fiber Wi-Fi luxury villas, co-working space access, ergonomic setups, community networking events, and long-stay visa guidance.",
        image: "/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture60.jpg",
        highlights: ["Ultra-Fast Fiber Wi-Fi Guarantee", "Luxury Co-Living Villa Suites", "Ergonomic Workstation Facilities", "Digital Nomad Visa Concierge"],
        idealFor: "Remote Workers, Tech Nomads, & Founders"
      }
    ]
  }
];

export default function TourismSegmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<SegmentItem | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalItem]);

  // Filter items based on category pill and search query
  const filteredCategories = useMemo(() => {
    return categorizedSegments
      .map(cat => {
        // Filter by category pill first
        if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
          return null;
        }

        // Filter by search query
        const query = searchQuery.toLowerCase().trim();
        if (!query) return cat;

        const matchingItems = cat.items.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.shortDesc.toLowerCase().includes(query) ||
          item.badge.toLowerCase().includes(query) ||
          item.idealFor.toLowerCase().includes(query) ||
          item.highlights.some(h => h.toLowerCase().includes(query))
        );

        if (matchingItems.length === 0) return null;

        return {
          ...cat,
          items: matchingItems
        };
      })
      .filter(Boolean) as Category[];
  }, [selectedCategory, searchQuery]);

  const totalSegmentsCount = useMemo(() => {
    return categorizedSegments.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0d0e] text-white selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
      {/* Hero Background Elements */}
      <div className="relative overflow-hidden pt-28 pb-20 border-b border-white/10 bg-gradient-to-b from-[#14171a] via-[#0b0d0e] to-[#0b0d0e]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#d4af37]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>World-Class Travel Portfolios</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Tourism Segments <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] bg-clip-text text-transparent">We Master</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-light">
              From UHNW ultra-luxury private escapes to authentic cultural immersion and corporate MICE galas. Explore our specialized travel domains designed with precision, privacy, and luxury.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10">
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d4af37]">5</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Core Pillars</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d4af37]">{totalSegmentsCount}+</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Niche Segments</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d4af37]">100%</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Bespoke Tailored</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d4af37]">24/7</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">VIP Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Section */}
      <div className="relative bg-[#14171a]/80 border-y border-white/10 py-6 px-4 sm:px-6 lg:px-8 my-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === 'all'
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
            >
              All Segments ({totalSegmentsCount})
            </button>
            {categorizedSegments.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat.id
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search segment, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 my-8">
            <SlidersHorizontal className="w-12 h-12 text-[#d4af37] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">No Matching Segments Found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              We couldn't find any travel segments matching "{searchQuery}". Try clearing your search query or choosing another category.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#c3a02e] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {filteredCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <section key={category.id} className="scroll-mt-32">

                  {/* Category Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                          {category.title}
                        </h2>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base font-light max-w-2xl">
                        {category.description}
                      </p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded-lg border border-[#d4af37]/20 self-start md:self-auto">
                      {category.items.length} {category.items.length === 1 ? 'Segment' : 'Segments'}
                    </span>
                  </div>

                  {/* Segment Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActiveModalItem(item)}
                        className="group cursor-pointer rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#d4af37]/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 flex flex-col justify-between"
                      >
                        <div>
                          {/* Image Container */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0e] via-[#0b0d0e]/30 to-transparent" />

                            {/* Badge */}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-[#d4af37] backdrop-blur-md border border-[#d4af37]/30">
                                {item.badge}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300 mb-2.5">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6 font-light">
                              {item.shortDesc}
                            </p>

                            {/* Key Highlights Quick Bullets */}
                            <div className="space-y-2 mb-6">
                              {item.highlights.slice(0, 2).map((highlight, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                                  <span className="truncate">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Bottom CTA Action */}
                        <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
                          <span className="text-xs font-semibold text-[#d4af37] group-hover:underline flex items-center gap-1">
                            Explore Details
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#d4af37] group-hover:text-black flex items-center justify-center transition-all duration-300">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Customized Hybrid Concierge Callout Banner */}
        <section className="mt-24 rounded-3xl bg-gradient-to-r from-white/5 via-[#d4af37]/10 to-white/5 border border-[#d4af37]/30 p-8 sm:p-12 relative overflow-hidden text-center sm:text-left">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#d4af37]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Bespoke Hybrid Itineraries</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                Need a Customized Hybrid Tourism Segment?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Combine Wellness Ayurveda with Ultra-Luxury Yachting, or integrate Corporate MICE with Cultural Heritage excursions. Our senior travel architects craft tailor-made multi-segment experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#f3e5ab] transition-all duration-300 shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2"
              >
                <span>Consult Our Architects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/journeys"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                View Curated Packages
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Detail Modal Dialog */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div
            className="relative w-full max-w-3xl bg-[#14171a] border border-[#d4af37]/30 rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] my-auto flex flex-col"
            data-lenis-prevent="true"
          >

            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-60 w-full shrink-0">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14171a] via-[#14171a]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-[#d4af37] hover:text-black transition-all border border-white/10 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d4af37] text-black mb-2">
                  {activeModalItem.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeModalItem.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Body - Scrollable */}
            <div
              className="p-6 sm:p-8 overflow-y-auto overscroll-contain space-y-6 flex-1 text-left scrollbar-thin scrollbar-thumb-[#d4af37]/30"
              data-lenis-prevent="true"
            >
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#d4af37] mb-2">Overview</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                  {activeModalItem.longDesc}
                </p>
              </div>

              {/* Ideal For */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase tracking-widest font-bold text-[#d4af37] block mb-1">
                  Ideal Traveler Profile
                </span>
                <p className="text-white text-sm font-semibold">
                  {activeModalItem.idealFor}
                </p>
              </div>

              {/* Signature Inclusions */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#d4af37] mb-3">Signature Inclusions & Privileges</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalItem.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-6 bg-[#0b0d0e] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-center sm:text-left">
                <p className="text-xs text-gray-400">Ready to personalize this segment?</p>
                <p className="text-sm font-bold text-white">Get a custom quote within 2 hours</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 text-xs font-semibold hover:bg-white/5 transition-all w-full sm:w-auto"
                >
                  Close
                </button>
                <Link
                  href={`/contact?segment=${encodeURIComponent(activeModalItem.title)}`}
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg shadow-[#d4af37]/20"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
