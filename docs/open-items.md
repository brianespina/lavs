# Open items

Carried forward from the design handoff (`docs/design-handoff-source.md`),
with status against what's actually been built. These need a client or
product decision, not just more engineering — don't guess at them.

| Item | Status | Notes |
|---|---|---|
| Real photography for every slot, plus charcoal briquette & activated carbon product shots | **Partial** | The hero video is now real — `public/videos/hero-section-1900.webm` replaces the still frame per the handoff spec (`object-fit: cover`, `.62` overlay, poster falls back to `hero-still.jpg`). Every *other* image in the site is still a licensed stock stand-in, including every new Cortijo slot (hero, program cards, farm/story, enrollment band, `CortijoPanel`'s photo) — these reuse existing stock already in `public/images/` since no new photography shipped with the business-split delta. See [`decisions.md`](./decisions.md#images). |
| PCA, DepEd, DTI, SEC logo files | **Partial** | DepEd/DTI/SEC placeholder PNGs exist in `public/logos/` (from the handoff bundle) but the handoff itself calls out PCA as a still-owed text placeholder — check with the client before treating any of these as final. |
| Product specifics — SKU, packaging, mesh/roll sizes, grades, volumes, certifications | **Not done** | Now consolidated onto `/lavs-trading/bulk-agro-industrial-supplies` (client-requested photo-grid catalog — name + one line per product, no per-product detail page). Cards deliberately don't show SKU/packaging since real data was never supplied — see `decisions.md`. |
| News content — 9 seed articles, real CMS entries but placeholder copy | **Infra done, copy still placeholder** | Now Keystatic Cloud-backed with real `/news/[slug]` article pages — see [`cms.md`](./cms.md). The 9 articles were written by Claude to seed the CMS, not supplied by the client. Replace via `/keystatic` or by editing the `.mdoc` files directly. |
| Form handling — where inquiries go, validation, success/error states | **Not done** | `src/pages/contact.astro` is UI-only, no backend. |
| Tablet and interior-page mobile layouts | **Interim only** | See [`decisions.md`](./decisions.md#responsive-behavior--beyond-the-literal-spec) — a best-effort mobile-first pass was done beyond what was asked, but it's not a substitute for real design at those breakpoints. The mobile nav itself is now fully functional (expandable submenus mirror the desktop dropdowns — see `decisions.md`); the remaining gap is page-level layout design. |
| Cortijo has no mark by client decision | **Built as spec'd** | Type lockup (`CortijoLockup.astro`) in place. If this changes, see the note in `decisions.md`. |
| News filter strip | **Done** | Category filtering (All / LAVS Trading / Community & Education / Sustainability & Community) works client-side. "Load more updates" is still a static no-op — see `cms.md`. |
| Mobile / tablet layout for the Cortijo page | **Not designed** | The business-split delta explicitly flagged this as the largest open item in that handoff. `/cortijo` gets a reasonable single-column mobile stack following the rest of the site's interim mobile conventions, not a pixel spec (none exists). `CortijoPanel.astro` (on Home/Sustainability) is the one Cortijo surface with a real mobile design (`Mobile-Home.dc.html`) and is pixel-accurate. |
| Whether `/cortijo` should live on its own domain | **Resolved — same domain** | The handoff flagged this as needing a decision before routing. Confirmed with the client: stays at `/cortijo` on this site. A separate domain would be its own follow-up project (new Cloudflare route/DNS), not part of this update. |
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
