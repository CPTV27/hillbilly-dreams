import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { FadeIn } from '../components/FadeIn';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { THEME } from '../styles/theme';

interface StatCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
  decimals?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  target,
  prefix = '',
  suffix = '',
  label,
  source,
  decimals = 0,
}) => {
  const { width, height } = useVideoConfig();
  const isPortrait = height > width;

  return (
    <AbsoluteFill style={{
      background: THEME.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isPortrait ? 60 : 80,
    }}>
      {/* Eyebrow */}
      <FadeIn startFrame={10} durationFrames={20}>
        <div style={{
          fontFamily: THEME.fontMono,
          fontSize: isPortrait ? 22 : 18,
          color: THEME.accent,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: isPortrait ? 50 : 40,
          textAlign: 'center',
        }}>
          THE NUMBER
        </div>
      </FadeIn>

      {/* Big animated number */}
      <FadeIn startFrame={30} durationFrames={10}>
        <div style={{
          fontFamily: THEME.fontDisplay,
          fontSize: isPortrait ? 120 : 140,
          fontWeight: 800,
          color: THEME.text,
          textAlign: 'center',
          lineHeight: 1,
          marginBottom: isPortrait ? 30 : 24,
        }}>
          <AnimatedNumber
            target={target}
            startFrame={35}
            durationFrames={60}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </div>
      </FadeIn>

      {/* Label */}
      <FadeIn startFrame={80} durationFrames={25} slideUp={15}>
        <div style={{
          fontFamily: THEME.fontBody,
          fontSize: isPortrait ? 32 : 28,
          color: THEME.muted,
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: isPortrait ? 800 : 700,
        }}>
          {label}
        </div>
      </FadeIn>

      {/* Source */}
      <FadeIn startFrame={120} durationFrames={20}>
        <div style={{
          fontFamily: THEME.fontMono,
          fontSize: isPortrait ? 20 : 16,
          color: THEME.disabled,
          textAlign: 'center',
          marginTop: isPortrait ? 60 : 50,
        }}>
          {source}
        </div>
      </FadeIn>

      {/* Brand */}
      <div style={{
        position: 'absolute',
        bottom: isPortrait ? 60 : 40,
        fontFamily: THEME.fontMono,
        fontSize: 16,
        color: THEME.disabled,
        letterSpacing: '0.05em',
      }}>
        outsidereconomics.com
      </div>
    </AbsoluteFill>
  );
};
