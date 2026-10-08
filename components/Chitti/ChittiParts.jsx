import React from 'react';

/**
 * High-fidelity SVG / CSS mechanical sub-assemblies for Chitti.
 * Designed with brushed titanium tones, beveled armor plates, and cyan emissive highlights.
 */

export function HeadAssembly({ isScanning }) {
  return (
    <svg viewBox="0 0 160 160" width="100%" height="100%" className="chitti-svg-part">
      <defs>
        <linearGradient id="headTitanium" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c3c54" />
          <stop offset="50%" stopColor="#162234" />
          <stop offset="100%" stopColor="#0b121e" />
        </linearGradient>
        <linearGradient id="foreheadPlate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b4f6e" />
          <stop offset="100%" stopColor="#1a273b" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Skull Base / Occipital Frame */}
      <path d="M 35 130 L 25 70 Q 25 15 80 15 Q 135 15 135 70 L 125 130 Z" fill="url(#headTitanium)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.4" />

      {/* Forehead Armor Shell */}
      <path d="M 40 25 Q 80 15 120 25 L 128 65 Q 80 50 32 65 Z" fill="url(#foreheadPlate)" stroke="#475569" strokeWidth="1" />
      <line x1="80" y1="20" x2="80" y2="55" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* Ear Servos / Lateral Auditory Sensors */}
      <rect x="18" y="65" width="8" height="28" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
      <rect x="134" y="65" width="8" height="28" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />

      {/* Ocular Visor Cutout */}
      <path d="M 36 70 L 124 70 L 118 92 L 42 92 Z" fill="#030712" stroke="#1e293b" strokeWidth="1.5" />

      {/* Expressive Glowing Eyes (Stereo Cameras) */}
      <g className={isScanning ? "scan-pulse-eyes" : ""}>
        {/* Left Eye */}
        <circle cx="58" cy="80" r="10" fill="url(#eyeGlow)" />
        <circle cx="58" cy="80" r="4.5" fill="#f0fdf4" />
        <circle cx="58" cy="80" r="8" fill="none" stroke="#22d3ee" strokeWidth="1.2" />

        {/* Right Eye */}
        <circle cx="102" cy="80" r="10" fill="url(#eyeGlow)" />
        <circle cx="102" cy="80" r="4.5" fill="#f0fdf4" />
        <circle cx="102" cy="80" r="8" fill="none" stroke="#22d3ee" strokeWidth="1.2" />

        {/* Central LiDAR Depth Beam Emitter */}
        <circle cx="80" cy="74" r="2.5" fill="#38bdf8" />
        <line x1="72" y1="74" x2="88" y2="74" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* Jawline & Mouth Speaker Acoustic Grille */}
      <path d="M 46 100 L 114 100 L 102 135 L 58 135 Z" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <g stroke="#38bdf8" strokeWidth="1" opacity="0.7">
        <line x1="64" y1="112" x2="96" y2="112" />
        <line x1="68" y1="118" x2="92" y2="118" />
        <line x1="72" y1="124" x2="88" y2="124" />
      </g>
    </svg>
  );
}

export function VisionOpticsModule() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'rgba(8, 16, 30, 0.92)',
      border: '1.5px solid #38bdf8',
      borderRadius: '12px',
      boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '4px 10px',
      position: 'relative'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #22d3ee, #0369a1 70%)',
        border: '2px solid #7dd3fc',
        boxShadow: '0 0 12px #38bdf8',
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        fontSize: '8px',
        fontWeight: 'bold'
      }}>
        4K
      </div>
      <div style={{
        fontSize: '9px',
        fontFamily: 'monospace',
        color: '#38bdf8',
        textAlign: 'center',
        lineHeight: 1.2
      }}>
        STEREO<br />LiDAR
      </div>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #22d3ee, #0369a1 70%)',
        border: '2px solid #7dd3fc',
        boxShadow: '0 0 12px #38bdf8',
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        fontSize: '8px',
        fontWeight: 'bold'
      }}>
        120F
      </div>
    </div>
  );
}

export function ChestPectoralPlate({ side = 'left' }) {
  const isLeft = side === 'left';
  return (
    <svg viewBox="0 0 120 140" width="100%" height="100%" className="chitti-svg-part">
      <defs>
        <linearGradient id={`chestGrad_${side}`} x1={isLeft ? "0%" : "100%"} y1="0%" x2={isLeft ? "100%" : "0%"} y2="100%">
          <stop offset="0%" stopColor="#25354e" />
          <stop offset="45%" stopColor="#142134" />
          <stop offset="100%" stopColor="#09111c" />
        </linearGradient>
      </defs>
      <path
        d={isLeft
          ? "M 10 10 L 110 5 L 105 130 L 25 125 L 8 60 Z"
          : "M 110 10 L 10 5 L 15 130 L 95 125 L 112 60 Z"}
        fill={`url(#chestGrad_${side})`}
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />
      {/* Carbon fiber accent / decal */}
      <path
        d={isLeft
          ? "M 25 35 L 90 32 L 80 80 L 20 75 Z"
          : "M 95 35 L 30 32 L 40 80 L 100 75 Z"}
        fill="#09101b"
        stroke="#1e293b"
        strokeWidth="1"
      />
      <text
        x={isLeft ? "30" : "45"}
        y="55"
        fill="#64748b"
        fontSize="7"
        fontFamily="monospace"
        letterSpacing="1"
      >
        {isLeft ? "CHITTI-L" : "CHITTI-R"}
      </text>
      {/* Screws / Panel Rivets */}
      <circle cx={isLeft ? "18" : "102"} cy="18" r="2" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
      <circle cx={isLeft ? "98" : "22"} cy="18" r="2" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
      <circle cx={isLeft ? "25" : "95"} cy="118" r="2" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
    </svg>
  );
}

export function AIComputeCoreModule({ isScanning, isExploded }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, #0f2747 0%, #060e1d 80%)',
      border: '2px solid #38bdf8',
      borderRadius: '16px',
      boxShadow: isExploded
        ? '0 0 50px rgba(56, 189, 248, 0.7), inset 0 0 25px rgba(34, 211, 238, 0.5)'
        : '0 0 25px rgba(56, 189, 248, 0.35)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Circuit lines in the background */}
      <div style={{
        position: 'absolute',
        inset: '4px',
        border: '1px dashed rgba(56, 189, 248, 0.3)',
        borderRadius: '12px',
        pointerEvents: 'none'
      }} />

      {/* Dual Silicon Dies */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', zIndex: 2 }}>
        {/* Die 01 */}
        <div style={{
          width: '44px',
          height: '52px',
          background: 'linear-gradient(135deg, #1e3a5f, #0c182a)',
          border: '1.2px solid #60a5fa',
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(96, 165, 250, 0.4)'
        }}>
          <span style={{ fontSize: '7px', fontWeight: 800, color: '#93c5fd' }}>CPU/GPU</span>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#f8fafc' }}>64T</span>
          <span style={{ fontSize: '6px', color: '#38bdf8', fontFamily: 'monospace' }}>FLOPS</span>
        </div>

        {/* Bridge Interconnect */}
        <div style={{
          width: '12px',
          height: '24px',
          background: '#0284c7',
          borderRadius: '3px',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 0 8px #38bdf8'
        }}>
          <span style={{ fontSize: '6px', color: '#fff', transform: 'rotate(-90deg)' }}>LINK</span>
        </div>

        {/* Die 02 (NPU Tensor Accelerator) */}
        <div style={{
          width: '44px',
          height: '52px',
          background: 'linear-gradient(135deg, #0e3b5e, #07192b)',
          border: '1.2px solid #22d3ee',
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)'
        }}>
          <span style={{ fontSize: '7px', fontWeight: 800, color: '#67e8f9' }}>NPU AI</span>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#f8fafc' }}>64T</span>
          <span style={{ fontSize: '6px', color: '#22d3ee', fontFamily: 'monospace' }}>MACs</span>
        </div>
      </div>

      <div style={{
        marginTop: '6px',
        fontSize: '8px',
        fontWeight: 800,
        letterSpacing: '1px',
        color: '#e2e8f0',
        zIndex: 2
      }}>
        CHITTI NEURAL CORE
      </div>
    </div>
  );
}

export function MemoryStackModule({ side = 'left' }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(145deg, #0d1e34, #060c16)',
      border: '1px solid #38bdf8',
      borderRadius: '8px',
      padding: '4px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)'
    }}>
      <div style={{ fontSize: '7px', fontWeight: 800, color: '#38bdf8', textAlign: 'center', letterSpacing: '0.5px' }}>
        HBM3e
      </div>
      {/* 4x 3D stacked DRAM layers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            height: '12px',
            background: 'linear-gradient(90deg, #1e293b, #0f172a)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4px'
          }}>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#22d3ee' }} />
            <span style={{ fontSize: '6px', color: '#94a3b8', fontFamily: 'monospace' }}>8GB</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '6px', color: '#64748b', textAlign: 'center', fontFamily: 'monospace' }}>
        3.2 TB/s
      </div>
    </div>
  );
}

export function BatteryPowerModule() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(145deg, #101c2e, #070d17)',
      border: '1.5px solid #0284c7',
      borderRadius: '12px',
      padding: '8px 12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '9px', fontWeight: 800, color: '#38bdf8', letterSpacing: '1px' }}>SOLID-STATE POWER</span>
        <span style={{ fontSize: '8px', color: '#4ade80', fontFamily: 'monospace', fontWeight: 'bold' }}>800V DC</span>
      </div>

      {/* Battery Cell Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{
            height: '38px',
            background: 'linear-gradient(to bottom, #1e3a5f, #091321)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '2px'
          }}>
            <div style={{
              height: '80%',
              background: 'linear-gradient(to top, #38bdf8, #0284c7)',
              borderRadius: '2px',
              boxShadow: '0 0 6px #38bdf8'
            }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#94a3b8' }}>
        <span>PMIC: 12-PHASE REGULATOR</span>
        <span style={{ color: '#38bdf8' }}>CAPACITY 98%</span>
      </div>
    </div>
  );
}

export function ThermalCoolingModule() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1c1917, #0c0a09)',
      border: '1.5px solid #f97316',
      borderRadius: '14px',
      padding: '8px',
      boxShadow: '0 0 30px rgba(249, 115, 22, 0.25)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '9px', fontWeight: 800, color: '#fb923c' }}>VAPOR CHAMBER</span>
        <span style={{ fontSize: '7px', color: '#fdba74', fontFamily: 'monospace' }}>450W TDP DISSIPATION</span>
      </div>

      {/* Micro-fins */}
      <div style={{ display: 'flex', gap: '3px', height: '65px', alignItems: 'center', justifyContent: 'center' }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(to bottom, #b45309, #78350f)',
            borderRadius: '1px'
          }} />
        ))}
      </div>

      <div style={{ fontSize: '7px', color: '#a8a29e', textAlign: 'center' }}>
        DUAL CLOSED-LOOP MICRO-CHANNEL COOLING
      </div>
    </div>
  );
}

export function RoboticArmModule({ side = 'left' }) {
  const isLeft = side === 'left';
  return (
    <svg viewBox="0 0 75 310" width="100%" height="100%" className="chitti-svg-part">
      <defs>
        <linearGradient id={`armTitanium_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#223349" />
          <stop offset="50%" stopColor="#121d2d" />
          <stop offset="100%" stopColor="#080f18" />
        </linearGradient>
      </defs>

      {/* Shoulder Actuator Ball Joint */}
      <circle cx={isLeft ? "42" : "33"} cy="25" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx={isLeft ? "42" : "33"} cy="25" r="10" fill="#0284c7" />

      {/* Bicep Structural Frame */}
      <path
        d={isLeft ? "M 28 42 L 56 42 L 50 135 L 22 135 Z" : "M 19 42 L 47 42 L 53 135 L 25 135 Z"}
        fill={`url(#armTitanium_${side})`}
        stroke="#334155"
        strokeWidth="1.2"
      />

      {/* Hydraulic Actuator Piston Cylinder */}
      <rect x={isLeft ? "33" : "28"} y="55" width="8" height="65" rx="3" fill="#38bdf8" opacity="0.8" />

      {/* Elbow Servo Joint */}
      <circle cx={isLeft ? "36" : "39"} cy="148" r="14" fill="#0b1320" stroke="#38bdf8" strokeWidth="1.2" />
      <circle cx={isLeft ? "36" : "39"} cy="148" r="5" fill="#f8fafc" />

      {/* Forearm Body */}
      <path
        d={isLeft ? "M 24 160 L 48 160 L 44 240 L 28 240 Z" : "M 27 160 L 51 160 L 47 240 L 31 240 Z"}
        fill={`url(#armTitanium_${side})`}
        stroke="#334155"
        strokeWidth="1.2"
      />

      {/* Hand & Articulated Multi-Finger Mechanism */}
      <rect x={isLeft ? "26" : "29"} y="244" width="22" height="18" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
      {/* 4 Fingers */}
      <rect x={isLeft ? "27" : "30"} y="266" width="3.5" height="28" rx="1.5" fill="#475569" />
      <rect x={isLeft ? "33" : "36"} y="266" width="3.5" height="32" rx="1.5" fill="#475569" />
      <rect x={isLeft ? "39" : "42"} y="266" width="3.5" height="30" rx="1.5" fill="#475569" />
      <rect x={isLeft ? "45" : "48"} y="266" width="3.5" height="24" rx="1.5" fill="#475569" />
    </svg>
  );
}

export function PelvisAndLegsModule() {
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" className="chitti-svg-part">
      {/* Pelvis Frame */}
      <path d="M 40 10 L 180 10 L 160 55 L 60 55 Z" fill="#111c2c" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="110" cy="30" r="10" fill="#0369a1" />
      <text x="110" y="33" fill="#fff" fontSize="6" textAnchor="middle" fontWeight="bold">IMU</text>

      {/* Left Hip Joint */}
      <circle cx="65" cy="55" r="16" fill="#0b1320" stroke="#38bdf8" strokeWidth="1.2" />
      {/* Right Hip Joint */}
      <circle cx="155" cy="55" r="16" fill="#0b1320" stroke="#38bdf8" strokeWidth="1.2" />

      {/* Thigh Struts */}
      <path d="M 52 70 L 78 70 L 74 150 L 56 150 Z" fill="#162337" stroke="#334155" strokeWidth="1" />
      <path d="M 142 70 L 168 70 L 164 150 L 146 150 Z" fill="#162337" stroke="#334155" strokeWidth="1" />

      {/* Knee Servos */}
      <circle cx="65" cy="158" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
      <circle cx="155" cy="158" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />

      {/* Lower Legs */}
      <path d="M 56 170 L 74 170 L 70 215 L 60 215 Z" fill="#111d2e" stroke="#334155" strokeWidth="1" />
      <path d="M 146 170 L 164 170 L 160 215 L 150 215 Z" fill="#111d2e" stroke="#334155" strokeWidth="1" />
    </svg>
  );
}
