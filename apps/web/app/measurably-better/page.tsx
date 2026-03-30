// apps/web/app/measurably-better/page.tsx
// MBT landing page — enterprise product energy, Google Cloud backbone, Main Street audience.

import './mbt-landing.css';

export default function MeasurablyBetterLanding() {
  return (
    <div className="mbt-page">
      {/* Hero */}
      <section className="mbt-hero">
        <span className="mbt-hero__badge">Measurably Better Things</span>
        <h1 className="mbt-hero__title">
          Your entire business.<br />
          <em>One platform. $20 a month.</em>
        </h1>
        <p className="mbt-hero__subtitle">
          Reviews, social media, directory listing, customer outreach,
          and a monthly report card — powered by Google AI.
          You approve everything. The system does the rest.
        </p>
        <div className="mbt-hero__actions">
          <a href="/directory/onboard" className="btn btn--primary mbt-btn">
            Start Free
          </a>
          <a href="/directory" className="btn btn--outline mbt-btn">
            See It Live
          </a>
        </div>
      </section>

      {/* Trust Bar — Built on Google */}
      <section className="mbt-trust">
        <p className="mbt-trust__label">Built on</p>
        <div className="mbt-trust__logos">
          <div className="mbt-trust__logo">
            <svg width="74" height="24" viewBox="0 0 74 24" fill="none" aria-label="Google Cloud">
              <text x="0" y="17" fontFamily="Inter, system-ui" fontSize="14" fontWeight="500" fill="#4285F4">Google</text>
              <text x="46" y="17" fontFamily="Inter, system-ui" fontSize="14" fontWeight="400" fill="#5F6368">Cloud</text>
            </svg>
          </div>
          <div className="mbt-trust__logo">
            <svg width="66" height="24" viewBox="0 0 66 24" fill="none" aria-label="Vertex AI">
              <text x="0" y="17" fontFamily="Inter, system-ui" fontSize="13" fontWeight="500" fill="#5F6368">Vertex AI</text>
            </svg>
          </div>
          <div className="mbt-trust__logo">
            <svg width="56" height="24" viewBox="0 0 56 24" fill="none" aria-label="Gemini">
              <text x="0" y="17" fontFamily="Inter, system-ui" fontSize="13" fontWeight="500" fill="#5F6368">Gemini</text>
            </svg>
          </div>
          <div className="mbt-trust__logo">
            <svg width="86" height="24" viewBox="0 0 86 24" fill="none" aria-label="QuickBooks">
              <text x="0" y="17" fontFamily="Inter, system-ui" fontSize="13" fontWeight="500" fill="#2CA01C">QuickBooks</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Social Channels */}
      <section className="mbt-channels">
        <h2 className="mbt-channels__title">Five channels. One dashboard.</h2>
        <p className="mbt-channels__subtitle">
          MBT manages your presence across every platform that matters — automatically.
        </p>
        <div className="mbt-channels__grid">
          <div className="mbt-channels__item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Facebook</span>
          </div>
          <div className="mbt-channels__item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#E4405F" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span>Instagram</span>
          </div>
          <div className="mbt-channels__item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#4285F4" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span>Google</span>
          </div>
          <div className="mbt-channels__item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span>Directory</span>
          </div>
          <div className="mbt-channels__item">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" aria-hidden="true"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/></svg>
            <span>Magazine</span>
          </div>
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
            <div className="mbt-compare__total mbt-compare__total--highlight">$20/mo</div>
          </div>
        </div>
      </section>

      {/* Security & Infrastructure */}
      <section className="mbt-security">
        <h2 className="mbt-security__title">Enterprise infrastructure. Main Street price.</h2>
        <p className="mbt-security__subtitle">
          Your data runs on the same Google Cloud infrastructure used by Spotify, Target, and PayPal.
        </p>
        <div className="mbt-security__grid">
          <div className="mbt-security__item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <div>
              <strong>Encrypted &amp; secure</strong>
              <span>Data encrypted at rest and in transit. Google Cloud security standards.</span>
            </div>
          </div>
          <div className="mbt-security__item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <div>
              <strong>99.9% uptime</strong>
              <span>Google Cloud Run with automated scaling. Your site never goes down.</span>
            </div>
          </div>
          <div className="mbt-security__item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <div>
              <strong>Your data is yours</strong>
              <span>We never sell your information. Cancel anytime and take your data with you.</span>
            </div>
          </div>
          <div className="mbt-security__item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden="true"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            <div>
              <strong>Automated backups</strong>
              <span>Daily backups with point-in-time recovery. Nothing gets lost.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mbt-cta">
        <h2 className="mbt-cta__title">Ready to get started?</h2>
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
