# Open items

Carried forward from the design handoff (`docs/design-handoff-source.md`),
with status against what's actually been built. These need a client or
product decision, not just more engineering — don't guess at them.

| Item | Status | Notes |
|---|---|---|
| Real photography for every slot, incl. hero video, plus charcoal briquette & activated carbon product shots | **Not done** | Every image in the site is a licensed stock stand-in. See [`decisions.md`](./decisions.md#images). |
| PCA, DepEd, DTI, SEC logo files | **Partial** | DepEd/DTI/SEC placeholder PNGs exist in `public/logos/` (from the handoff bundle) but the handoff itself calls out PCA as a still-owed text placeholder — check with the client before treating any of these as final. |
| Product specifics (coco net mesh/roll sizes, charcoal/carbon grades, VCO volumes/packaging, certifications) | **Not done** | Copy on those service pages uses the handoff's placeholder language. |
| News content — 9 seed articles, real CMS entries but placeholder copy | **Infra done, copy still placeholder** | Now Keystatic Cloud-backed with real `/news/[slug]` article pages — see [`cms.md`](./cms.md). The 9 articles were written by Claude to seed the CMS, not supplied by the client. Replace via `/keystatic` or by editing the `.mdoc` files directly. |
| Form handling — where inquiries go, validation, success/error states | **Not done** | `src/pages/contact.astro` is UI-only, no backend. |
| Tablet and interior-page mobile layouts | **Interim only** | See [`decisions.md`](./decisions.md#responsive-behavior--beyond-the-literal-spec) — a best-effort mobile-first pass was done beyond what was asked, but it's not a substitute for real design at those breakpoints. |
| Cortijo has no mark by client decision | **Built as spec'd** | Type lockup / "C" monogram in place. If this changes, see the note in `decisions.md`. |
| News filter strip | **Done** | Category filtering (All / LAVS Trading / Cortijo / Sustainability & Community) works client-side. "Load more updates" is still a static no-op — see `cms.md`. |
| This repo connected to the Keystatic Cloud project | **Not done** | Keystatic Cloud storage is GitHub-repo-backed (see `cms.md`) — a remote (`brianespina/lavs`) is configured but nothing has been pushed, and the repo needs to be linked in the Keystatic Cloud dashboard before `/keystatic` saves persist anywhere. |
| Deploying to Cloudflare Workers | **Not done** | `wrangler.jsonc` exists (worker name `lavs-trading`) but the site has never actually been deployed — `wrangler deploy` after a build, or CI, is still needed. |

## Also worth flagging back to the client/dev lead

- The handoff's stock photography folder (`handoff/design_handoff_lavs_website/`)
  lives locally in this project at `handoff/` and is **gitignored** — it is not
  backed up by version control. If that local folder or the original
  `.zip` in Downloads is lost, the only durable copy of the design spec is
  `docs/design-handoff-source.md` (the README, text-only — no images, no
  `.dc.html` source files, no logo assets). Worth getting the original zip
  into shared storage (Drive, etc.) rather than relying on one machine's
  Downloads folder.
