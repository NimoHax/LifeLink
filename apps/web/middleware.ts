import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const path = request.nextUrl.pathname;

  if (!url || !key) {
    return (path.startsWith("/dashboard") || path.startsWith("/admin"))
      ? NextResponse.redirect(new URL("/login?error=not_configured", request.url))
      : NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({name,value}) => request.cookies.set(name,value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({name,value,options}) => response.cookies.set(name,value,options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if ((path.startsWith("/dashboard") || path.startsWith("/admin")) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return response;
}

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/callback"] };
