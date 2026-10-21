export interface PackageItineraryItem {
  day: string;
  title: string;
  description?: string;
}

export interface TravelPackage {
  id: number;
  title: string;
  duration: string;
  description: string;
  images: string[];
  includes: string[];
  idealFor: string;
  itinerary?: PackageItineraryItem[];
}

export const PACKAGES: TravelPackage[] = [
  {
    id: 1,
    title: 'The Grand Sri Lanka Discovery',
    duration: '8 Days | 7 Nights',
    description: 'Experience the very best of Sri Lanka in one unforgettable journey. From ancient kingdoms and misty mountains to pristine beaches and vibrant cities, this signature tour captures the island\'s most iconic attractions.',
    images: [
      '/images/Travel_Packages/The_Grand_Srilanka_Discovery/Picture1.jpg',
      '/images/Travel_Packages/The_Grand_Srilanka_Discovery/Picture2.jpg',
      '/images/Travel_Packages/The_Grand_Srilanka_Discovery/Picture3.jpg',
      '/images/Travel_Packages/The_Grand_Srilanka_Discovery/Picture4.jpg'
    ],
    includes: [
      'Airport Meet & Greet',
      'Luxury Accommodation',
      'Private Chauffeur Guide',
      'Daily Breakfast & Selected Dinners',
      'UNESCO Heritage Site Visits',
      'Scenic Train Journey',
      'Tea Plantation Experience',
      'Cultural Performances',
      'Luxury Beach Stay',
      '24/7 Guest Support'
    ],
    idealFor: 'First-time visitors, couples, families, and small groups.'
  },
  {
    id: 2,
    title: 'Luxury Escape Sri Lanka',
    duration: '7 Days | 6 Nights',
    description: 'Experience Sri Lanka through elegance, exclusivity, and personalized service.',
    images: [
      '/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture5.jpg',
      '/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture6.jpg',
      '/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture7.jpg',
      '/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture8.jpg',
      '/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture9.jpg',
      '/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture10.jpg',
      '/images/Travel_Packages/Luxury_Escape_Sri_Lanka/Picture11.jpg'
    ],
    includes: [
      'Five-Star Luxury Hotels & Resorts',
      'Private Airport Transfers',
      'Luxury Chauffeur Service',
      'Exclusive Dining Experiences',
      'Private Safari',
      'Sunset Yacht Cruise',
      'Spa & Wellness Experiences',
      'Concierge Services',
      'Optional Helicopter Transfers'
    ],
    idealFor: 'Luxury travellers, VIP guests, executives, and honeymooners.'
  },
  {
    id: 3,
    title: 'Heritage & Cultural Discovery',
    duration: '6 Days | 5 Nights',
    description: 'Travel through over 2,500 years of Sri Lankan civilization.',
    images: [
      '/images/Travel_Packages/Heritage_Cultural_Discovery/Picture12.jpg',
      '/images/Travel_Packages/Heritage_Cultural_Discovery/Picture13.jpg',
      '/images/Travel_Packages/Heritage_Cultural_Discovery/Picture14.jpg',
      '/images/Travel_Packages/Heritage_Cultural_Discovery/Picture15.jpg'
    ],
    includes: [
      'UNESCO Heritage Tours',
      'Ancient Kingdom Exploration',
      'Temple Visits',
      'Village Experiences',
      'Traditional Sri Lankan Cuisine',
      'Cultural Performances',
      'Professional Heritage Guide'
    ],
    idealFor: 'History enthusiasts, educational tours, and cultural explorers.'
  },
  {
    id: 4,
    title: 'Wildlife & Nature Adventure',
    duration: '15 Days | 14 Nights',
    description: 'Explore one of the world\'s richest biodiversity destinations across 15 breathtaking days.',
    images: [
      '/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture16.jpg',
      '/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture17.jpg',
      '/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture18.jpg',
      '/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture19.jpg',
      '/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture20.jpg',
      '/images/Travel_Packages/Wildlife_and_Nature_Adventure/Picture21.jpg'
    ],
    includes: [
      'Kalpitiya Coastal & Dolphin Excursions',
      'Wilpattu 4x4 Jeep Safari Adventure',
      'Habarana Lion’s Rock & Rural Village Tour',
      'Ramboda Falls & Temple of the Tooth City Tour',
      'Ella Scenic Hill Country Train Ride',
      'Arugam Bay Coastal Trail Trek',
      'Yala National Park Safari (Leopard Tracking)',
      'Udawalawe National Park Elephant Safari',
      'Unawatuna Whale Watching & Bicycle Ride',
      'Experienced Naturalist Guides & Private Transfers'
    ],
    itinerary: [
      {
        day: 'DAY 01 & 02',
        title: 'ARRIVE KALPITIYA, SRI LANKA',
        description: 'Warm airport greeting, scenic coastal transfer to Kalpitiya. Unwind along pristine lagoons and golden beaches with optional dolphin watching.'
      },
      {
        day: 'DAY 03',
        title: 'WILPATTU | SAFARI ADVENTURE',
        description: 'Thrilling open 4x4 safari expedition inside Wilpattu National Park tracking elusive leopards, sloth bears, and endemic wetland birds.'
      },
      {
        day: 'DAY 04 & 05',
        title: 'HABARANA | LION’S ROCK - VILLAGE TOUR',
        description: 'Climb the ancient Sigiriya Lion\'s Rock fortress and experience an authentic rural Habarana village tour with traditional hospitality.'
      },
      {
        day: 'DAY 06',
        title: 'RAMBODA | TEMPLE OF THE TOOTH-CITY TOUR',
        description: 'Ascend through misty hill country via Ramboda Falls to sacred Kandy. Visit the UNESCO World Heritage Temple of the Tooth Relic and historic city.'
      },
      {
        day: 'DAY 07',
        title: 'ELLA | TRAIN RIDE',
        description: 'Embark on the iconic scenic train journey through lush tea plantations and mountain viaducts into Ella, visiting Nine Arches Bridge.'
      },
      {
        day: 'DAY 08, 09, 10',
        title: 'ARUGAM BAY | TRAIL TREK',
        description: 'Three adventurous days exploring east coast trail treks, pristine nature walks, lagoon biodiversity, and world-class surf coastlines.'
      },
      {
        day: 'DAY 11',
        title: 'YALA NATIONAL PARK | SAFARI ADVENTURE',
        description: 'Deep wilderness safari in Yala National Park, renowned worldwide for the highest leopard density, wild elephants, and spotted deer.'
      },
      {
        day: 'DAY 12',
        title: 'UDAWALAWE NATIONAL PARK | ELEPHANT SAFARI',
        description: 'Safari game drive through Udawalawe grasslands, encountering majestic herds of wild Asian elephants and exotic bird life in their sanctuary.'
      },
      {
        day: 'DAY 13, 14',
        title: 'UNAWATUNA | WHALE WATCHING - BICYCLE RIDE',
        description: 'Early morning blue whale watching expedition in southern waters, followed by scenic village bicycle rides and tranquil beach leisure.'
      },
      {
        day: 'DAY 15',
        title: 'DEPARTURE',
        description: 'Breakfast by the Indian Ocean, southern expressway transfer to Bandaranaike International Airport (CMB) with lifelong safari memories.'
      }
    ],
    idealFor: 'Wildlife lovers, photographers, safari enthusiasts, and adventure seekers.'
  },
  {
    id: 5,
    title: 'Wellness & Ayurveda Retreat',
    duration: '10 Days | 9 Nights',
    description: 'A journey designed to restore balance, health, and inner peace.',
    images: [
      '/images/Travel_Packages/Wellness_and_Ayurveda_Retreat/Picture22.jpg',
      '/images/Travel_Packages/Wellness_and_Ayurveda_Retreat/Picture23.jpg',
      '/images/Travel_Packages/Wellness_and_Ayurveda_Retreat/Picture24.jpg',
      '/images/Travel_Packages/Wellness_and_Ayurveda_Retreat/Picture25.jpg',
      '/images/Travel_Packages/Wellness_and_Ayurveda_Retreat/Picture26.jpg',
      '/images/Travel_Packages/Wellness_and_Ayurveda_Retreat/Picture27.jpg'
    ],
    includes: [
      'Luxury Wellness Resort',
      'Ayurveda Consultation',
      'Personalized Treatments',
      'Yoga & Meditation',
      'Organic Wellness Cuisine',
      'Detox Programmes',
      'Beach Relaxation'
    ],
    idealFor: 'Wellness seekers, long-stay visitors, and stress recovery.'
  },
  {
    id: 6,
    title: 'Romance & Honeymoon Collection',
    duration: '11 Days | 10 Nights',
    description: 'Celebrate love across 11 unforgettable days in one of the world\'s most romantic island destinations.',
    images: [
      '/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture28.jpg',
      '/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture29.jpg',
      '/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture31.jpg',
      '/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture32.jpg',
      '/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture33.jpg',
      '/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture34.jpg',
      '/images/Travel_Packages/Romance_and_Honeymoon_Collection/Picture35.jpg'
    ],
    includes: [
      'Luxury Honeymoon Suite & Boutique Stays',
      'Romantic Candlelit Beach Dinner in Bentota',
      'Arrival Couples\' Ayurvedic Massage in Colombo',
      'Sigiriya Private Stargazing Experience',
      'Sigiriya Countryside Bicycle Ride & Safari',
      'Scenic Kandy & Nuwara Eliya Tea Country Tour',
      'Iconic Hill Country Train Journey to Ella',
      'Madu River Boat Safari & Turtle Hatchery Visit',
      'Private Chauffeur Guide & Dedicated Concierge'
    ],
    itinerary: [
      {
        day: 'DAY 01',
        title: 'ARRIVE COLOMBO | AYURVEDIC MASSAGE',
        description: 'Warm airport welcome and transfer to luxury accommodation. Unwind after your flight with a rejuvenating couples\' Ayurvedic massage.'
      },
      {
        day: 'DAY 02',
        title: 'SIGIRIYA | STARGAZING',
        description: 'Journey to the cultural heartland of Sigiriya. Spend a romantic evening under clear night skies with an enchanting stargazing experience.'
      },
      {
        day: 'DAY 03',
        title: 'SIGIRIYA | VILLAGE TOUR',
        description: 'Immerse yourselves in rural Sri Lankan heritage with a private village tour, lake catamaran ride, and authentic traditional culinary lunch.'
      },
      {
        day: 'DAY 04',
        title: 'SIGIRIYA | BICYCLE RIDE | SAFARI ADVENTURE',
        description: 'Morning scenic bicycle ride through lush village pathways followed by an afternoon open 4x4 safari adventure tracking wild elephant herds.'
      },
      {
        day: 'DAY 05',
        title: 'KANDY | CITY TOUR',
        description: 'Travel to the historic royal city of Kandy. Tour around Kandy Lake, visit the sacred Temple of the Tooth Relic, and explore cultural landmarks.'
      },
      {
        day: 'DAY 06',
        title: 'NUWARA ELIYA | FACTORY VISIT',
        description: 'Ascend into misty tea country, also known as Little England. Visit a prestigious Ceylon tea estate and factory with artisanal tea tasting.'
      },
      {
        day: 'DAY 07',
        title: 'ELLA | TRAIN RIDE',
        description: 'Board the iconic scenic train ride winding through lush mountain valleys and tea hills to Ella. Marvel at the Nine Arches Bridge and gorge vistas.'
      },
      {
        day: 'DAY 08',
        title: 'BENTOTA | BOAT RIDE - TURTLE HATCHERY',
        description: 'Descend to coastal Bentota. Enjoy a serene Madu River boat safari through mangrove tunnels and visit a sea turtle conservation hatchery.'
      },
      {
        day: 'DAY 09',
        title: 'BENTOTA | CANDLELIT DINNER',
        description: 'Leisurely beachfront relaxation by golden sands, culminating in an intimate private candlelit dinner under the stars by the ocean.'
      },
      {
        day: 'DAY 10',
        title: 'NEGOMBO',
        description: 'Transfer to the charming coastal town of Negombo. Stroll along the beach, explore the colonial canals, or relax at a luxury seaside resort.'
      },
      {
        day: 'DAY 11',
        title: 'DEPARTURE',
        description: 'Relaxed breakfast by the ocean and smooth transfer to Bandaranaike International Airport for your departure flight with cherished memories.'
      }
    ],
    idealFor: 'Honeymooners, couples, romantic escapes, and anniversary celebrations.'
  },
  {
    id: 7,
    title: 'Adventure Sri Lanka',
    duration: '7 Days | 6 Nights',
    description: 'Designed for travellers seeking excitement and unforgettable outdoor experiences.',
    images: [
      '/images/Travel_Packages/Adventure_Sri_Lanka/Picture36.jpg',
      '/images/Travel_Packages/Adventure_Sri_Lanka/Picture37.jpg',
      '/images/Travel_Packages/Adventure_Sri_Lanka/Picture38.jpg',
      '/images/Travel_Packages/Adventure_Sri_Lanka/Picture39.jpg',
      '/images/Travel_Packages/Adventure_Sri_Lanka/Picture40.jpg',
      '/images/Travel_Packages/Adventure_Sri_Lanka/Picture41.jpg',
      '/images/Travel_Packages/Adventure_Sri_Lanka/Picture42.jpg'
    ],
    includes: [
      'White Water Rafting',
      'Mountain Trekking',
      'Surfing Lessons',
      'Cycling Adventures',
      'Camping',
      'Zipline Experience',
      'Hot Air Balloon Ride (Optional)'
    ],
    itinerary: [
      {
        day: 'DAY 01',
        title: 'ARRIVE COLOMBO, SRI LANKA',
        description: 'Warm airport greeting at Bandaranaike International Airport and private transfer to your hotel in Colombo. Unwind and prepare for your thrilling island adventure.'
      },
      {
        day: 'DAY 02',
        title: 'COLOMBO | SAFARI ADVENTURE',
        description: 'Embark on an exhilarating safari adventure and wildlife exploration, discovering scenic natural habitats and wildlife.'
      },
      {
        day: 'DAY 03',
        title: 'SIGIRIYA | LION’S ROCK',
        description: 'Climb the iconic UNESCO World Heritage Sigiriya Rock Fortress, discovering ancient palace ruins, vivid wall frescoes, and breathtaking summit vistas.'
      },
      {
        day: 'DAY 04',
        title: 'KNUCKLES | TRAIL TREK',
        description: 'Trek deep into the rugged wilderness of the Knuckles Mountain Range, traversing misty cloud forests, hidden crystal streams, and scenic mountain ridges.'
      },
      {
        day: 'DAY 05',
        title: 'KITULGALA | RAFTING QUEST',
        description: 'Experience heart-pounding white water rafting on the Kelani River rapids in Kitulgala, complemented by waterfall abseiling and rainforest exploration.'
      },
      {
        day: 'DAY 06',
        title: 'NEGOMBO | BEACH SERENITY',
        description: 'Journey to the coastal haven of Negombo to unwind by golden beaches, soak up the tropical sunset, and celebrate an unforgettable adventure.'
      },
      {
        day: 'DAY 07',
        title: 'NEGOMBO / DEPARTURE',
        description: 'Savor a final oceanfront breakfast and tropical breeze before your private transfer to Bandaranaike International Airport for your departure flight.'
      }
    ],
    idealFor: 'Adventure enthusiasts and young travellers.'
  },
  {
    id: 8,
    title: 'Family Holiday Experience',
    duration: '7 Days | 6 Nights',
    description: 'Create lifelong memories with experiences designed for every generation.',
    images: [
      '/images/Travel_Packages/Family_Holiday_Experience/Picture43.jpg',
      '/images/Travel_Packages/Family_Holiday_Experience/Picture44.jpg',
      '/images/Travel_Packages/Family_Holiday_Experience/Picture45.jpg',
      '/images/Travel_Packages/Family_Holiday_Experience/Picture46.jpg',
      '/images/Travel_Packages/Family_Holiday_Experience/Picture47.jpg',
      '/images/Travel_Packages/Family_Holiday_Experience/Picture48.jpg',
      '/images/Travel_Packages/Family_Holiday_Experience/Picture49.jpg',
      '/images/Travel_Packages/Family_Holiday_Experience/Picture50.jpg'
    ],
    includes: [
      'Family-Friendly Hotels',
      'Safari Adventure',
      'Turtle Conservation Visit',
      'Elephant Experience',
      'Beach Activities',
      'Scenic Train Journey',
      'Family Entertainment'
    ],
    idealFor: 'Families with children and multi-generational travel.'
  },
  {
    id: 9,
    title: 'Silver Horizons – Luxury Senior Living Experience',
    duration: '14–30 Days',
    description: 'An exclusive programme designed for travellers aged 55+ seeking wellness, relaxation, healthcare access, and meaningful cultural experiences.',
    images: [
      '/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture51.jpg',
      '/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture52.jpg',
      '/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture53.jpg',
      '/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture54.jpg',
      '/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture55.jpg',
      '/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture56.jpg'
    ],
    includes: [
      'Luxury Long-Stay Accommodation',
      'Wellness & Ayurveda Therapies',
      'Medical Support (on request)',
      'Personal Concierge',
      'Gentle Excursions',
      'Healthy Dining',
      'Cultural Activities',
      'Airport VIP Assistance'
    ],
    idealFor: 'Active retirees, wellness travellers, and long-stay guests.'
  },
  {
    id: 10,
    title: 'MICE & Corporate Excellence',
    duration: 'Tailor-Made Programmes',
    description: 'Professional destination management solutions for businesses and organizations.',
    images: [
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture57.jpg',
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture58.jpg',
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture59.jpg',
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture60.jpg',
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture61.jpg',
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture62.jpg',
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture63.jpg',
      '/images/Travel_Packages/MICE_and_Corporate_Excellence/Picture64.jpg'
    ],
    includes: [
      'Meetings',
      'Incentive Travel',
      'Conferences',
      'Exhibitions',
      'Executive Retreats',
      'Product Launches',
      'Gala Events',
      'Corporate Team Building'
    ],
    idealFor: 'Businesses, corporate teams, event planners, and large organizations.'
  }
];
