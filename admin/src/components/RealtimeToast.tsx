"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CalendarCheck, MapPin, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";

export function RealtimeToast() {
  const { activeToast, dismissToast, soundEnabled, setSoundEnabled } = useNotifications();
  const router = useRouter();

  if (!activeToast) return null;

  const handleView = () => {
    dismissToast();
    router.push("/reservations");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.92, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(4px)" }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed top-5 right-5 z-[9999] w-[380px] max-w-[calc(100vw-2.5rem)]"
      >
        <div className="relative overflow-hidden rounded-2xl bg-[#0c1220]/95 backdrop-blur-2xl border border-[#d4af37]/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.25)] p-5">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] animate-pulse" />

          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Bell className="w-4 h-4 animate-bounce" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0c1220] animate-ping" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    New Reservation
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    Live
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Just now received</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Mute notification sound" : "Enable notification sound"}
                className="p-1.5 text-slate-400 hover:text-[#d4af37] hover:bg-white/5 rounded-lg transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
              <button
                type="button"
                onClick={dismissToast}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3.5 space-y-2 mb-4">
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold text-white text-sm leading-snug">
                {activeToast.clientName}
              </div>
              {activeToast.country && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10 shrink-0">
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  {activeToast.country}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium">
              <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{activeToast.packageTitle}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleView}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3.5 bg-gradient-to-r from-[#d4af37] to-[#e6be44] text-black font-bold text-xs rounded-xl shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>View in Reservations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={dismissToast}
              className="py-2 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
