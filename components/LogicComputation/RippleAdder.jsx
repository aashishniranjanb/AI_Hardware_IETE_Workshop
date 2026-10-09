import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { RotateCcw } from 'lucide-react';
import { prefersReducedMotion } from '../deck/motion';

/** Full-adder chain math (bit 0 = LSB). Everything shown is derived from A and B. */
export function rippleAdd(a, b) {
  const bits = [];
  let c = 0;
  for (let i = 0; i < 4; i++) {
    const ai = (a >> i) & 1;
    const bi = (b >> i) & 1;
    const s = ai ^ bi ^ c;
    const cout = (ai & bi) | (ai & c) | (bi & c);
    bits.push({ i, a: ai, b: bi, cin: c, s, cout });
    c = cout;
  }
  const value = bits.reduce((acc, x) => acc + (x.s << x.i), 0) + (c << 4);
  return { bits, c4: c, value, ok: value === a + b };
}

/**
 * Animated ripple-carry adder. `step` = how many full adders have resolved
 * (0..4); step 5 = final result shown. GSAP drives the timing and moves each
 * carry token along its wire; React renders what is resolved. Re-runs from
 * scratch whenever A, B or Replay change (no stale signal state).
 */
export function RippleAdder({ a, b, showReplay = true }) {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const { bits, c4, value, ok } = useMemo(() => rippleAdd(a, b), [a, b]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      setStep(5);
      return;
    }
    setStep(0);
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      gsap.set(q('.ra-token'), { x: 0, opacity: 0 });
      const tl = gsap.timeline({ delay: 0.6 });
      for (let i = 0; i < 4; i++) {
        // stage i resolves (sum bit appears), then its carry travels left
        tl.call(() => setStep(i + 1))
          .fromTo(q(`[data-fa="${i}"]`), { boxShadow: '0 0 0px rgba(39,215,255,0)' }, { boxShadow: '0 0 26px rgba(39,215,255,0.55)', duration: 0.25, yoyo: true, repeat: 1 }, '<')
          .fromTo(q(`[data-carry="${i + 1}"] .ra-token`), { x: 0, opacity: 1 }, {
            x: () => {
              const w = q(`[data-carry="${i + 1}"]`)[0];
              const t = w?.querySelector('.ra-token');
              return w && t ? -(w.clientWidth - t.offsetWidth) : -30;
            },
            duration: 0.55,
            ease: 'power1.inOut',
          }, '+=0.15')
          .to(q(`[data-carry="${i + 1}"] .ra-token`), { opacity: 0, duration: 0.1 });
      }
      tl.call(() => setStep(5), null, '+=0.1');
    }, root);
    return () => ctx.revert();
  }, [a, b, run]);

  // MSB on the left, as numbers are written; carries flow right → left:
  // C4 ◂ FA3 ◂ C3 ◂ FA2 ◂ C2 ◂ FA1 ◂ C1 ◂ FA0 ◂ C0
  const Wire = ({ k }) => {
    // wire carrying C{k}: produced by FA[k-1] (on its right), consumed by FA[k] / C4 out
    const val = k === 0 ? 0 : bits[k - 1].cout;
    const shown = k === 0 || step >= k;
    return (
      <div className={`ra-wire ${shown ? 'is-shown' : ''} ${shown && val ? 'is-one' : ''}`} data-carry={k}>
        <span className="ra-wire-label">C{k}{shown ? `=${val}` : ''}</span>
        <span className="ra-wire-line" />
        {k > 0 && <span className={`ra-token ${val ? 'is-one' : ''}`}>{val}</span>}
      </div>
    );
  };

  return (
    <div className="ra-root" ref={rootRef}>
      <div className="ra-chain">
        <div className={`ra-io ${step >= 4 ? 'is-on' : ''} ${step >= 4 && c4 ? 'is-one' : ''}`}>
          <span className="ra-io-label">C4 OUT</span>
          <span className="ra-io-val">{step >= 4 ? c4 : '·'}</span>
        </div>
        {[3, 2, 1, 0].map((i) => {
          const x = bits[i];
          const resolved = step > i;
          return (
            <React.Fragment key={i}>
              <Wire k={i + 1} />
              <div className={`ra-fa ${resolved ? 'is-resolved' : ''} ${step === i + 1 ? 'is-active' : ''}`} data-fa={i}>
                <div className="ra-fa-title">FA [{i}]</div>
                <div className="ra-fa-in">
                  <span>A{i}={x.a}</span>
                  <span>B{i}={x.b}</span>
                  <span className={`ra-cin ${(resolved || i === 0) && x.cin ? 'is-one' : ''}`}>Cin={resolved || i === 0 || step >= i ? x.cin : '?'}</span>
                </div>
                <div className="ra-fa-sum">S{i} = <strong>{resolved ? x.s : '?'}</strong></div>
              </div>
            </React.Fragment>
          );
        })}
        <Wire k={0} />
        <div className="ra-io is-on">
          <span className="ra-io-label">C0 IN</span>
          <span className="ra-io-val">0</span>
        </div>
      </div>

      <div className="ra-result">
        <div className={`ra-result-card ${step >= 5 ? 'is-on' : ''}`}>
          <span className="ra-res-lbl">A + B</span>
          <span className="ra-res-val">{a} + {b} = {step >= 5 ? value : '…'}</span>
        </div>
        <div className={`ra-result-card ${step >= 5 ? 'is-on' : ''}`}>
          <span className="ra-res-lbl">5-BIT RESULT (C4 S3 S2 S1 S0)</span>
          <span className="ra-res-val mono">
            {step >= 5 ? `${c4}${bits[3].s}${bits[2].s}${bits[1].s}${bits[0].s}₂` : '·····'}
          </span>
        </div>
        {showReplay && (
          <button type="button" className="ra-replay" onClick={() => setRun((r) => r + 1)}>
            <RotateCcw size={14} aria-hidden="true" /> Replay carry
          </button>
        )}
        {!ok && <span className="ra-error">Adder mismatch</span>}
      </div>
    </div>
  );
}
