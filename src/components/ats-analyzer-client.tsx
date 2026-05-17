"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileUp, Gauge, Loader2, Search } from "lucide-react";
import { calculateAtsReport } from "@/lib/ats";
import type { AtsReport } from "@/lib/resume-types";
import { defaultResume } from "@/lib/resume-data";
import { formatPercent } from "@/lib/utils";

const sampleJobDescription =
  "We are hiring a Software Developer with React, Next.js, TypeScript, Python, FastAPI, PostgreSQL, REST API, Git, Docker, and cloud deployment experience. The candidate should build scalable dashboards, optimize API performance, and collaborate with product teams.";

function resumeToText() {
  return [
    defaultResume.personalInfo.fullName,
    "Professional Summary",
    defaultResume.summary,
    "Technical Skills",
    defaultResume.skills.map((group) => `${group.category}: ${group.items.join(", ")}`).join("\n"),
    "Experience",
    defaultResume.experience.map((item) => item.bullets.join("\n")).join("\n"),
    "Projects",
    defaultResume.projects.map((project) => `${project.name}\n${project.stack}\n${project.bullets.join("\n")}`).join("\n"),
    "Education",
    defaultResume.education.map((item) => `${item.degree} ${item.school} ${item.details}`).join("\n"),
  ].join("\n");
}

function ScoreCard({ label, value, weight }: { label: string; value: number; weight: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
        <span className="text-xs font-semibold text-slate-500">{weight}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-900">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${Math.min(100, value)}%` }} />
      </div>
      <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{formatPercent(value)}</p>
    </div>
  );
}

function getApiBase() {
  const configuredApiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (configuredApiBase) return configuredApiBase;
  if (process.env.NODE_ENV === "development") return "http://127.0.0.1:8000";
  return undefined;
}

export function AtsAnalyzerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [report, setReport] = useState<AtsReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const canScan = useMemo(() => Boolean(jobDescription.trim() && (file || resumeText.trim())), [file, jobDescription, resumeText]);

  const runScan = async () => {
    setIsLoading(true);
    setNotice(null);

    try {
      const apiBase = getApiBase();
      if (file && apiBase) {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("job_description", jobDescription);
        const response = await fetch(`${apiBase}/api/ats/scan`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error("ATS API unavailable");
        const payload = (await response.json()) as AtsReport;
        setReport(payload);
        return;
      }

      const fallbackText = resumeText.trim() || resumeToText();
      if (file && !apiBase) {
        setNotice("Backend URL is not configured, so this scan used the local text fallback.");
      }
      setReport(calculateAtsReport(fallbackText, jobDescription));
    } catch {
      setNotice("The backend scan failed, so ResumeForge used the local ATS scoring fallback.");
      setReport(calculateAtsReport(resumeText.trim() || resumeToText(), jobDescription));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">ATS Resume Scanner</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Upload a PDF and paste a job description to simulate keyword, skills, formatting, completeness, and readability checks.
          </p>
        </div>

        <div className="mt-6 grid gap-5">
          <label className="grid cursor-pointer place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-indigo-950">
            <FileUp className="text-indigo-600" size={28} />
            <span className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
              {file ? file.name : "Upload resume PDF"}
            </span>
            <span className="mt-1 text-xs text-slate-500">PDF extraction runs through the FastAPI backend</span>
            <input
              className="sr-only"
              type="file"
              accept="application/pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Resume text fallback
            <textarea
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              className="min-h-36 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-950"
              placeholder="Paste extracted resume text for local demo scans."
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Job description
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              className="min-h-48 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-950"
            />
          </label>

          <button
            type="button"
            onClick={runScan}
            disabled={!canScan || isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            Scan Resume
          </button>
        </div>
      </motion.section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
        {report ? (
          <div>
            {notice ? (
              <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
                {notice}
              </div>
            ) : null}
            <div className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Match percentage</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {formatPercent(report.score)}
                </h2>
                <p className="mt-2 text-sm text-slate-500">Recruiter readability: {formatPercent(report.recruiterReadability)}</p>
              </div>
              <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-indigo-600 bg-indigo-50 text-3xl font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                {Math.round(report.score)}
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <ScoreCard label="Keyword Match" value={report.keywordScore} weight="40%" />
              <ScoreCard label="Skills Match" value={report.skillsScore} weight="20%" />
              <ScoreCard label="Formatting" value={report.formattingScore} weight="15%" />
              <ScoreCard label="Completeness" value={report.completenessScore} weight="15%" />
              <ScoreCard label="Readability" value={report.readabilityScore} weight="10%" />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  Matched keywords
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {report.matchedKeywords.map((keyword) => (
                    <span key={keyword} className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
                  <AlertTriangle size={18} className="text-amber-600" />
                  Missing skills
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {report.missingSkills.concat(report.missingKeywords).slice(0, 14).map((keyword) => (
                    <span key={keyword} className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="font-semibold text-slate-950 dark:text-white">Formatting warnings</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {(report.formattingWarnings.length ? report.formattingWarnings : ["No major parser formatting issues detected."]).map(
                    (item) => (
                      <li key={item}>- {item}</li>
                    ),
                  )}
                </ul>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="font-semibold text-slate-950 dark:text-white">Keyword suggestions</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {report.suggestions.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid min-h-[520px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white text-center dark:border-slate-800 dark:bg-slate-950">
            <div className="max-w-sm px-6">
              <Gauge className="mx-auto text-indigo-600" size={36} />
              <h2 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">ATS report appears here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                ResumeForge will show score breakdown, missing skills, keyword suggestions, formatting warnings, and recruiter readability.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
