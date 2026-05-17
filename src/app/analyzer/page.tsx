import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AtsAnalyzerClient } from "@/components/ats-analyzer-client";

export const metadata: Metadata = {
  title: "ATS Analyzer",
  description: "Scan resumes against job descriptions with weighted ATS scoring and keyword recommendations.",
};

export default function AnalyzerPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AtsAnalyzerClient />
      </div>
    </AppShell>
  );
}
