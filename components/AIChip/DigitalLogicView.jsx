import React from 'react';

export function DigitalLogicView({ isGateLevel = false }) {
  return (
    <div className="ac-digital-logic-container">
      {!isGateLevel ? (
        /* Stage 7: Zoom to Digital Logic Blocks (Decomposing the MAC) */
        <div className="ac-decomposed-mac-chassis">
          <div className="decomp-header">
            <span className="decomp-title">DECOMPOSING THE MAC INTO DIGITAL CIRCUITS</span>
            <span className="decomp-sub">INSIDE THE ARITHMETIC LOGIC UNIT (ALU)</span>
          </div>

          <div className="decomp-blocks-row">
            {/* Multiplier Circuit */}
            <div className="decomp-circuit-card">
              <span className="circuit-name">BOOTH MULTIPLIER / WALLACE TREE</span>
              <div className="circuit-internals">
                <span className="c-item">PARTIAL PRODUCT GENERATION</span>
                <span className="c-item">CARRY-SAVE ADDER (CSA) ARRAY</span>
              </div>
              <span className="circuit-tag">x × w</span>
            </div>

            <span className="decomp-connector-plus">+</span>

            {/* Adder Tree Circuit */}
            <div className="decomp-circuit-card">
              <span className="circuit-name">CARRY-LOOKAHEAD ADDER (CLA)</span>
              <div className="circuit-internals">
                <span className="c-item">CARRY PROPAGATE / GENERATE</span>
                <span className="c-item">SUM ACCUMULATION LOGIC</span>
              </div>
              <span className="circuit-tag">Σ ACCUMULATOR</span>
            </div>

            <span className="decomp-connector-arrow">→</span>

            {/* D Flip-Flop Register Array */}
            <div className="decomp-circuit-card">
              <span className="circuit-name">D FLIP-FLOP REGISTERS</span>
              <div className="circuit-internals">
                <span className="c-item">SYNCHRONOUS CLOCK CYCLE</span>
                <span className="c-item">SRAM LOCAL STORAGE BITS</span>
              </div>
              <span className="circuit-tag">LATCH OUTPUT (y)</span>
            </div>
          </div>

          <div className="decomp-question-banner">
            <span className="q-label">HOW DO THESE CIRCUITS PERFORM MATH?</span>
            <span className="q-ans">THEY ARE BUILT ENTIRELY FROM LOGIC GATES.</span>
          </div>

          <div className="ac-callout-pill accent-cyan">
            <span>EVERY MULTIPLIER AND ADDER IS BUILT FROM SIMPLE DIGITAL LOGIC GATES</span>
          </div>
        </div>
      ) : (
        /* Stage 8: Logic Gate Level (AND, OR, NOT, XOR with 0s & 1s) */
        <div className="ac-gate-level-chassis">
          <div className="gate-chassis-header">
            <span className="gate-title">UNDERNEATH IT ALL: DIGITAL LOGIC GATES</span>
            <span className="gate-sub">COMBINING BINARY 0s AND 1s TO PERFORM ADDITION</span>
          </div>

          <div className="gate-cards-grid">
            {/* AND Gate */}
            <div className="logic-gate-card">
              <div className="gate-symbol-box">AND (•)</div>
              <div className="gate-truth-mini">
                <span>0 • 0 = 0</span>
                <span>0 • 1 = 0</span>
                <span>1 • 0 = 0</span>
                <span className="true-row">1 • 1 = 1</span>
              </div>
              <span className="gate-role-pill">CARRIES (C = A · B)</span>
            </div>

            {/* OR Gate */}
            <div className="logic-gate-card">
              <div className="gate-symbol-box">OR (+)</div>
              <div className="gate-truth-mini">
                <span>0 + 0 = 0</span>
                <span className="true-row">0 + 1 = 1</span>
                <span className="true-row">1 + 0 = 1</span>
                <span className="true-row">1 + 1 = 1</span>
              </div>
              <span className="gate-role-pill">COMBINATIONS</span>
            </div>

            {/* XOR Gate */}
            <div className="logic-gate-card highlight-xor">
              <div className="gate-symbol-box">XOR (⊕)</div>
              <div className="gate-truth-mini">
                <span>0 ⊕ 0 = 0</span>
                <span className="true-row">0 ⊕ 1 = 1</span>
                <span className="true-row">1 ⊕ 0 = 1</span>
                <span>1 ⊕ 1 = 0</span>
              </div>
              <span className="gate-role-pill">BINARY SUM (S = A ⊕ B)</span>
            </div>

            {/* NOT Gate */}
            <div className="logic-gate-card">
              <div className="gate-symbol-box">NOT (¬)</div>
              <div className="gate-truth-mini">
                <span className="true-row">¬ 0 = 1</span>
                <span>¬ 1 = 0</span>
              </div>
              <span className="gate-role-pill">INVERSION</span>
            </div>
          </div>

          {/* Half Adder / Full Adder realization box */}
          <div className="half-adder-realization-box">
            <span className="ha-title">THE 1-BIT BINARY ADDER CIRCUIT:</span>
            <div className="ha-formula-strip">
              <span className="ha-step">SUM = A ⊕ B (XOR GATE)</span>
              <span className="ha-sep">•</span>
              <span className="ha-step">CARRY = A · B (AND GATE)</span>
            </div>
          </div>

          <div className="ac-callout-pill accent-green">
            <span>TWO GATES PERFORM 1-BIT ADDITION. REPEAT THIS A BILLION TIMES = AN AI ACCELERATOR.</span>
          </div>
        </div>
      )}
    </div>
  );
}
