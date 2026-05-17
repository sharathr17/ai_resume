import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Pricing",
  description: "ResumeForge AI pricing plans for students, job seekers, and placement teams.",
};

const plans = [
  {
    name: "Starter",
    price: "$0",
    detail: "For students and freshers",
    features: ["1 resume draft", "3 ATS scans monthly", "Basic templates", "Client PDF export"],
  },
  {
    name: "Pro",
    price: "$9",
    detail: "For active job seekers",
    features: ["Unlimited drafts", "100 ATS scans monthly", "Gemini AI rewrites", "Job match analysis", "Interview questions"],
  },
  {
    name: "Campus",
    price: "Custom",
    detail: "For MCA departments and placement cells",
    features: ["Admin analytics", "Student usage reports", "Template governance", "Bulk resume review"],
  },
];

export default function PricingPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Pricing</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Start free, scale when the job search gets serious</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            The architecture supports zero-cost student deployment while leaving room for SaaS subscription tiers.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{plan.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{plan.detail}</p>
              <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{plan.price}</p>
              <ul className="mt-6 grid gap-3 text-sm text-slate-700 dark:text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="mt-8 inline-flex w-full justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-white dark:text-slate-950">
                Get started
              </Link>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
