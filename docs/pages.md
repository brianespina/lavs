# Pages / routes

| Route | File | Nav `active` | Notes |
|---|---|---|---|
| `/` | `src/pages/index.astro` | `home` | Bespoke 660px video-style hero (not `Hero.astro`) + two `PathwayCard`s + accreditation strip + news grid |
| `/lavs-trading` | `src/pages/lavs-trading/index.astro` | `lavs` | Overview: five service tiles, two lines of business, "who we help," our story |
| `/lavs-trading/landscaping` | `src/pages/lavs-trading/landscaping.astro` | `lavs` | Reference implementation of the 5-page service template |
| `/lavs-trading/farm-development` | `src/pages/lavs-trading/farm-development.astro` | `lavs` | Service template |
| `/lavs-trading/coco-nets` | `src/pages/lavs-trading/coco-nets.astro` | `lavs` | Service template |
| `/lavs-trading/charcoal-briquettes` | `src/pages/lavs-trading/charcoal-briquettes.astro` | `lavs` | Service template |
| `/lavs-trading/vco-oil` | `src/pages/lavs-trading/vco-oil.astro` | `lavs` | Service template |
| `/cortijo` | `src/pages/cortijo.astro` | `cortijo` | No logo mark — type lockup / "C" monogram |
| `/sustainability` | `src/pages/sustainability.astro` | `sustainability` | Three commitments, accreditation grid, photo gallery |
| `/news` | `src/pages/news.astro` | `news` | CMS-backed (Keystatic Cloud) — see [`cms.md`](./cms.md). Category filter works; "Load more" doesn't |
| `/news/[slug]` | `src/pages/news/[slug].astro` | `news` | One article per entry in the `news` content collection, `getStaticPaths()`-generated at build time |
| `/contact` | `src/pages/contact.astro` | `contact` | Flat band hero (no `Hero.astro`), form has no backend |

## Service page template

The five LAVS Trading service pages (`landscaping`, `farm-development`,
`coco-nets`, `charcoal-briquettes`, `vco-oil`) all follow one structure —
built once in `landscaping.astro`, then repeated with page-specific copy:

`SiteNav` → `Hero` (breadcrumb variant) → `ServiceSwitcher` → Overview (copy +
photo) → Scope of work (`NumberedGrid`, 6 items, light theme) → Who this is
for (`NumberedGrid`, 3 items, dark theme, outdented) + 2fr/1fr/1fr photo row →
`SlimCta` → `SiteFooter`.

If a sixth service ever gets added, copy `landscaping.astro`, not one of the
others — it's the maintained reference.

## Not built

- `Mobile-Home.dc.html` was a standalone mobile reference for the home page
  in the original handoff, not a separate route — its spec was folded into
  `SiteNav.astro`'s responsive behavior and into `index.astro`'s own `lg:`
  breakpoints, rather than kept as a separate page.
- No article detail route existed until News & Media moved onto Keystatic —
  the handoff never designed one, so `/news/[slug]`'s layout (hero band,
  category badge, body, sidebar) is original, not from the handoff spec.
