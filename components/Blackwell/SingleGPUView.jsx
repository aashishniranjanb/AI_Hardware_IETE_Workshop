import React from 'react';
import { InlineIcon } from '../deck/GlyphIcon';

export function SingleGPUView({ showMemory = false }) {
  return (
    <div className="bw-single-gpu-container">
      {/* Outer Package Substrate */}
      <div className="bw-package-substrate">
        <div className="bw-sub-header">
          <span className="bw-chip-title">NVIDIA BLACKWELL DUAL-DIE ARCHITECTURE</span>
          <span className="bw-chip-spec">208B TRANSISTORS • 10 TB/s NV-HBI CHIP-TO-CHIP</span>
        </div>

        {/* Silicon Die Area */}
        <div className="bw-silicon-assembly">
          {/* Left HBM stacks (4 stacks) */}
          <div className={`bw-hbm-flank flank-left ${showMemory ? 'active-memory' : ''}`}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bw-hbm-stack">
                <span className="hbm-tag">HBM 0{i + 1}</span>
                <span className="hbm-cap">24GB</span>
              </div>
            ))}
          </div>

          {/* Central Dual Die with NV-HBI Bridge */}
          <div className="bw-dual-die-core">
            {/* Left Compute Die */}
            <div className="bw-die-half die-a">
              <div className="die-label">COMPUTE DIE 01</div>
              <div className="die-core-grid">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <span key={idx} className="die-sm-core" />
                ))}
              </div>
              <span className="die-subtext">SMs • TENSOR CORES</span>
            </div>

            {/* NV-HBI High-Density Die-to-Die Interconnect Bridge */}
            <div className="bw-nvhbi-bridge">
              <span className="bridge-arrow">◀</span>
              <div className="bridge-lines">
                <span className="b-line" />
                <span className="b-line" />
                <span className="b-line" />
              </div>
              <span className="bridge-text">NV-HBI (10 TB/s)</span>
              <div className="bridge-lines">
                <span className="b-line" />
                <span className="b-line" />
                <span className="b-line" />
              </div>
              <span className="bridge-arrow">▶</span>
            </div>

            {/* Right Compute Die */}
            <div className="bw-die-half die-b">
              <div className="die-label">COMPUTE DIE 02</div>
              <div className="die-core-grid">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <span key={idx} className="die-sm-core" />
                ))}
              </div>
              <span className="die-subtext">SMs • TENSOR CORES</span>
            </div>
          </div>

          {/* Right HBM stacks (4 stacks) */}
          <div className={`bw-hbm-flank flank-right ${showMemory ? 'active-memory' : ''}`}>
            {[4, 5, 6, 7].map((i) => (
              <div key={i} className="bw-hbm-stack">
                <span className="hbm-tag">HBM 0{i + 1}</span>
                <span className="hbm-cap">24GB</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom NVLink High-Speed Interface Pins */}
        <div className="bw-nvlink-pins-bar">
          <span className="pin-bus-label">5th GEN NVLINK PORT (1.8 TB/s BIDIRECTIONAL)</span>
          <div className="pin-gold-traces">
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} className="gold-pin" />
            ))}
          </div>
        </div>
      </div>

      {showMemory && (
        <div className="bw-callout-badge accent-cyan">
          <span><InlineIcon glyph="⚡" /> 192 GB TOTAL HBM3e CAPACITY @ 8.0 TB/s ULTRA-WIDE BANDWIDTH</span>
        </div>
      )}
    </div>
  );
}
