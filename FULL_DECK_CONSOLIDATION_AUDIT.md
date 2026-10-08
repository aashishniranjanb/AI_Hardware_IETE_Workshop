# FULL DECK CONSOLIDATION & UX ARCHITECTURE AUDIT (Step 5A)
Date: 2026-10-09 · Mode: READ-ONLY

**Method:**
- A static analysis script (Python) cross-referenced every `className` token in 86 JSX/JS files against the selectors in 19 CSS files.
- A live DOM sweep measured every slide and every stage (226 stage states) at 1366×768 in the dev server.
- I manually reviewed `app/`, configs and dead-file candidates.

**Correction to earlier reports:** the Step 2 control reservation **is present**. `app/globals.css` applies `padding-right: var(--scene-bottom-clearance) !important` (172 + 24 = 196px) to any class matching `[class*="-bottom-bar"]` or `[class*="-progression-bar"]`. My earlier `grep 196px` missed it because the value comes from a variable.

---

## 1. EXECUTIVE SUMMARY
The deck works, but it is 17 separate products sharing one keyboard engine.

| Area | Finding |
|---|---|
| Stage navigators | 14 visual implementations: 11 near-identical "bottom-bar + track + step-btn" copies, 2 "indicator-bar + nav-pill" copies, 1 stepper on Slide 05. Slides 03 and 02 have none. |
| Colors | 186 unique hex colors, no design tokens. The top three alone (`#27D7FF`, `#57E6A5`, `#8B98A8`) appear about 1,100 times. |
| Typography | 13 font-family spellings. 208 `font-size` declarations are under 12px, plus about 520 tiny inline `fontSize` values in View files. |
| Animation | Every scene except 02 and 03 animates stage changes with the same single `gsap.fromTo(... > *)` fade-up. There is no stagger, no data-flow semantics and **no slide transition** (instant swap). |
| Reduced motion | Not supported anywhere (0 files). |
| CSS leakage | 16 cross-scene dependencies and 7 bare-selector collisions (§14). `globals.css` holds about 120 lines of CSS for scenes that no longer exist. Some of its generic classes (`.compute`, `.memory`, `.power`, `.io`, `.sensors`) leak onto Slides 02 and 03. |
| Offline | One external dependency, Google Fonts via `@import`. Offline, Inter and Space Grotesk fall back to system fonts and the layout metrics change. |
| Overflow (1366×768) | Slides 02, 04, 06, 07, 15, 16, 17 have text outside the frame. 06, 15, 16, 17 have internal scrollbars. 15, 16, 17 have text under the deck controls. |

## 2. FILE INVENTORY
| Class | Files |
|---|---|
| ACTIVE / GLOBAL | `app/page.jsx`, `app/layout.tsx`, `app/globals.css`, `components/deck/DeckNavigation.js` |
| SCENE-SPECIFIC (active) | 16 scene folders under `components/*`: 82 JSX/JS files and 17 CSS files |
| DEAD | `components/ComputeEngine/compute.css` (0 imports), `components/ui/button.tsx` + `utils.ts` (0 imports) |
| LEGACY (Vite) | `index.html`, `src/main.jsx`, `src/styles.css`, `convert.js` (the script that converted `src/main.jsx` → `app/page.jsx`) |
| LEGACY / DUPLICATE CONFIG | `tailwind.config.js` (empty `content`, and Tailwind classes aren't used), `postcss.config.js` + `postcss.config.mjs` (two configs) |
| DEAD inside active files | `app/page.jsx`: `NVL72Scene`, `ZoomScene` and `TransistorScene` (not in `scenes[]`); `Play` and `RotateCcw` imports. `globals.css`: about 120 lines for the old title, Chitti, system, Blackwell and NVL72 layouts (§13). |
| UNUSED DEPENDENCIES | `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion` (0 imports). `@radix-ui/react-slot`, `class-variance-authority`, `clsx` and `tailwind-merge` are only used by dead `components/ui`. |
| public/ | `public/assets/`, `public/videos/`: both empty |
| Docs | Many `*_REPORT.md` files plus a `Reports of error/` folder that duplicates two of them |

## 3. COMPONENT DUPLICATION
| Responsibility | Implementations | Difference | Share? |
|---|---|---|---|
| Stage navigator | `aa-`, `ac-`, `progression-`(Blackwell), `fb-`, `fs-`, `ff-`, `platform-`, `logic-`, `comp-`, `rb-`, `t-` bottom bars; `ce-`/`dh-` top pill bars; `mp-stepper` | Prefix only, plus small padding and font differences | **YES**, one `StageNavigator` |
| Scene header (eyebrow + title + caption + tag pill) | About 14 copies (`ac-top-header`, `aa-…`, `fb-…`, …) | Prefix and accent color | YES, as a shared CSS layer. A full `SceneShell` component isn't justified, because layouts differ |
| Ambient grid | `.ambient-grid` (global, used by 11 scenes) plus separate `mp-bg-grid`, `ac-ambient-grid`, Chitti, mental and DataHighway grids | Grid size 40/50/60px, opacity | YES, one `.deck-grid` |
| Callout pill | `callout-pill` (ComputeEngine, Blackwell, MemoryProblem), `ac-callout-pill`, others | Accent variants | YES, `.ui-callout` with accent modifiers |
| Panel / card (dark gradient, 1–2px border, glow) | About 40 class families (`sys-card`, `hierarchy-tier-card`, `ce-*`, `fb-*-card`, …) | Radius 8–16px, border colors | YES, `.ui-panel` primitive. Migrate gradually |
| Badge / status pill | `sys-badge`, `tier-badge`, `badge-pulse`, `mp-utilization-badge`, … | Colors | YES, `.ui-badge` |
| Stage `gsap.fromTo` block | 15 identical blocks | Selector only | YES, `stageEnter()` |
| Keyboard listeners | Done in Step 3 | n/a | Done |
| Chip/package frame | `ComputeObject`, `ComputeUnit`, `bw-chip`, `GPUOverview` | Concept-specific | NO, keep scene-specific |
| Data-flow connector | `DataFlow` (Mem), `ConnectionPath` (DH), `ChittiDataFlow` | Different semantics | Partly: a shared `drawPath`/`flowAlong` animation, but keep the scene SVG |

## 4. CSS DUPLICATION
- **Near-duplicate blocks:** the step-button and track styles are copied across 11 files with matching hex values (`#27D7FF`, `#57E6A5`, `#8B98A8`).
- **Transitions:** 19 different `transition` values (`all .2s ease` ×19, `all .3s ease` ×8, …).
- **Radii:** 20 different `border-radius` values (4/6/8/10/12/14/16/20px).
- **z-index:** 23 different values, from 0 to 100, with no scale.
- **`vw`/`vh` units:** 155 uses across scene CSS. These break inside the 16:9 letterbox frame, where `vw` refers to the window, not the frame. Biggest users: `globals.css` 50, `mental.css` 13, `DataHighway` 11, `Blackwell` 10, `ComputeEngine` 10.
- **`!important`:** chitti 2, mental 3, globals 3.

## 5. DESIGN TOKENS (proposed)
| Token | Value (from actual usage) |
|---|---|
| `--c-bg` | `#05070B` |
| `--c-bg-deep` | `#020617` |
| `--c-panel` | `#0B1120` |
| `--c-panel-2` | `#0F172A` |
| `--c-border` | `#1E293B` |
| `--c-border-strong` | `#334155` |
| `--c-cyan` | `#27D7FF` (with `#38BDF8` as the Tailwind-sky variant to unify) |
| `--c-blue` | `#4B8DFF` |
| `--c-green` | `#57E6A5` |
| `--c-amber` | `#F59E0B` / `#FFB84D` |
| `--c-purple` | `#8A7CFF` |
| `--c-text` | `#F4F7FA` |
| `--c-muted` | `#8B98A8` |
| `--c-dim` | `#64748B` |

- **Glow:** `0 0 14px color-mix(in srgb, var(--accent) 55%, transparent)`.
- **Radius:** `--r-sm` 6, `--r-md` 10, `--r-lg` 14, `--r-pill` 999.
- **Spacing:** `--s-1` 4 … `--s-6` 32.
- **Motion:** `--t-fast` .18s, `--t-base` .3s, `--ease-out` `cubic-bezier(.16,1,.3,1)`.
- **z-index:** scene 0–10, header 20, topbar 25, controls 40, transition 60, blackout 100.
- **Type:** display 40, heading 22, section 18, body 15, label 13, micro 12 (px at the 1366 reference).

## 6. STAGE NAVIGATORS (live, 1366×768)
| Slide | Stages | Implementation | Position | Height | Button font | Clipped buttons | Controls collision |
|---|---|---|---|---|---|---|---|
| 02 | (modes) | buttons in `chitti-cmd-bottom` | bottom | n/a | n/a | n/a | no |
| 03 | 11 | **none visible** | n/a | n/a | n/a | n/a | n/a |
| 04 | 9 + quiz | `ce-nav-pill` | top | 43 | 11px | 0 | no |
| 05 | 12 | `mp-stepper` (Step 4) | top-right | 99 | 12px | 0 | no |
| 06 | 13 | `dh-nav-pill` | top | 53 | **10px** | **8, scrolls** | no |
| 07 | 8 | `progression-step-btn` | bottom | 41 | 11px | 0 | no |
| 08 | 10 | `ac-step-btn` | bottom | 36 | 10px | 0 | no |
| 09 | 10 | `t-step-btn` | bottom | 36 | 10px | 0 | no |
| 10 | 11 | `logic-step-btn` | bottom | 36 | 10px | 0 | no |
| 11 | 12 | `platform-step-btn` | bottom | 44 | 10px | 0 | no |
| 12 | 13 | `comp-step-btn` | bottom | 36 | 10px | 0 | no |
| 13 | 15 | `fb-step-btn` | bottom | 44 | 10px | 0 | no |
| 14 | 13 | `fs-step-btn` | bottom | 50 | 10px | 0 | no |
| 15 | 14 | `ff-step-btn` | bottom | 47 | 11.5px | **4, scrolls** | text under controls |
| 16 | 19 | `aa-step-btn` | bottom | 45 | 11.2px | **8, scrolls** | text under controls |
| 17 | 15 | `rb-step-btn` | bottom | 47 | 11.5px | **4, scrolls** | text under controls |

**Proposal:** one `<StageNavigator stages current onSelect variant>`:
- Numbered dots on a connector line, plus a `PHASE 05 / 12` counter and the current label.
- Labels show inline only when there are 8 stages or fewer.
- It never scrolls, and its width is bounded so it clears the controls.
- `aria-label` per dot, `aria-current="step"`.

## 7. GLOBAL CONTROLS
- **Ownership:** `app/page.jsx`.
- **`.controls`:** z-index 40, bottom-right 24/16px, 172×42px, `pointer-events: auto`.
- **`.topbar`:** z-index 25, `pointer-events: none` with children set to auto.
- **`.progress`:** z-index 25, 3px.
- **Blackout:** z-index 100.
- **Reservation:** the attribute-selector reservation protects only class names containing `-bottom-bar` or `-progression-bar`.
- **Collisions measured:** Slides 15, 16 and 17 still have text under the controls (step pills inside a scrolling track overflow the reservation).
- **Topbar collisions** (scene text under the "IETE × AI HARDWARE / 08 / 17" bar): Slides 07–14. Their headers start at about 2.2rem and overlap the 18px topbar line.

## 8. ANIMATION AUDIT
| Slide | Scene enter | Stage transition | Data flow | Highlight | Numbers | Connections | Completion |
|---|---|---|---|---|---|---|---|
| 01 | GSAP stagger timeline (kicker → title → chip; looping particles) | n/a | none | none | none | none | none |
| 02 | GSAP (ExplodedView timeline) | mode change, GSAP | `ChittiDataFlow` CSS/SVG | CSS | none | SVG | none |
| 03 | GSAP + MotionPath timeline | GSAP per stage | MotionPath packets | GSAP | none | SVG | collapse |
| 04 | FADE (shared fromTo) | FADE | CSS keyframes (7) | CSS | none | none | none |
| 05 | FADE | FADE | CSS lanes / SVG `<animate>` | CSS | none | CSS | none |
| 06–17 | FADE (identical fromTo) | FADE, whole view at once | static or CSS | CSS class swap | **none** | static SVG | **none** |

- **Inconsistency:** Slides 01–03 have rich GSAP timelines, while 04–17 all use the same generic fade of the whole view.
- **Missing:** no slide transitions, no count-up, no path drawing, no completion payoff, no stagger.
- **Leak risk:** low. Every scene uses `gsap.context` with `revert()`. Slide 01 has infinite `repeat:-1` particle tweens, cleaned up on unmount.

## 9. SLIDE TRANSITIONS
- Current: **hard cut.** `<Scene key>` unmounts and remounts.
- Not used: `AnimatePresence` (Framer Motion is installed but unused), GSAP slide transitions, CSS transitions.
- There's no flash, because the background is shared, but there's no continuity either.
- **Proposal:** a GSAP-only transition layer in `page.jsx`:
  - The outgoing view is cloned as a static snapshot.
  - Outgoing: opacity 1→0, scale 1→0.985, 280ms.
  - A thin cyan scan line sweeps across.
  - Incoming: opacity 0→1, scale 1.015→1, 420ms.
  - Total under 650ms, coordinated with the Step 3 transition lock.

## 10. SCENE CONTINUITY
| Transition | Class | Note |
|---|---|---|
| 01→02 | Hard cut | ok (title → story) |
| 02→03 | Logical | robot → system body |
| **03→04** | **Broken visual** | 03 ends zoomed on COMPUTE; 04 opens with an unrelated mockup |
| 04→05 | Logical | compute → memory, "RECAP FROM SLIDE 04" |
| 05→06 | Logical + teaser | 05's teaser announces 06 |
| 06→07 | Logical + teaser | `blackwell_teaser` |
| **07→08** | Logical | ends "zoom down" → 08 opens on GPU (bridge opportunity) |
| **08→09** | Logical | 08 ends on logic gates → 09 transistor |
| 09→10 | Logical | |
| **10→11** | Logical | ALU → FPGA → RTL pathway |
| **11→12** | Logical | |
| **12→13** | Logical | |
| 13→14→15 | Logical | workshop sequence |
| **15→16**, **16→17** | Logical | LED → accelerator → RTL |

The **visual** continuity is a hard cut everywhere. The highest-value bridge is 03→04, where the COMPUTE block becomes the Compute Engine.

## 11. TYPOGRAPHY
- **Families:** Space Grotesk (display/headings, written 6 different ways), Inter (body, 4 spellings), `monospace` / JetBrains Mono stack (code), plus one stray `serif`.
- **Sizes:** 7–72px. 208 CSS declarations are under 12px (most in AIChip 45, Blackwell 32, ComputeEngine 23).
- **Inline JSX `fontSize` under 12** dominates in the View files: AIAccelerator 85, Platforms 65, ModelComparison 54, FPGASetup 45, FPGABuild 42, RTLBuild 38.
- **Proposed scale:**

  | Role | Size and style |
  |---|---|
  | display | 40 / 800 Space Grotesk |
  | heading | 22 |
  | section | 18 |
  | body | 15 Inter |
  | label | 13 / 800 / .12em |
  | micro | 12 (floor) |

## 12. RESPONSIVE AUDIT (live, 1366×768, max across all stages)
| Slide | Stages | Text outside frame | Inner scroll | Under controls | Under topbar | Text <12px (max) | Min px | Content coverage |
|---|---|---|---|---|---|---|---|---|
| 01 | 1 | 0 | 0 | 0 | 0 | 1 | 11 | 52% (balanced) |
| 02 | 1 | **4** | 0 | 0 | 0 | **61** | **6** | 72% |
| 03 | 11 | 0 | 0 | 0 | 0 | 6 | 11 | 70% |
| 04 | 20 | **2** | 0 | 0 | 0 | **68** | 8 | 66–89% |
| 05 | 12 | 0 | 0 | 0 | 0 | 0 | 12 | 59–74% ✅ |
| 06 | 13 | **10** | **1** | 0 | 0 | 49 | 8 | **100–153%** (overflow) |
| 07 | 8 | **25** | 0 | 0 | 2 | **97** | 7 | 85% |
| 08 | 10 | 0 | 0 | 0 | 2 | **120** | 8 | 86% |
| 09 | 10 | 0 | 0 | 0 | 2 | 84 | 9 | 87% |
| 10 | 11 | 0 | 0 | 0 | 2 | 36 | 9 | 87% |
| 11 | 12 | 0 | 0 | 0 | 2 | 42 | 8 | 87% |
| 12 | 13 | 0 | 0 | 0 | 2 | 44 | 9 | 87% |
| 13 | 15 | 0 | 0 | 0 | 2 | 94 | 7 | 87% |
| 14 | 13 | 0 | 0 | 0 | 2 | 34 | 8 | 87% |
| 15 | 14 | 1 | **1** | **5** | 0 | 33 | 9 | 93% |
| 16 | 19 | **11** | **1** | **3** | 0 | 54 | 9 | **100–127%** |
| 17 | 15+ | **5** | **1** | **3** | 0 | 44 | 9 | **100–106%** |

**Recommendation:**
- **Fixed design canvas** (as on Slide 05): 06, 07, 16, 17 (dense, `vw`-heavy, overflowing) and 04.
- **Responsive CSS is enough:** 08–14 already fit. They need the shared navigator, a topbar clearance fix and font floors.
- **Scene-specific composition:** 02 (deferred) and 03.

## 13. DEAD CODE (verified)
| File / code | Verification | Recommendation |
|---|---|---|
| `components/ComputeEngine/compute.css` | 0 imports | delete |
| `components/ui/button.tsx`, `utils.ts` | 0 imports | delete; then drop radix, cva, clsx, tailwind-merge |
| `index.html`, `src/main.jsx`, `src/styles.css`, `convert.js` | Vite leftovers, not referenced by Next | delete |
| `tailwind.config.js` | empty `content`, no Tailwind classes | delete |
| `postcss.config.js` | duplicate of `.mjs` (adds autoprefixer) | keep one (`.mjs`) |
| `NVL72Scene`, `ZoomScene`, `TransistorScene`, `Play`/`RotateCcw` imports in `page.jsx` | not referenced | delete |
| `globals.css`: `.chitti-scene .left-column .question-card .q-* .reveal-btn .robot-* .eye* .core-glow .arm-* .system-* .architecture .block .sensors .compute .memory .interconnect .io .power .data-line .line-* .bw-* .nvl* .rack* .lights .nvlink-cables`, `@media(max-width:900px)` block | 29 classes are unused. Others are generic names that leak (§14). | delete |
| `three`, `@react-three/*`, `framer-motion` | 0 imports | uninstall (saves install size) |
| `Reports of error/` | duplicate copies of two reports | delete |
| `public/assets`, `public/videos` | empty | keep or remove |

## 14. CSS LEAKAGE
**Every scene CSS file is imported by `page.jsx` at once, so every selector is global.**

| Selector | Defined in (owner) | Used by | Problem |
|---|---|---|---|
| `.callout-pill` (bare) | ComputeEngine (plus Blackwell compound, MemoryProblem scoped) | DataHighway | DataHighway gets its look from ComputeEngine |
| `.accent-cyan/blue/purple/amber` (bare) | AIChip, ComputeEngine, Blackwell | DataHighway | same |
| `.die-label` | Blackwell | DataHighway `NoCVisual` | cross-scene |
| `.badge-pulse` | DataHighway | Blackwell `SupercomputerView` | cross-scene |
| `.plat-wrap` | HardwarePlatforms | ModelComparison | cross-scene |
| `.vertical` (compound `.data-flow-connector.vertical`) | MemoryProblem | DataHighway | harmless (compound), but confusing |
| `.compute .memory .power .sensors .io .interconnect` (bare, absolute-positioned legacy) | globals.css | Chitti `ChittiExplodedView`, MentalModel `SystemScene` | **Active leak.** Legacy `left/top/width` rules apply to current Slide 02/03 nodes; it's what the `!important`s in chitti/mental fight. |
| `.chitti-scene` | globals.css (legacy flex layout) | Chitti | legacy rule still applies |
| `.parallel-mac-grid` | AIChip **and** FPGABuild (bare) | both | **collision**: last loaded wins |
| `.gate-cards-grid`, `.ladder-step-bar` | AIChip **and** LogicComputation | both | **collision** |
| `.hbm-tag` | Blackwell **and** DataHighway | both | collision |
| `.pulse-dot` | Blackwell **and** Chitti | both | collision |
| `.switch-tray` | globals **and** Blackwell | Blackwell | collision |
| `.q-label` | globals **and** AIChip | AIChip | collision |
| `.scene`, `.eyebrow`, `.ambient-grid` | globals | all | intended shared ownership; keep, but document |

**Fix:** move shared classes into a `ui.css` layer with `ui-` names, prefix colliding scene classes, and delete the legacy globals.

## 15. ACCESSIBILITY / PRESENTATION UX
- **Navigators:** 13 of 15 have an `aria-label` on the `<nav>`. Only Slide 05 has per-button labels and `aria-current`.
- **Clickable divs:** `onClick` on `<div>` in ChittiCallouts, ComputeEngine, MemoryHierarchy and `page.jsx` (blackout). These aren't keyboard reachable.
- **Reduced motion:** none. Slide 01 particles loop forever.
- **Touch/swipe:** none.
- **Emoji as icons:** DataHighway 13, Memory 8, Chitti 2, title 3. Rendering varies by OS.
- **Focus:** buttons keep focus after a click, and Space then hits the deck engine. That's handled, because the engine calls `preventDefault`.
- **Contrast:** dimmed nodes at opacity .15–.3 (Slide 03 and others) fall below legibility on a projector.

**Priorities:** reduced motion (P1), per-dot aria (via shared navigator, P1), swipe (P2), emoji → SVG (P3).

## 16. OFFLINE VENUE READINESS
- **Only external dependency:** Google Fonts `@import` in `globals.css` (Inter 400–900, Space Grotesk 400–700).
- **Offline:** fonts fall back to system-ui and Arial, widths change, and the tight layouts may overflow.
- **Clean:** no CDN scripts, remote images, videos or APIs.
- **Fix:** `next/font/google`. It downloads at **build time** and self-hosts the files in `.next`, so it works offline once built. Alternatively, put WOFF2 files in `public/fonts`.

## 17. MASTER DUPLICATION MATRIX
| System | Implementations | Dupes | Visual diff | Functional diff | Owner | Priority |
|---|---|---|---|---|---|---|
| Navigation (keys) | 1 | 0 | n/a | n/a | `deck/DeckNavigation` | done |
| Stage navigator | 14 | 13 | prefix, size | none | `deck/StageNavigator` | **P0** |
| Topbar / controls | 1 | 0 | n/a | n/a | `page.jsx` | ok |
| Background grid | 6 | 5 | grid size | none | `ui.css .deck-grid` | P1 |
| Scene header | ~14 | ~13 | accent | none | `ui.css .ui-header` | P1 |
| Panels / cards | ~40 | many | radius, border | none | `ui.css .ui-panel` | P1 (gradual) |
| Badges / pills / callouts | ~20 | many | colors | none | `ui.css` | P1 |
| Metrics | ~8 | some | size | none | `ui.css .ui-metric` | P2 |
| Nodes / connections | 6 | n/a | concept | concept | scene + `motion.drawPath` | P2 |
| Typography | 13 family strings | 12 | n/a | n/a | tokens | P0 |
| Colors | 186 hex | n/a | n/a | n/a | tokens | P0 |
| Stage animation | 15 identical | 14 | n/a | n/a | `deck/motion.stageEnter` | P0 |
| Slide transition | 0 | n/a | n/a | n/a | `page.jsx` + motion | P0 |

## 18. PRIORITY MATRIX
| # | Item | Priority | Impact | Risk | Files | Approach |
|---|---|---|---|---|---|---|
| 1 | Design tokens | P0 | high | low | `app/tokens.css` | Add a variables layer; don't rewrite scenes at once |
| 2 | Shared StageNavigator | P0 | high (fixes 06/15/16/17 overflow and collisions) | low | `deck/StageNavigator.jsx` + 14 scenes | Replace the `<nav>` markup only |
| 3 | Motion primitives + stageEnter | P0 | high | low | `deck/motion.js` + 15 scenes | Swap identical `fromTo` blocks |
| 4 | Slide transition | P0 | high | medium (lock interplay) | `page.jsx` | GSAP, under 650ms, respects the lock |
| 5 | Reduced motion | P1 | medium | low | `globals.css`, `motion.js` | `matchMedia` gate |
| 6 | Offline fonts | P1 | high at venue | low | `layout.tsx` | `next/font` |
| 7 | Legacy globals and collisions | P1 | medium | medium (02/03 depend on the leaks) | `globals.css` + scenes | Prefix; verify 02/03 visually |
| 8 | Topbar clearance 07–14 | P1 | medium | low | scene headers | Shared header offset token |
| 9 | Design canvas for 04/06/07/16/17 | P1 | high | medium | those scenes | Reuse the Slide 05 pattern |
| 10 | Font floors | P2 | high readability | medium | View files | Through tokens |
| 11 | Dead files / deps | P2 | hygiene | low | §13 | Deletion queue |

## 19. CONSOLIDATION ROADMAP
| Phase | Work |
|---|---|
| A | Tokens and `ui.css` primitives (panel, badge, callout, grid, header) |
| B | `StageNavigator` and migration of all 14 navigators |
| C | `motion.js` (stageEnter, reveal, drawPath, countUp, pulse, scene enter/exit) and stage animations |
| D | Slide transition and reduced motion |
| E | 03→04 continuity bridge, then 07→08 and 08→09 |
| F | Design canvas for the overflowing slides; legacy CSS and collision cleanup |
| G | Per-slide animation polish |
| H | Offline fonts, dead-code deletion, projector QA |

NO CODE WAS MODIFIED.
