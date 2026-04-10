// apps/web/components/LiveBar.tsx
// Persistent floating "Watch Now" + "Listen Now" buttons for Big Muddy Touring.
// Lives in app/touring/layout.tsx so it appears on every page under bigmuddytouring.com
// (and every consolidated path: /magazine, /radio, /records, /entertainment, /mbt, etc).

export function LiveBar() {
  return (
    <>
      <div className="live-bar" role="region" aria-label="Big Muddy live">
        <span className="live-bar__pulse" aria-hidden="true" />
        <span className="live-bar__label">LIVE FROM NATCHEZ</span>
        <a href="/radio/live" className="live-bar__btn live-bar__btn--watch">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          </svg>
          <span>Watch Now</span>
        </a>
        <a href="/radio" className="live-bar__btn live-bar__btn--listen">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 18V9a9 9 0 0 1 18 0v9" />
            <rect x="3" y="13" width="5" height="8" rx="1" fill="currentColor" stroke="none" />
            <rect x="16" y="13" width="5" height="8" rx="1" fill="currentColor" stroke="none" />
          </svg>
          <span>Listen Now</span>
        </a>
      </div>

      <style>{`
        .live-bar {
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 60;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px 10px 18px;
          background: rgba(10, 10, 8, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(200, 148, 62, 0.35);
          border-radius: 999px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(200, 148, 62, 0.1);
          pointer-events: auto;
          font-family: var(--font-body, system-ui, sans-serif);
        }

        .live-bar__pulse {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff3b30;
          box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.8);
          animation: live-bar-pulse 2s infinite;
          flex-shrink: 0;
        }

        @keyframes live-bar-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.8);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 59, 48, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 59, 48, 0);
          }
        }

        .live-bar__label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c8943e;
          white-space: nowrap;
        }

        .live-bar__btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 18px;
          border-radius: 999px;
          font-family: var(--font-display, Georgia, serif);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }

        .live-bar__btn:active {
          transform: scale(0.96);
        }

        .live-bar__btn--watch {
          background: #c8943e;
          color: #0a0a08;
        }

        .live-bar__btn--watch:hover {
          background: #d9a34a;
          box-shadow: 0 4px 16px rgba(200, 148, 62, 0.4);
        }

        .live-bar__btn--listen {
          background: transparent;
          color: #e8e0d4;
          border: 1.5px solid rgba(232, 224, 212, 0.35);
        }

        .live-bar__btn--listen:hover {
          border-color: #e8e0d4;
          background: rgba(232, 224, 212, 0.08);
        }

        /* Mobile: stack bar inside a bottom-docked pill so it's thumb-reachable */
        @media (max-width: 640px) {
          .live-bar {
            top: auto;
            bottom: 16px;
            right: 16px;
            left: 16px;
            justify-content: center;
            padding: 10px 12px;
            gap: 8px;
          }

          .live-bar__label {
            display: none;
          }

          .live-bar__btn {
            flex: 1 1 auto;
            justify-content: center;
            padding: 12px 16px;
            font-size: 0.9rem;
          }
        }

        /* Printing: hide the bar — presentations shouldn't print the CTA */
        @media print {
          .live-bar {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
