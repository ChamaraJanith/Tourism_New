'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const accommodationPartners = [
  {
    title: 'Luxury Resorts',
    description:
      "World-class resorts offering unmatched opulence, private beaches, and personalised butler service across Sri Lanka's most breathtaking destinations.",
    icon: '🏨',
    placeholder: 'Luxury resort with infinity pool overlooking the ocean',
  },
  {
    title: 'Boutique Hotels',
    description:
      'Intimate, design-led properties with fewer than 50 rooms — each telling a unique story rooted in local culture and craftsmanship.',
    icon: '🏩',
    placeholder: 'Charming boutique hotel courtyard with tropical gardens',
  },
  {
    title: 'Five-Star, Four-Star & Three-Star Hotels',
    description:
      'Curated selection of rated hotels delivering consistent, premium standards of comfort, dining, and amenities for every type of international traveller.',
    icon: '⭐',
    placeholder: 'Grand hotel lobby with elegant Sri Lankan architecture',
  },
  {
    title: 'Heritage Hotels',
    description:
      "Restored colonial mansions, historic tea planters' bungalows, and century-old palaces offering an immersive window into Sri Lanka's rich past.",
    icon: '🏛️',
    placeholder: 'Restored colonial heritage hotel with lush surroundings',
  },
  {
    title: 'Villas & Private Residences',
    description:
      'Exclusive private villas with dedicated staff, private pools, and fully customised itineraries — perfect for families, honeymooners, and elite travellers.',
    icon: '🏡',
    placeholder: 'Private villa with plunge pool and ocean panorama',
  },
  {
    title: 'Serviced Apartments',
    description:
      'Spacious, apartment-style accommodations combining the flexibility of home living with premium hotel-grade services, ideal for long stays.',
    icon: '🏢',
    placeholder: 'Modern serviced apartment with city skyline view',
  },
  {
    title: 'Eco Lodges',
    description:
      'Sustainably built retreats nestled in forests and wetlands, designed to minimise environmental impact while maximising connection with nature.',
    icon: '🌿',
    placeholder: 'Eco lodge nestled in tropical rainforest canopy',
  },
  {
    title: 'Jungle Lodges',
    description:
      'Off-the-beaten-track wilderness retreats positioned near national parks and wildlife corridors for exceptional safari experiences.',
    icon: '🦁',
    placeholder: 'Jungle lodge with leopard in the wild background',
  },
  {
    title: 'Glamping & Camping Sites',
    description:
      'Luxury tented camps and star-gazing retreats that deliver the romance of outdoor living without compromising on comfort or style.',
    icon: '⛺',
    placeholder: 'Glamping tent under a canopy of stars in Sri Lanka',
  },
  {
    title: 'Guest Houses & Homestays',
    description:
      'Family-run properties offering warm, home-cooked meals and genuine local hospitality — the most authentic way to experience everyday Sri Lankan life.',
    icon: '🏠',
    placeholder: 'Cozy Sri Lankan homestay with traditional garden',
  },
  {
    title: 'Ayurveda & Wellness Retreats',
    description:
      'Certified Ayurvedic resorts and holistic wellness sanctuaries delivering traditional treatments, yoga, meditation, and detox programmes.',
    icon: '🧘',
    placeholder: 'Ayurvedic spa treatment room surrounded by nature',
  },
  {
    title: 'Retirement & Assisted Living Hospitality Providers',
    description:
      'Specialised senior-friendly hospitality providers offering medically supervised, fully assisted long-stay options in serene Sri Lankan settings.',
    icon: '🌺',
    placeholder: 'Peaceful assisted living residence with tropical gardens',
  },
];

const experiencePartners = [
  {
    title: 'Wildlife Safaris',
    description:
      'Expert-led jeep safaris through Yala, Udawalawe, Minneriya and beyond — home to elephants, leopards, sloth bears and hundreds of bird species.',
    icon: '🐘',
    placeholder: 'Elephant herd at Udawalawe during golden hour safari',
  },
  {
    title: 'Whale & Dolphin Watching',
    description:
      'Ocean excursions off Mirissa and Trincomalee to witness blue whales, sperm whales, and spinner dolphins in their natural deep-sea habitat.',
    icon: '🐋',
    placeholder: 'Blue whale breaching off Sri Lankan coast at sunrise',
  },
  {
    title: 'Diving & Snorkelling',
    description:
      "Guided dives along pristine coral reefs in Hikkaduwa, Pigeon Island and the Bar Reef Marine Sanctuary — amongst Asia's finest dive sites.",
    icon: '🤿',
    placeholder: 'Vibrant coral reef with tropical fish in crystal water',
  },
  {
    title: 'Surfing & Water Sports',
    description:
      'World-class breaks at Arugam Bay, Weligama, and Mirissa, alongside jet-skiing, kitesurfing, kayaking, and stand-up paddleboarding.',
    icon: '🏄',
    placeholder: 'Surfer riding a wave at Arugam Bay sunset',
  },
  {
    title: 'Sailing & Yachting',
    description:
      'Luxury catamaran sunset cruises, private yacht charters, and traditional outrigger sailing along the golden coastlines of Sri Lanka.',
    icon: '⛵',
    placeholder: 'Luxury yacht sailing along Sri Lanka tropical coastline',
  },
  {
    title: 'Deep-Sea Fishing',
    description:
      'Offshore sport-fishing expeditions targeting marlin, sailfish, yellowfin tuna, and wahoo in the rich waters of the Indian Ocean.',
    icon: '🎣',
    placeholder: 'Deep-sea fishing boat on calm Indian Ocean waters',
  },
  {
    title: 'Scenic Train Journeys',
    description:
      "Iconic rail experiences through the misty Hill Country — the Kandy to Ella route is consistently ranked among the world's most beautiful train rides.",
    icon: '🚂',
    placeholder: 'Train crossing iconic Nine Arch Bridge in Ella Sri Lanka',
  },
  {
    title: 'Tea & Spice Plantation Experiences',
    description:
      'Guided tours of working tea estates in Nuwara Eliya and Uva, and aromatic spice gardens in Kandy — from leaf to cup and seed to table.',
    icon: '🍵',
    placeholder: 'Tea pickers harvesting leaves on misty hill estate',
  },
  {
    title: 'Cultural & Heritage Tours',
    description:
      'Immersive guided experiences at Sigiriya, Polonnaruwa, Anuradhapura, and Dambulla — the ancient heart of Sri Lankan civilisation.',
    icon: '🏯',
    placeholder: 'Sigiriya rock fortress rising above misty jungle at sunrise',
  },
  {
    title: 'Community & Village Experiences',
    description:
      'Authentic village walking tours, cooking classes, paddy field experiences, and craftsman workshops that support local livelihoods.',
    icon: '🌾',
    placeholder: 'Local villagers in traditional setting with rice paddies',
  },
  {
    title: 'Bird Watching',
    description:
      'Expert ornithologist-led birding tours across Sinharaja, Bundala, and Kumana — home to over 230 endemic and migratory bird species.',
    icon: '🦜',
    placeholder: 'Colourful endemic bird perched in Sri Lankan rainforest',
  },
  {
    title: 'Trekking & Hiking',
    description:
      "Guided hikes through Knuckles Mountain Range, Adam's Peak pilgrimages, and off-trail wilderness treks in Sri Lanka's protected highlands.",
    icon: '🥾',
    placeholder: 'Trekker on misty mountain trail with valley views below',
  },
  {
    title: 'Cycling Tours',
    description:
      'Curated cycling routes through cultural triangles, coastal roads, tea-estate highlands, and village backwaters for all fitness levels.',
    icon: '🚴',
    placeholder: 'Cyclist on scenic rural road flanked by rice fields',
  },
  {
    title: 'Golf Experiences',
    description:
      "Championship golf at Victoria, Nuwara Eliya, and Shangri-La's exclusive courses — stunning highland and coastal settings for the discerning golfer.",
    icon: '⛳',
    placeholder: 'Manicured golf course with mountain backdrop in Sri Lanka',
  },
  {
    title: 'Luxury Ground Transportation',
    description:
      'Premium chauffeur-driven vehicles, vintage cars, tuk-tuk tours, and helicopter-to-ground transfer packages tailored to VIP itineraries.',
    icon: '🚘',
    placeholder: 'Luxury chauffeur-driven SUV on scenic Sri Lankan road',
  },
  {
    title: 'Helicopter & Seaplane Experiences',
    description:
      'Aerial sightseeing over ancient kingdoms, wildlife parks, and coastlines — plus point-to-point seaplane transfers to remote beach resorts.',
    icon: '🚁',
    placeholder: 'Seaplane taking off over Sri Lankan lagoon at sunrise',
  },
  {
    title: 'Destination Wedding Services',
    description:
      'Full-service destination wedding planning across beach, jungle, heritage, and hilltop settings — from intimate ceremonies to grand celebrations.',
    icon: '💍',
    placeholder: 'Romantic beach wedding ceremony at Sri Lankan sunset',
  },
  {
    title: 'Event Management',
    description:
      'Professional corporate retreats, incentive travel programmes, and luxury private events with end-to-end logistics and creative direction.',
    icon: '🎪',
    placeholder: 'Elegant corporate event setup under tropical night sky',
  },
  {
    title: 'Professional Tour Guides',
    description:
      'Accredited, multilingual guides with deep expertise in history, wildlife, culture, and geography — the backbone of every exceptional itinerary.',
    icon: '🗺️',
    placeholder: 'Professional tour guide with guests at ancient temple site',
  },
  {
    title: 'Medical & Wellness Providers',
    description:
      'Partnered medical facilities, wellness clinics, and emergency-response providers ensuring traveller health and safety throughout Sri Lanka.',
    icon: '🏥',
    placeholder: 'Modern wellness clinic surrounded by tropical greenery',
  },
  {
    title: 'Bespoke Tourism Experiences',
    description:
      'Fully tailored once-in-a-lifetime experiences crafted from scratch — private island dinners, dawn hot-air balloons, astrology tours and beyond.',
    icon: '✨',
    placeholder: 'Hot air balloon over misty Sri Lankan mountains at dawn',
  },
];

/* ─────────────────────────────────────────────
   PARTNER CARD
───────────────────────────────────────────── */
function PartnerCard({
  title,
  description,
  icon,
  placeholder,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  placeholder: string;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.12)] hover:-translate-y-1"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image placeholder */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#1e2228] to-[#2a2f38]">
        {!imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-5xl opacity-80">{icon}</span>
            <span className="text-[11px] text-gray-500 text-center px-4 leading-relaxed italic">
              {placeholder}
            </span>
            <div className="absolute bottom-3 right-3 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-3 py-1">
              <span className="text-[10px] text-[#d4af37] font-medium tracking-wider uppercase">
                Image Placeholder
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50">
            {icon}
          </div>
        )}
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl mt-0.5 shrink-0">{icon}</span>
          <h3 className="text-white font-semibold text-base leading-tight group-hover:text-[#d4af37] transition-colors duration-300">
            {title}
          </h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Gold accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-12 text-center">
      <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-5">
        {label}
      </span>
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function SriLankanNetworkPage() {
  return (
    <div className="min-h-screen bg-[#111416] text-white pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
            Sri Lanka Partners
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#d4af37] uppercase tracking-widest">
            Our Sri Lankan Tourism Partner Network
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            We collaborate with carefully selected tourism businesses across Sri Lanka to ensure
            quality, authenticity, and long-term value for our international partners.
          </p>
        </div>

        {/* ── HERO IMAGE ── */}
        <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] border border-white/10 group mb-24">
          <Image
            src="/images/nine_arch_bridge.png"
            alt="Sri Lankan Tourism - Demodara Nine Arch Bridge"
            fill
            priority
            className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Empowering Local Communities
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We work hand-in-hand with local guides, artisans, and hospitality providers to
              showcase the true essence of Sri Lanka.
            </p>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mb-24">
          {[
            { value: '12', label: 'Accommodation Types' },
            { value: '21', label: 'Experience Categories' },
            { value: '33+', label: 'Partner Segments' },
            { value: 'Island-Wide', label: 'Coverage' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111416] flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">
                {stat.value}
              </span>
              <span className="text-gray-400 text-xs uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════
            ACCOMMODATION PARTNERS
        ═══════════════════════════════════════ */}
        <section className="mb-24">
          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/40" />
            <SectionHeader
              label="Accommodation Partners"
              title="Where Our Guests Stay"
              subtitle="Our network spans the full spectrum of Sri Lankan accommodation — from iconic luxury resorts to authentic village homestays — all carefully vetted for quality, comfort, and cultural integrity."
            />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accommodationPartners.map((partner, i) => (
              <PartnerCard key={partner.title} {...partner} index={i} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            EXPERIENCE PARTNERS
        ═══════════════════════════════════════ */}
        <section>
          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/40" />
            <SectionHeader
              label="Experience Partners"
              title="What Our Guests Discover"
              subtitle="We work with trusted experience providers offering the full breadth of Sri Lanka's extraordinary natural, cultural, and adventure offerings — ensuring every journey is truly unforgettable."
            />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiencePartners.map((partner, i) => (
              <PartnerCard key={partner.title} {...partner} index={i} />
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <div className="mt-24 rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/5 via-[#111416] to-[#d4af37]/5 p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
              Become a Partner
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Join Our Growing Network
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Are you a tourism business in Sri Lanka? We'd love to hear from you. Apply to join our
              curated partner network and gain access to high-value international clientele.
            </p>
            <Link
              href="/partnerships/partner-with-us"
              className="inline-block bg-[#d4af37] hover:bg-[#c09b30] text-black font-bold px-10 py-4 rounded-full uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
            >
              Apply to Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
