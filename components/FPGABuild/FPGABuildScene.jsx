import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { FPGA_BUILD_STAGES, FPGA_BUILD_BREADCRUMBS } from './fpgaBuildData';
import {
  StageFPGAModel,
  StageWhyNotDirect,
  StageQuantization,
  StageRepresentMath,
  StageOneMAC,
  StageParallelMAC,
  StageRTLView,
  StageSynthesisView,
  StagePlaceRouteView,
  StageBitstreamView,
  StageProgramFPGA,
  StageVSDSquadronBoard,
  StageCompleteFPGAPipeline,
  StageWhatReallyHappened,
  StageHandsOnHandoff
} from './FPGABuildViews';
import './FPGABuildScene.css';

export function FPGABuildScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = FPGA_BUILD_STAGES[stageIndex] || FPGA_BUILD_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.fb-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: FPGA_BUILD_STAGES.length });

  return (
    <section ref={containerRef} className="scene fpga-build-scene-container">
      <div className="fb-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="fb-top-header">
        <div className="fb-editorial-title-box">
          <div className="fb-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="fb-main-title">
            BUILD THE <span>FPGA VERSION</span>
          </h2>
          <div className="fb-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="fb-header-accent">
          <span className="fb-accent-logo">{currentStage.tag}</span>
          <div className="fb-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="fb-main-viewport">
        {stageIndex === 0 && <StageFPGAModel />}
        {stageIndex === 1 && <StageWhyNotDirect />}
        {stageIndex === 2 && <StageQuantization />}
        {stageIndex === 3 && <StageRepresentMath />}
        {stageIndex === 4 && <StageOneMAC />}
        {stageIndex === 5 && <StageParallelMAC />}
        {stageIndex === 6 && <StageRTLView />}
        {stageIndex === 7 && <StageSynthesisView />}
        {stageIndex === 8 && <StagePlaceRouteView />}
        {stageIndex === 9 && <StageBitstreamView />}
        {stageIndex === 10 && <StageProgramFPGA />}
        {stageIndex === 11 && <StageVSDSquadronBoard />}
        {stageIndex === 12 && <StageCompleteFPGAPipeline />}
        {stageIndex === 13 && <StageWhatReallyHappened />}
        {stageIndex === 14 && <StageHandsOnHandoff />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="fb-bottom-bar">
        <StageNavigator
          stages={FPGA_BUILD_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="FPGA BUILD"
          ariaLabel="FPGA Build Progression"
        />
      </footer>
    </section>
  );
}
