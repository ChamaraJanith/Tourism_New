"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { COMPANY_SOCIALS } from "@/data/company-socials";

export function FloatingWhatsApp() {
  const whatsappUrl = COMPANY_SOCIALS.whatsappLink || "https://wa.me/94771522718";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-xl bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block border border-white/10">
        Chat on WhatsApp
      </span>
    </a>
  );
}

