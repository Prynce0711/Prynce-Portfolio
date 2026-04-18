create table if not exists public.site_content (
  id bigint generated always as identity primary key,
  section text not null unique,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default timezone('utc'::text, now())
);

insert into public.admin_users (email)
values ('pc.clemente11@gmail.com')
on conflict (email) do nothing;

create or replace function public.set_row_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row
execute function public.set_row_updated_at();

alter table public.site_content enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content"
on public.site_content
for select
using (true);

drop policy if exists "Admin write site content" on public.site_content;
create policy "Admin write site content"
on public.site_content
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as admins
    where lower(admins.email) = lower(auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as admins
    where lower(admins.email) = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Admins can view own admin record" on public.admin_users;
create policy "Admins can view own admin record"
on public.admin_users
for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read portfolio assets" on storage.objects;
create policy "Public read portfolio assets"
on storage.objects
for select
to public
using (bucket_id = 'portfolio-assets');

drop policy if exists "Admin manage portfolio assets" on storage.objects;
create policy "Admin manage portfolio assets"
on storage.objects
for all
to authenticated
using (
  bucket_id = 'portfolio-assets'
  and exists (
    select 1
    from public.admin_users as admins
    where lower(admins.email) = lower(auth.jwt() ->> 'email')
  )
)
with check (
  bucket_id = 'portfolio-assets'
  and exists (
    select 1
    from public.admin_users as admins
    where lower(admins.email) = lower(auth.jwt() ->> 'email')
  )
);
