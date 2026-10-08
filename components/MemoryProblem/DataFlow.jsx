import React from 'react';

export function DataFlow({
  direction = 'vertical', // 'vertical' or 'horizontal'
  laneCount = 4,
  isActive = true,
  isBottleneck = false
}) {
  const strokeColor = isBottleneck ? '#F59E0B' : '#38BDF8';

  return (
    <div className={`data-flow-connector ${direction} ${isBottleneck ? 'bottleneck-active' : ''}`}>
      <svg
        className="data-flow-svg"
        viewBox={direction === 'vertical' ? '0 0 400 160' : '0 0 160 300'}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="data-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {direction === 'vertical' && (
          <>
            {Array.from({ length: laneCount }).map((_, i) => {
              const xPos = 40 + (i * 320) / (laneCount - 1 || 1);
              return (
                <g key={i}>
                  <line
                    x1={xPos}
                    y1="10"
                    x2={xPos}
                    y2="150"
                    stroke={strokeColor}
                    strokeWidth={isBottleneck ? '2' : '3'}
                    strokeOpacity="0.8"
                  />
                  {isActive && (
                    <circle
                      cx={xPos}
                      cy="80"
                      r={isBottleneck ? '3' : '5'}
                      fill={strokeColor}
                      filter="url(#data-glow)"
                    >
                      <animate
                        attributeName="cy"
                        from="140"
                        to="20"
                        dur={isBottleneck ? '2.2s' : '0.8s'}
                        begin={`${i * 0.15}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}
