'use client';

// apps/web/app/platform/page.tsx
// Big Muddy Media Engine — splash portal / sales page
// Adapted from S2PX SplashPortal pattern, using BMT design tokens

import { useState, useEffect } from 'react';
import {
  ArrowRight, BarChart3, Camera, ChevronDown,
  ChevronRight, FileText, Globe, Layers,
  Lock, Map, Share2, Sparkles, Zap,
} from 'lucide-react';

/* ─── DATA ─── */

const STATS = [
  { value: '6', label: 'Brands', sub: 'Touring · Magazine · Radio · Inn · DSD · Fleet', icon: Layers },
  { value: '18', label: 'Cities', sub: 'Five states on the corridor', icon: Map },
  { value: '284', label: 'Photos', sub: 'Shared media library', icon: Camera },
  { value: '5', label: 'Content Pipelines', sub: 'Articles · Playlists · Listings · Photos · Events', icon: FileText },
  { value: '3', label: 'AI Engines', sub: 'Gemini · Photo Scoring · Auto-Distribution', icon: Sparkles },
];

const WORKFLOW = ['Capture', 'Edit', 'Publish', 'Distribute', 'Monetize', 'Analyze'];

const MODULES: Record<string, { title: string; desc: string; icon: any; features: string[] }> = {
  content: {
    title: 'Content Engine',
    desc: 'Headless content pipeline powering all six brands from a single source of truth.',
    icon: FileText,
    features: [
      'Shared Photo Library (284+ corridor photos, scored & tagged)',
      'Article Pipeline (Gemini-powered drafts → editorial review → publish)',
      'Playlist Curation (Spotify-synced, genre-tagged corridor playlists)',
      'City Guide Generator (18 city guides with lodging, dining, music venues)',
      'Event Calendar (Cross-brand event aggregation)',
    ],
  },
  brands: {
    title: 'Brand Sites',
    desc: 'Six distinct brand identities, one codebase, shared design system.',
    icon: Globe,
    features: [
      'Big Muddy Touring (bigmuddytouring.com) — Corridor travel hub',
      'Big Muddy Magazine (bigmuddymagazine.com) — Long-form editorial',
      'Big Muddy Radio (bigmuddyradio.com) — Curated playlists & streaming',
      'The Big Muddy Inn (thebigmuddyinn.com) — Boutique hospitality',
      'Deep South Directory (deepsouthdirectory.com) — Regional business directory',
      'Big Muddy Fleet (internal) — Transit & logistics',
    ],
  },
  distribution: {
    title: 'Distribution',
    desc: 'Automated multi-channel content distribution across all endpoints.',
    icon: Share2,
    features: [
      'Newsletter Pipeline (Mailchimp integration, per-brand lists)',
      'Social Distribution (Twitter/X, TikTok, Instagram scheduling)',
      'Spotify Sync (Playlist publishing and analytics)',
      'RSS/Syndication (Article feeds for each brand)',
      'SEO Engine (Auto-generated sitemaps, structured data, meta tags)',
    ],
  },
  analytics: {
    title: 'Analytics & Intelligence',
    desc: 'AI-powered insights across the entire content ecosystem.',
    icon: BarChart3,
    features: [
      'Photo Quality Scoring (Technical scoring: sharpness, exposure, composition)',
      'Content Performance Dashboard (Cross-brand engagement metrics)',
      'Revenue Tracking (Advertising, lodging, directory listings, events)',
      'Audience Intelligence (Newsletter growth, social reach, streaming metrics)',
      'Gemini Content Generation (AI-assisted article drafts and descriptions)',
    ],
  },
};

const FEATURE_GROUPS = [
  {
    emoji: '\u{1F4F0}', title: 'Magazine & Editorial',
    features: ['Article CMS', 'City Guides (18)', 'Featured Stories', 'Category Filtering', 'Photo Essays'],
  },
  {
    emoji: '\u{1F3B5}', title: 'Radio & Playlists',
    features: ['Playlist Manager', 'Spotify Integration', 'Genre Tagging', 'Streaming Player', 'Artist Profiles'],
  },
  {
    emoji: '\u{1F5FA}', title: 'Touring & Route',
    features: ['Route Planner', 'Lodging Guide (40+ properties)', 'Fleet Management', 'City Stop Pages', 'Expanded Network (18 cities)'],
  },
  {
    emoji: '\u{1F3E8}', title: 'Hospitality & Inn',
    features: ['Suite Booking', 'Blues Room Events', 'Guest Experience', 'Property Details', 'Availability Calendar'],
  },
  {
    emoji: '\u{1F4C2}', title: 'Directory & Listings',
    features: ['Business Listings', 'Category Pages', 'Claim & Verify', 'Review System', 'Advertising Tiers'],
  },
  {
    emoji: '\u{1F4F8}', title: 'Media Library',
    features: ['Photo Import Pipeline', 'Lightroom Integration', 'Auto-Scoring', 'Tag System', 'Cross-Brand Sharing'],
  },
];

const AI_SYSTEMS = [
  { emoji: '\u{1F4F8}', title: 'Photo Intelligence', desc: 'Auto-scoring on sharpness, exposure, contrast, composition. Quality-ranked library with tag-based queries.' },
  { emoji: '\u{1F4DD}', title: 'Content Generation', desc: 'Gemini-powered article drafts from city data, venue info, and corridor research.' },
  { emoji: '\u{1F3AF}', title: 'Smart Distribution', desc: 'Auto-publish to newsletters, social, RSS based on content type and brand rules.' },
  { emoji: '\u{1F50D}', title: 'SEO Automation', desc: 'Auto-generated structured data, OpenGraph tags, sitemaps for all brand sites.' },
  { emoji: '\u{1F4CA}', title: 'Cross-Brand Analytics', desc: 'Unified metrics dashboard across all six brands — engagement, revenue, growth.' },
];

const INTEGRATIONS = [
  { emoji: '\u{1F4F8}', title: 'Adobe Lightroom', desc: 'Photo export pipeline with auto-import, scoring, and library management.' },
  { emoji: '\u{2601}\u{FE0F}', title: 'Google Cloud Storage', desc: 'CDN-backed media hosting for hero images, fleet photos, and editorial assets.' },
  { emoji: '\u{1F3B5}', title: 'Spotify', desc: 'Playlist sync, streaming analytics, and embedded players across Radio brand.' },
  { emoji: '\u{1F4E7}', title: 'Mailchimp', desc: 'Per-brand newsletter lists with automated campaign triggers.' },
  { emoji: '\u{1F4B3}', title: 'Stripe', desc: 'Payment processing for Inn bookings, directory listings, and event tickets.' },
  { emoji: '\u{1F510}', title: 'Firebase Auth', desc: 'Multi-tenant authentication with role-based access per brand.' },
  { emoji: '\u{1F4CA}', title: 'Google Analytics', desc: 'Cross-brand event tracking and audience intelligence.' },
];

const TECH_STACK = [
  { layer: 'Frontend', tech: 'Next.js 15 + React 19 + TypeScript' },
  { layer: 'Monorepo', tech: 'Turborepo + pnpm workspaces' },
  { layer: 'Database', tech: 'PostgreSQL + Prisma ORM' },
  { layer: 'Storage', tech: 'Google Cloud Storage' },
  { layer: 'AI', tech: 'Gemini 2.5 Pro + Custom Scoring' },
  { layer: 'Hosting', tech: 'Firebase App Hosting' },
  { layer: 'Auth', tech: 'Firebase Authentication' },
  { layer: 'CI/CD', tech: 'GitHub → Firebase Deploy' },
  { layer: 'Design', tech: 'Custom Design System (@bigmuddy/ui)' },
  { layer: 'Domains', tech: 'Cloudflare DNS + SSL' },
];

const ROLES = [
  { role: 'Owner', access: 'Full platform access, all brands, financial data', users: 'Chase Pierson' },
  { role: 'Editor', access: 'Content management, publishing, media library', users: 'Editorial team' },
  { role: 'Producer', access: 'Production assignments, live streams, photo/video', users: 'Tuthill / Studio C' },
  { role: 'Brand Manager', access: 'Single-brand admin, content + analytics', users: 'Per-brand leads' },
  { role: 'Advertiser', access: 'Directory listings, ad placement, analytics', users: 'Business clients' },
  { role: 'Viewer', access: 'Read-only dashboard access', users: 'Stakeholders' },
];

const PRICING = [
  {
    tier: 'Free Listing',
    price: '$0',
    period: '',
    desc: 'Basic directory listing in the Deep South Directory. Your business on the map, discoverable across the corridor.',
    features: ['DSD Business Profile', 'Map & Search Visibility', 'Category Placement', 'Production at Full Rate'],
  },
  {
    tier: 'Enhanced',
    price: '$99',
    period: '/mo',
    desc: 'Light media platform — branded content, photo pipeline, basic distribution through the Big Muddy network.',
    features: ['Everything in Free', 'Branded Content Pipeline', 'Photo Library Access', 'Newsletter Feature Slots', '5% Off Production Services'],
  },
  {
    tier: 'Pro',
    price: '$500',
    period: '/mo',
    desc: 'Full media engine — brand site, content management, multi-channel distribution, analytics dashboard, and audience access.',
    features: ['Everything in Enhanced', 'Dedicated Brand Site', 'Full Content Management', 'Social Distribution', 'Analytics Dashboard', '10% Off Production Services'],
    highlight: true,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Full platform deployment with custom brands, dedicated producer, and priority support across all channels.',
    features: ['Everything in Pro', 'Custom Brand Deployment', 'Dedicated Producer', 'Live Stream Support', 'Priority Support & SLA', '10% Off Production Services'],
  },
];

/* ─── PAGE ─── */

export default function PlatformSplash() {
  const [activeModule, setActiveModule] = useState('content');
  const [scrolled, setScrolled] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="platform-splash">
        {/* Ambient orbs */}
        <div className="platform-splash__orbs" aria-hidden="true">
          <div className="platform-splash__orb platform-splash__orb--1" />
          <div className="platform-splash__orb platform-splash__orb--2" />
          <div className="platform-splash__orb platform-splash__orb--3" />
        </div>

        {/* ── NAV ── */}
        <nav className={`platform-nav ${scrolled ? 'platform-nav--scrolled' : ''}`}>
          <div className="platform-nav__inner">
            <div className="platform-nav__brand">
              <div className="platform-nav__logo">BM</div>
              <span className="platform-nav__name">BIG MUDDY <span className="platform-nav__accent">ENGINE</span></span>
            </div>
            <div className="platform-nav__links">
              <a href="#platform">Platform</a>
              <a href="#features">Features</a>
              <a href="#ai">AI</a>
              <a href="#stack">Stack</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="platform-nav__actions">
              <span className="platform-nav__version">v1.0</span>
              <a href="mailto:chase@bigmuddytouring.com" className="btn btn--primary platform-nav__cta">
                Get Started
              </a>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="platform-hero">
          <img
            src="/images/library/corridor-0501.webp"
            alt="Pink azaleas cascading along a Natchez sidewalk in full spring bloom"
            className="platform-hero__bg"
            aria-hidden="true"
          />
          <div className="platform-hero__overlay" aria-hidden="true" />
          <div className="platform-hero__content">
            <div className="platform-hero__badge">
              <Layers size={14} />
              <span>MULTI-TENANT MEDIA ENGINE &middot; 6 BRANDS LIVE</span>
            </div>
            <h1 className="platform-hero__title">
              The Operating System for{' '}
              <em>Southern Media &amp; Hospitality.</em>
            </h1>
            <p className="platform-hero__sub">
              Full-stack content engine running six brands from one codebase &mdash; magazine,
              radio, touring, hospitality, and a regional directory serving 18 cities across five states.
            </p>
            <div className="platform-hero__ctas">
              <a href="mailto:chase@bigmuddytouring.com" className="btn btn--primary btn--lg">
                Get Started <ArrowRight size={18} />
              </a>
              <a href="#features" className="btn btn--ghost btn--lg">
                Explore Platform
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="platform-stats">
          <div className="platform-stats__inner">
            {STATS.map((s, i) => (
              <div key={i} className="platform-stat">
                <div className="platform-stat__icon"><s.icon size={20} /></div>
                <div className="platform-stat__value">{s.value}</div>
                <div className="platform-stat__label">{s.label}</div>
                <div className="platform-stat__sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PHOTO STRIP ── */}
        <div className="platform-photostrip" aria-hidden="true">
          <div className="platform-photostrip__grid">
            <img src="/images/library/corridor-0339.webp" alt="Brick sidewalk with bench and awnings on Natchez main street" className="platform-photostrip__img" />
            <img src="/images/library/corridor-1087.webp" alt="Guitarist tuning up under chandelier in a Natchez parlor" className="platform-photostrip__img" />
            <img src="/images/library/corridor-1033.webp" alt="Natchez mansion with columns and iron fence under live oaks" className="platform-photostrip__img" />
            <img src="/images/library/corridor-1056.webp" alt="Natchez Coffee Co sidewalk cafe with flags and chalkboard menu" className="platform-photostrip__img" />
            <img src="/images/library/corridor-0642.webp" alt="Victorian B&B with wraparound porch and gingerbread trim" className="platform-photostrip__img platform-photostrip__img--span" />
          </div>
        </div>

        {/* ── WORKFLOW ── */}
        <section className="platform-workflow" id="platform">
          <div className="section-container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Lifecycle</div>
              <h2 className="platform-section-header__title">Content Lifecycle</h2>
              <p className="platform-section-header__desc">Every stage of the content pipeline, from capture to revenue.</p>
            </div>
            <div className="platform-workflow__steps">
              <div className="platform-workflow__line" aria-hidden="true" />
              {WORKFLOW.map((step, i) => (
                <div key={i} className="platform-workflow__step">
                  <div className="platform-workflow__num">{i + 1}</div>
                  <span className="platform-workflow__label">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODULES (tabbed) ── */}
        <section className="platform-modules">
          <div className="section-container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Platform</div>
              <h2 className="platform-section-header__title">Integrated Modules</h2>
            </div>
            <div className="platform-modules__grid">
              <div className="platform-modules__tabs">
                {Object.entries(MODULES).map(([key, mod]) => (
                  <button
                    key={key}
                    onClick={() => setActiveModule(key)}
                    className={`platform-modules__tab ${activeModule === key ? 'platform-modules__tab--active' : ''}`}
                  >
                    <div className={`platform-modules__tab-icon ${activeModule === key ? 'platform-modules__tab-icon--active' : ''}`}>
                      <mod.icon size={20} />
                    </div>
                    <div className="platform-modules__tab-text">
                      <h3 className="platform-modules__tab-title">{mod.title}</h3>
                      <p className="platform-modules__tab-desc">{mod.desc}</p>
                    </div>
                    <ChevronRight size={16} className={`platform-modules__tab-arrow ${activeModule === key ? 'platform-modules__tab-arrow--active' : ''}`} />
                  </button>
                ))}
              </div>
              <div className="platform-modules__detail">
                <div className="platform-modules__detail-glow" aria-hidden="true" />
                <div className="platform-modules__detail-card">
                  <div className="platform-modules__detail-header">
                    <div className="platform-modules__detail-icon">
                      {(() => { const Icon = MODULES[activeModule].icon; return <Icon size={26} />; })()}
                    </div>
                    <div>
                      <h3 className="platform-modules__detail-title">{MODULES[activeModule].title}</h3>
                      <p className="platform-modules__detail-desc">{MODULES[activeModule].desc}</p>
                    </div>
                  </div>
                  <div className="platform-modules__features">
                    {MODULES[activeModule].features.map((f, i) => (
                      <div key={i} className="platform-modules__feature">
                        <Zap size={14} className="platform-modules__feature-icon" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURE MAP (accordion) ── */}
        <section className="platform-featuremap" id="features">
          <div className="platform-featuremap__container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Complete Map</div>
              <h2 className="platform-section-header__title">Feature Map</h2>
              <p className="platform-section-header__desc">Every feature across Magazine, Radio, Touring, Hospitality, Directory, and Media.</p>
            </div>
            <div className="platform-featuremap__list">
              {FEATURE_GROUPS.map((group, gi) => (
                <div key={gi} className="platform-featuremap__group">
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === gi ? null : gi)}
                    className="platform-featuremap__trigger"
                  >
                    <span className="platform-featuremap__trigger-text">
                      <span className="platform-featuremap__trigger-emoji">{group.emoji}</span>
                      {group.title}
                      <span className="platform-featuremap__trigger-count">{group.features.length} features</span>
                    </span>
                    <ChevronDown size={16} className={`platform-featuremap__chevron ${expandedGroup === gi ? 'platform-featuremap__chevron--open' : ''}`} />
                  </button>
                  {expandedGroup === gi && (
                    <div className="platform-featuremap__body">
                      <div className="platform-featuremap__features">
                        {group.features.map((f, fi) => (
                          <div key={fi} className="platform-featuremap__feature">
                            <Zap size={12} className="platform-featuremap__feature-icon" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO BREAK: river / music / small town ── */}
        <div className="platform-photobreak" aria-hidden="true">
          <img src="/images/library/corridor-1007.webp" alt="Natchez bluff homes overlooking the Mississippi River with bridge in distance" className="platform-photobreak__img" />
          <img src="/images/library/corridor-1045.webp" alt="Band performing in a chandelier-lit Natchez parlor" className="platform-photobreak__img" />
          <img src="/images/library/corridor-1185.webp" alt="Small-town main street with a drug store and boutiques" className="platform-photobreak__img" />
        </div>

        {/* ── AI & AUTOMATION ── */}
        <section className="platform-ai" id="ai">
          <div className="section-container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Intelligence</div>
              <h2 className="platform-section-header__title">AI &amp; Automation</h2>
              <p className="platform-section-header__desc">AI-powered systems running across the platform, powered by Gemini 2.5 Pro.</p>
            </div>
            <div className="platform-card-grid platform-card-grid--3">
              {AI_SYSTEMS.map((ai, i) => (
                <div key={i} className="platform-card platform-card--hover">
                  <div className="platform-card__emoji">{ai.emoji}</div>
                  <h3 className="platform-card__title">{ai.title}</h3>
                  <p className="platform-card__desc">{ai.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section className="platform-integrations">
          <div className="section-container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Connectivity</div>
              <h2 className="platform-section-header__title">Integrations</h2>
            </div>
            <div className="platform-card-grid platform-card-grid--4">
              {INTEGRATIONS.map((int, i) => (
                <div key={i} className="platform-card platform-card--sm platform-card--hover">
                  <h3 className="platform-card__title platform-card__title--sm">
                    <span>{int.emoji}</span> {int.title}
                  </h3>
                  <p className="platform-card__desc platform-card__desc--sm">{int.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO BREAK: live oak / mural / B&B courtyard ── */}
        <div className="platform-photobreak" aria-hidden="true">
          <img src="/images/library/corridor-0657.webp" alt="Massive live oak canopy arching over an Ocean Springs street" className="platform-photobreak__img" />
          <img src="/images/library/corridor-1187.webp" alt="Colorful outdoor mural painted on a vine-covered wall" className="platform-photobreak__img" />
          <img src="/images/library/corridor-1018.webp" alt="B&B courtyard with ornate iron gazebo and brick patio" className="platform-photobreak__img" />
        </div>

        {/* ── TECH STACK ── */}
        <section className="platform-stack" id="stack">
          <div className="section-container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Architecture</div>
              <h2 className="platform-section-header__title">Tech Stack</h2>
              <p className="platform-section-header__desc">Built on the Google Cloud + Firebase ecosystem for performance and reliability.</p>
            </div>
            <div className="platform-stack__grid">
              {TECH_STACK.map((t, i) => (
                <div key={i} className="platform-stack__item">
                  <div className="platform-stack__layer">{t.layer}</div>
                  <div className="platform-stack__tech">{t.tech}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECURITY ROLES ── */}
        <section className="platform-roles">
          <div className="platform-featuremap__container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Access Control</div>
              <h2 className="platform-section-header__title">Role-Based Security</h2>
            </div>
            <div className="platform-roles__table-wrap">
              <table className="platform-roles__table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Access Level</th>
                    <th className="platform-roles__hide-mobile">Users</th>
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map((r, i) => (
                    <tr key={i}>
                      <td className="platform-roles__role">
                        <Lock size={12} className="platform-roles__lock" />
                        {r.role}
                      </td>
                      <td className="platform-roles__access">{r.access}</td>
                      <td className="platform-roles__users platform-roles__hide-mobile">{r.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PHOTO HERO: river bluff walkway ── */}
        <div className="platform-photohero" aria-hidden="true">
          <img
            src="/images/library/corridor-1084.webp"
            alt="Mississippi River bluff walkway with iron fence and bridge view"
            className="platform-photohero__img"
          />
          <div className="platform-photohero__overlay" />
        </div>

        {/* ── PRICING ── */}
        <section className="platform-pricing" id="pricing">
          <div className="section-container">
            <div className="platform-section-header">
              <div className="platform-section-header__label">Pricing</div>
              <h2 className="platform-section-header__title">Simple, Transparent Pricing</h2>
              <p className="platform-section-header__desc">Scale from a single brand to a full media platform.</p>
            </div>
            <div className="platform-pricing__grid">
              {PRICING.map((plan, i) => (
                <div key={i} className={`platform-pricing__card ${plan.highlight ? 'platform-pricing__card--highlight' : ''}`}>
                  {plan.highlight && <div className="platform-pricing__badge">Most Popular</div>}
                  <h3 className="platform-pricing__tier">{plan.tier}</h3>
                  <div className="platform-pricing__price">
                    <span className="platform-pricing__amount">{plan.price}</span>
                    {plan.period && <span className="platform-pricing__period">{plan.period}</span>}
                  </div>
                  <p className="platform-pricing__desc">{plan.desc}</p>
                  <ul className="platform-pricing__features">
                    {plan.features.map((f, fi) => (
                      <li key={fi}>
                        <Zap size={12} className="platform-pricing__check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:chase@bigmuddytouring.com"
                    className={`btn ${plan.highlight ? 'btn--primary' : 'btn--outline'} platform-pricing__cta`}
                  >
                    {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="platform-footer">
          <div className="platform-footer__inner">
            <div className="platform-footer__main">
              <div>
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
              <span>BIGMUDDYMEDIA.COM</span>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        /* ── Platform Splash Shell ── */
        .platform-splash {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          overflow-x: hidden;
          position: relative;
        }

        /* ── Ambient Orbs ── */
        .platform-splash__orbs {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .platform-splash__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: platform-pulse 18s ease-in-out infinite;
        }
        .platform-splash__orb--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(200, 148, 62, 0.18), transparent 70%);
          top: -200px; left: -100px;
        }
        .platform-splash__orb--2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(200, 148, 62, 0.10), transparent 70%);
          top: 40%; right: -200px;
          animation-delay: -6s;
          animation-duration: 22s;
        }
        .platform-splash__orb--3 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(160, 120, 60, 0.08), transparent 70%);
          bottom: -100px; left: 30%;
          animation-delay: -12s;
          animation-duration: 20s;
        }
        @keyframes platform-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ── Nav ── */
        .platform-nav {
          position: fixed;
          width: 100%;
          z-index: var(--z-nav);
          transition: all var(--duration-normal) var(--ease-default);
          background: transparent;
          padding: var(--space-5) 0;
        }
        .platform-nav--scrolled {
          background: rgba(26, 24, 22, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: var(--space-3) 0;
        }
        .platform-nav__inner {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: 0 var(--space-6);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .platform-nav__brand {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .platform-nav__logo {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, var(--accent), #a07828);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--text-sm);
          color: var(--bg);
          box-shadow: 0 4px 12px rgba(200, 148, 62, 0.2);
        }
        .platform-nav__name {
          font-weight: 800;
          font-size: var(--text-lg);
          letter-spacing: var(--tracking-tight);
          color: var(--text);
        }
        .platform-nav__accent {
          color: var(--accent);
        }
        .platform-nav__links {
          display: none;
          gap: var(--space-8);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
        }
        .platform-nav__links a:hover {
          color: var(--accent);
          transition: color var(--duration-fast) var(--ease-default);
        }
        @media (min-width: 768px) {
          .platform-nav__links { display: flex; }
        }
        .platform-nav__actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .platform-nav__version {
          display: none;
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          background: var(--surface);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        @media (min-width: 640px) {
          .platform-nav__version { display: inline-block; }
        }
        .platform-nav__cta {
          border-radius: var(--radius-full) !important;
          padding: var(--space-2) var(--space-5) !important;
          font-size: var(--text-sm) !important;
        }

        /* ── Hero ── */
        .platform-hero {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          padding: var(--space-32) var(--space-6) var(--space-16);
          text-align: center;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .platform-hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.28;
          z-index: 0;
        }
        .platform-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(26, 24, 22, 0.55) 0%,
            rgba(26, 24, 22, 0.35) 40%,
            rgba(26, 24, 22, 0.75) 100%
          );
          z-index: 1;
        }
        .platform-hero__content {
          position: relative;
          z-index: 2;
          max-width: 860px;
          margin: 0 auto;
        }
        .platform-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-1) var(--space-4);
          border-radius: var(--radius-full);
          background: var(--accent-muted);
          border: 1px solid rgba(200, 148, 62, 0.2);
          color: var(--accent);
          font-size: var(--text-xs);
          font-weight: 800;
          margin-bottom: var(--space-8);
        }
        .platform-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-6);
        }
        .platform-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .platform-hero__sub {
          max-width: 640px;
          margin: 0 auto var(--space-10);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
        }
        .platform-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-4);
        }
        .btn--lg {
          padding: var(--space-4) var(--space-8);
          font-size: var(--text-sm);
          border-radius: var(--radius-lg);
        }

        /* ── Stats ── */
        .platform-stats {
          position: relative;
          z-index: 1;
          padding: var(--space-10) 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: rgba(35, 31, 28, 0.3);
        }
        .platform-stats__inner {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: 0 var(--space-6);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .platform-stats__inner { grid-template-columns: repeat(5, 1fr); }
        }
        .platform-stat {
          text-align: center;
        }
        .platform-stat__icon {
          color: var(--accent);
          margin-bottom: var(--space-2);
          display: flex;
          justify-content: center;
        }
        .platform-stat__value {
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text);
          line-height: 1;
          margin-bottom: var(--space-1);
        }
        .platform-stat__label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: var(--space-1);
        }
        .platform-stat__sub {
          font-size: 10px;
          color: var(--text-disabled);
          line-height: var(--leading-snug);
        }

        /* ── Section Header (internal) ── */
        .platform-section-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }
        .platform-section-header__label {
          font-size: var(--text-xs);
          font-weight: 800;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: var(--space-2);
        }
        .platform-section-header__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          letter-spacing: var(--tracking-tight);
          color: var(--text);
          margin: 0 0 var(--space-3);
        }
        .platform-section-header__desc {
          font-size: var(--text-md);
          color: var(--text-muted);
          max-width: 640px;
          margin: 0 auto;
          line-height: var(--leading-loose);
        }

        /* ── Workflow ── */
        .platform-workflow__steps {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
        }
        @media (min-width: 768px) {
          .platform-workflow__steps {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .platform-workflow__line {
          display: none;
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border-strong), transparent);
          z-index: 0;
        }
        @media (min-width: 768px) {
          .platform-workflow__line { display: block; }
        }
        .platform-workflow__step {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
          width: 100%;
        }
        @media (min-width: 768px) {
          .platform-workflow__step { width: auto; }
        }
        .platform-workflow__num {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--surface);
          border: 2px solid var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--text-sm);
          color: var(--accent);
          margin-bottom: var(--space-3);
          box-shadow: var(--shadow-lg);
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .platform-workflow__step:hover .platform-workflow__num {
          border-color: var(--accent);
        }
        .platform-workflow__label {
          font-size: var(--text-xs);
          font-weight: 700;
          padding: var(--space-2) var(--space-3);
          background: var(--surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          white-space: nowrap;
          transition: background var(--duration-fast) var(--ease-default);
        }
        .platform-workflow__step:hover .platform-workflow__label {
          background: var(--surface-2);
        }

        /* ── Modules ── */
        .platform-modules {
          background: rgba(35, 31, 28, 0.15);
          position: relative;
          z-index: 1;
        }
        .platform-modules__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: start;
        }
        @media (min-width: 1024px) {
          .platform-modules__grid { grid-template-columns: 1fr 1fr; }
        }
        .platform-modules__tabs {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .platform-modules__tab {
          width: 100%;
          text-align: left;
          padding: var(--space-5);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: var(--space-4);
          transition: all var(--duration-fast) var(--ease-default);
          font-family: var(--font-body);
        }
        .platform-modules__tab:hover {
          border-color: var(--border-strong);
        }
        .platform-modules__tab--active {
          background: var(--surface);
          border-color: rgba(200, 148, 62, 0.35);
          box-shadow: inset 0 0 0 1px rgba(200, 148, 62, 0.08);
        }
        .platform-modules__tab-icon {
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          background: var(--surface-2);
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .platform-modules__tab-icon--active {
          background: var(--accent);
          color: var(--bg);
        }
        .platform-modules__tab-text {
          flex: 1;
          min-width: 0;
        }
        .platform-modules__tab-title {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 700;
          margin: 0;
          color: var(--text);
        }
        .platform-modules__tab-desc {
          font-size: var(--text-sm);
          color: var(--text-disabled);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .platform-modules__tab-arrow {
          color: var(--text-disabled);
          flex-shrink: 0;
          transition: transform var(--duration-fast) var(--ease-default);
        }
        .platform-modules__tab-arrow--active {
          transform: rotate(90deg);
          color: var(--accent);
        }
        .platform-modules__detail {
          position: relative;
        }
        .platform-modules__detail-glow {
          position: absolute;
          inset: 0;
          background: rgba(200, 148, 62, 0.04);
          filter: blur(80px);
          border-radius: var(--radius-2xl);
          z-index: -1;
        }
        .platform-modules__detail-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-xl);
          min-height: 380px;
        }
        .platform-modules__detail-header {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }
        .platform-modules__detail-icon {
          width: 44px; height: 44px;
          border-radius: var(--radius-xl);
          background: var(--accent-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }
        .platform-modules__detail-title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          margin: 0;
          color: var(--text);
        }
        .platform-modules__detail-desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: 0;
        }
        .platform-modules__features {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .platform-modules__feature {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          background: rgba(35, 31, 28, 0.4);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          font-size: var(--text-sm);
          color: var(--text);
        }
        .platform-modules__feature-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        /* ── Feature Map ── */
        .platform-featuremap {
          position: relative;
          z-index: 1;
        }
        .platform-featuremap__container {
          max-width: 960px;
          margin: 0 auto;
          padding: var(--space-20) var(--space-6);
        }
        .platform-featuremap__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .platform-featuremap__group {
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: rgba(35, 31, 28, 0.3);
        }
        .platform-featuremap__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-6);
          background: transparent;
          border: none;
          color: var(--text);
          cursor: pointer;
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 600;
          transition: background var(--duration-fast) var(--ease-default);
        }
        .platform-featuremap__trigger:hover {
          background: rgba(35, 31, 28, 0.3);
        }
        .platform-featuremap__trigger-text {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .platform-featuremap__trigger-emoji {
          font-size: var(--text-lg);
        }
        .platform-featuremap__trigger-count {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          font-weight: 400;
          margin-left: var(--space-2);
        }
        .platform-featuremap__chevron {
          color: var(--text-disabled);
          transition: transform var(--duration-fast) var(--ease-default);
          flex-shrink: 0;
        }
        .platform-featuremap__chevron--open {
          transform: rotate(180deg);
        }
        .platform-featuremap__body {
          padding: 0 var(--space-6) var(--space-5);
        }
        .platform-featuremap__features {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-2);
        }
        @media (min-width: 640px) {
          .platform-featuremap__features { grid-template-columns: 1fr 1fr; }
        }
        .platform-featuremap__feature {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text);
          padding: var(--space-2) 0;
        }
        .platform-featuremap__feature-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        /* ── Card Grids ── */
        .platform-card-grid {
          display: grid;
          gap: var(--space-4);
        }
        .platform-card-grid--3 {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .platform-card-grid--3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .platform-card-grid--3 { grid-template-columns: repeat(3, 1fr); }
        }
        .platform-card-grid--4 {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .platform-card-grid--4 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .platform-card-grid--4 { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1280px) {
          .platform-card-grid--4 { grid-template-columns: repeat(4, 1fr); }
        }
        .platform-card {
          padding: var(--space-6);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          transition: all var(--duration-fast) var(--ease-default);
        }
        .platform-card--hover:hover {
          border-color: rgba(200, 148, 62, 0.3);
          transform: translateY(-2px);
        }
        .platform-card--sm {
          padding: var(--space-5);
        }
        .platform-card__emoji {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-3);
        }
        .platform-card__title {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-2);
        }
        .platform-card__title--sm {
          font-size: var(--text-sm);
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-2);
        }
        .platform-card__desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }
        .platform-card__desc--sm {
          font-size: var(--text-xs);
        }

        /* ── AI Section ── */
        .platform-ai {
          background: rgba(35, 31, 28, 0.15);
          position: relative;
          z-index: 1;
        }

        /* ── Integrations ── */
        .platform-integrations {
          position: relative;
          z-index: 1;
        }

        /* ── Tech Stack ── */
        .platform-stack {
          background: rgba(35, 31, 28, 0.15);
          position: relative;
          z-index: 1;
        }
        .platform-stack__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
        }
        @media (min-width: 640px) {
          .platform-stack__grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .platform-stack__grid { grid-template-columns: repeat(5, 1fr); }
        }
        .platform-stack__item {
          padding: var(--space-5);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          text-align: center;
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .platform-stack__item:hover {
          border-color: rgba(200, 148, 62, 0.25);
        }
        .platform-stack__layer {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--text-disabled);
          margin-bottom: var(--space-2);
        }
        .platform-stack__tech {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
          transition: color var(--duration-fast) var(--ease-default);
        }
        .platform-stack__item:hover .platform-stack__tech {
          color: var(--accent);
        }

        /* ── Roles ── */
        .platform-roles {
          position: relative;
          z-index: 1;
        }
        .platform-roles__table-wrap {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .platform-roles__table {
          width: 100%;
          font-size: var(--text-sm);
          border-collapse: collapse;
        }
        .platform-roles__table thead tr {
          border-bottom: 1px solid var(--border);
        }
        .platform-roles__table th {
          text-align: left;
          padding: var(--space-3) var(--space-6);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--text-disabled);
        }
        .platform-roles__table tbody tr {
          border-top: 1px solid var(--border-subtle);
          transition: background var(--duration-fast) var(--ease-default);
        }
        .platform-roles__table tbody tr:hover {
          background: rgba(35, 31, 28, 0.3);
        }
        .platform-roles__role {
          padding: var(--space-3) var(--space-6);
          font-weight: 700;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .platform-roles__lock {
          color: var(--text-disabled);
          flex-shrink: 0;
        }
        .platform-roles__access {
          padding: var(--space-3) var(--space-6);
          color: var(--text-muted);
        }
        .platform-roles__users {
          padding: var(--space-3) var(--space-6);
          color: var(--text-disabled);
        }
        .platform-roles__hide-mobile {
          display: none;
        }
        @media (min-width: 768px) {
          .platform-roles__hide-mobile { display: table-cell; }
        }

        /* ── Pricing ── */
        .platform-pricing {
          background: rgba(35, 31, 28, 0.15);
          position: relative;
          z-index: 1;
        }
        .platform-pricing__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .platform-pricing__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .platform-pricing__grid { grid-template-columns: repeat(4, 1fr); }
        }
        .platform-pricing__card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .platform-pricing__card--highlight {
          border-color: var(--accent);
          box-shadow: 0 0 30px rgba(200, 148, 62, 0.1);
        }
        .platform-pricing__badge {
          position: absolute;
          top: calc(-1 * var(--space-3));
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: var(--bg);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding: var(--space-1) var(--space-4);
          border-radius: var(--radius-full);
          white-space: nowrap;
        }
        .platform-pricing__tier {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-3);
        }
        .platform-pricing__price {
          margin-bottom: var(--space-4);
          display: flex;
          align-items: baseline;
          gap: var(--space-1);
        }
        .platform-pricing__amount {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
        }
        .platform-pricing__period {
          font-size: var(--text-md);
          color: var(--text-muted);
        }
        .platform-pricing__desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-6);
        }
        .platform-pricing__features {
          list-style: none;
          margin: 0 0 var(--space-8);
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex: 1;
        }
        .platform-pricing__features li {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text);
        }
        .platform-pricing__check {
          color: var(--accent);
          flex-shrink: 0;
        }
        .platform-pricing__cta {
          width: 100%;
          text-align: center;
          justify-content: center;
        }

        /* ── Photo Strip (after Stats) ── */
        .platform-photostrip {
          position: relative;
          z-index: 1;
          line-height: 0;
        }
        .platform-photostrip__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }
        @media (min-width: 768px) {
          .platform-photostrip__grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
        .platform-photostrip__img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          filter: brightness(0.82) saturate(0.9);
          transition: filter 0.3s ease;
        }
        .platform-photostrip__img:hover {
          filter: brightness(0.95) saturate(1.05);
        }
        /* On mobile the 5th photo spans both columns */
        @media (max-width: 767px) {
          .platform-photostrip__img--span {
            grid-column: 1 / -1;
          }
        }

        /* ── Photo Break (3-up, full-bleed) ── */
        .platform-photobreak {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          line-height: 0;
        }
        .platform-photobreak__img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
          filter: brightness(0.78) saturate(0.88);
          transition: filter 0.3s ease;
        }
        .platform-photobreak__img:hover {
          filter: brightness(0.92) saturate(1.0);
        }

        /* ── Photo Hero (single full-width with overlay) ── */
        .platform-photohero {
          position: relative;
          z-index: 1;
          line-height: 0;
          overflow: hidden;
        }
        .platform-photohero__img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          object-position: center 60%;
          display: block;
          filter: brightness(0.72) saturate(0.85);
        }
        .platform-photohero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(26, 24, 22, 0.2) 0%,
            rgba(26, 24, 22, 0.55) 100%
          );
          pointer-events: none;
        }

        /* ── Footer ── */
        .platform-footer {
          border-top: 1px solid var(--border);
          position: relative;
          z-index: 1;
        }
        .platform-footer__inner {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-16) var(--space-6);
        }
        .platform-footer__main {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          align-items: center;
        }
        @media (min-width: 768px) {
          .platform-footer__main {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .platform-footer__brand {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        .platform-footer__copy {
          font-size: var(--text-sm);
          color: var(--text-disabled);
          margin: 0;
        }
        .platform-footer__bar {
          margin-top: var(--space-10);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          align-items: center;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--text-disabled);
        }
        @media (min-width: 768px) {
          .platform-footer__bar {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
}
