# STEP 9 — CONCEPT-SPECIFIC ANIMATIONS REPORT
Date: 2026-10-09

**How I tested:** the app's browser pane was hidden, so GSAP was driven by the dev-only ticker hook. Behaviour was verified by sampling live DOM values over time plus still screenshots at 1366×768 (and a 1920×1080 overflow check). Real-time smoothness still needs one look on the presentation machine (press **M** for full motion).

---

## 1. Slide 06 — Data Highway
**Before:** packets were SVG SMIL `<animateMotion>` loops. They never stopped at a destination, ignored reduced motion and ran outside GSAP. They used `filter="url(#dh-packet-glow)"`, which only exists inside two of the SVGs. The PCIe stage had no paths at all (a CSS bar).

**Implemented:**
- **`ConnectionPath.jsx` rewritten.** Each packet is a GSAP timeline moving along the wire's real geometry (`getPointAtLength`):
  - it waits for the shared stage draw-in (0.9s);
  - it travels source → destination at a speed per link class (fast / medium / slow);
  - it fades on arrival while an **arrival ring** pulses at the destination;
  - it repeats after a 0.7s pause.
- **Reverse packets** (reads) arrive back at the source end.
- **Reduced motion:** the packet is shown stationary at its destination.
- **Cleanup:** `gsap.context` per connection, reverted on unmount.
- **Glow** is a CSS drop-shadow (no missing-filter references).
- **`PcieRoutes.jsx` (new):** PCIe routes measured from the live layout:
  - NVMe → backbone → HOST CPU (storage read);
  - 400G NIC → backbone → AI GPU (network data into the accelerator);
  - short stubs from every device to the backbone;
  - the route rides the bar's lower edge so it never strikes through the label.
- **Network:** the second hop (switch → server 2) is delayed to start exactly when the first packet reaches the switch, making it one end-to-end transfer.
- **Coverage:** compute↔memory (entry / single / lanes), PCIe, GPU↔GPU NVLink (dual / quad mesh) and system networking all use the same mechanism.

**Files:** `components/DataHighway/ConnectionPath.jsx`, `PcieRoutes.jsx` (new), `DataHighwayScene.jsx`, `NetworkVisual.jsx`, `DataHighway.css`.

**Tests (actual):**

| Test | Result |
|---|---|
| Single link, 22 samples | waits ~0.9s, then (200,10) → (200,110) exactly on the path, fades at the destination, pauses, repeats |
| PCIe | both routes measured; packets sampled on the bus segment (y = 159 vs route y = 159) and on the vertical rise |
| NVLink | packets on the y = 80 wire |
| Network | hop 1 and hop 2 packets on their links |
| Leak check | 15 active animations before and after 12 stage re-entries |
| Reduced motion | packet static at (200,110) |
| Overflow | 1366 and 1920: 0 |

**Remaining:** packets on the dashed/legacy decorative bus graphics outside `ConnectionPath` (if any) are unchanged.

## 2. Slide 09 — Programmable Logic (switch matrix)
**Before:** switch states recoloured whole tracks arbitrarily, with no notion of a route or of configuration.

**Implemented:** `SwitchMatrixConfig.jsx` (new) is a 3×3 routing-track grid with a programmable switch at every crossing.
1. **Unconfigured:** all switches open, tracks subdued.
2. **Bitstream loads:** bits stream into "CONFIGURATION MEMORY". The note reads: *a real bitstream holds ~100,000+ bits configuring LUTs, routing and I/O; shown here: only the 2 routing switches this path needs*. This avoids implying one bit = one switch.
3. **Switches close:** the two route switches close one by one (pulse ring). The other 7 stay open and dim.
4. **Route active:** the IN → OUT route draws in, and a signal travels it repeatedly.

- Step list highlights the current phase.
- **Replay** restarts from unconfigured.
- **Manual toggle:** clicking or pressing Enter on switches toggles them. The route is lit **only** when both route switches are closed (correctness is preserved).
- **Ownership:** React owns switch state; GSAP only animates. No CSS transitions on animated attributes.

**Files:** `components/TransistorLogic/SwitchMatrixConfig.jsx` (new), `TransistorViews.jsx` (`Stage7SwitchMatrix` now renders it), `TransistorLogicScene.css`.

**Tests (actual):**

| Test | Result |
|---|---|
| Timed sequence | bits → (0,1) closes at ~2.1s → (2,1) at ~3.1s → ROUTE CONFIGURED → route dash offset 340 → 0 |
| Signal | sampled at (167, 190), on the final route segment |
| Open (2,1) | route undraws, status "ROUTE OPEN" |
| Close (2,1) | re-configured |
| Replay | resets and reconfigures |
| Re-entry | 4 re-entries, no leaked animations (13 → 4) |
| Reduced motion | configured instantly |
| Overflow | 1366 and 1920: 0 |
| Screenshot | 1366 configured state |

## 3. Slide 10 — Computation (ripple carry)
**Before:** CASCADE was static text (C0 → C1 …); the 4-bit stage listed Cin/Cout with no propagation.

**Implemented:** `RippleAdder.jsx` (new) with a `rippleAdd()` model; every bit is derived from A and B, with a self-check `value === a + b`.
- **Resolution order:** FA0 → FA3, each lighting up and showing its sum bit, then sending a carry token along the wire to the next stage (amber when 1, dim when 0).
- **Finish:** C4 OUT and the 5-bit result plus decimal value appear.
- **CASCADE:** uses 11 + 7, so a carry ripples through every stage.
- **4-BIT:** keeps its sliders; the chain restarts from scratch whenever A or B changes (no stale signals).
- **Replay** button.
- **Reduced motion:** final state immediately.

**Files:** `components/LogicComputation/RippleAdder.jsx` (new), `LogicViews.jsx` (`StageChainedAdders`, `StageFourBitAdder`), `LogicComputationScene.css`.

**Tests (actual):**

| Test | Result |
|---|---|
| Resolution order sampled | S0 → C1 → S1 → C2 → S2 → C3 → S3 → C4 |
| CASCADE final | 0010 + C4 = 1 → 11 + 7 = 18 = 10010₂ |
| 0 + 0 | 00000₂ |
| 15 + 15 | 11110₂ = 30 |
| 8 + 8 | 10000₂ = 16 |
| 9 + 6 | 01111₂ = 15 |
| 5 + 10 | 01111₂ = 15 |
| 7 + 1 | 01000₂ = 8 |
| Input change mid-animation | restarts |
| Forward/back stage navigation | fresh state each entry |
| Overflow | 1366 and 1920: 0 |
| Screenshots | CASCADE and 4-BIT final states |

## 4. Slide 15 — First FPGA Program (counter → LED)
**Before:**
- `setInterval` with React state per tick.
- The LED stage said "HARDWARE RUNNING • LED ACTIVE … driven in real time by … your physical silicon counter", and the header said "The physical LED flashes rhythmically on the VSDSquadron FPGA Mini" ("IT WORKS • SILICON ALIVE"). These are unverified claims about a browser simulation.
- The clock stage's 0–F counter with LED = bit 3 contradicted the shown code (`counter[23]`).

**Implemented:** `CounterLedDemo.jsx` (new), used by the CLOCK and LED stages.
- **Model:** a 6-bit counter with LED = MSB (b5).
- **Motion:** GSAP drives the count at 20 simulated edges/s and walks a marker along the clock waveform. The DOM is updated through refs (no `setInterval`, no per-tick React state).
- **Badge:** "CONCEPTUAL SIMULATION — not a live signal from the board".
- **Scale note:** the real design is 24-bit with `led = counter[23]`; at an example 12 MHz clock, bit 23 flips every 2²³ cycles ≈ 0.7s.
- **LED stage:**
  - a big LED driven by the same model;
  - "ON THE REAL BOARD: after `iceprog blinky.bin`, the LED should blink about every 0.7s … Check it on your board";
  - a presenter toggle **"Mark as verified on my board"**. The UI says "VERIFIED ON THE BOARD — presenter confirmed" only after a human confirms.
  - The stage header now reads "EXPECTED OUTPUT … Simulated here — check that the physical LED blinks" / "SIMULATED • VERIFY ON THE BOARD".
- **Reduced motion:** static snapshot (100101, LED on).

**Files:** `components/FirstFPGAProgram/CounterLedDemo.jsx` (new), `FirstFPGAProgramViews.jsx` (`StageClock`, `StageLED`), `firstFPGAData.js` (LED stage text only), `FirstFPGAProgramScene.css`.

**Tests (actual):**

| Test | Result |
|---|---|
| 30 samples | 0 mismatches (LED always = bit 5, decimal = bits), LED observed in both states, wraps at 64, marker moves |
| Verify toggle | switches text both ways |
| Leak check | after 10 re-entries, settled animations = 1 (the live counter of the visible stage) |
| Reduced motion | static |
| Overflow | 1366 and 1920: 0 |
| Screenshots | CLOCK and LED stages |

**Not verified:** whether the physical board LED blinks. That's left to the presenter toggle by design.

---

## Combined checks
- All 48 stages of Slides 06, 09, 10 and 15 at 1366×768: 0 out-of-frame, 0 control collisions, 0 runtime errors.
- `npm run build` ✅
- `npx tsc --noEmit` ✅
- Navigation engine, StageNavigator, 16:9 viewport, shared tokens and icon system unchanged. No files deleted; no slides added.
