import React from 'react';

export function NVL72RackView() {
  return (
    <div className="bw-rack-container">
      <div className="rack-chassis-frame">
        {/* Rack Header */}
        <div className="rack-crown">
          <span className="rack-model">GB200 NVL72 RACK ENCLOSURE</span>
          <span className="rack-power-tag">120 kW POWER DENSITY • 100% LIQUID-COOLED</span>
        </div>

        {/* Rack Interior Trays */}
        <div className="rack-interior">
          {/* Liquid cooling manifold spine (Left & Right) */}
          <div className="cooling-manifold-pipe left-pipe">
            <span className="manifold-label">COOLING INLET 25°C</span>
          </div>

          <div className="rack-trays-bay">
            <div className="rack-tray-legend">
              <span><i className="legend-swatch compute" /> COMPUTE TRAY ×18 — EACH: 4× BLACKWELL + 2× GRACE CPU</span>
              <span><i className="legend-swatch switch" /> NVLINK SWITCH TRAY ×9 — EACH: 72 NVLINK PORTS • 14.4 TB/s</span>
            </div>
            {/* Top Compute Trays (Trays 1 to 9) */}
            <div className="tray-group compute-group">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rack-tray compute-tray">
                  <div className="tray-front">
                    <span className="tray-led" />
                    <span className="tray-name">COMPUTE TRAY {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="tray-coldplate-indicator" />
                </div>
              ))}
            </div>

            {/* Central NVLink Switch Trays (9 Switch Trays) */}
            <div className="tray-group switch-group">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rack-tray switch-tray">
                  <div className="tray-front">
                    <span className="tray-led switch-led" />
                    <span className="tray-name">NVLINK SWITCH {String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Compute Trays (Trays 10 to 18) */}
            <div className="tray-group compute-group">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rack-tray compute-tray">
                  <div className="tray-front">
                    <span className="tray-led" />
                    <span className="tray-name">COMPUTE TRAY {String(i + 10).padStart(2, '0')}</span>
                  </div>
                  <div className="tray-coldplate-indicator" />
                </div>
              ))}
            </div>
          </div>

          <div className="cooling-manifold-pipe right-pipe">
            <span className="manifold-label">COOLING OUTLET 45°C</span>
          </div>
        </div>

        {/* Rack Base Substation */}
        <div className="rack-base-substation">
          <span className="substation-text">5,184 DIRECT COPPER NVLINK CARTRIDGES ON REAR SPINE</span>
        </div>
      </div>

      <div className="rack-callout-strip">
        <div className="callout-pill accent-cyan">
          <span>72 BLACKWELL GPUS + 36 GRACE CPUS ACT AS ONE SINGLE MASSIVE GPU</span>
        </div>
      </div>
    </div>
  );
}
