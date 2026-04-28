// apps/web/app/records/vault/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────
// MELODY VAULT — Per-artist detail panel
// ─────────────────────────────────────────────────────────────
// Strategy doc · Audience plan · Calendar · Tasks · EPK · Socials.
// Static seed data for tonight; see ../data.ts for migration plan.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVaultArtist, VAULT_ARTISTS, type CampaignMilestone, type EpkChecklistItem, type ArtistTask } from '../data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VAULT_ARTISTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getVaultArtist(slug);
  return {
    title: artist ? `${artist.name} — Melody Vault` : 'Artist — Melody Vault',
    robots: { index: false, follow: false },
  };
}

export default async function VaultArtistDetailPage({ params }: Props) {
  const { slug } = await params;
  const artist = getVaultArtist(slug);
  if (!artist) notFound();

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
      <a
        href="/records/vault"
        style={{
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--accent, #c8943e)',
          textDecoration: 'none',
        }}
      >
        ← Back to Control Room
      </a>

      <header style={{ margin: '1.25rem 0 2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 0.4rem' }}>
          {artist.name}
        </h1>
        <div style={{ fontSize: '0.85rem', opacity: 0.65 }}>
          {artist.hometown} · {artist.genre} · status: <strong style={{ color: 'var(--accent, #c8943e)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{artist.status}</strong>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '1rem', opacity: 0.78, lineHeight: 1.6, maxWidth: 720 }}>
          {artist.tagline}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {/* Strategy doc */}
        <Panel title="Strategy & Positioning">
          <Field label="Positioning">{artist.strategy.positioning}</Field>
          <Field label="Target audience">{artist.strategy.audience}</Field>
          <Field label="Influences">{artist.strategy.influences.join(' · ')}</Field>
          <Field label="Markets">{artist.strategy.markets.join(' · ')}</Field>
          <Field label="Goals">
            <ul style={{ margin: '0.4rem 0 0 1rem', padding: 0, lineHeight: 1.6 }}>
              {artist.strategy.goals.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </Field>
        </Panel>

        {/* Audience plan */}
        <Panel title="Audience & Targeting">
          <Field label="Primary segments">
            <ul style={{ margin: '0.4rem 0 0 1rem', padding: 0, lineHeight: 1.6 }}>
              {artist.audiencePlan.primarySegments.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </Field>
          <Field label="Geographies">{artist.audiencePlan.geoTargets.join(' · ')}</Field>
          <Field label="Lookalikes">{artist.audiencePlan.lookalikes.join(' · ')}</Field>
          <Field label="Channel mix (priority order)">
            <ol style={{ margin: '0.4rem 0 0 1.1rem', padding: 0, lineHeight: 1.6 }}>
              {artist.audiencePlan.channelMix.map((c) => <li key={c}>{c}</li>)}
            </ol>
          </Field>
        </Panel>
      </div>

      <Panel title="Release Calendar">
        <SingleArtistTimeline calendar={artist.calendar} />
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <Panel title={`Tasks for ${artist.name}`}>
          {artist.tasks.map((t) => <TaskRow key={t.title} task={t} />)}
        </Panel>
        <Panel title="EPK & Content Checklist">
          {artist.epk.map((e) => <EpkRow key={e.label} item={e} />)}
        </Panel>
        <Panel title="Social Profiles">
          {artist.socials.map((s) => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed rgba(255,255,255,0.08)', fontSize: '0.85rem' }}>
              <span style={{ opacity: 0.75 }}>{s.label}</span>
              <span style={{ opacity: s.url ? 1 : 0.45, fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '0.78rem' }}>
                {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent, #c8943e)' }}>{s.url.replace(/^https?:\/\//, '')}</a> : 'Not yet collected'}
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        background: 'var(--bg, #0a0a0a)',
        border: '1px solid var(--muted, #333)',
        padding: '1.25rem 1.4rem',
      }}
    >
      <h2
        style={{
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: 'var(--accent, #c8943e)',
          margin: '0 0 1rem',
          fontWeight: 700,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.55, marginBottom: '0.3rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.88rem', lineHeight: 1.55, opacity: 0.85 }}>{children}</div>
    </div>
  );
}

function TaskRow({ task }: { task: ArtistTask }) {
  const color =
    task.status === 'done' ? '#5fae5f' : task.status === 'in-review' ? '#c8943e' : '#7a9bd9';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px dashed rgba(255,255,255,0.08)', fontSize: '0.85rem' }}>
      <div>
        <div>{task.title}</div>
        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.15rem' }}>{task.due}</div>
      </div>
      <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.18rem 0.5rem', border: `1px solid ${color}`, color }}>
        {task.status}
      </span>
    </div>
  );
}

function EpkRow({ item }: { item: EpkChecklistItem }) {
  const color =
    item.status === 'collected' ? '#5fae5f' : item.status === 'requested' ? '#c8943e' : '#d97a7a';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0', borderBottom: '1px dashed rgba(255,255,255,0.08)', fontSize: '0.85rem' }}>
      <span>{item.label}</span>
      <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.18rem 0.5rem', border: `1px solid ${color}`, color }}>
        {item.status}
      </span>
    </div>
  );
}

function SingleArtistTimeline({ calendar }: { calendar: CampaignMilestone[] }) {
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
    <div>
      <div style={{ position: 'relative', height: 90, border: '1px solid var(--muted, #333)' }}>
        {/* Axis */}
        {[-30, -20, -10, 0, 10, 20, 30].map((d) => {
          const left = ((d - minDay) / span) * 100;
          return (
            <span key={d} style={{
              position: 'absolute',
              left: `${left}%`,
              transform: 'translateX(-50%)',
              top: 6,
              fontSize: '0.65rem',
              opacity: 0.55,
              color: d === 0 ? 'var(--accent, #c8943e)' : 'inherit',
              fontWeight: d === 0 ? 700 : 400,
            }}>
              {d === 0 ? 'Release' : `${d > 0 ? '+' : ''}${d}`}
            </span>
          );
        })}
        {/* Release line */}
        <div style={{
          position: 'absolute',
          top: 24,
          bottom: 6,
          left: `${((0 - minDay) / span) * 100}%`,
          width: 1,
          background: 'rgba(200,148,62,0.5)',
        }} aria-hidden />
        {/* Milestones */}
        {calendar.map((m, i) => {
          const left = ((m.day - minDay) / span) * 100;
          return (
            <div
              key={i}
              title={`Day ${m.day}: ${m.label} (${m.channel}, ${m.status})`}
              style={{
                position: 'absolute',
                left: `calc(${left}% - 7px)`,
                top: 50,
                width: 14,
                height: 14,
                borderRadius: 2,
                background: channelColor(m.channel),
                opacity: m.status === 'planned' ? 0.5 : m.status === 'in-progress' ? 0.8 : 1,
                border: m.status === 'done' ? '1px solid #fff' : '1px solid transparent',
              }}
            />
          );
        })}
      </div>
      {/* Milestone list */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0' }}>
        {calendar.map((m, i) => (
          <li key={i} style={{
            display: 'grid',
            gridTemplateColumns: '70px 90px 1fr 100px',
            gap: '0.75rem',
            padding: '0.45rem 0',
            borderBottom: '1px dashed rgba(255,255,255,0.08)',
            fontSize: '0.82rem',
            alignItems: 'center',
          }}>
            <span style={{ opacity: 0.65, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
              Day {m.day > 0 ? `+${m.day}` : m.day}
            </span>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: channelColor(m.channel) }}>
              {m.channel}
            </span>
            <span>{m.label}</span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
              {m.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
