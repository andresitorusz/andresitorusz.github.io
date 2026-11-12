<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Personal Website

Personal website at [andresitorusz.github.io](https://andresitorusz.github.io), deployed via GitHub Pages.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — type-check and static export to `out/`
- `npm run lint` — ESLint (flat config)
- `npx serve out` — preview the exported site

## Stack & Architecture

- **Next.js (Pages Router)** + React 19 + TypeScript + Tailwind CSS v4, statically exported (`output: 'export'` in `next.config.ts`). No server runtime — everything must work client-side or at build time.
- **Deploy**: pushing to `main` triggers `.github/workflows/deploy.yml` (build → `out/` → GitHub Pages). The Pages source must stay set to **GitHub Actions**.
- **No framer-motion** — page transitions and expand/collapse animations are pure CSS (`src/styles/site.module.css`).
- **Fonts**: Google Sans, self-hosted TTFs in `src/styles/fonts/`, loaded via `next/font/local` in `src/components/layout.tsx`. Do not replace with a Google Fonts variable font.
- **Images**: all brand logos are 128px webp in `public/assets/logos/` (standardize new ones with Pillow before committing). `pfp.webp`, `favicon.png`, and `og.png` are generated assets — when regenerating `og.png`, reuse `public/assets/pfp.webp` and the Google Sans TTFs.

## Design System

### Color Palette

Tokens live in `src/styles/globals.css` on `:root` (light) and `.dark` (set by next-themes, attribute `class`), consumed via Tailwind utilities (`bg-background`, `text-muted`, `text-accent`, …) wired through `@theme inline`.

| Token          | Light     | Dark      | Usage                                                        |
| -------------- | --------- | --------- | ------------------------------------------------------------ |
| `--background` | `#ffffff` | `#000000` | Page canvas                                                  |
| `--card`       | `#f5f5f5` | `#141414` | Chips, tiles, icon buttons, skeletons, show-more pills       |
| `--foreground` | `#000000` | `#ffffff` | Primary text, headings                                       |
| `--muted`      | `#555555` | `#a8a8a8` | Secondary text, descriptions                                 |
| `--subtle`     | `#8a8a8a` | `#6f6f6f` | Captions, dates, metadata                                    |
| `--border`     | `#e4e4e4` | `#2b2b2b` | Borders, dividers, button outlines                           |
| `--accent`     | `#ec4899` | `#f472b6` | Highlights: links, active states, current-role dot, accents  |

GitHub heatmap levels (`--heat-0` … `--heat-4` in the same two blocks):

| Light                     | Dark                      |
| ------------------------- | ------------------------- |
| `#f0f0f0 → #a11d5f` (0–4) | `#1e1e1e → #f472b6` (0–4) |

Rules:

- Black/white canvas only; pink is reserved for highlighting. No other accent colors. Dark background stays pure `#000000`.
- **Never hardcode colors** outside `globals.css` — no hex, `rgb()`, or `color-mix` with literal colors in components or `site.module.css`. Derive tints from tokens (e.g. `color-mix(in oklab, var(--border) 8%, transparent)`).
- Baked generated assets (`og.png`, the pfp frame) may carry the accent hex at generation time.

### Spacing & Layout

- **Spacing rhythm**: 4px (`mt-1` / `space-y-1`) between consecutive content lines inside a section; 16px (`py-4`) padding inside panels; 32px between sections. Keep it identical across all sections.
- **Layout**: centered `max-w-3xl` column with `px-4 sm:px-6` gutter everywhere (header, footer, all sections).
- **Sections** (`src/components/section.tsx`): `Panel` for the home sections (text-xl title, anchor id), `Section` for page-level wrappers (optional small-caps accent title).
- **Show more/less**: exactly 3 items visible by default; hidden rows wrap in `styles.collapsible` + `styles.collapsibleOpen` (CSS grid animation) with the standard text button + rotating chevron.
- **Descriptions** (experience highlights, volunteering) collapse the same way; icon-only pink chevron button on the row's right; experience descriptions open by default, volunteering closed.
- **Theme-aware logos**: `src/components/themed-logo.tsx` reads `--logo-*` CSS vars (defined in `site.module.css` on `:root` and `.dark`) — github, x, sirclo, del. Plain logos use `logoShape: 'rounded-square' | 'full' | 'circle'` in the data.
- **Animations** must respect `prefers-reduced-motion`.

## Content & Data

- All content lives in `src/data/`: `profile.ts` (PROFILE, EXPERIENCES, LICENSES, EDUCATION, PROJECTS, VOLUNTEERING + their types) and `content.ts` (bio, timezone label). Components never hardcode copy.
- **Privacy rule**: no email address, phone number, or mailto/Gmail-compose links anywhere in the codebase. Contact goes through external profile links only.
- Dates in experience entries are `"MMM yyyy"` strings; durations render inclusively (start–end + 1 month) via `formatDuration` in `experience.tsx`.

## Conventions

- Shared helpers go in `src/lib/` (`cn`, `github-contributions`). Reuse before writing new ones.
- Accessibility: `aria-label` on every icon-only button/link, `sr-only` headings for visually-headered sections, alt text on meaningful images.
- Do not commit unless the user asks. When a fix is complete, recommend a conventional commit message (`feat:`, `fix:`, `chore:`, `revert:`, `perf:`, `docs:`).
- `temp/` holds user-supplied source material (photos, resume) — never commit it.
