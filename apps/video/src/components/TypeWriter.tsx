import React from 'react';
import { useCurrentFrame } from 'remotion';

interface TypeWriterProps {
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  style?: React.CSSProperties;
  cursorColor?: string;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  startFrame = 0,
  charsPerFrame = 0.8,
  style = {},
  cursorColor = '#b54c4c',
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  const visible = text.slice(0, chars);
  const done = chars >= text.length;

  return (
    <span style={style}>
      {visible}
      {!done && (
        <span
          style={{
            color: cursorColor,
            opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
          }}
        >
          |
        </span>
      )}
    </span>
  );
};
