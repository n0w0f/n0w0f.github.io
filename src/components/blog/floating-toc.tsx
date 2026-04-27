"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/content/blog";

interface FloatingTocProps {
  items: TocItem[];
}

export function FloatingToc({ items }: FloatingTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-12">
      <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((it) => {
          const isActive = activeId === it.id;
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => scrollTo(it.id)}
                aria-current={isActive ? "location" : undefined}
                className={`block w-full text-left border-l-2 pl-3 py-1 font-sans text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-[color:var(--accent)] text-[color:var(--accent-strong)]"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
