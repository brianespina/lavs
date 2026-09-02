# Engineering decisions

Choices made while turning the design handoff into a real Astro build that
weren't dictated by the handoff itself (or that resolve a gap in it). If one
of these turns out wrong, this is the file to update alongside the code.

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

## News & Media is CMS-backed (Keystatic Cloud); pagination still isn't

News & Media moved off hardcoded placeholder arrays onto a real Keystatic
Cloud-backed content collection — see `docs/cms.md` for the full setup. The
category filter strip (All / LAVS Trading / Cortijo / Sustainability &
Community) is real now, toggling section visibility client-side. "Load more
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
