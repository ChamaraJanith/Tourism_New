export interface Experience {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  video?: string;
  tag: string;
  details: {
    duration: string;
    location: string;
    groupSize: string;
    level: string;
  };
}

export const experiences: Experience[] = [
  {
    slug: "traditional-farming",
    title: "Traditional Farming",
    description: "Experience the authentic rural soul of Sri Lanka with private guided tours through lush paddy fields.",
    longDescription: "Step into a world where time slows down. Our Traditional Farming experience takes you deep into the heart of Sri Lanka's agricultural heritage. You will join local farmers in the lush paddy fields, learn about ancient chena cultivation techniques, and understand the deep spiritual connection between the land and its people. This isn't just a tour; it's an immersion into a lifestyle that has sustained the island for millennia.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
    video: "/videos/farming_hero.mp4",
    tag: "Agro-Tourism",
    details: {
      duration: "4-6 Hours",
      location: "Southern Hinterlands",
      groupSize: "Private (Up to 4)",
      level: "Relaxed"
    }
  },
  {
    slug: "organic-superfoods",
    title: "Organic Superfoods",
    description: "Discover the healing power of tropical nutrition with curated garden-to-table experiences.",
    longDescription: "Sri Lanka's tropical climate yields some of the world's most potent superfoods. In this experience, you'll explore organic gardens with expert naturalists, harvesting exotic fruits and herbs known for their medicinal properties. Following the harvest, participate in a private masterclass where you'll learn to prepare nutrient-dense meals that combine ancient Ayurvedic wisdom with modern culinary excellence.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    video: "/videos/organic_food_hero.mp4",
    tag: "Wellness",
    details: {
      duration: "3 Hours",
      location: "Eco-Reserve Garden",
      groupSize: "Couple / Small Group",
      level: "Educational"
    }
  },
  {
    slug: "hiriketiya-beach",
    title: "Hiriketiya Surf & Beach",
    description: "Relax at the iconic horseshoe bay of Hiriketiya, where turquoise waters meet pristine sand.",
    longDescription: "Hiriketiya is more than just a beach; it's a sanctuary for the modern nomad. This hidden horseshoe bay offers some of the best beginner and intermediate surf breaks in the country, framed by swaying palms and high-end boutique cafes. Your day includes private surf coaching, a reserved luxury beach cabana, and a curated sunset cocktail experience on the sand.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    video: "/videos/hirikatiya_hero.mp4",
    tag: "Coastal",
    details: {
      duration: "Full Day",
      location: "Dickwella / Hiriketiya",
      groupSize: "Flexible",
      level: "Moderate"
    }
  },
  {
    slug: "jogging-path",
    title: "Nature Jogging Paths",
    description: "Start your morning with guided runs through misty tropical trails and serene village paths.",
    longDescription: "Experience the awakening of the tropical landscape with a guided morning run. Our trails are carefully selected to showcase the diverse beauty of the region—from misty lakeside paths to vibrant village tracks. Led by professional fitness guides, these runs are tailored to your pace and offer a unique perspective on local life before the world wakes up.",
    image: "/images/jogging/1.jpg",
    video: "/videos/jogging_hero.mp4",
    tag: "Fitness",
    details: {
      duration: "1.5 Hours",
      location: "Various Trails",
      groupSize: "Private",
      level: "Customizable"
    }
  },
  {
    slug: "dandeniya-lake",
    title: "Dandeniya Lake Retreat",
    description: "Find absolute tranquility at the hidden gem of Dandeniya Lake with private boat safaris.",
    longDescription: "Escape the coastal crowds and head inland to the serene Dandeniya Lake. This sprawling body of water is a haven for biodiversity. Your retreat includes a private, silent boat safari through the lily pads, where you'll encounter rare water birds and monitors. The experience culminates in a luxury picnic set on a secluded island as the sky turns gold.",
    image: "/images/lake/5.webp",
    video: "/videos/dandeniya_hero.mp4",
    tag: "Nature",
    details: {
      duration: "3-4 Hours",
      location: "Dandeniya Nature Reserve",
      groupSize: "Private",
      level: "Relaxed"
    }
  },
  {
    slug: "waterfalls",
    title: "Hidden Waterfalls",
    description: "Discover secluded cascades tucked deep within the rainforest, offering private swimming.",
    longDescription: "The Southern rainforests hide spectacular cascades known only to locals. We take you off the beaten path to discover these hidden gems. Trek through lush canopy to reach pristine pools where you can swim in crystal-clear water, enjoy a natural stone massage from the falls, and practice meditation in an environment of pure, undisturbed nature.",
    image: "/images/waterfall/2.webp",
    video: "/videos/waterfall_hero.mp4",
    tag: "Adventure",
    details: {
      duration: "5 Hours",
      location: "Rainforest Belt",
      groupSize: "Private",
      level: "Moderate"
    }
  },
  {
    slug: "yoga",
    title: "Spiritual Yoga",
    description: "Connect with your inner self through private yoga sessions led by master practitioners.",
    longDescription: "Elevate your practice in a setting of absolute peace. Our Spiritual Yoga sessions are held in open-air pavilions overlooking the jungle or the ocean. Guided by masters of Hatha and Vinyasa, the sessions incorporate pranayama (breathing) and dhyana (meditation) to help you achieve a state of profound mental clarity and physical rejuvenation.",
    image: "/images/yoga/1.avif",
    video: "/videos/yoga_hero.mp4",
    tag: "Mindfulness",
    details: {
      duration: "1.5 - 2 Hours",
      location: "Wellness Pavilion",
      groupSize: "Private / Couple",
      level: "All Levels"
    }
  },
  {
    slug: "bicycle-riding",
    title: "Bicycle Riding",
    description: "Explore the scenic landscapes and coastal paths on a premium guided bicycle tour.",
    longDescription: "Discover the hidden beauty of Sri Lanka's southern coast on two wheels. Our premium bicycle tours take you through vibrant local villages, emerald paddy fields, and along stunning coastal tracks. Whether you're looking for a challenging workout or a leisurely exploration, our expert guides tailor each route to your fitness level and interests, ensuring a perfect blend of adventure and cultural immersion.",
    image: "/images/bicycle_ride/2.webp",
    video: "/videos/bicycle_ riding_hero.mp4",
    tag: "Adventure",
    details: {
      duration: "2-4 Hours",
      location: "Coastal & Inland Trails",
      groupSize: "Private / Group",
      level: "Customizable"
    }
  }
];
