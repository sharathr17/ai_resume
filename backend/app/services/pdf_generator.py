from __future__ import annotations

import io
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

from app.schemas import ResumePayload


def _para(text: str, style: ParagraphStyle) -> Paragraph:
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return Paragraph(safe, style)


def generate_resume_pdf(resume: ResumePayload) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=LETTER,
        rightMargin=inch,
        leftMargin=inch,
        topMargin=inch,
        bottomMargin=inch,
        title=f"{resume.personalInfo.fullName} Resume",
    )
    styles = getSampleStyleSheet()
    title = ParagraphStyle("ResumeTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=16, leading=18, alignment=1, textColor="#111111")
    body = ParagraphStyle("ResumeBody", parent=styles["BodyText"], fontName="Helvetica", fontSize=10, leading=13, textColor="#111111")
    heading = ParagraphStyle("ResumeHeading", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10, leading=12, spaceBefore=10, borderPadding=0, textColor="#111111")
    bullet = ParagraphStyle("ResumeBullet", parent=body, leftIndent=12, firstLineIndent=-8)
    story = []

    info = resume.personalInfo
    story.append(_para(info.fullName.upper(), title))
    story.append(_para(info.role, body))
    story.append(
        _para(
            " | ".join(filter(None, [info.location, info.phone, info.email, info.linkedin, info.github, info.portfolio])),
            body,
        ),
    )
    story.append(Spacer(1, 8))

    def add_section(name: str):
        story.append(_para(name.upper(), heading))

    if resume.summary:
        add_section("Professional Summary")
        story.append(_para(resume.summary, body))
    if resume.skills:
        add_section("Technical Skills")
        for group in resume.skills:
            story.append(_para(f"<b>{group.category}:</b> {', '.join(group.items)}", body))
    if resume.experience:
        add_section("Experience")
        for item in resume.experience:
            story.append(_para(f"<b>{item.role}</b>, {item.company} ({item.start} - {item.end})", body))
            for line in item.bullets:
                story.append(_para(f"- {line}", bullet))
    if resume.projects:
        add_section("Projects")
        for project in resume.projects:
            story.append(_para(f"<b>{project.name}</b> | {project.stack}", body))
            for line in project.bullets:
                story.append(_para(f"- {line}", bullet))
    if resume.education:
        add_section("Education")
        for item in resume.education:
            story.append(_para(f"<b>{item.degree}</b>, {item.school}, {item.graduation}. {item.details}", body))
    if resume.certifications:
        add_section("Certifications")
        for cert in resume.certifications:
            story.append(_para(f"{cert.name}, {cert.issuer}, {cert.date}", body))
    if resume.achievements:
        add_section("Achievements")
        for item in resume.achievements:
            story.append(_para(f"- {item}", bullet))
    if resume.languages:
        add_section("Languages")
        story.append(_para(", ".join(resume.languages), body))

    doc.build(story)
    return buffer.getvalue()
