import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="256" height="256" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="14" width="5.5" height="8" rx="2" fill="#0ea5e9" opacity="0.6" />
          <rect x="9.5" y="8" width="5.5" height="14" rx="2" fill="#0ea5e9" opacity="0.8" />
          <rect x="17" y="2" width="5.5" height="20" rx="2" fill="#0ea5e9" opacity="1" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
