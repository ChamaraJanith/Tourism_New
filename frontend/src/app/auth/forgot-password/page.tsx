"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Compass,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { sendPasswordResetEmail } from "@/lib/auth";

const SLIDES = [
  {
    src: "/images/loginform2.jpg",
    title: "Untamed Wilderness",
    subtitle: "Experience Sri Lanka's rich wildlife and majestic national parks."
  },
  {
    src: "/images/tourist_premium.png",
    title: "Bespoke Coastal Escapes",
    subtitle: "Bask in the golden sun along pristine, exclusive coastlines."
  },
  {
    src: "/images/lifestyle.jpeg",
    title: "Curated Luxury Living",
    subtitle: "Indulge in premium heritage stays and wellness sanctuaries."
  }
];

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // First attempt via local backend API endpoint
      const redirectTo = `${window.location.origin}/auth/reset-password`;
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        // Fallback to client side Supabase call directly
        await sendPasswordResetEmail(email, redirectTo);
      }

      setSubmitted(true);
      setMessage("A password reset link has been dispatched to your email address.");
    } catch (err: any) {
      // Direct client fallback attempt
      try {
        const redirectTo = `${window.location.origin}/auth/reset-password`;
        await sendPasswordResetEmail(email, redirectTo);
        setSubmitted(true);
        setMessage("A password reset link has been dispatched to your email address.");
      } catch (fallbackErr: any) {
        setError(fallbackErr?.message || err?.message || "Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#030712] overflow-y-auto lg:overflow-hidden">
      {/* Background decoration blur elements for mobile */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none lg:hidden" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#1e293b]/50 rounded-full blur-[120px] pointer-events-none lg:hidden" />

      {/* LEFT COLUMN: Premium Destination Image Carousel */}
      <div className="hidden lg:flex lg:w-1/2 relative h-full overflow-hidden bg-zinc-950 flex-col justify-between p-12 text-white z-10 shrink-0">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={SLIDES[currentSlide].src}
                alt={SLIDES[currentSlide].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Brand Header */}
        <div className="relative z-20 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-[#d4af37]/50 transition duration-300">
              <Compass className="h-6 w-6 text-[#d4af37]" />
            </div>
            <span className="font-display tracking-[0.2em] text-white text-lg font-bold uppercase transition duration-300 group-hover:text-[#d4af37]">
              International Hospitality Ventures (Private) Limited
            </span>
          </Link>
        </div>

        {/* Carousel Content overlay */}
        <div className="relative z-20 max-w-lg mt-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                Tourism & Heritage Escapes
              </p>
              <h2 className="text-4xl font-serif tracking-wide text-white leading-tight font-light">
                {SLIDES[currentSlide].title}
              </h2>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {SLIDES[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex gap-2 mt-8">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? "w-8 bg-[#d4af37]" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-20 text-xs text-zinc-400 font-light">
          © {new Date().getFullYear()} IHV. All rights reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: Password Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10 my-auto min-h-screen lg:min-h-full">
        <div className="w-full max-w-md space-y-8">
          {/* Top navigation back button */}
          <div className="flex items-center justify-between">
            <Link
              href="/auth"
              className="inline-flex items-center text-xs text-zinc-400 hover:text-[#d4af37] transition duration-200 group"
            >
              <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
              Back to Sign In
            </Link>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none" />

            {!submitted ? (
              <>
                <div className="space-y-2 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h1 className="text-2xl font-serif text-white tracking-wide">
                    Forgot Password?
                  </h1>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Don’t worry! Enter your registered email address below and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-3 mb-6"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-300 font-medium tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa892c] hover:from-[#e5bd44] hover:to-[#b89531] text-zinc-950 font-semibold text-sm tracking-wider uppercase transition duration-300 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-4 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-serif text-white tracking-wide">
                    Check Your Inbox
                  </h2>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light max-w-sm mx-auto">
                    We have sent a password reset link to <span className="text-[#d4af37] font-medium">{email}</span>. Please click the link inside to set up a new password.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400 leading-relaxed font-light">
                  Did not receive the email? Check your spam folder or{" "}
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-[#d4af37] hover:underline font-medium"
                  >
                    try another email
                  </button>.
                </div>

                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider transition duration-200"
                >
                  Return to Sign In
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
