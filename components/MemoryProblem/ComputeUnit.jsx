import React from 'react';
import { GlyphIcon, InlineIcon } from '../deck/GlyphIcon';

export function ComputeUnit({ state = 'active', customTitle = 'AI COMPUTE ENGINE', compact = false }) {
  const isWaiting = state === 'waiting' || state === 'starved';

  return (
    <div className={`mp-compute-package ${isWaiting ? 'state-waiting' : 'state-active'} ${compact ? 'is-compact' : ''}`}>
      <div className="mp-chip-package-rim">
        <div className="mp-package-header">
          <span className="mp-die-id">COMPUTE SILICON DIE • TSMC 3nm CLASS</span>
          <span className="mp-utilization-badge">
            {isWaiting ? <><InlineIcon glyph="⚠️" /> 4% UTILIZATION (STARVED)</> : <><InlineIcon glyph="⚡" /> 98% UTILIZATION (SATURATED)</>}
          </span>
        </div>

        {/* Die cavity with processing cores */}
        <div className="mp-silicon-die">
          <div className="mp-die-watermark">{customTitle}</div>

          {/* Core matrix of arithmetic workers */}
          <div className="mp-core-matrix">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`mp-cell ${isWaiting ? 'cell-idle' : 'cell-computing'}`}
                style={{
                  animationDelay: `${(i % 4) * 0.15 + Math.floor(i / 4) * 0.1}s`
                }}
              >
                <span className="cell-pip" />
                <span className="cell-name">ALU {i}</span>
              </div>
            ))}
          </div>

          {/* Waiting overlay if starved */}
          {isWaiting && !compact && (
            <div className="mp-starvation-overlay">
              <div className="mp-amber-warning-box">
                <span className="warning-icon"><GlyphIcon glyph="⏸" size={26} /></span>
                <span className="warning-title">WAITING FOR DATA...</span>
                <span className="warning-sub">ZERO MEMORY TRANSFERS IN FLIGHT</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom interconnect contact pins */}
        <div className="mp-package-pins">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="bga-pin" />
          ))}
        </div>
      </div>
    </div>
  );
}
