import Image from "next/image";
import { Figure } from "@/components/blog/figure";

interface TaskImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface TaskCardProps {
  number: number;
  title: string;
  description: string;
  scalableVariable: string;
  complexity: string;
  relevance: string;
  image?: TaskImage;
}

export function TaskCard({
  number,
  title,
  description,
  scalableVariable,
  complexity,
  relevance,
  image,
}: TaskCardProps) {
  return (
    <article className="my-6 rounded-lg border border-zinc-200 bg-white/60 p-6">
      <h3 className="font-serif text-lg text-zinc-900 !mt-0 !mb-3">
        <span className="text-[color:var(--accent-strong)]">Task {number} — </span>
        {title}
      </h3>

      <p className="font-serif text-zinc-700 leading-relaxed">{description}</p>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[10rem_1fr] sm:gap-x-5 sm:gap-y-2">
        <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:pt-0.5">
          Scalable variable
        </dt>
        <dd className="font-serif text-sm text-zinc-700">{scalableVariable}</dd>

        <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:pt-0.5">
          Complexity
        </dt>
        <dd className="font-serif text-sm text-zinc-700">{complexity}</dd>

        <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:pt-0.5">
          Scientific relevance
        </dt>
        <dd className="font-serif text-sm text-zinc-700">{relevance}</dd>
      </dl>

      {image && (
        <div className="mt-5">
          <Figure caption={image.caption}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="mx-auto h-auto w-full max-w-xl"
            />
          </Figure>
        </div>
      )}
    </article>
  );
}
