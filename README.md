# IVSHI Redesign (MVP)

Modern Next.js + Tailwind implementation of the Imperial Valley Student Health Initiative site.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Vercel deployment target

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_INSTAGRAM_FEED_URL=https://your-feed-endpoint.example/json
```

Notes:
- If `NEXT_PUBLIC_INSTAGRAM_FEED_URL` is missing or unavailable, the homepage carousel uses curated fallback posts.
- Replace outbound form and Notion URLs in `content/site.ts` and `content/pillars.ts`.

## MVP Pages

- `/`
- `/about`
- `/programs`
- `/team`
- `/get-involved`

## SEO + Ops Included

- Metadata and Open Graph
- `sitemap.xml` and `robots.txt`
- 404 page
- GA4 page and CTA click tracking

## QA Checklist

- Run `npm run typecheck`
- Run `npm run lint`
- Run `npm run build`
- Verify all external links and form URLs
- Verify mobile layouts at 360, 390, 768, 1024, 1280 widths
