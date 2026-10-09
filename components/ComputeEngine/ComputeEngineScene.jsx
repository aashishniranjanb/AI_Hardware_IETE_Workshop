import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import gsap from 'gsap';
import { ARCHITECTURES, SCENARIOS, STAGES } from './ComputeData';
import { ComputeObject } from './ComputeObject';
import './ComputeEngine.css';
import { useStageNavigation, useDeckEntry } from '../deck/DeckNavigation';
import { prefersReducedMotion } from '../deck/motion';
import { flipFrom, takeHandoff } from '../deck/handoff';

export function ComputeEngineScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [selectedArchId, setSelectedArchId] = useState('cpu');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const currentStage = STAGES[stageIndex] || STAGES[0];

  // Map stage to which architecture visual is shown in the physical package
  const getActiveArch = useCallback(() => {
    if (['cpu', 'gpu', 'npu', 'tpu', 'fpga'].includes(currentStage.id)) {
      return currentStage.id;
    }
    return null;
  }, [currentStage.id]);

  // Continuity bridge 03 → 04: arrive *inside* COMPUTE. The package starts
  // at the zoom scale Slide 03 ended on, settles, then the header resolves.
  const entry = useDeckEntry();
  const arrivedFromSystem = useRef(entry.continuity && stageIndex === 0);
  const flipRef = useRef(undefined);
  useLayoutEffect(() => {
    if (!arrivedFromSystem.current) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const pkg = containerRef.current?.querySelector('.compute-physical-package');
      // FLIP from the exact on-screen rectangle COMPUTE had at the end of Slide 03.
      // Measured once per mount: React StrictMode re-runs this effect, and the
      // second run would otherwise measure the package mid-hand-off (≈ no motion).
      if (flipRef.current === undefined) flipRef.current = !reduced && pkg ? flipFrom(pkg, takeHandoff('compute')) : null;
      const flip = flipRef.current;
      const from = flip
        ? { x: flip.x, y: flip.y, scale: flip.scale, opacity: 1 }
        : { x: 0, y: 0, scale: reduced ? 1.04 : 1.25, opacity: reduced ? 0 : 1 };
      tl.fromTo(pkg,
        // transition:none — the package's CSS `transition: all` would fight GSAP
        { ...from, transformOrigin: '50% 50%', transition: 'none', filter: 'drop-shadow(0 0 40px rgba(39,215,255,0.6))' },
        { x: 0, y: 0, scale: 1, opacity: 1, filter: 'drop-shadow(0 0 0px rgba(39,215,255,0))', duration: reduced ? 0.25 : 0.85, ease: 'power3.inOut', clearProps: 'filter,transition,transform' })
        .fromTo('.engine-tile', { opacity: 0, y: reduced ? 0 : 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: reduced ? 0 : 0.09, ease: 'power3.out' }, reduced ? 0 : 0.75)
        .fromTo('.mock-block', { opacity: 0, transition: 'none' }, { opacity: 0.15, duration: 0.5, stagger: 0.04, clearProps: 'transition' }, reduced ? 0 : 0.35)
        .fromTo('.ce-eyebrow, .ce-title', { opacity: 0, y: reduced ? 0 : 10 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, reduced ? 0 : 0.45)
        .fromTo('.ce-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.4 }, reduced ? 0 : 0.7)
        .fromTo('.ce-header .stage-nav', { opacity: 0 }, { opacity: 1, duration: 0.4 }, reduced ? 0 : 0.85);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Handle stage change with GSAP animations
  useEffect(() => {
    // The continuity arrival owns Stage 00's entrance; later stages use the shared one.
    if (arrivedFromSystem.current && stageIndex === 0) return;
    arrivedFromSystem.current = false;
    const ctx = gsap.context(() => {
      // Clean animations on view switches
      stageEnter('.ce-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  // Stage navigation (keyboard owned by the deck). The choice stage steps
  // through reveal → next scenario before leaving the stage.
  useStageNavigation({
    stage: stageIndex,
    setStage: setStageIndex,
    count: STAGES.length,
    next: (defaultNext) => {
      if (currentStage.id === 'choice') {
        if (!isAnswerRevealed) { setIsAnswerRevealed(true); return true; }
        if (scenarioIndex < SCENARIOS.length - 1) {
          setScenarioIndex(scenarioIndex + 1);
          setIsAnswerRevealed(false);
          return true;
        }
      }
      return defaultNext();
    },
    prev: (defaultPrev) => {
      if (currentStage.id === 'choice') {
        if (isAnswerRevealed) { setIsAnswerRevealed(false); return true; }
        if (scenarioIndex > 0) {
          setScenarioIndex(scenarioIndex - 1);
          setIsAnswerRevealed(true);
          return true;
        }
      }
      return defaultPrev();
    },
  });

  // Current scenario object
  const activeScenario = SCENARIOS[scenarioIndex] || SCENARIOS[0];
  const targetArchitecture = ARCHITECTURES.find(
    (a) => a.id === activeScenario.target
  );

  return (
    <section ref={containerRef} className="scene compute-engine-scene">
      <div className="ce-bg-grid" />

      {/* Header Bar */}
      <header className="ce-header">
        <div>
          <div className="ce-eyebrow">
            <span>● MISSION 03</span>
            <span>•</span>
            <span>THE COMPUTE ENGINE</span>
          </div>
          <h2 className="ce-title">
            WHERE DOES <span>THE AI RUN?</span>
          </h2>
          <div className="ce-subtitle">
            {currentStage.subtitle}
          </div>
        </div>

        {/* Interactive Stage Pill Indicator */}
        <StageNavigator
          stages={STAGES}
          currentStage={stageIndex}
          onStageChange={(idx) => {
            setStageIndex(idx);
            if (STAGES[idx].id === 'choice') setIsAnswerRevealed(false);
          }}
          variant="stacked"
          title="COMPUTE ENGINE"
          ariaLabel="Compute Engine stages"
        />
      </header>

      {/* Central Interactive Viewport */}
      <main className="ce-main-viewport">
        {/* STAGE 0: ENTRY FROM MENTAL MODEL */}
        {currentStage.id === 'entry' && (
          <div className="ce-mental-model-mockup dimmed">
            <div className="mock-system-container">
              <div className="mock-block mock-sensors">SENSORS</div>
              <div className="mock-block mock-memory">MEMORY</div>
              <div className="mock-block mock-interconnect">INTERCONNECT</div>
              <div className="mock-block mock-io">I/O + COMMS</div>
              <div className="mock-block mock-actuators">ACTUATORS</div>
              <div className="mock-block mock-power">POWER + THERMAL INFRASTRUCTURE</div>
            </div>

            {/* Package sits ON the system's compute position (overlay), not beside it */}
            <div className="ce-entry-package">
              <ComputeObject activeArch={null} stage="compute" />
            </div>
          </div>
        )}

        {/* STAGES 1 TO 6: FOCUSED ARCHITECTURE VIEW */}
        {['compute', 'cpu', 'gpu', 'npu', 'tpu', 'fpga'].includes(currentStage.id) && (
          <ComputeObject activeArch={getActiveArch()} stage={currentStage.id} />
        )}

        {/* STAGE 7: SIDE-BY-SIDE COMPARISON */}
        {currentStage.id === 'comparison' && (
          <div className="ce-comparison-view">
            <div className="ce-compare-columns">
              {ARCHITECTURES.map((arch) => (
                <div
                  key={arch.id}
                  className={`ce-compare-card ${
                    selectedArchId === arch.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedArchId(arch.id)}
                  style={{
                    borderColor: selectedArchId === arch.id ? arch.color : undefined
                  }}
                >
                  <div className="card-icon-box" style={{ color: arch.color }}>
                    {arch.name}
                  </div>
                  <h3 className="card-title">{arch.name}</h3>
                  <div className="card-strength" style={{ color: arch.color }}>
                    {arch.strength}
                  </div>
                  <div className="card-role-pill">{arch.typicalRole}</div>
                  <div className="card-examples-list">
                    {arch.examples.map((ex, i) => (
                      <span key={i}>{ex}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="architecture-callout-strip" style={{ justifyContent: 'center' }}>
              <div className="callout-pill accent-cyan">
                <span>CLICK ANY ARCHITECTURE TO INSPECT SPECIFICATIONS</span>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 8: INTERACTIVE CHOICE SCENARIO */}
        {currentStage.id === 'choice' && (
          <div className="ce-scenario-panel">
            <div className="scenario-progress">
              SCENARIO 0{scenarioIndex + 1} OF 0{SCENARIOS.length}
            </div>

            <div className="scenario-question-text">
              "{activeScenario.question}"
            </div>

            <div className="scenario-answer-reveal-box">
              {isAnswerRevealed ? (
                <>
                  <div
                    className="revealed-badge"
                    style={{
                      color: targetArchitecture?.color || '#38BDF8'
                    }}
                  >
                    <span>✓ OPTIMAL CHOICE:</span>
                    <span>{activeScenario.answer}</span>
                  </div>
                  <div className="revealed-explanation">
                    {activeScenario.reason}
                  </div>
                </>
              ) : (
                <div className="unrevealed-prompt">
                  <span>PRESS</span>
                  <kbd>SPACE</kbd>
                  <span>TO REVEAL ANSWER</span>
                </div>
              )}
            </div>

            <div className="scenario-action-bar">
              {!isAnswerRevealed ? (
                <button
                  className="scenario-btn primary"
                  onClick={() => setIsAnswerRevealed(true)}
                >
                  Reveal Answer
                </button>
              ) : (
                <button
                  className="scenario-btn primary"
                  onClick={() => {
                    if (scenarioIndex < SCENARIOS.length - 1) {
                      setScenarioIndex((prev) => prev + 1);
                      setIsAnswerRevealed(false);
                    } else {
                      setStageIndex((prev) => prev + 1);
                    }
                  }}
                >
                  {scenarioIndex < SCENARIOS.length - 1
                    ? 'Next Scenario →'
                    : 'Complete Comparison →'}
                </button>
              )}
              {scenarioIndex > 0 && (
                <button
                  className="scenario-btn secondary"
                  onClick={() => {
                    setScenarioIndex((prev) => prev - 1);
                    setIsAnswerRevealed(false);
                  }}
                >
                  ← Previous
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 9: THE REALIZATION */}
        {currentStage.id === 'realization' && (
          <div className="ce-transition-panel">
            <div className="realization-line">DIFFERENT HARDWARE.</div>
            <div className="realization-line">DIFFERENT TRADE-OFFS.</div>
            <div className="realization-line highlight">
              SAME GOAL: COMPUTE.
            </div>

            <div style={{ marginTop: 40 }}>
              <ComputeObject activeArch={null} stage="compute" />
            </div>
          </div>
        )}

        {/* STAGE 10: MEMORY TEASER */}
        {currentStage.id === 'memory_teaser' && (
          <div className="ce-memory-teaser-stage">
            <div className="memory-teaser-headline">
              BUT EVEN THE FASTEST COMPUTE <span>NEEDS DATA.</span>
            </div>

            <div className="memory-teaser-chips">
              <div className="teaser-chip compute-block">
                <div className="teaser-chip-title">COMPUTE ENGINE</div>
                <div className="teaser-chip-status">STARVING FOR MEMORY</div>
              </div>

              <div className="teaser-bus-flow">
                <div className="teaser-flow-arrow">◀ ◀ ◀</div>
                <div className="teaser-bus-label">DATA BUS</div>
              </div>

              <div className="teaser-chip memory-block">
                <div className="teaser-chip-title">MEMORY HIERARCHY</div>
                <div className="teaser-chip-status">HBM • DDR5 • CACHES</div>
              </div>
            </div>

            <div className="architecture-callout-strip">
              <div className="callout-pill accent-amber">
                <span>PRESS NEXT OR SPACE TO ENTER: THE MEMORY PROBLEM</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
