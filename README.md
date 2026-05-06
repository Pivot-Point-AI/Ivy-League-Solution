# Ivy League Solutions — Website

A professional Next.js 15 website for Ivy League Solutions, targeting the North American market.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Fonts**: Cormorant Garamond (display) + DM Sans (body) + DM Mono (code/labels)
- **Design**: Dark luxury theme — deep navy/slate with ivy green + gold accents

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Services overview, Industries, Testimonials |
| `/services` | Full services listing — DTS & DIS sections |
| `/solutions` | Portfolio — completed projects with filterable categories |
| `/products` | Proprietary products — Datum + roadmap |
| `/ai` | AI Division — powered by AI Brigade partnership, iframe embed |
| `/about` | Company story, timeline, values, leadership |
| `/contact` | Contact form with service/budget selection |

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm run start
```

## Design System

### Colors
- **Ivy Green**: `#2D6A4F` (primary brand)
- **Gold**: `#D4A017` (accent)
- **Slate Dark**: `#0a0f1a` (background)

### Typography
- **Display**: Cormorant Garamond — headings, hero text, section titles
- **Body**: DM Sans — paragraphs, UI copy
- **Mono**: DM Mono — labels, tags, tech identifiers

### Key Components
- `Navbar` — sticky, scroll-aware, mobile-responsive with animated hamburger
- `Footer` — multi-column with social links and status indicator
- `SectionHeader` — reusable section heading with tag, title, highlight, description

## Content Sources

Content compiled from:
- **MeeramTech** (meeramtech.com) — services, solutions, client portfolio
- **AppInSnap** (appinsnap.com) — product development capabilities
- **AI Brigade** (aibrigade.vercel.app) — AI solutions, embedded iframe on /ai page

## Customization

1. Update `src/app/layout.tsx` metadata with real domain
2. Replace contact form handler with your backend endpoint
3. Add real team photos/data in `src/app/about/page.tsx`
4. Connect analytics (Google Analytics, Vercel Analytics)
5. Update tech partner logos in `/public/brands/`

## Deployment

Optimized for Vercel deployment:
```bash
vercel deploy
```

Or any Node.js hosting (Railway, Render, AWS, etc.)

---

Built with ❤️ by Ivy League Solutions Engineering Team
