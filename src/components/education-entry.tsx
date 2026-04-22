import { Education } from "@/data/education";

export function EducationEntry({ education }: { education: Education }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-2 mb-2">
        <span className="text-xs text-zinc-600 mt-1">{education.year}</span>
        <div className="col-span-3">
          <h3 className="text-base mb-1 font-serif text-zinc-900">
            {education.institution}
          </h3>
          <p className="text-sm text-zinc-700">{education.degree}</p>
          {education.advisor && (
            <p className="text-sm text-zinc-600 mt-2 italic">
              Advisor: {education.advisor}
            </p>
          )}
          {education.thesis && (
            <p className="text-sm text-zinc-600 mt-2 italic">
              Thesis:{" "}
              {education.thesisUrl ? (
                <a
                  href={education.thesisUrl}
                  className="underline hover:text-[color:var(--accent-strong)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {education.thesis}
                </a>
              ) : (
                education.thesis
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
