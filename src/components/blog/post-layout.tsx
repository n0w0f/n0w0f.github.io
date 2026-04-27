import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Prose } from "@/components/blog/prose";
import { FloatingToc } from "@/components/blog/floating-toc";
import { computeReadingTime } from "@/lib/reading-time";
import type { BlogPost } from "@/data/blog";
import type { TocItem } from "@/content/blog";

interface PostLayoutProps {
  meta: BlogPost;
  tocItems: TocItem[];
  children: ReactNode;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostLayout({ meta, tocItems, children }: PostLayoutProps) {
  const readingTime = computeReadingTime(children);

  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="mx-auto max-w-screen-xl px-8 py-24 lg:grid lg:grid-cols-12 lg:gap-8">
        <article className="lg:col-span-7 lg:col-start-3">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors"
          >
            <ArrowLeft
              size={12}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            All writing
          </Link>

          <header className="mt-10">
            <h1 className="font-serif text-3xl font-light tracking-wide text-zinc-900 md:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-6 font-sans text-xs uppercase tracking-wider text-zinc-500">
              {formatDate(meta.date)} · {readingTime}
            </p>
            <div className="mt-4 h-px w-10 bg-[color:var(--accent)]" />
            <p className="mt-6 font-serif italic text-zinc-700 max-w-[38rem]">
              {meta.description}
            </p>
          </header>

          <div className="mt-12">
            <Prose>{children}</Prose>
          </div>

          <footer className="mt-24 flex items-center justify-between border-t border-zinc-200 pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors"
            >
              <ArrowLeft
                size={12}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              All writing
            </Link>
            <p className="font-sans text-xs text-zinc-500">
              Last updated {formatDate(meta.date)}
            </p>
          </footer>
        </article>

        <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
          <div className="pt-20">
            <FloatingToc items={tocItems} />
          </div>
        </aside>
      </div>
    </div>
  );
}
