# Component reference

Everything below lives in `src/components/` (or `src/layouts/` for the one
layout). This is the API surface — read a component's own source for
implementation detail, but this is the contract other pages should code against.

## Layout

### `layouts/BaseLayout.astro`
Props: `title` (required), `description?`.
Renders `<html><head>` — meta, favicon, page `<title>`, Google Fonts links for
Archivo and Bitter (Bitter is Cortijo-only, but loaded here so `CortijoPanel`
works on Home/Sustainability without a second font request) — and a
`<slot />` for the body. Every page except `/cortijo` wraps its content in
this; `/cortijo` uses `layouts/CortijoLayout.astro` instead (see below).

### `layouts/CortijoLayout.astro`
Props: `title` (required), `description?`. Used only by `src/pages/cortijo.astro`.
Same shape as `BaseLayout.astro` (meta, favicon, fonts, `<slot />`) but with a
Cortijo-specific title suffix and default meta description — `/cortijo`
doesn't share `SiteNav`/`SiteFooter` or the LAVS body defaults, so it doesn't
share the layout either. See [`design-system.md`](./design-system.md#cortijo-brand-system).

## Navigation & chrome

### `SiteNav.astro`
Props: `active?: "home" | "lavs" | "sustainability" | "news" | "contact"`
(default `"home"`).
The shared two-row nav (utility bar + main bar) plus the LAVS Trading &
Development dropdown. Desktop dropdown opens on `mouseenter`, closes 260ms
after `mouseleave` (debounced via an inline `<script>` at the bottom of the
component — vanilla DOM, no framework). Below the `lg` breakpoint (1024px) it
collapses to a hamburger + slide-down panel. This is the **only** component
that's responsive on every page — see [`decisions.md`](./decisions.md) for
why. Cortijo de Palsabangon is **not** a nav destination — it's reached from
inside LAVS pages via `CortijoPanel.astro`; see
[`design-system.md`](./design-system.md#cortijo-brand-system).

### `SiteFooter.astro`
No props. Global CTA band (photo + `.86` forest overlay, single CTA button)
+ the four-column footer link grid (Brand / LAVS Trading / Sustainability &
community — which carries a `/cortijo` link — / Quick links) + bottom bar.
Same on every page except `/cortijo`, which uses `CortijoFooter.astro`.

### `CortijoNav.astro`
Props: `showLavsStrip?: boolean` (default `true`). Page-local nav for
`/cortijo` only — not used anywhere else. Renders the optional LAVS
group-attribution strip plus Cortijo's own nav bar (same-page anchor links +
an Enroll button). See [`design-system.md`](./design-system.md#cortijo-brand-system).

### `CortijoFooter.astro`
No props. Page-local footer for `/cortijo` only — light background, the
inverse of `SiteFooter.astro`, a deliberate signal that this is a different
brand. Includes the "Part of the LAVS group" attribution tile linking back
to `/`.

### `CortijoLockup.astro`
Props: `context: "nav" | "footer" | "panel" | "panel-mobile"`, `class?`. The
Cortijo type-only wordmark (no logo mark exists — see decisions.md) at the
size/tone/descriptor combination used in each of its four call sites.

### `CortijoPanel.astro`
Props: `image` (required), `imageAlt?`. The "introduction panel" — Cortijo's
framed window into a LAVS page, used on Home and Sustainability. The calling
page supplies the outer LAVS-toned eyebrow/headline/caption furniture (same
inline pattern used elsewhere on those pages); this component is just the
Cortijo-toned panel itself. Mobile stacking follows `Mobile-Home.dc.html`
exactly — the one part of the Cortijo work with a real mobile design.

## Content primitives

### `Logo.astro`
Props: `size?: number` (default 46), `variant?: "dark" | "light"` (default
`"dark"`), `class?`. The brand mark, inline SVG.

### `QuadrantGlyph.astro`
Props: `size?: number` (default 13), `class?`. Monochrome eyebrow glyph,
`currentColor`-driven. Used inside `SectionLabel`, rarely needed directly.

### `SectionLabel.astro`
Props: `text` (required), `color?` (a Tailwind text-color class, default
`"text-sage"`), `size?: "default" | "sm"`, `class?`.
The glyph + uppercase tracked eyebrow that precedes every section headline.
Pass one color class; both the glyph and text pick it up via `currentColor`.

### `Button.astro`
Props: `href?`, `variant?: "gold" | "forest" | "outline-bone" | "outline-forest" | "outline-sage"`
(default `"gold"`), `pad?` (Tailwind padding classes, default `"px-6 py-[15px]"`),
`radius?: "field" | "control"` (default `"control"`), `class?`.
Renders `<a>` if `href` is given, else `<button>`. **Always set `radius`
explicitly via the prop, never via the `class` prop** — appending a
conflicting `rounded-*` utility through `class` is a specificity trap (see
[`decisions.md`](./decisions.md)).

### `Hero.astro`
Props: `image`, `imageAlt`, `title`, `lead` (all required), `eyebrow?`,
`breadcrumb?: { parentLabel, parentHref, current }`.
The standard interior hero: 440px (320px on mobile), photo background at
`.68` forest overlay. Pass either `eyebrow` (plain pages) or `breadcrumb`
(service subpages show "Parent / Current" instead) — not both. **Not used on
Contact**, which has a flat band hero instead (built inline on that page) or
Home (which has its own bespoke 660px video-style hero, built inline in
`index.astro`).

### `ServiceSwitcher.astro`
Props: `active: "landscaping" | "farm-development" | "planting-materials-seedlings" | "bulk-agro-industrial-supplies"`.
The four-tab strip on the LAVS service pages. Active tab gets a persistent
gold-light fill. Consolidated from five tabs to four by client direction —
see [`decisions.md`](./decisions.md).

### `NumberedGrid.astro`
Props: `items: { num, title, body }[]`, `columns?: 2 | 3` (default 2),
`theme?: "light" | "dark"` (default `"light"`).
The "01 / 02 / 03…" grid pattern — dividers via `gap-[2px]` over a
border-colored parent. `theme="dark"` renders the forest-band variant that's
outdented `-32px` on `lg` so column one still lines up with the page gutter
(pass `num: ""` per item if that variant shouldn't show numerals — see the
"Who this is for" sections on service pages).

### `SlimCta.astro`
Props: `question`, `subline`, `ctaLabel`, `ctaHref` (all required).
The closing CTA band every interior page ends on instead of a third filled
button (`bone-deep` background, arrow-link CTA). Comes right before
`<SiteFooter />` on every interior page.

### `NewsCard.astro`
Props: `image`, `imageAlt`, `category: NewsCategory` (from `src/lib/news.ts` —
currently `"LAVS Trading" | "Community & Education" | "Sustainability & Community"`),
`date`, `title`, `excerpt`, `href`. The news/media card used on Home and
News & Media.

## Adding a new component

Match the existing pattern: a typed `Props` interface in frontmatter, no
inline `style` attributes, colors and radii from the design tokens only (see
[`design-system.md`](./design-system.md)), `class?` prop accepted and merged
last so callers can extend (not override radius/variant — use a dedicated
prop for anything that has specificity implications).
