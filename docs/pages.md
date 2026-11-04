# Pages / routes

| Route | File | Nav `active` | Notes |
|---|---|---|---|
| `/` | `src/pages/index.astro` | `home` | Bespoke 660px video-style hero (not `Hero.astro`) + service tile grid + `CortijoPanel` + accreditation strip + news grid |
| `/lavs-trading` | `src/pages/lavs-trading/index.astro` | `lavs` | Overview: four service tiles, two lines of business, "who we help" (four partners), our story |
| `/lavs-trading/landscaping` | `src/pages/lavs-trading/landscaping.astro` | `lavs` | Reference implementation of the service template |
| `/lavs-trading/farm-development` | `src/pages/lavs-trading/farm-development.astro` | `lavs` | Service template |
| `/lavs-trading/planting-materials-seedlings` | `src/pages/lavs-trading/planting-materials-seedlings.astro` | `lavs` | Service template |
| `/lavs-trading/bulk-agro-industrial-supplies` | `src/pages/lavs-trading/bulk-agro-industrial-supplies.astro` | `lavs` | **Not** the service template — a lighter catalog page (photo grid, no `NumberedGrid`/`SlimCta`-per-section). Replaces the former Coco Nets, Charcoal Briquettes, and VCO Oil pages by client direction — see [`decisions.md`](./decisions.md) |
| `/cortijo` | `src/pages/cortijo.astro` | n/a — no `active` prop, doesn't use `SiteNav` | Cortijo's own brand surface: `CortijoLayout` + `CortijoNav` + `CortijoFooter`, its own token set (see [`design-system.md`](./design-system.md#cortijo-brand-system)). No logo mark — type lockup (`CortijoLockup.astro`). Not a top-level nav destination — reached only via `CortijoPanel` on Home/Sustainability. No dedicated mobile design — see [`open-items.md`](./open-items.md). Sections: hero, What We Teach, The Farm, Credentials, Who We Help, **Gallery**, enrollment band — each with a matching anchor in `CortijoNav` |
| `/sustainability` | `src/pages/sustainability.astro` | `sustainability` | Three commitments, `CortijoPanel`, accreditation grid, photo gallery |
| `/news` | `src/pages/news.astro` | `news` | CMS-backed (Keystatic Cloud) — see [`cms.md`](./cms.md). Category filter works; "Load more" doesn't |
| `/news/[slug]` | `src/pages/news/[slug].astro` | `news` | One article per entry in the `news` content collection, `getStaticPaths()`-generated at build time |
| `/contact` | `src/pages/contact.astro` | `contact` | Flat band hero (no `Hero.astro`), form has no backend |

## Service page template

Three of the four LAVS Trading service pages (`landscaping`,
`farm-development`, `planting-materials-seedlings`) follow one structure —
built once in `landscaping.astro`, then repeated with page-specific copy:

`SiteNav` → `Hero` (breadcrumb variant) → `ServiceSwitcher` → Overview (copy +
photo) → Scope of work (`NumberedGrid`, 5 items, light theme) → Who this is
for (`NumberedGrid`, 3 items, dark theme, outdented) + 2fr/1fr/1fr photo row →
`SlimCta` → `SiteFooter`.

If another page in this family ever gets added, copy `landscaping.astro`,
not one of the others — it's the maintained reference.

The fourth, `bulk-agro-industrial-supplies.astro`, deliberately does **not**
follow this template — see its row above and `decisions.md`.

## Not built

- `Mobile-Home.dc.html` was a standalone mobile reference for the home page
  in the original handoff, not a separate route — its spec was folded into
  `SiteNav.astro`'s responsive behavior and into `index.astro`'s own `lg:`
  breakpoints, rather than kept as a separate page.
- No article detail route existed until News & Media moved onto Keystatic —
  the handoff never designed one, so `/news/[slug]`'s layout (hero band,
  category badge, body, sidebar) is original, not from the handoff spec.
