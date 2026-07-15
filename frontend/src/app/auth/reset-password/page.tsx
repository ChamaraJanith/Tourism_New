"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Compass, AlertCircle, CheckCircle2 } from "lucide-react";

/* ─── Pre-generated star data (module-level so Math.random never runs in render) ─── */
const STARS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  width:   1.2 + (i * 0.37)  % 1.8,
  height:  1.2 + (i * 0.53)  % 1.8,
  top:    `${(i * 4.54321)   % 100}%`,
  left:   `${(i * 7.13579)   % 100}%`,
  opacity: 0.15 + (i * 0.03) % 0.45,
  dur:     3    + (i * 0.618) % 5,
  delay:   (i  * 0.414)       % 4,
}));

/* ─── Input with focus glow ─── */
function InputField({
  icon, type, placeholder, value, onChange, right, id, autoComplete,
}: {
  icon: React.ReactNode; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  right?: React.ReactNode; id: string; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="relative flex items-center rounded-2xl transition-all duration-300"
      style={{
        background: focused ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.055)",
        boxShadow: focused
          ? "0 0 0 1.5px rgba(212,175,55,0.55), 0 4px 24px rgba(0,0,0,0.18)"
          : "0 0 0 1px rgba(255,255,255,0.10)",
      }}
    >
      <span className="pl-4 pr-2 text-white/40 shrink-0">{icon}</span>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        className="flex-1 bg-transparent py-3.5 pr-4 text-sm text-white placeholder-white/30 outline-none font-medium"
      />
      {right && <span className="pr-4 shrink-0">{right}</span>}
    </div>
  );
}

/* ─── Floating orb ─── */
function Orb({ size, color, style, dur = 8 }: {
  size: number; color: string; style: React.CSSProperties; dur?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -24, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, filter: "blur(80px)", opacity: 0.55, ...style }}
    />
  );
}

/* ─── Password Strength Requirement Item ─── */
function RequirementItem({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs transition-colors duration-200">
      <span className={met ? "text-emerald-400" : "text-white/30"}>
        {met ? (
          <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        ) : (
          <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold">•</div>
        )}
      </span>
      <span className={met ? "text-emerald-400/90 font-medium" : "text-white/40"}>{label}</span>
    </div>
  );
}

/* ─── Stagger container variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 320, damping: 28 } },
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Token recovery from URL params/hash
  useEffect(() => {
    const parseToken = () => {
      // 1. Check in URL hash (standard Supabase redirect format)
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      let t = hashParams.get("access_token");

      // 2. Check in query parameters (fallback)
      if (!t) {
        const queryParams = new URLSearchParams(window.location.search);
        t = queryParams.get("access_token");
      }

      if (t) {
        setToken(t);
      }
      setTokenChecked(true);
    };

    parseToken();
  }, []);

  // Compute password validation rules dynamically
  const isMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?~`]/.test(password);
  const isMatching = password === confirmPassword && password.length > 0;
  
  const allRulesMet = isMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isMatching;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!token) {
      setErrorMsg("Missing reset session token. Please request another reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?~`]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMsg("Password does not meet all the complexity requirements.");
      return;
    }

    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      setSuccessMsg("Password updated successfully! Redirecting to login page...");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!tokenChecked) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center bg-[#070b10]">
        <span className="text-white/40 text-sm font-semibold tracking-widest uppercase">Initializing...</span>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070b10]">
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image 
          src="/images/loginform2.jpg" 
          alt="Luxury travel background" 
          fill 
          priority 
          className="object-cover object-center opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b10]/80 via-[#0d1520]/60 to-[#070b10]/90" />
      </div>

      {/* ── Floating orbs ── */}
      <Orb size={500} color="radial-gradient(circle,#d4af37 0%,transparent 70%)" style={{ top: "-15%", left: "-10%" }} dur={9} />
      <Orb size={400} color="radial-gradient(circle,#10b981 0%,transparent 70%)" style={{ bottom: "-10%", right: "-8%" }} dur={11} />
      <Orb size={300} color="radial-gradient(circle,#6366f1 0%,transparent 70%)" style={{ top: "40%", right: "5%" }} dur={7} />

      {/* ── Stars ── */}
      {STARS.map((s) => (
        <motion.div 
          key={s.id} 
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ width: s.width, height: s.height, top: s.top, left: s.left, opacity: s.opacity }}
          animate={{ opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.4] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        />
      ))}

      {/* ══════════ CARD ══════════ */}
      <div className="relative z-10 w-full mx-4 sm:mx-auto sm:max-w-md mt-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] p-8 sm:p-10 overflow-hidden"
          style={{
            background: "rgba(10,16,28,0.72)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.6), 0 0 120px rgba(212,175,55,0.06)",
          }}
        >
          {/* Card inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!token ? (
              /* ─── ERROR STATE: INVALID OR MISSING TOKEN ─── */
              <motion.div
                key="invalid-token"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center gap-5"
              >
                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
                  <Compass className="text-amber-400 w-6 h-6" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400/80">Aether Travel</span>
                </motion.div>

                <motion.div variants={itemVariants} className="text-red-400 flex justify-center mt-2">
                  <AlertCircle size={48} className="stroke-[1.5]" />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-2">
                  <h1 className="text-2xl font-bold font-display text-white tracking-tight">Session Invalid</h1>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed px-4">
                    Your password reset link is invalid, malformed, or has expired. Please request a new recovery link.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full mt-4">
                  <Link href="/auth" passHref className="w-full block">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(212,175,55,0.2)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 transition-all duration-300"
                    >
                      Back to Sign In
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              /* ─── FORM STATE: VALID RESET TOKEN PRESENT ─── */
              <motion.form
                key="reset-form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Compass className="text-amber-400 w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400/80">Aether Travel</span>
                  </div>
                  <h1 className="text-2xl font-bold font-display text-white tracking-tight">Create New Password</h1>
                  <p className="mt-2 text-xs text-white/50 px-2">Set your new password to regain access to your custom journeys.</p>
                </motion.div>

                {/* Form Fields */}
                <motion.div variants={itemVariants} className="mb-4">
                  <InputField
                    id="rp-pass"
                    icon={<Lock size={16} />}
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    right={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-white/30 hover:text-white/70 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                  <InputField
                    id="rp-confirm"
                    icon={<Lock size={16} />}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    right={
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="text-white/30 hover:text-white/70 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                </motion.div>

                {/* Password Strength Checklist */}
                <motion.div 
                  variants={itemVariants} 
                  className="mb-5 p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-2.5"
                >
                  <span className="text-white/45 text-[10px] font-bold uppercase tracking-wider mb-0.5">Password Requirements</span>
                  <RequirementItem met={isMinLength} label="At least 8 characters" />
                  <RequirementItem met={hasUppercase} label="At least one uppercase letter (capital)" />
                  <RequirementItem met={hasLowercase} label="At least one lowercase letter (simple)" />
                  <RequirementItem met={hasNumber} label="At least one number (digit)" />
                  <RequirementItem met={hasSpecialChar} label="At least one special character" />
                  <RequirementItem met={isMatching} label="Passwords must match" />
                </motion.div>

                {/* Error & Success Messages */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -8 }} 
                      className="text-red-400 text-xs text-center font-medium bg-red-500/10 border border-red-500/15 py-2.5 px-4 rounded-xl mb-4 flex items-center justify-center gap-2"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                  {successMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-emerald-400 text-xs text-center font-medium bg-emerald-500/10 border border-emerald-500/15 py-2.5 px-4 rounded-xl mb-4 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={14} className="shrink-0" />
                      <span>{successMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={loading || !allRulesMet}
                  whileHover={allRulesMet ? { scale: 1.02, boxShadow: "0 8px 40px rgba(212,175,55,0.35)" } : {}}
                  whileTap={allRulesMet ? { scale: 0.97 } : {}}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest text-[#0d1520] transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)",
                  }}
                >
                  {loading ? "Updating Password..." : "Update Password"}
                </motion.button>

                {/* Back to Login Link */}
                <motion.div variants={itemVariants} className="mt-5 text-center">
                  <Link href="/auth" className="text-xs text-white/35 hover:text-amber-400 font-semibold transition-colors">
                    Back to Sign In
                  </Link>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom glow */}
        <div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%)", 
            filter: "blur(16px)" 
          }}
        />
      </div>
    </main>
  );
}
