'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ContestTrackPayload } from '@/lib/contest/scanEntries';

const GLASS = {
  bg: 'rgba(15, 23, 42, 0.72)',
  border: '1px solid rgba(56, 189, 248, 0.22)',
  glow: '0 0 40px rgba(56, 189, 248, 0.08)',
  accent: '#38bdf8',
  muted: '#94a3b8',
  text: '#e2e8f0',
};

type Props = { tracks: ContestTrackPayload[] };

export function ContestGalleryClient({ tracks }: Props) {
  const [activeId, setActiveId] = useState<string | null>(tracks[0]?.id ?? null);
  const active = useMemo(
    () => tracks.find((t) => t.id === activeId) ?? tracks[0] ?? null,
    [tracks, activeId]
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '1.5rem',
        background: 'linear-gradient(160deg, #020617 0%, #0f172a 45%, #020617 100%)',
        color: GLASS.text,
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      <header style={{ marginBottom: '1.75rem', maxWidth: '1200px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.35rem 0', letterSpacing: '-0.02em' }}>
          Design contest · viewing station
        </h1>
        <p style={{ margin: 0, color: GLASS.muted, fontSize: '0.95rem', maxWidth: '52ch' }}>
          Drop images under <code style={{ color: GLASS.accent }}>/public/contest/&lt;track&gt;/</code> and HTML or
          Markdown under <code style={{ color: GLASS.accent }}>/experiments/design-contest/</code>. Refresh to judge
          contenders on the 27&quot; glass.
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {tracks.map((t, i) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => setActiveId(t.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              padding: '1.25rem',
              borderRadius: '14px',
              background: active?.id === t.id ? GLASS.bg : 'rgba(15,23,42,0.45)',
              border: active?.id === t.id ? `1px solid ${GLASS.accent}` : GLASS.border,
              boxShadow: active?.id === t.id ? GLASS.glow : 'none',
              color: 'inherit',
            }}
          >
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: GLASS.muted }}>
              Track
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '0.35rem' }}>{t.title}</div>
            <div style={{ fontSize: '0.8rem', color: GLASS.muted, marginTop: '0.5rem', lineHeight: 1.4 }}>
              {t.subtitle}
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: GLASS.accent }}>
              {t.images.length} image{t.images.length === 1 ? '' : 's'} · {t.snippets.length} snippet
              {t.snippets.length === 1 ? '' : 's'}
              {t.briefExists ? ' · brief ready' : ' · brief pending'}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.section
            key={active.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: '16px',
              border: GLASS.border,
              background: GLASS.bg,
              padding: '1.5rem',
              backdropFilter: 'blur(12px)',
            }}
          >
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>{active.title}</h2>

            {active.images.length === 0 ? (
              <p style={{ color: GLASS.muted, margin: '0 0 1rem 0' }}>No images yet for this track.</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                {active.images.map((img) => (
                  <motion.div
                    key={img.url}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid rgba(148,163,184,0.2)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <div style={{ padding: '0.35rem 0.5rem', fontSize: '0.7rem', color: GLASS.muted }}>{img.name}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {active.snippets.length === 0 ? (
              <p style={{ color: GLASS.muted, margin: 0 }}>No HTML/Markdown snippets in {active.experimentDir} yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {active.snippets.map((s) => (
                  <div
                    key={s.name}
                    style={{
                      borderRadius: '10px',
                      border: '1px solid rgba(148,163,184,0.15)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: GLASS.muted,
                        background: 'rgba(2,6,23,0.6)',
                      }}
                    >
                      {s.name} · {s.kind} · {s.rawLength} chars
                    </div>
                    {s.previewHtml ? (
                      <iframe
                        title={s.name}
                        sandbox="allow-same-origin"
                        style={{ width: '100%', minHeight: '220px', border: 'none', background: '#020617' }}
                        srcDoc={s.previewHtml}
                      />
                    ) : (
                      <div style={{ padding: '1rem', color: GLASS.muted }}>Could not preview this file.</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
