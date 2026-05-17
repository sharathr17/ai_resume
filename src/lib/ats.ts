import type { AtsReport } from "@/lib/resume-types";

const stopWords = new Set([
  "the",
  "and",
  "with",
  "for",
  "from",
  "that",
  "this",
  "will",
  "are",
  "you",
  "your",
  "our",
  "have",
  "has",
  "into",
  "using",
  "use",
  "role",
  "work",
  "team",
  "teams",
  "candidate",
  "experience",
  "responsibilities",
  "requirements",
]);

const knownSkills = [
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
];

export function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

export function extractKeywords(text: string, limit = 24) {
  const counts = new Map<string, number>();
  tokenize(text).forEach((token) => counts.set(token, (counts.get(token) ?? 0) + 1));

  knownSkills.forEach((skill) => {
    if (text.toLowerCase().includes(skill)) {
      counts.set(skill, (counts.get(skill) ?? 0) + 4);
    }
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword]) => keyword);
}

function scoreOverlap(source: string[], target: string[]) {
  if (!target.length) return 0;
  const sourceSet = new Set(source.map((item) => item.toLowerCase()));
  const hits = target.filter((item) => sourceSet.has(item.toLowerCase()));
  return (hits.length / target.length) * 100;
}

function detectCompleteness(resumeText: string) {
  const lower = resumeText.toLowerCase();
  const sections = ["summary", "skills", "experience", "projects", "education"];
  const present = sections.filter((section) => lower.includes(section));
  return (present.length / sections.length) * 100;
}

function detectFormatting(resumeText: string) {
  const warnings: string[] = [];
  const lower = resumeText.toLowerCase();

  if (lower.includes("table") || lower.includes("|")) {
    warnings.push("Avoid tables or pipe-separated layouts; ATS parsers can scramble columns.");
  }
  if (lower.includes("photo") || lower.includes("headshot")) {
    warnings.push("Remove photos and headshots for anti-bias and parser safety.");
  }
  if (!lower.includes("@")) {
    warnings.push("Add a professional email address in the header.");
  }
  if (!/(linkedin\.com|github\.com)/i.test(resumeText)) {
    warnings.push("Add LinkedIn or GitHub links for recruiter verification.");
  }

  return {
    score: Math.max(45, 100 - warnings.length * 18),
    warnings,
  };
}

function readability(resumeText: string) {
  const sentences = resumeText.split(/[.!?]+/).filter(Boolean);
  const words = tokenize(resumeText);
  if (!sentences.length || !words.length) return 50;
  const avgSentence = words.length / sentences.length;
  const actionVerbBoost = /(developed|built|implemented|optimized|reduced|increased|created|designed)/i.test(
    resumeText,
  )
    ? 12
    : 0;
  const metricBoost = /\d+%|\d+x|\d+\+|\d+ users|\d+ ms/i.test(resumeText) ? 12 : 0;
  return Math.min(100, Math.max(45, 100 - Math.max(0, avgSentence - 20) * 2 + actionVerbBoost + metricBoost));
}

export function calculateAtsReport(resumeText: string, jobDescription: string): AtsReport {
  const jobKeywords = extractKeywords(jobDescription, 30);
  const resumeKeywords = extractKeywords(resumeText, 40);
  const jobSkills = knownSkills.filter((skill) => jobDescription.toLowerCase().includes(skill));
  const resumeSkills = knownSkills.filter((skill) => resumeText.toLowerCase().includes(skill));
  const keywordScore = scoreOverlap(resumeKeywords, jobKeywords);
  const skillsScore = scoreOverlap(resumeSkills, jobSkills.length ? jobSkills : jobKeywords.slice(0, 12));
  const formatting = detectFormatting(resumeText);
  const completenessScore = detectCompleteness(resumeText);
  const readabilityScore = readability(resumeText);
  const matchedKeywords = jobKeywords.filter((keyword) => resumeKeywords.includes(keyword));
  const missingKeywords = jobKeywords.filter((keyword) => !resumeKeywords.includes(keyword)).slice(0, 12);
  const missingSkills = (jobSkills.length ? jobSkills : jobKeywords)
    .filter((skill) => !resumeSkills.includes(skill))
    .slice(0, 10);

  const score =
    keywordScore * 0.4 +
    skillsScore * 0.2 +
    formatting.score * 0.15 +
    completenessScore * 0.15 +
    readabilityScore * 0.1;

  return {
    score,
    keywordScore,
    skillsScore,
    formattingScore: formatting.score,
    completenessScore,
    readabilityScore,
    matchedKeywords,
    missingKeywords,
    missingSkills,
    suggestions: [
      "Mirror exact role keywords from the job description when they truthfully match your experience.",
      "Rewrite weak task bullets using the X-Y-Z formula: accomplished X by doing Y resulting in Z.",
      "Keep the exported PDF single-column with standard headings and one-inch margins.",
      "Add measurable outcomes such as percentage improvement, latency reduction, or user scale.",
    ],
    formattingWarnings: formatting.warnings,
    recruiterReadability: readabilityScore,
  };
}
