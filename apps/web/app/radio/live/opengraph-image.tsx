// apps/web/app/radio/live/opengraph-image.tsx
// OG image for Big Muddy Radio — Live Sessions section

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Big Muddy Radio — Live Sessions';
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
        {/* Microphone SVG decoration */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '80px',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.18,
          }}
        >
          <svg width="200" height="260" viewBox="0 0 200 260" fill="none">
            {/* Mic body */}
            <rect x="70" y="10" width="60" height="100" rx="30" fill="#c8943e" />
            {/* Mic grille lines */}
            <line x1="70" y1="50" x2="130" y2="50" stroke="#0a0f1a" strokeWidth="2" />
            <line x1="70" y1="65" x2="130" y2="65" stroke="#0a0f1a" strokeWidth="2" />
            <line x1="70" y1="80" x2="130" y2="80" stroke="#0a0f1a" strokeWidth="2" />
            {/* Mic stand arm */}
            <path d="M 50 110 Q 50 145 100 145 Q 150 145 150 110" stroke="#c8943e" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Stand pole */}
            <line x1="100" y1="145" x2="100" y2="220" stroke="#c8943e" strokeWidth="6" strokeLinecap="round" />
            {/* Base */}
            <line x1="60" y1="220" x2="140" y2="220" stroke="#c8943e" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Live indicator dot */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#e05252',
            }}
          />
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#e05252',
              letterSpacing: '0.25em',
              textTransform: 'uppercase' as const,
            }}
          >
            Live
          </div>
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
          Big Muddy Radio
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#f0ece4',
            lineHeight: 1.05,
            marginBottom: '28px',
            maxWidth: '700px',
          }}
        >
          Live <span style={{ color: '#c8943e' }}>Sessions</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#8a8070',
            lineHeight: 1.5,
            maxWidth: '620px',
          }}
        >
          Live music from the corridor
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
          bigmuddyradio.com/live
        </div>
      </div>
    ),
    { ...size }
  );
}
