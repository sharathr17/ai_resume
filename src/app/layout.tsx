import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "ResumeForge AI | ATS Resume Builder",
    template: "%s | ResumeForge AI",
  },
  description:
    "Build ATS-optimized resumes with AI, scan against job descriptions, improve recruiter readability, and export professional PDFs.",
  keywords: [
    "ATS resume builder",
    "AI resume builder",
    "resume scanner",
    "MCA resume",
    "software developer resume",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
