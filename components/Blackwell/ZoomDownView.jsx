import React from 'react';

export function ZoomDownView() {
  return (
    <div className="bw-zoomdown-container">
      <div className="zoomdown-card-box">
        <div className="zoomdown-header">
          <span className="zoom-tag">THE CRITICAL QUESTION</span>
          <h2 className="zoom-heading">WHAT ACTUALLY DOES THE MATH?</h2>
        </div>

        {/* Conceptual Open Compute Tile */}
        <div className="opened-compute-tile">
          <div className="tile-ambient-glow" />
          
          <div className="tile-chip-frame">
            <div className="tile-core-title">TENSOR CORE COMPUTE ENGINE</div>

            {/* Arithmetic Matrix Multiply Accumulate Visual */}
            <div className="mac-operation-display">
              <div className="operand-box">
                <span className="op-matrix">[ A ]</span>
                <span className="op-label">ACTIVATIONS</span>
              </div>

              <span className="math-operator">×</span>

              <div className="operand-box">
                <span className="op-matrix">[ B ]</span>
                <span className="op-label">WEIGHTS</span>
              </div>

              <span className="math-operator">+</span>

              <div className="operand-box">
                <span className="op-matrix">[ C ]</span>
                <span className="op-label">BIAS</span>
              </div>

              <span className="math-operator">=</span>

              <div className="operand-box result-box">
                <span className="op-matrix result-val">[ RESULT ]</span>
                <span className="op-label">ACCUMULATOR</span>
              </div>
            </div>

            {/* Logic gate representation underneath */}
            <div className="logic-gates-preview">
              <span className="gate-pill">FLOATING-POINT MULTIPLIER</span>
              <span className="gate-pill">ADDER TREE</span>
              <span className="gate-pill">ACCUMULATOR REGISTERS</span>
              <span className="gate-pill">SRAM CACHE</span>
            </div>
          </div>
        </div>

        <div className="zoomdown-hierarchy-ladder">
          <span className="ladder-step">GPU</span>
          <span className="ladder-arrow">→</span>
          <span className="ladder-step highlight-cyan">TENSOR CORE</span>
          <span className="ladder-arrow">→</span>
          <span className="ladder-step highlight-blue">MAC ENGINE</span>
          <span className="ladder-arrow">→</span>
          <span className="ladder-step highlight-purple">LOGIC GATES</span>
          <span className="ladder-arrow">→</span>
          <span className="ladder-step highlight-green">TRANSISTORS</span>
        </div>

        <div className="zoomdown-next-action-pill">
          <span>PRESS</span>
          <kbd>SPACE / →</kbd>
          <span>TO DIVE INSIDE: TRANSISTORS & LOGIC GATES</span>
        </div>
      </div>
    </div>
  );
}
