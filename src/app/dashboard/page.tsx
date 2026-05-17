import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Brain, FileText, Gauge, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ResumePreview } from "@/components/resume-preview";
import { StatCard } from "@/components/stat-card";
import { defaultResume, defaultSectionOrder } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "ResumeForge AI dashboard for resumes, ATS scans, templates, and AI usage.",
};

export default function DashboardPage() {
  const actions = [
    { href: "/builder", label: "Build resume", detail: "Edit sections, optimize bullets, export PDF" },
    { href: "/analyzer", label: "Scan resume", detail: "Compare resume against a target job description" },
    { href: "/templates", label: "Choose template", detail: "Start from fresher, MCA, engineer, or professional layout" },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Resume command center</h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              Track resume drafts, ATS scans, AI usage, and recruiter readiness from one focused workspace.
            </p>
          </div>
          <Link href="/builder" className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-white dark:text-slate-950">
            Continue draft
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FileText} label="Resumes" value="3" detail="1 active draft, 2 exported versions" />
          <StatCard icon={Gauge} label="Best ATS score" value="92%" detail="Software Developer job match" />
          <StatCard icon={Sparkles} label="AI generations" value="18" detail="Summary, bullets, skills, interviews" />
          <StatCard icon={Brain} label="Readability" value="90%" detail="Recruiter scan score" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Next actions</h2>
            <div className="mt-4 grid gap-3">
              {actions.map((action) => (
                <Link
                  href={action.href}
                  key={action.href}
                  className="group rounded-lg border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-800 dark:hover:bg-indigo-950"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{action.label}</p>
                      <p className="mt-1 text-sm text-slate-500">{action.detail}</p>
                    </div>
                    <ArrowRight className="text-slate-400 transition group-hover:text-indigo-600" size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-900">
            <ResumePreview data={defaultResume} order={defaultSectionOrder} />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
