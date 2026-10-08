import React from 'react';

export function HierarchyChainView() {
  const chainSteps = [
    { label: "01. TRANSISTOR", sub: "PHYSICAL CMOS SWITCH", color: "#57E6A5" },
    { label: "02. LOGIC GATES", sub: "AND • OR • NOT • XOR", color: "#57E6A5" },
    { label: "03. BINARY ADDER", sub: "1-BIT TO 64-BIT ADDITION", color: "#27D7FF" },
    { label: "04. MULTIPLIER", sub: "PARTIAL PRODUCTS ARRAY", color: "#27D7FF" },
    { label: "05. MAC ENGINE", sub: "y ← y + (x × w)", color: "#4B8DFF" },
    { label: "06. TENSOR ENGINE", sub: "PARALLEL MATRIX SYSTOLIC ARRAY", color: "#4B8DFF" },
    { label: "07. GPU CHIP", sub: "208B TRANSISTORS • 192GB HBM3e", color: "#8A7CFF" },
    { label: "08. NVL72 RACK", sub: "72 GPUS • 5,184 NVLINK CABLES", color: "#8A7CFF" },
    { label: "09. AI SUPERCOMPUTER", sub: "DATA-CENTER MASSIVE COMPUTING", color: "#FFB84D" }
  ];

  return (
    <div className="ac-hierarchy-chain-container">
      <div className="chain-header-title">
        <h2 className="chain-main-title">FROM ONE TRANSISTOR TO AN AI SUPERCOMPUTER</h2>
        <p className="chain-subtitle">
          THE ENTIRE MACHINE IS BUILT BY REPEATING SIMPLE MATHEMATICAL CIRCUITS AT ENORMOUS SCALE
        </p>
      </div>

      {/* Vertical Interactive Ladder Chain */}
      <div className="chain-vertical-ladder">
        {chainSteps.map((step, idx) => (
          <div
            key={idx}
            className="ladder-step-bar"
            style={{
              borderColor: step.color,
              animationDelay: `${idx * 0.08}s`
            }}
          >
            <div className="step-bar-index" style={{ color: step.color }}>{step.label}</div>
            <div className="step-bar-sub">{step.sub}</div>
            {idx < chainSteps.length - 1 && <span className="step-connector-dot" />}
          </div>
        ))}
      </div>

      <div className="chain-climax-box">
        <div className="climax-statement">
          <span className="climax-strong">SIMPLE BUILDING BLOCKS.</span>
          <span className="climax-strong">MASSIVE SCALE.</span>
          <span className="climax-accent">THAT IS AI HARDWARE.</span>
        </div>
      </div>

      <div className="chain-next-action-pill">
        <span>READY TO MOVE FROM THEORY TO PRACTICE?</span>
        <kbd>SPACE / →</kbd>
        <span>NOW LET'S BUILD ONE: FROM LOGIC → RTL → FPGA</span>
      </div>
    </div>
  );
}
