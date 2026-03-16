// apps/web/app/media/pricing/page.tsx
// Deep South Directory — Pricing page
// Server component.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Deep South Directory pricing plans for local businesses. From $99/month for the Front Porch plan to custom Blues Room engagements.',
};

const TIERS = [
  {
    id: 'front-porch',
    name: 'Front Porch',
    price: '$99',
    period: '/month',
    tagline: 'Get in the directory. Get found.',
    popular: false,
    features: [
      'Deep South Directory listing',
      'Featured in Big Muddy Magazine directory',
      'Included in corridor touring guides',
      '12 social posts/month (1 platform)',
      'Google Business Profile optimization',
      'Monthly performance report',
      'Brand voice onboarding',
    ],
    cta: 'Get Started',
    href: '/media/get-started?tier=front-porch',
  },
  {
    id: 'the-route',
    name: 'The Route',
    price: '$299',
    period: '/month',
    tagline: 'The workhorse. Most businesses start here.',
    popular: true,
    features: [
      'Everything in Front Porch, plus:',
      '30 posts/month across 3 platforms',
      '4 AI-enhanced photos/month',
      'Magazine feature articles about your business',
      'Radio mentions & event spotlights',
      'Review response management',
      'Bi-weekly email newsletter',
      'Basic website (hosted)',
      'Quarterly strategy call',
      'Full GBP management & local SEO',
    ],
    cta: 'Start The Route',
    href: '/media/get-started?tier=the-route',
  },
  {
    id: 'river-room',
    name: 'River Room',
    price: '$599',
    period: '/month',
    tagline: 'Full-service. Full network access.',
    popular: false,
    features: [
      'Everything in The Route, plus:',
      '60 posts/month across all platforms',
      '8 enhanced images + 2 videos/month',
      'Dedicated magazine brand page',
      'Radio show features & audio content',
      'Full review management & responses',
      'Weekly email newsletter',
      'Event promotion (up to 4/month)',
      'Monthly strategy call',
      'Full website with blog',
    ],
    cta: 'Book River Room',
    href: '/media/get-started?tier=river-room',
  },
  {
    id: 'blues-room',
    name: 'The Blues Room',
    price: '$1,200+',
    period: '/month',
    tagline: 'Total media partnership. Co-branded everything.',
    popular: false,
    features: [
      'Everything in River Room, plus:',
      '100+ posts/month, all platforms',
      '20 enhanced images + 4 videos/month',
      'Co-branded corridor events',
      'Professional photography sessions',
      'Long-form video production',
      'Managed advertising campaigns',
      'PR outreach & press placements',
      'White-label analytics dashboard',
      'Dedicated account manager',
      'Weekly strategy calls',
    ],
    cta: 'Let\'s Talk',
    href: '/media/get-started?tier=blues-room',
  },
];

const ADD_ONS = [
  { name: 'Additional social platform', price: '$49/mo' },
  { name: 'Extra enhanced photos (pack of 4)', price: '$79' },
  { name: 'Short-form video (pack of 2)', price: '$149' },
  { name: 'One-time brand voice audit', price: '$199' },
  { name: 'Event photography + content', price: '$299/event' },
  { name: 'Press release & distribution', price: '$249' },
  { name: 'Google Ads management', price: '$199/mo + spend' },
  { name: 'Custom landing page', price: '$499' },
];

const FAQS = [
  {
    q: 'Do I have to sign a contract?',
    a: 'No. All plans are month-to-month. Cancel any time with 30 days notice. We don\'t lock you in — we earn your business every month.',
  },
  {
    q: 'What does the first month look like?',
    a: 'We start with an onboarding call (or in-person visit for River Room and Blues Room clients). We learn your brand, take photos if needed, and build your voice profile. Your first month of content is free while we set everything up.',
  },
  {
    q: 'How does the AI content generation work?',
    a: 'We use Claude (Anthropic\'s AI) to generate content matched to your brand voice. Every post is reviewed by our team before it goes out. You also get final approval — nothing publishes without your green light.',
  },
  {
    q: 'What does "in the directory" actually mean?',
    a: 'Every subscriber gets a curated listing on deepsouthdirectory.com — SEO-optimized, linked to your socials, featured in our corridor city guides. You also get listed in Big Muddy Magazine\'s business directory. Higher tiers get full editorial features, radio mentions, and dedicated brand pages.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No setup fees. Ever. Your first month is included free while we build your brand profile and content calendar.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes. You can change plans at any time. Upgrades are effective immediately; downgrades take effect at the next billing cycle.',
  },
  {
    q: 'Do you work with businesses outside the Mississippi corridor?',
    a: 'We focus on the corridor — it\'s our home and our network. But we do take select clients outside the region on a case-by-case basis. Contact us and we\'ll tell you honestly if we\'re the right fit.',
  },
  {
    q: 'What platforms do you manage?',
    a: 'Facebook, Instagram, TikTok, Google Business Profile, X (Twitter), and LinkedIn. Front Porch covers one; The Route covers three; River Room and Blues Room cover all.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="pricing-header">
        <div className="section-container">
          <div className="pricing-header__inner">
            <div className="section-label">Pricing</div>
            <h1 className="pricing-header__title">
              Join the Directory.<br /><em>Pick Your Tier.</em>
            </h1>
            <p className="pricing-header__sub">
              Every tier gets you listed in the directory, featured in the magazine, and plugged into the network.
              Go up a tier and we do more — more posts, more platforms, more media.
              First month free while we build your profile.
            </p>
            <div className="pricing-header__proof">
              <span>No contracts</span>
              <span className="pricing-header__dot" aria-hidden="true">·</span>
              <span>No setup fees</span>
              <span className="pricing-header__dot" aria-hidden="true">·</span>
              <span>First month free</span>
              <span className="pricing-header__dot" aria-hidden="true">·</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="pricing-tiers">
        <div className="section-container">
          <div className="pricing-grid">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`pricing-card ${tier.popular ? 'pricing-card--popular' : ''}`}
              >
                {tier.popular && (
                  <div className="pricing-card__badge">Most Popular</div>
                )}
                <div className="pricing-card__header">
                  <div className="pricing-card__name">{tier.name}</div>
                  <div className="pricing-card__price-row">
                    <span className="pricing-card__price">{tier.price}</span>
                    <span className="pricing-card__period">{tier.period}</span>
                  </div>
                  <p className="pricing-card__tagline">{tier.tagline}</p>
                </div>
                <ul className="pricing-card__features" role="list">
                  {tier.features.map((f) => (
                    <li key={f} className="pricing-card__feature">
                      <span className="pricing-card__check" aria-hidden="true">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  className={`btn ${tier.popular ? 'btn--primary' : 'btn--outline'} pricing-card__cta`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Add-Ons ── */}
      <section className="pricing-addons">
        <div className="section-container">
          <div className="pricing-addons__header">
            <div className="section-label">Add-Ons</div>
            <h2 className="section-title">Build the Plan You Need</h2>
            <p className="section-desc">
              Add services à la carte to any plan. Mix and match to fit your business and budget.
            </p>
          </div>
          <div className="pricing-addons__table-wrap">
            <table className="pricing-addons__table" role="table" aria-label="Add-on services and pricing">
              <thead>
                <tr>
                  <th className="pricing-addons__th pricing-addons__th--service">Service</th>
                  <th className="pricing-addons__th pricing-addons__th--price">Price</th>
                </tr>
              </thead>
              <tbody>
                {ADD_ONS.map((addon, i) => (
                  <tr key={addon.name} className={i % 2 === 0 ? 'pricing-addons__row--alt' : ''}>
                    <td className="pricing-addons__td pricing-addons__td--service">{addon.name}</td>
                    <td className="pricing-addons__td pricing-addons__td--price">{addon.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pricing-faq">
        <div className="section-container">
          <div className="pricing-faq__header">
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="pricing-faq__grid">
            {FAQS.map((faq) => (
              <div key={faq.q} className="pricing-faq__item">
                <h3 className="pricing-faq__q">{faq.q}</h3>
                <p className="pricing-faq__a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pricing-bottom-cta">
        <div className="section-container">
          <div className="pricing-bottom-cta__inner">
            <div className="section-label">Ready?</div>
            <h2 className="pricing-bottom-cta__title">Start Your First Month Free</h2>
            <p className="pricing-bottom-cta__sub">
              Tell us about your business and we'll put together a plan that fits.
              No hard sell. Just an honest conversation about what we can do for you.
            </p>
            <a href="/media/get-started" className="btn btn--primary">Get Started</a>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .pricing-header {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .pricing-header__inner {
          max-width: 680px;
          padding-bottom: var(--space-4);
        }
        .pricing-header__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .pricing-header__title em {
          font-style: italic;
          color: var(--accent);
        }
        .pricing-header__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-8);
          max-width: 580px;
        }
        .pricing-header__proof {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
        }
        .pricing-header__dot {
          color: var(--border-strong);
        }

        /* ── Pricing Grid ── */
        .pricing-tiers {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
          align-items: start;
        }
        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1200px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .pricing-card {
          display: flex;
          flex-direction: column;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          position: relative;
          transition: border-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default);
        }
        .pricing-card:hover {
          border-color: var(--border-strong);
        }
        .pricing-card--popular {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .pricing-card--popular:hover {
          border-color: var(--accent-hover);
        }
        .pricing-card__badge {
          position: absolute;
          top: calc(-1 * var(--space-4));
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: var(--bg);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 800;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding: var(--space-1) var(--space-4);
          border-radius: var(--radius-full);
          white-space: nowrap;
        }
        .pricing-card__header {
          margin-bottom: var(--space-6);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--border-subtle);
        }
        .pricing-card__name {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin-bottom: var(--space-3);
        }
        .pricing-card__price-row {
          display: flex;
          align-items: baseline;
          gap: var(--space-1);
          margin-bottom: var(--space-2);
        }
        .pricing-card__price {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--accent);
          letter-spacing: var(--tracking-tight);
        }
        .pricing-card__period {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
        }
        .pricing-card__tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: 0;
          font-style: italic;
        }
        .pricing-card__features {
          list-style: none;
          margin: 0 0 var(--space-8);
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex: 1;
        }
        .pricing-card__feature {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }
        .pricing-card__check {
          color: var(--accent);
          font-size: var(--text-sm);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .pricing-card__cta {
          width: 100%;
          justify-content: center;
        }

        /* ── Add-Ons ── */
        .pricing-addons {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .pricing-addons__header {
          margin-bottom: var(--space-8);
        }
        .pricing-addons__table-wrap {
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .pricing-addons__table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body);
        }
        .pricing-addons__th {
          background: var(--surface-2);
          padding: var(--space-4) var(--space-5);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-strong);
        }
        .pricing-addons__th--service { text-align: left; }
        .pricing-addons__th--price { text-align: right; }
        .pricing-addons__td {
          padding: var(--space-4) var(--space-5);
          font-size: var(--text-sm);
          border-bottom: 1px solid var(--border-subtle);
        }
        .pricing-addons__table tbody tr:last-child .pricing-addons__td {
          border-bottom: none;
        }
        .pricing-addons__row--alt {
          background: rgba(240, 235, 224, 0.02);
        }
        .pricing-addons__td--service {
          color: var(--text-muted);
          text-align: left;
        }
        .pricing-addons__td--price {
          color: var(--accent);
          font-weight: 600;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: var(--tracking-wide);
          text-align: right;
          white-space: nowrap;
        }

        /* ── FAQ ── */
        .pricing-faq {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .pricing-faq__header {
          margin-bottom: var(--space-10);
        }
        .pricing-faq__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
        }
        @media (min-width: 768px) {
          .pricing-faq__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .pricing-faq__item {
          padding: var(--space-6);
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        .pricing-faq__q {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .pricing-faq__a {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── Bottom CTA ── */
        .pricing-bottom-cta {
          background: var(--bg);
        }
        .pricing-bottom-cta__inner {
          text-align: center;
          max-width: 580px;
          margin: 0 auto;
        }
        .pricing-bottom-cta__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .pricing-bottom-cta__sub {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-8);
        }
      `}</style>
    </>
  );
}
