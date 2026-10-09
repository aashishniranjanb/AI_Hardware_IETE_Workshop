# DECK REGRESSION REPORT
Date: 2026-10-09

## Automated (DOM) — every stage of Slides 02–17
Checks per state:
- text outside the 16:9 frame;
- text under the deck controls;
- text under the topbar;
- ellipsis/nowrap clipping.

| Size | States | Failures | Runtime errors |
|---|---|---|---|
| 1366×768 | 188 | **0** | 0 |
| 1920×1080 | 36 (Slides 02, 03, 04, 06) | **0** | 0 |
| 1600×900 | Slide 02 Explore | **0** | 0 |

**Text under 12px (max per slide, 1366):** these are only the deliberate micro labels.

| Slide | Count | What |
|---|---|---|
| 02 | 30 | engraved text inside the robot's own SVG parts |
| 04 | 24 | the `a·b+c` cell formulas |
| 06 | 16 | NoC router IDs |
| 07 | 72 | 72-GPU node numbers |
| 08 | 73 | sub-unit tags |
| 13 | 64 | LUT cells |
| 11, 14 | 1 each | board silkscreen |

All other slides have 0.

## Manual visual inspection (screenshots, this pass)
| Slide | What was inspected | Result |
|---|---|---|
| 01 | Title, icon journey, chip | OK (from previous pass) |
| 02 | Hero, Explode, selection + drawer, data-flow, 1920 Explode | Repaired: see `SLIDE02_EXPLORE_REPAIR_REPORT.md` |
| 03 | Final COMPUTE-focus state | OK |
| 04 | Settled arrival (centred package, engine preview) | OK |
| 06 | NVLink stage (consistent GPU icons) | OK |
| 15 | Workshop-target stage (title contract, tokens) | OK |
| 07, 08, 09, 12, 13, 16, 17 | Inspected in the Step 8 pass | No layout change since, except the title contract; covered by the DOM sweep |

## Navigation (automated)
| Test | Result |
|---|---|
| 03 → 04 bridge, ×3 | deterministic (identical rectangles) |
| 10 rapid → | exactly one slide change |
| Mixed ←→ | lock holds, clean state |
| ← into Slide 03 | final stage, correct state |
| Stage-dot clicks | every stage of every slide, used by the sweep itself |
| Reduced motion (forced) | bridge simplified, still continuous |
| Slide 02 E/S/R and re-entry | OK, re-entry resets to HERO |

## Build
- `npm run build` ✅
- `npx tsc --noEmit` ✅

## Honest limits
- Animation *smoothness* was not watched in real time. The app's browser pane is hidden, so GSAP was driven by a dev-only ticker hook. Positions and timing were measured, and still frames were screenshotted.
- CSS transitions don't advance in the hidden pane, so some intermediate colours in screenshots are test artifacts (confirmed against inline styles).
- **Recommended:** one live run-through on the presentation laptop and projector, with **M** pressed for full motion.
