# Open items

Carried forward from the design handoff (`docs/design-handoff-source.md`),
with status against what's actually been built. These need a client or
product decision, not just more engineering — don't guess at them.

| Item | Status | Notes |
|---|---|---|
| Real photography for every slot, incl. hero video, plus charcoal briquette & activated carbon product shots | **Not done** | Every image in the site is a licensed stock stand-in. See [`decisions.md`](./decisions.md#images). |
| PCA, DepEd, DTI, SEC logo files | **Partial** | DepEd/DTI/SEC placeholder PNGs exist in `public/logos/` (from the handoff bundle) but the handoff itself calls out PCA as a still-owed text placeholder — check with the client before treating any of these as final. |
| Product specifics (coco net mesh/roll sizes, charcoal/carbon grades, VCO volumes/packaging, certifications) | **Not done** | Copy on those service pages uses the handoff's placeholder language. |
| News content — all 9 items are placeholder copy; article detail pages never designed | **Not done** | `src/pages/news.astro` renders the placeholder items; there's no `/news/[slug]` route. |
| Form handling — where inquiries go, validation, success/error states | **Not done** | `src/pages/contact.astro` is UI-only, no backend. |
| Tablet and interior-page mobile layouts | **Interim only** | See [`decisions.md`](./decisions.md#responsive-behavior--beyond-the-literal-spec) — a best-effort mobile-first pass was done beyond what was asked, but it's not a substitute for real design at those breakpoints. |
| Cortijo has no mark by client decision | **Built as spec'd** | Type lockup / "C" monogram in place. If this changes, see the note in `decisions.md`. |
| News filter strip / "Load more" behavior | **Not done** | Renders, does nothing. Never specified. |

## Also worth flagging back to the client/dev lead

- The handoff's stock photography folder (`handoff/design_handoff_lavs_website/`)
  lives locally in this project at `handoff/` and is **gitignored** — it is not
  backed up by version control. If that local folder or the original
  `.zip` in Downloads is lost, the only durable copy of the design spec is
  `docs/design-handoff-source.md` (the README, text-only — no images, no
  `.dc.html` source files, no logo assets). Worth getting the original zip
  into shared storage (Drive, etc.) rather than relying on one machine's
  Downloads folder.
