import { ArrowUpRight } from "lucide-react";
import { Publication } from "@/data/publication";

export function PublicationEntry({
  publication,
}: {
  publication: Publication;
}) {
  return (
    <article>
      <div className="flex flex-col">
        <div className="mb-2 flex flex-row flex-wrap items-center gap-3">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.13em] text-[color:var(--accent)]">
            {publication.conference} {publication.year}
          </p>
          {publication.award && (
            <div className="group/award relative flex px-2 py-1 bg-gradient-to-r from-amber-50 to-rose-50 rounded-md items-center shadow-sm border border-amber-100/70 overflow-hidden motion-safe:hover:rotate-1 motion-safe:transition-all motion-safe:duration-300">
              <div className="pointer-events-none absolute inset-0 translate-x-[-100%] motion-safe:group-hover/award:translate-x-[100%] motion-safe:transition-transform motion-safe:duration-1000 bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              <p className="text-xs text-amber-800 font-medium relative">
                {publication.award}
              </p>
            </div>
          )}
        </div>
        <h3 className="mb-2 font-serif text-[22px] leading-snug text-zinc-900">
          {publication.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600">{publication.authors}</p>
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-2">
          {publication.paperUrl && (
            <a
              href={publication.paperUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Paper</span>
            </a>
          )}
          {publication.codeUrl && (
            <a
              href={publication.codeUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Code</span>
            </a>
          )}
          {publication.leaderboardUrl && (
            <a
              href={publication.leaderboardUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Leaderboard</span>
            </a>
          )}
          {publication.homepageUrl && (
            <a
              href={publication.homepageUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Homepage</span>
            </a>
          )}
          {publication.bibtex && (
            <a
              href={publication.bibtex}
              className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">BibTeX</span>
            </a>
          )}
        </div>
        {publication.tldr && (
          <p className="mt-4 max-w-[62ch] border-l-2 border-[color:var(--rule)] pl-3 text-sm leading-relaxed text-zinc-600">
            {publication.tldr}
          </p>
        )}
      </div>
    </article>
  );
}
