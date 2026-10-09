import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CheckCircle2, MonitorPlay } from 'lucide-react';
import { prefersReducedMotion } from '../deck/motion';

/*
 * Conceptual counter → LED simulation (NOT a measurement from the board).
 * Scaled model: a 6-bit counter whose MSB (bit 5) drives the LED, so the
 * relationship is visible at presentation speed. The real blinky.v uses a
 * 24-bit counter with led = counter[23]; at an example 12 MHz clock bit 23
 * toggles every 2^23 cycles ≈ 0.70 s (≈ 1.4 s per blink).
 *
 * GSAP drives the count (DOM updated through refs — no setInterval and no
 * React state per tick). Cleaned up on unmount.
 */
const BITS = 6;
const COUNTS_PER_SEC = 20; // simulated clock edges per second
const WAVE_PERIOD = 40; // px per clock period in the waveform

export function CounterLedDemo({ variant = 'clock' }) {
  const rootRef = useRef(null);
  const bitRefs = useRef([]);
  const hexRef = useRef(null);
  const ledRefs = useRef([]);
  const ledTextRef = useRef(null);
  const markerRef = useRef(null);
  const [verified, setVerified] = useState(false);

  useLayoutEffect(() => {
    const render = (n) => {
      for (let i = 0; i < BITS; i++) {
        const el = bitRefs.current[i];
        if (!el) continue;
        const v = (n >> i) & 1;
        el.textContent = v;
        el.classList.toggle('is-one', !!v);
      }
      if (hexRef.current) hexRef.current.textContent = `${n} (0b${n.toString(2).padStart(BITS, '0')})`;
      const led = (n >> (BITS - 1)) & 1;
      ledRefs.current.forEach((el) => el && el.classList.toggle('is-on', !!led));
      if (ledTextRef.current) ledTextRef.current.textContent = led ? 'LED = 1 (ON)' : 'LED = 0 (OFF)';
    };

    if (prefersReducedMotion()) {
      render(0b100101); // static snapshot: MSB = 1 → LED on
      return;
    }
    const max = 1 << BITS;
    const state = { n: 0 };
    let last = -1;
    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: max,
        duration: max / COUNTS_PER_SEC,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          const n = Math.floor(state.n) % max;
          if (n !== last) { last = n; render(n); }
          // clock-edge marker walks along the waveform, one period per count
          if (markerRef.current) {
            const frac = state.n % 1;
            const x = 20 + ((Math.floor(state.n) % 13) + frac) * WAVE_PERIOD;
            markerRef.current.setAttribute('cx', x);
          }
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const bitCells = (
    <div className="cl-bits" aria-label="Counter register bits, MSB on the left">
      {Array.from({ length: BITS }).map((_, k) => {
        const i = BITS - 1 - k; // MSB first
        return (
          <div key={i} className={`cl-bit ${i === BITS - 1 ? 'is-msb' : ''}`}>
            <span className="cl-bit-val" ref={(el) => { bitRefs.current[i] = el; }}>0</span>
            <span className="cl-bit-idx">b{i}</span>
          </div>
        );
      })}
    </div>
  );

  const simBadge = (
    <div className="cl-sim-badge">
      <MonitorPlay size={14} aria-hidden="true" /> CONCEPTUAL SIMULATION — not a live signal from the board
    </div>
  );

  if (variant === 'led') {
    return (
      <div className="cl-root cl-led-variant" ref={rootRef}>
        {simBadge}
        <div className="cl-led-row">
          <div className="cl-big-led" ref={(el) => { ledRefs.current[0] = el; }} aria-hidden="true" />
          <div className="cl-led-side">
            <div className="cl-led-state" ref={ledTextRef}>LED = 0 (OFF)</div>
            {bitCells}
            <div className="cl-led-wire">LED is wired to the counter MSB (here b5 · on the board counter[23])</div>
          </div>
        </div>
        <div className={`cl-board-check ${verified ? 'is-verified' : ''}`}>
          <div className="cl-board-text">
            {verified ? (
              <><CheckCircle2 size={16} aria-hidden="true" /> VERIFIED ON THE BOARD — presenter confirmed the physical LED is blinking.</>
            ) : (
              <>ON THE REAL BOARD: after <code>iceprog blinky.bin</code>, the LED should blink about every 0.7 s
                (12 MHz example clock ÷ 2<sup>23</sup>). Check it on your board.</>
            )}
          </div>
          <button type="button" className="cl-verify-btn" onClick={() => setVerified((v) => !v)} aria-pressed={verified}>
            {verified ? 'Undo' : 'Mark as verified on my board'}
          </button>
        </div>
      </div>
    );
  }

  // variant: clock
  return (
    <div className="cl-root" ref={rootRef}>
      {simBadge}
      <svg className="cl-wave" width="560" height="90" viewBox="0 0 560 90" aria-label="Clock waveform">
        <text x="20" y="16" className="cl-wave-label">clk (simulated clock edges)</text>
        <path className="cl-wave-path" d={Array.from({ length: 13 }).map((_, k) => {
          const x = 20 + k * WAVE_PERIOD;
          return `${k === 0 ? 'M' : 'L'} ${x} 70 L ${x} 30 L ${x + WAVE_PERIOD / 2} 30 L ${x + WAVE_PERIOD / 2} 70`;
        }).join(' ')} />
        <circle ref={markerRef} className="cl-edge-marker" cx="20" cy="30" r="5" />
      </svg>

      <div className="cl-row">
        <div className="cl-card">
          <div className="cl-card-title">COUNTER REGISTER (6-BIT MODEL)</div>
          {bitCells}
          <div className="cl-count" ref={hexRef}>0 (0b000000)</div>
          <div className="cl-card-note">+1 on every rising clock edge</div>
        </div>
        <div className="cl-arrow" aria-hidden="true">→</div>
        <div className="cl-card">
          <div className="cl-card-title">LED = MSB (b5)</div>
          <div className="cl-small-led" ref={(el) => { ledRefs.current[0] = el; }} aria-hidden="true" />
          <div className="cl-led-state" ref={ledTextRef}>LED = 0 (OFF)</div>
        </div>
      </div>
      <div className="cl-scale-note">
        Real design: 24-bit counter, <code>assign led = counter[23]</code>. At an example 12 MHz clock bit 23 flips every
        2<sup>23</sup> cycles ≈ 0.7 s — slow enough to see.
      </div>
    </div>
  );
}
