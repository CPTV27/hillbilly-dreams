// apps/web/app/measurably-better/page.tsx
// MBT landing page — speaks to Main Street business owners, not engineers.

import './mbt-landing.css';

export default function MeasurablyBetterLanding() {
  return (
    <div className="mbt-page">
      {/* Hero */}
      <section className="mbt-hero">
        <span className="mbt-hero__badge">Measurably Better Things</span>
        <h1 className="mbt-hero__title">
          Run your business.<br />
          <em>Not your software.</em>
        </h1>
        <p className="mbt-hero__subtitle">
          One system that handles your reviews, social media, bookkeeping,
          and customer outreach. For less than your electric bill.
        </p>
        <div className="mbt-hero__actions">
          <a href="/directory/onboard" className="btn btn--primary mbt-btn">
            Get Started
          </a>
          <a href="/directory" className="btn btn--outline mbt-btn">
            See the Directory
          </a>
        </div>
      </section>

      {/* Value Props */}
      <section className="mbt-value">
        <div className="mbt-value__grid">
          <div className="mbt-value__card">
            <div className="mbt-value__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <h3 className="mbt-value__heading">Reviews on autopilot</h3>
            <p className="mbt-value__text">
              AI monitors your Google and Yelp reviews, drafts responses,
              and alerts you the minute someone posts. You approve with a thumbs up.
            </p>
          </div>
          <div className="mbt-value__card">
            <div className="mbt-value__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className="mbt-value__heading">Social media that runs itself</h3>
            <p className="mbt-value__text">
              Four posts a week across Facebook, Instagram, and Google.
              AI writes them from your photos and what is happening in town.
              You just say yes.
            </p>
          </div>
          <div className="mbt-value__card">
            <div className="mbt-value__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <h3 className="mbt-value__heading">Know your numbers</h3>
            <p className="mbt-value__text">
              Monthly report card: your reviews, your reach, how you compare
              to competitors down the street. No spreadsheets. Plain English.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mbt-compare">
        <h2 className="mbt-compare__title">What you are paying now vs. what you could be paying</h2>
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
      </section>

      {/* CTA */}
      <section className="mbt-cta">
        <h2 className="mbt-cta__title">Less than your electric bill.</h2>
        <p className="mbt-cta__subtitle">
          Your listing goes live within 24 hours. No contracts. Cancel anytime.
        </p>
        <a href="/directory/onboard" className="btn btn--primary mbt-btn mbt-btn--lg">
          Get Listed Today
        </a>
      </section>

      {/* Footer */}
      <footer className="mbt-footer">
        <p>&copy; 2026 Measurably Better Things&trade;</p>
        <p className="mbt-footer__sub">
          A <a href="/">Hillbilly Dreams</a> company &middot; Natchez, Mississippi
        </p>
      </footer>
    </div>
  );
}
