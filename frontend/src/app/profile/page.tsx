"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { logOut, setCredentials } from "@/store/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Calendar, LogOut, Edit2, X, Check, 
  Camera, Upload, Compass as CompassIcon
} from "lucide-react";

// Curated luxury traveler presets
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", // Elegant Traveler
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", // Rugged Explorer
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", // Nature Guide
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", // Adventure Cyclist
];

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user, isAuthenticated, isInitialized, token } = useAppSelector((state) => state.auth);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
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
  }, [user, isEditing]);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/auth");
  };

  // Handle local file upload and convert to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (< 1.2MB)
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
        setIsEditing(false);
        setSaveSuccess(false);
      }, 1200);

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
    <main className="min-h-screen bg-[#070b10] text-white py-12 pt-28 md:pt-36 pb-16 px-6 md:px-16 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Orbs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="edit-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-[#d4af37]/20 p-8 flex flex-col justify-start relative overflow-hidden"
              style={{
                background: "rgba(10, 16, 28, 0.72)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 80px rgba(212,175,55,0.04)",
              }}
            >
              {/* Save Notifications */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-6 left-8 right-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl py-3 px-4 flex items-center gap-2 z-20 text-xs font-semibold"
                  >
                    <Check size={16} /> Profile updated successfully!
                  </motion.div>
                )}
                {saveError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-6 left-8 right-8 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl py-3 px-4 flex items-center gap-2 z-20 text-xs font-semibold"
                  >
                    <X size={16} /> {saveError}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Edit2 className="text-[#d4af37] w-4.5 h-4.5" />
                  Edit Profile
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name-input" className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                    Full Name
                  </label>
                  <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 focus-within:border-[#d4af37]/50 focus-within:bg-white/10 transition-all">
                    <User size={16} className="absolute left-4 text-zinc-500" />
                    <input
                      id="name-input"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-transparent py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none font-medium"
                      placeholder="Your Full Name"
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                    Profile Picture
                  </label>
                  
                  <div className="flex flex-col gap-4">
                    {/* Presets */}
                    <div>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-2 font-medium">Select Curated Preset</p>
                      <div className="flex items-center gap-3">
                        {PRESET_AVATARS.map((url, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setEditAvatarUrl(url)}
                            className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all shrink-0 hover:scale-105 active:scale-95 ${
                              editAvatarUrl === url 
                                ? "border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.4)]" 
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`Preset ${index + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Local upload */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-medium">Upload Image File</span>
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
                        className="w-full py-3 px-4 rounded-xl border border-dashed border-white/10 hover:border-[#d4af37]/30 text-xs text-zinc-400 hover:text-white transition-all bg-white/5 flex items-center justify-center gap-2 group"
                      >
                        <Upload size={14} className="text-zinc-500 group-hover:text-[#d4af37] transition-colors" />
                        Choose Image
                      </button>
                    </div>

                    {/* Preview info */}
                    {editAvatarUrl && (
                      <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={editAvatarUrl} alt="Avatar preview" className="w-9 h-9 rounded-full object-cover border border-white/10" />
                        <div className="overflow-hidden">
                          <p className="text-[8px] text-zinc-500 uppercase tracking-widest">Selected Image</p>
                          <p className="text-[11px] text-[#d4af37] font-medium truncate">
                            {editAvatarUrl.startsWith("data:") 
                              ? "Uploaded Custom Image" 
                              : "Travel Preset Avatar"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditAvatarUrl("")}
                          className="ml-auto text-zinc-500 hover:text-red-400 p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 border-t border-white/5 pt-6 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-1/2 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-center text-white border border-white/10 hover:border-white/20 transition-all bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="w-1/2 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-center text-[#070b10] transition-all bg-[#d4af37] hover:bg-[#f0c040] hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saveLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="profile-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/5 p-8 flex flex-col items-center text-center relative overflow-hidden"
              style={{
                background: "rgba(10, 16, 28, 0.45)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/5 pointer-events-none" />

              {/* Avatar Circle */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f0c040] p-1 shadow-[0_0_20px_rgba(212,175,55,0.25)] mb-6 group">
                <div className="w-full h-full rounded-full bg-[#070b10] flex items-center justify-center overflow-hidden relative">
                  {user.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={36} className="text-[#d4af37]" />
                  )}
                  
                  <div 
                    onClick={() => setIsEditing(true)}
                    className="absolute inset-0 bg-[#070b10]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Camera size={16} className="text-[#d4af37] mb-0.5" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#d4af37]">Update</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold font-display tracking-tight text-white mb-6">
                {user.name}
              </h2>

              <div className="w-full flex flex-col gap-4 border-t border-white/5 pt-6 text-left">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-zinc-500 shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none mb-1">Email Address</p>
                    <p className="text-sm text-zinc-300 truncate font-light">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-zinc-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none mb-1">Status</p>
                    <p className="text-sm text-emerald-400 font-light flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Authenticated
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-1/2 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-center text-[#070b10] bg-[#d4af37] hover:bg-[#f0c040] hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)] transition-all"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-1/2 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-center text-white border border-white/10 hover:border-red-500/50 hover:text-red-400 transition-all bg-white/5 hover:bg-red-500/5"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
