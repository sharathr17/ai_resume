import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { blogPosts } from "@/lib/resume-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return {
    title: post?.title ?? "Blog",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <AppShell>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">{post.category}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{post.title}</h1>
        <p className="mt-4 text-slate-500">{post.readTime}</p>
        <div className="mt-8 grid gap-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          <p>{post.excerpt}</p>
          <p>
            Recruiters scan quickly, and ATS systems parse literally. Strong resumes use standard headings, measurable
            results, plain PDF text, and role-specific terminology that honestly reflects the candidate&apos;s work.
          </p>
          <p>
            ResumeForge AI applies those rules across the builder, scanner, AI rewrite tools, and templates so job seekers
            can improve quality before submitting applications.
          </p>
        </div>
      </article>
    </AppShell>
  );
}
