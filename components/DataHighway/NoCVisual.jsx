import React from 'react';

export function NoCVisual() {
  return (
    <div className="noc-visual-container">
      <div className="noc-silicon-die-package">
        <div className="noc-die-header">
          <span className="die-label">ON-CHIP SILICON DIE (NoC TOPOLOGY)</span>
          <span className="die-spec">2D PACKET-SWITCHED MESH ROUTERS • ~15 TB/s ON-DIE FABRIC</span>
        </div>

        {/* 4x4 Grid of NoC Tiles */}
        <div className="noc-mesh-grid">
          {Array.from({ length: 16 }).map((_, i) => {
            const isCompute = [0, 1, 4, 5, 8, 9, 12, 13].includes(i);
            const isCache = [2, 6, 10, 14].includes(i);
            const isMemIO = [3, 7, 11, 15].includes(i);

            return (
              <div key={i} className="noc-tile-node">
                {/* Router in center */}
                <div className="noc-router-box">
                  <span className="router-core" />
                  <span className="router-label">R{i}</span>
                </div>

                {/* Subsystem attached to this router */}
                <div className={`tile-subsystem ${isCompute ? 'sub-compute' : isCache ? 'sub-cache' : 'sub-mem'}`}>
                  <span className="sub-tag">
                    {isCompute ? 'COMPUTE' : isCache ? 'L3 CACHE' : 'MEM CTRL'}
                  </span>
                </div>

                {/* Internal wiring crosses */}
                <div className="noc-inter-router-wire horizontal" />
                <div className="noc-inter-router-wire vertical" />
              </div>
            );
          })}
        </div>

        <div className="noc-footer-status">
          <span className="noc-badge">LOW LATENCY: &lt; 3 ns</span>
          <span className="noc-desc">
            NoC replaces long point-to-point buses with modular packet-switched routing on the chip.
          </span>
        </div>
      </div>
    </div>
  );
}
