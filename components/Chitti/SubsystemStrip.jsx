import React from 'react';
import { SUBSYSTEMS } from './subsystemsData';
import { SubsystemIcon } from './subsystemIcons';
import { Lightbulb, X } from 'lucide-react';

export function SubsystemStrip({ selectedSubsystem, onSelectSubsystem }) {
  const activeSub = SUBSYSTEMS.find((s) => s.id === selectedSubsystem);

  return (
    <>
      {/* Subsystem Focus Detail Drawer (Displays when a subsystem is selected) */}
      {activeSub && (
        <div className="subsystem-detail-drawer">
          <div className="drawer-info">
            <h4>
              <SubsystemIcon id={activeSub.id} size={18} /> {activeSub.name} <span>// {activeSub.subtitle}</span>
            </h4>
            <p>{activeSub.role}</p>
            <p className="drawer-insight">
              <Lightbulb size={14} aria-hidden="true" /> {activeSub.questionAnswer}
            </p>
          </div>
          <div className="drawer-specs">
            SPEC: {activeSub.spec}
          </div>
          <button
            className="drawer-close"
            onClick={() => onSelectSubsystem(null)}
            title="Close Drawer"
            aria-label="Close subsystem details"
          >
            <X size={16} aria-hidden="true" />
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
              aria-pressed={isActive}
            >
              <SubsystemIcon id={sub.id} size={14} />
              {sub.name}
            </button>
          );
        })}
      </div>
    </>
  );
}
