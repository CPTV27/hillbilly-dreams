'use client';

import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import type { SovereignPulse } from '@/lib/agent/eventProducer';

function hubOrigin(): string {
  if (typeof window === 'undefined') return '';
  return (process.env.NEXT_PUBLIC_SOVEREIGN_HUB_URL || window.location.origin).replace(/\/$/, '');
}

function formatPulse(p: SovereignPulse): string {
  if (p.kind === 'credit') {
    const sign = p.change >= 0 ? '+' : '';
    return `PULSE · ${p.reason} ${sign}${p.change} credits (balance ${p.balanceAfter})`;
  }
  return `PULSE · New submission · contest ${p.contestId.slice(0, 8)}…`;
}

type Props = {
  slug: string;
  embedUrl: string;
  initialTicker: string[];
  adTitle: string | null;
  adBid: number | null;
};

export default function DisplaySignageClient({ slug, embedUrl, initialTicker, adTitle, adBid }: Props) {
  const [items, setItems] = useState<string[]>(() => initialTicker);

  const tickerText = useMemo(() => {
    const base = items.length ? items : ['Sovereign signage · awaiting lore pulse…'];
    return base.join('   ◆   ');
  }, [items]);

  useEffect(() => {
    const origin = hubOrigin();
    if (!origin) return;
    const socket = io(origin, { transports: ['websocket', 'polling'] });
    socket.emit('join_display', slug);
    socket.on('sovereign_pulse', (p: SovereignPulse) => {
      setItems((prev) => [...prev.slice(-40), formatPulse(p)]);
    });
    return () => {
      socket.emit('leave_display', slug);
      socket.disconnect();
    };
  }, [slug]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#020617',
        color: '#e2e8f0',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        overflow: 'hidden',
      }}
    >
      {embedUrl ? (
        <iframe
          title="YouTube live"
          src={embedUrl}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            pointerEvents: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 30% 20%, #0f172a, #020617)',
            color: '#64748b',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          No YouTube video or channel configured for this display slug.
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'clamp(52px, 8vh, 96px)',
          background: 'linear-gradient(180deg, transparent, rgba(2,6,23,0.92))',
          borderTop: '1px solid rgba(56, 189, 248, 0.35)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            animation: 'sovereign-marquee 90s linear infinite',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.35rem)',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          <span style={{ paddingRight: '4rem' }}>{tickerText}</span>
          <span style={{ paddingRight: '4rem' }}>{tickerText}</span>
        </div>
        <style>{`
          @keyframes sovereign-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {(adTitle || adBid != null) && (
        <div
          style={{
            position: 'absolute',
            top: 'clamp(12px, 2vh, 28px)',
            right: 'clamp(12px, 2vw, 28px)',
            maxWidth: 'min(42vw, 520px)',
            padding: 'clamp(0.65rem, 1.2vw, 1rem) clamp(0.85rem, 1.5vw, 1.25rem)',
            borderRadius: '8px',
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(56, 189, 248, 0.45)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
          }}
        >
          <div
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              marginBottom: '0.35rem',
            }}
          >
            Ad auction · top bid
          </div>
          <div style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', fontWeight: 700, lineHeight: 1.25 }}>
            {adTitle ?? '—'}
          </div>
          {adBid != null && (
            <div style={{ marginTop: '0.4rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              {adBid} credits / impression
            </div>
          )}
        </div>
      )}
    </div>
  );
}
