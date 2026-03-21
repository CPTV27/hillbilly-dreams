import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { FadeIn } from '../components/FadeIn';
import { THEME } from '../styles/theme';
import type { VideoStory } from '../data/equations';

// Narrative-driven composition: text beats build to a punchline
// No formulas. No subscripts. Just the story with numbers.

export const EquationReveal: React.FC<{ story: VideoStory }> = ({ story }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const isPortrait = height > width;
  const pad = isPortrait ? 60 : 80;

  // Timing: label → beats → punchline
  const LABEL_START = 10;
  const BEAT_GAP = fps * 2.5; // 2.5 seconds between beats
  const FIRST_BEAT = 50;

  return (
    <AbsoluteFill style={{
      background: THEME.bg,
      padding: pad,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Eyebrow label */}
      <FadeIn startFrame={LABEL_START} durationFrames={20} slideUp={15}>
        <div style={{
          fontFamily: THEME.fontMono,
          fontSize: isPortrait ? 32 : 26,
          fontWeight: 600,
          color: THEME.accent,
          letterSpacing: '0.15em',
          marginBottom: isPortrait ? 50 : 40,
          whiteSpace: 'pre-line',
        }}>
          {story.label}
        </div>
      </FadeIn>

      {/* Story beats — appear sequentially */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {story.beats.map((beat, i) => {
          const beatStart = FIRST_BEAT + i * BEAT_GAP + (beat.delay ?? 0) * i;

          // Fade out previous beats slightly as new ones appear
          const nextBeatStart = FIRST_BEAT + (i + 1) * BEAT_GAP;
          const isOld = i < story.beats.length - 1 && frame > nextBeatStart + 20;
          const dimOpacity = isOld
            ? interpolate(frame, [nextBeatStart, nextBeatStart + 30], [1, 0.3], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              })
            : 1;

          return (
            <FadeIn key={i} startFrame={beatStart} durationFrames={25} slideUp={20}>
              <div style={{
                marginBottom: isPortrait ? 32 : 24,
                opacity: dimOpacity,
                transition: 'opacity 0.3s',
              }}>
                {/* Main beat text */}
                <div style={{
                  fontFamily: THEME.fontBody,
                  fontSize: isPortrait ? 48 : 42,
                  color: THEME.text,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                }}>
                  {beat.text}
                </div>

                {/* Highlighted number/phrase */}
                {beat.highlight && (
                  <div style={{
                    fontFamily: THEME.fontDisplay,
                    fontSize: isPortrait ? 96 : 100,
                    fontWeight: 800,
                    color: THEME.accent,
                    marginTop: 8,
                    lineHeight: 1.1,
                  }}>
                    {beat.highlight}
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Punchline — appears after all beats */}
      {(() => {
        const punchStart = FIRST_BEAT + story.beats.length * BEAT_GAP + 20;
        const punchOpacity = interpolate(
          frame,
          [punchStart, punchStart + 30],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        );
        const punchSlide = interpolate(
          frame,
          [punchStart, punchStart + 30],
          [30, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        );

        // Dim all beats when punchline appears
        const beatsDim = frame > punchStart;

        return (
          <>
            {/* Overlay to dim beats */}
            {beatsDim && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: THEME.bg,
                opacity: interpolate(frame, [punchStart, punchStart + 20], [0, 0.85], {
                  extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                }),
              }} />
            )}

            {/* Punchline text */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: pad,
              opacity: punchOpacity,
              transform: `translateY(${punchSlide}px)`,
            }}>
              <div style={{
                fontFamily: THEME.fontDisplay,
                fontSize: isPortrait ? 68 : 72,
                fontWeight: 800,
                color: THEME.text,
                textAlign: 'center',
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
              }}>
                {story.punchline}
              </div>
            </div>
          </>
        );
      })()}

      {/* Branding watermark */}
      {frame > 30 && (
        <div style={{
          position: 'absolute',
          bottom: pad,
          right: pad,
          fontFamily: THEME.fontMono,
          fontSize: 16,
          color: THEME.disabled,
          letterSpacing: '0.05em',
          zIndex: 10,
        }}>
          outsidereconomics.com
        </div>
      )}
    </AbsoluteFill>
  );
};
