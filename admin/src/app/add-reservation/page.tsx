"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { LogIn, ShieldAlert, Plus, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const [nationality, setNationality] = useState("");
  const [disabilityAssistance, setDisabilityAssistance] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [travelerNames, setTravelerNames] = useState<string[]>([""]);
  const [reservationCount, setReservationCount] = useState<number>(0);
  
  const [editId, setEditId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  React.useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        const { data: profileData } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", session.user.id)
          .single();
        if (profileData) setProfile(profileData);
      } else {
        setIsAuthenticated(false);
        router.replace("/login");
      }

      const { count } = await supabase
        .from('itinerary_requests')
        .select('*', { count: 'exact', head: true });
      if (count !== null) {
        setReservationCount(count + 1);
      } else {
        setReservationCount(1);
      }
    }
    
    init();
    async function fetchEditData(id: string) {
      setIsLoadingForm(true);
      const { data } = await supabase.from('itinerary_requests').select('*').eq('id', id).single();
      if (data) {
        setInitialData(data);
        setNationality(data.client_country);
        setDisabilityAssistance(data.client_notes?.match(/Disability: (.*)/)?.[1] || "No");
        const pkgMatch = PACKAGES.find(p => p.label === data.package_title);
        if (pkgMatch) setSelectedPackage(pkgMatch.id);
        const tMatch = data.client_notes?.match(/Travelers: (.*)/)?.[1];
        if (tMatch) setTravelerNames(tMatch.split(", "));
      }
      setIsLoadingForm(false);
    }

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('edit');
      if (id) {
        setEditId(id);
        fetchEditData(id);
      }
    }
  }, [router]);

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/login?redirect=/reservation");
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const pkg = PACKAGES.find((p) => p.id === selectedPackage);

    const data = {
      packageTitle: pkg?.label || "Custom Package",
      packageDuration: "",
      clientName: formData.get("fullName") as string || "",
      clientEmail: formData.get("email") as string || "",
      clientPhone: formData.get("contactNumber") as string || "",
      clientCountry: nationality,
      clientNic: formData.get("nic") as string || "",
      clientDob: formData.get("passportValidity") as string || "",
      clientNotes: `Passport: ${formData.get("passportNumber")}\nFax: ${formData.get("fax")}\nPax: ${formData.get("pax")}\nTravelers: ${travelerNames.join(", ")}\nDiet: ${formData.get("diet")}\nDisability: ${disabilityAssistance}\nDetails: ${formData.get("details")}`
    };

    try {
      // 1. Save to Supabase directly using the authenticated frontend session
      const { data: sessionData } = await supabase.auth.getSession();
      
      const dbData: any = {
        package_title: data.packageTitle,
        package_duration: data.packageDuration,
        client_name: data.clientName,
        client_email: data.clientEmail,
        client_phone: data.clientPhone,
        client_country: data.clientCountry,
        client_nic: data.clientNic,
        client_dob: data.clientDob,
        client_notes: data.clientNotes,
      };

      if (!editId) {
        dbData.serial_number = `IHV-${data.clientCountry === "India" ? "IND" : data.clientCountry === "Germany" ? "GER" : data.clientCountry === "United Kingdom" ? "GBR" : "OTH"}-${String(reservationCount).padStart(7, '0')}`;
      }
      
      dbData.client_notes = `[REP_NAME: ${profile?.full_name || "Unknown"}]\n${dbData.client_notes}`;

      if (editId) {
        const { error: dbError } = await supabase
          .from('itinerary_requests')
          .update(dbData)
          .eq('id', editId);
          
        if (dbError) throw new Error("Failed to update reservation: " + dbError.message);
        alert("Reservation updated successfully!");
      } else {
        const { error: dbError } = await supabase
          .from('itinerary_requests')
          .insert([dbData]);
          
        if (dbError) throw new Error("Failed to save reservation: " + dbError.message);
        alert("Reservation submitted successfully! Our team will get back to you soon.");
      }
      
      router.push("/reservations");
    } catch (err: any) {
      alert(err.message || "Error submitting reservation. Please try again.");
    }
  };

  const pkg = PACKAGES.find((p) => p.id === selectedPackage);
  const countryCode = COUNTRY_SOURCE[nationality] ?? "___";
  
  // Use existing serial if editing, else generate new
  const shortId = editId && initialData 
    ? (initialData.serial_number ? initialData.serial_number.split('-')[2] : initialData.id.substring(0,4).toUpperCase())
    : (reservationCount > 0 ? String(reservationCount).padStart(7, '0') : "AUTO");
    
  const fullSerial = editId && initialData && initialData.serial_number
    ? initialData.serial_number
    : `IHV-${countryCode}-${shortId}`;

  const getNoteField = (notes: string | undefined, key: string) => {
    if (!notes) return "";
    const regex = new RegExp(`${key}: (.*)`);
    const match = notes.match(regex);
    return match ? match[1] : "";
  };

  if (editId && isLoadingForm) {
    return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">Loading reservation...</div>;
  }

  return (
    <main className="min-h-screen bg-[#030712] py-24 sm:py-32 overflow-hidden relative selection:bg-[#d4af37]/30">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1e293b]/30 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* â”€â”€â”€ HEADER â”€â”€â”€ */}
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

          {/* â”€â”€â”€ SERIAL NO (live) â”€â”€â”€ */}
          <div className="mt-6 md:mt-0">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 text-right">Serial No</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={shortId}
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
                {/* Serial number â€” assigned on frontend mount */}
                <span className="text-sm font-bold px-2 py-1 rounded-md bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 tracking-widest">
                  {shortId}
                </span>
              </motion.div>
            </AnimatePresence>
            <p className="text-[9px] text-zinc-600 mt-1.5 text-right tracking-wider">
              Unique Reservation ID
            </p>
          </div>
        </motion.div>

        <form className="space-y-8" onSubmit={handleSubmit}>


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
                  <input type="text" name="fullName" required defaultValue={initialData?.client_name} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Contact Number (Phone/WhatsApp):</label>
                  <input type="tel" name="contactNumber" defaultValue={initialData?.client_phone} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 outline-none transition" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Email Address:</label>
                  <input type="email" name="email" required defaultValue={initialData?.client_email} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 outline-none transition" />
                </div>
              </div>

              {/* NATIONALITY â€” drives the country code in serial */}
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
                  <input type="text" name="nic" defaultValue={initialData?.client_nic} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Passport Number:</label>
                  <input type="text" name="passportNumber" defaultValue={getNoteField(initialData?.client_notes, "Passport")} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Passport Validity Date:</label>
                  <input type="date" name="passportValidity" defaultValue={initialData?.client_dob} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Pax (Total Count):</label>
                  <input type="number" name="pax" min="1" defaultValue={getNoteField(initialData?.client_notes, "Pax")} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Fax Number:</label>
                  <input type="text" name="fax" defaultValue={getNoteField(initialData?.client_notes, "Fax")} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
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

          {/* â”€â”€â”€ 2. GUARDIAN â”€â”€â”€ */}
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

          {/* â”€â”€â”€ 3. SELECT PACKAGE â€” drives serial code â”€â”€â”€ */}
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

          {/* â”€â”€â”€ LIVE SERIAL PREVIEW BANNER â”€â”€â”€ */}
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
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* â”€â”€â”€ 4. SPECIAL ASSISTANCE â”€â”€â”€ */}
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
                <input type="text" name="diet" className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition" />
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
                <textarea name="details" rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white focus:border-[#d4af37] outline-none transition resize-none" />
              </div>
            </div>
          </motion.div>

          {/* â”€â”€â”€ SUBMIT â”€â”€â”€ */}
          <div className="pt-6 pb-12 flex flex-col items-center gap-3">
            {(!selectedPackage || !nationality) && (
              <p className="text-xs text-zinc-500 text-center">Please select a package and nationality to generate your serial number before submitting.</p>
            )}



            <button
              type="submit"
              disabled={!selectedPackage || !nationality}
              className="flex items-center gap-2.5 bg-gradient-to-r from-[#d4af37] to-[#f5d061] text-black font-bold uppercase tracking-widest py-4 px-12 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              "Submit Reservation"
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
