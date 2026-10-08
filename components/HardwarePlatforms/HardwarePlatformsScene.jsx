import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { PLATFORM_STAGES, PLATFORM_BREADCRUMBS } from './platformData';
import {
  StageComputationStart,
  StageThreePaths,
  StageFPGAPipeline,
  StageFPGATarget,
  StageRenesasPipeline,
  StageRenesasTarget,
  StageESP32Pipeline,
  StageESP32Target,
  StageComparePaths,
  StageSameTask,
  StageTradeoffs,
  StagePhysicalReveal
} from './PlatformViews';
import './HardwarePlatformsScene.css';

export function HardwarePlatformsScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = PLATFORM_STAGES[stageIndex] || PLATFORM_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.platform-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: PLATFORM_STAGES.length });

  return (
    <section ref={containerRef} className="scene platform-scene-container">
      <div className="platform-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="platform-top-header">
        <div className="platform-editorial-title-box">
          <div className="platform-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="platform-main-title">
            FROM RTL <span>TO REAL HARDWARE</span>
          </h2>
          <div className="platform-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="platform-header-accent">
          <span className="platform-accent-logo">{currentStage.tag}</span>
          <div className="platform-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="platform-main-viewport">
        {stageIndex === 0 && <StageComputationStart />}
        {stageIndex === 1 && <StageThreePaths />}
        {stageIndex === 2 && <StageFPGAPipeline />}
        {stageIndex === 3 && <StageFPGATarget />}
        {stageIndex === 4 && <StageRenesasPipeline />}
        {stageIndex === 5 && <StageRenesasTarget />}
        {stageIndex === 6 && <StageESP32Pipeline />}
        {stageIndex === 7 && <StageESP32Target />}
        {stageIndex === 8 && <StageComparePaths />}
        {stageIndex === 9 && <StageSameTask />}
        {stageIndex === 10 && <StageTradeoffs />}
        {stageIndex === 11 && <StagePhysicalReveal />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="platform-bottom-bar">
        <StageNavigator
          stages={PLATFORM_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="HARDWARE PATH"
          ariaLabel="Platforms Progression"
        />
      </footer>
    </section>
  );
}
