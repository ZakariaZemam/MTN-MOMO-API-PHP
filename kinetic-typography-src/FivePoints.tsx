import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const GOLD = '#C9A84C';
const WHITE = '#FFFFFF';
const BLACK = '#000000';
const LINES = ['NOT NEEDY', 'MONEY', 'PROBLEM SOLVER', 'REJECTION', 'SELECT'];

export const FivePoints: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "5 POINTS" slams in at frame 0–8 (scale + opacity)
  const titleScale = spring({
    frame,
    fps,
    from: 3.5,
    to: 1,
    config: { damping: 12, stiffness: 280, mass: 0.6 },
  });

  const titleOpacity = interpolate(frame, [0, 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Each line appears with a slam stagger: line i starts at frame 12 + i*8
  const lineSlamFrames = LINES.map((_, i) => 12 + i * 9);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLACK,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Bebas Neue', 'BebasNeue', 'Impact', sans-serif",
      }}
    >
      {/* "5 POINTS" title */}
      <div
        style={{
          color: GOLD,
          fontSize: 180,
          fontWeight: 700,
          letterSpacing: 14,
          lineHeight: 1,
          textAlign: 'center',
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          marginBottom: 28,
          textTransform: 'uppercase',
          textShadow: `0 0 60px ${GOLD}88, 0 6px 0 #7a5c1a`,
          position: 'absolute',
          top: 120,
        }}
      >
        5 POINTS
      </div>

      {/* Five stacked lines */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          position: 'absolute',
          top: 380,
          width: '100%',
        }}
      >
        {LINES.map((line, i) => {
          const startFrame = lineSlamFrames[i];
          const relFrame = frame - startFrame;

          const scale = spring({
            frame: relFrame,
            fps,
            from: 2.6,
            to: 1,
            config: { damping: 14, stiffness: 300, mass: 0.5 },
          });

          const opacity = interpolate(relFrame, [0, 3], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const blur = interpolate(relFrame, [0, 6], [8, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={line}
              style={{
                color: WHITE,
                fontSize: 90,
                fontWeight: 700,
                letterSpacing: 10,
                lineHeight: 1,
                textTransform: 'uppercase',
                opacity,
                transform: `scale(${scale})`,
                filter: `blur(${blur}px)`,
                textShadow: '0 4px 0 rgba(0,0,0,0.5)',
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
