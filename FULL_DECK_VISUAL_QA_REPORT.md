# FULL DECK VISUAL QA REPORT — Step 8
Date: 2026-10-09 · Status: COMPLETE (Slide 02 deferred as agreed)

## Method
- **Automated sweep:** every stage of every non-deferred slide, about 190 states at 1366×768. The densest slides were re-run at 1600×900 and 1920×1080. Each state checks:
  - text outside the frame;
  - text under the deck controls;
  - text under the topbar;
  - ellipsis/nowrap clipping;
  - text under 12px (including the effect of `zoom`).
- **Screenshot review** of representative stages on every batch (Slides 01, 04, 06, 07, 08, 09, 12, 13, 16, 17).
- **Batches:** 01 → 04+07 → 08+09 → 05+06 → 03+10–12 → 13+14 → 15–17. The build and type check were run after the batches.

## Defects found → fixed
| # | Sev | Slide / stage | File(s) | Evidence | Fix |
|---|---|---|---|---|---|
| 1 | P0 | 01 | `app/page.jsx`, `ui.css` | Emoji journey (🤖🧠⚡▦) rendered per-OS; "SUPERCOMPUTER" clipped at the right edge, near the controls | Lucide icon journey under the title, sequential light-up; decode title, circuit-trace power-on |
| 2 | P0 | 07 / 6 (NVL72 rack) | `NVL72RackView.jsx`, `BlackwellScene.css` | 27 trays: rack ran off the frame again after the type floor | Spec stated once per tray type (legend) instead of 27 repeats; 3-column trays |
| 3 | P1 | 04 all | `ComputeEngineScene.jsx` | Navigator showed raw ids ("MEMORY_TEASER") | Uses the stage labels |
| 4 | P1 | 04, 06–17 | 13 scene folders | 8–11px technical labels (worst: 08 101, 07 82, 13 80, 09 65 per stage) | Type floor: 9–11px → 12px, 7–8px micro → 11px, sub-0.75rem → 0.75rem; SVG `fontSize` included |
| 5 | P1 | 08 (q-label, c-item, input/output-type), 06 (stat-label) | scene CSS | Meaningful labels still at 11px; `.q-label` also collides with a legacy global | Scoped 12–13px overrides |
| 6 | P1 | 13, 16, 17 | `app/ui.css` | Compact StageNavigator digits were 11px | Compact dots 24px / 12px |
| 7 | P1 | most stages | `components/deck/motion.js` | Diagrams small in a large empty stage (e.g. 16/9 ReLU, 08/7 tensor, 09/8 switch matrix) | `fitStage`: enlarges the single stage diagram with CSS `zoom` (≤1.35×), checked against the real layout with automatic back-off. Applied on **167 of 187** stages. |
| 8 | P2 | 04–07, 14 | 10 files + `deck/GlyphIcon.jsx` | Emoji icons (💾 ⚡ 🔌 🌐 ⚠️ ❓ ⏸ ▦) | Replaced with Lucide line icons through `GlyphIcon` / `InlineIcon` |

## Results (after fixes)
| Size | States | Outside frame | Under controls | Under topbar | Clipped |
|---|---|---|---|---|---|
| 1366×768 | 187 (Slides 03–17, all stages) | **0** | **0** | **0** | **0** |
| 1920×1080 | 42 (07, 13, 16) | 0 | 0 | 0 | 0 |
| 1600×900 | 34 (16, 17) | 0 | 0 | 0 | 0 |

**Text under 12px at 1366×768:** only deliberate micro/decorative labels remain at 11px:
- the 72 sub-unit tags and "TARGET" (08);
- the "a·b+c" cell formulas (04);
- L1/L2 cache tags (04);
- router IDs "R 0…" (06);
- board silkscreen "USB-C" / "CAM" (11, 14).

**Build:** `npm run build` ✅ · **TypeScript:** `npx tsc --noEmit` ✅ · **Console:** no runtime errors.

**Navigation:** stage-dot clicks are used by the sweep itself on every stage, and keyboard navigation is unchanged (Step 3 engine).

## Remaining issues (documented, not blockers)
| Sev | Item |
|---|---|
| P2 | Slide 07 title wraps to 2 lines ("…WE SCALE / THIS?"), which takes vertical room on dense stages. |
| P2 | The Slides 04/05/06 headers sit close under the topbar; no overlap is measured, but it's visually tight. |
| P2 | Slide 07 stage 1 and Slide 04 stage 0 "mock" blocks are intentionally dim (0.15) context; fine on a monitor, so it's worth checking on the projector. |
| P2 | `fitStage` runs on stage entry and isn't recomputed on a live window resize (re-entering the stage refits it). |
| P3 | ★ / ✓ typographic marks kept (monochrome text glyphs, not emoji). |
| n/a | **Slide 02 not modified** (deferred). It still has 61 sub-12px labels and its own emoji. |
| n/a | Concept animations → Step 9. File deletions → Step 10. |

## Note on testing
The desktop app's browser pane was hidden, so GSAP was driven through the dev-only `window.__gsap` ticker hook for automated checks. CSS transitions don't advance while the pane is hidden: some screenshots showed navigator dots mid-transition, which I confirmed was a test artifact. Please do one live pass on the projector laptop (press **M** for full motion).
