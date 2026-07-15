"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Compass } from "lucide-react";
import { useAppDispatch } from "@/hooks/store";
import { setCredentials } from "@/store/slices/authSlice";

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

/* ─── Google SVG ─── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

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

/* ─── Stagger container variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 320, damping: 28 } },
  exit:    { opacity: 0, y: -14, filter: "blur(4px)", transition: { duration: 0.18 } },
};

/* ─── Main page ─── */
export default function AuthPage() {
  const dispatch                          = useAppDispatch();
  const router                            = useRouter();
  const [isLogin, setIsLogin]             = useState(false);   // false = Sign-In | true = Sign-Up
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode") === "signup") {
        setIsLogin(true);
      }
    }
  }, []);
  const [showPassword, setShow]           = useState(false);
  const [showConfirm,  setShowConfirm]    = useState(false);
  const [name,            setName]        = useState("");
  const [email,           setEmail]       = useState("");
  const [password,        setPassword]    = useState("");
  const [confirmPassword, setConfirm]     = useState("");
  const [agreedToTerms,   setAgreed]      = useState(false);
  const [loading,         setLoading]     = useState(false);
  const [errorMsg,        setErrorMsg]    = useState("");
  const [successMsg,      setSuccessMsg]  = useState("");

  const toggle = () => {
    setIsLogin((v) => !v);
    setErrorMsg("");
    setSuccessMsg("");
    setConfirm("");
    setAgreed(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Sign-Up validations
    if (isLogin) {
      if (!name.trim())                        { setErrorMsg("Please enter your full name.");          return; }
      if (password !== confirmPassword)        { setErrorMsg("Passwords do not match.");               return; }
      if (password.length < 6)                 { setErrorMsg("Password must be at least 6 characters."); return; }
      if (!agreedToTerms)                      { setErrorMsg("Please accept the Terms & Conditions."); return; }
    }

    setLoading(true);
    const apiUrl   = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const endpoint = isLogin ? "/api/auth/signup" : "/api/auth/login";
    const payload  = isLogin
      ? { name, email, password, agreedToTerms }
      : { email, password };

    try {
      const res  = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");

      const session = data.data?.session;
      const user = data.data?.user;
      const profile = data.data?.profile;

      if (session && session.access_token) {
        localStorage.setItem("auth_token", session.access_token);
        dispatch(
          setCredentials({
            user: {
              id: user.id,
              email: user.email,
              name: profile?.full_name || user.user_metadata?.full_name || name || "",
              profileId: profile?.id,
              avatarUrl: user.user_metadata?.avatar_url || "",
            },
            token: session.access_token,
          })
        );
        setSuccessMsg(isLogin ? "Account created and logged in successfully!" : "Logged in successfully!");
        
        // Wait briefly for user to see the success message before redirecting
        setTimeout(() => {
          router.push("/profile");
        }, 1200);
      } else {
        // If email confirmation is required or session is not returned immediately
        setSuccessMsg(isLogin ? "Account created successfully! Check your email to confirm." : "Logged in successfully!");
        if (isLogin) {
          setName("");
          setEmail("");
          setPassword("");
          setConfirm("");
          setAgreed(false);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070b10]">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image src="/images/loginform2.jpg" alt="Luxury travel background" fill priority className="object-cover object-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b10]/80 via-[#0d1520]/60 to-[#070b10]/90" />
      </div>

      {/* ── Floating orbs ── */}
      <Orb size={500} color="radial-gradient(circle,#d4af37 0%,transparent 70%)" style={{ top:"-15%",left:"-10%" }} dur={9}/>
      <Orb size={400} color="radial-gradient(circle,#10b981 0%,transparent 70%)" style={{ bottom:"-10%",right:"-8%" }} dur={11}/>
      <Orb size={300} color="radial-gradient(circle,#6366f1 0%,transparent 70%)" style={{ top:"40%",right:"5%" }} dur={7}/>

      {/* ── Stars ── */}
      {STARS.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full bg-white pointer-events-none"
          style={{ width:s.width, height:s.height, top:s.top, left:s.left, opacity:s.opacity }}
          animate={{ opacity:[s.opacity*0.4, s.opacity, s.opacity*0.4] }}
          transition={{ duration:s.dur, repeat:Infinity, delay:s.delay }}
        />
      ))}

      {/* ══════════ CARD ══════════ */}
      <div className="relative z-10 w-full mx-4 sm:mx-auto sm:max-w-lg md:max-w-5xl mt-20 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-[620px]"
          style={{
            background: "rgba(10,16,28,0.72)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08),0 32px 80px rgba(0,0,0,0.6),0 0 120px rgba(212,175,55,0.06)",
          }}
        >

          {/* ══════════ DESKTOP: BOTH FORM COLUMNS (rendered always, hidden by overlay) ══════════ */}

          {/* --- Sign-In form (left slot on desktop) --- */}
          <div className="hidden md:flex md:w-7/12 relative items-center justify-center p-12 lg:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key="signin-desk"
                className="w-full max-w-sm"
                variants={containerVariants}
                initial="hidden"
                animate={!isLogin ? "visible" : "hidden"}
                exit="exit"
              >
                {/* heading */}
                <motion.div variants={itemVariants} className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/80 mb-1">Returning explorer?</p>
                  <h1 className="text-3xl font-bold font-display text-white tracking-tight">Welcome Back</h1>
                </motion.div>

                {/* Google SSO */}
                <motion.button variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl mb-5 text-sm font-semibold text-white/80 hover:text-white transition-all duration-300"
                  style={{ background:"rgba(255,255,255,0.07)", boxShadow:"0 0 0 1px rgba(255,255,255,0.10)" }}>
                  <GoogleIcon /> Continue with Google
                </motion.button>

                {/* divider */}
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-white/10"/><span className="text-xs text-white/30 font-medium">or</span><div className="flex-1 h-px bg-white/10"/>
                </motion.div>

                {/* fields */}
                <motion.div variants={itemVariants}>
                  <InputField id="si-email" icon={<Mail size={16}/>} type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
                </motion.div>
                <motion.div variants={itemVariants} className="mt-3">
                  <InputField id="si-pass" icon={<Lock size={16}/>} type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"
                    right={<button type="button" onClick={()=>setShow(!showPassword)} className="text-white/30 hover:text-white/70 transition-colors">{showPassword?<EyeOff size={16}/>:<Eye size={16}/>}</button>}/>
                </motion.div>
                <motion.div variants={itemVariants} className="pt-2 text-right">
                  <Link href="#" className="text-xs text-white/35 hover:text-amber-400 transition-colors">Forgot your password?</Link>
                </motion.div>

                {/* Messages */}
                {errorMsg && <div className="text-red-400 text-sm mt-3 text-center">{errorMsg}</div>}
                {successMsg && <div className="text-green-400 text-sm mt-3 text-center">{successMsg}</div>}

                {/* CTA */}
                <motion.button variants={itemVariants} type="button" onClick={() => handleSubmit()} disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(212,175,55,0.35)" }} whileTap={{ scale: 0.97 }}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest text-[#0d1520] disabled:opacity-50"
                  style={{ background:"linear-gradient(135deg,#d4af37 0%,#f0c040 50%,#d4af37 100%)" }}>
                  {loading ? "Signing In..." : "Sign In"}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Sign-Up form (right slot on desktop) --- */}
          <div className="hidden md:flex md:w-7/12 absolute inset-y-0 right-0 items-center justify-center p-12 lg:p-16" style={{ pointerEvents: isLogin ? "auto" : "none" }}>
            <AnimatePresence mode="wait">
              {isLogin && (
                <motion.div
                  key="signup-desk"
                  className="w-full max-w-sm"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/80 mb-1">New here?</p>
                    <h1 className="text-3xl font-bold font-display text-white tracking-tight">Create Account</h1>
                  </motion.div>

                  <motion.button variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl mb-5 text-sm font-semibold text-white/80 hover:text-white transition-all duration-300"
                    style={{ background:"rgba(255,255,255,0.07)", boxShadow:"0 0 0 1px rgba(255,255,255,0.10)" }}>
                    <GoogleIcon /> Continue with Google
                  </motion.button>

                  <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-white/10"/><span className="text-xs text-white/30 font-medium">or</span><div className="flex-1 h-px bg-white/10"/>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <InputField id="su-name" icon={<User size={16}/>} type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/>
                  </motion.div>
                  <motion.div variants={itemVariants} className="mt-3">
                    <InputField id="su-email" icon={<Mail size={16}/>} type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
                  </motion.div>
                  <motion.div variants={itemVariants} className="mt-3">
                    <InputField id="su-pass" icon={<Lock size={16}/>} type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"
                      right={<button type="button" onClick={()=>setShow(!showPassword)} className="text-white/30 hover:text-white/70 transition-colors">{showPassword?<EyeOff size={16}/>:<Eye size={16}/>}</button>}/>
                  </motion.div>
                  <motion.div variants={itemVariants} className="mt-3">
                    <InputField id="su-confirm" icon={<Lock size={16}/>} type={showConfirm?"text":"password"} placeholder="Re-enter Password" value={confirmPassword} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password"
                      right={<button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="text-white/30 hover:text-white/70 transition-colors">{showConfirm?<EyeOff size={16}/>:<Eye size={16}/>}</button>}/>
                  </motion.div>

                  {/* Terms & Conditions */}
                  <motion.label variants={itemVariants} className="flex items-start gap-3 mt-4 cursor-pointer group">
                    <div className="relative mt-0.5 shrink-0">
                      <input id="su-terms" type="checkbox" checked={agreedToTerms} onChange={e=>setAgreed(e.target.checked)} className="sr-only peer"/>
                      <div className="w-4 h-4 rounded border border-white/20 peer-checked:border-amber-400 peer-checked:bg-amber-400 transition-all duration-200 flex items-center justify-center"
                        style={{ background: agreedToTerms ? "linear-gradient(135deg,#d4af37,#f0c040)" : "rgba(255,255,255,0.05)" }}>
                        {agreedToTerms && <svg className="w-2.5 h-2.5 text-[#0d1520]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                    </div>
                    <span className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                      I agree to the{" "}
                      <Link href="/terms" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Terms & Conditions</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Privacy Policy</Link>
                    </span>
                  </motion.label>

                  {/* Messages */}
                  {errorMsg && <div className="text-red-400 text-sm mt-3 text-center">{errorMsg}</div>}
                  {successMsg && <div className="text-green-400 text-sm mt-3 text-center">{successMsg}</div>}

                  <motion.button variants={itemVariants} type="button" onClick={() => handleSubmit()} disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(212,175,55,0.35)" }} whileTap={{ scale: 0.97 }}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest text-[#0d1520] disabled:opacity-50"
                    style={{ background:"linear-gradient(135deg,#d4af37 0%,#f0c040 50%,#d4af37 100%)" }}>
                    {loading ? "Creating..." : "Create Account"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ══════════ DESKTOP: SLIDING ILLUSTRATION PANEL ══════════
              Starts on the RIGHT (5/12 width). On toggle it slides to the LEFT.
              Uses spring physics for a natural, premium feel.
          ════════════════════════════════════════════════════════ */}
          <motion.div
            className="hidden md:flex md:w-5/12 absolute inset-y-0 md:flex-col items-center justify-center p-10 overflow-hidden"
            animate={{ left: isLogin ? "0%" : "58.33%" }}  /* 7/12 = 58.33% */
            transition={{ type: "spring", stiffness: 60, damping: 18, mass: 1.1 }}
            style={{
              background: "linear-gradient(145deg,rgba(20,30,50,0.95) 0%,rgba(12,20,35,0.98) 100%)",
              boxShadow: isLogin
                ? "4px 0 40px rgba(0,0,0,0.5)"
                : "-4px 0 40px rgba(0,0,0,0.5)",
              zIndex: 20,
            }}
          >
            {/* panel inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-emerald-500/8 pointer-events-none"/>
            {/* gold divider line */}
            <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-amber-400/25 to-transparent"/>

            {/* panel content with 3D flip on switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "panel-signup" : "panel-signin"}
                initial={{ opacity: 0, rotateY: -90, scale: 0.85 }}
                animate={{ opacity: 1, rotateY: 0,   scale: 1 }}
                exit={{   opacity: 0, rotateY:  90,  scale: 0.85 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative z-10 flex flex-col items-center gap-5 text-center"
              >
                {/* brand */}
                <div className="flex items-center gap-2">
                  <Compass className="text-amber-400 w-5 h-5"/>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400/80">Aether Travel</span>
                </div>

                {/* GIF — white bg killed by mix-blend-mode:multiply */}
                <motion.div
                  className="relative w-48 h-48 rounded-[2rem] overflow-hidden"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "rgba(10,16,28,0.72)" }}
                >
                  <Image src="/videos/signup.gif" alt="Travel illustration"
                    fill sizes="192px" priority unoptimized className="object-contain"
                    style={{ mixBlendMode: "multiply" }}/>
                </motion.div>

                {/* heading */}
                <div>
                  <h2 className="text-2xl font-bold font-display text-white tracking-wide">
                    {isLogin ? "Hello, Friend!" : "Welcome Back!"}
                  </h2>
                  <p className="mt-1.5 text-sm text-white/40 leading-relaxed max-w-[190px]">
                    {isLogin
                      ? "Start your journey — create a free account today."
                      : "Sign in and continue your curated adventure."}
                  </p>
                </div>

                {/* toggle button */}
                <motion.button
                  onClick={toggle}
                  whileHover={{ scale: 1.06, boxShadow: "0 0 24px rgba(212,175,55,0.3)" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-9 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 transition-all duration-300"
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>


          {/* ══════════ MOBILE: single column ══════════ */}
          <div className="flex md:hidden flex-col justify-center px-6 py-10 sm:px-10 w-full">

            {/* brand + pill switcher */}
            <div className="mb-7 text-center">
              <div className="flex items-center justify-center gap-2 mb-5">
                <Compass className="text-amber-400 w-5 h-5"/>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400/80">Aether Travel</span>
              </div>
              <div className="inline-flex rounded-full p-1 mx-auto"
                style={{ background:"rgba(255,255,255,0.07)", boxShadow:"0 0 0 1px rgba(255,255,255,0.09)" }}>
                {(["Sign In","Sign Up"] as const).map((label, i) => {
                  const active = (i===0 && !isLogin)||(i===1 && isLogin);
                  return (
                    <button key={label} onClick={() => setIsLogin(i===1)}
                      className="relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: active ? "#0d1520" : "rgba(255,255,255,0.45)" }}>
                      {active && (
                        <motion.span layoutId="pill" className="absolute inset-0 rounded-full"
                          style={{ background:"linear-gradient(135deg,#d4af37,#f0c040)" }}
                          transition={{ type:"spring", stiffness:300, damping:30 }}/>
                      )}
                      <span className="relative z-10">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* mobile form — staggered */}
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "m-signup" : "m-signin"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
              >
                {/* Mobile Illustration */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center mb-5"
                >
                  <motion.div
                    className="relative w-32 h-32 rounded-[1.5rem] overflow-hidden"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "rgba(10,16,28,0.72)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Image src="/videos/signup.gif" alt="Travel illustration"
                      fill sizes="128px" priority unoptimized className="object-contain"
                      style={{ mixBlendMode: "multiply" }}/>
                  </motion.div>
                </motion.div>

                {/* heading */}
                <motion.div variants={itemVariants} className="mb-6 text-center">
                  <h1 className="text-2xl font-bold font-display text-white tracking-tight">
                    {isLogin ? "Create Account" : "Welcome Back"}
                  </h1>
                </motion.div>

                {/* Google */}
                <motion.button variants={itemVariants} whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl mb-5 text-sm font-semibold text-white/80 hover:text-white transition-all"
                  style={{ background:"rgba(255,255,255,0.07)", boxShadow:"0 0 0 1px rgba(255,255,255,0.10)" }}>
                  <GoogleIcon/> Continue with Google
                </motion.button>

                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-white/10"/><span className="text-xs text-white/30">or</span><div className="flex-1 h-px bg-white/10"/>
                </motion.div>

                {/* fields */}
                {isLogin && (
                  <motion.div variants={itemVariants} className="mb-3">
                    <InputField id="m-name" icon={<User size={16}/>} type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/>
                  </motion.div>
                )}
                <motion.div variants={itemVariants} className="mb-3">
                  <InputField id="m-email" icon={<Mail size={16}/>} type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
                </motion.div>
                <motion.div variants={itemVariants} className="mb-3">
                  <InputField id="m-pass" icon={<Lock size={16}/>} type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"
                    right={<button type="button" onClick={()=>setShow(!showPassword)} className="text-white/30 hover:text-white/70 transition-colors">{showPassword?<EyeOff size={16}/>:<Eye size={16}/>}</button>}/>
                </motion.div>

                {/* Confirm password + T&C only on Sign-Up */}
                {isLogin && (
                  <>
                    <motion.div variants={itemVariants} className="mb-3">
                      <InputField id="m-confirm" icon={<Lock size={16}/>} type={showConfirm?"text":"password"} placeholder="Re-enter Password" value={confirmPassword} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password"
                        right={<button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="text-white/30 hover:text-white/70 transition-colors">{showConfirm?<EyeOff size={16}/>:<Eye size={16}/>}</button>}/>
                    </motion.div>
                    <motion.label variants={itemVariants} className="flex items-start gap-3 mt-1 mb-1 cursor-pointer group">
                      <div className="relative mt-0.5 shrink-0">
                        <input id="m-terms" type="checkbox" checked={agreedToTerms} onChange={e=>setAgreed(e.target.checked)} className="sr-only"/>
                        <div className="w-4 h-4 rounded border border-white/20 transition-all duration-200 flex items-center justify-center"
                          style={{ background: agreedToTerms ? "linear-gradient(135deg,#d4af37,#f0c040)" : "rgba(255,255,255,0.05)", borderColor: agreedToTerms ? "#d4af37" : "rgba(255,255,255,0.2)" }}>
                          {agreedToTerms && <svg className="w-2.5 h-2.5 text-[#0d1520]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                        </div>
                      </div>
                      <span className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                        I agree to the{" "}
                        <Link href="/terms" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Terms & Conditions</Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">Privacy Policy</Link>
                      </span>
                    </motion.label>
                  </>
                )}

                {!isLogin && (
                  <motion.div variants={itemVariants} className="pt-2 text-right">
                    <Link href="#" className="text-xs text-white/35 hover:text-amber-400 transition-colors">Forgot your password?</Link>
                  </motion.div>
                )}


                {/* Messages */}
                {errorMsg && <div className="text-red-400 text-sm mt-3 text-center">{errorMsg}</div>}
                {successMsg && <div className="text-green-400 text-sm mt-3 text-center">{successMsg}</div>}

                <motion.button variants={itemVariants} type="submit" disabled={loading}
                  whileHover={{ scale:1.02, boxShadow:"0 8px 40px rgba(212,175,55,0.35)" }} whileTap={{ scale:0.97 }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest text-[#0d1520] disabled:opacity-50"
                  style={{ background:"linear-gradient(135deg,#d4af37 0%,#f0c040 50%,#d4af37 100%)" }}>
                  {loading ? (isLogin ? "Creating..." : "Signing In...") : (isLogin ? "Create Account" : "Sign In")}
                </motion.button>

                <motion.p variants={itemVariants} className="mt-5 text-center text-xs text-white/40">
                  {isLogin ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button onClick={toggle} type="button" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                    {isLogin ? "Sign In" : "Sign Up"}
                  </button>
                </motion.p>
              </motion.form>
            </AnimatePresence>
          </div>

        </motion.div>

        {/* bottom glow */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none"
          style={{ background:"radial-gradient(ellipse,rgba(212,175,55,0.18) 0%,transparent 70%)", filter:"blur(16px)" }}/>
      </div>
    </main>
  );
}
