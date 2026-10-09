import React from 'react';
import { DataNode } from './DataNode';
import { ConnectionPath } from './ConnectionPath';

export function NetworkVisual() {
  return (
    <div className="network-visual-container">
      <div className="network-header-banner">
        <span className="banner-kicker">CLUSTER SCALE DATA FABRIC</span>
        <span className="banner-spec">800 Gb/s OPTICAL RDMA • INFINIBAND / RO-CEv2</span>
      </div>

      <div className="network-topology-row">
        {/* AI Server 01 */}
        <div className="server-rack-pod">
          <div className="rack-title">AI RACK SERVER 01</div>
          <div className="rack-nodes-bay">
            <DataNode type="gpu" label="GPU 01" sublabel="TRAINING RANK 0" color="#38BDF8" icon="gpu" />
            <DataNode type="gpu" label="GPU 02" sublabel="TRAINING RANK 1" color="#60A5FA" icon="gpu" />
          </div>
          <div className="rack-nic-box">
            <span className="nic-tag">800G CONNECT-X NIC</span>
          </div>
        </div>

        {/* Central Spine/Leaf Switch */}
        <div className="network-switch-pod">
          <div className="switch-chassis">
            <div className="switch-status-light" />
            <h4 className="switch-name">QUANTUM-2 INFINIBAND SWITCH</h4>
            <div className="switch-ports-matrix">
              {Array.from({ length: 32 }).map((_, i) => (
                <span key={i} className="switch-port-led" />
              ))}
            </div>
            <div className="switch-bandwidth">64 × 800 Gb/s PORTS (51.2 Tb/s AGGREGATE)</div>
          </div>
        </div>

        {/* AI Server 02 */}
        <div className="server-rack-pod">
          <div className="rack-title">AI RACK SERVER 02</div>
          <div className="rack-nodes-bay">
            <DataNode type="gpu" label="GPU 03" sublabel="TRAINING RANK 2" color="#22D3EE" icon="gpu" />
            <DataNode type="gpu" label="GPU 04" sublabel="TRAINING RANK 3" color="#A855F7" icon="gpu" />
          </div>
          <div className="rack-nic-box">
            <span className="nic-tag">800G CONNECT-X NIC</span>
          </div>
        </div>
      </div>

      {/* SVG connections through switch */}
      <svg className="network-connections-svg" viewBox="0 0 760 180">
        <defs>
          <filter id="dh-packet-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Server 01 -> Switch */}
        <ConnectionPath
          id="net-1"
          d="M 190 90 L 320 90"
          lanes={4}
          color="#A855F7"
          width={4}
          speed="medium"
          isActive={true}
        />

        {/* Switch -> Server 02 */}
        <ConnectionPath
          id="net-2"
          d="M 440 90 L 570 90"
          lanes={4}
          color="#A855F7"
          width={4}
          speed="medium"
          isActive={true}
          delay={1.6} /* starts as the net-1 packet reaches the switch: one end-to-end transfer */
        />
      </svg>
    </div>
  );
}
