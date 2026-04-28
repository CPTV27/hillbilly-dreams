// apps/web/app/records/vault/page.tsx
// ─────────────────────────────────────────────────────────────
// MELODY VAULT — Label admin overview
// ─────────────────────────────────────────────────────────────
// Single-page internal dashboard:
//   - Roster overview (4 artists, status pills, jump link to detail)
//   - 60-day campaign calendar (Day -30 → Day +30, all artists overlaid)
//   - Capability cards (operational / demo / next / later)
//
// Uses static seed data from ./data. See data.ts for the
// migration plan to Prisma.

import type { Metadata } from 'next';
import { CAPABILITY_CARDS, VAULT_ARTISTS, type CapabilityStatus, type CampaignMilestone } from './data';

export const metadata: Metadata = {
  title: 'Melody Vault — Big Muddy Records',
  robots: { index: false, follow: false },
};

const STATUS_BADGES: Record<CapabilityStatus, { label: string; color: string }> = {
  operational: { label: 'Operational', color: '#5fae5f' },
  demo: { label: 'Demo', color: '#c8943e' },
  next: { label: 'Up Next', color: '#7a9bd9' },
  later: { label: 'Roadmap', color: '#8a8580' },
};

const ARTIST_STATUS_BADGE: Record<string, string> = {
  discovered: '#8a8580',
  developing: '#c8943e',
  campaigning: '#5fae5f',
  touring: '#7a9bd9',
};

export default function VaultDashboardPage() {
  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
      {/* Hero summary */}
      <header style={{ marginBottom: '3rem' }}>
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem',
            color: 'var(--fg, #f5f0eb)',
          }}
        >
          Label Control Room
        </h1>
        <p
          style={{
            fontSize: '0.95rem',
            opacity: 0.7,
            maxWidth: 740,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Melody Vault is the marketing OS inside Big Muddy Records — strategy
          docs, audience plans, release calendars, EPK collection, and capability
          status all on one screen. Tonight&rsquo;s focus is the surface that
          artists and label staff actually use.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            background: 'var(--muted, #333)',
            border: '1px solid var(--muted, #333)',
            marginTop: '2rem',
          }}
        >
          {[
            { label: 'Roster Size', value: VAULT_ARTISTS.length.toString() },
            {
              label: 'Active Campaigns',
              value: VAULT_ARTISTS.filter((a) => a.status === 'campaigning' || a.status === 'touring').length.toString(),
            },
            {
              label: 'Open Tasks',
              value: VAULT_ARTISTS.reduce((sum, a) => sum + a.tasks.filter((t) => t.status !== 'done').length, 0).toString(),
            },
            {
              label: 'Capabilities Operational',
              value: `${CAPABILITY_CARDS.filter((c) => c.status === 'operational').length} / ${CAPABILITY_CARDS.length}`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'var(--bg, #0a0a0a)',
                padding: '1.25rem 1.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  opacity: 0.55,
                  marginBottom: '0.4rem',
                }}
              >
                {stat.label}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Roster panel */}
      <section id="roster" style={{ marginBottom: '4rem' }}>
        <SectionLabel>Roster</SectionLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {VAULT_ARTISTS.map((artist) => {
            const openTasks = artist.tasks.filter((t) => t.status !== 'done').length;
            const epkCollected = artist.epk.filter((e) => e.status === 'collected').length;
            return (
              <a
                key={artist.slug}
                href={`/records/vault/${artist.slug}`}
                style={{
                  display: 'block',
                  background: 'var(--bg, #0a0a0a)',
                  border: '1px solid var(--muted, #333)',
                  padding: '1.25rem 1.4rem',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.2rem' }}>{artist.name}</h3>
                    <div style={{ fontSize: '0.78rem', opacity: 0.6 }}>{artist.hometown} · {artist.genre}</div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '0.2rem 0.55rem',
                      border: `1px solid ${ARTIST_STATUS_BADGE[artist.status] ?? '#888'}`,
                      color: ARTIST_STATUS_BADGE[artist.status] ?? '#888',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {artist.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, margin: '0.9rem 0 1rem' }}>
                  {artist.tagline}
                </p>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.72rem', opacity: 0.7 }}>
                  <span>
                    <strong style={{ color: 'var(--accent, #c8943e)' }}>{openTasks}</strong> open task{openTasks === 1 ? '' : 's'}
                  </span>
                  <span>
                    EPK <strong style={{ color: 'var(--accent, #c8943e)' }}>{epkCollected} / {artist.epk.length}</strong>
                  </span>
                  <span style={{ marginLeft: 'auto', color: 'var(--accent, #c8943e)' }}>
                    Open detail →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" style={{ marginBottom: '4rem' }}>
        <SectionLabel>Release Calendar — Day -30 to Day +30</SectionLabel>
        <CampaignTimeline />
      </section>

      {/* Capability cards */}
      <section id="capabilities">
        <SectionLabel>Vault Capabilities</SectionLabel>
        <p style={{ fontSize: '0.85rem', opacity: 0.6, maxWidth: 720, lineHeight: 1.6, margin: '0 0 1.5rem' }}>
          Honest claims policy: each card is labeled by what is actually
          shipped. Operational = working on real artists today. Demo = shown in
          this walkthrough with seed data, real wiring next sprint. Up Next /
          Roadmap = explicitly not built yet.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {CAPABILITY_CARDS.map((card) => {
            const badge = STATUS_BADGES[card.status];
            return (
              <div
                key={card.title}
                style={{
                  background: 'var(--bg, #0a0a0a)',
                  border: '1px solid var(--muted, #333)',
                  padding: '1.25rem 1.4rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{card.title}</h3>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '0.18rem 0.5rem',
                      border: `1px solid ${badge.color}`,
                      color: badge.color,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {badge.label}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.55, margin: 0 }}>
                  {card.blurb}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        color: 'var(--accent, #c8943e)',
        margin: '0 0 1.25rem',
      }}
    >
      {children}
    </h2>
  );
}

// ─────────────────────────────────────────────────────────────
// CampaignTimeline — overlays all artists' milestones across one
// 60-day strip from Day -30 to Day +30. Renders as a stacked grid.
// ─────────────────────────────────────────────────────────────

function CampaignTimeline() {
  const minDay = -30;
  const maxDay = 30;
  const span = maxDay - minDay;

  const channelColor = (ch: CampaignMilestone['channel']) =>
    ({
      radio: '#c8943e',
      magazine: '#7a9bd9',
      social: '#a675c4',
      live: '#5fae5f',
      sync: '#d97a7a',
      studio: '#8a8580',
      pr: '#e2c068',
    })[ch];

  return (
    <div
      style={{
        border: '1px solid var(--muted, #333)',
        background: 'var(--bg, #0a0a0a)',
      }}
    >
      {/* Day axis */}
      <div
        style={{
          position: 'relative',
          height: 28,
          borderBottom: '1px solid var(--muted, #333)',
          fontSize: '0.65rem',
          opacity: 0.6,
        }}
      >
        {[-30, -20, -10, 0, 10, 20, 30].map((d) => {
          const left = ((d - minDay) / span) * 100;
          return (
            <span
              key={d}
              style={{
                position: 'absolute',
                left: `${left}%`,
                transform: 'translateX(-50%)',
                top: 8,
                color: d === 0 ? 'var(--accent, #c8943e)' : 'inherit',
                fontWeight: d === 0 ? 700 : 400,
              }}
            >
              {d === 0 ? 'Release' : `${d > 0 ? '+' : ''}${d}`}
            </span>
          );
        })}
      </div>
      {VAULT_ARTISTS.map((artist) => (
        <div
          key={artist.slug}
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            borderBottom: '1px solid var(--muted, #333)',
            minHeight: 64,
          }}
        >
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRight: '1px solid var(--muted, #333)',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ fontWeight: 700 }}>{artist.name}</div>
            <div style={{ opacity: 0.55, fontSize: '0.7rem', marginTop: '0.15rem' }}>{artist.genre}</div>
          </div>
          <div style={{ position: 'relative', padding: '0.5rem 0.5rem' }}>
            {/* Release-day vertical line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${((0 - minDay) / span) * 100}%`,
                width: 1,
                background: 'rgba(200,148,62,0.4)',
              }}
              aria-hidden
            />
            {artist.calendar.map((m, i) => {
              const left = ((m.day - minDay) / span) * 100;
              return (
                <div
                  key={`${artist.slug}-${i}`}
                  title={`Day ${m.day}: ${m.label} (${m.channel}, ${m.status})`}
                  style={{
                    position: 'absolute',
                    left: `calc(${left}% - 6px)`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: channelColor(m.channel),
                    opacity: m.status === 'planned' ? 0.45 : m.status === 'in-progress' ? 0.75 : 1,
                    border: m.status === 'done' ? '1px solid #fff' : '1px solid transparent',
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
      {/* Legend */}
      <div
        style={{
          padding: '0.75rem 1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.7rem',
          opacity: 0.7,
        }}
      >
        {(['radio', 'magazine', 'social', 'live', 'sync', 'studio', 'pr'] as const).map((ch) => (
          <span key={ch} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                width: 10,
                height: 10,
                background: channelColor(ch),
                display: 'inline-block',
                borderRadius: 2,
              }}
            />
            {ch}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', opacity: 0.55 }}>
          opacity = planned / in-progress / done
        </span>
      </div>
    </div>
  );
}
