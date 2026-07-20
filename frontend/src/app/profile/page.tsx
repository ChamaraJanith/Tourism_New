"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { logOut, setCredentials } from "@/store/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Calendar, LogOut, Edit2, X, Check, 
  Camera, Upload, Compass as CompassIcon,
  MapPin, Heart, Clock, Search, Briefcase, Key, Star, ChevronRight, Bookmark
} from "lucide-react";
import Image from "next/image";

// Curated luxury traveler presets
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
];

// Bookings state (empty for now until backend is connected)
const BOOKINGS: any[] = [];

// Saved properties state (empty for now until backend is connected)
const SAVED: any[] = [];

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user, isAuthenticated, isInitialized, token } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<"bookings" | "saved" | "settings">("bookings");

  // Form states
  const [editName, setEditName] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState("");
  
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isInitialized, isAuthenticated, router]);

  // Sync form states with user details when edit mode is opened
  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditAvatarUrl(user.avatarUrl || "");
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/auth");
  };

  // Handle local file upload and convert to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.2 * 1024 * 1024) {
      setSaveError("Please choose an image smaller than 1.2MB for local upload.");
      return;
    }

    setSaveError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setEditAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle saving the updated profile data to backend
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setSaveError("Name cannot be empty.");
      return;
    }

    setSaveLoading(true);
    setSaveError("");
    setSaveSuccess(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    try {
      const res = await fetch(`${apiUrl}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editName,
          avatarUrl: editAvatarUrl
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      // Dispatch to store to update in real-time
      if (data.user) {
        dispatch(
          setCredentials({
            user: {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              profileId: data.user.profileId,
              avatarUrl: data.user.avatarUrl,
            },
            token: token || ""
          })
        );
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (err: any) {
      setSaveError(err.message || "Something went wrong saving your changes");
    } finally {
      setSaveLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <main className="min-h-screen bg-[#070b10] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <CompassIcon className="text-[#d4af37] w-12 h-12 animate-spin mb-4" />
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37] animate-pulse">
          Initializing Session...
        </span>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-[#070b10] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <CompassIcon className="text-[#d4af37] w-12 h-12 mb-4 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37] mb-2">
          Access Denied
        </span>
        <span className="text-zinc-400 text-sm font-light mb-6">
          Redirecting to authentication...
        </span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b10] text-white pt-24 pb-16 relative overflow-x-hidden">
      {/* Background Orbs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          {/* User Summary Card */}
          <div className="rounded-3xl border border-white/5 p-6 bg-white/[0.02] backdrop-blur-xl shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
             
             <div className="flex items-center gap-4 relative z-10">
               <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f0c040] p-[2px] shrink-0">
                 <div className="w-full h-full rounded-full bg-[#070b10] overflow-hidden">
                   {user.avatarUrl ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center">
                       <User size={24} className="text-[#d4af37]" />
                     </div>
                   )}
                 </div>
               </div>
               <div className="flex-1 min-w-0">
                 <h2 className="text-lg font-bold font-display text-white truncate">{user.name}</h2>
                 <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                 <div className="mt-1.5 flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                   <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">Verified Member</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-2xl transition-all ${activeTab === "bookings" ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20" : "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"}`}
            >
              <Briefcase size={20} />
              <span className="font-semibold text-sm">My Bookings</span>
            </button>
            <button 
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-2xl transition-all ${activeTab === "saved" ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20" : "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"}`}
            >
              <Heart size={20} />
              <span className="font-semibold text-sm">Saved Properties</span>
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-2xl transition-all ${activeTab === "settings" ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20" : "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"}`}
            >
              <User size={20} />
              <span className="font-semibold text-sm">Profile Settings</span>
            </button>
            
            <div className="h-px bg-white/10 my-2" />
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-2xl transition-all bg-transparent text-red-400 hover:bg-red-500/10 border border-transparent"
            >
              <LogOut size={20} />
              <span className="font-semibold text-sm">Log Out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            
            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="text-3xl font-bold font-display text-white mb-2">My Bookings</h1>
                  <p className="text-zinc-400 text-sm">Manage your upcoming trips and review past destinations.</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  {BOOKINGS.length > 0 ? (
                    BOOKINGS.map((booking) => (
                      <div key={booking.id} className="group flex flex-col sm:flex-row bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-[#d4af37]/30 transition-all hover:bg-white/[0.04]">
                        <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={booking.image} alt={booking.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${booking.status === "Upcoming" ? "text-emerald-400" : booking.status === "Completed" ? "text-zinc-300" : "text-red-400"}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-4 mb-2">
                              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{booking.id}</span>
                              <span className="text-lg font-bold text-[#d4af37]">{booking.price}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{booking.title}</h3>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-zinc-500" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User size={16} className="text-zinc-500" />
                                <span>{booking.guests} Guests</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex gap-3">
                            <button className="px-5 py-2.5 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#e5c048] transition-colors">
                              Manage Booking
                            </button>
                            <button className="px-5 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors">
                              View Receipt
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                        <Briefcase size={28} className="text-zinc-600" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">No upcoming bookings</h3>
                      <p className="text-zinc-400 text-sm max-w-sm">When you book a journey or destination, it will appear here so you can easily manage it.</p>
                      <button 
                        onClick={() => router.push("/journeys")}
                        className="mt-6 px-6 py-3 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#e5c048] transition-colors shadow-lg shadow-[#d4af37]/20"
                      >
                        Explore Journeys
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SAVED TAB */}
            {activeTab === "saved" && (
              <motion.div
                key="saved"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="text-3xl font-bold font-display text-white mb-2">Saved Properties</h1>
                  <p className="text-zinc-400 text-sm">Your wishlisted destinations and luxury retreats.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {SAVED.length > 0 ? (
                    SAVED.map((item) => (
                      <div key={item.id} className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-[#d4af37]/30 transition-all hover:bg-white/[0.04]">
                        <div className="relative h-56 w-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          <button className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-red-400 hover:bg-black/60 transition-colors border border-white/10">
                            <Heart size={20} fill="currentColor" />
                          </button>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
                              <MapPin size={14} />
                              {item.location}
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-white">
                              <Star size={14} className="text-[#d4af37]" fill="currentColor" />
                              {item.rating}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-4 line-clamp-1">{item.title}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-zinc-300">{item.price}</span>
                            <button className="text-xs font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#f0c040] transition-colors flex items-center gap-1">
                              Book Now <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                        <Heart size={28} className="text-zinc-600" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">No saved properties</h3>
                      <p className="text-zinc-400 text-sm max-w-sm">Properties and destinations you save by clicking the heart icon will be collected here.</p>
                      <button 
                        onClick={() => router.push("/")}
                        className="mt-6 px-6 py-3 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#e5c048] transition-colors shadow-lg shadow-[#d4af37]/20"
                      >
                        Discover Destinations
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="text-3xl font-bold font-display text-white mb-2">Profile Settings</h1>
                  <p className="text-zinc-400 text-sm">Update your personal information and preferences.</p>
                </div>
                
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 max-w-2xl relative overflow-hidden">
                  {/* Save Notifications */}
                  <AnimatePresence>
                    {saveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl py-3 px-4 flex items-center gap-2 text-xs font-semibold"
                      >
                        <Check size={16} /> Profile updated successfully!
                      </motion.div>
                    )}
                    {saveError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl py-3 px-4 flex items-center gap-2 text-xs font-semibold"
                      >
                        <X size={16} /> {saveError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name-input" className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                        Full Name
                      </label>
                      <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 focus-within:border-[#d4af37]/50 focus-within:bg-white/10 transition-all">
                        <User size={18} className="absolute left-4 text-zinc-500" />
                        <input
                          id="name-input"
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-transparent py-4 pl-12 pr-4 text-sm text-white placeholder-white/20 outline-none font-medium"
                          placeholder="Your Full Name"
                        />
                      </div>
                    </div>

                    {/* Email Input (Disabled/Read-only) */}
                    <div className="flex flex-col gap-2 opacity-60">
                      <label className="text-xs text-zinc-400 uppercase tracking-widest font-bold flex justify-between">
                        Email Address <span className="text-[10px] text-zinc-500">Cannot be changed</span>
                      </label>
                      <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 cursor-not-allowed">
                        <Mail size={18} className="absolute left-4 text-zinc-500" />
                        <input
                          type="email"
                          value={user.email}
                          readOnly
                          className="w-full bg-transparent py-4 pl-12 pr-4 text-sm text-white outline-none font-medium cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Avatar Selection */}
                    <div className="flex flex-col gap-4">
                      <label className="text-xs text-zinc-400 uppercase tracking-widest font-bold border-b border-white/10 pb-2">
                        Profile Picture
                      </label>
                      
                      <div className="flex flex-col sm:flex-row gap-8">
                        {/* Current Preview */}
                        <div className="shrink-0 flex flex-col items-center gap-3">
                          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                            {editAvatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={editAvatarUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <User size={32} className="text-zinc-600" />
                            )}
                          </div>
                          {editAvatarUrl && (
                            <button
                              type="button"
                              onClick={() => setEditAvatarUrl("")}
                              className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
                            >
                              Remove Image
                            </button>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col gap-5">
                          {/* Presets */}
                          <div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3 font-medium">Select Curated Preset</p>
                            <div className="flex items-center gap-4 flex-wrap">
                              {PRESET_AVATARS.map((url, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setEditAvatarUrl(url)}
                                  className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all shrink-0 hover:scale-105 active:scale-95 ${
                                    editAvatarUrl === url 
                                      ? "border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
                                      : "border-transparent opacity-50 hover:opacity-100"
                                  }`}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={url} alt={`Preset ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Local upload */}
                          <div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3 font-medium">Or Upload Custom Image</p>
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full sm:w-auto py-3 px-6 rounded-xl border border-dashed border-white/20 hover:border-[#d4af37]/50 text-xs text-zinc-300 hover:text-white transition-all bg-white/5 flex items-center justify-center gap-2 group"
                            >
                              <Upload size={16} className="text-zinc-500 group-hover:text-[#d4af37] transition-colors" />
                              Browse Files
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6 border-t border-white/10 mt-4">
                      <button
                        type="submit"
                        disabled={saveLoading}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center text-[#070b10] transition-all bg-[#d4af37] hover:bg-[#f0c040] hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {saveLoading ? "Saving Changes..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        
      </div>
    </main>
  );
}
