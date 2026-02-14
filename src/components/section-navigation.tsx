"use client";

import { Section } from "@/data/section-order";

interface SectionNavigationProps {
  sections: Section[];
}

export function SectionNavigation({ sections }: SectionNavigationProps) {
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

  // Filter out News and Portfolio from navigation
  const visibleSections = sections.filter(
    (section) => section !== Section.News && section !== Section.Portfolio
  );

  return (
    <nav className="flex flex-wrap gap-3">
      {visibleSections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-600 border border-zinc-300 rounded hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-400 transition-all duration-300"
        >
          {getSectionLabel(section)}
        </button>
      ))}
    </nav>
  );
}
