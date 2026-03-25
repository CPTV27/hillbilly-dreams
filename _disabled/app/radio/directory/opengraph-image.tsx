// apps/web/app/radio/directory/opengraph-image.tsx
// OG image for Big Muddy Radio — Directory section

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Big Muddy Radio — On the Route';
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
        {/* Map pin SVG decoration */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '100px',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.2,
          }}
        >
          <svg width="180" height="250" viewBox="0 0 180 250" fill="none">
            {/* Pin body — teardrop shape */}
            <path
              d="M 90 10 C 130 10 160 40 160 80 C 160 130 90 210 90 210 C 90 210 20 130 20 80 C 20 40 50 10 90 10 Z"
              fill="#c8943e"
            />
            {/* Inner circle */}
            <circle cx="90" cy="80" r="28" fill="#0a0f1a" opacity="0.6" />
            {/* Center dot */}
            <circle cx="90" cy="80" r="10" fill="#c8943e" />
            {/* Shadow ellipse at base */}
            <ellipse cx="90" cy="228" rx="28" ry="8" fill="#c8943e" opacity="0.3" />
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
          On the <span style={{ color: '#c8943e' }}>Route</span>
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
          Businesses featured on Big Muddy Radio
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
          bigmuddyradio.com/directory
        </div>
      </div>
    ),
    { ...size }
  );
}
