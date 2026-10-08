import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { FPGA_SETUP_STAGES, FPGA_SETUP_BREADCRUMBS } from './fpgaSetupData';
import {
  StageTheBoard,
  StageWhatIsOnBoard,
  StageOneUSBCable,
  StageOnboardFT232H,
  StageWhatUSBDoes,
  StagePowerAndData,
  StageSendBitstream,
  StageFPGAConfigured,
  StageFirstTestBlink,
  StageThenAI,
  StageCompleteSetup,
  StageHardwareReady,
  StageHandsOnSteps
} from './FPGASetupViews';
import './FPGASetupScene.css';

export function FPGASetupScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = FPGA_SETUP_STAGES[stageIndex] || FPGA_SETUP_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.fs-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: FPGA_SETUP_STAGES.length });

  return (
    <section ref={containerRef} className="scene fpga-setup-scene-container">
      <div className="fs-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="fs-top-header">
        <div className="fs-editorial-title-box">
          <div className="fs-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="fs-main-title">
            FPGA HARDWARE <span>SETUP</span>
          </h2>
          <div className="fs-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="fs-header-accent">
          <span className="fs-accent-logo">{currentStage.tag}</span>
          <div className="fs-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="fs-main-viewport">
        {stageIndex === 0 && <StageTheBoard />}
        {stageIndex === 1 && <StageWhatIsOnBoard />}
        {stageIndex === 2 && <StageOneUSBCable />}
        {stageIndex === 3 && <StageOnboardFT232H />}
        {stageIndex === 4 && <StageWhatUSBDoes />}
        {stageIndex === 5 && <StagePowerAndData />}
        {stageIndex === 6 && <StageSendBitstream />}
        {stageIndex === 7 && <StageFPGAConfigured />}
        {stageIndex === 8 && <StageFirstTestBlink />}
        {stageIndex === 9 && <StageThenAI />}
        {stageIndex === 10 && <StageCompleteSetup />}
        {stageIndex === 11 && <StageHardwareReady />}
        {stageIndex === 12 && <StageHandsOnSteps />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="fs-bottom-bar">
        <StageNavigator
          stages={FPGA_SETUP_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="HARDWARE SETUP"
          ariaLabel="FPGA Setup Progression"
        />
      </footer>
    </section>
  );
}
