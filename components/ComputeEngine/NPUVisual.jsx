import React from 'react';

export function NPUVisual() {
  return (
    <div className="npu-visual-wrapper">
      <div className="chip-die-container npu-die">
        <div className="die-header">
          <span className="die-tag">DENSE NEURAL ENGINE ACCELERATOR DIE</span>
          <span className="die-freq">INT8 / FP16 TENSOR ENGINES • ZERO BUBBLE EXECUTION</span>
        </div>

        {/* Matrix Multiply Array */}
        <div className="npu-mac-array">
          <div className="matrix-input-label">WEIGHT & ACTIVATION MATRIX STREAM →</div>
          
          <div className="mac-grid">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="mac-cell"
                style={{
                  animationDelay: `${(i % 6) * 0.15 + Math.floor(i / 6) * 0.1}s`
                }}
              >
                <div className="mac-math">MAC</div>
                <div className="mac-formula">a·b+c</div>
              </div>
            ))}
          </div>

          <div className="matrix-output-label">→ ACCUMULATED TENSOR OUTPUT</div>
        </div>

        {/* Activation & Normalization pipeline */}
        <div className="npu-post-proc">
          <div className="proc-unit">GELU / RELU ACTIVATION ENGINE</div>
          <div className="proc-unit">QUANTIZATION SCALER</div>
        </div>
      </div>

      <div className="architecture-callout-strip">
        <div className="callout-pill accent-cyan">
          <span className="pill-dot" />
          <span>SPECIALIZATION: ZERO-OVERHEAD MATRIX MULTIPLICATION</span>
        </div>
        <div className="callout-pill">
          <span>TASK: LOW-POWER EDGE & EMBEDDED NEURAL INFERENCE</span>
        </div>
      </div>
    </div>
  );
}
