# Component reference

Everything below lives in `src/components/` (or `src/layouts/` for the one
layout). This is the API surface — read a component's own source for
implementation detail, but this is the contract other pages should code against.

## Layout

### `layouts/BaseLayout.astro`
Props: `title` (required), `description?`.
Renders `<html><head>` — meta, favicon, page `<title>`, Google Fonts links for
Archivo — and a `<slot />` for the body. Every page wraps its content in this.

## Navigation & chrome

### `SiteNav.astro`
Props: `active?: "home" | "lavs" | "cortijo" | "sustainability" | "news" | "contact"`
(default `"home"`).
The shared two-row nav (utility bar + main bar) plus the two enterprise
dropdowns. Desktop dropdowns open on `mouseenter`, close 260ms after
`mouseleave` (debounced via an inline `<script>` at the bottom of the
component — vanilla DOM, no framework). Below the `lg` breakpoint (1024px) it
collapses to a hamburger + slide-down panel, matching the `Mobile-Home.dc.html`
reference. This is the **only** component that's responsive on every page —
see [`decisions.md`](./decisions.md) for why.

### `SiteFooter.astro`
No props. Global CTA band (photo + `.86` forest overlay) + the four-column
footer link grid + bottom bar. Same on every page.

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
Props: `active: "landscaping" | "farm-development" | "coco-nets" | "charcoal-briquettes" | "vco-oil"`.
The five-tab strip on the LAVS service pages. Active tab gets a persistent
gold-light fill.

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

### `PathwayCard.astro`
Props: `brand: "lavs" | "cortijo"`, `eyebrow`, `title`, `image`, `imageAlt`,
`description`, `ctaLabel`, `ctaHref`, `icons: PathwayIcon[]` where
`PathwayIcon = { href, label, svg }` and `svg` is raw inner-SVG markup
(rendered via `set:html` — only ever pass fixed, internally-authored icon
markup here, never user input). Home page only.

### `NewsCard.astro`
Props: `image`, `imageAlt`, `category: "LAVS Trading" | "Cortijo" | "Sustainability"`,
`date`, `title`, `excerpt`, `href`. The news/media card used on Home and
News & Media.

## Adding a new component

Match the existing pattern: a typed `Props` interface in frontmatter, no
inline `style` attributes, colors and radii from the design tokens only (see
[`design-system.md`](./design-system.md)), `class?` prop accepted and merged
last so callers can extend (not override radius/variant — use a dedicated
prop for anything that has specificity implications).
