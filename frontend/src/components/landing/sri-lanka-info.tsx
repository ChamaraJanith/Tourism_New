"use client";

import { useEffect, useState } from "react";
import {
  MapPinned,
  Wind,
  ThermometerSun,
  ExternalLink,
  Clock3,
  CalendarDays,
} from "lucide-react";

type CityWeather = {
  name: string;
  temp: number;
  wind: number;
};

const cities = [
  { name: "Colombo", lat: 6.9271, lon: 79.8612 },
  { name: "Kandy", lat: 7.2906, lon: 80.6337 },
  { name: "Galle", lat: 6.0535, lon: 80.221 },
  { name: "Trincomalee", lat: 8.5874, lon: 81.2152 },
  { name: "Nuwara Eliya", lat: 6.9497, lon: 80.7891 },
];

export function SriLankaClimateLive() {
  const [data, setData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [sriLankaDate, setSriLankaDate] = useState("");
  const [sriLankaClock, setSriLankaClock] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const date = now.toLocaleDateString("en-GB", {
        timeZone: "Asia/Colombo",
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const time = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setSriLankaDate(date);
      setSriLankaClock(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const results = await Promise.all(
          cities.map(async (city) => {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,wind_speed_10m`
            );

            const json = await res.json();

            return {
              name: city.name,
              temp: json.current?.temperature_2m ?? 0,
              wind: json.current?.wind_speed_10m ?? 0,
            };
          })
        );

        setData(results);
      } catch (error) {
        console.error("Failed to load weather", error);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  return (
    <section
      id="climate-live"
      className="bg-[#050816] py-16 text-white md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Live Island Weather
          </p>
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            Sri Lanka Climate, Time & Temperature
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Discover live conditions across Sri Lanka, from the tropical west
            and south coasts to the cool highlands of the interior.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-3xl rounded-3xl border border-emerald-900/40 bg-gradient-to-r from-emerald-950/70 to-black/60 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Local Date & Time in Sri Lanka
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-800/30 bg-white/5 p-5 text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-emerald-400">
                <CalendarDays className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-[0.15em]">
                  Date
                </span>
              </div>
              <p className="text-lg font-semibold text-white md:text-xl">
                {sriLankaDate}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-800/30 bg-white/5 p-5 text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-emerald-400">
                <Clock3 className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-[0.15em]">
                  Time
                </span>
              </div>
              <p className="text-2xl font-bold text-white md:text-3xl">
                {sriLankaClock}
              </p>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-slate-300">
            Sri Lanka Standard Time (UTC+5:30)
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-emerald-900/40 bg-white/5 p-8 text-center text-slate-300">
            Loading live weather data...
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {data.map((city) => (
              <div
                key={city.name}
                className="rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-white/8 to-white/4 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {city.name}
                  </h3>
                  <MapPinned className="h-5 w-5 text-emerald-400" />
                </div>

                <div className="flex items-center gap-2">
                  <ThermometerSun className="h-5 w-5 text-emerald-300" />
                  <p className="text-3xl font-bold text-emerald-400">
                    {city.temp}°C
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                  <Wind className="h-4 w-4 text-slate-400" />
                  <span>Wind: {city.wind} km/h</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-emerald-900/40 bg-gradient-to-br from-emerald-950 to-[#0b1220] p-8 shadow-[0_14px_50px_rgba(0,0,0,0.45)]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Seasonal Guide
            </p>
            <h3 className="mb-5 text-2xl font-semibold text-white">
              Best Time to Visit
            </h3>

            <ul className="space-y-4 text-sm leading-7 text-slate-300 md:text-base">
              <li>
                <span className="font-semibold text-white">
                  South & West Coast:
                </span>{" "}
                December to March for the driest beach weather.
              </li>
              <li>
                <span className="font-semibold text-white">
                  East & North Coast:
                </span>{" "}
                May to September for better sunshine and sea conditions.
              </li>
              <li>
                <span className="font-semibold text-white">Hill Country:</span>{" "}
                Cooler throughout the year, often pleasant from April to
                September.
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-emerald-800/40 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              Sri Lanka’s travel seasons vary by region because the island is
              influenced by two monsoon systems rather than one uniform weather
              pattern.
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-900/40 bg-gradient-to-br from-[#0b1220] to-black p-8 shadow-[0_14px_50px_rgba(0,0,0,0.45)]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Live Weather Map
            </p>
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Explore Sri Lanka in Real Time
            </h3>
            <p className="mb-6 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Open an interactive satellite and radar view to see current
              precipitation, temperature, wind, and cloud movement across the
              island.
            </p>

            <div className="rounded-2xl border border-emerald-800/30 bg-white/5 p-6">
              <div className="flex items-center gap-3 text-slate-200">
                <MapPinned className="h-5 w-5 text-emerald-400" />
                <span className="text-sm md:text-base">
                  Interactive Sri Lanka weather map
                </span>
              </div>

              <a
                href="https://zoom.earth/places/sri-lanka/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                Open Live Map
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}