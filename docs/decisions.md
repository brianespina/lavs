# Engineering decisions

Choices made while turning the design handoff into a real Astro build that
weren't dictated by the handoff itself (or that resolve a gap in it). If one
of these turns out wrong, this is the file to update alongside the code.

## Stack

- **Astro 7 + Tailwind v4** (`@tailwindcss/vite` plugin, CSS-first `@theme`
  config — no `tailwind.config.js`). Static output (`output: "static"`),
  no server runtime needed for a marketing site.
- Package manager: npm (whatever `npm create astro@latest` set up).

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
substitute for real tablet/mobile design.

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

## Cortijo has no logo mark

Client decision carried over from the handoff: Cortijo de Palsabangon is
represented by a type-only lockup or a bordered "C" monogram tile (see
`PathwayCard.astro`), never the LAVS Plot Grid mark. If that changes, the
monogram tile is the thing to replace — search for `"C"` monogram usage in
`PathwayCard.astro` and wherever Cortijo pages built their own hero/nav
brand treatment.

## Contact form has no backend

`src/pages/contact.astro` renders a complete form UI (fields, chip-set
routing selector, message box) but does not submit anywhere — the handoff
explicitly flags form handling, validation, and success/error states as
unspecified (see Open Items). Don't mistake the UI for a working feature.

## News & Media filtering / pagination is non-functional

The filter strip (All / LAVS Trading / Cortijo / Sustainability) and "Load
more updates" button render but don't do anything — same reason as the
contact form: never specified in the handoff. All nine news items are
placeholder copy per the handoff's own Open Items list.

## A handful of colors are arbitrary values, not tokens

`text-[#7A6438]`, `text-[#4A4132]`, `text-[#3A3226]` (Home's Sustainability
band) and `text-[#4E6B45]` (the breadcrumb separator in `Hero.astro`) are
intentionally **not** theme tokens. They're one-off values from the original
design that appear in exactly one narrow context each and aren't in the
handoff's own named color table — adding them to `@theme` for a single call
site each would be token sprawl, not consistency. This is the deliberate
exception to "add a token before using a raw hex": if a color shows up in a
second, unrelated place, promote it to a token then.

## `Button.astro` radius via prop, not `class`

Tailwind classes appended via a `class` prop can collide with the same
property set by the component's own variant classes (both `rounded-tl-*`
utilities have identical specificity, so whichever rule happens to come
later in the generated stylesheet wins — not necessarily whichever comes
later in the `class` attribute). `Button.astro` avoids this by taking a typed
`radius` prop instead of expecting callers to override radius via `class`.
Follow the same pattern for any future component prop that has specificity
implications.
