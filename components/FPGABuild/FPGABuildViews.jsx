import React from 'react';

// STAGE 0: START WITH THE MODEL (MNIST 784 -> 32 -> 16 -> 10)
export function StageFPGAModel() {
  return (
    <div className="fb-wrap">
      <div className="fb-stage-card" style={{ borderColor: '#27D7FF' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '90px', height: '90px', background: '#0B1120', border: '2px solid #27D7FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '48px', fontWeight: 900, color: '#27D7FF', fontFamily: 'Space Grotesk' }}>7</span>
          </div>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>28×28 PIXELS</span>
        </div>

        <span style={{ color: '#64748B', fontSize: '24px' }}>→</span>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#27D7FF' }}>
            MNIST DIGIT CLASSIFIER ARCHITECTURE
          </span>
          <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#F4F7FA' }}>
            <div style={{ padding: '6px 12px', background: '#0B1120', border: '1px solid #334155', borderRadius: '6px' }}>
              784 Inputs
            </div>
            <div style={{ padding: '6px 12px', background: '#0B1120', border: '1px solid #334155', borderRadius: '6px' }}>
              32 Hidden
            </div>
            <div style={{ padding: '6px 12px', background: '#0B1120', border: '1px solid #334155', borderRadius: '6px' }}>
              16 Hidden
            </div>
            <div style={{ padding: '6px 12px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '6px', color: '#57E6A5', fontWeight: 800 }}>
              10 Classes (Digit 7)
            </div>
          </div>
          <span style={{ fontSize: '11px', color: '#8B98A8', lineHeight: 1.5 }}>
            This is the neural network we want to execute on our FPGA board.
          </span>
        </div>
      </div>
    </div>
  );
}

// STAGE 1: THE GAP (FPGA doesn't understand Python)
export function StageWhyNotDirect() {
  return (
    <div className="fb-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div style={{ width: '220px', padding: '24px', background: '#0B1120', border: '1px solid #334155', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>HIGH-LEVEL MODEL</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#F4F7FA', marginTop: '6px' }}>PYTHON / PYTORCH</div>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>Float32 Tensors & Graphs</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '32px', fontWeight: 900, color: '#F59E0B' }}>?</span>
          <span style={{ fontSize: '10px', color: '#8B98A8', fontWeight: 800 }}>TRANSLATION GAP</span>
        </div>

        <div style={{ width: '220px', padding: '24px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>DIGITAL HARDWARE</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#F4F7FA', marginTop: '6px' }}>FPGA FABRIC</div>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>LUTs, Flip-Flops, Registers</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '600px', lineHeight: 1.6 }}>
        The FPGA does NOT load Python scripts or run an operating system.<br />
        <strong>We must convert the mathematical neural computation into physical digital hardware structures.</strong>
      </div>
    </div>
  );
}

// STAGE 2: QUANTIZATION (Float32 -> INT8)
export function StageQuantization() {
  return (
    <div className="fb-wrap">
      <div className="quant-compare-container">
        <div className="quant-box">
          <span style={{ fontSize: '11px', color: '#8B98A8', fontWeight: 800 }}>FLOATING POINT (32-BIT)</span>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#F4F7FA', fontFamily: 'Space Grotesk' }}>0.1372</span>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>Requires 32-bit floating multiplier</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#27D7FF', fontSize: '20px', fontWeight: 800 }}>QUANTIZE</span>
          <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>
        </div>

        <div className="quant-box" style={{ borderColor: '#27D7FF', background: 'rgba(39, 215, 255, 0.08)' }}>
          <span style={{ fontSize: '11px', color: '#27D7FF', fontWeight: 800 }}>INTEGER (8-BIT)</span>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#27D7FF', fontFamily: 'Space Grotesk' }}>+35</span>
          <span style={{ fontSize: '10px', color: '#57E6A5', fontWeight: 700 }}>4x Memory Reduction • Fast Integer MAC</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        QUANTIZATION CONVERTS CONTINUOUS FLOATS INTO HARDWARE-FRIENDLY FIXED-POINT INTEGERS
      </div>
    </div>
  );
}

// STAGE 3: REPRESENT THE MATH (y = Σ(w × x) + b)
export function StageRepresentMath() {
  return (
    <div className="fb-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: '#020617', border: '2px solid #1E293B', borderRadius: '16px', padding: '26px 40px' }}>
        <span style={{ fontSize: '11px', color: '#8B98A8', fontWeight: 800, letterSpacing: '0.15em' }}>
          NEURAL MATHEMATICAL FORMULA
        </span>
        <span style={{ fontSize: '32px', fontFamily: 'Space Grotesk', fontWeight: 900, color: '#27D7FF' }}>
          y = Σ(wᵢ × xᵢ) + b
        </span>
        <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
          <div style={{ padding: '6px 14px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '6px', fontSize: '11px', color: '#27D7FF', fontWeight: 800 }}>
            MULTIPLY (w × x)
          </div>
          <span style={{ color: '#64748B', fontSize: '18px' }}>+</span>
          <div style={{ padding: '6px 14px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '6px', fontSize: '11px', color: '#57E6A5', fontWeight: 800 }}>
            ACCUMULATE (Σ)
          </div>
          <span style={{ color: '#64748B', fontSize: '18px' }}>+</span>
          <div style={{ padding: '6px 14px', background: '#0B1120', border: '1px solid #F59E0B', borderRadius: '6px', fontSize: '11px', color: '#F59E0B', fontWeight: 800 }}>
            BIAS (b)
          </div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        MAC = MULTIPLY + ACCUMULATE: THE ATOM OF ALL AI HARDWARE
      </div>
    </div>
  );
}

// STAGE 4: ONE MAC UNIT
export function StageOneMAC() {
  return (
    <div className="fb-wrap">
      <div className="mac-diagram-box">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '6px 12px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '6px', fontSize: '11px', color: '#27D7FF' }}>
            ACTIVATION (x)
          </div>
          <div style={{ padding: '6px 12px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '6px', fontSize: '11px', color: '#27D7FF' }}>
            WEIGHT (w)
          </div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div style={{ width: '60px', height: '60px', background: '#0B1120', border: '2px solid #27D7FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: '#27D7FF' }}>
          ×
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div style={{ width: '60px', height: '60px', background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: '#57E6A5' }}>
          +
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div style={{ padding: '12px 18px', background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', color: '#8B98A8', fontWeight: 800 }}>ACCUMULATOR</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#57E6A5' }}>REGISTER</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        ONE MAC: MULTIPLY → ADD → STORE ACCUMULATED PARTIAL SUM
      </div>
    </div>
  );
}

// STAGE 5: PARALLEL MAC ARRAY
export function StageParallelMAC() {
  return (
    <div className="fb-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        TRUE HARDWARE CONCURRENCY: 32 PARALLEL MAC ENGINES
      </div>
      <div className="parallel-mac-grid">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="parallel-mac-cell">
            <span>MAC</span>
            <span style={{ fontSize: '7px', opacity: 0.7 }}>[{i}]</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        FPGA COMPUTES 32 DOT-PRODUCTS IN A SINGLE CLOCK CYCLE INSTEAD OF SEQUENTIALLY
      </div>
    </div>
  );
}

// STAGE 6: DESCRIBE IT IN RTL (Verilog)
export function StageRTLView() {
  return (
    <div className="fb-wrap">
      <div className="verilog-snippet-card">
        <span style={{ color: '#8B98A8' }}>// Register-Transfer Level (RTL) Description in Verilog</span><br />
        <span style={{ color: '#27D7FF' }}>always_ff</span> @(<span style={{ color: '#27D7FF' }}>posedge</span> clk <span style={{ color: '#27D7FF' }}>or posedge</span> rst) <span style={{ color: '#27D7FF' }}>begin</span><br />
        &nbsp;&nbsp;<span style={{ color: '#27D7FF' }}>if</span> (rst) <span style={{ color: '#F4F7FA' }}>acc &lt;= 0;</span><br />
        &nbsp;&nbsp;<span style={{ color: '#27D7FF' }}>else if</span> (valid) <span style={{ color: '#57E6A5' }}>acc &lt;= acc + (weight * activation);</span><br />
        <span style={{ color: '#27D7FF' }}>end</span>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        RTL TELLS THE SYNTHESIZER HOW FLIP-FLOPS AND MULTIPLIERS ARE PHYSICALLY CONNECTED
      </div>
    </div>
  );
}

// STAGE 7: SYNTHESIS (Yosys maps to LUTs)
export function StageSynthesisView() {
  return (
    <div className="fb-wrap">
      <div className="synth-split-view">
        <div style={{ padding: '16px 20px', background: '#0B1120', border: '1px solid #334155', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>INPUT</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>VERILOG RTL CODE</div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div style={{ padding: '16px 20px', background: '#0B1120', border: '2px solid #27D7FF', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#27D7FF', fontWeight: 800 }}>YOSYS SYNTHESIS</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF' }}>LOGIC INFERENCE</div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div style={{ padding: '16px 20px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#57E6A5', fontWeight: 800 }}>OUTPUT</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>iCE40 LUTs + DFFs</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        SYNTHESIS MAPS ABSTRACT CODE INTO EQUIVALENT BOOLEAN LOGIC AND HARDWARE REGISTERS
      </div>
    </div>
  );
}

// STAGE 8: PLACE & ROUTE (nextpnr)
export function StagePlaceRouteView() {
  return (
    <div className="fb-wrap">
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div className="pnr-fabric-grid">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`pnr-lut-node ${i % 4 === 0 || i % 7 === 0 ? 'is-routed' : ''}`}>
              LUT
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '380px' }}>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#27D7FF' }}>
            PHYSICAL SILICON MAPPING
          </span>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            <strong>1. Placement:</strong> Assigns synthesized LUTs and DSP blocks to physical coordinate locations on the iCE40UP5K die.<br /><br />
            <strong>2. Routing:</strong> Closes configurable switch matrix nodes to route wires between inputs, multipliers, and registers.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 9: GENERATE THE BITSTREAM
export function StageBitstreamView() {
  return (
    <div className="fb-wrap">
      <div className="bitstream-stream-box">
        <span style={{ fontSize: '11px', color: '#8B98A8', fontWeight: 800, letterSpacing: '0.15em' }}>
          GENERATING RAW BINARY BITSTREAM (.bin)
        </span>
        <div className="bitstream-code-line">
          10100110 01101001 11001011 00110101 11100010
        </div>
        <div style={{ fontSize: '11px', color: '#8B98A8', textAlign: 'center', maxWidth: '520px', lineHeight: 1.5 }}>
          The bitstream is the raw binary pattern of 1s and 0s that controls SRAM switch-matrix pass transistors and initializes LUT memory truth tables.
        </div>
      </div>
    </div>
  );
}

// STAGE 10: PROGRAM THE FPGA
export function StageProgramFPGA() {
  return (
    <div className="fb-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ padding: '16px 20px', background: '#0B1120', border: '1px solid #334155', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>SOURCE</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>LAPTOP TOOLCHAIN</div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div style={{ padding: '16px 20px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', color: '#27D7FF' }}>USB INTERFACE</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF' }}>FT232H HIGH-SPEED SPI</div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div style={{ padding: '16px 20px', background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', color: '#57E6A5', fontWeight: 800 }}>DESTINATION</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>iCE40UP5K SRAM</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        CONFIGURATION DATA ENTERS THE FPGA AND ENERGIZES THE NEURAL ACCELERATOR
      </div>
    </div>
  );
}

// STAGE 11: THE TARGET (VSDSquadron FPGA Mini)
export function StageVSDSquadronBoard() {
  return (
    <div className="fb-wrap">
      <div className="board-preview-box">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <rect x="15" y="15" width="150" height="150" rx="8" fill="#082F49" stroke="#27D7FF" strokeWidth="2" />
          <rect x="55" y="55" width="70" height="70" rx="4" fill="#020617" stroke="#27D7FF" strokeWidth="2" />
          <text x="90" y="90" fill="#27D7FF" fontSize="10" fontWeight="800" textAnchor="middle">iCE40UP5K</text>
          <text x="90" y="105" fill="#8B98A8" fontSize="8" textAnchor="middle">FPGA CORE</text>
          <rect x="70" y="8" width="40" height="12" rx="2" fill="#334155" />
        </svg>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#27D7FF' }}>
            VSDSQUADRON FPGA MINI
          </span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', lineHeight: 1.6 }}>
            • <strong>Silicon:</strong> Lattice iCE40UP5K FPGA<br />
            • <strong>Logic Capacity:</strong> 5,280 Logic Cells (LUT4 + DFF)<br />
            • <strong>Embedded DSP:</strong> 8 × 16-bit Hardware Multipliers<br />
            • <strong>Memory:</strong> 120 Kbit Block RAM + 1024 Kbit SPRAM<br />
            • <strong>Interface:</strong> FT232H USB High-Speed Flasher
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 12: COMPLETE FPGA PIPELINE
export function StageCompleteFPGAPipeline() {
  return (
    <div className="fb-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        THE END-TO-END PIPELINE: FROM MODEL TO HARDWARE
      </div>
      <div className="complete-pipeline-strip">
        <div className="pipeline-tiny-node">
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>01. MODEL</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F4F7FA' }}>MNIST 784</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipeline-tiny-node">
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>02. QUANT</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F4F7FA' }}>INT8 TENSORS</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipeline-tiny-node">
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>03. MAC</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F4F7FA' }}>PARALLEL ARRAY</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipeline-tiny-node">
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>04. RTL</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F4F7FA' }}>VERILOG CODE</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipeline-tiny-node">
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>05. SYNTH</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F4F7FA' }}>YOSYS NETLIST</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipeline-tiny-node">
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>06. PnR</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F4F7FA' }}>NEXTPNR LAYOUT</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipeline-tiny-node">
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>07. BINARY</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#F4F7FA' }}>BITSTREAM</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipeline-tiny-node" style={{ borderColor: '#27D7FF', background: 'rgba(39, 215, 255, 0.1)' }}>
          <span style={{ fontSize: '9px', color: '#27D7FF', fontWeight: 800 }}>08. SILICON</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#27D7FF' }}>iCE40UP5K</span>
        </div>
      </div>
    </div>
  );
}

// STAGE 13: WHAT REALLY HAPPENED (The Paradigm Shift)
export function StageWhatReallyHappened() {
  return (
    <div className="fb-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', background: '#020617', border: '2px solid #57E6A5', borderRadius: '18px', padding: '34px 50px', boxShadow: '0 0 35px rgba(87, 230, 165, 0.15)' }}>
        <div style={{ fontSize: '24px', fontFamily: 'Space Grotesk', fontWeight: 900, color: '#F4F7FA', textAlign: 'center', lineHeight: 1.4 }}>
          WE DIDN'T WRITE AN APP.<br />
          <span style={{ color: '#57E6A5' }}>WE BUILT THE COMPUTATION INTO HARDWARE.</span>
        </div>
        <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '580px', lineHeight: 1.6 }}>
          With software, a processor executes serialized instructions.<br />
          With our FPGA bitstream, physical silicon wires and logic gates are formed specifically to compute the neural network.
        </div>
      </div>
    </div>
  );
}

// STAGE 14: HANDS-ON READY (From Screen to Real FPGA)
export function StageHandsOnHandoff() {
  return (
    <div className="fb-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.25em' }}>
          TIME FOR THE WORKSHOP EXPERIMENT
        </span>
        <span style={{ fontSize: '32px', fontFamily: 'Space Grotesk', fontWeight: 900, color: '#F4F7FA' }}>
          FROM SCREEN → TO REAL FPGA
        </span>
        <span style={{ fontSize: '13px', color: '#8B98A8', maxWidth: '560px', lineHeight: 1.6 }}>
          We have crossed the bridge from transistors, logic gates, and adders all the way to neural accelerators.<br />
          <strong>Now let's launch the toolchain and program the physical board.</strong>
        </span>
        <div style={{ padding: '10px 28px', borderRadius: '30px', background: 'rgba(39, 215, 255, 0.15)', border: '2px solid #27D7FF', color: '#27D7FF', fontSize: '13px', fontWeight: 800, marginTop: '8px' }}>
          NEXT → FPGA HARDWARE SETUP
        </div>
      </div>
    </div>
  );
}
