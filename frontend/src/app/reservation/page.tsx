"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/store";
import { LogIn, ShieldAlert, Plus, X } from "lucide-react";
import Link from "next/link";

// Package data with 3-letter codes and rate info
const PACKAGES = [
  { id: 1,  label: "1. The Grand Sri Lanka Discovery"   },
  { id: 2,  label: "2. Luxury Escape Sri Lanka"          },
  { id: 3,  label: "3. Heritage & Cultural Discovery"    },
  { id: 4,  label: "4. Wildlife & Nature Adventure"      },
  { id: 5,  label: "5. Wellness & Ayurveda Retreat"      },
  { id: 6,  label: "6. Romance & Honeymoon Collection"   },
  { id: 7,  label: "7. Adventure Sri Lanka"              },
  { id: 8,  label: "8. Family Holiday Experience"        },
  { id: 9,  label: "9. Silver Horizons - Senior Living"  },
  { id: 10, label: "10. MICE & Corporate / Tailor-Made" },
];

// Source country to 3-letter code map
const COUNTRY_SOURCE: Record<string, string> = {
  "India":          "IND",
  "Germany":        "GER",
  "United Kingdom": "GBR",
  "Other":          "OTH",
};


export default function ReservationFormPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  const [nationality, setNationality] = useState("");
  const [disabilityAssistance, setDisabilityAssistance] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [travelerNames, setTravelerNames] = useState<string[]>([""]);

  const handleAddTraveler = () => setTravelerNames([...travelerNames, ""]);
  const handleRemoveTraveler = (index: number) => {
    if (travelerNames.length > 1) {
      setTravelerNames(travelerNames.filter((_, i) => i !== index));
    }
  };
  const handleTravelerChange = (index: number, value: string) => {
    const newNames = [...travelerNames];
    newNames[index] = value;
    setTravelerNames(newNames);
  };

  // Auth guard: redirect to login on submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/auth?redirect=/reservation");
      return;
    }
    // TODO: POST form data to backend — backend assigns primary key serial
    alert("Reservation submitted! Serial number will be assigned by the server.");
  };

  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const countryCode = COUNTRY_SOURCE[nationality] ?? "___";

  // Serial number is assigned by backend on submit — show pending here
  const fullSerial = `IHV-${countryCode}-????`;

  return (
    <main className="min-h-screen bg-[#030712] py-24 sm:py-32 overflow-hidden relative selection:bg-[#d4af37]/30">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1e293b]/30 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ─── HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-white/10"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-2">
              <span className="text-white">IHV </span>
              <span className="text-[#d4af37]">TRAVEL</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase">Reservation Form</h2>
          </div>

          {/* ─── SERIAL NO (live) ─── */}
          <div className="mt-6 md:mt-0">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 text-right">Serial No</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={fullSerial}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-1.5 font-mono"
              >
                {/* IHV */}
                <span className="text-sm font-bold px-2 py-1 rounded-md bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">IHV</span>
                <span className="text-zinc-600">-</span>
                {/* Country code */}
                <span className={`text-sm font-bold px-2 py-1 rounded-md ${
                  countryCode === "___" ? "bg-zinc-800 text-zinc-500 border border-zinc-700" : "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30"
                }`}>
                  {countryCode}
                </span>
                <span className="text-zinc-600">-</span>
                {/* Serial number — assigned by backend */}
                <span className="text-sm font-bold px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 tracking-widest">
                  AUTO
                </span>
              </motion.div>
            </AnimatePresence>
            <p className="text-[9px] text-zinc-600 mt-1.5 text-right tracking-wider">
              Number assigned by server on submission
            </p>
          </div>
        </motion.div>

        <form className="space-y-8" onSubmit={handleSubmit}>

          {/* ─── AUTH WARNING BANNER ─── */}
          <AnimatePresence>
            {isInitialized && !isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4"
              >
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300">Sign in required to submit</p>
                    <p className="text-xs text-amber-400/70 mt-0.5">You can fill the form, but you will be redirected to log in when you submit.</p>
                  </div>
                </div>
                <Link
                  href="/auth?redirect=/reservation"
                  className="shrink-0 flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In Now
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            <div className="bg-[#111c30] px-6 py-3 border-b border-[#d4af37]/30">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">1. Primary Contact Information</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Full Name / Primary Contact:</label>
                  <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Contact Number (Phone/WhatsApp):</label>
                  <input type="tel" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 outline-none transition" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Email Address:</label>
                  <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 outline-none transition" />
                </div>
              </div>

              {/* NATIONALITY — drives the country code in serial */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-gray-400">
                  Nationality: <span className="text-[#d4af37]/60 normal-case">(affects serial no.)</span>
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  {["India", "Germany", "United Kingdom"].map((nat) => (
                    <label key={nat} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="nationality"
                        value={nat}
                        checked={nationality === nat}
                        onChange={() => setNationality(nat)}
                        className="w-4 h-4 accent-[#d4af37]"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition">{nat}</span>
                      <span className="text-[10px] text-zinc-600 font-mono">({COUNTRY_SOURCE[nat]})</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="nationality"
                      value="Other"
                      checked={nationality === "Other"}
                      onChange={() => setNationality("Other")}
                      className="w-4 h-4 accent-[#d4af37]"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition">Other:</span>
                    <input
                      type="text"
                      disabled={nationality !== "Other"}
                      className="bg-black/30 border-b border-white/20 px-2 py-1 text-white text-sm focus:border-[#d4af37] outline-none disabled:opacity-30 transition w-32"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">NIC Number:</label>
                  <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Passport Number:</label>
                  <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Passport Validity Date:</label>
                  <input type="date" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Pax (Total Count):</label>
                  <input type="number" min="1" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Fax Number:</label>
                  <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Names of Travelers:</label>
                  <button
                    type="button"
                    onClick={handleAddTraveler}
                    className="flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-white transition bg-[#d4af37]/10 hover:bg-[#d4af37]/20 px-3 py-1.5 rounded-full"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Traveler
                  </button>
                </div>
                {travelerNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-[#d4af37] font-bold w-4 text-center">{index + 1}</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleTravelerChange(index, e.target.value)}
                      placeholder={`Traveler ${index + 1} Name`}
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition"
                    />
                    {travelerNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTraveler(index)}
                        className="text-gray-500 hover:text-red-400 transition p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── 2. GUARDIAN ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            <div className="bg-[#111c30] px-6 py-3 border-b border-[#d4af37]/30">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">2. Guardian Details (For Minors / Dependent Travelers)</h3>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Guardian Name", type: "text" },
                { label: "Relationship to Traveler", type: "text" },
                { label: "Guardian Contact Number", type: "tel" },
                { label: "Guardian NIC / Passport No", type: "text" },
              ].map(({ label, type }) => (
                <div key={label} className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">{label}:</label>
                  <input type={type} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── 3. SELECT PACKAGE — drives serial code ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            <div className="bg-[#111c30] px-6 py-3 border-b border-[#d4af37]/30">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">
                3. Select Package / Journey
                <span className="ml-2 text-zinc-500 normal-case font-normal">(drives serial no.)</span>
              </h3>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <label
                      key={pkg.id}
                      className={`flex items-start gap-3 cursor-pointer group p-3 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "border-[#d4af37]/60 bg-[#d4af37]/8"
                          : "border-white/5 hover:border-white/15 hover:bg-white/3"
                      }`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={pkg.id}
                        checked={isSelected}
                        onChange={() => setSelectedPackage(pkg.id)}
                        className="mt-1 w-4 h-4 accent-[#d4af37] shrink-0"
                      />
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className={`text-sm transition ${isSelected ? "text-white font-medium" : "text-gray-300 group-hover:text-white"}`}>
                          {pkg.label}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ─── LIVE SERIAL PREVIEW BANNER ─── */}
          <AnimatePresence>
            {selectedPackage && nationality && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className="text-xs text-[#d4af37]/60 uppercase tracking-widest mb-1">Assigned Serial Number</p>
                  <p className="font-mono text-2xl font-bold text-[#d4af37] tracking-widest">{fullSerial}</p>
                </div>
                <div className="text-right text-xs text-zinc-500 space-y-1">
                  <p><span className="text-zinc-400">Package:</span> {pkg?.label.split(". ")[1]}</p>
                  <p><span className="text-zinc-400">Origin:</span> {nationality} ({countryCode})</p>
                  <p><span className="text-zinc-400">Rate:</span> {pkg?.rate}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── 4. SPECIAL ASSISTANCE ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            <div className="bg-[#111c30] px-6 py-3 border-b border-[#d4af37]/30">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">4. Special Assistance & Preferences</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400">Any Special Diet Requirements:</label>
                <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-gray-400">Disability Assistance Required:</label>
                <div className="flex items-center gap-6">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="disability" value={v} onChange={() => setDisabilityAssistance(v)} className="w-4 h-4 accent-[#d4af37]" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition">{v}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400">Details:</label>
                <textarea rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition resize-none" />
              </div>
            </div>
          </motion.div>

          {/* ─── SUBMIT ─── */}
          <div className="pt-6 pb-12 flex flex-col items-center gap-3">
            {(!selectedPackage || !nationality) && (
              <p className="text-xs text-zinc-500 text-center">Please select a package and nationality to generate your serial number before submitting.</p>
            )}

            {/* Show login prompt on button when not authenticated */}
            {isInitialized && !isAuthenticated && (
              <p className="text-xs text-amber-400/70 text-center flex items-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                You will be asked to sign in before your reservation is submitted.
              </p>
            )}

            <button
              type="submit"
              disabled={!selectedPackage || !nationality}
              className="flex items-center gap-2.5 bg-gradient-to-r from-[#d4af37] to-[#f5d061] text-black font-bold uppercase tracking-widest py-4 px-12 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isInitialized && !isAuthenticated && <LogIn className="w-4 h-4" />}
              {isInitialized && !isAuthenticated ? "Sign In & Submit" : "Submit Reservation"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
