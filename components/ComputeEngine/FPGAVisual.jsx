import React from 'react';

export function FPGAVisual() {
  return (
    <div className="fpga-visual-wrapper">
      <div className="chip-die-container fpga-die">
        <div className="die-header">
          <span className="die-tag">RECONFIGURABLE LOGIC GATE ARRAY (FPGA)</span>
          <span className="die-freq">SRAM-BASED CONFIGURABLE LOGIC BLOCKS (CLB) + DSP SLICES</span>
        </div>

        {/* FPGA Fabric */}
        <div className="fpga-fabric">
          {/* Background wiring grid */}
          <div className="routing-grid-matrix">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`fpga-clb-tile tile-${i}`}>
                <div className="clb-core">
                  <span className="clb-label">LUT</span>
                </div>
                <div className="switch-box" />
              </div>
            ))}
          </div>

          {/* SVG Animated Custom Route */}
          <svg className="fpga-active-route-svg" viewBox="0 0 600 240">
            <defs>
              <filter id="purple-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Custom wired datapath */}
            <path
              className="programmed-wire wire-bg"
              d="M 45 45 H 180 V 110 H 315 V 175 H 480"
              fill="none"
              stroke="#581c87"
              strokeWidth="4"
            />
            <path
              className="programmed-wire wire-active"
              d="M 45 45 H 180 V 110 H 315 V 175 H 480"
              fill="none"
              stroke="#c084fc"
              strokeWidth="4"
              strokeDasharray="12 6"
              filter="url(#purple-glow)"
            />

            {/* Flashing nodes at the connection switchboxes */}
            <circle cx="45" cy="45" r="6" fill="#a855f7" />
            <circle cx="180" cy="45" r="5" fill="#c084fc" />
            <circle cx="180" cy="110" r="6" fill="#a855f7" />
            <circle cx="315" cy="110" r="5" fill="#c084fc" />
            <circle cx="315" cy="175" r="6" fill="#a855f7" />
            <circle cx="480" cy="175" r="7" fill="#e9d5ff" />
          </svg>
        </div>

        <div className="fpga-bitstream-status">
          <span className="bitstream-tag">BITSTREAM LOADED:</span>
          <span className="bitstream-spec">CUSTOM INT4 CONVOLUTION DATAPATH (ZERO CPU OVERHEAD)</span>
        </div>
      </div>

      <div className="architecture-callout-strip">
        <div className="callout-pill accent-purple">
          <span className="pill-dot" />
          <span>CONFIGURABILITY: YOU SHAPE THE PHYSICAL SILICON DATAPATH</span>
        </div>
        <div className="callout-pill">
          <span>TASK: BESPOKE HARDWARE ACCELERATION & CHIP EMULATION</span>
        </div>
      </div>
    </div>
  );
}
