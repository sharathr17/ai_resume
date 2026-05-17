import type { Metadata } from "next";
import { Bell, Database, KeyRound, Palette } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure profile, AI usage, Supabase auth, ATS preferences, and theme settings.",
};

const settings = [
  { icon: Palette, title: "Appearance", detail: "Theme preference is stored locally with Zustand persistence." },
  { icon: KeyRound, title: "Authentication", detail: "Supabase Auth handles email/password sessions and future OAuth providers." },
  { icon: Database, title: "Data storage", detail: "Resumes, reports, templates, and AI history map to Supabase Postgres tables." },
  { icon: Bell, title: "Notifications", detail: "Product hooks are ready for scan completion and weekly optimization reminders." },
];

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Settings</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Workspace configuration</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {settings.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <item.icon className="text-indigo-600" size={22} />
              <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
