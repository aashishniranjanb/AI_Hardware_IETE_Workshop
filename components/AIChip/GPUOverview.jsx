import React from 'react';

export function GPUOverview() {
  return (
    <div className="ac-gpu-overview-container">
      <div className="ac-package-chassis">
        <div className="ac-package-top-bar">
          <span className="ac-package-title">MASSIVE ACCELERATOR SILICON DIE</span>
          <span className="ac-package-metric">208B TRANSISTORS • 814 mm² × 2</span>
        </div>

        <div className="ac-floorplan-body">
          {/* Top Memory Controllers */}
          <div className="ac-flank-mem top-mem">
            <span className="mem-lane-tag">HBM3e MEMORY INTERFACE (4.0 TB/s)</span>
          </div>

          <div className="ac-die-middle-row">
            {/* Left I/O & Host Bus */}
            <div className="ac-bus-strip left-strip">
              <span>PCIe GEN 6</span>
            </div>

            {/* Central Compute Region (Target of zoom) */}
            <div className="ac-central-compute-block highlight-compute">
              <div className="compute-block-header">
                <span className="comp-title">CENTRAL COMPUTE REGION</span>
                <span className="comp-pulse-dot" />
              </div>
              <div className="compute-tiles-mini-grid">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span key={i} className="mini-tile-rect" />
                ))}
              </div>
              <span className="compute-label">160 STREAMING MULTIPROCESSOR REGIONS</span>
            </div>

            {/* Right NVLink Interconnect Bus */}
            <div className="ac-bus-strip right-strip">
              <span>NVLINK 5</span>
            </div>
          </div>

          {/* Bottom Memory Controllers */}
          <div className="ac-flank-mem bottom-mem">
            <span className="mem-lane-tag">HBM3e MEMORY INTERFACE (4.0 TB/s)</span>
          </div>
        </div>

        <div className="ac-package-pins-edge">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} className="gold-bga-ball" />
          ))}
        </div>
      </div>

      <div className="ac-callout-pill accent-cyan">
        <span>GPU = HUNDREDS OF MODULAR COMPUTE REGIONS OPERATING SIMULTANEOUSLY</span>
      </div>
    </div>
  );
}
