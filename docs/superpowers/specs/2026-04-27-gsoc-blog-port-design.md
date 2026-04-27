# GSoC post port — design

**Date:** 2026-04-27
**Status:** Approved

## Goal

Port the existing GSoC 2025 report (currently a static HTML at `public/gsoc2025/index.html`) into a blog post at `/blog/gsoc-2025` that reuses the post infrastructure built for the first post. Full-fidelity content port (sections, figures, tables, code, task appendix), restyled to the site's restrained aesthetic.

## Non-goals

- No re-themed interactive diagrams. This post is prose + figures + tables + code, not SVG animations.
- No edits to the scientific content beyond minor copyedits and structural reshaping to fit blog flow.
- No changes to the existing first post or the blog infrastructure components. This is purely additive plus two small touch-ups (`gsoc2025` alias target, the `TaskCard` component).

## Content decisions (from brainstorming)

- **Scope (Q1):** Full port (A). All content, including the 10-task appendix and the SciRex codebase section.
- **Figures and table (Q3):** Recommendation B — results figures prominent, task figures inline where present, summary table trimmed to 4 columns with full 6-column version in a `<details>` accordion below.
- **Task appendix style (Q4):** Recommendation B — each task is a bordered card (serif title + labelled metadata fields + figure if present), via a new `<TaskCard>` component.
- **Redirect (Q5a):** `/gsoc2025` now redirects to `/blog/gsoc-2025` (not `/blog`).
- **Assets (Q5b):** Recommendation B2 — move `public/gsoc2025/` → `public/blog/gsoc-2025/` and delete the now-empty `public/gsoc2025/`. Clean namespace.
- **Code blocks (Q5c):** Recommendation C1 — keep all 5 code snippets from the source (install via uv, install via pip, text benchmark, multimodal benchmark, custom task definition).

## Routes and files

**New route:** `/blog/gsoc-2025` — registered in `src/data/blog.ts` and `src/content/blog/index.ts`; served by the existing `[slug]/page.tsx` and `PostLayout`.

**New files:**
```
src/content/blog/gsoc-2025/
  index.ts                                        -- re-exports default post + tocItems
  post.tsx                                        -- the full post body

src/components/blog/
  task-card.tsx                                   -- new component for the 10 task cards

public/blog/gsoc-2025/images/                     -- 7 images moved from public/gsoc2025/images/
  benchmark_complexity_analysis.jpg
  diffusion.png
  energy.png
  reasoning.png
  sort.png
  traversal.png
  (benchmark_complexity_analysis.png is a duplicate of the .jpg — drop it)
  (image.txt is a stray non-image — drop it)
```

**Modified files:**
- `src/data/blog.ts` — append new `BlogPost` entry.
- `src/content/blog/index.ts` — register `gsoc-2025` in the component map.
- `src/app/gsoc2025/page.tsx` — change `router.replace("/blog")` → `router.replace("/blog/gsoc-2025")`; update visible fallback copy to match.

**Deleted:**
- `public/gsoc2025/` (the entire directory, after the images move to `public/blog/gsoc-2025/images/`). Includes `index.html`, `starter.md.html`, the images, and the duplicate benchmark image.

## Post metadata

```ts
{
  slug: "gsoc-2025",
  title: "Benchmarking algorithmic reasoning in Gemini models",
  date: "2025-09-01",
  description:
    "A GSoC 2025 report: disentangling knowledge, reasoning, and execution in LLMs on scientific tasks, and how performance degrades with algorithmic complexity.",
}
```

## TocItems

```ts
[
  { id: "introduction", label: "Introduction" },
  { id: "methodology",  label: "Methodology" },
  { id: "results",      label: "Results" },
  { id: "discussion",   label: "Discussion" },
  { id: "references",   label: "References" },
  { id: "codebase",     label: "Codebase" },
  { id: "tasks",        label: "Tasks" },
]
```

## Post structure

1. **`#introduction`** — the knowledge-vs-reasoning framing; motivation. Follows the source's Introduction section verbatim-in-structure, with minor blog-style trims (paragraph shortening, no duplicate scaffolding sentences).

2. **`#methodology`** — Task Design Principles, the diffusion-pathway worked example, the **trimmed 4-column summary table** (Task / Algorithm Type / Complexity / Key Challenge), and a `<details>` accordion below titled "Full table with scientific relevance" containing the complete 6-column version.

3. **`#results`** — two full-width `<Figure>` wrappers:
   - `reasoning.png` — code-execution vs chain-of-thought accuracy per task.
   - `benchmark_complexity_analysis.jpg` — accuracy vs scalable variable per task.
   Prose on impact of algorithmic complexity, "Slopes of decline" sub-section.

4. **`#discussion`** — hybrid systems argument, future-directions prose, SciRex release paragraph with repo link.

5. **`#references`** — numbered list with the two existing references. Keeps the `[#1]` / `[#2]` citation anchors consistent with references in the text.

6. **`#codebase`** — Appendix: SciRex. Four subsections mirroring the source:
   - Key Features (bulleted list)
   - Quick Start (two `<CodeBlock lang="bash">`: uv install, pip install)
   - Usage Examples (three `<CodeBlock lang="python">`: text benchmarking, multimodal, custom task)
   - Configuration (one small `<CodeBlock lang="bash">` showing `.env`)
   - Framework Architecture (bulleted list)

7. **`#tasks`** — 10 `<TaskCard>` components. The 4 tasks that have figures render them inline (`energy.png`, `sort.png`, `diffusion.png`, `traversal.png` — the last one is for Tree Traversal, not the literal task #8 in the source; see mapping below). The 6 without figures show only description + metadata.

## Task-to-figure mapping

Source provides these figures in `images/`:
- `energy.png` → Task 1 (Many Body Energy Computation)
- `sort.png` → Task 2 (Peak Identification)
- `diffusion.png` → Task 3 (Diffusion Pathway)
- `traversal.png` → Task 8 (Tree Traversal)

Other tasks (4, 5, 6, 7, 9, 10) have no figures — cards render without.

## `<TaskCard>` component

```tsx
interface TaskCardProps {
  number: number;
  title: string;
  description: string;
  scalableVariable: string;
  complexity: string;
  relevance: string;
  image?: { src: string; alt: string; caption: string };
}
```

**Visual:**
- Container: `rounded-lg border border-zinc-200 bg-white/60 p-6 my-6`.
- Title: `<h3>` serif, with "Task N — " prefix in `text-[color:var(--accent-strong)]`.
- Description: serif body prose under the title.
- Metadata block: three labelled fields in a small definition list. Labels are sans xs uppercase tracking-wider zinc-500; values are serif zinc-700.
- Figure (if present): rendered via the existing `<Figure caption>` component inside the card, after the metadata.

Matches the aesthetic of the blog's first post — restrained, paper-colored, serif-first.

## Route changes

**`src/app/gsoc2025/page.tsx`:**
- Change `router.replace("/blog")` to `router.replace("/blog/gsoc-2025")`.
- Update the fallback link text from "go to the blog" to "go to the post" and the `href` to `/blog/gsoc-2025`.

This preserves any inbound external links to `n0w0f.github.io/gsoc2025/` and sends them to the actual content instead of the generic index.

## Images handling

- All images served from `/blog/gsoc-2025/images/<name>` after the move.
- Two main results figures use Next `<Image>` with explicit width/height inside the `<Figure>` wrapper for optimization.
- Task-card images use a lighter treatment: rendered inline with explicit dimensions and the `<Figure>` caption.
- No `next.config.ts` changes — all images are local-static and served directly from `public/`.

## File move execution

`git mv public/gsoc2025/images/*.png public/blog/gsoc-2025/images/` preserves history. The `.jpg` version of `benchmark_complexity_analysis` is identical in size to the `.png` (296400 bytes each). Keep the `.jpg` (better for photographs/plots), delete the `.png`. Also delete `image.txt` (not an image asset).

After the move: `rm -rf public/gsoc2025/` to remove `index.html`, `starter.md.html`, and the emptied directory.

## Accessibility

- Every `<Image>` has a meaningful `alt`.
- Every `<TaskCard>` has a proper heading.
- The `<details>` accordion uses native HTML and is keyboard-accessible by default.
- References are a standard numbered list with semantic anchors.

## Out-of-scope

- Re-rendering figures as SVG or otherwise re-themed from the dark GSoC PDF palette. Keeping them as-is is pragmatic.
- Bibliography management (a full reference list tool). Two references render fine inline.
- Automatic generation of the task cards from data. Each card is hand-written in JSX; 10 is manageable, and the tasks are idiosyncratic enough that a data-driven approach would need long free-text description fields anyway.
