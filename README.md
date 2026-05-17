# ResumeForge AI

AI-powered resume builder, ATS simulator, recruiter readability analyzer, and ATS-safe PDF exporter for MCA students, freshers, software developers, career switchers, and job seekers.

## Features

- AI Resume Builder with multi-step editing, live preview, drag-and-drop section ordering, auto-save drafts, AI optimization buttons, and PDF export
- ATS Resume Scanner with PDF upload, job-description comparison, keyword matching, missing skills, formatting warnings, and recruiter readability score
- Resume Score Analyzer using the requested weighting: keyword 40%, skills 20%, formatting 15%, completeness 15%, readability 10%
- Gemini integration for summaries, rewrites, achievements, skills, interview questions, and job-match analysis
- Supabase Auth and Postgres schema for users, resumes, ATS reports, templates, and AI history
- Blog, pricing, dashboard, templates, settings, about, and admin analytics pages

## Stack

- Frontend: Next.js 15, React, Tailwind CSS, Framer Motion, React Hook Form, Zustand
- Backend: FastAPI, spaCy, scikit-learn, pdfplumber, ReportLab
- Database/Auth: Supabase Postgres and Supabase Auth
- AI: Gemini API
- Deployment: Vercel frontend, Render backend, Supabase database

## Folder Structure

```text
.
├── src/                    # Next.js frontend
│   ├── app/                # App Router pages
│   ├── components/         # UI and interactive product clients
│   ├── lib/                # Resume data, ATS utilities, Supabase client
│   └── stores/             # Zustand stores
├── backend/                # FastAPI service
│   ├── app/api/routes/     # ATS, AI, resume, health routes
│   ├── app/services/       # ATS engine, Gemini, PDF generator
│   └── requirements.txt
├── supabase/schema.sql     # Database tables, RLS, seed templates
└── docs/                   # API, deployment, architecture
```

## Local Development

Install frontend dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Run the backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload --port 8000
```

Create `.env` files from:

- `.env.example`
- `backend/.env.example`

## Authentication Flow

1. User signs up or signs in from `/login`.
2. Frontend calls Supabase Auth with the anon key.
3. Supabase creates an `auth.users` account.
4. App data is stored in Postgres tables protected by row-level security.
5. Backend uses the service-role key only for trusted server workflows.

## ATS Scoring Algorithm

The backend extracts PDF text with `pdfplumber`, detects tables and possible multi-column layouts, extracts keywords with spaCy/token rules, computes TF-IDF cosine similarity with scikit-learn, and applies the weighted score:

```text
ATS Score =
  Keyword Match * 0.40 +
  Skills Match * 0.20 +
  Formatting * 0.15 +
  Completeness * 0.15 +
  Readability * 0.10
```

Resume export follows ATS-safe rules: single column, no photos, no tables, no icons, black-and-white text, sans-serif fonts, and one-inch margins.

## Documentation

- [API docs](docs/API.md)
- [Architecture diagram](docs/ARCHITECTURE.md)
- [Deployment instructions](docs/DEPLOYMENT.md)
