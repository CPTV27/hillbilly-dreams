'use client';

// apps/web/app/hillbilly/page.tsx
// Hillbilly Dreams Inc. — "Google Wrapper" positioning
// Built on Google Cloud · Gemini · Vertex AI · Firebase
// Style: Google Cloud customer story / case study aesthetic

import { useState, useEffect } from 'react';

const GOOGLE_STACK = [
  { name: 'Cloud Run', color: '#4285F4' },
  { name: 'Firebase', color: '#F57C00' },
  { name: 'Cloud SQL', color: '#0F9D58' },
  { name: 'Vertex AI', color: '#4285F4' },
  { name: 'Gemini', color: '#8E24AA' },
  { name: 'Cloud Storage', color: '#0F9D58' },
  { name: 'BigQuery', color: '#4285F4' },
  { name: 'Pub/Sub', color: '#DB4437' },
];

const STATS = [
  { value: '472K+', label: 'Lines of Code' },
  { value: '8', label: 'Active Brands' },
  { value: '18', label: 'Cities in Network' },
  { value: '20x', label: 'Staff Equivalent' },
];

const PILLARS = [
  {
    icon: '⚙️',
    color: '#4285F4',
    name: 'HDX Platform',
    sub: 'The Business OS',
    desc: 'One platform replacing eight to twelve disconnected tools — sales, billing, projects, client delivery, AI workflows. Built on Google Cloud. Runs any industry vertical.',
    bullets: [
      'Google Cloud Run — serverless, always-on',
      'Vertex AI — intelligent automation',
      'Firebase — real-time data sync',
      'Gemini — AI at every touchpoint',
    ],
  },
  {
    icon: '🎵',
    color: '#0F9D58',
    name: 'Big Muddy Ecosystem',
    sub: 'The Proof of Concept',
    desc: 'An owned-and-operated media company running entirely on HDX. Touring, Magazine, Radio, Records, Art — a micromedia company in a bottle.',
    bullets: [
      'Eighteen cities, five states',
      'Snowbird Circuit on Prevost buses',
      'Big Muddy Records — 100% masters',
      'Rise Up regional talent program',
    ],
  },
  {
    icon: '📐',
    color: '#DB4437',
    name: 'Outsider Economics',
    sub: 'The Mission',
    desc: 'Eighty cents of every dollar earned in the Deep South leaves within 48 hours. We are building the sovereign infrastructure to stop that extraction.',
    bullets: [
      'Deep South Directory — the front door',
      '$450K kept per community coached',
      'Agorist network coordination math',
      'Field-tested extraction defense',
    ],
  },
];

// Google G logo SVG (official colors)
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function HillbillyDreamsPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="hd-page">
      <style>{`
        .hd-page {
          background: #0d1117;
          color: #e6edf3;
          font-family: var(--font-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        .hd-page *, .hd-page *::before, .hd-page *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ── Nav ── */
        .hd-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: 56px;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          border-bottom: 1px solid transparent;
          transition: background 200ms ease, border-color 200ms ease;
        }
        .hd-nav--scrolled {
          background: rgba(13, 17, 23, 0.92);
          backdrop-filter: blur(12px);
          border-color: rgba(255,255,255,0.06);
        }
        .hd-nav__inner {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hd-nav__brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .hd-nav__name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #e6edf3;
          letter-spacing: -0.01em;
        }
        .hd-nav__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          background: rgba(66, 133, 244, 0.12);
          border: 1px solid rgba(66, 133, 244, 0.3);
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #4285F4;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: background 150ms ease;
        }
        .hd-nav__badge:hover { background: rgba(66, 133, 244, 0.2); }

        /* ── Hero ── */
        .hd-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem 4rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .hd-hero__glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(66,133,244,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 10% 80%, rgba(15,157,88,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 90% 70%, rgba(142,36,170,0.05) 0%, transparent 50%);
        }
        .hd-hero__content {
          position: relative;
          z-index: 1;
          max-width: 900px;
        }
        .hd-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          background: rgba(66,133,244,0.08);
          border: 1px solid rgba(66,133,244,0.2);
          border-radius: 20px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(66,133,244,0.9);
          margin-bottom: 2rem;
        }
        .hd-hero__title {
          font-size: clamp(3rem, 9vw, 7rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #e6edf3;
          margin-bottom: 0.2rem;
        }
        .hd-hero__title-accent {
          display: block;
          background: linear-gradient(135deg, #4285F4 0%, #34A853 40%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hd-hero__sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(230,237,243,0.55);
          line-height: 1.7;
          max-width: 600px;
          margin: 1.75rem auto 2.5rem;
        }
        .hd-hero__sub strong {
          color: rgba(230,237,243,0.85);
          font-weight: 600;
        }
        .hd-hero__ctas {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }
        .hd-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.75rem;
          background: #4285F4;
          color: #fff;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: 6px;
          transition: background 150ms ease, transform 150ms ease;
        }
        .hd-btn-primary:hover { background: #3578e5; transform: translateY(-1px); }
        .hd-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.75rem;
          background: transparent;
          color: rgba(230,237,243,0.6);
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          transition: color 150ms ease, border-color 150ms ease;
        }
        .hd-btn-ghost:hover { color: #e6edf3; border-color: rgba(255,255,255,0.2); }

        /* ── Stats ── */
        .hd-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          overflow: hidden;
          max-width: 700px;
          margin: 0 auto;
        }
        .hd-stat {
          padding: 1.5rem 1rem;
          background: #161b22;
          text-align: center;
        }
        .hd-stat__value {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #e6edf3;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .hd-stat__label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(230,237,243,0.3);
        }
        .hd-stat:nth-child(1) .hd-stat__value { color: #4285F4; }
        .hd-stat:nth-child(2) .hd-stat__value { color: #34A853; }
        .hd-stat:nth-child(3) .hd-stat__value { color: #FBBC05; }
        .hd-stat:nth-child(4) .hd-stat__value { color: #EA4335; }

        /* ── Section ── */
        .hd-section {
          padding: 5rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hd-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4285F4;
          margin-bottom: 0.75rem;
        }
        .hd-h2 {
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e6edf3;
          margin-bottom: 1rem;
        }
        .hd-lead {
          font-size: 1rem;
          color: rgba(230,237,243,0.5);
          line-height: 1.75;
          max-width: 560px;
          margin-bottom: 3rem;
        }

        /* ── Google Stack ── */
        .hd-stack-wrap {
          padding: 3rem 1.5rem;
          background: #161b22;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .hd-stack-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.5rem;
        }
        .hd-stack-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(230,237,243,0.3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hd-stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .hd-stack-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.75rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(230,237,243,0.7);
        }
        .hd-stack-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Pillars ── */
        .hd-pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          overflow: hidden;
        }
        .hd-pillar {
          padding: 2rem;
          background: #161b22;
          position: relative;
        }
        .hd-pillar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .hd-pillar:nth-child(1)::before { background: #4285F4; }
        .hd-pillar:nth-child(2)::before { background: #0F9D58; }
        .hd-pillar:nth-child(3)::before { background: #DB4437; }
        .hd-pillar__icon {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .hd-pillar__name {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #e6edf3;
          margin-bottom: 0.2rem;
        }
        .hd-pillar__sub {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(230,237,243,0.3);
          margin-bottom: 1rem;
        }
        .hd-pillar__desc {
          font-size: 0.875rem;
          color: rgba(230,237,243,0.55);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .hd-pillar__bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .hd-pillar__bullets li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(230,237,243,0.5);
        }
        .hd-pillar__bullets li::before {
          content: '→';
          font-size: 0.7rem;
          color: rgba(230,237,243,0.25);
          flex-shrink: 0;
        }

        /* ── Story ── */
        .hd-story-wrap {
          background: #161b22;
          padding: 5rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .hd-story-inner {
          max-width: 680px;
          margin: 0 auto;
        }
        .hd-story-body {
          font-size: 1rem;
          color: rgba(230,237,243,0.6);
          line-height: 1.85;
        }
        .hd-story-body p { margin-bottom: 1.4rem; }
        .hd-story-body em { color: #e6edf3; font-style: italic; }
        .hd-story-quote {
          margin: 2.5rem 0;
          padding: 1.75rem 1.75rem 1.75rem 1.5rem;
          border-left: 3px solid #4285F4;
          background: rgba(66,133,244,0.05);
          border-radius: 0 6px 6px 0;
        }
        .hd-story-quote p {
          font-size: 1.2rem;
          font-weight: 600;
          font-style: italic;
          letter-spacing: -0.01em;
          color: #e6edf3;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        .hd-story-quote cite {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4285F4;
          font-style: normal;
        }
        .hd-story-closer {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #e6edf3 !important;
          line-height: 1.4;
        }

        /* ── Principles ── */
        .hd-principles {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          overflow: hidden;
        }
        .hd-principle {
          padding: 1.75rem;
          background: #161b22;
        }
        .hd-principle__label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4285F4;
          margin-bottom: 0.75rem;
        }
        .hd-principle__text {
          font-size: 0.85rem;
          color: rgba(230,237,243,0.5);
          line-height: 1.75;
        }

        /* ── Footer ── */
        .hd-footer {
          padding: 3rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hd-footer__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding-bottom: 2rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .hd-footer__brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #e6edf3;
        }
        .hd-footer__stack {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(230,237,243,0.3);
        }
        .hd-footer__copy {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(230,237,243,0.2);
        }
        .hd-footer__email {
          color: #4285F4;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: none;
          letter-spacing: 0;
        }
        .hd-footer__email:hover { color: #8ab4f8; }

        @media (max-width: 640px) {
          .hd-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── Nav ── */}
      <nav className={`hd-nav${scrolled ? ' hd-nav--scrolled' : ''}`}>
        <div className="hd-nav__inner">
          <a href="/" className="hd-nav__brand">
            <GoogleG size={22} />
            <span className="hd-nav__name">Hillbilly Dreams</span>
          </a>
          <a
            href="https://cloud.google.com"
            target="_blank"
            rel="noreferrer"
            className="hd-nav__badge"
          >
            <GoogleG size={14} />
            Built on Google Cloud
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hd-hero">
        <div className="hd-hero__glow" aria-hidden="true" />
        <div className="hd-hero__content">
          <div className="hd-hero__eyebrow">
            <GoogleG size={12} />
            A Google Cloud Customer Story · Natchez, Mississippi
          </div>
          <h1 className="hd-hero__title">
            One Engine.
            <span className="hd-hero__title-accent">The New South.</span>
          </h1>
          <p className="hd-hero__sub">
            Someone built an enterprise-grade technology platform in Natchez, Mississippi —
            powered entirely by <strong>Google Cloud</strong>, <strong>Gemini</strong>, and <strong>Vertex AI</strong>.
          </p>
          <div className="hd-hero__ctas">
            <a href="#platform" className="hd-btn-primary">Get the Platform →</a>
            <a href="#story" className="hd-btn-ghost">Read the Story</a>
          </div>
          <div className="hd-stats">
            {STATS.map((s) => (
              <div key={s.label} className="hd-stat">
                <div className="hd-stat__value">{s.value}</div>
                <div className="hd-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Stack ── */}
      <div className="hd-stack-wrap">
        <div className="hd-stack-inner">
          <span className="hd-stack-label">Powered by Google</span>
          <div className="hd-stack-pills">
            {GOOGLE_STACK.map((tech) => (
              <span key={tech.name} className="hd-stack-pill">
                <span className="hd-stack-dot" style={{ background: tech.color }} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Three Pillars ── */}
      <section id="platform" className="hd-section">
        <div className="hd-label">Infrastructure</div>
        <h2 className="hd-h2">Three Pillars. Zero Overhead.</h2>
        <p className="hd-lead">
          Everything a Deep South business needs to operate at enterprise scale —
          built on Google's infrastructure, licensed at SMB price.
        </p>
        <div className="hd-pillars">
          {PILLARS.map((p) => (
            <div key={p.name} className="hd-pillar">
              <div className="hd-pillar__icon">{p.icon}</div>
              <div className="hd-pillar__name">{p.name}</div>
              <div className="hd-pillar__sub">{p.sub}</div>
              <p className="hd-pillar__desc">{p.desc}</p>
              <ul className="hd-pillar__bullets">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ── */}
      <section id="story" className="hd-story-wrap">
        <div className="hd-story-inner">
          <div className="hd-label">The Story</div>
          <h2 className="hd-h2" style={{ marginBottom: '2rem' }}>
            Music, Muddy Water,<br />and Infrastructure.
          </h2>
          <div className="hd-story-body">
            <p>
              It didn&apos;t start as a technology company. It started with a voice, a record, and a live room.
            </p>
            <p>
              The original focus was developing Amy Allen&apos;s music career — performing as <em>Arrie Aslin</em> — and creating memorable live experiences. But independent art needs a runway. We realized the Big Muddy Inn in Natchez could generate the revenue to fund the music, provided we could get it cash-flow positive.
            </p>
            <p>
              Running a hospitality business in the Deep South usually means bleeding money to disconnected, expensive software subscriptions. We couldn&apos;t afford the extraction, so we built our own infrastructure on Google Cloud. We called it <em>HDX</em>. To fund the holding company, we deployed a version called <em>S2PX</em> for 3D scanning and AEC firms. That side of the house quietly pays the bills.
            </p>
            <blockquote className="hd-story-quote">
              <p>
                &ldquo;HDX isn&apos;t the point of the company. HDX is the armor we built to protect the music and buy back our time.&rdquo;
              </p>
              <cite>— Chase Tuthill Pierson, Founder</cite>
            </blockquote>
            <p>
              The Big Muddy ecosystem is the owned-and-operated proof of concept — a micromedia company in a bottle running on Google Cloud. The Inn, the Magazine, the Radio, the Touring circuit, and the Record label. All on one platform.
            </p>
            <p>
              Through <em>Big Muddy Records</em>, artists keep 100% of their masters. Through <em>Rise Up</em>, Arrie Aslin&apos;s Gospel and Blues Band travels the corridor running regional talent searches at every stop. Through <em>Outsider Economics</em>, we coach communities to keep $450,000 in local value from leaving their towns.
            </p>
            <p>
              Right now, eighty cents of every dollar earned in these communities leaves within forty-eight hours. We are building the alternative — on Google infrastructure.
            </p>
            <p className="hd-story-closer">
              We build local. We extract nothing. We grow from within.
            </p>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="hd-section">
        <div className="hd-label">Operating Principles</div>
        <h2 className="hd-h2" style={{ marginBottom: '3rem' }}>The Theory of the Thing</h2>
        <div className="hd-principles">
          {[
            { label: 'Agorism', text: 'The corner store, the juke joint, the regional AEC firm, the independent artist — these are the story. The parallel economy operating outside the extractive mainstream deserves tools built for it.' },
            { label: 'Distributed Networks', text: "Memphis and Clarksdale and Natchez and New Orleans are distinct nodes — each with its own culture, economy, and history. Build for the network. Connect the nodes. Don't flatten them." },
            { label: 'Anti-Fragility', text: "The blues didn't come from comfort. The most enduring exports from this region came from pressure. We build with and for businesses that get stronger under stress." },
            { label: 'Circular Economy', text: "Revenue that stays in the region compounds for the region. The question after every transaction: where does the money go? If it leaves the corridor, we've extracted. If it stays, we've built." },
          ].map((p) => (
            <div key={p.label} className="hd-principle">
              <div className="hd-principle__label">{p.label}</div>
              <p className="hd-principle__text">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="hd-footer">
        <div className="hd-footer__inner">
          <div className="hd-footer__brand">
            <GoogleG size={20} />
            Hillbilly Dreams, Inc.
          </div>
          <div className="hd-footer__stack">
            <GoogleG size={14} />
            Built on Google Cloud · Gemini · Vertex AI · Firebase
          </div>
        </div>
        <div className="hd-footer__copy">
          <span>© 2026 Hillbilly Dreams, Inc. · Natchez, Mississippi</span>
          <a href="mailto:hello@hillbillydreamsinc.com" className="hd-footer__email">
            hello@hillbillydreamsinc.com
          </a>
          <span>Built with independence. Powered by stubbornness.</span>
        </div>
      </footer>
    </div>
  );
}
