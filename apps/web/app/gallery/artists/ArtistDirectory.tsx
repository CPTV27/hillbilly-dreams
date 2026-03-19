'use client';

// apps/web/app/gallery/artists/ArtistDirectory.tsx
// Client component — handles filter pill state and filtered artist grid.

import { useState } from 'react';
import { DEMO_ARTISTS, DEMO_ARTWORKS, MEDIUMS, type Medium } from '../demo-data';

const ALL = 'All';
type FilterValue = typeof ALL | Medium;

function getAvailableCount(artistId: string): number {
  return DEMO_ARTWORKS.filter((w) => w.artistId === artistId && w.available).length;
}

export default function ArtistDirectory() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(ALL);

  const filters: FilterValue[] = [ALL, ...MEDIUMS];

  const filtered = activeFilter === ALL
    ? DEMO_ARTISTS
    : DEMO_ARTISTS.filter((a) => a.medium === activeFilter);

  return (
    <section
      style={{
        background: 'var(--bg)',
        padding: 'var(--space-12) 0 var(--space-20) 0',
      }}
    >
      <div className="section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        {/* Filter pills */}
        <div
          role="group"
          aria-label="Filter artists by medium"
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-10)',
          }}
        >
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={isActive}
                style={{
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? 'var(--bg)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-strong)',
                  padding: 'var(--space-2) var(--space-5)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  letterSpacing: 'var(--tracking-wide)',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.15s ease',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-8)',
          }}
          aria-live="polite"
        >
          {filtered.length} {filtered.length === 1 ? 'artist' : 'artists'}
          {activeFilter !== ALL && ` working in ${activeFilter.toLowerCase()}`}
        </p>

        {/* Artist grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-5)',
          }}
          role="list"
        >
          {filtered.map((artist) => {
            const initials = artist.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();
            const availableCount = getAvailableCount(artist.id);

            return (
              <article
                key={artist.id}
                role="listitem"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border-strong)';
                  el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Avatar bar */}
                <div
                  style={{
                    height: '160px',
                    background: 'var(--surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid var(--border)',
                  }}
                  aria-hidden="true"
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'var(--surface-3)',
                      border: '2px solid var(--border-strong)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 700,
                        color: 'var(--accent)',
                      }}
                    >
                      {initials}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {/* Featured badge */}
                  {artist.featured && (
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        letterSpacing: 'var(--tracking-wider)',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        background: 'var(--accent-muted)',
                        padding: 'var(--space-1) var(--space-3)',
                        alignSelf: 'flex-start',
                      }}
                    >
                      Featured
                    </span>
                  )}

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 600,
                      color: 'var(--text)',
                      margin: 0,
                      lineHeight: 'var(--leading-snug)',
                    }}
                  >
                    {artist.name}
                  </h2>

                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {artist.city}, {artist.state}
                    </span>
                    <span style={{ color: 'var(--border-strong)' }}>·</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--accent)',
                        fontWeight: 500,
                      }}
                    >
                      {artist.medium}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-normal)',
                      color: 'var(--text-muted)',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {artist.bio}
                  </p>

                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 'var(--space-4)',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {availableCount} {availableCount === 1 ? 'work' : 'works'} available
                    </span>
                    <a
                      href={`/gallery/artists/${artist.slug}`}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        letterSpacing: 'var(--tracking-wide)',
                      }}
                      aria-label={`View ${artist.name}'s gallery`}
                    >
                      View Gallery →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--space-20) 0',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
            }}
          >
            No artists in that medium yet. Check back soon.
          </div>
        )}
      </div>
    </section>
  );
}
