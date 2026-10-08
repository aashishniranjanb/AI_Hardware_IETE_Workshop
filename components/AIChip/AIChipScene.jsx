import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { AICHIP_STAGES, BREADCRUMB_STEPS } from './aiChipData';
import { GPUOverview } from './GPUOverview';
import { ComputeTilesView } from './ComputeTilesView';
import { MACUnitView } from './MACUnitView';
import { MatrixEngineView } from './MatrixEngineView';
import { DigitalLogicView } from './DigitalLogicView';
import { HierarchyChainView } from './HierarchyChainView';
import './AIChipScene.css';

export function AIChipScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = AICHIP_STAGES[stageIndex] || AICHIP_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.ac-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: AICHIP_STAGES.length });

  return (
    <section ref={containerRef} className="scene aichip-case-scene">
      <div className="ac-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="ac-top-header">
        <div className="ac-editorial-title-box">
          <div className="ac-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="ac-main-title">
            WHAT IS ACTUALLY <span>INSIDE AN AI CHIP?</span>
          </h2>
          <div className="ac-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="ac-header-accent">
          <span className="ac-accent-logo">{currentStage.tag}</span>
          <div className="ac-teaching-point-pill">
            {currentStage.equation || currentStage.teachingPoint}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="ac-main-viewport">
        {stageIndex === 0 && <GPUOverview />}
        {(stageIndex === 1 || stageIndex === 2) && (
          <ComputeTilesView isCoreZoom={stageIndex === 2} />
        )}
        {(stageIndex === 3 || stageIndex === 4) && (
          <MACUnitView isParallelArray={stageIndex === 4} />
        )}
        {(stageIndex === 5 || stageIndex === 6) && (
          <MatrixEngineView isTensorEngine={stageIndex === 6} />
        )}
        {(stageIndex === 7 || stageIndex === 8) && (
          <DigitalLogicView isLogicGateLevel={stageIndex === 8} />
        )}
        {stageIndex === 9 && <HierarchyChainView />}
      </main>

      {/* Bottom Progression Bar & Takeaway */}
      <footer className="ac-bottom-progression-bar">
        <StageNavigator
          stages={BREADCRUMB_STEPS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="INSIDE THE CHIP"
          ariaLabel="AI Chip Progression"
        />
      </footer>
    </section>
  );
}
