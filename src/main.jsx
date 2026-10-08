import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Maximize2, Play, RotateCcw } from 'lucide-react';
import './styles.css';

const scenes = [
  { id: 'title', kicker: 'IETE CLUB PRESENTS', title: 'AI HARDWARE', subtitle: 'FROM INTELLIGENT ROBOTS TO AI SUPERCOMPUTERS', type: 'title' },
  { id: 'chitti', kicker: 'MISSION 01', title: 'WHAT IF WE BUILT CHITTI TODAY?', subtitle: 'What would an intelligent machine actually need?', type: 'chitti' },
  { id: 'system', kicker: 'THE MENTAL MODEL', title: 'EVERY INTELLIGENT SYSTEM HAS A BODY', subtitle: 'Compute • Memory • Data Movement • I/O • Power • Thermal', type: 'system' },
  { id: 'blackwell', kicker: 'THE ENGINE', title: 'NVIDIA BLACKWELL', subtitle: 'The architecture powering the next generation of AI', type: 'blackwell' },
  { id: 'nvl72', kicker: 'THE SUPERCOMPUTER', title: 'GB200 NVL72', subtitle: 'A massive interconnected brain', type: 'nvl72' },
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

function ChittiScene() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mission-kicker', { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: .6 });
      gsap.fromTo('.mission-title', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .8, delay: .1 });
      gsap.fromTo('.question-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8, delay: .35 });
      gsap.fromTo('.robot-silhouette', { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: 1, delay: .25, ease: 'back.out(1.3)' });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <section ref={ref} className="scene chitti-scene">
    <div className="left-column">
      <div className="mission-kicker">MISSION 01</div>
      <h2 className="mission-title">WHAT IF WE BUILT<br /><span>CHITTI TODAY?</span></h2>
      <div className="question-card">
        <div className="q-label">ENGINEERING CHALLENGE</div>
        <div className="q-text">What would an intelligent machine actually need?</div>
        <div className="q-hint">Think before we reveal the answer.</div>
      </div>
      <button className="reveal-btn" onClick={() => setRevealed(v => !v)}>{revealed ? 'HIDE SYSTEM' : 'REVEAL THE SYSTEM'}</button>
    </div>
    <div className="robot-zone">
      <div className="robot-silhouette"><div className="robot-head"><div className="eye eye-l"/><div className="eye eye-r"/></div><div className="robot-body"><div className="core-glow"/></div><div className="robot-arm arm-l"/><div className="robot-arm arm-r"/></div>
      {revealed && <div className="system-orbit">
        {['SENSORS','COMPUTE','MEMORY','COMMUNICATION','ACTUATORS','POWER'].map((x, i) => <div key={x} className="system-node" style={{ '--i': i }}>{x}</div>)}
      </div>}
    </div>
  </section>;
}

function SystemScene() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.system-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: .8 });
      gsap.fromTo('.block', { opacity: 0, y: 20, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .55, stagger: .08, delay: .25, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <section ref={ref} className="scene system-scene">
    <div className="system-title"><div className="eyebrow">THE MENTAL MODEL</div><h2>EVERY INTELLIGENT SYSTEM<br /><span>HAS A BODY.</span></h2></div>
    <div className="architecture">
      <div className="block sensors">SENSORS<small>Camera • IMU • Mic</small></div>
      <div className="block compute">COMPUTE<small>CPU • GPU • NPU • FPGA</small></div>
      <div className="block memory">MEMORY<small>Cache • RAM • HBM • Storage</small></div>
      <div className="block interconnect">INTERCONNECT<small>Data movement</small></div>
      <div className="block io">I/O + COMMUNICATION<small>USB • PCIe • Wi-Fi • Ethernet</small></div>
      <div className="block power">POWER + THERMAL<small>Energy • Heat • Cooling</small></div>
      <div className="data-line line-1"/><div className="data-line line-2"/><div className="data-line line-3"/>
    </div>
    <div className="system-footer">The question is no longer <b>“Where is the AI?”</b> — it is <b>“How does the whole system work together?”</b></div>
  </section>;
}

function BlackwellScene() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bw-kicker', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.bw-title', { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, delay: 0.2, ease: 'power4.out' });
      gsap.fromTo('.bw-chip-container', { opacity: 0, y: 40, rotateX: 45 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, delay: 0.4, ease: 'back.out(1.2)' });
      gsap.fromTo('.bw-stat', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.8 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <section ref={ref} className="scene blackwell-scene">
    <div className="bw-header">
      <div className="bw-kicker eyebrow">THE ENGINE</div>
      <h2 className="bw-title">NVIDIA <span>BLACKWELL</span></h2>
    </div>
    <div className="bw-content">
      <div className="bw-stats">
        <div className="bw-stat"><strong>208B</strong><span>TRANSISTORS</span></div>
        <div className="bw-stat"><strong>192GB</strong><span>HBM3e MEMORY</span></div>
        <div className="bw-stat"><strong>8TB/s</strong><span>MEMORY BANDWIDTH</span></div>
        <div className="bw-stat"><strong>1.8TB/s</strong><span>NVLINK CONNECTION</span></div>
      </div>
      <div className="bw-chip-container">
        <div className="bw-chip">
          <div className="bw-die die-left"></div>
          <div className="bw-die die-right"></div>
          <div className="bw-bridge">NV-HBI</div>
        </div>
        <div className="bw-glow"></div>
      </div>
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

function Scene({ scene }) {
  if (scene.type === 'title') return <TitleScene />;
  if (scene.type === 'chitti') return <ChittiScene />;
  if (scene.type === 'blackwell') return <BlackwellScene />;
  if (scene.type === 'nvl72') return <NVL72Scene />;
  return <SystemScene />;
}

function App() {
  const [index, setIndex] = useState(0);
  const [blackout, setBlackout] = useState(false);
  const next = () => setIndex(i => Math.min(i + 1, scenes.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') prev();
      if (e.key.toLowerCase() === 'b') setBlackout(v => !v);
      if (e.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
      if (e.key.toLowerCase() === 'r') setIndex(i => i);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <main className="deck">
    <div className="topbar"><div className="brand">IETE × AI HARDWARE</div><div className="counter">{String(index + 1).padStart(2,'0')} / {String(scenes.length).padStart(2,'0')}</div></div>
    <Scene scene={scenes[index]} />
    <div className="controls"><button onClick={prev} disabled={index===0}><ChevronLeft size={20}/></button><button onClick={next} disabled={index===scenes.length-1}><ChevronRight size={20}/></button><button onClick={() => document.documentElement.requestFullscreen?.()}><Maximize2 size={17}/></button><button onClick={() => setBlackout(v => !v)}><div className="black-dot"/></button></div>
    <div className="progress"><span style={{width: `${((index+1)/scenes.length)*100}%`}} /></div>
    {blackout && <div className="blackout" onClick={() => setBlackout(false)}><div>CLICK / B TO RETURN</div></div>}
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
