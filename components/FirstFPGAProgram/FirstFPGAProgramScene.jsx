import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { FIRST_FPGA_STAGES, FIRST_FPGA_BREADCRUMBS } from './firstFPGAData';
import {
  StageWhyBlink,
  StageRTLConcept,
  StageVerilog,
  StageClock,
  StageSynthesis,
  StagePlaceRoute,
  StageBitstream,
  StageProgram,
  StageConfigured,
  StageLED,
  StageWhatProved,
  StageNowReplace,
  StageAITarget,
  StageHandoff
} from './FirstFPGAProgramViews';
import './FirstFPGAProgramScene.css';

export function FirstFPGAProgramScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = FIRST_FPGA_STAGES[stageIndex] || FIRST_FPGA_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.ff-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: FIRST_FPGA_STAGES.length });

  return (
    <section ref={containerRef} className="scene first-fpga-scene-container">
      <div className="ff-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="ff-top-header">
        <div className="ff-editorial-title-box">
          <div className="ff-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="ff-main-title">
            FIRST FPGA PROGRAM: <span>MAKE IT DO SOMETHING</span>
          </h2>
          <div className="ff-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="ff-header-accent">
          <span className="ff-accent-logo">{currentStage.tag}</span>
          <div className="ff-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="ff-main-viewport">
        {stageIndex === 0 && <StageWhyBlink />}
        {stageIndex === 1 && <StageRTLConcept />}
        {stageIndex === 2 && <StageVerilog />}
        {stageIndex === 3 && <StageClock />}
        {stageIndex === 4 && <StageSynthesis />}
        {stageIndex === 5 && <StagePlaceRoute />}
        {stageIndex === 6 && <StageBitstream />}
        {stageIndex === 7 && <StageProgram />}
        {stageIndex === 8 && <StageConfigured />}
        {stageIndex === 9 && <StageLED />}
        {stageIndex === 10 && <StageWhatProved />}
        {stageIndex === 11 && <StageNowReplace />}
        {stageIndex === 12 && <StageAITarget />}
        {stageIndex === 13 && <StageHandoff />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="ff-bottom-bar">
        <StageNavigator
          stages={FIRST_FPGA_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="FIRST PROGRAM"
          ariaLabel="First FPGA Program Progression"
        />
      </footer>
    </section>
  );
}
