"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { useThemeStore } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/builder", label: "Builder" },
  { href: "/analyzer", label: "ATS Analyzer" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/86">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
                  pathname === item.href && "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMode}
              className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              aria-label="Toggle color mode"
              title={mode === "light" ? "Dark mode" : "Light mode"}
            >
              {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link
              href="/login"
              className="hidden rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-800 dark:text-slate-100 md:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/builder"
              className="hidden rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-100 sm:inline-flex"
            >
              Build Resume
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Open menu"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
            <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-slate-500 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <Brand />
            <p className="mt-4 max-w-xl">
              ResumeForge AI helps students, freshers, developers, and career switchers build parser-safe resumes and
              understand ATS fit before applying.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 self-end">
            <Link href="/settings" className="hover:text-indigo-600">
              Settings
            </Link>
            <Link href="/admin" className="hover:text-indigo-600">
              Admin
            </Link>
            <Link href="/about" className="hover:text-indigo-600">
              Company
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
