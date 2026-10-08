import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { LOGIC_STAGES, LOGIC_BREADCRUMBS } from './logicData';
import {
  StageLogicToolkit,
  StageXORAndCombination,
  StageHalfAdder,
  StageFullAdder,
  StageChainedAdders,
  StageFourBitAdder,
  StageScaleArithmetic,
  StageALU,
  StageFromALUToComputer,
  StageComputationHierarchy,
  StageHardwareHandoff
} from './LogicViews';
import './LogicComputationScene.css';

export function LogicComputationScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = LOGIC_STAGES[stageIndex] || LOGIC_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.logic-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: LOGIC_STAGES.length });

  return (
    <section ref={containerRef} className="scene logic-scene-container">
      <div className="logic-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="logic-top-header">
        <div className="logic-editorial-title-box">
          <div className="logic-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="logic-main-title">
            FROM LOGIC GATES <span>TO COMPUTATION</span>
          </h2>
          <div className="logic-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="logic-header-accent">
          <span className="logic-accent-logo">{currentStage.tag}</span>
          <div className="logic-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="logic-main-viewport">
        {stageIndex === 0 && <StageLogicToolkit />}
        {stageIndex === 1 && <StageXORAndCombination />}
        {stageIndex === 2 && <StageHalfAdder />}
        {stageIndex === 3 && <StageFullAdder />}
        {stageIndex === 4 && <StageChainedAdders />}
        {stageIndex === 5 && <StageFourBitAdder />}
        {stageIndex === 6 && <StageScaleArithmetic />}
        {stageIndex === 7 && <StageALU />}
        {stageIndex === 8 && <StageFromALUToComputer />}
        {stageIndex === 9 && <StageComputationHierarchy />}
        {stageIndex === 10 && <StageHardwareHandoff />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="logic-bottom-bar">
        <StageNavigator
          stages={LOGIC_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="LOGIC → COMPUTE"
          ariaLabel="Logic to Computation Progression"
        />
      </footer>
    </section>
  );
}
