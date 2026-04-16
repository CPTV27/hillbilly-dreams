import type { Metadata } from 'next';
import PrintPulseButton from './PrintPulseButton';

export const metadata: Metadata = {
  title: 'Deep South Pulse',
  description: 'Printable one-page walk-in pitch report for Deep South Directory.',
};

function weekOfLabel() {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PulsePage() {
  const weekOf = weekOfLabel();

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '1.25rem',
        background: '#1A1613',
      }}
    >
      <div style={{ maxWidth: 920, margin: '0 auto 0.9rem' }}>
        <PrintPulseButton />
      </div>

      <article className="pulse-sheet">
        <header className="pulse-header">
          <div>
            <p className="pulse-kicker">Weekly Culture Intelligence — Natchez, Mississippi</p>
            <h1>DEEP SOUTH PULSE</h1>
            <p className="pulse-week">Week of {weekOf}</p>
          </div>
          <div className="pulse-logos" aria-label="Big Muddy and Deep South Directory">
            <span>Big Muddy Radio</span>
            <span>Deep South Directory</span>
          </div>
        </header>

        <section className="pulse-grid">
          <div className="pulse-card">
            <h2>Radio Activity</h2>
            <ul>
              <li>Big Muddy Radio featured 42 local businesses this month</li>
              <li>116 tracks in library from 6 corridor artists</li>
              <li>Weekly podcast + curated playlists on all platforms</li>
            </ul>
          </div>

          <div className="pulse-card">
            <h2>Directory Reach</h2>
            <ul>
              <li>5,605 businesses indexed across 13 corridor cities</li>
              <li>Memphis → Natchez → New Orleans</li>
              <li>83 new listings this month</li>
              <li>1,924 searches by travelers</li>
            </ul>
          </div>

          <div className="pulse-card">
            <h2>Magazine &amp; Social</h2>
            <ul>
              <li>Big Muddy Magazine: 14 articles published this month</li>
              <li>Newsletter: 2,146 subscribers</li>
              <li>Social reach: 38,200 impressions across all platforms</li>
            </ul>
          </div>
        </section>

        <section className="pulse-offer">
          <p className="pulse-offer-title">YOUR BUSINESS COULD BE HERE.</p>
          <div className="pulse-offer-lines">
            <p>
              <strong>Starter</strong>
              <span>$99/mo</span>
              <em>Directory + podcast feature + sidebar ad</em>
            </p>
            <p>
              <strong>Growth</strong>
              <span>$199/mo</span>
              <em>Featured + podcast + newsletter + in-article ad</em>
            </p>
            <p>
              <strong>Partner</strong>
              <span>$399/mo</span>
              <em>Premium + weekly audio + homepage ad + quarterly article</em>
            </p>
            <p>
              <strong>Anchor</strong>
              <span>$599/mo</span>
              <em>Everything + show sponsorship + quarterly profile</em>
            </p>
          </div>
          <blockquote>
            "No competitor in Natchez owns a magazine, a radio station, AND a directory. We do."
          </blockquote>
          <p className="pulse-cta">
            Claim your listing: <strong>deepsouthdirectory.com</strong>
            <br />
            Talk to Chase: <strong>me@chasepierson.tv</strong>
          </p>
        </section>

        <footer className="pulse-footer">
          <p>Powered by Measurably Better Things</p>
          <p>Big Muddy Touring · Big Muddy Radio · Big Muddy Magazine · Deep South Directory</p>
        </footer>
      </article>

      <style>{`
        .pulse-sheet {
          max-width: 920px;
          margin: 0 auto;
          padding: 1.1rem 1.3rem 1rem;
          background: #1A1613;
          color: #f3ece2;
          border: 1px solid color-mix(in srgb, #C8943E 45%, transparent);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          font-family: var(--font-body);
        }
        .pulse-header {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: flex-start;
          border-bottom: 1px solid color-mix(in srgb, #C8943E 35%, transparent);
          padding-bottom: 0.65rem;
          margin-bottom: 0.75rem;
        }
        .pulse-kicker {
          margin: 0 0 0.3rem;
          font-size: 0.66rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8943E;
          font-weight: 700;
        }
        .pulse-header h1 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 4vw, 2.3rem);
          letter-spacing: 0.03em;
          line-height: 1.02;
        }
        .pulse-week {
          margin: 0.35rem 0 0;
          font-size: 0.76rem;
          color: color-mix(in srgb, #f3ece2 75%, transparent);
        }
        .pulse-logos {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-items: flex-end;
          min-width: 170px;
        }
        .pulse-logos span {
          border: 1px solid color-mix(in srgb, #C8943E 40%, transparent);
          color: #C8943E;
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.2rem 0.45rem;
        }
        .pulse-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.65rem;
          margin-bottom: 0.7rem;
        }
        .pulse-card {
          border: 1px solid color-mix(in srgb, #f3ece2 10%, transparent);
          background: color-mix(in srgb, #1A1613 88%, #ffffff 12%);
          padding: 0.55rem 0.65rem;
        }
        .pulse-card h2 {
          margin: 0 0 0.35rem;
          font-family: var(--font-display);
          font-size: 0.96rem;
          color: #C8943E;
        }
        .pulse-card ul {
          margin: 0;
          padding-left: 1rem;
          font-size: 0.73rem;
          line-height: 1.45;
        }
        .pulse-offer {
          border: 1px solid color-mix(in srgb, #C8943E 45%, transparent);
          padding: 0.65rem 0.75rem;
          background: color-mix(in srgb, #C8943E 7%, transparent);
          margin-bottom: 0.6rem;
        }
        .pulse-offer-title {
          margin: 0 0 0.4rem;
          font-family: var(--font-display);
          font-size: 1rem;
          letter-spacing: 0.05em;
        }
        .pulse-offer-lines p {
          margin: 0;
          padding: 0.28rem 0;
          display: grid;
          grid-template-columns: 80px 80px 1fr;
          gap: 0.5rem;
          font-size: 0.72rem;
          border-bottom: 1px solid color-mix(in srgb, #f3ece2 12%, transparent);
        }
        .pulse-offer-lines p:last-child { border-bottom: 0; }
        .pulse-offer-lines strong { color: #f3ece2; }
        .pulse-offer-lines span { color: #C8943E; font-weight: 700; }
        .pulse-offer-lines em { font-style: normal; color: color-mix(in srgb, #f3ece2 86%, transparent); }
        .pulse-offer blockquote {
          margin: 0.5rem 0 0.4rem;
          padding: 0.4rem 0.55rem;
          border-left: 2px solid #C8943E;
          font-size: 0.75rem;
          line-height: 1.45;
        }
        .pulse-cta {
          margin: 0;
          font-size: 0.74rem;
          line-height: 1.5;
        }
        .pulse-footer {
          border-top: 1px solid color-mix(in srgb, #C8943E 30%, transparent);
          padding-top: 0.45rem;
          font-size: 0.66rem;
          text-transform: none;
          color: color-mix(in srgb, #f3ece2 82%, transparent);
          line-height: 1.4;
        }
        .pulse-footer p { margin: 0.12rem 0; }

        @media (max-width: 860px) {
          .pulse-grid { grid-template-columns: 1fr; }
          .pulse-offer-lines p { grid-template-columns: 72px 72px 1fr; }
        }

        @media print {
          @page {
            size: letter;
            margin: 0.45in;
          }
          :global(.admin-sidebar),
          :global(.admin-mobile-quick),
          :global(.admin-sidebar__header),
          :global(.admin-sidebar__nav),
          :global(.admin-sidebar__footer),
          :global(.pulse-print-btn) {
            display: none !important;
          }
          :global(.admin-content) {
            padding: 0 !important;
            max-width: none !important;
          }
          :global(body),
          :global(html),
          :global(.admin-shell),
          :global(.admin-main),
          :global(.admin-content),
          :global(main) {
            background: #fff !important;
            color: #111 !important;
          }
          .pulse-sheet {
            border: 1px solid #d5d5d5 !important;
            box-shadow: none !important;
            background: #fff !important;
            color: #111 !important;
            max-width: none !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0.36in !important;
            page-break-inside: avoid;
          }
          .pulse-kicker,
          .pulse-card h2,
          .pulse-offer-lines span,
          .pulse-logos span {
            color: #8f6a2a !important;
          }
          .pulse-logos span,
          .pulse-card,
          .pulse-offer,
          .pulse-header,
          .pulse-footer,
          .pulse-offer-lines p {
            border-color: #d7d7d7 !important;
            background: #fff !important;
          }
          .pulse-grid {
            gap: 0.28in !important;
          }
          .pulse-offer blockquote {
            border-left-color: #8f6a2a !important;
          }
        }
      `}</style>
    </main>
  );
}
