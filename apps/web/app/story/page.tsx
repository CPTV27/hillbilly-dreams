// apps/web/app/story/page.tsx
// The single visual page that tells the whole MBT story end-to-end.
// Built for Chase to show people: the basics, the big story, how it works,
// and all the little pieces working together.
//
// Available at any-domain.com/story (middleware exempts /story from tenant rewriting).

import Link from 'next/link';

export const metadata = {
  title: 'Measurably Better Things — The Story',
  description: 'A holding company that is invisible to consumers, loud through its brands, and powered by one shared platform underneath. Anchored on the Mississippi corridor with a Hudson Valley node.',
};

export const dynamic = 'force-static';

export default function StoryPage() {
  return (
    <div className="story">
      {/* HERO */}
      <header className="hero">
        <p className="eyebrow">Measurably Better Things · April 2026</p>
        <h1>Quiet holding company.<br />Loud consumer brands.<br />One shared spine.</h1>
        <p className="lede">
          MBT is what Automattic is to WordPress: a backstage company that lets distinctive brands stay distinctive while sharing the infrastructure that makes them work. Anchored on the Mississippi corridor with a Hudson Valley node. Three equal partners. Eight brands. Thirteen modules. Built on a stack that already exists.
        </p>
      </header>

      {/* THE THREE LAYERS */}
      <section>
        <p className="section-num">01</p>
        <h2>Three layers, top to bottom</h2>
        <div className="layers">
          <div className="layer layer-1">
            <p className="layer-label">Tier 1 · What customers see</p>
            <h3>The brands</h3>
            <p>Each one keeps its own voice, domain, and customer relationship. None of them mention MBT.</p>
            <div className="brand-list">
              <span>Big Muddy Inn</span>
              <span>Big Muddy Touring</span>
              <span>Big Muddy Records</span>
              <span>Big Muddy Radio</span>
              <span>Big Muddy Magazine</span>
              <span>Chase Pierson Photography</span>
              <span>Tuthill Design</span>
              <span>Studio C</span>
            </div>
          </div>
          <div className="layer-arrow">↓</div>
          <div className="layer layer-2">
            <p className="layer-label">Tier 2 · Production B2B (north and south)</p>
            <h3>Tuthill Design · Studio C</h3>
            <p>The two production-side brands that sell media services to outside clients <em>and</em> serve the in-family brands. Operating in two corridors now: Hudson Valley up north, Mississippi corridor in the south.</p>
          </div>
          <div className="layer-arrow">↓</div>
          <div className="layer layer-3">
            <p className="layer-label">Tier 3 · The platform</p>
            <h3>MBT — Measurably Better Things LLC</h3>
            <p>The infrastructure underneath. Owns the canonical entity store, the directory module, the Sanity-based CMS, the photo archive — all the shared technology that lets each brand operate without rebuilding the same wheel.</p>
            <p className="rule">Public-facing only when selling to broker-tier clients (real estate firms, civic partners). Otherwise invisible.</p>
          </div>
        </div>
      </section>

      {/* THE BRANDS */}
      <section>
        <p className="section-num">02</p>
        <h2>The brands, in plain language</h2>
        <div className="brand-grid">
          {BRANDS.map((b) => (
            <div key={b.name} className={`brand-card brand-${b.tier}`}>
              <p className="brand-tier">{b.tierLabel}</p>
              <h3>{b.name}</h3>
              <p className="brand-line">{b.line}</p>
              <p className="brand-revenue">{b.revenue}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE ENTITIES */}
      <section>
        <p className="section-num">03</p>
        <h2>Who owns what</h2>
        <p className="lede-small">
          Three new (well, two new and one existing) operating LLCs. Three equal partners. Two production-side affiliates Chase partly owns personally. One legacy entity winding down.
        </p>
        <div className="entity-stack">
          <div className="entity entity-parent">
            <h3>MBT · Measurably Better Things LLC</h3>
            <p className="meta">Mississippi · TO FILE · Lawyer engaged</p>
            <p>Three equal partners: Chase, Tracy, Amy (one third each). Holds the platform IP. Receives Chase's pass-through distributions from Tuthill and Studio C (currently routed through FarleyPierson — switching to MBT post-restructure).</p>
          </div>
          <div className="entity-row">
            <div className="entity">
              <h3>Big Muddy Natchez LLC</h3>
              <p className="meta">Mississippi · ALREADY EXISTS · Inn operating entity</p>
              <p>Holds the Inn and the Magazine. Becomes a wholly-owned subsidiary of MBT once MBT files (assignment, not a new filing).</p>
            </div>
            <div className="entity">
              <h3>Big Muddy Touring LLC</h3>
              <p className="meta">TBD state · TO FILE</p>
              <p>Holds touring, radio, the record label, the band, and all mobile performance work. Separate entity required for vehicle and road insurance.</p>
            </div>
          </div>
          <div className="entity entity-affiliate">
            <h3>Tuthill Design LLC · two DBAs under one entity</h3>
            <p className="meta">NY · existing · 50/50 Chase + Elijah Tuthill (LLC) · 40/30/30 operating split (Chase / Elijah / Miles)</p>
            <p>One legal entity, one insurance umbrella, two service lines:</p>
            <ul style={{ margin: '8px 0 12px 18px', color: '#d8cfbe', fontSize: '14px', lineHeight: 1.6 }}>
              <li><strong>Tuthill Design</strong> (DBA) — real estate photo, video, 3D, design (LiDAR + AI). Hudson Valley + new Natchez branch.</li>
              <li><strong>Studio C</strong> (DBA) — production for MBT platform work + concert/event production. Bearsville-anchored + new Natchez branch.</li>
            </ul>
            <p>MBT has ONE vendor relationship with the LLC, paid via buckets of Studio C hours (fungible across all platform work) + per-project work. Studio C internally staffs the team — Elijah, Miles, others.</p>
          </div>
          <div className="entity entity-legacy">
            <h3>FarleyPierson LLC</h3>
            <p className="meta">SHUTTING DOWN · Lawyer-handled</p>
            <p>Chase's existing pass-through entity. Wind-down begins after MBT files.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <p className="section-num">04</p>
        <h2>How it works under the hood</h2>
        <p className="lede-small">
          One Next.js codebase across most brands. One Sanity CMS. One Hetzner-hosted photo archive. One canonical entity database. Spinning up a new client should be one command.
        </p>
        <div className="modules">
          {MODULES.map((m) => (
            <div key={m.name} className={`module module-${m.status}`}>
              <span className="module-num">{m.num}</span>
              <span className="module-name">{m.name}</span>
              <span className="module-status">{m.statusLabel}</span>
            </div>
          ))}
        </div>
        <p className="callout">
          <strong>The core insight:</strong> the bones already exist. Multi-tenant routing works. Sanity, Stripe, Cloudbeds, Icecast, social publisher, draft generation — all wired in some form. The next phase is to formalize module boundaries, build a one-command tenant provisioning pipeline, and add the prompt-driven content creation module that makes the platform feel different from generic SaaS.
        </p>
      </section>

      {/* HOW MONEY FLOWS */}
      <section>
        <p className="section-num">05</p>
        <h2>How money flows</h2>
        <p className="lede-small">Three economic patterns for MBT, depending on what the platform is doing.</p>
        <div className="tiers">
          <div className="tier tier-1">
            <h3>Tier 1 · Internal tooling</h3>
            <p className="tier-take">No revenue share</p>
            <p>When a Big Muddy brand uses MBT infrastructure for its own operations, value consolidates back up through subsidiary ownership. No internal billing.</p>
          </div>
          <div className="tier tier-2">
            <h3>Tier 2 · One-off vendor work</h3>
            <p className="tier-take">No revenue share</p>
            <p>When Tuthill shoots a single property or Studio C streams a single event, the vendor keeps the revenue. MBT infrastructure is covered by the standing retainer.</p>
          </div>
          <div className="tier tier-3">
            <h3>Tier 3 · Recurring module engagement</h3>
            <p className="tier-take">15–30% to MBT</p>
            <p>When a vendor sells a recurring service powered by MBT modules — a realtor's directory and social management, a sponsor's ongoing radio package, a broker licensing the Deep South Directory — MBT is the value driver and takes a percentage of the recurring revenue.</p>
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section>
        <p className="section-num">06</p>
        <h2>The people</h2>
        <div className="people">
          <div className="person">
            <h3>Chase Pierson</h3>
            <p className="role">CEO · Photography · Video · Code · Strategy</p>
            <p>Owns the broad architecture, Big Muddy Touring booking relationships, and the premium photography brand. Heavy travel weeks; Tracy holds the rudder when he's gone.</p>
          </div>
          <div className="person">
            <h3>Tracy Alderson-Allen</h3>
            <p className="role">Innkeeper · MBT Executive · Magazine Editor</p>
            <p>Runs the Inn (with housekeeper and hospitality coordinator support). Steps up to MBT-level executive work: portfolio oversight, back office across ventures, marketing across ventures. Edits the Magazine.</p>
          </div>
          <div className="person">
            <h3>Amy Allen</h3>
            <p className="role">Big Muddy Radio · Records · Performing Artist</p>
            <p>Day-to-day operator for the music side. Programs the radio, runs the record label, performs in the band. Bar-side ops at the Inn continue as before.</p>
          </div>
        </div>

        <h3 className="people-sub">Production capacity (vendor)</h3>
        <div className="people specialists" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="person small">
            <h4>Studio C team — via Tuthill Design LLC</h4>
            <p>MBT purchases buckets of Studio C hours from the LLC. Hours are fungible across all platform work — photo archive, platform maintenance, anything else. Studio C internally staffs the bucket. Not individual contractor arrangements.</p>
          </div>
          <div className="person small">
            <h4>Patch</h4>
            <p>Technical Director. Always-on infrastructure, builds, deploys.</p>
          </div>
        </div>
      </section>

      {/* AI LAYER */}
      <section>
        <p className="section-num">07</p>
        <h2>The AI layer — defined roles</h2>
        <p className="lede-small">A small, named set of agents that do specific work. Each has a defined scope, a clear status, and a place in the broader platform. Not a generic "AI assistant" — these are the operators that keep the system moving.</p>
        <div className="ai-grid">
          {AI_ROLES.map((a) => (
            <div key={a.name} className={`ai-card ai-${a.status}`}>
              <div className="ai-row">
                <h3>{a.name}</h3>
                <span className="ai-status">{a.statusLabel}</span>
              </div>
              <p className="ai-scope">{a.scope}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S LIVE NOW */}
      <section>
        <p className="section-num">08</p>
        <h2>What is live, what is queued</h2>
        <div className="status-board">
          <div className="status-col">
            <h3 className="status-live">Live</h3>
            <ul>
              <li>Hetzner photo infrastructure (Immich) with 52,892 photos already ingested, face recognition + semantic search active</li>
              <li>Multi-tenant Next.js platform across 14 domains</li>
              <li>Sanity CMS wired and serving content</li>
              <li>Internal directory with 459 corridor records (venues, musicians, festivals, more)</li>
              <li>Big Muddy Inn website on Squarespace + Cloudbeds</li>
              <li>Stripe integration for subscriptions</li>
              <li>Cloudbeds integration for Inn room bookings</li>
              <li>Big Muddy Radio streaming via Icecast</li>
            </ul>
          </div>
          <div className="status-col">
            <h3 className="status-active">Active this week</h3>
            <ul>
              <li>Vicki Wolpert onboarding (KW realtor in Athens NY) — first external multi-tenant client. Date is movable; getting the launch clean matters more.</li>
              <li>Upstate Directory research seed (Vicki's List) for Hudson Valley businesses</li>
              <li>Camera kit Wave 1 ($8,750) — Sony a7 V, 70-200 GM II, wireless TX</li>
              <li>Studio C Wave 1 video kit ordered for both north and south corridors</li>
              <li>Lawyer engaged for MBT LLC and Big Muddy Touring LLC formation</li>
            </ul>
          </div>
          <div className="status-col">
            <h3 className="status-queued">Coming next</h3>
            <ul>
              <li>Monday April 20 partner session — wireframe consumer-facing front-end per brand</li>
              <li>Module API formalization across the existing codebase</li>
              <li>Tenant provisioning pipeline — single command to onboard a new client</li>
              <li>Prompt-driven content creation module (the wizard that pulls entities + media + templates)</li>
              <li>Recording Studios summer project at Bearsville (Utopia, Clubhouse, David Baron studios) — magazine + coffee-table book</li>
              <li>Paul Green Realty and City of Natchez partnership conversations before Chase leaves for summer</li>
            </ul>
          </div>
        </div>
      </section>

      {/* THE OPEN-SOURCE LAYER */}
      <section>
        <p className="section-num">09</p>
        <h2>Outsider Economics — the open-source layer</h2>
        <p>
          Inside MBT but separate from the commercial work, Chase maintains an open-source project called Outsider Economics. Tools and writing for people who want to reimagine the economy on their own terms. A spare-time effort, deliberately not commercial, but useful infrastructure that the rest of the platform can pull from.
        </p>
      </section>

      {/* WHERE THIS GOES */}
      <section>
        <p className="section-num">10</p>
        <h2>Where this goes</h2>
        <p className="lede-small">
          The next 30 days lock the front-end story per brand and start formalizing the module boundaries that turn the existing infrastructure into a real product. Vicki's onboarding becomes the proof point for the next ten realtors. Chase's summer at Bearsville produces the Recording Studios book and a content stream that runs across every channel. The Paul Green Realty conversation, if it lands, opens the broker-tier playbook. Quiet holding company, loud consumer brands, one shared spine.
        </p>
      </section>

      <footer>
        <p>Measurably Better Things · April 2026 · Status as of today.</p>
        <p>
          More detail at{' '}
          <Link href="/plan">the plan landing</Link>
          {' · '}
          full context at{' '}
          <a href="https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/CURRENT_CONTEXT.md" target="_blank" rel="noopener noreferrer">CURRENT_CONTEXT.md</a>
          {' · '}
          ecosystem map at{' '}
          <a href="https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/ENTITY_STRUCTURE.md" target="_blank" rel="noopener noreferrer">ENTITY_STRUCTURE.md</a>
        </p>
      </footer>

      <style>{`
        .story {
          min-height: 100vh;
          background: #0f0e0c;
          color: #f4ede0;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          padding: 56px 24px 96px;
        }
        .story > * { max-width: 960px; margin-left: auto; margin-right: auto; }

        .hero { padding-top: 32px; padding-bottom: 64px; border-bottom: 1px solid #2a2723; }
        .eyebrow {
          color: #c8a676;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin: 0 0 16px;
        }
        h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 64px;
          font-weight: 700;
          line-height: 1.04;
          letter-spacing: -0.025em;
          margin: 0 0 28px;
        }
        .lede {
          font-size: 19px;
          color: #d8cfbe;
          line-height: 1.7;
          max-width: 720px;
          margin: 0;
        }
        .lede em, .lede strong { color: #f4ede0; }

        section {
          padding: 64px 0;
          border-bottom: 1px solid #2a2723;
        }
        section:last-of-type { border-bottom: none; }

        .section-num {
          color: #6b6254;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3em;
          margin: 0 0 12px;
        }
        h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.015em;
          margin: 0 0 32px;
          line-height: 1.15;
        }
        h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #f4ede0;
        }
        h4 {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #f4ede0;
        }
        p { margin: 0 0 16px; }
        .lede-small {
          color: #a89e8d;
          font-size: 16px;
          font-style: italic;
          max-width: 640px;
          margin: 0 0 32px;
        }

        /* Layers diagram */
        .layers { display: flex; flex-direction: column; align-items: stretch; gap: 8px; }
        .layer {
          padding: 24px 28px;
          border-radius: 10px;
          border: 1px solid #2a2723;
          background: #191715;
        }
        .layer-1 { border-left: 4px solid #d99850; }
        .layer-2 { border-left: 4px solid #c8a676; }
        .layer-3 { border-left: 4px solid #7fa86a; }
        .layer-label {
          color: #c8a676;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 8px;
        }
        .layer-arrow {
          color: #6b6254;
          font-size: 22px;
          text-align: center;
          margin: 4px 0;
        }
        .layer p { color: #d8cfbe; font-size: 15px; }
        .rule {
          color: #c8a676;
          font-size: 13px;
          font-style: italic;
          margin-top: 12px;
        }
        .brand-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .brand-list span {
          padding: 4px 10px;
          background: #252320;
          border-radius: 4px;
          font-size: 13px;
          color: #c8a676;
        }

        /* Brand grid */
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .brand-card {
          padding: 20px 22px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 8px;
        }
        .brand-card.brand-consumer { border-left: 3px solid #d99850; }
        .brand-card.brand-production { border-left: 3px solid #c8a676; }
        .brand-tier {
          color: #6b6254;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 8px;
        }
        .brand-card h3 { font-size: 18px; margin: 0 0 8px; }
        .brand-line { color: #d8cfbe; font-size: 14px; margin: 0 0 10px; }
        .brand-revenue { color: #a89e8d; font-size: 13px; font-style: italic; margin: 0; }

        /* Entities */
        .entity-stack { display: flex; flex-direction: column; gap: 12px; }
        .entity-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 720px) { .entity-row { grid-template-columns: 1fr; } }
        .entity {
          padding: 20px 22px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 8px;
        }
        .entity h3 { font-size: 17px; margin: 0 0 6px; }
        .entity p { color: #d8cfbe; font-size: 14px; margin: 0 0 6px; }
        .entity .meta {
          color: #c8a676;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 10px;
        }
        .entity-parent { border-left: 4px solid #c8a676; background: #1f1d1a; }
        .entity-affiliate { border-left: 4px solid #7fa86a; }
        .entity-legacy { border-left: 4px solid #6b6254; opacity: 0.85; }
        .entity-legacy .meta { color: #6b6254; }

        /* Modules */
        .modules {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 8px;
          margin-bottom: 24px;
        }
        .module {
          padding: 12px 16px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }
        .module-num {
          color: #6b6254;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }
        .module-name { color: #f4ede0; flex: 1; }
        .module-status {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .module-exists .module-status { color: #7fa86a; }
        .module-partial .module-status { color: #d99850; }
        .module-new .module-status { color: #c8a676; }
        .module-exists { border-left: 2px solid #7fa86a; }
        .module-partial { border-left: 2px solid #d99850; }
        .module-new { border-left: 2px solid #c8a676; }
        .callout {
          padding: 20px 24px;
          background: linear-gradient(180deg, rgba(200, 166, 118, 0.08), rgba(200, 166, 118, 0.02));
          border-left: 3px solid #c8a676;
          border-radius: 4px;
          color: #d8cfbe;
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
        }
        .callout strong { color: #f4ede0; }

        /* Tiers */
        .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 720px) { .tiers { grid-template-columns: 1fr; } }
        .tier {
          padding: 22px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 8px;
        }
        .tier-1 { border-top: 3px solid #6b6254; }
        .tier-2 { border-top: 3px solid #c8a676; }
        .tier-3 { border-top: 3px solid #7fa86a; }
        .tier h3 { font-size: 15px; margin: 0 0 6px; }
        .tier-take {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          color: #c8a676;
          margin: 0 0 12px;
          font-weight: 700;
        }
        .tier p { color: #d8cfbe; font-size: 14px; margin: 0; }

        /* People */
        .people {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 32px;
        }
        @media (max-width: 720px) { .people { grid-template-columns: 1fr; } }
        .person {
          padding: 22px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 8px;
        }
        .person h3 { font-size: 18px; margin: 0 0 4px; }
        .role {
          color: #c8a676;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin: 0 0 12px;
        }
        .person p { color: #d8cfbe; font-size: 14px; margin: 0; }
        .people-sub {
          color: #6b6254;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 16px;
        }
        .people.specialists { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 720px) { .people.specialists { grid-template-columns: 1fr 1fr; } }
        .person.small { padding: 16px; }
        .person.small p { font-size: 13px; }

        /* Status board */
        .status-board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 720px) { .status-board { grid-template-columns: 1fr; } }
        .status-col {
          padding: 22px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 8px;
        }
        .status-col h3 {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2723;
        }
        .status-live { color: #7fa86a; }
        .status-active { color: #d99850; }
        .status-queued { color: #c8a676; }
        .status-col ul { margin: 0; padding-left: 18px; color: #d8cfbe; font-size: 14px; }
        .status-col li { margin-bottom: 12px; line-height: 1.6; }

        footer {
          padding: 48px 0 0;
          text-align: center;
          color: #6b6254;
          font-size: 13px;
          border-top: 1px solid #2a2723;
        }
        footer a {
          color: #c8a676;
          text-decoration: none;
        }
        footer p { margin: 0 0 6px; }

        /* AI layer */
        .ai-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 12px;
        }
        .ai-card {
          padding: 18px 20px;
          background: #191715;
          border: 1px solid #2a2723;
          border-radius: 8px;
        }
        .ai-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 8px;
        }
        .ai-card h3 { font-size: 15px; margin: 0; }
        .ai-status {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .ai-card.ai-live { border-left: 3px solid #7fa86a; }
        .ai-card.ai-live .ai-status { background: rgba(127, 168, 106, 0.15); color: #7fa86a; }
        .ai-card.ai-building { border-left: 3px solid #d99850; }
        .ai-card.ai-building .ai-status { background: rgba(217, 152, 80, 0.15); color: #d99850; }
        .ai-card.ai-planned { border-left: 3px solid #6b6254; opacity: 0.85; }
        .ai-card.ai-planned .ai-status { background: rgba(107, 98, 84, 0.2); color: #a89e8d; }
        .ai-scope { color: #d8cfbe; font-size: 13px; line-height: 1.55; margin: 0; }

        @media (max-width: 720px) {
          .story { padding: 32px 16px 64px; }
          h1 { font-size: 40px; }
          h2 { font-size: 26px; }
          .lede { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}

const BRANDS = [
  { name: 'Big Muddy Inn', tier: 'consumer', tierLabel: 'Consumer · Hospitality', line: 'A boutique inn in Natchez with a working blues stage. Catering for private events from third-party partners (no in-house restaurant).', revenue: 'Room nights · Blues Room tickets · private events' },
  { name: 'Big Muddy Touring', tier: 'consumer', tierLabel: 'Consumer · Music', line: 'Bringing artists to the Mississippi corridor — booking, route planning, on-the-ground promotion.', revenue: 'Tour dates · gigs · sponsorships' },
  { name: 'Big Muddy Records', tier: 'consumer', tierLabel: 'Consumer · Music', line: "Houses Amy Allen's catalog and Mechanical Bull's catalog. Offers a non-exclusive promotion partnership to outside artists. Approved artists can opt into a low monthly fee for full label-style marketing services.", revenue: 'Catalog units (vinyl/digital/streaming/merch) + recurring monthly label services' },
  { name: 'Big Muddy Radio', tier: 'consumer', tierLabel: 'Consumer · Broadcast', line: 'Podcasts + curated playlists on Spotify/Apple/YouTube Music, plus TikTok Live for the live talk-radio feel (TikTok handles music licensing). Linear streaming radio when audience justifies.', revenue: 'Episode + playlist sponsorships · TikTok Live brand presence · future linear inventory' },
  { name: 'Big Muddy Magazine', tier: 'consumer', tierLabel: 'Consumer · Editorial', line: 'Editorial vehicle covering music, hospitality, and the people on the corridor. Feeds traffic to every other Big Muddy property.', revenue: 'Cross-marketing engine · drives Inn bookings (not a subscription product)' },
  { name: 'Chase Pierson Photography', tier: 'consumer', tierLabel: 'Consumer · Premium services', line: "Chase's editorial and documentary photography practice. Premium rate, distinct from Tuthill's advertised rates.", revenue: 'Editorial commissions · documentary projects · prints · portraits' },
  { name: 'Tuthill Design (DBA)', tier: 'production', tierLabel: 'Production B2B · North + South', line: 'Real estate media + 3D + design (LiDAR + AI). Hudson Valley + new Natchez branch. One of two DBAs under Tuthill Design LLC.', revenue: 'Per-property packages · recurring social management for realtors' },
  { name: 'Studio C (DBA)', tier: 'production', tierLabel: 'Production B2B · North + South', line: 'Production for MBT platform work + concert/event production. Bearsville-anchored + new Natchez branch. Sister DBA under the same Tuthill Design LLC.', revenue: 'Per-event packages · venue retainers · premium cinema · MBT bucket hours for platform work' },
];

const AI_ROLES = [
  { name: 'Chief of Staff (Cos)', status: 'live', statusLabel: 'live', scope: "Orchestrates the project queue, commits code, fans context across documents and sibling agents. The agent Chase talks to when he wants something done." },
  { name: 'Photo Pipeline', status: 'live', statusLabel: 'live', scope: 'Auto-ingests photos from iPhone, GCS, Mac mini, and Synology into Immich. Runs face recognition, CLIP semantic search, AI tagging. Exports curated photos to the gallery + print-on-demand pipeline.' },
  { name: 'Voice System', status: 'live', statusLabel: 'live', scope: 'Maintains a per-brand voice document for each property and a Humanizer filter that runs on every text output. Prevents AI-sounding copy from shipping under any brand.' },
  { name: 'Directory Research', status: 'live', statusLabel: 'live', scope: 'Dispatches Perplexity deep research, ingests structured YAML, populates the canonical entity store. The 459 corridor records currently in the system came from here.' },
  { name: 'Tenant Provisioning', status: 'building', statusLabel: 'building', scope: 'Single-command onboarding for new client tenants — creates the entity, provisions the Vercel domain, bootstraps Sanity, activates the right modules. Vicki Wolpert is the first external customer this serves.' },
  { name: 'Content Creation', status: 'building', statusLabel: 'building', scope: '"I want to write a magazine article about X" → wizard pulls relevant entities and media, drafts in Sanity, hands back to Tracy for edit. The piece that makes the platform feel different from generic SaaS.' },
  { name: 'Outsider Economics governance', status: 'planned', statusLabel: 'planned', scope: "The open-source layer of MBT — Chase's separate spare-time effort. Writing and tools for people who want to reimagine the economy on their own terms." },
];

const MODULES = [
  { num: '01', name: 'Canonical Entity Store', status: 'partial', statusLabel: 'partial' },
  { num: '02', name: 'CMS · Sanity', status: 'exists', statusLabel: 'live' },
  { num: '03', name: 'Directory Module', status: 'exists', statusLabel: 'live' },
  { num: '04', name: 'Media Gallery · Immich', status: 'exists', statusLabel: 'live' },
  { num: '05', name: 'Booking Module', status: 'partial', statusLabel: 'partial' },
  { num: '06', name: 'Commerce Module', status: 'partial', statusLabel: 'partial' },
  { num: '07', name: 'Broadcast Module', status: 'partial', statusLabel: 'partial' },
  { num: '08', name: 'Social Media Module', status: 'partial', statusLabel: 'partial' },
  { num: '09', name: 'Tour & Calendar', status: 'partial', statusLabel: 'partial' },
  { num: '10', name: 'Finance & Billing', status: 'partial', statusLabel: 'partial' },
  { num: '11', name: 'Affiliate & Referral', status: 'partial', statusLabel: 'partial' },
  { num: '12', name: 'Coordination Layer', status: 'partial', statusLabel: 'partial' },
  { num: '13', name: 'Prompt-driven Content Creation', status: 'new', statusLabel: 'building' },
];
