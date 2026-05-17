from fastapi import APIRouter, Response

from app.core.database import get_supabase
from app.schemas import ResumePayload
from app.services.pdf_generator import generate_resume_pdf

router = APIRouter(prefix="/resumes", tags=["resumes"])


@router.post("")
def save_resume(payload: ResumePayload) -> dict:
    supabase = get_supabase()
    if not supabase:
        return {"id": "local-demo", "saved": False, "message": "Supabase is not configured."}
    result = supabase.table("resumes").insert({"title": payload.personalInfo.fullName, "content": payload.model_dump()}).execute()
    return {"id": result.data[0]["id"], "saved": True}


@router.post("/export-pdf")
def export_pdf(payload: ResumePayload) -> Response:
    pdf = generate_resume_pdf(payload)
    filename = f"{payload.personalInfo.fullName.replace(' ', '_') or 'Resume'}_Resume.pdf"
    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/templates")
def list_templates() -> list[dict]:
    return [
        {"id": "fresher", "name": "Fresher Template", "audience": "MCA students and recent graduates"},
        {"id": "software-engineer", "name": "Software Engineer Template", "audience": "Software developers"},
        {"id": "mca-student", "name": "MCA Student Template", "audience": "Final-year MCA candidates"},
        {"id": "modern-professional", "name": "Modern Professional Template", "audience": "Career switchers"},
    ]
