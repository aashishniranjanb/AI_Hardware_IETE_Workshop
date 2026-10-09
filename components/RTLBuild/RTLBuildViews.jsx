import React from 'react';

// STAGE 1: THE_ARCHITECTURE (We know what we want to build)
export function StageTheArchitecture() {
  const blocks = [
    { name: 'INPUT BUFFER', tag: '784 Pixels', color: '#27D7FF' },
    { name: 'MAC ARRAY', tag: 'Layer 1 (784→32)', color: '#8A7CFF' },
    { name: 'ReLU LOGIC', tag: 'Nonlinearity', color: '#57E6A5' },
    { name: 'MAC ARRAY', tag: 'Layer 2 (32→16)', color: '#8A7CFF' },
    { name: 'ReLU LOGIC', tag: 'Nonlinearity', color: '#57E6A5' },
    { name: 'MAC ARRAY', tag: 'Layer 3 (16→10)', color: '#8A7CFF' },
    { name: 'ARGMAX LOGIC', tag: 'Digit: 7', color: '#FFB84D' }
  ];

  return (
    <div className="rb-wrap">
      <div style={{ textAlign: 'center', marginBottom: '22px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
          HIGH-LEVEL ACCELERATOR SPECIFICATION
        </div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#F4F7FA', marginTop: '4px' }}>
          784 → 32 → 16 → 10 STREAMING DATAPATH
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '1000px', width: '100%', justifyContent: 'center' }}>
        {blocks.map((b, idx) => (
          <React.Fragment key={idx}>
            <div className="rb-card" style={{ padding: '12px 10px', minWidth: '110px', textAlign: 'center', borderColor: b.color }}>
              <div style={{ fontSize: '12px', fontWeight: 900, color: b.color }}>{b.name}</div>
              <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '2px' }}>{b.tag}</div>
            </div>
            {idx < blocks.length - 1 && <span style={{ fontSize: '14px', color: '#4B8DFF' }}>→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// STAGE 2: DECOMPOSE (Break it into hardware blocks)
export function StageDecompose() {
  const parts = [
    { title: 'ARITHMETIC UNITS', desc: '16-bit Multipliers & Adders', color: '#8A7CFF' },
    { title: 'REGISTERS & PIPELINES', desc: 'Flip-Flops latching partial sums', color: '#27D7FF' },
    { title: 'ON-CHIP STORAGE', desc: 'Embedded BRAM holding quantized weights', color: '#FFB84D' },
    { title: 'ACTIVATION MUXES', desc: 'Sign-bit zero-clamp multiplexers', color: '#57E6A5' },
    { title: 'CONTROL FSM', desc: 'State sequencer directing load & compute', color: '#4B8DFF' }
  ];

  return (
    <div className="rb-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFB84D' }}>DECOMPOSITION</div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#F4F7FA' }}>FROM AI GRAPH TO HARDWARE COMPONENTS</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', width: '100%', maxWidth: '960px' }}>
        {parts.map(p => (
          <div key={p.title} className="rb-card" style={{ textAlign: 'center', borderColor: p.color }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: p.color }}>{p.title}</div>
            <div style={{ fontSize: '12px', color: '#F4F7FA', marginTop: '6px' }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// STAGE 3: RTL_MEANING (What is RTL?)
export function StageRTLMeaning() {
  return (
    <div className="rb-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '28px', alignItems: 'center', maxWidth: '880px', width: '100%' }}>
        <div className="rb-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>REGISTERS (FLIP-FLOPS)</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#F4F7FA', margin: '6px 0' }}>STATE STORAGE</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>
            Store data synchronous to clock edges (`posedge clk`). Holds accumulator states, inputs, and outputs.
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', color: '#57E6A5' }}>+</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>CONNECTS<br />TO</div>
        </div>

        <div className="rb-card" style={{ textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>COMBINATIONAL LOGIC</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#57E6A5', margin: '6px 0' }}>BOOLEAN TRANSFORMS</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA' }}>
            Multipliers, adders, multiplexers, and comparators that transform values between clock ticks.
          </div>
        </div>
      </div>
      <div style={{ marginTop: '22px', fontSize: '13px', color: '#27D7FF', fontWeight: 700 }}>
        ★ RTL = REGISTER TRANSFER LEVEL: DESCRIBING HOW SIGNALS MOVE BETWEEN HARDWARE REGISTERS.
      </div>
    </div>
  );
}

// STAGE 4: MAC_RTL (Describe the MAC in Verilog)
export function StageMACRTL() {
  return (
    <div className="rb-wrap">
      <div className="rb-code-box">
        <div className="rb-code-topbar">
          <span>mac_unit.v — Multiply-Accumulate Hardware</span>
          <span>Verilog RTL</span>
        </div>
        <pre className="rb-code-content">
          <span style={{ color: '#8A7CFF', fontWeight: 700 }}>always @</span>(<span style={{ color: '#8A7CFF', fontWeight: 700 }}>posedge</span> clk) <span style={{ color: '#8A7CFF', fontWeight: 700 }}>begin</span><br />
          &nbsp;&nbsp;<span style={{ color: '#8A7CFF', fontWeight: 700 }}>if</span> (clear_acc)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;acc &lt;= 24'd0;                <span style={{ color: '#64748B' }}>// Reset partial sum for new neuron</span><br />
          &nbsp;&nbsp;<span style={{ color: '#8A7CFF', fontWeight: 700 }}>else if</span> (mac_en)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;acc &lt;= acc + (pixel * weight); <span style={{ color: '#57E6A5', fontWeight: 700 }}>// Multiply + Accumulate in 1 cycle!</span><br />
          <span style={{ color: '#8A7CFF', fontWeight: 700 }}>end</span>
        </pre>
      </div>
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#57E6A5', fontWeight: 700 }}>
        ★ SYNTHESIZES DIRECTLY INTO AN iCE40UP5K 16×16 MULTIPLIER + ACCUMULATOR DSP CELL
      </div>
    </div>
  );
}

// STAGE 5: RELU_RTL (Describe ReLU in Verilog)
export function StageReLURTL() {
  return (
    <div className="rb-wrap">
      <div className="rb-code-box">
        <div className="rb-code-topbar">
          <span>relu.v — Zero-Clamp Activation Logic</span>
          <span>Verilog RTL</span>
        </div>
        <pre className="rb-code-content">
          <span style={{ color: '#64748B' }}>// If the signed accumulator is negative (sign bit == 1), clamp to 0</span><br />
          <span style={{ color: '#8A7CFF', fontWeight: 700 }}>assign</span> relu_out = (acc[23] == 1'b0) ? acc[15:8] : 8'd0;<br /><br />
          <span style={{ color: '#64748B' }}>// In physical silicon: simply a multiplexer selecting zero or positive sum.</span>
        </pre>
      </div>
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#27D7FF', fontWeight: 700 }}>
        ★ ZERO CLOCK LATENCY: PURE COMBINATIONAL LOGIC REQUIRING ONLY A FEW LUTS
      </div>
    </div>
  );
}

// STAGE 6: CONTROL_RTL (Control FSM)
export function StageControlRTL() {
  return (
    <div className="rb-wrap">
      <div className="rb-code-box">
        <div className="rb-code-topbar">
          <span>fsm_controller.v — Hardware Sequencer</span>
          <span>Verilog RTL</span>
        </div>
        <pre className="rb-code-content">
          <span style={{ color: '#8A7CFF', fontWeight: 700 }}>always @</span>(<span style={{ color: '#8A7CFF', fontWeight: 700 }}>posedge</span> clk) <span style={{ color: '#8A7CFF', fontWeight: 700 }}>begin</span><br />
          &nbsp;&nbsp;<span style={{ color: '#8A7CFF', fontWeight: 700 }}>case</span> (state)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;S_IDLE:    <span style={{ color: '#8A7CFF', fontWeight: 700 }}>if</span> (start) state &lt;= S_COMPUTE;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;S_COMPUTE: <span style={{ color: '#8A7CFF', fontWeight: 700 }}>if</span> (pixel_idx == 783) state &lt;= S_NEXT_LAYER;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;S_DONE:    infer_valid &lt;= 1'b1;<br />
          &nbsp;&nbsp;<span style={{ color: '#8A7CFF', fontWeight: 700 }}>endcase</span><br />
          <span style={{ color: '#8A7CFF', fontWeight: 700 }}>end</span>
        </pre>
      </div>
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#FFB84D', fontWeight: 700 }}>
        ★ THE BRAIN THAT ORCHESTRATES THE ARITHMETIC DATAPATH
      </div>
    </div>
  );
}

// STAGE 7: COMPLETE_RTL (Top module)
export function StageCompleteRTL() {
  return (
    <div className="rb-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', width: '100%', maxWidth: '920px' }}>
        <div className="rb-card" style={{ textAlign: 'center', borderColor: '#27D7FF' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>WEIGHT ROM</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>bram_weights.v</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Synchronous ROM tables</div>
        </div>
        <div className="rb-card" style={{ textAlign: 'center', borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>MAC ARRAYS</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>mac_engine.v</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Parallel multiplier slices</div>
        </div>
        <div className="rb-card" style={{ textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>ACTIVATION</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>relu_layer.v</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Nonlinear thresholding</div>
        </div>
        <div className="rb-card" style={{ textAlign: 'center', borderColor: '#FFB84D' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>CONTROLLER</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>neural_fsm.v</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Datapath scheduler</div>
        </div>
      </div>
      <div style={{ marginTop: '20px', fontSize: '13px', color: '#57E6A5', fontWeight: 800 }}>
        TIED TOGETHER INSIDE `ai_accelerator_top.v` READY FOR COMPILATION
      </div>
    </div>
  );
}

// STAGE 8: RTL_TO_YOSYS (Logic synthesis with Yosys)
export function StageRTLToYosys() {
  return (
    <div className="rb-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center', maxWidth: '880px', width: '100%' }}>
        <div className="rb-card">
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>INPUT: SOURCE RTL</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#F4F7FA' }}>ai_accelerator_top.v</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Human-readable Verilog modules & FSMs</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: 'rgba(39, 215, 255, 0.15)', border: '1.5px solid #27D7FF', padding: '10px 18px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#27D7FF' }}>YOSYS SYNTHESIS</div>
            <div style={{ fontSize: '12px', color: '#8B98A8' }}>`yosys -p "synth_ice40"`</div>
          </div>
          <div style={{ fontSize: '20px', color: '#27D7FF', marginTop: '4px' }}>→</div>
        </div>

        <div className="rb-card" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>OUTPUT: GATE NETLIST</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#57E6A5' }}>accelerator.json</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA' }}>
            Mapped to iCE40 primitive cells: SB_LUT4, SB_DFF, SB_MAC16 DSPs, and SB_RAM40_4K BRAMs
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 9: NEXTNPNR (Place + Route)
export function StageNextpnr() {
  return (
    <div className="rb-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center', maxWidth: '880px', width: '100%' }}>
        <div className="rb-card">
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>INPUT: GATE NETLIST</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#F4F7FA' }}>accelerator.json</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Unplaced gates & nets</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: 'rgba(87, 230, 165, 0.15)', border: '1.5px solid #57E6A5', padding: '10px 18px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#57E6A5' }}>NEXTPNR-iCE40</div>
            <div style={{ fontSize: '12px', color: '#8B98A8' }}>Placement & Routing</div>
          </div>
          <div style={{ fontSize: '20px', color: '#57E6A5', marginTop: '4px' }}>→</div>
        </div>

        <div className="rb-card" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>OUTPUT: PLACED SILICON</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#57E6A5' }}>accelerator.asc</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA' }}>
            Exact physical coordinates & copper wire routes inside iCE40UP5K die
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 10: BITSTREAM (icepack packaging)
export function StageBitstream() {
  return (
    <div className="rb-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#4B8DFF' }}>ICEPACK PACKAGER</div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#F4F7FA' }}>accelerator.bin (Hardware Configuration File)</div>
      </div>

      <div className="rb-card" style={{ maxWidth: '780px', width: '100%', borderColor: '#4B8DFF' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#57E6A5', lineHeight: 1.8 }}>
          7e aa 99 7e 01 00 00 00 11 00 00 00 ff ff ff ff<br />
          5a 00 12 34 88 99 aa bb cc dd ee ff 00 11 22 33<br />
          // Raw binary encoding of every programmable switch inside the chip
        </div>
      </div>
    </div>
  );
}

// STAGE 11: PROGRAM (Flashing via onboard FT232H)
export function StageProgram() {
  return (
    <div className="rb-wrap">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>★ ONBOARD USB PROGRAMMING ★</span>
        <div style={{ fontSize: '20px', fontWeight: 900, color: '#F4F7FA' }}>iceprog accelerator.bin</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '850px', width: '100%', justifyContent: 'center' }}>
        <div className="rb-card" style={{ minWidth: '130px', textAlign: 'center', borderColor: '#27D7FF' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>LAPTOP</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>USB Driver</div>
        </div>
        <span style={{ fontSize: '18px', color: '#4B8DFF' }}>→</span>
        <div className="rb-card" style={{ minWidth: '130px', textAlign: 'center', borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>USB CABLE</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Type-C</div>
        </div>
        <span style={{ fontSize: '18px', color: '#4B8DFF' }}>→</span>
        <div className="rb-card" style={{ minWidth: '150px', textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 900 }}>ONBOARD FT232H</div>
          <div style={{ fontSize: '12px', color: '#57E6A5' }}>Integrated Bridge</div>
        </div>
        <span style={{ fontSize: '18px', color: '#4B8DFF' }}>→</span>
        <div className="rb-card" style={{ minWidth: '130px', textAlign: 'center', borderColor: '#FFB84D' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>iCE40UP5K</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>SRAM Fabric</div>
        </div>
      </div>
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#57E6A5', fontWeight: 700 }}>
        NO EXTERNAL DONGLE REQUIRED • PROGRAMMED DIRECTLY OVER USB
      </div>
    </div>
  );
}

// STAGE 12: FULL_FLOW (The complete design flow)
export function StageFullFlow() {
  const steps = ['AI MODEL', 'RTL', 'YOSYS', 'NEXTPNR', 'BITSTREAM', 'USB', 'FPGA'];
  return (
    <div className="rb-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>END-TO-END SILICON FLOW</div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#F4F7FA' }}>FROM ABSTRACT MODEL TO EXECUTING HARDWARE</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '920px', width: '100%', justifyContent: 'center' }}>
        {steps.map((st, i) => (
          <React.Fragment key={st}>
            <div className="rb-card" style={{ padding: '12px 14px', textAlign: 'center', borderColor: '#27D7FF' }}>
              <div style={{ fontSize: '12px', fontWeight: 900, color: '#27D7FF' }}>{st}</div>
            </div>
            {i < steps.length - 1 && <span style={{ fontSize: '14px', color: '#57E6A5' }}>→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// STAGE 13: KEY_DISTINCTION (We didn't load Python)
export function StageKeyDistinction() {
  return (
    <div className="rb-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '28px', alignItems: 'center', maxWidth: '880px', width: '100%' }}>
        <div className="rb-card" style={{ borderColor: '#EF4444', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#EF4444', fontWeight: 800 }}>COMMON MISCONCEPTION</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#EF4444', margin: '8px 0', textDecoration: 'line-through' }}>
            PYTHON → FPGA
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>
            FPGAs do not run a Python interpreter or execute sequential bytecodes from RAM.
          </div>
        </div>

        <div style={{ fontSize: '32px', color: '#8B98A8', fontWeight: 900 }}>≠</div>

        <div className="rb-card" style={{ borderColor: '#57E6A5', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>WHAT WE ACTUALLY DO</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#57E6A5', margin: '8px 0' }}>
            RTL → BITSTREAM → FPGA
          </div>
          <div style={{ fontSize: '12px', color: '#F4F7FA' }}>
            We synthesize the neural network into physical copper wires, adders, and registers!
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 14: FINAL_MENTAL_MODEL (Remember this)
export function StageFinalMentalModel() {
  const pyramid = [
    { name: 'AI MODEL', role: 'Mathematical Definition (784→32→16→10)', color: '#8A7CFF' },
    { name: 'HARDWARE ARCHITECTURE', role: 'Parallel MAC Arrays + BRAM + ReLU', color: '#27D7FF' },
    { name: 'VERILOG RTL', role: 'Synthesizable Source Code', color: '#4B8DFF' },
    { name: 'SYNTHESIS (YOSYS)', role: 'Mapping to Primitive Cells', color: '#FFB84D' },
    { name: 'PLACE & ROUTE (NEXTPNR)', role: 'Physical Routing on Silicon Die', color: '#57E6A5' },
    { name: 'BITSTREAM (ICEPACK)', role: 'Switch Matrix Configuration File', color: '#27D7FF' },
    { name: 'REAL HARDWARE (iCE40UP5K)', role: 'Live Real-Time Inference Execution', color: '#57E6A5' }
  ];

  return (
    <div className="rb-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '780px', width: '100%' }}>
        {pyramid.map((lvl, idx) => (
          <div key={lvl.name} className="rb-card" style={{ padding: '8px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: lvl.color }}>
            <span style={{ fontSize: '12px', fontWeight: 900, color: lvl.color }}>{idx + 1}. {lvl.name}</span>
            <span style={{ fontSize: '12px', color: '#8B98A8' }}>{lvl.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// STAGE 15: LIVE_HANDOFF (Enough theory. Now we build it.)
export function StageLiveHandoff() {
  return (
    <div className="rb-wrap">
      <div style={{ textAlign: 'center', maxWidth: '820px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.15em' }}>
          ★ WORKSHOP MILESTONE ★
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#F4F7FA', margin: '10px 0' }}>
          ENOUGH THEORY. NOW WE BUILD IT.
        </h2>
        <div style={{ fontSize: '18px', color: '#27D7FF', fontWeight: 700, marginBottom: '20px' }}>
          OPEN THE TERMINAL • RUN THE TOOLCHAIN • FLASH THE BOARD
        </div>
        <div style={{ fontSize: '13px', color: '#8B98A8', lineHeight: 1.6 }}>
          Laptop connected via USB to VSDSquadron FPGA Mini. Synthesizable Verilog written. EDA tools ready. Time to put artificial intelligence into physical silicon!
        </div>
      </div>
    </div>
  );
}
