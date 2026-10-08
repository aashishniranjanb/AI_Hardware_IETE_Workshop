import React from 'react';

export function CPUVisual() {
  return (
    <div className="cpu-visual-wrapper">
      <div className="chip-die-container">
        {/* Die substrate & heatspreader bevel */}
        <div className="die-header">
          <span className="die-tag">64-BIT OUT-OF-ORDER PROCESSOR DIE</span>
          <span className="die-freq">4.8 GHz • L1/L2/L3 HIERARCHY</span>
        </div>

        {/* Cores Grid */}
        <div className="cpu-cores-grid">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className={`cpu-core-unit core-${idx}`}>
              <div className="core-glow-border" />
              <div className="core-header">
                <span className="core-name">CORE {idx}</span>
                <span className="core-type">PERF</span>
              </div>
              
              {/* Internal micro-architecture blocks */}
              <div className="core-internals">
                <div className="core-alu-block">
                  <span className="micro-label">ALU / FPU</span>
                  <div className="alu-pulse-bar" />
                </div>
                <div className="core-cache-block">
                  <span className="micro-label">L1 / L2 CACHE</span>
                </div>
              </div>

              {/* Task packet dot */}
              <div className={`task-packet-indicator packet-${idx % 3}`} />
            </div>
          ))}
        </div>

        {/* Shared L3 Cache Bus */}
        <div className="cpu-l3-bus">
          <div className="bus-label">SHARED 32MB L3 CACHE + INTERCONNECT RING</div>
          <div className="bus-traces">
            <span className="trace" />
            <span className="trace" />
            <span className="trace" />
            <span className="trace" />
          </div>
        </div>
      </div>

      <div className="architecture-callout-strip">
        <div className="callout-pill accent-cyan">
          <span className="pill-dot" />
          <span>FLEXIBILITY: ANY ALGORITHM, ANY BRANCH, LOW LATENCY</span>
        </div>
        <div className="callout-pill">
          <span>TASK: 1 COMPLEX PIPELINE AT A TIME</span>
        </div>
      </div>
    </div>
  );
}
