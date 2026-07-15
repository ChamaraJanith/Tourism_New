"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { fireBookingConfetti, type BookingConfettiPalette } from "@/lib/booking-confetti";
import { cn } from "@/lib/utils";

type BookingCTAButtonProps = ComponentProps<typeof motion.button> & {
  confettiPalette?: BookingConfettiPalette;
};

export function BookingCTAButton({
  className,
  confettiPalette = "emerald",
  onClick,
  children,
  type = "button",
  ...props
}: BookingCTAButtonProps) {
  return (
    <motion.button
      type={type}
      data-booking-cta=""
      onClick={(e) => {
        fireBookingConfetti(confettiPalette);
        onClick?.(e);
      }}
      className={cn("booking-pill-btn cursor-pointer", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
