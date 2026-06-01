---
name: ultrakarkas Tilda export + standalone static site
description: Conventions for the УльтраКаркас Tilda Zero Block export and the standalone static-site build pipeline.
---

# УльтраКаркас Tilda export

Source of truth for all pages = the React app at `artifacts/ultrakarkas/src`. The
`tilda/` dir holds the Tilda Zero Block export: shared `tilda/custom.css` (all
styling, `--uk-*` tokens, `.uk-` prefixed classes) plus per-page `html.html` + `js.js`.

## Hard rules
- `tilda/contacts/*` is the GOLD STANDARD reference — never edit it.
- `tilda/contacts/css.css` references generic CSS tokens (`--fg`, `--muted-fg`,
  `--border`, `--primary`, `--primary-fg`, `--primary-bg-soft`, `--shadow-lg`) that
  in a real Tilda site come from Tilda site settings, NOT from `custom.css`.
  **Why:** these are undefined in the standalone build, so colors silently fall back.
  **How to apply:** the build aliases them to `--uk-*` by prepending a `:root{}`
  block to the COPIED `contacts.css` output (never to the source file).

## Standalone static site
`tilda/build-site.js` (Node, no python available) assembles the fragments into a
complete standalone static site at `artifacts/ultrakarkas/public/site/`, served at
`/site/` by the existing ultrakarkas Vite workflow (previewPath `/`). Run with
`node tilda/build-site.js`. Verify pages via app_preview, path `/site/<page>.html`.
- Emits index/projects/vacancies/privacy/contacts + `project-<slug>.html` for all 6
  projects (data mirrored in `tilda/project/data.js` from `src/lib/projects.ts`).
- `rewriteLinks()` maps SPA links to static `.html` (incl. `/project/<slug>` →
  `project-<slug>.html`). Contacts page reuses the index navbar (forced `uk-inner`)
  + footer + modal.

## SVG defs IDs must be scoped per pre-rendered variant
The wall/roof "пирог" sections (`.uk-lyr` in `tilda/index/html.html`) pre-render 3
config SVGs (econom/optimum/max) stacked, toggled by `display` via inline
`ukLyrTab`. Every `<pattern>/<linearGradient>/<filter>` id and its `url(#id)` must
be UNIQUE per SVG block (suffix e.g. `-c1..-c6`).
**Why:** duplicate ids across the stacked SVGs make `url(#insulation-pat)` resolve
to the FIRST match in the DOM, which lives inside a `display:none` SVG; Chrome will
not paint a pattern/gradient from a `display:none` subtree, so the visible diagram
renders empty white boxes (solid `fill` colors still work — that's the tell). This
was the "плохо сделаны пироги / переключение не работает" bug.
**How to apply:** after regenerating these pre-rendered SVGs, re-run the per-block
id-scoping pass (suffix all `id="X"` and `url(#X)` within each `.uk-lyr-svg-inner`
svg), then `node tilda/build-site.js`.

## Stale-asset symptom & cache-busting
"JS completely missing / switcher dead on the live site" almost always = a STALE
published `index.js`/`custom.css`, not a code bug (dev serves them `no-cache`, so
dev is fine while prod serves an old copy). `build-site.js` now appends `?v=<token>`
(a per-build `Date.now().toString(36)`) to every css/js href via `doc()`, so each
rebuild/republish busts browser + CDN caches. Vite serves `public/site/*` with the
query string fine (200). After ANY change, rebuild AND republish — dev passing is
not enough if the user is looking at the deployed site.

## Home-page JS is one IIFE — guard top-level DOM lookups
`tilda/index/js.js` registers ALL home handlers (ukSetPkg, ukToggleTable, ukToggleFaq,
modal…) inside a single IIFE. If a top-level line throws before the assignments
(e.g. `ukNavScroll()` dereferencing a missing `#uk-navbar`), NONE of the handlers get
registered and every inline `onclick` fails with "X is not defined" → looks like all
JS vanished. Null-guard every top-level `getElementById` use in that IIFE.
Note: пирог (`ukLyrTab`) toggles are INLINE in html.html, so they keep working even
when js.js dies — a useful tell that the failure is in js.js, not the markup.

## Mobile defect pattern: fixed multi-column grid "tables"
The .uk-cmp comparison "table" and several blocks are CSS grids with hardcoded
column counts (e.g. `grid-template-columns:1.1fr 1fr 1fr`) and NO mobile breakpoint —
on phones the last column gets clipped off the right edge (no horizontal scroll, it
just overflows hidden). Fix = add a `@media (max-width:640px)` that restacks: make
the row label full-width (`grid-column:1 / -1`) and drop to fewer columns. Check
every grid-based "table" for a small-screen breakpoint, not just font size.

## Packages spec table is data the client supplies, NOT in React source
The full комплектации feature table (with section groups 'Основание и пол',
'Каркас и отделка', 'Кровля', 'Инженерные системы') was given by the client directly
for the static site and is NOT present in the React Packages.tsx source — so the
"React is source of truth" rule does not cover it. Edit the static table in
tilda/index/html.html. Section rows = `<tr class="uk-pkg-sec"><td colspan="4">`.
Highlight rule learned from original: h:'all' → highlight Оптимум+Максимум cells
(NOT Эконом); h:'optimum'/'max' → that one column. Оптимум column always tinted via
existing `td:nth-child(3)` CSS; per-cell emphasis uses `.uk-highlight`.

## Anchors
Added `id="uk-compare"` to the dark comparison `<section class="uk-cmp">` so it can be
deep-linked and screenshotted (it had no id before).
