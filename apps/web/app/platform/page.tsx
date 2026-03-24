'use client';

// apps/web/app/platform/page.tsx
// HDX — Business Operating System · Hillbilly Dreams, Inc.

import { useState, useEffect } from 'react';

export default function PlatformPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* ── Reset & Base ── */
        .hdx-page *,
        .hdx-page *::before,
        .hdx-page *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .hdx-page {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          line-height: var(--leading-normal, 1.6);
          min-height: 100vh;
        }

        /* ── Nav ── */
        .hdx-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 0 var(--space-6, 1.5rem);
          height: 60px;
          display: flex;
          align-items: center;
          transition: background var(--duration-200, 200ms) var(--ease-default, ease),
                      border-color var(--duration-200, 200ms) var(--ease-default, ease),
                      backdrop-filter var(--duration-200, 200ms) var(--ease-default, ease);
          border-bottom: 1px solid transparent;
        }

        .hdx-nav--scrolled {
          background: color-mix(in srgb, var(--bg) 90%, transparent);
          backdrop-filter: blur(12px);
          border-color: var(--border);
        }

        .hdx-nav__inner {
          max-width: 1160px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-6, 1.5rem);
        }

        .hdx-nav__brand {
          display: flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
          text-decoration: none;
        }

        .hdx-nav__mark {
          width: 32px;
          height: 32px;
          background: var(--accent);
          color: var(--bg);
          font-family: var(--font-display);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 700;
          letter-spacing: var(--tracking-wide, 0.05em);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm, 4px);
        }

        .hdx-nav__name {
          font-family: var(--font-display);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 700;
          letter-spacing: var(--tracking-wide, 0.05em);
          color: var(--text);
        }

        .hdx-nav__links {
          display: flex;
          align-items: center;
          gap: var(--space-6, 1.5rem);
        }

        .hdx-nav__links a {
          font-size: var(--text-sm, 0.875rem);
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--duration-150, 150ms) var(--ease-default, ease);
        }

        .hdx-nav__links a:hover {
          color: var(--text);
        }

        .hdx-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2, 0.5rem);
          padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
          font-family: var(--font-body);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 600;
          text-decoration: none;
          border-radius: var(--radius-sm, 4px);
          border: 1px solid transparent;
          cursor: pointer;
          transition: background var(--duration-150, 150ms) var(--ease-default, ease),
                      color var(--duration-150, 150ms) var(--ease-default, ease),
                      border-color var(--duration-150, 150ms) var(--ease-default, ease);
          white-space: nowrap;
        }

        .hdx-btn--primary {
          background: var(--accent);
          color: var(--bg);
        }

        .hdx-btn--primary:hover {
          opacity: 0.88;
        }

        .hdx-btn--outline {
          background: transparent;
          border-color: var(--border);
          color: var(--text);
        }

        .hdx-btn--outline:hover {
          border-color: var(--text-muted);
        }

        .hdx-btn--lg {
          padding: var(--space-3, 0.75rem) var(--space-6, 1.5rem);
          font-size: var(--text-base, 1rem);
        }

        /* ── Section Utility ── */
        .hdx-section {
          padding: var(--space-20, 5rem) var(--space-6, 1.5rem);
        }

        .hdx-container {
          max-width: 1160px;
          margin: 0 auto;
        }

        .hdx-label {
          font-family: var(--font-mono, monospace);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 600;
          letter-spacing: var(--tracking-widest, 0.1em);
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: var(--space-4, 1rem);
        }

        .hdx-heading-xl {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 800;
          line-height: var(--leading-tight, 1.1);
          letter-spacing: var(--tracking-tight, -0.02em);
          color: var(--text);
        }

        .hdx-heading-lg {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          line-height: var(--leading-tight, 1.15);
          letter-spacing: var(--tracking-tight, -0.02em);
          color: var(--text);
        }

        .hdx-heading-md {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 700;
          line-height: var(--leading-snug, 1.3);
          color: var(--text);
        }

        .hdx-body {
          font-size: var(--text-base, 1rem);
          line-height: var(--leading-relaxed, 1.75);
          color: var(--text-muted);
          max-width: 64ch;
        }

        .hdx-body--wide {
          max-width: 80ch;
        }

        /* ── Hero ── */
        .hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: calc(60px + var(--space-20, 5rem)) var(--space-6, 1.5rem) var(--space-20, 5rem);
          position: relative;
          border-bottom: 1px solid var(--border);
        }

        .hero__inner {
          max-width: 1160px;
          margin: 0 auto;
          width: 100%;
        }

        .hero__eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 600;
          letter-spacing: var(--tracking-widest, 0.1em);
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: var(--space-6, 1.5rem);
        }

        .hero__h1 {
          font-family: var(--font-display);
          font-size: clamp(5rem, 16vw, 12rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: var(--tracking-tighter, -0.04em);
          color: var(--text);
          margin-bottom: var(--space-3, 0.75rem);
        }

        .hero__subline {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 3vw, 2rem);
          font-weight: 400;
          letter-spacing: var(--tracking-tight, -0.02em);
          color: var(--text-muted);
          margin-bottom: var(--space-8, 2rem);
        }

        .hero__sub {
          font-size: var(--text-base, 1rem);
          line-height: var(--leading-relaxed, 1.75);
          color: var(--text-muted);
          max-width: 58ch;
          margin-bottom: var(--space-10, 2.5rem);
        }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3, 0.75rem);
        }

        /* ── Problem Section ── */
        .problem {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .problem__header {
          margin-bottom: var(--space-12, 3rem);
        }

        .problem__body {
          font-size: var(--text-base, 1rem);
          line-height: var(--leading-relaxed, 1.75);
          color: var(--text-muted);
          max-width: 64ch;
          margin-top: var(--space-6, 1.5rem);
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--space-3, 0.75rem);
          margin-top: var(--space-10, 2.5rem);
        }

        .tool-card {
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 6px);
          padding: var(--space-4, 1rem) var(--space-5, 1.25rem);
          background: var(--bg);
        }

        .tool-card__index {
          font-family: var(--font-mono, monospace);
          font-size: var(--text-xs, 0.75rem);
          color: var(--accent);
          font-weight: 600;
          margin-bottom: var(--space-2, 0.5rem);
          display: block;
        }

        .tool-card__name {
          font-family: var(--font-display);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 700;
          color: var(--text);
          line-height: var(--leading-snug, 1.3);
        }

        /* ── Platform Section ── */
        .platform-section {
          border-bottom: 1px solid var(--border);
        }

        .platform-section__header {
          margin-bottom: var(--space-12, 3rem);
        }

        .platform-section__analog {
          margin-top: var(--space-6, 1.5rem);
          font-size: var(--text-base, 1rem);
          line-height: var(--leading-relaxed, 1.75);
          color: var(--text-muted);
          max-width: 68ch;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: var(--space-4, 1rem);
          margin-top: var(--space-12, 3rem);
        }

        .feature-block {
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 6px);
          padding: var(--space-6, 1.5rem);
          background: var(--surface);
          transition: border-color var(--duration-150, 150ms) var(--ease-default, ease);
        }

        .feature-block:hover {
          border-color: var(--accent);
        }

        .feature-block__icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm, 4px);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-4, 1rem);
          font-family: var(--font-mono, monospace);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0;
        }

        .feature-block__title {
          font-family: var(--font-display);
          font-size: var(--text-base, 1rem);
          font-weight: 700;
          color: var(--text);
          margin-bottom: var(--space-2, 0.5rem);
        }

        .feature-block__desc {
          font-size: var(--text-sm, 0.875rem);
          line-height: var(--leading-relaxed, 1.75);
          color: var(--text-muted);
        }

        /* ── Deployments Section ── */
        .deployments {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .deployments__header {
          margin-bottom: var(--space-12, 3rem);
        }

        .deploy-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-4, 1rem);
          margin-bottom: var(--space-8, 2rem);
        }

        .deploy-card {
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 6px);
          padding: var(--space-6, 1.5rem);
          background: var(--bg);
        }

        .deploy-card__status {
          display: inline-block;
          font-family: var(--font-mono, monospace);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 700;
          letter-spacing: var(--tracking-wide, 0.05em);
          text-transform: uppercase;
          padding: 2px var(--space-2, 0.5rem);
          border-radius: var(--radius-sm, 4px);
          margin-bottom: var(--space-4, 1rem);
        }

        .deploy-card__status--live {
          background: color-mix(in srgb, #4ade80 15%, transparent);
          color: #4ade80;
        }

        .deploy-card__status--phase3 {
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          color: var(--accent);
        }

        .deploy-card__name {
          font-family: var(--font-display);
          font-size: var(--text-xl, 1.25rem);
          font-weight: 800;
          color: var(--text);
          margin-bottom: var(--space-1, 0.25rem);
          letter-spacing: var(--tracking-tight, -0.02em);
        }

        .deploy-card__vertical {
          font-size: var(--text-sm, 0.875rem);
          color: var(--text-muted);
          margin-bottom: var(--space-4, 1rem);
        }

        .deploy-card__desc {
          font-size: var(--text-sm, 0.875rem);
          line-height: var(--leading-relaxed, 1.75);
          color: var(--text-muted);
        }

        .coming-row {
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 6px);
          padding: var(--space-4, 1rem) var(--space-6, 1.5rem);
          background: var(--bg);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-4, 1rem);
        }

        .coming-row__label {
          font-family: var(--font-mono, monospace);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 700;
          letter-spacing: var(--tracking-wide, 0.05em);
          text-transform: uppercase;
          color: var(--text-muted);
          margin-right: var(--space-2, 0.5rem);
        }

        .coming-row__items {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3, 0.75rem);
        }

        .coming-tag {
          font-size: var(--text-sm, 0.875rem);
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm, 4px);
          padding: 2px var(--space-3, 0.75rem);
        }

        /* ── Showroom Section ── */
        .showroom {
          border-bottom: 1px solid var(--border);
        }

        .showroom__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-16, 4rem);
          align-items: start;
        }

        .showroom__link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2, 0.5rem);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          margin-top: var(--space-8, 2rem);
          transition: gap var(--duration-150, 150ms) var(--ease-default, ease);
        }

        .showroom__link:hover {
          gap: var(--space-3, 0.75rem);
        }

        .showroom__aside {
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 6px);
          padding: var(--space-8, 2rem);
          background: var(--surface);
          align-self: center;
        }

        .showroom__aside-label {
          font-family: var(--font-mono, monospace);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 700;
          letter-spacing: var(--tracking-wide, 0.05em);
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: var(--space-4, 1rem);
        }

        .showroom__streams {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3, 0.75rem);
        }

        .showroom__streams li {
          font-size: var(--text-sm, 0.875rem);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
        }

        .showroom__streams li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* ── Licensing CTA ── */
        .licensing {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          text-align: center;
        }

        .licensing__inner {
          max-width: 680px;
          margin: 0 auto;
        }

        .licensing__body {
          font-size: var(--text-base, 1rem);
          line-height: var(--leading-relaxed, 1.75);
          color: var(--text-muted);
          margin: var(--space-6, 1.5rem) 0 var(--space-8, 2rem);
        }

        /* ── Footer ── */
        .hdx-footer {
          padding: var(--space-12, 3rem) var(--space-6, 1.5rem);
          border-top: 1px solid var(--border);
        }

        .hdx-footer__inner {
          max-width: 1160px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-2, 0.5rem);
        }

        .hdx-footer__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-4, 1rem);
        }

        .hdx-footer__org {
          font-family: var(--font-display);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 700;
          color: var(--text);
        }

        .hdx-footer__url {
          font-size: var(--text-sm, 0.875rem);
          color: var(--text-muted);
          text-decoration: none;
        }

        .hdx-footer__url:hover {
          color: var(--text);
        }

        .hdx-footer__tagline {
          font-family: var(--font-mono, monospace);
          font-size: var(--text-xs, 0.75rem);
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide, 0.05em);
          margin-top: var(--space-2, 0.5rem);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hdx-nav__links {
            display: none;
          }

          .showroom__inner {
            grid-template-columns: 1fr;
          }

          .hdx-footer__top {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="hdx-page">

        {/* ── NAV ── */}
        <nav
          className={`hdx-nav${scrolled ? ' hdx-nav--scrolled' : ''}`}
          aria-label="HDX platform navigation"
        >
          <div className="hdx-nav__inner">
            <div className="hdx-nav__brand">
              <div className="hdx-nav__mark">HDX</div>
              <span className="hdx-nav__name">HILLBILLY DREAMS, INC.</span>
            </div>
            <div className="hdx-nav__links">
              <a href="#problem">The Problem</a>
              <a href="#platform">Platform</a>
              <a href="#deployments">Deployments</a>
              <a href="#story">Showroom</a>
            </div>
            <a
              href="mailto:hello@hillbillydreamsinc.com"
              className="hdx-btn hdx-btn--primary"
            >
              Request a Demo
            </a>
          </div>
        </nav>

        {/* ── 1. HERO ── */}
        <section className="hero" aria-labelledby="hdx-hero-heading">
          <div className="hero__inner">
            <p className="hero__eyebrow">
              Hillbilly Dreams, Inc. · Technology Platform for the New South
            </p>
            <h1 id="hdx-hero-heading" className="hero__h1">HDX</h1>
            <p className="hero__subline">The Business Operating System.</p>
            <p className="hero__sub">
              One platform replacing eight to twelve disconnected tools. Sales pipeline, billing,
              project management, client delivery, marketing automation — integrated, running on
              Google infrastructure, managed by AI. Built for operators who don't have time to
              run twelve subscriptions.
            </p>
            <div className="hero__actions">
              <a
                href="mailto:hello@hillbillydreamsinc.com"
                className="hdx-btn hdx-btn--primary hdx-btn--lg"
              >
                Request a Demo
              </a>
              <a href="#story" className="hdx-btn hdx-btn--outline hdx-btn--lg">
                Read the Story
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. THE PROBLEM ── */}
        <section
          id="problem"
          className="hdx-section problem"
          aria-labelledby="problem-heading"
        >
          <div className="hdx-container">
            <div className="problem__header">
              <p className="hdx-label">The Problem</p>
              <h2 id="problem-heading" className="hdx-heading-lg">
                Eight Tools. Eight Logins.<br />Eight Monthly Bills. Zero Integration.
              </h2>
              <p className="problem__body">
                The average SMB spends $800–$2,000/month on a disconnected stack. CRM here,
                billing there, project tracker somewhere else, none of it talking. The data lives
                in silos. The work of keeping those silos in sync falls on whoever has the least
                billable work to do that week.
              </p>
            </div>

            <div className="tools-grid" aria-label="Tools replaced by HDX">
              {[
                ['01', 'CRM & Pipeline'],
                ['02', 'Marketing Automation'],
                ['03', 'Billing & Invoicing'],
                ['04', 'Bank Reconciliation'],
                ['05', 'Project Management'],
                ['06', 'Client Portals'],
                ['07', 'Communications'],
                ['08', 'Document Storage'],
              ].map(([index, name]) => (
                <div key={index} className="tool-card">
                  <span className="tool-card__index">{index}</span>
                  <span className="tool-card__name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. WHAT HDX IS ── */}
        <section
          id="platform"
          className="hdx-section platform-section"
          aria-labelledby="platform-heading"
        >
          <div className="hdx-container">
            <div className="platform-section__header">
              <p className="hdx-label">The Platform</p>
              <h2 id="platform-heading" className="hdx-heading-lg">
                One Engine. Every System.
              </h2>
              <p className="platform-section__analog">
                The closest analog in the enterprise world is Oracle NetSuite — a fully
                integrated back office that runs while the business runs in the foreground.
                NetSuite costs $3,000–$5,000/month before implementation. It was not built for
                a six-person company in Natchez, Mississippi trying to grow to twenty. HDX was.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-block">
                <div className="feature-block__icon" aria-hidden="true">AI</div>
                <p className="feature-block__title">AI Operations Layer</p>
                <p className="feature-block__desc">
                  Reads the business in real time, surfaces what needs attention, routes work
                  automatically. Not a chatbot. A system that watches the data and acts on it.
                </p>
              </div>
              <div className="feature-block">
                <div className="feature-block__icon" aria-hidden="true">GCP</div>
                <p className="feature-block__title">Google Infrastructure</p>
                <p className="feature-block__desc">
                  Runs on the same infrastructure that powers Google Workspace — enterprise-grade
                  uptime, security, and scale. You don't manage it. It runs.
                </p>
              </div>
              <div className="feature-block">
                <div className="feature-block__icon" aria-hidden="true">QB</div>
                <p className="feature-block__title">QuickBooks Sync</p>
                <p className="feature-block__desc">
                  Programmatic two-way sync so the books always match the work. No manual exports,
                  no reconciliation weekends, no surprises at quarter-end.
                </p>
              </div>
              <div className="feature-block">
                <div className="feature-block__icon" aria-hidden="true">247</div>
                <p className="feature-block__title">24/7 Monitoring</p>
                <p className="feature-block__desc">
                  Synthetic uptime checks, automated incident escalation, P1 acknowledged in 2
                  hours. The system watches itself so you don't have to.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. DEPLOYMENTS ── */}
        <section
          id="deployments"
          className="hdx-section deployments"
          aria-labelledby="deployments-heading"
        >
          <div className="hdx-container">
            <div className="deployments__header">
              <p className="hdx-label">Deployments</p>
              <h2 id="deployments-heading" className="hdx-heading-lg">
                Named Verticals. Shared Engine.
              </h2>
              <p className="hdx-body" style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
                HDX is deployed under purpose-built names for each industry. The core platform
                is the same — the AI models, the Google infrastructure, the integrated
                architecture — but each deployment is tuned to the workflows and data model
                of its vertical.
              </p>
            </div>

            <div className="deploy-cards">
              <div className="deploy-card">
                <span className="deploy-card__status deploy-card__status--live">Live</span>
                <p className="deploy-card__name">S2PX</p>
                <p className="deploy-card__vertical">HDX for 3D Scanning & Spatial Intelligence</p>
                <p className="deploy-card__desc">
                  Anchor client: Scan2Plan. Automates the field-to-delivery workflow: estimate
                  generation, CRM routing, project management, client delivery portals, invoice
                  reconciliation. The job goes in one end and the check comes out the other.
                </p>
              </div>
              <div className="deploy-card">
                <span className="deploy-card__status deploy-card__status--phase3">Phase 3</span>
                <p className="deploy-card__name">MVX · MelodyVault</p>
                <p className="deploy-card__vertical">HDX for Independent Music</p>
                <p className="deploy-card__desc">
                  AI catalog analysis, sync marketplace, royalty dashboard, splits ledger.
                  Artists keep 100% of their masters. The major-label infrastructure —
                  without the major-label deal.
                </p>
              </div>
            </div>

            <div className="coming-row">
              <span className="coming-row__label">Coming</span>
              <div className="coming-row__items">
                <span className="coming-tag">FFX · Feed Farm</span>
                <span className="coming-tag">Deep South Directory</span>
                <span className="coming-tag">BCA · Buy Curious Art</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. THE SHOWROOM ── */}
        <section
          id="story"
          className="hdx-section showroom"
          aria-labelledby="showroom-heading"
        >
          <div className="hdx-container">
            <div className="showroom__inner">
              <div>
                <p className="hdx-label">The Showroom</p>
                <h2 id="showroom-heading" className="hdx-heading-lg">
                  We Don't Demo Software.<br />We Show You a Running Business.
                </h2>
                <p className="hdx-body" style={{ marginTop: 'var(--space-6, 1.5rem)' }}>
                  Big Muddy is the owned-and-operated proof of concept. A boutique hotel,
                  regional magazine, radio station, touring circuit, and record label — all
                  running on the same HDX engine. Every feature gets built and battle-tested
                  here before it ever touches a client's business. One operator. One platform.
                  Five revenue streams.
                </p>
                <p className="hdx-body" style={{ marginTop: 'var(--space-4, 1rem)' }}>
                  When we tell you HDX can run your business, we can show you the receipts.
                </p>
                <a
                  href="https://bigmuddytouring.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showroom__link"
                >
                  See Big Muddy &rarr;
                </a>
              </div>
              <div className="showroom__aside">
                <p className="showroom__aside-label">Five Revenue Streams · One Platform</p>
                <ul className="showroom__streams">
                  <li>Boutique Hotel</li>
                  <li>Regional Magazine</li>
                  <li>Radio Station</li>
                  <li>Touring Circuit</li>
                  <li>Record Label</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. LICENSING CTA ── */}
        <section
          className="hdx-section licensing"
          aria-labelledby="licensing-heading"
        >
          <div className="hdx-container licensing__inner">
            <p className="hdx-label">Licensing</p>
            <h2 id="licensing-heading" className="hdx-heading-lg">
              Operator to Operator.
            </h2>
            <p className="licensing__body">
              We license HDX to businesses who want enterprise-grade operations without
              enterprise-grade overhead. One monthly fee. No internal engineering. No cloud
              infrastructure management. Hillbilly Dreams operates as your embedded technology
              arm — accountable for uptime, performance, and continuous improvement.
            </p>
            <a
              href="mailto:hello@hillbillydreamsinc.com"
              className="hdx-btn hdx-btn--primary hdx-btn--lg"
            >
              Request Licensing Info
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="hdx-footer" aria-label="Site footer">
          <div className="hdx-footer__inner">
            <div className="hdx-footer__top">
              <span className="hdx-footer__org">
                Hillbilly Dreams, Inc. · Natchez, Mississippi
              </span>
              <a
                href="https://hillbillydreamsinc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hdx-footer__url"
              >
                hillbillydreamsinc.com
              </a>
            </div>
            <p className="hdx-footer__tagline">
              Technology Platform for the New South
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
