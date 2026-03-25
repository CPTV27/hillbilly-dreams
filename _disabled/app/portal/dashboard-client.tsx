'use client';

// apps/web/app/portal/dashboard-client.tsx
// Main portal dashboard — reads ?client=ID from URL, fetches from /api/clients/[id]
//
// Usage: /portal?client=1

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface ClientData {
  id: number;
  name: string;
  tier: string;
  businessType: string;
  city: string;
  state: string;
  status: string;
  voiceProfile?: Record<string, unknown> | null;
  _count?: { accounts?: number; reviews?: number; reports?: number };
}

const TIER_LABELS: Record<string, string> = {
  'front-porch': 'Front Porch',
  'route': 'The Route',
  'river-room': 'River Room',
  'blues-room': 'The Blues Room',
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export default function PortalDashboardClient() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client');
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!clientId) {
      setError('No client specified. Add ?client=ID to the URL.');
      setLoading(false);
      return;
    }
    fetch(`${baseUrl}/api/clients/${clientId}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setClient(d.data);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <div className="portal-loading" role="status" aria-live="polite">
        <div className="portal-loading__spinner" aria-hidden="true" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="portal-error" role="alert">
        <h2>Unable to load dashboard</h2>
        <p>{error || 'Client not found.'}</p>
      </div>
    );
  }

  const voice = client.voiceProfile as Record<string, unknown> | null;

  return (
    <>
      <div className="portal-welcome">
        <h1 className="portal-welcome__name">{client.name}</h1>
        <p className="portal-welcome__meta">
          {client.city}, {client.state}
          <span className="portal-welcome__dot" aria-hidden="true">&middot;</span>
          {client.businessType}
          <span className="portal-welcome__dot" aria-hidden="true">&middot;</span>
          <span className="portal-tier-badge">{TIER_LABELS[client.tier] || client.tier}</span>
        </p>
      </div>

      <div className="portal-stats" role="list" aria-label="Account statistics">
        <div className="portal-stat" role="listitem">
          <span className="portal-stat__value">{client._count?.accounts ?? 0}</span>
          <span className="portal-stat__label">Connected Platforms</span>
        </div>
        <div className="portal-stat" role="listitem">
          <span className="portal-stat__value">{client._count?.reviews ?? 0}</span>
          <span className="portal-stat__label">Reviews Tracked</span>
        </div>
        <div className="portal-stat" role="listitem">
          <span className="portal-stat__value">{client._count?.reports ?? 0}</span>
          <span className="portal-stat__label">Monthly Reports</span>
        </div>
      </div>

      {voice && (
        <div className="portal-card">
          <h2 className="portal-card__title">Your Brand Voice</h2>
          {voice.tone ? (
            <p className="portal-card__text">
              <strong>Tone:</strong> {String(voice.tone)}
            </p>
          ) : null}
          {voice.personality ? (
            <p className="portal-card__text">
              <strong>Personality:</strong> {String(voice.personality)}
            </p>
          ) : null}
        </div>
      )}

      <div className="portal-card">
        <h2 className="portal-card__title">Quick Links</h2>
        <nav className="portal-quicklinks" aria-label="Portal sections">
          <a href={`/portal/calendar?client=${clientId}`} className="portal-quicklink">
            <span className="portal-quicklink__icon" aria-hidden="true">&#128197;</span>
            <span>Content Calendar</span>
          </a>
          <a href={`/portal/reviews?client=${clientId}`} className="portal-quicklink">
            <span className="portal-quicklink__icon" aria-hidden="true">&#11088;</span>
            <span>Reviews</span>
          </a>
          <a href={`/portal/reports?client=${clientId}`} className="portal-quicklink">
            <span className="portal-quicklink__icon" aria-hidden="true">&#128202;</span>
            <span>Reports</span>
          </a>
        </nav>
      </div>

      <style>{`
        .portal-loading {
          text-align: center;
          padding: var(--space-16, 64px) 0;
          color: var(--text-muted, #8a8074);
        }
        .portal-loading__spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border, #e5e2dc);
          border-top-color: var(--accent, #c8553d);
          border-radius: 50%;
          margin: 0 auto var(--space-4, 16px);
          animation: portal-spin 0.8s linear infinite;
        }
        @keyframes portal-spin { to { transform: rotate(360deg); } }
        .portal-error {
          text-align: center;
          padding: var(--space-16, 64px) 0;
          color: var(--text-muted, #8a8074);
        }
        .portal-error h2 {
          color: var(--text, #2a2520);
          margin-bottom: var(--space-2, 8px);
        }
        .portal-welcome {
          margin-bottom: var(--space-8, 32px);
        }
        .portal-welcome__name {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--text, #2a2520);
          margin: 0 0 var(--space-2, 8px);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .portal-welcome__meta {
          font-size: var(--text-md, 16px);
          color: var(--text-muted, #8a8074);
          margin: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2, 8px);
          flex-wrap: wrap;
        }
        .portal-welcome__dot {
          color: var(--text-disabled, #b8b0a4);
        }
        .portal-tier-badge {
          display: inline-block;
          padding: 2px 8px;
          background: var(--accent-muted, rgba(200, 85, 61, 0.12));
          color: var(--accent, #c8553d);
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: var(--radius-sm, 4px);
        }
        .portal-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: var(--space-4, 16px);
          margin-bottom: var(--space-8, 32px);
        }
        .portal-stat {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-md, 8px);
          padding: var(--space-6, 24px);
          text-align: center;
        }
        .portal-stat__value {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: var(--text, #2a2520);
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: var(--space-2, 8px);
        }
        .portal-stat__label {
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          color: var(--text-muted, #8a8074);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .portal-card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-md, 8px);
          padding: var(--space-6, 24px);
          margin-bottom: var(--space-6, 24px);
        }
        .portal-card__title {
          font-size: var(--text-lg, 18px);
          font-weight: 700;
          color: var(--text, #2a2520);
          margin: 0 0 var(--space-4, 16px);
        }
        .portal-card__text {
          font-size: var(--text-sm, 14px);
          color: var(--text-muted, #8a8074);
          margin: 0 0 var(--space-2, 8px);
          line-height: 1.5;
        }
        .portal-quicklinks {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: var(--space-3, 12px);
        }
        .portal-quicklink {
          display: flex;
          align-items: center;
          gap: var(--space-3, 12px);
          padding: var(--space-4, 16px);
          background: var(--bg, #faf9f6);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-sm, 4px);
          text-decoration: none;
          color: var(--text, #2a2520);
          font-size: var(--text-sm, 14px);
          font-weight: 500;
          transition: all 0.15s ease;
        }
        .portal-quicklink:hover {
          border-color: var(--accent, #c8553d);
          background: var(--surface, #fff);
        }
        .portal-quicklink:focus-visible {
          outline: 2px solid var(--accent, #c8553d);
          outline-offset: 2px;
        }
        .portal-quicklink__icon {
          font-size: 20px;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}
