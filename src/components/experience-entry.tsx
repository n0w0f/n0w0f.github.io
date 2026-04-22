import { Experience } from "@/data/experience";

export function ExperienceEntry({ experience }: { experience: Experience }) {
  return (
    <div className="grid grid-cols-4 gap-x-2">
      <span className="text-xs text-zinc-600 mt-1">{experience.date}</span>
      <div className="col-span-3 flex flex-col">
        <h3 className="text-base font-serif text-zinc-900">
          {experience.title} —{" "}
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              className="hover:text-[color:var(--accent-strong)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {experience.company}
            </a>
          ) : (
            experience.company
          )}
        </h3>
        {experience.advisor && (
          <p className="text-sm text-zinc-700 leading-relaxed italic mt-2">
            Advisor: {experience.advisor}
          </p>
        )}
        {experience.manager && (
          <p className="text-sm text-zinc-700 leading-relaxed italic mt-2">
            Manager: {experience.manager}
          </p>
        )}
        {experience.description && (
          <p className="text-sm text-zinc-700 leading-relaxed mt-2">
            {experience.description}
          </p>
        )}
      </div>
    </div>
  );
}
