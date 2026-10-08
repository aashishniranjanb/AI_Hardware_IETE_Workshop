import React from 'react';

export function MatrixEngineView({ isTensorEngine = false }) {
  return (
    <div className="ac-matrix-view-container">
      {!isTensorEngine ? (
        /* Stage 5: Educational 2x2 Matrix Multiplication */
        <div className="ac-matrix-math-chassis">
          <div className="matrix-chassis-top">
            <span className="mat-title">MATRIX MULTIPLICATION (THE LANGUAGE OF AI)</span>
            <span className="mat-sub">ROW × COLUMN DOT PRODUCTS PROCESSED IN PARALLEL</span>
          </div>

          <div className="matrix-equation-row">
            {/* Input Matrix A */}
            <div className="matrix-bracket-box matrix-a">
              <span className="matrix-header-name">INPUT ACTIVATIONS [X]</span>
              <div className="matrix-2x2-grid">
                <span className="mat-cell highlight-row">x₁</span>
                <span className="mat-cell highlight-row">x₂</span>
                <span className="mat-cell">x₃</span>
                <span className="mat-cell">x₄</span>
              </div>
            </div>

            <span className="matrix-operator-sym">×</span>

            {/* Weight Matrix W */}
            <div className="matrix-bracket-box matrix-w">
              <span className="matrix-header-name">WEIGHT MATRIX [W]</span>
              <div className="matrix-2x2-grid">
                <span className="mat-cell highlight-col">w₁</span>
                <span className="mat-cell">w₂</span>
                <span className="mat-cell highlight-col">w₃</span>
                <span className="mat-cell">w₄</span>
              </div>
            </div>

            <span className="matrix-operator-sym">=</span>

            {/* Output Matrix Y */}
            <div className="matrix-bracket-box matrix-y">
              <span className="matrix-header-name">RESULT TENSOR [Y]</span>
              <div className="matrix-2x2-grid">
                <span className="mat-cell highlight-result">y₁ = x₁w₁ + x₂w₃</span>
                <span className="mat-cell">y₂ = x₁w₂ + x₂w₄</span>
                <span className="mat-cell">y₃ = x₃w₁ + x₄w₃</span>
                <span className="mat-cell">y₄ = x₃w₂ + x₄w₄</span>
              </div>
            </div>
          </div>

          <div className="matrix-dot-product-explanation">
            <span className="dot-label">EACH OUTPUT ELEMENT IS A DOT PRODUCT:</span>
            <span className="dot-formula">y₁ = (x₁ · w₁) + (x₂ · w₃)  ← PROCESSED BY PARALLEL MACs</span>
          </div>

          <div className="ac-callout-pill accent-cyan">
            <span>MATRIX MULTIPLICATION = THOUSANDS OF DOT-PRODUCT MAC OPERATIONS</span>
          </div>
        </div>
      ) : (
        /* Stage 6: Specialized Tensor / Matrix Engine */
        <div className="ac-tensor-engine-chassis">
          <div className="tensor-engine-top">
            <span className="te-title">SPECIALIZED TENSOR / MATRIX ENGINE</span>
            <span className="te-sub">HARDWARE ACCELERATION FOR 4×4 / 16×16 MATRIX TILES</span>
          </div>

          <div className="tensor-systolic-flow">
            {/* Input Stream Left */}
            <div className="stream-bay stream-inputs">
              <span className="stream-tag">MATRIX A (ACTIVATIONS) →</span>
              <div className="stream-blocks">
                <span className="stream-data-chunk">A[0,:]</span>
                <span className="stream-data-chunk">A[1,:]</span>
                <span className="stream-data-chunk">A[2,:]</span>
              </div>
            </div>

            {/* Central Hardware Systolic Matrix Array */}
            <div className="tensor-hardware-core">
              <div className="core-grid-4x4">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <div key={idx} className="systolic-mac-cell">
                    <span className="smc-label">MAC</span>
                    <span className="smc-dot" />
                  </div>
                ))}
              </div>
              <div className="core-hardware-label">SYSTOLIC MAC GRID (16 PE UNITS)</div>
            </div>

            {/* Output Stream Right */}
            <div className="stream-bay stream-outputs">
              <span className="stream-tag">→ ACCUMULATED TENSOR C</span>
              <div className="stream-blocks">
                <span className="stream-data-chunk chunk-out">C[0,:]</span>
                <span className="stream-data-chunk chunk-out">C[1,:]</span>
                <span className="stream-data-chunk chunk-out">C[2,:]</span>
              </div>
            </div>
          </div>

          <div className="ac-callout-pill accent-purple">
            <span>TENSOR CORES EXECUTE ENTIRE MATRIX MULTIPLICATIONS IN A SINGLE HARDWARE PASS</span>
          </div>
        </div>
      )}
    </div>
  );
}
