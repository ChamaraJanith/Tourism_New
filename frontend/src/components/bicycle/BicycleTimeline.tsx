"use client";

import { Sunrise, Bike, Camera, Coffee, Trees, Waves, Sunset } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const cyclingJourney = [
  {
    time: "06:00 AM",
    title: "Sunrise Warm-up",
    description: "Gentle stretching and trail orientation at the retreat as the sun rises.",
    icon: Sunrise,
  },
  {
    time: "07:30 AM",
    title: "Village Cycling",
    description: "Starting the journey through lush rural pathways and local community hubs.",
    icon: Bike,
  },
  {
    time: "09:30 AM",
    title: "Scenic Photo Stop",
    description: "Capturing the panoramic views from a high-altitude viewpoint over the valley.",
    icon: Camera,
  },
  {
    time: "11:00 AM",
    title: "Tropical Breakfast",
    description: "A restorative organic breakfast served in a traditional village home.",
    icon: Coffee,
  },
  {
    time: "01:30 PM",
    title: "Forest Exploration",
    description: "Navigating shaded jungle trails with expert biodiversity commentary.",
    icon: Trees,
  },
  {
    time: "04:00 PM",
    title: "Lakeside Relaxation",
    description: "A peaceful coastal or lakeside ride to cool down and watch the birds.",
    icon: Waves,
  },
  {
    time: "06:30 PM",
    title: "Sunset Return",
    description: "Descending back to the resort under the vibrant hues of a tropical sunset.",
    icon: Sunset,
  },
];

export const BicycleTimeline = () => (
  <ExperienceTimelineScroll
    steps={cyclingJourney}
    introLabel="The Adventure Rhythm"
    introTitle={
      <>
        A Journey of <br /> Hidden Trails
      </>
    }
    outroTitle="Ready to Ride?"
    outroButtonText="Reserve Your Bike"
    accent="emerald"
    confettiPalette="emerald"
  />
);
