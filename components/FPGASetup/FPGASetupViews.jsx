import React, { useState, useEffect } from 'react';
import { GlyphIcon } from '../deck/GlyphIcon';

// STAGE 0: THE BOARD (This is our FPGA)
export function StageTheBoard() {
  return (
    <div className="fs-wrap">
      <div className="fs-board-hero-card">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect x="15" y="15" width="170" height="170" rx="10" fill="#082F49" stroke="#27D7FF" strokeWidth="2.5" />
          <rect x="60" y="60" width="80" height="80" rx="6" fill="#020617" stroke="#27D7FF" strokeWidth="2" />
          <text x="100" y="98" fill="#27D7FF" fontSize="12" fontWeight="800" textAnchor="middle">iCE40UP5K</text>
          <text x="100" y="116" fill="#8B98A8" fontSize="12" textAnchor="middle">FPGA SILICON</text>
          <rect x="80" y="10" width="40" height="14" rx="2" fill="#334155" />
          <text x="100" y="21" fill="#F4F7FA" fontSize="11" textAnchor="middle">USB-C</text>
          <line x1="22" y1="35" x2="22" y2="165" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 6" />
          <line x1="178" y1="35" x2="178" y2="165" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 6" />
        </svg>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#27D7FF' }}>
            VSDSQUADRON FPGA MINI
          </span>
          <div style={{ fontSize: '13px', color: '#F4F7FA', lineHeight: 1.6 }}>
            The physical silicon board is right on the laboratory table.<br />
            At the center sits the <strong>Lattice iCE40UP5K FPGA</strong>, surrounded by all required supporting hardware.
          </div>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 700, marginTop: '4px' }}>
            READY TO RECEIVE YOUR DIGITAL HARDWARE DESIGN
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 1: WHAT'S ON BOARD?
export function StageWhatIsOnBoard() {
  return (
    <div className="fs-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%', maxWidth: '950px' }}>
        <div style={{ background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>CORE SILICON</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA', marginTop: '6px' }}>iCE40UP5K FPGA</div>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>5,280 Logic Cells</span>
        </div>

        <div style={{ background: '#0B1120', border: '1px solid #4B8DFF', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#4B8DFF', fontWeight: 800 }}>ONBOARD STORAGE</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA', marginTop: '6px' }}>SPI FLASH</div>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Non-volatile bitstream</span>
        </div>

        <div style={{ background: '#0B1120', border: '1px solid #8A7CFF', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>I/O INTERFACE</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA', marginTop: '6px' }}>32 GPIO PINS</div>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Sensors, LEDs & Displays</span>
        </div>

        <div style={{ background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>COMMUNICATION</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#57E6A5', marginTop: '6px' }}>ONBOARD FT232H</div>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Integrated USB Programmer</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        EVERYTHING NEEDED TO DEVELOP AND FLASH DIGITAL HARDWARE IS PACKAGED ON A SINGLE BOARD
      </div>
    </div>
  );
}

// STAGE 2: ONE USB CABLE
export function StageOneUSBCable() {
  return (
    <div className="fs-wrap">
      <div className="usb-cable-link-container">
        <div style={{ padding: '18px 24px', background: '#0B1120', border: '1px solid #334155', borderRadius: '12px', textAlign: 'center', minWidth: '180px' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>DEVELOPMENT PC</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#F4F7FA', marginTop: '4px' }}>YOUR LAPTOP</div>
          <span style={{ fontSize: '12px', color: '#27D7FF' }}>Yosys + nextpnr</span>
        </div>

        <svg className="cable-wire-svg" viewBox="0 0 300 50">
          <line x1="10" y1="25" x2="290" y2="25" stroke="#27D7FF" strokeWidth="4" />
          <rect x="130" y="10" width="40" height="30" rx="6" fill="#0B1120" stroke="#27D7FF" strokeWidth="1.5" />
          <text x="150" y="29" fill="#27D7FF" fontSize="12" fontWeight="800" textAnchor="middle">USB</text>
        </svg>

        <div style={{ padding: '18px 24px', background: '#0B1120', border: '2px solid #27D7FF', borderRadius: '12px', textAlign: 'center', minWidth: '180px' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>TARGET BOARD</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#27D7FF', marginTop: '4px' }}>VSDSQUADRON</div>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>FPGA Mini</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        A SINGLE DIRECT USB CABLE PROVIDES BOTH PROGRAMMING BUS AND HARDWARE POWER
      </div>
    </div>
  );
}

// STAGE 3: ONBOARD INTERFACE (No External FT232H Required)
export function StageOnboardFT232H() {
  return (
    <div className="fs-wrap">
      <div className="prominent-callout-banner">
        ★ CRITICAL NOTICE: NO EXTERNAL FT232H ADAPTER REQUIRED ★
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '10px' }}>
        <div style={{ padding: '16px 20px', background: '#0B1120', border: '1px solid #334155', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>SOURCE</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>LAPTOP USB</div>
        </div>

        <span style={{ color: '#27D7FF', fontSize: '24px' }}>→</span>

        <div style={{ padding: '18px 26px', background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>BUILT-IN ONBOARD</span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA' }}>FT232H INTERFACE</div>
          <span style={{ fontSize: '12px', color: '#57E6A5' }}>Already soldered on the PCB!</span>
        </div>

        <span style={{ color: '#27D7FF', fontSize: '24px' }}>→</span>

        <div style={{ padding: '16px 20px', background: '#0B1120', border: '2px solid #27D7FF', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF' }}>SILICON TARGET</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF' }}>iCE40UP5K FPGA</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '600px', lineHeight: 1.6 }}>
        Do not purchase or wire external USB-to-JTAG dongles or breakout modules.<br />
        The VSDSquadron FPGA Mini features an onboard FT232H high-speed bridge.
      </div>
    </div>
  );
}

// STAGE 4: WHAT DOES USB ACTUALLY DO?
export function StageWhatUSBDoes() {
  return (
    <div className="fs-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '850px' }}>
        <div style={{ flex: 1, padding: '16px', background: '#0B1120', border: '1px solid #334155', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>BITSTREAM (.bin)</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#F4F7FA' }}>BINARY BYTES</div>
        </div>
        <span style={{ color: '#27D7FF' }}>→</span>
        <div style={{ flex: 1, padding: '16px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF' }}>USB PROTOCOL</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF' }}>PACKET STREAM</div>
        </div>
        <span style={{ color: '#27D7FF' }}>→</span>
        <div style={{ flex: 1, padding: '16px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5' }}>ONBOARD FT232H</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5' }}>SPI BUS CONVERSION</div>
        </div>
        <span style={{ color: '#57E6A5' }}>→</span>
        <div style={{ flex: 1, padding: '16px', background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5' }}>iCE40UP5K</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5' }}>SRAM CONFIG</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        OPEN-SOURCE TOOLS (openFPGALoader) SEND CONFIGURATION PACKETS OVER STANDARD USB
      </div>
    </div>
  );
}

// STAGE 5: POWER + DATA DUAL FLOW
export function StagePowerAndData() {
  return (
    <div className="fs-wrap">
      <div className="power-data-split-box">
        <div className="split-flow-card" style={{ borderColor: '#F59E0B' }}>
          <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 800 }}>PATH 1: POWER DELIVERY</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#F4F7FA' }}>USB VBUS POWER</div>
          <span style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.5 }}>
            Powers the FPGA core, on-chip SRAM, and onboard clock oscillator directly from your laptop.
          </span>
        </div>

        <div className="split-flow-card" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>PATH 2: DATA STREAM</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#F4F7FA' }}>USB D+ / D- DATA</div>
          <span style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.5 }}>
            Transfers raw configuration bitstream data and establishes bidirectional UART serial monitoring.
          </span>
        </div>
      </div>
    </div>
  );
}

// STAGE 6: SEND THE BITSTREAM
export function StageSendBitstream() {
  return (
    <div className="fs-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', background: '#020617', border: '2px solid #27D7FF', borderRadius: '16px', padding: '24px 36px' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>FLASH COMMAND</span>
          <div style={{ fontSize: '13px', fontFamily: 'Space Grotesk', fontWeight: 800, color: '#27D7FF' }}>openFPGALoader -b ice40_generic</div>
        </div>
        <span style={{ color: '#27D7FF', display: 'inline-flex' }}><GlyphIcon glyph="⚡" size={28} /></span>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>BOARD RESPONSE</span>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5' }}>Bitstream Loaded Successfully</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        IN LESS THAN 2 SECONDS, HARDWARE CONFIGURATION FLIGHTS FROM LAPTOP TO FPGA
      </div>
    </div>
  );
}

// STAGE 7: THE FPGA IS NOW CONFIGURED
export function StageFPGAConfigured() {
  return (
    <div className="fs-wrap">
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ width: '150px', height: '150px', background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 0 30px rgba(87, 230, 165, 0.2)' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>SILICON STATE</span>
          <span style={{ fontSize: '20px', fontWeight: 900, color: '#F4F7FA' }}>ACTIVE</span>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>CDONE High</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '440px' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#57E6A5' }}>
            YOUR DIGITAL CIRCUIT EXISTS IN REAL HARDWARE
          </span>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6 }}>
            The switch matrix pass transistors are locked into position. The Look-Up Tables are initialized. The iCE40UP5K is now physically functioning as your custom hardware.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 8: FIRST TEST: BLINK
export function StageFirstTestBlink() {
  const [ledState, setLedState] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setLedState(prev => !prev), 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fs-wrap">
      <div className="blink-validation-card">
        <div className={`pulsing-led-indicator ${ledState ? '' : 'led-off'}`} style={{ opacity: ledState ? 1 : 0.25, boxShadow: ledState ? '0 0 30px #57E6A5' : 'none' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800, letterSpacing: '0.15em' }}>
            STEP 01: HARDWARE SANITY CHECK
          </span>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#F4F7FA' }}>
            TEST PROGRAM: LED BLINK
          </span>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.5 }}>
            A 24-bit clock divider driving an onboard LED.<br />
            <strong>If BLINK works → the entire USB, toolchain, and FPGA pipeline works!</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 9: THEN WE REPLACE BLINK WITH AI
export function StageThenAI() {
  return (
    <div className="fs-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div style={{ padding: '20px 24px', background: '#0B1120', border: '1px solid #334155', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>PHASE 1</span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#F4F7FA' }}>LED BLINK</div>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>Basic clock counter</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>UPGRADE RTL</span>
          <span style={{ color: '#27D7FF', fontSize: '24px' }}>→</span>
        </div>

        <div style={{ padding: '20px 24px', background: '#0B1120', border: '2px solid #27D7FF', borderRadius: '12px', textAlign: 'center', boxShadow: '0 0 25px rgba(39, 215, 255, 0.2)' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF' }}>PHASE 2</span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#27D7FF' }}>AI ACCELERATOR</div>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 700 }}>Parallel MACs • MNIST Digit</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 600 }}>
        SAME BOARD. SAME USB CABLE. SAME TOOLCHAIN. JUST MORE POWERFUL RTL LOGIC.
      </div>
    </div>
  );
}

// STAGE 10: COMPLETE WORKSHOP SETUP
export function StageCompleteSetup() {
  return (
    <div className="fs-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
        OUR COMPLETE WORKBENCH LAB SETUP
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', maxWidth: '900px' }}>
        <div style={{ flex: 1, padding: '14px', background: '#0B1120', border: '1px solid #334155', borderRadius: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#8B98A8' }}>01. LAPTOP</span>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>IDE / TOOLCHAIN</div>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div style={{ flex: 1, padding: '14px', background: '#0B1120', border: '1px solid #27D7FF', borderRadius: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF' }}>02. LINK</span>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>USB CABLE</div>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div style={{ flex: 1, padding: '14px', background: '#0B1120', border: '1px solid #57E6A5', borderRadius: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5' }}>03. BRIDGE</span>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>ONBOARD FT232H</div>
        </div>
        <span style={{ color: '#64748B' }}>→</span>
        <div style={{ flex: 1, padding: '14px', background: '#0B1120', border: '2px solid #57E6A5', borderRadius: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5' }}>04. ACCELERATOR</span>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>iCE40UP5K</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 11: HARDWARE READY (No External Programmer)
export function StageHardwareReady() {
  return (
    <div className="fs-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: '#020617', border: '2px solid #27D7FF', borderRadius: '18px', padding: '34px 50px', boxShadow: '0 0 35px rgba(39, 215, 255, 0.2)' }}>
        <div style={{ fontSize: '28px', fontFamily: 'Space Grotesk', fontWeight: 900, color: '#27D7FF' }}>
          HARDWARE READY
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#F4F7FA', textAlign: 'center' }}>
          NO EXTERNAL PROGRAMMER NEEDED.<br />
          <span style={{ color: '#57E6A5' }}>USB IS ALL WE NEED.</span>
        </div>
        <div style={{ fontSize: '12px', color: '#8B98A8', textAlign: 'center', maxWidth: '480px' }}>
          The development computer communicates directly with the VSDSquadron FPGA Mini. Clean, compact, and classroom-ready.
        </div>
      </div>
    </div>
  );
}

// STAGE 12: HANDS-ON: NOW LET'S PROGRAM IT
export function StageHandsOnSteps() {
  return (
    <div className="fs-wrap">
      <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.2em' }}>
        WORKSHOP EXECUTION STEPS
      </div>
      <div className="steps-progression-grid">
        <div className="step-box-item" style={{ borderColor: '#27D7FF' }}>
          <span style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>STEP 01</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>CONNECT USB</span>
        </div>
        <div className="step-box-item">
          <span style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>STEP 02</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>BUILD DESIGN</span>
        </div>
        <div className="step-box-item">
          <span style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>STEP 03</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>BITSTREAM</span>
        </div>
        <div className="step-box-item" style={{ borderColor: '#57E6A5' }}>
          <span style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>STEP 04</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>FLASH FPGA</span>
        </div>
        <div className="step-box-item">
          <span style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>STEP 05</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>TEST OUTPUT</span>
        </div>
      </div>
      <div style={{ padding: '8px 24px', borderRadius: '20px', background: 'rgba(39, 215, 255, 0.15)', border: '1px solid #27D7FF', color: '#27D7FF', fontSize: '12px', fontWeight: 800, marginTop: '10px' }}>
        NEXT → FIRST FPGA PROGRAM: BLINK TO NEURAL ACCELERATOR
      </div>
    </div>
  );
}
