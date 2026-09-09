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
| `forest-card-hover` | `#22563A` | Hover fill for the Home service tiles |
| `olive` | `#6E8B3D` | Secondary rules on LAVS pages (unrelated to the separate `cortijo-olive` token — see [Cortijo brand system](#cortijo-brand-system)) |
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
| `muted-3` | `#5F6669` | `CortijoPanel`'s outer-band caption text on Home/Sustainability |
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
| `card` | 32px | Large photo/panel frames |
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
2. **Service icons** — 22–26px, `viewBox="0 0 24 24"`, `stroke-sage` (`#8FAE5C`),
   `stroke-width="1.5"`, no fill. Used in the Home service-tile grid
   (`src/pages/index.astro`), passed in as raw SVG path markup per tile.

## Logo

`Logo.astro` — the "Plot Grid" mark, inline SVG, `viewBox="0 0 96 96"`, four
45-unit parcels with the top-left and bottom-right struck with a 45-unit radius
(same diagonal-pair logic as the corner system). Takes `size` and
`variant: "dark" | "light" | "cortijo"` props. Always render this component —
never a raster export of the logo. `variant="cortijo"` recolors the mark in
Cortijo's palette for its group-attribution role on Cortijo surfaces (see
below) — it is still the LAVS mark, just retinted, never a separate Cortijo
mark.

Cortijo de Palsabangon has **no mark of its own** (client decision, see Open
Items) — it's represented by a type-only lockup, `CortijoLockup.astro`.

## Cortijo brand system

Cortijo de Palsabangon runs a **genuinely separate token set** from the LAVS
tokens above — a distinct sub-brand within the same site, introduced by the
"business split" delta (see [`decisions.md`](./decisions.md)). Never mix the
two: a Cortijo surface (`/cortijo`, or `CortijoPanel.astro` on a LAVS page)
uses `cortijo-*` tokens end-to-end; a LAVS surface never uses them. This is
implemented as a namespaced extension of the same single `@theme` block in
`global.css` (no second config file, no CSS scoping mechanism) — the
namespace prefix is what keeps the two sets from blending, not a build-time
boundary.

### Colors

| Tailwind class suffix | Hex | Use |
|---|---|---|
| `cortijo-olive-ink` | `#2A3318` | Primary — headings, dark bands, primary button fill, footer lockup |
| `cortijo-olive-ink-deep` | `#1E2611` | Top utility strip, enrollment band base, dark-button hover |
| `cortijo-terracotta` | `#9B4E22` | Accent — enroll buttons, badges, eyebrow accents, link hover, card top rules |
| `cortijo-terracotta-light` | `#B5622F` | Terracotta button hover |
| `cortijo-clay` | `#D98B54` | Accent on dark — stat numerals, arrow links on olive ink, logo quadrant |
| `cortijo-olive` | `#6E8B3D` | Secondary accent, body-link color, arrow links, card top rules |
| `cortijo-sage` | `#A3B573` | Eyebrows and labels on dark, logo quadrant |
| `cortijo-sage-pale` | `#CFD9B4` | Body text on dark |
| `cortijo-sage-muted` | `#B8BE96` | Secondary body text on dark |
| `cortijo-paper` | `#F4EFE2` | Primary light section background, page surround |
| `cortijo-paper-warm` | `#E9E1CD` | Alternate light band background |
| `cortijo-paper-white` | `#FBF8F0` | Card surfaces, text on olive ink / terracotta |
| `cortijo-bone` | `#EDE6D4` | Text on olive ink, logo quadrant |
| `cortijo-border` | `#D8CFB8` | Hairlines and grid dividers on light |
| `cortijo-border-2` | `#C4BCA3` | Outline-button borders, badge borders |
| `cortijo-border-3` | `#D0C6AC` | Panel border and fact-row rules in `CortijoPanel` |
| `cortijo-ink` | `#4A4636` | Body text on light |
| `cortijo-muted` | `#6B6350` | Eyebrows, captions, descriptors on light |

Band alternation on `/cortijo`: paper → paper-warm → olive-ink → paper →
paper-warm → olive-ink-deep → paper. Never two dark bands adjacent (same
rule as LAVS, applied to Cortijo's own palette).

### Typography

Cortijo adds a second family on top of the shared Archivo: **Bitter**
(serif), loaded alongside Archivo in the one Google Fonts request in
`BaseLayout.astro`/`CortijoLayout.astro`. `--font-cortijo-serif` in the theme
points at it (`font-cortijo-serif` utility). Bitter is used for every
heading, stat numeral, the wordmark, and arrow-link invitations — weight 500
as standard, 400 italic for the pull-quote on `/cortijo`. Archivo continues
to handle all body copy, eyebrows, labels, buttons, and badges, identical
usage rules to LAVS.

### Corner system — "Arch"

The key visual differentiator from LAVS's diagonal pair: Cortijo rounds
**both top corners only**, bottom corners always square:

```html
<div class="rounded-tl-cortijo-panel rounded-tr-cortijo-panel">...</div>
```

| Token | Value | Use |
|---|---|---|
| `cortijo-badge` | 8px | Accreditation badges |
| `cortijo-nav` | 12px | Nav "Enroll" button |
| `cortijo-control` | 14px | Buttons / CTAs (small end) |
| `cortijo-control-lg` | 16px | Buttons / CTAs (large end) |
| `cortijo-tile` | 20px | LAVS group-attribution tile in `CortijoFooter` |
| `cortijo-callout` | 24px | Callout cards, `CortijoPanel`'s nested photo |
| `cortijo-panel` | 28px | Story photo, program cards, who-we-help cards |
| `cortijo-card` | 32px | Farm/story photo, `CortijoPanel`'s outer frame |

Deliberately square: the full-bleed hero photo, the LAVS group strip, stat
cells, credential grid cells.

### Where it's used

`/cortijo` (`CortijoLayout` + `CortijoNav` + `CortijoFooter`) and
`CortijoPanel.astro` (embedded on Home and Sustainability inside their
normal LAVS-toned sections — the panel is the only place Cortijo tokens
appear on a LAVS page). See [`components.md`](./components.md) for each
component's props.
