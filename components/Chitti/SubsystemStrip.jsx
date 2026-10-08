import React from 'react';
import { SUBSYSTEMS } from './subsystemsData';

export function SubsystemStrip({ selectedSubsystem, onSelectSubsystem }) {
  const activeSub = SUBSYSTEMS.find((s) => s.id === selectedSubsystem);

  return (
    <>
      {/* Subsystem Focus Detail Drawer (Displays when a subsystem is selected) */}
      {activeSub && (
        <div className="subsystem-detail-drawer">
          <div className="drawer-info">
            <h4>
              {activeSub.name} <span>// {activeSub.subtitle}</span>
            </h4>
            <p>{activeSub.role}</p>
            <p style={{ color: '#38bdf8', marginTop: '4px', fontStyle: 'italic' }}>
              💡 {activeSub.questionAnswer}
            </p>
          </div>
          <div className="drawer-specs">
            SPEC: {activeSub.spec}
          </div>
          <button
            className="drawer-close"
            onClick={() => onSelectSubsystem(null)}
            title="Close Drawer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bottom Floating Subsystem Dock */}
      <div className="subsystem-dock">
        <span className="dock-label">EXPLORE SUBSYSTEMS:</span>
        {SUBSYSTEMS.map((sub) => {
          const isActive = selectedSubsystem === sub.id;
          return (
            <button
              key={sub.id}
              className={`dock-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSubsystem(isActive ? null : sub.id)}
            >
              {sub.name}
            </button>
          );
        })}
      </div>
    </>
  );
}
