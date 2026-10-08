import React from 'react';
import { CPUVisual } from './CPUVisual';
import { GPUVisual } from './GPUVisual';
import { NPUVisual } from './NPUVisual';
import { TPUVisual } from './TPUVisual';
import { FPGAVisual } from './FPGAVisual';

export function ComputeObject({ activeArch, stage }) {
  return (
    <div className={`compute-physical-package arch-${activeArch || 'default'}`}>
      {/* Outer Ceramic / PCB Substrate */}
      <div className="package-substrate">
        {/* Corner alignment marks and fiducials */}
        <div className="fiducial-mark top-left" />
        <div className="fiducial-mark top-right" />
        <div className="fiducial-mark bottom-left" />
        <div className="fiducial-mark bottom-right" />
        
        {/* Heat Spreader / Die Rim */}
        <div className="heat-spreader-rim">
          <div className="package-engraving">
            <div className="engraving-brand">SILICON INTELLIGENCE ENGINE • ARCH 2026</div>
            <div className="engraving-model">
              {activeArch ? activeArch.toUpperCase() : 'COMPUTE ACCELERATOR'}
            </div>
          </div>

          {/* Silicon Die Cavity */}
          <div className="silicon-die-cavity">
            {stage === 'compute' && (
              <div className="generic-compute-die">
                <div className="core-chip-icon">▦</div>
                <div className="chip-laser-label">CENTRAL COMPUTE ENGINE</div>
                <div className="chip-laser-sub">THE HEART OF INTELLIGENCE</div>
                <div className="die-active-glow-ring" />
              </div>
            )}

            {activeArch === 'cpu' && <CPUVisual />}
            {activeArch === 'gpu' && <GPUVisual />}
            {activeArch === 'npu' && <NPUVisual />}
            {activeArch === 'tpu' && <TPUVisual />}
            {activeArch === 'fpga' && <FPGAVisual />}
          </div>
        </div>

        {/* Gold Bond Finger Traces */}
        <div className="substrate-bus-fingers top" />
        <div className="substrate-bus-fingers bottom" />
      </div>
    </div>
  );
}
