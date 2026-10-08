import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  HeadAssembly,
  VisionOpticsModule,
  ChestPectoralPlate,
  AIComputeCoreModule,
  MemoryStackModule,
  BatteryPowerModule,
  ThermalCoolingModule,
  RoboticArmModule,
  PelvisAndLegsModule
} from './ChittiParts';
import { ChittiCallouts } from './ChittiCallouts';
import { ChittiDataFlow } from './ChittiDataFlow';

export function ChittiExplodedView({
  sceneMode,
  selectedSubsystem,
  onSelectSubsystem,
  onScanComplete
}) {
  const containerRef = useRef(null);
  const scanLineRef = useRef(null);

  const isExploded = sceneMode === 'exploded' || sceneMode === 'data-flow';
  const isScanning = sceneMode === 'scan';
  const isDataFlow = sceneMode === 'data-flow';

  // GSAP Scanning beam animation
  useEffect(() => {
    if (!scanLineRef.current) return;

    if (isScanning) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onScanComplete) onScanComplete();
        }
      });

      tl.set(scanLineRef.current, { top: '0%', opacity: 1 })
        .to(scanLineRef.current, {
          top: '95%',
          duration: 2.2,
          ease: 'power1.inOut'
        })
        .to(scanLineRef.current, {
          opacity: 0,
          duration: 0.3
        });

      return () => tl.kill();
    } else {
      gsap.set(scanLineRef.current, { opacity: 0, top: '0%' });
    }
  }, [isScanning, onScanComplete]);

  // Subtle idle breathing animation when in HERO mode
  useEffect(() => {
    if (sceneMode === 'hero') {
      const tween = gsap.to('.robot-root', {
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      return () => tween.kill();
    } else {
      gsap.to('.robot-root', { y: 0, duration: 0.6, ease: 'power2.out' });
    }
  }, [sceneMode]);

  return (
    <div
      ref={containerRef}
      className={`chitti-stage ${isExploded ? 'is-exploded' : ''} ${selectedSubsystem ? 'is-subsystem-isolated' : ''}`}
    >
      {/* 3D Viewport container */}
      <div className="chitti-viewport-3d">
        {/* Scanning Laser Beam */}
        <div ref={scanLineRef} className="scan-laser-line">
          <div className="scan-laser-glow" />
        </div>

        {/* Modular Robot Assembly */}
        <div className="robot-root">
          {/* 1. Head Module */}
          <div className={`part-layer layer-head ${selectedSubsystem === 'vision' || selectedSubsystem === 'audio' ? 'is-active-subsystem' : ''}`}>
            <HeadAssembly isScanning={isScanning} />
          </div>

          {/* 2. Isolated Vision Optics Module (explodes forward) */}
          <div className={`part-layer layer-vision ${selectedSubsystem === 'vision' ? 'is-active-subsystem' : ''}`}>
            <VisionOpticsModule />
          </div>

          {/* 3. Audio Mic Module */}
          <div className={`part-layer layer-audio ${selectedSubsystem === 'audio' ? 'is-active-subsystem' : ''}`}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid #38bdf8',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              fontFamily: 'monospace',
              color: '#38bdf8'
            }}>
              8-CH MEMS MIC ARRAY
            </div>
          </div>

          {/* 4. Left Chest Armor Plate */}
          <div className="part-layer layer-chest-shell-l">
            <ChestPectoralPlate side="left" />
          </div>

          {/* 5. Right Chest Armor Plate */}
          <div className="part-layer layer-chest-shell-r">
            <ChestPectoralPlate side="right" />
          </div>

          {/* 6. AI Compute Core Module (Brain in the Chest) */}
          <div className={`part-layer layer-compute-core ${selectedSubsystem === 'compute' ? 'is-active-subsystem' : ''}`}>
            <AIComputeCoreModule isScanning={isScanning} isExploded={isExploded} />
          </div>

          {/* 7. Memory Modules (Left & Right HBM stacks) */}
          <div className={`part-layer layer-memory-l ${selectedSubsystem === 'memory' ? 'is-active-subsystem' : ''}`}>
            <MemoryStackModule side="left" />
          </div>
          <div className={`part-layer layer-memory-r ${selectedSubsystem === 'memory' ? 'is-active-subsystem' : ''}`}>
            <MemoryStackModule side="right" />
          </div>

          {/* 8. Thermal Cooling Vapor Chamber (behind compute) */}
          <div className={`part-layer layer-thermal ${selectedSubsystem === 'thermal' ? 'is-active-subsystem' : ''}`}>
            <ThermalCoolingModule />
          </div>

          {/* 9. Solid-State Battery & PMIC Module */}
          <div className={`part-layer layer-battery ${selectedSubsystem === 'power' ? 'is-active-subsystem' : ''}`}>
            <BatteryPowerModule />
          </div>

          {/* 10. Communication Antenna & 5G Transceiver */}
          <div className={`part-layer layer-communication ${selectedSubsystem === 'communication' ? 'is-active-subsystem' : ''}`}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'rgba(2, 132, 199, 0.25)',
              border: '1px solid #38bdf8',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '1px'
            }}>
              5G // RF TRANSCEIVER
            </div>
          </div>

          {/* 11. Left Arm Assembly */}
          <div className={`part-layer layer-arm-l ${selectedSubsystem === 'actuation' ? 'is-active-subsystem' : ''}`}>
            <RoboticArmModule side="left" />
          </div>

          {/* 12. Right Arm Assembly */}
          <div className={`part-layer layer-arm-r ${selectedSubsystem === 'actuation' ? 'is-active-subsystem' : ''}`}>
            <RoboticArmModule side="right" />
          </div>

          {/* 13. Pelvis & Leg Assemblies */}
          <div className={`part-layer layer-pelvis ${selectedSubsystem === 'sensors' ? 'is-active-subsystem' : ''}`}>
            <PelvisAndLegsModule />
          </div>
        </div>

        {/* Exploded Engineering Callout Cards */}
        {isExploded && (
          <ChittiCallouts
            selectedSubsystem={selectedSubsystem}
            onSelectSubsystem={onSelectSubsystem}
          />
        )}

        {/* Animated Data Flow Energy Lines */}
        {isDataFlow && <ChittiDataFlow />}
      </div>
    </div>
  );
}
