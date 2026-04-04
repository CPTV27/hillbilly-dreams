'use client';

import PasswordGate from './PasswordGate';

const S = {
  page: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '48px 24px 80px',
    lineHeight: 1.7,
    fontSize: 15,
    color: '#202124',
  } as const,
  h1: {
    fontSize: 28,
    fontWeight: 700,
    margin: '0 0 4px',
    color: '#202124',
    letterSpacing: '-0.5px',
  } as const,
  subtitle: {
    fontSize: 14,
    color: '#5f6368',
    margin: '0 0 40px',
  } as const,
  h2: {
    fontSize: 18,
    fontWeight: 700,
    margin: '48px 0 16px',
    color: '#202124',
    borderBottom: '2px solid #e8eaed',
    paddingBottom: 8,
  } as const,
  h3: {
    fontSize: 15,
    fontWeight: 700,
    margin: '24px 0 8px',
    color: '#202124',
  } as const,
  p: {
    margin: '0 0 16px',
    color: '#3c4043',
  } as const,
  ul: {
    margin: '0 0 16px',
    paddingLeft: 20,
    color: '#3c4043',
  } as const,
  li: {
    marginBottom: 6,
  } as const,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    margin: '16px 0 24px',
    fontSize: 14,
  },
  th: {
    textAlign: 'left' as const,
    padding: '10px 12px',
    borderBottom: '2px solid #e8eaed',
    color: '#5f6368',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  td: {
    padding: '10px 12px',
    borderBottom: '1px solid #f1f3f4',
    color: '#3c4043',
  },
  callout: {
    background: '#f8f9fa',
    borderLeft: '3px solid #1a73e8',
    padding: '16px 20px',
    margin: '16px 0 24px',
    borderRadius: '0 4px 4px 0',
    fontSize: 14,
    color: '#3c4043',
  } as const,
  calloutWarn: {
    background: '#fef7e0',
    borderLeft: '3px solid #f9ab00',
    padding: '16px 20px',
    margin: '16px 0 24px',
    borderRadius: '0 4px 4px 0',
    fontSize: 14,
    color: '#3c4043',
  } as const,
  strong: {
    color: '#202124',
    fontWeight: 600,
  } as const,
  link: {
    color: '#1a73e8',
    textDecoration: 'none',
    fontWeight: 500,
  } as const,
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: '1px solid #e8eaed',
    fontSize: 12,
    color: '#9aa0a6',
    textAlign: 'center' as const,
  },
};

export default function BobBriefingPage() {
  return (
    <PasswordGate>
      <div style={S.page}>
        <h1 style={S.h1}>Situation Briefing</h1>
        <p style={S.subtitle}>March 31, 2026 &middot; Confidential &middot; Prepared for Bob Bedard</p>

        {/* ---- SUMMARY ---- */}
        <div style={S.callout}>
          <strong style={S.strong}>Summary:</strong> The Scan2Plan partnership with Owen Bush dissolved on March 25, 2026.
          Owen rejected a technology licensing deal and revoked all collaborator access the same day.
          I own the source code. The S2PX software is mine &mdash; private repo, never transferred.
          I&rsquo;m calling you because you&rsquo;re an advisor, a 1% holder in Scan2Plan Inc, and I trust your judgment on what happens next.
        </div>

        {/* ---- WHAT I BUILT FOR OWEN ---- */}
        <h2 style={S.h2}>What I Built for Owen</h2>
        <p style={S.p}>
          Owen hired me to build software for the scanning business. I hired Elijah Tuttle as the developer,
          and over 2024&ndash;2025 we built a complete business management platform called S2PX.
          Owen funded the development. He paid me, I paid Elijah.
        </p>
        <p style={S.p}>
          This is production software &mdash; not a prototype:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>Sales pipeline with lead management</li>
          <li style={S.li}>135-field scoping form with multi-building geocoding</li>
          <li style={S.li}>Configure-Price-Quote engine (261 passing tests)</li>
          <li style={S.li}>Proposal builder with PDF generation and e-signature</li>
          <li style={S.li}>Full production pipeline &mdash; scan intake through delivery</li>
          <li style={S.li}>Mobile portal for scan techs in the field</li>
          <li style={S.li}>Real-time QuickBooks integration</li>
          <li style={S.li}>7 AI agents for pricing, operations, photo analysis, and more</li>
          <li style={S.li}>AI video scoping &mdash; customer walks a space with their phone, AI generates a quote in minutes</li>
        </ul>

        <h3 style={S.h3}>Owen&rsquo;s 2025 Numbers (as reported)</h3>
        <table style={S.table}>
          <tbody>
            <tr><td style={S.td}><strong style={S.strong}>Revenue</strong></td><td style={S.td}>$1,115,449</td></tr>
            <tr><td style={S.td}><strong style={S.strong}>Projects</strong></td><td style={S.td}>1,888</td></tr>
            <tr><td style={S.td}><strong style={S.strong}>Estimates processed</strong></td><td style={S.td}>858</td></tr>
            <tr><td style={S.td}><strong style={S.strong}>Net income</strong></td><td style={S.td}>$261,000 (82% margin)</td></tr>
            <tr><td style={S.td}><strong style={S.strong}>Outside services + contractors</strong></td><td style={S.td}>$357,750/year (the automation target)</td></tr>
          </tbody>
        </table>

        {/* ---- WHAT HAPPENED ---- */}
        <h2 style={S.h2}>What Happened</h2>
        <p style={S.p}>
          <strong style={S.strong}>March 23:</strong> I pitched Owen a technology licensing deal to keep running
          and improving the platform. Core platform at $5K/mo plus a growth module at $1&ndash;10K/mo.
          Total ask: $6&ndash;15K/month.
        </p>
        <p style={S.p}>
          <strong style={S.strong}>March 25:</strong> Owen said no. &ldquo;No can do. Sell it to someone else.&rdquo;
          Revoked all GitHub collaborator access the same day. Partnership dissolved.
        </p>
        <div style={S.calloutWarn}>
          <strong style={S.strong}>My mistake:</strong> I pitched it like a technologist &mdash; led with AI architecture
          and philosophy instead of P&amp;L impact. The price was too high for a first conversation, and Owen
          saw vendor lock-in with no exit path. I should have started smaller.
        </div>

        {/* ---- LEGAL STATUS ---- */}
        <h2 style={S.h2}>Legal Status</h2>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Item</th>
              <th style={S.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={S.td}>Scan2Plan Inc (Delaware C-Corp)</td><td style={S.td}>Partnership dissolved 03/25/2026</td></tr>
            <tr><td style={S.td}>V. Owen Bush</td><td style={S.td}>Was CEO. Deal terminated.</td></tr>
            <tr><td style={S.td}>Bob Bedard</td><td style={S.td}>1% holder, advisor. Building owner.</td></tr>
            <tr><td style={S.td}>S2PX source code</td><td style={S.td}>Chase&rsquo;s private repo. Never transferred to Owen.</td></tr>
            <tr><td style={S.td}>S2PX data</td><td style={S.td}>Owen&rsquo;s business data is his. Code and platform are mine.</td></tr>
          </tbody>
        </table>

        {/* ---- OPTIONS ---- */}
        <h2 style={S.h2}>Options as I See Them</h2>

        <h3 style={S.h3}>Option A: Re-approach Owen with a smaller deal</h3>
        <p style={S.p}>
          A restructured offer was drafted but never sent. Core ops at $2,000/mo, growth engine at $1,000/mo,
          plus per-project AI scoping at $100/project (50/50 split). Year 1 base: ~$31,500 plus project revenue.
          Month 1 free. 30-day exit after 12 months. No lock-in.
        </p>

        <h3 style={S.h3}>Option B: Reposition S2PX for the broader AEC market</h3>
        <p style={S.p}>
          The platform is general-purpose &mdash; it handles quoting, scoping, project management, and
          AI-assisted estimating for any AEC scanning business. Owen doesn&rsquo;t have to be the only client.
          The 4.3 GB codebase is archived and ready to deploy independently.
        </p>

        <h3 style={S.h3}>Option C: Walk away</h3>
        <p style={S.p}>
          Focus entirely on Hillbilly Dreams and the Natchez operation, which is generating revenue now.
          Let S2PX sit until there&rsquo;s a clear buyer or licensee.
        </p>

        <div style={S.callout}>
          I&rsquo;d like your read on these options before I make a next move.
        </div>

        {/* ---- WHAT I'M DOING NOW ---- */}
        <h2 style={S.h2}>What I&rsquo;m Doing Now</h2>
        <p style={S.p}>
          Meanwhile, I moved to Natchez, Mississippi and built a technology company called Hillbilly Dreams Inc.
          This is a media-and-hospitality ecosystem &mdash; a hotel, music venue, magazine, radio station,
          business directory, and art gallery, all running from one codebase on one platform.
        </p>
        <p style={S.p}>
          The immediate revenue engine is the <strong style={S.strong}>Deep South Directory</strong> &mdash;
          a business listing service for Main Street businesses in the Mississippi corridor.
          I&rsquo;m doing walk-in sales starting April 1, pitching $20&ndash;$99/month subscriptions.
          The media brands (magazine, radio, entertainment) make the directory pitch credible
          because I can offer editorial coverage, radio features, and event tie-ins that no
          generic SaaS tool can match.
        </p>

        <h3 style={S.h3}>The Ecosystem</h3>
        <ul style={S.ul}>
          <li style={S.li}>
            <a href="https://bigmuddytouring.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Touring</a> &mdash; boutique hotel + music venue in Natchez (The Big Muddy Inn)
          </li>
          <li style={S.li}>
            <a href="https://bigmuddymagazine.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Magazine</a> &mdash; editorial about the Mississippi corridor
          </li>
          <li style={S.li}>
            <a href="https://bigmuddyradio.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Radio</a> &mdash; 18-show internet radio station
          </li>
          <li style={S.li}>
            <a href="https://bigmuddyentertainment.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Entertainment</a> &mdash; shows, talent, live programming
          </li>
          <li style={S.li}>
            <a href="https://deepsouthdirectory.com" target="_blank" rel="noopener" style={S.link}>Deep South Directory</a> &mdash; the SaaS product, walk-in sales launching now
          </li>
          <li style={S.li}>
            <a href="https://bearsvillemediagroup.com" target="_blank" rel="noopener" style={S.link}>Bearsville Creative</a> &mdash; same model, Woodstock/Hudson Valley (summer 2026)
          </li>
        </ul>

        <h3 style={S.h3}>Team</h3>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Person</th>
              <th style={S.th}>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={S.td}>Chase Pierson</td><td style={S.td}>CEO/CTO &mdash; tech, media, sales</td></tr>
            <tr><td style={S.td}>Tracy Alderson-Allen</td><td style={S.td}>Equity partner &mdash; finance, Inn ops, editorial</td></tr>
            <tr><td style={S.td}>Amy Allen</td><td style={S.td}>Equity partner &mdash; Inn &amp; bar operations, guest experience</td></tr>
            <tr><td style={S.td}>JP Houston</td><td style={S.td}>Shows &amp; live programming (deal in progress)</td></tr>
            <tr><td style={S.td}>Elijah Tuttle</td><td style={S.td}>Developer (built S2PX, runs Tuthill Design in Woodstock)</td></tr>
          </tbody>
        </table>

        <h3 style={S.h3}>Operating Entity</h3>
        <p style={S.p}>
          Currently operating as FarleyPierson LLC (Chase&rsquo;s single-member LLC, since 2016).
          Hillbilly Dreams Inc is the planned holding company but not yet formally incorporated.
          When formed, equity splits three ways: Chase, Tracy, and Amy as equal founding partners
          with an option pool for future hires and contributors.
        </p>

        {/* ---- WHAT I'M ASKING ---- */}
        <h2 style={S.h2}>What I&rsquo;m Asking</h2>
        <ul style={S.ul}>
          <li style={S.li}>Your read on the Owen situation &mdash; re-approach, reposition, or walk away?</li>
          <li style={S.li}>Your advice on the S2PX IP &mdash; is there a market for this outside of Owen&rsquo;s company?</li>
          <li style={S.li}>Any introductions you might make in the AEC space if Option B makes sense.</li>
          <li style={S.li}>General mentorship as I scale the Natchez operation &mdash; this is real revenue, real customers, starting this week.</li>
        </ul>

        <div style={S.footer}>
          Hillbilly Dreams Inc &middot; Confidential &middot; Prepared by Chase Pierson
        </div>
      </div>
    </PasswordGate>
  );
}
