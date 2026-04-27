"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/data/section-order";

interface SectionNavigationProps {
  sections: Section[];
}

export function SectionNavigation({ sections }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  const visibleSections = sections.filter(
    (section) => section !== Section.News && section !== Section.Portfolio
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveSection(topmost.target.id as Section);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    visibleSections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleSections]);

  const scrollToSection = (sectionName: Section) => {
    const element = document.getElementById(sectionName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getSectionLabel = (section: Section): string => {
    switch (section) {
      case Section.News:
        return "News";
      case Section.Publication:
        return "Publications";
      case Section.Experience:
        return "Experience";
      case Section.Education:
        return "Education";
      case Section.Portfolio:
        return "Portfolio";
      default:
        return section;
    }
  };

  return (
    <nav className="flex flex-wrap items-center gap-3">
      {visibleSections.map((section) => {
        const isActive = activeSection === section;
        return (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            aria-current={isActive ? "location" : undefined}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full border transition-all duration-300 ${
              isActive
                ? "border-[color:var(--accent)] text-[color:var(--accent-strong)] bg-amber-50/60"
                : "border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-400"
            }`}
          >
            {getSectionLabel(section)}
          </button>
        );
      })}
      <span className="mx-1 h-4 w-px bg-zinc-300" aria-hidden />
      <Link
        href="/blog"
        className="group inline-flex items-center gap-1.5 px-2 py-1.5 text-xs uppercase tracking-wider text-zinc-600 transition-colors hover:text-[color:var(--accent-strong)]"
      >
        Blog
        <ArrowUpRight
          size={12}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </nav>
  );
}
