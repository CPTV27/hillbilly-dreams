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
        <p className="senate-gate__sub">Executive Portal — Authorized Access Only</p>
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

// ── Report Section Component ──
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

function Finding({ priority, text }: { priority: 'HIGH' | 'MEDIUM' | 'LOW'; text: string }) {
  const markers = { HIGH: '■■■', MEDIUM: '■■□', LOW: '■□□' };
  return (
    <div className="senate-finding">
      <span className={`senate-finding__priority senate-finding__priority--${priority.toLowerCase()}`}>
        [{markers[priority]}] {priority}
      </span>
      <span className="senate-finding__text">{text}</span>
    </div>
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
      <header className="senate-header">
        <div className="senate-header__bar" />
        <div className="senate-header__content">
          <p className="senate-header__classification">CONFIDENTIAL — PARTNERS ONLY</p>
          <h1 className="senate-header__title">HILLBILLY DREAMS INCORPORATED</h1>
          <p className="senate-header__subtitle">Comprehensive Executive Summary &amp; Financial Review</p>
          <div className="senate-header__meta">
            <p>Prepared for: <strong>Tracy Alderson-Allen</strong>, Equity Partner &amp; COO</p>
            <p>Prepared by: <strong>Huck</strong>, Chief of Staff — HDI Agent Syndicate</p>
            <p>Date: <strong>{reportDate}</strong></p>
            <p>Classification: <strong>CONFIDENTIAL</strong></p>
          </div>
        </div>
        <div className="senate-header__bar" />
      </header>

      <div className="senate-toc">
        <h2 className="senate-toc__title">TABLE OF CONTENTS</h2>
        <div className="senate-toc__entries">
          <div className="senate-toc__entry"><span>SECTION 1.</span> Corporate Structure &amp; Governance <span className="senate-toc__page">3</span></div>
          <div className="senate-toc__entry"><span>SECTION 2.</span> Property &amp; Subsidiary Status <span className="senate-toc__page">5</span></div>
          <div className="senate-toc__entry"><span>SECTION 3.</span> Personal Receivables <span className="senate-toc__page">9</span></div>
          <div className="senate-toc__entry"><span>SECTION 4.</span> Civic Opportunity — State Utility Program <span className="senate-toc__page">11</span></div>
          <div className="senate-toc__entry"><span>SECTION 5.</span> Tax Obligations &amp; Filing Status <span className="senate-toc__page">13</span></div>
          <div className="senate-toc__entry"><span>SECTION 6.</span> Findings &amp; Recommendations <span className="senate-toc__page">15</span></div>
        </div>
      </div>

      <ReportSection number="1" title="CORPORATE STRUCTURE & GOVERNANCE">
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">1.1 Active Entities</h3>
          <DataRow label="Farley Pierson LLC" value="EIN 81-4280721 — NY LLC (single-member), Active" />
          <DataRow label="Tuthill Design LLC" value="EIN 39-3499965 — NY LLC (partnership), Active" />
          <DataRow label="Bearsville Media Group LLC" value="EIN 87-1868337 — NY LLC (single-member), Dormant" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">1.2 Dissolved Entities</h3>
          <DataRow label="Scan2Plan, Inc." value="Delaware C-Corp — Partnership dissolved 3/25/2026" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">1.3 Entities To Be Formed</h3>
          <DataRow label="Hillbilly Dreams, Inc." value="NOT YET FORMED — needs incorporation in Mississippi" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">1.4 Equity Partners (HDI — pending formation)</h3>
          <DataRow label="Chase Pierson, CEO" value="% TBD upon formation" />
          <DataRow label="Tracy Alderson-Allen, COO" value="% TBD upon formation" />
          <DataRow label="Amy Alderson-Allen, Guest Experience" value="% TBD upon formation" />
        </div>
      </ReportSection>

      <ReportSection number="2" title="PROPERTY & SUBSIDIARY STATUS">
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.1 The Big Muddy Inn — Natchez, MS</h3>
          <DataRow label="Revenue YTD (Cash App from Tracy)" value="$2,456" />
          <DataRow label="Status" value="Operating — lodging active" />
          <DataRow label="Insurance Status" value="— needs verification —" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.2 Big Muddy Magazine</h3>
          <DataRow label="Status" value="Pre-launch" />
          <DataRow label="Revenue" value="$0" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.3 Big Muddy Records</h3>
          <DataRow label="Status" value="Pre-launch" />
          <DataRow label="Revenue" value="$0" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.4 Big Muddy Touring</h3>
          <DataRow label="Status" value="Pre-launch" />
          <DataRow label="Revenue" value="$0" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.5 Big Muddy Radio</h3>
          <DataRow label="Status" value="Pre-launch" />
          <DataRow label="Revenue" value="$0" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.6 Measurably Better (SaaS Platform)</h3>
          <DataRow label="Status" value="Active Development" />
          <DataRow label="Stripe Revenue (FarleyPierson)" value="$17,456" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.7 Deep South Directory</h3>
          <DataRow label="Status" value="Active Development" />
          <DataRow label="Businesses Listed" value="19 (seeded)" />
          <DataRow label="Revenue" value="$0" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.8 Consolidated 2025 Income — All Sources</h3>
          <DataRow label="Scan2Plan LLC (direct)" value="$41,239" />
          <DataRow label="Stripe / FarleyPierson" value="$17,456" />
          <DataRow label="Tuthill Design (S2P pass-thru)" value="$12,660" />
          <DataRow label="Film Production" value="$4,500" />
          <DataRow label="Ardent Music" value="$3,000" />
          <DataRow label="Big Muddy Inn (Cash App)" value="$2,456" />
          <DataRow label="PayPal" value="$1,854" />
          <DataRow label="Other (Venmo, Airbnb, TikTok, Sage)" value="$1,975" />
          <DataRow label="TOTAL GROSS INCOME" value="$85,013" />
        </div>
      </ReportSection>

      <ReportSection number="3" title="PERSONAL RECEIVABLES — CHASE PIERSON">
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">3.1 Scan2Plan Revenue Share</h3>
          <DataRow label="Arrangement" value="2% gross rev (Sep 2021) + 5% COO (Oct 2025), terminated Feb 2026" />
          <DataRow label="Total Owed (2% + 5%, Sep 2021 – Feb 2026)" value="$103,530" />
          <DataRow label="Total Received" value="($93,040)" />
          <DataRow label="Net Underpayment" value="$10,490" />
          <DataRow label="Outstanding (Dec 2025 + Jan 2026)" value="$16,009" />
          <DataRow label="Logan Airport (uninvoiced)" value="$1,500" />
          <DataRow label="TOTAL OWED TO CHASE PIERSON" value="$27,999" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">3.2 Partnership Status</h3>
          <DataRow label="Dissolution Date" value="March 25, 2026" />
          <DataRow label="Evidence" value="Agata Roberts email ledger, QBO data, bank records" />
          <DataRow label="Final Invoice Sent" value="$22,739.20 (March waived)" />
        </div>
      </ReportSection>

      <ReportSection number="4" title="CIVIC OPPORTUNITY — STATE UTILITY PROGRAM">
        <DataRow label="Total Funding Available" value="$800,000,000" />
        <DataRow label="Program Details" value="— research in progress —" />
        <DataRow label="HDI Eligibility" value="— to be determined —" />
        <DataRow label="Requirements" value="— to be determined —" />
        <DataRow label="Application Deadline" value="— to be determined —" />
      </ReportSection>

      <ReportSection number="5" title="TAX OBLIGATIONS & FILING STATUS">
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">5.1 Federal — IRS</h3>
          <DataRow label="2018 IRS Balance" value="Unknown — $100/mo installment agreement ACTIVE" />
          <DataRow label="2020 IRS Balance" value="~$20,762 (original) — status unclear, may overlap 2018 agreement" />
          <DataRow label="2024 IRS Balance" value="$10,917 — CP504 LEVY NOTICE — Anderson Bradshaw must address" />
          <DataRow label="IRS Monthly Payment" value="$100 by 28th — next 6 months scheduled, auto-pay" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">5.2 State — New York</h3>
          <DataRow label="2024 NY State" value="$1,681 — Unpaid" />
          <DataRow label="NY State $10K Balance" value="Payment plan status unknown" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">5.3 Estimated Payments — 2025</h3>
          <DataRow label="Federal Estimated Owed" value="$8,248 — NONE PAID" />
          <DataRow label="NY State Estimated Owed" value="$1,588 — NONE PAID" />
          <DataRow label="Penalty Status" value="Underpayment penalties will apply" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">5.4 Credit Report (March 26, 2026)</h3>
          <DataRow label="Scores" value="685 TransUnion / 685 Equifax" />
          <DataRow label="Collections" value="$21,717 across 5 debt buyers" />
          <DataRow label="Bridgecrest (F-150)" value="$1,013 remaining — 96% paid, done June 2026" />
          <DataRow label="Bank of Greene County" value="$333,280 — NOT Chase's debt (ex-wife's mortgage, needs dispute)" />
          <DataRow label="Apple Card" value="$0 balance, clean" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">5.5 Vehicle</h3>
          <DataRow label="Vehicle" value="2015 Ford F-150, 151,537 miles" />
          <DataRow label="Payment" value="$520/mo Bridgecrest — final payment June 2026" />
          <DataRow label="Business Use (2024)" value="66.36% (14,589 of 21,985 miles)" />
          <DataRow label="Mileage Deduction" value="$9,775 (standard rate $0.67/mile)" />
        </div>
      </ReportSection>

      <ReportSection number="6" title="FINDINGS & RECOMMENDATIONS">
        <Finding priority="HIGH" text="2024 CP504 LEVY NOTICE ($10,917) — Anderson Bradshaw must fold into existing agreement or negotiate immediately" />
        <Finding priority="HIGH" text="2025 estimated taxes ($9,836 combined) — none paid, underpayment penalties inevitable" />
        <Finding priority="HIGH" text="Form Hillbilly Dreams, Inc. in Mississippi — entity does not yet exist" />
        <Finding priority="HIGH" text="Dispute Bank of Greene County $333,280 mortgage on credit report — this is Elizabeth's debt, not Chase's" />
        <Finding priority="HIGH" text="Collect $27,999 owed from Scan2Plan — final invoice sent, partnership dissolved 3/25/2026" />
        <Finding priority="MEDIUM" text="Resolve Tuthill Design pass-through classification — need K-1 from Elijah to prevent double-counting" />
        <Finding priority="MEDIUM" text="Obtain Scan2Plan 1099s for all years — critical for cross-reference" />
        <Finding priority="MEDIUM" text="Download Flymax/Utopia Studios 1099-NEC from QuickBooks portal" />
        <Finding priority="MEDIUM" text="Establish formal operating agreement with equity splits for HDI" />
        <Finding priority="LOW" text="Consolidate GCP/Firebase accounts under single Workspace domain" />
        <Finding priority="LOW" text="Review 473 unclassified transactions ($14,627) in Found Banking business account" />
      </ReportSection>

      <footer className="senate-footer">
        <div className="senate-header__bar" />
        <p className="senate-footer__text">
          END OF REPORT — HILLBILLY DREAMS INCORPORATED<br />
          This document is confidential and intended solely for the named recipient.<br />
          Unauthorized distribution is prohibited.
        </p>
        <p className="senate-footer__generated">
          Generated by HDI Agent Syndicate — Huck, Chief of Staff<br />
          {reportDate}
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
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 32px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.6;
    color: #1a1a1a;
    background: #f5f3ef;
    min-height: 100vh;
  }

  .senate-header { margin-bottom: 48px; }
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

  .senate-toc {
    margin-bottom: 48px;
    padding: 24px;
    border: 1px solid #ccc;
  }
  .senate-toc__title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2em;
    margin: 0 0 16px;
    text-align: center;
  }
  .senate-toc__entry {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 4px 0;
    border-bottom: 1px dotted #ccc;
  }
  .senate-toc__entry span:first-child {
    font-weight: 700;
    margin-right: 8px;
  }
  .senate-toc__page { font-weight: 700; }

  .senate-section {
    margin-bottom: 40px;
    page-break-inside: avoid;
  }
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

  .senate-finding {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    gap: 12px;
    align-items: baseline;
  }
  .senate-finding__priority {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }
  .senate-finding__priority--high { color: #8b0000; }
  .senate-finding__priority--medium { color: #8b6914; }
  .senate-finding__priority--low { color: #2d5016; }
  .senate-finding__text { font-size: 13px; }

  .senate-note {
    font-style: italic;
    color: #666;
    margin: 0 0 16px;
    font-size: 13px;
  }

  .senate-footer {
    margin-top: 64px;
    text-align: center;
  }
  .senate-footer__text {
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #666;
    line-height: 1.8;
    margin: 16px 0;
  }
  .senate-footer__generated {
    font-size: 11px;
    color: #999;
    margin: 16px 0 0;
  }

  @media print {
    .senate-report { padding: 0; background: white; }
    .senate-section { page-break-inside: avoid; }
  }

  @media (max-width: 640px) {
    .senate-report { padding: 24px 16px; }
    .senate-header__title { font-size: 16px; letter-spacing: 0.1em; }
    .senate-row { flex-wrap: wrap; }
    .senate-row__dots { display: none; }
    .senate-row__value { width: 100%; text-align: left; padding-left: 16px; }
  }
`;
