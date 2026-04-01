'use client';
// apps/web/app/welcome/wifi/qr/page.tsx
// Printable QR code page for Inn room cards and front desk tablets
// Print this page — it generates a card-sized QR code pointing to the WiFi portal

const PORTAL_URL = 'https://bigmuddytouring.com/welcome/wifi?location=big-muddy-inn';

// Simple QR code as an SVG data URL using a Google Charts API fallback
// In production, replace with a locally generated QR
const QR_IMAGE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(PORTAL_URL)}&format=svg`;

export default function QRCodePage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#fff',
      color: '#0f0f0d',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      {/* Printable Card */}
      <div style={{
        maxWidth: 400,
        width: '100%',
        border: '2px solid #e8e4df',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        background: '#fff',
      }}>
        <p style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#c8943e',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}>
          Natchez, Mississippi
        </p>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          fontFamily: 'var(--font-display, Georgia, serif)',
          margin: '0 0 0.5rem',
          lineHeight: 1.2,
        }}>
          Welcome to<br />The Big Muddy Inn
        </h1>
        <p style={{
          fontSize: '0.85rem',
          color: '#666',
          marginBottom: '1.5rem',
        }}>
          Scan to connect to WiFi
        </p>

        {/* QR Code */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={QR_IMAGE_URL}
          alt={`QR code linking to ${PORTAL_URL}`}
          width={240}
          height={240}
          style={{
            display: 'block',
            margin: '0 auto 1.5rem',
            imageRendering: 'pixelated',
          }}
        />

        <p style={{
          fontSize: '0.75rem',
          color: '#999',
          margin: '0 0 0.25rem',
        }}>
          Network: <strong>BigMuddyInn</strong>
        </p>
        <p style={{
          fontSize: '0.65rem',
          color: '#bbb',
          margin: 0,
        }}>
          Or visit: bigmuddytouring.com/welcome/wifi
        </p>
      </div>

      {/* Print-only footer */}
      <div style={{
        marginTop: '2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.6rem',
          color: '#ccc',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Powered by Measurably Better Things
        </p>
        <button
          onClick={() => window.print()}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 2rem',
            background: '#c8943e',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Print This Card
        </button>
      </div>

      <style>{`
        @media print {
          button { display: none !important; }
          main { padding: 0 !important; min-height: auto !important; }
        }
      `}</style>
    </main>
  );
}
