"use client";

import { Sun, Activity, Droplets, Leaf, Apple, Waves, Moon } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const wellnessJourney = [
  {
    time: "05:30 AM",
    title: "Sunrise Stretching",
    description: "Gentle mobility work as the sky turns gold, preparing your muscles for movement.",
    icon: Sun,
  },
  {
    time: "06:15 AM",
    title: "Nature Jogging",
    description: "A guided 5km or 10km run through the most beautiful tropical lakeside trails.",
    icon: Activity,
  },
  {
    time: "07:30 AM",
    title: "Hydration Stop",
    description: "Refreshing with forest-fresh king coconut water and chilled natural spring water.",
    icon: Droplets,
  },
  {
    time: "08:15 AM",
    title: "Mindfulness Point",
    description: "A 10-minute deep breathing session at the forest's most high-energy viewpoint.",
    icon: Leaf,
  },
  {
    time: "09:00 AM",
    title: "Organic Recovery",
    description: "Post-run wellness breakfast featuring tropical fruits and local superfoods.",
    icon: Apple,
  },
  {
    time: "05:00 PM",
    title: "Sunset Trail Walk",
    description: "A low-intensity cooldown walk to settle the body as the forest falls asleep.",
    icon: Waves,
  },
  {
    time: "07:30 PM",
    title: "Deep Sleep Prep",
    description: "Herbal tea ceremony designed to promote deep recovery and mental peace.",
    icon: Moon,
  },
];

export const JoggingTimeline = () => (
  <ExperienceTimelineScroll
    steps={wellnessJourney}
    introLabel="The Daily Rhythm"
    introTitle={
      <>
        The Journey of <br /> Pure Vitality
      </>
    }
    outroTitle="Ready to Breathe?"
    outroButtonText="Reserve Your Trail"
    accent="emerald"
    confettiPalette="emerald"
  />
);
