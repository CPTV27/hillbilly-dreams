// apps/web/app/media/services/page.tsx
// Deep South Directory — Services detail page
// Server component.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Deep South Directory services: AI content creation, social media management, photo and video production, local SEO, email marketing, analytics, and website hosting — powered by the Big Muddy network.',
};

const SERVICES = [
  {
    id: 'content',
    icon: '✦',
    label: 'AI Content Creation',
    title: 'Content That Sounds Like You',
    image: '/images/dsd/service-content.webp',
    desc: 'Claude-powered, brand-voice-matched content across every format — captions, blog posts, event copy, menus, email campaigns. We train the AI on your voice once. Every piece of content matches it.',
    tiers: [
      { name: 'Front Porch', detail: '20 posts/month, 2 platforms' },
      { name: 'The Route', detail: '40 posts/month, 3 platforms' },
      { name: 'River Room', detail: '60 posts/month, all platforms' },
      { name: 'Blues Room', detail: '100+ posts/month, custom calendar' },
    ],
    details: [
      'Brand voice profile built from onboarding interview',
      'Content calendar generated monthly, approved by you',
      'Captions, hashtags, and platform-native formatting',
      'Seasonal and event-driven content baked in',
      'Revision requests honored before anything publishes',
    ],
  },
  {
    id: 'social',
    icon: '◈',
    label: 'Social Media Management',
    title: 'Consistent. Scheduled. Done.',
    image: '/images/dsd/service-social.webp',
    desc: 'Multi-platform posting and scheduling, optimized for each platform\'s algorithm. You don\'t touch it. You just see the results in your monthly report.',
    tiers: [
      { name: 'Front Porch', detail: 'Facebook + Instagram' },
      { name: 'The Route', detail: 'Facebook, Instagram, + 1 more' },
      { name: 'River Room', detail: 'All major platforms' },
      { name: 'Blues Room', detail: 'All platforms + paid promotion' },
    ],
    details: [
      'Platform-native scheduling (not third-party tools)',
      'Optimal posting times by platform and audience',
      'Hashtag strategy built per business category',
      'Story and Reel templates included from Route up',
      'Paid ad management available as add-on or Blues Room',
    ],
  },
  {
    id: 'photo-video',
    icon: '⬡',
    label: 'Photo & Video Production',
    title: 'Every Business Has a Visual Story',
    image: '/images/dsd/service-photo.webp',
    desc: 'AI-powered photo enhancement transforms your existing photos into editorial-quality assets. River Room and Blues Room include video — short-form Reels/TikToks and longer-form features built on the Remotion pipeline.',
    tiers: [
      { name: 'Front Porch', detail: '10 enhanced images/month' },
      { name: 'The Route', detail: '25 enhanced images/month' },
      { name: 'River Room', detail: 'Unlimited images + 2 videos/month' },
      { name: 'Blues Room', detail: 'Unlimited images + 4 videos + photography' },
    ],
    details: [
      'AI enhancement: lighting, color grading, background cleanup',
      'Short-form video: 15–60 second Reels and TikToks',
      'Remotion-powered motion graphics for events and announcements',
      'Blues Room: on-site photography sessions included',
      'All assets delivered in platform-optimized formats',
    ],
  },
  {
    id: 'seo',
    icon: '◎',
    label: 'Local SEO & Reviews',
    title: 'Show Up Where People Are Looking',
    image: '/images/dsd/service-seo.webp',
    desc: 'Google Business Profile optimization, review response management, structured data implementation, and citation building. The unglamorous work that compounds into real search visibility.',
    tiers: [
      { name: 'Front Porch', detail: 'GBP optimization + review monitoring' },
      { name: 'The Route', detail: 'Full GBP + review responses' },
      { name: 'River Room', detail: 'Full suite + structured data' },
      { name: 'Blues Room', detail: 'Custom SEO strategy + PR' },
    ],
    details: [
      'Google Business Profile fully optimized and maintained',
      'Review response within 24 hours (Route and up)',
      'Schema markup: LocalBusiness, Menu, Events, FAQs',
      'Citation consistency across Yelp, TripAdvisor, Apple Maps',
      'Monthly ranking report — where you stand vs. competitors',
    ],
  },
  {
    id: 'ai-optimization',
    icon: '⬢',
    label: 'AI Search Optimization',
    title: 'Show Up When AI Answers the Question',
    image: '/images/dsd/service-ai.webp',
    desc: 'Google, ChatGPT, Perplexity, and Claude are replacing the search bar. When someone asks "best restaurants in Natchez" or "things to do in the Delta," AI pulls from structured data, authoritative content, and named entities. Most businesses aren\'t optimized for this. We fix that.',
    tiers: [
      { name: 'Front Porch', detail: 'AI audit + structured data basics' },
      { name: 'The Route', detail: 'Full schema markup + entity optimization' },
      { name: 'River Room', detail: 'AI content strategy + llms.txt + FAQ pages' },
      { name: 'Blues Room', detail: 'Full GEO strategy + monitoring + iteration' },
    ],
    details: [
      'AI Search Audit — how your business appears (or doesn\'t) in ChatGPT, Perplexity, Google AI Overviews',
      'Schema.org structured data: LocalBusiness, Restaurant, Hotel, FAQPage, Event, Menu',
      'Named entity density optimization — 15+ entities per page = 4.8x higher AI citation rate',
      'First-paragraph optimization — AI pulls 44% of citations from the first 30% of your content',
      'llms.txt and robots.txt configured for AI crawlers (GPTBot, ClaudeBot, PerplexityBot)',
      'FAQ sections written for AI extraction — question-and-answer format that AI models prefer',
      'Monthly AI visibility report — tracking your presence in AI-generated answers',
      'Competitor gap analysis — what AI says about your competitors that it doesn\'t say about you',
    ],
  },
  {
    id: 'email',
    icon: '▣',
    label: 'Email & Newsletter',
    title: 'Your Audience. Your Inbox.',
    image: '/images/dsd/service-email.webp',
    desc: 'Template-based campaigns and subscriber management. Monthly digests, event announcements, seasonal promotions, and loyalty programs — all written to your brand voice.',
    tiers: [
      { name: 'Front Porch', detail: 'Monthly newsletter' },
      { name: 'The Route', detail: 'Bi-weekly newsletter' },
      { name: 'River Room', detail: 'Weekly newsletter + automations' },
      { name: 'Blues Room', detail: 'Full email strategy + segmentation' },
    ],
    details: [
      'Branded email templates designed once, reused efficiently',
      'Subscriber growth tactics included (sign-up forms, QR codes)',
      'Event and promotion announcements on same-day turnaround',
      'Open rate and click tracking in your monthly report',
      'Blues Room: full segmentation, drip sequences, loyalty flows',
    ],
  },
  {
    id: 'analytics',
    icon: '◇',
    label: 'Analytics & Reporting',
    title: 'Know What\'s Working',
    image: '/images/dsd/service-analytics.webp',
    desc: 'Monthly reports showing what we did, what happened, and what we\'re doing next. No vanity metrics — just the numbers that connect to customers and revenue.',
    tiers: [
      { name: 'Front Porch', detail: 'Monthly report' },
      { name: 'The Route', detail: 'Monthly report + benchmarks' },
      { name: 'River Room', detail: 'Bi-weekly report + competitor intel' },
      { name: 'Blues Room', detail: 'Weekly dashboard + custom KPIs' },
    ],
    details: [
      'Reach, impressions, engagement by platform',
      'Website traffic, source attribution, and conversion tracking',
      'GBP metrics: searches, calls, direction requests',
      'Email: open rate, click rate, subscriber growth',
      'Quarterly strategy review with trend analysis (Route and up)',
    ],
  },
  {
    id: 'website',
    icon: '▲',
    label: 'Website & Microsites',
    title: 'A Home Base That Actually Works',
    image: '/images/dsd/service-website.webp',
    desc: 'Hosted on the Deep South Directory platform, your brand. Fast, mobile-first, SEO-optimized. Basic sites on The Route; full feature sites on River Room; custom builds on Blues Room.',
    tiers: [
      { name: 'Front Porch', detail: 'Directory listing page' },
      { name: 'The Route', detail: 'Basic site (5 pages, hosted)' },
      { name: 'River Room', detail: 'Full site with blog + events' },
      { name: 'Blues Room', detail: 'Custom build, CMS, integrations' },
    ],
    details: [
      'Hosted on Deep South Directory infrastructure — no separate hosting bill',
      'Mobile-first, Core Web Vitals optimized',
      'Menu, hours, events, and gallery updated by us',
      'Online reservation or booking links integrated',
      'SSL, uptime monitoring, and security included',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="svc-header">
        <div className="section-container">
          <div className="svc-header__inner">
            <div className="section-label">Services</div>
            <h1 className="svc-header__title">
              Everything You Need.
              <br />
              <em>Nothing You Don't.</em>
            </h1>
            <p className="svc-header__sub">
              Eight service categories. One integrated platform. Powered by the same AI stack
              that runs the Big Muddy network — Magazine, Radio, and Touring.
            </p>
            <div className="svc-header__nav" role="navigation" aria-label="Service sections">
              {SERVICES.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="svc-header__nav-link">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Sections ── */}
      {SERVICES.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`svc-section ${i % 2 === 1 ? 'svc-section--alt' : ''}`}
        >
          <div className="section-container">
            <div className="svc-section__layout">
              {/* Image banner */}
              {svc.image && (
                <div className="svc-section__image" aria-hidden="true">
                  <div
                    className="svc-section__image-bg"
                    style={{ backgroundImage: `url(${svc.image})` }}
                  />
                </div>
              )}
              {/* Left: content */}
              <div className="svc-section__text">
                <div className="svc-section__eyebrow">
                  <span className="svc-section__icon" aria-hidden="true">{svc.icon}</span>
                  <span className="section-label" style={{ margin: 0 }}>{svc.label}</span>
                </div>
                <h2 className="section-title">{svc.title}</h2>
                <p className="section-desc" style={{ maxWidth: '100%' }}>{svc.desc}</p>
                <ul className="svc-section__details" role="list">
                  {svc.details.map((d) => (
                    <li key={d} className="svc-section__detail-item">
                      <span className="svc-section__detail-bullet" aria-hidden="true">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right: tier breakdown */}
              <div className="svc-section__tiers">
                <div className="svc-section__tiers-label">What you get, by tier</div>
                {svc.tiers.map((t) => (
                  <div key={t.name} className={`svc-tier-row ${t.detail === 'Not included' ? 'svc-tier-row--disabled' : ''}`}>
                    <span className="svc-tier-row__name">{t.name}</span>
                    <span className="svc-tier-row__detail">{t.detail}</span>
                  </div>
                ))}
                <a href="/media/pricing" className="btn btn--outline svc-section__pricing-link">
                  View Full Pricing →
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Bottom CTA ── */}
      <section className="svc-cta">
        <div className="section-container">
          <div className="svc-cta__inner">
            <div className="section-label">Ready?</div>
            <h2 className="svc-cta__title">Let's Build Your Media Engine</h2>
            <p className="svc-cta__sub">
              Tell us about your business and we'll put together the right mix of services.
              No package that doesn't fit. No services you don't need.
            </p>
            <div className="svc-cta__buttons">
              <a href="/media/get-started" className="btn btn--primary">Get Started</a>
              <a href="/media/pricing" className="btn btn--ghost">See Pricing</a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .svc-header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .svc-header__inner {
          max-width: 760px;
        }
        .svc-header__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .svc-header__title em {
          font-style: italic;
          color: var(--accent);
        }
        .svc-header__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-10);
          max-width: 600px;
        }
        .svc-header__nav {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2) var(--space-4);
        }
        .svc-header__nav-link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          text-decoration: none;
          padding: var(--space-2) var(--space-4);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          transition: color var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default);
        }
        .svc-header__nav-link:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        /* ── Service Image ── */
        .svc-section__image {
          grid-column: 1 / -1;
          width: 100%;
          height: 200px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: var(--space-2);
        }
        .svc-section__image-bg {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          transition: opacity 0.4s ease;
        }
        .svc-section:hover .svc-section__image-bg {
          opacity: 0.7;
        }
        @media (min-width: 768px) {
          .svc-section__image { height: 240px; }
        }

        /* ── Service Sections ── */
        .svc-section {
          border-bottom: 1px solid var(--border);
        }
        .svc-section--alt {
          background: var(--surface);
        }
        .svc-section__layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: start;
        }
        @media (min-width: 768px) {
          .svc-section__layout {
            grid-template-columns: 1.4fr 1fr;
          }
        }
        .svc-section__eyebrow {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        .svc-section__icon {
          font-size: var(--text-xl);
          color: var(--accent);
          line-height: 1;
        }
        .svc-section__details {
          list-style: none;
          margin: var(--space-8) 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding-left: var(--space-4);
          border-left: 1px solid var(--border);
        }
        .svc-section__detail-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }
        .svc-section__detail-bullet {
          color: var(--accent);
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* ── Tier Breakdown ── */
        .svc-section__tiers {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .svc-section__tiers-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-2);
        }
        .svc-tier-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          padding: var(--space-3) 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .svc-tier-row:last-of-type {
          border-bottom: none;
        }
        .svc-tier-row--disabled .svc-tier-row__name,
        .svc-tier-row--disabled .svc-tier-row__detail {
          opacity: 0.35;
        }
        .svc-tier-row__name {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          white-space: nowrap;
        }
        .svc-tier-row__detail {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
          text-align: right;
        }
        .svc-section__pricing-link {
          margin-top: var(--space-2);
          font-size: var(--text-xs);
          padding: var(--space-2) var(--space-4);
          align-self: flex-start;
        }

        /* ── Bottom CTA ── */
        .svc-cta {
          background: var(--surface);
        }
        .svc-cta__inner {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }
        .svc-cta__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .svc-cta__sub {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-8);
        }
        .svc-cta__buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
