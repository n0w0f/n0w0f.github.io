import { ArrowUpRight } from "lucide-react";
import { News } from "@/data/news";
import { ImageModal } from "@/components/image-modal";

export function EnhancedNewsEntry({ news }: { news: News }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {news.imageUrl && (
        <div className="md:w-32 md:h-32 w-full h-48 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100">
          <ImageModal
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <p className="text-xs text-zinc-600 mb-2">{news.date}</p>
        <h3 className="font-serif text-lg mb-3 text-zinc-900">
          {news.link ? (
            <a
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
            >
              {news.title}
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </a>
          ) : (
            news.title
          )}
        </h3>
        <p
          className="text-sm text-zinc-700 leading-relaxed [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-[color:var(--accent-strong)]"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {news.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-amber-50 text-amber-900 border border-amber-100 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
