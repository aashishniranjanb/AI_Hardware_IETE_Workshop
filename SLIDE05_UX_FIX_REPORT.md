# SLIDE 05 UX FIX REPORT — Step 4: Memory Problem Overhaul
Date: 2026-10-09 · Status: COMPLETE

## BEFORE
These measurements come from the live DOM with the frame at 961×540.
- **Stage navigator:** 12 text pills in one row with `overflow-x: auto`, so there was a horizontal scrollbar on every stage. The last pills were clipped.
- **Vertical overflow (px below the frame):**

  | Stage | Overflow |
  |---|---|
  | 00–01 | 30 |
  | 02 | 180 |
  | 03 Cache | **601** |
  | 04 RAM | **601** |
  | 05 HBM | 422 |
  | 06 Storage | 266 (STORAGE off-screen) |
  | 07 Full pyramid | 201 |
  | 08 Bandwidth | 134 |
  | 09 Game | 133 |
  | 10 Comparison | 9 |

- **Horizontal overflow:** Stage 08 overflowed **316px to the right**, because the compute package and HBM sat side by side.
- **Tiny text:** 30–73 text elements per stage were under 12px. The smallest were 7–9px (worker cells, DRAM layers, ALU labels).
- **Root causes:**
  - All sizes were fixed px or `vw`, with no relation to the 16:9 frame.
  - The four memory tiers were stacked vertically under a full-height compute package.
  - The `DataFlow` SVG had no CSS, so it fell back to the browser default of 300×150.
  - `.callout-pill` was styled only by leakage from `ComputeEngine.css`.

## AFTER
- Zero scrollbars, zero content outside the frame and zero collisions with the deck controls or topbar, on all 12 stages at all 4 tested resolutions.
- Every stage's content ends above a reserved 72px bottom band, so it can't touch the controls.
- Smallest rendered text:

  | Resolution | Smallest text |
  |---|---|
  | 1366×768 | 12.0px |
  | 1600×900 | 14.1px |
  | 1920×1080 | 16.9px |

  Body and metric values are 14–16px at 1366×768.

## FILES_CHANGED
- `components/MemoryProblem/MemoryProblemScene.jsx`
  - Adds a 1366×768 design canvas with uniform fit-to-frame scaling (ResizeObserver plus a window `resize` fallback).
  - Adds the new stepper navigator.
  - Replaces inline flex styles with layout classes.
  - Uses the compact compute variant on Stages 03/04/05/08.
  - Stage 02 is now a two-column split; Stage 08 is stacked instead of side by side.
- `components/MemoryProblem/ComputeUnit.jsx`: new `compact` prop. It renders a one-row strip and skips the starvation overlay; the amber "4% UTILIZATION (STARVED)" badge still shows.
- `components/MemoryProblem/MemoryHierarchy.jsx`
  - Four-column layout with a shared axis "CLOSER • FASTER • SMALLER → FARTHER • SLOWER • LARGER".
  - New `large` prop for the full-pyramid stage.
  - Same data, summaries and metrics.
- `components/MemoryProblem/MemoryProblem.css`
  - Canvas, header and stepper.
  - Scoped `.callout-pill`.
  - `DataFlow` sizing.
  - Compact compute strip.
  - Four-column hierarchy.
  - Px sizes instead of `vw`.
  - Fonts raised to at least 12px.

I didn't change `memoryData.js`, `HBMVisual.jsx`, `DataFlow.jsx` or `WaitingGame.jsx` markup, or any other slide, global CSS, or the navigation engine.

## STAGE_LAYOUT_CHANGES
| Stage | Layout |
|---|---|
| 00 Compute engine | Data lanes (fixed 520×84) above the full compute package, centered |
| 01 Bottleneck | Same composition with the starved state and amber overlay |
| 02 Where is the data? | **Split:** "WHERE IS THE DATA?" card on the left, lane and waiting compute on the right |
| 03 Cache / 04 RAM | Compact compute strip → callout → **4-column hierarchy** with the active tier highlighted |
| 05 HBM3e | Compact compute strip → HBM interposer (layers tightened) |
| 06 Storage | Callout → 4-column hierarchy (STORAGE fully visible, right column) |
| 07 Full pyramid | Large 4-column hierarchy as the only diagram |
| 08 Bandwidth | Equation banner → compact compute strip → HBM (was side by side, off-screen) |
| 09 Waiting game | 1140px board; worker cells are now readable (12px instead of 7–8px) |
| 10 System performance | Cards share one row, with a compact takeaway below. 77–108px spare. |
| 11 Teaser | Unchanged composition, fixed px sizes |

All technical content is preserved: every tier's name, badge, proximity, latency, capacity, bandwidth and summary, all callouts, and the HBM spec.

## NAVIGATOR_CHANGES
- The pill row became a **"MEMORY JOURNEY" stepper**: 12 numbered dots (28px) on a connector line, a `05 / 12` counter, and the current stage label in full.
- It sits in the header top-right, far from the bottom-right deck controls, and never scrolls.
- States: active (cyan glow, amber on "The Bottleneck"), done (dim cyan) and upcoming.
- Accessibility: each dot has a `title` and `aria-label` with the stage name, and the active dot has `aria-current="step"`. Clicks still call `setStageIndex(i)`.

## RESPONSIVE_TESTS
Automated sweep of all 12 stages at each size. Checks:
- elements outside the frame
- content in the reserved control band
- text overlapping `.controls` or `.topbar`
- scrollable containers
- document scroll size

| Window | Frame | Scale | Result | Min text |
|---|---|---|---|---|
| 1366×768 | 1365×768 | 0.999 | 12/12 OK | 12.0px |
| 1600×900 | 1600×900 | 1.171 | 12/12 OK | 14.1px |
| 1920×1080 | 1920×1080 | 1.406 | 12/12 OK | 16.9px |
| 1920×1200 | 1920×1080 (letterboxed) | 1.406 | 12/12 OK | 16.9px |

The tightest stages (03, 04 and 08) keep 7–12px (design px) of clearance above the control band at every size. I also checked Stages 02, 03, 07, 08, 09, 10 and 11 by screenshot.

## OVERFLOW_STATUS
- Zero horizontal and vertical scrollbars, and `document` scroll size equals the window at every size.
- STORAGE and HBM3e are fully visible.
- The Stage 10 takeaway is visible.
- `overflow: hidden` stays on the scene as before, but nothing depends on it now. Every element measures inside the frame.

## READABILITY_STATUS
- Every text node is at least 12px at 1366×768.
- Body, metric values and takeaways are 14–16px; titles are 40px; tier names are 19–22px.
- Dimmed tiers go from `opacity .3` to `.45` plus desaturation, so they stay legible on a projector.

## NAVIGATION_STATUS
No changes to the Step 3 engine.

| Test | Result |
|---|---|
| →/Space alternating | 1→12, then Slide 06 ✅ |
| ←/PageUp alternating | 12→1 ✅ |
| Stepper dot 7, then → | stage 8 ✅ |
| PageDown | +1 ✅ |
| Done/active dot states | track correctly ✅ |
| Console errors | none |

GSAP still animates `.mp-main-viewport > *` on each stage change, unchanged.

## BUILD_STATUS
`npm run build` ✅ compiled successfully.

## TYPESCRIPT_STATUS
`npx tsc --noEmit` ✅ no errors.

## REMAINING_ISSUES
- In the desktop app's hidden browser pane, emulated viewport changes don't trigger ResizeObserver or `resize` events, so I triggered one `resize` by hand during testing. Real browsers and projectors fire these normally, and the scale is also computed on mount.
- Stage 07 still opens with CACHE pre-selected (`selectedTier` defaults to `'cache'`), so the other tiers start dimmed. This was existing behavior; consider opening with none selected.
- Global issues carried forward: the Step 2 control reservation is missing in this working copy (unrelated to Slide 05, since Slide 05 now reserves its own band). Previous-slide entry at the final stage is still deferred.
- The design-canvas pattern could be reused by the shared stage navigator in Step 6.

## NEXT_STEP
"STEP 5 — SLIDE 03 → 04 CONTINUITY BRIDGE"
