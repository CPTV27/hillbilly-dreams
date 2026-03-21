import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface AnimatedNumberProps {
  target: number;
  startFrame?: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  startFrame = 0,
  durationFrames = 45,
  prefix = '',
  suffix = '',
  decimals = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const value = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, target],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return <span style={style}>{prefix}{formatted}{suffix}</span>;
};
