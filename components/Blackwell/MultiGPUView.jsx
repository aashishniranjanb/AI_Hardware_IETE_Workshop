import React from 'react';

export function MultiGPUView({ showNVLink = false }) {
  return (
    <div className="bw-multi-gpu-container">
      <div className="bw-quad-grid">
        {[0, 1, 2, 3].map((idx) => (
          <div key={idx} className={`bw-gpu-card card-${idx}`}>
            <div className="gpu-card-header">
              <span className="card-badge">BLACKWELL GPU 0{idx + 1}</span>
              <span className="card-mem">192 GB HBM3e</span>
            </div>

            <div className="gpu-card-body">
              <div className="mini-dual-die">
                <span className="mini-die" />
                <span className="mini-bridge" />
                <span className="mini-die" />
              </div>
              <span className="core-stat">208B TRANSISTORS</span>
            </div>

            {showNVLink && (
              <div className="nvlink-active-indicator">
                <span className="pulse-dot" />
                <span>NVLINK 1.8 TB/s</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SVG overlay for NVLink connections */}
      {showNVLink && (
        <svg className="bw-nvlink-mesh-svg" viewBox="0 0 680 340">
          <defs>
            <filter id="bw-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal top: GPU 1 <-> GPU 2 */}
          <line x1="210" y1="85" x2="470" y2="85" stroke="#4B8DFF" strokeWidth="4" filter="url(#bw-glow)" />
          <circle cx="340" cy="85" r="5" fill="#27D7FF">
            <animate attributeName="cx" from="210" to="470" dur="0.8s" repeatCount="indefinite" />
          </circle>

          {/* Horizontal bottom: GPU 3 <-> GPU 4 */}
          <line x1="210" y1="255" x2="470" y2="255" stroke="#4B8DFF" strokeWidth="4" filter="url(#bw-glow)" />
          <circle cx="340" cy="255" r="5" fill="#27D7FF">
            <animate attributeName="cx" from="470" to="210" dur="0.8s" repeatCount="indefinite" />
          </circle>

          {/* Vertical left: GPU 1 <-> GPU 3 */}
          <line x1="210" y1="85" x2="210" y2="255" stroke="#27D7FF" strokeWidth="4" filter="url(#bw-glow)" />
          <circle cx="210" cy="170" r="5" fill="#57E6A5">
            <animate attributeName="cy" from="85" to="255" dur="0.8s" repeatCount="indefinite" />
          </circle>

          {/* Vertical right: GPU 2 <-> GPU 4 */}
          <line x1="470" y1="85" x2="470" y2="255" stroke="#27D7FF" strokeWidth="4" filter="url(#bw-glow)" />
          <circle cx="470" cy="170" r="5" fill="#57E6A5">
            <animate attributeName="cy" from="255" to="85" dur="0.8s" repeatCount="indefinite" />
          </circle>

          {/* Diagonal Cross Links */}
          <line x1="210" y1="85" x2="470" y2="255" stroke="#8A7CFF" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.85" />
          <line x1="470" y1="85" x2="210" y2="255" stroke="#8A7CFF" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.85" />
        </svg>
      )}

      {showNVLink && (
        <div className="bw-callout-badge accent-blue">
          <span>⚡ ALL-TO-ALL NVLINK: 4 ACCELERATORS OPERATING AS A SINGLE LOGICAL COMPUTE POOL ⚡</span>
        </div>
      )}
    </div>
  );
}
