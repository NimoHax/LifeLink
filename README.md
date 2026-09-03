## Coolify Dockerfile deployment

This repository is configured for Dockerfile deployment.

- Build Pack: `Dockerfile`
- Base Directory: `/`
- Dockerfile: `/Dockerfile`
- Port: `3000`
- Health check: `/api/health`

See `COOLIFY-DOCKERFILE-SETUP.md` for exact settings.

# LifeLink — Production Web First

Production-oriented Web + Backend foundation for LifeLink.

## Stack
- Next.js 15 + TypeScript
- Tailwind CSS
- Supabase Auth/PostgreSQL/Realtime/Storage
- Framer Motion
- Zod
- Lucide React

## Run
```bash
npm install
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

The first milestone is the production web experience and backend contract. Android will use the same Supabase project and data model in the next milestone.

## Required environment
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

Never put SUPABASE_SERVICE_ROLE_KEY in browser/mobile code.
