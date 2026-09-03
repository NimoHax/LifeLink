import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const { data, error } = await supabase.from("tasks").select("*").order("created_at",{ascending:false});
  if (error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({data});
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const body = await request.json();
  if (!body.title?.trim()) return NextResponse.json({error:"Title required"}, {status:400});
  const { data, error } = await supabase.from("tasks").insert({
    user_id:user.id, title:body.title.trim(), description:body.description ?? null,
    due_at:body.due_at ?? null, priority:body.priority ?? "medium",
    category:body.category ?? null
  }).select().single();
  if (error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({data},{status:201});
}
