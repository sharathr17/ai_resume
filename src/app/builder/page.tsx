import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ResumeBuilderClient } from "@/components/resume-builder-client";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build an ATS-friendly resume with live preview, AI enhancement, drag ordering, and PDF export.",
};

export default function BuilderPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ResumeBuilderClient />
      </div>
    </AppShell>
  );
}
