import React, { useEffect, useState } from 'react';

/**
 * Animated data flow pathways connecting Chitti's subsystems.
 * Visualizes how perception flows to compute, weights arrive from memory,
 * and decisions turn into motor actuation.
 */

export function ChittiDataFlow() {
  const [activePacketIndex, setActivePacketIndex] = useState(0);

  const telemetryPackets = [
    { source: 'CAMERA 4K', dest: 'AI COMPUTE', data: 'RAW_FRAME: 3840x2160 [14.2 GB/s]', latency: '2.1ms' },
    { source: 'MEMORY HBM3e', dest: 'AI COMPUTE', data: 'WEIGHTS_FETCH: 7B-PARAM [3.2 TB/s]', latency: '0.4ms' },
    { source: 'AI COMPUTE', dest: 'ACTUATORS', data: 'KINEMATICS: SetTorque(Arm_R, 42Nm)', latency: '1.2ms' },
    { source: 'IMU / SENSORS', dest: 'COMMUNICATION', data: 'TELEMETRY: Balance_Matrix(pitch=-0.2°)', latency: '0.8ms' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePacketIndex((prev) => (prev + 1) % telemetryPackets.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const curPacket = telemetryPackets[activePacketIndex];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 38 }}>
      {/* Live Data Packet Telemetry Header Banner */}
      <div className="data-packet-banner">
        <span style={{ color: '#22d3ee' }}>● ACTIVE BUS:</span>
        <span><b>{curPacket.source}</b> ➔ <b>{curPacket.dest}</b></span>
        <span style={{ color: '#64748b' }}>|</span>
        <span>{curPacket.data}</span>
        <span style={{ color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
          {curPacket.latency}
        </span>
      </div>

      {/* SVG Animated Circuit Energy Paths */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="flowCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path 1: Camera Vision -> AI Compute Core */}
        <path
          id="pathVisionToCompute"
          d="M 50 12 L 50 25 L 50 34"
          className="data-flow-path"
          stroke="#38bdf8"
        />

        {/* Path 2: Memory HBM Left/Right <-> AI Compute */}
        <path
          id="pathMemLeftToCompute"
          d="M 42 35 L 50 35"
          className="data-flow-path"
          stroke="#60a5fa"
        />
        <path
          id="pathMemRightToCompute"
          d="M 58 35 L 50 35"
          className="data-flow-path"
          stroke="#60a5fa"
        />

        {/* Path 3: AI Compute Core -> Arm Actuators */}
        <path
          id="pathComputeToArmLeft"
          d="M 50 35 L 36 38 L 32 45"
          className="data-flow-path"
          stroke="#22d3ee"
        />
        <path
          id="pathComputeToArmRight"
          d="M 50 35 L 64 38 L 68 45"
          className="data-flow-path"
          stroke="#22d3ee"
        />

        {/* Path 4: Battery Power -> Compute & Motors */}
        <path
          id="pathPowerToCompute"
          d="M 50 50 L 50 38"
          className="data-flow-path"
          stroke="#0284c7"
        />

        {/* Path 5: Sensors IMU -> Compute & Communication */}
        <path
          id="pathSensorsToComms"
          d="M 50 64 L 50 40 L 48 24"
          className="data-flow-path"
          stroke="#38bdf8"
        />

        {/* Travelling Energy Particles */}
        <circle r="1.8" fill="#fff" filter="url(#glow)">
          <animateMotion
            dur="1.4s"
            repeatCount="indefinite"
            path="M 50 12 L 50 34"
          />
        </circle>

        <circle r="1.6" fill="#38bdf8" filter="url(#glow)">
          <animateMotion
            dur="1.2s"
            repeatCount="indefinite"
            path="M 42 35 L 50 35"
          />
        </circle>

        <circle r="1.6" fill="#38bdf8" filter="url(#glow)">
          <animateMotion
            dur="1.2s"
            repeatCount="indefinite"
            path="M 58 35 L 50 35"
          />
        </circle>

        <circle r="1.8" fill="#22d3ee" filter="url(#glow)">
          <animateMotion
            dur="1.6s"
            repeatCount="indefinite"
            path="M 50 35 L 36 38 L 32 45"
          />
        </circle>

        <circle r="1.8" fill="#22d3ee" filter="url(#glow)">
          <animateMotion
            dur="1.6s"
            repeatCount="indefinite"
            path="M 50 35 L 64 38 L 68 45"
          />
        </circle>
      </svg>
    </div>
  );
}
