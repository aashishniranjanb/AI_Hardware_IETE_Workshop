import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../deck/motion';

const N = 6; // 6×6 slice of the 128×128 MXU
const STEP = 0.32; // seconds per systolic clock tick

/*
 * Systolic dataflow, the way an MXU actually works:
 *  - activations enter from the LEFT, one row per tick, skewed by row;
 *  - weights enter from the TOP, one column per tick, skewed by column;
 *  - cell (r, c) performs its multiply-accumulate on the tick where both
 *    streams meet (tick r + c), producing the diagonal wavefront.
 * GSAP owns all motion (cells, tokens); reverted on unmount.
 */
export function TPUVisual() {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const q = gsap.utils.selector(grid);
    const cells = q('.systolic-cell');
    if (prefersReducedMotion()) {
      // Static wavefront snapshot: the anti-diagonal currently computing.
      cells.forEach((el) => {
        const s = +el.dataset.r + +el.dataset.c;
        el.classList.toggle('is-mac', s === N - 1);
        el.classList.toggle('is-done', s < N - 1);
      });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      const pass = (2 * N - 1) * STEP;
      // activation tokens: row r enters at tick r and crosses the whole row
      q('.sys-act').forEach((el) => {
        const r = +el.dataset.r;
        tl.fromTo(el, { left: '-14%', opacity: 1 }, { left: '100%', duration: (N + 1) * STEP, ease: 'none' }, r * STEP)
          .to(el, { opacity: 0, duration: 0.1 }, '>');
      });
      // weight tokens: column c enters at tick c and crosses the whole column
      q('.sys-wgt').forEach((el) => {
        const c = +el.dataset.c;
        tl.fromTo(el, { top: '-16%', opacity: 1 }, { top: '100%', duration: (N + 1) * STEP, ease: 'none' }, c * STEP)
          .to(el, { opacity: 0, duration: 0.1 }, '>');
      });
      // MAC fires where they meet: tick r + c (+1 so the tokens have arrived)
      cells.forEach((el) => {
        const t = (+el.dataset.r + +el.dataset.c + 1) * STEP;
        tl.fromTo(el,
          { backgroundColor: '#431407', borderColor: '#9A3412', boxShadow: '0 0 0px rgba(249,115,22,0)' },
          { backgroundColor: '#EA580C', borderColor: '#F97316', boxShadow: '0 0 14px rgba(249,115,22,0.7)', duration: STEP * 0.5, ease: 'power1.out' }, t)
          .to(el, { backgroundColor: '#7C2D12', borderColor: '#C2410C', boxShadow: '0 0 0px rgba(249,115,22,0)', duration: STEP * 1.2 }, t + STEP * 0.5);
      });
      // all partial sums done → reset for the next tile
      tl.to(cells, { backgroundColor: '#431407', borderColor: '#9A3412', duration: 0.3 }, pass + 2 * STEP);
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <div className="tpu-visual-wrapper">
      <div className="chip-die-container tpu-die">
        <div className="die-header">
          <span className="die-tag">SYSTOLIC TENSOR PROCESSING UNIT DIE</span>
          <span className="die-freq">128×128 SYSTOLIC MATRIX MULTIPLY UNIT (MXU)</span>
        </div>

        {/* Systolic Flow Area */}
        <div className="tpu-systolic-board">
          <div className="weight-flow-top">
            <span>WEIGHTS FLOW DOWN ↓ (one column per clock)</span>
          </div>

          <div className="systolic-matrix">
            <div className="data-flow-left">
              <span>ACTIVATIONS →</span>
            </div>

            <div className="systolic-grid" ref={gridRef}>
              {Array.from({ length: N * N }).map((_, i) => {
                const r = Math.floor(i / N);
                const c = i % N;
                return (
                  <div key={i} className="systolic-cell" data-r={r} data-c={c}>
                    <span className="cell-op">×+</span>
                  </div>
                );
              })}
              {/* streaming tokens (positioned in % of the grid) */}
              {Array.from({ length: N }).map((_, r) => (
                <span key={`a${r}`} className="sys-token sys-act" data-r={r} style={{ top: `${(r + 0.5) * (100 / N)}%` }} />
              ))}
              {Array.from({ length: N }).map((_, c) => (
                <span key={`w${c}`} className="sys-token sys-wgt" data-c={c} style={{ left: `${(c + 0.5) * (100 / N)}%` }} />
              ))}
            </div>
          </div>

          <div className="systolic-subtext">
            <span>EACH CELL MULTIPLY-ACCUMULATES WHEN ITS WEIGHT AND ACTIVATION MEET — A DIAGONAL WAVE</span>
          </div>
        </div>

        <div className="tpu-interconnect-bar">
          <div className="bus-label">OPTICAL CIRCUIT SWITCH (OCS) TENSOR NETWORK INTERFACE</div>
        </div>
      </div>

      <div className="architecture-callout-strip">
        <div className="callout-pill accent-amber">
          <span className="pill-dot" />
          <span>TENSOR WORKLOADS: HARDWARE SYSTOLIC STREAMING</span>
        </div>
        <div className="callout-pill">
          <span>TASK: GIANT SCALE TRANSFORMER MATRIX COMBINATORICS</span>
        </div>
      </div>
    </div>
  );
}
