'use client';

import { useState } from 'react';

const ALLOWED = ['tracy', 'amy', 'jp', 'chase'];
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
          style={{ fontFamily: font, fontSize: 14, padding: '10px 16px', border: `1px solid ${err ? '#c00' : '#999'}`, backgroundColor: '#fff', textAlign: 'center', width: 240, outline: 'none' }}
        />
        {err && <p style={{ fontSize: 11, color: '#c00', marginTop: 8 }}>Access denied.</p>}
        <p style={{ fontSize: 10, color: muted, marginTop: 24 }}>March 26, 2026</p>
      </div>
    </div>
  );
}

const S = {
  page: { minHeight: '100vh', backgroundColor: bg, fontFamily: font, color: text, padding: '0 0 80px' } as React.CSSProperties,
  wrap: { maxWidth: 680, margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  dhr: { borderTop: `3px double ${rule}`, margin: '24px 0 16px' } as React.CSSProperties,
  hr: { borderTop: `1px solid ${rule}`, margin: '16px 0 12px' } as React.CSSProperties,
  title: { fontSize: 16, fontWeight: 700, textAlign: 'center' as const, letterSpacing: '0.08em', margin: '0 0 4px' } as React.CSSProperties,
  sub: { fontSize: 12, textAlign: 'center' as const, margin: '0 0 4px', color: muted } as React.CSSProperties,
  section: { fontSize: 14, fontWeight: 700, textAlign: 'center' as const, letterSpacing: '0.06em', margin: '24px 0 8px' } as React.CSSProperties,
  h3: { fontSize: 12, fontWeight: 700, margin: '16px 0 6px' } as React.CSSProperties,
  body: { fontSize: 12, lineHeight: 1.7, margin: '0 0 8px' } as React.CSSProperties,
  indent: { fontSize: 12, lineHeight: 1.7, margin: '0 0 4px', paddingLeft: 36 } as React.CSSProperties,
  center: { fontSize: 12, textAlign: 'center' as const, margin: '0 0 6px' } as React.CSSProperties,
};

function Report() {
  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={{ paddingTop: 48 }} />
        <div style={S.dhr} />
        <p style={S.title}>HILLBILLY DREAMS, INC.</p>
        <div style={S.dhr} />
        <div style={{ height: 16 }} />
        <p style={S.title}>EXECUTIVE STRATEGY REPORT</p>
        <p style={S.sub}>MEASURABLY BETTER: REGIONAL TECHNOLOGY</p>
        <p style={S.sub}>PROVIDER FOR THE DEEP SOUTH</p>
        <div style={{ height: 16 }} />
        <div style={{ borderTop: `1px solid #ccc`, margin: '12px 0 8px' }} />
        <p style={S.center}>Prepared for: Tracy Pierson, Amy Pierson, JP</p>
        <p style={S.center}>Prepared by: Chase Pierson, Managing Partner</p>
        <p style={S.center}>Date: March 26, 2026</p>
        <div style={{ borderTop: `1px solid #ccc`, margin: '12px 0 8px' }} />
        <p style={{ ...S.center, marginTop: 16 }}>INTERNAL -- NOT FOR DISTRIBUTION</p>

        <p style={S.section}>I.  PURPOSE</p>
        <div style={S.hr} />
        <p style={S.body}>This memorandum outlines the expanded strategic direction for Measurably Better, the product brand of Hillbilly Dreams, Inc. The proposal: reposition from a software company to a regional technology and media provider serving four markets across the Deep South.</p>
        <p style={S.body}>The core platform does not change. The packaging, pricing, and sales channels expand.</p>
        <p style={{ ...S.body, textAlign: 'center', fontWeight: 700, margin: '16px 0' }}>&quot;The South has the culture. We are building the infrastructure to match.&quot;</p>

        <p style={S.section}>II.  BRAND STRUCTURE</p>
        <div style={S.hr} />
        <p style={S.h3}>LEVEL 1: HILLBILLY DREAMS, INC.</p>
        <p style={S.indent}>--  Holding company. Owns all IP, platform, equity.</p>
        <p style={S.indent}>--  Not customer-facing. Investors, partners, legal.</p>
        <p style={S.h3}>LEVEL 2: MEASURABLY BETTER (Product Brand)</p>
        <p style={S.indent}>--  What we sell. Four markets: SMB, Civic, Education, Tourism.</p>
        <p style={S.indent}>--  Products: Deep South Directory, CivicX, MB Learn, KioskMode</p>
        <p style={S.indent}>--  Domains: measurablybetterthings.com, measurablybetter.life</p>
        <p style={S.h3}>LEVEL 3: BIG MUDDY (Media &amp; Hospitality)</p>
        <p style={S.indent}>--  Entertainment (JP, Division Head): Records, Radio, Touring, Rise Up</p>
        <p style={S.indent}>--  Publishing (Chase, interim): Magazine, Books</p>
        <p style={S.indent}>--  Hospitality (Tracy, Division Head): The Inn, Weddings &amp; Events</p>
        <p style={S.indent}>--  Amy Pierson: ON-NETWORK TALENT. Lead vocalist, Rise Up.</p>
        <p style={S.h3}>LEVEL 4: OUTSIDER ECONOMICS</p>
        <p style={S.indent}>--  Thought leadership. The book. The philosophy.</p>

        <p style={S.section}>III.  DEEP SOUTH DIRECTORY</p>
        <div style={S.hr} />
        <p style={S.body}>The distribution vehicle. A business owner does not sign up for &quot;Measurably Better.&quot; They join the Deep South Directory. The listing comes with the dashboard.</p>
        <p style={S.h3}>THE FLOW</p>
        <p style={S.indent}>1. Free listing (public profile, 100 AI queries, competitive snapshot)</p>
        <p style={S.indent}>2. Upgrade to $20/mo (connects QuickBooks, daily briefings, unlimited AI)</p>
        <p style={S.indent}>3. Upgrade to $99/mo (all sources, marketing automation, 3 seats)</p>
        <p style={S.h3}>THREE GTM CHANNELS (NO AD SPEND)</p>
        <p style={S.indent}>1. Municipality sponsors businesses (ARPA/CDBG funded)</p>
        <p style={S.indent}>2. Boots on the ground (&quot;I run the hotel down the street&quot;)</p>
        <p style={S.indent}>3. CVB / Chamber as distributor (directory + dashboard bundled)</p>

        <p style={S.section}>IV.  PRICING</p>
        <div style={S.hr} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: font, margin: '12px 0' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${rule}`, borderTop: `2px solid ${rule}` }}>
              {['TIER', 'PRICE', 'WHAT THEY GET'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 700, fontSize: 10 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              ['Free', '$0', 'Google Business analysis, 100 AI queries, directory listing'],
              ['Starter', '$20/mo', '7-day trial. 1 data source. Unlimited AI. Daily briefing.'],
              ['Engine', '$99/mo', 'All sources. Marketing automation. Alerts. 3 seats.'],
              ['Operator', '$499/mo', '10 seats. Dedicated AI agent. Forecasting. Phone support.'],
              ['Institutional', 'Custom', 'Cities, schools, CVBs. Grant-funded. $9,600-50K/yr.'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                {row.map((cell, j) => <td key={j} style={{ padding: '5px 8px', fontSize: 11 }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>

        <p style={S.section}>V.  FUNDING OPPORTUNITY</p>
        <div style={S.hr} />
        <p style={S.body}>Research confirmed (Perplexity Deep Research, March 25, 2026):</p>
        <p style={S.h3}>ARPA (AMERICAN RESCUE PLAN ACT)</p>
        <p style={S.indent}>--  Mississippi: approximately $826 million unspent</p>
        <p style={S.indent}>--  Hard deadline: December 31, 2026 (9 months)</p>
        <p style={S.indent}>--  Eligible: cybersecurity, IT modernization, digital inclusion</p>
        <p style={S.h3}>E-RATE (FCC SCHOOLS AND LIBRARIES)</p>
        <p style={S.indent}>--  Mississippi: $33.3 million in FY2026 requests</p>
        <p style={S.indent}>--  New 5-year Category 2 cycle opens FY2026</p>
        <p style={S.h3}>TITLE IV-A</p>
        <p style={S.indent}>--  $17.4 million/year allocated to Mississippi for K-12 technology</p>

        <p style={S.section}>VI.  COMPETITIVE LANDSCAPE</p>
        <div style={S.hr} />
        <p style={S.body}>No regional provider serves all four segments in the Deep South. Verified.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: font, margin: '12px 0' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${rule}`, borderTop: `2px solid ${rule}` }}>
              {['COMPETITOR', 'SEGMENT', 'MIN. CONTRACT', 'COVERAGE'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 700, fontSize: 10 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              ['Tyler Tech', 'Civic/Gov', '$25-75K/yr', 'National'],
              ['CivicPlus', 'Websites/311', '$6-8K/yr', 'National'],
              ['OpenGov', 'Permitting', '$30-60K/yr', 'National'],
              ['CentralSquare', 'Public Safety', '$40-100K/yr', 'National'],
              ['Local Agencies', 'Tourism', '$50-200K/yr', 'Per-project'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                {row.map((cell, j) => <td key={j} style={{ padding: '5px 8px' }}>{cell}</td>)}
              </tr>
            ))}
            <tr style={{ borderBottom: `2px solid ${rule}`, fontWeight: 700 }}>
              {['MEASURABLY BETTER', 'ALL FOUR', '$0-50K/yr', 'REGIONAL'].map((cell, j) => <td key={j} style={{ padding: '5px 8px' }}>{cell}</td>)}
            </tr>
          </tbody>
        </table>

        <p style={S.section}>VII.  S2PX STATUS UPDATE</p>
        <div style={S.hr} />
        <p style={S.body}>The initial S2PX licensing target (Scan2Plan LLC) declined the proposal on March 25, 2026. The deal is off.</p>
        <p style={S.indent}>--  No IP, equity, or licensing obligations exist.</p>
        <p style={S.indent}>--  GitHub access revoked. All repositories private.</p>
        <p style={S.indent}>--  Platform and demo collateral reusable for next AEC prospect.</p>
        <p style={S.indent}>--  First revenue target shifts to: Deep South Directory, civic pilot, entertainment revenue.</p>
        <p style={S.indent}>--  The regional technology provider strategy was never dependent on a single scanning company.</p>

        <p style={S.section}>VIII.  THE NATCHEZ PROOF</p>
        <div style={S.hr} />
        <p style={S.body}>Not theoretical. Functioning.</p>
        {[
          ['The Big Muddy Inn', 'Live', 'Bookable'],
          ['Big Muddy Magazine', 'Live', 'Readable'],
          ['Big Muddy Radio', 'Live', 'Listenable'],
          ['Big Muddy Touring', 'Live', '18-city corridor'],
          ['Big Muddy Records', 'Live', 'Artists signed'],
          ['Rise Up', 'Live', 'Performing'],
          ['Deep South Directory', 'Building', 'DeepSouthDirectory.com'],
          ['CivicX (Natchez)', 'Pilot', 'ARPA target'],
          ['MB Learn', 'Designed', 'Seeking funding'],
        ].map(([what, status, note]) => (
          <p key={what} style={S.indent}>--  {what} [{status}] {note}</p>
        ))}

        <p style={S.section}>IX.  REVENUE PROJECTION</p>
        <div style={S.hr} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: font, margin: '12px 0' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${rule}`, borderTop: `2px solid ${rule}` }}>
              {['SEGMENT', 'YEAR 1', 'YEAR 2', 'YEAR 3'].map(h => <th key={h} style={{ textAlign: h === 'SEGMENT' ? 'left' : 'right', padding: '6px 8px', fontWeight: 700, fontSize: 11 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              ['SMB (5 clients)', '$300,000', '$450,000', '$600,000'],
              ['Civic (3 cities)', '$100,000', '$250,000', '$500,000'],
              ['Education (5 dist.)', '$75,000', '$200,000', '$400,000'],
              ['Tourism/Media', '$50,000', '$150,000', '$300,000'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                {row.map((cell, j) => <td key={j} style={{ padding: '5px 8px', textAlign: j === 0 ? 'left' : 'right' }}>{cell}</td>)}
              </tr>
            ))}
            <tr style={{ borderTop: `2px solid ${rule}`, borderBottom: `2px solid ${rule}` }}>
              {['TOTAL', '$525,000', '$1,050,000', '$1,800,000'].map((cell, j) => <td key={j} style={{ padding: '5px 8px', fontWeight: 700, textAlign: j === 0 ? 'left' : 'right' }}>{cell}</td>)}
            </tr>
          </tbody>
        </table>

        <p style={S.section}>X.  REQUIREMENTS FOR EXECUTION</p>
        <div style={S.hr} />
        <p style={S.h3}>1.  INSURANCE</p>
        <p style={S.indent}>Bind $2M GL + $1M cyber. Nothing moves with government until a COI exists.</p>
        <p style={S.h3}>2.  ONE CIVIC PILOT</p>
        <p style={S.indent}>City of Natchez. Permitting dashboard + tourism analytics. ARPA-funded.</p>
        <p style={S.h3}>3.  ONE EDUCATION PILOT</p>
        <p style={S.indent}>Natchez-Adams School District. Facilities + compliance. E-Rate or Title IV-A.</p>
        <p style={S.h3}>4.  GRANT WRITER</p>
        <p style={S.indent}>Retainer relationship. ARPA, USDA, E-Rate applications. One vendor stack slot.</p>
        <p style={S.h3}>5.  DEEP SOUTH DIRECTORY LAUNCH</p>
        <p style={S.indent}>The distribution vehicle. Free listings, $20 upgrade path. Boots on the ground in Natchez.</p>
        <p style={S.h3}>6.  PRODUCT PAGES AND COLLATERAL</p>
        <p style={S.indent}>Complete. Live at measurablybetter.life.</p>

        <p style={S.section}>XI.  STRATEGIC POSITIONING</p>
        <div style={S.hr} />
        <p style={S.body}><strong>Before:</strong>  &quot;We sell software to contractors.&quot;</p>
        <p style={S.body}><strong>After:</strong>  &quot;We are the regional technology provider for the Deep South. Here is a business directory, a city, a school district, and a tourism bureau -- all running on the same engine.&quot;</p>
        <p style={S.body}>The ARPA deadline creates a 9-month window where municipalities are actively looking to deploy technology dollars or lose them. We are positioned to capture that demand with a live proof of concept operating in the same town where the first civic pilot would deploy.</p>
        <p style={{ ...S.center, margin: '24px 0', fontWeight: 700 }}>&quot;The South has the culture. We are building the infrastructure to match.&quot;</p>

        <div style={{ ...S.dhr, marginTop: 48 }} />
        <p style={S.center}>END OF MEMORANDUM</p>
        <div style={S.dhr} />
        <p style={{ fontSize: 10, color: muted, textAlign: 'center', marginTop: 24 }}>Hillbilly Dreams, Inc. -- Natchez, Mississippi</p>
      </div>
    </div>
  );
}

export default function StrategyPage() {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;
  return <Report />;
}
