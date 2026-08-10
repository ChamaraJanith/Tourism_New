"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Compass,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Check,
  X,
  KeyRound
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { updateUserPassword } from "@/lib/auth";

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

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [checkingToken, setCheckingToken] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Check auth session or URL token on mount
  useEffect(() => {
    let unsubscriber: { unsubscribe: () => void } | null = null;

    const checkSession = async () => {
      try {
        // Listen to Supabase auth state change for recovery session
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "PASSWORD_RECOVERY" || session?.access_token) {
            if (session?.access_token) {
              setAccessToken(session.access_token);
            }
          }
        });
        unsubscriber = authListener.subscription;

        // Check hash fragments `#access_token=...` directly
        if (typeof window !== "undefined" && window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const tokenFromHash = hashParams.get("access_token");
          if (tokenFromHash) {
            setAccessToken(tokenFromHash);
          }
        }

        // Check active Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          setAccessToken(session.access_token);
        }
      } catch (err) {
        console.error("Error detecting recovery session:", err);
      } finally {
        setCheckingToken(false);
      }
    };

    checkSession();

    return () => {
      if (unsubscriber) unsubscriber.unsubscribe();
    };
  }, []);

  // Auto-redirect countdown on success
  useEffect(() => {
    if (!success) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/auth");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [success, router]);

  // Validation checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?~`]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  const doPasswordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Please ensure your new password meets all security requirements.");
      return;
    }

    if (!doPasswordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (accessToken) {
        // Attempt 1: Call API endpoint with token header
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ password }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to update password");
        }
      } else {
        // Fallback: Direct Supabase client update
        const { error: supabaseErr } = await supabase.auth.updateUser({
          password,
        });

        if (supabaseErr) throw supabaseErr;
      }

      setSuccess(true);
    } catch (err: any) {
      // Direct client fallback attempt if API failed
      try {
        const { error: supabaseErr } = await supabase.auth.updateUser({
          password,
        });
        if (supabaseErr) throw supabaseErr;
        setSuccess(true);
      } catch (fallbackErr: any) {
        setError(fallbackErr?.message || err?.message || "Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#030712] overflow-y-auto lg:overflow-hidden">
      {/* Background decoration blur elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none lg:hidden" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#1e293b]/50 rounded-full blur-[120px] pointer-events-none lg:hidden" />

      {/* LEFT COLUMN: Destination Carousel */}
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

        {/* Carousel Content */}
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

        <div className="relative z-20 text-xs text-zinc-400 font-light">
          © {new Date().getFullYear()} IHV. All rights reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10 my-auto min-h-screen lg:min-h-full">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-between">
            <Link
              href="/auth"
              className="inline-flex items-center text-xs text-zinc-400 hover:text-[#d4af37] transition duration-200 group"
            >
              <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
              Back to Sign In
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none" />

            {!success ? (
              <>
                <div className="space-y-2 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-4">
                    <KeyRound className="h-6 w-6" />
                  </div>
                  <h1 className="text-2xl font-serif text-white tracking-wide">
                    Set New Password
                  </h1>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Please create a strong, secure password for your IHV Tourism account.
                  </p>
                </div>

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
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-300 font-medium tracking-wide">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition duration-200"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Requirements */}
                  <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-2">
                    <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Password Requirements
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center gap-2 ${hasMinLength ? "text-emerald-400" : "text-zinc-500"}`}>
                        {hasMinLength ? <Check className="h-3.5 w-3.5 shrink-0" /> : <X className="h-3.5 w-3.5 shrink-0" />}
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center gap-2 ${hasUppercase ? "text-emerald-400" : "text-zinc-500"}`}>
                        {hasUppercase ? <Check className="h-3.5 w-3.5 shrink-0" /> : <X className="h-3.5 w-3.5 shrink-0" />}
                        <span>Uppercase letter</span>
                      </div>
                      <div className={`flex items-center gap-2 ${hasLowercase ? "text-emerald-400" : "text-zinc-500"}`}>
                        {hasLowercase ? <Check className="h-3.5 w-3.5 shrink-0" /> : <X className="h-3.5 w-3.5 shrink-0" />}
                        <span>Lowercase letter</span>
                      </div>
                      <div className={`flex items-center gap-2 ${hasNumber ? "text-emerald-400" : "text-zinc-500"}`}>
                        {hasNumber ? <Check className="h-3.5 w-3.5 shrink-0" /> : <X className="h-3.5 w-3.5 shrink-0" />}
                        <span>Number (0-9)</span>
                      </div>
                      <div className={`flex items-center gap-2 ${hasSpecialChar ? "text-emerald-400" : "text-zinc-500"}`}>
                        {hasSpecialChar ? <Check className="h-3.5 w-3.5 shrink-0" /> : <X className="h-3.5 w-3.5 shrink-0" />}
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-300 font-medium tracking-wide">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition duration-200"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && !doPasswordsMatch && (
                      <p className="text-[11px] text-red-400">Passwords do not match.</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !isPasswordValid || !doPasswordsMatch}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa892c] hover:from-[#e5bd44] hover:to-[#b89531] text-zinc-950 font-semibold text-sm tracking-wider uppercase transition duration-300 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <span>Update Password</span>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-6 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-serif text-white tracking-wide">
                    Password Reset Successful
                  </h2>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light max-w-sm mx-auto">
                    Your password has been updated successfully. You can now log in with your new credentials.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400">
                  Redirecting to Sign In page in <span className="text-[#d4af37] font-semibold">{countdown}</span> seconds...
                </div>

                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa892c] hover:from-[#e5bd44] hover:to-[#b89531] text-zinc-950 font-semibold text-xs uppercase tracking-wider transition duration-200"
                >
                  Proceed to Sign In Now
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
