from fastapi import APIRouter

from app.schemas import AiRequest, AiResponse
from app.services.gemini import run_gemini

router = APIRouter(prefix="/ai", tags=["ai"])


def _respond(task: str, payload: AiRequest) -> AiResponse:
    result, fallback, model = run_gemini(task, payload.content, payload.job_description, payload.role)
    return AiResponse(result=result, used_fallback=fallback, model=model)


@router.post("/summary", response_model=AiResponse)
def generate_summary(payload: AiRequest) -> AiResponse:
    return _respond("summary", payload)


@router.post("/rewrite", response_model=AiResponse)
def rewrite_resume_text(payload: AiRequest) -> AiResponse:
    return _respond("rewrite", payload)


@router.post("/achievement", response_model=AiResponse)
def generate_achievement(payload: AiRequest) -> AiResponse:
    return _respond("achievement", payload)


@router.post("/skills", response_model=AiResponse)
def suggest_skills(payload: AiRequest) -> AiResponse:
    return _respond("skills", payload)


@router.post("/interview-questions", response_model=AiResponse)
def generate_interview_questions(payload: AiRequest) -> AiResponse:
    return _respond("interview", payload)


@router.post("/job-match", response_model=AiResponse)
def analyze_job_match(payload: AiRequest) -> AiResponse:
    return _respond("job_match", payload)
