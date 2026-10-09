import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GlyphIcon, InlineIcon } from '../deck/GlyphIcon';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { MEMORY_STAGES, MEMORY_LEVELS } from './memoryData';
import { ComputeUnit } from './ComputeUnit';
import { HBMVisual } from './HBMVisual';
import { MemoryHierarchy } from './MemoryHierarchy';
import { WaitingGame } from './WaitingGame';
import { DataFlow } from './DataFlow';
import './MemoryProblem.css';

const DESIGN_W = 1366;
const DESIGN_H = 768;

export function MemoryProblemScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [selectedTier, setSelectedTier] = useState('cache');

  const currentStage = MEMORY_STAGES[stageIndex] || MEMORY_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.mp-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: MEMORY_STAGES.length });

  // Scene-local design canvas: authored at 1366x768 (smallest target frame)
  // and scaled uniformly to fill the 16:9 presentation frame.
  const [fit, setFit] = useState(1);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (w && h) setFit(Math.min(w / DESIGN_W, h / DESIGN_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section ref={containerRef} className="scene memory-problem-scene">
      <div className="mp-bg-grid" />

      <div className="mp-canvas" style={{ transform: `translate(-50%, -50%) scale(${fit})` }}>
      {/* Header Bar */}
      <header className="mp-header">
        <div className="mp-header-copy">
          <div className="mp-eyebrow">
            <span>● MISSION 04</span>
            <span>•</span>
            <span>{currentStage.kicker}</span>
          </div>
          <h2 className="mp-title">
            A FAST PROCESSOR <span>CAN STILL WAIT.</span>
          </h2>
          <div className="mp-subtitle">{currentStage.subtitle}</div>
        </div>

        <StageNavigator
          stages={MEMORY_STAGES}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          variant="stacked"
          title="MEMORY JOURNEY"
          ariaLabel="Memory stages"
          amberIds={['waiting']}
          className="mp-stage-nav"
        />
      </header>

      {/* Central Viewport */}
      <main className="mp-main-viewport">
        {/* STAGE 0: ENTRY - ACTIVE COMPUTE */}
        {currentStage.id === 'entry' && (
          <div className="mp-col">
            <DataFlow direction="vertical" laneCount={8} isActive={true} />
            <ComputeUnit state="active" customTitle="SATURATED HIGH-SPEED ENGINE" />
          </div>
        )}

        {/* STAGE 1: THE WAIT - DATA STREAM STOPS */}
        {currentStage.id === 'waiting' && (
          <div className="mp-col">
            <DataFlow direction="vertical" laneCount={2} isActive={false} isBottleneck={true} />
            <ComputeUnit state="waiting" customTitle="STARVED COMPUTE ENGINE" />
          </div>
        )}

        {/* STAGE 2: WHERE IS THE DATA? */}
        {currentStage.id === 'where_is_data' && (
          <div className="mp-split">
            <div className="mp-amber-warning-box mp-where-box">
              <span className="warning-icon"><GlyphIcon glyph="❓" size={26} /></span>
              <span className="warning-title">WHERE IS THE DATA?</span>
              <span className="warning-sub">
                DATA MUST TRAVEL FROM PHYSICAL STORAGE ACROSS SILICON INTERFACES
              </span>
            </div>
            <div className="mp-col">
              <DataFlow direction="vertical" laneCount={1} isActive={true} isBottleneck={true} />
              <ComputeUnit state="waiting" customTitle="WAITING ON BUS" />
            </div>
          </div>
        )}

        {/* STAGE 3: CACHE */}
        {currentStage.id === 'cache' && (
          <div className="mp-col mp-col-tight">
            <ComputeUnit compact state="active" customTitle="ON-DIE EXECUTION WITH L1/L2/L3" />
            <div className="callout-pill accent-cyan">
              <span>▲ FAST & ON-DIE (~10 TB/s) BUT TINY CAPACITY (MBs) ▲</span>
            </div>
            <MemoryHierarchy activeTier="cache" onSelectTier={setSelectedTier} />
          </div>
        )}

        {/* STAGE 4: RAM */}
        {currentStage.id === 'ram' && (
          <div className="mp-col mp-col-tight">
            <ComputeUnit compact state="waiting" customTitle="WAITING ON OFF-PACKAGE DIMM BUS" />
            <div className="callout-pill accent-amber">
              <span><InlineIcon glyph="⚠️" /> DDR5: HIGH CAPACITY (HUNDREDS OF GBs) BUT SEPARATED BY SOCKET PIN LIMITS (~200 GB/s)</span>
            </div>
            <MemoryHierarchy activeTier="ram" onSelectTier={setSelectedTier} />
          </div>
        )}

        {/* STAGE 5: HBM3e - THE AI HERO */}
        {currentStage.id === 'hbm' && (
          <div className="mp-col mp-col-tight">
            <ComputeUnit compact state="active" customTitle="AI ACCELERATOR WITH IN-PACKAGE HBM" />
            <HBMVisual isFeeding={true} />
          </div>
        )}

        {/* STAGE 6: STORAGE */}
        {currentStage.id === 'storage' && (
          <div className="mp-col mp-col-tight">
            <div className="callout-pill accent-amber">
              <span><InlineIcon glyph="💾" /> NVMe STORAGE POOL: TERABYTES/PETABYTES BUT 100,000x SLOWER THAN CACHE</span>
            </div>
            <MemoryHierarchy activeTier="storage" onSelectTier={setSelectedTier} />
          </div>
        )}

        {/* STAGE 7: FULL HIERARCHY */}
        {currentStage.id === 'hierarchy' && (
          <MemoryHierarchy large activeTier={selectedTier} onSelectTier={setSelectedTier} />
        )}

        {/* STAGE 8: MEMORY BANDWIDTH */}
        {currentStage.id === 'bandwidth' && (
          <div className="mp-col mp-col-tight">
            <div className="banner-line1" style={{ textAlign: 'center' }}>
              MEMORY BANDWIDTH = <span>WIDTH OF DATA HIGHWAY</span>
            </div>
            <ComputeUnit compact state="active" customTitle="HIGH-BANDWIDTH INTERFACE" />
            <HBMVisual isFeeding={true} />
          </div>
        )}

        {/* STAGE 9: THE WAITING GAME SIMULATION */}
        {currentStage.id === 'waiting_game' && <WaitingGame initialMode="low" />}

        {/* STAGE 10: SYSTEM PERFORMANCE COMPARISON */}
        {currentStage.id === 'system_performance' && (
          <div className="mp-system-comparison-view">
            <div className="comparison-columns-pair">
              {/* System A */}
              <div className="sys-card card-starved">
                <div className="sys-card-header">
                  <h3 className="sys-title">SYSTEM A: STARVED</h3>
                  <span className="sys-badge">4% REAL EFFICIENCY</span>
                </div>
                <div className="sys-diagram-mock">
                  <div className="mock-row">
                    <span>Compute Theoretical:</span>
                    <span className="val">1,000 TFLOPS</span>
                  </div>
                  <div className="mock-row">
                    <span>Memory Bandwidth:</span>
                    <span className="val" style={{ color: '#F59E0B' }}>
                      64 GB/s (Bottleneck)
                    </span>
                  </div>
                </div>
                <div className="sys-outcome-box">
                  Result: Compute cores spend 96% of clock cycles stalled waiting on cache misses.
                </div>
              </div>

              {/* System B */}
              <div className="sys-card card-balanced">
                <div className="sys-card-header">
                  <h3 className="sys-title">SYSTEM B: BALANCED</h3>
                  <span className="sys-badge">95% REAL EFFICIENCY</span>
                </div>
                <div className="sys-diagram-mock">
                  <div className="mock-row">
                    <span>Compute Theoretical:</span>
                    <span className="val">1,000 TFLOPS</span>
                  </div>
                  <div className="mock-row">
                    <span>Memory Bandwidth:</span>
                    <span className="val" style={{ color: '#22D3EE' }}>
                      3,200 GB/s (HBM3e)
                    </span>
                  </div>
                </div>
                <div className="sys-outcome-box">
                  Result: Ultra-wide interconnect saturates ALUs continuously. Peak throughput achieved.
                </div>
              </div>
            </div>

            <div className="mp-big-takeaway-banner">
              <div className="banner-line1">
                COMPUTE PERFORMANCE ≠ <span>SYSTEM PERFORMANCE</span>
              </div>
              <div className="banner-line2">
                The bottleneck moves from the logic units to the memory interconnect.
              </div>
            </div>
          </div>
        )}

        {/* STAGE 11: TEASER / TRANSITION TO DATA HIGHWAY */}
        {currentStage.id === 'teaser' && (
          <div className="mp-teaser-stage">
            <h2 className="teaser-headline">
              SO HOW DO WE MOVE <span>ALL THIS DATA?</span>
            </h2>

            <div className="teaser-highway-visual">
              <div className="highway-road-lines" />
              <div className="highway-hub">COMPUTE ENGINE</div>
              <div className="highway-center-label">▲ HIGH-SPEED INTERCONNECT FABRIC ▲</div>
              <div className="highway-hub" style={{ borderColor: '#60A5FA', color: '#60A5FA' }}>
                MEMORY & SCALE
              </div>
            </div>

            <div className="teaser-next-action-pill">
              <span>PRESS</span>
              <kbd className="teaser-kbd">
                SPACE / →
              </kbd>
              <span>TO ENTER: THE DATA HIGHWAY</span>
            </div>
          </div>
        )}
      </main>
      </div>
    </section>
  );
}
