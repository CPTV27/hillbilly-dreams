import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed Farm — local content pipeline',
  description:
    'Feed Farm turns regional stories and Main Street signal into reusable media assets — directory, magazine, and radio without extra headcount.',
};

export default function FeedFarmPage() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--bg, #0f172a)',
        color: 'var(--text, #e2e8f0)',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <p
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--accent, #38bdf8)',
            marginBottom: '0.75rem',
          }}
        >
          Measurably Better · pipeline
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display, var(--font-body))',
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            margin: '0 0 1rem',
            lineHeight: 1.15,
          }}
        >
          Feed Farm
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--text-muted, #94a3b8)', marginBottom: '1.5rem' }}>
          One intake for local stories — events, businesses, and voices — structured so they can flow to the Deep South
          Directory, Big Muddy Magazine, and Big Muddy Radio without duplicating work. Built for operators who cannot afford
          a siloed agency stack.
        </p>
        <section style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}>
            What it replaces
          </h2>
          <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.1rem', lineHeight: 1.7, color: '#cbd5e1' }}>
            <li>Scattered spreadsheets and one-off Canva exports</li>
            <li>Paying twice for the same copy and photos across channels</li>
            <li>Radio spots that never touch the directory listing</li>
          </ul>
        </section>
        <p style={{ marginTop: '2.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          For commercial access and pricing, start with{' '}
          <a href="https://deepsouthdirectory.com" style={{ color: 'var(--accent, #38bdf8)' }}>
            Deep South Directory
          </a>
          . This page is the product story — not a checkout.
        </p>
        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
          We build local. The value stays local. We grow from within.
        </p>
      </div>
    </main>
  );
}
