'use client';

// Executive Briefing — Tracy & Amy onboarding summary
// Magazine-style layout for the Big Muddy Command platform tour

export default function BriefingPage() {
  return (
    <div className="briefing">
      {/* Hero */}
      <header className="briefing-hero">
        <span className="briefing-hero__icon">🌻</span>
        <h1 className="briefing-hero__title">Welcome to Big Muddy Command</h1>
        <p className="briefing-hero__subtitle">The 5-Minute Briefing — Everything You Need to Know</p>
        <div className="briefing-hero__date">March 20, 2026</div>
      </header>

      {/* Greeting */}
      <section className="briefing-section">
        <div className="briefing-greeting">
          <strong>Hey Tracy & Amy,</strong><br /><br />
          Chase has built the machine. You two are going to drive it. Here's the quick version
          of everything — the company, the plan, and what you'll be doing starting today.
          The documents are drafted, the platform is live, and you're about to be handed the keys.
        </div>
      </section>

      <div className="briefing-divider" />

      {/* What's Happening */}
      <section className="briefing-section">
        <h2 className="briefing-h2">What's Happening</h2>
        <div className="briefing-columns">
          <div className="briefing-col">
            <p>
              <strong>Big Muddy Command</strong> is the operations platform that runs
              the entire Big Muddy ecosystem — the Inn, the Magazine, the Radio, the Directory,
              all seven brands. It's live right now. You're looking at it.
            </p>
          </div>
          <div className="briefing-col">
            <p>
              Everything rolls up under a new holding company: <strong>Hillbilly Dreams LLC</strong>.
              Plus there's a technology licensing deal worth <strong>$134,000/year</strong> that
              funds the whole operation.
            </p>
          </div>
        </div>
      </section>

      <div className="briefing-divider" />

      {/* The Company */}
      <section className="briefing-section">
        <h2 className="briefing-h2">Hillbilly Dreams LLC</h2>
        <p className="briefing-lead">A Mississippi LLC that you two co-own and co-manage.</p>

        <div className="briefing-ownership">
          <div className="briefing-owner">
            <div className="briefing-owner__pct">45%</div>
            <div className="briefing-owner__name">Tracy Allen</div>
            <div className="briefing-owner__role">Co-Manager</div>
          </div>
          <div className="briefing-owner">
            <div className="briefing-owner__pct">45%</div>
            <div className="briefing-owner__name">Amy Allen</div>
            <div className="briefing-owner__role">Co-Manager</div>
          </div>
          <div className="briefing-owner briefing-owner--muted">
            <div className="briefing-owner__pct">10%</div>
            <div className="briefing-owner__name">Trust</div>
            <div className="briefing-owner__role">Passive · No Vote</div>
          </div>
        </div>

        <div className="briefing-cards-row">
          <div className="briefing-card">
            <div className="briefing-card__label">You & Amy</div>
            <div className="briefing-card__text">
              You run everything. Day-to-day operations, the Inn, the brands, vendors,
              events — you're the bosses.
            </div>
          </div>
          <div className="briefing-card">
            <div className="briefing-card__label">Chase</div>
            <div className="briefing-card__text">
              Not a member. He provides technology and media services as a vendor through
              Tuthill Design LLC. He built the platform — you operate it.
            </div>
          </div>
        </div>
      </section>

      <div className="briefing-divider" />

      {/* The Money */}
      <section className="briefing-section">
        <h2 className="briefing-h2">The Money</h2>

        <div className="briefing-big-nums">
          <div className="briefing-big-num">
            <div className="briefing-big-num__label">Year 2 (Actual)</div>
            <div className="briefing-big-num__value briefing-big-num__value--red">$92K</div>
            <div className="briefing-big-num__sub">Lost $22K</div>
          </div>
          <div className="briefing-big-num__arrow">→</div>
          <div className="briefing-big-num">
            <div className="briefing-big-num__label">Year 3 (The Plan)</div>
            <div className="briefing-big-num__value briefing-big-num__value--green">$389K</div>
            <div className="briefing-big-num__sub">$144K profit</div>
          </div>
        </div>

        <table className="briefing-table">
          <thead>
            <tr>
              <th>Revenue Stream</th>
              <th style={{ textAlign: 'right' }}>Annual Target</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Lodging (6 rooms, 65% occupancy)</td><td style={{ textAlign: 'right' }}><strong>$156,000</strong></td></tr>
            <tr><td>Weddings (4 package tiers)</td><td style={{ textAlign: 'right' }}><strong>$85,000</strong></td></tr>
            <tr><td>Venue & Signature Events</td><td style={{ textAlign: 'right' }}><strong>$52,000</strong></td></tr>
            <tr><td>Workshops</td><td style={{ textAlign: 'right' }}><strong>$48,000</strong></td></tr>
            <tr><td>Bridge Clients / Deep South Directory</td><td style={{ textAlign: 'right' }}><strong>$30,000</strong></td></tr>
            <tr><td>Media & Content</td><td style={{ textAlign: 'right' }}><strong>$18,000</strong></td></tr>
            <tr className="briefing-table__total"><td><strong>Total</strong></td><td style={{ textAlign: 'right' }}><strong>$389,000</strong></td></tr>
          </tbody>
        </table>
      </section>

      <div className="briefing-divider" />

      {/* Wedding Program */}
      <section className="briefing-section">
        <h2 className="briefing-h2">The Wedding Program</h2>
        <p className="briefing-lead">
          Nobody else in Natchez has <strong>live music</strong> as part of the wedding package.
          That's our edge.
        </p>

        <div className="briefing-tiers">
          {[
            { name: 'Elopement', price: '$2,500', detail: 'Just the couple · 1 night · Acoustic solo' },
            { name: 'Front Porch', price: '$8,500', detail: 'Up to 30 guests · 2 nights · Duo/trio' },
            { name: 'Blues Room', price: '$15,000', detail: 'Up to 60 guests · Full weekend · Full band' },
            { name: 'Full Muddy', price: '$25,000', detail: 'Up to 100 guests · 3 nights · Full band + DJ · Complete buyout' },
          ].map(t => (
            <div key={t.name} className="briefing-tier">
              <div className="briefing-tier__name">{t.name}</div>
              <div className="briefing-tier__price">{t.price}</div>
              <div className="briefing-tier__detail">{t.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="briefing-divider" />

      {/* Daily Workflow */}
      <section className="briefing-section">
        <h2 className="briefing-h2">Your Daily Workflow</h2>

        <div className="briefing-workflow">
          {[
            { time: '☀️ Morning', task: 'Check Dashboard for overnight bookings and metrics' },
            { time: '📱 Mid-morning', task: 'Review social posts queued by the content engine' },
            { time: '💬 Anytime', task: 'Ask Delta Dawn for help with guest comms, content, or operations' },
            { time: '📸 As needed', task: 'Upload photos and media to the library' },
            { time: '📊 Weekly', task: 'Review Bridge Client pipeline, follow up on leads' },
            { time: '🎤 Event days', task: 'Create event, promote across brands, capture content' },
          ].map((w, i) => (
            <div key={i} className="briefing-workflow__item">
              <span className="briefing-workflow__time">{w.time}</span>
              <span className="briefing-workflow__task">{w.task}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="briefing-divider" />

      {/* Delta Dawn */}
      <section className="briefing-section">
        <h2 className="briefing-h2">Meet Delta Dawn 🌻</h2>
        <div className="briefing-dawn-box">
          <p>
            Delta Dawn is the AI assistant built into this platform. She knows
            <strong> everything</strong> about Big Muddy — every brand, every property,
            every pricing tier, every policy. Ask her anything:
          </p>
          <div className="briefing-dawn-prompts">
            {[
              '"What\'s our checkout policy?"',
              '"Draft a response to a guest complaint"',
              '"What events do we have this month?"',
              '"Help me write an Instagram caption for the Inn"',
            ].map(q => (
              <div key={q} className="briefing-dawn-prompt">{q}</div>
            ))}
          </div>
          <p style={{ marginTop: 16 }}>
            <strong>She never says "I don't know."</strong> She figures it out.
            Look for the 🌻 in the bottom right corner — she's always there.
          </p>
        </div>
      </section>

      <div className="briefing-divider" />

      {/* CTA */}
      <section className="briefing-section">
        <div className="briefing-cta">
          <h2 className="briefing-h2" style={{ textAlign: 'center', marginBottom: 12 }}>
            One Thing to Do Today
          </h2>
          <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            <strong>Register the LLC.</strong> 15 minutes, $50, online.
          </p>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a
              href="https://www.sos.ms.gov/business-services"
              target="_blank"
              rel="noopener noreferrer"
              className="briefing-cta-btn"
            >
              Go to Mississippi Secretary of State →
            </a>
          </div>
          <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.85rem', opacity: 0.5 }}>
            Chase has a filing guide with the exact form answers.
          </p>
        </div>
      </section>

      <div className="briefing-divider" />

      {/* Big Picture */}
      <section className="briefing-section">
        <h2 className="briefing-h2">The Big Picture</h2>
        <div className="briefing-quote">
          Chase built the machine.<br />
          You two are going to drive it.
        </div>
        <p>
          The technology handles the automation — content generation, scheduling, distribution,
          analytics. You handle the human touch — the guests, the relationships, the taste,
          the judgment calls that AI can't make.
        </p>
        <p>
          This isn't a startup pitch. The platform is built. The Inn is real. The brands exist.
          Your job is to take it from $92K to $389K by running operations, booking weddings,
          managing events, and being the face of Big Muddy in Natchez.
        </p>
        <p><strong>You've got this.</strong></p>
      </section>

      <footer className="briefing-footer">
        Hillbilly Dreams LLC · Natchez, Mississippi · 2026
      </footer>

      <style>{`
        .briefing {
          max-width: 100%;
          background: #0e0c0a;
          min-height: 100vh;
          padding-bottom: 80px;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: rgba(240, 235, 224, 0.75);
          font-size: 16px;
          line-height: 1.75;
          -webkit-font-smoothing: antialiased;
        }

        /* Hero */
        .briefing-hero {
          text-align: center;
          padding: 64px 24px 48px;
          background: linear-gradient(180deg, rgba(200,148,62,0.1) 0%, transparent 100%);
          border-bottom: 1px solid rgba(200,148,62,0.15);
        }
        .briefing-hero__icon { font-size: 3rem; display: block; margin-bottom: 12px; }
        .briefing-hero__title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 4.5vw, 2.8rem);
          font-weight: 700;
          color: #f0ebe0;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .briefing-hero__subtitle {
          font-size: 1.1rem;
          color: #c8943e;
          font-weight: 500;
        }
        .briefing-hero__date {
          margin-top: 12px;
          font-size: 0.85rem;
          color: rgba(240,235,224,0.35);
        }

        /* Layout */
        .briefing-section {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .briefing-divider {
          width: 60px;
          height: 2px;
          background: #c8943e;
          margin: 48px auto;
          border-radius: 2px;
        }

        /* Typography */
        .briefing-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: #f0ebe0;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .briefing-lead {
          font-size: 1.05rem;
          color: rgba(240,235,224,0.6);
          margin-bottom: 20px;
        }

        .briefing p { margin-bottom: 14px; }
        .briefing p strong { color: #f0ebe0; }

        /* Greeting */
        .briefing-greeting {
          margin-top: 40px;
          padding: 28px 32px;
          background: rgba(200,148,62,0.06);
          border: 1px solid rgba(200,148,62,0.15);
          border-radius: 16px;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        .briefing-greeting strong { color: #f0ebe0; }

        /* Columns */
        .briefing-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 600px) { .briefing-columns { grid-template-columns: 1fr; } }

        /* Ownership */
        .briefing-ownership {
          display: flex;
          gap: 16px;
          margin: 24px 0;
          justify-content: center;
          flex-wrap: wrap;
        }
        .briefing-owner {
          text-align: center;
          padding: 20px 28px;
          background: #1e1b18;
          border: 1px solid rgba(200,148,62,0.2);
          border-radius: 12px;
          min-width: 140px;
          flex: 1;
        }
        .briefing-owner--muted {
          opacity: 0.5;
          border-style: dashed;
        }
        .briefing-owner__pct {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #c8943e;
        }
        .briefing-owner__name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #f0ebe0;
          margin-top: 4px;
        }
        .briefing-owner__role {
          font-size: 0.8rem;
          color: rgba(240,235,224,0.45);
          margin-top: 2px;
        }

        /* Cards */
        .briefing-cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 20px;
        }
        @media (max-width: 600px) { .briefing-cards-row { grid-template-columns: 1fr; } }

        .briefing-card {
          background: #1e1b18;
          border: 1px solid rgba(200,148,62,0.15);
          border-radius: 12px;
          padding: 20px;
        }
        .briefing-card__label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #c8943e;
          margin-bottom: 6px;
        }
        .briefing-card__text {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(240,235,224,0.65);
        }

        /* Big Numbers */
        .briefing-big-nums {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin: 28px 0;
          flex-wrap: wrap;
        }
        .briefing-big-num {
          text-align: center;
          padding: 24px 32px;
          background: #1e1b18;
          border: 1px solid rgba(200,148,62,0.15);
          border-radius: 12px;
          min-width: 160px;
        }
        .briefing-big-num__label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(240,235,224,0.45);
        }
        .briefing-big-num__value {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #f0ebe0;
          margin: 4px 0;
        }
        .briefing-big-num__value--red { color: #e57373; }
        .briefing-big-num__value--green { color: #81c784; }
        .briefing-big-num__sub {
          font-size: 0.8rem;
          color: rgba(240,235,224,0.4);
        }
        .briefing-big-num__arrow {
          font-size: 2rem;
          color: #c8943e;
          font-weight: 700;
        }

        /* Table */
        .briefing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 0.9rem;
        }
        .briefing-table thead th {
          background: #c8943e;
          color: #1a1816;
          font-weight: 700;
          padding: 10px 14px;
          text-align: left;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .briefing-table thead th:first-child { border-radius: 8px 0 0 0; }
        .briefing-table thead th:last-child { border-radius: 0 8px 0 0; }
        .briefing-table tbody td {
          padding: 10px 14px;
          border-bottom: 1px solid rgba(240,235,224,0.06);
          color: rgba(240,235,224,0.7);
        }
        .briefing-table tbody tr:nth-child(even) td {
          background: rgba(200,148,62,0.04);
        }
        .briefing-table tbody td strong { color: #f0ebe0; }
        .briefing-table__total td {
          font-weight: 700;
          color: #f0ebe0 !important;
          border-top: 2px solid #c8943e;
          background: rgba(200,148,62,0.08) !important;
        }

        /* Tiers */
        .briefing-tiers {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 14px;
          margin: 20px 0;
        }
        .briefing-tier {
          background: #1e1b18;
          border: 1px solid rgba(200,148,62,0.15);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: border-color 0.2s;
        }
        .briefing-tier:hover { border-color: #c8943e; }
        .briefing-tier__name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.1rem;
          color: #f0ebe0;
        }
        .briefing-tier__price {
          font-size: 1.4rem;
          font-weight: 700;
          color: #c8943e;
          margin: 4px 0;
        }
        .briefing-tier__detail {
          font-size: 0.8rem;
          color: rgba(240,235,224,0.5);
          line-height: 1.5;
        }

        /* Workflow */
        .briefing-workflow {
          margin: 16px 0;
        }
        .briefing-workflow__item {
          display: flex;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(240,235,224,0.06);
          align-items: baseline;
        }
        .briefing-workflow__time {
          min-width: 130px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #f0ebe0;
          flex-shrink: 0;
        }
        .briefing-workflow__task {
          font-size: 0.9rem;
          color: rgba(240,235,224,0.65);
        }

        /* Delta Dawn */
        .briefing-dawn-box {
          padding: 24px;
          background: rgba(200,148,62,0.06);
          border: 1px solid rgba(200,148,62,0.15);
          border-radius: 12px;
          margin: 16px 0;
        }
        .briefing-dawn-prompts {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .briefing-dawn-prompt {
          background: rgba(200,148,62,0.08);
          border: 1px solid rgba(200,148,62,0.2);
          color: #c8943e;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 20px;
        }

        /* CTA */
        .briefing-cta {
          padding: 32px;
          background: linear-gradient(135deg, rgba(200,148,62,0.1) 0%, rgba(200,148,62,0.04) 100%);
          border: 2px solid #c8943e;
          border-radius: 16px;
        }
        .briefing-cta-btn {
          display: inline-block;
          padding: 14px 28px;
          background: #c8943e;
          color: #1a1816;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .briefing-cta-btn:hover { background: #d4a24e; }

        /* Quote */
        .briefing-quote {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.4rem;
          color: #c8943e;
          text-align: center;
          padding: 24px 0;
          line-height: 1.5;
          font-weight: 700;
        }

        /* Footer */
        .briefing-footer {
          max-width: 680px;
          margin: 64px auto 0;
          padding: 24px;
          border-top: 1px solid rgba(200,148,62,0.15);
          text-align: center;
          font-size: 0.8rem;
          color: rgba(240,235,224,0.25);
        }
      `}</style>
    </div>
  );
}
