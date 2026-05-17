"use client";

import { useState } from "react";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { createBrowserSupabase, hasSupabaseEnv } from "@/lib/supabase-browser";
import { cn } from "@/lib/utils";

export function AuthClient() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("demo@resumeforge.ai");
  const [password, setPassword] = useState("password123");
  const [status, setStatus] = useState("Demo mode is active until Supabase environment variables are configured.");
  const [loading, setLoading] = useState(false);
  const supabaseReady = hasSupabaseEnv();

  const submit = async () => {
    setLoading(true);
    const supabase = createBrowserSupabase();
    try {
      if (!supabase) {
        setStatus("Demo sign-in completed locally. Add Supabase keys to enable real authentication.");
        return;
      }
      const result =
        mode === "login"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });
      if (result.error) {
        setStatus(result.error.message);
      } else {
        setStatus(mode === "login" ? "Signed in with Supabase Auth." : "Registration started. Check email settings in Supabase.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="grid grid-cols-2 rounded-md bg-slate-100 p-1 dark:bg-slate-900">
        {(["login", "register"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-semibold capitalize",
              mode === item ? "bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-white" : "text-slate-500",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
          <span className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-indigo-950"
            />
          </span>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Password
          <span className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:ring-indigo-950"
            />
          </span>
        </label>
        <button
          type="button"
          onClick={submit}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-white dark:text-slate-950"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : null}
          {mode === "login" ? "Sign in" : "Create account"}
        </button>
        <p className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          {supabaseReady ? status : "Supabase is not configured. The UI remains usable in local demo mode."}
        </p>
      </div>
    </div>
  );
}
