import React from 'react';
import { InlineIcon } from '../deck/GlyphIcon';
import { MEMORY_LEVELS } from './memoryData';

export function MemoryHierarchy({ activeTier = null, onSelectTier = null, large = false }) {
  return (
    <div className={`memory-hierarchy-container ${large ? 'is-large' : ''}`}>
      <div className="hierarchy-axis-indicator">
        <span className="axis-label-fast"><InlineIcon glyph="energy" /> CLOSER • FASTER • SMALLER</span>
        <div className="axis-gradient-bar" />
        <span className="axis-label-large">FARTHER • SLOWER • LARGER <InlineIcon glyph="storage" /></span>
      </div>

      <div className="hierarchy-tiers-stack">
        {MEMORY_LEVELS.map((tier) => {
          const isSelected = activeTier === tier.id;
          const isDimmed = activeTier && activeTier !== tier.id;

          return (
            <div
              key={tier.id}
              className={`hierarchy-tier-card tier-${tier.id} ${
                isSelected ? 'selected' : ''
              } ${isDimmed ? 'dimmed' : ''}`}
              onClick={() => onSelectTier && onSelectTier(tier.id)}
              style={{
                borderColor: isSelected ? tier.color : undefined
              }}
            >
              <div className="tier-header">
                <div className="tier-badge" style={{ color: tier.color }}>
                  {tier.badge}
                </div>
                <div className="tier-proximity">{tier.proximity}</div>
              </div>

              <h3 className="tier-name">{tier.name}</h3>

              <div className="tier-content-row">
                <div className="tier-metrics-col">
                  <div className="metric-box">
                    <span className="m-label">LATENCY</span>
                    <span className="m-val" style={{ color: tier.color }}>
                      {tier.latency}
                    </span>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">CAPACITY</span>
                    <span className="m-val">{tier.capacity}</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">BANDWIDTH</span>
                    <span className="m-val">{tier.bandwidth}</span>
                  </div>
                </div>
                <p className="tier-summary">{tier.summary}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
