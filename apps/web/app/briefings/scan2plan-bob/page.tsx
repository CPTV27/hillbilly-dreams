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
        <h1 style={S.h1}>Scan2Plan Briefing</h1>
        <p style={S.subtitle}>March 30, 2026 &middot; Confidential &middot; Prepared for Bob Bedard</p>

        {/* ---- WHAT I'VE BEEN DOING ---- */}
        <h2 style={S.h2}>What I&rsquo;ve Been Doing</h2>
        <p style={S.p}>
          I moved to Natchez, Mississippi and built a technology company called Hillbilly Dreams Inc.
          We run 15 live websites from one codebase &mdash; a hotel, music venue, magazine, radio station,
          art gallery, business directory, and a SaaS product called Measurably Better Things that helps
          Main Street businesses show up online.
        </p>
        <p style={S.p}>
          Think of it as a full media-and-hospitality ecosystem powered by AI, all from one platform.
        </p>
        <div style={S.callout}>
          The relevant part for this conversation: the platform I built is a general-purpose business engine.
          It can run different kinds of businesses from the same infrastructure. Scan2Plan was supposed to be one of them.
        </div>

        {/* ---- WHAT OWEN ASKED ME TO BUILD ---- */}
        <h2 style={S.h2}>What Owen Asked Me to Build</h2>
        <p style={S.p}>
          Owen hired me to build software for the scanning business. I hired Elijah Tuttle as the developer,
          and over 2024&ndash;2025 we built a complete business management platform called S2PX.
          Owen funded the development. He pays me, I pay Elijah.
        </p>
        <p style={S.p}>
          This isn&rsquo;t a half-finished prototype. It&rsquo;s production software:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>Sales pipeline with lead management</li>
          <li style={S.li}>135-field scoping form with multi-building geocoding</li>
          <li style={S.li}>Configure-Price-Quote engine (261 passing tests)</li>
          <li style={S.li}>Proposal builder with PDF generation and e-signature</li>
          <li style={S.li}>Full production pipeline &mdash; scan intake through delivery</li>
          <li style={S.li}>Mobile portal for scan techs in the field</li>
          <li style={S.li}>Real-time QuickBooks integration</li>
          <li style={S.li}>Cloud storage with a 4-bucket architecture</li>
          <li style={S.li}>7 AI agents: pricing, operations, photo analysis, checklists, audio-to-scoping, knowledge base, strategy advisor</li>
          <li style={S.li}>AI video scoping &mdash; customer walks a space with their phone, AI extracts scope and generates a quote in minutes</li>
          <li style={S.li}>CEO scorecard with financial dashboards</li>
        </ul>

        <h3 style={S.h3}>Owen&rsquo;s 2025 Numbers</h3>
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
          Revoked all GitHub collaborator access the same day.
        </p>
        <div style={S.callout}>
          In hindsight, I pitched it like a technologist &mdash; led with AI architecture and philosophy instead
          of P&amp;L impact. Price was too high for a first conversation, and he saw vendor lock-in with no exit path.
        </div>

        {/* ---- THE NEW DEAL ---- */}
        <h2 style={S.h2}>The New Deal (Drafted, Not Sent)</h2>
        <p style={S.p}>I restructured everything. Simpler, cheaper, modular.</p>

        <h3 style={S.h3}>Core Ops &mdash; $2,000/mo</h3>
        <p style={S.p}>
          Real-time QuickBooks dashboard, project tracking, capacity forecasting, unified view of
          Scan2Plan + Twinner. Replaces a part-time office manager.
        </p>

        <h3 style={S.h3}>Growth Engine &mdash; $1,000/mo</h3>
        <p style={S.p}>
          Automated outreach sequences, case study generation from project data, attribution tracking,
          local SEO. Replaces a marketing agency.
        </p>

        <h3 style={S.h3}>AI Scoping &mdash; $100/project, 50/50 split</h3>
        <p style={S.p}>
          Customer shoots a phone walkthrough instead of a $500 manual site visit. $100 tech fee on
          the customer&rsquo;s invoice. Owen keeps $50, I keep $50. At 858 estimates/year, that&rsquo;s
          $42,900 each side. Customer saves ~$400.
        </p>

        <h3 style={S.h3}>Performance Share</h3>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Category</th>
              <th style={S.th}>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={S.td}>Existing customers</td><td style={S.td}>0%</td></tr>
            <tr><td style={S.td}>New business from Growth Engine</td><td style={S.td}>5%</td></tr>
            <tr><td style={S.td}>Provable margin recovery</td><td style={S.td}>5%</td></tr>
          </tbody>
        </table>
        <p style={S.p}>Quarterly calculation. Disputed amounts default to zero.</p>

        <h3 style={S.h3}>Ramp &amp; Exit</h3>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Month</th>
              <th style={S.th}>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={S.td}>Month 1</td><td style={S.td}>$0 (integration)</td></tr>
            <tr><td style={S.td}>Month 2</td><td style={S.td}>$1,500 (half rate)</td></tr>
            <tr><td style={S.td}>Months 3&ndash;12</td><td style={S.td}>$3,000/mo</td></tr>
          </tbody>
        </table>
        <p style={S.p}>
          Year 1 guaranteed base: <strong style={S.strong}>$31,500</strong> plus per-project AI scoping revenue.
        </p>
        <p style={S.p}>
          Exit: 30-day notice after 12 months. Owen keeps his data, I keep my code. No penalty.
        </p>

        {/* ---- ELIJAH ---- */}
        <h2 style={S.h2}>The Elijah Piece</h2>
        <p style={S.p}>
          Elijah is my developer &mdash; he built the CPQ engine under my direction. He also runs his own
          businesses (Studio C for video production, Tuthill Design for photography). I&rsquo;m onboarding
          those as separate clients on my broader platform. That&rsquo;s a different deal entirely from Scan2Plan.
        </p>

        {/* ---- WHERE IT STANDS ---- */}
        <h2 style={S.h2}>Where It Stands</h2>
        <ul style={S.ul}>
          <li style={S.li}>Deal is dead as of March 25.</li>
          <li style={S.li}>New terms are drafted but I haven&rsquo;t sent them.</li>
          <li style={S.li}>The S2PX source code is mine (private repo, never transferred).</li>
          <li style={S.li}>I&rsquo;m also repositioning S2PX as a product for the AEC industry generally &mdash; Owen doesn&rsquo;t have to be the only client.</li>
        </ul>
        <div style={S.callout}>
          I&rsquo;d like your read on the situation before I make a next move.
        </div>

        {/* ---- THE ECOSYSTEM ---- */}
        <h2 style={S.h2}>The Ecosystem &mdash; See It Live</h2>
        <p style={S.p}>
          Everything below runs from one codebase on one platform. This is the infrastructure I built
          in Natchez. The Scan2Plan software is one application of this same engine &mdash; the architecture
          handles media, hospitality, commerce, directory listings, radio, publishing, and business
          operations all from the same stack.
        </p>

        <h3 style={S.h3}>Hospitality &amp; Touring</h3>
        <p style={S.p}>
          The Big Muddy Inn &mdash; a six-suite boutique hotel in Natchez with a music venue, bar, and
          events program. This is the anchor property.
        </p>
        <p style={S.p}>
          <a href="https://bigmuddytouring.com" target="_blank" rel="noopener" style={S.link}>bigmuddytouring.com</a>
        </p>

        <h3 style={S.h3}>Media</h3>
        <p style={S.p}>
          Three media brands running from the same publishing and broadcast infrastructure:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>
            <a href="https://bigmuddymagazine.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Magazine</a> &mdash; editorial content, Natchez and the corridor
          </li>
          <li style={S.li}>
            <a href="https://bigmuddyradio.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Radio</a> &mdash; 18-show internet radio station, fully automated with OpenBroadcaster
          </li>
          <li style={S.li}>
            <a href="https://bigmuddyentertainment.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Entertainment</a> &mdash; records, talent, and live programming
          </li>
          <li style={S.li}>
            <a href="https://bigmuddyrecord.com" target="_blank" rel="noopener" style={S.link}>Big Muddy Records</a> &mdash; the label
          </li>
        </ul>

        <h3 style={S.h3}>Commerce &amp; Directory</h3>
        <ul style={S.ul}>
          <li style={S.li}>
            <a href="https://deepsouthdirectory.com" target="_blank" rel="noopener" style={S.link}>Deep South Directory</a> &mdash; local business listings with AI-powered profiles
          </li>
          <li style={S.li}>
            <a href="https://buycurious.art" target="_blank" rel="noopener" style={S.link}>Buy Curious Art</a> &mdash; gallery and storefront
          </li>
        </ul>

        <h3 style={S.h3}>The SaaS Product</h3>
        <p style={S.p}>
          Measurably Better Things &mdash; the product we sell to small businesses. AI-powered
          online presence management. Directory listings, social media publishing, review management,
          local SEO. Replaces $500&ndash;800/month in scattered tools for $20&ndash;99/month.
        </p>
        <p style={S.p}>
          <a href="https://measurablybetter.life" target="_blank" rel="noopener" style={S.link}>measurablybetter.life</a>
        </p>

        <h3 style={S.h3}>Philosophy</h3>
        <p style={S.p}>
          Outsider Economics &mdash; the intellectual framework behind all of this. Why local economies
          work, how to organize them, and why the gap isn&rsquo;t technology but organization.
        </p>
        <p style={S.p}>
          <a href="https://outsidereconomics.com" target="_blank" rel="noopener" style={S.link}>outsidereconomics.com</a>
        </p>

        <h3 style={S.h3}>Client Tenants (Multi-Tenant Proof)</h3>
        <p style={S.p}>
          These are external clients running on the same platform &mdash; separate brands, separate
          domains, shared infrastructure. This is the same multi-tenant model that would serve
          Scan2Plan and other AEC companies.
        </p>
        <ul style={S.ul}>
          <li style={S.li}>
            <a href="https://tuthilldesign.com" target="_blank" rel="noopener" style={S.link}>Tuthill Design</a> &mdash; real estate photography (Woodstock, NY)
          </li>
        </ul>

        <h3 style={S.h3}>The Scan2Plan Demo</h3>
        <p style={S.p}>
          This is the interactive product demo I built for Owen &mdash; the full S2PX proposal
          presentation with all the modules, pricing, and capabilities. Password-gated.
        </p>
        <p style={S.p}>
          <a href="https://hillbillydreamsinc.com/demo/scan2plan" target="_blank" rel="noopener" style={S.link}>hillbillydreamsinc.com/demo/scan2plan</a>
          <br />
          <span style={{ fontSize: 13, color: '#5f6368' }}>Password: scan2plan</span>
        </p>

        <h3 style={S.h3}>The Holding Company</h3>
        <p style={S.p}>
          <a href="https://hillbillydreamsinc.com" target="_blank" rel="noopener" style={S.link}>hillbillydreamsinc.com</a> &mdash; Hillbilly Dreams Inc, the parent entity
        </p>

        <div style={S.footer}>
          Hillbilly Dreams Inc &middot; Confidential
        </div>
      </div>
    </PasswordGate>
  );
}
