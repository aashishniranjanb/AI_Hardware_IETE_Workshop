import React from 'react';
import { SUBSYSTEMS } from './subsystemsData';

export function ChittiCallouts({ selectedSubsystem, onSelectSubsystem }) {
  return (
    <div className="callouts-container">
      {/* Dynamic SVG Leader Lines */}
      <svg className="callout-lines-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {SUBSYSTEMS.map((sub) => {
          const isSelected = selectedSubsystem === sub.id;
          // Approximate leader line targets relative to stage dimensions
          const target = getCalloutCardCenter(sub.id);
          return (
            <g key={sub.id}>
              <line
                x1={`${sub.anchor.x}%`}
                y1={`${sub.anchor.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                className={`leader-path ${isSelected ? 'active' : ''}`}
              />
              <circle
                cx={`${sub.anchor.x}%`}
                cy={`${sub.anchor.y}%`}
                className="leader-node-dot"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Subsystem Engineering Cards */}
      {SUBSYSTEMS.map((sub) => {
        const isSelected = selectedSubsystem === sub.id;
        return (
          <div
            key={sub.id}
            className={`callout-card ${sub.posClass} ${isSelected ? 'is-active' : ''}`}
            onClick={() => onSelectSubsystem(isSelected ? null : sub.id)}
            role="button"
            tabIndex={0}
          >
            <div className="callout-title-row">
              <span className="callout-badge">{sub.name}</span>
              <span className="callout-detail-spec">{sub.spec.split('+')[0]}</span>
            </div>
            <div className="callout-sub">{sub.subtitle}</div>
            <div className="callout-role">{sub.role}</div>
          </div>
        );
      })}
    </div>
  );
}

function getCalloutCardCenter(id) {
  switch (id) {
    case 'vision': return { x: 74, y: 10 };
    case 'audio': return { x: 88, y: 19 };
    case 'compute': return { x: 91, y: 31 };
    case 'memory': return { x: 90, y: 44 };
    case 'communication': return { x: 38, y: 14 };
    case 'thermal': return { x: 30, y: 28 };
    case 'power': return { x: 29, y: 52 };
    case 'actuation': return { x: 80, y: 66 };
    case 'sensors': return { x: 32, y: 69 };
    default: return { x: 50, y: 50 };
  }
}
