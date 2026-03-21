// apps/web/app/hillbilly/page.tsx
// Hillbilly Dreams Inc. — Parent brand landing page
// Iron & Earth aesthetic. Corporate parent of the Big Muddy ecosystem.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hillbilly Dreams Inc.',
  description:
    'The holding company and creative engine behind Big Muddy Touring, Magazine, Radio, Records, BuyCurious Art, Outsider Economics, and the Deep South Directory.',
  openGraph: {
    title: 'Hillbilly Dreams Inc.',
    description: 'We build things that matter in places that get overlooked.',
    siteName: 'Hillbilly Dreams Inc.',
  },
};

const BRANDS = [
  {
    name: 'Big Muddy Touring',
    href: 'https://bigmuddytouring.com',
    tagline: "The Mississippi's Music Corridor",
    desc: 'Eighteen cities. Five states. Lodging, route planning, and a fleet that carries the corridor. The editorial center of the ecosystem.',
    icon: '🛤️',
  },
  {
    name: 'Big Muddy Magazine',
    href: 'https://bigmuddymagazine.com',
    tagline: 'Stories from the Southern Gothic heartland',
    desc: 'Long-form editorial, city guides, interviews, and photo essays from along the Mississippi corridor. The voice of the network.',
    icon: '📰',
  },
  {
    name: 'Big Muddy Radio',
    href: 'https://bigmuddyradio.com',
    tagline: 'The sound of the river',
    desc: 'Curated playlists, live sessions, and the American Parlor Songbook. The soundtrack that ties the corridor together.',
    icon: '📻',
  },
  {
    name: 'Big Muddy Records',
    href: 'https://bigmuddyrecords.net',
    tagline: 'Music from the Mississippi corridor',
    desc: 'Independent label. Artists own their masters. Always. Blues, soul, gospel, and the voices that carry the river.',
    icon: '🎵',
  },
  {
    name: 'BuyCurious Art',
    href: 'https://buycuriousart.com',
    tagline: 'Original art from the Mississippi corridor',
    desc: 'Photography, prints, and works from corridor artists. A sovereign marketplace where creators keep what they earn.',
    icon: '🎨',
  },
  {
    name: 'Outsider Economics',
    href: 'https://outsidereconomics.com',
    tagline: 'A Field Manual for Independent Economic Systems',
    desc: 'The economic philosophy. Coordination math, extraction analysis, and field-tested frameworks for building local economies.',
    icon: '📐',
  },
  {
    name: 'Deep South Directory',
    href: 'https://deepsouthdirectory.com',
    tagline: 'The independent business network',
    desc: 'Local business marketing powered by the Big Muddy network. Visibility for the shops, restaurants, and makers who define these towns.',
    icon: '📍',
  },
];

export default function HillbillyDreamsPage() {
  return (
    <div className="theme-hillbilly">
      {/* ── Hero ── */}
      <section className="hd-hero">
        <div className="hd-hero__bg-pattern" aria-hidden="true" />
        <div className="hd-hero__content">
          <div className="hd-hero__eyebrow">
            <span className="hd-hero__ornament">◆</span>
            <span>Natchez, Mississippi</span>
          </div>
          <h1 className="hd-hero__title">
            Hillbilly
            <br />
            <em>Dreams</em>
            <span className="hd-hero__inc">, Inc.</span>
          </h1>
          <p className="hd-hero__tagline">
            We build things that matter in places that get overlooked.
          </p>
          <p className="hd-hero__sub">
            Hillbilly Dreams is the parent company behind a network of independent
            media, music, hospitality, and art brands along the Mississippi corridor.
            Every brand is sovereign. Every dollar stays local.
          </p>
          <div className="hd-hero__ctas">
            <a href="#ecosystem" className="btn btn--primary">
              The Ecosystem
            </a>
            <a href="#story" className="btn btn--ghost">
              Read the Story
            </a>
          </div>
        </div>
        <div className="hd-hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <svg width="1" height="40" viewBox="0 0 1 40">
            <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ── Brand Ecosystem ── */}
      <section className="hd-ecosystem" id="ecosystem">
        <div className="section-container">
          <div className="section-label">The Ecosystem</div>
          <h2 className="section-title">Seven Brands. One Engine.</h2>
          <p className="section-desc" style={{ maxWidth: 640, marginBottom: 'var(--space-12)' }}>
            Every entity in the Hillbilly Dreams portfolio is independent but interconnected.
            The inn fills the rooms. The radio fills them with sound. The magazine tells the story.
            The label records it. The gallery sells what it inspires.
          </p>
          <div className="hd-ecosystem__grid">
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                target="_blank"
                rel="noreferrer"
                className="hd-brand-card"
              >
                <div className="hd-brand-card__icon">{brand.icon}</div>
                <div className="hd-brand-card__content">
                  <h3 className="hd-brand-card__name">{brand.name}</h3>
                  <p className="hd-brand-card__tagline">{brand.tagline}</p>
                  <p className="hd-brand-card__desc">{brand.desc}</p>
                </div>
                <span className="hd-brand-card__arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Story ── */}
      <section className="hd-story" id="story">
        <div className="section-container" style={{ maxWidth: 720 }}>
          <div className="section-label">The Story</div>
          <h2 className="section-title">
            Built from Nothing.
            <br />
            <em style={{ color: 'var(--accent)' }}>In Mississippi.</em>
          </h2>
          <div className="hd-story__body">
            <p>
              I spent years inside the machine — corporate architecture firms, big-box construction
              projects, the kind of work where your best ideas get ground down by committees and
              change orders. Good money. Soul-crushing trajectory.
            </p>
            <p>So I left. Moved back to Mississippi. Started building.</p>
            <p>
              Not a startup with a pitch deck and a prayer. An <em>ecosystem</em>. From scratch.
              No venture capital. No Silicon Valley connections. No safety net. Just a laptop,
              an obsessive need to understand how systems actually work, and a conviction that
              you don&apos;t need permission to build something real.
            </p>
            <p>
              What came out of that is Hillbilly Dreams — a holding company for seven independent brands
              that feed each other. Big Muddy Touring maps the Mississippi music corridor across
              eighteen cities and five states. The Magazine tells the stories. The Radio plays the
              soundtrack. Records captures the artists. BuyCurious sells what the corridor makes.
              Outsider Economics lays out the math behind why this kind of local, sovereign economy
              actually works.
            </p>

            <blockquote className="hd-story__quote">
              <p>
                &ldquo;We didn&apos;t raise money. We didn&apos;t move to Austin. We built a media-hospitality
                ecosystem from a house in Mississippi — and it <em>works</em>.&rdquo;
              </p>
              <cite>— Chase Pierson</cite>
            </blockquote>

            <p>
              The whole thing runs on technology I built myself — the platform that powers every
              brand, manages content, handles bookings, processes payments, and ties the network
              together. Every line of code, every design decision, every operational workflow.
            </p>
            <p>
              Hillbilly Dreams isn&apos;t a brand exercise. It&apos;s a holding company for real
              businesses that solve real problems in places that get overlooked. Every brand is
              sovereign. Every dollar stays local. No investors to answer to. No board meetings.
              Just a small team in the Deep South building things that punch well above their
              weight class.
            </p>
            <p className="hd-story__closer">
              That&apos;s the dream. And we&apos;re living it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="hd-philosophy">
        <div className="section-container">
          <div className="hd-philosophy__grid">
            {[
              {
                label: 'Sovereignty',
                text: 'Every brand owns its revenue, its audience, and its identity. No extraction. No middlemen.',
              },
              {
                label: 'Locality',
                text: 'Every dollar circulates through the communities we serve. The network strengthens the corridor, not a Silicon Valley fund.',
              },
              {
                label: 'Durability',
                text: 'We build things that last. No growth hacking. No pivot culture. Patient infrastructure for a hundred-year economy.',
              },
            ].map((principle) => (
              <div key={principle.label} className="hd-principle">
                <div className="hd-principle__label">{principle.label}</div>
                <p className="hd-principle__text">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="hd-footer">
        <div className="section-container">
          <div className="hd-footer__inner">
            <div className="hd-footer__brand">
              <span className="hd-footer__mark">HD</span>
              <span className="hd-footer__name">Hillbilly Dreams, Inc.</span>
            </div>
            <p className="hd-footer__location">Natchez, Mississippi</p>
            <a href="mailto:chase@chasepierson.tv" className="hd-footer__email">
              chase@chasepierson.tv
            </a>
          </div>
          <div className="hd-footer__bottom">
            <span>© 2026 Hillbilly Dreams, Inc. All rights reserved.</span>
            <span>Built with independence. Powered by stubbornness.</span>
          </div>
        </div>
      </footer>

      <style>{`
        /* ═══ HERO ═══ */
        .hd-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
        }
        .hd-hero__bg-pattern {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 20%, rgba(200, 148, 62, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(200, 148, 62, 0.03) 0%, transparent 50%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 120px,
              rgba(200, 148, 62, 0.02) 120px,
              rgba(200, 148, 62, 0.02) 121px
            );
        }
        .hd-hero__content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          padding: var(--space-24) var(--space-6);
          text-align: center;
        }
        .hd-hero__eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-8);
        }
        .hd-hero__ornament {
          font-size: 8px;
        }
        .hd-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          line-height: 0.95;
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .hd-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .hd-hero__inc {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 400;
          color: var(--text-muted);
          vertical-align: super;
          line-height: 1;
        }
        .hd-hero__tagline {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          color: var(--accent);
          margin: 0 0 var(--space-4);
        }
        .hd-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 560px;
          margin: 0 auto var(--space-10);
        }
        .hd-hero__ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .hd-hero__scroll-hint {
          position: absolute;
          bottom: var(--space-8);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          z-index: 2;
        }

        /* ═══ ECOSYSTEM ═══ */
        .hd-ecosystem {
          border-top: 1px solid var(--border);
          background: var(--surface);
        }
        .hd-ecosystem__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-4);
        }
        .hd-brand-card {
          display: flex;
          gap: var(--space-4);
          padding: var(--space-6);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: border-color var(--duration-normal) var(--ease-default),
                      background var(--duration-normal) var(--ease-default),
                      box-shadow var(--duration-normal) var(--ease-default),
                      transform var(--duration-normal) var(--ease-default);
          position: relative;
          overflow: hidden;
        }
        .hd-brand-card:hover {
          border-color: var(--border-strong);
          background: var(--surface-2);
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }
        .hd-brand-card__icon {
          font-size: var(--text-2xl);
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-subtle);
          border-radius: var(--radius-md);
        }
        .hd-brand-card__content {
          flex: 1;
          min-width: 0;
        }
        .hd-brand-card__name {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-1);
        }
        .hd-brand-card:hover .hd-brand-card__name {
          color: var(--accent);
        }
        .hd-brand-card__tagline {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          margin: 0 0 var(--space-2);
        }
        .hd-brand-card__desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }
        .hd-brand-card__arrow {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          font-size: var(--text-sm);
          color: var(--text-disabled);
          transition: color var(--duration-fast) var(--ease-default),
                      transform var(--duration-fast) var(--ease-default);
        }
        .hd-brand-card:hover .hd-brand-card__arrow {
          color: var(--accent);
          transform: translate(2px, -2px);
        }

        /* ═══ STORY ═══ */
        .hd-story {
          border-top: 1px solid var(--border);
        }
        .hd-story__body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
        }
        .hd-story__body p {
          margin: 0 0 var(--space-6);
        }
        .hd-story__body em {
          color: var(--text);
          font-style: italic;
        }
        .hd-story__quote {
          margin: var(--space-10) 0;
          padding: var(--space-8);
          background: var(--accent-subtle);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius-md);
        }
        .hd-story__quote p {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          color: var(--text);
          line-height: var(--leading-snug);
          margin: 0 0 var(--space-4);
        }
        .hd-story__quote cite {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          font-style: normal;
        }
        .hd-story__closer {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text) !important;
          letter-spacing: var(--tracking-tight);
        }

        /* ═══ PHILOSOPHY ═══ */
        .hd-philosophy {
          border-top: 1px solid var(--border);
          background: var(--surface);
        }
        .hd-philosophy__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-6);
        }
        .hd-principle {
          padding: var(--space-8);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .hd-principle__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-4);
        }
        .hd-principle__text {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }

        /* ═══ FOOTER ═══ */
        .hd-footer {
          border-top: 1px solid var(--border);
        }
        .hd-footer__inner {
          text-align: center;
          padding-bottom: var(--space-10);
        }
        .hd-footer__brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }
        .hd-footer__mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--accent);
          color: var(--bg);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 800;
          border-radius: var(--radius-sm);
          letter-spacing: var(--tracking-wide);
        }
        .hd-footer__name {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
        }
        .hd-footer__location {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: 0 0 var(--space-2);
        }
        .hd-footer__email {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
        }
        .hd-footer__email:hover {
          color: var(--accent-hover);
        }
        .hd-footer__bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-top: var(--space-6);
          border-top: 1px solid var(--border);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          gap: var(--space-4);
        }
      `}</style>
    </div>
  );
}
