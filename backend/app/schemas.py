from pydantic import BaseModel, Field


class AtsReport(BaseModel):
    score: float
    keywordScore: float
    skillsScore: float
    formattingScore: float
    completenessScore: float
    readabilityScore: float
    matchedKeywords: list[str] = Field(default_factory=list)
    missingKeywords: list[str] = Field(default_factory=list)
    missingSkills: list[str] = Field(default_factory=list)
    suggestions: list[str] = Field(default_factory=list)
    formattingWarnings: list[str] = Field(default_factory=list)
    recruiterReadability: float


class AiRequest(BaseModel):
    content: str
    job_description: str | None = None
    role: str | None = None


class AiResponse(BaseModel):
    result: str
    model: str
    used_fallback: bool = False


class PersonalInfo(BaseModel):
    fullName: str = ""
    role: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    linkedin: str = ""
    github: str = ""
    portfolio: str = ""


class SkillGroup(BaseModel):
    category: str
    items: list[str]


class ExperienceItem(BaseModel):
    company: str = ""
    role: str = ""
    location: str = ""
    start: str = ""
    end: str = ""
    bullets: list[str] = Field(default_factory=list)


class ProjectItem(BaseModel):
    name: str = ""
    stack: str = ""
    link: str = ""
    bullets: list[str] = Field(default_factory=list)


class EducationItem(BaseModel):
    school: str = ""
    degree: str = ""
    location: str = ""
    graduation: str = ""
    details: str = ""


class CertificationItem(BaseModel):
    name: str = ""
    issuer: str = ""
    date: str = ""


class ResumePayload(BaseModel):
    personalInfo: PersonalInfo
    summary: str = ""
    skills: list[SkillGroup] = Field(default_factory=list)
    experience: list[ExperienceItem] = Field(default_factory=list)
    projects: list[ProjectItem] = Field(default_factory=list)
    education: list[EducationItem] = Field(default_factory=list)
    certifications: list[CertificationItem] = Field(default_factory=list)
    achievements: list[str] = Field(default_factory=list)
    languages: list[str] = Field(default_factory=list)
