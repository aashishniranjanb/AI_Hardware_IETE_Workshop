"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Maximize2, Play, RotateCcw } from 'lucide-react';
import { ChittiScene } from '../components/Chitti/ChittiScene';
import { SystemScene } from '../components/MentalModel/SystemScene';
import { ComputeEngineScene } from '../components/ComputeEngine/ComputeEngineScene';
import { MemoryProblemScene } from '../components/MemoryProblem/MemoryProblemScene';
import { DataHighwayScene } from '../components/DataHighway/DataHighwayScene';
import { BlackwellScene } from '../components/Blackwell/BlackwellScene';
import { AIChipScene } from '../components/AIChip/AIChipScene';
import { TransistorLogicScene } from '../components/TransistorLogic/TransistorLogicScene';
import { LogicComputationScene } from '../components/LogicComputation/LogicComputationScene';
import { HardwarePlatformsScene } from '../components/HardwarePlatforms/HardwarePlatformsScene';
import { ModelComparisonScene } from '../components/ModelComparison/ModelComparisonScene';
import { FPGABuildScene } from '../components/FPGABuild/FPGABuildScene';
import { FPGASetupScene } from '../components/FPGASetup/FPGASetupScene';
import { FirstFPGAProgramScene } from '../components/FirstFPGAProgram/FirstFPGAProgramScene';
import { AIAcceleratorScene } from '../components/AIAccelerator/AIAcceleratorScene';
import { RTLBuildScene } from '../components/RTLBuild/RTLBuildScene';
import { DeckNavContext, DeckEntryContext, useDeckNavigation } from '../components/deck/DeckNavigation';
import { sceneEnter, sceneExit, restoreMotionMode, toggleMotionMode } from '../components/deck/motion';

const scenes = [
  { id: 'title', kicker: 'IETE CLUB PRESENTS', title: 'AI HARDWARE', subtitle: 'FROM INTELLIGENT ROBOTS TO AI SUPERCOMPUTERS', type: 'title' },
  { id: 'chitti', kicker: 'MISSION 01', title: 'WHAT IF WE BUILT CHITTI TODAY?', subtitle: 'What would an intelligent machine actually need?', type: 'chitti' },
  { id: 'system', kicker: 'THE MENTAL MODEL', title: 'EVERY INTELLIGENT SYSTEM HAS A BODY', subtitle: 'Compute • Memory • Data Movement • I/O • Power • Thermal', type: 'system' },
  { id: 'compute_engine', kicker: 'THE COMPUTE ENGINE', title: 'WHERE DOES THE AI RUN?', subtitle: 'COMPUTE IS NOT ONE THING.', type: 'compute_engine' },
  { id: 'memory', kicker: 'THE MEMORY HIERARCHY', title: 'A FAST PROCESSOR CAN STILL WAIT.', subtitle: 'COMPUTE IS ONLY USEFUL WHEN DATA ARRIVES FAST ENOUGH.', type: 'memory' },
  { id: 'data_highway', kicker: 'THE DATA HIGHWAY', title: 'HOW DOES ALL THIS DATA MOVE?', subtitle: 'COMPUTE, MEMORY AND THE REST OF THE SYSTEM NEED A HIGH-SPEED FABRIC.', type: 'data_highway' },
  { id: 'blackwell', kicker: 'CASE STUDY', title: 'WHAT HAPPENS WHEN WE SCALE THIS?', subtitle: 'FROM ONE GPU TO AN AI SUPERCOMPUTER', type: 'blackwell' },
  { id: 'aichip', kicker: 'THE ATOM OF AI', title: 'WHAT IS ACTUALLY INSIDE AN AI CHIP?', subtitle: 'FROM BILLIONS OF TRANSISTORS TO TRILLIONS OF OPERATIONS', type: 'aichip' },
  { id: 'transistor', kicker: 'THE FUNDAMENTALS', title: 'TRANSISTOR TO LOGIC', subtitle: 'Where AI actually begins', type: 'transistor' },
  { id: 'logic_computation', kicker: 'BUILD A CIRCUIT', title: 'FROM LOGIC GATES TO COMPUTATION', subtitle: 'AND → XOR → ADDER → 4-BIT ALU → FPGA', type: 'logic_computation' },
  { id: 'hardware_platforms', kicker: 'THE HARDWARE PATH', title: 'FROM RTL TO REAL HARDWARE', subtitle: 'ONE COMPUTATION — THREE SILICON PATHWAYS', type: 'hardware_platforms' },
  { id: 'model_comparison', kicker: 'THE EXPERIMENT', title: 'ONE AI MODEL. THREE WAYS TO RUN IT.', subtitle: 'VSDSQUADRON FPGA • RENESAS V2 • HELTEC ESP32', type: 'model_comparison' },
  { id: 'fpga_build', kicker: 'HANDS-ON WORKSHOP', title: 'BUILD THE FPGA VERSION', subtitle: 'FROM AI MODEL TO REAL DIGITAL HARDWARE', type: 'fpga_build' },
  { id: 'fpga_setup', kicker: 'HARDWARE WORKSHOP', title: 'FPGA HARDWARE SETUP', subtitle: 'FROM LAPTOP → USB → FPGA', type: 'fpga_setup' },
  { id: 'first_fpga_program', kicker: 'FIRST FPGA PROGRAM', title: 'FIRST FPGA PROGRAM: MAKE IT DO SOMETHING', subtitle: 'FROM RTL TO A REAL LED', type: 'first_fpga_program' },
  { id: 'ai_accelerator', kicker: 'AI ACCELERATOR', title: 'BUILD THE AI ACCELERATOR', subtitle: 'FROM MACs TO A DIGIT-RECOGNITION DATAPATH', type: 'ai_accelerator' },
  { id: 'rtl_build', kicker: 'WRITE THE RTL', title: 'WRITE THE RTL', subtitle: 'FROM AI ARCHITECTURE TO FPGA HARDWARE', type: 'rtl_build' }
];

function TitleScene() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.title-kicker', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out' });
      gsap.fromTo('.title-main', { y: 40, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, delay: .15, ease: 'power4.out' });
      gsap.fromTo('.title-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, delay: .45, ease: 'power3.out' });
      gsap.fromTo('.hero-chip', { scale: .75, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.3, delay: .35, ease: 'back.out(1.4)' });
      gsap.to('.particle', { y: -18, x: 'random(-30,30)', opacity: 'random(.35,1)', duration: 'random(1.4,2.4)', repeat: -1, yoyo: true, stagger: .08, ease: 'sine.inOut' });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <section ref={ref} className="scene title-scene">
    <div className="ambient-grid" />
    <div className="title-copy">
      <div className="title-kicker">IETE CLUB PRESENTS • HANDS-ON WORKSHOP</div>
      <h1 className="title-main">AI <span>HARDWARE</span></h1>
      <div className="title-sub">FROM INTELLIGENT ROBOTS TO AI SUPERCOMPUTERS</div>
      <div className="event-meta">09 OCTOBER 2026&nbsp;&nbsp;•&nbsp;&nbsp;VLSI LAB&nbsp;&nbsp;•&nbsp;&nbsp;SRMIST VADAPALANI</div>
    </div>
    <div className="hero-visual">
      <div className="orbit orbit-a" /><div className="orbit orbit-b" />
      <div className="hero-chip">
        <div className="chip-core"><div className="chip-label">AI</div><div className="chip-line" /></div>
        {Array.from({ length: 22 }).map((_, i) => <span key={i} className="particle" style={{ '--i': i }} />)}
      </div>
      <div className="hero-path"><span>🤖</span><i>→</i><span>🧠</span><i>→</i><span>⚡</span><i>→</i><span>▦</span></div>
    </div>
  </section>;
}

function NVL72Scene() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nvl-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
      gsap.fromTo('.rack-unit', { opacity: 0, scaleX: 0.8 }, { opacity: 1, scaleX: 1, duration: 0.4, stagger: 0.03, delay: 0.3, ease: 'power2.out' });
      gsap.fromTo('.nvlink-cables path', { strokeDasharray: 1000, strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 2, delay: 1, ease: 'power2.inOut' });
    }, ref);
    return () => ctx.revert();
  }, []);
  
  return <section ref={ref} className="scene nvl72-scene">
    <div className="nvl-header">
      <div className="eyebrow">THE SUPERCOMPUTER</div>
      <h2 className="nvl-title">GB200 <span>NVL72</span></h2>
      <p className="nvl-subtitle">72 Blackwell GPUs • 36 Grace CPUs • Functioning as a single massive GPU</p>
    </div>
    <div className="nvl-rack-container">
      <div className="rack">
        {Array.from({length: 18}).map((_, i) => (
          <div key={i} className={`rack-unit ${i === 8 || i === 9 ? 'switch-tray' : 'compute-tray'}`}>
             <div className="lights"></div>
          </div>
        ))}
      </div>
      <svg className="nvlink-cables" viewBox="0 0 100 400" preserveAspectRatio="none">
        {Array.from({length: 18}).map((_, i) => (
          <path key={i} d={`M 0 ${i * 22 + 10} C 50 ${i * 22 + 10}, 50 200, 100 200`} stroke="var(--cable-color, #3870a8)" strokeWidth="2" fill="none" opacity="0.6"/>
        ))}
      </svg>
    </div>
  </section>;
}

function ZoomScene() {
  const ref = useRef(null);
  const layers = ['DATA CENTER', 'RACK', 'NVL72', 'GPU', 'AI ACCELERATOR', 'COMPUTE UNIT', 'MAC ARRAY', 'MULTIPLIER', 'LOGIC GATE', 'TRANSISTOR'];
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.zoom-layer', { opacity: 0, scale: 0.1, z: -500 }, { opacity: 1, scale: 1, z: 0, duration: 0.6, stagger: 0.8, ease: 'power2.out' });
      gsap.to('.zoom-layer', { opacity: 0, scale: 3, duration: 0.6, delay: 0.7, stagger: 0.8, ease: 'power2.in' });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <section ref={ref} className="scene zoom-scene" style={{ perspective: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {layers.map((l, i) => (
        <div key={l} className="zoom-layer" style={{ position: 'absolute', fontSize: 'clamp(40px, 8vw, 100px)', fontWeight: 800, fontFamily: 'Space Grotesk', color: i === layers.length - 1 ? '#5caeff' : '#dce6f4', textShadow: '0 0 40px rgba(92,174,255,0.4)', textAlign: 'center' }}>
          {l}
        </div>
      ))}
    </div>
  </section>;
}

function TransistorScene() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  return <section className="scene transistor-scene" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15vh' }}>
    <div className="eyebrow">THE FUNDAMENTAL BUILDING BLOCK</div>
    <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(40px, 6vw, 80px)', margin: '20px 0' }}>TRANSISTOR → <span style={{ color: '#5caeff' }}>LOGIC</span></h2>
    <div style={{ display: 'flex', gap: '4vw', alignItems: 'center', marginTop: '6vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button onClick={() => setA(1 - a)} style={{ width: '100px', height: '100px', fontSize: '40px', fontWeight: 'bold', borderRadius: '16px', background: a ? 'rgba(92,174,255,0.2)' : '#101d31', border: `2px solid ${a ? '#5caeff' : '#355477'}`, color: '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>{a}</button>
        <button onClick={() => setB(1 - b)} style={{ width: '100px', height: '100px', fontSize: '40px', fontWeight: 'bold', borderRadius: '16px', background: b ? 'rgba(92,174,255,0.2)' : '#101d31', border: `2px solid ${b ? '#5caeff' : '#355477'}`, color: '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>{b}</button>
      </div>
      <div style={{ fontSize: '40px', color: '#6f809a' }}>→</div>
      <div style={{ padding: '30px 40px', background: '#0a1220', border: '1px solid #355477', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', width: '320px' }}>
        <div style={{ fontSize: '14px', letterSpacing: '0.15em', color: '#6f809a', marginBottom: '20px', fontWeight: 'bold' }}>LOGIC GATE (AND)</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#dce6f4' }}><span>Input A</span> <span>{a}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#dce6f4', borderBottom: '1px solid #1c2b42', paddingBottom: '20px' }}><span>Input B</span> <span>{b}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', color: (a & b) ? '#5caeff' : '#6f809a' }}><span>Output</span> <span>{a & b}</span></div>
      </div>
    </div>
  </section>;
}

function Scene({ scene }) {
  if (scene.type === 'title') return <TitleScene />;
  if (scene.type === 'chitti') return <ChittiScene />;
  if (scene.type === 'system') return <SystemScene />;
  if (scene.type === 'compute_engine') return <ComputeEngineScene />;
  if (scene.type === 'memory') return <MemoryProblemScene />;
  if (scene.type === 'data_highway') return <DataHighwayScene />;
  if (scene.type === 'blackwell') return <BlackwellScene />;
  if (scene.type === 'aichip') return <AIChipScene />;
  if (scene.type === 'transistor') return <TransistorLogicScene />;
  if (scene.type === 'logic_computation') return <LogicComputationScene />;
  if (scene.type === 'hardware_platforms') return <HardwarePlatformsScene />;
  if (scene.type === 'model_comparison') return <ModelComparisonScene />;
  if (scene.type === 'fpga_build') return <FPGABuildScene />;
  if (scene.type === 'fpga_setup') return <FPGASetupScene />;
  if (scene.type === 'first_fpga_program') return <FirstFPGAProgramScene />;
  if (scene.type === 'ai_accelerator') return <AIAcceleratorScene />;
  if (scene.type === 'rtl_build') return <RTLBuildScene />;
  if (scene.type === 'nvl72') return <NVL72Scene />;
  if (scene.type === 'zoom') return <ZoomScene />;
  return <TitleScene />;
}

// Dev-only QA hook: lets automated checks drive the GSAP ticker in a hidden tab.
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') window.__gsap = gsap;

function App() {
  const [index, setIndexRaw] = useState(0);
  const [entry, setEntry] = useState({ from: -1, to: 0, dir: 1 });
  const [blackout, setBlackout] = useState(false);
  const [motionToast, setMotionToast] = useState(null);
  useEffect(() => { restoreMotionMode(); }, []);
  useEffect(() => {
    if (!motionToast) return;
    const t = setTimeout(() => setMotionToast(null), 1400);
    return () => clearTimeout(t);
  }, [motionToast]);
  const stageRef = useRef(null);
  const scanRef = useRef(null);
  const indexRef = useRef(0);
  const transitioningRef = useRef(false);
  const exitHookRef = useRef(null);

  // Slide change = exit animation (scene-provided or default) → swap → enter.
  // The navigation engine's transition lock stays held until the new index commits.
  const setIndex = (next) => {
    const from = indexRef.current;
    const target = typeof next === 'function' ? next(from) : next;
    if (target === from || transitioningRef.current) return;
    transitioningRef.current = true;
    const dir = target > from ? 1 : -1;
    const swap = () => {
      indexRef.current = target;
      // Continuity bridges own their visual hand-off; the deck only cross-fades.
      const continuity = scenes[from]?.id === 'system' && scenes[target]?.id === 'compute_engine';
      setEntry({ from, to: target, dir, continuity });
      setIndexRaw(target);
    };
    // Swap exactly once. GSAP runs on requestAnimationFrame, which pauses in
    // hidden/background tabs, so a timer guarantees the deck never stalls.
    let swapped = false;
    const swapOnce = () => {
      if (swapped) return;
      swapped = true;
      clearTimeout(fallback);
      gsap.killTweensOf(stageRef.current); // a late exit tween must never fade the new slide
      swap();
    };
    const custom = exitHookRef.current;
    const usedCustom = !!(custom && custom(dir, swapOnce));
    const fallback = setTimeout(swapOnce, usedCustom ? 1400 : 450);
    if (!usedCustom) sceneExit(stageRef.current, swapOnce);
  };

  useLayoutEffect(() => {
    if (entry.from === -1) return;
    const tl = sceneEnter(stageRef.current, scanRef.current, entry.continuity ? { from: { scale: 1 }, duration: 0.2 } : undefined);
    transitioningRef.current = false;
    return () => tl?.kill();
  }, [index]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  };
  // Single authoritative keyboard listener for slides + scene stages.
  const { registry, exitRef, nextSlide: next, prevSlide: prev } = useDeckNavigation({
    index,
    slideCount: scenes.length,
    setIndex,
    onBlackout: () => setBlackout(v => !v),
    onFullscreen: toggleFullscreen,
    onMotionToggle: () => setMotionToast(toggleMotionMode() === 'full' ? 'MOTION: FULL' : 'MOTION: REDUCED'),
  });
  // Scenes may register a custom exit (continuity bridges, e.g. Slide 03 → 04 zoom).
  exitHookRef.current = (dir, done) => (exitRef.current ? exitRef.current(dir, done) : false);
  return (
    <div className="deck-root">
      <div className="presentation-viewport">
        <div className="presentation-safe-area">
          <main className="deck">
            <div className="topbar">
              <div className="brand">IETE × AI HARDWARE</div>
              <div className="counter">{String(index + 1).padStart(2,'0')} / {String(scenes.length).padStart(2,'0')}</div>
            </div>
            <DeckNavContext.Provider value={registry}>
              <DeckEntryContext.Provider value={entry}>
                <div ref={stageRef} className="slide-stage">
                  <Scene key={scenes[index].id} scene={scenes[index]} />
                </div>
              </DeckEntryContext.Provider>
            </DeckNavContext.Provider>
            <div ref={scanRef} className="slide-scan" aria-hidden="true" />
            <div className="controls">
              <button onClick={prev} disabled={index===0}><ChevronLeft size={20}/></button>
              <button onClick={next} disabled={index===scenes.length-1}><ChevronRight size={20}/></button>
              <button onClick={toggleFullscreen}><Maximize2 size={17}/></button>
              <button onClick={() => setBlackout(v => !v)}><div className="black-dot"/></button>
            </div>
            <div className="progress"><span style={{width: `${((index+1)/scenes.length)*100}%`}} /></div>
            {motionToast && <div className="motion-toast" role="status">{motionToast}</div>}
            {blackout && <div className="blackout" onClick={() => setBlackout(false)}><div>CLICK / B TO RETURN</div></div>}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function Page() { return <App />; }
