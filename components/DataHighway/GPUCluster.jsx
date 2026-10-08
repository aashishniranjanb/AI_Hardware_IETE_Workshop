import React from 'react';
import { DataNode } from './DataNode';
import { ConnectionPath } from './ConnectionPath';

export function GPUCluster({ mode = 'quad', isNVLink = true }) {
  // mode: 'dual' (2 GPUs) or 'quad' (4 GPUs in mesh)
  return (
    <div className="gpu-cluster-container">
      <div className="cluster-interconnect-badge">
        <span className="badge-pulse" />
        <span>
          {isNVLink
            ? 'NVLINK 4.0 ACCELERATOR MESH • 900 GB/s ALL-TO-ALL BANDWIDTH'
            : 'PEER-TO-PEER DIRECT DATA HIGHWAY'}
        </span>
      </div>

      <div className={`gpu-nodes-grid ${mode === 'quad' ? 'grid-quad' : 'grid-dual'}`}>
        {/* GPU 01 */}
        <div className="gpu-unit-pod pod-1">
          <DataNode
            type="gpu"
            label="GPU 01"
            sublabel="PRIMARY COMPUTE"
            badge="ACTIVE"
            color="#38BDF8"
            icon="⚡"
            isHighlighted={true}
          />
          <div className="pod-hbm-sub">
            <span className="hbm-tag">HBM3e (96GB)</span>
            <div className="hbm-link-bar" />
          </div>
        </div>

        {/* GPU 02 */}
        <div className="gpu-unit-pod pod-2">
          <DataNode
            type="gpu"
            label="GPU 02"
            sublabel="PEER ACCELERATOR"
            badge="ACTIVE"
            color="#60A5FA"
            icon="⚡"
            isHighlighted={true}
          />
          <div className="pod-hbm-sub">
            <span className="hbm-tag">HBM3e (96GB)</span>
            <div className="hbm-link-bar" />
          </div>
        </div>

        {/* GPU 03 & 04 if quad */}
        {mode === 'quad' && (
          <>
            <div className="gpu-unit-pod pod-3">
              <DataNode
                type="gpu"
                label="GPU 03"
                sublabel="PEER ACCELERATOR"
                badge="ACTIVE"
                color="#22D3EE"
                icon="⚡"
                isHighlighted={true}
              />
              <div className="pod-hbm-sub">
                <span className="hbm-tag">HBM3e (96GB)</span>
                <div className="hbm-link-bar" />
              </div>
            </div>

            <div className="gpu-unit-pod pod-4">
              <DataNode
                type="gpu"
                label="GPU 04"
                sublabel="PEER ACCELERATOR"
                badge="ACTIVE"
                color="#A855F7"
                icon="⚡"
                isHighlighted={true}
              />
              <div className="pod-hbm-sub">
                <span className="hbm-tag">HBM3e (96GB)</span>
                <div className="hbm-link-bar" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* SVG overlay for NVLink mesh bridges */}
      <svg className="cluster-mesh-svg" viewBox="0 0 680 340">
        <defs>
          <filter id="dh-packet-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal NVLink: GPU 1 <-> GPU 2 */}
        <ConnectionPath
          id="p-1-2"
          d="M 170 80 L 510 80"
          lanes={4}
          color="#60A5FA"
          width={4}
          speed="fast"
          isActive={true}
        />

        {mode === 'quad' && (
          <>
            {/* Horizontal NVLink: GPU 3 <-> GPU 4 */}
            <ConnectionPath
              id="p-3-4"
              d="M 170 260 L 510 260"
              lanes={4}
              color="#60A5FA"
              width={4}
              speed="fast"
              isActive={true}
            />

            {/* Vertical NVLink: GPU 1 <-> GPU 3 */}
            <ConnectionPath
              id="p-1-3"
              d="M 170 80 L 170 260"
              lanes={4}
              color="#38BDF8"
              width={4}
              speed="fast"
              isActive={true}
            />

            {/* Vertical NVLink: GPU 2 <-> GPU 4 */}
            <ConnectionPath
              id="p-2-4"
              d="M 510 80 L 510 260"
              lanes={4}
              color="#38BDF8"
              width={4}
              speed="fast"
              isActive={true}
            />

            {/* Diagonal Cross-Mesh Links: GPU 1 <-> GPU 4 */}
            <ConnectionPath
              id="p-1-4"
              d="M 170 80 L 510 260"
              lanes={2}
              color="#A855F7"
              width={3}
              speed="medium"
              isActive={true}
            />

            {/* Diagonal Cross-Mesh Links: GPU 2 <-> GPU 3 */}
            <ConnectionPath
              id="p-2-3"
              d="M 510 80 L 170 260"
              lanes={2}
              color="#A855F7"
              width={3}
              speed="medium"
              isActive={true}
            />
          </>
        )}
      </svg>
    </div>
  );
}
