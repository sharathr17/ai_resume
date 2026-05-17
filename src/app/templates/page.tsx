import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { resumeTemplates } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Resume Templates",
  description: "ATS-safe resume templates for freshers, MCA students, software engineers, and professionals.",
};

export default function TemplatesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Templates</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">ATS-safe layouts without parser traps</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Every template uses a single-column structure, standard headings, black-and-white PDF text, and recruiter-readable spacing.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {resumeTemplates.map((template) => (
            <article key={template.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{template.name}</h2>
                  <p className="mt-1 text-sm font-medium text-indigo-600">{template.audience}</p>
                </div>
                <span className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                  ATS {template.score}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{template.description}</p>
              <ul className="mt-5 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                {template.strengths.map((strength) => (
                  <li key={strength} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    {strength}
                  </li>
                ))}
              </ul>
              <Link href="/builder" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                Use template
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
