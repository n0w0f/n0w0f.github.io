import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  GraduationCap,
} from "lucide-react";
import { AboutMe } from "@/data/aboutme";

interface ProfileSectionProps {
  aboutMe: AboutMe;
}

export function ProfileSection({ aboutMe }: ProfileSectionProps) {
  if (!aboutMe) {
    return null;
  }

  return (
    <div className="flex flex-row-reverse items-start gap-6 sm:gap-8 lg:flex-col lg:gap-7">
      {aboutMe.imageUrl && (
        <div className="w-28 flex-shrink-0 sm:w-40 lg:w-52">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#e9e3da] ring-1 ring-[color:var(--rule)]">
            <Image
              src={aboutMe.imageUrl}
              alt={aboutMe.name}
              fill
              priority
              className="object-cover object-top grayscale-[25%] motion-safe:transition-all motion-safe:duration-500 hover:grayscale-0"
            />
          </div>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="mb-4 font-serif text-3xl font-normal leading-tight tracking-tight text-zinc-900 sm:text-4xl">
          {aboutMe.name}
        </h1>
        {aboutMe.altName && (
          <p className="text-zinc-700 text-base leading-relaxed tracking-wide mb-6">
            {aboutMe.altName}
          </p>
        )}
        <p className="mb-7 font-sans text-xs leading-relaxed tracking-[0.12em] text-zinc-600 uppercase">
          {aboutMe.title}
          <br />
          {aboutMe.institutionUrl ? (
            <a
              href={aboutMe.institutionUrl}
              className="hover:text-[color:var(--accent-strong)] transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {aboutMe.institution}
            </a>
          ) : (
            aboutMe.institution
          )}
        </p>
        <div className="space-y-2.5 border-t border-[color:var(--rule)] pt-6 [&_a]:break-words">
          <a
            href={`mailto:${aboutMe.email}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={14} />
            {aboutMe.email}
          </a>
          {aboutMe.googleScholarUrl && (
            <>
              <br />
              <a
                href={aboutMe.googleScholarUrl}
                className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GraduationCap size={14} />
                Google Scholar
              </a>
            </>
          )}
          {aboutMe.twitterUsername && (
            <>
              <br />
              <a
                href={`https://twitter.com/${aboutMe.twitterUsername}`}
                className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={14} />@{aboutMe.twitterUsername}
              </a>
            </>
          )}
          {aboutMe.githubUsername && (
            <>
              <br />
              <a
                href={`https://github.com/${aboutMe.githubUsername}`}
                className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
                github.com/{aboutMe.githubUsername}
              </a>
            </>
          )}
          {aboutMe.linkedinUsername && (
            <>
              <br />
              <a
                href={`https://www.linkedin.com/in/${aboutMe.linkedinUsername}`}
                className="inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={14} />
                linkedin.com/in/{aboutMe.linkedinUsername}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
