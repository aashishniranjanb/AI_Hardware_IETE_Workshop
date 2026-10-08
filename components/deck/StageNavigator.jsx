"use client";
import React from 'react';

// Strip "01 " style numeric prefixes from breadcrumb labels (the dot shows the number).
const cleanLabel = (label = '') => String(label).replace(/^\s*\d+\s*[:.\-–]?\s*/, '').toUpperCase();

/**
 * Shared stage navigator: numbered dots on a connector, a PHASE xx / yy
 * counter and the current stage label. Never scrolls; clicking a dot only
 * calls onStageChange (keyboard stays owned by the deck navigation engine).
 *
 * stages: [{ id, label }]
 * variant: 'inline' (single row, default) | 'stacked' (boxed, header use)
 */
export function StageNavigator({
  stages,
  currentStage,
  onStageChange,
  variant = 'inline',
  title = 'STAGES',
  ariaLabel,
  amberIds = [],
  className = '',
}) {
  const total = stages.length;
  const current = stages[currentStage] || stages[0];
  const compact = total > 14;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <nav
      className={`stage-nav ${variant === 'stacked' ? 'is-stacked' : ''} ${compact ? 'is-compact' : ''} ${className}`}
      aria-label={ariaLabel || `${title} navigation`}
    >
      <div className="stage-nav-meta">
        <span>{title}</span>
        <span className="stage-nav-count">
          {pad(currentStage + 1)} / {pad(total)}
        </span>
      </div>
      <div className="stage-nav-track">
        {stages.map((s, idx) => (
          <button
            key={s.id ?? idx}
            type="button"
            className={`stage-nav-dot ${idx === currentStage ? 'is-active' : ''} ${idx < currentStage ? 'is-done' : ''} ${
              amberIds.includes(s.id) ? 'is-amber' : ''
            }`}
            onClick={() => onStageChange(idx)}
            title={cleanLabel(s.label)}
            aria-label={`Stage ${idx + 1}: ${cleanLabel(s.label)}`}
            aria-current={idx === currentStage ? 'step' : undefined}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <div className="stage-nav-label">{cleanLabel(current?.label)}</div>
    </nav>
  );
}
