-- LifeLink production database foundation
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  timezone text default 'Asia/Kolkata',
  locale text default 'en-IN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_at timestamptz,
  priority text not null default 'medium' check (priority in ('low','medium','high','urgent')),
  status text not null default 'open' check (status in ('open','completed','archived')),
  repeat_rule text,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.captures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('text','receipt','document','purchase','reminder','note')),
  title text,
  raw_text text,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'processed' check (status in ('pending','processed','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_at timestamptz not null,
  repeat_rule text,
  status text not null default 'active' check (status in ('active','done','dismissed')),
  source_type text,
  source_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  merchant text,
  product_name text not null,
  amount numeric(12,2),
  currency text not null default 'INR',
  purchase_date date,
  return_deadline date,
  warranty_end date,
  receipt_file_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  file_path text not null,
  mime_type text,
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_name text,
  platform text not null,
  push_token text,
  last_seen_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists tasks_user_due_idx on public.tasks(user_id, due_at);
create index if not exists captures_user_created_idx on public.captures(user_id, created_at desc);
create index if not exists reminders_user_due_idx on public.reminders(user_id, due_at);
create index if not exists purchases_user_date_idx on public.purchases(user_id, purchase_date desc);

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.captures enable row level security;
alter table public.reminders enable row level security;
alter table public.purchases enable row level security;
alter table public.documents enable row level security;
alter table public.devices enable row level security;

drop policy if exists "profiles own" on public.profiles;
create policy "profiles own" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "tasks own" on public.tasks;
create policy "tasks own" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "captures own" on public.captures;
create policy "captures own" on public.captures for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "reminders own" on public.reminders;
create policy "reminders own" on public.reminders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "purchases own" on public.purchases;
create policy "purchases own" on public.purchases for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "documents own" on public.documents;
create policy "documents own" on public.documents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "devices own" on public.devices;
create policy "devices own" on public.devices for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Realtime for cross-device sync
alter publication supabase_realtime add table public.tasks;
alter publication supabase_realtime add table public.captures;
alter publication supabase_realtime add table public.reminders;
alter publication supabase_realtime add table public.purchases;
alter publication supabase_realtime add table public.documents;


create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(coalesce(new.email,''), '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
