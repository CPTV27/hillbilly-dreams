import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tuthill Spatial Intelligence — one capture, unlimited deliverables',
  description:
    'Photos, video, 360, LiDAR, drone — into BIM, renderings, plans, shopping lists, estimates, VR, and Google AI Studio environments. Studio C in Bearsville, NY.',
};

const INPUTS = ['Photography', 'Video walkthrough', '360 capture', 'LiDAR / depth', 'Drone exterior'];

const OUTPUTS = [
  'BIM-ready geometry',
  'Still renderings',
  'Design plans & drawings',
  'Material shopping lists',
  'Rough order-of-magnitude estimates',
  'VR / WebXR experiences',
  'Google AI Studio–ready environment packs',
];

const TIERS = [
  { name: 'Assessment', range: '$250–500', note: 'Site visit, scope, capture plan — you know what you are buying before we roll trucks.' },
  { name: 'Design package', range: '$1,500–3,000', note: 'Interior refresh, single-room focus, marketing-grade stills + simple VR where it helps.' },
  { name: 'Full spatial build', range: '$3,000–5,000', note: 'Multi-room, drone + LiDAR, deliverables bundle for listings, trades, and investor decks.' },
];

export default function SpatialProductPage() {
  return (
    <main style={{ fontFamily: 'var(--font-body, system-ui)', color: 'var(--text, #f0ebe0)', background: 'var(--bg, #0f0f0d)', minHeight: '100vh' }}>
      <section style={{ padding: '4rem 1.5rem', maxWidth: 920, margin: '0 auto' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1rem' }}>
          Tuthill Design · Studio C Video (Bearsville, NY)
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.08, margin: '0 0 1rem' }}>
          Spatial intelligence
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent, #c8943e)', margin: '0 0 1.25rem' }}>
          One capture, unlimited deliverables.
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.68, lineHeight: 1.65, maxWidth: 620, margin: '0 0 2rem' }}>
          We ingest what is real — walls, light, context — and hand you everything downstream teams fight over: drawings, visuals, counts, immersive previews, and AI-ready scene data. Capture happens in the Hudson Valley at{' '}
          <strong style={{ color: 'var(--text, #f0ebe0)' }}>Studio C / Utopia (Bearsville)</strong>, not Natchez. Big Muddy stays the Southern node; this is the Northeast lens.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a
            href="mailto:chase@chasepierson.tv?subject=Spatial%20—%20new%20job"
            style={{ display: 'inline-block', padding: '0.85rem 1.6rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', minHeight: 48, lineHeight: '48px', boxSizing: 'border-box' }}
          >
            Book a capture
          </a>
          <Link
            href="https://tuthilldesign.com"
            style={{ display: 'inline-block', padding: '0.85rem 1.6rem', border: '1px solid var(--accent, #c8943e)', color: 'var(--accent, #c8943e)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', minHeight: 48, lineHeight: '48px', boxSizing: 'border-box' }}
          >
            Tuthill Design →
          </Link>
        </div>
      </section>

      <section style={{ padding: '0 1.5rem 3rem', maxWidth: 920, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', margin: '2.5rem 0 1rem' }}>Input</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {INPUTS.map((x) => (
            <span key={x} style={{ padding: '0.45rem 0.85rem', border: '1px solid var(--border, rgba(200,148,62,0.2))', borderRadius: 999, fontSize: '0.82rem', opacity: 0.9 }}>
              {x}
            </span>
          ))}
        </div>

        <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', margin: '2rem 0 1rem' }}>Output</h2>
        <ul style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.92rem', lineHeight: 1.75, opacity: 0.75 }}>
          {OUTPUTS.map((o) => (
            <li key={o} style={{ marginBottom: '0.35rem' }}>{o}</li>
          ))}
        </ul>
      </section>

      <section style={{ padding: '0 1.5rem 4rem', maxWidth: 920, margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', margin: '0 0 1.25rem' }}>Pricing bands</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {TIERS.map((t) => (
            <div key={t.name} style={{ border: '1px solid var(--border, rgba(200,148,62,0.15))', borderRadius: 10, padding: '1.35rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', margin: '0 0 0.35rem' }}>{t.name}</p>
              <p style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.75rem' }}>{t.range}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.62, lineHeight: 1.55, margin: 0 }}>{t.note}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.25rem', padding: '1.5rem', borderRadius: 10, background: 'rgba(200,148,62,0.07)', border: '1px solid rgba(200,148,62,0.25)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Realtor Pulse — $500/mo retainer</h3>
          <p style={{ fontSize: '0.88rem', opacity: 0.7, lineHeight: 1.6, margin: 0 }}>
            Rolling capture priority, listing refreshes, and spatial asset updates for brokerages that move volume. Canceled anytime — but built for operators who want the same crew every month.
          </p>
        </div>
      </section>
    </main>
  );
}
