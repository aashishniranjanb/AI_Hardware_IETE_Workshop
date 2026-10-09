# DECK UI/UX STANDARDIZATION REPORT
Date: 2026-10-09

## A. Icons — one Lucide icon per concept
**Root cause:** the same concept used different glyphs. A GPU appeared as both ⚡ and ▦, and memory as 💾, while warnings, notes and successes mixed emoji (⚠️ 💡 ✕) with Unicode (★ ✓ ➔ ↺).

**Fix:** `components/deck/GlyphIcon.jsx` is the single icon map, keyed by concept:

| Key | Lucide icon |
|---|---|
| `cpu` | Cpu |
| `gpu` | LayoutGrid |
| `npu` / `ai` | Brain |
| `fpga` | CircuitBoard |
| `memory` | MemoryStick |
| `storage` | HardDrive |
| `network` | Network |
| `pcie` | Plug |
| `nvlink` | Link2 |
| `noc` | Cable |
| `power` | BatteryCharging |
| `energy` | Zap |
| `warning` | AlertTriangle |
| `question` | HelpCircle |
| `paused` | Pause |
| `success` | CheckCircle2 |
| `note` | Star |
| `next` | ArrowRight |

- **Legacy glyph keys** map to the same icons, and every call site now passes semantic keys.
- **Data Highway:** nodes and tiers use `cpu/gpu/memory/storage/network/fpga` and `noc/nvlink/pcie/network`, so every GPU on Slide 06 has the same icon.
- **Slide 02:** gets its own one-icon-per-subsystem map (`subsystemIcons.jsx`) for cards, pills and the drawer.
- **Slide 04:** the arrival engine tiles use Cpu / LayoutGrid / Brain / Grid3x3 / CircuitBoard.
- **Running text:** ★ notes, ✓ checks and ➔ arrows in View files became inline Lucide icons (`InlineIcon`).
- **Result:** no emoji or decorative Unicode symbols remain as icons in any scene source. A scan finds only the mapping table itself.

## B. Colour system
- **`app/tokens.css` extended** with:
  - extra tokens: `--c-sky-2`, `--c-cyan-2`, `--c-violet`, `--c-violet-2`, `--c-red`, `--c-muted-2`, `--c-text-2`;
  - **semantic roles:**

    | Role | Token |
    |---|---|
    | active | sky |
    | data | cyan |
    | ai | violet |
    | success | green |
    | warning | amber |
    | error | red |
- **1,053 colour literals** in scene CSS were replaced by `var(--c-*)`. These are the 21 most-used hex values: backgrounds, panels, borders, text and the cyan/sky/blue/green/amber/violet accents. Values are identical, so there is no visual change, except that #F8FAFC was merged into the text token #F4F7FA (imperceptible).
- **165 rare one-off hex shades remain** in scene CSS (mostly dark tints such as #082F49 and #1C1204). They're listed for the next pass rather than force-mapped.
- **JSX `fill`/`stroke` attribute colours are unchanged.** CSS variables don't apply inside SVG presentation attributes.

## C. Typography
- **Scene title contract** (`app/ui.css`) for Slides 04–17: Space Grotesk 800, 40px, −0.03em, line-height 1.05.

  | Slides | Before |
  |---|---|
  | 04, 06, 07, 08 | 43.7px |
  | 05, 09 | 40px |
  | 10–14 | 38px |
  | 15–17 | 38.4px **system font, weight 900** |

  Slide 07's title no longer wraps.
- **Header inset** aligned to 50px on Slides 04, 06, 15, 16 and 17 (was 60 or 64).
- **Type floor** (from Step 8) extended to Slide 02.

## D. Layout / components / states
- **Slide 02:** cards, pills and buttons now have `:hover`, `:focus-visible` and `aria-pressed` states, and the primary button has a visible disabled state during the scan (see `SLIDE02_EXPLORE_REPAIR_REPORT.md`).
- **CSS vs GSAP ownership:** GSAP now owns opacity/transform on Slides 03 and 04 (the CSS transitions that fought it were removed).
- **StageNavigator:** label bug fixed on Slide 04 (it showed raw stage ids).

## E. Technical diagrams
- **Slide 02:** leader lines are now solid, pixel-accurate SVG paths attached to the real parts (were dashed lines with wrong targets).
- **Slide 03:** connections keep their existing solid paths and arrowheads; hover dimming now works (wrong selector fixed).

## Files
- `app/tokens.css`, `app/ui.css`
- `components/deck/GlyphIcon.jsx`
- Data Highway: `DataHighwayScene.jsx`, `DataNode.jsx`, `GPUCluster.jsx`, `NetworkVisual.jsx`, `dataHighwayData.js`
- `components/ComputeEngine/ComputeObject.jsx`
- Memory Problem: `ComputeUnit.jsx`, `MemoryHierarchy.jsx`, `MemoryProblemScene.jsx`, `WaitingGame.jsx`
- Blackwell: `MultiGPUView.jsx`, `SingleGPUView.jsx`
- View files: AIAccelerator, FirstFPGAProgram, FPGASetup, RTLBuild
- `components/Chitti/*`
- All scene CSS files (token replacement)

## Not done in this pass
- The remaining 165 rare hex shades are not tokenised.
- Panel and card class families are not yet migrated to `.ui-panel` (they share tokens now, but still have their own class names).
- Per-slide concept animations (Step 9) and file deletions (Step 10) are out of scope.
