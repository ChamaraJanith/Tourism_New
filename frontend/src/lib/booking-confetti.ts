import confetti from "canvas-confetti";

export type BookingConfettiPalette = "emerald" | "amber" | "cyan" | "blue";

const PALETTES: Record<BookingConfettiPalette, string[]> = {
  emerald: ["#10b981", "#f59e0b", "#ffffff"],
  amber: ["#f59e0b", "#10b981", "#ffffff"],
  cyan: ["#22d3ee", "#f59e0b", "#ffffff"],
  blue: ["#3b82f6", "#22d3ee", "#ffffff"],
};

export function fireBookingConfetti(
  palette: BookingConfettiPalette = "emerald",
  options?: { particleCount?: number; spread?: number; originY?: number }
) {
  confetti({
    particleCount: options?.particleCount ?? 150,
    spread: options?.spread ?? 100,
    origin: { y: options?.originY ?? 0.7 },
    colors: PALETTES[palette],
  });
}
