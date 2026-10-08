import React from 'react';

export function Scale72View() {
  return (
    <div className="bw-scale72-container">
      <div className="scale72-badge-bar">
        <span className="badge-pulsing-dot" />
        <span>72-GPU UNIFIED NVLINK FABRIC DOMAIN (GB200 NVL72)</span>
        <span className="badge-stat">130 TB/s TOTAL BIDI BANDWIDTH</span>
      </div>

      {/* 8 rows x 9 columns = 72 GPU Node Matrix */}
      <div className="scale72-matrix-grid">
        {Array.from({ length: 72 }).map((_, i) => (
          <div
            key={i}
            className="scale72-gpu-node"
            style={{
              animationDelay: `${(i % 9) * 0.08 + Math.floor(i / 9) * 0.06}s`
            }}
          >
            <span className="node-die-core" />
            <span className="node-number">{String(i + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>

      <div className="scale72-specs-footer">
        <div className="scale-stat-item">
          <span className="stat-num">72</span>
          <span className="stat-desc">BLACKWELL GPUS</span>
        </div>
        <div className="scale-stat-item">
          <span className="stat-num">13.8 TB</span>
          <span className="stat-desc">SHARED HBM3e POOL</span>
        </div>
        <div className="scale-stat-item">
          <span className="stat-num">5,184</span>
          <span className="stat-desc">COPPER LINK CABLES</span>
        </div>
        <div className="scale-stat-item">
          <span className="stat-num">1.44 EXAFLOPS</span>
          <span className="stat-desc">FP4 AI COMPUTE</span>
        </div>
      </div>
    </div>
  );
}
