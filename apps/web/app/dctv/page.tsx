import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hudson Valley public access television',
};

export default function DctvHomePage() {
  return (
    <main id="main" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', maxWidth: 720, margin: '0 auto' }}>
      <p
        style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--dctv-muted, #94a3b8)',
          marginBottom: '0.75rem',
        }}
      >
        Woodstock · Catskills
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display, var(--font-body))',
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          margin: '0 0 1rem',
          color: 'var(--dctv-fg, #f1f5f9)',
        }}
      >
        Local signal. Regional reach.
      </h1>
      <p
        id="about"
        style={{
          fontSize: '1.05rem',
          lineHeight: 1.65,
          color: 'var(--dctv-muted, #cbd5e1)',
          marginBottom: '1.5rem',
        }}
      >
        DCTV is public access television for the Hudson Valley — coverage, training, and community stories. Same sovereign
        stack as the rest of the network; this site is the public face for carriage, volunteers, and underwriting partners.
      </p>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}>
          On air
        </h2>
        <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.1rem', color: '#cbd5e1', lineHeight: 1.7 }}>
          <li>Workshops and field production</li>
          <li>Government and nonprofit coverage</li>
          <li>Regional arts and music segments</li>
        </ul>
      </section>
      <p
        id="contact"
        style={{
          marginTop: '2.5rem',
          fontSize: '0.95rem',
          color: '#94a3b8',
        }}
      >
        For carriage, volunteer orientation, or underwriting:{' '}
        <a href="mailto:studio@studiocvideo.com" style={{ color: 'var(--dctv-accent, #38bdf8)' }}>
          studio@studiocvideo.com
        </a>
      </p>
      <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
        We build local. The value stays local. We grow from within.
      </p>
    </main>
  );
}
