import { Brand } from "@/components/brand";
import { AuthCard } from "@/components/auth-card";

export default function Page() {
  return <main className="relative min-h-screen overflow-hidden bg-[#07090d] px-5 py-6">
    <div className="absolute inset-0 grid-bg opacity-50"/>
    <div className="relative mx-auto max-w-7xl"><Brand /></div>
    <div className="relative flex min-h-[calc(100vh-100px)] items-center justify-center py-10">
      <AuthCard mode="forgot" />
    </div>
  </main>;
}
