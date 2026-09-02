# LAVS Trading & Development — website

Marketing site for **LAVS Trading & Development Services Inc.** and its
linked enterprise **Cortijo de Palsabangon Farm OPC** (a DA-ATI Accredited
Learning Site and TESDA Registered Farm School), both based in Quezon
Province, Philippines. Two audiences self-select from the home page:
industrial/commercial buyers & landowners on one side, farmers & students on
the other.

Read this file first in any new session — it links to everything else you
need. You should not need to ask the user for context that's already
answered here or in `docs/`.

## Stack

Astro 7 (static output) + Tailwind v4 (`@tailwindcss/vite`, CSS-first
`@theme` config, no `tailwind.config.js`). No framework islands, no backend —
this is a static marketing site.

```bash
npm run dev      # dev server, http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the build locally
```

## Where things are

- `src/layouts/BaseLayout.astro` — the one HTML shell every page uses.
- `src/components/` — all shared UI. See [`docs/components.md`](./docs/components.md)
  for the full API of each one before building anything new — most sections
  on most pages are composed from these, not bespoke markup.
- `src/styles/global.css` — the entire design system as Tailwind `@theme`
  tokens (colors, the "diagonal pair" corner-radius scale). See
  [`docs/design-system.md`](./docs/design-system.md).
- `src/pages/` — routes. See [`docs/pages.md`](./docs/pages.md) for the full
  route map and the service-page template.
- `public/images/`, `public/logos/` — all site imagery. Every photo is a
  licensed stock stand-in pending real client photography — see
  [`docs/open-items.md`](./docs/open-items.md).
- `docs/design-handoff-source.md` — the original Claude Design handoff
  README, verbatim. This is the ground-truth design spec (colors, type
  scale, per-screen breakdowns, interaction behavior) that everything above
  was built from.
- `handoff/` — the full original handoff bundle (design source `.dc.html`
  files, rendered reference HTML, brand suite, stock photography). **Local
  only, gitignored** — not in version control. See the note in
  [`docs/open-items.md`](./docs/open-items.md#also-worth-flagging-back-to-the-clientdev-lead)
  about backing this up.

## Documentation map

| File | What's in it |
|---|---|
| [`docs/design-system.md`](./docs/design-system.md) | Colors, type, the corner-radius system, layout/gutter formula, iconography, logo — as implemented in `global.css` and `Logo.astro`/`QuadrantGlyph.astro` |
| [`docs/components.md`](./docs/components.md) | Every shared component's props and intended use |
| [`docs/pages.md`](./docs/pages.md) | Route map, nav `active` values, the 5-page service template |
| [`docs/decisions.md`](./docs/decisions.md) | Engineering calls made beyond the literal handoff (responsive strategy, image handling, why `Button.astro` takes a `radius` prop instead of a `class` override, etc.) — read this before "fixing" something that looks like a deviation from spec |
| [`docs/open-items.md`](./docs/open-items.md) | What's still pending a client/product decision — stock photos, missing logos, form backend, news filtering, tablet/mobile design. Don't guess at these; flag them |
| [`docs/design-handoff-source.md`](./docs/design-handoff-source.md) | The original design handoff README, verbatim |

## Working conventions

- **No inline styles, ever.** Tailwind utility classes only, using the
  design tokens in `global.css` — never a raw hex value or a `style=`
  attribute in a component or page.
- **Reuse components before writing bespoke markup.** Check
  `docs/components.md` first — most repeating patterns (numbered grids,
  eyebrows, buttons, the interior hero) already have one.
- **Corner radius is always a matched pair** — `rounded-tl-<token>
  rounded-br-<token>`, never a single corner alone, never an arbitrary
  pixel value once a token exists for it.
- Mobile-first responsive: default classes stack for small screens, `lg:`
  overrides carry the pixel-exact 1440px design values. See
  `docs/decisions.md` for why this goes beyond what the handoff formally
  specified.
- Before treating anything as a bug, check `docs/decisions.md` and
  `docs/open-items.md` — a lot of "that doesn't look designed" is a
  documented, deliberate gap (non-functional contact form, non-functional
  news filters, stock photography, etc.), not an oversight.

## Astro reference

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
