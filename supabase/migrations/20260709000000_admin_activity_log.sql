-- Create the admin activity log table for auditing destructive actions
create table if not exists public.admin_activity_log (
  id uuid primary key default gen_random_uuid(),
  admin_email text not null,
  action text not null, -- e.g. 'DELETE_POST', 'DELETE_RESOURCE', 'DELETE_FAQ', 'CREATE_POST'
  target_id text not null,
  details jsonb, -- optional payload metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.admin_activity_log enable row level security;

-- Policies for RLS: Only authenticated users (admins) can view or insert logs
create policy "Allow insert for authenticated users only"
  on public.admin_activity_log
  for insert
  to authenticated
  with check (true);

create policy "Allow select for authenticated users only"
  on public.admin_activity_log
  for select
  to authenticated
  using (true);
