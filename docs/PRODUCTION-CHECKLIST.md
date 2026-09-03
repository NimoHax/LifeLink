# LifeLink Production Checklist

## Now implemented
- Premium animated web experience
- Login / signup / password reset UI
- Google OAuth integration code
- Supabase server + browser clients
- Auth callback
- Protected dashboard/admin routes
- Real task GET/POST/PATCH/DELETE APIs
- User-scoped database access through Supabase RLS
- Admin operational dashboard
- Coolify Docker deployment
- Shared backend schema for future Android client

## Before public launch
1. Create a Supabase production project.
2. Run `supabase/schema.sql`.
3. Enable Email auth and Google provider.
4. Set OAuth callback URL to `/auth/callback`.
5. Add production environment variables in Coolify.
6. Add a secure admin-role table/policy and enforce it server-side.
7. Configure private Storage buckets and policies.
8. Configure email provider and password-reset templates.
9. Add billing provider + verified webhooks.
10. Add push notification provider for Android.
11. Add monitoring/error tracking and database backups.
12. Run security and load testing.
