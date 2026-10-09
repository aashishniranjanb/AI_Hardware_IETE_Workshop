# SLIDE 02 — EXPLORE VIEW REPAIR REPORT
Date: 2026-10-09 · Status: REPAIRED (checked by screenshot at 1366×768 and 1920×1080; 1600×900 by DOM checks only)

## Reproduced defect (before)
At 1366×768, pressing **E** (Explode) or using the primary button showed:
- all nine callout cards stacked on top of the robot and each other in the centre-right of the frame;
- giant blue ellipses on top of the robot;
- dashed leader lines criss-crossing the parts and pointing at the wrong places.

In the hero state:
- the "EXPLORE SUBSYSTEMS" dock covered the keyboard-hint row and ran into the deck controls;
- emoji / Unicode glyphs were used as button icons (⚡ ▦ ↺ ➔ 💡 ✕).

## Root causes (verified in code and DOM)
| # | Cause | Where |
|---|---|---|
| 1 | Callout cards were `position:absolute` with `%` offsets (`.pos-vision { top:6%; right:18% }`, …) inside the fixed **580×760** robot viewport ("Specific Callout Positions around 1920x1080 stage"). At 1366×768 the 760px box doesn't fit, so every card lands on the robot. | `chitti.css` `.pos-*`, `ChittiCallouts.jsx` |
| 2 | Leader dots used CSS `r: 4` inside an SVG with `viewBox="0 0 100 100" preserveAspectRatio="none"`. The radius is in viewBox units and stretched non-uniformly, giving huge ellipses. | `ChittiCallouts.jsx`, `.leader-node-dot` |
| 3 | Leader-line targets were hard-coded percentages (`getCalloutCardCenter`), unrelated to where the exploded 3D parts actually are. | `ChittiCallouts.jsx` |
| 4 | Scene padding was inline `7vh 5vw`, which measures the window, not the 16:9 frame. | `ChittiScene.jsx` |
| 5 | The legacy global rule `.chitti-scene { display:flex; gap:6vw }` (old Vite-era layout) still applied. | `app/globals.css` |
| 6 | The subsystem dock was absolutely centred on the whole workbench, so it sat over the command column and the deck controls. | `chitti.css .subsystem-dock` |

## Fixes
- **Stage recomposed as a grid** (`.chitti-stage`): `left cards | robot | right cards` over a `footer` row.
  - Left column: COMMUNICATION, THERMAL, POWER, SENSORS.
  - Right column: VISION, AUDIO, AI COMPUTE, MEMORY, ACTUATION.
  - **Content unchanged:** every card still shows the name, subtitle and spec; the role and Q&A text appear in the detail drawer.
- **Robot fit-scaled** (`.chitti-robot-fit` / `.chitti-robot-scaler`): the native 580×760 assembly is scaled uniformly to the centre cell with ResizeObserver plus a window `resize` fallback. The 3D explode transforms are unchanged; `perspective` moved to the fit cell and the scaler keeps `preserve-3d`.
- **New `ChittiLeaderLines.jsx`:**
  - draws solid cubic paths in the stage's **own pixel space**, from each card's inner edge to the live centre of its part (`partClass` from `subsystemsData.js`);
  - re-measures at 120/450/900ms (after the 0.8s CSS explode transition), on ResizeObserver, and on window resize;
  - the selected subsystem's line becomes thicker and cyan, and the others dim.
- **Footer row** with the dock (pills wrap onto two rows) and the detail drawer:
  - the footer keeps 150px clear on the right for the deck controls;
  - the drawer sits **between** the two card columns, stacked layout, close button in the corner, and never overlaps a card (measured: 0 overlaps, 0 spill).
- **Command column** fits the frame: 38px two-line title, tighter spacing. The keyboard-hint row was removed because it repeated the `[S] [E] [R]` already printed on the buttons.
- **Icons:** one Lucide icon per subsystem through `subsystemIcons.jsx`, used on the cards, dock pills and drawer:

  | Subsystem | Icon |
  |---|---|
  | Vision | Eye |
  | Audio | Mic |
  | AI compute | Cpu |
  | Memory | MemoryStick |
  | Communication | Radio |
  | Thermal | Thermometer |
  | Power | BatteryCharging |
  | Actuation | Cog |
  | Sensors | Activity |

  Buttons use ScanLine, Boxes, RotateCcw, ArrowRight and Play instead of ⚡ ▦ ↺ → ➔; the drawer uses Lightbulb and X instead of 💡 and ✕.
- **States:**
  - cards and pills are real `<button>`s with `aria-pressed`;
  - `:hover` and `:focus-visible` rings on cards, pills and buttons;
  - the primary button is visibly disabled during the scan.
- **Units and leaks:** padding moved to `cqh/cqw`; `.scene.chitti-scene { display:block; gap:0 }` neutralises the legacy global rule.
- **Type floor** applied to Chitti (9–11px → 12px).

## Files changed
`components/Chitti/ChittiScene.jsx`, `ChittiExplodedView.jsx`, `ChittiCallouts.jsx` (rewritten as columns), `SubsystemStrip.jsx`, `chitti.css`, `ChittiParts.jsx` and `ChittiDataFlow.jsx` (type floor / inline icon); **new** `ChittiLeaderLines.jsx`, `subsystemIcons.jsx`.

## Tests (actual results)
| Test | Method | Result |
|---|---|---|
| Hero at 1366×768 | screenshot | left column complete, dock clear of the hook text and controls |
| Explode at 1366×768 | screenshot + DOM | 2 columns, 9 solid leader lines attached to parts, 0 text outside the frame |
| Select AI COMPUTE card | DOM + screenshot | part isolated and lit, its line active, drawer open, 0 drawer/card overlaps |
| Data-flow mode | screenshot | packet overlay plus drawer, no overlap |
| Leave → return to Slide 02 | DOM | resets to HERO, no callouts, no drawer (no stale state) |
| Explode at 1920×1080 | screenshot + DOM | 0 outside the frame, lines attached |
| Explode at 1600×900 | DOM | 0 outside the frame, 0 under controls, 9 lines |
| E / S / R keys | DOM | EXPLODED ↔ HERO, SCAN → EXPLODED, HERO |

## Remaining
- The tiny engraved labels drawn *inside* the robot parts' SVG (`ChittiParts.jsx`, about 6–9px at the robot's scaled size) are decorative surface detail and scale with the robot. The subsystem content is carried by the cards.
- At 1920×1080 the command column has empty space between the status line and the lesson hook (top/bottom anchored layout). This is cosmetic.
