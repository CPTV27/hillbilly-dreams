'use client';

import { useState } from 'react';

// ── Name Gate ──
function NameGate({ onEnter }: { onEnter: () => void }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = name.trim().toLowerCase();
    if (normalized === 'tracy' || normalized === 'tracy alderson-allen' || normalized === 'tracy alderson allen') {
      localStorage.setItem('portal-user', 'tracy');
      onEnter();
    } else {
      setError('Access restricted. Please enter your name.');
    }
  };

  return (
    <div className="senate-gate">
      <div className="senate-gate__inner">
        <div className="senate-seal">HDI</div>
        <h1 className="senate-gate__title">HILLBILLY DREAMS INCORPORATED</h1>
        <p className="senate-gate__sub">Co-Founder Portal — Authorized Access Only</p>
        <form onSubmit={handleSubmit} className="senate-gate__form">
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Enter your name"
            className="senate-input"
            autoFocus
          />
          <button type="submit" className="senate-btn">ENTER</button>
        </form>
        {error && <p className="senate-error">{error}</p>}
      </div>
      <style>{gateStyles}</style>
    </div>
  );
}

// ── Reusable Components ──
function ReportSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="senate-section">
      <h2 className="senate-section__title">
        <span className="senate-section__num">SECTION {number}.</span> {title}
      </h2>
      <div className="senate-section__body">{children}</div>
    </section>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="senate-row">
      <span className="senate-row__label">{label}</span>
      <span className="senate-row__dots" />
      <span className="senate-row__value">{value}</span>
    </div>
  );
}

function Ask({ number, text, detail }: { number: number; text: string; detail?: string }) {
  return (
    <div className="senate-ask">
      <div className="senate-ask__num">{number}</div>
      <div className="senate-ask__body">
        <strong>{text}</strong>
        {detail && <p className="senate-ask__detail">{detail}</p>}
      </div>
    </div>
  );
}

function BusinessCard({ title, tag, lead, bullets }: {
  title: string;
  tag: string;
  lead: string;
  bullets: string[];
}) {
  return (
    <div className="biz-card">
      <div className="biz-card__header">
        <h3 className="biz-card__title">{title}</h3>
        <span className="biz-card__tag">{tag}</span>
      </div>
      <p className="biz-card__lead">{lead}</p>
      <ul className="biz-card__bullets">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

// ── Main Dashboard ──
export default function TracyDashboard() {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portal-user') === 'tracy';
    }
    return false;
  });

  if (!authenticated) {
    return <NameGate onEnter={() => setAuthenticated(true)} />;
  }

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="senate-report">
      <div className="senate-actions">
        <button className="senate-print-btn" onClick={() => window.print()}>
          PRINT / DOWNLOAD PDF
        </button>
      </div>

      <header className="senate-header">
        <div className="senate-header__bar" />
        <div className="senate-header__content">
          <p className="senate-header__classification">CONFIDENTIAL — CO-FOUNDERS ONLY</p>
          <h1 className="senate-header__title">HILLBILLY DREAMS INCORPORATED</h1>
          <p className="senate-header__subtitle">Business Opportunity Report — Full Picture</p>
          <div className="senate-header__meta">
            <p>Prepared for: <strong>Tracy Alderson-Allen</strong>, Co-Founder &amp; COO</p>
            <p>Prepared by: <strong>Chase Pierson</strong>, via HDI Agent Syndicate</p>
            <p>Date: <strong>{reportDate}</strong></p>
          </div>
        </div>
        <div className="senate-header__bar" />
      </header>

      {/* Personal greeting */}
      <div className="senate-letter">
        <p>Tracy,</p>
        <p>
          This is the full picture — every business we own, every revenue channel we&apos;re
          building, and how they all connect. Read it when you have time. Ask me anything.
        </p>
        <p className="senate-letter__sig">— Chase</p>
      </div>

      {/* What We're Building */}
      <ReportSection number="1" title="WHAT WE'RE BUILDING">
        <p className="senate-note">
          Hillbilly Dreams Inc. is a holding company that owns a technology platform, a media
          company, and a hospitality property. They all run on the same engine, and they all
          feed each other.
        </p>
        <p className="senate-note">
          <strong>The short version:</strong> the Inn is the anchor, the media brands build the
          audience, and the technology platform turns that audience into recurring revenue.
        </p>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Ownership — Equal Thirds. This Is Final.</h3>
          <DataRow label="Chase Pierson" value="33.33% — Technology, sales, partnerships, photography" />
          <DataRow label="Tracy Alderson-Allen" value="33.33% — Finance, operations, publishing, editorial" />
          <DataRow label="Amy Allen (Arri Aslan)" value="33.34% — Guest experience, artist operations, performance" />
          <DataRow label="Option pool" value="19% reserved for JP, future hires, advisors — all three dilute equally" />
          <DataRow label="Board decisions" value="Require 2 of 3 founders" />
          <DataRow label="Entity status" value="HDI not yet incorporated — needs MS attorney to set up" />
        </div>
      </ReportSection>

      {/* The Companies */}
      <ReportSection number="2" title="THE COMPANIES">
        <div className="biz-grid">
          <BusinessCard
            title="The Big Muddy Inn"
            tag="YOU + AMY"
            lead="Our 6-suite boutique hotel at 411 North Commerce Street, Natchez. Home base. Everything connects back here."
            bullets={[
              'Nightly room bookings — Cloudbeds PMS now connected',
              'Bar and food service on show nights',
              'Private buyouts — full-property rental',
              'Weddings and events (the big one — see Section 3)',
            ]}
          />
          <BusinessCard
            title="Deep South Directory"
            tag="SAAS — CHASE"
            lead="AI-powered marketing platform for Main Street businesses. $20–$99/mo. We start walking into Natchez on April 1."
            bullets={[
              '$20/mo — AI listing, review alerts, monthly report card',
              '$49/mo — Auto social publishing, content calendar',
              '$99/mo — Competitor watch, QuickBooks integration, quarterly magazine feature',
            ]}
          />
          <BusinessCard
            title="Big Muddy Magazine"
            tag="PUBLISHING — YOU"
            lead="Editorial content — city guides, interviews, photo essays from the Mississippi corridor."
            bullets={[
              'Sponsored city guides — tourism boards pay for content',
              'Advertising and sponsorships from local businesses',
              'One tourism board at $5,000/mo is the highest-confidence opportunity right now',
            ]}
          />
          <BusinessCard
            title="Big Muddy Radio"
            tag="ENTERTAINMENT"
            lead="Curated playlists, live sessions, the American Parlor Songbook. Streaming on all major platforms."
            bullets={[
              'Content comes from live sessions at the Blues Room — production cost near zero',
              'Revenue: sponsorships, same tourism boards and local businesses as the Magazine',
            ]}
          />
          <BusinessCard
            title="Big Muddy Records"
            tag="JP"
            lead="Artist-friendly label services. Artists keep 100% of their masters. Always."
            bullets={[
              'Flat monthly retainer plus revenue share',
              'Distribution, production support, catalog management, sync licensing',
              'Direct Stripe payouts to artists',
            ]}
          />
          <BusinessCard
            title="Big Muddy Entertainment"
            tag="JP — FULL CREATIVE AUTHORITY"
            lead="Umbrella over Records, Radio, Touring, and Rise Up. Every dollar from a show generates roughly 50 cents more in downstream revenue."
            bullets={[
              'Shows are a negative-CAC engine — we get paid to acquire customers',
              'Touring: Snowbird Circuit, 18 cities, Memphis to New Orleans',
              'Rise Up Gospel &amp; Blues — franchisable touring band, Amy + Arri anchor',
            ]}
          />
          <BusinessCard
            title="BuyCurious Art Gallery"
            tag="MEDIA"
            lead="Online art gallery and artist directory at buycurious.art."
            bullets={[
              'Prints, originals, and commissioned work from corridor artists',
            ]}
          />
          <BusinessCard
            title="Measurably Better Things (MBT)"
            tag="PLATFORM — CHASE"
            lead="One codebase runs all 11 websites. One engine serves hospitality, media, SaaS, civic, and education."
            bullets={[
              'Competitors assemble the same functionality at $2,839/mo across 11 tools',
              'We do it all on one platform starting at $20/month',
              'CivicX (municipal), MB Learn (K-12 education) run on same engine',
            ]}
          />
        </div>
      </ReportSection>

      {/* Wedding Opportunity */}
      <ReportSection number="3" title="THE WEDDING OPPORTUNITY">
        <p className="senate-note">
          Natchez draws 700,000 visitors a year. The big historic venues do 100–700 guest
          events. Nobody in town is doing intimate full-property buyout weddings for 20–40
          guests — the fastest-growing format nationally.
        </p>
        <p className="senate-note">
          Our package bundles everything other venues sell separately. <strong>A single wedding
          weekend generates 7–17x what a regular weekend does.</strong>
        </p>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Wedding Package Pricing</h3>
          <DataRow label="Venue (Blues Room + porch)" value="$2,500" />
          <DataRow label="Lodging buyout (6 rooms, 2 nights)" value="$3,600" />
          <DataRow label="Photography (Chase)" value="$3,500" />
          <DataRow label="Video / content production" value="$2,000" />
          <DataRow label="Live music (Arri)" value="$1,500" />
          <DataRow label="Day-of coordination" value="$1,000" />
          <DataRow label="Full Package" value="$14,100" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Projection at 16 Weddings / Year</h3>
          <DataRow label="Weddings per year (2/mo during season)" value="16" />
          <DataRow label="Annual wedding revenue" value="$224,000" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">What&apos;s Needed to Launch</h3>
          <DataRow label="Wedding page on the website" value="In progress" />
          <DataRow label="Listings on The Knot and WeddingWire" value="To do" />
          <DataRow label="2-3 styled shoots (Chase + Arri + The Anthologist)" value="To schedule" />
          <DataRow label="Preferred vendor list for caterers and florists" value="Tracy — you know who&apos;s good" />
        </div>
      </ReportSection>

      {/* Inn Occupancy */}
      <ReportSection number="4" title="INN OCCUPANCY — WHERE WE ARE AND WHERE WE'RE GOING">
        <p className="senate-note">
          Current occupancy is around 18% with a $148 average daily rate. That&apos;s leaving
          money on the table every single night. Cloudbeds dynamic pricing and the ecosystem
          flywheel change this.
        </p>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Occupancy Targets</h3>
          <DataRow label="Now (18%) — Baseline" value="Current state, mostly organic bookings" />
          <DataRow label="April-May (22%)" value="Airbnb optimization, Cloudbeds dynamic pricing, show night bundles" />
          <DataRow label="June-August (28%)" value="Summer tourism + wedding marketing live + Magazine / Radio features" />
          <DataRow label="Sep-Nov (35%)" value="Fall Pilgrimage, wedding season peak, Snowbird Circuit, DSD cross-promotion" />
          <DataRow label="Year 2 steady state (40%+)" value="Full Cloudbeds optimization, wedding reputation, touring guests, Media year-round" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Revenue Impact (6 rooms, $148 ADR)</h3>
          <DataRow label="18% now" value="~$4,900 / mo" />
          <DataRow label="22%" value="~$5,900 / mo (+$1,000)" />
          <DataRow label="28%" value="~$7,500 / mo (+$2,600)" />
          <DataRow label="35%" value="~$9,500 / mo (+$4,600)" />
          <DataRow label="40%" value="~$10,800 / mo (+$5,900)" />
        </div>
        <p className="senate-note" style={{ marginTop: '12px' }}>
          ADR increases with dynamic pricing not included — could add another 15–20% on top.
          Delta Dawn (our ops AI) will pull occupancy, ADR, and revenue data in real-time via
          the Cloudbeds API once configured.
        </p>
      </ReportSection>

      {/* Revenue Map */}
      <ReportSection number="5" title="REVENUE MAP BY DEPARTMENT">
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Hospitality (Tracy + Amy)</h3>
          <DataRow label="Room bookings" value="Nightly rates, Cloudbeds dynamic pricing" />
          <DataRow label="Wedding packages" value="$10,000–14,100 per weekend, 16/year target" />
          <DataRow label="Private buyouts" value="Full-property rental for events" />
          <DataRow label="Bar revenue" value="Show nights, 80%+ margin with liquor license" />
          <DataRow label="Extended stays &amp; residencies" value="Artists, retreats, longer-term guests" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Technology / SaaS (Chase)</h3>
          <DataRow label="DSD — The Listing" value="$20/mo — AI listing, review alerts, monthly report" />
          <DataRow label="DSD — The Works" value="$49/mo — Social auto-publishing, content calendar" />
          <DataRow label="DSD — The Engine" value="$99/mo — Full automation, competitor watch, magazine feature" />
          <DataRow label="CivicX" value="$800–1,500/mo — Municipal platform, grant-funded" />
          <DataRow label="MB Learn" value="$25K+/yr — School district AI curriculum (summer 2026 deadline)" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Media &amp; Content (Tracy — Publishing Head)</h3>
          <DataRow label="Magazine sponsorships" value="Tourism boards, banks, local businesses" />
          <DataRow label="Radio sponsorships" value="Same sponsors, different medium" />
          <DataRow label="Sponsored city guides" value="Tourism content as a product" />
          <DataRow label="Stock photography licensing" value="604+ real photos of the corridor" />
          <DataRow label="Art sales (BuyCurious)" value="Prints, originals, commissions" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">Entertainment (JP)</h3>
          <DataRow label="Live shows at the Inn" value="Door + bar + merch" />
          <DataRow label="Touring — Snowbird Circuit" value="Revenue share from 18 corridor venues" />
          <DataRow label="Records" value="Retainers + streaming + sync licensing" />
          <DataRow label="Rise Up (franchise touring)" value="Multiple units, multiple markets" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">DSD Unit Economics at Scale</h3>
          <DataRow label="10 customers" value="$754/mo revenue — $640 profit (85% margin)" />
          <DataRow label="50 customers" value="$5,577/mo revenue — $3,629 profit (65% margin)" />
          <DataRow label="100 customers" value="$28,452/mo revenue — $24,542 profit (86% margin)" />
          <DataRow label="250 customers" value="$114,375/mo revenue — $104,812 profit (92% margin)" />
        </div>
      </ReportSection>

      {/* Timeline */}
      <ReportSection number="6" title="TIMELINE">
        <DataRow label="April 1" value="Deep South Directory goes live — Chase starts walking Natchez businesses" />
        <DataRow label="April 14" value="Review management ships — $99 tier fully sellable" />
        <DataRow label="April 21" value="Social publishing ships — all three tiers available" />
        <DataRow label="April 27 (Chase's birthday)" value="Official launch — everything live" />
        <DataRow label="May" value="Target 10 DSD customers — first tourism board sponsorship — Cloudbeds optimization" />
        <DataRow label="June" value="Truck payment ends ($520/mo freed) — target 25 DSD customers — first wedding inquiry" />
        <DataRow label="Summer 2026" value="MB Learn must be in school district FY27 budgets (ESSA window)" />
        <DataRow label="Fall 2026" value="Peak wedding season begins — Snowbird Circuit routing" />
      </ReportSection>

      {/* What I Need From You */}
      <ReportSection number="7" title="WHAT I NEED FROM YOU">
        <p className="senate-note">Five specific asks. Every decision is 2 of 3.</p>
        <Ask
          number={1}
          text="Review this report."
          detail="Tell me what's missing, what's wrong, what needs clarification."
        />
        <Ask
          number={2}
          text="Wedding vendor list."
          detail="We need 2-3 preferred caterer relationships in Natchez. You know who's good."
        />
        <Ask
          number={3}
          text="Magazine editorial calendar."
          detail="You're the Publishing head. What does the first sponsored city guide look like?"
        />
        <Ask
          number={4}
          text="Inn operational numbers."
          detail="Occupancy trends, seasonal patterns, what's working with Cloudbeds. Delta Dawn (our ops AI) is ready to help with this."
        />
        <Ask
          number={5}
          text="Your questions. All of them."
          detail="This is our company. Every decision is 2 of 3."
        />
      </ReportSection>

      <footer className="senate-footer">
        <div className="senate-header__bar" />
        <p className="senate-footer__text">
          HILLBILLY DREAMS INCORPORATED<br />
          411 North Commerce Street, Natchez, Mississippi 39120<br />
          This document is confidential and intended solely for co-founders.
        </p>
        <p className="senate-footer__generated">
          Generated by HDI Agent Syndicate — {reportDate}
        </p>
      </footer>

      <style>{reportStyles}</style>
    </div>
  );
}

// ── Styles ──

const gateStyles = `
  .senate-gate {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f3ef;
    font-family: 'Courier New', Courier, monospace;
  }
  .senate-gate__inner {
    text-align: center;
    max-width: 420px;
    padding: 48px;
  }
  .senate-seal {
    width: 80px;
    height: 80px;
    border: 3px solid #1a1a1a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0.15em;
    margin: 0 auto 24px;
    color: #1a1a1a;
  }
  .senate-gate__title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.2em;
    margin: 0 0 8px;
    color: #1a1a1a;
  }
  .senate-gate__sub {
    font-size: 12px;
    color: #666;
    letter-spacing: 0.1em;
    margin: 0 0 32px;
  }
  .senate-gate__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .senate-input {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    padding: 12px 16px;
    border: 2px solid #1a1a1a;
    background: #fff;
    text-align: center;
    letter-spacing: 0.05em;
  }
  .senate-input:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0 0 0 1px #333;
  }
  .senate-btn {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2em;
    padding: 12px;
    background: #1a1a1a;
    color: #f5f3ef;
    border: none;
    cursor: pointer;
  }
  .senate-btn:hover { background: #333; }
  .senate-error {
    color: #8b0000;
    font-size: 12px;
    margin: 12px 0 0;
  }
`;

const reportStyles = `
  .senate-report {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 32px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.6;
    color: #1a1a1a;
    background: #f5f3ef;
    min-height: 100vh;
  }

  /* Header */
  .senate-header { margin-bottom: 40px; }
  .senate-header__bar {
    height: 3px;
    background: #1a1a1a;
    margin: 16px 0;
  }
  .senate-header__content { text-align: center; padding: 24px 0; }
  .senate-header__classification {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: #8b0000;
    margin: 0 0 16px;
  }
  .senate-header__title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.15em;
    margin: 0 0 8px;
  }
  .senate-header__subtitle {
    font-size: 14px;
    letter-spacing: 0.1em;
    color: #444;
    margin: 0 0 24px;
  }
  .senate-header__meta {
    text-align: left;
    display: inline-block;
    font-size: 13px;
    line-height: 1.8;
  }
  .senate-header__meta p { margin: 0; }
  .senate-header__meta strong { font-weight: 700; }

  /* Letter */
  .senate-letter {
    border-left: 3px solid #1a1a1a;
    padding: 16px 20px;
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 1.8;
  }
  .senate-letter p { margin: 0 0 8px; }
  .senate-letter p:last-child { margin-bottom: 0; }
  .senate-letter__sig { font-weight: 700; }

  /* Sections */
  .senate-section { margin-bottom: 40px; page-break-inside: avoid; }
  .senate-section__title {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.1em;
    border-bottom: 2px solid #1a1a1a;
    padding-bottom: 8px;
    margin: 0 0 16px;
  }
  .senate-section__num { letter-spacing: 0.15em; }
  .senate-section__body { padding-left: 16px; }

  .senate-subsection { margin: 20px 0; }
  .senate-subsection__title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin: 0 0 8px;
    text-decoration: underline;
  }

  /* Data rows */
  .senate-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    padding: 3px 0;
    font-size: 13px;
  }
  .senate-row__label {
    white-space: nowrap;
    font-weight: 600;
  }
  .senate-row__dots {
    flex: 1;
    border-bottom: 1px dotted #999;
    margin: 0 4px;
    min-width: 20px;
    align-self: flex-end;
    margin-bottom: 3px;
  }
  .senate-row__value {
    white-space: nowrap;
    text-align: right;
  }

  /* Note / prose */
  .senate-note {
    font-size: 13px;
    color: #333;
    line-height: 1.7;
    margin: 0 0 12px;
  }

  /* Business cards grid */
  .biz-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .biz-card {
    border: 1px solid #ccc;
    padding: 16px;
    background: #fff;
    page-break-inside: avoid;
  }
  .biz-card__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    gap: 8px;
  }
  .biz-card__title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    margin: 0;
  }
  .biz-card__tag {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #8b0000;
    white-space: nowrap;
    padding-top: 2px;
  }
  .biz-card__lead {
    font-size: 12px;
    color: #555;
    margin: 0 0 8px;
    line-height: 1.5;
  }
  .biz-card__bullets {
    margin: 0;
    padding-left: 14px;
    font-size: 12px;
    color: #333;
    line-height: 1.6;
  }
  .biz-card__bullets li { margin-bottom: 2px; }

  /* "What I Need" asks */
  .senate-ask {
    display: flex;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
    align-items: flex-start;
  }
  .senate-ask__num {
    font-size: 20px;
    font-weight: 700;
    color: #8b0000;
    min-width: 24px;
    line-height: 1.2;
  }
  .senate-ask__body { flex: 1; font-size: 13px; line-height: 1.6; }
  .senate-ask__body strong { display: block; margin-bottom: 2px; }
  .senate-ask__detail { margin: 0; color: #555; }

  /* Footer */
  .senate-footer { margin-top: 64px; text-align: center; }
  .senate-footer__text {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: #666;
    line-height: 1.8;
    margin: 16px 0;
  }
  .senate-footer__generated {
    font-size: 11px;
    color: #999;
    margin: 16px 0 0;
  }

  /* Print button */
  .senate-actions { text-align: right; margin-bottom: 16px; }
  .senate-print-btn {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.15em;
    padding: 14px 28px;
    background: #1a1a1a;
    color: #f5f3ef;
    border: 3px solid #1a1a1a;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .senate-print-btn:hover { background: #f5f3ef; color: #1a1a1a; }

  /* Print */
  @media print {
    .senate-report { padding: 0; background: white; max-width: 100%; }
    .senate-actions { display: none; }
    .senate-section { page-break-inside: avoid; }
    .senate-header { page-break-after: avoid; }
    .senate-subsection { page-break-inside: avoid; }
    .senate-footer { page-break-before: always; }
    .biz-card { break-inside: avoid; }
    .biz-grid { grid-template-columns: 1fr 1fr; }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .senate-report { padding: 24px 16px; }
    .senate-header__title { font-size: 16px; letter-spacing: 0.1em; }
    .senate-row { flex-wrap: wrap; }
    .senate-row__dots { display: none; }
    .senate-row__value { width: 100%; text-align: left; padding-left: 16px; }
    .biz-grid { grid-template-columns: 1fr; }
  }
`;
