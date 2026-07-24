import { Hero } from "@/components/landing/hero";
import { WhyTravel } from "@/components/landing/why-travel";
import { Journeys } from "@/components/landing/journeys";
import { EventFestival } from "@/components/landing/event-festival";
import { Gallery } from "@/components/landing/gallery";
import { AboutUs } from "@/components/landing/about-us";
import  BoardOfDirectors from "@/components/landing/board-of-directors";
import { SriLankaClimateLive } from "@/components/landing/sri-lanka-info";
 
export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">
        <Hero />
        <WhyTravel />
        <Journeys />
        <EventFestival />
        <Gallery />
        <AboutUs />
        <BoardOfDirectors/>
        <SriLankaClimateLive />
      </main>
    </div>
  );
}
