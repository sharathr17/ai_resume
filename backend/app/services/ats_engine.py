from __future__ import annotations

import io
import re
from collections import Counter

import pdfplumber
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    import spacy

    try:
        NLP = spacy.load("en_core_web_sm")
    except OSError:
        NLP = spacy.blank("en")
except Exception:  # pragma: no cover - spaCy is optional in local dev
    NLP = None

from app.schemas import AtsReport

KNOWN_SKILLS = [
    "javascript",
    "typescript",
    "react",
    "next.js",
    "node.js",
    "python",
    "fastapi",
    "django",
    "java",
    "spring",
    "postgresql",
    "mysql",
    "mongodb",
    "supabase",
    "aws",
    "docker",
    "kubernetes",
    "git",
    "rest api",
    "graphql",
    "machine learning",
    "scikit-learn",
    "spacy",
    "tailwind css",
    "framer motion",
    "gemini api",
    "ci/cd",
]


def extract_pdf_text(pdf_bytes: bytes) -> tuple[str, list[str]]:
    warnings: list[str] = []
    text_parts: list[str] = []

    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text(x_tolerance=1, y_tolerance=3) or ""
            text_parts.append(extracted)
            tables = page.extract_tables()
            if tables:
                warnings.append("Tables detected; use plain section text for safer ATS parsing.")
            words = page.extract_words() or []
            if _looks_multi_column(words):
                warnings.append("Possible multi-column layout detected; single-column resumes parse more reliably.")

    return "\n".join(text_parts).strip(), warnings


def _looks_multi_column(words: list[dict]) -> bool:
    if len(words) < 40:
        return False
    x_positions = [float(word.get("x0", 0)) for word in words]
    left = sum(1 for x in x_positions if x < 250)
    right = sum(1 for x in x_positions if x > 300)
    return left > 25 and right > 25


def tokenize(text: str) -> list[str]:
    tokens = re.findall(r"[a-zA-Z][a-zA-Z0-9+#./-]{1,}", text.lower())
    return [token for token in tokens if token not in ENGLISH_STOP_WORDS and len(token) > 2]


def extract_keywords(text: str, limit: int = 30) -> list[str]:
    tokens = tokenize(text)
    counts = Counter(tokens)

    for skill in KNOWN_SKILLS:
        if skill in text.lower():
            counts[skill] += 5

    if NLP and NLP.has_pipe("parser"):
        doc = NLP(text[:100_000])
        for chunk in getattr(doc, "noun_chunks", []):
            phrase = chunk.text.lower().strip()
            if 3 <= len(phrase) <= 40 and not any(word in ENGLISH_STOP_WORDS for word in phrase.split()):
                counts[phrase] += 2

    return [keyword for keyword, _ in counts.most_common(limit)]


def cosine_match(resume_text: str, job_description: str) -> float:
    if not resume_text.strip() or not job_description.strip():
        return 0.0
    vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=1000)
    matrix = vectorizer.fit_transform([resume_text, job_description])
    return float(cosine_similarity(matrix[0:1], matrix[1:2])[0][0] * 100)


def overlap_score(source: list[str], target: list[str]) -> float:
    if not target:
        return 0.0
    source_set = {item.lower() for item in source}
    hits = [item for item in target if item.lower() in source_set]
    return len(hits) / len(target) * 100


def formatting_score(text: str, parser_warnings: list[str]) -> tuple[float, list[str]]:
    warnings = list(dict.fromkeys(parser_warnings))
    lower = text.lower()
    if "|" in text:
        warnings.append("Pipe-separated content can behave like columns in ATS systems.")
    if "photo" in lower or "headshot" in lower:
        warnings.append("Remove photos and headshots for anti-bias and parser safety.")
    if "@" not in text:
        warnings.append("Header is missing a professional email address.")
    if not re.search(r"linkedin\.com|github\.com", text, re.I):
        warnings.append("Add LinkedIn or GitHub links for recruiter verification.")
    return max(45.0, 100.0 - len(warnings) * 16), warnings


def completeness_score(text: str) -> float:
    lower = text.lower()
    required = ["summary", "skills", "experience", "projects", "education"]
    present = [section for section in required if section in lower]
    return len(present) / len(required) * 100


def readability_score(text: str) -> float:
    sentences = [sentence for sentence in re.split(r"[.!?]+", text) if sentence.strip()]
    words = tokenize(text)
    if not sentences or not words:
        return 50.0
    average_sentence = len(words) / len(sentences)
    action_bonus = 10 if re.search(r"developed|built|implemented|optimized|reduced|increased|created|designed", text, re.I) else 0
    metric_bonus = 10 if re.search(r"\d+%|\d+x|\d+\+|\d+ users|\d+ ms", text, re.I) else 0
    return min(100.0, max(45.0, 100.0 - max(0, average_sentence - 20) * 2 + action_bonus + metric_bonus))


def calculate_report(resume_text: str, job_description: str, parser_warnings: list[str] | None = None) -> AtsReport:
    parser_warnings = parser_warnings or []
    resume_keywords = extract_keywords(resume_text, 45)
    job_keywords = extract_keywords(job_description, 35)
    job_skills = [skill for skill in KNOWN_SKILLS if skill in job_description.lower()]
    resume_skills = [skill for skill in KNOWN_SKILLS if skill in resume_text.lower()]

    keyword_overlap = overlap_score(resume_keywords, job_keywords)
    semantic_score = cosine_match(resume_text, job_description)
    keyword_score = keyword_overlap * 0.72 + semantic_score * 0.28
    skills_score = overlap_score(resume_skills, job_skills or job_keywords[:12])
    fmt_score, warnings = formatting_score(resume_text, parser_warnings)
    complete_score = completeness_score(resume_text)
    read_score = readability_score(resume_text)

    matched_keywords = [keyword for keyword in job_keywords if keyword in resume_keywords]
    missing_keywords = [keyword for keyword in job_keywords if keyword not in resume_keywords][:12]
    missing_skills = [skill for skill in (job_skills or job_keywords) if skill not in resume_skills][:10]
    score = keyword_score * 0.4 + skills_score * 0.2 + fmt_score * 0.15 + complete_score * 0.15 + read_score * 0.1

    return AtsReport(
        score=round(score, 2),
        keywordScore=round(keyword_score, 2),
        skillsScore=round(skills_score, 2),
        formattingScore=round(fmt_score, 2),
        completenessScore=round(complete_score, 2),
        readabilityScore=round(read_score, 2),
        matchedKeywords=matched_keywords[:16],
        missingKeywords=missing_keywords,
        missingSkills=missing_skills,
        suggestions=[
            "Add exact job-description keywords where they truthfully match your experience.",
            "Rewrite bullets with the X-Y-Z formula and include measurable outcomes.",
            "Use standard headings such as Summary, Skills, Experience, Projects, and Education.",
            "Export a single-column black-and-white PDF without photos, tables, or icons.",
        ],
        formattingWarnings=warnings,
        recruiterReadability=round(read_score, 2),
    )
