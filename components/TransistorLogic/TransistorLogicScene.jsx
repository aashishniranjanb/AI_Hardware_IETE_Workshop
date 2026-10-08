import React, { useEffect, useRef, useState } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { TRANSISTOR_STAGES, TRANSISTOR_BREADCRUMBS } from './transistorData';
import {
  Stage0ExistingAndGate,
  Stage1MoreLogic,
  Stage2ProgrammableConnections,
  Stage3PLD,
  Stage4PLAvsPAL,
  Stage5CPLD,
  Stage6FPGAFabric,
  Stage7SwitchMatrix,
  Stage8RTLtoBitstream,
  Stage9ConfiguredHardware
} from './TransistorViews';
import './TransistorLogicScene.css';

export function TransistorLogicScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);

  // Preserve existing interactive inputs for Stage 0 AND gate
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const currentStage = TRANSISTOR_STAGES[stageIndex] || TRANSISTOR_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.t-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: TRANSISTOR_STAGES.length });

  return (
    <section ref={containerRef} className="scene transistor-scene-container">
      <div className="t-ambient-grid" />

      {/* Top Editorial Header */}
      <header className="t-top-header">
        <div className="t-editorial-title-box">
          <div className="t-eyebrow-line">
            <span>● {currentStage.eyebrow}</span>
          </div>
          <h2 className="t-main-title">
            {currentStage.title}
          </h2>
          <div className="t-stage-caption">{currentStage.caption}</div>
        </div>

        <div className="t-header-accent">
          <span className="t-accent-logo">{currentStage.tag}</span>
          <div className="t-teaching-point-pill">
            {currentStage.takeaway}
          </div>
        </div>
      </header>

      {/* Main Central Viewport */}
      <main className="t-main-viewport">
        {stageIndex === 0 && (
          <Stage0ExistingAndGate a={a} setA={setA} b={b} setB={setB} />
        )}
        {stageIndex === 1 && <Stage1MoreLogic a={a} b={b} />}
        {stageIndex === 2 && <Stage2ProgrammableConnections />}
        {stageIndex === 3 && <Stage3PLD />}
        {stageIndex === 4 && <Stage4PLAvsPAL />}
        {stageIndex === 5 && <Stage5CPLD />}
        {stageIndex === 6 && <Stage6FPGAFabric />}
        {stageIndex === 7 && <Stage7SwitchMatrix />}
        {stageIndex === 8 && <Stage8RTLtoBitstream />}
        {stageIndex === 9 && <Stage9ConfiguredHardware />}
      </main>

      {/* Bottom Progression Bar */}
      <footer className="t-bottom-bar">
        <StageNavigator
          stages={TRANSISTOR_BREADCRUMBS}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          title="TRANSISTOR → FPGA"
          ariaLabel="Transistor to FPGA Progression"
        />
      </footer>
    </section>
  );
}
