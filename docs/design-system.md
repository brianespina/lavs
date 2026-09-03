# Design system

Implementation of the LAVS Trading brand identity as Tailwind v4 theme tokens. The
full original spec (with rationale, "why," and per-screen breakdowns) is preserved
verbatim at [`design-handoff-source.md`](./design-handoff-source.md) — this file is
the condensed, "how it's wired up in code" version.

All tokens live in `src/styles/global.css` under `@theme`. Nothing here should ever
be reproduced as a raw hex value or inline `style` attribute in a component — if a
color or radius isn't covered by a token below, add the token first, then use it.

## Colors

| Tailwind class suffix | Hex | Use |
|---|---|---|
| `forest` | `#143B26` | Primary brand green — nav, dark bands, headings, primary buttons |
| `forest-deep` | `#0E2A1B` | Utility bar, footer, service switcher strip |
| `forest-mid` | `#2C6141` | Link color, primary button hover, card panel |
| `forest-card` | `#1B4730` | Pathway card surface on dark band |
| `forest-card-border` | `#2F6244` | 1px border on pathway cards |
| `olive` | `#6E8B3D` | Cortijo accent, secondary rules |
| `sage` | `#8FAE5C` | Eyebrow labels/glyphs on dark, icon strokes |
| `pale-sage` | `#B9C7A8` | Secondary body text on dark |
| `mint` | `#DCEBCB` | Body text on dark |
| `gold` | `#C08A2E` | CTA fill, accent numerals, arrow-link underline |
| `gold-light` | `#E0AE58` | Gold hover, eyebrows/headings on dark, active switcher tab |
| `sand` | `#E7D3A9` | Warm section background |
| `bone` | `#F7F4ED` | Light section background, text on dark |
| `bone-deep` | `#EFEBE1` | Alternate light background, page surround |
| `white` | `#FFFFFF` | Card surfaces, page base |
| `border-light` | `#E8E3D6` | Grid dividers, hairlines on light |
| `border-light-2` | `#DDD7C9` | Input borders, chip borders |
| `border-light-3` | `#E1DACA` | Menu dividers, CTA band top border |
| `ink` | `#1A1D1C` | Text on gold |
| `body` | `#4A5257` | Body text on light |
| `muted` | `#767E82` | Eyebrows/captions on light |
| `muted-2` | `#A29A88` | Placeholder label text |
| `placeholder` | `#A9A395` | Form field placeholder text |
| `clay` | `#7A6438` | Eyebrow text on `sand` background |
| `clay-deep` | `#4A4132` | Body text on `sand` background |
| `clay-darker` | `#3A3226` | List/bullet text on `sand` background |

`clay*` aren't in the handoff's named palette table — they're literal values used
consistently in the source `.dc.html` wherever copy sits on the `sand` band (Home
and News sustainability sections), pulled out into tokens here rather than left as
one-off arbitrary hex.

Use as `bg-forest`, `text-mint`, `border-gold`, etc. Rule from the handoff: max two
background colors per band sequence, alternating light (`white`/`bone`/`bone-deep`)
against `forest`. Never two dark bands adjacent.

## Typography

Single family: **Archivo** (400/500/600/700), loaded via Google Fonts `<link>` tags
in `src/layouts/BaseLayout.astro`. `--font-sans` in the theme points at it, so it's
Tailwind's default sans everywhere — no `font-sans` class needed on prose.

There's no custom font-size scale — role-based sizes (66px hero headline, 12px
eyebrow, etc.) are applied as Tailwind arbitrary values (`text-[52px]`) directly at
the call site per the size table in
[`design-handoff-source.md`](./design-handoff-source.md#typography), because the
combinations of size/weight/tracking/leading are too varied per-role to usefully
abstract into a scale. Long-form paragraphs get Tailwind's built-in `text-pretty`
utility (maps to `text-wrap: pretty`).

## Corner system — "Diagonal pair"

The site's signature visual detail, derived from the logo: every rounded surface
curves **only its top-left and bottom-right corners**; the other two stay sharp.
Implemented as a named radius scale in `@theme`, applied as a matched Tailwind
corner-pair:

```html
<div class="rounded-tl-card rounded-br-card">...</div>
```

| Token | Value | Use |
|---|---|---|
| `chip` | 12px | Chips, icon tiles, small thumbs |
| `field` | 14px | Switcher active tab, card CTA, form fields |
| `control` | 16px | Buttons / CTAs (the `Button.astro` default) |
| `tile` | 20px | Service tiles, nav dropdown (dropdown is bottom-right **only** — no top-left, see `SiteNav.astro`) |
| `photo` | 24px | Nested photo inside a card |
| `panel` | 28px | Media cards / dark panels / photo frames (small end) |
| `card` | 32px | Pathway cards (`PathwayCard.astro`) |
| `panel-lg` | 36px | Media cards / news cards (large end) |

When a card has a radius, it also clips its contents (`overflow-hidden`) — never
round the image inside it separately.

**Deliberately square** (no radius at all): full-bleed hero sections, category
badges, the utility bar.

## Layout

- Design width is 1440px. Every full-width band uses the `.band-x` utility
  (defined in `global.css`) for the full-bleed gutter formula:
  `padding-inline: max(48px, calc((100% - 1440px) / 2 + 48px))` — from `lg:`
  (1024px) up only. Content stays measured to 1440px; extra width beyond
  that goes to the gutters, never the columns. Below `lg:`, `.band-x` is a
  flat 20px side gutter, matching the handoff's 390px mobile reference
  ("side gutter 20px throughout") — the desktop floor of 48px is not meant
  to apply at phone widths.
- Grid dividers are `gap-[2px]` over a `bg-border-light` (or dark equivalent)
  parent, not per-cell borders — see `NumberedGrid.astro`.
- Sibling groups use flex/grid + `gap-*`, never margin-based spacing.

## Iconography

Two vocabularies, both stroke-only, no emoji anywhere:

1. **Quadrant glyph** (`QuadrantGlyph.astro`) — a monochrome miniature of the logo
   preceding every section eyebrow (`SectionLabel.astro`). Inherits color via
   `currentColor`; two opposite quadrants full opacity, two at `.45`.
2. **Service icons** — 22px, `viewBox="0 0 24 24"`, `stroke="#8FAE5C"`,
   `stroke-width="1.5"`, no fill. Only used in `PathwayCard.astro`'s icon strip,
   passed in as raw SVG path markup per card.

## Logo

`Logo.astro` — the "Plot Grid" mark, inline SVG, `viewBox="0 0 96 96"`, four
45-unit parcels with the top-left and bottom-right struck with a 45-unit radius
(same diagonal-pair logic as the corner system). Takes `size` and
`variant: "dark" | "light"` props. Always render this component — never a raster
export of the logo.

Cortijo de Palsabangon has **no mark of its own** (client decision, see Open
Items) — it's represented by a type-only lockup or a bordered "C" monogram tile,
both implemented inline in `PathwayCard.astro`.
