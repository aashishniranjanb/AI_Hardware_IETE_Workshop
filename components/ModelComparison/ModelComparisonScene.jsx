import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { MODEL_COMP_STAGES, MODEL_COMP_BREADCRUMBS } from './modelCompData';
import {
  StageOneTask,
  StageCommonPipeline,
  StageModelArchitecture,
  StageHardwareFork,
  StageFPGAImpl,
  StageRenesasImpl,
  StageESP32Impl,
  StageThreeWays,
  StageWhatChanges,
  StageHardwareIsChoice,
  StageSameInput,
  StageSameResult,
  StageWorkshopHandoff
} from './ModelComparisonViews';
import './ModelComparisonScene.css';

export function ModelComparisonScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = MODEL_COMP_STAGES[stageIndex] || MODEL_COMP_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.comp-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: MODEL_COMP_STAGES.length });

  return (
    <section ref={containerRef} className="scene comp-scene-container">
      <div className="comp-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="comp-top-header">
        <div className="comp-editorial-title-box">
          <div className="comp-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="comp-main-title">
            ONE AI MODEL. <span>THREE HARDWARE PLATFORMS</span>
          </h2>
          <div className="comp-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="comp-header-accent">
          <span className="comp-accent-logo">{currentStage.tag}</span>
          <div className="comp-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="comp-main-viewport">
        {stageIndex === 0 && <StageOneTask />}
        {stageIndex === 1 && <StageCommonPipeline />}
        {stageIndex === 2 && <StageModelArchitecture />}
        {stageIndex === 3 && <StageHardwareFork />}
        {stageIndex === 4 && <StageFPGAImpl />}
        {stageIndex === 5 && <StageRenesasImpl />}
        {stageIndex === 6 && <StageESP32Impl />}
        {stageIndex === 7 && <StageThreeWays />}
        {stageIndex === 8 && <StageWhatChanges />}
        {stageIndex === 9 && <StageHardwareIsChoice />}
        {stageIndex === 10 && <StageSameInput />}
        {stageIndex === 11 && <StageSameResult />}
        {stageIndex === 12 && <StageWorkshopHandoff />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="comp-bottom-bar">
        <StageNavigator
          stages={MODEL_COMP_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="EXPERIMENT"
          ariaLabel="Model Comparison Progression"
        />
      </footer>
    </section>
  );
}
