import type { ReactNode } from "react";

interface FigureProps {
  caption?: ReactNode;
  children: ReactNode;
}

export function Figure({ caption, children }: FigureProps) {
  return (
    <figure className="my-10">
      <div className="rounded-lg border border-zinc-200 bg-white/60 p-5">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-sans text-xs text-zinc-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
