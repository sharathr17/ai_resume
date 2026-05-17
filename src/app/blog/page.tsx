import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { blogPosts } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Resume tips, ATS optimization, career guidance, and interview preparation.",
};

export default function BlogPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Career guidance built for ATS-era hiring</h1>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{post.category}</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-slate-500">{post.readTime}</span>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                  Read
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
