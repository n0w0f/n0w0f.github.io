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
    <div className="min-h-screen bg-[#FFFCF8]">
      {/* Don't have a great call on whether max-w-screen-xl is better */}
      <div className="max-w-screen-lg mx-auto px-8 py-24">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* Left Column - Fixed Info */}
          <div className="col-span-12 md:col-span-4 space-y-12 mb-8 md:mb-0">
            {/* Profile */}
            <div className="md:sticky top-12 space-y-8">
              <ProfileSection aboutMe={aboutMe} />
            </div>
          </div>

          {/* Right Column - Scrolling Content */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-24">
            {/* About section is typically first */}
            {aboutMe.description && (
              <section>
                <p
                  className="font-serif text-base leading-relaxed text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600"
                  dangerouslySetInnerHTML={{ __html: aboutMe.description }}
                />
              </section>
            )}

            {/* Section Navigation */}
            <SectionNavigation sections={sectionOrder} />

            {/* Collapsible sections */}
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
