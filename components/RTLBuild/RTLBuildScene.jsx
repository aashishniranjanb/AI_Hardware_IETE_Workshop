import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { RTL_BUILD_STAGES, RTL_BUILD_BREADCRUMBS } from './rtlBuildData';
import {
  StageTheArchitecture,
  StageDecompose,
  StageRTLMeaning,
  StageMACRTL,
  StageReLURTL,
  StageControlRTL,
  StageCompleteRTL,
  StageRTLToYosys,
  StageNextpnr,
  StageBitstream,
  StageProgram,
  StageFullFlow,
  StageKeyDistinction,
  StageFinalMentalModel,
  StageLiveHandoff
} from './RTLBuildViews';
import './RTLBuildScene.css';

export function RTLBuildScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = RTL_BUILD_STAGES[stageIndex] || RTL_BUILD_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.rb-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: RTL_BUILD_STAGES.length });

  return (
    <section ref={containerRef} className="scene rtl-build-scene-container">
      <div className="rb-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="rb-top-header">
        <div className="rb-editorial-title-box">
          <div className="rb-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="rb-main-title">
            WRITE THE <span>RTL</span>
          </h2>
          <div className="rb-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="rb-header-accent">
          <span className="rb-accent-logo">{currentStage.tag}</span>
          <div className="rb-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="rb-main-viewport">
        {stageIndex === 0 && <StageTheArchitecture />}
        {stageIndex === 1 && <StageDecompose />}
        {stageIndex === 2 && <StageRTLMeaning />}
        {stageIndex === 3 && <StageMACRTL />}
        {stageIndex === 4 && <StageReLURTL />}
        {stageIndex === 5 && <StageControlRTL />}
        {stageIndex === 6 && <StageCompleteRTL />}
        {stageIndex === 7 && <StageRTLToYosys />}
        {stageIndex === 8 && <StageNextpnr />}
        {stageIndex === 9 && <StageBitstream />}
        {stageIndex === 10 && <StageProgram />}
        {stageIndex === 11 && <StageFullFlow />}
        {stageIndex === 12 && <StageKeyDistinction />}
        {stageIndex === 13 && <StageFinalMentalModel />}
        {stageIndex === 14 && <StageLiveHandoff />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="rb-bottom-bar">
        <StageNavigator
          stages={RTL_BUILD_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="RTL BUILD"
          ariaLabel="RTL Build Progression"
        />
      </footer>
    </section>
  );
}
