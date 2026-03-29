import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bearsville Media Group — The Hudson Valley\'s Creative Engine',
  description: 'Directory, radio, magazine, and media production for Woodstock and the Hudson Valley. Powered by the same platform running Big Muddy in Natchez.',
};

const SECTIONS = [
  {
    label: 'Directory',
    title: 'Find Local',
    desc: 'Restaurants, studios, shops, venues, and services in the Woodstock area. AI-powered listings with review alerts and monthly reports.',
    cta: 'Get Listed',
    href: '/directory/onboard',
  },
  {
    label: 'Radio',
    title: 'Listen Local',
    desc: 'Bearsville Radio — broadcasting over WiFi across the campus and streaming worldwide. Local music, local voices, local stories.',
    cta: 'Listen',
    href: '/radio/player',
  },
  {
    label: 'Magazine',
    title: 'Read Local',
    desc: 'Long-form editorial about the Hudson Valley creative scene. Studios, makers, restaurants, and the people who keep Woodstock alive.',
    cta: 'Read',
    href: '/magazine',
  },
  {
    label: 'Studio',
    title: 'Create Local',
    desc: 'Recording, video production, and broadcasting from the Bearsville campus. Book a session or hire the crew.',
    cta: 'Book',
    href: '/studio',
  },
];

export default function BearsvillePage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(3rem, 8vw, 6rem) 2rem',
        background: 'linear-gradient(180deg, #1a1510 0%, #0f0f0d 100%)',
      }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B6914', marginBottom: '1.5rem' }}>
          Woodstock &middot; Bearsville &middot; Hudson Valley
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, color: '#f5f0ea', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 1rem', maxWidth: 700 }}>
          Bearsville<br />Media Group
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#8a8074', maxWidth: 500, lineHeight: 1.6, margin: '0 0 2rem' }}>
          The Hudson Valley&apos;s creative engine. Directory, radio, magazine, and media production — all from one platform.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/directory/onboard" style={{ padding: '12px 28px', background: '#8B6914', color: '#0f0f0d', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
            Get Listed
          </a>
          <a href="/radio/player" style={{ padding: '12px 28px', background: 'transparent', color: '#8B6914', border: '1px solid #8B6914', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
            Listen to Radio
          </a>
        </div>
      </section>

      {/* Sections */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {SECTIONS.map(s => (
            <div key={s.label} style={{
              background: '#1a1816',
              border: '1px solid #2a2520',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6914' }}>
                {s.label}
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f5f0ea', margin: 0 }}>{s.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#6a6560', lineHeight: 1.5, margin: 0, flex: 1 }}>{s.desc}</p>
              <a href={s.href} style={{
                display: 'block', textAlign: 'center', padding: '8px 16px',
                background: 'transparent', border: '1px solid #8B6914', borderRadius: 6,
                color: '#8B6914', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none',
              }}>
                {s.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Powered By */}
      <section style={{
        textAlign: 'center',
        padding: '2rem',
        borderTop: '1px solid #2a2520',
        fontSize: '0.75rem',
        color: '#5a5550',
      }}>
        <p style={{ margin: 0 }}>
          Powered by the same platform running{' '}
          <a href="https://bigmuddytouring.com" style={{ color: '#8B6914', textDecoration: 'none' }}>Big Muddy</a>{' '}
          in Natchez, Mississippi.
        </p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.65rem' }}>
          Built on Google Cloud &middot; Vertex AI &middot; One codebase, any town.
        </p>
      </section>
    </>
  );
}
