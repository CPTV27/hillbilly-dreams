'use client';

// Next.js route error boundary (must be a Client Component).

import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
        background: 'var(--bg, #0f0f0d)',
        color: 'var(--text, #e8e0d4)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      <div
        style={{
          maxWidth: 520,
          textAlign: 'center',
          borderRadius: 12,
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          border: '1px solid color-mix(in srgb, var(--text) 12%, transparent)',
          background: 'color-mix(in srgb, var(--surface) 45%, transparent)',
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            margin: '0 0 1rem',
          }}
        >
          Something broke
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.35rem, 3.5vw, 1.75rem)',
            fontWeight: 700,
            margin: '0 0 1rem',
            lineHeight: 1.3,
          }}
        >
          This page drifted downstream.
        </h1>
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
          We hit a snag loading this view. You can try again, or head back to solid ground.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              border: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)',
              background: 'transparent',
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
