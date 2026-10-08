import React from 'react';

export function TPUVisual() {
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
            <span>WEIGHT FLOW (VERTICAL FEED) ↓ ↓ ↓ ↓ ↓</span>
          </div>

          <div className="systolic-matrix">
            <div className="data-flow-left">
              <span>ACTIVATION FLOW →</span>
            </div>

            <div className="systolic-grid">
              {Array.from({ length: 36 }).map((_, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                return (
                  <div
                    key={i}
                    className="systolic-cell"
                    style={{
                      animationDelay: `${(row + col) * 0.12}s`
                    }}
                  >
                    <span className="cell-pulse" />
                    <span className="cell-arrow">↘</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="systolic-subtext">
            <span>DATA RHYTHMICALLY CASCADES ACROSS ADJACENT REGISTER CELLS</span>
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
