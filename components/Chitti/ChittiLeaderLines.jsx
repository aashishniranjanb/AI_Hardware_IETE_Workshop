import React, { useLayoutEffect, useState } from 'react';
import { SUBSYSTEMS } from './subsystemsData';

/**
 * Solid leader lines from each callout card to the robot part it describes.
 * Geometry is measured from the live DOM (cards + exploded 3D parts) in the
 * stage's own pixel space, so lines stay attached at every viewport size.
 */
export function ChittiLeaderLines({ stageRef, active, selectedSubsystem, layoutKey }) {
  const [geo, setGeo] = useState({ w: 0, h: 0, lines: [] });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !active) {
      setGeo((g) => (g.lines.length ? { w: 0, h: 0, lines: [] } : g));
      return;
    }
    const measure = () => {
      const s = stage.getBoundingClientRect();
      const lines = [];
      SUBSYSTEMS.forEach((sub) => {
        const card = stage.querySelector(`.callout-card[data-subsystem="${sub.id}"]`);
        const part = stage.querySelector(`.part-layer.${sub.partClass}`);
        if (!card || !part) return;
        const c = card.getBoundingClientRect();
        const p = part.getBoundingClientRect();
        const leftSide = c.right < p.left + p.width / 2;
        const x1 = (leftSide ? c.right : c.left) - s.left;
        const y1 = c.top + c.height / 2 - s.top;
        const x2 = p.left + p.width / 2 - s.left;
        const y2 = p.top + p.height / 2 - s.top;
        const bend = x1 + (x2 - x1) * 0.45;
        lines.push({ id: sub.id, d: `M ${x1} ${y1} C ${bend} ${y1}, ${bend} ${y2}, ${x2} ${y2}`, x1, y1, x2, y2 });
      });
      setGeo({ w: s.width, h: s.height, lines });
    };
    measure();
    // Parts settle after the CSS explode transition (0.8s); re-measure then.
    const timers = [120, 450, 900].map((t) => setTimeout(measure, t));
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener('resize', measure);
    return () => {
      timers.forEach(clearTimeout);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [stageRef, active, layoutKey]);

  if (!active || !geo.lines.length) return null;
  return (
    <svg className="callout-lines-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      {geo.lines.map((l) => {
        const on = selectedSubsystem === l.id;
        const dim = selectedSubsystem && !on;
        return (
          <g key={l.id} className={`leader ${on ? 'is-active' : ''} ${dim ? 'is-dim' : ''}`}>
            <path d={l.d} className="leader-path" />
            <circle cx={l.x1} cy={l.y1} r={3} className="leader-end" />
            <circle cx={l.x2} cy={l.y2} r={on ? 6 : 4.5} className="leader-node-dot" />
          </g>
        );
      })}
    </svg>
  );
}
