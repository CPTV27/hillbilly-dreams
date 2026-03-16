// apps/web/app/media/page.tsx
// Deep South Directory — homepage / landing page
// Server component. Dark, editorial, Southern Gothic.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deep South Directory | The Local Business Network for the Mississippi Corridor',
  description:
    'Join the directory. Get featured in the magazine. Get played on the radio. Get found on the route. AI-powered media services for local businesses — starting at $99/month.',
};

const WHAT_YOU_GET = [
  {
    icon: '01',
    title: 'Listed in the Directory',
    desc: 'Your business shows up in the Deep South Directory — a curated, SEO-optimized listing that puts you in front of travelers, locals, and people planning trips along the corridor.',
  },
  {
    icon: '02',
    title: 'Featured in the Magazine',
    desc: 'Big Muddy Magazine writes city guides, features, and photo essays. Directory members get included in the editorial — real stories, not ads.',
  },
  {
    icon: '03',
    title: 'Played on the Radio',
    desc: 'Big Muddy Radio produces audio and video content. Your events, your music, your story — featured in shows and playlists that reach the whole corridor.',
  },
  {
    icon: '04',
    title: 'On the Touring Route',
    desc: 'Big Muddy Touring drives people down the corridor. Directory businesses become stops on the route — recommended by name in every city guide.',
  },
  {
    icon: '05',
    title: 'Social Media Done for You',
    desc: 'AI-generated posts matched to your brand voice, published across your platforms. The higher your tier, the more posts, more platforms, more content.',
  },
  {
    icon: '06',
    title: 'Reviews, SEO & Reporting',
    desc: 'Google Business Profile optimization, AI-drafted review responses, and a monthly report showing exactly what happened. No mystery.',
  },
];

const CAPABILITIES = [
  { name: 'AI Content Generation', tiers: ['Basic', 'Full', 'Full', 'Custom'] },
  { name: 'Social Media Management', tiers: ['1 platform', '3 platforms', 'All platforms', 'All + ads'] },
  { name: 'Photo Enhancement', tiers: ['—', '4/mo', '8/mo', '20/mo'] },
  { name: 'Video Production', tiers: ['—', '—', '2/mo', '4/mo'] },
  { name: 'Local SEO & GBP', tiers: ['Basic', 'Full', 'Full', 'Custom'] },
  { name: 'Review Management', tiers: ['—', 'Included', 'Full', 'Full'] },
  { name: 'Email Marketing', tiers: ['—', 'Bi-weekly', 'Weekly', 'Custom'] },
  { name: 'Analytics & Reporting', tiers: ['Monthly', 'Monthly', 'Monthly', 'Weekly'] },
  { name: 'Strategy Calls', tiers: ['—', 'Quarterly', 'Monthly', 'Weekly'] },
  { name: 'Website', tiers: ['—', 'Basic', 'Full', 'Custom'] },
];

const TIER_NAMES = ['Front Porch\n$99', 'The Route\n$299', 'River Room\n$599', 'Blues Room\n$1,200+'];

const BRANDS = [
  {
    name: 'Big Muddy Touring',
    url: 'https://bigmuddytouring.com',
    desc: 'The flagship. Memphis to New Orleans music corridor. City guides, lodging, the route.',
    stat: '18 cities',
  },
  {
    name: 'Big Muddy Magazine',
    url: 'https://bigmuddymagazine.com',
    desc: 'Long-form editorial, photo essays, and city guides. Southern Gothic storytelling.',
    stat: 'Weekly',
  },
  {
    name: 'Big Muddy Radio',
    url: 'https://bigmuddyradio.com',
    desc: 'Curated playlists and live sessions. The sound of the river.',
    stat: 'Always on',
  },
  {
    name: 'The Big Muddy Inn',
    url: 'https://bigmuddytouring.com/inn',
    desc: 'Six-suite boutique hotel in Natchez, Mississippi. 411 N Commerce St.',
    stat: '6 suites',
  },
  {
    name: 'Outsider Economics',
    url: 'https://outsidereconomics.com',
    desc: 'Counter-narrative economics. The intellectual arm of the Big Muddy network.',
    stat: 'Published',
  },
];

const MOAT = [
  {
    title: 'The Network Is the Product',
    desc: 'This isn\'t an agency. It\'s a network. Every business in the directory makes the network more valuable for every other business. Cross-promotion, event packaging, corridor-wide campaigns.',
  },
  {
    title: 'We\'re Already Doing the Marketing',
    desc: 'The magazine is publishing. The radio is broadcasting. The touring content is live. You\'re not hiring us to start — you\'re joining something that\'s already running.',
  },
  {
    title: 'AI Does the Heavy Lifting',
    desc: 'Content generation, review responses, scheduling, reporting — the AI handles 90% of the work. That\'s why this starts at $99 instead of $3,000.',
  },
  {
    title: 'One River. One Story.',
    desc: 'Every business in the directory is part of one story — the Mississippi corridor. Travelers don\'t visit one restaurant. They drive the route. You\'re a stop on that route.',
  },
];

export default function MediaHomepage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="media-hero">
        <div className="media-hero__bg-pattern" aria-hidden="true" />
        <div className="media-hero__content">
          <div className="media-hero__eyebrow">
            <span className="media-hero__ornament">&#9670;</span>
            <span>Deep South Directory · Mississippi Corridor</span>
          </div>
          <h1 className="media-hero__title">
            Join the Directory.
            <br />
            <em>Join the Network.</em>
          </h1>
          <p className="media-hero__sub">
            We run a magazine, a radio show, and a touring brand along the Mississippi corridor.
            Thousands of people read, listen, and travel the route every month.
            The Deep South Directory puts your business in front of all of them.
          </p>
          <div className="media-hero__ctas">
            <a href="/media/pricing" className="btn btn--primary">
              See Pricing
            </a>
            <a href="/media/how-it-works" className="btn btn--ghost">
              How It Works
            </a>
          </div>
          <div className="media-hero__proof">
            <span>Starting at $99/month</span>
            <span className="media-hero__proof-dot" aria-hidden="true">·</span>
            <span>No contracts</span>
            <span className="media-hero__proof-dot" aria-hidden="true">·</span>
            <span>Cancel anytime</span>
          </div>
        </div>
        <div className="media-hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <svg width="1" height="40" viewBox="0 0 1 40">
            <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="media-problem">
        <div className="section-container">
          <div className="media-problem__header">
            <div className="section-label">What You Get</div>
            <h2 className="section-title">One Subscription. The Whole Network.</h2>
            <p className="section-desc">
              When you join the Deep South Directory, you don't just get a listing.
              You get plugged into a media network that's already reaching people across the corridor —
              magazine, radio, touring, social, all of it.
            </p>
          </div>
          <div className="media-problem__grid">
            {WHAT_YOU_GET.map((item) => (
              <div key={item.title} className="media-problem__card">
                <span className="media-problem__icon" aria-hidden="true">{item.icon}</span>
                <h3 className="media-problem__card-title">{item.title}</h3>
                <p className="media-problem__card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution: Capabilities Table ── */}
      <section className="media-solution">
        <div className="section-container">
          <div className="media-solution__header">
            <div className="section-label">The Tiers</div>
            <h2 className="section-title">More Tier. More Action.</h2>
            <p className="section-desc">
              Every tier gets you in the directory and into the network. Go up a tier and we do more —
              more posts, more platforms, more media, more features. All powered by AI at prices
              that don't require a board meeting.
            </p>
          </div>
          <div className="media-cap-table-wrap">
            <table className="media-cap-table" role="table" aria-label="Service capabilities by tier">
              <thead>
                <tr>
                  <th className="media-cap-table__feature-col">Capability</th>
                  {TIER_NAMES.map((t) => (
                    <th key={t} className="media-cap-table__tier-col">
                      {t.split('\n').map((line, i) => (
                        <span key={i} className={i === 0 ? 'media-cap-table__tier-name' : 'media-cap-table__tier-price'}>
                          {line}
                        </span>
                      ))}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((cap, i) => (
                  <tr key={cap.name} className={i % 2 === 0 ? 'media-cap-table__row--alt' : ''}>
                    <td className="media-cap-table__feature">{cap.name}</td>
                    {cap.tiers.map((val, j) => (
                      <td key={j} className={`media-cap-table__val ${val === '—' ? 'media-cap-table__val--empty' : ''}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="media-solution__cta">
            <a href="/media/pricing" className="btn btn--outline">View Full Pricing →</a>
          </div>
        </div>
      </section>

      {/* ── Social Proof: Built on a Proven Engine ── */}
      <section className="media-proof">
        <div className="section-container">
          <div className="media-proof__header">
            <div className="section-label">The Network</div>
            <h2 className="section-title">The Brands Behind the Directory</h2>
            <p className="section-desc">
              The Deep South Directory is powered by these properties. When you join,
              you get featured across all of them — magazine articles, radio segments,
              touring guides. This is the network you're subscribing to.
            </p>
          </div>
          <div className="media-proof__brands">
            {BRANDS.map((brand) => (
              <a key={brand.name} href={brand.url} className="media-proof__brand" target="_blank" rel="noopener noreferrer">
                <div className="media-proof__brand-stat">{brand.stat}</div>
                <div className="media-proof__brand-name">{brand.name}</div>
                <p className="media-proof__brand-desc">{brand.desc}</p>
                <span className="media-proof__brand-link">Visit →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Moat ── */}
      <section className="media-moat">
        <div className="section-container">
          <div className="media-moat__header">
            <div className="section-label">The Difference</div>
            <h2 className="section-title">What Makes This Different</h2>
          </div>
          <div className="media-moat__grid">
            {MOAT.map((item, i) => (
              <div key={item.title} className="media-moat__card">
                <div className="media-moat__num">0{i + 1}</div>
                <h3 className="media-moat__title">{item.title}</h3>
                <p className="media-moat__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="media-cta-section">
        <div className="section-container">
          <div className="media-cta-section__inner">
            <div className="section-label">Get Started</div>
            <h2 className="media-cta-section__title">Get In the Directory.</h2>
            <p className="media-cta-section__sub">
              First month free. No contracts. Cancel anytime.
              We come to you, learn your business, build your voice, and put you in front of the whole corridor.
            </p>
            <div className="media-cta-section__buttons">
              <a href="/media/get-started" className="btn btn--primary">Get Started</a>
              <a href="/media/how-it-works" className="btn btn--ghost">See How It Works</a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .media-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
        }
        .media-hero__bg-pattern {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% -5%, rgba(200, 148, 62, 0.1) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(200, 148, 62, 0.04) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(200, 148, 62, 0.025) 80px,
              rgba(200, 148, 62, 0.025) 81px
            );
        }
        .media-hero__content {
          position: relative;
          z-index: 1;
          max-width: 820px;
          padding: var(--space-24) var(--space-6);
          text-align: center;
        }
        .media-hero__eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-8);
        }
        .media-hero__ornament {
          font-size: 8px;
        }
        .media-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-6);
        }
        .media-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .media-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 640px;
          margin: 0 auto var(--space-10);
        }
        .media-hero__ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          margin-bottom: var(--space-8);
        }
        .media-hero__proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
        }
        .media-hero__proof-dot {
          color: var(--border-strong);
        }
        .media-hero__scroll-hint {
          position: absolute;
          bottom: var(--space-8);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          z-index: 1;
        }

        /* ── Problem ── */
        .media-problem {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .media-problem__header {
          margin-bottom: var(--space-12);
        }
        .media-problem__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 640px) {
          .media-problem__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .media-problem__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .media-problem__card {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .media-problem__card:hover {
          border-color: var(--border-strong);
        }
        .media-problem__icon {
          display: block;
          font-size: var(--text-xs);
          color: var(--accent);
          margin-bottom: var(--space-4);
          letter-spacing: 0;
        }
        .media-problem__card-title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .media-problem__card-desc {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── Solution / Capabilities Table ── */
        .media-solution__header {
          margin-bottom: var(--space-10);
        }
        .media-cap-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        .media-cap-table {
          width: 100%;
          min-width: 600px;
          border-collapse: collapse;
          font-family: var(--font-body);
        }
        .media-cap-table thead {
          background: var(--surface-2);
          border-bottom: 1px solid var(--border-strong);
        }
        .media-cap-table th {
          padding: var(--space-4) var(--space-5);
          text-align: center;
          vertical-align: bottom;
        }
        .media-cap-table__feature-col {
          text-align: left;
          width: 30%;
        }
        .media-cap-table__tier-col {
          min-width: 120px;
        }
        .media-cap-table__tier-name {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
        }
        .media-cap-table__tier-price {
          display: block;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          margin-top: var(--space-1);
        }
        .media-cap-table tbody tr {
          border-bottom: 1px solid var(--border-subtle);
          transition: background var(--duration-fast) var(--ease-default);
        }
        .media-cap-table tbody tr:hover {
          background: var(--accent-subtle);
        }
        .media-cap-table tbody tr:last-child {
          border-bottom: none;
        }
        .media-cap-table__row--alt {
          background: rgba(240, 235, 224, 0.02);
        }
        .media-cap-table__feature {
          padding: var(--space-4) var(--space-5);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-muted);
          text-align: left;
        }
        .media-cap-table__val {
          padding: var(--space-4) var(--space-5);
          font-size: var(--text-sm);
          color: var(--text);
          font-weight: 500;
          text-align: center;
        }
        .media-cap-table__val--empty {
          color: var(--text-disabled);
        }
        .media-solution__cta {
          margin-top: var(--space-8);
          text-align: center;
        }

        /* ── Social Proof ── */
        .media-proof {
          background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%);
          border-top: 1px solid var(--border);
        }
        .media-proof__header {
          margin-bottom: var(--space-12);
        }
        .media-proof__brands {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-5);
        }
        @media (min-width: 640px) {
          .media-proof__brands {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .media-proof__brands {
            grid-template-columns: repeat(5, 1fr);
          }
        }
        .media-proof__brand {
          display: flex;
          flex-direction: column;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          text-decoration: none;
          transition: border-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default);
        }
        .media-proof__brand:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .media-proof__brand-stat {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }
        .media-proof__brand-name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin-bottom: var(--space-3);
        }
        .media-proof__brand-desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-5);
          flex: 1;
        }
        .media-proof__brand-link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          margin-top: auto;
        }

        /* ── Moat ── */
        .media-moat {
          border-top: 1px solid var(--border);
        }
        .media-moat__header {
          margin-bottom: var(--space-12);
        }
        .media-moat__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .media-moat__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .media-moat__card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          position: relative;
          overflow: hidden;
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .media-moat__card:hover {
          border-color: var(--border-strong);
        }
        .media-moat__num {
          font-family: var(--font-mono);
          font-size: 4rem;
          font-weight: 800;
          color: var(--accent);
          opacity: 0.08;
          position: absolute;
          top: var(--space-4);
          right: var(--space-6);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .media-moat__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-4);
        }
        .media-moat__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 420px;
        }

        /* ── Final CTA ── */
        .media-cta-section {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .media-cta-section__inner {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .media-cta-section__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .media-cta-section__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-10);
        }
        .media-cta-section__buttons {
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
