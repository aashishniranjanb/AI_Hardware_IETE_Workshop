# NAVIGATION ARCHITECTURE REPORT — Step 3: Unified Navigation Engine
Date: 2026-10-09 · Status: COMPLETE

## BEFORE
- **17 window `keydown` listeners**: 1 in `app/page.jsx` (bubble phase) + 16 scene listeners. Fifteen of the scene listeners used `{ capture: true }` and `stopPropagation()`; `ChittiScene` used the bubble phase.
- Scene listeners consumed →/←/Space when they weren't at a stage boundary. Otherwise the event "fell through" to the page listener, so propagation order decided ownership.
- **Conflicts found:**
  1. **Stale-closure overshoot.** Scene handlers checked a captured `stageIndex` and then called `setStageIndex(prev => prev + 1)`. Two presses before a re-render could push the stage past the last one (undefined stage).
  2. **Rapid-press slide skipping.** Presses that arrived before the new slide had mounted all advanced the slide index (test: 25 fast presses on Slide 01 jumped to Slide 17).
  3. **Shortcuts fired with modifiers.** Ctrl/⌘ shortcuts were hijacked: Ctrl+R triggered Chitti's R shortcut, and Ctrl+F triggered the deck's fullscreen.
  4. **`R` handled in two places.** It was a global no-op (`setIndex(i => i)`) and a Chitti shortcut at the same time.
  5. **No Space handling at slide boundaries.** On stage-less slides (01, 02), Space fell through and relied on the global listener.

## AFTER
- **1 window `keydown` listener**, in `components/deck/DeckNavigation.js` → `useDeckNavigation()`, used by `app/page.jsx`.
- **Slide ownership:** `app/page.jsx` (`index` state). Each scene is keyed by its slide id, so it remounts on every slide change.
- **Stage ownership:** each scene keeps its own existing stage state. It registers a controller through `useStageNavigation({ stage, setStage, count, next?, prev?, keys? })` using React context (`DeckNavContext`). There are no scene-level listeners and no `stopPropagation`.
- **Dispatch order:** the dispatcher asks the active scene's controller first. If the controller returns `false` (at a boundary or stage-less), it falls back to slide navigation.
- The engine never touches the DOM or GSAP. It only changes state, and scenes still animate their own stages.

## KEY_BEHAVIOR
| Key | Behavior |
|---|---|
| ArrowRight / Space / PageDown | Next stage. At the final stage, next slide, which starts at stage 0. Always `preventDefault` (no scrolling). |
| ArrowLeft / PageUp | Previous stage. At stage 0, previous slide. Always `preventDefault`. |
| B | Toggles blackout and never advances. Clicking the overlay also exits blackout. |
| F | Toggles fullscreen: enters it, or exits if already fullscreen. The ⤢ button uses the same toggle. Esc is left to the browser. |
| E / S / R | Chitti shortcuts (Slide 02 only), routed through the scene's `keys` map. |
| Any key + Ctrl/⌘/Alt | Ignored by the deck, so browser shortcuts work. |
| Typing in input/textarea/select/contenteditable | Ignored. |
| Auto-repeat | Allowed for arrows. Ignored for B, F and scene shortcuts. |

PageUp/PageDown were added so presentation clickers work. Escape was not touched (browser fullscreen behavior is preserved).

## STAGE_BOUNDARY_BEHAVIOR
- `goTo()` clamps to `[0, count-1]` in one place, `useStageNavigation`. It reads a synchronous `stageRef`, so rapid presses can't read stale state or overshoot.
- Slide 04's choice stage uses custom `next`/`prev`: reveal answer → next scenario → … → leave the stage. Backwards: hide the answer → previous scenario (shown revealed). This keeps the original behavior exactly.

## SLIDE_BOUNDARY_BEHAVIOR
- ← on Slide 01 does nothing. → at the final stage of Slide 17 does nothing.
- **Previous-slide entry stays at stage 0.** That was the existing deck behavior (every scene started with `useState(0)`), and I preserved it as instructed. Landing on the final stage instead is a one-line option for later (see below).
- **Transition lock:** a slide change sets a lock that's released in a parent effect once the new scene has committed and registered. Presses during that window are swallowed instead of skipping slides. There are no timers.

## BREADCRUMB_BEHAVIOR
Unchanged: each breadcrumb still calls `setStageIndex(i)` directly. The hook syncs `stageRef` from state after each render, so keyboard navigation continues from the clicked stage. I verified this on Slide 16: clicking stage 11, then → went to stage 12.

## FILES_CHANGED
- `components/deck/DeckNavigation.js` (new): `DeckNavContext`, `useStageNavigation`, `useDeckNavigation`
- `app/page.jsx`: uses `useDeckNavigation`, wraps scenes in the provider, adds a `key` per scene and the fullscreen toggle. Removed the old listener and the no-op `R`.
- The scene's `keydown` `useEffect` was replaced by a single `useStageNavigation(...)` call in each of these:
  - `AIAccelerator`, `AIChip`, `Blackwell`, `DataHighway`, `FirstFPGAProgram`, `FPGABuild`, `FPGASetup`
  - `HardwarePlatforms`, `LogicComputation`, `MemoryProblem`, `MentalModel/SystemScene`, `ModelComparison`, `RTLBuild`, `TransistorLogic`
- `ComputeEngine/ComputeEngineScene.jsx`: same replacement, plus custom `next`/`prev` for the quiz.
- `Chitti/ChittiScene.jsx`: listener replaced with `useStageNavigation({ keys: { e, s, r } })`. **No markup, CSS, or visual stage changes.**

## FILES_NOT_CHANGED
All CSS files, all `*Views.jsx` and data files, breadcrumb markup, global controls styling, `compute.css`, Slide 02/03/04/05 visuals.

## REGRESSION_TESTS
These ran in the live dev server using synthetic `keydown` events.

| Test | Result |
|---|---|
| → through the whole deck, counting presses per slide | 01:1, 02:1, 03:11 (0→10), 04:20 (stages + quiz steps), 05:12 (0→11), 06:13, 07:8, 08:10 (0→9), 09:10, 10:11, 11:12, 12:13, 13:15 (0→14), 14:13, 15:14 (0→13), 16:19 (0→18), 17:15 (0→14), then stays ✅ |
| ← from end of Slide 17 to Slide 01 | 15 steps back on 17, then 1 per slide (entry at stage 0), stops at 01 ✅ |
| `preventDefault` on every arrow/space | true for all ✅ (no scroll or browser back) |
| 25 rapid → (no yielding) on Slide 16 | went through stages to the end, then exactly one slide forward ✅ |
| 30 rapid ← | exactly one slide back, no skipping ✅ |
| → ← → rapid | net +1 stage ✅ |
| Space, → rapid | +2 stages ✅ |
| 10 rapid → on Slide 01 | lands on 02, no skipping ✅ |
| ← on Slide 01 | stays on 01 ✅ |
| B | blackout on/off, stage unchanged ✅ |
| Ctrl+→ | ignored ✅ |
| Breadcrumb click then → | continues from the clicked stage ✅ |
| PageDown / PageUp | ±1 stage ✅ |
| Chitti E / S / R | EXPLODED ↔ HERO, SCAN, HERO; slide unchanged; → then advances to 03 ✅ |

The F (fullscreen) toggle is verified in code only. Browsers block fullscreen from synthetic events, so it needs a manual key press.

## BUILD_STATUS
`npm run build` ✅ compiled successfully, static route `/`.

## TYPESCRIPT_STATUS
`npx tsc --noEmit` ✅ no errors.

## LISTENER COUNT
`grep "addEventListener('keydown'"` → **1** (`components/deck/DeckNavigation.js`).

## REMAINING_ISSUES
- Previous-slide entry at the final stage is not enabled, to preserve existing behavior. To enable it, pass an `entry` hint to the scene and initialize `useState(count-1)`.
- Unused `useEffect` imports may remain in a few scenes (harmless).
- The Step 2 `padding-right: 196px !important` rule was not found in this working copy (`grep 196px` returns nothing). Control-vs-breadcrumb overlap on Slides 13–17 needs rechecking in Step 6.

## NEXT_STEP
"STEP 4 — SLIDE 05 MEMORY PROBLEM LAYOUT OVERHAUL"
