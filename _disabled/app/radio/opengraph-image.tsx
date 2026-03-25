// apps/web/app/radio/opengraph-image.tsx
// Homepage OG image for Big Muddy Radio

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Big Muddy Radio — The Sound of the River';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0f1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Waveform decoration — mirrored bars */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: 0.18,
          }}
        >
          {[40, 80, 120, 90, 60, 140, 70, 110, 50, 95, 65, 130].map((h, i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: `${h}px`,
                background: '#c8943e',
                borderRadius: '4px',
              }}
            />
          ))}
        </div>

        {/* Gold accent line */}
        <div
          style={{
            width: '60px',
            height: '4px',
            background: '#c8943e',
            marginBottom: '32px',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#c8943e',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            marginBottom: '20px',
          }}
        >
          Mississippi Music Corridor
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 76,
            fontWeight: 800,
            color: '#f0ece4',
            lineHeight: 1.05,
            marginBottom: '32px',
          }}
        >
          <span>Big Muddy</span>
          <span style={{ color: '#c8943e' }}>Radio</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: '#8a8070',
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
          }}
        >
          The Sound of the River
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            right: 80,
            fontSize: 18,
            color: '#4a4438',
            letterSpacing: '0.05em',
          }}
        >
          bigmuddyradio.com
        </div>
      </div>
    ),
    { ...size }
  );
}
