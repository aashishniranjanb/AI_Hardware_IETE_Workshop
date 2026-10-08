import React from 'react';

export function HBMVisual({ isFeeding = true }) {
  return (
    <div className="hbm-visual-container">
      <div className="hbm-interposer-substrate">
        <div className="interposer-header">
          <span className="interposer-label">SILICON INTERPOSER (2.5D PACKAGING)</span>
          <span className="hbm-spec-pill">HBM3e • 8,192-BIT ULTRA-WIDE BUS</span>
        </div>

        {/* 4 Stacked 3D DRAM Cubes */}
        <div className="hbm-stacks-row">
          {[0, 1, 2, 3].map((stackIdx) => (
            <div key={stackIdx} className="hbm-stack-cube">
              <div className="cube-top-label">STACK 0{stackIdx + 1}</div>

              {/* 3D Stacked Silicon Layers (TSV) */}
              <div className="cube-layers">
                {['DIE 8 (TOP)', 'DIE 7', 'DIE 6', 'DIE 5', 'DIE 4', 'DIE 3', 'DIE 2', 'DIE 1 (BASE)'].map(
                  (layer, layerIdx) => (
                    <div
                      key={layerIdx}
                      className={`dram-layer ${layerIdx === 7 ? 'base-logic-layer' : ''}`}
                    >
                      <span className="tsv-dot" />
                      <span className="layer-tag">{layer}</span>
                      <span className="tsv-dot" />
                    </div>
                  )
                )}
              </div>

              {/* Microbumps connecting to interposer */}
              <div className="microbumps-row">
                {Array.from({ length: 6 }).map((_, b) => (
                  <span key={b} className="microbump" />
                ))}
              </div>

              <div className="cube-capacity-tag">24 GB 3D DRAM</div>
            </div>
          ))}
        </div>

        {/* High-speed wide traces feeding towards compute */}
        <div className={`hbm-wide-interconnect ${isFeeding ? 'feeding-active' : ''}`}>
          <div className="interconnect-bus-lanes">
            {Array.from({ length: 16 }).map((_, lane) => (
              <span key={lane} className="bus-lane-wire" />
            ))}
          </div>
          <span className="bus-bandwidth-label">
            {isFeeding ? '▲ 3.2 TB/s MASSIVE PARALLEL DATA STREAM ▲' : 'IDLE INTERCONNECT'}
          </span>
        </div>
      </div>
    </div>
  );
}
