import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Brand({ href = "/" }: { href?: string }) {
  return <Link href={href} className="flex items-center gap-3">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black shadow-lg shadow-white/10"><Sparkles size={17}/></span>
    <span className="font-semibold tracking-tight">LifeLink</span>
  </Link>;
}
