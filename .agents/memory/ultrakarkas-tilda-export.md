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
