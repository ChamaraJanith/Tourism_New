"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Bell, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCheck, 
  MapPin, 
  CalendarCheck, 
  ArrowRight,
  Radio
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";

export function AdminHeader() {
  const { 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    markAsRead, 
    triggerTestNotification,
    soundEnabled,
    setSoundEnabled,
    isConnected
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    setIsOpen(false);
    router.push("/reservations");
  };

  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between shrink-0 z-30">
      {/* Left: Real-time status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">Real-time Sync Active</span>
          <span className="sm:hidden">Live</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Test Alert Button for Admin */}
        <button
          type="button"
          onClick={triggerTestNotification}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-[#d4af37]/15 hover:text-[#d4af37] text-slate-300 border border-white/10 hover:border-[#d4af37]/40 transition-all"
          title="Trigger a test reservation notification to check chime sound and popup"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="hidden md:inline">Test Alert</span>
        </button>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-xl border transition-all ${
            soundEnabled 
              ? "text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/30 hover:bg-[#d4af37]/20" 
              : "text-slate-500 bg-white/5 border-white/10 hover:text-slate-300"
          }`}
          title={soundEnabled ? "Notification sound is ON" : "Notification sound is MUTED"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-2.5 rounded-xl border transition-all ${
              unreadCount > 0
                ? "bg-[#d4af37]/10 border-[#d4af37]/40 text-[#d4af37] shadow-sm shadow-[#d4af37]/20"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
            }`}
            title="Notifications"
          >
            <Bell className={`w-4 h-4 ${unreadCount > 0 ? "animate-swing" : ""}`} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center px-1 rounded-full bg-[#d4af37] text-black text-[10px] font-extrabold shadow-md shadow-black/50 animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0f172a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Reservations Alerts</h3>
                  <p className="text-[11px] text-slate-400">
                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All notifications read"}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-[11px] text-[#d4af37] hover:underline font-medium"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No reservations recorded yet.
                  </div>
                ) : (
                  notifications.slice(0, 8).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif.id)}
                      className={`p-4 transition-colors cursor-pointer flex items-start gap-3 hover:bg-white/[0.04] ${
                        !notif.isRead ? "bg-[#d4af37]/[0.06]" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        !notif.isRead 
                          ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40" 
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}>
                        <CalendarCheck className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-xs font-semibold truncate ${!notif.isRead ? "text-white" : "text-slate-300"}`}>
                            {notif.clientName}
                          </span>
                          {!notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0" />
                          )}
                        </div>

                        <p className="text-[11px] text-[#d4af37] truncate font-medium mb-1">
                          {notif.packageTitle}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          {notif.country && (
                            <span className="flex items-center gap-0.5">
                              <MapPin className="w-2.5 h-2.5" />
                              {notif.country}
                            </span>
                          )}
                          <span>•</span>
                          <span>{notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-white/[0.02] border-t border-white/10 text-center">
                <Link
                  href="/reservations"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-[#f3e5ab] font-bold"
                >
                  <span>Go to all Reservations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
