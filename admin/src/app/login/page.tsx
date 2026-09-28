"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !data.session) {
      setError(authError?.message ?? "Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    // Successful login — navigate to dashboard
    window.location.href = "/";
  };


  return (
    <div className="min-h-screen w-full bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background blobs */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#d4af37]/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#d4af37]/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#0a0f1a]/90 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl shadow-black/50">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 mb-4">
              <span className="text-2xl font-extrabold text-[#d4af37] tracking-tight">IHV</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to access the dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#d4af37] transition-colors" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ihvtravel.com"
                  className="w-full bg-white/5 border border-white/8 text-slate-100 placeholder:text-slate-600 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#d4af37]/50 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#d4af37] transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-white/5 border border-white/8 text-slate-100 placeholder:text-slate-600 rounded-xl pl-10 pr-11 py-3 text-sm outline-none focus:border-[#d4af37]/50 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#e8c84a] disabled:opacity-60 disabled:cursor-not-allowed text-[#030712] font-semibold rounded-xl py-3 text-sm transition-all duration-200 mt-2 shadow-lg shadow-[#d4af37]/20"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[#030712]/30 border-t-[#030712] rounded-full"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-600 text-xs mt-6">
            IHV Travel &mdash; Admin Access Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
