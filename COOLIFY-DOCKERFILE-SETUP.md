# LifeLink — Dockerfile / Coolify

Recommended:
- Build Pack: Dockerfile
- Base Directory: `/apps/web`
- Dockerfile Location: `Dockerfile`
- Port: `3000`
- Health check: `/api/health`

Do NOT select Docker Compose.

Before deploying, push the CONTENTS of this project to the GitHub repository root.
Coolify must deploy the new commit from the branch you selected.

Environment variables should be entered in Coolify, not committed:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL
