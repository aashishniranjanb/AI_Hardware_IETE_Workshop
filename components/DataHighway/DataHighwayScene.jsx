import React, { useEffect, useRef, useState } from 'react';
import { GlyphIcon, InlineIcon } from '../deck/GlyphIcon';
import { stageEnter } from '../deck/motion';
import { StageNavigator } from '../deck/StageNavigator';
import { useStageNavigation } from '../deck/DeckNavigation';
import gsap from 'gsap';
import { HIGHWAY_STAGES, INTERCONNECT_TIERS } from './dataHighwayData';
import { DataNode } from './DataNode';
import { ConnectionPath } from './ConnectionPath';
import { PcieRoutes } from './PcieRoutes';
import { GPUCluster } from './GPUCluster';
import { NoCVisual } from './NoCVisual';
import { NetworkVisual } from './NetworkVisual';
import './DataHighway.css';

export function DataHighwayScene() {
  const containerRef = useRef(null);
  const [stageIndex, setStageIndex] = useState(0);
  const pcieRef = useRef(null);

  const currentStage = HIGHWAY_STAGES[stageIndex] || HIGHWAY_STAGES[0];

  // GSAP animation triggers on stage changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      stageEnter('.dh-main-viewport');
    }, containerRef);
    return () => ctx.revert();
  }, [stageIndex]);

  useStageNavigation({ stage: stageIndex, setStage: setStageIndex, count: HIGHWAY_STAGES.length });

  return (
    <section ref={containerRef} className="scene data-highway-scene">
      <div className="dh-bg-grid" />

      {/* Header Bar */}
      <header className="dh-header">
        <div>
          <div className="dh-eyebrow">
            <span>● MISSION 05</span>
            <span>•</span>
            <span>{currentStage.kicker}</span>
          </div>
          <h2 className="dh-title">
            HOW DOES <span>ALL THIS DATA MOVE?</span>
          </h2>
          <div className="dh-subtitle">{currentStage.subtitle}</div>
        </div>

        {/* Interactive Stage Pill Indicator */}
        <StageNavigator
          stages={HIGHWAY_STAGES}
          currentStage={stageIndex}
          onStageChange={setStageIndex}
          variant="stacked"
          title="DATA HIGHWAY"
          ariaLabel="Data Highway stages"
        />
      </header>

      {/* Central Viewport */}
      <main className="dh-main-viewport">
        {/* STAGE 0: ENTRY FROM MEMORY (Compute <-> HBM link) */}
        {currentStage.id === 'entry' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <DataNode type="gpu" label="COMPUTE ENGINE" sublabel="AI PROCESSOR" color="#38BDF8" isHighlighted={true} />
            <svg width="400" height="90" viewBox="0 0 400 90">
              <ConnectionPath id="entry-bus" d="M 200 10 L 200 80" lanes={4} color="#38BDF8" width={4} speed="fast" />
            </svg>
            <DataNode type="hbm" label="HBM3e MEMORY" sublabel="3.2 TB/s IN-PACKAGE" color="#60A5FA" icon="memory" />
            <div className="callout-pill accent-cyan" style={{ marginTop: 10 }}>
              <span>▲ RECAP FROM SLIDE 05: DATA MOVES BETWEEN COMPUTE AND MEMORY ▲</span>
            </div>
          </div>
        )}

        {/* STAGE 1: SINGLE DATA LINK */}
        {currentStage.id === 'single_link' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <DataNode type="gpu" label="COMPUTE" sublabel="PROCESSING ENGINE" color="#38BDF8" isHighlighted={true} />
            <svg width="400" height="120" viewBox="0 0 400 120">
              <ConnectionPath id="p-single" d="M 200 10 L 200 110" lanes={1} color="#38BDF8" width={3} speed="slow" />
            </svg>
            <DataNode type="hbm" label="MEMORY" sublabel="DATA STORAGE" color="#60A5FA" icon="memory" />
            <div className="callout-pill" style={{ marginTop: 10 }}>
              <span>AT THE SIMPLEST LEVEL: A SINGLE PHYSICAL CONDUCTIVE TRACE</span>
            </div>
          </div>
        )}

        {/* STAGE 2: MULTIPLE DATA LANES */}
        {currentStage.id === 'data_lanes' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <DataNode type="gpu" label="COMPUTE ENGINE" sublabel="MASSIVE MULTI-THREAD" color="#38BDF8" isHighlighted={true} />
            <svg width="500" height="120" viewBox="0 0 500 120">
              <ConnectionPath id="p-lane-1" d="M 140 10 L 140 110" lanes={1} color="#38BDF8" width={3} speed="fast" />
              <ConnectionPath id="p-lane-2" d="M 180 10 L 180 110" lanes={1} color="#38BDF8" width={3} speed="fast" />
              <ConnectionPath id="p-lane-3" d="M 220 10 L 220 110" lanes={1} color="#38BDF8" width={3} speed="fast" />
              <ConnectionPath id="p-lane-4" d="M 260 10 L 260 110" lanes={1} color="#38BDF8" width={3} speed="fast" />
              <ConnectionPath id="p-lane-5" d="M 300 10 L 300 110" lanes={1} color="#38BDF8" width={3} speed="fast" />
              <ConnectionPath id="p-lane-6" d="M 340 10 L 340 110" lanes={1} color="#38BDF8" width={3} speed="fast" />
            </svg>
            <DataNode type="hbm" label="WIDE MEMORY BUS" sublabel="HBM3e INTERPOSER" color="#60A5FA" icon="memory" isHighlighted={true} />
            <div className="callout-pill accent-cyan" style={{ marginTop: 10 }}>
              <span><InlineIcon glyph="energy" /> MORE PHYSICAL LANES → DIRECT MULTIPLICATION OF BANDWIDTH</span>
            </div>
          </div>
        )}

        {/* STAGE 3: PCIe (SYSTEM-LEVEL INTERCONNECT) */}
        {currentStage.id === 'pcie' && (
          <div className="pcie-stage-container" ref={pcieRef}>
            <PcieRoutes />
            <div className="pcie-root-top">
              <DataNode type="gpu" label="HOST CPU" sublabel="ROOT COMPLEX" color="#38BDF8" icon="cpu" />
              <DataNode type="gpu" label="AI GPU" sublabel="PCIe ADD-IN CARD" color="#60A5FA" icon="gpu" isHighlighted={true} />
            </div>

            <div className="pcie-bus-bar">
              <span className="pcie-bus-title">PCIe GEN 5 / GEN 6 BACKBONE (x16 LANES • 64 - 128 GB/s)</span>
            </div>

            <div className="pcie-devices-row">
              <DataNode type="storage" label="NVMe SSD ARRAY" sublabel="14 GB/s STORAGE" color="#94A3B8" icon="storage" />
              <DataNode type="nic" label="400G NIC ADAPTER" sublabel="NETWORK INTERFACE" color="#22D3EE" icon="network" />
              <DataNode type="accelerator" label="FPGA ACCELERATOR" sublabel="CUSTOM COP" color="#A855F7" icon="fpga" />
            </div>
          </div>
        )}

        {/* STAGE 4: GPU TO GPU (DIRECT ACCELERATOR DEMAND) */}
        {currentStage.id === 'gpu_to_gpu' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <GPUCluster mode="dual" isNVLink={false} />
            <div className="callout-pill accent-amber">
              <span><InlineIcon glyph="warning" /> THROUGH PCIe, PEER ACCELERATORS HIT A BOTTLENECK (~64 GB/s)</span>
            </div>
          </div>
        )}

        {/* STAGE 5: NVLINK (GPU-TO-GPU DEDICATED FABRIC) */}
        {currentStage.id === 'nvlink' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <GPUCluster mode="dual" isNVLink={true} />
            <div className="callout-pill accent-blue">
              <span><InlineIcon glyph="energy" /> NVLINK DELIVERS UP TO 1.8 TB/s DIRECT MEMORY ACCESS BETWEEN GPUS</span>
            </div>
          </div>
        )}

        {/* STAGE 6: MULTI-GPU ACCELERATOR FABRIC (4 GPUS MESH) */}
        {currentStage.id === 'multi_gpu' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <GPUCluster mode="quad" isNVLink={true} />
            <div className="callout-pill accent-purple">
              <span>▲ ALL-TO-ALL MESH: 4 GPUS SHARE A SINGLE UNIFIED MEMORY POOL (384 GB) ▲</span>
            </div>
          </div>
        )}

        {/* STAGE 7: NoC (NETWORK-ON-CHIP) */}
        {currentStage.id === 'noc' && <NoCVisual />}

        {/* STAGE 8: DATA CENTER NETWORK (INFINIBAND / ETHERNET) */}
        {currentStage.id === 'network' && <NetworkVisual />}

        {/* STAGE 9: THREE-LEVEL / 4-TIER COMPARISON VIEW */}
        {currentStage.id === 'three_level_view' && (
          <div className="dh-three-level-view">
            <div className="tiers-table-grid">
              {INTERCONNECT_TIERS.map((tier) => (
                <div key={tier.id} className="tier-column-card" style={{ borderColor: tier.color }}>
                  <div className="tier-icon-circle" style={{ color: tier.color }}>
                    <GlyphIcon glyph={tier.icon} size={18} />
                  </div>
                  <h3 className="tier-tech-title">{tier.name}</h3>
                  <div className="tier-scope-tag" style={{ color: tier.color }}>
                    {tier.scope}
                  </div>

                  <div className="tier-stat-row">
                    <span className="stat-label">BANDWIDTH</span>
                    <span className="stat-val" style={{ color: tier.color }}>
                      {tier.bandwidth}
                    </span>
                  </div>

                  <div className="tier-stat-row">
                    <span className="stat-label">LATENCY</span>
                    <span className="stat-val">{tier.latency}</span>
                  </div>

                  <p className="tier-role-text">{tier.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 10: UNIFIED DATA FABRIC */}
        {currentStage.id === 'data_fabric' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div className="callout-pill accent-cyan" style={{ marginBottom: 10 }}>
              <span>COMPUTE CREATES THE WORK. THE INTERCONNECT MOVES THE DATA.</span>
            </div>
            <GPUCluster mode="quad" isNVLink={true} />
          </div>
        )}

        {/* STAGE 11: THE DATA HIGHWAY METAPHOR */}
        {currentStage.id === 'highway' && (
          <div className="dh-finale-stage">
            <h2 className="finale-headline">
              COMPUTE IS ONLY AS FAST AS <span>THE DATA MOVING TO IT.</span>
            </h2>

            <div className="callout-pill accent-cyan" style={{ fontSize: 13, padding: '10px 24px' }}>
              <span>MORE COMPUTE → DEMANDS PROPORTIONATELY FASTER DATA HIGHWAYS</span>
            </div>

            <GPUCluster mode="quad" isNVLink={true} />
          </div>
        )}

        {/* STAGE 12: BLACKWELL TEASER (WHAT HAPPENS WHEN WE SCALE?) */}
        {currentStage.id === 'blackwell_teaser' && (
          <div className="dh-finale-stage">
            <h2 className="finale-headline">
              WHAT HAPPENS WHEN <span>WE SCALE THIS?</span>
            </h2>

            <div className="blackwell-system-preview-rack">
              <div className="blackwell-header-badge">
                <span><InlineIcon glyph="energy" /> NEXT STAGE: NVIDIA BLACKWELL & GB200 NVL72</span>
              </div>

              <div className="blackwell-scale-stat">
                <div className="scale-pill">
                  COMPUTE: <strong>72 BLACKWELL GPUS</strong>
                </div>
                <div className="scale-pill">
                  INTERCONNECT: <strong>NVLINK 5.0 (1.8 TB/s)</strong>
                </div>
                <div className="scale-pill">
                  FABRIC: <strong>5,184 COPPER CABLES</strong>
                </div>
                <div className="scale-pill">
                  TOTAL BANDWIDTH: <strong>130 TB/s RACK FABRIC</strong>
                </div>
              </div>
            </div>

            <div className="finale-next-action-pill">
              <span>PRESS</span>
              <kbd style={{ background: '#020617', padding: '2px 6px', borderRadius: 4 }}>
                SPACE / →
              </kbd>
              <span>TO ENTER: NVIDIA BLACKWELL</span>
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
