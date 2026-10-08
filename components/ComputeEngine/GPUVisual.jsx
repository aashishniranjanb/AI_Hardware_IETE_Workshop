import React from 'react';

export function GPUVisual() {
  return (
    <div className="gpu-visual-wrapper">
      <div className="chip-die-container gpu-die">
        <div className="die-header">
          <span className="die-tag">SIMD / STREAMING MULTIPROCESSOR DIE</span>
          <span className="die-freq">4,096 CORES • HIGH-BANDWIDTH PARALLEL FABRIC</span>
        </div>

        {/* Streaming Multiprocessors layout */}
        <div className="gpu-sm-container">
          {[0, 1, 2, 3].map((smIndex) => (
            <div key={smIndex} className="gpu-sm-cluster">
              <div className="sm-title">SM CLUSTER 0{smIndex + 1}</div>
              <div className="gpu-cores-matrix">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="gpu-sub-core"
                    style={{
                      animationDelay: `${(smIndex * 32 + i) * 0.02}s`
                    }}
                  >
                    <span className="core-pip" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Global Memory Crossbar */}
        <div className="gpu-crossbar">
          <div className="bus-label">ULTRA-WIDE HBM3 MEMORY CROSSBAR CONTROLLER</div>
          <div className="crossbar-activity-bar" />
        </div>
      </div>

      <div className="architecture-callout-strip">
        <div className="callout-pill accent-blue">
          <span className="pill-dot" />
          <span>PARALLELISM: THOUSANDS OF THREADS EXECUTING SIMULTANEOUSLY</span>
        </div>
        <div className="callout-pill">
          <span>TASK: HIGH-THROUGHPUT BATCH WORKLOADS</span>
        </div>
      </div>
    </div>
  );
}
