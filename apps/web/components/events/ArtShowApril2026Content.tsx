import Link from 'next/link';

/** April 12 multimedia art show — Big Muddy Radio Studio, Natchez. */
export function ArtShowApril2026Content() {
  return (
    <main style={{ fontFamily: 'var(--font-body, system-ui)', color: 'var(--text, #f0ebe0)', background: 'var(--bg, #0f0f0d)', minHeight: '100vh' }}>
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.25rem 4rem' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1rem' }}>
          Big Muddy · April 12, 2026
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 2.75rem)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 1rem' }}>
          Multimedia art night
        </h1>
        <p style={{ fontSize: '1.05rem', opacity: 0.72, lineHeight: 1.65, margin: '0 0 1.5rem' }}>
          Large-format prints, projection, live music — and the <strong style={{ color: 'var(--text, #f0ebe0)' }}>first Sovereign Pi</strong> floor demo. Hosted at the{' '}
          <strong>Big Muddy Radio Studio</strong> in Natchez, Mississippi.
        </p>

        <div style={{ border: '1px solid var(--border, rgba(200,148,62,0.2))', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.88rem', margin: '0 0 0.5rem', opacity: 0.85 }}>
            <strong>When:</strong> Saturday, April 12, 2026 — doors &amp; time TBA
          </p>
          <p style={{ fontSize: '0.88rem', margin: '0 0 0.5rem', opacity: 0.85 }}>
            <strong>Where:</strong> Big Muddy Radio Studio — Natchez, MS
          </p>
          <p style={{ fontSize: '0.88rem', margin: 0, opacity: 0.85 }}>
            <strong>Admission:</strong> Free entry or RSVP — Chase to confirm final flow.
          </p>
        </div>

        <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem' }}>On the floor</h2>
        <ul style={{ fontSize: '0.92rem', opacity: 0.7, lineHeight: 1.7, paddingLeft: '1.2rem', margin: '0 0 2rem' }}>
          <li>Wall prints + projected pieces</li>
          <li>Live set (lineup announced closer to date)</li>
          <li>Sovereign Pi bar-top demo — local AI + signage on a real screen</li>
        </ul>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <a
            href="mailto:listings@hillbillydreamsinc.com?subject=April%2012%20art%20show%20RSVP"
            style={{ display: 'block', textAlign: 'center', padding: '0.9rem 1.25rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', borderRadius: 8, minHeight: 48, lineHeight: '48px', boxSizing: 'border-box' }}
          >
            Email RSVP
          </a>
          <Link href="/store/sovereign-pi" style={{ display: 'block', textAlign: 'center', padding: '0.85rem', color: 'var(--accent, #c8943e)', fontSize: '0.88rem' }}>
            About Sovereign Pi →
          </Link>
        </div>
      </article>
    </main>
  );
}
