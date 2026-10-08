# CONSOLIDATION DELETION QUEUE
Nothing in this list has been deleted. Each entry was checked against current imports and usage on 2026-10-09.

| File / code | Why it's redundant | Replacement | Risk | Safe to delete after |
|---|---|---|---|---|
| `components/ComputeEngine/compute.css` | 0 imports; superseded by `ComputeEngine.css` | n/a | none | now |
| `components/ui/button.tsx`, `components/ui/utils.ts` | 0 imports (shadcn stubs) | n/a | none | now; then uninstall `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge` |
| `index.html`, `src/main.jsx`, `src/styles.css` | Vite-era entry, not used by Next | `app/page.jsx`, `app/globals.css` | none | now |
| `convert.js` | one-off Vite → Next conversion script | n/a | none | now |
| `tailwind.config.js` | empty `content`; no Tailwind utility classes used | n/a | low | after confirming `@tailwindcss/postcss` isn't needed |
| `postcss.config.js` | duplicate of `postcss.config.mjs` | `postcss.config.mjs` | low | after a build with only the `.mjs` config |
| `app/page.jsx` → `NVL72Scene`, `ZoomScene`, `TransistorScene`; `Play`/`RotateCcw` imports | not referenced by `scenes[]` | Blackwell / TransistorLogic scenes | none | now |
| `app/globals.css` legacy block (`.title-*` stays) → `.chitti-scene .left-column .question-card .q-* .reveal-btn .robot-* .eye* .core-glow .arm-* .system-* .architecture .block .sensors .compute .memory .interconnect .io .power .data-line .line-* .bw-* .nvl* .rack* .lights .nvlink-cables`, `@media(max-width:900px)` | unused, or leaking generic names onto Slides 02/03 | scene CSS | **medium**: Slides 02/03 render with some of these leaks today | after a visual check of Slides 02/03 with the block removed |
| Scene step-button CSS: `.aa-track/.aa-step-btn/.aa-divider`, `.ac-progression-track/.ac-step-btn`, `.progression-track/.progression-step-btn`, `.fb-*`, `.fs-*`, `.ff-*`, `.platform-*`, `.logic-*`, `.comp-*`, `.rb-*`, `.t-*` track/step/divider rules | markup replaced by the shared `StageNavigator` | `app/ui.css .stage-nav*` | none (no markup uses them) | now |
| `.ce-stage-indicator-bar/.ce-nav-pill`, `.dh-stage-indicator-bar/.dh-nav-pill`, `.mp-stepper*`/`.mp-step-dot` | replaced by `StageNavigator` | `app/ui.css` | none | now |
| Per-scene grids: `mp-bg-grid`, `ce-bg-grid`, `ac-ambient-grid`, `mm-bg-grid`, DataHighway/Chitti grids | duplicate of one grid | `.deck-grid` (`app/ui.css`) | low (slight grid-size changes) | after per-slide visual check |
| `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion` | 0 imports | n/a | none | now (`npm uninstall`) |
| `Reports of error/` | copies of `AUDIT_REPORT.md` / `STAGE_AUDIT_REPORT.md` | root copies | none | now |
| `public/assets/`, `public/videos/` | empty | n/a | none | when no assets are planned |
