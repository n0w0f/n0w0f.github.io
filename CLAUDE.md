# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based research website template designed to showcase publications, experience, education, and portfolio items. The site uses a data-driven approach where all content is defined in TypeScript data files, making it easy to maintain and update without touching React components.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture & Structure

### Data-Driven Design
The website follows a data-driven architecture where all content is defined in `src/data/` files:

- `src/data/aboutme.ts` - Profile information and description
- `src/data/publication.ts` - Publications with schema definitions
- `src/data/experience.ts` - Work experience entries
- `src/data/education.ts` - Educational background
- `src/data/portfolio.ts` - Portfolio/project items
- `src/data/news.ts` - News/announcements
- `src/data/section-order.ts` - Controls the order sections appear on the page
- `src/data/title-description.ts` - Custom metadata for SEO

### Component Structure
React components in `src/components/` are purely presentational and consume data:

- `profile-section.tsx` - Left column profile display
- `publication-entry.tsx` - Individual publication display
- `experience-entry.tsx` - Individual experience entry
- `education-entry.tsx` - Individual education entry
- `portfolio-entry.tsx` - Individual portfolio item
- `news-entry.tsx` - Individual news item

### Layout System
- Uses Tailwind CSS with a custom color scheme (`bg-[#FFFCF8]`)
- Grid-based layout: 4-column profile section (sticky) + 7-column content area
- Responsive design that stacks on mobile

### TypeScript Configuration
- Path aliases configured: `@/*` maps to `./src/*`
- Strict TypeScript settings enabled
- Next.js plugin integration

## Key Features

### Section Ordering
Sections can be reordered by modifying the `sectionOrder` array in `src/data/section-order.ts`. Available sections: News, Publication, Experience, Education, Portfolio.

### Data Schema Flexibility
Each data type has a well-defined TypeScript interface with optional fields (marked with `?`). Adding optional fields automatically enables corresponding UI features.

### Image Handling
- Remote images configured in `next.config.ts` for domains: images.unsplash.com, lamalab.org, github.com
- Local images served from `/public/static/`

## Deployment

### GitHub Pages
- Automated deployment via `.github/workflows/nextjs.yml`
- Deploys on push to `main` branch
- Uses GitHub Actions to build and deploy to GitHub Pages

### Configuration
- ESLint with Next.js TypeScript rules
- PostCSS with Tailwind CSS
- Static site generation optimized for GitHub Pages

## Adding Content

To add new content, simply modify the relevant data file:

1. **Publications**: Add objects to `publicationData` array in `src/data/publication.ts`
2. **Experience**: Add objects to `experienceData` array in `src/data/experience.ts`
3. **Education**: Add objects to `educationData` array in `src/data/education.ts`

Each interface defines required and optional fields. Optional fields enable additional UI features when provided.