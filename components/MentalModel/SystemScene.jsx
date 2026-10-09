import React, { useEffect, useRef, useState } from 'react';
import { useStageNavigation, useSceneExit, useDeckEntry } from '../deck/DeckNavigation';
import { prefersReducedMotion } from '../deck/motion';
import { setHandoff } from '../deck/handoff';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './mental.css';

gsap.registerPlugin(MotionPathPlugin);

const STAGE_LABELS = [
  'empty',
  'intelligence',
  'compute',
  'memory',
  'sensors',
  'interconnect',
  'io',
  'actuators',
  'power',
  'complete',
  'collapse'
];

export function SystemScene() {
  const containerRef = useRef(null);
  const tlRef = useRef(null);
  const entry = useDeckEntry();
  // Coming back from Slide 04 resumes at the final COMPUTE-focus stage.
  const [stage, setStage] = useState(() => (entry.dir === -1 && entry.to < entry.from ? STAGE_LABELS.length - 1 : 0));
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      // Ensure all elements are set to initial state
      gsap.set('.mm-module', { opacity: 0 });
      gsap.set('.mm-path, .mm-arrow, .mm-world-label', { opacity: 0 });
      gsap.set('.mm-message', { opacity: 0 });

      // 0: empty -> 1: intelligence
      tl.addLabel('empty')
        .to('#mod-compute', { opacity: 1, scale: 0.7, duration: 1, ease: 'back.out(1.5)' })
        .addLabel('intelligence')

      // 1 -> 2: compute
      .to('#mod-compute', { scale: 1, duration: 0.8, ease: 'power3.inOut' })
      .to('.intel-lbl', { opacity: 0, duration: 0.2 }, '<')
      .to('.comp-lbl', { opacity: 1, duration: 0.4 }, '>')
      .addLabel('compute')

      // 2 -> 3: memory
      .fromTo('#mod-memory', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to('.path-memory-write, .path-memory-read', { opacity: 1, duration: 0.4 }, '-=0.2')
      .addLabel('memory')

      // 3 -> 4: sensors
      .fromTo('#mod-sensors', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to('.world-top', { opacity: 1, duration: 0.3 }, '<')
      .to('.path-sensors', { opacity: 1, duration: 0.4 }, '-=0.2')
      .addLabel('sensors')

      // 4 -> 5: interconnect
      .fromTo('#mod-interconnect', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to('.path-interconnect', { opacity: 1, duration: 0.4 }, '-=0.2')
      .addLabel('interconnect')

      // 5 -> 6: I/O
      .fromTo('#mod-io', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to('.path-io', { opacity: 1, duration: 0.4 }, '-=0.2')
      .addLabel('io')

      // 6 -> 7: actuators
      .fromTo('#mod-actuators', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to('.world-bottom', { opacity: 1, duration: 0.3 }, '<')
      .to('.path-actuators', { opacity: 1, duration: 0.4 }, '-=0.2')
      .addLabel('actuators')

      // 7 -> 8: power
      .fromTo('#mod-power', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' })
      .to('.path-power', { opacity: 1, duration: 0.5 }, '-=0.2')
      .addLabel('power')

      // 8 -> 9: complete (illumination sequence)
      .to('#mod-sensors', { borderColor: '#38bdf8', duration: 0.2 })
      .to('#mod-compute', { borderColor: '#22d3ee', boxShadow: '0 0 40px rgba(34,211,238,0.3)', duration: 0.2 })
      .to('#mod-memory', { borderColor: '#38bdf8', duration: 0.2 })
      .to('#mod-interconnect', { borderColor: '#60a5fa', duration: 0.2 })
      .to('#mod-io', { borderColor: '#38bdf8', duration: 0.2 })
      .to('#mod-actuators', { borderColor: '#38bdf8', duration: 0.2 })
      .to('#mod-power', { borderColor: '#f59e0b', duration: 0.2 })
      .to('.mm-message', { opacity: 1, duration: 1 })
      .addLabel('complete')

      // 9 -> 10: focus COMPUTE. The system recedes in place (it is still the
      // context we are zooming out of) while COMPUTE brightens and grows.
      .to('.mm-message, .mm-world-label', { opacity: 0, duration: 0.4 })
      .to('.mm-path, .mm-arrow, .mm-particle', { opacity: 0.12, duration: 0.5 }, '<')
      .to('#mod-sensors, #mod-memory, #mod-interconnect, #mod-io, #mod-actuators, #mod-power', { opacity: 0.12, duration: 0.6, ease: 'power2.inOut', stagger: 0.04 }, '<')
      .to('#mod-compute', { scale: 1.35, borderColor: '#27D7FF', boxShadow: '0 0 60px rgba(39,215,255,0.45)', duration: 0.9, ease: 'power3.inOut' }, '<0.15')
      .addLabel('collapse');

      // Setup continuous data particles
      gsap.utils.toArray('.mm-particle').forEach(p => {
        const dur = parseFloat(p.dataset.dur || 2);
        const del = parseFloat(p.dataset.del || 0);
        gsap.to(p, {
          motionPath: {
            path: p.dataset.path,
            align: p.dataset.path,
            alignOrigin: [0.5, 0.5]
          },
          duration: dur,
          delay: del,
          repeat: -1,
          ease: 'none'
        });
      });

    }, containerRef);
    return () => {
      ctx.revert();
      appliedStage.current = null; // timeline is rebuilt on remount (StrictMode)
    };
  }, []);

  // Stage applied to the current timeline (null = timeline freshly built).
  const appliedStage = useRef(null);
  useEffect(() => {
    if (!tlRef.current) return;
    if (appliedStage.current === null) {
      // Fresh timeline (mount, or arriving back from Slide 04 at the final
      // COMPUTE-focus state): jump straight there instead of replaying it.
      if (stage > 0) tlRef.current.seek(STAGE_LABELS[stage]);
    } else {
      tlRef.current.tweenTo(STAGE_LABELS[stage], { ease: 'power2.inOut' });
    }
    appliedStage.current = stage;
  }, [stage]);

  // Continuity bridge 03 → 04: zoom INTO the compute block before handing off.
  const exitTl = useRef(null);
  useEffect(() => () => exitTl.current?.kill(), []);
  useSceneExit((dir, done) => {
    if (dir !== 1 || stage !== STAGE_LABELS.length - 1) return false;
    const root = containerRef.current;
    if (!root) return false;
    const q = gsap.utils.selector(root);
    const reduced = prefersReducedMotion();
    tlRef.current?.progress(1).pause();
    exitTl.current = gsap
      .timeline({ onComplete: done })
      .to(q('.mm-module:not(#mod-compute), .mm-paths-svg, .mm-header'), { opacity: 0, duration: reduced ? 0.15 : 0.35, ease: 'power2.in' }, 0)
      .to(q('#mod-compute'), reduced
        ? { scale: 1.45, duration: 0.2 }
        : { scale: 2.6, boxShadow: '0 0 120px rgba(39,215,255,0.55)', duration: 0.6, ease: 'power2.in' }, 0)
      // Record where COMPUTE ends up so Slide 04's package starts exactly there.
      .call(() => setHandoff('compute', root.querySelector('#mod-compute')))
      // short hand-off frame: a glowing COMPUTE frame, never a blank screen
      .to({}, { duration: reduced ? 0.05 : 0.2 });
    return true;
  });

  useStageNavigation({ stage: stage, setStage: setStage, count: STAGE_LABELS.length });

  // Highlight logic
  const getHighlightClass = (blockName, relations) => {
    if (!hovered) return '';
    if (hovered === blockName || hovered === 'compute' || relations.includes(hovered)) {
      return '';
    }
    return 'dimmed';
  };

  return (
    <section ref={containerRef} className={`scene mental-model-scene ${hovered ? 'has-hover' : ''}`}>
      <div className="mm-bg-grid" />
      
      <div className="mm-header">
        <div className="mm-eyebrow">THE MENTAL MODEL</div>
        <h2 className="mm-title">EVERY INTELLIGENT SYSTEM<br /><span>HAS A BODY.</span></h2>
        
        <div className="mm-message">
          WHERE DOES THE AI RUN?
        </div>
      </div>

      <div className="mm-stage">
        <div className="mm-system-canvas">
          
          <div className="mm-world-label world-top">REAL WORLD</div>
          <div className="mm-world-label world-bottom">REAL WORLD</div>

          <svg className="mm-paths-svg" viewBox="0 0 900 800">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker id="arrow-hs" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
              </marker>
              <marker id="arrow-power" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* SENSORS to COMPUTE */}
            <g className={`path-sensors ${getHighlightClass('sensors', ['compute'])}`}>
              <path id="p-sen" className="mm-path" d="M 450 155 L 450 255" markerEnd="url(#arrow)" />
              <circle className="mm-particle" r="4" data-path="#p-sen" data-dur="1" />
            </g>

            {/* COMPUTE to MEMORY */}
            <g className={`path-memory-write ${getHighlightClass('memory', ['compute'])}`}>
              <path id="p-mem-w" className="mm-path" d="M 310 330 L 198 330 L 198 435" markerEnd="url(#arrow)" />
              <circle className="mm-particle" r="3" data-path="#p-mem-w" data-dur="1.2" />
            </g>

            {/* MEMORY to COMPUTE */}
            <g className={`path-memory-read ${getHighlightClass('memory', ['compute'])}`}>
              <path id="p-mem-r" className="mm-path" d="M 220 440 L 220 350 L 305 350" markerEnd="url(#arrow)" />
              <circle className="mm-particle" r="3" data-path="#p-mem-r" data-dur="1.2" data-del="0.6" />
            </g>

            {/* COMPUTE to INTERCONNECT */}
            <g className={`path-interconnect ${getHighlightClass('interconnect', ['compute'])}`}>
              <path id="p-int" className="mm-path mm-path-high-speed" d="M 590 340 L 702 340 L 702 435" markerEnd="url(#arrow-hs)" />
              <circle className="mm-particle" r="5" data-path="#p-int" data-dur="0.8" />
              <circle className="mm-particle" r="5" data-path="#p-int" data-dur="0.8" data-del="0.2" />
            </g>

            {/* COMPUTE to I/O */}
            <g className={`path-io ${getHighlightClass('io', ['compute'])}`}>
              <path id="p-io" className="mm-path" d="M 450 380 L 450 560" markerEnd="url(#arrow)" />
              <circle className="mm-particle" r="4" data-path="#p-io" data-dur="1.5" />
            </g>

            {/* I/O to ACTUATORS */}
            <g className={`path-actuators ${getHighlightClass('actuators', ['io', 'compute'])}`}>
              <path id="p-act" className="mm-path" d="M 450 635 L 450 680" markerEnd="url(#arrow)" />
              <circle className="mm-particle" r="4" data-path="#p-act" data-dur="0.8" />
            </g>

            {/* POWER to OTHERS */}
            <g className={`path-power ${getHighlightClass('power', ['compute', 'memory', 'io', 'actuators', 'interconnect', 'sensors'])}`}>
              <path id="p-pow-mem" className="mm-path mm-path-power" d="M 198 770 L 198 525" markerEnd="url(#arrow-power)" />
              <circle className="mm-particle mm-particle-power" r="3" data-path="#p-pow-mem" data-dur="1.5" />

              <path id="p-pow-int" className="mm-path mm-path-power" d="M 702 770 L 702 525" markerEnd="url(#arrow-power)" />
              <circle className="mm-particle mm-particle-power" r="3" data-path="#p-pow-int" data-dur="1.5" />

              <path id="p-pow-comp" className="mm-path mm-path-power" d="M 350 770 L 350 385" markerEnd="url(#arrow-power)" />
              <circle className="mm-particle mm-particle-power" r="3" data-path="#p-pow-comp" data-dur="2" />
            </g>
          </svg>

          {/* 1. SENSORS */}
          <div 
            id="mod-sensors" 
            className={`mm-module ${getHighlightClass('sensors', ['compute'])}`}
            onMouseEnter={() => setHovered('sensors')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="mm-mod-title">SENSORS</div>
            <div className="mm-mod-sub">Camera • IMU • LiDAR • Mic</div>
          </div>

          {/* 2. COMPUTE */}
          <div 
            id="mod-compute" 
            className={`mm-module ${getHighlightClass('compute', [])}`}
            onMouseEnter={() => setHovered('compute')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="intel-lbl" style={{ position: 'absolute' }}>
              <div className="mm-mod-title">INTELLIGENCE</div>
            </div>
            <div className="comp-lbl" style={{ opacity: 0, position: 'absolute' }}>
              <div className="mm-mod-title">COMPUTE</div>
              <div className="mm-mod-sub">CPU • GPU • NPU • FPGA</div>
            </div>
          </div>

          {/* 3. MEMORY */}
          <div 
            id="mod-memory" 
            className={`mm-module ${getHighlightClass('memory', ['compute'])}`}
            onMouseEnter={() => setHovered('memory')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="mm-mod-title">MEMORY</div>
            <div className="mm-mod-sub">Cache • RAM • HBM • Storage</div>
          </div>

          {/* 4. INTERCONNECT */}
          <div 
            id="mod-interconnect" 
            className={`mm-module ${getHighlightClass('interconnect', ['compute'])}`}
            onMouseEnter={() => setHovered('interconnect')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="mm-mod-title">INTERCONNECT</div>
            <div className="mm-mod-sub">PCIe • NVLink • NoC • Ethernet</div>
          </div>

          {/* 5. IO + COMMS */}
          <div 
            id="mod-io" 
            className={`mm-module ${getHighlightClass('io', ['compute', 'actuators'])}`}
            onMouseEnter={() => setHovered('io')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="mm-mod-title">I/O + COMMUNICATION</div>
            <div className="mm-mod-sub">Wi-Fi • USB • CAN • Ethernet</div>
          </div>

          {/* 6. ACTUATORS */}
          <div 
            id="mod-actuators" 
            className={`mm-module ${getHighlightClass('actuators', ['io', 'compute'])}`}
            onMouseEnter={() => setHovered('actuators')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="mm-mod-title">ACTUATORS</div>
            <div className="mm-mod-sub">Motors • Servos • Displays</div>
          </div>

          {/* 7. POWER + THERMAL */}
          <div 
            id="mod-power" 
            className={`mm-module ${getHighlightClass('power', ['compute', 'memory', 'interconnect', 'sensors', 'io', 'actuators'])}`}
            onMouseEnter={() => setHovered('power')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="mm-mod-title">POWER + THERMAL</div>
            <div className="mm-mod-sub">Battery • PMIC • Cooling</div>
          </div>

        </div>
      </div>
    </section>
  );
}
