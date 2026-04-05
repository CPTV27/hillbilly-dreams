// apps/web/app/economics/page.tsx
// Outsider Economics homepage — outsidereconomics.com
// Resource center + community hub for independent economic systems

import type { Metadata } from 'next';
import Image from 'next/image';
import { IllustrationDivider } from '@bigmuddy/ui';
const homeDescription = 'Your community is the asset. Organization is the value multiplier. A field-tested playbook for keeping your money local, coordinating your skills, and building an economy that works for the people who live in it.';
export const metadata: Metadata = {
  title: 'Outsider Economics — A Field Manual for Independent Economic Systems',
  description: homeDescription,
  openGraph: {
    type: 'website',
    title: 'Outsider Economics — A Field Manual for Independent Economic Systems',
    description: homeDescription,
    url: 'https://outsidereconomics.com',
    siteName: 'Outsider Economics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outsider Economics — A Field Manual for Independent Economic Systems',
    description: homeDescription,
  },
  alternates: { canonical: 'https://outsidereconomics.com' },
};

const GCS_ILLUS = 'https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook';

const CORE_CONCEPTS = [
  {
    num: '01',
    title: 'Community Is the Currency',
    href: 'https://outsidereconomics.com/philosophy/people-are-the-currency',
    desc: 'Get your community together. Real skills — plumbing, bookkeeping, carpentry, code — traded between people who trust each other. No bank. No grant. No permission required. The value stays where the work happens.',
    image: `${GCS_ILLUS}/08-folk-art/marketplace.webp`,
  },
  {
    num: '02',
    title: 'The Extraction Trap',
    href: 'https://outsidereconomics.com/philosophy/the-extraction-trap',
    desc: 'You buy coffee at the chain. That dollar hits a server in Seattle by lunch. Multiply that by everything you buy and most of what you earn leaves your zip code before the month is out. You\'re not poor. You\'re being drained.',
    image: `${GCS_ILLUS}/01-woodcut/main-street-storefront.webp`,
  },
  {
    num: '03',
    title: 'The Coordination Premium',
    href: 'https://outsidereconomics.com/philosophy/coordination-not-scale',
    desc: 'A plumber alone bills one rate. A plumber who knows an electrician, a carpenter, and a permit expediter bills renovations. Same people. Same hours. The value multiplies. Coordination is the lever nobody pulls.',
    image: `${GCS_ILLUS}/09-blueprint/data-flow.webp`,
  },
  {
    num: '04',
    title: 'Time as Currency',
    href: 'https://outsidereconomics.com/toolkit/building-without-banks',
    desc: 'Here\'s what kept bugging me: money leaves. Always. But your neighbor\'s Saturday? That stays. Your hour of welding doesn\'t get wired to a hedge fund. It can\'t leave town. That\'s not a limitation — that\'s a feature.',
    image: `${GCS_ILLUS}/10-watercolor/cotton-field.webp`,
  },
  {
    num: '05',
    title: 'Federation over Scale',
    href: 'https://outsidereconomics.com/philosophy/the-federation-effect',
    desc: 'Every org that outgrows trust starts acting like the thing it replaced. So don\'t scale. Federate. Keep each community human-sized. Wire them together. Let the network do what networks do.',
    image: `${GCS_ILLUS}/12-cartographic/touring-circuit.webp`,
  },
  {
    num: '06',
    title: 'The Task Board',
    href: 'https://outsidereconomics.com/toolkit/the-task-board',
    desc: 'Not an app. Not a startup. Just a board — physical or digital — that shows who can do what and who needs what done. The simplest piece of infrastructure that turns a neighborhood into an economy. Most towns are one whiteboard away from not being broke.',
    image: `${GCS_ILLUS}/04-chalkboard/tonights-lineup.webp`,
  },
];

const CURRENT_TRENDS = [
  { label: 'AI Is Eating Jobs', desc: 'ChatGPT can write your marketing copy but it can\'t fix your furnace. The skills that survive automation are local, physical, and coordinated. Build that network now.' },
  { label: 'Your Bank Got Bought', desc: 'Third acquisition in five years. New fees, new app, same extractive bullshit. Credit unions still exist. Self-custody still works. Act accordingly.' },
  { label: 'Programmable Money', desc: 'They\'re building currency with an off switch. Imagine your savings account doesn\'t work on Tuesdays, or outside city limits, or if you said the wrong thing online. That\'s CBDC.' },
  { label: 'The 30% Skim', desc: 'DoorDash, Uber, Airbnb — every platform takes a third of your labor and calls it a "service fee." A local coordination board does the same job for zero. Nobody built one yet because nobody did the math.' },
  { label: 'The Ship Got Stuck Again', desc: 'Global supply chains are a magic trick that works until it doesn\'t. The guy down the road with a welding shop and a vegetable garden? He\'s the supply chain that never breaks.' },
  { label: 'Nobody Can Afford a House', desc: 'A developer charges six figures to frame a house a coordinated crew could build in two weekends. You didn\'t forget how to build. You forgot how to build together.' },
];

export default function EconomicsHomepage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="econ-hero" style={{ backgroundImage: 'url(/images/processed/big-muddy/natchez-night-1034.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="econ-hero__bg" aria-hidden="true" />
        <div className="econ-hero__content">
          <div className="econ-hero__eyebrow">
            <span className="econ-hero__rule" />
            <span>A Field Manual</span>
            <span className="econ-hero__rule" />
          </div>
          <h1 className="econ-hero__title">
            Outsider
            <br />
            <em>Economics</em>
          </h1>
          <p className="econ-hero__sub">
            Your community is the asset. Organization is the value multiplier.
            <br />
            This book explains how.
          </p>
          <div className="econ-hero__ctas">
            <a href="https://outsidereconomics.com/philosophy/what-is-outsider-economics" className="btn btn--primary">
              Read the Philosophy
            </a>
            <a href="https://outsidereconomics.com/toolkit/the-task-board" className="btn btn--ghost">
              See the Toolkit
            </a>
          </div>
        </div>
      </section>

      <IllustrationDivider variant="river" />

      {/* ── Core Concepts ── */}
      <section className="econ-concepts">
        <div className="section-container">
          <div className="section-label">The Framework</div>
          <h2 className="section-title">The Math Nobody Ran</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Two years of arithmetic your city council never ran.
            Six ideas. That&apos;s all it takes to see the rigged game — and the exit.
          </p>
          <div className="econ-concepts__list">
            {CORE_CONCEPTS.map((c, i) => (
              <a
                key={c.num}
                href={c.href}
                className={`concept-row ${i % 2 === 1 ? 'concept-row--reverse' : ''}`}
              >
                <div className="concept-row__image" style={{ backgroundImage: `url(${c.image})` }} />
                <div className="concept-row__text">
                  <span className="concept-row__num">{c.num}</span>
                  <h3 className="concept-row__title">{c.title}</h3>
                  <p className="concept-row__desc">{c.desc}</p>
                  <span className="concept-row__link">Read more &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ── */}
      <section className="econ-case-studies-cta" style={{ position: 'relative', zIndex: 3, background: 'var(--surface)' }}>
        <div className="section-container econ-case-studies-cta__inner">
          <div className="section-label econ-case-studies-cta__label">Field notes</div>
          <h2 className="section-title econ-case-studies-cta__title">Case studies</h2>
          <p className="section-desc econ-case-studies-cta__desc">
            Field reports from real builds — media nodes, directories, mesh edges, hospitality stacks. Same voice as the
            manual; heavier on the receipts.
          </p>
          <a href="/case-studies" className="btn btn--ghost econ-case-studies-cta__btn">
            Browse case studies &rarr;
          </a>
        </div>
      </section>

      {/* ── The Thesis ── */}
      <section className="econ-thesis" style={{ position: 'relative', zIndex: 3, background: 'var(--bg)' }}>
        <div className="section-container">
          <div className="econ-thesis__inner">
            <div className="econ-thesis__text">
              <div className="section-label">The Thesis</div>
              <h2 className="section-title">Stop Asking. Start Building.</h2>
              <p className="section-desc">
                I grew up in the Delta. Nobody was coming to fix the roads, open a grocery store,
                or run the internet to our side of the county. So people built their own.
                Not activists. Just practical. This project is that same energy — with better math.
              </p>
              <div className="econ-thesis__pillars">
                {[
                  { name: 'Route Around', desc: 'The system isn\'t going to fix itself. Build a new one next to it and let people choose.' },
                  { name: 'Network Math', desc: 'Two people trading skills have one connection. Five have ten. Ten have forty-five. The value of a network grows faster than the number of people in it. That\'s just how math works.' },
                  { name: 'Break-Proof', desc: 'One income stream is fragile. One employer is a single point of failure. Stack skills, stack streams, and the next recession is just weather.' },
                  { name: 'Keep It Local', desc: 'Every dollar that circulates inside your community three times before leaving does the work of three dollars. Stop the bleed, multiply the value.' },
                ].map((p) => (
                  <div key={p.name} className="pillar">
                    <h4 className="pillar__name">{p.name}</h4>
                    <p className="pillar__desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="econ-thesis__visual" aria-hidden="true">
              <div className="econ-thesis__network">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="network-node"
                    style={{
                      top: `${15 + Math.sin(i * 0.52) * 35 + 35}%`,
                      left: `${15 + Math.cos(i * 0.52) * 35 + 35}%`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <IllustrationDivider variant="cotton" />

      {/* ── Current Trends ── */}
      <section className="econ-trends">
        <div className="section-container">
          <div className="section-label">Why Now</div>
          <h2 className="section-title">Read the Room</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Things happening right now that should make you very uncomfortable
            if your entire economic life depends on systems you don&apos;t control.
          </p>
          <div className="econ-trends__grid">
            {CURRENT_TRENDS.map((t) => (
              <div key={t.label} className="trend-card">
                <h3 className="trend-card__label">{t.label}</h3>
                <p className="trend-card__desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community CTA ── */}
      <section className="econ-community">
        <div className="section-container">
          <div className="econ-community__inner">
            <div className="section-label">Connect</div>
            <h2 className="section-title">You Already Know Your Community</h2>
            <p className="section-desc" style={{ maxWidth: 560 }}>
              You don&apos;t need to recruit strangers. You need the people you already
              borrow a ladder from, the ones who text you when the power goes out.
              Could be two neighbors. Could be fifty. Get your community together.
              Swap some hours. That&apos;s not a revolution — it&apos;s a
              Tuesday.
            </p>
            <div className="econ-community__actions">
              <a href="https://outsidereconomics.com/resources/grants-and-funding" className="btn btn--primary">
                Deep South Resources
              </a>
              <a
                href="https://outsidereconomics.com/toolkit/the-directory"
                className="btn btn--ghost"
              >
                Build a Directory
              </a>
            </div>
          </div>
        </div>
      </section>

      <IllustrationDivider variant="magnolia" />

      {/* ── Substack / Newsletter ── */}
      <section className="econ-substack">
        <div className="section-container">
          <div className="econ-substack__inner">
            <div className="section-label">The Dispatch</div>
            <h2 className="section-title">The Weekly Dispatch</h2>
            <p className="section-desc" style={{ maxWidth: 560 }}>
              Once a week I break down something happening in the economy, run the
              numbers on it, and tell you what it actually means for people who build
              things. No paywall. If it&apos;s useful, throw a few bucks at it. If not,
              keep reading anyway.
            </p>
            <div className="econ-substack__pricing">
              <span className="econ-substack__free">Free</span>
              <span className="econ-substack__sep">/</span>
              <span className="econ-substack__paid">Pay what you want</span>
            </div>
            <div className="econ-community__actions">
              <a
                href="https://outsidereconomics.substack.com"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe on Substack
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .econ-hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
        }
        .econ-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg, rgba(15, 15, 13, 0.75) 0%, rgba(15, 15, 13, 0.55) 50%, rgba(15, 15, 13, 0.85) 100%),
            radial-gradient(ellipse 60% 40% at 50% 20%, rgba(181, 76, 76, 0.06) 0%, transparent 60%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 120px,
              rgba(181, 76, 76, 0.03) 120px,
              rgba(181, 76, 76, 0.03) 121px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 120px,
              rgba(181, 76, 76, 0.02) 120px,
              rgba(181, 76, 76, 0.02) 121px
            );
        }
        .econ-hero__content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: var(--space-24) var(--space-6);
          text-align: center;
        }
        .econ-hero__eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-8);
        }
        .econ-hero__rule {
          display: block;
          width: 40px;
          height: 1px;
          background: var(--accent);
          opacity: 0.5;
        }
        .econ-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-6);
        }
        .econ-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .econ-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 560px;
          margin: 0 auto var(--space-10);
        }
        .econ-hero__ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          margin-bottom: var(--space-12);
        }
        .econ-hero__tagline {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-style: italic;
          color: var(--text-muted);
          max-width: 500px;
          margin: 0 auto;
          line-height: var(--leading-normal);
          opacity: 0.7;
        }

        /* ── Shared Section Styles ── */
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

        /* ── Concepts — Alternating Rows ── */
        .econ-concepts {
          position: relative;
          z-index: 3;
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .econ-concepts__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .concept-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 360px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background: var(--surface-2);
          border: 1px solid var(--border);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .concept-row:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-glow);
        }
        .concept-row--reverse {
          direction: rtl;
        }
        .concept-row--reverse > * {
          direction: ltr;
        }
        .concept-row__image {
          background-size: cover;
          background-position: center;
          min-height: 280px;
        }
        .concept-row__text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-10) var(--space-8);
          gap: var(--space-3);
        }
        .concept-row__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.5;
          letter-spacing: 0.1em;
        }
        .concept-row__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          margin: 0;
          line-height: var(--leading-tight);
        }
        .concept-row__desc {
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }
        .concept-row__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 0.03em;
          margin-top: var(--space-2);
        }
        @media (max-width: 768px) {
          .concept-row {
            grid-template-columns: 1fr;
          }
          .concept-row--reverse {
            direction: ltr;
          }
          .concept-row__image {
            min-height: 200px;
          }
          .concept-row__text {
            padding: var(--space-6);
          }
        }

        /* ── Thesis Section ── */
        .econ-thesis__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: center;
        }
        @media (min-width: 768px) {
          .econ-thesis__inner {
            grid-template-columns: 1fr 1fr;
          }
        }
        .econ-thesis__pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }
        .pillar {
          padding: var(--space-4);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
        }
        .pillar__name {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--accent);
          margin: 0 0 var(--space-2);
        }
        .pillar__desc {
          font-size: var(--text-xs);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }
        .econ-thesis__visual {
          display: none;
        }
        @media (min-width: 768px) {
          .econ-thesis__visual {
            display: block;
          }
        }
        .econ-thesis__network {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface);
          overflow: hidden;
        }
        .network-node {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.6;
          animation: nodePulse 3s ease-in-out infinite;
        }
        @keyframes nodePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }

        /* ── Video Break ── */
        .econ-video-break {
          background: var(--bg);
          border-top: 1px solid var(--border);
        }
        .econ-video-container {
          display: flex;
          justify-content: center;
        }

        /* ── Case studies CTA (gold band — matches case study routes) ── */
        .econ-case-studies-cta {
          --oe-gold: #c8943e;
          --oe-gold-border: rgba(200, 148, 62, 0.45);
        }
        .econ-case-studies-cta__inner {
          padding-top: var(--space-12);
          padding-bottom: var(--space-12);
        }
        .econ-case-studies-cta__label {
          color: var(--oe-gold);
          margin-bottom: var(--space-3);
        }
        .econ-case-studies-cta__title {
          margin-bottom: var(--space-4);
        }
        .econ-case-studies-cta__desc {
          max-width: 560px;
          margin-bottom: var(--space-6);
        }
        .econ-case-studies-cta__btn {
          border-color: var(--oe-gold-border);
          color: var(--oe-gold);
        }
        .econ-case-studies-cta__btn:hover {
          border-color: var(--oe-gold);
          background: rgba(200, 148, 62, 0.08);
        }

        /* ── Trends ── */
        .econ-trends {
          position: relative;
          z-index: 3;
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .econ-trends__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-4);
        }
        @media (min-width: 640px) {
          .econ-trends__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .econ-trends__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .trend-card {
          padding: var(--space-5);
          border-left: 2px solid var(--accent);
          background: var(--surface-2);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .trend-card__label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-2);
        }
        .trend-card__desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── Community CTA ── */
        .econ-community {
          position: relative;
          z-index: 3;
          background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%);
        }
        .econ-community__inner {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .econ-community__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        /* ── Substack ── */
        .econ-substack {
          position: relative;
          z-index: 3;
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .econ-substack__inner {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .econ-substack__pricing {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          margin-bottom: var(--space-8);
          font-family: var(--font-mono);
          font-size: var(--text-sm);
        }
        .econ-substack__free {
          color: var(--accent);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .econ-substack__sep {
          color: var(--text-disabled);
        }
        .econ-substack__paid {
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
        }

        /* ── Buttons ── */
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
      `}</style>
    </>
  );
}
