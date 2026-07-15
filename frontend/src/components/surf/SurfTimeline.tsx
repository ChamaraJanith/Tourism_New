"use client";

import { Sunrise, Waves, Coffee, Sun, Camera, Sunset, Utensils, Music } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const surfJourney = [
  {
    time: "05:30 AM",
    title: "Sunrise Yoga",
    description: "Centering your mind and body with the sound of the ocean at dawn.",
    icon: Sunrise,
  },
  {
    time: "07:00 AM",
    title: "Surf Session",
    description: "The best waves of the day. One-on-one coaching in the bay.",
    icon: Waves,
  },
  {
    time: "09:30 AM",
    title: "Coconut Breakfast",
    description: "Post-surf fuel with fresh coconuts and tropical fruit bowls.",
    icon: Coffee,
  },
  {
    time: "12:00 PM",
    title: "Beach Siesta",
    description: "Relax under the palms or swim in the crystal-clear turquoise waters.",
    icon: Sun,
  },
  {
    time: "03:30 PM",
    title: "Ocean Photography",
    description: "Capturing your flow on the waves with our professional surf photographers.",
    icon: Camera,
  },
  {
    time: "06:00 PM",
    title: "Sunset Paddle",
    description: "A peaceful paddle out into the golden bay as the sun dips below the horizon.",
    icon: Sunset,
  },
  {
    time: "08:00 PM",
    title: "Coastal Dining",
    description: "Fresh seafood and tropical cocktails at the bay's most iconic cafés.",
    icon: Utensils,
  },
  {
    time: "10:00 PM",
    title: "Island Vibes",
    description: "End the night with social beats and the vibrant Hiriketiya community.",
    icon: Music,
  },
];

export const SurfTimeline = () => (
  <ExperienceTimelineScroll
    steps={surfJourney}
    introLabel="The Daily Tide"
    introTitle={
      <>
        A Day in <br /> Surf Paradise
      </>
    }
    outroTitle="Your Wave Awaits"
    outroButtonText="Reserve Experience"
    accent="cyan"
    confettiPalette="cyan"
  />
);
