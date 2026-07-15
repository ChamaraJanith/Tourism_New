"use client";

import { Sunrise, Droplets, Sparkles, Coffee, Trees, Music, Flower } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const spiritualJourney = [
  {
    time: "05:15 AM",
    title: "Sunrise Meditation",
    description: "Silent awareness as the first light reflects off the tropical canopy.",
    icon: Sunrise,
  },
  {
    time: "06:30 AM",
    title: "Herbal Detox",
    description: "Traditional cleansing drink prepared with morning-harvested forest herbs.",
    icon: Droplets,
  },
  {
    time: "07:15 AM",
    title: "Morning Vinyasa",
    description: "Energizing yoga flow in the open-air pavilion to activate the spiritual body.",
    icon: Sparkles,
  },
  {
    time: "10:00 AM",
    title: "Ayurvedic Therapy",
    description: "Deep tissue massage with warm sacred oils curated for your constitution.",
    icon: Flower,
  },
  {
    time: "01:00 PM",
    title: "Organic Lunch",
    description: "A nutrient-dense Ayurvedic meal designed to ground and nourish.",
    icon: Coffee,
  },
  {
    time: "04:30 PM",
    title: "Nature Mindfulness",
    description: "Forest bathing walk through the sacred gardens with a master naturalist.",
    icon: Trees,
  },
  {
    time: "06:45 PM",
    title: "Sound Healing",
    description: "Frequency therapy with Tibetan bowls as the sun sets over the valley.",
    icon: Music,
  },
];

export const YogaTimeline = () => (
  <ExperienceTimelineScroll
    steps={spiritualJourney}
    introLabel="The Sacred Rhythm"
    introTitle={
      <>
        A Journey of <br /> Inner Harmony
      </>
    }
    outroTitle="Begin Your Ascent?"
    outroButtonText="Reserve Your Retreat"
    accent="amber"
    confettiPalette="amber"
  />
);
