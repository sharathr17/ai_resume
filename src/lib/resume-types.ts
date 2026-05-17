export type ResumeSectionKey =
  | "summary"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "certifications"
  | "achievements"
  | "languages";

export type PersonalInfo = {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type ProjectItem = {
  name: string;
  stack: string;
  link: string;
  bullets: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  location: string;
  graduation: string;
  details: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  date: string;
};

export type ResumeData = {
  personalInfo: PersonalInfo;
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: string[];
  languages: string[];
};

export type AtsReport = {
  score: number;
  keywordScore: number;
  skillsScore: number;
  formattingScore: number;
  completenessScore: number;
  readabilityScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  missingSkills: string[];
  suggestions: string[];
  formattingWarnings: string[];
  recruiterReadability: number;
};
