 "use client";

import { motion } from "framer-motion";
import { Bell, Check, ChevronRight, CirclePlus, FileText, LayoutDashboard, ListTodo, LogOut, Menu, Plus, Search, Settings, Sparkles, WalletCards, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const initialTasks = [
  {title:"Renew vehicle insurance", meta:"Today · 6:00 PM", done:true},
  {title:"Buy replacement charger", meta:"Tomorrow", done:false},
  {title:"Finish portfolio update", meta:"Friday", done:false},
  {title:"Review monthly expenses", meta:"Sunday", done:false},
];

export default function Dashboard() {
  const [tasks,setTasks] = useState(initialTasks);
  const [loading,setLoading] = useState(true);
  const [newTask,setNewTask] = useState("");
  useEffect(()=>{ fetch("/api/tasks").then(r=>r.json()).then(x=>{
    if(Array.isArray(x.data)) setTasks(x.data.map((t:any)=>({title:t.title,meta:t.due_at?new Date(t.due_at).toLocaleString():"No due date",done:t.status==="completed",id:t.id})));
  }).finally(()=>setLoading(false)); },[]);
  const addTask=async()=>{ if(!newTask.trim()) return; const r=await fetch("/api/tasks",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({title:newTask})}); const x=await r.json(); if(x.data){setTasks(v=>[{title:x.data.title,meta:"No due date",done:false,id:x.data.id},...v]);setNewTask("");} };
  const [mobile,setMobile] = useState(false);
  const toggle=async(i:number)=>{const t:any=tasks[i]; if(t.id) await fetch(`/api/tasks/${t.id}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({status:t.done?"open":"completed"})}); setTasks(v=>v.map((x,n)=>n===i?{...x,done:!x.done}:x));};
  const completed=tasks.filter(t=>t.done).length;

  const Sidebar=()=> <aside className={`${mobile?"fixed inset-y-0 left-0 z-50 flex":"hidden md:flex"} w-64 flex-col border-r border-white/8 bg-[#090c11] p-4`}>
    <div className="flex items-center justify-between px-2 py-2"><Link href="/" className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black"><Sparkles size={15}/></span><b>LifeLink</b></Link>{mobile&&<button onClick={()=>setMobile(false)}><X size={18}/></button>}</div>
    <nav className="mt-8 grid gap-1 text-sm">
      {[["Dashboard",LayoutDashboard],["To‑Do",ListTodo],["Captures",CirclePlus],["Records",WalletCards],["Documents",FileText]].map(([n,I]:any)=><button key={n} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left ${n==="Dashboard"?"bg-white/8 text-white":"text-white/45 hover:bg-white/5 hover:text-white"}`}><I size={17}/>{n}</button>)}
    </nav>
    <div className="mt-auto grid gap-1 text-sm">
      <Link href="/admin" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/45 hover:bg-white/5 hover:text-white">Admin panel</Link>
      <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/45 hover:bg-white/5 hover:text-white"><Settings size={17}/>Settings</button>
      <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/45 hover:bg-white/5 hover:text-white"><LogOut size={17}/>Log out</button>
    </div>
  </aside>;

  return <div className="min-h-screen bg-[#07090d] text-white">
    <Sidebar/>
    {mobile && <div onClick={()=>setMobile(false)} className="fixed inset-0 z-40 bg-black/60 md:hidden"/>}
    <section className="md:pl-64">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/7 bg-[#07090d]/80 px-4 backdrop-blur-xl md:px-8">
        <div className="flex items-center gap-3"><button onClick={()=>setMobile(true)} className="rounded-xl border border-white/8 p-2 md:hidden"><Menu size={17}/></button><div className="hidden items-center gap-2 rounded-xl border border-white/8 bg-white/[.025] px-3 py-2 text-xs text-white/30 sm:flex"><Search size={14}/>Search LifeLink… <span className="ml-5 rounded border border-white/8 px-1.5 py-0.5">⌘ K</span></div></div>
        <div className="flex items-center gap-2"><button className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 hover:bg-white/5"><Bell size={16}/></button><div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-semibold">N</div></div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-xs text-white/30">Thursday, September 3</p><h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Good morning, Nimo.</h1><p className="mt-2 text-sm text-white/40">Here’s what deserves your attention today.</p></div>
          <div className="flex gap-2"><input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="Add a task…" className="w-44 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2.5 text-sm outline-none focus:border-white/25"/><button onClick={addTask} className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black"><Plus size={16}/> Add</button></div>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[["Tasks",`${completed}/${tasks.length}`,"Completed today"],["Reminders","03","Upcoming"],["Records","12","This month"],["Focus","82%","Today"]].map(([a,b,c],i)=><motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} key={a} className="glass rounded-2xl p-5"><p className="text-xs text-white/35">{a}</p><p className="mt-3 text-2xl font-semibold">{b}</p><p className="mt-1 text-xs text-white/25">{c}</p></motion.div>)}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
          <motion.section layout className="glass rounded-3xl p-5 md:p-6">
            <div className="flex items-center justify-between"><div><h2 className="font-semibold">Today’s To‑Do</h2><p className="mt-1 text-xs text-white/30">{tasks.length-completed} still to do</p></div><button className="text-xs text-white/40 hover:text-white">View all <ChevronRight className="inline" size={14}/></button></div>
            <div className="mt-5 grid gap-1">{loading && <p className="p-3 text-xs text-white/30">Loading your tasks…</p>}
              {tasks.map((t,i)=><motion.button layout key={t.title} onClick={()=>toggle(i)} className="group flex items-center gap-3 rounded-2xl p-3 text-left hover:bg-white/[.035]">
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${t.done?"border-white bg-white text-black":"border-white/15 text-transparent group-hover:border-white/35"}`}><Check size={12}/></span>
                <span className="min-w-0"><span className={`block text-sm ${t.done?"text-white/30 line-through":"text-white/75"}`}>{t.title}</span><span className="mt-1 block text-xs text-white/25">{t.meta}</span></span>
              </motion.button>)}
            </div>
          </motion.section>

          <motion.section initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}} className="glass rounded-3xl p-5 md:p-6">
            <div className="flex items-center gap-2 text-xs text-white/35"><Sparkles size={14}/> LifeLink insight</div>
            <h2 className="mt-5 text-lg font-semibold">Keep today light.</h2>
            <p className="mt-2 text-sm leading-6 text-white/40">You have {tasks.length-completed} open tasks. Finish the insurance renewal first; everything else can wait.</p>
            <div className="mt-6 rounded-2xl border border-white/8 bg-black/10 p-4"><div className="flex items-center justify-between text-xs"><span className="text-white/35">Daily progress</span><span className="text-white/60">{Math.round(completed/tasks.length*100)}%</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8"><motion.div initial={{width:0}} animate={{width:`${completed/tasks.length*100}%`}} className="h-full rounded-full bg-white"/></div></div>
          </motion.section>
        </div>

        <section className="mt-4 grid gap-4 md:grid-cols-3">
          {[["Capture something","Receipt, document, note or text",CirclePlus],["Add a task","Plan one thing you want done",ListTodo],["Add a record","Purchase or important life record",WalletCards]].map(([a,b,I]:any)=><button key={a} className="glass rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:bg-white/[.055]"><I size={18}/><h3 className="mt-4 text-sm font-medium">{a}</h3><p className="mt-1 text-xs leading-5 text-white/30">{b}</p></button>)}
        </section>
      </main>
    </section>
  </div>;
}
