'use client';

import { useState } from 'react';

const ALLOWED = ['tracy', 'amy', 'jp', 'owen', 'chase'];

// ── Senate Report Styles ──
const font = '"Courier New", Courier, monospace';
const bg = '#fffff8';
const text = '#1a1a1a';
const rule = '#1a1a1a';
const muted = '#666';

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: text, marginBottom: 24, letterSpacing: '0.1em' }}>HILLBILLY DREAMS, INC.</p>
        <p style={{ fontSize: 12, color: muted, marginBottom: 16 }}>INTERNAL -- AUTHORIZED ACCESS ONLY</p>
        <input
          type="password"
          placeholder="Enter your name"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (ALLOWED.includes(pw.toLowerCase().trim())) onUnlock();
              else setErr(true);
            }
          }}
          style={{
            fontFamily: font, fontSize: 14, padding: '10px 16px',
            border: `1px solid ${err ? '#c00' : '#999'}`, backgroundColor: '#fff',
            textAlign: 'center', width: 240, outline: 'none',
          }}
        />
        {err && <p style={{ fontSize: 11, color: '#c00', marginTop: 8 }}>Access denied.</p>}
        <p style={{ fontSize: 10, color: muted, marginTop: 24 }}>March 25, 2026</p>
      </div>
    </div>
  );
}

// ── Data ──
const segments = [
  {
    label: 'SEGMENT 1: MAIN STREET BUSINESS (CURRENT)',
    items: [
      'AI operating system replacing back-office headcount',
      'Live QuickBooks sync, automated marketing, CEO console',
      'Pricing: $5,000/mo core + variable growth module',
      'First external clients: Tuthill Design + Studio C (Woodstock, NY)',
    ],
  },
  {
    label: 'SEGMENT 2: CIVIC / MUNICIPAL (NEW)',
    items: [
      'Digital permitting, asset management, grant reporting',
      'Replaces paper-based city hall workflows',
      'Pricing: $9,600-$18,000/year for small cities (under Tyler\'s $25K floor)',
      'Target pilot: City of Natchez',
    ],
  },
  {
    label: 'SEGMENT 3: EDUCATION (NEW)',
    items: [
      'Facilities management, enrollment forecasting',
      'Title I/II/IV compliance reporting automation',
      'FERPA-compliant AI assistant over policies and safety plans',
      'Pricing: $25,000+/year per district (E-Rate and Title IV-A funded)',
      'Target pilot: Natchez-Adams School District',
    ],
  },
  {
    label: 'SEGMENT 4: TOURISM / REGIONAL MEDIA (EXISTING)',
    items: [
      'Big Muddy model, formalized as a CVB service',
      'Locally-produced content replacing out-of-state agencies',
      '80% of production budget stays in-county',
      'Pricing: $2,000-$8,000/mo or direct budget replacement',
    ],
  },
];

const competitors = [
  ['Tyler Technologies', 'Civic/Gov', '$25-75K/yr', 'National', '$2.3B revenue, 89% recurring'],
  ['CivicPlus', 'Websites/311', '$40-175K/yr', 'National', '10,000+ cities, opaque pricing'],
  ['OpenGov', 'Permitting', '$30-60K/yr', 'National', 'Landed Starkville MS 2025'],
  ['CentralSquare', 'Public Safety', '$40-100K/yr', 'National', 'Alabama-heavy'],
  ['Local Agencies', 'Tourism', '$50-200K/yr', 'Per-project', 'Money leaves the region'],
  ['MEASURABLY BETTER', 'ALL FOUR', '$9.6-60K/yr', 'REGIONAL', 'Built in Mississippi'],
];

const funding = [
  { name: 'ARPA (American Rescue Plan Act)', details: [
    'Mississippi: approximately $826 million unspent',
    'Hard spending deadline: December 31, 2026 (9 months)',
    'Eligible: cybersecurity, IT modernization, broadband, digital inclusion',
    'Louisiana and Arkansas hold similar unspent balances',
  ]},
  { name: 'E-RATE (FCC Schools and Libraries Program)', details: [
    'Mississippi: $33.3 million in FY2026 requests filed',
    'FY2025 committed: $26.3 million',
    'New 5-year Category 2 cycle opens FY2026 -- fresh budget per district',
    'FY2026 budget: $201.57/student, $30,175 minimum per school',
    '1 in 4 MS districts below 1 Mbps/student bandwidth goal',
  ]},
  { name: 'TITLE IV-A (Student Support and Academic Enrichment)', details: [
    '$17.4 million/year allocated to Mississippi for K-12 technology',
  ]},
  { name: 'ADDITIONAL FEDERAL PROGRAMS', details: [
    'USDA Rural Development / ReConnect: broadband and digital infrastructure',
    'EDA Tech Hubs: regional innovation funding',
    'HUD CDBG: community development block grants, technology-eligible',
  ]},
];

const gapAnalysis = [
  { item: 'RBAC / Multi-tenant Auth', status: 'PARTIAL', severity: 'Medium', note: 'Roles exist. No granular permissions or DB-level tenant isolation.' },
  { item: 'Audit Logging', status: 'MINIMAL', severity: 'High', note: 'OpsActivity model is mutable. Not compliance-grade. Missing API call logging.' },
  { item: 'Encryption (at-rest)', status: 'MISSING', severity: 'Critical', note: 'No column-level encryption. PII stored plaintext in Postgres.' },
  { item: '311/CRM System', status: 'MISSING', severity: 'Critical', note: 'Zero CRM infrastructure. Core civic feature absent.' },
  { item: 'Payments / Stripe', status: 'EXISTS', severity: 'None', note: 'Stripe Connect implemented. Needs civic fee collection extension.' },
  { item: 'CMS / Content', status: 'EXISTS', severity: 'Low', note: '46 Prisma models. Articles, events, newsletters. Needs approval workflows.' },
  { item: 'Kiosk Mode', status: 'PARTIAL', severity: 'Medium', note: 'Prototype with mock data. No hardware integration or live civic data.' },
  { item: 'AI / RAG', status: 'EXISTS', severity: 'Low', note: 'Vertex AI + Gemini Pro operational. Extend for civic codex.' },
  { item: 'FERPA/DPA Templates', status: 'MISSING', severity: 'Critical', note: 'No legal documents. Must produce before any school district contract.' },
  { item: 'StateRAMP Documentation', status: 'MISSING', severity: 'High', note: 'GCP has StateRAMP. App-layer NIST 800-53 mapping absent.' },
  { item: 'GCP Assured Workloads', status: 'NOT CONFIGURED', severity: 'High', note: 'No data residency enforcement. Required for state contracts.' },
  { item: 'Deployment Playbooks', status: 'PARTIAL', severity: 'Medium', note: 'Docker + App Hosting config exists. No civic ops runbooks.' },
];

const revenue = [
  ['SMB (5 clients)', '$300,000', '$450,000', '$600,000'],
  ['Civic (3 cities)', '$100,000', '$250,000', '$500,000'],
  ['Education (5 districts)', '$75,000', '$200,000', '$400,000'],
  ['Tourism / Media', '$50,000', '$150,000', '$300,000'],
];

const lastSteps = [
  { title: 'INSURANCE', body: 'Bind $2M GL + $1M cyber policy (Embroker/Coalition). Nothing moves with government until a COI exists.' },
  { title: 'LEGAL DOCUMENTS', body: 'Finalize: CivicX product sheet, Delta Dawn cross-sovereign read policy, FERPA DPA and MSA templates.' },
  { title: 'STATERAMP / GOVRAMP PATH', body: 'Document inherited GCP controls. Map app-layer controls (RBAC, logging, backups) to NIST 800-53. Identify sponsor state.' },
  { title: '311/CRM BUILD', body: 'ServiceRequest model, intake workflow, mobile/web UI. Core civic feature. 4-6 weeks.' },
  { title: 'ENCRYPTION + AUDIT', body: 'Column-level AES-256 for PII. Immutable audit log with hash chain. FERPA/StateRAMP prerequisite.' },
  { title: 'DEPLOYMENT PLAYBOOKS', body: 'Three written playbooks: CivicX small city (90 days), District safety stack (90 days), Delta Dawn pilot (120 days).' },
  { title: 'PRICING MATRICES', body: 'Lock price bands per segment with explicit inclusions/exclusions. No scope creep.' },
  { title: 'REFERENCE WINS', body: 'Big Muddy Inn + KioskMode as named case studies. Capture one pilot civic client in the five-county region.' },
  { title: 'GRANT WRITER', body: 'Retainer relationship for ARPA, USDA Rural Development, and E-Rate applications. One of the four vendor stack slots.' },
];

function Report() {
  const S = {
    page: { minHeight: '100vh', backgroundColor: bg, fontFamily: font, color: text, padding: '0 0 80px' } as React.CSSProperties,
    wrap: { maxWidth: 680, margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
    dhr: { borderTop: `3px double ${rule}`, margin: '24px 0 16px' } as React.CSSProperties,
    hr: { borderTop: `1px solid ${rule}`, margin: '16px 0 12px' } as React.CSSProperties,
    thr: { borderTop: `1px solid #ccc`, margin: '12px 0 8px' } as React.CSSProperties,
    title: { fontSize: 16, fontWeight: 700, textAlign: 'center' as const, letterSpacing: '0.08em', margin: '0 0 4px' } as React.CSSProperties,
    subtitle: { fontSize: 12, textAlign: 'center' as const, margin: '0 0 4px', color: muted } as React.CSSProperties,
    section: { fontSize: 14, fontWeight: 700, textAlign: 'center' as const, letterSpacing: '0.06em', margin: '24px 0 8px' } as React.CSSProperties,
    sub: { fontSize: 12, fontWeight: 700, margin: '16px 0 6px' } as React.CSSProperties,
    body: { fontSize: 12, lineHeight: 1.7, margin: '0 0 8px' } as React.CSSProperties,
    indent: { fontSize: 12, lineHeight: 1.7, margin: '0 0 4px', paddingLeft: 36 } as React.CSSProperties,
    small: { fontSize: 11, color: muted, lineHeight: 1.5 } as React.CSSProperties,
    center: { fontSize: 12, textAlign: 'center' as const, margin: '0 0 6px' } as React.CSSProperties,
  };

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        {/* Header */}
        <div style={{ paddingTop: 48 }} />
        <div style={S.dhr} />
        <p style={S.title}>HILLBILLY DREAMS, INC.</p>
        <div style={S.dhr} />
        <div style={{ height: 16 }} />
        <p style={S.title}>EXECUTIVE STRATEGY REPORT</p>
        <div style={{ height: 8 }} />
        <p style={S.subtitle}>MEASURABLY BETTER: REGIONAL TECHNOLOGY</p>
        <p style={S.subtitle}>PROVIDER FOR THE DEEP SOUTH</p>
        <div style={{ height: 16 }} />
        <div style={S.thr} />
        <p style={S.center}>Prepared for: Tracy Pierson, Amy Pierson, Partners</p>
        <p style={S.center}>Prepared by: Chase Pierson, Managing Partner</p>
        <p style={S.center}>Date: March 25, 2026</p>
        <div style={S.thr} />
        <p style={{ ...S.center, marginTop: 16 }}>INTERNAL -- NOT FOR DISTRIBUTION</p>

        {/* I. PURPOSE */}
        <p style={S.section}>I.  PURPOSE OF THIS MEMORANDUM</p>
        <div style={S.hr} />
        <p style={S.body}>
          This memorandum outlines an expanded strategic direction for Measurably Better, the product brand of Hillbilly Dreams, Inc. The proposal is to reposition MB from a software company serving small businesses to a regional technology and media provider serving four distinct markets across the Deep South.
        </p>
        <p style={S.body}>
          The core technology platform (MBT) does not change. The packaging, pricing, and sales channels expand to capture adjacent markets that use the same infrastructure.
        </p>
        <p style={S.body}>
          The tagline for the expanded brand:
        </p>
        <p style={{ ...S.body, textAlign: 'center', fontWeight: 700, margin: '16px 0' }}>
          &quot;The South has the culture. We are building the infrastructure to match.&quot;
        </p>

        {/* II. PRODUCT ECOSYSTEM */}
        <p style={S.section}>II.  THE PRODUCT ECOSYSTEM</p>
        <div style={S.hr} />
        <p style={S.body}>
          Measurably Better operates on a single platform engine (MBT) deployed across four market segments. Each segment receives a tailored interface and pricing model, but all run on shared infrastructure managed by our team.
        </p>
        {segments.map((seg) => (
          <div key={seg.label}>
            <p style={S.sub}>{seg.label}</p>
            {seg.items.map((item, i) => (
              <p key={i} style={S.indent}>--  {item}</p>
            ))}
          </div>
        ))}

        {/* III. COMPETITIVE LANDSCAPE */}
        <p style={S.section}>III.  COMPETITIVE LANDSCAPE</p>
        <div style={S.hr} />
        <p style={S.body}>
          Independent research confirmed a verified market gap: no regional provider serves all four segments (civic, K-12, tourism, SMB) anywhere in the Deep South. Tyler Technologies dominates civic with $2.3B in annual revenue. CivicPlus holds 33.6% of the government web category. Neither serves all four markets. Neither is built in Mississippi.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: font, margin: '12px 0' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${rule}`, borderTop: `2px solid ${rule}` }}>
                {['COMPETITOR', 'SEGMENT', 'MIN. CONTRACT', 'COVERAGE', 'NOTE'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 700, fontSize: 10, letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid #ccc`, fontWeight: i === competitors.length - 1 ? 700 : 400 }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '5px 8px', fontSize: 11 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* IV. FUNDING */}
        <p style={S.section}>IV.  THE GRANT AND FUNDING OPPORTUNITY</p>
        <div style={S.hr} />
        <p style={S.body}>
          Research (Perplexity Deep Research, March 25, 2026) confirmed the following funding environment. The core argument: &quot;You are going to spend this money on somebody&apos;s software by December 2026. We are the only option built in Mississippi.&quot;
        </p>
        {funding.map((f) => (
          <div key={f.name}>
            <p style={S.sub}>{f.name}</p>
            {f.details.map((d, i) => (
              <p key={i} style={S.indent}>--  {d}</p>
            ))}
          </div>
        ))}

        {/* V. TECHNICAL GAP ANALYSIS */}
        <p style={S.section}>V.  TECHNICAL READINESS ASSESSMENT</p>
        <div style={S.hr} />
        <p style={S.body}>
          A full audit of the current codebase was conducted against civic/government requirements. The following table summarizes what exists, what is partial, and what is missing.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: font, margin: '12px 0' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${rule}`, borderTop: `2px solid ${rule}` }}>
                {['REQUIREMENT', 'STATUS', 'SEVERITY', 'NOTE'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 700, fontSize: 10, letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gapAnalysis.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid #ccc` }}>
                  <td style={{ padding: '5px 8px', fontWeight: 600 }}>{row.item}</td>
                  <td style={{ padding: '5px 8px', fontWeight: 700, color: row.status === 'EXISTS' ? '#16a34a' : row.status === 'MISSING' || row.status === 'NOT CONFIGURED' ? '#c00' : '#b45309' }}>{row.status}</td>
                  <td style={{ padding: '5px 8px', color: row.severity === 'Critical' ? '#c00' : row.severity === 'High' ? '#b45309' : muted }}>{row.severity}</td>
                  <td style={{ padding: '5px 8px', fontSize: 10, color: muted }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={S.body}>
          <strong>Estimated time to state-contract readiness: 6-8 weeks (full-time).</strong> The critical path runs through: 311/CRM build, encryption, audit logging, and legal documents.
        </p>

        {/* VI. REVENUE PROJECTION */}
        <p style={S.section}>VI.  THREE-YEAR REVENUE PROJECTION</p>
        <div style={S.hr} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: font, margin: '12px 0' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${rule}`, borderTop: `2px solid ${rule}` }}>
              {['SEGMENT', 'YEAR 1', 'YEAR 2', 'YEAR 3'].map((h) => (
                <th key={h} style={{ textAlign: h === 'SEGMENT' ? 'left' : 'right', padding: '6px 8px', fontWeight: 700, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {revenue.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid #ccc` }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '5px 8px', textAlign: j === 0 ? 'left' : 'right' }}>{cell}</td>
                ))}
              </tr>
            ))}
            <tr style={{ borderTop: `2px solid ${rule}`, borderBottom: `2px solid ${rule}` }}>
              <td style={{ padding: '5px 8px', fontWeight: 700 }}>TOTAL</td>
              <td style={{ padding: '5px 8px', fontWeight: 700, textAlign: 'right' }}>$525,000</td>
              <td style={{ padding: '5px 8px', fontWeight: 700, textAlign: 'right' }}>$1,050,000</td>
              <td style={{ padding: '5px 8px', fontWeight: 700, textAlign: 'right' }}>$1,800,000</td>
            </tr>
          </tbody>
        </table>

        {/* VII. NATCHEZ PROOF */}
        <p style={S.section}>VII.  THE NATCHEZ PROOF OF CONCEPT</p>
        <div style={S.hr} />
        <p style={S.body}>Hillbilly Dreams currently operates the following assets in Natchez, Mississippi, all running on the Measurably Better platform:</p>
        {[
          'The Big Muddy Inn (6-room boutique hotel)',
          'Big Muddy Magazine (editorial content)',
          'Big Muddy Radio (curated playlists, streaming)',
          'Big Muddy Touring (18-city region guide)',
          'Big Muddy Records (artist services, 100% masters retained)',
          'Rise Up (regional talent development circuit)',
        ].map((a, i) => <p key={i} style={S.indent}>--  {a}</p>)}
        <p style={S.body}>
          This is not a theoretical proof of concept. It is a functioning business that guests can book, content that readers can access, and music that listeners can hear. When approaching civic and education buyers, we demonstrate a live deployment -- not a slide deck.
        </p>

        {/* VIII. LAST STEPS */}
        <p style={S.section}>VIII.  REQUIREMENTS FOR EXECUTION</p>
        <div style={S.hr} />
        <p style={S.body}>The expanded strategy requires nine specific actions:</p>
        {lastSteps.map((step, i) => (
          <div key={i}>
            <p style={S.sub}>{i + 1}.  {step.title}</p>
            <p style={S.indent}>{step.body}</p>
          </div>
        ))}

        {/* IX. POSITIONING */}
        <p style={S.section}>IX.  STRATEGIC POSITIONING</p>
        <div style={S.hr} />
        <p style={S.body}>Tuthill and Studio C are the first external revenue events. What changes is the story:</p>
        <div style={{ margin: '16px 0' }}>
          <p style={S.body}><strong>Before:</strong>  &quot;We sell software to contractors.&quot;</p>
          <p style={S.body}><strong>After:</strong>   &quot;We are the regional technology provider for the Deep South. Here is a scanning company, a city, a school district, and a tourism bureau -- all running on the same engine.&quot;</p>
        </div>
        <p style={S.body}>
          The ARPA deadline creates a 9-month window where municipalities are actively looking to deploy technology dollars or lose them. We are positioned to capture that demand with a live proof of concept operating in the same town where the first civic pilot would deploy.
        </p>

        {/* Close */}
        <div style={{ ...S.dhr, marginTop: 48 }} />
        <p style={S.center}>END OF MEMORANDUM</p>
        <div style={S.dhr} />
        <p style={{ ...S.small, textAlign: 'center', marginTop: 24 }}>
          Hillbilly Dreams, Inc. -- Natchez, Mississippi -- bigmuddytouring.com/hillbilly
        </p>
      </div>
    </div>
  );
}

export default function StrategyPage() {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;
  return <Report />;
}
