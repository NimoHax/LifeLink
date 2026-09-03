 "use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Bell, Check, ChevronRight, CircleCheck, FileText, LayoutDashboard,
  Lock, Menu, Plus, Search, Sparkles, WalletCards, X
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const features = [
  { icon: CircleCheck, title: "Smart To‑Do", text: "Tasks, subtasks, priorities, recurring work and progress in one calm view." },
  { icon: FileText, title: "Life Capture", text: "Turn a receipt, document, note or screenshot into structured information." },
  { icon: Bell, title: "Timely reminders", text: "Keep deadlines, warranties and important dates visible without constant manual work." },
  { icon: WalletCards, title: "Life records", text: "Purchases and useful records stay connected across every device." },
];

const tasks = [
  ["Renew vehicle insurance", "Today · 6:00 PM", true],
  ["Buy replacement charger", "Tomorrow", false],
  ["Finish portfolio update", "Friday", false],
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [completed, setCompleted] = useState([true, false, false]);

  const toggle = (i: number) => setCompleted(v => v.map((x, n) => n === i ? !x : x));

  return (
    <main className="min-h-screen bg-[#070a0f] text-white selection:bg-white selection:text-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black"><Sparkles size={18}/></div>
          <span className="text-lg font-semibold tracking-tight">LifeLink</span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#product" className="hover:text-white">Product</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#security" className="hover:text-white">Security</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="rounded-xl px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white">Log in</Link>
          <Link href="/signup" className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">Get started</Link>
        </div>
        <button onClick={() => setMenu(!menu)} className="rounded-xl border border-white/10 p-2 md:hidden">
          {menu ? <X size={19}/> : <Menu size={19}/>}
        </button>
      </nav>

      {menu && <div className="mx-5 rounded-2xl border border-white/10 bg-white/[.04] p-4 md:hidden">
        <div className="grid gap-2 text-sm text-white/70">
          <a href="#product" onClick={()=>setMenu(false)}>Product</a>
          <a href="#features" onClick={()=>setMenu(false)}>Features</a>
          <a href="#security" onClick={()=>setMenu(false)}>Security</a>
          <a href="#pricing" onClick={()=>setMenu(false)}>Pricing</a>
        </div>
      </div>}

      <section id="product" className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-20 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-32 md:pt-28">
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-white/65">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> Built for real life
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.045em] md:text-7xl">
            Your life,<br/><span className="text-white/45">connected.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/55 md:text-lg">
            LifeLink brings your tasks, captures, purchases, reminders and important life records together — with one account across web and Android.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/signup" className="group flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black shadow-2xl shadow-white/10 transition hover:scale-[1.02]">
              Start free <ArrowRight size={17} className="transition group-hover:translate-x-0.5"/>
            </Link>
            <button className="rounded-2xl border border-white/10 bg-white/[.03] px-5 py-3.5 text-sm text-white/75 hover:bg-white/[.06]">See how it works</button>
          </div>
          <div className="mt-7 flex items-center gap-4 text-xs text-white/35"><Lock size={14}/> Privacy-first by design · No credit card required</div>
        </motion.div>

        <motion.div initial={{opacity:0,y:28,scale:.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.8,delay:.1}}>
          <div className="relative rounded-[30px] border border-white/10 bg-white/[.035] p-3 shadow-2xl shadow-black/50 backdrop-blur">
            <div className="rounded-[23px] border border-white/10 bg-[#0c1017] p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-xs text-white/35">Thursday, September 3</p><h2 className="mt-1 text-xl font-semibold">Good morning, Nimo</h2></div>
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.04]"><Bell size={17}/></div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[["07","Tasks"],["03","Reminders"],["12","Records"]].map(([n,l])=><div key={l} className="rounded-2xl border border-white/8 bg-white/[.025] p-3"><b className="text-lg">{n}</b><p className="mt-1 text-[11px] text-white/35">{l}</p></div>)}
              </div>
              <div className="mt-6 rounded-2xl border border-white/8 bg-white/[.025] p-4">
                <div className="flex items-center justify-between"><span className="text-sm font-medium">Today</span><span className="text-xs text-white/30">3 tasks</span></div>
                <div className="mt-3 grid gap-2">
                  {tasks.map(([name, when],i)=>(
                    <motion.button layout key={name as string} onClick={()=>toggle(i)} className="flex items-center gap-3 rounded-xl p-2 text-left hover:bg-white/[.04]">
                      <span className={`grid h-5 w-5 place-items-center rounded-full border ${completed[i] ? "border-white bg-white text-black" : "border-white/20 text-transparent"}`}><Check size={12}/></span>
                      <span className={completed[i] ? "text-sm text-white/35 line-through" : "text-sm text-white/80"}>{name as string}<span className="ml-2 text-xs text-white/25">{when as string}</span></span>
                    </motion.button>
                  ))}
                </div>
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/[.05] py-3 text-xs text-white/55 hover:bg-white/[.08]"><Plus size={14}/> Quick capture</button>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="border-y border-white/7 bg-white/[.018]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="max-w-2xl"><p className="text-xs uppercase tracking-[.2em] text-white/35">One connected system</p><h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Useful enough to keep open.</h2><p className="mt-4 text-white/45">Manual when you want it. Smart when it can save you effort.</p></div>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {features.map(({icon:Icon,title,text},i)=><motion.div whileHover={{y:-4}} transition={{duration:.2}} key={title} className="rounded-3xl border border-white/8 bg-white/[.025] p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[.04]"><Icon size={19}/></div>
              <h3 className="mt-6 text-lg font-medium">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-white/40">{text}</p>
              <div className="mt-6 flex items-center gap-1 text-xs text-white/35">Explore <ChevronRight size={14}/></div>
            </motion.div>)}
          </div>
        </div>
      </section>

      <section id="security" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="rounded-[32px] border border-white/8 bg-white/[.025] p-7 md:p-12">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black"><Lock size={18}/></div><h2 className="mt-6 text-3xl font-semibold tracking-tight">Your data. Your rules.</h2><p className="mt-4 text-sm leading-6 text-white/40">Every connected capability is permission-based. Private records stay protected by user-scoped access policies.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Google + email authentication","User-scoped database security","Private file storage","Realtime device sync","Export & delete controls","Server-side secret isolation"].map(x=><div key={x} className="rounded-2xl border border-white/8 bg-black/10 p-4 text-sm text-white/65"><Check size={15} className="mb-2"/>{x}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-white/7">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <p className="text-xs uppercase tracking-[.2em] text-white/35">Simple pricing</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/8 bg-white/[.025] p-7"><h3 className="text-xl font-semibold">Free</h3><p className="mt-2 text-sm text-white/40">Core LifeLink features for everyday use.</p><p className="mt-6 text-4xl font-semibold">₹0</p><button className="mt-7 w-full rounded-xl border border-white/10 py-3 text-sm">Get started</button></div>
            <div className="rounded-3xl border border-white/20 bg-white text-black p-7"><h3 className="text-xl font-semibold">Pro</h3><p className="mt-2 text-sm text-black/55">Advanced automation, history and storage.</p><p className="mt-6 text-4xl font-semibold">₹99<span className="text-sm font-normal">/month</span></p><button className="mt-7 w-full rounded-xl bg-black py-3 text-sm text-white">Choose Pro</button></div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl items-center justify-between border-t border-white/7 px-5 py-8 text-xs text-white/30 md:px-8"><span>© 2026 LifeLink</span><span>Web + Android · One connected backend</span></footer>
    </main>
  );
}
