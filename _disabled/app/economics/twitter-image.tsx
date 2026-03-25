// apps/web/app/economics/twitter-image.tsx
// Twitter card image for Outsider Economics

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Outsider Economics — A Field Manual for Independent Economic Systems';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0e0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#b54c4c',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            marginBottom: 24,
          }}
        >
          A FIELD MANUAL
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 72,
            fontWeight: 800,
            color: '#f5f0e8',
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          <span>Outsider</span>
          <span style={{ color: '#b54c4c' }}>Economics</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#a09888',
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          Coordination math, extraction analysis, and frameworks for building
          sovereign local economies.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            fontSize: 18,
            color: '#666',
            letterSpacing: '0.05em',
          }}
        >
          outsidereconomics.com
        </div>
      </div>
    ),
    { ...size }
  );
}
