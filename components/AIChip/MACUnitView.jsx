import React from 'react';

export function MACUnitView({ mode = 'single' }) {
  // mode: 'single' (Stage 3) or 'parallel' (Stage 4)

  return (
    <div className="ac-mac-view-container">
      {mode === 'single' ? (
        /* Single Iconic MAC Unit (Stage 3) */
        <div className="single-mac-chassis">
          <div className="mac-chassis-top">
            <span className="mac-title">THE MULTIPLY–ACCUMULATE (MAC) HARDWARE ENGINE</span>
            <span className="mac-spec">THE FUNDAMENTAL ATOM OF AI ACCELERATION</span>
          </div>

          <div className="mac-datapath-layout">
            {/* Inputs Column */}
            <div className="mac-inputs-col">
              <div className="mac-input-node input-x">
                <span className="input-var">x</span>
                <span className="input-type">ACTIVATION</span>
              </div>
              <div className="mac-input-node input-w">
                <span className="input-var">w</span>
                <span className="input-type">WEIGHT</span>
              </div>
            </div>

            {/* Path into Multiplier */}
            <svg className="mac-bus-svg" width="80" height="120" viewBox="0 0 80 120">
              <line x1="10" y1="30" x2="70" y2="60" stroke="#27D7FF" strokeWidth="3" />
              <line x1="10" y1="90" x2="70" y2="60" stroke="#4B8DFF" strokeWidth="3" />
            </svg>

            {/* Hardware Multiplier Block */}
            <div className="mac-operator-node op-mult">
              <span className="op-symbol">×</span>
              <span className="op-name">MULTIPLIER</span>
              <span className="op-sub">x · w</span>
            </div>

            {/* Path Multiplier -> Accumulator */}
            <svg className="mac-bus-svg" width="70" height="60" viewBox="0 0 70 60">
              <line x1="10" y1="30" x2="60" y2="30" stroke="#57E6A5" strokeWidth="4" />
            </svg>

            {/* Hardware Accumulator Block */}
            <div className="mac-operator-node op-accum">
              <span className="op-symbol">Σ</span>
              <span className="op-name">ACCUMULATOR</span>
              <span className="op-sub">y + (x · w)</span>
            </div>

            {/* Path Accumulator -> Output */}
            <svg className="mac-bus-svg" width="70" height="60" viewBox="0 0 70 60">
              <line x1="10" y1="30" x2="60" y2="30" stroke="#27D7FF" strokeWidth="4" />
            </svg>

            {/* Output Register */}
            <div className="mac-output-node">
              <span className="output-var">y</span>
              <span className="output-type">ACCUMULATED RESULT</span>
            </div>
          </div>

          <div className="mac-equation-banner">
            <span className="eq-label">EQUATION:</span>
            <span className="eq-formula">y ← y + (x × w)</span>
          </div>

          <div className="ac-callout-pill accent-cyan">
            <span>ONE HARDWARE CLOCK CYCLE = ONE MULTIPLICATION + ONE ACCUMULATION</span>
          </div>
        </div>
      ) : (
        /* Parallel MAC Array (Stage 4) */
        <div className="parallel-mac-wrapper">
          <div className="parallel-mac-header">
            <span className="pm-title">PARALLEL MAC ARRAY (16 TILED COMPUTE ENGINES)</span>
            <span className="pm-sub">SCALING FROM 1 UNIT TO THOUSANDS</span>
          </div>

          <div className="parallel-mac-grid">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="mini-mac-block"
                style={{
                  animationDelay: `${(i % 4) * 0.1}s`
                }}
              >
                <div className="mini-mac-top">
                  <span className="mm-tag">MAC {String(i + 1).padStart(2, '0')}</span>
                  <span className="mm-pulse" />
                </div>
                <div className="mini-mac-math">
                  <span className="mm-mult">x{i}·w{i}</span>
                  <span className="mm-accum">+ Σ</span>
                </div>
              </div>
            ))}
          </div>

          <div className="parallel-stats-bar">
            <div className="p-stat">
              <span className="p-num">16</span>
              <span className="p-lbl">CONCURRENT MACs</span>
            </div>
            <div className="p-stat">
              <span className="p-num">32</span>
              <span className="p-lbl">OPS PER CYCLE</span>
            </div>
            <div className="p-stat">
              <span className="p-num">10,000+</span>
              <span className="p-lbl">PER MODERN AI CHIP</span>
            </div>
          </div>

          <div className="ac-callout-pill accent-blue">
            <span>MORE MACs IN PARALLEL = EXPONENTIALLY HIGHER TERAFLOPS</span>
          </div>
        </div>
      )}
    </div>
  );
}
