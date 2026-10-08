# SLIDE 03 → 04 CONTINUITY REPORT — Step 7
Date: 2026-10-09 · Status: COMPLETE

## BEFORE
- Slide 03's final stage (`collapse`) flung all six modules off-screen in different directions (y up to −480px), then scaled COMPUTE to 1.5.
- Advancing then hard-cut to Slide 04, which opened on an unrelated static package mockup.
- Going ← from Slide 04 restarted Slide 03 at stage 0.

## TRANSITION_SEQUENCE
| Step | Where | What happens | Timing (full motion) |
|---|---|---|---|
| 1 | Slide 03, stage 10 (`collapse`, rewritten) | Message and world labels fade; paths and particles → 0.12; SENSORS, MEMORY, INTERCONNECT, I/O, ACTUATORS and POWER recede **in place** to opacity 0.12 (staggered 0.04s); COMPUTE grows to 1.35× with border `#27D7FF` and glow `0 0 60px` | about 1.0s, `power2/3.inOut` |
| 2 | → pressed (scene-owned exit through `useSceneExit`) | Remaining system and header → 0; COMPUTE zooms 1.35 → **2.6×** with its glow growing to 120px; its label fades | 0.6s, `power2.in` |
| 3 | Hand-off frame | Glowing COMPUTE alone on screen, never a black frame | 0.25s hold |
| 4 | Slide 04, stage 00 (`useDeckEntry().continuity`) | The deck does only a quick cross-fade with no scale. The compute package **arrives at 1.9× and settles to 1×** while its glow fades | 0.9s, `power3.out` |
| 5 | Slide 04 | Mock system blocks fade up to 0.15 (context) | +0.35s |
| 6 | Slide 04 | Eyebrow → title "WHERE DOES THE AI RUN?" | +0.45s |
| 7 | Slide 04 | Subtitle "Zooming from System into Compute" | +0.7s |
| 8 | Slide 04 | Stage navigator | +0.85s |
| 9 | Slide 04 | → Stage 01 uses the shared `stageEnter` as usual | n/a |

Measured live in full-motion mode:
- COMPUTE scale: 1.36 → 1.42 → 1.57 → 1.87 → 2.36 → 2.6 (hold).
- Then the package scale on Slide 04: 1.78 → 1.45 → 1.24 → 1.11 → 1.04 → 1.0.
- The title stays at opacity 0 until about 550ms after arrival, then reaches 1.

## FILES_CHANGED
- `components/MentalModel/SystemScene.jsx`:
  - rewrote the `collapse` segment (recede in place instead of flinging);
  - added the `useSceneExit` zoom bridge;
  - ← from Slide 04 now lands on the final stage, using `seek` on a fresh timeline;
  - StrictMode-safe stage restore through `appliedStage`.
- `components/MentalModel/mental.css`:
  - `vw/vh` → `cqw/cqh` (the frame, not the window);
  - stage height 90 → 84cqh, so POWER + THERMAL ends above the deck controls.
- `components/ComputeEngine/ComputeEngineScene.jsx`:
  - continuity arrival timeline;
  - Stage 00's generic stage fade is skipped when arriving from Slide 03;
  - `transition: none` during the arrival, because the package's CSS `transition: all .6s` was fighting GSAP.
- `app/page.jsx`, `components/deck/DeckNavigation.js`: exit-hook and entry-context plumbing (generic, reusable for 07→08 etc.).

Slide 03 and 04 content, stage counts and keyboard semantics are unchanged.

## GSAP_TIMELINES
- Slide 03: the master stage timeline (existing), plus a one-shot `exitTl` that is killed on unmount.
- Slide 04: an arrival timeline inside `gsap.context`, reverted on unmount.
- No `setInterval`, no rAF loops and no per-frame React state.

## RESPONSIVE_TESTS
| Size | Result |
|---|---|
| 1366×768 | Slide 03 all 11 stages: COMPUTE and POWER inside the frame and clear of the controls (POWER was outside the frame before). Slide 04 all 20 states: 0 outside, 0 scroll, 0 collisions. |
| 1920×1080 | see `DECK_WIDE_VISUAL_ANIMATION_REPORT.md` |

1600×900 and 1920×1200 use the same proportional `cqw/cqh` layout. 1920×1200 is letterboxed to a 1920×1080 frame.

## NAVIGATION_TESTS
| Test | Result |
|---|---|
| Slide 03 final → → | Slide 04 stage 01/11 ✅ |
| Slide 04 stage 0 → ← | Slide 03 **final** stage (COMPUTE 1.35×, others 0.12) ✅ |
| Slide 04 → after arrival | stage 02/11 ✅ |

## RAPID_INPUT_TEST
- **5 and 10 rapid → presses** during the bridge: exactly **one** slide transition, landing on Slide 04 stage 01 ✅. The Step 3 lock is held through the 0.85s custom exit.

## REDUCED_MOTION
With the OS setting on (this machine) or after pressing **M** to switch to reduced:
- the system fades in 0.15s;
- COMPUTE does a subtle 1.45× scale over 0.2s;
- the hand-off is 0.05s, then a direct cross-fade;
- the package arrives with a 1.08 → 1 fade.

The concept (system → compute → engine) is kept, without the big zoom.

## BUILD / TYPESCRIPT / CONSOLE
- `npm run build` ✅
- `npx tsc --noEmit` ✅
- Console: no errors during any test (`window` error listener count 0).

## REMAINING_ISSUES
- The bridge can only be watched at full speed in a visible window. In the hidden test pane, GSAP was driven through the dev-only `window.__gsap` ticker hook.
- 07→08, 08→09 and the other continuity candidates can now reuse the same `useSceneExit` / `useDeckEntry` mechanism. They aren't built yet.
