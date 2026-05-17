from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.schemas import AtsReport
from app.services.ats_engine import calculate_report, extract_pdf_text

router = APIRouter(prefix="/ats", tags=["ats"])


@router.post("/scan", response_model=AtsReport)
async def scan_resume(resume: UploadFile = File(...), job_description: str = Form(...)) -> AtsReport:
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF resumes are supported.")
    pdf_bytes = await resume.read()
    text, warnings = extract_pdf_text(pdf_bytes)
    if not text:
        raise HTTPException(status_code=422, detail="Could not extract text from PDF. Use an ATS-safe text PDF.")
    return calculate_report(text, job_description, warnings)


@router.post("/scan-text", response_model=AtsReport)
def scan_resume_text(resume_text: str = Form(...), job_description: str = Form(...)) -> AtsReport:
    return calculate_report(resume_text, job_description, [])
