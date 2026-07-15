"use client";

import { Compass, Mountain, Waves, Camera, Heart, Coffee } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const waterfallJourney = [
  {
    time: "06:30 AM",
    title: "Trail Briefing",
    description: "Expert orientation on rainforest safety and trail navigation over organic coffee.",
    icon: Coffee,
  },
  {
    time: "07:15 AM",
    title: "Jungle Trekking",
    description: "A guided expedition through dense canopy, spotting rare flora and fauna.",
    icon: Mountain,
  },
  {
    time: "09:30 AM",
    title: "Waterfall Discovery",
    description: "Reaching the first hidden cascade of the day. Pure mist and raw power.",
    icon: Compass,
  },
  {
    time: "11:00 AM",
    title: "Pool Relaxation",
    description: "Swimming in pristine natural stone pools at the base of the falling water.",
    icon: Waves,
  },
  {
    time: "01:00 PM",
    title: "Tropical Picnic",
    description: "Gourmet organic lunch served in a secluded jungle clearing.",
    icon: Coffee,
  },
  {
    time: "03:00 PM",
    title: "Photography Session",
    description: "Capturing the light play and rainbow mist of the afternoon falls.",
    icon: Camera,
  },
  {
    time: "05:30 PM",
    title: "Sunset Meditation",
    description: "A final mindfulness session near the rhythmic sound of the valley cascades.",
    icon: Heart,
  },
];

export const WaterfallTimeline = () => (
  <ExperienceTimelineScroll
    steps={waterfallJourney}
    introLabel="The Adventure Rhythm"
    introTitle={
      <>
        A Journey of <br /> Hidden Cascades
      </>
    }
    outroTitle="Ready for Adventure?"
    outroButtonText="Reserve Your Trek"
    accent="blue"
    confettiPalette="blue"
  />
);
