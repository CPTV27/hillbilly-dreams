// Public org chart — Tracy & Amy bookmark (#91). No auth.
// Dark / gold, Playfair + Inter, print-friendly. No Tailwind.

import type { Metadata } from 'next';
import Link from 'next/link';
import { TENANTS } from '@/config/tenants';

export const metadata: Metadata = {
  title: 'Organizational Chart | Hillbilly Dreams Inc.',
  description:
    'How Hillbilly Dreams Inc., our brands, partners, and platform connect. Live tenant domains from production config.',
};

const BG = '#0f0f0d';
const GOLD = '#c8943e';
const CARD = '#1a1a18';
const BORDER = '#333';
const MUTED = '#9ca3af';

const BRANDS: Array<{ name: string; desc: string; host: string; href: string }> = [
  {
    name: 'Deep South Directory',
    desc: 'Business marketing platform',
    host: 'deepsouthdirectory.com',
    href: 'https://deepsouthdirectory.com',
  },
  {
    name: 'Big Muddy Touring',
    desc: 'Touring circuit + the Inn',
    host: 'bigmuddytouring.com',
    href: 'https://bigmuddytouring.com',
  },
  {
    name: 'Big Muddy Magazine',
    desc: 'Editorial publication',
    host: 'bigmuddymagazine.com',
    href: 'https://bigmuddymagazine.com',
  },
  {
    name: 'Big Muddy Radio',
    desc: 'Streaming radio',
    host: 'bigmuddyradio.com',
    href: 'https://bigmuddyradio.com',
  },
  {
    name: 'Big Muddy Entertainment',
    desc: 'Record label + promoter',
    host: 'bigmuddyentertainment.com',
    href: 'https://bigmuddyentertainment.com',
  },
  {
    name: 'Big Muddy Records',
    desc: 'Independent label',
    host: 'bigmuddyrecordlabel.com',
    href: 'https://bigmuddyrecordlabel.com',
  },
  {
    name: 'Outsider Economics',
    desc: 'Field manual',
    host: 'outsidereconomics.com',
    href: 'https://outsidereconomics.com',
  },
  {
    name: 'Chase Pierson Photography',
    desc: 'Portfolio + gallery',
    host: 'buycurious.art',
    href: 'https://buycurious.art',
  },
];

export default function OrgChartPage() {
  return (
    <main
      style={{
        backgroundColor: BG,
        color: '#f9fafb',
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: '100vh',
        padding: 'clamp(1.25rem, 4vw, 4rem) clamp(1rem, 4vw, 2rem)',
      }}
    >
      <style>{`
        .oc-display {
          font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
        }
        @media print {
          body, main { background: #fff !important; color: #111 !important; }
          .oc-card { border-color: #ccc !important; background: #fafafa !important; color: #111 !important; }
          .oc-accent { color: #111 !important; }
          .oc-muted { color: #444 !important; }
          .oc-gold-print { color: #111 !important; }
          a { color: #111 !important; text-decoration: underline !important; }
          .tree-line, .tree-fork, .tree-fork::before, .tree-fork::after { background: #333 !important; border-color: #333 !important; }
        }
        .tree-line {
          width: 2px;
          height: 28px;
          background-color: ${GOLD};
          margin: 0 auto;
        }
        .tree-fork {
          border-top: 2px solid ${GOLD};
          width: min(90%, 720px);
          margin: 0 auto;
          position: relative;
        }
        .tree-fork::before,
        .tree-fork::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 18px;
          background-color: ${GOLD};
          top: 0;
        }
        .tree-fork::before { left: 0; }
        .tree-fork::after { right: 0; }
        .oc-card {
          background-color: ${CARD};
          border: 1px solid ${BORDER};
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          min-height: 44px;
        }
        a.oc-card:hover {
          transform: translateY(-2px);
          border-color: ${GOLD};
        }
        .oc-tag {
          background-color: #2a2a26;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          font-size: 0.8rem;
          display: inline-block;
          margin-right: 0.45rem;
          margin-bottom: 0.45rem;
        }
      `}</style>

      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <Link
            href="/hillbilly"
            style={{
              color: GOLD,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 44,
            }}
          >
            ← Hillbilly Dreams Inc.
          </Link>
        </div>

        {/* Holding company */}
        <header style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <h1
            className="oc-display oc-accent oc-gold-print"
            style={{
              color: GOLD,
              fontSize: 'clamp(1.75rem, 5vw, 2.35rem)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              margin: '0 0 0.35rem',
              lineHeight: 1.15,
            }}
          >
            Hillbilly Dreams Inc.
          </h1>
          <p
            className="oc-muted"
            style={{
              color: MUTED,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.8125rem',
              fontWeight: 600,
              margin: 0,
            }}
          >
            (Holding Company)
          </p>
        </header>

        <div className="tree-line" style={{ marginTop: '1.5rem' }} aria-hidden />
        <div className="tree-fork" aria-hidden />

        {/* Leadership */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(0.75rem, 3vw, 1.5rem)',
            flexWrap: 'wrap',
            marginTop: '1.75rem',
          }}
        >
          <div className="oc-card" style={{ minWidth: 'min(100%, 280px)', maxWidth: 340, textAlign: 'left' }}>
            <h3 className="oc-display" style={{ fontSize: '1.2rem', margin: '0 0 0.35rem', fontWeight: 700 }}>
              Chase Pierson
            </h3>
            <p style={{ color: GOLD, fontSize: '0.9rem', margin: '0 0 0.5rem', fontWeight: 600 }}>
              CEO, CTO, Showrunner
            </p>
            <a href="mailto:me@chasepierson.tv" className="oc-muted" style={{ color: MUTED, textDecoration: 'none', fontSize: '0.875rem' }}>
              me@chasepierson.tv
            </a>
          </div>
          <div className="oc-card" style={{ minWidth: 'min(100%, 280px)', maxWidth: 340, textAlign: 'left' }}>
            <h3 className="oc-display" style={{ fontSize: '1.2rem', margin: '0 0 0.35rem', fontWeight: 700 }}>
              Tracy Alderson-Allen
            </h3>
            <p style={{ color: GOLD, fontSize: '0.9rem', margin: '0 0 0.5rem', fontWeight: 600 }}>Finance & Inn Ops</p>
            <span className="oc-tag">Equity partner</span>
          </div>
          <div className="oc-card" style={{ minWidth: 'min(100%, 280px)', maxWidth: 340, textAlign: 'left' }}>
            <h3 className="oc-display" style={{ fontSize: '1.2rem', margin: '0 0 0.35rem', fontWeight: 700 }}>
              Amy Allen
            </h3>
            <p style={{ color: GOLD, fontSize: '0.9rem', margin: '0 0 0.5rem', fontWeight: 600 }}>Inn & Bar Ops</p>
            <span className="oc-tag">Equity partner</span>
          </div>
        </div>

        <div className="tree-line" style={{ marginTop: '2.25rem' }} aria-hidden />
        <div className="tree-fork" style={{ width: 'min(95%, 900px)' }} aria-hidden />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginTop: '1.5rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Brands */}
          <section style={{ flex: '1 1 320px', textAlign: 'left', minWidth: 0 }}>
            <h2
              className="oc-display"
              style={{
                color: GOLD,
                fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: '0.5rem',
                margin: '0 0 1.25rem',
                fontWeight: 700,
              }}
            >
              Brands
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
                gap: '0.85rem',
              }}
            >
              {BRANDS.map((b) => (
                <a
                  key={b.href}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oc-card"
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ fontWeight: 700, fontSize: '1.02rem', color: '#fff', marginBottom: 6 }}>{b.name}</span>
                  <span className="oc-muted" style={{ fontSize: '0.84rem', color: MUTED, lineHeight: 1.45, marginBottom: 8 }}>
                    {b.desc}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: GOLD, fontWeight: 600 }}>{b.host}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Partners + regional + tech */}
          <section style={{ flex: '1 1 300px', textAlign: 'left', minWidth: 0 }}>
            <h2
              className="oc-display"
              style={{
                color: GOLD,
                fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: '0.5rem',
                margin: '0 0 1rem',
                fontWeight: 700,
              }}
            >
              Partner companies
            </h2>
            <p className="oc-muted" style={{ fontSize: '0.82rem', color: MUTED, margin: '0 0 1rem', lineHeight: 1.5 }}>
              Chase is a partner in both.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              <a
                href="https://studiocvideo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="oc-card"
                style={{ textDecoration: 'none' }}
              >
                <span style={{ fontWeight: 700, fontSize: '1.08rem', color: '#fff' }}>Studio C Video</span>
                <span className="oc-muted" style={{ fontSize: '0.85rem', color: MUTED, marginTop: 8, lineHeight: 1.45 }}>
                  Video department at Utopia Studios, Bearsville NY
                </span>
                <span style={{ marginTop: 10, fontSize: '0.8rem', color: GOLD, fontStyle: 'italic' }}>
                  Serves ALL HDI brands
                </span>
                <div style={{ marginTop: 10 }}>
                  <span className="oc-tag">Chase 40%</span>
                  <span className="oc-tag">Elijah Tuttle 30%</span>
                  <span className="oc-tag">Miles 30%</span>
                </div>
              </a>
              <a
                href="https://tuthilldesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="oc-card"
                style={{ textDecoration: 'none' }}
              >
                <span style={{ fontWeight: 700, fontSize: '1.08rem', color: '#fff' }}>Tuthill Design</span>
                <span className="oc-muted" style={{ fontSize: '0.85rem', color: MUTED, marginTop: 8, lineHeight: 1.45 }}>
                  Media services for realtors, architects, designers
                </span>
                <div style={{ marginTop: 10 }}>
                  <span className="oc-tag">Chase 50%</span>
                  <span className="oc-tag">Elijah Tuttle 50%</span>
                </div>
              </a>
            </div>

            <h2
              className="oc-display"
              style={{
                color: GOLD,
                fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: '0.45rem',
                margin: '0 0 0.75rem',
                fontWeight: 700,
              }}
            >
              Regional instances
            </h2>
            <a
              href="https://bearsvillemediagroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="oc-card"
              style={{ textDecoration: 'none', marginBottom: '1.75rem' }}
            >
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>Bearsville Creative</span>
              <span className="oc-muted" style={{ fontSize: '0.85rem', color: MUTED, marginTop: 8, display: 'block', lineHeight: 1.45 }}>
                Northeast node (Woodstock / Bearsville NY)
              </span>
            </a>

            <h2
              className="oc-display"
              style={{
                color: GOLD,
                fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: '0.45rem',
                margin: '0 0 0.75rem',
                fontWeight: 700,
              }}
            >
              Technology
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a
                href="https://measurablybetter.life"
                target="_blank"
                rel="noopener noreferrer"
                className="oc-card"
                style={{ textDecoration: 'none', borderColor: GOLD }}
              >
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: GOLD }}>Measurably Better Things (MBT) ↗</span>
                <span className="oc-muted" style={{ fontSize: '0.85rem', color: MUTED, marginTop: 8, lineHeight: 1.45 }}>
                  The platform everything runs on (B2B only)
                </span>
              </a>
              <div className="oc-card">
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>Measurably Better Life</span>
                <span className="oc-muted" style={{ fontSize: '0.85rem', color: MUTED, marginTop: 8, lineHeight: 1.45 }}>
                  Non-branded individual version
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Live config */}
        <section style={{ marginTop: '2.75rem', textAlign: 'left' }}>
          <h2
            className="oc-display"
            style={{
              color: GOLD,
              fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
              borderBottom: `1px solid ${BORDER}`,
              paddingBottom: '0.5rem',
              margin: '0 0 0.65rem',
              fontWeight: 700,
            }}
          >
            Live tenant registry
          </h2>
          <p className="oc-muted" style={{ fontSize: '0.88rem', color: MUTED, margin: '0 0 1rem', lineHeight: 1.55 }}>
            Domains below mirror <code style={{ color: GOLD }}>apps/web/config/tenants.ts</code> — updates on deploy.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {TENANTS.map((t) => (
              <div key={t.id} className="oc-card" style={{ padding: '1rem 1.2rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.02rem', color: '#fff' }}>{t.name}</div>
                <div className="oc-muted" style={{ fontSize: '0.82rem', marginTop: 6 }}>
                  {t.entity} · {t.location.city}, {t.location.state}
                </div>
                <div className="oc-muted" style={{ fontSize: '0.78rem', marginTop: 8, lineHeight: 1.5 }}>
                  {t.domains.map((d, i) => (
                    <span key={d}>
                      {i > 0 ? ' · ' : ''}
                      <a href={`https://${d}`} style={{ color: GOLD }} target="_blank" rel="noopener noreferrer">
                        {d}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <p
          className="oc-muted"
          style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.88rem', lineHeight: 1.55, color: MUTED }}
        >
          We build local. The value stays local. We grow from within.
        </p>
      </div>
    </main>
  );
}
