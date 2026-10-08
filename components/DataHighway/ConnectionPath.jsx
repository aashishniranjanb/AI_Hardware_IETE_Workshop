import React from 'react';

export function ConnectionPath({
  id = 'path-1',
  d = 'M 0 0 L 100 100',
  lanes = 1,
  color = '#38BDF8',
  width = 3,
  label = '',
  speed = 'fast', // 'fast', 'medium', 'slow'
  isActive = true,
  bidirectional = true
}) {
  const duration = speed === 'fast' ? '0.7s' : speed === 'medium' ? '1.2s' : '2.0s';

  return (
    <g className="dh-connection-group">
      {/* Base solid wire */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeOpacity={isActive ? '0.85' : '0.25'}
        className="dh-wire-base"
      />

      {/* Extra lanes if multi-lane */}
      {lanes > 1 && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={width * lanes * 0.8}
          strokeOpacity="0.15"
          className="dh-wire-glow-strip"
        />
      )}

      {/* Animated data particles along the path */}
      {isActive && (
        <>
          <circle r={width + 2} fill={color} filter="url(#dh-packet-glow)">
            <animateMotion
              path={d}
              dur={duration}
              repeatCount="indefinite"
            />
          </circle>

          {bidirectional && (
            <circle r={width + 1} fill="#F8FAFC" filter="url(#dh-packet-glow)">
              <animateMotion
                path={d}
                dur={duration}
                begin="0.35s"
                keyPoints="1;0"
                keyTimes="0;1"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {lanes >= 4 && (
            <circle r={width + 2} fill="#22D3EE" filter="url(#dh-packet-glow)">
              <animateMotion
                path={d}
                dur={duration}
                begin="0.55s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </>
      )}

      {/* Label tag along path if specified */}
      {label && (
        <text className="dh-path-label" fill={color}>
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
      )}
    </g>
  );
}
