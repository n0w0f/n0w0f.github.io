"use client";

import { Section } from "@/data/section-order";
import { sectionConfig } from "@/data/section-config";
import { CollapsibleSection } from "@/components/collapsible-section";
import { EnhancedNewsEntry } from "@/components/enhanced-news-entry";
import { PublicationEntry } from "@/components/publication-entry";
import { ExperienceEntry } from "@/components/experience-entry";
import { EducationEntry } from "@/components/education-entry";
import { PortfolioEntry } from "@/components/portfolio-entry";
import type { News } from "@/data/news";
import type { Publication } from "@/data/publication";
import type { Experience } from "@/data/experience";
import type { Education } from "@/data/education";
import type { Portfolio } from "@/data/portfolio";

interface SectionsContainerProps {
  sectionOrder: Section[];
  newsData: News[];
  publicationData: Publication[];
  experienceData: Experience[];
  educationData: Education[];
  portfolioData: Portfolio[];
}

export function SectionsContainer({
  sectionOrder,
  newsData,
  publicationData,
  experienceData,
  educationData,
  portfolioData,
}: SectionsContainerProps) {
  return (
    <>
      {sectionOrder.map((sectionName) => {
        const config = sectionConfig[sectionName];

        switch (sectionName) {
          case Section.News:
            return (
              newsData.length > 0 && (
                <div key={sectionName} id={sectionName}>
                  <CollapsibleSection
                    title="News"
                    defaultCollapsed={config.isCollapsed}
                    visibleItemsWhenCollapsed={config.visibleItemsWhenCollapsed}
                  >
                    {newsData.map((news, index) => (
                      <div key={index}>
                        <EnhancedNewsEntry news={news} />
                      </div>
                    ))}
                  </CollapsibleSection>
                </div>
              )
            );

          case Section.Publication:
            return (
              publicationData.length > 0 && (
                <div key={sectionName} id={sectionName}>
                  <CollapsibleSection
                    title="Publications"
                    defaultCollapsed={config.isCollapsed}
                    visibleItemsWhenCollapsed={config.visibleItemsWhenCollapsed}
                  >
                    {publicationData.map((publication, index) => (
                      <div key={index}>
                        <PublicationEntry publication={publication} />
                        {index < publicationData.length - 1 && (
                          <div className="h-px bg-zinc-200 my-8" />
                        )}
                      </div>
                    ))}
                  </CollapsibleSection>
                </div>
              )
            );

          case Section.Experience:
            return (
              experienceData.length > 0 && (
                <div key={sectionName} id={sectionName}>
                  <CollapsibleSection
                    title="Experience"
                    defaultCollapsed={config.isCollapsed}
                    visibleItemsWhenCollapsed={config.visibleItemsWhenCollapsed}
                  >
                    {experienceData.map((experience, index) => (
                      <ExperienceEntry key={index} experience={experience} />
                    ))}
                  </CollapsibleSection>
                </div>
              )
            );

          case Section.Education:
            return (
              educationData.length > 0 && (
                <div key={sectionName} id={sectionName}>
                  <CollapsibleSection
                    title="Education"
                    defaultCollapsed={config.isCollapsed}
                    visibleItemsWhenCollapsed={config.visibleItemsWhenCollapsed}
                  >
                    {educationData.map((education, index) => (
                      <EducationEntry key={index} education={education} />
                    ))}
                  </CollapsibleSection>
                </div>
              )
            );

          case Section.Portfolio:
            return (
              portfolioData.length > 0 && (
                <div key={sectionName} id={sectionName}>
                  <CollapsibleSection
                    title="Portfolio"
                    defaultCollapsed={config.isCollapsed}
                    visibleItemsWhenCollapsed={config.visibleItemsWhenCollapsed}
                  >
                    {portfolioData.map((portfolio, index) => (
                      <PortfolioEntry key={index} portfolio={portfolio} />
                    ))}
                  </CollapsibleSection>
                </div>
              )
            );

          default:
            return null;
        }
      })}
    </>
  );
}
