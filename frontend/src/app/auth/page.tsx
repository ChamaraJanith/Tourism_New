"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store";
import { setCredentials } from "@/store/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Check,
  Loader2,
  Compass,
  ChevronLeft,
  AlertCircle,
  Globe,
  Phone,
  Calendar,
  CreditCard
} from "lucide-react";
import Link from "next/link";

const API_BASE = ""; // local frontend route or Vercel rewrite

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

const COUNTRY_CODES: Record<string, string> = {
  "Sri Lanka": "+94",
  "United Kingdom": "+44",
  "United States": "+1",
  "Australia": "+61",
  "Germany": "+49",
  "France": "+33",
  "India": "+91",
  "Canada": "+1",
  "Japan": "+81",
  "Maldives": "+960",
  "Singapore": "+65",
  "United Arab Emirates": "+971",
  "Switzerland": "+41"
};

const COUNTRIES = Object.keys(COUNTRY_CODES);

export default function AuthPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nic, setNic] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode") === "signup") {
        setIsSignup(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (isSignup) {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (!nic.trim()) {
        setError("Please enter your National Identity Card (NIC) / Passport number.");
        return;
      }
      if (!country) {
        setError("Please select your country of residence.");
        return;
      }
      if (!dob) {
        setError("Please select your date of birth.");
        return;
      }
      if (!contactNumber.trim()) {
        setError("Please enter your contact number.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!agreedToTerms) {
        setError("Please agree to the Terms & Conditions.");
        return;
      }
    }

    setLoading(true);

    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
    const body = isSignup
      ? { name, email, password, agreedToTerms, nic, country, dob, contactNumber }
      : { email, password };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to authenticate");
      }

      const session = data.data?.session;
      const user = data.data?.user;
      const profile = data.data?.profile;

      if (session?.access_token) {
        localStorage.setItem("auth_token", session.access_token);
        dispatch(
          setCredentials({
            user: {
              id: user?.id || "",
              email: user?.email || email,
              name: profile?.full_name || user?.user_metadata?.full_name || name || "",
              profileId: profile?.id,
              avatarUrl: user?.user_metadata?.avatar_url || "",
              nic: profile?.nic || user?.user_metadata?.nic || nic || "",
              country: profile?.country || user?.user_metadata?.country || country || "",
              dob: profile?.dob || user?.user_metadata?.dob || dob || "",
              contactNumber: profile?.contact_number || user?.user_metadata?.contact_number || contactNumber || "",
            },
            token: session.access_token,
          })
        );

        router.push("/profile");
        return;
      }

      setMessage(isSignup ? "Sign up successful. Please check your email to verify." : "Login successful.");
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
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
        {/* Animated Background Slide */}
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
                Curated Travel Experiences
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-white">
                {SLIDES[currentSlide].title}
              </h2>
              <p className="text-zinc-300 text-base leading-relaxed">
                {SLIDES[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Slide Indicators */}
          <div className="flex gap-2 mt-8">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                style={{ width: currentSlide === index ? "2.5rem" : "0.75rem" }}
              >
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${currentSlide === index ? "bg-[#d4af37]" : "bg-white/30"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer info inside image panel */}
        <div className="relative z-20 flex justify-between text-xs text-zinc-400 mt-12 border-t border-white/10 pt-6">
          <span>&copy; {new Date().getFullYear()} International Hospitality Ventures (Private) Limited.</span>
          <span className="flex gap-4">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Glassmorphic Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col z-20 relative bg-[#030712]/50 lg:bg-transparent lg:h-full lg:overflow-y-auto">
        {/* Mobile Background Image (Blurred) */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <img
            src={SLIDES[0].src}
            alt="Mobile background"
            className="w-full h-full object-cover opacity-20 filter blur-sm"
          />
          <div className="absolute inset-0 bg-[#030712]/80" />
        </div>

        {/* Centering wrapper */}
        <div className="w-full max-w-md mx-auto flex flex-col justify-start p-6 md:p-12 xl:p-16 space-y-8 relative z-10 py-12 lg:py-20 min-h-full">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden flex-col items-center text-center space-y-2 mb-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Compass className="h-7 w-7 text-[#d4af37]" />
              <span className="font-display tracking-[0.2em] text-white text-xl font-bold uppercase">
                International Hospitality Ventures (Private) Limited
              </span>
            </Link>
            <p className="text-xs uppercase tracking-widest text-[#d4af37]/80">Luxury Sri Lankan Journeys</p>
          </div>

          {/* Title Header */}
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white font-display">
              {isSignup ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-zinc-400 text-sm">
              {isSignup
                ? "Begin your journey to bespoke experiences."
                : "Sign in to access your luxury itineraries and travel profile."}
            </p>
          </div>

          {/* Elegant Mode Swapping Tabs */}
          <div className="relative flex p-1 rounded-xl bg-zinc-900/60 border border-white/5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                setIsSignup(false);
                setError("");
                setMessage("");
              }}
              className={`relative flex-1 py-2.5 text-sm font-medium transition duration-300 rounded-lg focus:outline-none z-10 ${!isSignup ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
                }`}
            >
              {!isSignup && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#d4af37] rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-20">Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignup(true);
                setError("");
                setMessage("");
              }}
              className={`relative flex-1 py-2.5 text-sm font-medium transition duration-300 rounded-lg focus:outline-none z-10 ${isSignup ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
                }`}
            >
              {isSignup && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#d4af37] rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-20">Sign Up</span>
            </button>
          </div>

          {/* Form Content container */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {/* Signup Fields Block */}
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden pr-1"
                >
                  {/* Full Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={isSignup}
                        className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                        placeholder="Lord Byron"
                      />
                    </div>
                  </div>

                  {/* NIC / Passport field */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      NIC / Passport Number
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        required={isSignup}
                        className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                        placeholder="199208143210 or N1234567"
                      />
                    </div>
                  </div>

                  {/* Country of Residence Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Country of Residence
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                        <Globe className="h-4 w-4" />
                      </div>
                      <select
                        value={country}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCountry(val);
                          const code = COUNTRY_CODES[val];
                          if (code) {
                            if (!contactNumber || contactNumber.startsWith("+")) {
                              setContactNumber(code + " ");
                            }
                          }
                        }}
                        required={isSignup}
                        className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm appearance-none"
                      >
                        <option value="" className="bg-[#0f172a] text-zinc-500">Select your country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-[#0f172a] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-500">
                        <ChevronLeft className="h-4 w-4 -rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Date of Birth field */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Date of Birth
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        onClick={(e) => {
                          try {
                            e.currentTarget.showPicker();
                          } catch (err) { }
                        }}
                        required={isSignup}
                        className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Contact Number field */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      Contact Number
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required={isSignup}
                        className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                  placeholder="byron@ihvtravel.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Password
                </label>
                {!isSignup && (
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-zinc-400 hover:text-[#d4af37] transition duration-200"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white transition duration-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup Only) */}
            <AnimatePresence mode="popLayout">
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <label className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition duration-200">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={isSignup}
                      className="w-full bg-zinc-950/50 hover:bg-zinc-950/70 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/35 text-sm"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white transition duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Terms and Conditions (Signup Only) */}
            <AnimatePresence mode="popLayout">
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pt-1 overflow-hidden"
                >
                  <label className="flex items-start gap-3 text-xs text-zinc-400 cursor-pointer select-none">
                    <div className="relative flex items-center mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all duration-200 ${agreedToTerms
                        ? "border-[#d4af37] bg-[#d4af37]/15"
                        : "border-white/20 bg-zinc-950/50"
                        }`}>
                        <Check className={`h-3.5 w-3.5 text-[#d4af37] transition duration-200 ${agreedToTerms ? "opacity-100 scale-100" : "opacity-0 scale-75"
                          }`} />
                      </div>
                    </div>
                    <span>
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#d4af37] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#d4af37] hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message Box */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/25 text-red-200 text-xs rounded-xl"
                >
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message Box */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-2.5 p-3.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-200 text-xs rounded-xl"
                >
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p>{message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden group rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f5d061] py-3.5 px-4 text-sm font-bold uppercase tracking-wider text-black transition shadow-lg shadow-[#d4af37]/15 hover:shadow-[#d4af37]/25 hover:from-[#f5d061] hover:to-[#d4af37] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{isSignup ? "Create Account" : "Sign In"}</span>
                )}
              </span>
            </button>
          </form>

          {/* Mobile Back / Back-to-Home footer link */}
          <div className="flex justify-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-[#d4af37] transition duration-200"
            >
              <ChevronLeft className="h-3 w-3" />
              <span>Back to home page</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
