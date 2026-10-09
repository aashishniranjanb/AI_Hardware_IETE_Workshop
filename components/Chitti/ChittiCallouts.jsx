import React from 'react';
import { SUBSYSTEMS } from './subsystemsData';
import { SubsystemIcon } from './subsystemIcons';

// Cards sit in two columns beside the robot; leader lines are drawn by
// ChittiLeaderLines from the real card and part positions.
export const LEFT_IDS = ['communication', 'thermal', 'power', 'sensors'];
export const RIGHT_IDS = ['vision', 'audio', 'compute', 'memory', 'actuation'];

export function ChittiCalloutColumn({ side, selectedSubsystem, onSelectSubsystem }) {
  const ids = side === 'left' ? LEFT_IDS : RIGHT_IDS;
  return (
    <div className={`callout-column callout-column-${side}`}>
      {ids.map((id) => {
        const sub = SUBSYSTEMS.find((s) => s.id === id);
        const isSelected = selectedSubsystem === sub.id;
        return (
          <button
            key={sub.id}
            type="button"
            data-subsystem={sub.id}
            className={`callout-card ${isSelected ? 'is-active' : ''}`}
            onClick={() => onSelectSubsystem(isSelected ? null : sub.id)}
            aria-pressed={isSelected}
          >
            <div className="callout-title-row">
              <SubsystemIcon id={sub.id} size={16} />
              <span className="callout-badge">{sub.name}</span>
            </div>
            <div className="callout-sub">{sub.subtitle}</div>
            <div className="callout-detail-spec">{sub.spec}</div>
          </button>
        );
      })}
    </div>
  );
}
