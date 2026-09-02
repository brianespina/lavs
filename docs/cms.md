# CMS — Keystatic Cloud

News & Media is backed by [Keystatic](https://keystatic.com), using Keystatic
Cloud (project `lavs-trading/lavs`) so non-technical editors can add articles
without a GitHub account or touching code.

## How it fits together

- **`keystatic.config.ts`** (project root) — the CMS schema. Defines one
  collection, `news`, with fields: `title` (also the slug), `category`
  (select), `date`, `featured` (checkbox), `excerpt`, `coverImage`, and
  `body` (Markdoc rich text).
- **Storage is `kind: 'cloud'`** — per Keystatic's own docs, a Cloud project
  is connected to a specific GitHub repository. Editors authenticate through
  Keystatic Cloud (no GitHub account needed on their end), but saved entries
  still end up as committed files in the repo — Keystatic Cloud is an
  auth/hosting layer on top of git, not a separate content database. This
  repo needs to actually be connected to the `lavs-trading/lavs` Cloud
  project in the Keystatic Cloud dashboard for saves to go anywhere.
- **Content lives at `src/content/news/*.mdoc`** — one file per article,
  YAML frontmatter + Markdoc body. This is genuinely the same content
  whether it was written by hand (as the 9 seed articles were) or saved
  through the `/keystatic` admin UI — same files, same format.
- **`src/content.config.ts`** — the Astro-side mirror of the same schema
  (as a zod object), so `getCollection('news')` / `getEntry('news', slug)`
  are fully typed. **This has to be kept in sync with `keystatic.config.ts`
  by hand** — there's no shared runtime between the two config files, only
  the category list itself is shared (both import `NEWS_CATEGORIES` from
  `src/lib/news.ts`).
- **`src/lib/news.ts`** — single source of truth for the 3 categories
  (LAVS Trading / Cortijo / Sustainability & Community), their badge
  colors, and a shared date formatter. Add a category here first if you
  ever need a 4th.

## Pages that read from it

| Page | What it pulls |
|---|---|
| `src/pages/news.astro` | Everything — grouped into a LAVS feature+thumbs block, a Cortijo 3-up grid, and a Sustainability feature band, each pulling the latest entries in that category. The filter strip (`data-filter` buttons) toggles which `data-section` blocks are visible — client-side only, no re-fetch. |
| `src/pages/news/[slug].astro` | One entry at a time via `getStaticPaths()` + `render()`, rendering the Markdoc `body` as the article. Prerendered at build time like every other page — adding an article means a new file, not a new deploy step. |
| `src/pages/index.astro` | The 3 most recent entries overall (any category), for the homepage's "News & media" grid. |

## Adding content

Two ways, both produce the same files:

1. **Through the CMS** — run `npm run dev`, visit `/keystatic`, sign in via
   Keystatic Cloud, add/edit a `news` entry. Requires this repo to be
   connected to the `lavs-trading/lavs` Cloud project (see above) for saves
   to persist anywhere beyond the local working tree.
2. **By hand** — add a `.mdoc` file to `src/content/news/` following the
   shape of any existing one (frontmatter fields must match
   `src/content.config.ts`'s schema exactly, including `category` being one
   of the three exact strings in `src/lib/news.ts`). Put the cover image in
   `public/images/news/` and point `coverImage` at `/images/news/<file>`.

Either way, `npm run build` will fail loudly (zod validation) if a required
field is missing or a category string doesn't match — that's intentional,
not a bug to work around.

## Why the Cloudflare adapter is now required

Keystatic's Astro integration injects two routes — `/keystatic/[...params]`
and `/api/keystatic/[...params]` — both with `prerender: false`, i.e. they
need on-demand (server) rendering, since the admin UI and its backing API
can't be statically generated. Astro requires an adapter for any
non-prerendered route to build for production, so `@astrojs/cloudflare` was
added (matching the `workers.dev` URL already registered as this project's
Primary URL in Keystatic Cloud). Every other page is still fully static —
`astro build` prerenders them same as before; only the two Keystatic routes
run on-demand on Cloudflare Workers at request time.

## What's not set up yet

- **Pushing this repo to GitHub and connecting it in the Keystatic Cloud
  dashboard.** Until that's done, `/keystatic` will let you sign in but
  saves won't land anywhere durable. See `docs/open-items.md`.
- `worker-configuration.d.ts` (Cloudflare's generated binding types) is
  gitignored — regenerate it locally with `npx wrangler types` if you add a
  binding to `wrangler.jsonc` and want it typed. Neither the build nor
  `astro check` currently depend on this file existing.
- **Deploying to Cloudflare Workers.** `wrangler.jsonc` exists
  (worker name `lavs-trading`) but nothing has been deployed — that's a
  separate step (`wrangler deploy` after `npm run build`, or wiring up CI).
- **Pagination / "Load more updates."** Still a static, non-functional
  button — same open item as before, now just backed by real content
  instead of placeholders. `/news` currently shows up to 3 LAVS Trading,
  3 Cortijo, and 1 featured Sustainability & Community entry; anything
  beyond that per category isn't surfaced on the listing page yet (though
  every entry does get its own `/news/[slug]` page regardless).
