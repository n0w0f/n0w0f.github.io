import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Portfolio } from "@/data/portfolio";

export function PortfolioEntry({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {portfolio.imageUrl && (
        <div className="w-full sm:w-1/4 min-w-[160px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100">
            <Image
              src={portfolio.imageUrl}
              alt={portfolio.title}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1">
        <h3 className="font-serif text-lg mb-3 text-zinc-900">
          {portfolio.projectUrl ? (
            <a
              href={portfolio.projectUrl}
              className="group inline-flex items-center gap-2 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              {portfolio.title}
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </a>
          ) : (
            portfolio.title
          )}
        </h3>

        {portfolio.technologies && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {portfolio.technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs text-amber-900 px-2 py-1 bg-amber-50 border border-amber-100 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-6">
          {portfolio.projectUrl && (
            <a
              href={portfolio.projectUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Project</span>
            </a>
          )}
          {portfolio.codeUrl && (
            <a
              href={portfolio.codeUrl}
              className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Code</span>
            </a>
          )}
        </div>
        <p className="text-sm text-zinc-700 mb-4 mt-4 italic">
          {portfolio.description}
        </p>
      </div>
    </div>
  );
}
