import React, { useState } from 'react';

export function Stage0ExistingAndGate({ a, setA, b, setB }) {
  return (
    <div className="and-gate-stage-container">
      <div className="and-btn-group">
        <button
          onClick={() => setA(1 - a)}
          className="and-input-btn"
          style={{
            background: a ? 'rgba(92,174,255,0.2)' : '#101d31',
            border: `2px solid ${a ? '#5caeff' : '#355477'}`
          }}
        >
          {a}
        </button>
        <button
          onClick={() => setB(1 - b)}
          className="and-input-btn"
          style={{
            background: b ? 'rgba(92,174,255,0.2)' : '#101d31',
            border: `2px solid ${b ? '#5caeff' : '#355477'}`
          }}
        >
          {b}
        </button>
      </div>
      <div style={{ fontSize: '40px', color: '#6f809a' }}>→</div>
      <div className="and-output-card">
        <div style={{ fontSize: '14px', letterSpacing: '0.15em', color: '#6f809a', marginBottom: '20px', fontWeight: 'bold' }}>
          LOGIC GATE (AND)
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#dce6f4' }}>
          <span>Input A</span> <span>{a}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#dce6f4', borderBottom: '1px solid #1c2b42', paddingBottom: '20px' }}>
          <span>Input B</span> <span>{b}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', color: (a & b) ? '#5caeff' : '#6f809a' }}>
          <span>Output</span> <span>{a & b}</span>
        </div>
      </div>
    </div>
  );
}

export function Stage1MoreLogic({ a, b }) {
  return (
    <div className="t-wrap">
      <div className="logic-net-grid">
        <div className="net-gate-box" style={{ borderColor: '#27D7FF' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>AND GATE</div>
            <div style={{ fontSize: '11px', color: '#8B98A8' }}>A({a}) · B({b})</div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: (a & b) ? '#27D7FF' : '#64748B' }}>
            {a & b}
          </div>
        </div>

        <div className="net-gate-box" style={{ borderColor: '#4B8DFF' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#4B8DFF' }}>OR GATE</div>
            <div style={{ fontSize: '11px', color: '#8B98A8' }}>A({a}) + B({b})</div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: (a | b) ? '#4B8DFF' : '#64748B' }}>
            {a | b}
          </div>
        </div>

        <div className="net-gate-box" style={{ borderColor: '#8A7CFF' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>NOT GATE</div>
            <div style={{ fontSize: '11px', color: '#8B98A8' }}>Ā (Invert A={a})</div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: (1 - a) ? '#8A7CFF' : '#64748B' }}>
            {1 - a}
          </div>
        </div>

        <div className="net-gate-box" style={{ borderColor: '#57E6A5' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>XOR GATE</div>
            <div style={{ fontSize: '11px', color: '#8B98A8' }}>A({a}) ⊕ B({b})</div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: (a ^ b) ? '#57E6A5' : '#64748B' }}>
            {a ^ b}
          </div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        GATES ARE PERMANENTLY WIRED TOGETHER → CREATES FIXED COMBINATIONAL LOGIC
      </div>
    </div>
  );
}

export function Stage2ProgrammableConnections() {
  const [sw1, setSw1] = useState(true);
  const [sw2, setSw2] = useState(false);

  return (
    <div className="t-wrap">
      <div className="switch-route-diagram">
        <svg width="280" height="160" viewBox="0 0 280 160">
          {/* Input lines */}
          <line x1="20" y1="40" x2="80" y2="40" stroke="#27D7FF" strokeWidth="3" />
          <line x1="20" y1="120" x2="80" y2="120" stroke="#27D7FF" strokeWidth="3" />
          <text x="15" y="35" fill="#8B98A8" fontSize="10">INPUT A</text>
          <text x="15" y="115" fill="#8B98A8" fontSize="10">INPUT B</text>

          {/* Switch 1 */}
          <line x1="80" y1="40" x2="160" y2="40" stroke={sw1 ? "#27D7FF" : "#334155"} strokeWidth={sw1 ? "3" : "1"} />
          <circle cx="120" cy="40" r="8" fill={sw1 ? "#27D7FF" : "#020617"} stroke="#27D7FF" strokeWidth="2" cursor="pointer" onClick={() => setSw1(!sw1)} />

          {/* Switch 2 */}
          <line x1="80" y1="40" x2="160" y2="120" stroke={sw2 ? "#57E6A5" : "#334155"} strokeWidth={sw2 ? "3" : "1"} />
          <circle cx="120" cy="80" r="8" fill={sw2 ? "#57E6A5" : "#020617"} stroke="#57E6A5" strokeWidth="2" cursor="pointer" onClick={() => setSw2(!sw2)} />

          {/* Gate Box */}
          <rect x="160" y="20" width="100" height="120" rx="8" fill="#0B1120" stroke="#334155" strokeWidth="2" />
          <text x="210" y="85" fill="#F4F7FA" fontSize="12" fontWeight="800" textAnchor="middle">LOGIC BLOCK</text>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF' }}>
            CLICK SWITCHES TO TOGGLE CONNECTIONS
          </div>
          <div style={{ fontSize: '11px', color: '#8B98A8', lineHeight: 1.6 }}>
            Top Switch: <strong style={{ color: sw1 ? '#27D7FF' : '#64748B' }}>{sw1 ? "CONNECTED (ON)" : "OPEN (OFF)"}</strong><br />
            Cross Switch: <strong style={{ color: sw2 ? '#57E6A5' : '#64748B' }}>{sw2 ? "CONNECTED (ON)" : "OPEN (OFF)"}</strong><br />
            We don't remake silicon. We change the state of switches to route signals.
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stage3PLD() {
  return (
    <div className="t-wrap">
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center', background: '#020617', border: '2px solid #1E293B', borderRadius: '16px', padding: '30px' }}>
        <svg width="220" height="180" viewBox="0 0 220 180">
          <rect x="40" y="20" width="140" height="140" rx="8" fill="#0B1120" stroke="#27D7FF" strokeWidth="2" />
          <text x="110" y="50" fill="#27D7FF" fontSize="12" fontWeight="800" textAnchor="middle">PLD ARRAY</text>
          {/* Connection matrix dots */}
          {[60, 90, 120].map((y) => (
            <React.Fragment key={y}>
              <line x1="20" y1={y} x2="200" y2={y} stroke="#334155" strokeWidth="2" />
              {[70, 100, 130, 160].map((x) => (
                <circle key={x} cx={x} cy={y} r="4" fill={(x + y) % 3 === 0 ? "#27D7FF" : "#020617"} stroke="#27D7FF" strokeWidth="1.5" />
              ))}
            </React.Fragment>
          ))}
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#F4F7FA' }}>
            PROGRAMMABLE LOGIC DEVICE (PLD)
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            The first commercial reconfigurable silicon. Instead of designing a custom ASIC mask, engineers could configure logic on their benchtop using fusible links or EPROM cells.
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stage4PLAvsPAL() {
  return (
    <div className="t-wrap">
      <div className="pla-pal-container">
        {/* PLA */}
        <div className="pl-card is-pla">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#27D7FF' }}>PLA</span>
            <span style={{ fontSize: '10px', color: '#27D7FF', fontWeight: 700 }}>PROGRAMMABLE LOGIC ARRAY</span>
          </div>
          <div className="pl-block-diagram">
            <div className="pl-strip prog">PROGRAMMABLE AND ARRAY</div>
            <div style={{ textAlign: 'center', color: '#64748B', fontSize: '12px' }}>↓</div>
            <div className="pl-strip prog">PROGRAMMABLE OR ARRAY</div>
          </div>
          <div style={{ fontSize: '11px', color: '#8B98A8', marginTop: '6px' }}>
            Both planes are programmable. Maximum flexibility, but higher silicon cost and higher propagation delay.
          </div>
        </div>

        {/* PAL */}
        <div className="pl-card is-pal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#8A7CFF' }}>PAL</span>
            <span style={{ fontSize: '10px', color: '#8A7CFF', fontWeight: 700 }}>PROGRAMMABLE ARRAY LOGIC</span>
          </div>
          <div className="pl-block-diagram">
            <div className="pl-strip prog" style={{ borderColor: '#8A7CFF', color: '#8A7CFF' }}>PROGRAMMABLE AND ARRAY</div>
            <div style={{ textAlign: 'center', color: '#64748B', fontSize: '12px' }}>↓</div>
            <div className="pl-strip fixed">FIXED OR ARRAY (LOCKED)</div>
          </div>
          <div style={{ fontSize: '11px', color: '#8B98A8', marginTop: '6px' }}>
            OR plane is hardwired. Simpler, faster, cheaper. Became the industry standard for glue logic.
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stage5CPLD() {
  return (
    <div className="t-wrap">
      <div className="cpld-matrix-view">
        <div className="cpld-blocks-row">
          <div className="cpld-logic-box">LOGIC BLOCK 1 (PAL)</div>
          <div className="cpld-logic-box">LOGIC BLOCK 2 (PAL)</div>
          <div className="cpld-logic-box">LOGIC BLOCK 3 (PAL)</div>
        </div>
        <div className="cpld-interconnect-bar">
          CENTRAL PROGRAMMABLE INTERCONNECT MATRIX
        </div>
        <div className="cpld-blocks-row">
          <div className="cpld-logic-box">LOGIC BLOCK 4 (PAL)</div>
          <div className="cpld-logic-box">LOGIC BLOCK 5 (PAL)</div>
          <div className="cpld-logic-box">LOGIC BLOCK 6 (PAL)</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        CPLD: COMBINES MULTIPLE MACROCELLS TOGETHER FOR MEDIUM-DENSITY DESIGNS
      </div>
    </div>
  );
}

export function Stage6FPGAFabric() {
  return (
    <div className="t-wrap">
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <div className="fpga-grid-fabric">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`fpga-lut-cell ${i % 3 === 0 ? 'is-lit' : ''}`}>
              CLB
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '420px' }}>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#27D7FF' }}>
            FIELD-PROGRAMMABLE GATE ARRAY
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            Instead of coarse macrocells, the FPGA uses a fine-grained 2D array of <strong>Configurable Logic Blocks (CLBs)</strong> made of SRAM-based Look-Up Tables (LUTs) and Flip-Flops, interconnected by horizontal and vertical routing channels.
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stage7SwitchMatrix() {
  const [switches, setSwitches] = useState({
    s0: true, s1: false, s2: false, s3: true, s4: false
  });

  const toggle = (k) => setSwitches(prev => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className="t-wrap">
      <div className="switch-matrix-container">
        <svg width="260" height="260" viewBox="0 0 260 260" className="switch-grid-svg">
          {/* Horizontal lines */}
          <line x1="20" y1="70" x2="240" y2="70" stroke={switches.s0 ? "#27D7FF" : "#334155"} strokeWidth="3" />
          <line x1="20" y1="130" x2="240" y2="130" stroke={switches.s2 ? "#27D7FF" : "#334155"} strokeWidth="3" />
          <line x1="20" y1="190" x2="240" y2="190" stroke={switches.s3 ? "#27D7FF" : "#334155"} strokeWidth="3" />

          {/* Vertical lines */}
          <line x1="70" y1="20" x2="70" y2="240" stroke={switches.s0 ? "#27D7FF" : "#334155"} strokeWidth="3" />
          <line x1="130" y1="20" x2="130" y2="240" stroke={switches.s1 ? "#27D7FF" : "#334155"} strokeWidth="3" />
          <line x1="190" y1="20" x2="190" y2="240" stroke={switches.s3 ? "#27D7FF" : "#334155"} strokeWidth="3" />

          {/* Intersection switch nodes */}
          <circle cx="70" cy="70" r="8" fill={switches.s0 ? "#27D7FF" : "#020617"} stroke="#27D7FF" strokeWidth="2" className="interactive-switch-node" onClick={() => toggle('s0')} />
          <circle cx="130" cy="70" r="8" fill={switches.s1 ? "#27D7FF" : "#020617"} stroke="#27D7FF" strokeWidth="2" className="interactive-switch-node" onClick={() => toggle('s1')} />
          <circle cx="190" cy="70" r="8" fill={switches.s2 ? "#27D7FF" : "#020617"} stroke="#27D7FF" strokeWidth="2" className="interactive-switch-node" onClick={() => toggle('s2')} />
          <circle cx="130" cy="130" r="8" fill={switches.s3 ? "#27D7FF" : "#020617"} stroke="#27D7FF" strokeWidth="2" className="interactive-switch-node" onClick={() => toggle('s3')} />
          <circle cx="190" cy="190" r="8" fill={switches.s4 ? "#27D7FF" : "#020617"} stroke="#27D7FF" strokeWidth="2" className="interactive-switch-node" onClick={() => toggle('s4')} />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#27D7FF' }}>
            CLICK NODES TO CLOSE / OPEN SWITCHES
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            In an FPGA, routing channels cross at <strong>Switch Boxes</strong>. When a switch SRAM cell stores a <strong>1</strong>, pass transistors close, routing electrical signals between horizontal and vertical tracks.
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stage8RTLtoBitstream() {
  return (
    <div className="t-wrap">
      <div className="rtl-pipeline-chain">
        <div className="rtl-pipe-card">
          <span style={{ fontSize: '11px', color: '#27D7FF', fontWeight: 800 }}>01. RTL CODE</span>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#F4F7FA' }}>assign y = a & b;</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '18px' }}>→</span>
        <div className="rtl-pipe-card">
          <span style={{ fontSize: '11px', color: '#4B8DFF', fontWeight: 800 }}>02. SYNTHESIS</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Yosys Logic Gates</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '18px' }}>→</span>
        <div className="rtl-pipe-card">
          <span style={{ fontSize: '11px', color: '#8A7CFF', fontWeight: 800 }}>03. PLACE & ROUTE</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>nextpnr Grid Routing</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '18px' }}>→</span>
        <div className="rtl-pipe-card active-step">
          <span style={{ fontSize: '11px', color: '#57E6A5', fontWeight: 800 }}>04. BITSTREAM</span>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#57E6A5' }}>0110100110...</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600, marginTop: '10px' }}>
        THE BITSTREAM IS A STREAM OF ON/OFF STATES THAT CONFIGURES THE SWITCH MATRIX
      </div>
    </div>
  );
}

export function Stage9ConfiguredHardware() {
  return (
    <div className="t-wrap">
      <div className="configured-hero-card">
        <div style={{ fontSize: '28px', fontFamily: 'Space Grotesk', fontWeight: 800, color: '#F4F7FA', textAlign: 'center' }}>
          YOU DID NOT WRITE AN APP.<br />
          <span style={{ color: '#57E6A5' }}>YOU CONFIGURED PHYSICAL SILICON.</span>
        </div>
        <div style={{ fontSize: '13px', color: '#8B98A8', textAlign: 'center', maxWidth: '520px', lineHeight: 1.6 }}>
          With software, a CPU runs a stream of sequential instructions.<br />
          With an FPGA, the bitstream physically wires logic elements together into dedicated parallel circuits.
        </div>
        <div style={{ padding: '8px 20px', borderRadius: '20px', background: 'rgba(39, 215, 255, 0.1)', border: '1px solid #27D7FF', color: '#27D7FF', fontSize: '12px', fontWeight: 800 }}>
          READY FOR COMPUTATION → PRESS RIGHT TO BUILD ADDERS & ALUs
        </div>
      </div>
    </div>
  );
}
