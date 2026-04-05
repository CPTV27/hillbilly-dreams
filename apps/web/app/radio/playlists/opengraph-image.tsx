// apps/web/app/radio/playlists/opengraph-image.tsx
// OG image for Big Muddy Radio — Playlists section

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Big Muddy Radio — Curated Playlists';
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
        {/* Vinyl record decoration */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '80px',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            style={{ opacity: 0.2 }}
          >
            {/* Outer disc */}
            <circle cx="120" cy="120" r="115" fill="#c8943e" />
            {/* Grooves */}
            <circle cx="120" cy="120" r="100" fill="none" stroke="#0a0f1a" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="88" fill="none" stroke="#0a0f1a" strokeWidth="1" />
            <circle cx="120" cy="120" r="76" fill="none" stroke="#0a0f1a" strokeWidth="1" />
            <circle cx="120" cy="120" r="64" fill="none" stroke="#0a0f1a" strokeWidth="1" />
            <circle cx="120" cy="120" r="52" fill="none" stroke="#0a0f1a" strokeWidth="1" />
            {/* Label area */}
            <circle cx="120" cy="120" r="40" fill="#0a0f1a" />
            <circle cx="120" cy="120" r="28" fill="#c8943e" opacity="0.6" />
            {/* Center hole */}
            <circle cx="120" cy="120" r="5" fill="#0a0f1a" />
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
          Curated <span style={{ color: '#c8943e' }}>Playlists</span>
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
          The soundtrack of the Deep South
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
          bigmuddyradio.com/playlists
        </div>
      </div>
    ),
    { ...size }
  );
}
