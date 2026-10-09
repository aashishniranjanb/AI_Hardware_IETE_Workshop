import React from 'react';

// STAGE 0: START WITH COMPUTATION (Inherited from Slide 10)
export function StageComputationStart() {
  return (
    <div className="plat-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div className="board-spec-item" style={{ minWidth: '140px', padding: '14px 20px' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>INPUT OPERANDS</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF' }}>A, B</span>
        </div>
        <span style={{ color: '#64748B', fontSize: '24px' }}>→</span>
        {/* ALU Trapezoid Visual */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="220" height="150" viewBox="0 0 220 150">
            <polygon points="20,20 180,45 180,105 20,130 20,88 50,75 20,62" fill="#0B1120" stroke="#27D7FF" strokeWidth="2.5" />
            <text x="95" y="80" fill="#27D7FF" fontSize="16" fontWeight="800" textAnchor="middle">ALU CORE</text>
            <text x="95" y="100" fill="#8B98A8" fontSize="12" textAnchor="middle">ADD / SUB / LOGIC</text>
          </svg>
        </div>
        <span style={{ color: '#64748B', fontSize: '24px' }}>→</span>
        <div className="board-spec-item" style={{ minWidth: '140px', padding: '14px 20px' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>RESULT OUTPUT</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>COMPUTATION</span>
        </div>
      </div>
      <div style={{ fontSize: '13px', color: '#8B98A8', fontWeight: 600, textAlign: 'center', maxWidth: '620px', lineHeight: 1.6 }}>
        The circuit has been designed logically on screen.<br />
        <strong>Now: How does this computation become something physically running on real hardware?</strong>
      </div>
    </div>
  );
}

// STAGE 1: THREE PATHS (Overview)
export function StageThreePaths() {
  return (
    <div className="plat-wrap">
      <div className="three-paths-grid">
        {/* FPGA */}
        <div className="path-preview-card" style={{ borderColor: '#27D7FF' }}>
          <span className="path-badge" style={{ background: 'rgba(39, 215, 255, 0.15)', color: '#27D7FF' }}>
            PATH 01 • FPGA
          </span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA' }}>
            VSDSQUADRON MINI
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            Hardware description via Verilog RTL. Synthesized into physical LUTs and programmed via a bitstream.
          </div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>
            CONFIGURE PHYSICAL HARDWARE
          </div>
        </div>

        {/* Renesas */}
        <div className="path-preview-card" style={{ borderColor: '#8A7CFF' }}>
          <span className="path-badge" style={{ background: 'rgba(138, 124, 255, 0.15)', color: '#8A7CFF' }}>
            PATH 02 • MCU + AI
          </span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA' }}>
            RENESAS V2 AI KIT
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            Trained neural model quantized to INT8. Compiled with embedded C runtime and flashed directly to MCU memory.
          </div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>
            DEPLOY EMBEDDED MODEL
          </div>
        </div>

        {/* ESP32 */}
        <div className="path-preview-card" style={{ borderColor: '#57E6A5' }}>
          <span className="path-badge" style={{ background: 'rgba(87, 230, 165, 0.15)', color: '#57E6A5' }}>
            PATH 03 • TINYML / EDGE
          </span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA' }}>
            HELTEC / ESP32 AI
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            Ultra-low-power edge vision and sensors running compact TensorFlow Lite Micro firmware with Wi-Fi telemetry.
          </div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>
            RUN WIRELESS EDGE AI
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 2: FPGA PIPELINE FLOW
export function StageFPGAPipeline() {
  return (
    <div className="plat-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        PATH 1: HARDWARE DESCRIPTION PIPELINE (RTL → BITSTREAM)
      </div>
      <div className="pipeline-step-chain">
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>01. DESCRIBE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>VERILOG RTL</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>assign y = a & b;</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>02. SYNTHESIZE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>GATE NETLIST</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Logic mapping</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>03. PLACE & ROUTE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>PHYSICAL PnR</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Wire routing</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>04. GENERATE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>BITSTREAM</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>010110...</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box" style={{ borderColor: '#27D7FF', background: 'rgba(39, 215, 255, 0.1)' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>05. TARGET</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>FPGA FABRIC</span>
          <span style={{ fontSize: '12px', color: '#27D7FF' }}>Configured silicon</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '640px', lineHeight: 1.6 }}>
        The designer does NOT write CPU instructions. The toolchain compiles code into a physical circuit configuration.
      </div>
    </div>
  );
}

// STAGE 3: FPGA TARGET (VSDSquadron FPGA Mini)
export function StageFPGATarget() {
  return (
    <div className="plat-wrap">
      <div className="board-hero-card" style={{ borderColor: '#27D7FF' }}>
        <div className="board-schematic-pane">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <rect x="20" y="20" width="180" height="180" rx="10" fill="#082F49" stroke="#27D7FF" strokeWidth="2" />
            <rect x="65" y="65" width="90" height="90" rx="6" fill="#020617" stroke="#27D7FF" strokeWidth="2" />
            <text x="110" y="105" fill="#27D7FF" fontSize="12" fontWeight="800" textAnchor="middle">iCE40UP5K</text>
            <text x="110" y="125" fill="#8B98A8" fontSize="12" textAnchor="middle">FPGA DIE</text>
            <rect x="85" y="10" width="50" height="15" rx="3" fill="#334155" />
            <text x="110" y="22" fill="#F4F7FA" fontSize="11" textAnchor="middle">USB-C</text>
            <line x1="25" y1="40" x2="25" y2="180" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 6" />
            <line x1="195" y1="40" x2="195" y2="180" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 6" />
          </svg>
          <span style={{ marginTop: '10px', fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>
            VSDSQUADRON FPGA MINI
          </span>
        </div>

        <div className="board-info-pane">
          <span className="board-title">Target 01: VSDSquadron FPGA Mini</span>
          <span className="board-flow-tag">RTL → SYNTHESIS → PLACE & ROUTE → BITSTREAM</span>
          <div className="board-specs-list">
            <div className="board-spec-item">
              <span className="k">Silicon Architecture:</span>
              <span className="v">Lattice iCE40UP5K Reconfigurable Fabric</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Logic Resources:</span>
              <span className="v">5,280 Logic Cells (LUT4 + DFF)</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Dedicated Math:</span>
              <span className="v">8 Multiplier/Accumulator DSP blocks</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Programming Port:</span>
              <span className="v">FT232H High-Speed USB Interface</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 4: RENESAS EMBEDDED AI PIPELINE FLOW
export function StageRenesasPipeline() {
  return (
    <div className="plat-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#8A7CFF', letterSpacing: '0.15em' }}>
        PATH 2: EMBEDDED MODEL PIPELINE (MODEL → FIRMWARE)
      </div>
      <div className="pipeline-step-chain">
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>01. TRAIN</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>AI MODEL</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Float32 weights</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>02. QUANTIZE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>INT8 CONVERT</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>4x smaller memory</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>03. COMPILE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>C RUNTIME</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Optimized kernels</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>04. FLASH</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>FIRMWARE</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Program flash</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box" style={{ borderColor: '#8A7CFF', background: 'rgba(138, 124, 255, 0.1)' }}>
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>05. INFERENCE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>MCU EXECUTION</span>
          <span style={{ fontSize: '12px', color: '#8A7CFF' }}>Real-time vision</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '640px', lineHeight: 1.6 }}>
        Here we do not program logic gates. We deploy pre-quantized weights as firmware executing on a microcontroller core.
      </div>
    </div>
  );
}

// STAGE 5: RENESAS TARGET (Renesas V2 Platform)
export function StageRenesasTarget() {
  return (
    <div className="plat-wrap">
      <div className="board-hero-card" style={{ borderColor: '#8A7CFF' }}>
        <div className="board-schematic-pane">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <rect x="20" y="20" width="180" height="180" rx="10" fill="#1E1B4B" stroke="#8A7CFF" strokeWidth="2" />
            <rect x="65" y="65" width="90" height="90" rx="6" fill="#020617" stroke="#8A7CFF" strokeWidth="2" />
            <text x="110" y="105" fill="#8A7CFF" fontSize="12" fontWeight="800" textAnchor="middle">RENESAS RA</text>
            <text x="110" y="125" fill="#8B98A8" fontSize="12" textAnchor="middle">AI KIT V2</text>
            <rect x="75" y="10" width="70" height="14" rx="2" fill="#334155" />
            <text x="110" y="21" fill="#F4F7FA" fontSize="11" textAnchor="middle">CAM MIPI/DVP</text>
            <line x1="25" y1="40" x2="25" y2="180" stroke="#57E6A5" strokeWidth="3" strokeDasharray="4 6" />
            <line x1="195" y1="40" x2="195" y2="180" stroke="#57E6A5" strokeWidth="3" strokeDasharray="4 6" />
          </svg>
          <span style={{ marginTop: '10px', fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>
            RENESAS V2 AI KIT
          </span>
        </div>

        <div className="board-info-pane">
          <span className="board-title">Target 02: Renesas V2 Platform</span>
          <span className="board-flow-tag" style={{ color: '#8A7CFF' }}>
            MODEL → QUANTIZATION → COMPILE → FLASH
          </span>
          <div className="board-specs-list">
            <div className="board-spec-item">
              <span className="k">Core Category:</span>
              <span className="v">Industrial Embedded AI MCU</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Quantization Standard:</span>
              <span className="v">INT8 Post-Training Quantization</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Vision Feed:</span>
              <span className="v">Direct Camera Ingest + Preprocessing</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Deployment Flow:</span>
              <span className="v">Compiled C/C++ Static Firmware</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 6: ESP32 PIPELINE FLOW
export function StageESP32Pipeline() {
  return (
    <div className="plat-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.15em' }}>
        PATH 3: TINYML / EDGE INFERENCE PIPELINE
      </div>
      <div className="pipeline-step-chain">
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>01. MODEL</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>TFLITE MICRO</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>FlatBuffer array</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>02. QUANTIZE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>INT8 ARENA</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Fits in SRAM</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>03. RUNTIME</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>ESP-NN / GCC</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Vector acceleration</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box">
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>04. FLASH</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>ESP-IDF FLASH</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Flash over USB</span>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div className="pipe-step-box" style={{ borderColor: '#57E6A5', background: 'rgba(87, 230, 165, 0.1)' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>05. INFERENCE</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>EDGE OUTPUT</span>
          <span style={{ fontSize: '12px', color: '#57E6A5' }}>Display + Wi-Fi</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '640px', lineHeight: 1.6 }}>
        Ultra-compact TinyML runtime executing inference on a low-cost, battery-capable edge device.
      </div>
    </div>
  );
}

// STAGE 7: ESP32 TARGET (Heltec / ESP32 AI Platform)
export function StageESP32Target() {
  return (
    <div className="plat-wrap">
      <div className="board-hero-card" style={{ borderColor: '#57E6A5' }}>
        <div className="board-schematic-pane">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <rect x="35" y="20" width="150" height="180" rx="10" fill="#064E3B" stroke="#57E6A5" strokeWidth="2" />
            <rect x="60" y="45" width="100" height="80" rx="4" fill="#020617" stroke="#57E6A5" strokeWidth="1.5" />
            <text x="110" y="85" fill="#57E6A5" fontSize="12" fontWeight="800" textAnchor="middle">ESP32-S3</text>
            <text x="110" y="105" fill="#8B98A8" fontSize="12" textAnchor="middle">Xtensa Dual-Core</text>
            <rect x="60" y="135" width="100" height="40" rx="4" fill="#020617" stroke="#334155" />
            <text x="110" y="160" fill="#27D7FF" fontSize="12" textAnchor="middle">OLED 128×64</text>
            <path d="M 40 25 L 55 25 L 55 35 L 70 35" stroke="#F59E0B" strokeWidth="2" fill="none" />
          </svg>
          <span style={{ marginTop: '10px', fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>
            HELTEC / ESP32 AI PLATFORM
          </span>
        </div>

        <div className="board-info-pane">
          <span className="board-title">Target 03: Heltec / ESP32 Platform</span>
          <span className="board-flow-tag" style={{ color: '#57E6A5' }}>
            TFLITE MODEL → COMPILE → FLASH → MCU
          </span>
          <div className="board-specs-list">
            <div className="board-spec-item">
              <span className="k">Processor Architecture:</span>
              <span className="v">Xtensa Dual-Core 32-bit Core</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Edge AI Framework:</span>
              <span className="v">TensorFlow Lite Micro (TFLM)</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Connectivity:</span>
              <span className="v">Wi-Fi + BLE Wireless Telemetry</span>
            </div>
            <div className="board-spec-item">
              <span className="k">Power Profile:</span>
              <span className="v">Low-Power Edge Battery Operation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 8: COMPARE THE THREE PATHS (Direct Side-by-Side)
export function StageComparePaths() {
  return (
    <div className="plat-wrap">
      <div className="compare-columns-container">
        {/* FPGA */}
        <div className="compare-col-box" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF' }}>FPGA PATH</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>VSDSQUADRON MINI</span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', marginTop: '6px' }}>
            • <strong>What you design:</strong> Hardware / RTL (Verilog)<br />
            • <strong>Main Flow:</strong> RTL → Netlist → Bitstream<br />
            • <strong>What's programmed:</strong> Switch matrix & LUT cells<br />
            • <strong>Computation:</strong> Custom parallel hardware
          </div>
        </div>

        {/* Renesas */}
        <div className="compare-col-box" style={{ borderColor: '#8A7CFF' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#8A7CFF' }}>RENESAS PATH</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>RENESAS V2 AI KIT</span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', marginTop: '6px' }}>
            • <strong>What you design:</strong> AI Model + C firmware<br />
            • <strong>Main Flow:</strong> Model → Quantize → Compile → Flash<br />
            • <strong>What's programmed:</strong> MCU Flash memory<br />
            • <strong>Computation:</strong> Embedded MCU inference
          </div>
        </div>

        {/* ESP32 */}
        <div className="compare-col-box" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5' }}>ESP32 PATH</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>HELTEC / ESP32 AI</span>
          <div style={{ fontSize: '12px', color: '#F4F7FA', marginTop: '6px' }}>
            • <strong>What you design:</strong> TFLite Model + firmware<br />
            • <strong>Main Flow:</strong> Model → Compile → Flash<br />
            • <strong>What's programmed:</strong> MCU Flash memory<br />
            • <strong>Computation:</strong> Edge TinyML inference
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 9: SAME TASK (Digit 7 Convergence)
export function StageSameTask() {
  return (
    <div className="plat-wrap">
      <div className="task-convergence-wrapper">
        {/* Input */}
        <div className="input-digit-display">
          <span style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>INPUT DATA</span>
          <span style={{ fontSize: '36px', fontWeight: 800, color: '#27D7FF', fontFamily: 'Space Grotesk' }}>7</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>MNIST Image</span>
        </div>

        <span style={{ color: '#64748B', fontSize: '24px' }}>→</span>

        {/* 3 Routes */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>VSDSQUADRON FPGA (Parallel RTL)</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>OUTPUT: 7</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', background: '#0B1120', border: '1px solid #8A7CFF', borderRadius: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>RENESAS V2 (Embedded Model)</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>OUTPUT: 7</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>HELTEC / ESP32 (TinyML Sensor)</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>OUTPUT: 7</span>
          </div>
        </div>
      </div>
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#57E6A5' }}>
        SAME INPUT → DIFFERENT HARDWARE → SAME AI TASK
      </div>
    </div>
  );
}

// STAGE 10: TRADEOFFS (So which one is better?)
export function StageTradeoffs() {
  return (
    <div className="plat-wrap">
      <div className="tradeoff-radar-grid">
        <div className="tradeoff-card" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF' }}>FPGA: ULTRA-LOW LATENCY</span>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            • Microsecond latency<br />
            • Truly parallel execution<br />
            • Higher development complexity (RTL)<br />
            • Ideal for high-speed deterministic controls
          </div>
        </div>

        <div className="tradeoff-card" style={{ borderColor: '#8A7CFF' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#8A7CFF' }}>RENESAS: BALANCED EMBEDDED</span>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            • Millisecond inference latency<br />
            • Rich peripheral integrations & cameras<br />
            • Standard C/C++ development workflow<br />
            • Ideal for smart appliances & robotics
          </div>
        </div>

        <div className="tradeoff-card" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5' }}>ESP32: WIRELESS & LOW COST</span>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            • Ultra-low silicon cost<br />
            • Built-in Wi-Fi & Bluetooth telemetry<br />
            • Battery operation capable (~100mW)<br />
            • Ideal for distributed IoT sensor nodes
          </div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', marginTop: '6px' }}>
        THERE IS NO UNIVERSAL WINNER: HARDWARE SELECTION IS DEFINED BY ENGINEERING TRADEOFFS
      </div>
    </div>
  );
}

// STAGE 11: PHYSICAL REVEAL (The 3 Boards)
export function StagePhysicalReveal() {
  return (
    <div className="plat-wrap">
      <div className="reveal-boards-grid">
        <div className="reveal-board-pane" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>BOARD 01</span>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#F4F7FA' }}>VSDSQUADRON FPGA MINI</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Lattice iCE40UP5K Reconfigurable Silicon</span>
        </div>

        <div className="reveal-board-pane" style={{ borderColor: '#8A7CFF' }}>
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>BOARD 02</span>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#F4F7FA' }}>RENESAS V2 AI KIT</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Embedded Vision & Microcontroller Kit</span>
        </div>

        <div className="reveal-board-pane" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>BOARD 03</span>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#F4F7FA' }}>HELTEC / ESP32 AI</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Wireless Edge Sensor & Display Node</span>
        </div>
      </div>

      <div style={{ padding: '8px 24px', borderRadius: '20px', background: 'rgba(39, 215, 255, 0.1)', border: '1px solid #27D7FF', color: '#27D7FF', fontSize: '12px', fontWeight: 800, marginTop: '10px' }}>
        NEXT → ONE AI MODEL. THREE WAYS TO RUN IT (LIVE BENCHMARK MATRIX)
      </div>
    </div>
  );
}
