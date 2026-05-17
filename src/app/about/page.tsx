import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "About",
  description: "About ResumeForge AI and its ATS-first resume optimization mission.",
};

export default function AboutPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
          ResumeForge AI closes the gap between candidates, recruiters, and ATS software.
        </h1>
        <div className="mt-8 grid gap-6 text-base leading-8 text-slate-600 dark:text-slate-300">
          <p>
            The product is designed for MCA students, freshers, developers, career switchers, and job seekers who need a
            resume that reads well for both humans and automated screening systems.
          </p>
          <p>
            ResumeForge combines a single-column resume builder, an ATS scoring engine, Gemini-powered content assistance,
            Supabase-backed persistence, and recruiter-focused analytics in a deployable SaaS architecture.
          </p>
          <p>
            The guiding rules are simple: no tables, no photos, no icons in exported PDFs, clear headings, measurable
            achievement bullets, and job-description keyword alignment.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
