// apps/web/app/economics/page.tsx
// Outsider Economics homepage — outsidereconomics.com
// Resource center + community hub for independent economic systems

import type { Metadata } from 'next';
import Image from 'next/image';
const homeDescription = 'Eighty cents of every dollar earned in a Deep South community leaves within 48 hours. Not because people spend recklessly — because the infrastructure was built to move money out. Here is the math, the framework, and the field-tested playbook for stopping it.';
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

const CORE_CONCEPTS = [
  {
    num: '01',
    title: 'The $450,000 Secret',
    stat: '$450K/mo',
    href: '/field-manual/ch01-the-450000-secret',
    desc: 'Nobody ran the numbers. I did. Twenty people swapping twenty hours a month of real skills — plumbing, bookkeeping, carpentry, code — generates nearly half a million in value. Without a bank. Without a grant. Without asking permission.',
  },
  {
    num: '02',
    title: 'The Extraction Trap',
    stat: '82%',
    href: '/field-manual/02-the-extraction-trap',
    desc: 'You buy coffee at the chain. That dollar hits a server in Seattle by lunch. Multiply that by everything you buy and eighty-two cents of every dollar you earn leaves your zip code in a month. You\'re not poor. You\'re being drained.',
  },
  {
    num: '03',
    title: 'The Coordination Premium',
    stat: '4.5x',
    href: '/field-manual/03-the-coordination-premium',
    desc: 'A plumber alone bills $80 an hour. A plumber who knows an electrician, a carpenter, and a permit expediter? That crew bills renovations. Same people, same hours — four and a half times the value. Coordination is the multiplier nobody talks about.',
  },
  {
    num: '04',
    title: 'Time as Currency',
    stat: '∞',
    href: '/field-manual/04-time-is-the-only-currency-that-cant-leave-town',
    desc: 'Here\'s what kept bugging me: money leaves. Always. But your neighbor\'s Saturday? That stays. Your hour of welding doesn\'t get wired to a hedge fund. It can\'t leave town. That\'s not a limitation — that\'s a feature.',
  },
  {
    num: '05',
    title: 'Federation over Scale',
    stat: '~100',
    href: '/field-manual/07-federation-not-scale',
    desc: 'Every org that scales past a hundred people starts acting like the thing it was built to replace. So don\'t scale. Federate. Keep each pod human-sized, wire them together, and let the network do what networks do.',
  },
  {
    num: '06',
    title: 'The Task Board',
    stat: 'OS',
    href: '/field-manual/05-the-task-board',
    desc: 'Not an app. Not a startup. Just a board — physical or digital — that shows who can do what and who needs what done. The simplest piece of infrastructure that turns a neighborhood into an economy. Most towns are one whiteboard away from not being broke.',
  },
];

const CURRENT_TRENDS = [
  { label: 'AI Is Eating Jobs', desc: 'ChatGPT can write your marketing copy but it can\'t fix your furnace. The skills that survive automation are local, physical, and coordinated. Build that network now.' },
  { label: 'Your Bank Got Bought', desc: 'Third acquisition in five years. New fees, new app, same extractive bullshit. Credit unions still exist. Self-custody still works. Act accordingly.' },
  { label: 'Programmable Money', desc: 'They\'re building currency with an off switch. Imagine your savings account doesn\'t work on Tuesdays, or outside city limits, or if you said the wrong thing online. That\'s CBDC.' },
  { label: 'The 30% Skim', desc: 'DoorDash, Uber, Airbnb — every platform takes a third of your labor and calls it a "service fee." A local coordination board does the same job for zero. Nobody built one yet because nobody did the math.' },
  { label: 'The Ship Got Stuck Again', desc: 'Global supply chains are a magic trick that works until it doesn\'t. The guy down the road with a welding shop and a vegetable garden? He\'s the supply chain that never breaks.' },
  { label: 'Nobody Can Afford a House', desc: 'A developer charges $400K to frame a house that twenty coordinated people could build in two weekends. We didn\'t forget how to build — we forgot how to build together.' },
];

export default function EconomicsHomepage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="econ-hero">
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
            Eighty cents of every dollar earned here leaves within 48 hours.
            <br />
            Not bad luck. Not poverty. A machine designed to drain you.
            <br />
            Here&apos;s how it works — and how to stop it.
          </p>
          <div className="econ-hero__ctas">
            <a href="/field-manual" className="btn btn--primary">
              Read the Field Manual
            </a>
            <a href="/the-math" className="btn btn--ghost">
              See the Math
            </a>
          </div>
          <p className="econ-hero__tagline">
            &ldquo;You keep choosing convenience over freedom — that&apos;s the sign
            you&apos;re headed toward the system timeline.&rdquo;
          </p>
        </div>
      </section>

      {/* ── Core Concepts ── */}
      <section className="econ-concepts">
        <div className="section-container">
          <div className="section-label">The Framework</div>
          <h2 className="section-title">The Math Nobody Ran</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            I spent two years doing the arithmetic your city council never bothered with.
            Six numbers. That&apos;s all it takes to see the whole rigged game — and the way out of it.
          </p>
          <div className="econ-concepts__grid">
            {CORE_CONCEPTS.map((c) => (
              <a key={c.num} href={c.href} className="concept-card">
                <div className="concept-card__header">
                  <span className="concept-card__num">{c.num}</span>
                  <span className="concept-card__stat">{c.stat}</span>
                </div>
                <h3 className="concept-card__title">{c.title}</h3>
                <p className="concept-card__desc">{c.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Thesis ── */}
      <section className="econ-thesis">
        <div className="section-container">
          <div className="econ-thesis__inner">
            <div className="econ-thesis__text">
              <div className="section-label">The Thesis</div>
              <h2 className="section-title">Stop Asking. Start Building.</h2>
              <p className="section-desc">
                I grew up in the Delta. Nobody was coming to fix the roads, open a grocery store,
                or run the internet to our side of the county. So people built their own.
                Not because they were activists — because they were practical.
                This whole project is that same energy, with better math.
              </p>
              <div className="econ-thesis__pillars">
                {[
                  { name: 'Route Around', desc: 'The system isn\'t going to fix itself. Build a new one next to it and let people choose.' },
                  { name: 'Network Math', desc: 'Five people who talk to each other are worth twenty-three times five people who don\'t. That\'s not a metaphor — it\'s Metcalfe\'s Law.' },
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

      {/* ── Video Break ── */}
      <section className="econ-video-break">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <div className="section-label">Watch</div>
          <h2 className="section-title">The Extraction Trap — In 60 Seconds</h2>
          <p className="section-desc" style={{ maxWidth: 480, margin: '0 auto var(--space-8)' }}>
            82 cents of every dollar you make leaves your zip code in 30 days.
            Here&apos;s how the drain works.
          </p>
          <div className="econ-video-container">
            <video
              src="/video/extraction-trap.mp4"
              controls
              playsInline
              preload="metadata"
              poster="/images/ai-corridor/delta-cotton-field.webp"
              style={{
                maxWidth: 400,
                width: '100%',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
              }}
            >
              Your browser does not support the video element.
            </video>
          </div>
        </div>
      </section>

      {/* ── Current Trends ── */}
      <section className="econ-trends">
        <div className="section-container">
          <div className="section-label">Why Now</div>
          <h2 className="section-title">Read the Room</h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Six things happening right now that should make you very uncomfortable
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

      {/* ── More Videos ── */}
      <section className="econ-video-break">
        <div className="section-container">
          <div className="section-label">Watch</div>
          <h2 className="section-title">The Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', maxWidth: 700, margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
              <video
                src="/video/stat-450k.mp4"
                controls
                playsInline
                preload="metadata"
                style={{
                  maxWidth: 320,
                  width: '100%',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                }}
              >
                Video not supported.
              </video>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                The $450,000 Secret
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <video
                src="/video/extraction-stat.mp4"
                controls
                playsInline
                preload="metadata"
                style={{
                  maxWidth: 320,
                  width: '100%',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                }}
              >
                Video not supported.
              </video>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                The Extraction Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote Video ── */}
      <section className="econ-video-break" style={{ paddingTop: 0 }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <video
            src="/video/quote-broke.mp4"
            controls
            playsInline
            preload="metadata"
            style={{
              maxWidth: 360,
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
            }}
          >
            Video not supported.
          </video>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'var(--space-3)', fontStyle: 'italic' }}>
            &ldquo;You&apos;re not broke. You&apos;re being drained.&rdquo;
          </p>
        </div>
      </section>

      {/* ── Community CTA ── */}
      <section className="econ-community">
        <div className="section-container">
          <div className="econ-community__inner">
            <div className="section-label">Connect</div>
            <h2 className="section-title">You Already Know Your 20</h2>
            <p className="section-desc" style={{ maxWidth: 560 }}>
              You don&apos;t need to recruit strangers. You need the people you already
              borrow a ladder from, the ones who text you when the power goes out.
              Twenty people. Twenty hours a month. That&apos;s not a revolution — it&apos;s a
              Tuesday.
            </p>
            <div className="econ-community__actions">
              <a href="/community" className="btn btn--primary">
                Join the Network
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
          background:
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

        /* ── Concepts Grid ── */
        .econ-concepts {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .econ-concepts__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 640px) {
          .econ-concepts__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .econ-concepts__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .concept-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          transition: border-color var(--duration-normal) var(--ease-default),
                      box-shadow var(--duration-normal) var(--ease-default);
        }
        .concept-card:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-glow);
        }
        .concept-card__header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: var(--space-4);
        }
        .concept-card__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.6;
        }
        .concept-card__stat {
          font-family: var(--font-mono);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-tight);
        }
        .concept-card__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-3);
        }
        .concept-card__desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
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

        /* ── Trends ── */
        .econ-trends {
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
