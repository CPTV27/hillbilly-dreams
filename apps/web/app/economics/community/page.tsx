// apps/web/app/economics/community/page.tsx
// Community — find your 20, start building

import type { Metadata } from 'next';
const description = 'You already know your 20. Find them, coordinate them, and start building an economy that doesn\'t leak.';
export const metadata: Metadata = {
  title: 'Community',
  description,
  openGraph: {
    type: 'website',
    title: 'Find Your 20 | Outsider Economics',
    description,
    url: 'https://outsidereconomics.com/community',
    siteName: 'Outsider Economics',
  },
  twitter: { card: 'summary_large_image', title: 'Find Your 20 | Outsider Economics', description },
  alternates: { canonical: 'https://outsidereconomics.com/community' },
};

const STEPS = [
  {
    num: '01',
    title: 'Name Your 20',
    desc: 'You already know them. The neighbor who fixed your fence. The friend who does your taxes. The cousin with the truck. Write down twenty people you\'d call if everything went sideways. That\'s your network. You just never mapped it.',
  },
  {
    num: '02',
    title: 'Map the Skills',
    desc: 'Go through the list. What can each person actually do? Not their job title — their real skills. The accountant who also welds. The teacher who grows a half-acre garden. The retired guy who can wire a house. Write it all down.',
  },
  {
    num: '03',
    title: 'Build the Board',
    desc: 'Corkboard at the coffee shop. Shared spreadsheet. Group text. Doesn\'t matter how. Make the skills visible. Who can do what, who needs what done. The entire coordination problem is a visibility problem, and you just solved it.',
  },
  {
    num: '04',
    title: 'Start Trading',
    desc: 'One hour equals one hour. The plumber fixes the bookkeeper\'s pipes, the bookkeeper does the plumber\'s taxes. No money changes hands. No dollar leaves town. No bank gets a cut. Just neighbors being useful to each other, on purpose.',
  },
  {
    num: '05',
    title: 'Run the Numbers',
    desc: 'After a month, count the hours traded. Multiply by average market rate. That\'s the value your network just generated without touching the extractive economy. Twenty people, twenty hours each, $75 average rate — you\'re looking at $30K before the coordination multiplier kicks in.',
  },
  {
    num: '06',
    title: 'Federate',
    desc: 'When it works (it will), the next town over wants in. Don\'t merge — federate. They run their own board, their own network. You connect at the edges for things that need scale. Two sovereign pods, wired together. That\'s how you grow without rotting.',
  },
];

const FAQ = [
  {
    q: 'Do I need to be in a small town for this to work?',
    a: 'No. This works anywhere people live near each other and have skills. It works better in places the mainstream economy forgot, because the gap between what exists and what\'s possible is wider. But a Brooklyn neighborhood is just as extractive as a Delta town — the coffee costs more, the extraction rate is the same.',
  },
  {
    q: 'Is this legal?',
    a: 'Time banking is explicitly recognized by the IRS. An hour for an hour isn\'t taxable barter. You\'re not starting a business — you\'re being a neighbor, systematically. If you start involving money, talk to an accountant. But the core framework runs on time, and time is yours.',
  },
  {
    q: 'What if I only know five people?',
    a: 'Start with five. Metcalfe\'s Law says five coordinated people generate ten connections. That\'s not nothing. Each of those five knows five more. You\'ll hit twenty faster than you think. The hard part isn\'t finding people — it\'s making the first ask.',
  },
  {
    q: 'How is this different from a commune?',
    a: 'Communes share everything and collapse under free-rider problems. This is a network of sovereign individuals who choose to coordinate. You keep your job, your house, your life. You just also have twenty people who\'ll show up when you need a deck built or a business plan reviewed. It\'s a neighborhood that works on purpose instead of by accident.',
  },
];

export default function CommunityPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="comm-header">
        <div className="section-container">
          <div className="section-label">Connect</div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-hero)', marginBottom: 'var(--space-6)' }}>
            Find Your 20
          </h1>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            The whole book comes down to this: twenty people who decide to be useful to each
            other on purpose. You probably already have them. You just haven&apos;t organized
            them yet.
          </p>
        </div>
      </section>

      {/* ── The Playbook ── */}
      <section className="comm-playbook">
        <div className="section-container">
          <div className="section-label">The Playbook</div>
          <h2 className="section-title">Six Steps to a Working Network</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            This isn&apos;t a ten-year plan. It&apos;s a Saturday afternoon. Most of these
            steps take less time than arguing about them.
          </p>
          <div className="comm-steps">
            {STEPS.map((s) => (
              <div key={s.num} className="comm-step">
                <div className="comm-step__num">{s.num}</div>
                <div className="comm-step__content">
                  <h3 className="comm-step__title">{s.title}</h3>
                  <p className="comm-step__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Ask ── */}
      <section className="comm-ask">
        <div className="section-container">
          <div className="comm-ask__inner">
            <div className="section-label">The Hard Part</div>
            <h2 className="section-title">Making the First Ask</h2>
            <p className="section-desc" style={{ maxWidth: 560 }}>
              The math works. The frameworks work. The only hard part is looking
              your neighbor in the eye and saying: &ldquo;I think we could help each
              other. Want to try?&rdquo;
            </p>
            <p className="section-desc" style={{ maxWidth: 560, marginTop: 'calc(-1 * var(--space-6))' }}>
              That&apos;s it. That&apos;s the whole barrier. Everything else is just
              keeping track of who does what and making sure the value stays local.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="comm-faq">
        <div className="section-container">
          <div className="section-label">Questions</div>
          <h2 className="section-title">Yeah, But...</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Every question you&apos;re about to ask. Already answered.
          </p>
          <div className="comm-faq__list">
            {FAQ.map((f, i) => (
              <div key={i} className="comm-faq__item">
                <h3 className="comm-faq__q">{f.q}</h3>
                <p className="comm-faq__a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join ── */}
      <section className="comm-join">
        <div className="section-container">
          <div className="comm-join__inner">
            <h2 className="section-title">Start Now</h2>
            <p className="section-desc" style={{ maxWidth: 480, margin: '0 auto var(--space-6)' }}>
              Read the book. Run the math on your town. Then text twenty people and
              ask them what they&apos;re good at. The economy you&apos;re building is
              one conversation away.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <a
                href="https://outsidereconomics.substack.com"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe to the Dispatch
              </a>
              <a
                href="https://www.amazon.com/dp/B0F2HZBZFZ"
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the Book
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .comm-header {
          background: var(--bg);
          padding-top: var(--space-16);
        }

        /* ── Playbook ── */
        .comm-playbook {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .comm-steps {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .comm-step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--space-5);
          padding: var(--space-6);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface-2);
          transition: border-color var(--duration-normal) var(--ease-default);
        }
        .comm-step:hover {
          border-color: var(--border-strong);
        }
        .comm-step__num {
          font-family: var(--font-mono);
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--accent);
          opacity: 0.3;
          line-height: 1;
        }
        .comm-step__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-2);
        }
        .comm-step__desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
          max-width: 600px;
        }

        /* ── The Ask ── */
        .comm-ask {
          background: var(--bg);
        }
        .comm-ask__inner {
          max-width: 720px;
        }

        /* ── FAQ ── */
        .comm-faq {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .comm-faq__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          max-width: 720px;
        }
        .comm-faq__item {
          padding: var(--space-6);
          border-left: 2px solid var(--accent);
          background: var(--surface-2);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .comm-faq__q {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-3);
        }
        .comm-faq__a {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── Join ── */
        .comm-join {
          background: var(--bg);
        }
        .comm-join__inner {
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

        @media (max-width: 640px) {
          .comm-step {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
