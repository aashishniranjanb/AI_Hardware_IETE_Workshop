import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../deck/motion';

// Travel speed in SVG units per second, by link class.
const SPEED = { fast: 300, medium: 190, slow: 110 };

/**
 * A wire with data packets that travel along the ACTUAL path geometry.
 * Each transfer: packet leaves the source, follows the path, arrives at the
 * destination (arrival ring pulses), disappears; the transfer then repeats
 * after a pause. Reverse packets (reads) arrive back at the source end.
 *
 * Packets start after `delay` so the shared stageEnter can draw the wire first.
 * GSAP owns all packet motion (no SMIL / CSS animation); cleaned up on unmount.
 */
export function ConnectionPath({
  id = 'path-1',
  d = 'M 0 0 L 100 100',
  lanes = 1,
  color = '#38BDF8',
  width = 3,
  label = '',
  speed = 'fast', // 'fast', 'medium', 'slow'
  isActive = true,
  bidirectional = true,
  delay = 0.9,
}) {
  const pathRef = useRef(null);
  const fwdRefs = useRef([]);
  const revRef = useRef(null);
  const endRingRef = useRef(null);
  const startRingRef = useRef(null);
  const extraPackets = lanes >= 4 ? 1 : 0;

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !isActive) return;
    const len = path.getTotalLength();
    const at = (t) => path.getPointAtLength(Math.max(0, Math.min(1, t)) * len);
    const place = (el, t) => {
      if (!el) return;
      const p = at(t);
      el.setAttribute('cx', p.x);
      el.setAttribute('cy', p.y);
    };
    const fwd = fwdRefs.current.filter(Boolean);
    const rev = bidirectional ? revRef.current : null;

    if (prefersReducedMotion()) {
      // Static, still meaningful: packet shown at its destination.
      fwd.forEach((el, i) => { place(el, 1 - i * 0.12); el.setAttribute('opacity', '1'); });
      if (rev) { place(rev, 0); rev.setAttribute('opacity', '1'); }
      return;
    }

    const travel = Math.min(2.6, Math.max(0.55, len / (SPEED[speed] || SPEED.fast)));
    const hold = 0.7;
    const ctx = gsap.context(() => {
      const transfer = (el, from, to, ring, startAt) => {
        const s = { t: from };
        place(el, from);
        gsap.set(el, { attr: { opacity: 0 } });
        const tl = gsap.timeline({ repeat: -1, repeatDelay: hold, delay: startAt });
        tl.set(el, { attr: { opacity: 1 } })
          .to(s, { t: to, duration: travel, ease: 'power1.inOut', onUpdate: () => place(el, s.t) })
          .to(el, { attr: { opacity: 0 }, duration: 0.12 })
          .fromTo(ring, { attr: { r: width + 2, opacity: 0.9 } }, { attr: { r: width + 12, opacity: 0 }, duration: 0.5, ease: 'power2.out' }, '<');
        return tl;
      };
      fwd.forEach((el, i) => transfer(el, 0, 1, endRingRef.current, delay + i * (travel * 0.35)));
      if (rev) transfer(rev, 1, 0, startRingRef.current, delay + travel * 0.5 + hold * 0.5);
    }, path);
    return () => ctx.revert();
  }, [d, isActive, bidirectional, speed, delay, width]);

  const start = d.match(/M\s*([-\d.]+)[ ,]+([-\d.]+)/);
  const sx = start ? +start[1] : 0;
  const sy = start ? +start[2] : 0;

  return (
    <g className="dh-connection-group">
      {/* Base solid wire */}
      <path
        id={id}
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeOpacity={isActive ? '0.85' : '0.25'}
        className="dh-wire-base"
      />

      {/* Extra lanes if multi-lane */}
      {lanes > 1 && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={width * lanes * 0.8}
          strokeOpacity="0.15"
          className="dh-wire-glow-strip"
        />
      )}

      {isActive && (
        <>
          {/* Arrival rings at both ends (pulse when a packet lands) */}
          <circle ref={startRingRef} cx={sx} cy={sy} r={0} fill="none" stroke="#F8FAFC" strokeWidth="2" opacity="0" />
          <EndRing pathRef={pathRef} ringRef={endRingRef} color={color} d={d} />

          {Array.from({ length: 1 + extraPackets }).map((_, i) => (
            <circle
              key={i}
              ref={(el) => { fwdRefs.current[i] = el; }}
              className="dh-packet"
              cx={sx}
              cy={sy}
              r={width + 2}
              fill={i === 0 ? color : 'var(--c-cyan-2)'}
              opacity="0"
             
            />
          ))}
          {bidirectional && (
            <circle ref={revRef} className="dh-packet dh-packet-rev" cx={sx} cy={sy} r={width + 1} fill="#F8FAFC" opacity="0" />
          )}
        </>
      )}

      {/* Label tag along path if specified */}
      {label && (
        <text className="dh-path-label" fill={color}>
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
      )}
    </g>
  );
}

// Ring placed at the path's end point (computed from the real geometry).
function EndRing({ pathRef, ringRef, color, d }) {
  useLayoutEffect(() => {
    const p = pathRef.current;
    const r = ringRef.current;
    if (!p || !r) return;
    const end = p.getPointAtLength(p.getTotalLength());
    r.setAttribute('cx', end.x);
    r.setAttribute('cy', end.y);
  }, [d, pathRef, ringRef]);
  return <circle ref={ringRef} r={0} fill="none" stroke={color} strokeWidth="2" opacity="0" />;
}
