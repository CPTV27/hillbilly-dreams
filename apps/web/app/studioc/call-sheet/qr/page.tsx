// apps/web/app/studioc/call-sheet/qr/page.tsx
// QR Code display and print page for Utopia Call Sheet

'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { getSession } from '../sessions';

function QRContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  const session = sessionId ? getSession(sessionId) : null;

  if (!session) {
    return (
      <section
        style={{
          background: 'var(--bg)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-6)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              color: 'var(--text)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Session not found
          </h1>
          <Link
            href="/studioc/call-sheet"
            className="btn btn--outline"
          >
            Back to Call Sheet
          </Link>
        </div>
      </section>
    );
  }

  // Build the check-in URL
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://studiocvideo.com';
  const checkInUrl = `${baseUrl}/studioc/call-sheet/${session.id}`;

  // Google Charts QR Code API — simple, no deps, great for demo
  const qrSize = 300;
  const qrImageUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${encodeURIComponent(checkInUrl)}&choe=UTF-8&chld=M|2`;

  return (
    <>
      {/* ── Screen header (hidden on print) ── */}
      <section
        className="no-print"
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: 'var(--space-16) var(--space-6) var(--space-8)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>
          <Link
            href={`/studioc/call-sheet/${session.id}`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <span style={{ fontSize: 'var(--text-lg)' }}>&larr;</span> Back to Session
          </Link>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: 'var(--tracking-tight)',
              margin: '0 0 var(--space-2)',
            }}
          >
            QR Check-In Code
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            Print this card or display it on a tablet at the studio door.
          </p>
        </div>
      </section>

      {/* ── QR Card (optimized for print) ── */}
      <section
        style={{
          background: 'var(--surface)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-10) var(--space-6)',
        }}
      >
        <div
          id="qr-card"
          style={{
            background: '#0f0f0d',
            border: '2px solid #c9a84c',
            borderRadius: '16px',
            padding: '48px 40px',
            maxWidth: 420,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Studio C logo */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 800,
              color: '#f5f5f0',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}
          >
            Studio <span style={{ color: '#c9a84c' }}>C</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#c9a84c',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              marginBottom: '32px',
            }}
          >
            Utopia Studios · Bearsville, NY
          </div>

          {/* QR Code */}
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '16px',
              display: 'inline-block',
              marginBottom: '24px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrImageUrl}
              alt={`QR code for ${session.band} check-in`}
              width={qrSize}
              height={qrSize}
              style={{ display: 'block' }}
            />
          </div>

          {/* Session info */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              color: '#f5f5f0',
              letterSpacing: '-0.01em',
              marginBottom: '4px',
            }}
          >
            {session.band}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#a0a090',
              fontStyle: 'italic',
              marginBottom: '16px',
            }}
          >
            {session.subtitle}
          </div>

          {/* Date & time */}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#c9a84c',
              fontWeight: 600,
              marginBottom: '4px',
            }}
          >
            {session.date}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#a0a090',
              marginBottom: '24px',
            }}
          >
            {session.time}
          </div>

          {/* Scan instruction */}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 700,
              color: '#c9a84c',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              borderTop: '1px solid #333',
              paddingTop: '16px',
            }}
          >
            Scan to Check In
          </div>

          {/* URL fallback */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#666',
              marginTop: '8px',
              wordBreak: 'break-all' as const,
            }}
          >
            {checkInUrl}
          </div>
        </div>
      </section>

      {/* ── Print button (hidden on print) ── */}
      <section
        className="no-print"
        style={{
          background: 'var(--surface)',
          padding: '0 var(--space-6) var(--space-10)',
          textAlign: 'center',
        }}
      >
        <button
          onClick={() => window.print()}
          className="btn btn--primary"
          style={{
            fontSize: 'var(--text-md)',
            padding: 'var(--space-3) var(--space-8)',
            cursor: 'pointer',
          }}
        >
          Print QR Card
        </button>
      </section>

      {/* ── Print styles ── */}
      <style>{`
        @media print {
          .no-print, nav, footer { display: none !important; }
          body { background: #fff !important; }
          section { padding: 0 !important; background: #fff !important; }
          #qr-card {
            border: 2px solid #c9a84c !important;
            margin: 0 auto !important;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
}

export default function QRPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
          }}
        >
          Loading...
        </div>
      }
    >
      <QRContent />
    </Suspense>
  );
}
