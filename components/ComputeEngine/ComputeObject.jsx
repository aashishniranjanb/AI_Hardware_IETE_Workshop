import React from 'react';
import { GlyphIcon } from '../deck/GlyphIcon';
import { Brain, CircuitBoard, Cpu, Grid3x3, LayoutGrid } from 'lucide-react';

// The five engines this slide walks through (Stage 01 → 06), previewed on arrival.
const ENGINE_PREVIEW = [
  { id: 'cpu', Icon: Cpu, name: 'CPU', trait: 'Few fast cores' },
  { id: 'gpu', Icon: LayoutGrid, name: 'GPU', trait: 'Thousands of cores' },
  { id: 'npu', Icon: Brain, name: 'NPU', trait: 'Neural math engine' },
  { id: 'tpu', Icon: Grid3x3, name: 'TPU', trait: 'Systolic arrays' },
  { id: 'fpga', Icon: CircuitBoard, name: 'FPGA', trait: 'Reconfigurable logic' },
];
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
                <div className="core-chip-icon"><GlyphIcon glyph="cpu" size={22} /></div>
                <div className="chip-laser-label">CENTRAL COMPUTE ENGINE</div>
                <div className="chip-laser-sub">THE HEART OF INTELLIGENCE</div>
                <div className="engine-preview" aria-label="Compute engines covered next">
                  {ENGINE_PREVIEW.map(({ id, Icon, name, trait }) => (
                    <div key={id} className={`engine-tile engine-${id}`}>
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                      <span className="engine-name">{name}</span>
                      <span className="engine-trait">{trait}</span>
                    </div>
                  ))}
                </div>
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
