# Blog section — design

**Date:** 2026-04-27
**Status:** Approved, pending spec review

## Goal

Add a blog (`/blog`) to the portfolio site. Ship one first post — "Threads, processes, and parallelism in Python" — adapted from an existing HTML document by removing bench/Ray-specific content. Keep the rest of the site unchanged in tone and layout.

## Non-goals

- MDX authoring pipeline (posts are `.tsx` files for now; revisit if volume warrants)
- Tags, search, RSS, comments (out of scope for v1)
- Syntax-highlighting themes beyond a single light theme
- Cover images or any per-post imagery on the index
- Any migration of the existing GSoC HTML page into the blog system (alias-only for now)

## Routes

| Route | Purpose | Rendering |
| --- | --- | --- |
| `/blog` | Post index — vertical list grouped by year | Static |
| `/blog/[slug]` | Individual post page | Static, via `generateStaticParams` |
| `/gsoc2025` | Alias preserving external inbound links | Static page with `<meta refresh>` to `/blog` |

All routes comply with Next.js `output: export` (static export for GitHub Pages).

## File structure

```
src/app/
  blog/
    page.tsx
    [slug]/page.tsx
  gsoc2025/page.tsx

src/data/
  blog.ts                                      -- BlogPost[] metadata only

src/content/blog/
  index.ts                                     -- slug -> { Component, tocItems } map
  threads-processes-and-parallelism-in-python/
    post.tsx                                   -- default-exported post body
    index.ts                                   -- re-exports post + tocItems
    diagrams/
      InterpreterFlow.tsx
      ProcessVsThreadMemory.tsx
      GilSwitching.tsx

src/components/blog/
  blog-index.tsx
  post-layout.tsx
  floating-toc.tsx
  code-block.tsx                               -- server component, Shiki
  stepped-diagram.tsx                          -- generic stepper
  prose.tsx                                    -- typography wrapper
  callout.tsx
  figure.tsx
```

## Data model

```ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;              // ISO "YYYY-MM-DD"
  description: string;
  draft?: boolean;
}
```

Reading time is **auto-computed** at render time by walking the post's React tree, extracting text, and dividing by 200 wpm. Not a field on `BlogPost`.

Post bodies are **registered** in `src/content/blog/index.ts`:

```ts
export interface TocItem { id: string; label: string; }
export const postComponents: Record<string, {
  Component: React.ComponentType;
  tocItems: TocItem[];
}>;
```

`[slug]/page.tsx` generates params from `blogPosts.filter(p => !p.draft)`, reads both `meta` (from `blog.ts`) and the `Component` / `tocItems` pair (from `postComponents`), and passes them into `PostLayout`.

## Home-page integration

**`src/components/section-navigation.tsx`** — add a divider + "Blog" link at the right of the pill row. The existing pills remain in-page scroll anchors; the new link is a Next `<Link>` to `/blog` with an `ArrowUpRight` icon to signal cross-page navigation.

**`src/data/aboutme.ts`** — change `blogUrl` from the GSoC URL to `/blog`.

**`src/app/gsoc2025/page.tsx`** — minimal page with `<meta http-equiv="refresh" content="0; url=/blog">` and a visible fallback link, preserving existing external inbound links to `n0w0f.github.io/gsoc2025/`.

## Post page layout

- Mobile-first single column.
- On `lg+` (≥1024px): 12-col grid, prose in cols 3–9, floating TOC in cols 10–12.
- Container `max-w-screen-xl`, padding matches home page (`px-8 py-24`).
- Back link (`← All writing`) at top-left and bottom-left.
- Header block: title (serif, 3xl–4xl, light weight), then date + reading time (uppercase, zinc-500, xs), then a 40px amber accent rule, then the description in serif italic.
- Footer mirrors header: back link left, `Last updated [date]` right.

### Typography (in `prose.tsx`)

- Body: PT Serif 17px, `leading-[1.75]`, `text-zinc-800`, `max-w-[38rem]`
- H2: `mt-16 mb-4`, serif 2xl, `text-zinc-900`, hairline `border-t border-zinc-200` + padding-top for rhythm
- H3: serif lg, `text-zinc-900`, `mt-10 mb-3`
- H4: sans xs, uppercase, tracking-wider, `text-zinc-500`, `mt-8 mb-2`
- Inline code: `bg-[#F5F1E8] px-1.5 py-0.5 rounded font-mono text-[0.9em]`
- Links: underlined, `text-zinc-900`, hover `text-[color:var(--accent-strong)]`
- `<strong>`: weight 600, no color shift

### Supporting components

- **Callout** — three variants (`info`/`warn`/`danger`), 2px left border (`accent` / amber / rose), low-opacity tinted bg, serif text, no icons.
- **Figure** — wraps a diagram, renders a `<figcaption>` below in sans xs zinc-500.
- **Table** — full-prose-width, `border-b border-zinc-200` rows, header in `text-[color:var(--accent-strong)]` sans, body serif.
- **Code block** — see below.

### Floating TOC (`floating-toc.tsx`)

- Hidden below `lg`.
- Small list, xs uppercase tracking-wider, `text-zinc-500`.
- Uses `IntersectionObserver` to track the active section (reusing the pattern from `section-navigation.tsx`).
- Active item: `text-[color:var(--accent-strong)]` with a 2px amber `border-l`.
- Smooth scroll on click.
- Each post declares its own `tocItems` co-located with the post — no runtime DOM scraping.

## Code blocks (Shiki)

- Add `shiki` as a dependency.
- `code-block.tsx` is a **server component**. It calls `codeToHtml` with `theme: "github-light"` at build time and returns the resulting HTML via `dangerouslySetInnerHTML` inside a `<pre>`.
- Wrapper: `bg-[#F5F1E8] rounded-lg px-5 py-4 overflow-x-auto text-sm font-mono border border-zinc-200/60`.
- Zero client JS. Works with static export.
- Usage: `<CodeBlock lang="python">{\`import threading\n...\`}</CodeBlock>`.

## Stepped diagrams

A single generic controller `SteppedDiagram`:

```tsx
<SteppedDiagram
  title="GIL switching across threads"
  steps={[
    { label: "Thread A holds GIL, Thread B waits", render: (p) => <Step index={0} {...p} /> },
    // ...
  ]}
/>
```

- Controls (lower-right of figure): `← Prev` / `Next →` / `Reset`, small zinc buttons.
- Step indicator: `1 / N` with a dash progress row above the controls.
- Keyboard: `←`/`→` when the figure has focus.
- `prefers-reduced-motion`: instant transitions (no animated SVG properties) when the user prefers reduced motion.
- SVG palette: transparent bg, `zinc-400` strokes, `zinc-100` / `amber-50` fills, `var(--accent)` accent lines, serif `zinc-800` text.

**Three diagrams for v1:**

1. **Interpreter flow** — `foo.py` → compile → bytecode → execute (4 steps).
2. **Process vs thread memory layout** — single process → forked process (copied) → two threads (shared) (3 steps).
3. **GIL switching** — thread-A-holds → pre-empt → thread-B-holds (3 steps).

## Index page (`/blog`)

- Header: `Writing` (serif 4xl) + one-line tagline + 40px amber rule.
- Posts grouped by year (desc); within year by date desc.
- Each row: 3-col grid on `sm+` (`[date | title + description]`), stacks on mobile.
- Full row is a `<Link>`; hover → title shifts to accent, arrow icon nudges right.
- No images, no tags, no pagination for v1.
- `← Home` link top-left.
- Drafts (`post.draft === true`) filtered out.
- Empty state text: "Nothing here yet."

## First post — content transformation

**Source:** `/Users/nalampara/n0w0f/dev/bench/docs/launchers-executors-and-ray.html`

**Keep (re-themed and re-framed as generic Python content):**
- Fundamentals subsections on interpreter, CPython, the GIL
- Processes, threads, shared memory vs copied memory
- Sequential vs parallel execution concepts (without `bench` naming)
- Universally-applicable pitfalls (e.g., GIL misconceptions, fork safety)

**Drop:**
- `bench`-specific naming and CLI (`bench run --flyte`, `bench run`)
- Ray, KubeRay, Flyte sections
- `EpisodeWorker`, "tool actors", replicates vs cluster nodes
- Any content that only makes sense in the context of the bench repo

**Title:** "Threads, processes, and parallelism in Python"
**Slug:** `threads-processes-and-parallelism-in-python`
**Description:** "A first-principles walk through interpreters, the GIL, threads, and processes — and when each gives you real parallelism."

## Dependencies added

- `shiki` (build-time code highlighting, zero client cost)

No other new dependencies. No animation libraries — stepped diagrams use plain `useState`.

## Accessibility

- Stepped diagram figures are focusable (`tabIndex={0}`); keyboard step navigation.
- Controls are real `<button>`s with labels.
- TOC active item uses `aria-current="location"`.
- Diagrams include `<title>` elements inside SVG and `role="img"` on the outer `<svg>`.
- `prefers-reduced-motion` disables SVG transitions.

## Out-of-scope, explicitly deferred

- Syntax theming / dark mode
- Tags, search, RSS, OpenGraph images per post
- Migrating the existing GSoC HTML into a blog post (only alias route for now)
- MDX pipeline
- Reading-progress bar, share buttons, related posts
