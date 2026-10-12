"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface ReservationNotification {
  id: string;
  reservationId: string;
  clientName: string;
  packageTitle: string;
  country?: string;
  clientEmail?: string;
  clientPhone?: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationContextType {
  notifications: ReservationNotification[];
  unreadCount: number;
  activeToast: ReservationNotification | null;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  dismissToast: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  triggerTestNotification: () => void;
  isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

function playConciergeChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // Harmonic Chord Chime - Note 1: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Harmonic Chord Chime - Note 2: B5 (987.77 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(987.77, now + 0.12);
    gain2.gain.setValueAtTime(0.25, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.85);
  } catch (err) {
    console.warn("Could not play synthesized audio chime:", err);
  }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<ReservationNotification[]>([]);
  const [activeToast, setActiveToast] = useState<ReservationNotification | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Request browser desktop notification permission once if supported
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    }
  }, []);

  const showNotificationAlert = useCallback((item: ReservationNotification) => {
    if (soundEnabled) {
      playConciergeChime();
    }

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("New Reservation - IHV Admin", {
          body: `${item.clientName} booked ${item.packageTitle}`,
          icon: "/favicon.ico",
        });
      } catch (e) {
        // Ignored
      }
    }

    setActiveToast(item);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setActiveToast(null);
    }, 9000);
  }, [soundEnabled]);

  // Initial load of recent reservations to populate initial notification list
  useEffect(() => {
    async function initLoad() {
      try {
        const { data, error } = await supabase
          .from("itinerary_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(15);

        if (!error && data) {
          const ids = new Set<string>();
          const mapped: ReservationNotification[] = data.map((r) => {
            ids.add(r.id);
            return {
              id: `notif-${r.id}`,
              reservationId: r.id,
              clientName: r.client_name || "New Client",
              packageTitle: r.package_title || "Custom Package",
              country: r.client_country || "",
              clientEmail: r.client_email,
              clientPhone: r.client_phone,
              createdAt: r.created_at,
              isRead: true, // initial existing ones are considered read
            };
          });

          knownIdsRef.current = ids;
          setNotifications(mapped);
        }
      } catch (err) {
        console.warn("Initial reservations fetch error:", err);
      }
    }

    initLoad();
  }, []);

  // Set up Supabase Realtime Channel
  useEffect(() => {
    const channel = supabase
      .channel("realtime-admin-reservations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "itinerary_requests",
        },
        (payload: any) => {
          const newRow = payload.new;
          if (!newRow || !newRow.id) return;

          if (knownIdsRef.current.has(newRow.id)) return;
          knownIdsRef.current.add(newRow.id);

          const newNotif: ReservationNotification = {
            id: `notif-${newRow.id}`,
            reservationId: newRow.id,
            clientName: newRow.client_name || "New Client",
            packageTitle: newRow.package_title || "Custom Package",
            country: newRow.client_country || "",
            clientEmail: newRow.client_email,
            clientPhone: newRow.client_phone,
            createdAt: newRow.created_at || new Date().toISOString(),
            isRead: false,
          };

          setNotifications((prev) => [newNotif, ...prev]);
          showNotificationAlert(newNotif);
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    // Fallback smart poller every 12 seconds in case Postgres Realtime replication isn't enabled on table
    const interval = setInterval(async () => {
      try {
        const { data, error } = await supabase
          .from("itinerary_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (!error && data) {
          const freshArrivals: ReservationNotification[] = [];

          for (const r of data) {
            if (!knownIdsRef.current.has(r.id)) {
              knownIdsRef.current.add(r.id);
              const freshNotif: ReservationNotification = {
                id: `notif-${r.id}`,
                reservationId: r.id,
                clientName: r.client_name || "New Client",
                packageTitle: r.package_title || "Custom Package",
                country: r.client_country || "",
                clientEmail: r.client_email,
                clientPhone: r.client_phone,
                createdAt: r.created_at || new Date().toISOString(),
                isRead: false,
              };
              freshArrivals.push(freshNotif);
            }
          }

          if (freshArrivals.length > 0) {
            setNotifications((prev) => [...freshArrivals, ...prev]);
            showNotificationAlert(freshArrivals[0]);
          }
        }
      } catch (e) {
        // Silent error handling for poll
      }
    }, 12000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [showNotificationAlert]);

  const dismissToast = () => {
    setActiveToast(null);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const triggerTestNotification = () => {
    const testItem: ReservationNotification = {
      id: `test-${Date.now()}`,
      reservationId: `demo-${Date.now()}`,
      clientName: "Alexander Wright",
      packageTitle: "Wildlife & Nature Adventure (15 Days)",
      country: "United Kingdom",
      clientEmail: "alex.wright@example.com",
      clientPhone: "+44 7911 123456",
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setNotifications((prev) => [testItem, ...prev]);
    showNotificationAlert(testItem);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        activeToast,
        soundEnabled,
        setSoundEnabled,
        dismissToast,
        markAsRead,
        markAllAsRead,
        triggerTestNotification,
        isConnected,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
