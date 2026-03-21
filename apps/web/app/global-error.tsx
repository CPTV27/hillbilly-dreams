'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ background: '#1a1816', color: '#e8e0d4', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: 40 }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: '#a89f94', marginBottom: 24 }}>
            {error.digest ? `Error ID: ${error.digest}` : 'An unexpected error occurred.'}
          </p>
          <button
            onClick={reset}
            style={{ background: '#c5a55a', color: '#1a1816', border: 'none', padding: '12px 24px', borderRadius: 4, cursor: 'pointer', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
