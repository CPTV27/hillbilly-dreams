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
        <DataRow label="Legal Entity" value="Hillbilly Dreams Incorporated" />
        <DataRow label="State of Incorporation" value="Mississippi" />
        <DataRow label="Entity Type" value="— awaiting data —" />
        <DataRow label="EIN" value="— awaiting data —" />
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">1.1 Equity Partners</h3>
          <DataRow label="Chase Pierson, CEO" value="— % —" />
          <DataRow label="Tracy Alderson-Allen, COO" value="— % —" />
          <DataRow label="Amy Alderson-Allen, Guest Experience" value="— % —" />
        </div>
      </ReportSection>

      <ReportSection number="2" title="PROPERTY & SUBSIDIARY STATUS">
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.1 The Big Muddy Inn — Natchez, MS</h3>
          <DataRow label="Revenue YTD" value="— awaiting data —" />
          <DataRow label="Expenses YTD" value="— awaiting data —" />
          <DataRow label="Net Income/Loss" value="— awaiting data —" />
          <DataRow label="Occupancy Rate" value="— awaiting data —" />
          <DataRow label="Insurance Status" value="— awaiting data —" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.2 Big Muddy Magazine</h3>
          <DataRow label="Status" value="Pre-launch" />
          <DataRow label="Revenue" value="$0" />
          <DataRow label="Ad Pipeline" value="— awaiting data —" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.3 Big Muddy Records</h3>
          <DataRow label="Status" value="Pre-launch" />
          <DataRow label="Artists Signed" value="0" />
          <DataRow label="Revenue" value="$0" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.4 Big Muddy Touring</h3>
          <DataRow label="Status" value="Pre-launch" />
          <DataRow label="Venues Scouted" value="— awaiting data —" />
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
          <DataRow label="MRR" value="— awaiting data —" />
          <DataRow label="Pipeline" value="— awaiting data —" />
        </div>
        <div className="senate-subsection">
          <h3 className="senate-subsection__title">2.7 Deep South Directory</h3>
          <DataRow label="Status" value="Active Development" />
          <DataRow label="Businesses Listed" value="19 (seeded)" />
          <DataRow label="Revenue" value="$0" />
        </div>
      </ReportSection>

      <ReportSection number="3" title="PERSONAL RECEIVABLES — CHASE PIERSON">
        <DataRow label="Owed from Scan2Plan" value="— awaiting data —" />
        <DataRow label="Date Incurred" value="— awaiting data —" />
        <DataRow label="Terms" value="— awaiting data —" />
        <DataRow label="Status" value="— awaiting data —" />
        <DataRow label="Other Receivables" value="— awaiting data —" />
      </ReportSection>

      <ReportSection number="4" title="CIVIC OPPORTUNITY — STATE UTILITY PROGRAM">
        <DataRow label="Program" value="— awaiting data —" />
        <DataRow label="Total Funding Available" value="$800,000,000" />
        <DataRow label="HDI Eligibility" value="— awaiting data —" />
        <DataRow label="Requirements" value="— awaiting data —" />
        <DataRow label="Application Deadline" value="— awaiting data —" />
        <DataRow label="Timeline to Award" value="— awaiting data —" />
      </ReportSection>

      <ReportSection number="5" title="TAX OBLIGATIONS & FILING STATUS">
        <DataRow label="Federal Filing Status" value="— awaiting data —" />
        <DataRow label="State Filing Status" value="— awaiting data —" />
        <DataRow label="Estimated Taxes Paid YTD" value="— awaiting data —" />
        <DataRow label="Outstanding Liabilities" value="— awaiting data —" />
        <DataRow label="Next Filing Deadline" value="— awaiting data —" />
      </ReportSection>

      <ReportSection number="6" title="FINDINGS & RECOMMENDATIONS">
        <p className="senate-note">Awaiting financial data from tax review agent. Recommendations will be populated upon receipt.</p>
        <Finding priority="HIGH" text="Complete entity structuring and EIN registration" />
        <Finding priority="HIGH" text="Establish formal operating agreement with equity splits" />
        <Finding priority="MEDIUM" text="Resolve Scan2Plan receivables" />
        <Finding priority="MEDIUM" text="File civic utility program application before deadline" />
        <Finding priority="LOW" text="Consolidate GCP/Firebase accounts under single Workspace domain" />
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
