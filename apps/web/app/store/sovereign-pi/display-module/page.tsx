import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Display Module — $99 per screen',
  description:
    'Turn any TV into a Sovereign Pi-driven menu board, social wall, or radio visualizer. Signage Network upsell for hands-off multi-screen.',
};

const USES = [
  {
    title: 'Menu board',
    body: 'Tonight’s specials, prices, and sold-out stamps — synced from the same Pi that runs your AI. Update from your phone between rushes.',
  },
  {
    title: 'Social feed wall',
    body: 'Instagram and Google posts in a calm rotation. Proof you are active without asking customers to pull out their phones.',
  },
  {
    title: 'Radio visualizer',
    body: 'Big Muddy Radio or your house feed, with title art and station ID on the bar TV. Keeps the room on-brand when nobody’s on stage.',
  },
];

export default function DisplayModulePage() {
  return (
    <main style={{ fontFamily: 'var(--font-body, system-ui)', color: 'var(--text, #f0ebe0)', background: 'var(--bg, #0f0f0d)' }}>
      <section style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
          Deep South Directory
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 1rem' }}>
          Display Module
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: 560, lineHeight: 1.65, margin: '0 0 2rem' }}>
          <strong style={{ color: 'var(--accent, #c8943e)' }}>$99 per screen</strong>, one-time. HDMI from your Sovereign Pi (or a satellite player) to any TV. You choose the playlist: menus, social, radio, venue schedule.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link
            href="/store/sovereign-pi/configure"
            style={{ display: 'inline-block', padding: '0.85rem 1.75rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', minHeight: 48, lineHeight: '48px', boxSizing: 'border-box' }}
          >
            Add screens in configure
          </Link>
          <a
            href="/admin/kiosk"
            style={{ display: 'inline-block', padding: '0.85rem 1.75rem', border: '1px solid var(--accent, #c8943e)', color: 'var(--accent, #c8943e)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', minHeight: 48, lineHeight: '48px', boxSizing: 'border-box' }}
          >
            Open Glass kiosk (admin)
          </a>
        </div>
      </section>

      <section style={{ padding: '0 1.5rem 4rem', maxWidth: 900, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: '1.35rem', fontWeight: 700, margin: '2.5rem 0 1.25rem' }}>
          What people run on it
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {USES.map((u) => (
            <div key={u.title} style={{ border: '1px solid var(--border, rgba(200,148,62,0.12))', borderRadius: 8, padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent, #c8943e)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>{u.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.65, lineHeight: 1.6, margin: 0 }}>{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 1.5rem 5rem', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ border: '2px solid var(--accent, #c8943e)', borderRadius: 12, padding: '2rem', background: 'rgba(200,148,62,0.06)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Signage Network — $199/mo</h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.65, margin: '0 0 1.25rem' }}>
            Up to five screens. We load the loops, swap the creative, and keep the hardware map straight. You keep running the floor. Pairs with the same{' '}
            <Link href="/admin/kiosk" style={{ color: 'var(--accent, #c8943e)' }}>
              kiosk / Glass
            </Link>{' '}
            tools the team uses inside HQ — one stack, not five apps.
          </p>
          <a
            href="mailto:hello@deepsouthdirectory.com?subject=Signage%20Network"
            style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}
          >
            Email for Signage Network
          </a>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.75rem', opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Sovereign Pi · Deep South Directory · Natchez, Mississippi
        </p>
      </section>
    </main>
  );
}
