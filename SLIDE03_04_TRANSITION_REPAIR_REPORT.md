# SLIDE 03 → 04 TRANSITION REPAIR REPORT
Date: 2026-10-09 · Status: REPAIRED

## How it was traced
The transition was sampled every ~90ms through the live DOM: COMPUTE's on-screen rectangle on Slide 03, the package's rectangle on Slide 04, the `.slide-stage` opacity and the title opacity. Repeat runs, rapid input and reduced motion were also sampled. The hidden browser pane doesn't paint frames, so GSAP was driven by the dev-only ticker hook, and still frames were captured by screenshot.

## Root causes found
| # | Defect | Evidence | Cause |
|---|---|---|---|
| 1 | **Position/scale jump** at the hand-off | COMPUTE ended at centre (928, 289), 728px wide; the package appeared at (997, 453), **1160px** wide | The two sides were tuned independently: Slide 03 zoomed to 2.6×, and Slide 04 started from a hard-coded 1.9× around its *own* centre. They never shared coordinates. |
| 2 | **Dark dip** between the scenes | `.slide-stage` opacity 0.93 at the swap, faded in from 0 | `app/page.jsx` still ran the deck fade (`opacity 0 → 1`) on the continuity path. |
| 3 | **FLIP measured as zero** under StrictMode | Debug: first effect run computed x −68, y −164; the second run computed ≈ 0 | React StrictMode re-runs the arrival effect. After `ctx.revert()` the second run measured the package still at the hand-off position. |
| 4 | **Laggy, doubled fades** on Slide 03 (and the 03 exit) | Modules carried CSS `transition: opacity .3s` while GSAP tweened opacity every frame | CSS transitions and GSAP fought over the same property; the same applied to `.mock-block` on Slide 04. |
| 5 | **Arrival package pushed to the right edge** | Package centre x = 997 in a 1366 frame, almost touching the edge | `.ce-mental-model-mockup` is a flex row, so the package was laid out *beside* the mock system instead of on its COMPUTE position. |
| 6 | **Empty arrival cavity** (audit P0-08) | Screenshot | Stage 00 showed only "CENTRAL COMPUTE ENGINE". |
| 7 | Hover dimming never worked on Slide 03 | CSS `.mm-system-canvas.has-hover`, but the class is set on the `<section>` | Wrong selector. |

## Fixes
- **`components/deck/handoff.js` (new):** a measured hand-off.
  - `setHandoff(key, el)` records the focal element's frame-relative rectangle.
  - `takeHandoff(key)` is non-destructive (StrictMode-safe) and expires after 3s.
  - `flipFrom(el, rect)` returns the x/y/scale that places an element over that rectangle.
- **Slide 03 exit** (`SystemScene.jsx`):
  - the other modules, paths and header fade out;
  - COMPUTE zooms 1.35 → 2.6× with a growing glow;
  - `.call(setHandoff('compute', #mod-compute))`;
  - a 0.2s hold, then `done()`.
  - It stays a single GSAP timeline owned by the scene, and the deck waits for `done()` (exit handshake, with the 1.4s fallback only for background tabs).
- **Slide 04 arrival** (`ComputeEngineScene.jsx`):
  - the package is FLIP-animated **from COMPUTE's exact rectangle** to its natural layout (0.85s, `power3.inOut`);
  - the FLIP is measured once per mount and cached in a ref (StrictMode-safe);
  - then the engine tiles, faint system context, eyebrow/title, subtitle and stage navigator enter in sequence;
  - `useLayoutEffect` sets the initial state before first paint;
  - `transition: none` is held during the tween so CSS can't fight GSAP.
- **Deck** (`app/page.jsx`): on the continuity path the deck adds **no** fade or scale. The bridge owns the visuals.
- **CSS ownership:** removed the opacity transitions on `.mm-module`, `.mm-path` and `.mm-arrow` (GSAP owns opacity). Hover dimming moved to `filter`, with the selector fixed to `.mental-model-scene.has-hover`.
- **Arrival layout:**
  - the package is wrapped in `.ce-entry-package`, an absolutely centred overlay (GSAP animates the inner element, so `clearProps` can't strip the centring);
  - the cavity now previews the five engines it introduces (CPU, GPU, NPU, TPU, FPGA tiles with Lucide icons and a one-line trait), staggered in after the package settles.

## Files changed
- `components/deck/handoff.js` (new)
- `components/MentalModel/SystemScene.jsx`, `components/MentalModel/mental.css`
- `components/ComputeEngine/ComputeEngineScene.jsx`, `components/ComputeEngine/ComputeObject.jsx`, `components/ComputeEngine/ComputeEngine.css`
- `app/page.jsx`

## Tests (actual results)
Sampled positions are frame-relative centre (x, y) and width.

| Test | Result |
|---|---|
| Hand-off continuity | COMPUTE end **(928, 289, 728)** → package start **(928, 289, 728)**: exact match. Package glides to (683, 452, 880), the frame centre. |
| Stage opacity through the swap | 1.00 every sample (no dark frame) |
| Title timing | opacity 0 until the package settles, then 0.1 → 0.7 → 1.0 |
| 3 repeated runs | identical start/end rectangles each run (deterministic) |
| 10 rapid → during the bridge | exactly one slide change, landing on Slide 04 stage 01/11 |
| Mixed ←→ ×6 | lock swallows the extra presses; ends on Slide 03 in a clean state |
| Reverse (04 stage 0 → ←) | Slide 03 final stage: COMPUTE 1.35×, MEMORY/POWER 0.12 (inline values confirmed) |
| Reduced motion | short fade-scale (package 767 → 737 width, opacity 0 → 1 in about 0.3s), no big zoom; concept preserved |
| Reload and repeat | same results |
| Screenshots | Slide 03 final state (COMPUTE focus, system receded); Slide 04 settled arrival (centred package, engine preview, title and navigator) |

## Not verifiable here
Real-time smoothness (frame pacing) could not be watched live, because the app's browser pane was hidden and GSAP was driven by a manual ticker. The geometry and timing above are measured, not estimated. **Please watch the bridge once on the presentation laptop** (press **M** for full motion if Windows "animation effects" are off).
