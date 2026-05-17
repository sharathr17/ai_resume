import type { ResumeData, ResumeSectionKey } from "@/lib/resume-types";

export const sectionLabels: Record<ResumeSectionKey, string> = {
  summary: "Professional Summary",
  skills: "Technical Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
  achievements: "Achievements",
  languages: "Languages",
};

export const defaultSectionOrder: ResumeSectionKey[] = [
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "achievements",
  "languages",
];

export const defaultResume: ResumeData = {
  personalInfo: {
    fullName: "Sharath R",
    role: "MCA Student | Full-Stack Developer",
    email: "sharath@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    linkedin: "linkedin.com/in/sharath",
    github: "github.com/sharath",
    portfolio: "sharath.dev",
  },
  summary:
    "MCA student and full-stack developer with experience building React, Next.js, FastAPI, and PostgreSQL applications. Strong foundation in REST APIs, authentication, database design, and ATS-friendly product workflows.",
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["FastAPI", "REST APIs", "PostgreSQL", "Supabase"] },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "Render"] },
  ],
  experience: [
    {
      company: "Open Source",
      role: "Full-Stack Developer",
      location: "Remote",
      start: "Jan 2025",
      end: "Present",
      bullets: [
        "Developed REST API authentication system reducing unauthorized access risks by 40%.",
        "Built reusable React components improving feature delivery speed across dashboard screens.",
      ],
    },
  ],
  projects: [
    {
      name: "ResumeForge AI",
      stack: "Next.js, FastAPI, Supabase, Gemini API",
      link: "github.com/sharath/resumeforge-ai",
      bullets: [
        "Built ATS simulator that compares resume text with job descriptions using TF-IDF keyword matching.",
        "Generated AI-enhanced resume summaries and quantified bullets using the X-Y-Z achievement formula.",
      ],
    },
    {
      name: "Student Placement Portal",
      stack: "React, Python, PostgreSQL",
      link: "",
      bullets: [
        "Implemented role-based dashboards for students, coordinators, and recruiters.",
        "Optimized SQL queries reducing placement report load time by 35%.",
      ],
    },
  ],
  education: [
    {
      school: "ABC Institute of Technology",
      degree: "Master of Computer Applications",
      location: "Karnataka, India",
      graduation: "Expected 2026",
      details: "Relevant coursework: Data Structures, DBMS, Cloud Computing, Machine Learning",
    },
  ],
  certifications: [{ name: "Google Cloud Computing Foundations", issuer: "Google Cloud", date: "2025" }],
  achievements: [
    "Finalist in college-level hackathon for building an AI-powered placement preparation tool.",
    "Maintained 8.6 CGPA while contributing to production-style full-stack projects.",
  ],
  languages: ["English", "Kannada", "Hindi"],
};

export const resumeTemplates = [
  {
    id: "fresher",
    name: "Fresher Template",
    audience: "MCA students and recent graduates",
    score: 96,
    description: "Education-first structure with projects, coursework, technical skills, and measurable achievements.",
    strengths: ["Single column", "Project heavy", "Coursework ready"],
  },
  {
    id: "software-engineer",
    name: "Software Engineer Template",
    audience: "Developers and engineers",
    score: 98,
    description: "Recruiter-friendly layout prioritizing stack, impact bullets, shipped systems, and production metrics.",
    strengths: ["Tech stack scan", "Impact bullets", "Clean hierarchy"],
  },
  {
    id: "mca-student",
    name: "MCA Student Template",
    audience: "Final-year MCA candidates",
    score: 97,
    description: "Academic and placement-oriented resume with projects, certifications, internships, and programming skills.",
    strengths: ["ATS headings", "Certification space", "Placement ready"],
  },
  {
    id: "modern-professional",
    name: "Modern Professional Template",
    audience: "Career switchers and working professionals",
    score: 95,
    description: "Balanced summary, experience, and transferable skills layout without graphics that confuse ATS parsers.",
    strengths: ["Readable summary", "Transferable skills", "No parser traps"],
  },
];

export const landingFeatures = [
  {
    title: "AI Resume Builder",
    description: "Create ATS-safe resumes with guided sections, auto-save drafts, and AI rewrites tuned for recruiter scan patterns.",
  },
  {
    title: "ATS Resume Scanner",
    description: "Upload a PDF, paste a job description, and get a weighted score for keywords, skills, formatting, completeness, and readability.",
  },
  {
    title: "Keyword Match System",
    description: "See matched terms, missing skills, formatting warnings, and practical fixes before applying.",
  },
  {
    title: "PDF Export",
    description: "Export clean single-column resumes with one-inch margins, sans-serif typography, and black-and-white text.",
  },
];

export const testimonials = [
  {
    quote: "ResumeForge turned my academic projects into measurable software engineering bullets without making the resume look over-designed.",
    name: "Aishwarya P",
    role: "MCA student",
  },
  {
    quote: "The ATS report showed exactly which backend keywords were missing before I applied to a FastAPI role.",
    name: "Rohan S",
    role: "Junior developer",
  },
  {
    quote: "The live preview forced a clean single-column resume, which made recruiter review much easier.",
    name: "Meera N",
    role: "Career switcher",
  },
];

export const faqs = [
  {
    question: "Are the PDF templates ATS friendly?",
    answer: "Yes. Templates are single-column, text-first, black-and-white, and avoid tables, photos, icons, and complex layouts.",
  },
  {
    question: "How is the ATS score calculated?",
    answer: "The score combines keyword match, skills match, formatting, completeness, and recruiter readability using weighted rules.",
  },
  {
    question: "Can freshers use it without work experience?",
    answer: "Yes. The fresher and MCA templates prioritize projects, education, coursework, certifications, and measurable academic work.",
  },
  {
    question: "Does Gemini write the resume automatically?",
    answer: "Gemini assists with summaries, bullets, skills, interview questions, and job match analysis while keeping user edits in control.",
  },
];

export const blogPosts = [
  {
    slug: "ats-resume-format",
    title: "The ATS Resume Format That Still Works in 2026",
    excerpt: "Single-column structure, standard headings, PDF export, and why visual templates often fail automated parsing.",
    category: "ATS Optimization",
    readTime: "6 min read",
  },
  {
    slug: "xyz-resume-bullets",
    title: "How to Write Resume Bullets with the X-Y-Z Formula",
    excerpt: "Turn task-based statements into quantified achievements recruiters can understand in seconds.",
    category: "Resume Tips",
    readTime: "5 min read",
  },
  {
    slug: "mca-fresher-resume",
    title: "MCA Fresher Resume Guide for Software Roles",
    excerpt: "A practical structure for education, projects, technical skills, and placement-ready summaries.",
    category: "Career Guidance",
    readTime: "7 min read",
  },
];
