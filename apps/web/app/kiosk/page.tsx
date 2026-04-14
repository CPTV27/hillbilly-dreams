'use client';

import { useEffect, useState } from 'react';

// Auto-refreshing kiosk display — designed for TV, Mac Mini, or iPad
// No interaction needed. No login required. Updates itself.

interface NowPlaying {
  title?: string;
  artist?: string;
  show?: string;
}

export default function KioskPage() {
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState<'control' | 'lobby' | 'menu'>('control');

  useEffect(() => {
    // Update clock every second
    const clockInterval = setInterval(() => setTime(new Date()), 1000);

    // Check URL params for mode
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('mode');
      if (m === 'lobby' || m === 'menu' || m === 'control') {
        setMode(m);
      }
    }

    return () => clearInterval(clockInterval);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // ── CONTROL MODE: Operator dashboard for Mac Mini ──
  if (mode === 'control') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a08',
        color: '#e8e0d4',
        fontFamily: "var(--font-body, 'Inter', sans-serif)",
        padding: '2rem',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: '1.5rem',
      }}>
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          backgroundColor: '#151412',
          borderRadius: '12px',
          border: '1px solid #2a2520',
        }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
            }}>
              Big Muddy HQ
            </h1>
            <p style={{ margin: 0, color: '#5a5248', fontSize: '0.85rem' }}>
              Control Center &middot; Natchez, MS
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#c8943e',
              lineHeight: 1,
            }}>
              {timeStr}
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: '#5a5248',
            }}>
              {dateStr}
            </div>
          </div>
        </div>

        {/* Grid of Status Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '1rem',
        }}>
          {/* Radio Status */}
          <StatusCard
            title="Radio"
            icon="&#x1F4FB;"
            status="live"
            statusLabel="ON AIR"
            detail="Big Muddy Radio — Icecast streaming"
            link={process.env.NEXT_PUBLIC_ICECAST_URL?.replace(/\/stream\/?$/, '') || "http://192.168.4.37:8010"}
          />

          {/* Platform Status */}
          <StatusCard
            title="Platform"
            icon="&#x1F310;"
            status="live"
            statusLabel="15 DOMAINS"
            detail="bigmuddytouring.com + all properties"
            link="https://bigmuddytouring.com/admin/deploys"
          />

          {/* Plex / TV */}
          <StatusCard
            title="Plex / In-Room TV"
            icon="&#x1F4FA;"
            status="live"
            statusLabel="STREAMING"
            detail="Media library serving to all rooms"
            link="http://192.168.4.37:32400"
          />

          {/* Social Publishing */}
          <StatusCard
            title="Social (Postiz)"
            icon="&#x1F4F1;"
            status="live"
            statusLabel="ACTIVE"
            detail="Auto-publishing across all channels"
            link="http://192.168.4.37:4007"
          />

          {/* Open Notebook */}
          <StatusCard
            title="Knowledge Base"
            icon="&#x1F4D3;"
            status="live"
            statusLabel="INDEXED"
            detail="Open Notebook — RAG + vector search"
            link="http://192.168.4.37:5055"
          />

          {/* Pipeline */}
          <StatusCard
            title="Pipeline"
            icon="&#x1F4B0;"
            status="active"
            statusLabel="5 PROSPECTS"
            detail="Vicki ($500) + TKG + Halter + Peter + Johanna"
          />
        </div>
      </div>
    );
  }

  // ── LOBBY MODE: Guest-facing display for the Inn ──
  if (mode === 'lobby') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a08',
        color: '#e8e0d4',
        fontFamily: "var(--font-body, 'Inter', sans-serif)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '4rem',
      }}>
        <div style={{
          fontSize: '5rem',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1,
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          {timeStr}
        </div>
        <div style={{
          fontSize: '1.5rem',
          color: '#c8943e',
          marginBottom: '4rem',
          fontWeight: 500,
        }}>
          {dateStr}
        </div>

        <div style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '0.5rem',
        }}>
          The Big Muddy Inn
        </div>
        <div style={{
          fontSize: '1.25rem',
          color: '#8a8074',
          marginBottom: '3rem',
        }}>
          Natchez, Mississippi &middot; Est. 1892
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: 900,
        }}>
          <LobbyCard icon="&#x1F3B5;" label="Live Music" detail="Check the board for tonight's show" />
          <LobbyCard icon="&#x1F37B;" label="The Bar" detail="Open 5pm — Late" />
          <LobbyCard icon="&#x1F4FB;" label="Big Muddy Radio" detail="Streaming live — ask for the station" />
        </div>

        <div style={{
          marginTop: '4rem',
          fontSize: '0.85rem',
          color: '#5a5248',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          WiFi: BigMuddy &middot; No Password
        </div>
      </div>
    );
  }

  // ── MENU MODE: Today's schedule/upcoming ──
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: "var(--font-body, 'Inter', sans-serif)",
      padding: '3rem',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '3rem',
        fontWeight: 700,
        color: '#c8943e',
        marginBottom: '2rem',
      }}>
        {timeStr}
      </div>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 700,
        color: '#ffffff',
        margin: '0 0 2rem 0',
      }}>
        What is Happening Today
      </h1>
      <p style={{ color: '#5a5248', fontSize: '1.25rem' }}>
        Connect to /api/events for live schedule data
      </p>
    </div>
  );
}

// ── Reusable Components ──

function StatusCard({
  title, icon, status, statusLabel, detail, link,
}: {
  title: string;
  icon: string;
  status: 'live' | 'active' | 'error' | 'offline';
  statusLabel: string;
  detail: string;
  link?: string;
}) {
  const statusColors = {
    live: '#22c55e',
    active: '#c8943e',
    error: '#ef4444',
    offline: '#5a5248',
  };

  const content = (
    <div style={{
      backgroundColor: '#151412',
      border: `1px solid ${status === 'error' ? '#ef444440' : '#2a2520'}`,
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      cursor: link ? 'pointer' : 'default',
      transition: 'border-color 0.2s',
    }}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>{icon}</span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            color: statusColors[status],
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '3px 8px',
            borderRadius: '4px',
            backgroundColor: `${statusColors[status]}15`,
          }}>
            {statusLabel}
          </span>
        </div>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#ffffff',
          margin: '0 0 0.25rem 0',
        }}>
          {title}
        </h3>
      </div>
      <p style={{
        fontSize: '0.85rem',
        color: '#8a8074',
        margin: 0,
        lineHeight: 1.4,
      }}>
        {detail}
      </p>
    </div>
  );

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{content}</a>;
  }
  return content;
}

function LobbyCard({ icon, label, detail }: { icon: string; label: string; detail: string }) {
  return (
    <div style={{
      backgroundColor: '#151412',
      border: '1px solid #2a2520',
      borderRadius: '16px',
      padding: '2rem',
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#ffffff',
        margin: '0 0 0.25rem 0',
      }}>
        {label}
      </h3>
      <p style={{
        fontSize: '0.95rem',
        color: '#8a8074',
        margin: 0,
      }}>
        {detail}
      </p>
    </div>
  );
}
