"use client";

import { Sunrise, Coffee, Ship, Utensils, Camera, Bird, Moon } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const timelineSteps = [
  {
    time: "05:30 AM",
    title: "Dawn on the Lake",
    description:
      "Witness the lake waking up with a spectacular sunrise as the first light hits the water.",
    icon: Sunrise,
  },
  {
    time: "07:30 AM",
    title: "Fisherman's Breakfast",
    description:
      "Enjoy traditional Sri Lankan breakfast on the banks prepared by the local community.",
    icon: Coffee,
  },
  {
    time: "09:00 AM",
    title: "Traditional Boat Ride",
    description:
      "Embark on a guided boat tour to explore the hidden corners and islands of the lake.",
    icon: Ship,
  },
  {
    time: "12:00 PM",
    title: "Island Picnic",
    description:
      "Stop at a secluded island for a curated lunch featuring local lake-fish specialties.",
    icon: Utensils,
  },
  {
    time: "03:00 PM",
    title: "Bird Photography",
    description:
      "Join our naturalist to spot and photograph rare endemic and migratory birds.",
    icon: Camera,
  },
  {
    time: "05:30 PM",
    title: "Sunset Drift",
    description:
      "Relax as the boat drifts silently while the sky turns into a masterpiece of colors.",
    icon: Bird,
  },
  {
    time: "07:30 PM",
    title: "Starlight Reflections",
    description:
      "End your journey with a peaceful evening reflection by the lakeside campfire.",
    icon: Moon,
  },
];

export const LakeTimeline = () => (
  <ExperienceTimelineScroll
    steps={timelineSteps}
    introLabel="The Itinerary"
    introTitle={
      <>
        A Day on the <br /> Mystical Waters
      </>
    }
    outroTitle="Set Sail with Us?"
    outroButtonText="Book Boat Experience"
    accent="blue"
    confettiPalette="blue"
  />
);
