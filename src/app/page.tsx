import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  FileText,
  Gauge,
  Layers3,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { faqs, landingFeatures, resumeTemplates, testimonials } from "@/lib/resume-data";

const scoreRows = [
  ["Keyword Match", "34 / 40", "85%"],
  ["Skills Match", "18 / 20", "90%"],
  ["Formatting", "15 / 15", "100%"],
  ["Completeness", "13 / 15", "87%"],
  ["Readability", "9 / 10", "90%"],
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="ats-grid border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl content-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
              <Sparkles size={16} />
              AI resume builder and ATS simulator
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Build ATS-Optimized Resumes with AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Create professional resumes, improve ATS scores, and land more interviews using AI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 dark:bg-white dark:text-slate-950"
              >
                Build Resume
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/analyzer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                Scan Resume
                <FileSearch size={17} />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                View Templates
                <Layers3 size={17} />
              </Link>
            </div>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 text-sm">
              {[
                ["ATS score", "92%"],
                ["PDF rules", "1 in"],
                ["Templates", "4"],
              ].map(([label, value]) => (
                <div key={label} className="border-l border-slate-200 pl-4 dark:border-slate-800">
                  <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
            <div className="grid gap-4 md:grid-cols-[0.86fr_1.14fr]">
              <div className="resume-paper rounded-md border border-slate-200 p-6 text-[10px] leading-relaxed">
                <div className="border-b border-slate-300 pb-3 text-center">
                  <div className="text-lg font-bold tracking-wide">SHARATH R</div>
                  <div className="mt-1 text-[9px]">Bengaluru | sharath@example.com | LinkedIn | GitHub</div>
                </div>
                {["PROFESSIONAL SUMMARY", "TECHNICAL SKILLS", "PROJECTS", "EDUCATION"].map((section, index) => (
                  <div key={section} className="mt-4">
                    <div className="text-[10px] font-bold">{section}</div>
                    <div className="mt-1 h-2 w-full rounded-sm bg-slate-200" />
                    <div className="mt-1 h-2 w-5/6 rounded-sm bg-slate-200" />
                    {index === 2 ? <div className="mt-1 h-2 w-2/3 rounded-sm bg-slate-200" /> : null}
                  </div>
                ))}
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">ATS scan result</p>
                    <p className="text-xs text-slate-500">Software Developer JD</p>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-indigo-600 text-lg font-bold text-indigo-700 dark:text-indigo-200">
                    92
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {scoreRows.map(([label, value, width]) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-xs text-slate-500">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className="h-2 rounded-full bg-indigo-600" style={{ width }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                  14 matched keywords. Add Docker, CI/CD, and PostgreSQL indexing for stronger fit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Core features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Everything a job seeker needs before applying.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {landingFeatures.map((feature, index) => {
              const Icon = [FileText, Gauge, FileSearch, CheckCircle2][index];
              return (
                <article
                  key={feature.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <Icon className="text-indigo-600" size={24} />
                  <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">ATS demo</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Weighted scoring that explains the why.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              The scanner follows the requested breakdown: 40% keyword match, 20% skills match, 15% formatting, 15%
              completeness, and 10% readability.
            </p>
          </div>
          <div className="grid gap-3">
            {scoreRows.map(([label, value, width]) => (
              <div key={label} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-900">
                  <div className="h-2 rounded-full bg-indigo-600" style={{ width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Resume templates</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Clean layouts for real ATS parsing.
              </h2>
            </div>
            <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              Explore all templates
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resumeTemplates.map((template) => (
              <article
                key={template.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-950 dark:text-white">{template.name}</h3>
                  <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                    {template.score}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{template.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
                <MessageSquareText className="text-indigo-600" size={22} />
                <blockquote className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-slate-950 dark:text-white">{testimonial.name}</span>
                  <span className="block text-slate-500">{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Practical answers for ATS-first resumes.
          </h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-950 dark:text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
