# ResumeForge AI API

Base URL:

- Local: `http://localhost:8000/api`
- Render: `https://your-render-service.onrender.com/api`

## Health

`GET /health`

Returns service status.

## ATS Scanner

`POST /ats/scan`

Multipart form data:

- `resume`: PDF file
- `job_description`: target job description text

Returns:

```json
{
  "score": 92,
  "keywordScore": 85,
  "skillsScore": 90,
  "formattingScore": 100,
  "completenessScore": 87,
  "readabilityScore": 90,
  "matchedKeywords": ["react", "fastapi"],
  "missingKeywords": ["docker"],
  "missingSkills": ["ci/cd"],
  "formattingWarnings": [],
  "suggestions": ["Rewrite bullets with the X-Y-Z formula."],
  "recruiterReadability": 90
}
```

Scoring weights:

- Keyword Match: 40%
- Skills Match: 20%
- Formatting: 15%
- Resume Completeness: 15%
- Readability: 10%

`POST /ats/scan-text`

Multipart form data:

- `resume_text`
- `job_description`

Use this for tests or extracted text workflows.

## AI

All AI endpoints accept:

```json
{
  "content": "Raw resume text or bullet",
  "job_description": "Optional target JD",
  "role": "Optional target role"
}
```

Endpoints:

- `POST /ai/summary`
- `POST /ai/rewrite`
- `POST /ai/achievement`
- `POST /ai/skills`
- `POST /ai/interview-questions`
- `POST /ai/job-match`

The service uses Gemini when `GEMINI_API_KEY` is configured and deterministic fallbacks otherwise.

## Resumes

`POST /resumes`

Saves resume JSON to Supabase when service-role credentials are configured.

`POST /resumes/export-pdf`

Accepts resume JSON and returns an ATS-safe PDF.

`GET /resumes/templates`

Returns available template metadata.
