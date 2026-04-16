import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Tuthill Design — Hudson Valley and Deep South' };

export default function TuthillPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg, #f5f0eb)',
        color: 'var(--text, #1a1613)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
          Tuthill Design
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted, #7a7067)', marginBottom: '2rem' }}>
          Design, real estate media, and creative production. Hudson Valley and the Deep South.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>
          Photography, video, branding for real estate and hospitality. Proven in Woodstock,
          expanding to Natchez.
        </p>
        <a
          href="mailto:hello@tuthilldesign.com"
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
          Get in Touch
        </a>
      </section>
    </main>
  );
}
