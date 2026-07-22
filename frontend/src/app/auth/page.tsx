"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store";
import { setCredentials } from "@/store/slices/authSlice";

const API_BASE = ""; // local frontend route or Vercel rewrite

export default function AuthPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      ? { name, email, password, agreedToTerms }
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
            },
            token: session.access_token,
          })
        );

        router.push("/profile");
        return;
      }

      setMessage(isSignup ? "Sign up successful. Please check your email." : "Login successful.");
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070b10] text-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white/5 border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-2">Luxury Tourism Auth</p>
          <h1 className="text-3xl font-bold md:text-4xl">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-3 text-sm text-zinc-300">Sign in or sign up to access your profile, bookings, and tailored travel experiences.</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[#0f1724]/70 p-4 mb-8">
          <button
            type="button"
            className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${!isSignup ? "border-[#d4af37] bg-[#d4af37]/15 text-white" : "border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"}`}
            onClick={() => {
              setIsSignup(false);
              setError("");
              setMessage("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${isSignup ? "border-[#d4af37] bg-[#d4af37]/15 text-white" : "border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"}`}
            onClick={() => {
              setIsSignup(true);
              setError("");
              setMessage("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <label className="block">
              <span className="text-sm font-medium text-zinc-300">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0d1118] px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                placeholder="Your full name"
              />
            </label>
          )}

          <label className="block">
            <span className="text-sm font-medium text-zinc-300">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0d1118] px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0d1118] px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
              placeholder="Enter your password"
            />
          </label>

          {isSignup && (
            <label className="block">
              <span className="text-sm font-medium text-zinc-300">Confirm password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0d1118] px-4 py-3 text-white outline-none transition focus:border-[#d4af37]"
                placeholder="Re-enter your password"
              />
            </label>
          )}

          {isSignup && (
            <label className="flex items-start gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0d1118] text-[#d4af37] focus:ring-[#d4af37]"
              />
              <span>I agree to the <a href="/terms" className="text-[#d4af37] hover:text-[#facc15]">Terms & Conditions</a> and <a href="/privacy" className="text-[#d4af37] hover:text-[#facc15]">Privacy Policy</a>.</span>
            </label>
          )}

          {error ? <p className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
          {message ? <p className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-[#d4af37] px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-[#f0c040] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
