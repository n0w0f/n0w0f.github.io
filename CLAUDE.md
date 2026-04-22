# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based research website template designed to showcase publications, experience, education, and portfolio items. The site uses a data-driven approach where all content is defined in TypeScript data files, making it easy to maintain and update without touching React components.

This template was created as a more maintainable alternative to HTML/CSS templates like the Jon Barron template, which can grow to thousands of lines of duplicate code. This approach keeps content separate from presentation.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (accessible at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Note: This project does not include tests.

## Architecture & Structure

### Data-Driven Design
All content is defined in TypeScript files in `src/data/`:

- `aboutme.ts` - Profile information and description (supports HTML)
- `publication.ts` - Publications with schema (year, conference, title, authors, optional: paperUrl, codeUrl, bibtex, tldr, imageUrl, award)
- `experience.ts` - Work experience entries
- `education.ts` - Educational background
- `portfolio.ts` - Portfolio/project items
- `news.ts` - News/announcements (supports HTML in description, optional: link, imageUrl, tags)
- `section-order.ts` - Defines the `Section` enum and the order sections render (News, Publication, Experience, Education, Portfolio)
- `section-config.ts` - Per-section collapse behavior (`isCollapsed`, `visibleItemsWhenCollapsed`) keyed by the `Section` enum; consumed by `CollapsibleSection` via `SectionsContainer`
- `title-description.ts` - SEO metadata

React components in `src/components/` are purely presentational and consume data from these files. Any field marked with `?` in the TypeScript interfaces is optional - providing optional fields automatically enables corresponding UI features (e.g., adding `bibtex` to a publication displays a bibtex button).

### Section rendering pipeline
`page.tsx` hands `sectionOrder` plus all data arrays to `SectionsContainer`, which iterates the order and wraps each section in `CollapsibleSection` using the rules from `section-config.ts`. `SectionNavigation` renders jump-to links derived from the same `sectionOrder`. To add a new section type: extend the `Section` enum, add an entry to `sectionOrder`, add a config entry in `section-config.ts`, and wire the rendering branch in `SectionsContainer`.

### Page Layout
The main page (`src/app/page.tsx`) uses a 12-column grid:
- Left: 4-column sticky profile section
- Right: 7-column scrolling content area (starts at column 6)
- Responsive: stacks on mobile
- Color scheme: `bg-[#FFFCF8]` background with Tailwind CSS

Sections render in the order specified in `section-order.ts`. The About section (from `aboutme.description`) always displays first if present.

### TypeScript Configuration
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled

## Key Features

### HTML Support in Content
Both `aboutme.description` and `news.description` support HTML content, allowing for inline links and formatting:
```typescript
description: "I will contribute to <a href='https://example.com'>Example Org</a>."
```

### Image Handling
- Remote images: Add the host to `images.remotePatterns` in `next.config.ts` before referencing an external image URL; otherwise `next/image` will reject it at build time.
- Local images: Place in `/public/static/` and reference as `/static/filename.png`

## Deployment

### GitHub Pages (Primary Method)
The repository is configured for automatic deployment to GitHub Pages:

1. GitHub Actions workflow (`.github/workflows/nextjs.yml`) triggers on push to `main`
2. Workflow builds Next.js site as static export (outputs to `./out`)
3. Deploys to GitHub Pages environment
4. Site available at `https://[username].github.io/` (if repo is named `[username].github.io`)

To set up:
- Repository name should be `[username].github.io` for main GitHub Pages site
- In repository Settings → Pages, set Source to "GitHub Actions"
- Push to `main` branch triggers automatic deployment

### Vercel (Alternative)
For custom domain deployment:
1. Create Vercel account and import repository
2. Vercel auto-detects Next.js and configures build
3. Deploy with one click

## Adding Content

To add content, modify arrays in `src/data/` files:

```typescript
// Example: Adding a publication in src/data/publication.ts
export const publicationData: Publication[] = [
  {
    year: "2024",
    conference: "Conference Name",
    title: "Paper Title",
    authors: "Author Names",
    paperUrl: "https://arxiv.org/...",  // optional
    codeUrl: "https://github.com/...",   // optional
    bibtex: "...",                       // optional - enables bibtex button
  },
];
```

All interfaces define required and optional fields. Optional fields automatically enable corresponding UI features when provided.