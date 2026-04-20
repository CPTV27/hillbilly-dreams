// apps/web/app/story/page.tsx
// The single visual page that tells the whole MBT story end-to-end.
// Rewritten 2026-04-20 to match THE_THESIS.md + STORY_KIT.md canonical framing.
//
// Available at any-domain.com/story (middleware exempts /story from tenant rewriting).
//
// Source docs (always pull from these, never invent framings):
//   docs/THE_THESIS.md        — mental model
//   docs/STORY_KIT.md         — canonical language in multiple lengths
//   docs/90_DAY_PLAN.md       — operational specifics

import Link from 'next/link';

export const metadata = {
  title: 'Measurably Better Things — The Story',
  description:
    'A shared technology and brand platform amplifying a portfolio of existing businesses — a Natchez inn, an editorial magazine, a touring/records/radio arm built around a working musician, a photography company, partner production studios — into one coherent Deep South media-and-hospitality ecosystem.',
};

export const dynamic = 'force-static';

export default function StoryPage() {
  return (
    <div className="story">
      {/* ───────── HERO ───────── */}
      <header className="hero">
        <p className="eyebrow">Measurably Better Things · Updated April 2026</p>
        <h1>
          A platform that amplifies<br />
          businesses we already run.
        </h1>
        <p className="lede">
          MBT is not a vertically-integrated startup chasing a unicorn exit. It's a shared
          technology and brand platform amplifying a portfolio of existing businesses — a
          Natchez inn, an editorial magazine, a working musician's touring career, a
          photography company, partner production studios — so three equity partners can run
          them with shared infrastructure and shared audiences, cost less, and live well.
        </p>
        <p className="lede-secondary">
          Three partners. Two regions. One shared spine. Break-even floor at $250k; real
          profit as the goal; quality of life as the ceiling.
        </p>
      </header>

      {/* ───────── 01 · THE THESIS ───────── */}
      <section>
        <p className="section-num">01</p>
        <h2>What this actually is</h2>
        <div className="thesis-grid">
          <div className="thesis-col is-yes">
            <p className="col-label">Yes</p>
            <ul>
              <li>Media-amplification of existing businesses</li>
              <li>Three equity partners, each bringing an existing portfolio</li>
              <li>Shared tech + brand infrastructure that lowers everyone's run-rate</li>
              <li>Ecosystem revenue pooled, redeployed across the portfolio</li>
              <li>Lifestyle-first — work that leaves room for the life the partners want</li>
              <li>Break-even as the floor; profit as the goal; quality of life as the ceiling</li>
            </ul>
          </div>
          <div className="thesis-col is-no">
            <p className="col-label">No</p>
            <ul>
              <li>Not a vertically-integrated startup</li>
              <li>Not chasing a SaaS multiple or a unicorn</li>
              <li>Not a fundraise — nobody is selling equity for cash</li>
              <li>Not acquiring partner businesses</li>
              <li>Not selling subscription tiers to small-town SMBs</li>
              <li>Not building for scale at the expense of the lifestyle</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── 02 · THE PARTNERS ───────── */}
      <section>
        <p className="section-num">02</p>
        <h2>Three partners, three existing portfolios</h2>
        <p className="section-lede">
          Each partner brings an existing business (or several) that the platform amplifies.
          Equity is one-third each across the Big Muddy holding. Nobody is a first-time
          founder; everyone has been running their piece of this for years.
        </p>
        <div className="partners">
          {PARTNERS.map((p) => (
            <div key={p.name} className="partner">
              <p className="partner-role">{p.role}</p>
              <h3>{p.name}</h3>
              <p className="partner-tag">{p.tag}</p>
              <ul>
                {p.portfolio.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 03 · THE PLATFORM ───────── */}
      <section>
        <p className="section-num">03</p>
        <h2>The platform underneath</h2>
        <p className="section-lede">
          MBT (the platform) is the shared operating layer. Its job is to make every
          business in the portfolio cost less to run than running it alone, pool revenue
          across the ecosystem, and automate the operational chores so the partners aren't
          stuck in day-to-day.
        </p>
        <div className="platform-grid">
          {PLATFORM_PIECES.map((piece) => (
            <div key={piece.name} className="platform-piece">
              <p className="piece-name">{piece.name}</p>
              <p className="piece-desc">{piece.desc}</p>
            </div>
          ))}
        </div>
        <p className="footnote">
          Not sold as a product to third parties. Not a SaaS tier. It's the operating layer
          of an ecosystem we run. External B2B engagements (Vicki Wolpert, future civic
          partners) get pieces of the platform deployed for their use as part of paid
          relationships, not as subscription customers.
        </p>
      </section>

      {/* ───────── 04 · HEMISPHERE ───────── */}
      <section>
        <p className="section-num">04</p>
        <h2>Two regions, counter-seasonal</h2>
        <p className="section-lede">
          The model is not "headquartered in Natchez, expanding to Bearsville." It's a
          sequential, rhythmic flow between two hemispheres. The team migrates with the
          calendar.
        </p>
        <div className="hemisphere">
          <div className="season season-north">
            <p className="season-label">May – October · Northern Hemisphere</p>
            <h3>Upstate NY</h3>
            <p className="season-focus">Photography + Studio C video peak season</p>
            <ul>
              <li>Chase Pierson Photography primary bookings</li>
              <li>Studio C Video client production work</li>
              <li>Bearsville Creative activation + Hudson Valley partner network</li>
              <li>Tracy BizDev expands photography market south for Q3 handoff</li>
            </ul>
          </div>
          <div className="season-arrow">↓ October transition ↓</div>
          <div className="season season-south">
            <p className="season-label">October – April · Southern Hemisphere</p>
            <h3>Natchez</h3>
            <p className="season-focus">Inn hospitality peak + Deep South photography + Blues Room programming</p>
            <ul>
              <li>Big Muddy Inn fall/winter peak (corridor tourism, weddings, retreats)</li>
              <li>Blues Room residency — Arrie Aslin + corridor touring acts</li>
              <li>Deep South photography commissions + stock + art prints</li>
              <li>Magazine editorial peak tied to the travel season</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── 05 · FINANCIAL SHAPE ───────── */}
      <section>
        <p className="section-num">05</p>
        <h2>The financial shape</h2>
        <p className="section-lede">
          Fiscal year starts May 1. Break-even is the minimum threshold of success — the
          ecosystem covers itself. Above that, we actively work to be profitable. The
          ceiling is quality of life: at the point where more profit requires sacrificing
          the life the partners are here to live, we stop pushing harder.
        </p>
        <div className="finance">
          <div className="finance-row finance-floor">
            <p className="finance-label">Break-even minimum</p>
            <p className="finance-value">$250k</p>
            <p className="finance-note">Ecosystem run-rate ≈ $296k after the planned ops hire. The floor is where the ecosystem covers itself on its own steam.</p>
          </div>
          <div className="finance-row finance-base">
            <p className="finance-label">Baseline target</p>
            <p className="finance-value">$330k</p>
            <p className="finance-note">The realistic Y1 number. Profit above break-even is real and goes back into growth + lifestyle + the next interesting project.</p>
          </div>
          <div className="finance-row finance-stretch">
            <p className="finance-label">Stretch (with art sales + stock activation)</p>
            <p className="finance-value">$390–395k</p>
            <p className="finance-note">Real upside if the photography art sales layer + the Mississippi stock footage pipeline both land.</p>
          </div>
          <div className="finance-row finance-growth">
            <p className="finance-label">Y5 target at 25% YoY</p>
            <p className="finance-value">$610k</p>
            <p className="finance-note">Modest, sustainable, no fundraise required. Y1 → Y2 $313k → Y3 $391k → Y4 $488k → Y5 $610k.</p>
          </div>
        </div>
        <blockquote className="chase-quote">
          "We do want to be profitable. Break-even is the minimum — that's a success of its own.
          But we do want to be profitable. We're just not going to sacrifice quality of life to
          make an extra million dollars."
          <cite>— Chase, April 2026</cite>
        </blockquote>
      </section>

      {/* ───────── 06 · PORTFOLIO ───────── */}
      <section>
        <p className="section-num">06</p>
        <h2>The portfolio</h2>
        <p className="section-lede">
          Every brand is an existing business being amplified, not a product we invented. Photography
          is the biggest Y1 revenue line by far — a six-year validated track record being re-activated
          after a platform-build pause.
        </p>
        <div className="portfolio">
          {PORTFOLIO.map((brand) => (
            <div key={brand.name} className={`brand brand-${brand.tier}`}>
              <p className="brand-tier">{brand.tierLabel}</p>
              <h3>{brand.name}</h3>
              <p className="brand-line">{brand.line}</p>
              <p className="brand-role"><strong>Its role in the ecosystem:</strong> {brand.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 07 · PARTNER STUDIOS ───────── */}
      <section>
        <p className="section-num">07</p>
        <h2>Partner studios — amplify, don&apos;t acquire</h2>
        <p className="section-lede">
          Studio C Video and Tuthill Design are existing production companies being amplified inside the
          ecosystem on similar terms to the Big Muddy brands. Not third-party SaaS customers. Not
          acquisition targets.
        </p>
        <div className="studios">
          <div className="studios-col">
            <h3>What MBT does for them</h3>
            <ol>
              <li><strong>New market expansion</strong> — Tracy's BizDev opens Natchez + Deep South for their work</li>
              <li><strong>New customers via Big Muddy</strong> — Inn, Magazine, Touring, weddings all need production</li>
              <li><strong>Platform resources</strong> — CMS, photo library, AI tooling, sales pipelines shared at zero marginal cost</li>
              <li><strong>MBT is a paying customer</strong> — ongoing video + design work invoiced like any client relationship</li>
              <li><strong>Tracy + Amy as extended team</strong> — the whole sales surface works for everybody</li>
            </ol>
          </div>
          <div className="studios-col">
            <h3>What they bring to the ecosystem</h3>
            <ol>
              <li>Existing NY-heavy client bases + years of relationships</li>
              <li>Production capacity Big Muddy couldn&apos;t economically build in-house</li>
              <li>Creative quality that amplifies every customer surface</li>
              <li>Partnership equity in the model, not vendor relationships</li>
              <li>Counter-seasonal balance matching the ecosystem&apos;s hemisphere rhythm</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── 08 · 90-DAY PLAN ───────── */}
      <section>
        <p className="section-num">08</p>
        <h2>What we&apos;re doing right now — the first 90 days (May–July 2026)</h2>
        <p className="section-lede">
          The first 90 days of FY 2026-27 focus on three concrete motions. Everything else happens
          because it&apos;s who we are, not because we&apos;re chasing its revenue.
        </p>
        <div className="motions">
          <div className="motion">
            <p className="motion-num">Motion 1</p>
            <h3>Photography re-activation</h3>
            <p>Chase back to shooting after a 6-month platform-build pause. Tracy re-engages past clients, builds NY pipeline, seeds Deep South prospects for Q3 handoff. Target: $100k Y1 services baseline.</p>
          </div>
          <div className="motion">
            <p className="motion-num">Motion 2</p>
            <h3>Wedding / retreat package</h3>
            <p>Whole-Inn buyout, 1–2 night, Blues Room event, preferred vendors, optional Studio C / CPP add-ons. Three events × ~$15k = $45k Y1. The single highest-leverage Big Muddy sale.</p>
          </div>
          <div className="motion">
            <p className="motion-num">Motion 3</p>
            <h3>First B2B Directory engagements</h3>
            <p>Vicki Wolpert (Woodstock broker) + Paul Green Realty (Natchez 5-agent pilot). ~$30k combined. Validates that the Directory module ships inside B2B engagements — not as a /mo SaaS product.</p>
          </div>
        </div>
        <p className="plan-link">
          Full 90-day plan: <Link href="https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/90_DAY_PLAN.md">docs/90_DAY_PLAN.md</Link>
        </p>
      </section>

      {/* ───────── 09 · NOT BUILDING ───────── */}
      <section>
        <p className="section-num">09</p>
        <h2>What we&apos;re not building this year</h2>
        <p className="section-lede">
          Focus compounds. Below is our explicit Y1 refusal list. If any tempting idea arises that
          sits on this list, we defer it.
        </p>
        <ul className="not-building">
          <li>Standalone Deep South Directory subscription product — it&apos;s a capability, not a SaaS</li>
          <li>Records-of-the-month subscription — margin is brutal, premature</li>
          <li>AI Inn concierge chatbot — dilutes the Mississippi-Martha-Stewart boutique brand</li>
          <li>Stripe Connect auto-payouts — manual works for Y1 volume</li>
          <li>Records / Radio as Y1 revenue lines — support Amy, not paying products yet</li>
          <li>Magazine sponsorship chasing — inbound only; don&apos;t burn Tracy&apos;s BizDev hours</li>
          <li>Touring as a Y1 revenue target — Amy still plays, just not a revenue line to hit</li>
          <li>A third region before Bearsville proves itself</li>
          <li>Per-tenant GCS buckets, PgBoss, magic-link auth, Jest tests — not load-bearing for Y1 revenue</li>
          <li>Fundraise, acquisition, SaaS-multiple framing of any part of the business</li>
        </ul>
      </section>

      {/* ───────── 10 · AI AGENTS ───────── */}
      <section>
        <p className="section-num">10</p>
        <h2>How it gets done — people + AI agents</h2>
        <p className="section-lede">
          The platform runs on a combination of the three partners, partner studios, a small roster
          of AI agents, and a planned $35k part-time Inn operations hire. Each agent has a defined
          scope and a quarterly output-based audit — ship or deprecate.
        </p>
        <div className="agents">
          {AGENTS.map((a) => (
            <div key={a.name} className={`ai-card ai-${a.status}`}>
              <p className="ai-head">
                <span className="ai-name">{a.name}</span>
                <span className="ai-status">{a.statusLabel}</span>
              </p>
              <p className="ai-scope">{a.scope}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="page-footer">
        <p><strong>Canonical source docs</strong></p>
        <ul className="doc-links">
          <li><Link href="https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/THE_THESIS.md">THE_THESIS.md</Link> — the mental model, wins over everything else</li>
          <li><Link href="https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/90_DAY_PLAN.md">90_DAY_PLAN.md</Link> — the operational playbook</li>
          <li><Link href="https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/STORY_KIT.md">STORY_KIT.md</Link> — canonical story in multiple lengths + forbidden framings</li>
          <li><Link href="https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/THE_THESIS_MINDMAP.md">THE_THESIS_MINDMAP.md</Link> — visual confirmation map</li>
        </ul>
        <p className="footer-contact">
          Questions: <a href="mailto:me@chasepierson.tv">me@chasepierson.tv</a>
        </p>
        <p className="footer-tag">
          Updated 2026-04-20 · Page source: <code>apps/web/app/story/page.tsx</code>
        </p>
      </footer>

      <style>{`
        :root {
          --bg: #0a0a08;
          --surface: #14110f;
          --surface-2: #1a1715;
          --border: #2a2723;
          --text: #d8cfbe;
          --text-dim: #a89e8d;
          --text-muted: #6b6254;
          --gold: #c8a676;
          --gold-dim: #8a6f4e;
          --green: #7fa86a;
          --amber: #d99850;
          --red: #c44;
        }
        .story {
          background: var(--bg);
          color: var(--text);
          font-family: Georgia, 'Times New Roman', serif;
          min-height: 100vh;
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 32px 96px;
          line-height: 1.6;
        }
        .story a {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .story a:hover { color: var(--text); }

        /* HERO */
        .hero {
          padding: 40px 0 64px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 64px;
        }
        .eyebrow {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 16px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        h1 {
          font-size: 64px;
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin: 0 0 28px;
          color: var(--text);
        }
        .lede {
          font-size: 20px;
          line-height: 1.55;
          color: var(--text);
          max-width: 780px;
          margin: 0 0 20px;
        }
        .lede-secondary {
          font-size: 17px;
          line-height: 1.55;
          color: var(--text-dim);
          max-width: 780px;
          margin: 0;
          font-style: italic;
        }

        /* SECTIONS */
        section {
          padding: 48px 0;
          border-bottom: 1px solid var(--border);
        }
        .section-num {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 12px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        h2 {
          font-size: 36px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 24px;
          color: var(--text);
        }
        h3 {
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0 0 10px;
          color: var(--text);
        }
        .section-lede {
          font-size: 17px;
          line-height: 1.55;
          color: var(--text-dim);
          max-width: 780px;
          margin: 0 0 32px;
        }
        p, li { color: var(--text-dim); }

        /* 01 · THESIS GRID */
        .thesis-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .thesis-col {
          padding: 24px;
          border-radius: 6px;
          background: var(--surface);
          border-left: 3px solid transparent;
        }
        .thesis-col.is-yes { border-left-color: var(--green); }
        .thesis-col.is-no { border-left-color: var(--red); opacity: 0.92; }
        .col-label {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin: 0 0 16px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        .is-yes .col-label { color: var(--green); }
        .is-no .col-label { color: var(--red); }
        .thesis-col ul {
          margin: 0;
          padding-left: 20px;
          font-size: 15px;
          line-height: 1.7;
        }

        /* 02 · PARTNERS */
        .partners {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .partner {
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
        }
        .partner-role {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 8px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        .partner-tag {
          font-size: 14px;
          color: var(--text-dim);
          font-style: italic;
          margin: 0 0 16px;
        }
        .partner ul {
          font-size: 14px;
          line-height: 1.55;
          padding-left: 18px;
          margin: 0;
        }

        /* 03 · PLATFORM GRID */
        .platform-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 0 0 24px;
        }
        .platform-piece {
          padding: 20px;
          background: var(--surface-2);
          border-radius: 4px;
        }
        .piece-name {
          font-family: -apple-system, system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 8px;
        }
        .piece-desc {
          font-size: 15px;
          line-height: 1.55;
          margin: 0;
        }
        .footnote {
          font-size: 14px;
          color: var(--text-muted);
          font-style: italic;
          margin: 24px 0 0;
        }

        /* 04 · HEMISPHERE */
        .hemisphere {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .season {
          padding: 28px;
          background: var(--surface);
          border-radius: 6px;
        }
        .season-north { border-left: 3px solid #4a6da8; }
        .season-south { border-left: 3px solid var(--gold); }
        .season-label {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 8px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        .season-focus {
          font-size: 15px;
          color: var(--text-dim);
          font-style: italic;
          margin: 0 0 16px;
        }
        .season ul {
          font-size: 15px;
          line-height: 1.6;
          padding-left: 20px;
          margin: 0;
        }
        .season-arrow {
          text-align: center;
          color: var(--gold);
          font-size: 14px;
          letter-spacing: 0.2em;
          font-family: -apple-system, system-ui, sans-serif;
          padding: 8px 0;
        }

        /* 05 · FINANCE */
        .finance {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0 0 32px;
        }
        .finance-row {
          display: grid;
          grid-template-columns: 220px 140px 1fr;
          gap: 24px;
          align-items: baseline;
          padding: 16px 20px;
          background: var(--surface);
          border-radius: 4px;
        }
        .finance-floor { border-left: 3px solid var(--amber); }
        .finance-base { border-left: 3px solid var(--green); }
        .finance-stretch { border-left: 3px solid var(--gold); }
        .finance-growth { border-left: 3px solid #4a6da8; }
        .finance-label {
          font-family: -apple-system, system-ui, sans-serif;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0;
        }
        .finance-value {
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .finance-note {
          font-size: 14px;
          line-height: 1.55;
          margin: 0;
        }
        .chase-quote {
          margin: 0;
          padding: 24px 32px;
          border-left: 3px solid var(--gold);
          background: var(--surface-2);
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 19px;
          line-height: 1.5;
          color: var(--text);
          border-radius: 0 4px 4px 0;
        }
        .chase-quote cite {
          display: block;
          margin-top: 12px;
          font-size: 13px;
          color: var(--text-muted);
          font-style: normal;
          letter-spacing: 0.1em;
        }

        /* 06 · PORTFOLIO */
        .portfolio {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .brand {
          padding: 20px;
          background: var(--surface);
          border-radius: 6px;
          border-left: 3px solid var(--gold-dim);
        }
        .brand-consumer { border-left-color: var(--gold); }
        .brand-production { border-left-color: var(--green); }
        .brand-platform { border-left-color: #4a6da8; }
        .brand-tier {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 8px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        .brand-line {
          font-size: 15px;
          line-height: 1.55;
          margin: 0 0 12px;
        }
        .brand-role {
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-muted);
          margin: 0;
        }

        /* 07 · PARTNER STUDIOS */
        .studios {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .studios-col {
          padding: 24px;
          background: var(--surface);
          border-radius: 6px;
        }
        .studios-col ol {
          padding-left: 20px;
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }
        .studios-col ol li { margin-bottom: 10px; }

        /* 08 · MOTIONS */
        .motions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 0 0 24px;
        }
        .motion {
          padding: 24px;
          background: var(--surface);
          border-top: 3px solid var(--gold);
          border-radius: 4px;
        }
        .motion-num {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 10px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        .motion p {
          font-size: 14px;
          line-height: 1.55;
          margin: 8px 0 0;
        }
        .plan-link {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0;
        }

        /* 09 · NOT BUILDING */
        .not-building {
          font-size: 15px;
          line-height: 1.7;
          columns: 2;
          column-gap: 32px;
          padding-left: 20px;
          margin: 0;
        }
        .not-building li {
          break-inside: avoid;
          margin-bottom: 8px;
        }

        /* 10 · AI AGENTS */
        .agents {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .ai-card {
          padding: 20px;
          background: var(--surface-2);
          border-radius: 4px;
          border-left: 3px solid transparent;
        }
        .ai-card.ai-live { border-left-color: var(--green); }
        .ai-card.ai-building { border-left-color: var(--amber); }
        .ai-card.ai-planned { border-left-color: var(--text-muted); opacity: 0.85; }
        .ai-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 8px;
        }
        .ai-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          font-family: Georgia, serif;
        }
        .ai-status {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 10px;
          font-family: -apple-system, system-ui, sans-serif;
        }
        .ai-live .ai-status { background: rgba(127, 168, 106, 0.15); color: var(--green); }
        .ai-building .ai-status { background: rgba(217, 152, 80, 0.15); color: var(--amber); }
        .ai-planned .ai-status { background: rgba(107, 98, 84, 0.2); color: var(--text-muted); }
        .ai-scope {
          font-size: 13px;
          line-height: 1.55;
          margin: 0;
        }

        /* FOOTER */
        .page-footer {
          padding: 48px 0 0;
          margin-top: 24px;
          border-top: 1px solid var(--border);
        }
        .doc-links {
          padding-left: 20px;
          font-size: 15px;
          line-height: 1.8;
          margin: 12px 0 24px;
        }
        .footer-contact, .footer-tag {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0 0 8px;
        }
        .footer-tag code {
          background: var(--surface);
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 12px;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .story { padding: 32px 20px 64px; }
          h1 { font-size: 40px; }
          h2 { font-size: 28px; }
          .lede { font-size: 17px; }
          .thesis-grid,
          .partners,
          .platform-grid,
          .portfolio,
          .studios,
          .motions,
          .agents { grid-template-columns: 1fr; }
          .finance-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }
          .finance-value { font-size: 24px; }
          .not-building { columns: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const PARTNERS = [
  {
    role: 'Chase Pierson',
    name: 'Business + media executive, photographer',
    tag: 'Portfolio: Chase Pierson Photography, Studio C Video (with Elijah Davis), platform operations',
    portfolio: [
      '6-year $100k+/yr photography track record being re-activated',
      'Studio C Video — production company expanding video services',
      '25-year broadcast career (Democracy Now, DCTV, Discovery, HBO, PBS)',
      'Operates the MBT platform — built it; doesn\'t equal it',
    ],
  },
  {
    role: 'Tracy Alderson-Allen',
    name: 'Finance + editorial + BizDev',
    tag: 'Portfolio: Big Muddy Inn, Big Muddy Magazine, BizDev for Chase Pierson Photography',
    portfolio: [
      'Co-owner and finance lead of the Big Muddy Inn',
      'Editor of Big Muddy Magazine — the "Mississippi Martha Stewart" voice',
      'Business development + sales for Chase Pierson Photography',
      'Month-end close, pro forma, pricing strategy across all brands',
    ],
  },
  {
    role: 'Amy Allen',
    name: 'Singer, Inn operations',
    tag: 'Performs as Arrie Aslin · Inn + bar day-of ops · Blues Room programming',
    portfolio: [
      'Working singer; performs publicly as Arrie Aslin',
      'Artist-in-residence at the Big Muddy Inn',
      'Big Muddy Touring, Records, and Radio exist primarily to support her career',
      'Day-of operations for Inn + bar + Blues Room',
    ],
  },
];

const PLATFORM_PIECES = [
  { name: 'Shared CMS', desc: 'Sanity headless CMS with 13+ content schemas. Tracy + Amy publish without calling Chase.' },
  { name: 'Shared hosting', desc: 'Single Vercel deployment serves 14 domains via middleware-based multi-tenant routing.' },
  { name: 'Shared photo library', desc: '229 real Chase photos in GCS, exposed to every brand through a custom Sanity picker.' },
  { name: 'Shared brand systems', desc: '8 per-brand voice documents + a Humanizer filter preventing AI-sounding copy from shipping.' },
  { name: 'Shared sales pipelines', desc: 'One CRM serving photography, Inn, wedding packages, B2B Directory, Studio C video.' },
  { name: 'Shared AI agent roster', desc: 'Cos, Patch, Delta Dawn, Claude Design 2, Gemini — handling digests, deploys, content, review.' },
  { name: 'Pooled revenue', desc: 'Strong months in one brand subsidize slow months in another. The ecosystem covers the ecosystem.' },
  { name: 'Automated operational chores', desc: 'Cloudbeds API for Inn, AI Wizard for content drafts, auto-publish via visual-diff webhook.' },
];

const PORTFOLIO = [
  { name: 'Chase Pierson Photography', tier: 'consumer', tierLabel: 'Chase · Photography', line: '6-year $100k+/yr established business re-activating after platform-build pause. Counter-seasonal with Studio C.', role: 'Biggest Y1 revenue line. Tracy does BizDev + sales.' },
  { name: 'Big Muddy Inn', tier: 'consumer', tierLabel: 'Tracy + Amy · Hospitality', line: '6 rooms + 50-seat Blues Room venue in Natchez. Breakfast service + catering from third-party partners. Peak Oct–March.', role: 'Anchor brand. Hospitality peak complements photography off-season.' },
  { name: 'Big Muddy Magazine', tier: 'consumer', tierLabel: 'Tracy · Editorial', line: 'Editorial publication in Tracy\'s "Mississippi Martha Stewart" voice — for travelers considering the Inn. Not ad-driven.', role: 'Content marketing engine for the Inn. Not a Y1 revenue line.' },
  { name: 'Amy Allen / Arrie Aslin', tier: 'consumer', tierLabel: 'Amy · Music', line: 'Working singer with a band. Artist-in-residence at the Inn. Touring + Records + Radio exist to support her.', role: 'The performing artist whose existence anchors the music infrastructure.' },
  { name: 'Studio C Video', tier: 'production', tierLabel: 'Chase + Elijah · Production', line: 'Production company alongside Chase Pierson Photography. Adds video services. Counter-seasonal: NY May–Oct, Natchez Oct–Apr.', role: 'Creative production capacity for Big Muddy brands + partner expansion.' },
  { name: 'Tuthill Design', tier: 'production', tierLabel: 'Partner Studio · Design', line: 'Design studio amplified inside the ecosystem on partnership terms. Brand + print + graphic work for Big Muddy and shared clients.', role: 'Partner-studio amplification model (see Section 07).' },
  { name: 'Big Muddy Touring', tier: 'consumer', tierLabel: 'Amy-centered · Booking', line: 'Corridor music booking + transport + tour management. Centered on Amy\'s house band, ancillary for visiting artists.', role: 'Not a Y1 revenue target. Amy plays because that\'s who she is.' },
  { name: 'Big Muddy Records + Radio', tier: 'consumer', tierLabel: 'Amy-centered · Catalog + Broadcast', line: 'Record label for corridor artists + internet radio station (Q4 2026 launch). Supports Amy\'s catalog.', role: 'Pre-revenue Y1. Sponsor packages possible late Q4.' },
];

const AGENTS = [
  { name: 'Cos — Chief of Staff', status: 'live', statusLabel: 'live', scope: 'Daily digest, priority triage, meeting prep, document orchestration, Chase\'s inbox pre-sort. The agent Chase talks to when he wants something done.' },
  { name: 'Patch — Technical Director', status: 'live', statusLabel: 'live', scope: 'Deploy verification, bug triage, infra alerts, Sanity schema migrations, Vercel smoke tests. Routes technical escalations.' },
  { name: 'Delta Dawn — Team Assistant', status: 'live', statusLabel: 'live', scope: 'Tracy + Amy onboarding support, CMS how-tos, monthly "what shipped" reports, photo auto-tagging. The team\'s natural-language surface.' },
  { name: 'Claude Design 2', status: 'building', statusLabel: 'building', scope: 'Visual asset generation, brand consistency checks, voice doc formatting, social image templates. Owns the design-system layer.' },
  { name: 'Gemini batches', status: 'live', statusLabel: 'live', scope: 'First-draft Magazine content, SEO metadata, social captions, transcript cleanup, image generation via Imagen 3. Bulk creative throughput.' },
  { name: 'Inn Operations Manager', status: 'planned', statusLabel: 'planned', scope: 'Part-time human hire ($35k/yr) covering housekeeping coordination, breakfast backup, Blues Room setup, guest services fallback. Hires by May 31 pending cash-flow checkpoint.' },
];
