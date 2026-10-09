import React from 'react';
import { GlyphIcon } from '../deck/GlyphIcon';

export function DataNode({
  type = 'gpu',
  label = 'GPU 01',
  sublabel = 'COMPUTE CORE',
  badge = 'ACTIVE',
  color = '#38BDF8',
  icon = 'gpu',
  isHighlighted = false,
  isDimmed = false
}) {
  return (
    <div
      className={`dh-data-node node-${type} ${isHighlighted ? 'highlighted' : ''} ${
        isDimmed ? 'dimmed' : ''
      }`}
      style={{
        borderColor: isHighlighted ? color : undefined
      }}
    >
      <div className="node-substrate-edge" />
      <div className="node-header">
        <span className="node-icon" style={{ color }}><GlyphIcon glyph={icon} size={20} /></span>
        <span className="node-badge" style={{ color }}>{badge}</span>
      </div>

      <div className="node-body">
        <h4 className="node-label">{label}</h4>
        <span className="node-sublabel">{sublabel}</span>
      </div>

      <div className="node-pins-row">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="node-pin-dot" />
        ))}
      </div>
    </div>
  );
}
