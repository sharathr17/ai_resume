import type { Metadata } from "next";
import { Activity, FileText, Gauge, Sparkles, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";

export const metadata: Metadata = {
  title: "Admin",
  description: "ResumeForge AI admin analytics for users, resumes, ATS scans, and AI usage.",
};

export default function AdminPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Admin panel</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Product analytics</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={Users} label="Users" value="1,284" detail="Monthly active job seekers" />
          <StatCard icon={FileText} label="Resumes" value="3,918" detail="Generated and saved drafts" />
          <StatCard icon={Gauge} label="ATS scans" value="8,402" detail="Job-description comparisons" />
          <StatCard icon={Sparkles} label="AI calls" value="12,670" detail="Gemini summary and rewrite requests" />
          <StatCard icon={Activity} label="Conversion" value="11.8%" detail="Free to Pro upgrade model" />
        </div>
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Usage pipeline</h2>
          <div className="mt-5 grid gap-3">
            {["Signup", "First resume draft", "First ATS scan", "AI optimization", "PDF export"].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <span className="w-36 text-sm font-medium text-slate-600 dark:text-slate-300">{step}</span>
                <div className="h-3 flex-1 rounded-full bg-slate-100 dark:bg-slate-900">
                  <div className="h-3 rounded-full bg-indigo-600" style={{ width: `${96 - index * 13}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
