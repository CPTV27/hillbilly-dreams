// apps/web/app/economics/the-math/page.tsx
// The Math — every equation, every multiplier, one page

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'The Math',
  description:
    'Every equation behind Outsider Economics. Extraction rates, coordination multipliers, time-currency conversions, and network scaling formulas.',
};

const EQUATIONS = [
  {
    id: 'extraction',
    label: 'Extraction Rate',
    title: 'The Extraction Equation',
    formula: 'E = 1 - (L / G)',
    variables: [
      { sym: 'E', def: 'Extraction rate (what you\'re losing)' },
      { sym: 'L', def: 'Dollars spent that stay local' },
      { sym: 'G', def: 'Gross dollars earned in the community' },
    ],
    example: 'If your town earns $10M/year and $1.8M stays local, your extraction rate is 82%. That means for every dollar earned, eighty-two cents leaves before it can do anything useful.',
    punchline: 'Most small towns run extraction rates between 75-90%. That\'s not an economy. That\'s a drain.',
  },
  {
    id: 'coordination',
    label: 'Coordination Premium',
    title: 'The Coordination Multiplier',
    formula: 'V = n(n-1) / 2',
    variables: [
      { sym: 'V', def: 'Value connections (Metcalfe\'s Law)' },
      { sym: 'n', def: 'Number of coordinated people' },
    ],
    example: '5 people who talk to each other = 10 connections. 20 people = 190 connections. The value doesn\'t add — it squares. A plumber alone bills $80/hr. That same plumber in a coordinated crew of five bills renovations at 4.5x the rate.',
    punchline: 'Coordination is the only free multiplier. It costs nothing except knowing who does what.',
  },
  {
    id: 'fourFifty',
    label: '$450K Formula',
    title: 'The $450,000 Secret',
    formula: 'MV = P x H x R x M',
    variables: [
      { sym: 'MV', def: 'Monthly value generated' },
      { sym: 'P', def: 'People in the network (20)' },
      { sym: 'H', def: 'Hours contributed per month (20)' },
      { sym: 'R', def: 'Average skill rate at market ($75/hr)' },
      { sym: 'M', def: 'Coordination multiplier (15x)' },
    ],
    example: '20 x 20 x $75 x 15 = $450,000/month. That\'s not theoretical. That\'s twenty people doing what your neighborhood already does informally — just tracked, coordinated, and multiplied.',
    punchline: 'Your town isn\'t resource-poor. It\'s coordination-poor. The money was there the whole time.',
  },
  {
    id: 'time',
    label: 'Time Currency',
    title: 'Time-Dollar Equivalence',
    formula: 'T = 1hr = 1hr',
    variables: [
      { sym: 'T', def: 'One hour of labor = one time credit' },
      { sym: '1hr plumbing', def: '= 1hr bookkeeping = 1hr carpentry' },
    ],
    example: 'An hour of welding and an hour of tax prep are worth the same in a time bank. Sounds unfair until you realize: the welder needs his taxes done, the accountant needs a gate welded, and neither of them has to involve a bank, a fee, or a dollar that leaves town.',
    punchline: 'Time can\'t be inflated. Can\'t be shorted. Can\'t be wired to a hedge fund. It stays local by definition.',
  },
  {
    id: 'federation',
    label: 'Federation Threshold',
    title: 'Dunbar\'s Limit & Federation',
    formula: 'N_eff = k x ~100',
    variables: [
      { sym: 'N_eff', def: 'Effective network size' },
      { sym: 'k', def: 'Number of federated pods' },
      { sym: '~100', def: 'Dunbar-adjacent stable group size' },
    ],
    example: 'One group of 100 can coordinate internally with low overhead. Two groups of 100, federated, give you 200 people with each pod staying human-sized. Ten pods = 1,000 people, zero bureaucracy, because each pod governs itself.',
    punchline: 'Scale kills coordination. Federation preserves it. Think Visa, not Walmart.',
  },
  {
    id: 'velocity',
    label: 'Local Velocity',
    title: 'The Velocity Multiplier',
    formula: 'Impact = D x V',
    variables: [
      { sym: 'Impact', def: 'Effective economic impact' },
      { sym: 'D', def: 'Dollar amount' },
      { sym: 'V', def: 'Number of local circulations before exit' },
    ],
    example: 'A dollar spent at the chain store circulates zero times locally — it\'s gone by lunch. That same dollar spent at a local shop, who pays a local supplier, who eats at a local restaurant? Three circulations. $1 x 3 = $3 of local impact.',
    punchline: 'You don\'t need more money. You need the same money to circulate more times before it leaves.',
  },
];

export default function TheMathPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="math-header">
        <div className="section-container">
          <div className="section-label">The Numbers</div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-hero)', marginBottom: 'var(--space-6)' }}>
            The Math
          </h1>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Every equation from the book, on one page. No narrative, no hand-holding.
            Just the formulas, the variables, and what happens when you plug in your own numbers.
          </p>
          <p className="section-desc" style={{ maxWidth: 640, marginTop: 'calc(-1 * var(--space-6))' }}>
            <em style={{ color: 'var(--accent)', opacity: 0.8 }}>
              Grab a calculator. Run these on your town.
            </em>
          </p>
        </div>
      </section>

      {/* ── Quick Reference ── */}
      <section className="math-quickref">
        <div className="section-container">
          <div className="section-label">Quick Reference</div>
          <h2 className="section-title">All Six Equations</h2>
          <div className="math-quickref__grid">
            {EQUATIONS.map((eq) => (
              <a key={eq.id} href={`#${eq.id}`} className="math-quickref__card">
                <span className="math-quickref__label">{eq.label}</span>
                <span className="math-quickref__formula">{eq.formula}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equations ── */}
      <section className="math-equations">
        <div className="section-container">
          {EQUATIONS.map((eq, i) => (
            <div key={eq.id} id={eq.id} className="math-eq">
              <div className="math-eq__header">
                <span className="math-eq__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="math-eq__label">{eq.label}</span>
              </div>
              <h3 className="math-eq__title">{eq.title}</h3>
              <div className="math-eq__formula-box">
                <code className="math-eq__formula">{eq.formula}</code>
              </div>
              <div className="math-eq__vars">
                <span className="math-eq__vars-label">Where:</span>
                {eq.variables.map((v) => (
                  <div key={v.sym} className="math-eq__var">
                    <code className="math-eq__var-sym">{v.sym}</code>
                    <span className="math-eq__var-def">{v.def}</span>
                  </div>
                ))}
              </div>
              <div className="math-eq__example">
                <span className="math-eq__example-label">Worked Example</span>
                <p className="math-eq__example-text">{eq.example}</p>
              </div>
              <p className="math-eq__punchline">{eq.punchline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Run Your Own ── */}
      <section className="math-diy">
        <div className="section-container">
          <div className="math-diy__inner">
            <div className="section-label">Your Turn</div>
            <h2 className="section-title">Run the Numbers on Your Town</h2>
            <p className="section-desc" style={{ maxWidth: 560, margin: '0 auto var(--space-6)' }}>
              Pick the extraction equation. Track your spending for a week. Divide local
              spend by total spend. Whatever number you get — that&apos;s how much of your
              labor is actually working for your community. The rest is working for someone
              else&apos;s shareholders.
            </p>
            <p className="section-desc" style={{ maxWidth: 560, margin: '0 auto var(--space-10)' }}>
              Then pick the $450K formula. Count twenty people you know with real skills.
              Plug them in. See what happens.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <a
                href="https://www.amazon.com/dp/B0F2HZBZFZ"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the Full Workbook
              </a>
              <a href="/community" className="btn btn--ghost">
                Find Your 20
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .math-header {
          background: var(--bg);
          padding-top: var(--space-16);
        }

        /* ── Quick Reference ── */
        .math-quickref {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .math-quickref__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
        }
        @media (min-width: 640px) {
          .math-quickref__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .math-quickref__card {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-4);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface-2);
          text-decoration: none;
          transition: border-color var(--duration-normal) var(--ease-default),
                      box-shadow var(--duration-normal) var(--ease-default);
        }
        .math-quickref__card:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .math-quickref__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
        }
        .math-quickref__formula {
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--accent);
        }

        /* ── Equations ── */
        .math-equations {
          background: var(--bg);
        }
        .math-eq {
          padding: var(--space-10) 0;
          border-bottom: 1px solid var(--border);
        }
        .math-eq:last-child {
          border-bottom: none;
        }
        .math-eq__header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        .math-eq__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.5;
        }
        .math-eq__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .math-eq__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-6);
        }
        .math-eq__formula-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6) var(--space-8);
          margin-bottom: var(--space-6);
          text-align: center;
        }
        .math-eq__formula {
          font-family: var(--font-mono);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
        }
        .math-eq__vars {
          margin-bottom: var(--space-6);
        }
        .math-eq__vars-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          display: block;
          margin-bottom: var(--space-3);
        }
        .math-eq__var {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          padding: var(--space-2) 0;
        }
        .math-eq__var-sym {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--accent);
          min-width: 80px;
        }
        .math-eq__var-def {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .math-eq__example {
          padding: var(--space-5);
          border-left: 2px solid var(--accent);
          background: var(--accent-muted);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin-bottom: var(--space-6);
        }
        .math-eq__example-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          display: block;
          margin-bottom: var(--space-2);
        }
        .math-eq__example-text {
          font-size: var(--text-sm);
          color: var(--text);
          line-height: var(--leading-normal);
          margin: 0;
          max-width: 600px;
        }
        .math-eq__punchline {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 600;
          font-style: italic;
          color: var(--text-muted);
          margin: 0;
          max-width: 600px;
        }

        /* ── DIY Section ── */
        .math-diy {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .math-diy__inner {
          text-align: center;
        }

        /* ── Shared ── */
        .section-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6);
        }
        .section-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-4);
        }
        .section-title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-4);
        }
        .section-desc {
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-10);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-6);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--duration-normal) var(--ease-default);
          cursor: pointer;
          border: 1px solid transparent;
        }
        .btn--primary {
          background: var(--accent);
          color: var(--bg);
        }
        .btn--primary:hover {
          background: var(--accent-hover);
          box-shadow: var(--shadow-glow);
        }
        .btn--ghost {
          background: transparent;
          color: var(--text);
          border-color: var(--border-strong);
        }
        .btn--ghost:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        @media (max-width: 480px) {
          .math-eq__formula {
            font-size: var(--text-xl);
          }
        }
      `}</style>
    </>
  );
}
