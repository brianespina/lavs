# Engineering decisions

Choices made while turning the design handoff into a real Astro build that
weren't dictated by the handoff itself (or that resolve a gap in it). If one
of these turns out wrong, this is the file to update alongside the code.

## Service pages consolidated from five to four (client feedback, 2026-09-09)

Client feedback (annotated screenshots, `lavs website.pdf`) asked to merge
the Coco Nets, Charcoal Briquettes, and VCO Oil pages into one catalog page
and add a new Planting Materials & Seedlings page. Implemented as a full
merge (client's stated preference over a lighter copy-only pass):

- **Deleted**: `coco-nets.astro`, `charcoal-briquettes.astro`, `vco-oil.astro`.
- **Added**: `planting-materials-seedlings.astro` — follows the normal
  service-page template (`Hero` → `ServiceSwitcher` → Overview → Scope of
  work → Who this is for → `SlimCta`).
- **Added**: `bulk-agro-industrial-supplies.astro` — deliberately a
  *lighter* template. The client's note was explicit: "no need for further
  info since there's an inquiry form... parang pics lang" — so this page is
  a photo-grid catalog (name + one line per product, each card linking
  straight to `/contact`), not the full Overview/Scope/Who-this-is-for
  template the other three pages use. Per-product SKU and packaging specs
  weren't supplied, so the cards don't claim any — see `open-items.md`.
- `ServiceSwitcher.astro` now has four tabs instead of five.
- `/lavs-trading`'s "lines of business" section went from three cards back
  to two: card 1 ("Landscaping and farm development") gained Planting
  Materials & Seedlings as a third sub-link; card 2 ("Bulk Philippine
  commodities") collapsed its three sub-links into one "View all
  commodities" link to the new catalog page. The third card added during
  the business-split delta (`docs/design-handoff-source.md`'s agricultural-
  commerce addition) is gone — its content now lives across the new
  dedicated page and card 1's sub-link, not as a duplicate third card.
- Every nav/footer link list (`SiteNav.astro` desktop + mobile,
  `SiteFooter.astro`, the Home service tile grid) was updated to match.

## LAVS accreditation claim simplified to "SEC-Registered Corporation"

Same feedback round: the nav utility bar previously listed several
accreditation-style claims (DTI registration, "Registered Agricultural
Trading"). Client direction was to show only "SEC-Registered Corporation" —
the other credentials (TESDA, DA-ATI) belong to Cortijo, not LAVS, which
lines up with the business split (`docs/design-handoff-source.md`). Scoped
to the utility bar specifically (`SiteNav.astro`, desktop and mobile); the
footer's separate "Employee-owned" / "Quezon Province, PH" badges weren't
part of this note and are left as-is since they're factual, not
accreditation claims.

## Cortijo's CTA copy says "Enroll in Agriculture Courses"

The same feedback (predating the Cortijo brand-split delta) asked to rename
the LAVS footer's "Enroll in TESDA Courses" button. That specific button no
longer exists on any LAVS page — the brand-split handoff explicitly
requires enrollment CTAs to live only on Cortijo's own page. By client
direction, the wording was applied there instead: `cortijo.astro`'s hero
button and enrollment-band button, plus `CortijoFooter.astro`'s footer
link, now read "Enroll in Agriculture Courses". `CortijoNav.astro`'s
persistent top pill stays the shorter "Enroll" — it's a small, always-
visible nav element sitting directly above the longer-worded hero button,
and the full phrase doesn't fit its footprint well.

## Stack

- **Astro 7 + Tailwind v4** (`@tailwindcss/vite` plugin, CSS-first `@theme`
  config — no `tailwind.config.js`).
- Package manager: npm (whatever `npm create astro@latest` set up).
- **`@astrojs/cloudflare` adapter** — added when Keystatic was wired up.
  Every marketing page is still fully static/prerendered; the adapter exists
  solely because Keystatic's `/keystatic` admin UI and `/api/keystatic`
  backend need on-demand (server) rendering, which requires an adapter to
  build at all. See `docs/cms.md`. This also means the deploy target is now
  fixed as Cloudflare Workers (matching the `workers.dev` URL already
  registered in the Keystatic Cloud project) rather than an open choice.

## Responsive behavior — beyond the literal spec

The handoff explicitly designed **1440px desktop only**, plus one 390px
mobile reference for the Home page (`Mobile-Home.dc.html`). Tablet and
interior-page mobile layouts are called out as an open item requiring a
client decision (see [`open-items.md`](./open-items.md)) rather than
something to invent.

Decision made here: rather than ship interior pages at a hard
`min-width: 1440px` (which the original `.dc.html` files literally do), every
page uses a mobile-first Tailwind pattern — stack to `flex-col` /
`grid-cols-1` by default, switch to the pixel-exact desktop values at the
`lg:` (1024px) breakpoint. `SiteNav.astro` is the one component that's fully
responsive by design (it collapses to the Mobile-Home hamburger pattern
site-wide, since it's a shared component used on every page). This gives a
usable-on-a-phone site today without pretending the in-between breakpoints
were actually designed — the desktop (`lg:`) values are still the pixel-exact
source of truth from the handoff. Treat this as an interim best-effort, not a
substitute for real tablet/mobile design. For the one mobile-breakpoint page
the handoff does specify (`Mobile-Home.dc.html`), use its concrete values
over anything the desktop-partially-responsive pass inferred — e.g. the home
hero is 560px on mobile per the reference (`src/pages/index.astro`), not the
420px that had previously been picking the content into the band below it.

## Images

Handoff photography (`handoff/design_handoff_lavs_website/images/*.jpg`) was
copied into `public/images/` and is referenced with plain `<img src="/images/...">`
tags rather than run through `astro:assets`. This was a scope call: every one
of these photos is a licensed stock stand-in the handoff explicitly says to
replace before launch (see Open Items), so investing in the `astro:assets`
optimization pipeline for images that are all getting swapped felt like
premature effort. **When real photography arrives, this is worth revisiting**
— switch to `astro:assets`' `<Image>` component (automatic resizing/format
conversion/lazy-loading) at that point, since the target audience is
Philippine mobile connections and these are currently un-optimized 100–200KB
JPEGs served as-is.

Accreditation logos (TESDA, DA-ATI — real; PCA/DepEd/DTI/SEC — placeholders)
are in `public/logos/`.

Hero video: `public/videos/hero-section-1900.webm` is the real handoff asset
(16 MB, 1900×1068, 27 s loop). It's referenced with a plain `<video>` tag on
`src/pages/index.astro` — no `astro:assets` handling either (there's no
equivalent pipeline for video, so "unoptimized, served as-is" is the
reality). `images/hero-still.jpg` stays around as the video's `poster`
attribute (first paint / play-blocked fallback), so the same file is still
used by the home hero — just as a poster now instead of the primary visual.

## Real photography (Cortijo batch): pre-optimized WebP, not `astro:assets`

The first batch of real client photography landed for the farm school
(2026-11-03) — 73 phone/Facebook-export photos of training batches,
demonstration plots, coir work, and graduations. The 15 selected for
`/cortijo` live in `public/images/cortijo/` as **WebP, pre-resized and
cropped to each slot** (7.5 MB of source JPEG → 2.1 MB served, ~71%
smaller), still referenced with plain `<img src="...">` like the rest of
the site.

This deliberately does *not* take the `astro:assets` migration that the
[Images](#images) decision above flags as the thing to revisit "when real
photography arrives". Reasoning: only Cortijo's photos are real so far —
every other page is still stock pending its own batch. Migrating one page
to `<Image>` would leave two different image idioms in the codebase for
however long the other batches take. The perf win (the actual point of
the exercise, for Philippine mobile connections) is already banked by
pre-optimizing. **When the remaining batches land, do the `astro:assets`
switch site-wide in one pass** — at which point these WebP files are
already the right size and can be imported as-is.

Crops were produced with sharp's attention-based `fit: "cover"` crop to
the slot's own aspect ratio, so each file is pre-cropped on its subject
rather than relying on `object-cover` to guess at render time. The script
is not kept in the repo (one-off); the sizes per slot are recorded in the
file names and in `src/pages/cortijo.astro`. Source originals are **not**
in version control — see the backup note in
[`open-items.md`](./open-items.md#also-worth-flagging-back-to-the-clientdevlead).

## Second real-photography batch: farm development (LAVS)

A second client batch landed 2026-11-04 — `FARM DEVELOPMENT.zip`, 293
photos across seven named project sites (Pagbilao, San Juan Batangas,
Bankong Kahoy, Malvar, and three Talim/Lucena sites) plus four videos.
Same treatment as the Cortijo batch: selected, cropped per slot, and
encoded to WebP in `public/images/farm/` (31.5 MB of source → 2.5 MB
served, ~90% smaller).

Roughly 40 of the 293 are phone screenshots (black letterboxing, visible
status bar) or Facebook post collages — unusable, skipped. The rest are
mostly 4608x2184 / 4032x1908 panoramas, i.e. the highest-quality source
material the project has had so far.

Where it went, beyond the farm-development page it was supplied for:
`/lavs-trading/planting-materials-seedlings` (the batch includes a full
nursery set — bagged stock, trays, seedling crates), `/lavs-trading`'s
"lines of business" card 1 and the our-story photo, two
`/sustainability` gallery tiles, and the `farm-development-groundbreaking`
news cover. **The four videos were reviewed and rejected** (2026-11-04): handheld phone pans across papaya plots and tilled ground in flat overcast light, 8-22s, no usable camera movement, and the Pagbilao one is vertical (1080x1920) and soft. All four are worse footage than the existing hero clip — don't re-litigate them; the home hero video is still owed by the client.

Note on hero compression: `farm/hero-contour-rows.webp` is 310 KB at
q48 — unusually low quality for its size because bare-soil texture
compresses badly. It sits under `Hero.astro`'s `.68` forest overlay,
which hides the artifacts; don't "fix" the quality number without
checking how it actually renders behind the overlay.

## Third batch: bulk-commodity product shots, and the catalog grows to 11

The client supplied 11 studio product shots (2026-11-04) for
`/lavs-trading/bulk-agro-industrial-supplies` — the batch `open-items.md`
had been flagging as owed. They name products the four existing catalog
cards didn't cover, so the catalog was expanded from 4 generic cards to
**11 named products**: coco nets/geotextile, coir rope & twine, coconut
fibre, coco peat, four charcoal forms (hexagonal, pillow, cylindrical,
shisha/hookah cubes), VCO, coconut shell, and smoked copra. That matches
the client's own direction for this page ("parang pics lang") — more
product pictures is the point of it.

Card copy still describes *what each product is* and never its specs:
no SKU, grade, packaging, ash content, or burn time. Those were still
never supplied, and the page's side note ("confirmed against your
requirement") continues to carry that. Don't add performance claims to
these cards without real data from the client.

Processing differs from the other batches: these are studio cut-outs, so
each is composed onto a **900x500 white canvas at 85% scale**
(`fit: "inside"` then `extend`) rather than attention-cropped. The canvas
aspect matches the card's image frame, so `object-cover` only ever eats
white margin and never clips the product. Three shots
(hexagonal/cylindrical briquettes, coco peat) had a grey studio backdrop
and got a `-level 0%,95%` white-point lift so they don't read as a grey
box on a white card. Sources are small (864-2032px) — fine for 315px
cards, which is why the page hero uses the one full-frame texture in the
batch (smoked copra) rather than a cut-out.

## Cortijo gets a gallery section

Added with that photo batch: an "On the farm" gallery between Who We Help
and the enrollment band on `/cortijo`, plus a `Gallery` anchor in
`CortijoNav`. Not from any handoff — the delta never designed one — so it
follows the existing `/sustainability` gallery pattern (one 2x2 feature
tile + singles, `object-cover`) rendered in Cortijo's own tokens (arch
radius, `cortijo-paper` band, Bitter heading). Nine tiles is not
arbitrary: 1 feature at 2x2 + 8 singles fills the 4-column desktop grid
exactly with no orphan cells. Keep that arithmetic if tiles are added —
the next clean count is 13 (feature + 12).

## Cortijo has no logo mark

Client decision carried over from the handoff: Cortijo de Palsabangon is
represented by a type-only lockup, `CortijoLockup.astro`, never the LAVS
Plot Grid mark. If that changes, `CortijoLockup.astro` is the component to
replace, and `Logo.astro`'s `variant="cortijo"` (the LAVS mark recolored for
group-attribution use on Cortijo surfaces) would need reconsidering too —
see `docs/design-system.md#cortijo-brand-system`.

## The business split: LAVS is the one commercial enterprise, Cortijo is training-only

A later handoff delta corrected the original framing. The site used to read
as "two enterprises, one ecosystem" — Cortijo sold produce, inputs, and
nursery stock *and* ran training, and was a top-level nav destination
(`SiteNav`'s `active="cortijo"` state, a `Cortijo de Palsabangon Farm ▾`
dropdown, and a full footer column). That was wrong: **LAVS Trading &
Development Services Inc. is the one commercial enterprise** — it now also
carries all agricultural commerce (seedlings, planting mats, farm inputs,
produce distribution, added to `/lavs-trading` and the Home service grid).
**Cortijo de Palsabangon Farm OPC is training and certification only** — a
sister company, reached from a LAVS page via `CortijoPanel.astro`'s
"Visit the farm school →" link, never a peer nav item. Consequently:

- `SiteNav.astro` lost the Cortijo dropdown and the `"cortijo"` value from
  its `active` prop union entirely.
- `SiteFooter.astro` lost the "Cortijo de Palsabangon" link column; a
  "Sustainability & community" column (with one `/cortijo` link) and a
  "Seedlings & Agri Inputs" LAVS-column link replaced it. The global CTA
  band's "Enroll in TESDA courses" button is gone — it must never reappear
  on a LAVS page.
- Cortijo got its own visual identity (separate token set, Bitter serif,
  the "arch" top-corner radius system) so it reads as a distinct brand
  reached from LAVS, not a second competing band on the same page — see
  `docs/design-system.md#cortijo-brand-system`.
- `/cortijo` stays on this domain (confirmed with the client — the
  alternative, a separate domain, was explicitly left open by the handoff
  but not chosen). It's routed as an ordinary Astro page; nothing about the
  visual separation required actual infra separation.
- The Cortijo page itself has **no dedicated mobile design** — this wasn't
  designed in the delta and isn't invented here; see `open-items.md`. The
  one place Cortijo mobile *is* designed (`CortijoPanel` on Home/Sustainability,
  per `Mobile-Home.dc.html`) is implemented pixel-accurately.

## Contact form has no backend

`src/pages/contact.astro` renders a complete form UI (fields, chip-set
routing selector, message box) but does not submit anywhere — the handoff
explicitly flags form handling, validation, and success/error states as
unspecified (see Open Items). Don't mistake the UI for a working feature.

## News & Media is CMS-backed (Keystatic Cloud); pagination still isn't

News & Media moved off hardcoded placeholder arrays onto a real Keystatic
Cloud-backed content collection — see `docs/cms.md` for the full setup. The
category filter strip (All / LAVS Trading / Community & Education /
Sustainability & Community) is real now, toggling section visibility
client-side. The category was originally named "Cortijo"; it was renamed to
"Community & Education" as part of the business-split delta (see above) —
since `NEWS_CATEGORIES` in `src/lib/news.ts` is the single source for the
stored value, the CMS field, the badge color key, and the filter/display
text all at once, the rename was a one-line change there plus updating the
three `.mdoc` articles that used the old value. "Load more
updates" is still a static, non-functional button — pagination past what's
already shown per category was never specified, same reasoning as before.
Article copy is still placeholder content (now real CMS entries, but
written by Claude, not the client) — see Open Items.

## One color is still an arbitrary value, not a token

`text-[#4E6B45]` (the breadcrumb separator in `Hero.astro`) is intentionally
**not** a theme token — it's a one-off value used in exactly one place and
isn't in the handoff's own named color table. The Home page's Sustainability
band colors that used to be raw hex here (`#7A6438` / `#4A4132` / `#3A3226`)
were later promoted to proper tokens (`clay` / `clay-deep` / `clay-darker` in
`global.css`) once they needed reuse — see `docs/design-system.md`. That's
the pattern: a single-use one-off value can stay a raw hex in the arbitrary
Tailwind bracket syntax; the moment it shows up a second time, promote it to
a token instead of copy-pasting the hex.

## `Button.astro` radius via prop, not `class`

Tailwind classes appended via a `class` prop can collide with the same
property set by the component's own variant classes (both `rounded-tl-*`
utilities have identical specificity, so whichever rule happens to come
later in the generated stylesheet wins — not necessarily whichever comes
later in the `class` attribute). `Button.astro` avoids this by taking a typed
`radius` prop instead of expecting callers to override radius via `class`.
Follow the same pattern for any future component prop that has specificity
implications.

## Mobile menu has expandable submenus (not in the handoff)

The handoff's `Mobile-Home.dc.html` spec is five flat items — the desktop
dropdown menus (7 LAVS Trading links, 3 Cortijo links) had no mobile
equivalent, making every service page unreachable on mobile. By user
direction (2026-09-03) the two enterprise items in the mobile panel are
expandable accordions (`data-submenu-toggle` in `SiteNav.astro`), exposing
the same link sets as the desktop dropdowns, indented one level. Tap
targets stay ≥ 44px per the handoff's mobile rule. If a real mobile nav
design ever arrives, this is the thing to replace.

## Hero heights are minimums, not fixed

The handoff specifies fixed hero heights (660px home, 440px interior,
360px article). Fixed heights clip whenever content runs longer than the
spec copy — observed on the Cortijo mobile hero, where the lead overflowed
the 320px box. All three hero spots (`Hero.astro`, `src/pages/index.astro`,
`src/pages/news/[slug].astro`) now express the spec heights as `min-h-*`
with the content layer in normal flow (`relative` instead of
`absolute inset-0`), so longer content grows the hero and the background
photo still covers it via `object-cover`. The spec values are preserved as
the minimums — short content looks exactly as designed.

## Home hero is 760px on desktop, not the spec's 660px

The handoff specs the desktop home hero at 660px. By user direction
(2026-09-03) it's `lg:h-[760px]` in `src/pages/index.astro` — more of the
video above the fold. Mobile stays at the spec's 560px. If this is ever
revisited, the spec value to compare against is in
`docs/design-handoff-source.md` ("Hero — 660px").

## Nav active marker sits above the label, not below

The handoff specs the active nav item as a 2px `#E0AE58` underline at
`bottom:26px`. By user direction (2026-09-03) the marker is a *top* line
instead — `top-[26px]` on the shared `underline` class in `SiteNav.astro` —
so all five desktop nav items carry it in the same place. There's a subtlety
that makes this non-trivial: plain links render inline (their `py-[33px]`
padding doesn't contribute to the `position: relative` box the marker is
placed against) while dropdown triggers are `flex` blocks, so one offset
value originally landed in two different places. `navLink` now includes
`flex items-center` for every trigger — identical box geometry everywhere —
which is what makes the single `top-[26px]` value consistent. Don't remove
the `flex` from `navLink` without re-checking marker alignment.
