# Handoff: LAVS Trading & Development Services Inc. — Website

## Overview
A complete 11-page marketing website (plus one mobile reference) for **LAVS Trading & Development Services Inc.**, a Philippine company operating two linked enterprises:

- **LAVS Trading & Development Services Inc.** — commercial trade, land development, and industrial solutions (landscaping, farm development, coco nets/geonets, charcoal briquettes/activated carbon, VCO oil)
- **Cortijo de Palsabangon Farm OPC** — a DA-ATI Accredited Learning Site and TESDA Registered Farm School & Assessment Center (agricultural produce, inputs, nursery, training, certification)

The site's job is to let two very different audiences self-select immediately: industrial/commercial buyers and land owners on one side, farmers and students on the other. The brand identity (the "Plot Grid" mark) was designed in the same engagement and is included.

Target stack (stated by the client-side developer): **Astro + Cloudflare Pages**.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, **not production code to copy directly**.

The task is to **recreate these designs in Astro** using its own component model and conventions:
- The `.dc.html` files are authored in a proprietary component runtime and will not run outside it. **Do not port them literally.** Read them for structure, copy, and exact style values.
- The `.html` files under `bundled_pages/` are fully self-contained, offline-openable renders of each page. **These are the source of truth for how each page should look.** Open them in a browser to inspect real geometry, or use them as a visual diff target.
- `Site Nav` and `Site Footer` were single shared components in the design and must stay shared components (Astro layout + components) in the build.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, corner treatment, imagery, and copy. Recreate pixel-accurately. All copy is client-approved except where flagged under **Open Items**.

Design width is **1440px** with full-bleed backgrounds. There is one mobile reference (390px). **Tablet and intermediate breakpoints were not designed** — see Responsive Behavior.

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Forest (primary) | `#143B26` | Primary brand green: nav, dark bands, headings, primary buttons |
| Forest deep | `#0E2A1B` | Utility bar, footer, service switcher strip |
| Forest mid | `#2C6141` | Link color, primary button hover, card panel |
| Forest card | `#1B4730` | Pathway card surface on dark band |
| Forest card border | `#2F6244` | 1px border on pathway cards |
| Olive | `#6E8B3D` | Cortijo accent, secondary rules |
| Sage | `#8FAE5C` | Eyebrow labels and glyphs on dark, icon strokes |
| Pale sage | `#B9C7A8` | Secondary body text on dark |
| Mint | `#DCEBCB` | Body text on dark |
| Gold | `#C08A2E` | CTA fill, accent numerals, arrow-link underline |
| Gold light | `#E0AE58` | Gold hover, eyebrows/headings on dark, active switcher tab |
| Sand | `#E7D3A9` | Warm section background (mostly retired, see CTA note) |
| Bone | `#F7F4ED` | Light section background, text on dark |
| Bone deep | `#EFEBE1` | Alternate light background, page surround |
| White | `#FFFFFF` | Card surfaces, page base |
| Border light | `#E8E3D6` | Grid dividers, hairlines on light |
| Border light 2 | `#DDD7C9` | Input borders, chip borders |
| Border light 3 | `#E1DACA` | Menu dividers, CTA band top border |
| Ink | `#1A1D1C` | Text on gold |
| Body | `#4A5257` | Body text on light |
| Muted | `#767E82` | Eyebrows and captions on light |
| Muted 2 | `#A29A88` | Placeholder label text |
| Placeholder text | `#A9A395` | Form field placeholder text |

Max **two background colors per band sequence** — alternate light (`#FFFFFF` / `#F7F4ED` / `#EFEBE1`) against forest (`#143B26`). Never two dark bands adjacent.

### Typography
Single family: **Archivo** (Google Fonts), weights 400/500/600/700.

```
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Home hero headline | 66px | 600 | -.025em | 1.06 |
| Interior hero headline | 52px | 600 | -.03em | 1.08 |
| Section headline (lg) | 42px | 600 | -.025em | 1.14 |
| Section headline | 34–40px | 600 | -.025em | 1.14–1.18 |
| CTA headline (footer) | 34px | 600 | -.02em | 1.2 |
| Card title (lg) | 25–29px | 600 | -.02em | 1.2 |
| Card title | 19–22px | 600 | — | 1.25–1.3 |
| Hero lead | 17.5–18px | 400 | — | 1.6 |
| Body | 15–15.5px | 400 | — | 1.65–1.72 |
| Body sm | 13.5–14.5px | 400 | — | 1.55–1.68 |
| Eyebrow | 12px | 600 | .24em | 1.65 (uppercase) |
| Eyebrow sm | 11–11.5px | 600 | .18–.2em | — (uppercase) |
| Button / switcher | 12–12.5px | 600 | .08em | — (uppercase) |
| Chip | 12–12.5px | 500 | — | — |
| Field label | 11.5px | 600 | .14em | — (uppercase) |
| Badge | 9.5–10px | 600 | .12–.14em | — (uppercase) |
| Icon label | 9.5px | 600 | .08em | 1.4 (uppercase, nowrap) |
| Logo wordmark | varies | 700 | .08em | 1 |
| Logo descriptor | 6.5–9px | 500 | .18–.22em | — (uppercase) |

**Rule:** any uppercase text with tracking ≥ .14em needs `line-height: 1.65` — tight leading on tracked caps reads cramped.

All long-form text blocks use `text-wrap: pretty`.

### Corner system — "Diagonal pair"
This is the most distinctive part of the visual language and derives directly from the logo (two squared parcels, two struck with one radius). **Every rounded surface curves only its top-left and bottom-right corners; the other two stay sharp.**

```css
border-top-left-radius: R;
border-bottom-right-radius: R;
/* top-right and bottom-left: 0 */
```

| Element | R |
|---|---|
| Pathway cards (home) | 32px |
| Media cards, news cards, dark panels, photo frames (large) | 28–36px |
| Nested photo inside a card | 24px |
| Service tiles | 20px |
| Nav dropdown (bottom-right only) | 20px |
| Buttons / CTAs | 16px |
| Switcher active tab, card CTA | 14px |
| Form fields | 14px |
| Chips, icon tiles, small thumbs | 12px |

**Deliberately square:** full-bleed hero sections, category/accreditation badges (so they read as labels), and the utility bar.

When a card has a radius, the card clips its own contents (`overflow: hidden`) — do not also round the image inside it.

### Spacing & layout
- Design width **1440px**; page min-width 1440px (desktop-only design).
- **Full-bleed gutter formula** — every band spans the viewport while content stays measured:
  ```css
  padding-left: max(48px, calc((100% - 1440px) / 2 + 48px));
  padding-right: max(48px, calc((100% - 1440px) / 2 + 48px));
  box-sizing: border-box;
  ```
  At 1440px this is exactly 48px; wider viewports give the extra space to the gutters, never to the columns.
- Vertical band padding: 88–96px (major), 80px (standard), 72px (compact), 64px (hero/CTA band), 44–56px (strip).
- Grid dividers are achieved with `gap: 2px` over a border-colored parent, not per-cell borders.
- Sibling groups always use flex/grid + `gap`, never margins or inline whitespace.

### Iconography
Two icon vocabularies, both stroke-only:
1. **Quadrant glyph** — a miniature of the logo (13px on light/dark section labels, 11px on mobile) preceding **every** section eyebrow, inheriting the eyebrow's color via `currentColor`. Two opposite quadrants at full opacity, two at `.45`.
2. **Service icons** — 22px, `viewBox="0 0 24 24"`, `stroke:#8FAE5C`, `stroke-width:1.5`, no fill. Used only in the pathway-card icon strips.

No emoji anywhere.

---

## Screens / Views

Nav order, which is also the file order:

### 1. Home (`Home.dc.html` → `bundled_pages/Home.html`)
**Purpose:** let each audience self-select within one screen.

Bands, top to bottom:
1. **Utility bar** — `#0E2A1B`, 42px. Left: three accreditation strings in `#8FAE5C` 11px/.14em caps separated by 1px×11px rules. Right: two phone numbers, then email, `#DCEBCB` 12px.
2. **Nav** — see Shared Components.
3. **Hero** — 660px. Looping muted video (`hero-section-1900.webm`) at `object-fit:cover`, forest overlay at **.62**. Eyebrow (gold, .24em), 66px headline "Empowering Philippine land, commerce, and agriculture.", 18px lead at 660px max-width, then two buttons: gold fill "Explore LAVS Trading" + bone outline "Explore Cortijo de Palsabangon". The overlay is `pointer-events:none`; the button row re-enables pointer events.
4. **Choose your pathway** — forest band, 88px padding, `align-items:stretch`.
   - **Left column, 420px fixed:** glyph eyebrow "Two enterprises, one ecosystem" → 40px headline "Driving Philippine commerce, industrial supply, and agricultural trade" → client-approved paragraph → "Our focus across both enterprises:" → two-column priority lists ("Commercial priorities" gold-light caps / "Agricultural priorities" sage caps, four 13.5px items each) → sage-outline "Talk to our team" button pinned bottom (`margin-top:auto`).
   - **Right, 2-up grid, gap 24px:** each card `#1B4730` on `#2F6244` border, 32px diagonal radius. Card anatomy: brand lockup → eyebrow → 25px title → 190px inset photo (24px radius) → 14px description → gold CTA → **icon strip**: `grid-template-columns: repeat(5, minmax(0,1fr))`, 4px gap, 26px top padding, 1px `rgba(143,174,92,.28)` top rule, `margin-top:auto`. Each cell is a link: 22px icon + 9.5px nowrap caps label. LAVS: Hardscape / Farm / Nets / Charcoal / VCO Oil (each → its service page). Cortijo: Produce / Inputs / Nursery / TESDA / Certs.
   - **Critical:** `minmax(0,1fr)` and `white-space:nowrap` on labels — without both, cells go unequal and glyphs stop aligning across the pair.
5. **Who We Help** — light band (`#F7F4ED`). Left: eyebrow, 38px headline, lead, then three fact rows (label 180px + value, 1px `#E1DACA` top rules), then forest-outline "Find your pathway". Right (flex 1.15): four white cards over `#E8E3D6` at `gap:2px`, each 01–04 gold numeral + 16px forest title + 14px body.
6. **Sustainability** — `#E7D3A9` sand band, photo left (360px) / copy right, three bulleted commitments with 9px square markers in forest / olive / gold.
7. **Accreditation strip** — white, 56px padding, label left (max 170px), 6-column logo grid, each cell 88px on `#F7F4ED` with 12px diagonal radius. TESDA and DA-ATI are real logos in `assets/logos/`; the rest are text placeholders.
8. **News & media** — white, centered eyebrow + 42px headline, 3-up card grid (gap 28px). Card: 36px diagonal radius, `overflow:hidden`, 230px photo, then category badge (square, forest/olive/gold by category) + date, 20px title, 14px excerpt, gold "Read more →" pinned bottom. Then a centered forest-outline "View all news & media".
9. **Footer CTA + footer** — see Shared Components.

### 2. LAVS Trading & Development (`LAVS-Trading.dc.html`)
Hero (standard interior spec) → **"Five ways we work"** service tile row on `#EFEBE1` (5-column grid, 20px diagonal radius, hover inverts to forest) → **two lines of business** 2-up cards, each with a 250px photo and a linked list of that line's offerings (each row is a link with a trailing gold "→") → **Who We Help** three columns with 3px top rules in forest/olive/gold, verbatim client copy → **Who We Are / Our Story** forest band, copy left, photo + "Our People & Culture" `#0E2A1B` panel right → slim closing CTA → footer.

### 3–7. Service pages
`Landscaping`, `Farm-Development`, `Coco-Nets`, `Charcoal-Briquettes`, `VCO-Oil` — one shared template:
1. **Hero** (standard interior spec) with a breadcrumb in place of the eyebrow: "LAVS Trading & Development / <Service>", parent in `#8FAE5C` (linked), separator `#4E6B45`, current page `#E0AE58`.
2. **Switcher strip** — `#0E2A1B`, 64px, all five services as tabs; active tab is a gold-light fill with 14px diagonal radius and ink text, inactive are `#DCEBCB` going gold-light on hover. This is the primary way to move between siblings.
3. **Overview** — copy left (flex 1.1) with a gold CTA, 420px photo right (28px diagonal radius).
4. **Scope / Applications** — `#F7F4ED`, 2-column grid at `gap:2px` over `#E8E3D6`, six items, each 01–06 gold numeral + 17.5px title + 14px body.
5. **Who this is for** — forest band, 3-column grid at `gap:2px` over `rgba(247,244,237,.16)`, cells 30px/32px padding with the grid outdented `margin: 0 -32px` so column one still aligns to the page's 48px gutter. Below it a 2fr/1fr/1fr photo row (280px, 28px diagonal radius).
6. **Slim closing CTA** then footer.

### 8. Cortijo de Palsabangon (`Cortijo.dc.html`)
Hero (standard interior spec, eyebrow "Cortijo de Palsabangon Farm OPC · Est. 2012") → **"What we offer"** 3-up cards (TESDA programs / inputs & nursery / micro-credentials) → **Who we are** with three stats (2012, 5.2 ha, 2015) in 38px olive → **Credentials & accreditations** forest band, 2×2 grid at `gap:2px`, each cell a gold-light square badge (DA-ATI / TESDA / TESDA / DepEd) + label + 20px title + body, then two 3px-left-rule callouts (awards, academic partner) → **Who we help** 2-up on `#F7F4ED` → slim closing CTA → footer.

Cortijo has **no mark of its own** (client decision): it is represented by a type-only lockup in Archivo — 13.5px 700 .1em uppercase name over a 6.5px .18em descriptor, or a 34px `C` monogram tile with a 1.5px sage border and 12px diagonal radius on the home pathway card.

### 9. Sustainability & Community (`Sustainability.dc.html`)
Hero (standard interior spec) → **three commitments** as a 3-column grid, each column headed by a 6px color bar (forest / olive / gold) over an 01–03 numeral, 26px title, body, and a 190px photo pinned to the bottom (`margin-top:auto`) → **"Aligned with national bodies"** 6-cell grid on `#F7F4ED` (DA, DA-ATI, PCA, TESDA, DepEd, DTI — DA-ATI and TESDA have real logos) → **gallery**, a 4-column / 230px-row grid where cell 1 spans 2×2 and cell 7 spans 2 columns → footer.

### 10. News & Media (`News-Media.dc.html`)
Hero (standard interior spec) → **filter strip** matching the service switcher (All active, LAVS Trading, Cortijo, Sustainability) → **LAVS updates**: a 1.6fr feature (340px photo, 28px title) beside a 1fr stack of three 130×100 thumb + title rows divided by `#E8E3D6` hairlines → **Cortijo milestones**: 3-up cards → **sustainability feature**: sand band, 300×200 photo left, badge + 26px title + body right → centered "Load more updates" → footer.

Section headers use a title + 1px flex-fill rule + right-aligned caption pattern.

### 11. Contact (`Contact.dc.html`)
**Deliberately the one page with a flat band instead of a photo hero** — 72px forest band, eyebrow, 52px "Tell us what you need", lead right.

Then a 1.3fr / 1fr split:
- **Left, form on `#F7F4ED`, 44px padding:** 26px "Send an inquiry"; 2×2 field grid (Full name*, Company, Email*, Mobile*) with 11.5px caps labels and `#FFFFFF`/`#DDD7C9` fields at 14px diagonal radius; a single **"What is this about?"** chip set (Commercial supply / Landscaping / Farm development / TESDA enrollment / Farm produce & inputs / Partnership / Something else) where the selected chip is forest-filled; a 118px message field; then a reply-time note beside a gold "Send inquiry".
- **Right:** forest "Direct lines" panel (28px diagonal radius) with both mobiles at 20px, email, four 36px social tiles; a "Two enterprises, one inbox" bordered panel; a 240px photo.

One general inquiry form was a client decision — the chip set does the routing internally, not separate forms.

### 12. Mobile Home (`Mobile-Home.dc.html`)
390px reference for the homepage only. 32px condensed utility bar → 66px nav with a 44×44 hamburger toggling a `#0E2A1B` panel (five items on 1px `rgba(185,199,168,.2)` dividers, gold CTA, contact details) → 560px video hero with stacked full-width buttons → pathway cards stacked with photo-on-top → Who We Help → sand sustainability band → two news cards → CTA → condensed footer. Side gutter 20px throughout; every tap target ≥ 44px.

---

## Shared Components

### Site Nav (`Site Nav.dc.html`)
Two rows and **one shared component across all pages** — build it once as an Astro component with an `active` prop.

- **Utility bar**, `#0E2A1B`, 42px — content as described in Home.
- **Main bar**, `#143B26`, 88px, `position:relative; z-index:20`.
  - **Left:** logo lockup linking home — 46px mark + "LAVS" (23px/700/.08em) over a two-line 7.5px/.2em descriptor.
  - **Right:** Home · LAVS Trading & Development ▾ · Cortijo de Palsabangon Farm ▾ · Sustainability & Community · News & Media · gold "Contact Us" button. Items 12.5px/500, all `white-space:nowrap`, gap 24px.
  - **Active page** gets a 2px `#E0AE58` underline, positioned `bottom:26px`.
  - **Dropdowns** — `#F7F4ED`, 286px, 3px `#C08A2E` top border, 20px bottom-right radius, `0 18px 40px rgba(14,42,27,.22)` shadow.
    - LAVS: Overview / divider / "Services" label / the five services / divider / Who We Help.
    - Cortijo: three section links.
  - **Hover behavior (important):** the panel must be anchored `top:100%` on the trigger (**not** a hardcoded pixel offset — a fixed `top:88px` against an ~85px trigger leaves a dead gap the cursor falls through), and close must be debounced **260ms** so diagonal travel into the menu doesn't dismiss it. Openers must clear the pending timer.

### Site Footer (`Site Footer.dc.html`)
Also shared. Two parts:
1. **Global CTA band** — 88px, a photo under a `#143B26` overlay at **.86**. 34px headline "Let's talk about your land, your supply, or your training needs.", contact line, then gold "Inquire about commercial supply" + bone-outline "Enroll in TESDA courses".
2. **Footer** — `#0E2A1B`, 72px/40px padding, `1.5fr 1fr 1fr 1fr` grid: brand column (42px logo lockup, description, three outlined accreditation badges); "LAVS Trading" links (Overview + five services + Who We Help); "Cortijo de Palsabangon" links; "Quick links" + contact details + four 32px social tiles. Bottom bar on a 1px `rgba(185,199,168,.2)` rule: copyright left, Privacy/Terms right.

**CTA hierarchy — enforce this.** One filled button per content area, plus this global footer CTA. Interior pages close on a **slim CTA band**, not a third button: a light band (`#EFEBE1`) with a 1px `#E1DACA` top border, 44px padding, `align-items:baseline`, a 22px question inline with a 14.5px subline, and the ask as an **underlined arrow link** (`#2C6141`, 1.5px `#C08A2E` bottom border, 5px padding, trailing "→", gold on hover).

---

## Interactions & Behavior

| Element | Behavior |
|---|---|
| Nav dropdowns | Open on `mouseenter` of the trigger; close 260ms after `mouseleave`; panel anchored `top:100%` |
| Mobile menu | Hamburger toggles the panel; 44×44 target |
| Nav / footer links | Hover → `#E0AE58` |
| Gold buttons | `#C08A2E` → `#E0AE58`; text stays `#1A1D1C` |
| Forest buttons | `#143B26` → `#2C6141` |
| Outline buttons | Fill inverts (border color becomes background, text becomes the band color) |
| Service tiles | Background → `#143B26`, border → `#143B26` |
| Chips (light) | Border → `#143B26`; selected state is a forest fill |
| News cards | `#F7F4ED` → `#EFEBE1` |
| Switcher tabs | Inactive text → `#E0AE58`; active tab is a persistent gold fill |
| Icon strip cells | Background → `rgba(143,174,92,.14)` |
| Arrow links | Text → `#C08A2E` |
| Hero video | `autoplay` + `loop` + `muted` + `playsInline`, plus a `play()` call on mount with a caught rejection (autoplay policy) |
| Body links | `a` = `#2C6141`, `a:hover` = `#C08A2E` — define these globally; the client will add links in a CMS later |

**Not yet designed / not yet wired:** form submission and validation, filter behavior on News, "Load more", article detail pages, and any loading/error/empty states. Flag these back before building.

## State Management
Very little — this is a marketing site.
- `Site Nav`: which dropdown is open (`'lavs' | 'cortijo' | null`) + a close timer ref.
- `Mobile-Home`: menu open boolean.
- Everything else is static. Contact form state and News filter state still need to be specified.

Three page-level booleans existed in the design to toggle optional Home sections (utility bar, accreditation strip, news block) — treat these as content flags if the client wants them switchable, otherwise inline them.

## Responsive Behavior
**Only 1440px desktop and 390px mobile (home only) were designed.** Before building, get a decision on:
- Tablet (768–1200px) — the 420px + 2-up pathway grid and the 5-column icon strips are the first things to break.
- Mobile versions of the ten interior pages.
- Whether the 1440px min-width holds or the layout should reflow below it.

The full-bleed gutter formula already handles anything **wider** than 1440px correctly.

## Assets

### Logo
Included in `assets/logo/`. The **Plot Grid** mark is inline SVG on a `0 0 96 96` viewBox — four 45-unit parcels in a 2×2 grid with 6 units of gutter, where the top-left and bottom-right parcels are struck with a 45-unit radius (the same diagonal-pair logic as the UI corner system):

```svg
<svg viewBox="0 0 96 96">
  <path d="M0 0 H45 A45 45 0 0 1 0 45 Z" fill="#F7F4ED"/>
  <rect x="51" y="0" width="45" height="45" fill="#8FAE5C"/>
  <rect x="0" y="51" width="45" height="45" fill="#F7F4ED"/>
  <path d="M96 96 V51 A45 45 0 0 0 51 96 Z" fill="#E0AE58"/>
</svg>
```

On-dark fills are as above; on light use `#143B26` for the two bone parcels, `#6E8B3D` and `#C08A2E` for the others. Ship it as an inline SVG component with a size prop, not a raster.

Full lockups, mono/reversed variants, clear space, and misuse rules are in `assets/logo/LAVS Brand Suite.dc.html` (also rendered at `assets/logo/Brand-Suite.html`). The corner-system rationale is in `assets/logo/Corner-System.html`.

### Accreditation logos
`assets/logos/tesda.png` and `assets/logos/da-ati.png` are real, supplied by the client and background-trimmed. **PCA, DepEd, DTI, and SEC are text placeholders** — the client still owes those files.

### Photography — action required
**Every photograph in this design is a licensed stock stand-in, not the client's own work.** They are for layout and tone only. Do not ship them.

- `images/` holds the web-optimised set actually referenced by the bundled pages (1400px wide, ~q66, 100–200KB each).
- The hero is a still frame (`images/hero-still.jpg`) standing in for a 27s 1900×1068 webm loop.
- Two slots are intentionally empty placeholders: **charcoal briquettes** and **activated carbon** product shots.

Replace all of it with real LAVS/Cortijo photography before launch, then run the real files through Astro's image pipeline (`astro:assets`) — the originals are multi-MB and the audience is on Philippine mobile connections.

## Open Items
1. **Real photography** for every slot, plus the two empty charcoal/carbon placeholders and the real hero video.
2. **PCA, DepEd, DTI, SEC** logo files.
3. **Product specifics** deliberately left out pending real numbers: coco net mesh weights and roll sizes, charcoal/activated-carbon grades and mesh sizes, VCO volumes and packaging, and any certifications per product.
4. **News content** — all nine items are plausible placeholders. Article detail pages were never designed.
5. **Form handling** — where inquiries go, validation rules, success/error states.
6. **Tablet and interior-page mobile** layouts.
7. **Cortijo** has no mark by client decision; if that changes, the type lockup is the thing to replace.

## Files

### Design source (read for structure and exact values; do not port literally)
```
design_source/
  Home.dc.html
  LAVS-Trading.dc.html
  Landscaping.dc.html
  Farm-Development.dc.html
  Coco-Nets.dc.html
  Charcoal-Briquettes.dc.html
  VCO-Oil.dc.html
  Cortijo.dc.html
  Sustainability.dc.html
  News-Media.dc.html
  Contact.dc.html
  Mobile-Home.dc.html
  Site Nav.dc.html          <- shared
  Site Footer.dc.html       <- shared
```

### Rendered reference (open these in a browser — visual source of truth)
```
bundled_pages/
  Home.html · LAVS-Trading.html · Landscaping.html · Farm-Development.html
  Coco-Nets.html · Charcoal-Briquettes.html · VCO-Oil.html · Cortijo.html
  Sustainability.html · News-Media.html · Contact.html · Mobile-Home.html
```
Each is fully self-contained and works offline. Internal nav links resolve between them.

### Brand
```
assets/logo/LAVS Brand Suite.dc.html   full identity: lockups, palette, type, mono/reversed
assets/logo/Brand-Suite.html           rendered version of the above
assets/logo/Corner-System.html         the three corner options; "Diagonal pair" was chosen
assets/logos/tesda.png
assets/logos/da-ati.png
```

### Images
```
images/    web-optimised stand-ins referenced by bundled_pages (REPLACE ALL)
```

## Suggested Astro structure
```
src/
  layouts/BaseLayout.astro        <- html head, fonts, global a/a:hover, utility bar
  components/
    SiteNav.astro                 <- active prop; dropdown timing per spec
    SiteFooter.astro              <- includes the global CTA band
    Hero.astro                    <- interior hero: 440px, .68 overlay, eyebrow/title/lead
    ServiceSwitcher.astro         <- active prop
    SectionLabel.astro            <- quadrant glyph + eyebrow, color prop
    SlimCta.astro
    PathwayCard.astro
    NewsCard.astro
    Logo.astro                    <- inline SVG, size + variant props
  pages/
    index.astro
    lavs-trading/index.astro
    lavs-trading/landscaping.astro ... vco-oil.astro
    cortijo.astro
    sustainability.astro
    news.astro
    contact.astro
```
Design tokens belong in one place (CSS custom properties on `:root` or a Tailwind theme) — the corner system in particular should be two utilities (`--radius-card`, `--radius-control`) rather than repeated literals.
