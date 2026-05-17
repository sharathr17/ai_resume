import Link from "next/link";
import { FileText } from "lucide-react";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="ResumeForge AI home">
      <span className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-indigo-600 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <FileText size={20} strokeWidth={2.4} />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-semibold tracking-tight text-slate-950 dark:text-white">ResumeForge AI</span>
        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">ATS resume studio</span>
      </span>
    </Link>
  );
}
