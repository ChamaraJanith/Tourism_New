"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Compass } from "lucide-react";
import { useAppDispatch } from "@/hooks/store";
import { setCredentials } from "@/store/slices/authSlice";

/* ─── Pre-generated star data ─── */
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

/* ─── Input with focus outline ─── */
function InputField({
  icon, type, placeholder, value, onChange, right, id, autoComplete,
}: {
  icon: React.ReactNode; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  right?: React.ReactNode; id: string; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative flex items-center rounded-2xl transition-all duration-300 backdrop-blur-md"
      style={{
        background: focused ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        boxShadow: focused
          ? "0 0 0 1.5px rgba(212,175,55,0.5), 0 4px 20px rgba(0,0,0,0.2)"
          : "0 0 0 1px rgba(255,255,255,0.1)",
      }}>
      <span className="pl-4 pr-2 text-white/40 shrink-0">{icon}</span>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        className="flex-1 bg-transparent py-4 pr-4 text-sm text-white placeholder-white/30 outline-none font-medium"
      />
      {right && <span className="pr-4 shrink-0">{right}</span>}
    </div>
  );
}

/* ─── Floating orb ─── */
function Orb({ size, color, style, dur = 8 }: { size: number; color: string; style: React.CSSProperties; dur?: number; }) {
  return (
    <motion.div animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }} transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
      className="absolute rounded-full pointer-events-none opacity-40 mix-blend-screen"
      style={{ width: size, height: size, background: color, filter: "blur(90px)", ...style }} />
  );
}

/* ─── Stagger container variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

/* ─── Main page ─── */
export default function AuthPage() {
  const dispatch                          = useAppDispatch();
  const router                            = useRouter();
  const [isLogin, setIsLogin]             = useState(false);

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

    if (isLogin) {
      if (!name.trim())                        { setErrorMsg("Please enter your full name.");          return; }
      if (password !== confirmPassword)        { setErrorMsg("Passwords do not match.");               return; }
      if (password.length < 6)                 { setErrorMsg("Password must be at least 6 characters."); return; }
      if (!agreedToTerms)                      { setErrorMsg("Please accept the Terms & Conditions."); return; }
    }

    setLoading(true);
    const apiUrl   = "";
    const endpoint = isLogin ? "/api/auth/signup" : "/api/auth/login";
    const payload  = isLogin ? { name, email, password, agreedToTerms } : { email, password };

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
        setTimeout(() => { router.push("/profile"); }, 1200);
      } else {
        setSuccessMsg(isLogin ? "Account created successfully! Check your email to confirm." : "Logged in successfully!");
        if (isLogin) { setName(""); setEmail(""); setPassword(""); setConfirm(""); setAgreed(false); }
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen relative flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#070b10]">
      {/* Background image & overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop" alt="Mountain landscape background" fill priority className="object-cover object-center opacity-40 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b10]/90 via-[#070b10]/70 to-[#070b10]/95" />
      </div>

      {/* Floating orbs */}
      <Orb size={450} color="radial-gradient(circle,#d4af37 0%,transparent 70%)" style={{ top:"-10%",left:"-5%" }} dur={10}/>
      <Orb size={450} color="radial-gradient(circle,#10b981 0%,transparent 70%)" style={{ bottom:"-10%",right:"-5%" }} dur={12}/>

      {/* Stars */}
      {STARS.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full bg-white pointer-events-none z-0"
          style={{ width:s.width, height:s.height, top:s.top, left:s.left, opacity:s.opacity }}
          animate={{ opacity:[s.opacity*0.3, s.opacity, s.opacity*0.3] }}
          transition={{ duration:s.dur, repeat:Infinity, delay:s.delay }}
        />
      ))}

      {/* ══════════ CARD ══════════ */}
      <div className="relative z-10 w-full max-w-5xl mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row min-h-[640px] shadow-2xl"
          style={{
            background: "rgba(10, 15, 25, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* --- Sign-In form (left slot on desktop) --- */}
          <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-12 lg:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key="signin-desk"
                className="w-full max-w-sm"
                variants={containerVariants}
                initial="hidden"
                animate={!isLogin ? "visible" : "hidden"}
                exit="exit"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-2 drop-shadow-md">Returning explorer?</p>
                  <h1 className="text-4xl font-display text-white">Welcome Back</h1>
                </motion.div>

                <motion.button variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl mb-6 text-sm font-semibold text-white/90 transition-all shadow-lg"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <GoogleIcon /> Continue with Google
                </motion.button>

                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/10"/><span className="text-xs text-white/40 font-medium">or</span><div className="flex-1 h-px bg-white/10"/>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-4">
                  <InputField id="si-email" icon={<Mail size={18}/>} type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
                  <InputField id="si-pass" icon={<Lock size={18}/>} type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"
                    right={<button type="button" onClick={()=>setShow(!showPassword)} className="text-white/30 hover:text-white/70 transition-colors">{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button>}/>
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-3 text-right">
                  <Link href="#" className="text-xs text-white/50 hover:text-[#d4af37] transition-colors font-medium">Forgot your password?</Link>
                </motion.div>

                {errorMsg && <div className="text-red-400 text-sm mt-4 text-center font-medium bg-red-500/10 py-2 rounded-lg">{errorMsg}</div>}
                {successMsg && <div className="text-green-400 text-sm mt-4 text-center font-medium bg-green-500/10 py-2 rounded-lg">{successMsg}</div>}

                <motion.button variants={itemVariants} type="button" onClick={() => handleSubmit()} disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(212,175,55,0.3)" }} whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase text-black disabled:opacity-50 transition-all shadow-xl"
                  style={{ background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)" }}>
                  {loading ? "Signing In..." : "Sign In"}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Sign-Up form (right slot on desktop) --- */}
          <div className="hidden md:flex md:w-1/2 absolute inset-y-0 right-0 items-center justify-center p-12 lg:p-16" style={{ pointerEvents: isLogin ? "auto" : "none" }}>
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
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-2 drop-shadow-md">New here?</p>
                    <h1 className="text-4xl font-display text-white">Create Account</h1>
                  </motion.div>

                  <motion.button variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl mb-6 text-sm font-semibold text-white/90 transition-all shadow-lg"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <GoogleIcon /> Continue with Google
                  </motion.button>

                  <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-white/10"/><span className="text-xs text-white/40 font-medium">or</span><div className="flex-1 h-px bg-white/10"/>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-4">
                    <InputField id="su-name" icon={<User size={18}/>} type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/>
                    <InputField id="su-email" icon={<Mail size={18}/>} type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
                    <InputField id="su-pass" icon={<Lock size={18}/>} type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"
                      right={<button type="button" onClick={()=>setShow(!showPassword)} className="text-white/30 hover:text-white/70 transition-colors">{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button>}/>
                    <InputField id="su-confirm" icon={<Lock size={18}/>} type={showConfirm?"text":"password"} placeholder="Re-enter Password" value={confirmPassword} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password"
                      right={<button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="text-white/30 hover:text-white/70 transition-colors">{showConfirm?<EyeOff size={18}/>:<Eye size={18}/>}</button>}/>
                  </motion.div>

                  <motion.label variants={itemVariants} className="flex items-start gap-3 mt-5 cursor-pointer group">
                    <div className="relative mt-0.5 shrink-0">
                      <input id="su-terms" type="checkbox" checked={agreedToTerms} onChange={e=>setAgreed(e.target.checked)} className="sr-only peer"/>
                      <div className="w-4 h-4 rounded border border-white/20 peer-checked:border-[#d4af37] peer-checked:bg-[#d4af37] transition-all flex items-center justify-center bg-white/5">
                        {agreedToTerms && <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                    </div>
                    <span className="text-xs text-white/50 leading-relaxed font-medium">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#d4af37] hover:text-[#facc15] underline underline-offset-2">Terms & Conditions</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-[#d4af37] hover:text-[#facc15] underline underline-offset-2">Privacy Policy</Link>
                    </span>
                  </motion.label>

                  {errorMsg && <div className="text-red-400 text-sm mt-4 text-center font-medium bg-red-500/10 py-2 rounded-lg">{errorMsg}</div>}
                  {successMsg && <div className="text-green-400 text-sm mt-4 text-center font-medium bg-green-500/10 py-2 rounded-lg">{successMsg}</div>}

                  <motion.button variants={itemVariants} type="button" onClick={() => handleSubmit()} disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(212,175,55,0.3)" }} whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-black disabled:opacity-50 transition-all shadow-xl"
                    style={{ background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)" }}>
                    {loading ? "Creating..." : "Create Account"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ══════════ DESKTOP: SLIDING ILLUSTRATION PANEL ══════════ */}
          <motion.div
            className="hidden md:flex md:w-1/2 absolute inset-y-0 md:flex-col items-center justify-center p-12 overflow-hidden shadow-2xl"
            animate={{ left: isLogin ? "0%" : "50%" }}
            transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1 }}
            style={{ 
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              zIndex: 20,
              boxShadow: isLogin ? "10px 0 50px rgba(0,0,0,0.5)" : "-10px 0 50px rgba(0,0,0,0.5)"
            }}
          >
            {/* Background Image for the panel */}
            <Image 
              src={isLogin ? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop" : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"} 
              alt="Travel destination" 
              fill 
              className="object-cover opacity-60 mix-blend-overlay pointer-events-none transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "panel-signup" : "panel-signin"}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center text-center w-full max-w-sm"
              >
                <div className="flex items-center gap-2 mb-8 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                  <Compass className="text-[#d4af37] w-5 h-5"/>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">Aether Travel</span>
                </div>

                <h2 className="text-4xl font-display text-white mb-4 leading-tight drop-shadow-lg">
                  {isLogin ? "Discover the\nUnseen" : "Your Journey\nAwaits"}
                </h2>
                <p className="text-sm text-white/80 leading-relaxed font-medium mb-10 drop-shadow">
                  {isLogin
                    ? "Join our community of elite travelers and experience the world's most curated destinations."
                    : "Welcome back to your personalized travel dashboard. Your next adventure starts here."}
                </p>

                <motion.button
                  onClick={toggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
                >
                  {isLogin ? "Sign In Instead" : "Create Account"}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ══════════ MOBILE: single column ══════════ */}
          <div className="flex md:hidden flex-col justify-center w-full p-8" style={{ background: "rgba(10, 15, 25, 0.4)", backdropFilter: "blur(20px)" }}>
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Compass className="text-[#d4af37] w-6 h-6"/>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">Aether Travel</span>
              </div>
              <div className="inline-flex rounded-full p-1 bg-black/20 border border-white/10">
                {(["Sign In","Sign Up"] as const).map((label, i) => {
                  const active = (i===0 && !isLogin)||(i===1 && isLogin);
                  return (
                    <button key={label} onClick={() => setIsLogin(i===1)}
                      className="relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: active ? "#000" : "rgba(255,255,255,0.5)" }}>
                      {active && (
                        <motion.span layoutId="pill-mob" className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)" }} />
                      )}
                      <span className="relative z-10">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "m-signup" : "m-signin"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
              >
                <motion.div variants={itemVariants} className="mb-8 text-center">
                  <h1 className="text-3xl font-display text-white">
                    {isLogin ? "Create Account" : "Welcome Back"}
                  </h1>
                </motion.div>

                <motion.button variants={itemVariants} whileHover={{scale:1.02}} whileTap={{scale:0.98}} type="button"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl mb-6 text-sm font-semibold text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
                  <GoogleIcon/> Continue with Google
                </motion.button>

                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/10"/><span className="text-xs text-white/40">or</span><div className="flex-1 h-px bg-white/10"/>
                </motion.div>

                <div className="flex flex-col gap-4">
                  {isLogin && (
                    <motion.div variants={itemVariants}>
                      <InputField id="m-name" icon={<User size={18}/>} type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/>
                    </motion.div>
                  )}
                  <motion.div variants={itemVariants}>
                    <InputField id="m-email" icon={<Mail size={18}/>} type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <InputField id="m-pass" icon={<Lock size={18}/>} type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"
                      right={<button type="button" onClick={()=>setShow(!showPassword)} className="text-white/30 hover:text-white/70 transition-colors">{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button>}/>
                  </motion.div>

                  {isLogin && (
                    <motion.div variants={itemVariants}>
                      <InputField id="m-confirm" icon={<Lock size={18}/>} type={showConfirm?"text":"password"} placeholder="Re-enter Password" value={confirmPassword} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password"
                        right={<button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="text-white/30 hover:text-white/70 transition-colors">{showConfirm?<EyeOff size={18}/>:<Eye size={18}/>}</button>}/>
                    </motion.div>
                  )}
                </div>

                {isLogin && (
                  <motion.label variants={itemVariants} className="flex items-start gap-3 mt-5 mb-2 cursor-pointer group">
                    <div className="relative mt-0.5 shrink-0">
                      <input id="m-terms" type="checkbox" checked={agreedToTerms} onChange={e=>setAgreed(e.target.checked)} className="sr-only"/>
                      <div className="w-4 h-4 rounded border border-white/20 transition-all flex items-center justify-center bg-white/5"
                        style={{ background: agreedToTerms ? "#d4af37" : "transparent", borderColor: agreedToTerms ? "#d4af37" : "rgba(255,255,255,0.2)" }}>
                        {agreedToTerms && <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                    </div>
                    <span className="text-xs text-white/50 leading-relaxed font-medium">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#d4af37] hover:text-[#facc15] underline">Terms & Conditions</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-[#d4af37] hover:text-[#facc15] underline">Privacy Policy</Link>
                    </span>
                  </motion.label>
                )}

                {!isLogin && (
                  <motion.div variants={itemVariants} className="pt-3 text-right">
                    <Link href="#" className="text-xs text-white/50 hover:text-white transition-colors">Forgot your password?</Link>
                  </motion.div>
                )}

                {errorMsg && <div className="text-red-400 text-sm mt-4 text-center font-medium bg-red-500/10 py-2 rounded-lg">{errorMsg}</div>}
                {successMsg && <div className="text-green-400 text-sm mt-4 text-center font-medium bg-green-500/10 py-2 rounded-lg">{successMsg}</div>}

                <motion.button variants={itemVariants} type="submit" disabled={loading}
                  whileHover={{ scale:1.02, boxShadow: "0 10px 30px rgba(212,175,55,0.3)" }} whileTap={{ scale:0.98 }}
                  className="w-full mt-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-black disabled:opacity-50 transition-all shadow-xl"
                  style={{ background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)" }}>
                  {loading ? (isLogin ? "Creating..." : "Signing In...") : (isLogin ? "Create Account" : "Sign In")}
                </motion.button>
              </motion.form>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
