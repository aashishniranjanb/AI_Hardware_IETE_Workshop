# Bug & UI/UX Report — AI Hardware Webdeck
Date: 2026-10-09 · Method: code review + live DOM audit of all 17 slides at 1280×720 (dev server, Next 16.4 / Turbopack)

Console: no runtime errors. Build server: clean. Everything below is a real defect or a missed opportunity.

---

## A. Functional bugs (fix first)

| # | Severity | Where | Bug |
|---|---|---|---|
| B1 | **High** | `app/page.jsx` `Scene` | **Slides swap instantly** — no exit/enter transition at all. The whole deck "cuts" between slides. Biggest single UX gap for a presentation. |
| B2 | **High** | all multi-stage scenes | **Going back (←) into a slide restarts it at stage 0** instead of its last stage. Presenter has to click through all stages again to reach the previous point. |
| B3 | **High** | `ChittiScene.jsx:53` | Chitti's keydown listener is **not `capture`** while all others are; its `R` key also collides with the global `R` handler. |
| B4 | Med | `page.jsx:185` | `R` (reset) is a no-op: `setIndex(i => i)`. Should restart current slide (remount via key) or go to slide 1. |
| B5 | Med | `page.jsx:184,203` | `F` / fullscreen button only enters fullscreen; never toggles out. No `Home`/`End`/`PageUp`/`PageDown` (clicker remotes send PageUp/PageDown!) support. |
| B6 | **High** | `page.jsx` | **Presentation clickers won't work**: most remotes send `PageDown`/`PageUp`, which neither the deck nor any scene listens for. |
| B7 | Med | `page.jsx` | Refresh always returns to slide 1 — no URL hash (`#5`) / persistence. Risky mid-talk. |
| B8 | Med | `page.jsx` | No touch / swipe navigation (tablet/phone presenting). |
| B9 | Med | Slides 15, 16, 17 | Stage tracks (`.ff-track`, `.aa-track`, `.rb-track`) **overflow horizontally with scrollbars**; buttons 13–19 are off-screen. Slide 16 has 19 pills, 13 elements outside the frame. |
| B10 | Med | Slides 05, 06 | `.mp-stage-indicator-bar` and `.dh-stage-indicator-bar` scroll horizontally; last pills ("HBM3E", "STORAGE", "FULL PYRAMID", "NVLINK"…) clipped. |
| B11 | Med | Slides 13–17 | Global `.controls` dock **sits on top of stage buttons** (e.g. "BUILD IT", "PROGRAM", "11 PROVED", "12 SWAP", "12 DATAPATH", "12 FULL FLOW"). |
| B12 | Low | Slides 03, 04 | "POWER + THERMAL" / "ACTUATORS" blocks extend outside the 16:9 frame. |
| B13 | Low | everywhere | Blackout/fullscreen keys fire while typing in any input; key handlers don't check `e.target`, `e.repeat`, or modifier keys (Ctrl+R / Ctrl+F get hijacked by scenes). |
| B14 | Low | `page.jsx` | `Play`, `RotateCcw` imported but unused; `NVL72Scene`, `ZoomScene`, `TransistorScene` are dead code (not in `scenes`). |
| B15 | Low | repo root | Two PostCSS configs (`postcss.config.js` + `.mjs`) — ambiguous which wins. Vite leftovers: `index.html`, `src/main.jsx`, `src/styles.css`, `convert.js`, empty `tailwind.config.js`, `components/ComputeEngine/compute.css`, `components/ui/*`. |
| B16 | Low | `globals.css` | Google Fonts via CSS `@import` (render-blocking, FOUT, fails offline at venue). Use `next/font` to self-host. |
| B17 | Low | `layout.tsx` | No `viewport`/theme-color, no favicon; `lang` fine. |
| B18 | Low | title slide | Emoji in `.hero-path` (🤖🧠⚡) render differently per OS / projector laptop. |

## B. Readability (projector)

- Text under 11px count per slide: S02 **48**, S13 30, S05 28, S14 27, S10 27, S07 33, S17 21, S16 19, S06 19… Rear rows can't read these. Set a floor of ~14px at 1280×720 (use `clamp()` relative to the 16:9 frame).
- Inactive blocks at `opacity: .15` (Slide 03) vanish on projectors — use ≥ .35 + desaturate.
- No `prefers-reduced-motion` handling anywhere (0 matches).
- Stage pills duplicated across 6 CSS files with slightly different sizes → inconsistent feel slide to slide.

## C. "Wow" / attention opportunities (what's missing)

**Deck-level (biggest impact, one place to build):**
1. **Slide transitions** — cinematic enter/exit (scale-blur-fade, or directional wipe matching →/←), with a brief cyan "scan line" sweep. Framer Motion `AnimatePresence` is already a dependency and unused.
2. **Unified stage navigator** — one shared component: compact progress dots + "PHASE 2 · 3/5" label, auto-collapses when >8 stages; fixes B9–B11 everywhere.
3. **Animated progress bar** — glowing gradient with a moving "comet" head instead of a static width bar.
4. **Overview grid (press `G`/`Esc`)** — thumbnails of all 17 slides, click to jump. Great for Q&A.
5. **Ambient layer** — one shared animated background (slow-drifting circuit traces + parallax particles + soft noise) replacing 14 duplicated static grids.
6. **Cursor spotlight / laser pointer** (press `L`) for pointing on projector.
7. **Presenter timer + slide clock** in topbar (toggle `T`).

**Per-slide:**
- S01 Title: letter-by-letter decode/"glitch" reveal of "AI HARDWARE", chip with animated circuit traces pulsing into the die, replace emoji path with SVG icons drawing in.
- S02 Chitti: scan-beam sweep + hotspots pulsing; exploded view with spring physics.
- S03 Mental model: animated data packets flowing along SVG paths (stroke-dashoffset), thicker arrowheads; morph COMPUTE node into Slide 04 package (shared-layout transition).
- S04 Compute: CPU vs GPU vs TPU cores lighting up in parallel (count-up "ops/sec" ticker).
- S05 Memory: "waiting" processor with stall meter; data packets visibly crawling from HBM vs SRAM; bandwidth count-up numbers.
- S06 Data highway: light-trail packets on NoC/NVLink lines, speed-of-link comparison bars.
- S07 Blackwell: rack assembling tray-by-tray with LED shimmer, big number count-ups (72 GPUs, 130 TB/s).
- S08–S10: interactive gates with electric "current" glow when output = 1; ALU bits flipping with sound-free haptic flash.
- S11–S12: 3-column cards with hover tilt/3D, animated metric bars, winner badge pop.
- S13–S17: typewriter code reveal with syntax glow, terminal-style build log streaming, LED on FPGA pulsing in sync with code line highlight, confetti/burst on "COMPLETE" stages.

## D. Recommended order
1. Deck engine: transitions (C1), unified keyboard incl. PageUp/Down, back-to-last-stage, hash routing, swipe, R/F fixes (B1–B8, B13).
2. Shared stage navigator + move controls out of the stage area (B9–B11).
3. Font self-hosting, min font size, reduced-motion, cleanup dead files (B14–B18).
4. Ambient layer + progress bar + overview grid.
5. Per-slide animation polish, slide by slide.
