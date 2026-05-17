create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role text default 'job_seeker',
  plan text default 'starter',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  template_id text default 'software-engineer',
  content jsonb not null default '{
    "personalInfo": {},
    "summary": "",
    "skills": [],
    "projects": [],
    "experience": [],
    "education": [],
    "certifications": []
  }',
  ats_score numeric(5,2),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.ats_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  resume_id uuid references public.resumes(id) on delete set null,
  job_title text,
  job_description text not null,
  score numeric(5,2) not null,
  keyword_score numeric(5,2) not null,
  skills_score numeric(5,2) not null,
  formatting_score numeric(5,2) not null,
  completeness_score numeric(5,2) not null,
  readability_score numeric(5,2) not null,
  matched_keywords text[] default '{}',
  missing_keywords text[] default '{}',
  missing_skills text[] default '{}',
  formatting_warnings text[] default '{}',
  suggestions text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists public.templates (
  id text primary key,
  name text not null,
  audience text not null,
  description text not null,
  content jsonb not null default '{}',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.ai_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  resume_id uuid references public.resumes(id) on delete set null,
  action text not null,
  prompt text not null,
  response text not null,
  model text not null,
  token_estimate integer default 0,
  created_at timestamptz default now()
);

alter table public.users enable row level security;
alter table public.resumes enable row level security;
alter table public.ats_reports enable row level security;
alter table public.templates enable row level security;
alter table public.ai_history enable row level security;

create policy "Users can read own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users manage own resumes" on public.resumes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own ATS reports" on public.ats_reports
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Anyone can read active templates" on public.templates
  for select using (is_active = true);

create policy "Users read own AI history" on public.ai_history
  for select using (auth.uid() = user_id);

create policy "Users insert own AI history" on public.ai_history
  for insert with check (auth.uid() = user_id);

insert into public.templates (id, name, audience, description, content)
values
  ('fresher', 'Fresher Template', 'MCA students and recent graduates', 'Education-first single-column resume for freshers.', '{}'),
  ('software-engineer', 'Software Engineer Template', 'Software developers', 'Impact-focused engineering resume with tech stack and project evidence.', '{}'),
  ('mca-student', 'MCA Student Template', 'Final-year MCA candidates', 'Placement-ready academic and project resume.', '{}'),
  ('modern-professional', 'Modern Professional Template', 'Career switchers', 'Transferable skills resume without parser-hostile visuals.', '{}')
on conflict (id) do update set
  name = excluded.name,
  audience = excluded.audience,
  description = excluded.description;
