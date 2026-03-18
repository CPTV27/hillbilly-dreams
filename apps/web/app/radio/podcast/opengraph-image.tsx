// apps/web/app/radio/podcast/opengraph-image.tsx
// OG image for Big Muddy Radio — Podcast section

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Big Muddy Radio — Podcast';
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
        {/* Headphones SVG decoration */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '80px',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.2,
          }}
        >
          <svg width="230" height="220" viewBox="0 0 230 220" fill="none">
            {/* Headband arc */}
            <path
              d="M 30 130 Q 30 20 115 20 Q 200 20 200 130"
              stroke="#c8943e"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* Left ear cup */}
            <rect x="10" y="120" width="44" height="70" rx="20" fill="#c8943e" />
            {/* Right ear cup */}
            <rect x="176" y="120" width="44" height="70" rx="20" fill="#c8943e" />
            {/* Left ear cup inner */}
            <rect x="20" y="130" width="24" height="50" rx="12" fill="#0a0f1a" opacity="0.5" />
            {/* Right ear cup inner */}
            <rect x="186" y="130" width="24" height="50" rx="12" fill="#0a0f1a" opacity="0.5" />
          </svg>
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
          The <span style={{ color: '#c8943e' }}>Podcast</span>
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
          Stories from the Deep South
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
          bigmuddyradio.com/podcast
        </div>
      </div>
    ),
    { ...size }
  );
}
