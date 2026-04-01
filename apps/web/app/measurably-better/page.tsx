// apps/web/app/measurably-better/page.tsx
// MBT Platform Page — "The Glass Engine"
//
// This page talks to operators, investors, and potential licensees.
// NOT to restaurant owners. DSD handles the consumer pitch.
//
// Voice: Swiss-clean authority. Direct. No fluff.
// Visual: Dark obsidian, gold accents, monospace for technical data.
// Per North Star Manifesto: photography first, technology invisible.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Measurably Better Things — The platform behind independent media companies',
};

const MODULES = [
  {
    name: 'Directory',
    desc: 'AI-powered business listings with review monitoring, competitor watch, and monthly report cards.',
    status: 'Live',
  },
  {
    name: 'Magazine',
    desc: 'Editorial content pipeline. City guides, features, photo essays. AI-assisted drafts, human-edited output.',
    status: 'Live',
  },
  {
    name: 'Radio',
    desc: 'Streaming infrastructure. Show scheduling, playlist management, live session recording and broadcast.',
    status: 'Live',
  },
  {
    name: 'Records',
    desc: 'Artist services. Catalog management, session booking, distribution. Artists keep their masters.',
    status: 'Live',
  },
  {
    name: 'Touring & Events',
    desc: 'Venue booking, ticketing, event management. Show-to-content pipeline built in.',
    status: 'Live',
  },
  {
    name: 'Commerce',
    desc: 'Storefront, payments, subscriptions. Stripe Connect for multi-party revenue splits.',
    status: 'Live',
  },
  {
    name: 'Broadcasting',
    desc: 'Live production via OBS and Icecast. Multi-stream to radio, web, and social simultaneously.',
    status: 'Live',
  },
  {
    name: 'AI Content Pipeline',
    desc: 'Social post generation, editorial spotlights, voice profiles, search optimization. Gemini + Claude.',
    status: 'Live',
  },
  {
    name: 'Analytics',
    desc: 'Monthly report cards, Google review alerts, competitor snapshots, audience metrics.',
    status: 'Building',
  },
];

const PROPERTIES = [
  { name: 'Big Muddy Touring', url: 'https://bigmuddytouring.com', desc: 'The touring circuit' },
  { name: 'Big Muddy Magazine', url: 'https://bigmuddymagazine.com', desc: 'Editorial & city guides' },
  { name: 'Big Muddy Radio', url: 'https://bigmuddyradio.com', desc: 'Streaming & live sessions' },
  { name: 'Big Muddy Entertainment', url: 'https://bigmuddyentertainment.com', desc: 'The umbrella' },
  { name: 'Big Muddy Records', url: 'https://bigmuddyrecords.com', desc: 'Artist services label' },
  { name: 'Deep South Directory', url: 'https://deepsouthdirectory.com', desc: 'Business directory & marketing' },
];

const CORRIDORS = [
  {
    name: 'Music & Hospitality',
    example: 'Big Muddy — Natchez, MS',
    status: 'Running',
    modules: 'All 9 modules active',
  },
  {
    name: 'Northeast Media',
    example: 'Bearsville Media Group — Hudson Valley, NY',
    status: 'Summer 2026',
    modules: 'Directory, Radio, Magazine, Studio',
  },
  {
    name: 'Your Corridor',
    example: 'Austin, Asheville, Savannah — any town with a story',
    status: 'Open',
    modules: 'Choose your modules. We deploy.',
  },
];

export default function MeasurablyBetterPlatformPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <nav style={{
        padding: '1.5rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}>
          MBT
        </span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/measurably-better/technology" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Technology
          </a>
          <a href="/measurably-better/thesis" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Thesis
          </a>
          <a href="https://bigmuddytouring.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            See It Live →
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        padding: '8rem 5% 6rem',
        maxWidth: '900px',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '2rem',
        }}>
          Measurably Better Things
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '2.5rem',
        }}>
          The infrastructure behind
          <br />
          independent media companies.
        </h1>
        <p style={{
          fontSize: '1.15rem',
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          maxWidth: '600px',
          marginBottom: '3rem',
        }}>
          A complete media-hospitality platform — directory, magazine, radio, events, commerce — deployable to any corridor, any industry, any town. One codebase. Unlimited brands.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="https://bigmuddytouring.com" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: 'var(--accent)',
            color: 'var(--bg)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            See it running
          </a>
          <a href="mailto:chase@hillbillydreamsinc.com" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Contact
          </a>
        </div>
      </section>

      {/* ── The Stack ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              Modules
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
              Nine skills. One platform.
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-disabled)', maxWidth: '300px', lineHeight: 1.6 }}>
            Each module works independently or together. Clients activate what they need.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1px',
          backgroundColor: 'var(--border)',
        }}>
          {MODULES.map((mod) => (
            <div key={mod.name} style={{
              padding: '2rem',
              backgroundColor: 'var(--bg)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600 }}>
                  {mod.name}
                </h3>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: mod.status === 'Live' ? 'var(--accent)' : 'var(--text-disabled)',
                  padding: '0.2rem 0.5rem',
                  border: `1px solid ${mod.status === 'Live' ? 'var(--accent)' : 'var(--border-strong)'}`,
                }}>
                  {mod.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proof: Big Muddy ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          Running Implementation
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Big Muddy. 14 domains. One deployment.
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem' }}>
          A music-hospitality ecosystem in Natchez, Mississippi. Hotel, touring circuit, magazine, radio station, record label, business directory — all running on one instance of this platform.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {PROPERTIES.map((prop) => (
            <a key={prop.name} href={prop.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              padding: '1.5rem',
              border: '1px solid var(--border)',
              textDecoration: 'none',
              color: 'var(--text)',
              transition: 'border-color 0.2s',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                {prop.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {prop.desc}
              </p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                letterSpacing: '0.05em',
              }}>
                {prop.url.replace('https://', '')} →
              </span>
            </a>
          ))}
        </div>

        <p style={{
          marginTop: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-disabled)',
          fontStyle: 'italic',
        }}>
          This is one instance. Yours could look completely different.
        </p>
      </section>

      {/* ── The Model ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          Deployable
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
          Same platform. Different industry. Different geography.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {CORRIDORS.map((c, i) => (
            <div key={c.name} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 120px',
              gap: '2rem',
              padding: '1.5rem 0',
              borderBottom: i < CORRIDORS.length - 1 ? '1px solid var(--border)' : 'none',
              alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{c.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.example}</p>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-disabled)' }}>
                {c.modules}
              </p>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'right',
                color: c.status === 'Running' ? 'var(--accent)' : 'var(--text-disabled)',
              }}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Economics ── */}
      <section style={{
        padding: '5rem 5%',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          Economics
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
          Why this works.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {[
            { number: '93%', label: 'Gross margins at scale' },
            { number: '$99', label: 'Entry point for businesses' },
            { number: '1', label: 'Deployment serves unlimited brands' },
            { number: '14', label: 'Live domains from one codebase' },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: '1.5rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, color: 'var(--accent)', marginBottom: '0.5rem', lineHeight: 1 }}>
                {stat.number}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <a href="/measurably-better/thesis" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--accent)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}>
          Read the full thesis →
        </a>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: '3rem 5%',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-disabled)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Built by Hillbilly Dreams Inc · Natchez, Mississippi
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-disabled)', marginTop: '0.25rem' }}>
            Runs on Google Cloud · Vertex AI · Next.js
          </p>
        </div>
        <a href="mailto:chase@hillbillydreamsinc.com" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--accent)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}>
          chase@hillbillydreamsinc.com
        </a>
      </footer>
    </main>
  );
}
