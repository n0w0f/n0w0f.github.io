# Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/blog` index and `/blog/[slug]` route pair to the site, plus ship one first post ("Threads, processes, and parallelism in Python") adapted from `/Users/nalampara/n0w0f/dev/bench/docs/launchers-executors-and-ray.html` with bench/Ray content removed.

**Architecture:** Static-exported Next.js routes. Posts are React components registered in a slug → component map. Metadata-only `BlogPost[]` drives the index. Shiki for build-time code highlighting. Pure-React `<SteppedDiagram>` component for interactive SVG diagrams (no animation libraries). A floating right-margin TOC on `lg+` screens. The home page gets a small "Blog" link in the existing pill nav.

**Tech Stack:** Next.js 15 (App Router, `output: export`), React 19, TypeScript strict, Tailwind 3, PT Serif + Geist, `lucide-react`, `shiki` (new dependency).

**Validation note:** This project has no test framework (per `CLAUDE.md`). Validation for each task is:
- `npm run lint` — type + ESLint pass
- `npm run build` — static export succeeds
- `npm run dev` — manual browser check at the listed URL

Do not add a test framework for this plan; visual/build validation is the project norm.

**Before you start each task:** run `git status` in the repo root to confirm a clean tree, then `cd /Users/nalampara/n0w0f/dev/n0w0f.github.io` so all relative paths in this plan work.

**Spec:** `docs/superpowers/specs/2026-04-27-blog-section-design.md`

---

## File structure (reference)

```
src/app/
  blog/page.tsx                                       -- Task 11
  blog/[slug]/page.tsx                                -- Task 10
  gsoc2025/page.tsx                                   -- Task 13

src/data/
  blog.ts                                             -- Task 1

src/content/blog/
  index.ts                                            -- Task 1
  threads-processes-and-parallelism-in-python/
    index.ts                                          -- Task 1
    post.tsx                                          -- Task 14
    diagrams/
      InterpreterFlow.tsx                             -- Task 6
      ProcessVsThreadMemory.tsx                       -- Task 7
      GilSwitching.tsx                                -- Task 8

src/components/blog/
  prose.tsx                                           -- Task 3
  callout.tsx                                         -- Task 3
  figure.tsx                                          -- Task 3
  code-block.tsx                                      -- Task 4
  stepped-diagram.tsx                                 -- Task 5
  floating-toc.tsx                                    -- Task 9
  post-layout.tsx                                     -- Task 10
  blog-index.tsx                                      -- Task 11

src/lib/
  reading-time.ts                                     -- Task 2

Modified:
  src/components/section-navigation.tsx               -- Task 12
  src/data/aboutme.ts                                 -- Task 12
  next.config.ts                                      -- Task 4 (if needed for shiki)
  package.json / package-lock.json                    -- Task 4
```

---

## Task 1: Scaffold routes, data model, and empty post registry

**Files:**
- Create: `src/data/blog.ts`
- Create: `src/content/blog/index.ts`
- Create: `src/content/blog/threads-processes-and-parallelism-in-python/index.ts`
- Create: `src/app/blog/page.tsx` (temporary placeholder)
- Create: `src/app/blog/[slug]/page.tsx` (temporary placeholder)

The placeholder pages are just enough to make `npm run build` succeed so subsequent tasks have a working base.

- [ ] **Step 1: Create the `BlogPost` metadata type and first entry**

Create `src/data/blog.ts`:

```ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;              // ISO "YYYY-MM-DD"
  description: string;
  draft?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "threads-processes-and-parallelism-in-python",
    title: "Threads, processes, and parallelism in Python",
    date: "2026-04-27",
    description:
      "A first-principles walk through interpreters, the GIL, threads, and processes — and when each gives you real parallelism.",
  },
];
```

- [ ] **Step 2: Create the post registry skeleton**

Create `src/content/blog/threads-processes-and-parallelism-in-python/index.ts`:

```ts
import type { ComponentType } from "react";
import type { TocItem } from "../index";

// Placeholder — replaced in Task 14.
const Post: ComponentType = () => null;

export const tocItems: TocItem[] = [];

export default Post;
```

Create `src/content/blog/index.ts`:

```ts
import type { ComponentType } from "react";
import threadsPost, { tocItems as threadsToc } from "./threads-processes-and-parallelism-in-python";

export interface TocItem {
  id: string;
  label: string;
}

export interface RegisteredPost {
  Component: ComponentType;
  tocItems: TocItem[];
}

export const postComponents: Record<string, RegisteredPost> = {
  "threads-processes-and-parallelism-in-python": {
    Component: threadsPost,
    tocItems: threadsToc,
  },
};
```

- [ ] **Step 3: Add a placeholder `/blog` index page**

Create `src/app/blog/page.tsx`:

```tsx
import { blogPosts } from "@/data/blog";

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="max-w-screen-lg mx-auto px-8 py-24">
        <h1 className="font-serif text-4xl text-zinc-900">Writing</h1>
        <ul className="mt-8 space-y-4">
          {blogPosts.map((p) => (
            <li key={p.slug} className="font-serif text-zinc-700">
              {p.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

This is a placeholder — the real index replaces it in Task 11.

- [ ] **Step 4: Add a placeholder `/blog/[slug]` page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { postComponents } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const meta = blogPosts.find((p) => p.slug === slug);
  const entry = postComponents[slug];
  if (!meta || !entry) notFound();
  const { Component } = entry;
  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="max-w-screen-lg mx-auto px-8 py-24">
        <h1 className="font-serif text-4xl text-zinc-900">{meta.title}</h1>
        <Component />
      </div>
    </div>
  );
}
```

Note: Next 15 passes `params` as a Promise in server components. Await it.

- [ ] **Step 5: Verify build succeeds**

Run: `npm run lint && npm run build`
Expected: both pass. `npm run build` should print `/blog` and `/blog/threads-processes-and-parallelism-in-python` in the generated routes list.

If lint fails due to the unused placeholder component, leave a `// TODO replaced in Task 14` comment on the line and move on — it gets replaced in Task 14 anyway.

- [ ] **Step 6: Commit**

```bash
git add src/data/blog.ts src/content/blog src/app/blog
git commit -m "feat(blog): scaffold blog routes and post registry"
```

---

## Task 2: Reading-time helper

**Files:**
- Create: `src/lib/reading-time.ts`

- [ ] **Step 1: Write the helper**

Create `src/lib/reading-time.ts`:

```ts
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

const WORDS_PER_MINUTE = 200;

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode }).children;
    return extractText(children);
  }
  return "";
}

export function computeReadingTime(node: ReactNode): string {
  const text = extractText(node);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run lint`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/lib/reading-time.ts
git commit -m "feat(blog): add reading-time helper"
```

---

## Task 3: Prose, Callout, and Figure components

**Files:**
- Create: `src/components/blog/prose.tsx`
- Create: `src/components/blog/callout.tsx`
- Create: `src/components/blog/figure.tsx`

- [ ] **Step 1: Create the prose wrapper**

Create `src/components/blog/prose.tsx`:

```tsx
import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    <div
      className={[
        "font-serif text-[17px] leading-[1.75] text-zinc-800 max-w-[38rem]",
        "[&_p]:my-5",
        "[&_strong]:font-semibold [&_strong]:text-zinc-900",
        "[&_em]:italic",
        "[&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-[color:var(--accent-strong)] [&_a]:transition-colors",
        "[&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-zinc-900 [&_h2]:mt-16 [&_h2]:mb-4 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-zinc-200",
        "[&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-12",
        "[&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-zinc-900 [&_h3]:mt-10 [&_h3]:mb-3",
        "[&_h4]:font-sans [&_h4]:text-xs [&_h4]:uppercase [&_h4]:tracking-wider [&_h4]:text-zinc-500 [&_h4]:mt-8 [&_h4]:mb-2",
        "[&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:marker:text-zinc-400",
        "[&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:marker:text-zinc-400",
        "[&_li]:my-1.5",
        "[&_code:not(pre_code)]:bg-[#F5F1E8] [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[0.9em] [&_code:not(pre_code)]:text-zinc-800",
        "[&_table]:w-full [&_table]:my-8 [&_table]:border-collapse",
        "[&_th]:text-left [&_th]:py-2.5 [&_th]:px-3 [&_th]:font-sans [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-[color:var(--accent-strong)] [&_th]:border-b [&_th]:border-zinc-300",
        "[&_td]:py-2.5 [&_td]:px-3 [&_td]:border-b [&_td]:border-zinc-200 [&_td]:align-top",
        "[&_blockquote]:my-6 [&_blockquote]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-300 [&_blockquote]:text-zinc-600 [&_blockquote]:italic",
        "[&_hr]:my-12 [&_hr]:border-zinc-200",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create the Callout component**

Create `src/components/blog/callout.tsx`:

```tsx
import type { ReactNode } from "react";

type Variant = "info" | "warn" | "danger";

interface CalloutProps {
  variant?: Variant;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  info: "border-l-[color:var(--accent)] bg-amber-50/40",
  warn: "border-l-amber-600 bg-amber-50/60",
  danger: "border-l-rose-500 bg-rose-50/40",
};

export function Callout({ variant = "info", children }: CalloutProps) {
  return (
    <aside
      className={`my-6 border-l-2 ${styles[variant]} px-5 py-4 rounded-r text-zinc-700`}
    >
      {children}
    </aside>
  );
}
```

- [ ] **Step 3: Create the Figure component**

Create `src/components/blog/figure.tsx`:

```tsx
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
```

- [ ] **Step 4: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/prose.tsx src/components/blog/callout.tsx src/components/blog/figure.tsx
git commit -m "feat(blog): add Prose, Callout, and Figure components"
```

---

## Task 4: Code block (Shiki, build-time)

**Files:**
- Modify: `package.json` (add `shiki` dependency)
- Create: `src/components/blog/code-block.tsx`

- [ ] **Step 1: Install Shiki**

Run: `npm install shiki`
Expected: `shiki` added to `dependencies` in `package.json`.

- [ ] **Step 2: Create the server-component CodeBlock**

Create `src/components/blog/code-block.tsx`:

```tsx
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  children: string;
  lang?: string;
}

export async function CodeBlock({ children, lang = "text" }: CodeBlockProps) {
  const html = await codeToHtml(children.trim(), {
    lang,
    theme: "github-light",
  });

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200/60 bg-[#F5F1E8] px-5 py-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent [&_code]:font-mono">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
```

Shiki ships its own inline styling inside the generated `<pre>`. We override its background to blend with the cream wrapper via the `!bg-transparent` utility classes.

- [ ] **Step 3: Smoke-test by rendering a sample block**

Edit `src/app/blog/[slug]/page.tsx` temporarily — after the `<Component />` call, add:

```tsx
<CodeBlock lang="python">{`import threading\nt = threading.Thread(target=print, args=("hi",))\nt.start()`}</CodeBlock>
```

Remember to import it at the top: `import { CodeBlock } from "@/components/blog/code-block";`

- [ ] **Step 4: Build and visually check**

Run: `npm run build` — should succeed.
Run: `npm run dev` and open `http://localhost:3000/blog/threads-processes-and-parallelism-in-python`.
Expected: a light code block appears with syntax-highlighted Python.

Stop the dev server (`Ctrl-C`) and revert the smoke-test change so the page is back to clean Task 1 state.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/components/blog/code-block.tsx
git commit -m "feat(blog): add Shiki-powered CodeBlock component"
```

---

## Task 5: SteppedDiagram generic controller

**Files:**
- Create: `src/components/blog/stepped-diagram.tsx`

- [ ] **Step 1: Create the stepper**

Create `src/components/blog/stepped-diagram.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/stepped-diagram.tsx
git commit -m "feat(blog): add generic SteppedDiagram controller"
```

---

## Task 6: Diagram 1 — InterpreterFlow

**Files:**
- Create: `src/content/blog/threads-processes-and-parallelism-in-python/diagrams/InterpreterFlow.tsx`

Illustrates `foo.py` → compile → bytecode → interpreter → result, with each arrow/box revealed stepwise.

- [ ] **Step 1: Create the diagram component**

```tsx
"use client";

import { SteppedDiagram } from "@/components/blog/stepped-diagram";

const ACCENT = "var(--accent)";
const STROKE = "#a1a1aa";      // zinc-400
const FILL_IDLE = "#fafaf9";   // stone-50
const FILL_ACTIVE = "#fef3c7"; // amber-100
const TEXT = "#27272a";        // zinc-800
const MUTE = "#71717a";        // zinc-500

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
}

const boxes: Box[] = [
  { x: 10,  y: 40, w: 160, h: 90, title: "foo.py",      sub: "x = 1 + 2" },
  { x: 230, y: 40, w: 180, h: 90, title: "bytecode",    sub: "LOAD_CONST; ADD" },
  { x: 470, y: 40, w: 200, h: 90, title: "Interpreter", sub: "stack machine" },
  { x: 720, y: 40, w: 90,  h: 90, title: "result",      sub: "x = 3" },
];

const arrowLabels = ["compile", "execute", ""];

function Scene({ active }: { active: number }) {
  return (
    <svg
      viewBox="0 0 820 170"
      role="img"
      aria-label="Python interpreter flow"
      className="w-full h-auto"
    >
      <defs>
        <marker
          id="arr-if"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={ACCENT} />
        </marker>
      </defs>

      {boxes.map((b, i) => {
        const on = i <= active;
        return (
          <g key={i} opacity={on ? 1 : 0.35}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={6}
              fill={i === active ? FILL_ACTIVE : FILL_IDLE}
              stroke={i === active ? ACCENT : STROKE}
              strokeWidth={i === active ? 1.5 : 1}
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + 35}
              textAnchor="middle"
              fill={TEXT}
              fontSize={13}
              fontWeight={600}
              fontFamily="Georgia, serif"
            >
              {b.title}
            </text>
            {b.sub && (
              <text
                x={b.x + b.w / 2}
                y={b.y + 60}
                textAnchor="middle"
                fill={MUTE}
                fontSize={11}
                fontFamily="ui-monospace, Menlo, monospace"
              >
                {b.sub}
              </text>
            )}
          </g>
        );
      })}

      {boxes.slice(0, -1).map((b, i) => {
        const next = boxes[i + 1];
        const show = i < active;
        return (
          <g key={`arr-${i}`} opacity={show ? 1 : 0.2}>
            <line
              x1={b.x + b.w}
              y1={b.y + b.h / 2}
              x2={next.x}
              y2={next.y + next.h / 2}
              stroke={ACCENT}
              strokeWidth={1.5}
              markerEnd="url(#arr-if)"
            />
            {arrowLabels[i] && (
              <text
                x={(b.x + b.w + next.x) / 2}
                y={b.y + b.h / 2 - 8}
                textAnchor="middle"
                fill={MUTE}
                fontSize={10}
                fontFamily="ui-sans-serif, system-ui"
              >
                {arrowLabels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const steps = [
  { label: "Your .py file is source text — a human-readable program.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
  { label: "The interpreter compiles it to bytecode — stack-machine instructions.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
  { label: "The interpreter executes bytecode one instruction at a time.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
  { label: "The result lives in memory — x bound to 3.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
];

export function InterpreterFlow() {
  return <SteppedDiagram title="How Python runs your code" steps={steps} />;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/threads-processes-and-parallelism-in-python/diagrams/InterpreterFlow.tsx
git commit -m "feat(blog): add InterpreterFlow stepped diagram"
```

---

## Task 7: Diagram 2 — ProcessVsThreadMemory

**Files:**
- Create: `src/content/blog/threads-processes-and-parallelism-in-python/diagrams/ProcessVsThreadMemory.tsx`

Three steps: single process / fork (separate address spaces) / two threads (shared address space).

- [ ] **Step 1: Create the diagram component**

```tsx
"use client";

import { SteppedDiagram } from "@/components/blog/stepped-diagram";

const ACCENT = "var(--accent)";
const STROKE = "#a1a1aa";
const FILL_IDLE = "#fafaf9";
const FILL_SHARED = "#fef3c7";
const FILL_COPIED = "#ffedd5";
const TEXT = "#27272a";
const MUTE = "#71717a";

interface RunnerProps {
  x: number;
  y: number;
  label: string;
  sub?: string;
  tone?: "idle" | "shared" | "copied";
}

function Runner({ x, y, label, sub, tone = "idle" }: RunnerProps) {
  const fill = tone === "shared" ? FILL_SHARED : tone === "copied" ? FILL_COPIED : FILL_IDLE;
  const stroke = tone === "idle" ? STROKE : ACCENT;
  return (
    <g>
      <rect x={x} y={y} width={180} height={80} rx={6} fill={fill} stroke={stroke} strokeWidth={1.2} />
      <text x={x + 90} y={y + 32} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={600} fontFamily="Georgia, serif">
        {label}
      </text>
      {sub && (
        <text x={x + 90} y={y + 55} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-monospace, Menlo, monospace">
          {sub}
        </text>
      )}
    </g>
  );
}

function SceneOneProcess() {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="One process" className="w-full h-auto">
      <rect x={40} y={30} width={480} height={160} rx={10} fill="none" stroke={STROKE} strokeDasharray="4 4" />
      <text x={280} y={22} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        Process A — one address space
      </text>
      <Runner x={60}  y={70} label="Python interpreter" sub="runs main()" />
      <Runner x={320} y={70} label="Heap memory" sub="objects, bindings" tone="shared" />
    </svg>
  );
}

function SceneFork() {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Forked process" className="w-full h-auto">
      <rect x={20} y={30}  width={240} height={180} rx={10} fill="none" stroke={STROKE} strokeDasharray="4 4" />
      <rect x={300} y={30} width={240} height={180} rx={10} fill="none" stroke={ACCENT} strokeDasharray="4 4" />
      <text x={140} y={22} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">Process A</text>
      <text x={420} y={22} textAnchor="middle" fill={ACCENT} fontSize={11} fontFamily="ui-sans-serif, system-ui">Process B (forked)</text>
      <Runner x={40}  y={60}  label="Interpreter"  sub="original" />
      <Runner x={40}  y={130} label="Heap"         sub="original" tone="shared" />
      <Runner x={320} y={60}  label="Interpreter"  sub="fresh copy" tone="copied" />
      <Runner x={320} y={130} label="Heap"         sub="copy-on-write" tone="copied" />
    </svg>
  );
}

function SceneThreads() {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Two threads" className="w-full h-auto">
      <rect x={40} y={30} width={480} height={200} rx={10} fill="none" stroke={STROKE} strokeDasharray="4 4" />
      <text x={280} y={22} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        Process A — one address space, two threads
      </text>
      <Runner x={60}  y={60}  label="Thread 1" sub="own stack" />
      <Runner x={320} y={60}  label="Thread 2" sub="own stack" />
      <Runner x={190} y={150} label="Shared heap" sub="same objects" tone="shared" />
      <line x1={150} y1={140} x2={260} y2={150} stroke={ACCENT} strokeWidth={1.2} />
      <line x1={410} y1={140} x2={310} y2={150} stroke={ACCENT} strokeWidth={1.2} />
    </svg>
  );
}

const steps = [
  { label: "A single Python process owns one address space.",                render: () => <SceneOneProcess /> },
  { label: "Fork a process: the child gets its own copy of memory — no sharing by default.", render: () => <SceneFork /> },
  { label: "Threads inside one process share the heap — same objects, different stacks.",    render: () => <SceneThreads /> },
];

export function ProcessVsThreadMemory() {
  return <SteppedDiagram title="Processes vs threads in memory" steps={steps} />;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/threads-processes-and-parallelism-in-python/diagrams/ProcessVsThreadMemory.tsx
git commit -m "feat(blog): add ProcessVsThreadMemory stepped diagram"
```

---

## Task 8: Diagram 3 — GilSwitching

**Files:**
- Create: `src/content/blog/threads-processes-and-parallelism-in-python/diagrams/GilSwitching.tsx`

Three steps showing the GIL token moving between two threads.

- [ ] **Step 1: Create the diagram component**

```tsx
"use client";

import { SteppedDiagram } from "@/components/blog/stepped-diagram";

const ACCENT = "var(--accent)";
const STROKE = "#a1a1aa";
const FILL_IDLE = "#fafaf9";
const FILL_HOLD = "#fef3c7";
const FILL_WAIT = "#f4f4f5";
const TEXT = "#27272a";
const MUTE = "#71717a";

type Holder = "A" | "B";

function Scene({ holder }: { holder: Holder }) {
  const aHolds = holder === "A";
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="GIL switching" className="w-full h-auto">
      <rect x={40}  y={40} width={200} height={100} rx={8}
            fill={aHolds ? FILL_HOLD : FILL_WAIT}
            stroke={aHolds ? ACCENT : STROKE}
            strokeWidth={aHolds ? 1.5 : 1} />
      <text x={140} y={75} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={600} fontFamily="Georgia, serif">
        Thread A
      </text>
      <text x={140} y={100} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        {aHolds ? "running" : "waiting"}
      </text>

      <rect x={320} y={40} width={200} height={100} rx={8}
            fill={!aHolds ? FILL_HOLD : FILL_WAIT}
            stroke={!aHolds ? ACCENT : STROKE}
            strokeWidth={!aHolds ? 1.5 : 1} />
      <text x={420} y={75} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={600} fontFamily="Georgia, serif">
        Thread B
      </text>
      <text x={420} y={100} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        {!aHolds ? "running" : "waiting"}
      </text>

      <circle cx={aHolds ? 140 : 420} cy={175} r={26} fill={FILL_HOLD} stroke={ACCENT} strokeWidth={1.5} />
      <text x={aHolds ? 140 : 420} y={180} textAnchor="middle" fill={TEXT} fontSize={12} fontWeight={700} fontFamily="Georgia, serif">
        GIL
      </text>

      <line x1={140} y1={140} x2={aHolds ? 140 : 420} y2={150} stroke={ACCENT} strokeDasharray={aHolds ? "" : "4 4"} strokeWidth={1} opacity={aHolds ? 1 : 0.4} />
      <line x1={420} y1={140} x2={aHolds ? 140 : 420} y2={150} stroke={ACCENT} strokeDasharray={!aHolds ? "" : "4 4"} strokeWidth={1} opacity={!aHolds ? 1 : 0.4} />

      <text x={280} y={225} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui" fontStyle="italic">
        Only one thread holds the GIL at a time.
      </text>
    </svg>
  );
}

const steps = [
  { label: "Thread A holds the GIL and runs bytecode. Thread B waits.",                render: () => <Scene holder="A" /> },
  { label: "At a check interval, the interpreter releases the GIL.",                   render: () => <Scene holder="B" /> },
  { label: "Thread B acquires the GIL and runs. Thread A now waits.",                  render: () => <Scene holder="B" /> },
];

export function GilSwitching() {
  return <SteppedDiagram title="The GIL — one token, two threads" steps={steps} />;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/threads-processes-and-parallelism-in-python/diagrams/GilSwitching.tsx
git commit -m "feat(blog): add GilSwitching stepped diagram"
```

---

## Task 9: FloatingToc

**Files:**
- Create: `src/components/blog/floating-toc.tsx`

- [ ] **Step 1: Create the TOC**

```tsx
"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/content/blog";

interface FloatingTocProps {
  items: TocItem[];
}

export function FloatingToc({ items }: FloatingTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-12">
      <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((it) => {
          const isActive = activeId === it.id;
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => scrollTo(it.id)}
                aria-current={isActive ? "location" : undefined}
                className={`block w-full text-left border-l-2 pl-3 py-1 font-sans text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-[color:var(--accent)] text-[color:var(--accent-strong)]"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/floating-toc.tsx
git commit -m "feat(blog): add FloatingToc with scroll-spy"
```

---

## Task 10: PostLayout (wire everything together)

**Files:**
- Create: `src/components/blog/post-layout.tsx`
- Modify: `src/app/blog/[slug]/page.tsx` (replace placeholder)

- [ ] **Step 1: Create the PostLayout**

Create `src/components/blog/post-layout.tsx`:

```tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Prose } from "@/components/blog/prose";
import { FloatingToc } from "@/components/blog/floating-toc";
import { computeReadingTime } from "@/lib/reading-time";
import type { BlogPost } from "@/data/blog";
import type { TocItem } from "@/content/blog";

interface PostLayoutProps {
  meta: BlogPost;
  tocItems: TocItem[];
  children: ReactNode;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostLayout({ meta, tocItems, children }: PostLayoutProps) {
  const readingTime = computeReadingTime(children);

  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="mx-auto max-w-screen-xl px-8 py-24 lg:grid lg:grid-cols-12 lg:gap-8">
        <article className="lg:col-span-7 lg:col-start-3">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors"
          >
            <ArrowLeft
              size={12}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            All writing
          </Link>

          <header className="mt-10">
            <h1 className="font-serif text-3xl font-light tracking-wide text-zinc-900 md:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-6 font-sans text-xs uppercase tracking-wider text-zinc-500">
              {formatDate(meta.date)} · {readingTime}
            </p>
            <div className="mt-4 h-px w-10 bg-[color:var(--accent)]" />
            <p className="mt-6 font-serif italic text-zinc-700 max-w-[38rem]">
              {meta.description}
            </p>
          </header>

          <div className="mt-12">
            <Prose>{children}</Prose>
          </div>

          <footer className="mt-24 flex items-center justify-between border-t border-zinc-200 pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors"
            >
              <ArrowLeft
                size={12}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              All writing
            </Link>
            <p className="font-sans text-xs text-zinc-500">
              Last updated {formatDate(meta.date)}
            </p>
          </footer>
        </article>

        <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
          <div className="pt-20">
            <FloatingToc items={tocItems} />
          </div>
        </aside>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `[slug]/page.tsx` placeholder**

Replace the entire contents of `src/app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { postComponents } from "@/content/blog";
import { PostLayout } from "@/components/blog/post-layout";

export function generateStaticParams() {
  return blogPosts
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const meta = blogPosts.find((p) => p.slug === slug);
  const entry = postComponents[slug];
  if (!meta || !entry) notFound();
  const { Component, tocItems } = entry;
  return (
    <PostLayout meta={meta} tocItems={tocItems}>
      <Component />
    </PostLayout>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/post-layout.tsx src/app/blog/[slug]/page.tsx
git commit -m "feat(blog): add PostLayout and wire up slug route"
```

---

## Task 11: Blog index page

**Files:**
- Create: `src/components/blog/blog-index.tsx`
- Modify: `src/app/blog/page.tsx` (replace placeholder)

- [ ] **Step 1: Create the BlogIndex component**

```tsx
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blog";

interface BlogIndexProps {
  posts: BlogPost[];
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function groupByYear(posts: BlogPost[]): { year: string; items: BlogPost[] }[] {
  const groups = new Map<string, BlogPost[]>();
  for (const p of posts) {
    const year = p.date.slice(0, 4);
    const bucket = groups.get(year) ?? [];
    bucket.push(p);
    groups.set(year, bucket);
  }
  return Array.from(groups.entries())
    .sort((a, b) => (a[0] > b[0] ? -1 : 1))
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => (a.date > b.date ? -1 : 1)),
    }));
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const visible = posts.filter((p) => !p.draft);
  const grouped = groupByYear(visible);

  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="mx-auto max-w-screen-lg px-8 py-24">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors"
        >
          <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
          Home
        </Link>

        <header className="mt-10 max-w-[40rem]">
          <h1 className="font-serif text-4xl font-light tracking-wide text-zinc-900">Writing</h1>
          <div className="mt-4 h-px w-10 bg-[color:var(--accent)]" />
          <p className="mt-6 font-serif italic text-zinc-700">
            Notes on Python, machine learning, and building research infrastructure.
          </p>
        </header>

        <div className="mt-16 space-y-16">
          {grouped.length === 0 && (
            <p className="font-serif italic text-zinc-500">Nothing here yet.</p>
          )}
          {grouped.map((group) => (
            <section key={group.year}>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6">
                {group.year}
              </h2>
              <ul className="space-y-6">
                {group.items.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid grid-cols-1 gap-2 sm:grid-cols-[7rem_1fr] sm:gap-6 py-3"
                    >
                      <span className="font-sans text-xs uppercase tracking-wider text-zinc-500 sm:pt-1">
                        {formatShortDate(post.date)}
                      </span>
                      <div>
                        <h3 className="inline-flex items-baseline gap-2 font-serif text-lg text-zinc-900 transition-colors group-hover:text-[color:var(--accent-strong)]">
                          {post.title}
                          <ArrowUpRight
                            size={12}
                            className="translate-y-0.5 text-zinc-400 transition-transform group-hover:-translate-y-0 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-strong)]"
                          />
                        </h3>
                        <p className="mt-1.5 font-serif italic text-zinc-600">
                          {post.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `app/blog/page.tsx` placeholder**

```tsx
import { blogPosts } from "@/data/blog";
import { BlogIndex } from "@/components/blog/blog-index";

export default function BlogIndexPage() {
  return <BlogIndex posts={blogPosts} />;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run lint && npm run build`
Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/blog-index.tsx src/app/blog/page.tsx
git commit -m "feat(blog): add blog index page grouped by year"
```

---

## Task 12: Home-page nav integration + sidebar blogUrl

**Files:**
- Modify: `src/components/section-navigation.tsx`
- Modify: `src/data/aboutme.ts`

- [ ] **Step 1: Add the "Blog" link to the pill nav**

Edit `src/components/section-navigation.tsx`.

Add these imports at the top (alongside existing imports):

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
```

Then replace the `<nav>...</nav>` block at the bottom of the component (currently lines 62-82) with:

```tsx
return (
  <nav className="flex flex-wrap items-center gap-3">
    {visibleSections.map((section) => {
      const isActive = activeSection === section;
      return (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          aria-current={isActive ? "location" : undefined}
          className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-full border transition-all duration-300 ${
            isActive
              ? "border-[color:var(--accent)] text-[color:var(--accent-strong)] bg-amber-50/60"
              : "border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-400"
          }`}
        >
          {getSectionLabel(section)}
        </button>
      );
    })}
    <span className="mx-1 h-4 w-px bg-zinc-300" aria-hidden />
    <Link
      href="/blog"
      className="group inline-flex items-center gap-1.5 px-2 py-1.5 text-xs uppercase tracking-wider text-zinc-600 transition-colors hover:text-[color:var(--accent-strong)]"
    >
      Blog
      <ArrowUpRight
        size={12}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  </nav>
);
```

- [ ] **Step 2: Repoint `blogUrl` in aboutme.ts**

Edit `src/data/aboutme.ts`. Change:

```ts
  blogUrl: "https://n0w0f.github.io/gsoc2025/index.html",
```

to:

```ts
  blogUrl: "/blog",
```

Note: the sidebar link in `src/components/profile-section.tsx` currently has `target="_blank"` on the blog link. Since `/blog` is same-origin, edit that component too — open `src/components/profile-section.tsx`, find the `{aboutMe.blogUrl && ...}` block (around line 62), and remove `target="_blank"` and `rel="noopener noreferrer"` from just that `<a>` tag (keep them on the other socials). Replace the bare `<a>` with a Next `<Link>`:

Add at the top of `profile-section.tsx` (alongside the `Image` import):

```tsx
import Link from "next/link";
```

Replace the `<a href={aboutMe.blogUrl} ...>...</a>` block with:

```tsx
<Link
  href={aboutMe.blogUrl}
  className="group inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300"
>
  <ArrowUpRight
    size={12}
    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
  />
  <span className="tracking-wider uppercase">Blog</span>
</Link>
```

- [ ] **Step 3: Verify build + visual**

Run: `npm run lint && npm run build`
Expected: pass.

Run: `npm run dev` and open `http://localhost:3000/`.
Expected: the nav pills show Publications / Experience / Education, then a hairline divider, then a "Blog ↗" link. Clicking it navigates to `/blog`. The left sidebar "Blog" link also navigates to `/blog` (not a new tab).

- [ ] **Step 4: Commit**

```bash
git add src/components/section-navigation.tsx src/data/aboutme.ts src/components/profile-section.tsx
git commit -m "feat(blog): add Blog link to home nav and repoint sidebar"
```

---

## Task 13: GSoC alias route

**Files:**
- Create: `src/app/gsoc2025/page.tsx`

- [ ] **Step 1: Create the alias page**

```tsx
import Link from "next/link";

export const metadata = {
  title: "Moved — Nawaf Alampara",
  description: "This page has moved to the blog.",
  other: {
    "refresh": "0; url=/blog",
  },
};

export default function GsocAlias() {
  return (
    <div className="min-h-screen bg-[#FFFCF8] flex items-center justify-center">
      <div className="mx-auto max-w-screen-sm px-8 py-24 text-center">
        <p className="font-serif italic text-zinc-700">
          This page has moved. Redirecting you to the blog…
        </p>
        <p className="mt-6 font-sans text-xs uppercase tracking-wider text-zinc-500">
          If you aren&apos;t redirected,{" "}
          <Link
            href="/blog"
            className="underline text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
          >
            go to the blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
```

Note: Next's `metadata.other` adds a `<meta>` tag to `<head>`. For `refresh`, this renders as `<meta name="refresh" content="0; url=/blog">`. Browsers also honor this form (in addition to `http-equiv`), though `http-equiv` is more standard. If visual testing shows the redirect not firing, fall back to adding the meta tag manually via a custom `<head>` element — but try this approach first.

- [ ] **Step 2: Verify build + visual**

Run: `npm run build`
Expected: pass. The output includes a `gsoc2025.html` entry.

Run: `npm run dev` and visit `http://localhost:3000/gsoc2025`.
Expected: the page redirects to `/blog` within a second. If it doesn't, replace the metadata approach with a client component that calls `router.replace("/blog")` in a `useEffect`.

- [ ] **Step 3: Commit**

```bash
git add src/app/gsoc2025/page.tsx
git commit -m "feat(blog): add /gsoc2025 alias that redirects to /blog"
```

---

## Task 14: Write the first post body

**Files:**
- Modify: `src/content/blog/threads-processes-and-parallelism-in-python/index.ts` (re-export real Post)
- Create: `src/content/blog/threads-processes-and-parallelism-in-python/post.tsx`

The post is adapted from `/Users/nalampara/n0w0f/dev/bench/docs/launchers-executors-and-ray.html`. **Keep:** fundamentals (interpreter, CPython, GIL), processes vs threads with shared vs copied memory, sequential vs parallel execution concepts, universal pitfalls. **Drop:** anything naming `bench`, `bench run`, `bench run --flyte`, Ray, KubeRay, Flyte, EpisodeWorker, tool actors, replicates, cluster nodes.

- [ ] **Step 1: Create the post body**

Create `src/content/blog/threads-processes-and-parallelism-in-python/post.tsx` with six sections (matching the `tocItems` we'll register in Step 2). Each section starts with `<section id="...">` so the floating TOC can track it.

Structure:

```tsx
import { Callout } from "@/components/blog/callout";
import { CodeBlock } from "@/components/blog/code-block";
import { InterpreterFlow } from "./diagrams/InterpreterFlow";
import { ProcessVsThreadMemory } from "./diagrams/ProcessVsThreadMemory";
import { GilSwitching } from "./diagrams/GilSwitching";

export default function Post() {
  return (
    <>
      <section id="interpreter">
        <h2>1. What is an interpreter?</h2>
        <p>
          When you run <code>python foo.py</code>, your operating system launches the <strong>Python interpreter</strong>. It reads your source file, compiles it to <strong>bytecode</strong> — low-level instructions like &ldquo;load name x&rdquo;, &ldquo;call function&rdquo;, &ldquo;add two numbers&rdquo; — and executes that bytecode one instruction at a time on a stack machine it maintains in memory.
        </p>
        <p>
          Python the language is a specification. An interpreter is a piece of software that implements that specification. The most common one is CPython, written in C, and the reference implementation.
        </p>

        <InterpreterFlow />

        <h3>1.1 CPython, briefly</h3>
        <p>
          CPython is the interpreter you get when you install Python from python.org or your system package manager. Other implementations exist — PyPy (JIT-compiled), Jython (runs on the JVM), IronPython (on .NET) — but CPython is what almost everyone means when they say &ldquo;Python.&rdquo; Crucially, <em>the GIL is a CPython implementation detail</em>, not a language feature. It&apos;s why the rest of this post matters.
        </p>
      </section>

      <section id="gil">
        <h2>2. The GIL</h2>
        <p>
          The <strong>Global Interpreter Lock</strong> is a mutex inside CPython that guarantees only one thread executes Python bytecode at a time within a single interpreter. It exists because CPython&apos;s memory management — reference counting, garbage collection, object state — is not thread-safe without it. The GIL makes the interpreter safe at the cost of true in-process parallelism for Python code.
        </p>

        <GilSwitching />

        <p>
          Every so often (every few milliseconds, by default), the interpreter releases the GIL to give other threads a chance. When Python code calls into C — like NumPy array operations, or blocking I/O — the C code can release the GIL explicitly while it works. This is why NumPy-heavy or I/O-heavy multithreaded Python can still gain parallelism: the heavy work happens outside the lock.
        </p>

        <Callout variant="info">
          The GIL serializes <em>Python bytecode</em>, not all work. Threads that spend most of their time in C extensions or waiting on I/O can run effectively in parallel.
        </Callout>

        <h3>2.1 What the GIL means in practice</h3>
        <ul>
          <li><strong>CPU-bound pure Python</strong> — threads give you <em>no</em> parallelism. Two threads doing arithmetic will together take roughly as long as one.</li>
          <li><strong>I/O-bound work</strong> — threads work fine. A thread blocked on a socket or a file releases the GIL, and others run.</li>
          <li><strong>Numeric / C-extension work</strong> — threads often work. NumPy, Torch, and many scientific libraries release the GIL for their heavy kernels.</li>
        </ul>
      </section>

      <section id="processes-vs-threads">
        <h2>3. Processes vs threads</h2>
        <p>
          A <strong>process</strong> is an isolated unit from the operating system&apos;s point of view: its own memory, its own file descriptors, its own interpreter if it&apos;s running Python. A <strong>thread</strong> is a unit of execution inside a process — it shares memory and the interpreter with its siblings.
        </p>

        <ProcessVsThreadMemory />

        <p>
          Threads are cheap to create and share memory by default, which makes communication trivial but synchronization tricky. Processes are more expensive and don&apos;t share memory by default, so you pay for communication (pickling, pipes, shared memory segments) but get isolation for free — including freedom from the GIL, because each process has its own GIL.
        </p>

        <h3>3.1 Fork, spawn, and starting methods</h3>
        <p>
          On Linux, Python&apos;s default <code>multiprocessing</code> start method historically was <strong>fork</strong>: the child inherits the parent&apos;s memory via copy-on-write. Fast, but unsafe if the parent holds locks, threads, or native resources. <strong>Spawn</strong> (the default on macOS since Python 3.8, and on Windows always) launches a fresh interpreter and pickles the target function and arguments across. Slower to start, much safer.
        </p>

        <Callout variant="warn">
          Mixing threads and <code>fork()</code> is a known foot-gun. If the parent has threads running, the child only inherits the thread that called fork — any locks those other threads held stay locked in the child. If you need multiprocessing in a threaded program, use <code>spawn</code>.
        </Callout>
      </section>

      <section id="sequential-vs-parallel">
        <h2>4. Sequential vs parallel execution</h2>
        <p>
          Two ways to run N units of work:
        </p>
        <ul>
          <li><strong>Sequentially</strong> — one at a time, in order. Predictable, trivial to debug, no coordination overhead. Total time ≈ sum of each unit&apos;s time.</li>
          <li><strong>In parallel</strong> — several at once, across threads or processes. Faster in wall-clock terms when the work is big enough to outweigh coordination cost.</li>
        </ul>

        <p>
          The choice isn&apos;t always obvious. Parallelism has overhead: spawning workers, serializing arguments and results, coordinating completion. If each unit is short (milliseconds), the overhead can swamp the benefit — you&apos;ll finish <em>slower</em> in parallel than sequentially. This is usually called the &ldquo;fan-out cost&rdquo; crossover.
        </p>

        <h3>4.1 Sequential — the baseline</h3>
        <CodeBlock lang="python">{`results = []
for item in items:
    results.append(do_work(item))`}</CodeBlock>

        <p>
          Boring, correct, and often the right answer. Use this first. Only reach for parallelism when you have evidence it helps.
        </p>

        <h3>4.2 Parallel with threads</h3>
        <CodeBlock lang="python">{`from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(do_work, items))`}</CodeBlock>

        <p>
          Good when <code>do_work</code> is I/O-bound (HTTP calls, file reads, database queries) or calls into a C extension that releases the GIL. No memory copying. Shared state needs locks.
        </p>

        <h3>4.3 Parallel with processes</h3>
        <CodeBlock lang="python">{`from concurrent.futures import ProcessPoolExecutor

if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(do_work, items))`}</CodeBlock>

        <p>
          Good when <code>do_work</code> is CPU-bound pure Python. Each worker gets its own interpreter and its own GIL. Arguments and return values are pickled across process boundaries — keep them small. The <code>if __name__ == &quot;__main__&quot;</code> guard is not optional on <code>spawn</code> systems; without it, the child re-imports your module and tries to spin up more children, ad infinitum.
        </p>
      </section>

      <section id="pitfalls">
        <h2>5. Known pitfalls</h2>

        <h3>5.1 &ldquo;Threads don&apos;t speed up my code&rdquo;</h3>
        <p>
          If the work is CPU-bound pure Python, it won&apos;t — the GIL serializes it. Switch to processes, or move the hot path into a C extension.
        </p>

        <h3>5.2 &ldquo;Processes are hanging on startup&rdquo;</h3>
        <p>
          Usually one of: (a) missing <code>if __name__ == &quot;__main__&quot;</code> guard, (b) the target function isn&apos;t picklable (closures, lambdas, local functions), (c) CUDA or other native state was initialized in the parent before spawning — many libraries forbid forking after that.
        </p>

        <h3>5.3 &ldquo;My parallel code is slower than sequential&rdquo;</h3>
        <p>
          Each unit is probably too small relative to coordination overhead. Batch the work (process N items per task), or use a lower-overhead mechanism — threads instead of processes, or the main thread with asyncio for I/O.
        </p>

        <h3>5.4 &ldquo;The shared dict got corrupted&rdquo;</h3>
        <p>
          Even under the GIL, a sequence of bytecode instructions is not atomic — the interpreter can release the GIL between them. Use <code>threading.Lock</code>, <code>queue.Queue</code>, or thread-local storage. Don&apos;t assume &ldquo;the GIL will protect me&rdquo;; it protects the interpreter from itself, not your data structures from you.
        </p>
      </section>

      <section id="when-to-pick">
        <h2>6. When to pick what</h2>
        <p>
          A short decision tree:
        </p>
        <ul>
          <li><strong>One machine, I/O-bound</strong> — threads, or asyncio if the library supports it.</li>
          <li><strong>One machine, CPU-bound pure Python</strong> — processes.</li>
          <li><strong>One machine, CPU-bound via NumPy/Torch/etc.</strong> — threads often work, because the heavy lifting happens outside the GIL. Measure first.</li>
          <li><strong>One machine, tiny units of work</strong> — sequential. Seriously. Benchmark before reaching for parallelism.</li>
          <li><strong>Many machines</strong> — a distributed framework. Out of scope here, but the single-machine decisions still matter inside each node.</li>
        </ul>

        <p>
          The boring path is usually right: start sequential, measure, then pick the smallest jump (threads or processes) that buys you what you need. Parallelism is a cost you pay for throughput; pay it deliberately.
        </p>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Update the post's index to export the real component and TOC**

Replace `src/content/blog/threads-processes-and-parallelism-in-python/index.ts` with:

```ts
import type { TocItem } from "../index";
import Post from "./post";

export const tocItems: TocItem[] = [
  { id: "interpreter",           label: "Interpreter" },
  { id: "gil",                   label: "The GIL" },
  { id: "processes-vs-threads",  label: "Processes vs threads" },
  { id: "sequential-vs-parallel",label: "Sequential vs parallel" },
  { id: "pitfalls",              label: "Pitfalls" },
  { id: "when-to-pick",          label: "When to pick what" },
];

export default Post;
```

- [ ] **Step 3: Verify build + visual**

Run: `npm run lint && npm run build`
Expected: pass.

Run: `npm run dev`. Open `http://localhost:3000/blog` — the index lists the post under "2026".
Click the post. Confirm:
- Title, date + reading time, description, amber rule are at the top.
- Six sections render with headings.
- The three stepped diagrams are present and the Prev/Next/Reset controls advance them.
- On a wide browser window (≥1024px), the floating TOC appears on the right and highlights the current section as you scroll.
- Code blocks are syntax-highlighted against the cream background.
- Keyboard: focus a diagram (click its border), press `←` / `→` to step.
- Back links and the footer render; "Last updated" shows the post date.

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/threads-processes-and-parallelism-in-python/post.tsx src/content/blog/threads-processes-and-parallelism-in-python/index.ts
git commit -m "feat(blog): write first post — threads, processes, and parallelism"
```

---

## Task 15: Final build + polish

- [ ] **Step 1: Run the full build and check the static output**

Run: `rm -rf out .next && npm run build`
Expected: build succeeds. The `out/` directory contains:
- `out/blog/index.html`
- `out/blog/threads-processes-and-parallelism-in-python/index.html`
- `out/gsoc2025/index.html`
- Existing home-page output unaffected.

- [ ] **Step 2: Serve the static output and check all routes**

Run: `npx serve out -p 4000` (or any static server)
Open in a browser:
- `http://localhost:4000/` — home still works, pill nav shows Blog link
- `http://localhost:4000/blog/` — index shows the post
- `http://localhost:4000/blog/threads-processes-and-parallelism-in-python/` — full post works
- `http://localhost:4000/gsoc2025/` — redirects to `/blog/`

If the GSoC redirect doesn't fire from the static export (some static servers strip unknown meta names), fall back to a client component:

```tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function GsocAlias() {
  const router = useRouter();
  useEffect(() => { router.replace("/blog"); }, [router]);
  return <p>Redirecting… <a href="/blog">Go to blog</a></p>;
}
```

Only swap to this if the meta-refresh didn't fire in practice. Commit separately if changed.

- [ ] **Step 3: Lint pass**

Run: `npm run lint`
Expected: pass, no warnings.

- [ ] **Step 4: Final commit (if anything changed during polish)**

```bash
git add -A
git commit -m "chore(blog): polish after end-to-end build verification" --allow-empty
```

(Use `--allow-empty` only if nothing needed fixing; otherwise commit the real fix.)

---

## Self-review checklist (done during authoring)

- [x] Spec routes → Tasks 1, 10, 11, 13
- [x] Spec data model → Tasks 1, 2
- [x] Spec home-page integration → Task 12
- [x] Spec post-page layout → Tasks 3, 9, 10
- [x] Spec typography (`prose.tsx`) → Task 3
- [x] Spec Callout / Figure / Table → Task 3 (Table styling is inside `prose.tsx`)
- [x] Spec floating TOC → Task 9
- [x] Spec code blocks (Shiki) → Task 4
- [x] Spec stepped diagrams (generic + 3 concrete) → Tasks 5, 6, 7, 8
- [x] Spec `/blog` index design → Task 11
- [x] Spec first-post content transformation → Task 14
- [x] Spec `shiki` dependency → Task 4
- [x] Spec accessibility (focusable diagrams, keyboard, `aria-current`, `prefers-reduced-motion`) → Tasks 5, 9
- [x] Spec out-of-scope items are not implemented (no MDX, no tags, no RSS)
- [x] No placeholders, all code inline, all file paths exact
- [x] Type consistency: `BlogPost`, `TocItem`, `RegisteredPost` used identically everywhere they appear
