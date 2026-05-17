from __future__ import annotations

from app.core.config import get_settings


def fallback_response(task: str, content: str, role: str | None = None) -> str:
    target = role or "target role"
    if task == "summary":
        return (
            f"Results-driven {target} candidate with hands-on experience in full-stack development, REST APIs, "
            "database design, and production-ready delivery. Skilled at translating requirements into measurable "
            "software outcomes while maintaining ATS-friendly resume language."
        )
    if task == "rewrite":
        base = content.strip() or "Built a software feature using modern web technologies"
        return f"{base.rstrip('.')} by designing a scalable implementation resulting in measurable performance and reliability gains."
    if task == "achievement":
        return "Developed a production-style project by combining frontend, backend, and database workflows resulting in a recruiter-ready portfolio artifact."
    if task == "skills":
        return "React, Next.js, TypeScript, Python, FastAPI, PostgreSQL, Supabase, REST APIs, Git, Docker, Tailwind CSS"
    if task == "interview":
        return "\n".join(
            [
                "1. Explain the architecture of your strongest full-stack project.",
                "2. How did you optimize API or database performance?",
                "3. Describe an authentication or authorization challenge you solved.",
                "4. How would you improve the resume project for production scale?",
                "5. Which metrics prove your project had impact?",
            ],
        )
    return "The resume aligns partially with the target job. Strengthen exact keywords, technical skills, quantified outcomes, and role-specific project evidence."


def run_gemini(task: str, content: str, job_description: str | None = None, role: str | None = None) -> tuple[str, bool, str]:
    settings = get_settings()
    if not settings.gemini_api_key:
        return fallback_response(task, content, role), True, "deterministic-fallback"

    try:
        import google.generativeai as genai

        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel(settings.gemini_model)
        prompt = build_prompt(task, content, job_description, role)
        response = model.generate_content(prompt)
        return response.text.strip(), False, settings.gemini_model
    except Exception:
        return fallback_response(task, content, role), True, "deterministic-fallback"


def build_prompt(task: str, content: str, job_description: str | None, role: str | None) -> str:
    role_text = role or "software role"
    jd_text = job_description or "No job description provided."
    return f"""
You are ResumeForge AI, an ATS resume expert for MCA students, freshers, software developers, career switchers, and job seekers.
Task: {task}
Target role: {role_text}
Job description:
{jd_text}

User content:
{content}

Rules:
- Use ATS-safe plain text.
- Prefer concrete technologies, measurable outcomes, and recruiter-readable language.
- For bullets, use the X-Y-Z formula: accomplished X by doing Y resulting in Z.
- Do not invent false employers, degrees, or numbers. If a number is missing, suggest a realistic placeholder.
Return only the final content.
"""
