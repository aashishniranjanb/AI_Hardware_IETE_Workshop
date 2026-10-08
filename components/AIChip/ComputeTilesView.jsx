import React from 'react';

export function ComputeTilesView({ isSingleCore = false }) {
  return (
    <div className="ac-tiles-view-container">
      {!isSingleCore ? (
        /* Stage 1: Multiple Modular Compute Tiles */
        <div className="ac-tiles-grid-wrapper">
          <div className="ac-tiles-banner">
            <span className="banner-tag">COMPUTE FLOORPLAN PARTITIONING</span>
            <span className="banner-sub">24 HIGH-PERFORMANCE ARITHMETIC REGIONS</span>
          </div>

          <div className="ac-tiles-matrix">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`ac-tile-cell ${i === 10 ? 'selected-tile-glow' : ''}`}
                style={{
                  animationDelay: `${(i % 6) * 0.1}s`
                }}
              >
                <div className="tile-cell-header">
                  <span className="tile-cell-id">TILE {String(i + 1).padStart(2, '0')}</span>
                  {i === 10 && <span className="target-indicator">TARGET</span>}
                </div>
                <div className="tile-cell-units">
                  <span className="sub-unit">TENSOR</span>
                  <span className="sub-unit">VECTOR</span>
                  <span className="sub-unit">SRAM</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ac-callout-pill accent-cyan">
            <span>INDEPENDENT TILES ACCESS LOCAL HIGH-SPEED L1/L2 CACHES SIMULTANEOUSLY</span>
          </div>
        </div>
      ) : (
        /* Stage 2: Inside 1 Compute Unit (Neural Network Math) */
        <div className="ac-single-core-wrapper">
          <div className="ac-core-chassis">
            <div className="core-chassis-header">
              <span className="core-title">INSIDE COMPUTE TILE 11: NEURAL ARITHMETIC ENGINE</span>
              <span className="core-tag">VECTOR & TENSOR PIPELINES</span>
            </div>

            {/* Neural Network Mathematical Pipeline */}
            <div className="neural-math-pipeline">
              <div className="pipeline-step-box">
                <span className="step-label">INPUT VECTORS</span>
                <div className="step-val-group">
                  <span className="val-tag">x₁: 0.85</span>
                  <span className="val-tag">x₂: -0.42</span>
                  <span className="val-tag">x₃: 1.20</span>
                </div>
              </div>

              <span className="pipeline-arrow">→</span>

              <div className="pipeline-step-box weights-box">
                <span className="step-label">STORED WEIGHTS</span>
                <div className="step-val-group">
                  <span className="val-tag weight">w₁: 0.50</span>
                  <span className="val-tag weight">w₂: 1.10</span>
                  <span className="val-tag weight">w₃: -0.30</span>
                </div>
              </div>

              <span className="pipeline-arrow">→</span>

              <div className="pipeline-step-box alu-box">
                <span className="step-label">MULTIPLY & ACCUMULATE</span>
                <div className="math-equation-display">
                  <span>y = (x₁·w₁) + (x₂·w₂) + (x₃·w₃)</span>
                </div>
                <span className="alu-status">Σ(wᵢ × xᵢ)</span>
              </div>

              <span className="pipeline-arrow">→</span>

              <div className="pipeline-step-box output-box">
                <span className="step-label">ACTIVATION OUTPUT</span>
                <span className="output-val">y = -0.40</span>
                <span className="act-func">GELU(y)</span>
              </div>
            </div>
          </div>

          <div className="ac-callout-pill accent-blue">
            <span>NEURAL NETWORKS = REPEATED WEIGHTED MULTIPLICATIONS AND ADDITIONS</span>
          </div>
        </div>
      )}
    </div>
  );
}
