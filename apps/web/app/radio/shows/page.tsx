'use client';

import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */

const GCS = 'https://storage.googleapis.com/bmt-media-bigmuddy/radio/show-posters';

const SHOWS = [
  { time: '6:00 AM', name: 'Delta Dawn Report', slug: 'delta-dawn-report', host: 'Delta Dawn', desc: 'Morning news, weather, and river conditions. The corridor wakes up here.', day: 'Daily' },
  { time: '6:15 AM', name: 'Morning Levee Rise', slug: 'morning-levee-rise', host: 'Automated', desc: 'Wake-up blues and gospel. Coffee music from the Delta.', day: 'Daily' },
  { time: '9:00 AM', name: 'Porch Talk', slug: 'porch-talk', host: 'Miss Pearline', desc: 'Conversations, opinions, and community gossip. Miss Pearline holds court.', day: 'Weekdays' },
  { time: '9:00 AM', name: 'Miss Pearline Kitchen Table Hour', slug: 'miss-pearline-kitchen-table', host: 'Miss Pearline', desc: 'Recipes, stories, and life advice from the woman who knows everybody.', day: 'Saturdays' },
  { time: '10:00 AM', name: 'Corridor Crossroads', slug: 'corridor-crossroads', host: 'Automated', desc: 'Music mix from across the river region. Memphis to New Orleans.', day: 'Daily' },
  { time: '12:00 PM', name: 'The Juke Joint Hour', slug: 'juke-joint-hour', host: 'Automated', desc: 'Raw Mississippi blues. The kind of music that sounds like dirt roads.', day: 'Daily' },
  { time: '1:00 PM', name: 'Buddy Boy Backroads', slug: 'buddy-boy-backroads', host: 'Buddy Boy', desc: 'Back roads, lost highways, and the stories between the mile markers.', day: 'Mon/Wed' },
  { time: '1:00 PM', name: 'The Outsider Economics Hour', slug: 'outsider-economics-hour', host: 'Chase', desc: 'How money actually works in small towns. The math nobody ran.', day: 'Tuesdays' },
  { time: '1:00 PM', name: 'Velvet Grit', slug: 'velvet-grit', host: 'Velvet', desc: 'Smooth vocals over rough edges. Soul, R&B, and the space in between.', day: 'Thursdays' },
  { time: '1:00 PM', name: 'Swamp Thing', slug: 'swamp-thing', host: 'Automated', desc: 'Bayou funk, zydeco, swamp pop. Louisiana bleeds into Mississippi.', day: 'Fridays' },
  { time: '3:00 PM', name: 'Mechanical Bull Sessions', slug: 'mechanical-bull-sessions', host: 'Live Studio', desc: 'Live recordings from the Big Muddy studio. Artists, interviews, performances.', day: 'Daily' },
  { time: '4:00 PM', name: 'Honky Tonk Highway', slug: 'honky-tonk-highway', host: 'Automated', desc: 'Drive-time country and rock. Windows down, volume up.', day: 'Daily' },
  { time: '6:00 PM', name: 'River Rat Radio', slug: 'river-rat-radio', host: 'River Rat Ray', desc: 'Requests, dedications, and river stories. Call in your song.', day: 'Weekdays' },
  { time: '7:00 PM', name: 'The Deacon Slim Show', slug: 'deacon-slim-show', host: 'Deacon Slim', desc: 'Soul music and slow blues. Deacon Slim knows what your heart needs.', day: 'Fri/Sat' },
  { time: '7:00 PM', name: 'Late Night Levee', slug: 'late-night-levee', host: 'Automated', desc: 'Slow blues and whiskey music. The levee at midnight.', day: 'Sun-Thu' },
  { time: '10:00 PM', name: 'Catfish Carl After Dark', slug: 'catfish-carl-after-dark', host: 'Catfish Carl', desc: 'Conspiracy theories, catfish recipes, and the best late-night radio in the Delta.', day: 'Fri/Sat' },
  { time: '12:00 AM', name: 'The Overnight', slug: 'the-overnight', host: 'Automated', desc: 'Deep playlist automation. The river runs all night.', day: 'Daily' },
  { time: '9:00 AM', name: 'Sunday Morning Gospel Train', slug: 'sunday-morning-gospel-train', host: 'Community', desc: 'Church music from the bluff. Every choir, every pew, every hallelujah.', day: 'Sundays' },
];

export default function RadioShowsPage() {
  const [filter, setFilter] = useState('All');
  const days = ['All', 'Daily', 'Weekdays', 'Saturdays', 'Sundays', 'Fri/Sat'];
  const filtered = filter === 'All' ? SHOWS : SHOWS.filter(s => s.day.includes(filter) || s.day === 'Daily');

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0d', color: '#e8e0d4', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header style={{ padding: '2rem 1.5rem 1rem', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', marginBottom: '0.5rem' }}>
          Big Muddy Radio
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          The Shows
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#8a8074', maxWidth: 500, margin: '0 auto 1.5rem' }}>
          18 shows. 7 hosts. Broadcasting from Natchez, Mississippi.
        </p>

        {/* Day filter */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {days.map(d => (
            <button key={d} onClick={() => setFilter(d)} style={{
              padding: '6px 14px', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700,
              border: '1px solid', cursor: 'pointer',
              borderColor: filter === d ? '#c8943e' : '#2a2520',
              background: filter === d ? '#c8943e' : 'transparent',
              color: filter === d ? '#0f0f0d' : '#6a6560',
            }}>
              {d}
            </button>
          ))}
        </div>

        {/* Listen button */}
        <a href="/radio/player" style={{
          display: 'inline-block', padding: '10px 24px', background: '#c8943e', color: '#0f0f0d',
          borderRadius: 8, fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', letterSpacing: '0.03em',
        }}>
          Listen Live
        </a>
      </header>

      {/* Show Grid */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem 1.5rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {filtered.map(show => (
            <div key={show.slug} style={{
              background: '#1a1816',
              border: '1px solid #2a2520',
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8943e40'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2520'; e.currentTarget.style.transform = 'none'; }}
            >
              {/* Poster */}
              <img
                src={`${GCS}/${show.slug}.webp`}
                alt={show.name}
                loading="lazy"
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Info */}
              <div style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {show.time}
                  </span>
                  <span style={{ fontSize: '0.6rem', color: '#5a5550', fontWeight: 600 }}>
                    {show.day}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem', color: '#e8e0d4' }}>
                  {show.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#c8943e', margin: '0 0 0.5rem', fontWeight: 600 }}>
                  {show.host}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#6a6560', lineHeight: 1.5, margin: 0 }}>
                  {show.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
