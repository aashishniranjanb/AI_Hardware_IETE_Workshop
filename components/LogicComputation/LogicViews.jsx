import React, { useState } from 'react';

// STAGE 0: LOGIC GATE TOOLKIT (AND, OR, NOT, XOR)
export function StageLogicToolkit() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);

  const andOut = a & b;
  const orOut = a | b;
  const notOut = 1 - a;
  const xorOut = a ^ b;

  return (
    <div className="stage-wrap">
      {/* Input controls */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <button
          type="button"
          className={`logic-toggle-btn ${a ? 'is-active' : ''}`}
          onClick={() => setA(1 - a)}
        >
          <span className="logic-toggle-label">INPUT A</span>
          <span>{a}</span>
        </button>
        <button
          type="button"
          className={`logic-toggle-btn ${b ? 'is-active' : ''}`}
          onClick={() => setB(1 - b)}
        >
          <span className="logic-toggle-label">INPUT B</span>
          <span>{b}</span>
        </button>
      </div>

      {/* 4 Gates Toolkit Grid */}
      <div className="gate-cards-grid">
        <div className="gate-card">
          <span className="gate-card-title">AND GATE</span>
          <span className="gate-card-eq">A · B</span>
          <div className={`gate-output-pill ${andOut ? 'is-high' : ''}`}>{andOut}</div>
          <span style={{ fontSize: '12px', color: '#64748B' }}>High only when BOTH are 1</span>
        </div>

        <div className="gate-card">
          <span className="gate-card-title">OR GATE</span>
          <span className="gate-card-eq">A + B</span>
          <div className={`gate-output-pill ${orOut ? 'is-high' : ''}`}>{orOut}</div>
          <span style={{ fontSize: '12px', color: '#64748B' }}>High if EITHER is 1</span>
        </div>

        <div className="gate-card">
          <span className="gate-card-title">NOT GATE</span>
          <span className="gate-card-eq">Ā (Inverts A)</span>
          <div className={`gate-output-pill ${notOut ? 'is-high' : ''}`}>{notOut}</div>
          <span style={{ fontSize: '12px', color: '#64748B' }}>Inverts binary state</span>
        </div>

        <div className="gate-card">
          <span className="gate-card-title" style={{ color: '#57E6A5' }}>XOR GATE</span>
          <span className="gate-card-eq">A ⊕ B</span>
          <div className={`gate-output-pill ${xorOut ? 'is-high' : ''}`} style={{ borderColor: xorOut ? '#57E6A5' : '', color: xorOut ? '#57E6A5' : '' }}>{xorOut}</div>
          <span style={{ fontSize: '12px', color: '#57E6A5' }}>High if inputs DIFFER</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 700 }}>
        INDIVIDUAL GATES MAKE DECISIONS → CAN WE COMBINE THEM TO DO ARITHMETIC?
      </div>
    </div>
  );
}

// STAGE 1: XOR + AND COMBINATION (XOR -> SUM, AND -> CARRY)
export function StageXORAndCombination() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);

  const sum = a ^ b;
  const carry = a & b;

  return (
    <div className="stage-wrap">
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button type="button" className={`logic-toggle-btn ${a ? 'is-active' : ''}`} onClick={() => setA(1 - a)}>
            <span className="logic-toggle-label">INPUT A</span>
            <span>{a}</span>
          </button>
          <button type="button" className={`logic-toggle-btn ${b ? 'is-active' : ''}`} onClick={() => setB(1 - b)}>
            <span className="logic-toggle-label">INPUT B</span>
            <span>{b}</span>
          </button>
        </div>

        {/* Dual schematic: XOR & AND */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Upper: XOR for SUM */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#020617', border: '1px solid #1E293B', borderRadius: '10px', padding: '14px 20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF', minWidth: '90px' }}>XOR GATE</span>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '14px', color: '#8B98A8' }}>A({a}) ⊕ B({b})</span>
            <span style={{ color: '#64748B' }}>→</span>
            <div className={`gate-output-pill ${sum ? 'is-high' : ''}`} style={{ minWidth: '50px', textAlign: 'center' }}>{sum}</div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>= SUM</span>
          </div>

          {/* Lower: AND for CARRY */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#020617', border: '1px solid #1E293B', borderRadius: '10px', padding: '14px 20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#F59E0B', minWidth: '90px' }}>AND GATE</span>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '14px', color: '#8B98A8' }}>A({a}) · B({b})</span>
            <span style={{ color: '#64748B' }}>→</span>
            <div className={`gate-output-pill ${carry ? 'is-high' : ''}`} style={{ minWidth: '50px', textAlign: 'center', borderColor: carry ? '#F59E0B' : '', color: carry ? '#F59E0B' : '' }}>{carry}</div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#F59E0B' }}>= CARRY</span>
          </div>
        </div>

        {/* Arithmetic Callout */}
        <div className="circuit-result-badge highlight-sum" style={{ minWidth: '200px' }}>
          <span className="res-lbl">BINARY MATH</span>
          <span className="res-val" style={{ fontSize: '26px' }}>{carry}{sum}₂</span>
          <span style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>Decimal: {carry * 2 + sum}</span>
        </div>
      </div>
    </div>
  );
}

// STAGE 2: THE HALF ADDER (Interactive 1-bit Addition)
export function StageHalfAdder() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);

  const sum = a ^ b;
  const carry = a & b;

  return (
    <div className="stage-wrap">
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button type="button" className={`logic-toggle-btn ${a ? 'is-active' : ''}`} onClick={() => setA(1 - a)}>
            <span className="logic-toggle-label">INPUT A</span>
            <span>{a}</span>
          </button>
          <button type="button" className={`logic-toggle-btn ${b ? 'is-active' : ''}`} onClick={() => setB(1 - b)}>
            <span className="logic-toggle-label">INPUT B</span>
            <span>{b}</span>
          </button>
        </div>

        {/* Schematic Box */}
        <div className="circuit-box-diagram">
          <svg width="260" height="150" viewBox="0 0 260 150">
            {/* Input taps */}
            <line x1="10" y1="35" x2="90" y2="35" stroke={a ? "#27D7FF" : "#334155"} strokeWidth="3" />
            <line x1="10" y1="65" x2="90" y2="65" stroke={b ? "#27D7FF" : "#334155"} strokeWidth="3" />

            <line x1="40" y1="35" x2="40" y2="105" stroke={a ? "#27D7FF" : "#334155"} strokeWidth="3" />
            <line x1="40" y1="105" x2="90" y2="105" stroke={a ? "#27D7FF" : "#334155"} strokeWidth="3" />

            <line x1="60" y1="65" x2="60" y2="125" stroke={b ? "#27D7FF" : "#334155"} strokeWidth="3" />
            <line x1="60" y1="125" x2="90" y2="125" stroke={b ? "#27D7FF" : "#334155"} strokeWidth="3" />

            {/* XOR Gate for SUM */}
            <rect x="90" y="20" width="70" height="50" rx="6" fill="#0B1120" stroke="#27D7FF" strokeWidth="2" />
            <text x="125" y="50" fill="#27D7FF" fontSize="12" fontWeight="800" textAnchor="middle">XOR</text>
            <line x1="160" y1="45" x2="240" y2="45" stroke={sum ? "#27D7FF" : "#334155"} strokeWidth="3" />
            <text x="210" y="35" fill="#27D7FF" fontSize="12" fontWeight="700">SUM</text>

            {/* AND Gate for CARRY */}
            <rect x="90" y="95" width="70" height="45" rx="6" fill="#0B1120" stroke="#F59E0B" strokeWidth="2" />
            <text x="125" y="122" fill="#F59E0B" fontSize="12" fontWeight="800" textAnchor="middle">AND</text>
            <line x1="160" y1="117" x2="240" y2="117" stroke={carry ? "#F59E0B" : "#334155"} strokeWidth="3" />
            <text x="210" y="110" fill="#F59E0B" fontSize="12" fontWeight="700">CARRY</text>
          </svg>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="circuit-result-badge highlight-sum">
              <span className="res-lbl">SUM (XOR)</span>
              <span className="res-val">{sum}</span>
            </div>
            <div className="circuit-result-badge highlight-carry">
              <span className="res-lbl">CARRY (AND)</span>
              <span className="res-val">{carry}</span>
            </div>
          </div>
        </div>

        {/* Truth Table */}
        <div className="truth-table-card">
          <div className="truth-table-header">HALF ADDER TRUTH TABLE</div>
          {[
            { inA: 0, inB: 0, s: 0, c: 0 },
            { inA: 0, inB: 1, s: 1, c: 0 },
            { inA: 1, inB: 0, s: 1, c: 0 },
            { inA: 1, inB: 1, s: 0, c: 1 },
          ].map((row, idx) => {
            const isCurr = row.inA === a && row.inB === b;
            return (
              <div key={idx} className={`truth-table-row ${isCurr ? 'is-current' : ''}`}>
                <span>{row.inA} + {row.inB}</span>
                <span>= C:{row.c} S:{row.s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// STAGE 3: FULL ADDER (A + B + Cin)
export function StageFullAdder() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [cin, setCin] = useState(1);

  const total = a + b + cin;
  const sum = total % 2;
  const cout = total >= 2 ? 1 : 0;

  return (
    <div className="stage-wrap">
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {/* 3 Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <button type="button" className={`logic-toggle-btn ${a ? 'is-active' : ''}`} onClick={() => setA(1 - a)}>
            <span className="logic-toggle-label">INPUT A</span>
            <span>{a}</span>
          </button>
          <button type="button" className={`logic-toggle-btn ${b ? 'is-active' : ''}`} onClick={() => setB(1 - b)}>
            <span className="logic-toggle-label">INPUT B</span>
            <span>{b}</span>
          </button>
          <button type="button" className={`logic-toggle-btn ${cin ? 'is-active' : ''}`} style={{ borderColor: cin ? '#57E6A5' : '' }} onClick={() => setCin(1 - cin)}>
            <span className="logic-toggle-label" style={{ color: '#57E6A5' }}>CARRY IN</span>
            <span style={{ color: cin ? '#57E6A5' : '' }}>{cin}</span>
          </button>
        </div>

        {/* Full Adder Block */}
        <div className="circuit-box-diagram" style={{ flexDirection: 'column', gap: '16px', minWidth: '320px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.15em', color: '#27D7FF' }}>
            1-BIT FULL ADDER BLOCK
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '20px', color: '#8B98A8' }}>
            A({a}) + B({b}) + Cin({cin})
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <div className="circuit-result-badge highlight-sum">
              <span className="res-lbl">SUM</span>
              <span className="res-val">{sum}</span>
            </div>
            <div className="circuit-result-badge highlight-carry">
              <span className="res-lbl">CARRY OUT</span>
              <span className="res-val">{cout}</span>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="truth-table-card">
          <div className="truth-table-header">CASCADABLE ARITHMETIC</div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '18px', color: '#F4F7FA' }}>
            Total = {total} (Binary: <span style={{ color: '#F59E0B' }}>{cout}</span><span style={{ color: '#27D7FF' }}>{sum}₂</span>)
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '10px', lineHeight: 1.5 }}>
            Because the Full Adder accepts an incoming <strong>Carry-In (Cin)</strong>, we can chain multiple full adders to add numbers of any bit-width.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 4: CHAINED FULL ADDERS (Ripple Carry Chain)
export function StageChainedAdders() {
  return (
    <div className="stage-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        RIPPLE CARRY PROPAGATION: C0 → C1 → C2 → C3 → C4
      </div>
      <div className="bit4-chain-container">
        {[
          { bit: 3, cin: 'C3', cout: 'C4', s: 'S3' },
          { bit: 2, cin: 'C2', cout: 'C3', s: 'S2' },
          { bit: 1, cin: 'C1', cout: 'C2', s: 'S1' },
          { bit: 0, cin: 'C0=0', cout: 'C1', s: 'S0' },
        ].map((unit) => (
          <div key={unit.bit} className="bit4-unit-box">
            <span className="bit4-unit-title">STAGE [{unit.bit}]</span>
            <div style={{ fontSize: '12px', color: '#8B98A8' }}>A{unit.bit} + B{unit.bit}</div>
            <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>
              {unit.cin} → {unit.cout}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#27D7FF' }}>
              {unit.s}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', maxWidth: '600px', textAlign: 'center', lineHeight: 1.6 }}>
        Each stage computes its sum and forwards its carry to the next stage on the left.<br />
        By chaining 4 full adders together, we can add two 4-bit numbers (0 to 15).
      </div>
    </div>
  );
}

// STAGE 5: 4-BIT ADDER (Interactive 0..15 + 0..15)
export function StageFourBitAdder() {
  const [valA, setValA] = useState(3); // 0..15 (0011)
  const [valB, setValB] = useState(5); // 0..15 (0101)

  const sumTotal = valA + valB;

  const aBits = [valA & 1, (valA >> 1) & 1, (valA >> 2) & 1, (valA >> 3) & 1];
  const bBits = [valB & 1, (valB >> 1) & 1, (valB >> 2) & 1, (valB >> 3) & 1];

  const c0 = 0;
  const s0 = (aBits[0] + bBits[0] + c0) % 2;
  const c1 = aBits[0] + bBits[0] + c0 >= 2 ? 1 : 0;

  const s1 = (aBits[1] + bBits[1] + c1) % 2;
  const c2 = aBits[1] + bBits[1] + c1 >= 2 ? 1 : 0;

  const s2 = (aBits[2] + bBits[2] + c2) % 2;
  const c3 = aBits[2] + bBits[2] + c2 >= 2 ? 1 : 0;

  const s3 = (aBits[3] + bBits[3] + c3) % 2;
  const c4 = aBits[3] + bBits[3] + c3 >= 2 ? 1 : 0;

  return (
    <div className="stage-wrap">
      {/* Input Adjusters */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>INPUT A: {valA}</span>
          <input
            type="range"
            min="0"
            max="15"
            value={valA}
            onChange={(e) => setValA(Number(e.target.value))}
            style={{ width: '130px', accentColor: '#27D7FF' }}
          />
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: '#8B98A8' }}>
            ({aBits[3]}{aBits[2]}{aBits[1]}{aBits[0]}₂)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>INPUT B: {valB}</span>
          <input
            type="range"
            min="0"
            max="15"
            value={valB}
            onChange={(e) => setValB(Number(e.target.value))}
            style={{ width: '130px', accentColor: '#57E6A5' }}
          />
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', color: '#8B98A8' }}>
            ({bBits[3]}{bBits[2]}{bBits[1]}{bBits[0]}₂)
          </span>
        </div>
      </div>

      {/* Ripple Carry 4 Full Adders Chain */}
      <div className="bit4-chain-container">
        {[
          { bit: 3, a: aBits[3], b: bBits[3], s: s3, cin: c3, cout: c4 },
          { bit: 2, a: aBits[2], b: bBits[2], s: s2, cin: c2, cout: c3 },
          { bit: 1, a: aBits[1], b: bBits[1], s: s1, cin: c1, cout: c2 },
          { bit: 0, a: aBits[0], b: bBits[0], s: s0, cin: c0, cout: c1 },
        ].map((stage) => (
          <div key={stage.bit} className="bit4-unit-box">
            <span className="bit4-unit-title">FA STAGE [{stage.bit}]</span>
            <div style={{ fontSize: '12px', color: '#8B98A8' }}>
              A={stage.a} + B={stage.b}
            </div>
            <div style={{ fontSize: '12px', color: '#F59E0B' }}>
              Cin={stage.cin} → Cout={stage.cout}
            </div>
            <div style={{ marginTop: '4px', fontSize: '16px', fontWeight: 800, color: '#27D7FF' }}>
              SUM = {stage.s}
            </div>
          </div>
        ))}
      </div>

      {/* Output Total */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div className="circuit-result-badge highlight-sum" style={{ minWidth: '220px' }}>
          <span className="res-lbl">DECIMAL RESULT</span>
          <span className="res-val">{sumTotal}</span>
        </div>
        <div className="circuit-result-badge highlight-carry" style={{ minWidth: '220px' }}>
          <span className="res-lbl">5-BIT BINARY WORD</span>
          <span className="res-val">{c4}{s3}{s2}{s1}{s0}₂</span>
        </div>
      </div>
    </div>
  );
}

// STAGE 6: SCALE THE COMPUTATION (More than addition)
export function StageScaleArithmetic() {
  return (
    <div className="stage-wrap">
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
        <div style={{ flex: 1, background: '#0B1120', border: '1px solid #1E293B', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF', marginBottom: '12px' }}>
            AVAILABLE CIRCUITS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#F4F7FA' }}>
            <div style={{ padding: '6px 10px', background: '#020617', borderRadius: '6px' }}>• ADDER (A + B)</div>
            <div style={{ padding: '6px 10px', background: '#020617', borderRadius: '6px' }}>• SUBTRACTOR (A - B)</div>
            <div style={{ padding: '6px 10px', background: '#020617', borderRadius: '6px' }}>• BITWISE AND (A · B)</div>
            <div style={{ padding: '6px 10px', background: '#020617', borderRadius: '6px' }}>• BITWISE OR (A + B)</div>
            <div style={{ padding: '6px 10px', background: '#020617', borderRadius: '6px' }}>• BITWISE XOR (A ⊕ B)</div>
          </div>
        </div>

        <div style={{ color: '#64748B', fontSize: '28px' }}>→</div>

        <div style={{ flex: 1.2, background: '#020617', border: '2px solid #27D7FF', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#27D7FF' }}>
            MULTIPLEXED DIGITAL ENGINE
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            What if we feed inputs A and B into ALL of these circuits simultaneously, and use an <strong>Operation Code (Opcode)</strong> to choose which result reaches the output?
          </div>
          <div style={{ padding: '8px 14px', background: 'rgba(39, 215, 255, 0.1)', borderRadius: '6px', fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>
            THAT IS AN ARITHMETIC LOGIC UNIT (ALU)
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 7: THE ALU (Interactive ALU Engine)
export function StageALU() {
  const [valA, setValA] = useState(5);
  const [valB, setValB] = useState(3);
  const [op, setOp] = useState('ADD');

  let result = 0;
  if (op === 'ADD') result = (valA + valB) & 15;
  if (op === 'SUB') result = (valA - valB + 16) & 15;
  if (op === 'AND') result = valA & valB;
  if (op === 'OR') result = valA | valB;
  if (op === 'XOR') result = valA ^ valB;

  return (
    <div className="stage-wrap">
      {/* Opcode selector */}
      <div className="alu-ops-selector">
        {['ADD', 'SUB', 'AND', 'OR', 'XOR'].map((item) => (
          <button
            key={item}
            type="button"
            className={`alu-op-btn ${op === item ? 'is-selected' : ''}`}
            onClick={() => setOp(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Inputs and ALU Core View */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>A: {valA}</span>
            <input type="range" min="0" max="15" value={valA} onChange={(e) => setValA(Number(e.target.value))} style={{ width: '90px', accentColor: '#27D7FF' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>B: {valB}</span>
            <input type="range" min="0" max="15" value={valB} onChange={(e) => setValB(Number(e.target.value))} style={{ width: '90px', accentColor: '#57E6A5' }} />
          </div>
        </div>

        {/* ALU V-Shape Trapezoid Symbol */}
        <svg width="220" height="160" viewBox="0 0 220 160">
          <polygon points="20,20 180,50 180,110 20,140 20,95 50,80 20,65" fill="#0B1120" stroke="#27D7FF" strokeWidth="2.5" />
          <text x="95" y="85" fill="#27D7FF" fontSize="16" fontWeight="800" textAnchor="middle">ALU</text>
          <text x="95" y="105" fill="#8B98A8" fontSize="12" textAnchor="middle">OP: {op}</text>
        </svg>

        {/* Output */}
        <div className="circuit-result-badge highlight-sum" style={{ minWidth: '180px' }}>
          <span className="res-lbl">{op} RESULT</span>
          <span className="res-val">{result}</span>
          <span style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>
            Binary: {result.toString(2).padStart(4, '0')}₂
          </span>
        </div>
      </div>
    </div>
  );
}

// STAGE 8: FROM ALU TO COMPUTER (Processor Architecture)
export function StageFromALUToComputer() {
  return (
    <div className="stage-wrap">
      <div className="system-cpu-block">
        <div className="cpu-module-box">
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>INPUT / REGISTERS</span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#F4F7FA' }}>R0, R1, R2</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>
        <div className="cpu-module-box" style={{ borderColor: '#27D7FF', background: 'rgba(39, 215, 255, 0.08)' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF' }}>COMPUTE CORE</span>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#27D7FF' }}>ALU</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>
        <div className="cpu-module-box">
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>STORAGE</span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#F4F7FA' }}>DATA MEMORY</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '580px', lineHeight: 1.6 }}>
        When the ALU is wrapped with a <strong>Program Counter (Control Logic)</strong> and <strong>Memory</strong>, computation becomes a fully programmable general-purpose computer.
      </div>
    </div>
  );
}

// STAGE 9: THE COMPLETE LADDER (Hierarchy Chain)
export function StageComputationHierarchy() {
  return (
    <div className="stage-wrap">
      <div className="ladder-chain-view">
        <div className="ladder-step-bar">
          <span style={{ color: '#8B98A8' }}>01. PHYSICAL SWITCH</span>
          <span>TRANSISTOR (0 & 1)</span>
        </div>
        <div className="ladder-step-bar">
          <span style={{ color: '#8B98A8' }}>02. BOOLEAN LOGIC</span>
          <span>AND, OR, NOT, XOR GATES</span>
        </div>
        <div className="ladder-step-bar">
          <span style={{ color: '#8B98A8' }}>03. 1-BIT ARITHMETIC</span>
          <span>HALF ADDER (SUM & CARRY)</span>
        </div>
        <div className="ladder-step-bar">
          <span style={{ color: '#8B98A8' }}>04. CASCADABLE ARITHMETIC</span>
          <span>FULL ADDER (+ Cin)</span>
        </div>
        <div className="ladder-step-bar">
          <span style={{ color: '#8B98A8' }}>05. MULTI-BIT ARITHMETIC</span>
          <span>4-BIT ADDER CHAIN</span>
        </div>
        <div className="ladder-step-bar highlight-top">
          <span style={{ color: '#27D7FF' }}>06. COMPUTATIONAL ENGINE</span>
          <span>ARITHMETIC LOGIC UNIT (ALU)</span>
        </div>
      </div>
    </div>
  );
}

// STAGE 10: PLATFORMS HANDOFF (Transition to Slide 11)
export function StageHardwareHandoff() {
  return (
    <div className="stage-wrap">
      <div style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.15em' }}>
        ONE COMPUTATION — THREE HARDWARE TARGETS
      </div>
      <div className="handoff-platforms-grid">
        <div className="handoff-card" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF' }}>VSDSQUADRON FPGA</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>RTL SYNTHESIS</span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', textAlign: 'center' }}>
            Synthesize ALU Verilog directly into physical LUT logic.
          </div>
        </div>

        <div className="handoff-card" style={{ borderColor: '#8A7CFF' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#8A7CFF' }}>RENESAS V2 MCU</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>EMBEDDED AI KIT</span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', textAlign: 'center' }}>
            Compile quantized neural kernels for on-chip MCU execution.
          </div>
        </div>

        <div className="handoff-card" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5' }}>HELTEC / ESP32</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>TINYML SENSOR</span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', textAlign: 'center' }}>
            Run real-time edge classification with wireless connectivity.
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 24px', borderRadius: '20px', background: 'rgba(39, 215, 255, 0.1)', border: '1px solid #27D7FF', color: '#27D7FF', fontSize: '12px', fontWeight: 800 }}>
        NEXT → SLIDE 11: FROM RTL TO REAL HARDWARE
      </div>
    </div>
  );
}
