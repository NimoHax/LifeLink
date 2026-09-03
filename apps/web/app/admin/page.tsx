 "use client";

import { motion } from "framer-motion";
import { Activity, AlertTriangle, BarChart3, Bell, CheckCircle2, ChevronRight, Database, Globe2, Lock, Settings, Smartphone, Users, Wrench } from "lucide-react";
import Link from "next/link";

const stats = [["Total users","12,842","+8.4%"],["Active this month","8,491","+12.1%"],["Pro users","1,284","+5.8%"],["System health","99.98%","Stable"]];

export default function AdminPage() {
  return <main className="min-h-screen bg-[#07090d] text-white">
    <header className="sticky top-0 z-20 border-b border-white/7 bg-[#07090d]/85 px-5 py-4 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div><p className="text-xs text-white/30">LifeLink Control Center</p><h1 className="mt-1 text-xl font-semibold">Admin Dashboard</h1></div>
        <Link href="/dashboard" className="rounded-xl border border-white/9 px-3 py-2 text-xs text-white/55 hover:text-white">Back to app</Link>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([a,b,c],i)=><motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} key={a} className="rounded-2xl border border-white/8 bg-white/[.025] p-5"><p className="text-xs text-white/35">{a}</p><p className="mt-3 text-2xl font-semibold">{b}</p><p className="mt-1 text-xs text-emerald-300/60">{c}</p></motion.div>)}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-3xl border border-white/8 bg-white/[.025] p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold">Platform activity</h2><p className="mt-1 text-xs text-white/30">Operational metrics only — private user content is excluded.</p></div><BarChart3 size={18} className="text-white/30"/></div>
          <div className="mt-8 flex h-48 items-end gap-2">
            {[28,44,38,57,49,71,65,84,77,92,80,96,88,100].map((v,i)=><motion.div initial={{height:0}} animate={{height:`${v}%`}} transition={{delay:i*.035,duration:.45}} key={i} className="flex-1 rounded-t-md bg-white/10 hover:bg-white/20"/>)} </div>
          <div className="mt-3 flex justify-between text-[10px] text-white/20"><span>21 Aug</span><span>28 Aug</span><span>3 Sep</span></div>
        </section>
        <section className="rounded-3xl border border-white/8 bg-white/[.025] p-6">
          <h2 className="font-semibold">System status</h2>
          <div className="mt-5 grid gap-2">
            {[["Web",Globe2,"Operational"],["Android API",Smartphone,"Operational"],["Database",Database,"Operational"],["Realtime",Activity,"Operational"],["Notifications",Bell,"Operational"]].map(([n,I,s]:any)=><div key={n} className="flex items-center justify-between rounded-xl border border-white/7 bg-black/10 p-3"><div className="flex items-center gap-3"><I size={15} className="text-white/40"/><span className="text-sm text-white/65">{n}</span></div><span className="flex items-center gap-1 text-[11px] text-emerald-300/70"><CheckCircle2 size={12}/>{s}</span></div>)}
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-3xl border border-white/8 bg-white/[.025] p-6">
        <div className="flex items-center gap-2"><Lock size={17}/><h2 className="font-semibold">Privacy boundary</h2></div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/35">Admin analytics are designed around aggregated and operational data. Private documents, notes, receipts and personal captures are not exposed in the admin dashboard by default.</p>
        <div className="mt-5 grid gap-2 md:grid-cols-3">
          {[["Users & plans","Account lifecycle and subscription status"],["App management","Versions, feature flags and announcements"],["Operations","Errors, health and notification delivery"]].map(([a,b])=><div key={a} className="rounded-2xl border border-white/7 p-4"><Wrench size={15} className="text-white/35"/><h3 className="mt-3 text-sm font-medium">{a}</h3><p className="mt-1 text-xs leading-5 text-white/30">{b}</p></div>)}
        </div>
      </section>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[["User management",Users],["App & website",Globe2],["Feature flags",Settings],["Notifications",Bell],["Security & audit",Lock],["Incidents",AlertTriangle]].map(([n,I]:any)=><button key={n} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[.025] p-5 text-left hover:bg-white/[.05]"><span className="flex items-center gap-3 text-sm text-white/65"><I size={17}/>{n}</span><ChevronRight size={15} className="text-white/20"/></button>)}
      </div>
    </div>
  </main>;
}
