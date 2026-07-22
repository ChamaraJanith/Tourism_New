"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Suppress THREE.Clock deprecation warning from @react-three/fiber
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.warn = (...args: any[]) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const isLifestyleExperienceRoute = pathname?.startsWith("/lifestyle-experiences");

  useEffect(() => {
    if (isLifestyleExperienceRoute) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle scroll to top on every pathname change, or to the target hash if present
  useEffect(() => {
    if (isLifestyleExperienceRoute) {
      return;
    }

    let intervalId: NodeJS.Timeout | null = null;
    let attempts = 0;
    const maxAttempts = 30; // Try for 1.5 seconds (30 * 50ms)

    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#")) {
        const id = hash.substring(1);
        
        const tryScroll = () => {
          const element = document.getElementById(id);
          if (element) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(element, { 
                immediate: false,
                duration: 1.2,
              });
            } else {
              element.scrollIntoView({ behavior: "smooth" });
            }
            return true;
          }
          return false;
        };

        // If found immediately, scroll and return
        if (tryScroll()) {
          return;
        }

        // Otherwise, poll for the element to mount
        attempts = 0;
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(() => {
          attempts++;
          if (tryScroll() || attempts >= maxAttempts) {
            if (intervalId) clearInterval(intervalId);
          }
        }, 50);
      } else {
        // If no hash, scroll to top
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      }
    };

    // Run after a short delay on pathname change to allow component mounting
    const timer = setTimeout(handleScroll, 150);

    // Listen for hash changes (e.g. clicking native links or browser back/forward)
    window.addEventListener("hashchange", handleScroll);

    // Monkeypatch pushState and replaceState to catch Next.js client-side navigations
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (state, unused, url) {
      originalPushState.apply(this, [state, unused, url]);
      // Trigger scroll check on next tick to ensure Next.js has updated the location and DOM
      setTimeout(handleScroll, 50);
    };

    window.history.replaceState = function (state, unused, url) {
      originalReplaceState.apply(this, [state, unused, url]);
      setTimeout(handleScroll, 50);
    };

    return () => {
      clearTimeout(timer);
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("hashchange", handleScroll);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [pathname, isLifestyleExperienceRoute]);

  return children;
}
