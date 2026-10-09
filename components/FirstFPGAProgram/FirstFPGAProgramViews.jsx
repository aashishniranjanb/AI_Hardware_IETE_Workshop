import React, { useState, useEffect } from 'react';
import { GlyphIcon, InlineIcon } from '../deck/GlyphIcon';

// STAGE 1: WHY_BLINK (Why start with blink?)
export function StageWhyBlink() {
  const steps = [
    { title: 'RTL SOURCE', desc: 'Verilog code defining logic', color: '#8A7CFF' },
    { title: 'TOOLCHAIN', desc: 'Yosys & NextPNR compile circuit', color: '#27D7FF' },
    { title: 'BITSTREAM', desc: 'Switch configuration binary', color: '#4B8DFF' },
    { title: 'FPGA SILICON', desc: 'iCE40UP5K loaded via onboard USB', color: '#FFB84D' },
    { title: 'PHYSICAL LED', desc: 'Hardware pin switches state', color: '#57E6A5' }
  ];

  return (
    <div className="ff-wrap">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.1em' }}>
          <InlineIcon glyph="note" /> SANITY TEST BEFORE THE AI ACCELERATOR
        </span>
        <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#F4F7FA', marginTop: '6px' }}>
          VERIFY THE ENTIRE DEVELOPMENT PIPELINE
        </h3>
        <p style={{ fontSize: '14px', color: '#8B98A8', maxWidth: '650px', margin: '6px auto 0 auto' }}>
          Before attempting to route 784 neural network inputs and 16-bit multipliers, prove that your computer can compile code, generate a bitstream, program the FPGA over USB, and drive physical silicon.
        </p>
      </div>

      <div className="ff-flow-container">
        {steps.map((st, i) => (
          <React.Fragment key={st.title}>
            <div className="ff-flow-node" style={{ borderColor: st.color }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: st.color }}>{st.title}</div>
              <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>{st.desc}</div>
            </div>
            {i < steps.length - 1 && <span className="ff-flow-arrow">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// STAGE 2: RTL_CONCEPT (What are we asking the FPGA to do?)
export function StageRTLConcept() {
  return (
    <div className="ff-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', maxWidth: '920px', width: '100%' }}>
        <div className="ff-card">
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFB84D', letterSpacing: '0.1em' }}>
            CPU MENTAL MODEL (SOFTWARE)
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#F4F7FA' }}>
            Sequential Instruction Fetch Loop
          </div>
          <div style={{ background: '#070B13', padding: '14px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            while (true) &#123;<br />
            &nbsp;&nbsp;led = 1;<br />
            &nbsp;&nbsp;sleep_ms(500);<br />
            &nbsp;&nbsp;led = 0;<br />
            &nbsp;&nbsp;sleep_ms(500);<br />
            &#125;
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>
            CPU spends millions of clock cycles executing jump & branch instructions to burn time.
          </div>
        </div>

        <div className="ff-card" style={{ borderColor: 'rgba(39, 215, 255, 0.4)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.1em' }}>
            FPGA MENTAL MODEL (DIGITAL HARDWARE)
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#57E6A5' }}>
            Dedicated Binary Counter & Output Net
          </div>
          <div style={{ background: '#070B13', padding: '14px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#27D7FF', lineHeight: 1.6 }}>
            // Hardware Registers + Combinational Net<br />
            reg [23:0] counter;<br />
            always @(posedge clk)<br />
            &nbsp;&nbsp;counter &lt;= counter + 1;<br />
            assign led = counter[23];
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>
            24 flip-flops increment continuously in silicon. The top bit simply wires out to the LED pad. No instruction decoder!
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 3: VERILOG (Write the RTL)
export function StageVerilog() {
  return (
    <div className="ff-wrap">
      <div className="ff-editor-box">
        <div className="ff-editor-topbar">
          <div className="ff-editor-dots">
            <span className="ff-editor-dot" style={{ background: '#EF4444' }} />
            <span className="ff-editor-dot" style={{ background: '#F59E0B' }} />
            <span className="ff-editor-dot" style={{ background: '#10B981' }} />
          </div>
          <span>blinky.v — Verilog Hardware Description</span>
          <span>iCE40UP5K</span>
        </div>
        <pre className="ff-code-content">
          <span className="ff-hl-kw">module</span> <span className="ff-hl-var">blinky</span> (<br />
          &nbsp;&nbsp;<span className="ff-hl-kw">input</span>  <span className="ff-hl-type">wire</span> <span className="ff-hl-var">clk</span>,       <span style={{ color: '#64748B' }}>// Physical oscillator pin</span><br />
          &nbsp;&nbsp;<span className="ff-hl-kw">output</span> <span className="ff-hl-type">wire</span> <span className="ff-hl-var">led</span>        <span style={{ color: '#64748B' }}>// Output pad connected to LED</span><br />
          );<br /><br />
          &nbsp;&nbsp;<span className="ff-hl-kw">reg</span> [<span className="ff-hl-num">23</span>:<span className="ff-hl-num">0</span>] <span className="ff-hl-var">counter</span>;        <span style={{ color: '#64748B' }}>// 24 flip-flop register chain</span><br /><br />
          &nbsp;&nbsp;<span className="ff-hl-kw">always</span> @(<span className="ff-hl-kw">posedge</span> <span className="ff-hl-var">clk</span>)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="ff-hl-var">counter</span> <span className="ff-hl-op">&lt;=</span> <span className="ff-hl-var">counter</span> <span className="ff-hl-op">+</span> <span className="ff-hl-num">1'b1</span>; <span style={{ color: '#64748B' }}>// Advance binary count every pulse</span><br /><br />
          &nbsp;&nbsp;<span className="ff-hl-kw">assign</span> <span className="ff-hl-var">led</span> <span className="ff-hl-op">=</span> <span className="ff-hl-var">counter</span>[<span className="ff-hl-num">23</span>];    <span style={{ color: '#64748B' }}>// Drive LED directly from bit 23</span><br /><br />
          <span className="ff-hl-kw">endmodule</span>
        </pre>
      </div>

      <div style={{ marginTop: '14px', fontSize: '13px', color: '#57E6A5', fontWeight: 700 }}>
        <InlineIcon glyph="note" /> NO INSTRUCTIONS. THIS VERILOG DESCRIBES PHYSICAL WIRE AND FLIP-FLOPS.
      </div>
    </div>
  );
}

// STAGE 4: CLOCK (The clock drives everything)
export function StageClock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => (t + 1) % 16);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const ledState = (tick >= 8) ? 1 : 0;

  return (
    <div className="ff-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '850px' }}>
        <svg width="600" height="100" viewBox="0 0 600 100">
          <text x="10" y="25" fill="#8B98A8" fontSize="12" fontWeight="700">OSCILLATOR CLOCK (clk)</text>
          {/* Square wave */}
          <path
            d="M 20 70 L 60 70 L 60 30 L 100 30 L 100 70 L 140 70 L 140 30 L 180 30 L 180 70 L 220 70 L 220 30 L 260 30 L 260 70 L 300 70 L 300 30 L 340 30 L 340 70 L 380 70 L 380 30 L 420 30 L 420 70 L 460 70 L 460 30 L 500 30 L 500 70 L 540 70 L 540 30 L 580 30"
            fill="none"
            stroke="#27D7FF"
            strokeWidth="2.5"
          />
          {/* Rising edge markers */}
          {[60, 140, 220, 300, 380, 460, 540].map((x) => (
            <polygon key={x} points={`${x-4},45 ${x},32 ${x+4},45`} fill="#57E6A5" />
          ))}
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div className="ff-card" style={{ minWidth: '220px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>COUNTER ACCUMULATOR</div>
            <div style={{ fontSize: '32px', fontFamily: 'monospace', fontWeight: 900, color: '#27D7FF', marginTop: '6px' }}>
              0x{tick.toString(16).toUpperCase()}
            </div>
            <div style={{ fontSize: '12px', color: '#57E6A5', marginTop: '4px' }}>
              INCREMENTS EVERY posedge clk
            </div>
          </div>

          <div style={{ fontSize: '28px', color: '#8A7CFF' }}>→</div>

          <div className="ff-card" style={{ minWidth: '220px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>LED OUTPUT BIT (MSB)</div>
            <div style={{ fontSize: '32px', fontFamily: 'monospace', fontWeight: 900, color: ledState ? '#57E6A5' : '#64748B', marginTop: '6px' }}>
              {ledState ? 'HIGH (1)' : 'LOW (0)'}
            </div>
            <div style={{ fontSize: '12px', color: ledState ? '#57E6A5' : '#8B98A8', marginTop: '4px' }}>
              {ledState ? 'LED ON' : 'LED OFF'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 5: SYNTHESIS (Compile the hardware: Synthesis)
export function StageSynthesis() {
  return (
    <div className="ff-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center', width: '100%', maxWidth: '960px' }}>
        <div className="ff-card">
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>INPUT: RTL VERILOG</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>blinky.v</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.5 }}>
            Human-readable logic statements:<br />
            • <code>counter &lt;= counter + 1</code><br />
            • <code>assign led = counter[23]</code>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: 'rgba(39, 215, 255, 0.15)', border: '1.5px solid #27D7FF', padding: '12px 18px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#27D7FF' }}>YOSYS SYNTHESIS</div>
            <div style={{ fontSize: '12px', color: '#8B98A8' }}>Logic Decomposition</div>
          </div>
          <div style={{ fontSize: '20px', color: '#27D7FF', marginTop: '4px' }}>→</div>
        </div>

        <div className="ff-card" style={{ borderColor: 'rgba(87, 230, 165, 0.4)' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>OUTPUT: GATE-LEVEL NETLIST</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>iCE40 Primitive Cell Targets</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA', lineHeight: 1.5 }}>
            • <strong>24 × SB_DFF</strong> (Flip-Flops)<br />
            • <strong>24 × SB_LUT4</strong> (Look-Up Tables for adder logic)<br />
            • <strong>1 × SB_IO</strong> (Configured as Output Buffer)
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 6: PLACE_ROUTE (Place + Route)
export function StagePlaceRoute() {
  return (
    <div className="ff-wrap">
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center', maxWidth: '950px', width: '100%' }}>
        <svg width="340" height="260" viewBox="0 0 340 260">
          <rect x="10" y="10" width="320" height="240" rx="8" fill="#0A111E" stroke="#27D7FF" strokeWidth="1.5" />
          <text x="170" y="30" fill="#27D7FF" fontSize="12" fontWeight="800" textAnchor="middle">iCE40UP5K SILICON FABRIC (PLB GRID)</text>
          
          {/* Grid of Logic blocks */}
          {Array.from({ length: 4 }).map((_, r) => (
            Array.from({ length: 6 }).map((_, c) => {
              const isUsed = (r === 1 && c >= 1 && c <= 4) || (r === 2 && c === 2);
              return (
                <rect
                  key={`${r}-${c}`}
                  x={30 + c * 48}
                  y={46 + r * 46}
                  width="36"
                  height="34"
                  rx="4"
                  fill={isUsed ? 'rgba(87, 230, 165, 0.25)' : '#111C2E'}
                  stroke={isUsed ? '#57E6A5' : '#1E293B'}
                  strokeWidth="1.5"
                />
              );
            })
          ))}

          {/* Routed tracks */}
          <path d="M 66 63 L 240 63 L 240 155 L 140 155" fill="none" stroke="#57E6A5" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="140" cy="155" r="4" fill="#27D7FF" />
          <text x="170" y="240" fill="#8B98A8" fontSize="12" textAnchor="middle">NEXTPNR DETERMINES OPTIMAL DELAY ROUTING</text>
        </svg>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5' }}>
            NEXTPNR IMPLEMENTATION ENGINE
          </div>
          <div style={{ fontSize: '13px', color: '#F4F7FA', lineHeight: 1.6 }}>
            <strong>1. Placement:</strong> Assigns each LUT and Flip-Flop to exact physical slices (X/Y coordinates) inside the FPGA die.<br />
            <strong>2. Routing:</strong> Finds continuous physical copper tracks through the programmable switch matrices to connect clock, carry chain, and output.
          </div>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 700 }}>
            Timing Closure: Verified to satisfy target oscillator frequency.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 7: BITSTREAM (Generate the Bitstream)
export function StageBitstream() {
  return (
    <div className="ff-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>ICEPACK PACKAGER</div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#F4F7FA' }}>blinky.bin (Raw Hardware Bitstream)</div>
      </div>

      <div className="ff-card" style={{ maxWidth: '780px', width: '100%', background: '#090E17', borderColor: '#4B8DFF' }}>
        <div style={{ fontSize: '12px', color: '#8B98A8', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
          BINARY BITSTREAM CONTENT (HEX VIEW)
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#57E6A5', lineHeight: 1.8, letterSpacing: '0.05em' }}>
          7e aa 99 7e 01 00 00 00 11 00 00 00 ff ff ff ff<br />
          21 00 00 00 00 01 80 00 02 4b 00 00 00 00 00 00<br />
          54 69 74 61 6e 20 63 6f 6e 66 69 67 75 72 65 64<br />
          00 12 34 56 78 9a bc de f0 11 22 33 44 55 66 77
        </div>
        <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '6px' }}>
          This binary sequence sets every SRAM configuration bit inside the chip to close the exact switches required.
        </div>
      </div>
    </div>
  );
}

// STAGE 8: PROGRAM (Program the FPGA via Onboard FT232H)
export function StageProgram() {
  return (
    <div className="ff-wrap">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>
          <InlineIcon glyph="note" /> CRITICAL ARCHITECTURE NOTE
        </span>
        <div style={{ fontSize: '20px', fontWeight: 900, color: '#F4F7FA' }}>
          PROGRAMMED DIRECTLY VIA ONBOARD FT232H
        </div>
      </div>

      <div className="ff-flow-container" style={{ maxWidth: '900px' }}>
        <div className="ff-flow-node" style={{ borderColor: '#27D7FF' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>LAPTOP</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>iceprog blinky.bin</div>
        </div>

        <span className="ff-flow-arrow">→</span>

        <div className="ff-flow-node" style={{ borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>USB CABLE</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>Standard Type-C</div>
        </div>

        <span className="ff-flow-arrow">→</span>

        <div className="ff-flow-node active" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 900 }}>ONBOARD FT232H</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>Hardware Bridge</div>
        </div>

        <span className="ff-flow-arrow">→</span>

        <div className="ff-flow-node" style={{ borderColor: '#FFB84D' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>iCE40UP5K</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>FPGA SRAM Config</div>
        </div>
      </div>

      <div style={{ marginTop: '22px', fontSize: '12px', color: '#57E6A5', background: 'rgba(87, 230, 165, 0.1)', padding: '8px 20px', borderRadius: '20px', border: '1px solid rgba(87, 230, 165, 0.3)' }}>
        NO EXTERNAL DONGLE • NO SEPARATE FT232H BREAKOUT BOARD
      </div>
    </div>
  );
}

// STAGE 9: CONFIGURED (The circuit now exists inside the FPGA)
export function StageConfigured() {
  return (
    <div className="ff-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '850px', width: '100%' }}>
        <div className="ff-card">
          <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>BEFORE FLASHING</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#F4F7FA' }}>Unconfigured SRAM Fabric</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            The FPGA is blank silicon. All switch transistors are floating open. No circuit is active.
          </div>
        </div>

        <div className="ff-card" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>AFTER FLASHING (NOW)</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#57E6A5' }}>Dedicated Blinker Circuit</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA', lineHeight: 1.6 }}>
            The switches are locked closed by SRAM cells. The 24-bit counter is physically wired to the oscillator and output pin.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 10: LED (And now... it blinks!)
export function StageLED() {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOn(prev => !prev);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ff-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div className={`ff-big-led-core ${isOn ? 'on' : 'off'}`}>
          {isOn ? 'ON' : 'OFF'}
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 900, color: isOn ? '#57E6A5' : '#8B98A8' }}>
            {isOn ? 'HARDWARE RUNNING • LED ACTIVE' : 'CYCLE REFRESH • LED LOW'}
          </div>
          <div style={{ fontSize: '13px', color: '#8B98A8', marginTop: '6px' }}>
            Driven in real time by the 24th bit of your physical silicon counter register.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 11: WHAT_PROVED (What did we just prove?)
export function StageWhatProved() {
  const checklist = [
    'RTL COMPILES (Verilog syntax & hierarchy valid)',
    'SYNTHESIS WORKS (Yosys maps to LUTs & FFs)',
    'PLACE & ROUTE WORKS (nextpnr closes timing)',
    'BITSTREAM GENERATED (icepack creates .bin file)',
    'USB PROGRAMMING WORKS (iceprog talks via FT232H)',
    'FPGA CONFIGURES (SRAM latches the configuration)',
    'PHYSICAL OUTPUT WORKS (Pin drives real LED)'
  ];

  return (
    <div className="ff-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '680px' }}>
        {checklist.map((item, idx) => (
          <div key={idx} className="ff-check-card">
            <span className="ff-check-badge"><GlyphIcon glyph="success" size={16} /></span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#F4F7FA' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// STAGE 12: NOW_REPLACE (Now replace the blinker)
export function StageNowReplace() {
  return (
    <div className="ff-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
        <div className="ff-card">
          <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>STEP 1: SANITY TEST</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#27D7FF' }}>24-BIT BLINKER</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>
            ~24 Flip-Flops<br />
            ~24 LUT4 cells<br />
            1 LED output pin
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', color: '#57E6A5' }}>→</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>SAME FPGA<br />BIGGER LOGIC</div>
        </div>

        <div className="ff-card" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>STEP 2: WORKSHOP GOAL</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#57E6A5' }}>AI NEURAL ENGINE</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA' }}>
            Parallel MAC arrays<br />
            Quantized weight ROMs<br />
            Digit classification logic (0–9)
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 13: AI_TARGET (The real target: digit recognizer)
export function StageAITarget() {
  return (
    <div className="ff-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', maxWidth: '920px' }}>
        <div className="ff-card" style={{ minWidth: '180px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>INPUT</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#27D7FF', marginTop: '6px' }}>28 × 28 DIGIT</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>784 Pixel Values</div>
        </div>

        <div style={{ fontSize: '24px', color: '#57E6A5' }}>→</div>

        <div className="ff-card" style={{ flex: 1, borderColor: '#57E6A5', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>ON-CHIP HARDWARE</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#57E6A5', marginTop: '6px' }}>PARALLEL MAC ARRAY</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA', marginTop: '4px' }}>
            Matrix Multiply • INT8 Weights • Pipelined Accumulation
          </div>
        </div>

        <div style={{ fontSize: '24px', color: '#57E6A5' }}>→</div>

        <div className="ff-card" style={{ minWidth: '180px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>OUTPUT</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#57E6A5', marginTop: '6px' }}>CLASSIFIER: 7</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>ArgMax Class 0–9</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 14: HANDOFF (First test passed)
export function StageHandoff() {
  return (
    <div className="ff-wrap">
      <div style={{ textAlign: 'center', maxWidth: '780px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.15em' }}>
          <InlineIcon glyph="note" /> FIRST TEST COMPLETE
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#F4F7FA', margin: '10px 0' }}>
          NOW WE BUILD THE AI HARDWARE.
        </h2>
        <div style={{ fontSize: '16px', color: '#27D7FF', fontWeight: 700, marginBottom: '20px' }}>
          MODEL → QUANTIZATION → MAC ARRAY → RTL → FPGA
        </div>
        <div style={{ fontSize: '13px', color: '#8B98A8', lineHeight: 1.6 }}>
          The computer can program the FPGA. The toolchain compiles without error. The board runs in real silicon. Next slide: we zoom into the AI accelerator architecture.
        </div>
      </div>
    </div>
  );
}
