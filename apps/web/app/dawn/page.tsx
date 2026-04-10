'use client';

import { useEffect } from 'react';

/**
 * /dawn is a branded landing page for Delta Dawn.
 *
 * The actual chat is rendered by the globally-mounted <DeltaDawnWidget />
 * in app/layout.tsx. This page used to have its own duplicated chat UI
 * that called /api/dawn/chat with res.json(), which broke when the API
 * switched to Server-Sent Events streaming — every request would throw
 * in the JSON parser and show "Connection error. Try again."
 *
 * The widget already handles the SSE stream correctly. Rather than
 * duplicate that logic here, this page just tells the widget to open
 * (via a custom event, and via a pathname check inside the widget) and
 * shows a welcoming hero behind it.
 */
export default function DawnPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Dispatch the open event so the global widget pops up immediately.
    // The widget also auto-opens on this pathname, so this is belt +
    // suspenders.
    window.dispatchEvent(new CustomEvent('delta-dawn:open'));
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0a0a08',
        color: '#e8e0d4',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 80px)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: '#c8943e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 800,
          color: '#0a0a08',
          marginBottom: '32px',
          boxShadow: '0 8px 40px rgba(200,148,62,0.25)',
        }}
      >
        DD
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: '0 0 20px',
        }}
      >
        Delta Dawn
      </h1>

      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c8943e',
          margin: '0 0 32px',
        }}
      >
        Big Muddy AI &middot; Natchez, Mississippi
      </p>

      <p
        style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          lineHeight: 1.7,
          color: '#9b9488',
          maxWidth: '640px',
          margin: '0 0 40px',
        }}
      >
        She knows the corridor, the shows, the Inn, the directory, and every
        brand under Hillbilly Dreams. Ask her anything. She&rsquo;s open in the
        chat panel on this page.
      </p>

      <p
        style={{
          fontSize: '0.9rem',
          color: '#6b635a',
          margin: 0,
        }}
      >
        If the chat panel isn&rsquo;t open, tap the <strong style={{ color: '#c8943e' }}>DD</strong>{' '}
        button in the bottom-right corner.
      </p>
    </main>
  );
}
