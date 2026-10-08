import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { BLACKWELL_STAGES, PROGRESSION_STEPS } from './blackwellData';
import { SingleGPUView } from './SingleGPUView';
import { MultiGPUView } from './MultiGPUView';
import { Scale72View } from './Scale72View';
import { NVL72RackView } from './NVL72RackView';
import { SupercomputerView } from './SupercomputerView';
import { ZoomDownView } from './ZoomDownView';
import './BlackwellScene.css';

export function BlackwellScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = BLACKWELL_STAGES[stageIndex] || BLACKWELL_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.bw-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: BLACKWELL_STAGES.length });

  return (
    <section ref={containerRef} className="scene blackwell-case-scene">
      <div className="bw-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="bw-top-header">
        <div className="bw-editorial-title-box">
          <div className="bw-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="bw-main-title">
            WHAT HAPPENS WHEN <span>WE SCALE THIS?</span>
          </h2>
          <div className="bw-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="bw-header-accent">
          <span className="bw-accent-logo">BLACKWELL</span>
          <div className="bw-stats-mini-strip">
            {currentStage.stats.map((s, idx) => (
              <div key={idx} className="mini-stat-pill">
                <span className="s-lbl">{s.label}:</span>
                <span className="s-val">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="bw-main-viewport">
        {/* STAGE 0: ONE GPU (Base chip) */}
        {currentStage.id === 0 && <SingleGPUView showMemory={false} />}

        {/* STAGE 1: GPU PLUS MEMORY (8 HBM3e stacks illuminated) */}
        {currentStage.id === 1 && <SingleGPUView showMemory={true} />}

        {/* STAGE 2: MULTIPLE GPUS (4 GPUs arranged 2x2) */}
        {currentStage.id === 2 && <MultiGPUView showNVLink={false} />}

        {/* STAGE 3: NVLINK (4 GPUs with synchronized NVLink links) */}
        {currentStage.id === 3 && <MultiGPUView showNVLink={true} />}

        {/* STAGE 4: SCALE TO 72 (72-GPU structured matrix) */}
        {currentStage.id === 4 && <Scale72View />}

        {/* STAGE 5: NVL72 RACK (Rack enclosure, compute trays, switch trays, liquid cooling) */}
        {currentStage.id === 5 && <NVL72RackView />}

        {/* STAGE 6: AI SUPERCOMPUTER (Cluster scale datacenter silhouette) */}
        {currentStage.id === 6 && <SupercomputerView />}

        {/* STAGE 7: ZOOM DOWN INTO GPU INTERNALS */}
        {currentStage.id === 7 && <ZoomDownView />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="bw-bottom-progression-bar">
        <StageNavigator
          stages={PROGRESSION_STEPS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="SCALE-UP"
          ariaLabel="Blackwell Progression"
        />
      </footer>
    </section>
  );
}
