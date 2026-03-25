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
    tagline: 'Everything a local business needs to get found.',
    popular: false,
    features: [
      'Deep South Directory listing',
      'Featured in Big Muddy Magazine directory',
      'Included in corridor touring guides',
      '20 social posts/month (2 platforms)',
      '10 AI-enhanced photos/month',
      'Google Business Profile optimization',
      'Review monitoring & alerts',
      'Monthly performance report',
      'Brand voice onboarding',
    ],
    cta: 'Get Started',
    href: '/media/get-started?tier=front-porch',
  },
  {
    id: 'the-route',
    name: 'The Route',
    price: '$249',
    period: '/month',
    tagline: 'The workhorse. Most businesses start here.',
    popular: true,
    features: [
      'Everything in Front Porch, plus:',
      '40 posts/month across 3 platforms',
      '25 AI-enhanced photos/month',
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
    price: '$499',
    period: '/month',
    tagline: 'Full-service. Full network access.',
    popular: false,
    features: [
      'Everything in The Route, plus:',
      '60 posts/month across all platforms',
      'Unlimited photo enhancement',
      '2 short-form videos/month',
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
    price: '$999',
    period: '/month',
    tagline: 'Total media partnership. Co-branded everything.',
    popular: false,
    features: [
      'Everything in River Room, plus:',
      '100+ posts/month, all platforms',
      'Unlimited photos + 4 videos/month',
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
  { name: 'Additional social platform', price: '$39/mo' },
  { name: 'Extra enhanced photos (pack of 10)', price: '$49' },
  { name: 'Short-form video (pack of 2)', price: '$129' },
  { name: 'One-time brand voice audit', price: '$149' },
  { name: 'Event photography + content', price: '$249/event' },
  { name: 'Press release & distribution', price: '$199' },
  { name: 'Google Ads management', price: '$149/mo + spend' },
  { name: 'Custom landing page', price: '$399' },
];

const FAQS = [
  {
    q: 'Do I have to sign a contract?',
    a: 'No. All plans are month-to-month. Cancel any time with 30 days notice. We don\'t lock you in — we earn your business every month.',
  },
  {
    q: 'How does the 3 months free work?',
    a: 'You sign up, we onboard your business, and you get the full service for 3 months — no credit card, no commitment. We learn your brand, build your voice profile, and start creating content. After 3 months, you decide if you want to keep going. Most businesses see results by month two.',
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
    a: 'No setup fees. Ever. Your first 3 months are completely free — we build your brand profile, content calendar, and start publishing while you pay nothing.',
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
        <div className="pricing-header__bg" aria-hidden="true" />
        <div className="section-container">
          <div className="pricing-header__inner">
            <div className="section-label">Pricing</div>
            <h1 className="pricing-header__title">
              Join the Directory.<br /><em>Pick Your Tier.</em>
            </h1>
            <p className="pricing-header__sub">
              Every tier gets you listed in the directory, featured in the magazine, and plugged into the network.
              Go up a tier and we do more — more posts, more platforms, more media.
            </p>
            <div className="pricing-header__free-banner">
              3 Months Free on Every Plan — No Credit Card Required
            </div>
            <div className="pricing-header__proof">
              <span>No contracts</span>
              <span className="pricing-header__dot" aria-hidden="true">·</span>
              <span>No setup fees</span>
              <span className="pricing-header__dot" aria-hidden="true">·</span>
              <span>3 months free</span>
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
                  <div className="pricing-card__free-tag">First 3 months free</div>
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

      {/* ── Value Comparison ── */}
      <section className="pricing-compare">
        <div className="section-container">
          <div className="pricing-compare__header">
            <div className="section-label">The Math</div>
            <h2 className="section-title">What You'd Pay Elsewhere</h2>
            <p className="section-desc">
              To get what the Front Porch plan includes, you'd cobble together 6 different services.
              Here's what that actually costs.
            </p>
          </div>
          <div className="pricing-compare__grid">
            <div className="pricing-compare__card pricing-compare__card--them">
              <div className="pricing-compare__card-label">Doing It Yourself</div>
              <div className="pricing-compare__items">
                <div className="pricing-compare__item">
                  <span>Yelp Business upgrade</span><span>$180/mo</span>
                </div>
                <div className="pricing-compare__item">
                  <span>Social media tool (Hootsuite)</span><span>$99/mo</span>
                </div>
                <div className="pricing-compare__item">
                  <span>Email marketing (Constant Contact)</span><span>$35/mo</span>
                </div>
                <div className="pricing-compare__item">
                  <span>GBP management (freelancer)</span><span>$200/mo</span>
                </div>
                <div className="pricing-compare__item">
                  <span>Photo editing (freelancer)</span><span>$200/mo</span>
                </div>
                <div className="pricing-compare__item">
                  <span>Basic website hosting</span><span>$22/mo</span>
                </div>
              </div>
              <div className="pricing-compare__total">
                <span>Total</span><span>$736/mo</span>
              </div>
              <div className="pricing-compare__note">And you still don't get magazine, radio, or AI content.</div>
            </div>
            <div className="pricing-compare__card pricing-compare__card--us">
              <div className="pricing-compare__card-label">Deep South Directory</div>
              <div className="pricing-compare__us-price">$99<span>/mo</span></div>
              <div className="pricing-compare__us-detail">Everything above, plus:</div>
              <div className="pricing-compare__us-list">
                <div>Featured in Big Muddy Magazine</div>
                <div>Mentioned on Big Muddy Radio</div>
                <div>Listed on corridor touring guides</div>
                <div>AI-generated content matched to your voice</div>
                <div>10 AI-enhanced photos every month</div>
              </div>
              <div className="pricing-compare__us-free">First 3 months completely free</div>
              <a href="/media/get-started" className="btn btn--primary pricing-compare__cta">Start Free Today</a>
            </div>
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
            <h2 className="pricing-bottom-cta__title">Start Your 3 Months Free</h2>
            <p className="pricing-bottom-cta__sub">
              Tell us about your business and we'll put together a plan that fits.
              No credit card. No hard sell. Just an honest conversation about what we can do for you.
            </p>
            <a href="/media/get-started" className="btn btn--primary">Get Started</a>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .pricing-header {
          position: relative;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .pricing-header__bg {
          position: absolute;
          inset: 0;
          background: url('/images/dsd/blues-musician.webp') center center / cover no-repeat;
          opacity: 0.1;
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
        .pricing-header__free-banner {
          display: inline-block;
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 800;
          color: var(--bg);
          background: var(--accent);
          padding: var(--space-3) var(--space-8);
          border-radius: var(--radius-full);
          letter-spacing: var(--tracking-tight);
          margin-bottom: var(--space-6);
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
          margin: 0 0 var(--space-3);
          font-style: italic;
        }
        .pricing-card__free-tag {
          display: inline-block;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          background: rgba(200, 148, 62, 0.1);
          border: 1px solid rgba(200, 148, 62, 0.3);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
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

        /* ── Value Comparison ── */
        .pricing-compare {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .pricing-compare__header {
          margin-bottom: var(--space-10);
        }
        .pricing-compare__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
          max-width: 900px;
        }
        @media (min-width: 768px) {
          .pricing-compare__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .pricing-compare__card {
          border-radius: var(--radius-xl);
          padding: var(--space-8);
        }
        .pricing-compare__card--them {
          background: var(--surface);
          border: 1px solid var(--border);
          opacity: 0.7;
        }
        .pricing-compare__card--us {
          background: var(--surface-2);
          border: 2px solid var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .pricing-compare__card-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-6);
        }
        .pricing-compare__card--us .pricing-compare__card-label {
          color: var(--accent);
        }
        .pricing-compare__items {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }
        .pricing-compare__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-4);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--border-subtle);
        }
        .pricing-compare__item span:last-child {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          white-space: nowrap;
        }
        .pricing-compare__total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--text);
          padding-top: var(--space-4);
          border-top: 2px solid var(--border-strong);
          margin-bottom: var(--space-4);
        }
        .pricing-compare__note {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          font-style: italic;
        }
        .pricing-compare__us-price {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--accent);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
          margin-bottom: var(--space-2);
        }
        .pricing-compare__us-price span {
          font-size: var(--text-lg);
          color: var(--text-muted);
          font-weight: 400;
        }
        .pricing-compare__us-detail {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-bottom: var(--space-6);
        }
        .pricing-compare__us-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text);
          margin-bottom: var(--space-6);
        }
        .pricing-compare__us-list div::before {
          content: '\\2713  ';
          color: var(--accent);
        }
        .pricing-compare__us-free {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--accent);
          background: rgba(200, 148, 62, 0.1);
          border: 1px solid rgba(200, 148, 62, 0.3);
          border-radius: var(--radius-lg);
          padding: var(--space-3) var(--space-5);
          text-align: center;
          margin-bottom: var(--space-6);
        }
        .pricing-compare__cta {
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
