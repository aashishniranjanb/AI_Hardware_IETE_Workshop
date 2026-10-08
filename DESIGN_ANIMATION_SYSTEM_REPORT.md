# DESIGN + ANIMATION SYSTEM REPORT — Step 5B
Date: 2026-10-09 · Status: COMPLETE

## DESIGN_TOKENS — `app/tokens.css`
One `:root` layer, with every value extracted from existing usage (audit §5):

| Group | Tokens |
|---|---|
| Surfaces | `--c-bg`, `--c-bg-deep`, `--c-panel`, `--c-panel-2`, `--c-border`, `--c-border-strong` |
| Accents | `--c-cyan`, `--c-sky`, `--c-blue`, `--c-green`, `--c-amber`, `--c-amber-soft`, `--c-purple` |
| Text | `--c-text`, `--c-muted`, `--c-dim` |
| Glow | `--glow-cyan`, `--glow-blue`, `--glow-amber`, `--glow-green` |
| Typography | `--font-display`, `--font-body`, `--font-mono`; scale `--fs-display` 40 · `--fs-heading` 22 · `--fs-section` 18 · `--fs-body` 15 · `--fs-label` 13 · `--fs-micro` 12; `--ls-label` |
| Spacing | `--s-xs` 4 · `--s-sm` 8 · `--s-md` 12 · `--s-lg` 20 · `--s-xl` 32 |
| Radii | `--r-sm` 6 · `--r-md` 10 · `--r-lg` 14 · `--r-pill` |
| Motion | `--t-fast` .18s · `--t-base` .3s · `--ease-out` |
| Z-index | scene 1 · scene-ui 10 · topbar 25 · controls 40 · transition 60 · blackout 100 |

The visual identity is unchanged. The tokens codify the existing palette.

## SHARED_COMPONENTS — `app/ui.css`, `components/deck/*`
**`app/ui.css`** (small, composable `ui-*` primitives built on the tokens):

| Primitive | Classes |
|---|---|
| Ambient grid | `.deck-grid` |
| Panel | `.ui-panel` + `accent-cyan/blue/amber/green`, `is-compact`, `is-elevated`, `is-active` |
| Badge | `.ui-badge` |
| Callout | `.ui-callout` |
| Metric | `.ui-metric`, `.ui-metric-label`, `.ui-metric-value` |
| Stage navigator | `.stage-nav*` |
| Slide transition | `.slide-stage`, `.slide-scan` |
| Header contract | `[class*="-top-header"]` clears the deck topbar |
| Motion toast | `.motion-toast` |

**Not built, on purpose:**
- **`SceneShell`:** the audit showed header markup is similar, but the layouts genuinely differ. A shell would have been a 30-prop god component. The shared header contract plus tokens give consistency without one.
- **`TechNode` / `MetricCard` React components:** the CSS primitives cover the duplicated styling. Scene content stays in the scenes.

## SHARED_ANIMATION_PRIMITIVES — `components/deck/motion.js` (GSAP only)
None of these own React state. They animate the elements a scene passes in, and return tweens or timelines for the scene's `gsap.context` to revert.

| Function | Purpose |
|---|---|
| `fadeUp`, `scaleIn`, `staggerReveal` (`reveal`) | default enter, primary-diagram enter, group reveal |
| `stageEnter(root)` | **stage transition contract:** primary diagram scales in → children stagger → SVG connections draw (stroked paths only; dashed/filled paths are left alone; props cleared afterwards) |
| `stageExit` | short exit |
| `drawPath`, `pulse` / `nodeActivate`, `countUp`, `assemble`, `collapse`, `zoomInto`, `completionBurst` | vocabulary for data flow, activation, numbers, construction, focus and payoff |
| `sceneExit`, `sceneEnter` | deck-level slide transition |
| `prefersReducedMotion`, `applyMotionMode`, `restoreMotionMode`, `toggleMotionMode` | motion mode |

**Motion language:**
- Enter: opacity 0→1, y 12→0, 0.45s, `power3.out`.
- Primary diagram: scale 0.96→1, 0.5–0.7s.
- Stagger: 0.04–0.06s.
- Connections draw over 0.7s after their nodes appear.
- No infinite loops were added.

## STAGE_NAVIGATOR — `components/deck/StageNavigator.jsx`
`<StageNavigator stages currentStage onStageChange variant title ariaLabel amberIds />`:
- Numbered dots on a connector line, a `05 / 12` counter, and the current stage label. The "01 " prefixes in breadcrumb labels are stripped, since the dot shows the number.
- `inline` variant (bottom bars) and `stacked` variant (boxed, header).
- Compact dots (22px) are used automatically above 14 stages.
- States: active, done, upcoming, plus an amber accent per stage.
- Accessibility: `aria-label` per dot, `aria-current="step"`, `:focus-visible` ring.
- It never scrolls and never wraps. Clicks only call `onStageChange`; the keyboard is still owned by the Step 3 engine.

## SCENE_TRANSITION — `app/page.jsx`
Sequence: exit (opacity → 0, scale 0.985, 0.22s) → swap → enter (opacity 0 → 1, scale 1.015 → 1, 0.42s) + cyan scan line (0.5s). Total about 650ms.

- **Navigation lock:** the Step 3 transition lock stays held until the new index commits, so rapid presses can't skip slides.
- **Scene-owned exits:** scenes can register their own exit with `useSceneExit(handler)`, which is how the Slide 03 → 04 bridge works. Scenes read how they were entered with `useDeckEntry()`.
- **Robustness:** the swap is called exactly once, with a timer fallback (450ms default, 1400ms custom). GSAP runs on `requestAnimationFrame`, which pauses in background tabs, and without the fallback the deck would stall there. A late exit tween is killed so it can't fade the new slide.

## REDUCED_MOTION
- **OS setting:** `prefers-reduced-motion: reduce` is respected. CSS animations and transitions collapse to near zero, the scan line is hidden, and the GSAP helpers swap transforms for short fades.
- **Presenter override:** **M** toggles full ↔ reduced, shows a toast, and is saved in `localStorage` as `deck-motion`. CSS follows it through `:root[data-motion]`.
- **Why the override exists:** the machine this was built on reports reduced motion, so without it the presenter would never see the full animations.

## SLIDE_05_MIGRATION
- **Navigator:** the custom `mp-stepper` was replaced by `<StageNavigator variant="stacked" title="MEMORY JOURNEY" amberIds={['waiting']} />`.
- **Stage animation:** the generic `fromTo` was replaced by `stageEnter('.mp-main-viewport')`. Tiers, workers and cards now stagger in, and SVG data lanes draw.
- **Fonts:** the scene now uses the `@fontsource` packages.
- **Information architecture:** unchanged.

## FILES_CHANGED
New:
- `app/tokens.css`, `app/ui.css`
- `components/deck/motion.js`, `components/deck/StageNavigator.jsx`
- `.gitignore`, `CONSOLIDATION_DELETION_QUEUE.md`

Modified:
- `app/layout.tsx`: imports the font packages, tokens and ui.css, and adds a viewport theme color.
- `app/globals.css`: Google Fonts `@import` removed; `.scene` is now a size container.
- `app/page.jsx`: slide transition, continuity flag, M key and motion toast, dev-only `window.__gsap` QA hook.
- `components/deck/DeckNavigation.js`: `useSceneExit`, `useDeckEntry`, M key.
- `package.json`: `@fontsource/inter`, `@fontsource/space-grotesk`.

## FILES_NOT_CHANGED
Navigation semantics (Step 3) and the 16:9 viewport (Step 1).

## DELETION_QUEUE
See `CONSOLIDATION_DELETION_QUEUE.md`. **Nothing was deleted.**

## TEST_RESULTS / BUILD / TYPESCRIPT
See `DECK_WIDE_VISUAL_ANIMATION_REPORT.md`, which covers the combined QA of Steps 5B, 6 and 7.

## REMAINING_DUPLICATION
- Old per-scene step-button and grid CSS is still present but no longer referenced (queued for deletion).
- About 40 panel class families haven't been migrated to `.ui-panel` yet (gradual).
- 186 hex literals remain in scene CSS; tokens exist but scenes haven't been rewritten to use them.
