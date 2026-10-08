import React from 'react';

// STAGE 0: ONE AI TASK
export function StageOneTask() {
  return (
    <div className="comp-wrap">
      <div className="single-task-card">
        <div className="digit-scan-frame">
          <span className="digit-glyph">7</span>
          <span style={{ fontSize: '9px', color: '#8B98A8', fontWeight: 800 }}>MNIST 28×28</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
            UNIVERSAL BENCHMARK
          </span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: '#F4F7FA', fontFamily: 'Space Grotesk' }}>
            HANDWRITTEN DIGIT RECOGNITION
          </span>
          <span style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6, maxWidth: '420px' }}>
            We evaluate an identical challenge across all three hardware platforms: take a 28×28 pixel image and classify it as digit 0–9.
          </span>
        </div>
      </div>
    </div>
  );
}

// STAGE 1: COMMON PIPELINE
export function StageCommonPipeline() {
  return (
    <div className="comp-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        THE HIGH-LEVEL DATAFLOW
      </div>
      <div className="common-pipeline-chain">
        <div className="common-pipe-node">
          <span style={{ fontSize: '10px', color: '#27D7FF', fontWeight: 800 }}>01. INPUT</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>28×28 IMAGE</span>
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>784 Grayscale Pixels</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>
        <div className="common-pipe-node">
          <span style={{ fontSize: '10px', color: '#4B8DFF', fontWeight: 800 }}>02. PREPROCESS</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>NORMALIZE</span>
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>Scale to 0..255 / INT8</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>
        <div className="common-pipe-node">
          <span style={{ fontSize: '10px', color: '#8A7CFF', fontWeight: 800 }}>03. COMPUTE</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>NEURAL MODEL</span>
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>Matrix Mult + Activations</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>
        <div className="common-pipe-node" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '10px', color: '#57E6A5', fontWeight: 800 }}>04. OUTPUT</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>DIGIT 0–9</span>
          <span style={{ fontSize: '9px', color: '#57E6A5' }}>Class Probabilities</span>
        </div>
      </div>
      <div style={{ fontSize: '11px', color: '#8B98A8', textAlign: 'center', maxWidth: '600px', lineHeight: 1.6 }}>
        The high-level algorithm remains conceptually identical across every platform: image data in, matrix math in the middle, predicted digit out.
      </div>
    </div>
  );
}

// STAGE 2: MODEL ARCHITECTURE
export function StageModelArchitecture() {
  return (
    <div className="comp-wrap">
      <div className="nn-model-matrix">
        {/* Layer 0: Input */}
        <div className="nn-layer-col">
          <span style={{ fontSize: '11px', color: '#27D7FF', fontWeight: 800 }}>INPUT LAYER</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>784 NODES</span>
          <div className="nn-nodes-strip">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="nn-node-dot active-node" />
            ))}
          </div>
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>28×28 Pixels</span>
        </div>

        <span style={{ color: '#64748B' }}>→</span>

        {/* Layer 1: Hidden 32 */}
        <div className="nn-layer-col">
          <span style={{ fontSize: '11px', color: '#4B8DFF', fontWeight: 800 }}>HIDDEN 1</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>32 NODES</span>
          <div className="nn-nodes-strip">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="nn-node-dot active-node" style={{ background: '#4B8DFF', borderColor: '#4B8DFF' }} />
            ))}
          </div>
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>Feature Map</span>
        </div>

        <span style={{ color: '#64748B' }}>→</span>

        {/* Layer 2: Hidden 16 */}
        <div className="nn-layer-col">
          <span style={{ fontSize: '11px', color: '#8A7CFF', fontWeight: 800 }}>HIDDEN 2</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>16 NODES</span>
          <div className="nn-nodes-strip">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="nn-node-dot active-node" style={{ background: '#8A7CFF', borderColor: '#8A7CFF' }} />
            ))}
          </div>
          <span style={{ fontSize: '9px', color: '#8B98A8' }}>Compression</span>
        </div>

        <span style={{ color: '#64748B' }}>→</span>

        {/* Layer 3: Output 10 */}
        <div className="nn-layer-col">
          <span style={{ fontSize: '11px', color: '#57E6A5', fontWeight: 800 }}>OUTPUT</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>10 CLASSES</span>
          <div className="nn-nodes-strip">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="nn-node-dot active-node" style={{ background: i === 2 ? '#57E6A5' : '#1E293B', borderColor: '#57E6A5' }} />
            ))}
          </div>
          <span style={{ fontSize: '9px', color: '#57E6A5', fontWeight: 800 }}>Digit: 7</span>
        </div>
      </div>
      <div style={{ fontSize: '11px', color: '#8B98A8', textAlign: 'center', lineHeight: 1.6 }}>
        What are we actually computing? Millions of multiply-accumulate operations: <strong style={{ color: '#F4F7FA' }}>y = ReLU(Σ w · x + b)</strong>
      </div>
    </div>
  );
}

// STAGE 3: HARDWARE FORK (Now the hardware matters)
export function StageHardwareFork() {
  return (
    <div className="plat-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        SAME MATHEMATICAL GRAPH → THREE PHYSICAL REALIZATIONS
      </div>
      <div className="three-branches-fork">
        <div className="branch-fork-card" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#27D7FF' }}>BRANCH 01</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA' }}>VSDSQUADRON FPGA</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Express computation as parallel Verilog RTL datapaths and configure FPGA cells.</span>
        </div>

        <div className="branch-fork-card" style={{ borderColor: '#8A7CFF' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#8A7CFF' }}>BRANCH 02</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA' }}>RENESAS V2 AI KIT</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Convert quantized INT8 tensors into C arrays executed by microcontroller firmware.</span>
        </div>

        <div className="branch-fork-card" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#57E6A5' }}>BRANCH 03</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA' }}>HELTEC / ESP32</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Run TensorFlow Lite Micro FlatBuffers on a dual-core wireless edge device.</span>
        </div>
      </div>
    </div>
  );
}

// STAGE 4: FPGA IMPLEMENTATION DETAILS
export function StageFPGAImpl() {
  return (
    <div className="plat-wrap">
      <div className="platform-impl-card" style={{ borderColor: '#27D7FF' }}>
        <div className="impl-left-pane">
          <div className="digit-scan-frame" style={{ width: '90px', height: '90px' }}>
            <span className="digit-glyph" style={{ fontSize: '42px' }}>7</span>
          </div>
          <span style={{ fontSize: '10px', color: '#8B98A8', marginTop: '6px' }}>INPUT</span>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div className="impl-center-pane">
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#27D7FF' }}>
            CUSTOM PARALLEL FPGA ACCELERATOR
          </span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', lineHeight: 1.6 }}>
            • Neural layers mapped directly into <strong>parallel MAC units</strong>.<br />
            • Pipelined multipliers compute vector dot-products simultaneously.<br />
            • Zero operating system or instruction-fetch overhead.<br />
            • <strong>Silicon Target:</strong> Lattice iCE40UP5K logic fabric.
          </div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div className="impl-left-pane">
          <div className="digit-scan-frame" style={{ width: '90px', height: '90px', borderColor: '#57E6A5' }}>
            <span className="digit-glyph" style={{ fontSize: '42px', color: '#57E6A5' }}>7</span>
          </div>
          <span style={{ fontSize: '10px', color: '#57E6A5', fontWeight: 800, marginTop: '6px' }}>OUTPUT</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>
        BUILD THE COMPUTATION DIRECTLY INTO PHYSICAL HARDWARE
      </div>
    </div>
  );
}

// STAGE 5: RENESAS IMPLEMENTATION DETAILS
export function StageRenesasImpl() {
  return (
    <div className="plat-wrap">
      <div className="platform-impl-card" style={{ borderColor: '#8A7CFF' }}>
        <div className="impl-left-pane">
          <div className="digit-scan-frame" style={{ width: '90px', height: '90px' }}>
            <span className="digit-glyph" style={{ fontSize: '42px' }}>7</span>
          </div>
          <span style={{ fontSize: '10px', color: '#8B98A8', marginTop: '6px' }}>INPUT</span>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div className="impl-center-pane">
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#8A7CFF' }}>
            EMBEDDED MCU FIRMWARE DEPLOYMENT
          </span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', lineHeight: 1.6 }}>
            • Model exported to quantized <strong>INT8 static arrays</strong>.<br />
            • Optimized neural kernel library handles inference execution.<br />
            • Firmware loops through layers, reading weights from Flash.<br />
            • <strong>Silicon Target:</strong> Renesas RA microcontroller kit.
          </div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div className="impl-left-pane">
          <div className="digit-scan-frame" style={{ width: '90px', height: '90px', borderColor: '#57E6A5' }}>
            <span className="digit-glyph" style={{ fontSize: '42px', color: '#57E6A5' }}>7</span>
          </div>
          <span style={{ fontSize: '10px', color: '#57E6A5', fontWeight: 800, marginTop: '6px' }}>OUTPUT</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>
        DEPLOY THE QUANTIZED MODEL AS COMPILED EMBEDDED FIRMWARE
      </div>
    </div>
  );
}

// STAGE 6: ESP32 IMPLEMENTATION DETAILS
export function StageESP32Impl() {
  return (
    <div className="plat-wrap">
      <div className="platform-impl-card" style={{ borderColor: '#57E6A5' }}>
        <div className="impl-left-pane">
          <div className="digit-scan-frame" style={{ width: '90px', height: '90px' }}>
            <span className="digit-glyph" style={{ fontSize: '42px' }}>7</span>
          </div>
          <span style={{ fontSize: '10px', color: '#8B98A8', marginTop: '6px' }}>INPUT</span>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div className="impl-center-pane">
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#57E6A5' }}>
            EDGE TINYML INFERENCE RUNTIME
          </span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', lineHeight: 1.6 }}>
            • Compact <strong>TensorFlow Lite Micro</strong> runtime loaded in SRAM.<br />
            • Model tensor arena allocated statically in internal memory.<br />
            • Classification triggers wireless telemetry via Wi-Fi/BLE.<br />
            • <strong>Silicon Target:</strong> Heltec ESP32 low-power edge node.
          </div>
        </div>

        <span style={{ color: '#64748B', fontSize: '20px' }}>→</span>

        <div className="impl-left-pane">
          <div className="digit-scan-frame" style={{ width: '90px', height: '90px', borderColor: '#57E6A5' }}>
            <span className="digit-glyph" style={{ fontSize: '42px', color: '#57E6A5' }}>7</span>
          </div>
          <span style={{ fontSize: '10px', color: '#57E6A5', fontWeight: 800, marginTop: '6px' }}>OUTPUT</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>
        RUN EMBEDDED INTELLIGENCE AT THE WIRELESS SENSOR EDGE
      </div>
    </div>
  );
}

// STAGE 7: THREE WAYS SIDE-BY-SIDE
export function StageThreeWays() {
  return (
    <div className="plat-wrap">
      <div className="three-cols-grid">
        <div className="col-impl-box" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF' }}>VSDSQUADRON FPGA</span>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>PARALLEL RTL</span>
          <div style={{ fontSize: '11px', color: '#F4F7FA', marginTop: '6px' }}>
            • <strong>Computation:</strong> Custom parallel hardware<br />
            • <strong>Flow:</strong> RTL → Bitstream → Fabric<br />
            • <strong>Advantage:</strong> Deterministic speed<br />
            • <strong>Output:</strong> Digit 7
          </div>
        </div>

        <div className="col-impl-box" style={{ borderColor: '#8A7CFF' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#8A7CFF' }}>RENESAS V2 AI KIT</span>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>EMBEDDED MCU</span>
          <div style={{ fontSize: '11px', color: '#F4F7FA', marginTop: '6px' }}>
            • <strong>Computation:</strong> MCU firmware loop<br />
            • <strong>Flow:</strong> Model → C Code → Flash<br />
            • <strong>Advantage:</strong> Camera & peripheral integration<br />
            • <strong>Output:</strong> Digit 7
          </div>
        </div>

        <div className="col-impl-box" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>HELTEC / ESP32 AI</span>
          <span style={{ fontSize: '10px', color: '#8B98A8' }}>EDGE TINYML</span>
          <div style={{ fontSize: '11px', color: '#F4F7FA', marginTop: '6px' }}>
            • <strong>Computation:</strong> TFLite Micro runtime<br />
            • <strong>Flow:</strong> Model → Firmware → Flash<br />
            • <strong>Advantage:</strong> Wireless & battery-capable<br />
            • <strong>Output:</strong> Digit 7
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 8: WHAT ACTUALLY CHANGES?
export function StageWhatChanges() {
  return (
    <div className="plat-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        THE ALGORITHM IS IDENTICAL. WHAT ACTUALLY CHANGES?
      </div>
      <div className="dimensions-radar-grid">
        <div className="dimension-item-card">
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#27D7FF' }}>1. COMPUTE PARADIGM</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Dedicated parallel circuits vs sequential instruction fetches.</span>
        </div>
        <div className="dimension-item-card">
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#4B8DFF' }}>2. MEMORY HIERARCHY</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>On-chip block RAM vs MCU internal SRAM & Flash memory.</span>
        </div>
        <div className="dimension-item-card">
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#8A7CFF' }}>3. PARALLELISM</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Truly simultaneous hardware MACs vs time-sliced ALU operations.</span>
        </div>
        <div className="dimension-item-card">
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#57E6A5' }}>4. POWER & THERMAL</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Targeting ultra-low milli-Watts for edge battery nodes.</span>
        </div>
        <div className="dimension-item-card">
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#FFB84D' }}>5. DETERMINISM & LATENCY</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>Zero-jitter clock-cycle timing vs OS and firmware latency.</span>
        </div>
        <div className="dimension-item-card">
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#27D7FF' }}>6. DEVELOPMENT EFFORT</span>
          <span style={{ fontSize: '11px', color: '#8B98A8' }}>RTL digital design vs standard C/C++ firmware compilation.</span>
        </div>
      </div>
    </div>
  );
}

// STAGE 9: HARDWARE IS AN ENGINEERING CHOICE
export function StageHardwareIsChoice() {
  return (
    <div className="plat-wrap">
      <div className="choice-axes-container">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#27D7FF' }}>
            ENGINEERING DECISION SPACE
          </span>
          <span style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            There is no universal "best" platform. Hardware selection is always a deliberate set of tradeoffs between performance, cost, energy, and flexibility.
          </span>
        </div>
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '8px 12px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '6px', fontSize: '11px' }}>
            <strong style={{ color: '#27D7FF' }}>FPGA:</strong> Maximum parallelism, custom datapaths, zero instruction overhead.
          </div>
          <div style={{ padding: '8px 12px', background: '#0B1120', border: '1px solid #8A7CFF', borderRadius: '6px', fontSize: '11px' }}>
            <strong style={{ color: '#8A7CFF' }}>RENESAS MCU:</strong> Direct camera sensor ingest, rich industrial peripherals.
          </div>
          <div style={{ padding: '8px 12px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '6px', fontSize: '11px' }}>
            <strong style={{ color: '#57E6A5' }}>ESP32:</strong> Ultra-low cost, battery operation, wireless Wi-Fi/Bluetooth telemetry.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 10: WATCH THE SAME INPUT (Synchronized Feeding)
export function StageSameInput() {
  return (
    <div className="plat-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <div className="digit-scan-frame" style={{ width: '130px', height: '130px' }}>
          <span className="digit-glyph" style={{ fontSize: '64px' }}>7</span>
          <span style={{ fontSize: '10px', color: '#8B98A8', fontWeight: 800 }}>ONE IMAGE INPUT</span>
        </div>

        <span style={{ color: '#64748B', fontSize: '28px' }}>→</span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '340px' }}>
          <div style={{ padding: '10px 16px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '8px', fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>
            ROUTE 1: VSDSQUADRON FPGA ACCELERATOR
          </div>
          <div style={{ padding: '10px 16px', background: '#0B1120', border: '1px solid #8A7CFF', borderRadius: '8px', fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>
            ROUTE 2: RENESAS V2 EMBEDDED MCU
          </div>
          <div style={{ padding: '10px 16px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '8px', fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>
            ROUTE 3: HELTEC / ESP32 WIRELESS SENSOR
          </div>
        </div>
      </div>
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#8B98A8' }}>
        ONE INPUT STREAM TRANSMITTED TO THREE INDEPENDENT SILICON TARGETS
      </div>
    </div>
  );
}

// STAGE 11: SAME RESULT (All Converge on 7)
export function StageSameResult() {
  return (
    <div className="plat-wrap">
      <div className="convergence-hero-box">
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#8B98A8', letterSpacing: '0.2em' }}>
          CONVERGED TASK OUTPUT
        </span>
        <span className="converged-digit-giant">7</span>
        <div style={{ fontSize: '20px', fontFamily: 'Space Grotesk', fontWeight: 800, color: '#F4F7FA', textAlign: 'center' }}>
          THE ALGORITHM STAYS THE SAME.<br />
          <span style={{ color: '#27D7FF' }}>THE HARDWARE CHANGES.</span>
        </div>
        <div style={{ fontSize: '11px', color: '#8B98A8', textAlign: 'center', maxWidth: '520px' }}>
          From custom hardware logic gates to microcontrollers and edge sensors, the exact same mathematical classification was achieved.
        </div>
      </div>
    </div>
  );
}

// STAGE 12: WORKSHOP HANDOFF (Now We Build It)
export function StageWorkshopHandoff() {
  return (
    <div className="plat-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.25em' }}>
          TIME FOR PHYSICAL IMPLEMENTATION
        </span>
        <span style={{ fontSize: '32px', fontFamily: 'Space Grotesk', fontWeight: 900, color: '#F4F7FA' }}>
          NOW LET'S BUILD IT.
        </span>
        <span style={{ fontSize: '13px', color: '#8B98A8', maxWidth: '560px', lineHeight: 1.6 }}>
          We understand how AI math becomes MACs, how MACs become logic gates, and how logic gates become FPGA bitstreams.<br />
          <strong>Now let's build the digit recognition accelerator directly on the FPGA.</strong>
        </span>
        <div style={{ padding: '10px 28px', borderRadius: '30px', background: 'rgba(39, 215, 255, 0.15)', border: '2px solid #27D7FF', color: '#27D7FF', fontSize: '13px', fontWeight: 800, marginTop: '8px' }}>
          NEXT → HANDS-ON WORKSHOP: FPGA DIGIT RECOGNITION
        </div>
      </div>
    </div>
  );
}
