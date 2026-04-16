import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Studio C Video — Woodstock, NY & Natchez, MS' };

export default function StudioCPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg, #1a1613)',
        color: 'var(--text, #f5f0eb)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
          Studio C Video
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted, #7a7067)', marginBottom: '2rem' }}>
          Production, recording, and media services. Woodstock, NY and Natchez, MS.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
          Video production • Recording sessions • Live streaming • Broadcasting setup • Training
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>Home base: Utopia Studios, Woodstock.</p>
        <a
          href="mailto:studio@studiocvideo.com"
          style={{
            display: 'inline-block',
            padding: '0.8rem 2rem',
            background: 'var(--accent, #C8943E)',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
          }}
        >
          Book a Session
        </a>
      </section>
    </main>
  );
}
