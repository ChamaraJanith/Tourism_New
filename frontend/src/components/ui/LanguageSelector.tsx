"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", shortName: "EN" },
  { code: "de", name: "Deutsch", shortName: "DE" },
  { code: "it", name: "Italiano", shortName: "IT" },
  { code: "zh-CN", name: "中文", shortName: "ZH" },
  { code: "ja", name: "日本語", shortName: "JA" },
  { code: "fr", name: "Français", shortName: "FR" },
  { code: "ru", name: "Русский", shortName: "RU" },
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Determine initial language from googtrans cookie if it exists
    // The cookie format is usually '/auto/langCode' or '/en/langCode'
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]+)/);
    if (match) {
      const parts = match[1].split('/');
      const code = parts[parts.length - 1];
      const found = languages.find(l => l.code === code);
      if (found) {
        setCurrentLang(found);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);

    // Try to use the Google Translate dropdown if it's loaded in the DOM
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change"));
    } else {
      // Fallback: set the cookie and reload
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `googtrans=/en/${lang.code}; path=/`;
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `googtrans=/en/${lang.code}; domain=.${window.location.hostname}; path=/`;
      window.location.reload();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-[#d4af37] px-2 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
      >
        <Globe className="w-4 h-4 text-[#d4af37]" />
        <span className="hidden sm:inline-block w-[1.5rem] text-center">{currentLang.shortName}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-32 bg-[#111416]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] rounded-lg transition-colors flex items-center justify-between ${
                  currentLang.code === lang.code
                    ? "bg-[#d4af37]/20 text-[#d4af37]"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
