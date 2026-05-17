import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AuthClient } from "@/components/auth-client";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in or create a ResumeForge AI account with Supabase Auth.",
};

export default function LoginPage() {
  return (
    <AppShell>
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl place-items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="mx-auto mb-8 max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Supabase Auth</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Welcome back</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Access saved resumes, ATS reports, templates, AI history, and account settings.
            </p>
          </div>
          <AuthClient />
        </div>
      </section>
    </AppShell>
  );
}
