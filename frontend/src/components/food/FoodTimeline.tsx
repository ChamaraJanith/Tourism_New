"use client";

import { Coffee, Sunrise, UtensilsCrossed, Apple, Sunset, Moon, Sparkles } from "lucide-react";
import { ExperienceTimelineScroll } from "@/components/ui/ExperienceTimelineScroll";

const foodTimeline = [
  {
    time: "06:00 AM",
    title: "Herbal Detox",
    description: "Start with a warm cup of 'Gotu Kola' or 'Moringa' herbal elixir to activate your body.",
    icon: Sunrise,
  },
  {
    time: "08:30 AM",
    title: "Organic Breakfast",
    description: "Enjoy traditional 'Hoppers' with fresh coconut sambol and tropical fruits.",
    icon: Coffee,
  },
  {
    time: "11:00 AM",
    title: "Spice Garden Walk",
    description: "Visit the village market and our gardens to harvest fresh ingredients for lunch.",
    icon: Sparkles,
  },
  {
    time: "01:30 PM",
    title: "Village Cooking",
    description: "Join the communal kitchen for a wood-fired cooking session and an Ayurvedic feast.",
    icon: UtensilsCrossed,
  },
  {
    time: "04:30 PM",
    title: "Coconut Ritual",
    description: "Learn to scale trees and husk King Coconuts for a natural electrolyte boost.",
    icon: Apple,
  },
  {
    time: "06:30 PM",
    title: "Herbal Tea Ceremony",
    description: "Savor rare Ceylon teas with local jaggery as the sun sets over the plantation.",
    icon: Sunset,
  },
  {
    time: "08:30 PM",
    title: "Light Detox Meal",
    description: "A soothing bowl of red rice porridge (Kanda) to prepare your body for rest.",
    icon: Moon,
  },
];

export const FoodTimeline = () => (
  <ExperienceTimelineScroll
    steps={foodTimeline}
    introLabel="Culinary Journey"
    introTitle={
      <>
        A Day of <br /> Organic Wellness
      </>
    }
    outroTitle="Ready for Renewal?"
    outroButtonText="Book Wellness Stay"
    accent="amber"
    confettiPalette="amber"
  />
);
