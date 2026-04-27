"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export interface DiagramStep {
  label: string;
  render: (ctx: { stepIndex: number; reducedMotion: boolean }) => ReactNode;
}

interface SteppedDiagramProps {
  title: string;
  steps: DiagramStep[];
}

export function SteppedDiagram({ title, steps }: SteppedDiagramProps) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const total = steps.length;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(total - 1, i + 1)),
    [total]
  );
  const reset = useCallback(() => setIndex(0), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  const step = steps[index];

  return (
    <figure className="my-10">
      <div
        ref={figureRef}
        tabIndex={0}
        role="group"
        aria-label={title}
        onKeyDown={onKeyDown}
        className="rounded-lg border border-zinc-200 bg-white/60 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-sans text-xs uppercase tracking-wider text-zinc-500">
            {title}
          </h4>
          <span className="font-mono text-xs text-zinc-500">
            {index + 1} / {total}
          </span>
        </div>

        <div className="w-full">{step.render({ stepIndex: index, reducedMotion })}</div>

        <p className="mt-3 font-serif text-sm text-zinc-600 italic">{step.label}</p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={`h-[2px] flex-1 rounded ${
                  i <= index ? "bg-[color:var(--accent)]" : "bg-zinc-200"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            className="rounded border border-zinc-300 px-3 py-1 font-sans text-xs uppercase tracking-wider text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            className="rounded border border-zinc-300 px-3 py-1 font-sans text-xs uppercase tracking-wider text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded border border-transparent px-3 py-1 font-sans text-xs uppercase tracking-wider text-zinc-500 transition-colors hover:text-[color:var(--accent-strong)]"
          >
            Reset
          </button>
        </div>
      </div>
    </figure>
  );
}
