import React, { useState } from 'react';
import { GlyphIcon, InlineIcon } from '../deck/GlyphIcon';

export function WaitingGame({ initialMode = 'low' }) {
  const [supplyMode, setSupplyMode] = useState(initialMode); // 'low' or 'high'
  const isHigh = supplyMode === 'high';

  return (
    <div className="waiting-game-container">
      <div className="game-control-header">
        <div className="game-title-block">
          <span className="game-kicker">LIVE SIMULATION</span>
          <h3 className="game-heading">
            {isHigh
              ? 'HIGH DATA BANDWIDTH → 100% COMPUTE UTILIZATION'
              : 'LOW DATA BANDWIDTH → 90% OF CHIP IS IDLE & STARVED'}
          </h3>
        </div>

        <div className="game-toggle-buttons">
          <button
            className={`game-btn ${!isHigh ? 'active-amber' : ''}`}
            onClick={() => setSupplyMode('low')}
          >
            <InlineIcon glyph="⚠️" /> 1 Data Lane (DDR / Single Bus)
          </button>
          <button
            className={`game-btn ${isHigh ? 'active-cyan' : ''}`}
            onClick={() => setSupplyMode('high')}
          >
            <InlineIcon glyph="⚡" /> 16 Data Lanes (HBM / Wide Interconnect)
          </button>
        </div>
      </div>

      {/* Main Simulation Board */}
      <div className="game-simulation-board">
        {/* Memory Data Source (Left) */}
        <div className="game-memory-source">
          <div className="source-box">
            <span className="source-icon"><GlyphIcon glyph="💾" size={26} /></span>
            <span className="source-name">MEMORY POOL</span>
            <span className="source-rate">
              {isHigh ? 'DATA FEED: 3,200 GB/s' : 'DATA FEED: 32 GB/s'}
            </span>
          </div>
        </div>

        {/* Data Stream Highway with moving packets */}
        <div className="game-stream-highway">
          <div className={`highway-lanes-cluster ${isHigh ? 'lanes-wide' : 'lanes-single'}`}>
            {Array.from({ length: isHigh ? 8 : 1 }).map((_, laneIdx) => (
              <div key={laneIdx} className="highway-lane-track">
                <span className="lane-wire" />
                <span
                  className="lane-packet-pulse"
                  style={{
                    animationDuration: isHigh ? '0.6s' : '1.8s',
                    animationDelay: `${laneIdx * 0.1}s`
                  }}
                />
              </div>
            ))}
          </div>
          <div className="highway-tag">
            {isHigh ? 'MULTI-LANE ULTRA-WIDE BUS' : 'BOTTLENECKED SINGLE NARROW LANE'}
          </div>
        </div>

        {/* 20 Compute Workers (Right) */}
        <div className="game-workers-matrix">
          <div className="matrix-title">
            <span>20 PARALLEL COMPUTE ENGINE CORES</span>
            <span className="matrix-status">
              {isHigh ? '20 / 20 ACTIVE (100%)' : '2 / 20 ACTIVE (10% UTILIZED)'}
            </span>
          </div>

          <div className="workers-grid">
            {Array.from({ length: 20 }).map((_, idx) => {
              // In low mode, only first 2 workers are active
              const isActive = isHigh || idx < 2;

              return (
                <div
                  key={idx}
                  className={`worker-core-node ${isActive ? 'core-busy' : 'core-starved'}`}
                  style={{
                    animationDelay: `${(idx % 5) * 0.1}s`
                  }}
                >
                  <span className="worker-status-dot" />
                  <span className="worker-id">CORE {idx + 1}</span>
                  <span className="worker-state-text">
                    {isActive ? 'COMPUTING' : 'STARVED'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="game-footer-takeaway">
        <span className="takeaway-badge">KEY TAKEAWAY</span>
        <span className="takeaway-text">
          {isHigh
            ? 'When memory bandwidth matches compute throughput, every single core stays busy crunching numbers.'
            : 'Adding more compute cores does NOT help if memory cannot feed them fast enough. The cores sit idle.'}
        </span>
      </div>
    </div>
  );
}
