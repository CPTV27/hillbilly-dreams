// apps/web/app/economics/rise-up/page.tsx
// Rise Up — free coaching program for underserved communities

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup } from '@bigmuddy/ui';

const description =
  'Rise Up pairs Outsider Economics with hands-on coaching for communities that need a hand up — free training, real skills, a camera rolling, and a network that stays.';

export const metadata: Metadata = {
  title: 'Rise Up',
  description,
  openGraph: {
    type: 'website',
    title: 'Rise Up Program | Outsider Economics',
    description,
    url: 'https://outsidereconomics.com/rise-up',
    siteName: 'Outsider Economics',
  },
  twitter: { card: 'summary_large_image', title: 'Rise Up Program | Outsider Economics', description },
  alternates: { canonical: 'https://outsidereconomics.com/rise-up' },
};

const PHASES = [
  {
    num: '01',
    title: 'Apply',
    desc: 'Your community tells us what it needs. A town, a neighborhood, a corridor of shops that used to be something. We look for willingness, not polish. If twenty people will show up, we show up.',
  },
  {
    num: '02',
    title: 'Train',
    desc: 'We bring the playbook — coordination math, skill mapping, the $450K framework. Free. No strings. Our production partners run workshops on camera, mic, and storytelling basics. You learn to document what you\'re building.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Your community runs the six-step process from the book: name your 20, map the skills, build the board, start trading, run the numbers, federate. We coach. You execute. The camera rolls.',
  },
  {
    num: '04',
    title: 'Film',
    desc: 'You film yourselves doing the work. Not polished content — real footage of real people figuring it out. That footage becomes your brand voice. It becomes proof that the math works. It becomes the story other communities need to see.',
  },
  {
    num: '05',
    title: 'Launch',
    desc: 'Your people, your skills, your businesses go into the network directory. Graduates are findable. Businesses are supportable. Skills are marketable. You\'re not an island anymore — you\'re a node in a federation that trades, refers, and shows up.',
  },
];

const PARTNERS = [
  {
    name: 'StudioC.video',
    url: 'https://studioc.video',
    role: 'Video Production',
    desc: 'Full-service video production for the corridor. StudioC handles the heavy lifting — training communities on camera basics, providing production frameworks, and turning raw footage into stories that move people. They make sure every Rise Up community has the tools to document their own transformation.',
  },
  {
    name: 'Tuthill Design',
    url: 'https://tuthilldesign.com',
    role: 'Brand & Design',
    desc: 'Brand strategy and visual identity for communities that never had either. Tuthill Design helps Rise Up graduates establish a visual language — logos, signage, digital presence — so the businesses and networks they\'re building look as serious as they are. Because perception is the first economy.',
  },
];

export default function RiseUpPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="rise-hero">
        <Image
          src="/images/corridor/cafe-sidewalk-natchez.webp"
          alt="Sidewalk cafe in a small town — the kind of place Rise Up helps build"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="rise-hero__overlay" />
        <div className="rise-hero__content">
          <div className="section-label">Outsider Economics</div>
          <h1 className="rise-hero__title">
            Rise<br />
            <em>Up</em>
          </h1>
          <p className="rise-hero__sub">
            Free coaching. Real skills. A camera rolling. And a network that stays
            long after we leave. For communities that need a hand up, not a handout.
          </p>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="rise-problem">
        <div className="section-container">
          <div className="rise-problem__inner">
            <div className="rise-problem__text">
              <div className="section-label">The Problem</div>
              <h2 className="section-title">The Money Leaves</h2>
              <p className="section-desc">
                In most underserved communities, money flows in and flows right back out.
                Wages get spent at chains. Rent goes to out-of-state landlords. Local skills
                go unrecognized, untapped, uncoordinated. The extraction rate in some corridor
                towns runs north of 80%.
              </p>
              <p className="section-desc">
                Rise Up doesn&apos;t bring money in. It stops money from leaving. The math
                is simple: twenty people coordinating their existing skills can generate
                $450,000 in local value per year. That&apos;s not theory — that&apos;s
                Metcalfe&apos;s Law applied to a neighborhood.
              </p>
            </div>
            <div className="rise-problem__stats">
              <div className="rise-stat">
                <div className="rise-stat__number">80%</div>
                <div className="rise-stat__label">of every dollar leaves underserved communities within 48 hours</div>
              </div>
              <div className="rise-stat">
                <div className="rise-stat__number">$450K</div>
                <div className="rise-stat__label">annual value unlocked by 20 coordinated people</div>
              </div>
              <div className="rise-stat">
                <div className="rise-stat__number">$0</div>
                <div className="rise-stat__label">cost to participate in Rise Up</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="rise-how">
        <div className="section-container">
          <div className="section-label">The Process</div>
          <h2 className="section-title">How Rise Up Works</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            We bring the framework. You bring the people. The camera captures the whole thing —
            because the best way to establish your brand voice is to film yourself building
            something real.
          </p>
          <div className="rise-phases">
            {PHASES.map((p) => (
              <div key={p.num} className="rise-phase">
                <div className="rise-phase__num">{p.num}</div>
                <div className="rise-phase__content">
                  <h3 className="rise-phase__title">{p.title}</h3>
                  <p className="rise-phase__desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="rise-get">
        <div className="section-container">
          <div className="rise-get__inner">
            <div className="section-label">The Exchange</div>
            <h2 className="section-title">What You Get</h2>
            <p className="section-desc" style={{ maxWidth: 560 }}>
              Rise Up is free. Completely. Here&apos;s what&apos;s included — and what we ask in return.
            </p>
          </div>
          <div className="rise-get__grid">
            <div className="rise-get__card">
              <h3>You Get</h3>
              <ul>
                <li>Full Outsider Economics coaching — the book, the math, the frameworks</li>
                <li>Video and storytelling training from our production partners</li>
                <li>Brand voice development — learn to tell your own story</li>
                <li>Listing in the network directory — your people, skills, and businesses become findable</li>
                <li>Ongoing federation access — trade, refer, and coordinate with other Rise Up communities</li>
              </ul>
            </div>
            <div className="rise-get__card">
              <h3>We Ask</h3>
              <ul>
                <li>Film the process — raw, real footage of your community doing the work</li>
                <li>Show up — twenty people, committed to at least three months of building</li>
                <li>Run the math — actually track the value your network generates</li>
                <li>Stay in the network — when the next town asks &ldquo;does this work?&rdquo; you&apos;re the proof</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Production Partners ── */}
      <section className="rise-partners">
        <div className="section-container">
          <div className="section-label">Production Partners</div>
          <h2 className="section-title">Who Makes It Happen</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Rise Up works because of the people behind it. Our production partners bring the
            skills that turn a community workshop into a documented transformation.
          </p>
          <div className="rise-partners__grid">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rise-partner">
                <div className="rise-partner__role">{p.role}</div>
                <h3 className="rise-partner__name">
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                </h3>
                <p className="rise-partner__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Directory ── */}
      <section className="rise-directory">
        <div className="section-container">
          <div className="rise-dir__inner">
            <div className="section-label">After Rise Up</div>
            <h2 className="section-title">The Network Directory</h2>
            <p className="section-desc" style={{ maxWidth: 560 }}>
              Every graduate, every business, every skill goes into the directory. Not a
              database — a living network. Find people who&apos;ve been through the program.
              Support businesses that keep money local. Hire skills from communities that
              trained themselves.
            </p>
            <p className="section-desc" style={{ maxWidth: 560, marginTop: 'calc(-1 * var(--space-6))' }}>
              This is how you grow without rotting. Sovereign pods, federated at the edges,
              visible to everyone in the network. The directory is the proof that coordination
              beats extraction — and it&apos;s searchable.
            </p>
            <a
              href="/community"
              className="btn btn--primary"
            >
              Learn About the Network
            </a>
          </div>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className="rise-apply">
        <div className="section-container">
          <div className="rise-apply__inner">
            <h2 className="section-title">Bring Rise Up to Your Community</h2>
            <p className="section-desc" style={{ maxWidth: 480, margin: '0 auto var(--space-6)' }}>
              If you&apos;ve got twenty people willing to show up, we&apos;ve got the playbook.
              No cost. No catch. Just the math, the training, and a camera.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <a
                href="mailto:riseup@outsidereconomics.com"
                className="btn btn--primary"
              >
                Apply for Rise Up
              </a>
              <a
                href="https://www.amazon.com/dp/B0F2HZBZFZ"
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the Book First
              </a>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .rise-hero {
          position: relative;
          min-height: 55vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .rise-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.3) 0%, rgba(15, 15, 13, 0.88) 100%);
          z-index: 1;
        }
        .rise-hero__content {
          position: relative;
          z-index: 2;
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6) var(--space-12);
          width: 100%;
        }
        .rise-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .rise-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .rise-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          max-width: 560px;
          margin: 0;
        }

        /* ── Problem ── */
        .rise-problem {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .rise-problem__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
        }
        @media (min-width: 768px) {
          .rise-problem__inner {
            grid-template-columns: 1.2fr 0.8fr;
            align-items: start;
          }
        }
        .rise-problem__stats {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .rise-stat {
          padding: var(--space-6);
          border-left: 3px solid var(--accent);
          background: var(--surface-2);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .rise-stat__number {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          margin-bottom: var(--space-2);
        }
        .rise-stat__label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }

        /* ── How It Works ── */
        .rise-how {
          background: var(--bg);
        }
        .rise-phases {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .rise-phase {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--space-5);
          padding: var(--space-6);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface);
          transition: border-color var(--duration-normal) var(--ease-default);
        }
        .rise-phase:hover {
          border-color: var(--border-strong);
        }
        .rise-phase__num {
          font-family: var(--font-mono);
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--accent);
          opacity: 0.3;
          line-height: 1;
        }
        .rise-phase__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-2);
        }
        .rise-phase__desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
          max-width: 600px;
        }

        /* ── What You Get ── */
        .rise-get {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .rise-get__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .rise-get__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .rise-get__card {
          padding: var(--space-8);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface-2);
        }
        .rise-get__card h3 {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-5);
        }
        .rise-get__card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .rise-get__card li {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          padding-left: var(--space-5);
          position: relative;
        }
        .rise-get__card li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
        }

        /* ── Partners ── */
        .rise-partners {
          background: var(--bg);
        }
        .rise-partners__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .rise-partners__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .rise-partner {
          padding: var(--space-8);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface);
          transition: border-color var(--duration-normal) var(--ease-default);
        }
        .rise-partner:hover {
          border-color: var(--accent);
        }
        .rise-partner__role {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }
        .rise-partner__name {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-4);
        }
        .rise-partner__name a {
          color: inherit;
          text-decoration: none;
          transition: color var(--duration-normal) var(--ease-default);
        }
        .rise-partner__name a:hover {
          color: var(--accent);
        }
        .rise-partner__desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── Directory ── */
        .rise-directory {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .rise-dir__inner {
          max-width: 720px;
        }

        /* ── Apply ── */
        .rise-apply {
          background: var(--bg);
        }
        .rise-apply__inner {
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
          .rise-phase {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
