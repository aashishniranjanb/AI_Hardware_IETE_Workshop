import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { RotateCcw } from 'lucide-react';
import { prefersReducedMotion } from '../deck/motion';

/*
 * FPGA routing, simplified: 3 horizontal × 3 vertical routing tracks with a
 * programmable switch at every crossing. The configuration (from the
 * bitstream) closes exactly two switches, creating the route
 *   IN → H0 → (H0,V1) → V1 → (H2,V1) → H2 → OUT
 * Everything else stays open/subdued.
 *
 * React owns WHICH switches are closed; GSAP only animates (bits loading,
 * switch-close pulse, route drawing, signal travel). No CSS transitions on the
 * animated attributes.
 */
const H = [70, 130, 190]; // y of horizontal tracks
const V = [70, 130, 190]; // x of vertical tracks
const ROUTE_SWITCHES = ['0-1', '2-1']; // `${hIndex}-${vIndex}`
const ROUTE_D = `M 20 ${H[0]} L ${V[1]} ${H[0]} L ${V[1]} ${H[2]} L 240 ${H[2]}`;
const BITS = '0110 1001 0011 1010 0101 1100'.split('');

export function SwitchMatrixConfig() {
  const rootRef = useRef(null);
  const [closed, setClosed] = useState(() => new Set());
  const [phase, setPhase] = useState('unconfigured'); // unconfigured | loading | configured | manual
  const [run, setRun] = useState(0);
  const routeOn = ROUTE_SWITCHES.every((k) => closed.has(k));

  // Scripted configuration sequence (re-runs on Replay).
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    setClosed(new Set());
    setPhase('unconfigured');
    const reduced = prefersReducedMotion();
    if (reduced) {
      setClosed(new Set(ROUTE_SWITCHES));
      setPhase('configured');
      return;
    }
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      gsap.set(q('.cfg-bit'), { opacity: 0.15 });
      const tl = gsap.timeline({ delay: 1.0 });
      tl.call(() => setPhase('loading'))
        .to(q('.cfg-bit'), { opacity: 1, duration: 0.12, stagger: 0.05, ease: 'none' })
        .call(() => setClosed(new Set([ROUTE_SWITCHES[0]])), null, '+=0.15')
        .fromTo(q('[data-sw="0-1"] .sw-pulse'), { attr: { r: 9, opacity: 0.9 } }, { attr: { r: 22, opacity: 0 }, duration: 0.6, ease: 'power2.out' }, '<')
        .call(() => setClosed(new Set(ROUTE_SWITCHES)), null, '+=0.45')
        .fromTo(q('[data-sw="2-1"] .sw-pulse'), { attr: { r: 9, opacity: 0.9 } }, { attr: { r: 22, opacity: 0 }, duration: 0.6, ease: 'power2.out' }, '<')
        .call(() => setPhase('configured'), null, '+=0.3');
    }, root);
    return () => ctx.revert();
  }, [run]);

  // Route draws in, then a signal travels IN → OUT, whenever the route is complete.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const live = root?.querySelector('.route-live');
    const sig = root?.querySelector('.route-signal');
    if (!live || !sig) return;
    const len = live.getTotalLength();
    if (!routeOn) {
      gsap.set(live, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(sig, { attr: { opacity: 0 } });
      return;
    }
    if (prefersReducedMotion()) {
      gsap.set(live, { strokeDasharray: len, strokeDashoffset: 0 });
      gsap.set(sig, { attr: { opacity: 0 } });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(live, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' });
      const s = { t: 0 };
      gsap.timeline({ repeat: -1, repeatDelay: 0.6, delay: 0.85 })
        .set(sig, { attr: { opacity: 1 } })
        .to(s, {
          t: 1,
          duration: 1.4,
          ease: 'none',
          onUpdate: () => {
            const p = live.getPointAtLength(s.t * len);
            sig.setAttribute('cx', p.x);
            sig.setAttribute('cy', p.y);
          },
        })
        .to(sig, { attr: { opacity: 0 }, duration: 0.15 });
    }, root);
    return () => ctx.revert();
  }, [routeOn]);

  const toggle = (k) => {
    setPhase('manual');
    setClosed((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  };

  const onRoute = (h, v) => ROUTE_SWITCHES.includes(`${h}-${v}`);
  const trackLit = (kind, i) =>
    routeOn && ((kind === 'h' && (i === 0 || i === 2)) || (kind === 'v' && i === 1));

  return (
    <div className="switch-matrix-container" ref={rootRef}>
      <svg width="300" height="300" viewBox="0 0 260 260" className="switch-grid-svg" role="img"
        aria-label="Switch matrix: two programmable switches close to route IN to OUT">
        {/* routing tracks (subdued unless part of the active route) */}
        {H.map((y, i) => (
          <line key={`h${i}`} x1="20" y1={y} x2="240" y2={y} className={`sm-track ${trackLit('h', i) ? 'is-lit' : ''}`} />
        ))}
        {V.map((x, i) => (
          <line key={`v${i}`} x1={x} y1="20" x2={x} y2="240" className={`sm-track ${trackLit('v', i) ? 'is-lit' : ''}`} />
        ))}

        {/* active route overlay + travelling signal */}
        <path d={ROUTE_D} className="route-live" strokeDasharray="1 1" />
        <circle className="route-signal" r="6" cx="20" cy={H[0]} opacity="0" />

        {/* I/O pins */}
        <text x="6" y={H[0] - 10} className="sm-pin">IN</text>
        <text x="216" y={H[2] - 10} className="sm-pin">OUT</text>

        {/* programmable switches at every crossing */}
        {H.map((y, h) =>
          V.map((x, v) => {
            const k = `${h}-${v}`;
            const isClosed = closed.has(k);
            return (
              <g key={k} data-sw={k} className={`sm-switch ${isClosed ? 'is-closed' : ''} ${onRoute(h, v) ? 'on-route' : ''}`}
                onClick={() => toggle(k)} role="button" tabIndex={0}
                aria-pressed={isClosed} aria-label={`Switch at track ${h + 1}, ${v + 1}: ${isClosed ? 'closed' : 'open'}`}
                onKeyDown={(e) => { if (e.key === 'Enter') toggle(k); }}>
                <circle className="sw-pulse" cx={x} cy={y} r="0" opacity="0" />
                <circle className="sw-node" cx={x} cy={y} r="8" />
              </g>
            );
          })
        )}
      </svg>

      <div className="sm-panel">
        <div className="sm-config-block">
          <div className="sm-config-title">BITSTREAM → CONFIGURATION MEMORY</div>
          <div className="sm-bits" aria-hidden="true">
            {BITS.map((b, i) => (b === ' ' ? <span key={i} className="cfg-gap" /> : <span key={i} className="cfg-bit">{b}</span>))}
            <span className="cfg-more">…</span>
          </div>
          <div className="sm-config-note">
            A real bitstream holds ~100,000+ bits configuring LUTs, routing and I/O.
            Shown here: only the 2 routing switches this path needs.
          </div>
        </div>

        <ol className="sm-steps">
          <li className={phase === 'unconfigured' ? 'is-now' : 'is-done'}>Unconfigured fabric — all switches open</li>
          <li className={phase === 'loading' ? 'is-now' : phase === 'unconfigured' ? '' : 'is-done'}>Bitstream loads configuration memory</li>
          <li className={routeOn ? 'is-done' : phase === 'loading' ? 'is-now' : ''}>Selected switches close (pass transistors on)</li>
          <li className={routeOn ? 'is-now' : ''}>Route active: IN → OUT is a real wire</li>
        </ol>

        <div className="sm-actions">
          <span className={`sm-status ${routeOn ? 'ok' : ''}`}>{routeOn ? 'ROUTE CONFIGURED' : phase === 'manual' ? 'ROUTE OPEN — CLOSE BOTH HIGHLIGHTED SWITCHES' : 'CONFIGURING…'}</span>
          <button type="button" className="sm-replay" onClick={() => setRun((r) => r + 1)}>
            <RotateCcw size={14} aria-hidden="true" /> Replay
          </button>
        </div>
      </div>
    </div>
  );
}
