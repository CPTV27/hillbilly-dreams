import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { FadeIn } from '../components/FadeIn';
import { THEME } from '../styles/theme';

interface QuoteCardProps {
  quote: string;
  attribution: string;
  chapterLabel: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, attribution, chapterLabel }) => {
  const { width, height } = useVideoConfig();
  const isPortrait = height > width;
  const lines = quote.split('\n');

  return (
    <AbsoluteFill style={{
      background: THEME.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isPortrait ? 60 : 100,
    }}>
      {/* Chapter label */}
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
          {chapterLabel}
        </div>
      </FadeIn>

      {/* Quote — line by line */}
      <div style={{ textAlign: 'center', marginBottom: isPortrait ? 60 : 50 }}>
        {lines.map((line, i) => (
          <FadeIn key={i} startFrame={30 + i * 25} durationFrames={20} slideUp={20}>
            <div style={{
              fontFamily: THEME.fontDisplay,
              fontSize: isPortrait ? 52 : 60,
              fontWeight: 800,
              color: THEME.text,
              lineHeight: 1.3,
              marginBottom: 8,
            }}>
              {line}
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Attribution */}
      <FadeIn startFrame={30 + lines.length * 25 + 20} durationFrames={20}>
        <div style={{
          fontFamily: THEME.fontBody,
          fontSize: isPortrait ? 24 : 20,
          color: THEME.muted,
          textAlign: 'center',
        }}>
          — {attribution}
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
