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
