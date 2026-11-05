import { educationData } from "@/data/education";
import { publicationData } from "@/data/publication";
import { ProfileSection } from "@/components/profile-section";
import { aboutMe } from "@/data/aboutme";
import { newsData } from "@/data/news";
import { experienceData } from "@/data/experience";
import { portfolioData } from "@/data/portfolio";
import { sectionOrder } from "@/data/section-order";
import { SectionsContainer } from "@/components/sections-container";
import { SectionNavigation } from "@/components/section-navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-12 sm:px-10 sm:pt-20 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-12">
              <ProfileSection aboutMe={aboutMe} />
            </div>
          </div>

          <div className="space-y-14 lg:col-span-8 lg:space-y-16">
            {aboutMe.description && (
              <section className="border-b border-[color:var(--rule)] pb-10">
                <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  About
                </p>
                <p
                  className="max-w-[68ch] font-serif text-[17px] leading-[1.85] text-zinc-700 [&_a]:text-[color:var(--accent-strong)] [&_a]:underline [&_a]:decoration-amber-800/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-amber-800"
                  dangerouslySetInnerHTML={{ __html: aboutMe.description }}
                />
              </section>
            )}

            <SectionNavigation sections={sectionOrder} />

            <SectionsContainer
              sectionOrder={sectionOrder}
              newsData={newsData}
              publicationData={publicationData}
              experienceData={experienceData}
              educationData={educationData}
              portfolioData={portfolioData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
