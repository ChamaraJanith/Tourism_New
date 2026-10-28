"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWeixin } from "react-icons/fa6";
import { X, QrCode } from "lucide-react";
import Image from "next/image";

export function FloatingWeChat() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[9.5rem] right-6 z-40 group flex h-14 w-14 items-center justify-center rounded-full bg-[#07C160] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none"
        aria-label="Connect with WeChat"
      >
        <FaWeixin className="w-8 h-8 transition-transform group-hover:scale-105" />

        {/* Hover Tooltip (Desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-xl bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block border border-white/10">
          Connect with WeChat
        </span>
      </button>

      {/* QR Code Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="wechat-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              key="wechat-modal-content"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#141719] p-6 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#07C160]/15 text-[#07C160] border border-[#07C160]/30 shadow-sm">
                  <FaWeixin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-white leading-tight">
                    Connect on WeChat
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-light">
                    Direct Concierge Chat
                  </p>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-3.5 sm:p-4 shadow-inner">
                <div className="relative w-56 h-56 sm:w-60 sm:h-60 max-w-full aspect-square">
                  <Image
                    src="/images/wechat-qr-clean.png"
                    alt="WeChat QR Code"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>

              {/* Instructional Subtext */}
              <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-300">
                <QrCode size={16} className="text-[#07C160] shrink-0" />
                <span>Scan QR code to add as friend</span>
              </div>

              <div className="mt-1.5 text-center">
                <span className="text-[11px] text-gray-400 font-light">
                  Use WeChat app on mobile to scan and chat
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-5 w-full rounded-xl bg-[#07C160] py-2.5 text-xs font-bold text-white uppercase tracking-wider transition-colors hover:bg-[#06ad56] shadow-md shadow-[#07C160]/20"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
