"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function AuthCard({ mode }: { mode: "login"|"signup"|"forgot" }) {
  const params = useSearchParams();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(params.get("confirmed") ? "Email confirmed. You can now log in." : "");
  const [error, setError] = useState(params.get("error") || "");

  async function google() {
    setLoading(true); setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
      });
      if (error) throw error;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google sign-in failed.");
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError(""); setMessage("");
    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") || "").trim();
      const password = String(form.get("password") || "");
      const name = String(form.get("name") || "").trim();
      const supabase = createSupabaseBrowserClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.assign("/dashboard");
        return;
      }

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: { data: { display_name: name }, emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` }
        });
        if (error) throw error;
        if (data.session) { window.location.assign("/dashboard"); return; }
        setMessage("Account created. Check your email to confirm your account, then log in.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`
        });
        if (error) throw error;
        setMessage("Reset instructions sent. Check your email.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Authentication failed.");
    } finally { setLoading(false); }
  }

  return <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.5}}
    className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/[.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8">
    <div className="mb-8">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-white text-black"><Sparkles size={18}/></div>
      <h1 className="text-2xl font-semibold tracking-tight">{mode==="login"?"Welcome back":mode==="signup"?"Create your LifeLink":"Reset your password"}</h1>
      <p className="mt-2 text-sm leading-6 text-white/40">{mode==="login"?"Continue to your connected life dashboard.":mode==="signup"?"One account for web and Android.":"We'll send a secure reset link to your email."}</p>
    </div>

    {mode !== "forgot" && <>
      <button type="button" onClick={google} disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[.04] py-3 text-sm font-medium hover:bg-white/[.08] disabled:opacity-50">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-bold text-black">G</span> Continue with Google
      </button>
      <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[.18em] text-white/25"><span className="h-px flex-1 bg-white/8"/>or<span className="h-px flex-1 bg-white/8"/></div>
    </>}

    <form onSubmit={submit} className="grid gap-4">
      {mode==="signup" && <label className="grid gap-2 text-xs text-white/50">Name<div className="relative"><UserRound className="absolute left-3 top-3.5 text-white/25" size={16}/><input name="name" required placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-3 text-sm outline-none focus:border-white/30"/></div></label>}
      <label className="grid gap-2 text-xs text-white/50">Email<div className="relative"><Mail className="absolute left-3 top-3.5 text-white/25" size={16}/><input name="email" required type="email" autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-3 text-sm outline-none focus:border-white/30"/></div></label>
      {mode!=="forgot" && <label className="grid gap-2 text-xs text-white/50">Password<div className="relative"><Lock className="absolute left-3 top-3.5 text-white/25" size={16}/><input name="password" required minLength={8} autoComplete={mode==="login"?"current-password":"new-password"} type={show?"text":"password"} placeholder="Minimum 8 characters" className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-10 text-sm outline-none focus:border-white/30"/><button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-3 text-white/30">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>}
      {mode==="signup" && <label className="flex items-start gap-2 text-xs text-white/35"><input type="checkbox" required className="mt-0.5"/> I agree to the Terms and Privacy Policy.</label>}
      <button disabled={loading} className="mt-1 rounded-xl bg-white py-3 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50">{loading?"Please wait…":mode==="login"?"Log in":mode==="signup"?"Create account":"Send reset link"}</button>
    </form>

    {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/15 bg-red-400/5 p-3 text-xs text-red-200/80">{error}</p>}
    {message && <p role="status" className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3 text-xs text-emerald-200/80">{message}</p>}

    <div className="mt-6 text-center text-xs text-white/35">
      {mode==="login" ? <><Link className="hover:text-white" href="/forgot-password">Forgot password?</Link><span className="mx-2">·</span><Link className="hover:text-white" href="/signup">Create account</Link></> :
       mode==="signup" ? <>Already have an account? <Link className="text-white/70" href="/login">Log in</Link></> :
       <>Remembered it? <Link className="text-white/70" href="/login">Back to login</Link></>}
    </div>
  </motion.div>;
}
