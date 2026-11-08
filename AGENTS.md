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

- **Tokens** (in `src/styles/globals.css`): `--background`, `--card`, `--foreground`, `--muted`, `--subtle`, `--border`, `--accent`, defined on `:root` (light: white/black/hot-pink `#ec4899`) and `.dark` (black/white/`#f472b6`), set by next-themes (attribute `class`). Consume them via Tailwind utilities (`bg-background`, `text-muted`, `text-accent`, …) wired through `@theme inline`. Never hardcode colors.
- **Palette rule**: black/white only, hot pink for anything that needs highlighting. No other accent colors.
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
