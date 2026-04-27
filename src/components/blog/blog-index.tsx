import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blog";

interface BlogIndexProps {
  posts: BlogPost[];
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function groupByYear(posts: BlogPost[]): { year: string; items: BlogPost[] }[] {
  const groups = new Map<string, BlogPost[]>();
  for (const p of posts) {
    const year = p.date.slice(0, 4);
    const bucket = groups.get(year) ?? [];
    bucket.push(p);
    groups.set(year, bucket);
  }
  return Array.from(groups.entries())
    .sort((a, b) => (a[0] > b[0] ? -1 : 1))
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => (a.date > b.date ? -1 : 1)),
    }));
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const visible = posts.filter((p) => !p.draft);
  const grouped = groupByYear(visible);

  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="mx-auto max-w-screen-lg px-8 py-24">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors"
        >
          <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
          Home
        </Link>

        <header className="mt-10 max-w-[40rem]">
          <h1 className="font-serif text-4xl font-light tracking-wide text-zinc-900">Writing</h1>
          <div className="mt-4 h-px w-10 bg-[color:var(--accent)]" />
          <p className="mt-6 font-serif italic text-zinc-700">
            Notes on Python, machine learning, and building research infrastructure.
          </p>
        </header>

        <div className="mt-16 space-y-16">
          {grouped.length === 0 && (
            <p className="font-serif italic text-zinc-500">Nothing here yet.</p>
          )}
          {grouped.map((group) => (
            <section key={group.year}>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6">
                {group.year}
              </h2>
              <ul className="space-y-6">
                {group.items.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid grid-cols-1 gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6 py-3"
                    >
                      <span className="font-sans text-xs uppercase tracking-wider text-zinc-500 sm:pt-1">
                        {formatShortDate(post.date)}
                      </span>
                      <div>
                        <h3 className="inline-flex items-baseline gap-2 font-serif text-lg text-zinc-900 transition-colors group-hover:text-[color:var(--accent-strong)]">
                          {post.title}
                          <ArrowUpRight
                            size={12}
                            className="translate-y-0.5 text-zinc-400 transition-transform group-hover:-translate-y-0 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-strong)]"
                          />
                        </h3>
                        <p className="mt-1.5 font-serif italic text-zinc-600">
                          {post.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
