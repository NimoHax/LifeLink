# LifeLink production setup

## Coolify
Build Pack: Dockerfile
Base Directory: /apps/web
Dockerfile Location: Dockerfile
Port: 3000

Set these as Environment Variables AND ensure the same public variables are available to the Docker build:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_APP_URL

After changing these values, REBUILD the image. Next.js embeds NEXT_PUBLIC_* values into client-side JavaScript during build.

## Supabase
1. Create/open your LifeLink project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Authentication > Providers > enable Email.
4. For Google: enable Google provider and configure OAuth credentials.
5. Authentication > URL Configuration:
   Site URL = https://YOUR-DOMAIN
   Redirect URL = https://YOUR-DOMAIN/auth/callback
6. If email confirmation is enabled, users must confirm their email before password login.
7. If you change Supabase keys/domain, redeploy/rebuild LifeLink.

## What is functional
- Email/password login
- Signup + email confirmation flow
- Google OAuth callback
- Forgot-password email request
- Protected dashboard
- Supabase-backed tasks API
- User-scoped RLS database
- Logout
- Landing page Login/Get Started navigation

Never put a Supabase service-role/secret key into a NEXT_PUBLIC variable.
