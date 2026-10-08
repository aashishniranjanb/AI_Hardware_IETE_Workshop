# DECK-WIDE VISUAL & ANIMATION REPORT — Step 6 (with combined QA for 5B and 7)
Date: 2026-10-09 · Status: COMPLETE (with the remaining items listed honestly below)

## FILES_CHANGED
- **All 15 staged scenes** (`components/*/*Scene.jsx`, every scene except Chitti and MentalModel): the per-scene navigator markup was replaced by the shared `<StageNavigator>`, and the identical `gsap.fromTo('.x-main-viewport > *')` blocks were replaced by the shared `stageEnter('.x-main-viewport')`.
- **All scene CSS** (`components/*/*.css`): `vw`/`vh` → `cqw`/`cqh`. `.scene` is now a size container, so scene units measure the 16:9 frame rather than the browser window. This was the root cause of most overflow.
- `components/Blackwell/BlackwellScene.css`: the NVL72 rack was recomposed into 2-column compute trays and 3-column switch trays, so it fits the frame (it was about 970px tall in a 768px frame).
- `components/MentalModel/*`, `components/ComputeEngine/ComputeEngineScene.jsx`: the 03→04 bridge (see `SLIDE03_04_CONTINUITY_REPORT.md`).
- `app/ui.css`: shared header contract `[class*="-top-header"]` clears the deck topbar (fixes the topbar collisions on Slides 07–14).
- `app/page.jsx`, `components/deck/*`: slide transition and motion mode (see `DESIGN_ANIMATION_SYSTEM_REPORT.md`).

## SHARED_COMPONENTS_USED
| Shared piece | Used by |
|---|---|
| `StageNavigator` | 14 slides: 04 (stacked), 05 (stacked), 06 (stacked), 07–17 (inline bottom bars) |
| `stageEnter` | 15 scenes |
| Tokens, `ui.css`, the slide transition, motion mode | deck-wide |

## SLIDES_MIGRATED
| Slide | Navigator | Stage motion | Other |
|---|---|---|---|
| 01 Title | n/a | existing GSAP intro (kept) | n/a |
| 02 Chitti | n/a (deferred) | existing | units → frame (visually identical in fullscreen) |
| 03 Mental model | none (unchanged) | existing timeline; final stage rewritten | continuity bridge, units fixed |
| 04 Compute | shared (stacked) | `stageEnter` | continuity arrival |
| 05 Memory | shared (stacked) | `stageEnter` | n/a |
| 06 Data highway | shared (stacked); **was 8 clipped pills plus a scrollbar** | `stageEnter` (with path draw) | n/a |
| 07 Blackwell | shared | `stageEnter` | rack recomposed |
| 08–14 | shared | `stageEnter` | topbar clearance |
| 15 / 16 / 17 | shared; **were scrolling 14–19-pill tracks under the controls** | `stageEnter` | n/a |

## ANIMATION_CHANGES
- **Stage changes** on every staged slide now follow one sequence: the primary diagram scales in, its children stagger in, and stroked SVG connections draw. Previously the whole view faded in at once.
- **Restrained by design:** no new infinite loops and no decorative particles.
- **Kept untouched:** existing scene-specific timelines (01 title, 02 exploded view, 03 system build).

## TRANSITION_CHANGES
| | Behaviour |
|---|---|
| Before | Hard cut. |
| After | Exit (0.22s fade + scale 0.985) → enter (0.42s fade + scale 1.015 → 1) + cyan scan line, about 650ms in total. |

Locked with the Step 3 engine. A timer fallback keeps the deck from stalling in background tabs.

## CONTINUITY_CHANGES
| Pair | Status |
|---|---|
| **03 → 04** | Done: COMPUTE focus → zoom → arrival inside the package, plus ← returns to the 03 final stage. |
| 07→08, 08→09, 10→11, 11→12, 12→13, 15→16, 16→17 | **Not yet built.** The mechanism (`useSceneExit` / `useDeckEntry`) is in place and reusable. |

## RESPONSIVE_TESTS
An automated sweep of **every stage of every slide**. Each state checks for:
- text outside the frame;
- internal scrollbars;
- text under the deck controls;
- text under the topbar;
- document scroll.

| Size | Coverage | Out of frame | Scrollbars | Under controls | Under topbar |
|---|---|---|---|---|---|
| 1366×768 | all 17 slides (03, 06, 07, 15–17 re-run after fixes) | **0** | **0** | **0** | **0** |
| 1600×900 | Slides 05, 07, 16 (densest) | 0 | 0 | 0 | 0 |
| 1920×1080 | all 17 slides, every stage | **0** | **0** | **0** | **0** |
| 1920×1200 | letterboxed to a 1920×1080 frame (same layout) | 0 | 0 | 0 | 0 |

**Before (1366×768, audit):**
- text outside the frame on Slides 02, 04, 06, 07, 15, 16, 17;
- scrollbars on 06, 15, 16, 17;
- text under the controls on 15, 16, 17;
- text under the topbar on 07–14.

## PERFORMANCE_CHECK
- Every GSAP use sits inside a `gsap.context` that reverts on unmount.
- The bridge exit timeline is killed on unmount.
- Stale slide-exit tweens are killed at the swap.
- No `setInterval` or rAF loops were added to the app. The `window.__gsap` hook is dev-only, for QA.
- No per-frame React state updates.
- Exactly one window `keydown` listener (`components/deck/DeckNavigation.js`).
- 0 runtime errors across every sweep after the import fix.

## REDUCED_MOTION
- **OS setting:** respected. CSS animations and transitions collapse, the scan line is hidden, and the GSAP helpers use short fades.
- **Presenter override:** **M** toggles full ↔ reduced and is remembered per browser.
- **Your laptop:** the machine this was built on reports reduced motion, so **press M once** to see the full animation set.

## KEYS (final)
| Key | Action |
|---|---|
| → / Space / PageDown | next stage → next slide |
| ← / PageUp | previous |
| B | blackout |
| F | fullscreen toggle |
| M | motion mode |
| E / S / R | Chitti shortcuts (Slide 02) |

Verified: rapid presses produce one slide per transition, both deck ends are safe, and stage clicks work.

## REMAINING_DUPLICATION
- Old per-scene navigator and grid CSS is still present but unreferenced (`CONSOLIDATION_DELETION_QUEUE.md`).
- Panels and badges haven't been migrated to `ui-*` yet (gradual).
- Scene CSS still uses hex literals instead of tokens.

## REMAINING_VISUAL_BUGS / NOT DONE
- **Small text (under 12px) is still widespread**, mostly from inline `fontSize` values in the View files. Maximum per slide at 1366: Slide 02 61, 04 57, 07 82, 08 101, 09 65, 13 80. This needs a per-view typography pass.
- **Slide-specific concept animations** from the Step 6 brief aren't implemented: carry-propagation highlights (10), switch-matrix configuration (09), particles following NoC/NVLink/PCIe paths (06), the LED payoff (15), count-ups, and similar. The shared vocabulary for them exists (`drawPath`, `pulse`, `countUp`, `assemble`, `zoomInto`, `completionBurst`). Only the generic stage motion and SVG path drawing were applied deck-wide.
- Slide 02 is deferred, as agreed.
- The full-motion bridge timing was verified by driving the GSAP ticker in a hidden test pane. It should be eyeballed once on the projector.

## BUILD_STATUS
`npm run build` ✅

## TYPESCRIPT_STATUS
`npx tsc --noEmit` ✅
