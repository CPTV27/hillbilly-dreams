'use client';

// apps/web/app/measurably-better/page.tsx
// MBT landing — "Strip the HDX engine and put it in a work truck."
// Speaks to Main Street business owners in headcount language, not SaaS jargon.

import { useState, useEffect } from 'react';
import './mbt-landing.css';

/* ── Extractive Audit Calculator Logic ── */
const REVENUE_OPTIONS = [
  { label: 'Under $10K', value: 8000 },
  { label: '$10K – $25K', value: 17500 },
  { label: '$25K – $50K', value: 37500 },
  { label: '$50K – $100K', value: 75000 },
  { label: '$100K+', value: 125000 },
];

function calcWaste(revenue: number, toolCount: number, hasAdmin: boolean): number {
  // SaaS waste: ~$120/tool/month average (Yelp ads, email platform, review tool, scheduling, etc.)
  const saasWaste = toolCount * 120;
  // Admin overhead: ~23% of revenue lost to manual admin (industry average from MBT thesis)
  const adminOverhead = hasAdmin ? 3750 : Math.round(revenue * 0.04);
  // Marketing agency cost if outsourcing
  const marketingWaste = 500;
  return saasWaste + adminOverhead + marketingWaste;
}

export default function MeasurablyBetterLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [revenueIdx, setRevenueIdx] = useState(2);
  const [toolCount, setToolCount] = useState(5);
  const [hasAdmin, setHasAdmin] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const monthlyWaste = calcWaste(REVENUE_OPTIONS[revenueIdx].value, toolCount, hasAdmin);
  const yearlyWaste = monthlyWaste * 12;

  return (
    <div className="mbt">
      {/* ── Nav ── */}
      <nav className={`mbt-nav${scrolled ? ' mbt-nav--scrolled' : ''}`}>
        <div className="mbt-nav__inner">
          <a href="/measurably-better" className="mbt-nav__brand">
            <span className="mbt-nav__logo">MBT</span>
            <span className="mbt-nav__name">Measurably Better</span>
          </a>
          <div className="mbt-nav__links">
            <a href="/measurably-better/thesis" className="mbt-nav__link">How It Works</a>
            <a href="/directory" className="mbt-nav__link">Directory</a>
            <a href="/directory/onboard" className="mbt-nav__cta">Get Started</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="mbt-hero">
        <div className="mbt-hero__glow" />
        <div className="mbt-hero__content">
          <span className="mbt-hero__eyebrow">Measurably Better Things</span>
          <h1 className="mbt-hero__title">
            Fire your admin.
            <span className="mbt-hero__accent">Keep your margin.</span>
          </h1>
          <p className="mbt-hero__sub">
            One platform replaces your office manager, your marketing agency,
            and your bookkeeper. <strong>$99/month.</strong> Built for Main Street.
          </p>
          <div className="mbt-hero__ctas">
            <a href="#audit" className="mbt-btn-primary">
              See What You&apos;re Losing →
            </a>
            <a href="/measurably-better/thesis" className="mbt-btn-ghost">
              Watch It Work →
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mbt-stats">
            <div className="mbt-stat">
              <div className="mbt-stat__value mbt-stat__value--blue">30%</div>
              <div className="mbt-stat__label">Margin Recovery</div>
            </div>
            <div className="mbt-stat">
              <div className="mbt-stat__value mbt-stat__value--green">$1,350</div>
              <div className="mbt-stat__label">Replaced Monthly</div>
            </div>
            <div className="mbt-stat">
              <div className="mbt-stat__value mbt-stat__value--amber">24hr</div>
              <div className="mbt-stat__label">Go-Live</div>
            </div>
            <div className="mbt-stat">
              <div className="mbt-stat__value mbt-stat__value--red">0</div>
              <div className="mbt-stat__label">Contracts</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Extractive Audit ── */}
      <section className="mbt-audit" id="audit">
        <div className="mbt-audit__inner">
          <span className="mbt-section-label">The Extractive Audit</span>
          <h2 className="mbt-h2">How much are you losing?</h2>
          <p className="mbt-lead">
            Three questions. Thirty seconds. We&apos;ll show you exactly how much
            money is leaving your business every month.
          </p>

          <div className="mbt-audit__form">
            <div className="mbt-audit__field">
              <label className="mbt-audit__label">What&apos;s your monthly revenue?</label>
              <div className="mbt-audit__select-wrap">
                <select
                  className="mbt-audit__select"
                  value={revenueIdx}
                  onChange={(e) => { setRevenueIdx(Number(e.target.value)); setShowResult(false); }}
                >
                  {REVENUE_OPTIONS.map((opt, i) => (
                    <option key={i} value={i}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mbt-audit__field">
              <label className="mbt-audit__label">
                How many SaaS tools do you pay for? <span className="mbt-audit__hint">{toolCount}</span>
              </label>
              <input
                type="range"
                min={1}
                max={12}
                value={toolCount}
                onChange={(e) => { setToolCount(Number(e.target.value)); setShowResult(false); }}
                className="mbt-audit__range"
              />
              <div className="mbt-audit__range-labels">
                <span>1</span><span>12+</span>
              </div>
            </div>

            <div className="mbt-audit__field">
              <label className="mbt-audit__label">Do you have a dedicated office manager?</label>
              <div className="mbt-audit__toggle-group">
                <button
                  className={`mbt-audit__toggle${!hasAdmin ? ' mbt-audit__toggle--active' : ''}`}
                  onClick={() => { setHasAdmin(false); setShowResult(false); }}
                >
                  No
                </button>
                <button
                  className={`mbt-audit__toggle${hasAdmin ? ' mbt-audit__toggle--active' : ''}`}
                  onClick={() => { setHasAdmin(true); setShowResult(false); }}
                >
                  Yes — $3,750/mo
                </button>
              </div>
            </div>

            <button
              className="mbt-btn-primary mbt-audit__submit"
              onClick={() => setShowResult(true)}
            >
              Show Me the Bleed →
            </button>
          </div>

          {showResult && (
            <div className="mbt-audit__result">
              <div className="mbt-audit__result-card">
                <p className="mbt-audit__result-label">You&apos;re losing approximately</p>
                <p className="mbt-audit__result-amount">
                  ${monthlyWaste.toLocaleString()}<span>/month</span>
                </p>
                <p className="mbt-audit__result-yearly">
                  That&apos;s <strong>${yearlyWaste.toLocaleString()}/year</strong> leaving your zip code.
                </p>
                <a href="/directory/onboard" className="mbt-btn-primary" style={{ marginTop: '1.5rem' }}>
                  Get it back for $99/month →
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Three Hires for $99 ── */}
      <section className="mbt-hires">
        <div className="mbt-hires__inner">
          <span className="mbt-section-label">Three Hires. $99/month.</span>
          <h2 className="mbt-h2">The team you can&apos;t afford to hire — and don&apos;t have to.</h2>

          <div className="mbt-hires__grid">
            <div className="mbt-hires__card mbt-hires__card--blue">
              <div className="mbt-hires__role">The Autonomous Admin</div>
              <p className="mbt-hires__replaces">Replaces: $45K/year office manager</p>
              <p className="mbt-hires__desc">
                Answers your reviews, manages your listings, and keeps your
                data clean. Monitors Google and Yelp 24/7, drafts responses,
                and alerts you the minute someone posts. You approve with
                a thumbs up.
              </p>
            </div>

            <div className="mbt-hires__card mbt-hires__card--green">
              <div className="mbt-hires__role">The 24/7 Salesman</div>
              <p className="mbt-hires__replaces">Replaces: $3,000/mo marketing agency</p>
              <p className="mbt-hires__desc">
                Four posts a week across Facebook, Instagram, and Google.
                AI writes them from your photos and what&apos;s happening in
                your town. The marketing agency that never sleeps and
                never invoices you.
              </p>
            </div>

            <div className="mbt-hires__card mbt-hires__card--purple">
              <div className="mbt-hires__role">The Numbers Person</div>
              <p className="mbt-hires__replaces">Replaces: $400/mo bookkeeper</p>
              <p className="mbt-hires__desc">
                Monthly report card: your reviews, your reach, how you
                compare to the business down the street. No spreadsheets.
                Plain English. The bookkeeper who actually speaks your language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="mbt-compare">
        <div className="mbt-compare__inner">
          <h2 className="mbt-h2" style={{ textAlign: 'center' }}>
            What you&apos;re paying now vs. what you could be paying
          </h2>
          <div className="mbt-compare__grid">
            <div className="mbt-compare__col mbt-compare__col--old">
              <div className="mbt-compare__label">The old way</div>
              <ul className="mbt-compare__list">
                <li>Social media manager <span>$500/mo</span></li>
                <li>Yelp ads <span>$300/mo</span></li>
                <li>Email platform <span>$50/mo</span></li>
                <li>Review monitoring <span>$100/mo</span></li>
                <li>Bookkeeper <span>$400/mo</span></li>
              </ul>
              <div className="mbt-compare__total">$1,350/mo</div>
            </div>
            <div className="mbt-compare__col mbt-compare__col--new">
              <div className="mbt-compare__label">Measurably Better</div>
              <ul className="mbt-compare__list">
                <li>Everything above <span>Included</span></li>
                <li>AI-powered, human-approved <span>Included</span></li>
                <li>Monthly report card <span>Included</span></li>
                <li>Directory listing <span>Included</span></li>
                <li>Magazine feature (quarterly) <span>Included</span></li>
              </ul>
              <div className="mbt-compare__total mbt-compare__total--highlight">$99/mo</div>
            </div>
          </div>
          <p className="mbt-compare__savings">
            That&apos;s <strong>$15,012 back in your pocket</strong> every year.
            In your zip code. Not in San Francisco.
          </p>
        </div>
      </section>

      {/* ── Proof of Life ── */}
      <section className="mbt-proof">
        <div className="mbt-proof__inner">
          <p className="mbt-proof__line">
            We don&apos;t just sell this. We run a hotel, a radio station,
            a magazine, and a business directory on it.
          </p>
          <div className="mbt-proof__badges">
            <a href="https://bigmuddytouring.com" className="mbt-proof__badge" target="_blank" rel="noopener noreferrer">bigmuddytouring.com</a>
            <a href="https://bigmuddyradio.com" className="mbt-proof__badge" target="_blank" rel="noopener noreferrer">bigmuddyradio.com</a>
            <a href="https://bigmuddymagazine.com" className="mbt-proof__badge" target="_blank" rel="noopener noreferrer">bigmuddymagazine.com</a>
            <a href="https://deepsouthdirectory.com" className="mbt-proof__badge" target="_blank" rel="noopener noreferrer">deepsouthdirectory.com</a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mbt-final-cta">
        <h2 className="mbt-h2" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Your listing goes live in 24 hours.
        </h2>
        <p className="mbt-final-cta__sub">No contracts. No setup fee. Cancel anytime.</p>
        <div className="mbt-final-cta__actions">
          <a href="/directory/onboard" className="mbt-btn-primary mbt-btn--lg">
            Get Started — $99/month →
          </a>
          <a href="mailto:chase@hillbillydreamsinc.com" className="mbt-btn-ghost">
            Talk to a human first →
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mbt-footer">
        <p>&copy; 2026 Measurably Better Things&trade;</p>
        <p className="mbt-footer__sub">
          A <a href="https://hillbillydreamsinc.com">Hillbilly Dreams</a> company &middot; Natchez, Mississippi
        </p>
      </footer>
    </div>
  );
}
