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

create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users as admins
    where lower(admins.email) = lower(auth.jwt() ->> 'email')
  );
$$;

create table if not exists public.site_content_hero (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.site_content_about (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.site_content_projects (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.site_content_skills (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.site_content_experience (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.site_content_contact (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.site_content_footer (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists site_content_hero_set_updated_at on public.site_content_hero;
create trigger site_content_hero_set_updated_at
before update on public.site_content_hero
for each row
execute function public.set_row_updated_at();

drop trigger if exists site_content_about_set_updated_at on public.site_content_about;
create trigger site_content_about_set_updated_at
before update on public.site_content_about
for each row
execute function public.set_row_updated_at();

drop trigger if exists site_content_projects_set_updated_at on public.site_content_projects;
create trigger site_content_projects_set_updated_at
before update on public.site_content_projects
for each row
execute function public.set_row_updated_at();

drop trigger if exists site_content_skills_set_updated_at on public.site_content_skills;
create trigger site_content_skills_set_updated_at
before update on public.site_content_skills
for each row
execute function public.set_row_updated_at();

drop trigger if exists site_content_experience_set_updated_at on public.site_content_experience;
create trigger site_content_experience_set_updated_at
before update on public.site_content_experience
for each row
execute function public.set_row_updated_at();

drop trigger if exists site_content_contact_set_updated_at on public.site_content_contact;
create trigger site_content_contact_set_updated_at
before update on public.site_content_contact
for each row
execute function public.set_row_updated_at();

drop trigger if exists site_content_footer_set_updated_at on public.site_content_footer;
create trigger site_content_footer_set_updated_at
before update on public.site_content_footer
for each row
execute function public.set_row_updated_at();

alter table public.site_content_hero enable row level security;
alter table public.site_content_about enable row level security;
alter table public.site_content_projects enable row level security;
alter table public.site_content_skills enable row level security;
alter table public.site_content_experience enable row level security;
alter table public.site_content_contact enable row level security;
alter table public.site_content_footer enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public read hero content" on public.site_content_hero;
create policy "Public read hero content"
on public.site_content_hero
for select
using (true);

drop policy if exists "Admin write hero content" on public.site_content_hero;
create policy "Admin write hero content"
on public.site_content_hero
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public read about content" on public.site_content_about;
create policy "Public read about content"
on public.site_content_about
for select
using (true);

drop policy if exists "Admin write about content" on public.site_content_about;
create policy "Admin write about content"
on public.site_content_about
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public read projects content" on public.site_content_projects;
create policy "Public read projects content"
on public.site_content_projects
for select
using (true);

drop policy if exists "Admin write projects content" on public.site_content_projects;
create policy "Admin write projects content"
on public.site_content_projects
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public read skills content" on public.site_content_skills;
create policy "Public read skills content"
on public.site_content_skills
for select
using (true);

drop policy if exists "Admin write skills content" on public.site_content_skills;
create policy "Admin write skills content"
on public.site_content_skills
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public read experience content" on public.site_content_experience;
create policy "Public read experience content"
on public.site_content_experience
for select
using (true);

drop policy if exists "Admin write experience content" on public.site_content_experience;
create policy "Admin write experience content"
on public.site_content_experience
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public read contact content" on public.site_content_contact;
create policy "Public read contact content"
on public.site_content_contact
for select
using (true);

drop policy if exists "Admin write contact content" on public.site_content_contact;
create policy "Admin write contact content"
on public.site_content_contact
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Public read footer content" on public.site_content_footer;
create policy "Public read footer content"
on public.site_content_footer
for select
using (true);

drop policy if exists "Admin write footer content" on public.site_content_footer;
create policy "Admin write footer content"
on public.site_content_footer
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can view own admin record" on public.admin_users;
create policy "Admins can view own admin record"
on public.admin_users
for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

insert into public.site_content_hero (id, content)
values (
  1,
  $$
  {
    "firstName": "Prynce Carlo",
    "lastName": "Clemente",
    "roleText": "Student | Full Stack Web Developer",
    "primaryButtonText": "Get Started",
    "primaryButtonHref": "#about",
    "secondaryButtonText": "View Projects",
    "secondaryButtonHref": "#projects",
    "imageSrc": "pic.jpg",
    "imageAlt": "Prynce Carlo Clemente"
  }
  $$::jsonb
)
on conflict (id) do nothing;

insert into public.site_content_about (id, content)
values (
  1,
  $$
  {
    "fullText": "I am a dedicated IT student with a passion for web development and design.\n\nMy journey in the tech world has equipped me with skills in various programming languages and frameworks. I thrive on creating innovative solutions.\n\nBeyond academics, I enjoy collaborating on projects that challenge my creativity and technical skills. I am eager to contribute to impactful projects and grow as a professional in the IT industry."
  }
  $$::jsonb
)
on conflict (id) do nothing;

insert into public.site_content_projects (id, content)
values (
  1,
  $$
  {
    "titleLead": "Featured",
    "titleHighlight": "Projects",
    "description": "A collection of my technical projects, architectural designs, and case studies.",
    "items": [
      {
        "title": "Barcie International Center",
        "description": "Capstone project for LCUP's premier laboratory facility for BS Tourism Management. A full-scale management system.",
        "tags": ["PHP", "Tailwind", "JavaScript"],
        "image": "barcie.png",
        "link": "http://barcie.safehub-lcup.uk"
      },
      {
        "title": "Portfolio",
        "description": "A personal collection of my work built with Laravel. Showcasing my early journey in full-stack development.",
        "tags": ["TailwindCSS", "React", "Laravel"],
        "image": "portfolio.png",
        "link": "https://prynce-portfolio.vercel.app"
      }
    ]
  }
  $$::jsonb
)
on conflict (id) do nothing;

insert into public.site_content_skills (id, content)
values (
  1,
  $$
  {
    "title": "Technical Stack",
    "subtitle": "Tools and technologies I use to bring ideas to life.",
    "groups": [
      {
        "category": "Frontend Development",
        "skills": [
          { "name": "React", "iconKey": "react", "color": "text-[#61DAFB]" },
          { "name": "JavaScript", "iconKey": "javascript", "color": "text-[#F7DF1E]" },
          { "name": "Tailwind", "iconKey": "tailwindcss", "color": "text-[#06B6D4]" },
          { "name": "Bootstrap", "iconKey": "bootstrap", "color": "text-[#7952B3]" }
        ]
      },
      {
        "category": "Backend Development",
        "skills": [
          { "name": "Laravel", "iconKey": "laravel", "color": "text-[#FF2D20]" },
          { "name": "PHP", "iconKey": "php", "color": "text-[#777BB4]" }
        ]
      },
      {
        "category": "Version Control and Tools",
        "skills": [
          { "name": "Git", "iconKey": "git", "color": "text-[#F05032]" },
          { "name": "GitHub", "iconKey": "github", "color": "text-[#181717]" }
        ]
      }
    ]
  }
  $$::jsonb
)
on conflict (id) do nothing;

insert into public.site_content_experience (id, content)
values (
  1,
  $$
  {
    "title": "Working Experience",
    "subtitle": "A collection of my working experiences.",
    "items": [
      {
        "title": "Service Crew",
        "company": "Jolly Management Solutions inc. - Greenwich",
        "year": "2023",
        "desc": "Developed and maintained web applications using PHP and modern CSS frameworks. Collaborated with a team to build functional and responsive systems."
      },
      {
        "title": "Product Re-packer",
        "company": "Gorgeous Glow",
        "year": "2023",
        "desc": "Designed and built responsive websites for personal clients, focusing on clean UI/UX, accessibility, and performance."
      },
      {
        "title": "Assistant Merchandizer",
        "company": "Pandayan Bookshop",
        "year": "2025",
        "desc": "Led the development of an academic web system as a capstone project, handling both frontend and backend logic."
      },
      {
        "title": "Sales Agent",
        "company": "Converge ICT Solutions",
        "year": "2022 - 2025",
        "desc": "Led the development of an academic web system as a capstone project, handling both frontend and backend logic."
      }
    ]
  }
  $$::jsonb
)
on conflict (id) do nothing;

insert into public.site_content_contact (id, content)
values (
  1,
  $$
  {
    "titleLead": "Ready to build",
    "titleHighlight": "something great?",
    "description": "I am currently available for freelance work and full-time opportunities. Lets connect and turn your vision into a reality.",
    "availabilityText": "Available for New Projects",
    "socials": [
      {
        "name": "Email",
        "value": "pc.clemente11@gmail.com",
        "iconKey": "email",
        "link": "mailto:pc.clemente11@gmail.com",
        "color": "bg-red-500/10 text-red-500"
      },
      {
        "name": "GitHub",
        "value": "github.com/prynce0711",
        "iconKey": "github",
        "link": "https://github.com/prynce0711",
        "color": "bg-slate-500/10 text-slate-700"
      },
      {
        "name": "LinkedIn",
        "value": "linkedin.com/in/prynce-carlo-clemente-a380aa25b",
        "iconKey": "linkedin",
        "link": "https://www.linkedin.com/in/prynce-carlo-clemente-a380aa25b/",
        "color": "bg-blue-500/10 text-blue-600"
      },
      {
        "name": "Facebook",
        "value": "facebook.com/pryncecarlo.clemente11",
        "iconKey": "facebook",
        "link": "https://www.facebook.com/pryncecarlo.clemente11",
        "color": "bg-blue-700/10 text-blue-700"
      }
    ]
  }
  $$::jsonb
)
on conflict (id) do nothing;

insert into public.site_content_footer (id, content)
values (
  1,
  $$
  {
    "headlinePrefix": "Designed and Built by",
    "ownerName": "Prynce",
    "rightsText": "All rights reserved",
    "madeWithLabel": "Made with",
    "techStack": ["React", "Tailwind CSS", "Framer Motion"]
  }
  $$::jsonb
)
on conflict (id) do nothing;

drop table if exists public.site_content cascade;

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
  and public.is_admin_user()
)
with check (
  bucket_id = 'portfolio-assets'
  and public.is_admin_user()
);
