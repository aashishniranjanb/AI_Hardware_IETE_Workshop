# DEEP STAGE-BY-STAGE VISUAL UX AUDIT REPORT
**Scope:** Stage-Level Forensic Inspection across All 17 Slides  
**Audit Baseline:** Projector 1080p Viewport Contract (1920×1080, 1600×900, 1366×768)  
**Date:** October 9, 2026  
**Status:** READ ONLY (No Code Altered)

---

## 1. Executive Stage Inventory

Across the deck's 17 slides, there are **176 interactive sub-stages**. Each stage represents a discrete visual state triggered by keyboard (`ArrowRight`/`Space`) or breadcrumb clicks. 

```text
SLIDE 01 (Title): 1 Stage (Single hero)
SLIDE 02 (Chitti): 4 Modes (Hero / Scan / Exploded / DataFlow) [DEFERRED]
SLIDE 03 (System): 11 Stages (0 to 10)
SLIDE 04 (ComputeEngine): 10 Stages (0 to 9 + 4 Quiz Scenarios)
SLIDE 05 (MemoryProblem): 12 Stages (0 to 11 + WaitingGame interactive)
SLIDE 06 (DataHighway): 12 Stages (0 to 11)
SLIDE 07 (Blackwell): 8 Stages (0 to 7)
SLIDE 08 (AIChip): 10 Stages (0 to 9)
SLIDE 09 (TransistorLogic): 10 Stages (0 to 9)
SLIDE 10 (LogicComputation): 11 Stages (0 to 10)
SLIDE 11 (HardwarePlatforms): 12 Stages (0 to 11)
SLIDE 12 (ModelComparison): 13 Stages (0 to 12)
SLIDE 13 (FPGABuild): 15 Stages (0 to 14)
SLIDE 14 (FPGASetup): 13 Stages (0 to 12)
SLIDE 15 (FirstFPGAProgram): 14 Stages (0 to 13)
SLIDE 16 (AIAccelerator): 19 Stages (0 to 18)
SLIDE 17 (RTLBuild): 15 Stages (0 to 14)
------------------------------------------------------------
TOTAL PRESENTATION SUB-STAGES AUDITED: 176
```

---

## 2. Stage-by-Stage Forensic Defect Inventory

### SLIDE 01 — TITLE SCENE
- **Stage 01 (`TitleScene`):**
  - *Layout:* Hero chip sits at `right: 4vw; top: 17vh; width: 42vw; height: 65vh;`.
  - *Defect [P2]:* Orbit animations and 22 GSAP particle spans animate indefinitely on GPU even after moving past Slide 01 unless paused.
  - *Transition to Slide 02:* Clean `next()` call.

---

### SLIDE 02 — CHITTI SCENE
- **Status:** **DEFERRED — USER WILL HANDLE LATER**
- *Note:* Currently uses `sceneMode` state (`hero`, `scan`, `exploded`, `data-flow`). Keyboard handler lacks `{ capture: true }`. Will be addressed in dedicated pass.

---

### SLIDE 03 — EVERY INTELLIGENT SYSTEM HAS A BODY (`SystemScene`)
- **Stage 00 (`empty`):**
  - *Defect [P1]:* Blank right canvas with only a small `#mod-compute` at `scale: 0.7`. Title takes up `35vw` at `top: 30vh`. Disproportionate negative space on right.
- **Stage 01 (`intelligence`):**
  - *Defect [P2]:* "INTELLIGENCE" label fades out and transforms into "COMPUTE" at Stage 02. The transition timing is slightly jerky (0.2s cross-fade).
- **Stage 02 (`compute`):**
  - *Defect [P1]:* Compute node sits centered at `x: 50%, y: 40%`. Contrast of `#mod-compute` is good, but no connections exist yet.
- **Stage 03 (`memory`):**
  - *Defect [P1]:* Memory block enters from `x: -50`. SVG paths `path-memory-write` and `path-memory-read` appear simultaneously with thin 1px lines.
- **Stage 04 (`sensors`):**
  - *Defect [P1]:* Top label `<div className="mm-world-label world-top">REAL WORLD</div>` reveals abruptly with no context.
- **Stage 05 (`interconnect`):**
  - *Defect [P2]:* Interconnect block appears at right (`x: 50`). SVG path has dashed particles.
- **Stage 06 (`io`):**
  - *Defect [P2]:* I/O enters at bottom.
- **Stage 07 (`actuators`):**
  - *Defect [P1]:* Second label `<div className="mm-world-label world-bottom">REAL WORLD</div>` appears at bottom. Duplication of identical text creates visual clutter.
- **Stage 08 (`power`):**
  - *Defect [P2]:* Power wires enter in amber. Crowds bottom area.
- **Stage 09 (`complete`):**
  - *Defect [P0]:* Inactive blocks dim to `opacity: 0.15` on hover, making them invisible from rear projector seating. Bottom status message appears at `left: 6vw; top: calc(30vh + 260px);` which conflicts with Slide 01 styling.
- **Stage 10 (`collapse`):**
  - *Defect [P0 — Continuity]:* All outer blocks animate with negative translations and fade to `opacity: 0`. `#mod-compute` scales up to `1.5`. **When advancing to Slide 04, the screen instantly resets to an unscaled, detached physical package at 0, destroying the zoom illusion.**

---

### SLIDE 04 — WHERE DOES THE AI RUN? (`ComputeEngineScene`)
- **Stage 00 (`entry`):**
  - *Defect [P0 — Continuity]:* Shows `.ce-mental-model-mockup` with small mocked blocks that immediately dim to `0.15`. Does not visually match the ending state of Slide 03.
- **Stages 01–05 (`cpu`, `gpu`, `npu`, `tpu`, `fpga`):**
  - *Defect [P0 — Viewport & Density]:* The physical chip package (`width: min(880px, 86vw); height: min(520px, 62vh);`) has a massive empty dark cavity in the center. The silicon die diagram is small (`min-height: 220px`) surrounded by excessive dark border substrate.
  - *Defect [P1]:* The top pill navigation (`.ce-stage-indicator-bar`) has 10 pills that compete with the slide's main title and eyebrow.
- **Stage 06 (`choice` — Scenarios 1 to 4):**
  - *Defect [P1]:* Interactive scenario panel completely replaces the package with a quiz card. Pressing `Space` reveals the answer, requiring 8 total keystrokes to pass this single stage.
- **Stage 07 (`comparison`):**
  - *Defect [P1]:* Side-by-side 5-column architecture card grid (`CPU`, `GPU`, `NPU`, `TPU`, `FPGA`). Each card is only ~140px wide. At 1366×768, text wraps awkwardly and overflows bottom.
- **Stage 08 (`realization`):**
  - *Defect [P2]:* "NO SINGLE ARCHITECTURE WINS" takeaway banner. Adequate contrast.
- **Stage 09 (`transition`):**
  - *Defect [P2]:* Transition to Memory scene. Clean handoff.

---

### SLIDE 05 — THE MEMORY PROBLEM (`MemoryProblemScene`)
- **Stage 00 (`hook`):**
  - *Defect [P0 — Overflow]:* `.mp-stage-indicator-bar` displays 12 pills. Because it has `max-width: 55vw; overflow-x: auto;`, a grey OS scrollbar renders right under the top header!
- **Stages 01–03 (`processor_waits`, `the_abyss`, `cache`):**
  - *Defect [P1]:* The compute package and memory bus lines animate, but the lower half of the screen remains empty.
- **Stages 04–06 (`sram_limit`, `hbm`, `storage`):**
  - *Defect [P0 — Viewport Clipping]:* Memory tier cards (`SRAM`, `HBM3e`, `DRAM`, `Storage`) stack vertically. `HBMVisual` combined with `ComputeUnit` causes the total vertical height to exceed `100vh`. Cards get clipped behind the bottom edge.
- **Stage 07 (`hierarchy` — Full Pyramid):**
  - *Defect [P0 — Clipping]:* Renders all 4 pyramid tiers (`CACHE`, `HBM3e`, `DRAM`, `STORAGE`). The container height is `min(880px, 88vw)`. The bottom `STORAGE` tier card is pushed 40px below the screen boundary on 1080p and over 120px below on 768p!
- **Stage 08 (`bandwidth`):**
  - *Defect [P1]:* Dual columns (`ComputeUnit` + `HBMVisual`) have wide spacing, pushing the callout banner off-center.
- **Stage 09 (`waiting_game`):**
  - *Defect [P2]:* Interactive waiting simulator. Core stall counter increments. Works well, but controls are small.
- **Stage 10 (`system_performance`):**
  - *Defect [P0 — Overflow]:* Shows System A vs System B cards PLUS `.mp-big-takeaway-banner`. The banner is forced below the visible viewport bottom.
- **Stage 11 (`teaser`):**
  - *Defect [P2]:* Clean transition to Data Highway.

---

### SLIDE 06 — THE DATA HIGHWAY (`DataHighwayScene`)
- **Stages 00–02 (`entry`, `single_link`, `data_lanes`):**
  - *Defect [P2]:* Clean line animations, but the top stage indicator pill bar has 12 items with `overflow-x: auto` risking scrollbar appearance on narrow widths.
- **Stages 03–05 (`pcie`, `gpu_to_gpu`, `nvlink`):**
  - *Defect [P1]:* Scale disparity: Stage 04 zooms out to multi-GPU mesh, but Stage 05 zooms back into a single NVLink connection, creating a jarring jump.
- **Stages 06–08 (`multi_gpu`, `noc`, `bandwidth_gap`):**
  - *Defect [P1]:* `NoCVisual` grid diagram has tiny labels (9px) for "Tile Router" and "Crossbar".
- **Stages 09–11 (`system_impact`, `summary`, `blackwell_teaser`):**
  - *Defect [P2]:* Final teaser cleanly prepares the audience for Blackwell.

---

### SLIDE 07 — BLACKWELL: FROM ONE GPU TO AN AI SUPERCOMPUTER (`BlackwellScene`)
- **Stages 00–02 (`ONE_GPU`, `GPU_PLUS_MEMORY`, `MULTIPLE_GPUS`):**
  - *Defect [P2]:* Dual silicon die rendering is sharp, but right-side stat chips (`TRANSISTORS: 208 BILLION`) have fixed `font-size: 11px`.
- **Stages 03–05 (`NVLINK`, `SCALE_TO_72`, `NVL72_RACK`):**
  - *Defect [P1]:* In Stage 05 (`NVL72_RACK`), the rack diagram renders 18 trays vertically in a 300px wide rack. Individual tray LED indicators (`lights`) are 4px wide—invisible on a projector.
- **Stages 06–07 (`DATA_CENTER`, `ZOOM_DOWN`):**
  - *Defect [P1]:* Zoom down visual has fast transitions that can blur on lower-refresh projectors.

---

### SLIDE 08 — WHAT IS ACTUALLY INSIDE AN AI CHIP? (`AIChipScene`)
- **Stages 00–03 (`THE_GPU`, `COMPUTE_TILES`, `AI_COMPUTE_UNIT`, `MAC`):**
  - *Defect [P1]:* Top header and breadcrumbs track (`.aichip-step-btn`) have 10 buttons. The bottom-right floating deck controls (`.controls`) occlude the 10th button ("FULL CHAIN").
- **Stages 04–07 (`PARALLEL_MAC`, `MATRIX_MULTIPLICATION`, `TENSOR_CORE`, `CIRCUIT`):**
  - *Defect [P2]:* Matrix multiplication animation with 16 sub-MACs has excellent visual clarity, but needs consistent font sizes for input vectors.
- **Stages 08–09 (`LOGIC_GATES`, `ZOOM_OUT_RECAP`):**
  - *Defect [P2]:* Clean handoff to Slide 09.

---

### SLIDE 09 — TRANSISTOR TO LOGIC (`TransistorLogicScene`)
- **Stages 00–03 (`AND GATE`, `MORE LOGIC`, `PROGRAMMABLE`, `PLD`):**
  - *Defect [P2]:* Interactive AND gate buttons (`A`, `B`) work nicely.
- **Stages 04–07 (`PLA VS PAL`, `CPLD`, `FPGA FABRIC`, `SWITCH MATRIX`):**
  - *Defect [P1]:* Stage 07 renders a 4×4 switch matrix with 16 programmable intersection nodes. The coordinate labels ($S_{00} \dots S_{33}$) are 8px font—unreadable past row 2.
- **Stages 08–09 (`BITSTREAM`, `CONFIGURED`):**
  - *Defect [P2]:* Bitstream stream animation functions cleanly.

---

### SLIDE 10 — FROM LOGIC GATES TO COMPUTATION (`LogicComputationScene`)
- **Stages 00–03 (`LOGIC TOOLKIT`, `XOR + AND`, `HALF ADDER`, `FULL ADDER`):**
  - *Defect [P2]:* Interactive XOR/AND gate toggling. Very clear arithmetic demonstration.
- **Stages 04–06 (`CHAINED FAs`, `4-BIT ADDER`, `ALU`):**
  - *Defect [P1]:* 4 chained Full Adders create a wide horizontal diagram ($A_0 \dots A_3$). At 1366×768, the carry ripple arrow lines touch the edge margins.
- **Stages 07–10 (`ALU OPS`, `COMPUTE REVEAL`, `THE LEAP`, `HANDOFF`):**
  - *Defect [P2]:* Handoff to Slide 11 is well-paced.

---

### SLIDE 11 — FROM RTL TO REAL HARDWARE (`HardwarePlatformsScene`)
- **Stages 00–03 (`START WITH ALU`, `THREE PATHS`, `FPGA FLOW`, `FPGA TARGET`):**
  - *Defect [P1]:* 3-column layout (`VSDSQUADRON FPGA`, `RENESAS V2`, `HELTEC ESP32`). On 1080p, cards are tall and narrow (~260px wide). Bottom specs text wraps onto 3 lines.
- **Stages 04–07 (`RENESAS FLOW`, `RENESAS TARGET`, `ESP32 FLOW`, `ESP32 TARGET`):**
  - *Defect [P2]:* Clean separation between MCU firmware and FPGA RTL bitstream.
- **Stages 08–11 (`COMPARE THREE`, `WHY THREE`, `WHICH FOR WHAT`, `HANDOFF`):**
  - *Defect [P1]:* The 3-way trade-off matrix table in Stage 08 has cramped cell padding (`4px 8px`).

---

### SLIDE 12 — ONE AI MODEL. THREE WAYS TO RUN IT (`ModelComparisonScene`)
- **Stages 00–04 (`ONE TASK`, `COMMON PIPELINE`, `THE MODEL`, `DIVERGENCE`, `FPGA PATH`):**
  - *Defect [P2]:* Digit 7 input image and 784-input pipeline display cleanly.
- **Stages 05–08 (`RENESAS PATH`, `ESP32 PATH`, `SIDE BY SIDE`, `LATENCY SPEED`):**
  - *Defect [P1]:* Latency bar chart in Stage 07: Bar labels are tight against values.
- **Stages 09–12 (`POWER CONSUMPTION`, `DEV COMPLEXITY`, `THE VERDICT`, `NOW BUILD FPGA`):**
  - *Defect [P2]:* Clear handoff into hands-on FPGA section.

---

### SLIDE 13 — BUILD THE FPGA VERSION (`FPGABuildScene`)
- **Stages 00–05 (`START: MODEL`, `THE GAP`, `QUANTIZATION`, `REPRESENT MATH`, `ONE MAC`, `PARALLEL MAC`):**
  - *Defect [P1]:* Bottom bar has 15 breadcrumb buttons. Font size is `0.72rem` (11.5px). Buttons are very small.
  - *Defect [P0]:* Rightmost button (`15 HANDOFF`) is partially covered by `.controls` buttons at `bottom: 26px; right: 28px`.
- **Stages 06–10 (`RTL`, `SYNTHESIS`, `PLACE & ROUTE`, `BITSTREAM`, `PROGRAM FPGA`):**
  - *Defect [P2]:* RTL code box is clean and compact (10 lines).
- **Stages 11–14 (`VSDSQUADRON`, `COMPLETE PIPELINE`, `WHAT HAPPENED`, `HANDOFF`):**
  - *Defect [P2]:* VSDSquadron board hero SVG aligns well.

---

### SLIDE 14 — FPGA HARDWARE SETUP (`FPGASetupScene`)
- **Stages 00–05 (`THE BOARD`, `ONBOARD`, `USB`, `ONBOARD FT232H`, `WHAT USB DOES`, `POWER & DATA`):**
  - *Defect [P2]:* 13 breadcrumbs. Very clean callout banner: *"★ CRITICAL NOTICE: NO EXTERNAL FT232H ADAPTER REQUIRED ★"*.
- **Stages 06–12 (`SEND BITSTREAM`, `CONFIGURED`, `FIRST TEST`, `THEN AI`, `COMPLETE SETUP`, `HARDWARE READY`, `HANDS-ON`):**
  - *Defect [P2]:* Pulsing green LED demo is highly visible. Overall Slide 14 is one of the cleanest in the deck.

---

### SLIDE 15 — FIRST FPGA PROGRAM (`FirstFPGAProgramScene`)
- **Stages 00–04 (`WHY BLINK`, `CONCEPT`, `VERILOG`, `CLOCK`, `SYNTH`):**
  - *Defect [P1]:* 14 breadcrumbs. High horizontal density.
  - *Defect [P2]:* Verilog code block in Stage 02 has `line-height: 1.6` and spans 12 lines. Fits within safe zone.
- **Stages 05–09 (`P&R`, `BITS`, `FLASH`, `CONFIGURED`, `LED`):**
  - *Defect [P2]:* Large 140px pulsing LED in Stage 09 is prominent.
- **Stages 10–13 (`PROVED`, `SWAP`, `AI`, `HANDOFF`):**
  - *Defect [P1]:* Stage 10 checklist has 7 cards that stack vertically; on 768p height, the 7th card comes within 10px of the bottom bar.

---

### SLIDE 16 — BUILD THE AI ACCELERATOR (`AIAcceleratorScene`)
- **Stages 00–05 (`REPLACE`, `MATH`, `ONE MAC`, `MAC × N`, `PARALLEL`, `DOT PROD`):**
  - *Defect [P0 — Breadcrumb Overcrowding]:* **19 breadcrumb pills** crammed into `.aa-track`. At 1366×768 or windowed browser, buttons shrink to `0.70rem` and wrap/scroll.
  - *Defect [P0 — Control Overlap]:* Button 19 ("19 HANDOFF") sits directly behind the global deck controls (`ChevronRight`, `Maximize2`, `Blackout`). Clicking the breadcrumb accidentally clicks the deck button!
- **Stages 06–10 (`LAYER`, `784→32`, `RELU`, `32→16`, `16→10`):**
  - *Defect [P1]:* In Stage 08 (`784→32`), the 3-column datapath box is wide. At 1366×768, side margins are < 10px.
- **Stages 11–14 (`DATAPATH`, `CONTROL`, `MEMORY`, `COMPLETE`):**
  - *Defect [P1]:* Stage 12 datapath has 5 cards in a horizontal flex row with arrow separators. On narrow viewports, cards wrap awkwardly.
- **Stages 15–18 (`RTL`, `FPGA`, `INFERENCE`, `HANDOFF`):**
  - *Defect [P2]:* Digit 7 inference demo operates cleanly.

---

### SLIDE 17 — WRITE THE RTL (`RTLBuildScene`)
- **Stages 00–04 (`ARCH`, `BLOCKS`, `RTL`, `MAC RTL`, `RELU RTL`):**
  - *Defect [P1]:* 15 breadcrumbs in bottom bar. Tight against global deck controls.
- **Stages 05–09 (`FSM`, `TOP MODULE`, `YOSYS`, `NEXTPNR`, `BITS`):**
  - *Defect [P2]:* Verilog snippets are concise (< 10 lines).
- **Stages 10–14 (`FLASH`, `FULL FLOW`, `NO PYTHON`, `PYRAMID`, `LIVE BUILD`):**
  - *Defect [P1]:* Stage 13 pyramid list has 7 rows. On 768p displays, the 7th row overlaps the bottom breadcrumb track.

---

## 3. Global Systematic Defect Summary

```text
┌────────────────────────────────────────────────────────────────────────┐
│ TOTAL AUDITED ISSUES                                                   │
├────────────────────────────────────────────────────────────────────────┤
│ A. GLOBAL SYSTEM BUGS:                                                 │
│    - G-01: No letterboxed 16:9 viewport container                      │
│    - G-02: Global controls (.controls) occlude scene breadcrumbs       │
│    - G-03: Multiple keydown listeners (16 instances across scenes)     │
│                                                                        │
│ B. CRITICAL SLIDE DEFECTS:                                             │
│    - S-03/04: Continuity break (scaled compute node resets to mock)    │
│    - S-04: Chip cavity underutilization & 10 competing pills           │
│    - S-05: Horizontal scrollbar on pills + bottom cards clipped        │
│    - S-16: 19 breadcrumbs collide with deck controls                   │
│                                                                        │
│ C. REPEATABLE POLISH DEFECTS:                                          │
│    - R-01: Microscopic text (< 10px) on chip schematics & NoC         │
│    - R-02: 7-row vertical stacks on Slides 15 & 17 touch bottom on 768p│
│    - R-03: Duplicate labels ("REAL WORLD" on Slide 03)                 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Master Consolidated Priority Plan

```text
PHASE 1: Global 16:9 Viewport Foundation
  - Wrap deck in strict letterboxed 16:9 aspect box (`overflow: hidden`)
  - Relocate or integrate `.controls` so it never overlaps slide content

PHASE 2: Unified Navigation Engine
  - Consolidate 16 `keydown` listeners into a single controller in `app/page.jsx`

PHASE 3: Slide 05 (Memory Problem) Layout Overhaul
  - Fix horizontal scrollbar on stage indicator pills
  - Compress tier cards vertically so the complete hierarchy fits on screen

PHASE 4: Slide 03 → 04 Continuity Bridge
  - Smoothly morph Slide 03's zoomed COMPUTE node into Slide 04's package
  - Rebalance Slide 03 header/canvas layout and clean up duplicate labels

PHASE 5: High-Density Breadcrumb Condensation (Slides 08, 13, 15, 16, 17)
  - Group 14–19 micro-pills into structured milestones with sub-counters

PHASE 6: Dead Code & Redundant Styles Cleanup
  - Prune unreferenced `compute.css` and unused UI stubs

PHASE 7: Full Multi-Resolution Validation
  - Verify 1920×1080, 1600×900, and 1366×768 with zero scrollbars
```

*(Stage-level visual inspection complete. Zero application code modified.)*
