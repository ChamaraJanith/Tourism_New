"use client";

import { Sunrise, Coffee, Sprout, Utensils, Wheat, Bird, Moon } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const timelineSteps = [
  {
    time: "06:00 AM",
    title: "Village Welcome",
    description: "Start your day with a traditional herbal drink and a walk through the morning mist.",
    icon: Sunrise,
  },
  {
    time: "08:30 AM",
    title: "Tea Garden Walk",
    description: "Join the pluckers in the hills and learn the secret of the perfect pick.",
    icon: Coffee,
  },
  {
    time: "10:30 AM",
    title: "Coconut Harvesting",
    description: "Watch the tree climbers and try your hand at husking a fresh coconut.",
    icon: Sprout,
  },
  {
    time: "01:00 PM",
    title: "Traditional Lunch",
    description: "Enjoy a farm-to-table organic meal served on a lotus leaf.",
    icon: Utensils,
  },
  {
    time: "03:30 PM",
    title: "Paddy Experience",
    description: "Step into the fields and learn about ancient irrigation and sowing.",
    icon: Wheat,
  },
  {
    time: "05:30 PM",
    title: "Duck Feeding",
    description: "Watch the sunset by the lake while tending to the village ducks.",
    icon: Bird,
  },
  {
    time: "07:30 PM",
    title: "Honey Tasting",
    description: "End the day with a tasting of wild honey collected from the village hives.",
    icon: Moon,
  },
];

export const ExperienceTimeline = () => (
  <ExperienceTimelineScroll
    steps={timelineSteps}
    introLabel="Journey Map"
    introTitle={
      <>
        A Day in the <br /> Life of a Farmer
      </>
    }
    outroTitle="Ready for the Journey?"
    outroButtonText="Book Your Experience"
    accent="emerald"
    confettiPalette="emerald"
  />
);
