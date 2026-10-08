import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { AI_ACCELERATOR_STAGES, AI_ACCELERATOR_BREADCRUMBS } from './aiAcceleratorData';
import {
  StageReplaceBlinker,
  StageAIMath,
  StageOneMAC,
  StageRepeat,
  StageParallelism,
  StageDotProduct,
  StageLayer,
  StageFirstLayer,
  StageReLU,
  StageSecondLayer,
  StageOutputLayer,
  StageAcceleratorDatapath,
  StageControl,
  StageMemory,
  StageCompleteAccelerator,
  StageRTLMapping,
  StageFPGA,
  StageDigit,
  StageHandsOnHandoff
} from './AIAcceleratorViews';
import './AIAcceleratorScene.css';

export function AIAcceleratorScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = AI_ACCELERATOR_STAGES[stageIndex] || AI_ACCELERATOR_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.aa-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: AI_ACCELERATOR_STAGES.length });

  return (
    <section ref={containerRef} className="scene ai-accelerator-scene-container">
      <div className="aa-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="aa-top-header">
        <div className="aa-editorial-title-box">
          <div className="aa-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="aa-main-title">
            BUILD THE <span>AI ACCELERATOR</span>
          </h2>
          <div className="aa-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="aa-header-accent">
          <span className="aa-accent-logo">{currentStage.tag}</span>
          <div className="aa-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="aa-main-viewport">
        {stageIndex === 0 && <StageReplaceBlinker />}
        {stageIndex === 1 && <StageAIMath />}
        {stageIndex === 2 && <StageOneMAC />}
        {stageIndex === 3 && <StageRepeat />}
        {stageIndex === 4 && <StageParallelism />}
        {stageIndex === 5 && <StageDotProduct />}
        {stageIndex === 6 && <StageLayer />}
        {stageIndex === 7 && <StageFirstLayer />}
        {stageIndex === 8 && <StageReLU />}
        {stageIndex === 9 && <StageSecondLayer />}
        {stageIndex === 10 && <StageOutputLayer />}
        {stageIndex === 11 && <StageAcceleratorDatapath />}
        {stageIndex === 12 && <StageControl />}
        {stageIndex === 13 && <StageMemory />}
        {stageIndex === 14 && <StageCompleteAccelerator />}
        {stageIndex === 15 && <StageRTLMapping />}
        {stageIndex === 16 && <StageFPGA />}
        {stageIndex === 17 && <StageDigit />}
        {stageIndex === 18 && <StageHandsOnHandoff />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="aa-bottom-bar">
        <StageNavigator
          stages={AI_ACCELERATOR_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="ACCELERATOR BUILD"
          ariaLabel="AI Accelerator Progression"
        />
      </footer>
    </section>
  );
}
