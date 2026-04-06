import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Utopia Session',
  description: 'Session concierge — Utopia Studios (skeleton)',
};

/**
 * Utopia Studio Mode (#39) — lean session concierge shell; data wiring later.
 */
export default function StudioModePage() {
  return (
    <div className="usm-root">
      <header className="usm-hero">
        <p className="usm-kicker">Utopia Studios · Session concierge</p>
        <h1 className="usm-title">Session Concierge</h1>
        <p className="usm-lede">
          One screen for the room — food, services, and booking video. Real schedule wiring ships next.
        </p>
      </header>

      <div className="usm-grid">
        <section className="usm-panel">
          <h2 className="usm-panel__h">Session info</h2>
          <p className="usm-panel__p">Date, time, engineer, and notes will appear here.</p>
          <div className="usm-placeholder" aria-hidden="true" />
        </section>

        <section className="usm-panel">
          <h2 className="usm-panel__h">Food &amp; services</h2>
          <ul className="usm-links">
            <li>
              <a href="https://www.google.com/maps/search/restaurants+near+Woodstock+NY" target="_blank" rel="noopener noreferrer">
                Local dining (maps) ↗
              </a>
            </li>
            <li>
              <a href="https://bearsvillemediagroup.com" target="_blank" rel="noopener noreferrer">
                Bearsville Media Group ↗
              </a>
            </li>
            <li>
              <a href="mailto:chase@hillbillydreamsinc.com">Request runner / errands — email HQ</a>
            </li>
          </ul>
        </section>

        <section className="usm-panel usm-panel--wide">
          <h2 className="usm-panel__h">Book video</h2>
          <p className="usm-panel__p">
            Studio C handles multi-cam production, live streams, and deliverables from the same building.
          </p>
          <a href="https://studiocvideo.com" className="usm-cta" target="_blank" rel="noopener noreferrer">
            Open Studio C Video ↗
          </a>
        </section>
      </div>

      <style>{`
        .usm-root {
          min-height: 70vh;
          font-family: var(--font-body);
          color: var(--text);
        }
        .usm-hero {
          margin-bottom: var(--space-8);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.06) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          border: 1px solid var(--border);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(12px);
        }
        .usm-kicker {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 var(--space-2);
        }
        .usm-title {
          font-family: var(--font-display), var(--font-body), serif;
          font-size: var(--text-2xl);
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 var(--space-3);
        }
        .usm-lede {
          font-size: var(--text-sm);
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
          max-width: 40rem;
        }
        .usm-grid {
          display: grid;
          gap: var(--space-5);
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .usm-grid {
            grid-template-columns: 1fr 1fr;
          }
          .usm-panel--wide {
            grid-column: 1 / -1;
          }
        }
        .usm-panel {
          padding: var(--space-6);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(10px);
        }
        .usm-panel__h {
          font-family: var(--font-display), var(--font-body), serif;
          font-size: var(--text-lg);
          font-weight: 600;
          margin: 0 0 var(--space-3);
        }
        .usm-panel__p {
          font-size: var(--text-sm);
          line-height: 1.55;
          color: var(--text-muted);
          margin: 0 0 var(--space-4);
        }
        .usm-placeholder {
          height: 72px;
          border-radius: var(--radius-sm);
          background: var(--surface-2);
          border: 1px dashed var(--border-strong);
        }
        .usm-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .usm-links a {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .usm-links a:hover {
          border-bottom-color: var(--accent);
        }
        .usm-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-6);
          font-size: var(--text-sm);
          font-weight: 700;
          font-family: var(--font-body);
          color: var(--bg);
          background: var(--accent);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background var(--duration-fast) var(--ease-default);
        }
        .usm-cta:hover {
          background: var(--accent-hover);
        }
      `}</style>
    </div>
  );
}
