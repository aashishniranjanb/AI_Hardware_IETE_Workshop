import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './chitti.css';
import { useStageNavigation } from '../deck/DeckNavigation';
import { ChittiExplodedView } from './ChittiExplodedView';
import { SubsystemStrip } from './SubsystemStrip';
import { ArrowRight, Boxes, Play, RotateCcw, ScanLine } from 'lucide-react';

/**
 * Mission 01 — What if we built Chitti today?
 * Upgraded into an interactive cinematic engineering workbench.
 * Supports: HERO -> SCAN -> EXPLODED -> DATA FLOW -> REASSEMBLE
 */
export function ChittiScene() {
  const [sceneMode, setSceneMode] = useState('hero'); // 'hero' | 'scan' | 'exploded' | 'data-flow'
  const [selectedSubsystem, setSelectedSubsystem] = useState(null);
  const containerRef = useRef(null);

  // GSAP Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.chitti-cmd-col',
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.chitti-stage',
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.15, ease: 'back.out(1.2)' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Chitti shortcuts E, S, R — dispatched by the deck's single keyboard listener.
  // Chitti has no linear stages, so arrows/space fall through to slide navigation.
  useStageNavigation({
    keys: {
      e: () => {
        setSceneMode((prev) => (prev === 'hero' ? 'exploded' : 'hero'));
        setSelectedSubsystem(null);
      },
      s: () => setSceneMode('scan'),
      r: () => {
        setSceneMode('hero');
        setSelectedSubsystem(null);
      },
    },
  });

  // Primary action button state machine
  const handlePrimaryAction = () => {
    if (sceneMode === 'hero') {
      setSceneMode('scan');
    } else if (sceneMode === 'scan') {
      setSceneMode('exploded');
    } else if (sceneMode === 'exploded') {
      setSceneMode('data-flow');
    } else if (sceneMode === 'data-flow') {
      setSceneMode('hero');
      setSelectedSubsystem(null);
    }
  };

  const getPrimaryButtonLabel = () => {
    switch (sceneMode) {
      case 'hero':
        return 'REVEAL THE SYSTEM';
      case 'scan':
        return 'SCANNING SUBSYSTEMS...';
      case 'exploded':
        return 'START DATA FLOW';
      case 'data-flow':
        return 'REASSEMBLE CHITTI';
      default:
        return 'EXPLODE CHITTI';
    }
  };

  return (
    <section ref={containerRef} className="scene chitti-scene">
      <div className="chitti-workbench">
        {/* Left Command Column */}
        <div className="chitti-cmd-col">
          <div className="chitti-cmd-top">
            <div className="mission-tag">MISSION 01 • ENGINEERING VIEW</div>
            <h2 className="chitti-title">
              WHAT IF WE BUILT<br />
              <span>CHITTI TODAY?</span>
            </h2>

            <div className="challenge-box">
              <div className="challenge-lbl">ENGINEERING CHALLENGE</div>
              <div className="challenge-q">
                What would an intelligent machine actually need?
              </div>
              <div className="challenge-desc">
                Don’t think about the AI alone. Think about the physical body: compute, memory, sensors, power, and thermal management.
              </div>
            </div>

            <div className="chitti-actions">
              <button
                className="btn-primary-explode"
                onClick={handlePrimaryAction}
                disabled={sceneMode === 'scan'}
              >
                <span>{getPrimaryButtonLabel()}</span>
                {sceneMode === 'hero' && <ArrowRight size={16} aria-hidden="true" />}
                {sceneMode === 'exploded' && <Play size={15} aria-hidden="true" />}
                {sceneMode === 'data-flow' && <RotateCcw size={15} aria-hidden="true" />}
              </button>

              <div className="btn-row-secondary">
                <button
                  className="btn-sec"
                  onClick={() => setSceneMode('scan')}
                  title="Run Full System Scan"
                >
                  <ScanLine size={14} aria-hidden="true" /> SCAN [S]
                </button>
                <button
                  className="btn-sec"
                  onClick={() => setSceneMode(sceneMode === 'exploded' ? 'hero' : 'exploded')}
                  title="Toggle 3D Exploded View"
                >
                  <Boxes size={14} aria-hidden="true" /> {sceneMode === 'exploded' ? 'ASSEMBLE' : 'EXPLODE'} [E]
                </button>
                <button
                  className="btn-sec"
                  onClick={() => {
                    setSceneMode('hero');
                    setSelectedSubsystem(null);
                  }}
                  title="Reset to Hero"
                >
                  <RotateCcw size={14} aria-hidden="true" /> RESET [R]
                </button>
              </div>

              <div className="telemetry-indicator">
                <span className="pulse-dot" />
                <span>STATE: {sceneMode.toUpperCase()} // 9/9 SUBSYSTEMS ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Bottom Callout & Shortcuts */}
          <div className="chitti-cmd-bottom">
            <div className="mental-model-hook">
              <strong>CORE WORKSHOP LESSON:</strong>
              “AI is only one part of an intelligent machine. Without Memory, Compute starves. Without Power, it stops. Without Actuators, it is paralyzed.”
            </div>
            <div className="keyboard-hints">
              <span><span className="kbd-badge">E</span> Explode</span>
              <span><span className="kbd-badge">S</span> Scan</span>
              <span><span className="kbd-badge">R</span> Reset</span>
              <span><span className="kbd-badge">Space/→</span> Next</span>
            </div>
          </div>
        </div>

        {/* Center / Right 3D Robot Engineering Stage */}
        <ChittiExplodedView
          sceneMode={sceneMode}
          selectedSubsystem={selectedSubsystem}
          onSelectSubsystem={setSelectedSubsystem}
          onScanComplete={() => setSceneMode('exploded')}
        >
          {/* Bottom Subsystem Navigation Dock */}
          <SubsystemStrip
            selectedSubsystem={selectedSubsystem}
            onSelectSubsystem={setSelectedSubsystem}
          />
        </ChittiExplodedView>
      </div>
    </section>
  );
}
