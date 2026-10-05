# Navigators at GCU

Next.js (App Router) + React + TypeScript site for The Navigators at Grand Canyon University.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

## Structure

```
app/
  layout.tsx       Root layout: metadata, viewport, fonts (next/font)
  page.tsx         Home page, composes the section components
  globals.css      All site styles (ported verbatim from the original HTML)
components/        Navbar, Hero, Gallery (3D photo spiral), About, Events,
                   Staff, Parents, Connect/ContactWay, Footer, SectionHead
lib/content.ts     Editable content: spiral photos and contact links
public/assets/     Logo
public/images/     Ministry photos (see PUT-PHOTOS-HERE.txt)
legacy/index.html  The original static page, kept for reference
```

## Adding photos

Drop images into `public/images/`, then set `src` for each entry in `PHOTOS` in `lib/content.ts`
(e.g. `src: "/images/photo-01.jpg"`).

## Extending

- **API routes:** add `app/api/<name>/route.ts`.
- **Env vars / secrets:** copy `.env.example` to `.env.local`.
- **Deploy:** import the repo into Vercel; no extra config required.
