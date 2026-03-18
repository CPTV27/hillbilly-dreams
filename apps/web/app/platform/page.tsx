'use client';

// apps/web/app/platform/page.tsx
// Big Muddy Media Engine — editorial/magazine layout
// Photo-forward: each section anchored by a corridor photograph

import { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export default function PlatformPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="platform-splash">

      {/* ── NAV ── */}
      <nav className={`platform-nav${scrolled ? ' platform-nav--scrolled' : ''}`} aria-label="Platform navigation">
        <div className="platform-nav__inner">
          <div className="platform-nav__brand">
            <div className="platform-nav__logo">BM</div>
            <span className="platform-nav__name">BIG MUDDY <span className="platform-nav__accent">ENGINE</span></span>
          </div>
          <div className="platform-nav__links">
            <a href="#what-we-built">Platform</a>
            <a href="#brands">Brands</a>
            <a href="#ai">AI</a>
            <a href="#stack">Stack</a>
            <a href="#pricing">Pricing</a>
          </div>
          <a href="mailto:chase@bigmuddytouring.com" className="btn btn--primary btn--sm">
            Get Started <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__photo-wrap">
          <img
            src="/images/platform/hero-tatonut.webp"
            alt="TatoNut Doughnut Shop sign with Orleans iron gate and pink flowers in Natchez"
            className="hero__photo"
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <div className="hero__label">Big Muddy Media Engine</div>
          <h1 id="hero-heading" className="hero__heading">
            The Operating System for<br />Southern Media &amp; Hospitality.
          </h1>
          <p className="hero__sub">Six brands. 18 cities. One engine.</p>
          <div className="hero__actions">
            <a href="mailto:chase@bigmuddytouring.com" className="btn btn--primary btn--lg">
              Get Started <ArrowRight size={16} />
            </a>
            <a href="#what-we-built" className="btn btn--outline btn--lg">
              Explore Platform
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ── */}
      <div className="stats-bar" role="region" aria-label="Platform statistics">
        <div className="stats-bar__inner">
          <span className="stats-bar__item">6 Brands</span>
          <span className="stats-bar__dot" aria-hidden="true">·</span>
          <span className="stats-bar__item">18 Cities</span>
          <span className="stats-bar__dot" aria-hidden="true">·</span>
          <span className="stats-bar__item">284 Photos</span>
          <span className="stats-bar__dot" aria-hidden="true">·</span>
          <span className="stats-bar__item">5 Pipelines</span>
          <span className="stats-bar__dot" aria-hidden="true">·</span>
          <span className="stats-bar__item">3 AI Engines</span>
        </div>
      </div>

      {/* ── 3. WHAT WE BUILT ── */}
      <section className="split-section" id="what-we-built" aria-labelledby="ww-heading">
        <div className="split-section__photo-side split-section__photo-side--left">
          <img
            src="/images/platform/courtyard-fountain.webp"
            alt="Victorian home with brick courtyard, iron fountain, and wraparound porch"
            className="split-section__photo"
          />
        </div>
        <div className="split-section__text-side">
          <div className="split-section__label">What We Built</div>
          <h2 id="ww-heading" className="split-section__heading">Built for the whole corridor.</h2>
          <p className="split-section__body">
            A multi-tenant content engine running magazine, radio, touring, hospitality, and a regional business directory — all from one codebase.
          </p>
        </div>
      </section>

      {/* ── 4. CONTENT LIFECYCLE ── */}
      <section className="lifecycle-section" aria-labelledby="lifecycle-heading">
        <div className="lifecycle-section__photo-wrap">
          <img
            src="/images/platform/guitarist-riverbar.webp"
            alt="Guitarist performing at River Bar in intimate parlor setting"
            className="lifecycle-section__photo"
          />
          <div className="lifecycle-section__overlay" />
        </div>
        <div className="lifecycle-section__content">
          <div className="lifecycle-section__label">Content Lifecycle</div>
          <h2 id="lifecycle-heading" className="lifecycle-section__heading">From capture to revenue.</h2>
          <ol className="lifecycle-section__steps" aria-label="Content lifecycle steps">
            {['Capture', 'Edit', 'Publish', 'Distribute', 'Monetize', 'Analyze'].map((step, i) => (
              <li key={step} className="lifecycle-section__step">
                <span className="lifecycle-section__step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="lifecycle-section__step-name">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5. SIX BRANDS ── */}
      <section className="brands-section" id="brands" aria-labelledby="brands-heading">
        <div className="brands-section__header">
          <div className="brands-section__label">Six Brands, One Platform</div>
          <h2 id="brands-heading" className="brands-section__heading">Every corner of the corridor.</h2>
          <p className="brands-section__sub">Each brand runs its own site, its own content pipeline, and its own audience — all from one codebase.</p>
        </div>
        <div className="brand-grid" aria-label="Platform brands">

          <a href="/touring" className="brand-card">
            <div className="brand-card__photo-wrap">
              <img src="/images/corridor/mississippi-river-bridge.webp" alt="Mississippi River with bridge and barge at golden hour" className="brand-card__photo" />
              <div className="brand-card__photo-overlay" />
            </div>
            <div className="brand-card__body">
              <h3 className="brand-card__name">Big Muddy Touring</h3>
              <p className="brand-card__desc">The corridor travel hub. City guides, route planning, and the full Memphis-to-New-Orleans experience for travelers doing the drive.</p>
              <span className="brand-card__link">bigmuddytouring.com <ArrowRight size={12} /></span>
            </div>
          </a>

          <a href="/magazine" className="brand-card">
            <div className="brand-card__photo-wrap">
              <img src="/images/corridor/cafe-sidewalk-natchez.webp" alt="Sidewalk cafe scene in downtown Natchez" className="brand-card__photo" />
              <div className="brand-card__photo-overlay" />
            </div>
            <div className="brand-card__body">
              <h3 className="brand-card__name">Big Muddy Magazine</h3>
              <p className="brand-card__desc">Long-form editorial about the people, food, music, and culture of the Mississippi corridor. City guides that actually tell you where to go.</p>
              <span className="brand-card__link">bigmuddymagazine.com <ArrowRight size={12} /></span>
            </div>
          </a>

          <a href="/radio" className="brand-card">
            <div className="brand-card__photo-wrap">
              <img src="/images/corridor/street-musician-guitar.webp" alt="Street musician playing guitar up close" className="brand-card__photo" />
              <div className="brand-card__photo-overlay" />
            </div>
            <div className="brand-card__body">
              <h3 className="brand-card__name">Big Muddy Radio</h3>
              <p className="brand-card__desc">Curated Spotify playlists, live sessions from the Blues Room in Natchez, and a podcast about the music that made the corridor famous.</p>
              <span className="brand-card__link">bigmuddyradio.com <ArrowRight size={12} /></span>
            </div>
          </a>

          <a href="/touring/inn" className="brand-card">
            <div className="brand-card__photo-wrap">
              <img src="/images/corridor/victorian-mansion-natchez.webp" alt="White Victorian mansion with columns in Natchez" className="brand-card__photo" />
              <div className="brand-card__photo-overlay" />
            </div>
            <div className="brand-card__body">
              <h3 className="brand-card__name">The Big Muddy Inn</h3>
              <p className="brand-card__desc">A boutique inn in Natchez with a 40-seat Blues Room for live music, a writers&apos; residency, and rooms that feel like the house your cool aunt never had.</p>
              <span className="brand-card__link">bigmuddyinn.com <ArrowRight size={12} /></span>
            </div>
          </a>

          <a href="/radio/directory" className="brand-card">
            <div className="brand-card__photo-wrap">
              <img src="/images/ai-corridor/ocean-springs-gallery.webp" alt="Gallery district storefronts with warm evening light" className="brand-card__photo" />
              <div className="brand-card__photo-overlay" />
            </div>
            <div className="brand-card__body">
              <h3 className="brand-card__name">Deep South Directory</h3>
              <p className="brand-card__desc">The regional business directory for the corridor. Restaurants, venues, shops, and services — listed, photographed, and featured in editorial content.</p>
              <span className="brand-card__link">deepsouthdirectory.com <ArrowRight size={12} /></span>
            </div>
          </a>

          <a href="/economics" className="brand-card">
            <div className="brand-card__photo-wrap">
              <img src="/images/ai-corridor/delta-cotton-field.webp" alt="Cotton field at golden hour in the Mississippi Delta" className="brand-card__photo" />
              <div className="brand-card__photo-overlay" />
            </div>
            <div className="brand-card__body">
              <h3 className="brand-card__name">Outsider Economics</h3>
              <p className="brand-card__desc">The field manual for independent economic systems. The math nobody ran on local coordination, time banking, and building economies that don&apos;t need permission.</p>
              <span className="brand-card__link">outsidereconomics.com <ArrowRight size={12} /></span>
            </div>
          </a>

        </div>
      </section>

      {/* ── 6. AI-POWERED ── */}
      <section className="split-section" id="ai" aria-labelledby="ai-heading">
        <div className="split-section__photo-side split-section__photo-side--left">
          <img
            src="/images/platform/live-oak-canopy.webp"
            alt="Massive live oak tree canopy with azaleas blooming underneath"
            className="split-section__photo"
          />
        </div>
        <div className="split-section__text-side">
          <div className="split-section__label">AI-Powered</div>
          <h2 id="ai-heading" className="split-section__heading">Intelligence at every layer.</h2>
          <ul className="ai-list" aria-label="AI systems">
            <li className="ai-list__item">
              <span className="ai-list__title">Photo Intelligence</span>
              <span className="ai-list__desc">Auto-scoring on quality</span>
            </li>
            <li className="ai-list__item">
              <span className="ai-list__title">Content Generation</span>
              <span className="ai-list__desc">Gemini-powered drafts</span>
            </li>
            <li className="ai-list__item">
              <span className="ai-list__title">Smart Distribution</span>
              <span className="ai-list__desc">Auto-publish everywhere</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── 7. BUILT ON ── */}
      <section className="stack-section" id="stack" aria-labelledby="stack-heading">
        <div className="stack-section__photo-wrap">
          <img
            src="/images/platform/river-bluff-walkway.webp"
            alt="Natchez bluff walkway with iron fence overlooking Mississippi River bridge"
            className="stack-section__photo"
          />
          <div className="stack-section__overlay" />
        </div>
        <div className="stack-section__content">
          <div className="stack-section__label">Built On</div>
          <h2 id="stack-heading" className="stack-section__heading">Modern infrastructure, zero compromise.</h2>
          <div className="stack-section__badges" role="list" aria-label="Technology stack">
            {[
              'Next.js 15', 'React 19', 'PostgreSQL', 'Prisma',
              'Firebase', 'Gemini 2.5', 'GCS', 'Cloudflare',
            ].map((tech) => (
              <span key={tech} className="stack-badge" role="listitem">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PHOTO BREAK ── */}
      <div className="photo-break" aria-hidden="true">
        <img
          src="/images/platform/floral-bar.webp"
          alt="Cocktail bar with red floral wallpaper and marble counter"
          className="photo-break__img"
        />
      </div>

      {/* ── 9. PRICING ── */}
      <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
        <div className="pricing-section__photo-wrap">
          <img
            src="/images/platform/lost-spring-brewing.webp"
            alt="Lost Spring Brewing Co neon sign with patrons on covered patio"
            className="pricing-section__photo"
          />
          <div className="pricing-section__overlay" />
        </div>
        <div className="pricing-section__inner">
          <div className="pricing-section__header">
            <div className="pricing-section__label">Pricing</div>
            <h2 id="pricing-heading" className="pricing-section__heading">Simple, transparent pricing.</h2>
            <p className="pricing-section__sub">Scale from a single brand to a full media platform.</p>
          </div>
          <div className="pricing-grid">

            <div className="pricing-card">
              <h3 className="pricing-card__tier">Free</h3>
              <div className="pricing-card__price">$0<span className="pricing-card__period">/mo</span></div>
              <p className="pricing-card__tagline">Get on the map.</p>
              <ul className="pricing-card__features">
                <li><Zap size={11} aria-hidden="true" />Basic directory listing</li>
                <li><Zap size={11} aria-hidden="true" />Corridor presence</li>
                <li><Zap size={11} aria-hidden="true" />Community access</li>
              </ul>
              <a href="mailto:chase@bigmuddytouring.com" className="btn btn--outline pricing-card__cta">
                Get Started
              </a>
            </div>

            <div className="pricing-card">
              <h3 className="pricing-card__tier">Enhanced</h3>
              <div className="pricing-card__price">$99<span className="pricing-card__period">/mo</span></div>
              <p className="pricing-card__tagline">Content pipeline &amp; photo access.</p>
              <ul className="pricing-card__features">
                <li><Zap size={11} aria-hidden="true" />Shared photo library</li>
                <li><Zap size={11} aria-hidden="true" />Content pipeline access</li>
                <li><Zap size={11} aria-hidden="true" />City guide inclusion</li>
                <li><Zap size={11} aria-hidden="true" />Analytics dashboard</li>
              </ul>
              <a href="mailto:chase@bigmuddytouring.com" className="btn btn--outline pricing-card__cta">
                Get Started
              </a>
            </div>

            <div className="pricing-card pricing-card--highlight">
              <div className="pricing-card__badge">Most Popular</div>
              <h3 className="pricing-card__tier">Pro</h3>
              <div className="pricing-card__price">$500<span className="pricing-card__period">/mo</span></div>
              <p className="pricing-card__tagline">Full media engine with your own brand site.</p>
              <ul className="pricing-card__features">
                <li><Zap size={11} aria-hidden="true" />Dedicated brand subdomain</li>
                <li><Zap size={11} aria-hidden="true" />AI content generation</li>
                <li><Zap size={11} aria-hidden="true" />Auto-distribution</li>
                <li><Zap size={11} aria-hidden="true" />Priority photo library</li>
              </ul>
              <a href="mailto:chase@bigmuddytouring.com" className="btn btn--primary pricing-card__cta">
                Get Started
              </a>
            </div>

            <div className="pricing-card">
              <h3 className="pricing-card__tier">Enterprise</h3>
              <div className="pricing-card__price">Custom</div>
              <p className="pricing-card__tagline">Custom deployment with dedicated support.</p>
              <ul className="pricing-card__features">
                <li><Zap size={11} aria-hidden="true" />Multi-region deployment</li>
                <li><Zap size={11} aria-hidden="true" />White-label platform</li>
                <li><Zap size={11} aria-hidden="true" />Dedicated engineering</li>
                <li><Zap size={11} aria-hidden="true" />SLA &amp; onboarding</li>
              </ul>
              <a href="mailto:chase@bigmuddytouring.com" className="btn btn--outline pricing-card__cta">
                Contact Us
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── 10. FOOTER ── */}
      <footer className="platform-footer">
        <div className="platform-footer__inner">
          <div className="platform-footer__main">
            <div className="platform-footer__brand">
              <div className="platform-nav__logo">BM</div>
              <span className="platform-nav__name">BIG MUDDY <span className="platform-nav__accent">ENGINE</span></span>
            </div>
            <p className="platform-footer__copy">&copy; 2026 Big Muddy Touring LLC. All rights reserved.</p>
          </div>
          <a href="mailto:chase@bigmuddytouring.com" className="btn btn--primary btn--lg">
            Start Your Brand <ArrowRight size={16} />
          </a>
        </div>
        <div className="platform-footer__bar">
          <span>Multi-Tenant Media Engine for Southern Hospitality &amp; Culture</span>
          <span>BIGMUDDYTOURING.COM</span>
        </div>
      </footer>

      <style>{`

        /* ─── Base shell ─── */
        .platform-splash {
          min-height: 100vh;
          background: #0a0f1a;
          color: #f0ede8;
          font-family: var(--font-body, system-ui, sans-serif);
          overflow-x: hidden;
        }

        /* ─── Nav ─── */
        .platform-nav {
          position: fixed;
          width: 100%;
          z-index: 100;
          padding: 20px 0;
          background: transparent;
          transition: background 0.3s ease, padding 0.3s ease, border-bottom 0.3s ease;
        }
        .platform-nav--scrolled {
          background: rgba(10, 15, 26, 0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 12px 0;
        }
        .platform-nav__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .platform-nav__brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .platform-nav__logo {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #c8943e, #a07828);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          color: #0a0f1a;
          box-shadow: 0 4px 12px rgba(200, 148, 62, 0.25);
          flex-shrink: 0;
        }
        .platform-nav__name {
          font-weight: 800;
          font-size: 15px;
          letter-spacing: -0.02em;
          color: #f0ede8;
          white-space: nowrap;
        }
        .platform-nav__accent {
          color: #c8943e;
        }
        .platform-nav__links {
          display: none;
          gap: 36px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(240,237,232,0.6);
        }
        .platform-nav__links a {
          color: rgba(240,237,232,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .platform-nav__links a:hover { color: #c8943e; }
        @media (min-width: 768px) {
          .platform-nav__links { display: flex; }
        }

        /* ─── Buttons ─── */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          white-space: nowrap;
        }
        .btn--sm { padding: 8px 16px; font-size: 13px; }
        .btn--lg { padding: 16px 28px; font-size: 15px; }
        .btn--primary {
          background: linear-gradient(135deg, #c8943e, #a07828);
          color: #0a0f1a;
        }
        .btn--primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,148,62,0.3); }
        .btn--outline {
          background: transparent;
          color: #f0ede8;
          border: 1.5px solid rgba(240,237,232,0.3);
        }
        .btn--outline:hover { border-color: #c8943e; color: #c8943e; }

        /* ─── 1. HERO ─── */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 620px;
          display: flex;
          align-items: flex-end;
          padding-bottom: 100px;
        }
        .hero__photo-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,15,26,0.90) 0%,
            rgba(10,15,26,0.50) 50%,
            rgba(10,15,26,0.20) 100%
          );
        }
        .hero__content {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          width: 100%;
        }
        .hero__label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00d4aa;
          margin-bottom: 20px;
        }
        .hero__heading {
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #f0ede8;
          margin: 0 0 20px;
          max-width: 700px;
        }
        .hero__sub {
          font-size: 1.2rem;
          color: rgba(240,237,232,0.7);
          margin: 0 0 36px;
        }
        .hero__actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* ─── 2. STATS BAR ─── */
        .stats-bar {
          background: #111827;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 22px 32px;
        }
        .stats-bar__inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .stats-bar__item {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: rgba(240,237,232,0.85);
          text-transform: uppercase;
        }
        .stats-bar__dot {
          color: #c8943e;
          font-size: 18px;
          line-height: 1;
        }

        /* ─── Split Sections ─── */
        .split-section {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 500px;
        }
        @media (min-width: 900px) {
          .split-section {
            grid-template-columns: 1fr 1fr;
          }
          .split-section--reverse .split-section__photo-side--right {
            order: 2;
          }
          .split-section--reverse .split-section__text-side {
            order: 1;
          }
        }
        .split-section__photo-side {
          position: relative;
          min-height: 420px;
          overflow: hidden;
        }
        .split-section__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .split-section__text-side {
          background: #0d1424;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 60px;
        }
        @media (max-width: 900px) {
          .split-section__text-side { padding: 56px 32px; }
        }
        .split-section__label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00d4aa;
          margin-bottom: 18px;
        }
        .split-section__heading {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #f0ede8;
          margin: 0 0 22px;
        }
        .split-section__body {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(240,237,232,0.65);
          max-width: 440px;
        }

        /* ─── Brand List ─── */
        /* ─── 5. Brands Section ─── */
        .brands-section {
          background: #0d1424;
          padding: 100px 32px;
        }
        .brands-section__header {
          max-width: 1280px;
          margin: 0 auto 56px;
          text-align: center;
        }
        .brands-section__label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00d4aa;
          margin-bottom: 14px;
        }
        .brands-section__heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f0ede8;
          margin: 0 0 14px;
        }
        .brands-section__sub {
          font-size: 1.05rem;
          color: rgba(240,237,232,0.55);
          margin: 0;
          max-width: 560px;
          margin: 0 auto;
        }
        .brand-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .brand-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .brand-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .brand-card {
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .brand-card:hover {
          border-color: rgba(200,148,62,0.4);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
        .brand-card__photo-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }
        .brand-card__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .brand-card:hover .brand-card__photo {
          transform: scale(1.05);
        }
        .brand-card__photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10,15,26,0.6) 100%);
        }
        .brand-card__body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .brand-card__name {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #f0ede8;
          margin: 0 0 10px;
        }
        .brand-card__desc {
          font-size: 0.875rem;
          color: rgba(240,237,232,0.6);
          line-height: 1.6;
          margin: 0 0 16px;
          flex: 1;
        }
        .brand-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #c8943e;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .brand-card:hover .brand-card__link {
          color: #daa84e;
        }

        /* ─── AI List ─── */
        .ai-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .ai-list__item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ai-list__title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f0ede8;
        }
        .ai-list__desc {
          font-size: 0.9rem;
          color: rgba(240,237,232,0.55);
        }

        /* ─── 4. Content Lifecycle ─── */
        .lifecycle-section {
          position: relative;
          min-height: 500px;
          display: flex;
          align-items: flex-end;
        }
        .lifecycle-section__photo-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .lifecycle-section__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .lifecycle-section__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,15,26,0.95) 0%,
            rgba(10,15,26,0.60) 60%,
            rgba(10,15,26,0.20) 100%
          );
        }
        .lifecycle-section__content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 32px;
        }
        .lifecycle-section__label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00d4aa;
          margin-bottom: 14px;
        }
        .lifecycle-section__heading {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f0ede8;
          margin: 0 0 36px;
        }
        .lifecycle-section__steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .lifecycle-section__step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 22px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
        }
        .lifecycle-section__step-num {
          font-size: 11px;
          font-weight: 700;
          color: #c8943e;
          letter-spacing: 0.08em;
        }
        .lifecycle-section__step-name {
          font-size: 13px;
          font-weight: 700;
          color: #f0ede8;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ─── 7. Stack Section ─── */
        .stack-section {
          position: relative;
          min-height: 480px;
          display: flex;
          align-items: center;
        }
        .stack-section__photo-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .stack-section__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .stack-section__overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 15, 26, 0.78);
        }
        .stack-section__content {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 100px 32px;
          width: 100%;
        }
        .stack-section__label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00d4aa;
          margin-bottom: 14px;
        }
        .stack-section__heading {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f0ede8;
          margin: 0 0 36px;
        }
        .stack-section__badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .stack-badge {
          padding: 8px 18px;
          border-radius: 100px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 13px;
          font-weight: 700;
          color: #f0ede8;
          backdrop-filter: blur(10px);
          letter-spacing: 0.02em;
          transition: background 0.2s, border-color 0.2s;
        }
        .stack-badge:hover {
          background: rgba(200,148,62,0.15);
          border-color: rgba(200,148,62,0.4);
        }

        /* ─── 8. Photo Break ─── */
        .photo-break {
          height: 480px;
          overflow: hidden;
        }
        .photo-break__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
          display: block;
        }

        /* ─── 9. Pricing ─── */
        .pricing-section {
          position: relative;
          background: #0d1424;
          padding: 120px 32px;
        }
        .pricing-section__photo-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .pricing-section__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .pricing-section__overlay {
          position: absolute;
          inset: 0;
          background: rgba(13, 20, 36, 0.88);
        }
        .pricing-section__inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
        }
        .pricing-section__header {
          text-align: center;
          margin-bottom: 64px;
        }
        .pricing-section__label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00d4aa;
          margin-bottom: 14px;
        }
        .pricing-section__heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f0ede8;
          margin: 0 0 14px;
        }
        .pricing-section__sub {
          font-size: 1.05rem;
          color: rgba(240,237,232,0.55);
          margin: 0;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
        .pricing-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          transition: border-color 0.2s, background 0.2s;
        }
        .pricing-card:hover {
          border-color: rgba(200,148,62,0.3);
          background: rgba(255,255,255,0.06);
        }
        .pricing-card--highlight {
          border-color: rgba(200,148,62,0.5);
          background: rgba(200,148,62,0.06);
        }
        .pricing-card__badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #c8943e, #a07828);
          color: #0a0f1a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 100px;
          white-space: nowrap;
        }
        .pricing-card__tier {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.6);
          margin: 0 0 10px;
        }
        .pricing-card__price {
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #f0ede8;
          line-height: 1;
          margin-bottom: 12px;
        }
        .pricing-card__period {
          font-size: 1rem;
          font-weight: 400;
          color: rgba(240,237,232,0.45);
          letter-spacing: 0;
        }
        .pricing-card__tagline {
          font-size: 0.9rem;
          color: rgba(240,237,232,0.55);
          margin: 0 0 24px;
          line-height: 1.5;
        }
        .pricing-card__features {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .pricing-card__features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: rgba(240,237,232,0.7);
        }
        .pricing-card__features svg {
          color: #c8943e;
          flex-shrink: 0;
        }
        .pricing-card__cta {
          width: 100%;
          justify-content: center;
          padding: 12px 20px;
        }

        /* ─── Footer ─── */
        .platform-footer {
          background: #070b14;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 48px 32px 32px;
        }
        .platform-footer__inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .platform-footer__main {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .platform-footer__brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .platform-footer__copy {
          font-size: 13px;
          color: rgba(240,237,232,0.35);
          margin: 0;
        }
        .platform-footer__bar {
          max-width: 1280px;
          margin: 0 auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(240,237,232,0.3);
          flex-wrap: wrap;
          gap: 8px;
        }

      `}</style>

    </div>
  );
}
