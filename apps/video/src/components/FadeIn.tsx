import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface FadeInProps {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
  slideUp?: number; // pixels to slide up from
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  startFrame = 0,
  durationFrames = 20,
  slideUp = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [slideUp, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)`, ...style }}>
      {children}
    </div>
  );
};
