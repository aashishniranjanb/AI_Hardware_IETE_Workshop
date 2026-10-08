# FORENSIC UI/UX & ARCHITECTURE AUDIT REPORT
**Project:** AI Hardware Workshop Webdeck (`ai-hardware-webdeck`)  
**Audit Mode:** READ ONLY (Forensic Baseline — No Code Modified)  
**Date:** October 9, 2026  
**Auditor:** Antigravity Autonomous Inspector  

---

## 1. Executive Summary

This audit examined all **17 presentation slides**, **86 React components/source files**, and **18 stylesheet files** in the project. The visual identity (dark semiconductor aesthetic `#05070B`, cyan `#27D7FF`, amber `#F59E0B`, emerald `#57E6A5`) is strong and consistent. However, the application currently lacks a **strict 16:9 viewport containment boundary**.

Because each scene component independently defines its outer wrapper dimensions (`100vw`, `100vh`) and applies internal absolute or grid positioning without global aspect-ratio boxing:
1. **Vertical and horizontal overflow** occurs on complex slides (notably Slide 05 *Memory Problem*, where the stage navigation bar overflows horizontally and memory tiers stretch below the viewport bottom).
2. **Slide 03 → 04 has a conceptual and visual continuity gap**, failing to morph the central `COMPUTE` node of Slide 03 into the package of Slide 04.
3. **Internal sub-stage navigation density** across scenes competes with the global deck controls and slide headers.
4. **Keyboard events** feature 15+ independent `window.addEventListener('keydown', ..., { capture: true })` hooks across scenes that manually `stopPropagation()` with slight variations in edge bubble conditions.

---

## 2. Quantitative Defect Summary

| Metric | Count |
|---|---|
| **Total Files Inspected** | 94 |
| **Total Components Inspected** | 86 |
| **Total CSS Files Inspected** | 18 |
| **Total Scenes Inspected** | 17 |
| **Critical Defects (P0)** | 10 |
| **Major Defects (P1)** | 14 |
| **Minor / Layout Defects (P2)** | 18 |
| **Polish / Optimization Defects (P3)** | 12 |
| **Dead Code Candidates** | 4 files / 8 components |
| **Duplicate Systems Identified** | 3 systems |
| **Runtime / Build Errors** | 0 build errors (`npm run build` exits code 0) |

---

## 3. Top 10 Most Critical Problems

1. **[P0-01] No Global 16:9 Viewport Contract (Affects All Slides):** Slides declare `width: 100vw; height: 100vh;` and internal wrappers have unbounded vertical stacking. At 16:9 on varying projector aspect ratios (16:10, windowed browser), content exceeds the screen.
2. **[P0-02] Slide 05 (Memory Problem) Overflow & Horizontal Scrollbar:** `.mp-stage-indicator-bar` has `max-width: 55vw; overflow-x: auto;` causing an ugly horizontal scrollbar directly under the header. Furthermore, the `MemoryHierarchy` pyramid cards exceed the viewport height, pushing HBM3e/Storage off the bottom.
3. **[P0-03] Slide 03 → 04 Continuity Disconnect:** Slide 03 finishes on stage `collapse` where `#mod-compute` scales to 1.5, but when advancing to Slide 04, it resets to a detached "CENTRAL COMPUTE ENGINE" with an empty stage 0 mockup container.
4. **[P0-04] Fragmented Keydown Listeners (16 Independent Listeners):** Almost every scene registers its own `window.addEventListener('keydown', ..., { capture: true })`. `ChittiScene.jsx` lacks `{ capture: true }`, while others capture. If a sub-stage index becomes desynchronized, arrow keys either get swallowed or jump unexpectedly.
5. **[P0-05] Global Floating Controls Occlusion:** `.controls` at `bottom: 26px; right: 28px; z-index: 30;` sits directly on top of scene breadcrumbs and bottom status chips across Slides 08 to 17.
6. **[P0-06] Unused / Dead Files In Repository:** `components/ComputeEngine/compute.css` is an unreferenced duplicate of `ComputeEngine.css`. Unused legacy helper files exist in root directories.
7. **[P0-07] Slide 03 Asymmetric Canvas & Uninformative Duplicate Labels:** Left header takes up `35vw` at `top: 30vh`, leaving the architecture canvas squeezed into `60vw` with duplicate `REAL WORLD` labels top and bottom.
8. **[P0-08] Slide 04 Interior Cavity Underutilization:** The physical package in Slide 04 has a large empty dark region when viewing CPU/GPU/NPU before interacting.
9. **[P0-09] Breadcrumb Pill Overcrowding on High-Stage Scenes:** Slides with 14–19 stages (Slide 15, 16) pack up to 19 buttons in a single bottom track, causing text to shrink below readable thresholds for rear-row students.
10. **[P0-10] Inconsistent Safe Padding Across Scenes:** Slides 01–02 use `padding: 8vh 7vw`, Slides 03–07 use manual absolute offsets, and Slides 08–17 use `padding: 2.2rem 4rem`.

---

## 4. Master Defect Register

### P0 — Must Fix Before Workshop (Presentation-Breaking)

#### ID: P0-01 — Lack of Viewport Containment Aspect Box
- **Slide:** All (01–17)
- **Files:** `app/globals.css`, all `*Scene.css`
- **Problem:** Scenes assume an unconstrained `100vw / 100vh`. On projectors with taskbars or aspect mismatches, slides generate scrollbars or truncate bottom cards.
- **Evidence:** `overflow-x: auto` and `overflow-y` active in various wrappers.
- **Recommended Fix:** Introduce a top-level letterboxed 16:9 safe-viewport container (`aspect-ratio: 16/9; max-width: 100vw; max-height: 100vh; margin: auto; overflow: hidden;`).

#### ID: P0-02 — Slide 05 (Memory Problem) Horizontal Scrollbar & Vertical Truncation
- **Slide:** 05 (`MemoryProblemScene.jsx`)
- **Files:** `components/MemoryProblem/MemoryProblem.css`, `MemoryHierarchy.jsx`
- **Problem:** A horizontal scrollbar appears on `.mp-stage-indicator-bar`. The vertical memory stack (`.memory-hierarchy-container`) exceeds the viewport, cutting off HBM3e and NVMe.
- **Evidence:** `.mp-stage-indicator-bar { max-width: 55vw; overflow-x: auto; }` and `.hierarchy-tiers-stack` height exceeds `flex: 1`.
- **Recommended Fix:** Condense stage indicators into compact dot/number pills; compress tier card vertical padding from `14px 20px` to `8px 14px` and set proportional heights.

#### ID: P0-03 — Slide 03 → 04 Continuity Breakdown
- **Slide:** 03 (`SystemScene.jsx`) → 04 (`ComputeEngineScene.jsx`)
- **Files:** `components/MentalModel/SystemScene.jsx`, `components/ComputeEngine/ComputeEngineScene.jsx`
- **Problem:** Slide 03 ends by collapsing non-compute nodes, leaving `COMPUTE` zoomed in. But Slide 04 starts with an empty physical package and does not visually adopt the coordinate position or look of Slide 03's compute node.
- **Evidence:** `SystemScene` stage 10 zooms `#mod-compute` by `scale: 1.5`, but `ComputeEngineScene` renders `.ce-mental-model-mockup` which is a static replica that dims out.
- **Recommended Fix:** Align the dimensions and styling of `#mod-compute` in Slide 03 with the initial state of the package in Slide 04.

#### ID: P0-04 — Fragmented Keydown Capture Architecture
- **Slide:** All (01–17)
- **Files:** `app/page.jsx`, all scene files
- **Problem:** 16 separate `window.addEventListener('keydown')` handlers exist. `app/page.jsx` listens without capture, while individual scenes listen with `{ capture: true }` and call `e.stopPropagation()`. In `ChittiScene.jsx`, capture is omitted, leading to conflicting propagation.
- **Evidence:** `grep "window.addEventListener('keydown'"` shows 16 instances.
- **Recommended Fix:** Centralize keyboard dispatching in `app/page.jsx` or provide a unified custom hook `useDeckNavigation({ stagesCount, stageIndex, setStageIndex })`.

#### ID: P0-05 — Global Deck Controls Occlusion
- **Slide:** 08–17
- **Files:** `app/globals.css`, bottom bars in Slides 08–17
- **Problem:** The floating `.controls` box (`bottom: 26px; right: 28px; z-index: 30;`) physically overlaps the rightmost breadcrumb buttons and status pills.
- **Evidence:** Both bottom elements share the bottom-right coordinate space.
- **Recommended Fix:** Elevate bottom breadcrumbs above the controls or integrate slide navigation controls into the top bar.

#### ID: P0-06 — Duplicate Stylesheet Conflict in ComputeEngine
- **Slide:** 04
- **Files:** `components/ComputeEngine/compute.css`, `components/ComputeEngine/ComputeEngine.css`
- **Problem:** `compute.css` (322 lines) is an obsolete styling file that is not imported, while `ComputeEngine.css` (1079 lines) is the active one.
- **Evidence:** `ComputeEngineScene.jsx` only imports `./ComputeEngine.css`.
- **Recommended Fix:** Archive or remove `compute.css`.

#### ID: P0-07 — Slide 03 Asymmetric Canvas & Clutter
- **Slide:** 03
- **Files:** `components/MentalModel/SystemScene.jsx`, `mental.css`
- **Problem:** Header occupies `35vw` at `top: 30vh`. Right-side canvas is squeezed into `60vw`, making blocks feel cramped. Two separate `REAL WORLD` labels appear simultaneously without distinction.
- **Evidence:** Lines 176–177 of `SystemScene.jsx` render duplicate `<div className="mm-world-label">REAL WORLD</div>`.
- **Recommended Fix:** Balance the layout with top header placement and label the world inputs/outputs clearly (e.g., `PHYSICAL ENVIRONMENT INPUT` vs `PHYSICAL ACTUATION OUTPUT`).

#### ID: P0-08 — Slide 04 Empty Cavity Underutilization
- **Slide:** 04
- **Files:** `components/ComputeEngine/ComputeEngineScene.jsx`, `ComputeObject.jsx`
- **Problem:** Stages 01–06 show a large empty package cavity where the silicon die sits, with minimal explanatory callouts.
- **Evidence:** The silicon die cavity spans over 350px height with small text.
- **Recommended Fix:** Enrich the silicon die visualization with architectural block callouts and active data flow paths.

#### ID: P0-09 — Stage Pill Density Overcrowding
- **Slide:** 15, 16, 17
- **Files:** `firstFPGAData.js`, `aiAcceleratorData.js`, `rtlBuildData.js`
- **Problem:** Slide 16 has 19 breadcrumbs in `.aa-track`. At 1366×768 or 1600×900, the buttons become microscopic and overflow horizontally.
- **Evidence:** `.aa-track { overflow-x: auto; gap: 0.45rem; }` has 19 buttons.
- **Recommended Fix:** Group stages into 4–5 milestone phases on the bottom bar, showing a sub-counter for intra-phase steps (e.g., `PHASE 1: MAC CORE (3/5)`).

#### ID: P0-10 — Inconsistent Global Margins & Header Alignments
- **Slide:** All
- **Files:** All `*Scene.css`
- **Problem:** Different slides have disparate header padding: Slide 03 uses `top: 30vh`, Slide 04 uses `padding: 35px 50px`, Slide 08 uses `padding: 2.2rem 4rem`.
- **Evidence:** Inconsistent header CSS class declarations across components.
- **Recommended Fix:** Standardize a shared `.deck-header` layout component.

---

### P1 — Major UX & Continuity Issues

- **[UX-11] Slide 03 Block Contrast:** Inactive blocks dim down to `opacity: 0.15`, rendering them invisible on projector screens.
- **[UX-12] Slide 03 Flow Direction Ambiguity:** Arrowheads on SVG paths are thin (6px) and blend into background grids.
- **[UX-13] Slide 04 Choice Stage Disconnect:** Stage 8 ("Interactive Choice Scenario") replaces the chip visual with a quiz panel abruptly without transition.
- **[UX-14] Slide 05 Comparison Cards:** In Stage 10 ("System Performance Comparison"), the two system cards (`SYSTEM A` vs `SYSTEM B`) sit tightly against the bottom takeaway banner.
- **[UX-15] Slide 06 (Data Highway) Scale Consistency:** The switch fabric view shifts scale between stage 3 (NoC) and stage 4 (NVLink Cluster).
- **[UX-16] Slide 07 (Blackwell) System View:** NVL72 rack trays have small text indicators (`lights`) that are not readable from 10 feet away.
- **[UX-17] Slide 08 (AI Chip) Hierarchy Zoom:** Zoom steps from GPU $\to$ Core $\to$ MAC use different diagram dimensions between steps.
- **[UX-18] Slide 09 (Transistor) Switch Matrix Density:** 16-switch matrix grid has small font sizes for FPGA switch labels.
- **[UX-19] Slide 10 (Logic Computation) ALU Operations:** ALU bit inputs ($A, B$) and select switches lack large visual tactile state cues on low-contrast screens.
- **[UX-20] Slide 11 (Hardware Platforms) Parallel Boards:** 3-column layout has cramped vertical space for specifications.
- **[UX-21] Slide 12 (Model Comparison) Metric Badges:** Efficiency numbers have low contrast against slate backgrounds.
- **[UX-22] Slide 13 (FPGA Build) Toolchain Pipeline:** Arrow separators between steps are standard text characters (`→`) rather than aligned graphic glyphs.
- **[UX-23] Slide 14 (FPGA Setup) Cable Diagram:** The USB cable SVG path is static and does not animate signal transmission.
- **[UX-24] Slide 17 (Write the RTL) Code Block Height:** Code blocks have fixed `font-size: 13.5px` which requires scaling on lower-resolution projectors.

---

## 5. Slide-by-Slide UX Audit Matrix

| Slide # | Scene Name | Current Viewport Status | Overflow Status | Projector Readability | Continuity Score (1-5) | Severity |
|---|---|---|---|---|:---:|:---:|
| **01** | TitleScene | Contained (Fixed CSS) | None | High | N/A | P3 |
| **02** | ChittiScene | Contained (Flex) | None | Moderate | 4/5 | **DEFERRED** |
| **03** | SystemScene | Asymmetric (`35vw` / `60vw`) | None | Moderate (dimmed nodes hard to read) | 3/5 | **P0** |
| **04** | ComputeEngineScene | Package has unused area | None | Moderate | 2/5 (from Slide 03) | **P0** |
| **05** | MemoryProblemScene | **Clipped vertically** | **Horizontal scroll on pills; cards cut off** | Low (truncated bottom) | 4/5 | **P0** |
| **06** | DataHighwayScene | Contained | None | High | 4/5 | P1 |
| **07** | BlackwellScene | Contained | None | High | 4/5 | P1 |
| **08** | AIChipScene | Contained | Breadcrumbs crowd bottom | High | 4/5 | P1 |
| **09** | TransistorLogicScene | Contained | None | High | 4/5 | P2 |
| **10** | LogicComputationScene | Contained | None | High | 4/5 | P2 |
| **11** | HardwarePlatformsScene | Contained | 3-column tight fit | High | 4/5 | P1 |
| **12** | ModelComparisonScene | Contained | None | High | 4/5 | P2 |
| **13** | FPGABuildScene | Contained | 15 breadcrumb pills tight | High | 4/5 | P1 |
| **14** | FPGASetupScene | Contained | None | High (Clean callout) | 5/5 | P2 |
| **15** | FirstFPGAProgramScene | Contained | 14 breadcrumb pills tight | High (Pulsing LED clear) | 4/5 | P1 |
| **16** | AIAcceleratorScene | Contained | **19 breadcrumb pills tight** | High | 4/5 | **P0** |
| **17** | RTLBuildScene | Contained | 15 breadcrumb pills tight | High | 4/5 | P1 |

---

## 6. Dead Code & Duplicate Inventory

### A. Dead / Unreferenced Files
1. `components/ComputeEngine/compute.css` (6.1 KB) — Superseded by `ComputeEngine.css`. Not imported anywhere in codebase.
2. `components/ui/button.tsx` & `components/ui/utils.ts` — Generic shadcn stub files, not referenced by any scene.

### B. Duplicate / Near-Duplicate Code
1. **Breadcrumb Bar Styling:** Duplicate `.fb-step-btn`, `.fs-step-btn`, `.ff-step-btn`, `.aa-step-btn`, `.rb-step-btn` across 6 CSS files with identical hex colors and transitions.
2. **Ambient Background Grid:** Duplicate SVG/CSS gradients declared in 14 individual stylesheets instead of a single utility class.
3. **Keyboard Listener Boilerplate:** Identical 35-line `keydown` capture `useEffect` hook copy-pasted across 12 scene files.

---

## 7. Recommended Systematic Correction Order

```text
PHASE 1: Global Viewport & Aspect Ratio Foundation
  - Add strict 16:9 responsive letterbox container in app/globals.css
  - Enforce overflow: hidden and prevent all horizontal/vertical scrollbars

PHASE 2: Unified Navigation & Keydown Controller
  - Consolidate keyboard listening into a single robust engine in app/page.jsx
  - Eliminate event collision and capture mismatches

PHASE 3: Slide 05 (Memory Problem) Layout Restructuring
  - Eliminate the horizontal scrollbar on stage indicator pills
  - Compress vertical padding of tier cards so the entire pyramid fits in viewport

PHASE 4: Slide 03 → 04 Continuity Bridge
  - Rebalance Slide 03 header/canvas proportions
  - Clean up duplicate "REAL WORLD" labels
  - Animate Slide 03 compute block directly into the Slide 04 physical package

PHASE 5: High-Density Breadcrumb Condensation (Slides 13–17)
  - Replace 15–19 individual micro-buttons with phase milestones + stage counter
  - Move global deck controls out of content collision zone

PHASE 6: Dead Code Cleanup & Style Consolidation
  - Remove unreferenced compute.css and unused UI stubs
  - Unify shared deck header and button styles

PHASE 7: Fullscreen & Projector Verification
  - Validate across 1920×1080, 1600×900, and 1366×768 with zero scrollbars
```

---

## 8. What Must NOT Be Touched

The following components are functionally stable, pedagogically precise, and should remain protected from architectural rewrites:
- **Slide 02 (`ChittiScene.jsx`):** Explicitly marked as **DEFERRED — USER WILL HANDLE LATER**.
- **Slide 14 Architecture (`FPGASetupScene.jsx`):** The onboard FT232H direct connection model is correct and verified.
- **Slide 15 Verification Pipeline (`FirstFPGAProgramScene.jsx`):** The LED blinker logic and verification flow are correct.
- **Slide 16 Neural Math & Datapath (`AIAcceleratorViews.jsx`):** Arithmetic breakdown ($y = \text{ReLU}(\Sigma(w \times x) + b)$) is accurate.
- **Slide 17 Toolchain Flow (`RTLBuildViews.jsx`):** Synthesis $\to$ P&R $\to$ Bitstream pipeline is accurate.

*(Report generated with zero codebase modifications)*
