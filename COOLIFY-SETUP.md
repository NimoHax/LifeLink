# LifeLink — Coolify Docker Compose Setup

1. Push this repository to GitHub.
2. In Coolify: Project -> Environment -> New Resource -> Application.
3. Choose the GitHub repository and branch `main`.
4. Choose **Docker Compose** as the build pack.
5. Keep the compose file at the repository root: `docker-compose.yml`.
6. If Coolify asks for a base directory, use `/`.
7. The service is `lifelink-web`.
8. Internal port: `3000`.
9. Add these environment variables in Coolify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
10. Add your domain in the Domains section, then deploy.

The Compose file intentionally uses `expose: 3000`; Coolify's proxy should route the public domain to the service's internal port 3000.

Do not commit production secrets to GitHub.
