import React from 'react';

export function SupercomputerView() {
  return (
    <div className="bw-supercomputer-container">
      <div className="datacenter-header-badge">
        <span className="badge-pulse" />
        <span>DATA-CENTER SCALE AI INFRASTRUCTURE (NVL72 POD)</span>
      </div>

      {/* Row of NVL72 Racks */}
      <div className="datacenter-racks-row">
        {[0, 1, 2, 3, 4].map((rackIdx) => (
          <div
            key={rackIdx}
            className={`datacenter-rack-column ${rackIdx === 2 ? 'featured-center-rack' : 'flank-rack'}`}
          >
            <div className="rack-mini-top">
              <span className="rack-tag">RACK 0{rackIdx + 1}</span>
            </div>
            <div className="rack-mini-trays">
              {Array.from({ length: 14 }).map((_, t) => (
                <div key={t} className={`mini-tray-bar ${t === 6 || t === 7 ? 'mini-switch' : ''}`} />
              ))}
            </div>
            <div className="rack-mini-bottom">
              <span className="rack-power-indicator">120kW</span>
            </div>
          </div>
        ))}
      </div>

      {/* Overhead Optical Spine & Underfloor Cooling Plenums */}
      <div className="datacenter-spine-overhead">
        <div className="spine-cable-track">
          <span className="spine-label">800G QUANTUM-2 INFINIBAND OVERHEAD FABRIC</span>
          <div className="spine-light-pulse" />
        </div>
      </div>

      <div className="datacenter-cooling-floor">
        <span className="floor-label">UNDERFLOOR LIQUID COOLING DISTRIBUTION UNIT (CDU)</span>
      </div>

      <div className="supercomputer-message-card">
        <h3 className="msg-title">THIS IS NO LONGER JUST A GPU.</h3>
        <p className="msg-subtitle">IT IS A COMPLETE COMPUTING SYSTEM.</p>
      </div>
    </div>
  );
}
