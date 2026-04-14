'use client';

// apps/web/app/admin/onboarding/tracy/PeerProgressCard.tsx
//
// Live read-only view of Amy's onboarding progress, shown as the task
// detail content when Tracy is on the 'review-amy-progress' task.
// Polls /api/onboarding/peer-progress?peer=amy every 15s so the view
// stays fresh as Amy clicks through her flow.
//
// Pure presentational — takes a peer argument and the parent owns the
// "acknowledged" callback.

import { useEffect, useState } from 'react';

interface PeerProgressPayload {
  peer: string;
  progress: {
    completedTasks: string[];
    currentTaskId: string | null;
    completedAt: string | null;
    lastSeenAt: string | null;
    sessionCount: number;
    totalTasks: number;
    startedAt: string | null;
  } | null;
}

export interface PeerProgressCardProps {
  /** Which peer to look up. "amy" for Tracy, "tracy" for Amy. */
  peer: 'amy' | 'tracy';
  /** Display name for the peer in the UI. Defaults to capitalized role. */
  peerDisplayName?: string;
}

const POLL_INTERVAL_MS = 15000;

export function PeerProgressCard({ peer, peerDisplayName }: PeerProgressCardProps) {
  const [data, setData] = useState<PeerProgressPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const displayName =
    peerDisplayName ?? (peer.charAt(0).toUpperCase() + peer.slice(1));

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(
          `/api/onboarding/peer-progress?peer=${encodeURIComponent(peer)}`,
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as PeerProgressPayload;
        if (!cancelled) {
          setData(json);
          setError(null);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Load failed');
          setLoading(false);
        }
      }
    };
    void load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [peer]);

  if (loading) {
    return (
      <div style={cardStyle}>
        <p style={muted}>Loading {displayName}&apos;s progress…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div style={cardStyle}>
        <p style={errorText}>Couldn&apos;t load {displayName}&apos;s progress: {error}</p>
      </div>
    );
  }

  const progress = data?.progress;

  if (!progress) {
    return (
      <div style={cardStyle}>
        <h3 style={headline}>{displayName} hasn&apos;t started yet</h3>
        <p style={muted}>
          When {displayName} visits her onboarding page, her progress will
          appear here in real time. Text her if you want to nudge her.
        </p>
      </div>
    );
  }

  const pct =
    progress.totalTasks > 0
      ? Math.round((progress.completedTasks.length / progress.totalTasks) * 100)
      : 0;
  const isDone = !!progress.completedAt;
  const lastSeenLabel = progress.lastSeenAt
    ? formatAgo(new Date(progress.lastSeenAt))
    : 'never';

  return (
    <div style={cardStyle}>
      <header style={headerRow}>
        <div>
          <h3 style={headline}>
            {isDone
              ? `${displayName} is done! 🎉`
              : `${displayName}'s onboarding`}
          </h3>
          <p style={muted}>
            {progress.completedTasks.length} of {progress.totalTasks} tasks complete · {pct}%
            {' '}· last seen {lastSeenLabel}
          </p>
        </div>
      </header>

      {/* Progress bar */}
      <div style={barWrap}>
        <div style={{ ...barFill, width: `${pct}%` }} />
      </div>

      {/* Current task */}
      {!isDone && progress.currentTaskId && (
        <p style={currentTaskText}>
          Currently on: <strong>{progress.currentTaskId}</strong>
        </p>
      )}

      {/* Completed tasks checklist */}
      {progress.completedTasks.length > 0 && (
        <div style={listBlock}>
          <h4 style={listTitle}>Completed:</h4>
          <ul style={listStyle}>
            {progress.completedTasks.map((id) => (
              <li key={id} style={listItem}>
                <span style={checkStyle} aria-hidden>
                  ✓
                </span>
                {id}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p style={helpText}>
        This view refreshes every 15 seconds. You can close this tab and come
        back anytime — {displayName}&apos;s state stays live.
      </p>
    </div>
  );
}

export default PeerProgressCard;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatAgo(date: Date): string {
  const minutes = (Date.now() - date.getTime()) / 60000;
  if (minutes < 2) return 'just now';
  if (minutes < 60) return `${Math.round(minutes)} minutes ago`;
  if (minutes < 1440) {
    const h = Math.round(minutes / 60);
    return `${h} hour${h === 1 ? '' : 's'} ago`;
  }
  const d = Math.round(minutes / 1440);
  return `${d} day${d === 1 ? '' : 's'} ago`;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: 'var(--card-bg-color, rgba(30, 27, 24, 0.92))',
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.22))',
  borderRadius: 12,
  padding: 20,
  color: 'var(--card-fg-color, #f5e9d1)',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

const headerRow: React.CSSProperties = {
  marginBottom: 12,
};

const headline: React.CSSProperties = {
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
};

const muted: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: 13,
  opacity: 0.7,
};

const errorText: React.CSSProperties = {
  margin: 0,
  fontSize: 13,
  color: '#ff8a80',
};

const barWrap: React.CSSProperties = {
  marginTop: 12,
  marginBottom: 12,
  width: '100%',
  height: 8,
  borderRadius: 999,
  background: 'var(--card-border-color, rgba(200, 148, 62, 0.15))',
  overflow: 'hidden',
};

const barFill: React.CSSProperties = {
  height: '100%',
  background: 'var(--accent, #c8943e)',
  transition: 'width 0.4s ease',
};

const currentTaskText: React.CSSProperties = {
  margin: '12px 0 0',
  fontSize: 14,
  opacity: 0.9,
};

const listBlock: React.CSSProperties = {
  marginTop: 16,
  paddingTop: 16,
  borderTop: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.15))',
};

const listTitle: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  opacity: 0.6,
};

const listStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const listItem: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 13,
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  opacity: 0.85,
};

const checkStyle: React.CSSProperties = {
  color: 'var(--accent, #c8943e)',
  fontWeight: 700,
};

const helpText: React.CSSProperties = {
  marginTop: 20,
  fontSize: 12,
  opacity: 0.5,
  fontStyle: 'italic',
};
