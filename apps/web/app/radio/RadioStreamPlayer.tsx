'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { RadioShowSlot } from '@/config/radio-schedule';
import { RADIO_SHOWS } from '@/config/radio-schedule';

// AzuraCast public stream URL. Path must match the station shortcode and
// mountpoint configured on the droplet — currently station 1 "Big Muddy
// Radio" with shortcode "bigmuddyradio" and a 192kbps MP3 mount at
// /radio.mp3. Override via NEXT_PUBLIC_STREAM_URL in Vercel.
//
// NOTE: stream.bigmuddytouring.com must have a valid SSL cert for browsers
// to connect. Enable Let's Encrypt in AzuraCast admin:
// Settings → Web Updates → Let's Encrypt → apply for "stream.bigmuddytouring.com".
const STREAM_URL =
  process.env.NEXT_PUBLIC_STREAM_URL ||
  'https://stream.bigmuddytouring.com/listen/bigmuddyradio/radio.mp3';

const POLL_MS = 15_000;

type NowPlayingPayload = {
  online: boolean;
  title: string | null;
  artist: string | null;
  listeners: number | null;
};

function parseScheduleHour(time: string): number {
  const upper = time.toUpperCase();
  const isPM = upper.includes('PM');
  const core = time.replace(/\s*(AM|PM)\s*/i, '').trim();
  const [hRaw, mPart] = core.split(':');
  let hour = parseInt(hRaw, 10);
  if (Number.isNaN(hour)) return 0;
  const minute = mPart ? parseInt(mPart, 10) : 0;
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  void minute;
  return hour;
}

function getCurrentShowFromList(shows: RadioShowSlot[], date: Date): RadioShowSlot {
  if (shows.length === 0) {
    return { time: '—', name: 'Schedule', host: 'Big Muddy Radio' };
  }
  const currentHour = date.getHours();
  let currentShow = shows[shows.length - 1];
  for (let i = shows.length - 1; i >= 0; i--) {
    const hour = parseScheduleHour(shows[i].time);
    if (currentHour >= hour) {
      currentShow = shows[i];
      break;
    }
  }
  return currentShow;
}

export function RadioStreamPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [shows] = useState<RadioShowSlot[]>(RADIO_SHOWS);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingPayload>({
    online: false,
    title: null,
    artist: null,
    listeners: null,
  });
  const [clock, setClock] = useState(() => Date.now());
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const refreshNowPlaying = useCallback(() => {
    fetch('/api/radio/now-playing')
      .then((r) => r.json())
      .then((data: NowPlayingPayload) => {
        setNowPlaying({
          online: Boolean(data.online),
          title: typeof data.title === 'string' ? data.title : null,
          artist: typeof data.artist === 'string' ? data.artist : null,
          listeners:
            typeof data.listeners === 'number' && Number.isFinite(data.listeners)
              ? data.listeners
              : null,
        });
      })
      .catch(() => {
        setNowPlaying({ online: false, title: null, artist: null, listeners: null });
      });
  }, []);

  useEffect(() => {
    refreshNowPlaying();
    const id = setInterval(refreshNowPlaying, POLL_MS);
    return () => clearInterval(id);
  }, [refreshNowPlaying]);

  const currentShow = getCurrentShowFromList(shows, new Date(clock));

  const trackLabel = useMemo(() => {
    if (!nowPlaying.online) return null;
    const { artist, title } = nowPlaying;
    if (artist && title) return { line1: title, line2: artist };
    if (title) return { line1: title, line2: null };
    if (artist) return { line1: artist, line2: null };
    return null;
  }, [nowPlaying]);

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    el.volume = volume;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const changeVolume = (v: number) => {
    const n = Math.min(1, Math.max(0, v));
    setVolume(n);
    if (audioRef.current) audioRef.current.volume = n;
  };

  return (
    <>
      <audio ref={audioRef} preload="none">
        <source src={STREAM_URL} type="audio/mpeg" />
      </audio>

      <div
        style={{
          minHeight: '100%',
          width: '100%',
          maxWidth: 'min(560px, 100%)',
          margin: '0 auto',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          paddingBottom: 'clamp(2rem, 8vw, 4rem)',
          fontFamily: 'var(--font-body)',
          color: 'var(--text)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            paddingBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            borderBottom: '1px solid color-mix(in srgb, var(--text) 12%, transparent)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              margin: '0 0 0.75rem',
            }}
          >
            Live stream · Natchez, Mississippi
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 0.35rem',
              lineHeight: 1.15,
            }}
          >
            Big Muddy Radio
          </h1>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            On air now: <strong style={{ color: 'var(--text)' }}>{currentShow.name}</strong>
            <span style={{ opacity: 0.85 }}> · {currentShow.host}</span>
          </p>

          <div
            style={{
              minHeight: '3.25rem',
              marginBottom: '1.5rem',
            }}
          >
            {trackLabel ? (
              <>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
                    fontWeight: 600,
                    margin: '0 0 0.25rem',
                    lineHeight: 1.3,
                  }}
                >
                  {trackLabel.line1}
                </p>
                {trackLabel.line2 ? (
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    {trackLabel.line2}
                  </p>
                ) : null}
              </>
            ) : (
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {nowPlaying.online ? 'Waiting for track info…' : 'Stream connecting…'}
              </p>
            )}
          </div>

          <p style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {nowPlaying.listeners != null ? (
              <>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  {nowPlaying.listeners.toLocaleString()}
                </span>{' '}
                listening
              </>
            ) : (
              <span>Listeners: —</span>
            )}
          </p>

          <button
            type="button"
            onClick={() => void togglePlay()}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              width: 'clamp(88px, 22vw, 112px)',
              height: 'clamp(88px, 22vw, 112px)',
              borderRadius: '50%',
              border: '2px solid var(--accent)',
              background: playing ? 'var(--accent)' : 'transparent',
              color: playing ? 'var(--bg)' : 'var(--accent)',
              fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
              cursor: 'pointer',
              lineHeight: 1,
              marginBottom: '1.25rem',
              boxShadow: playing
                ? '0 0 0 6px color-mix(in srgb, var(--accent) 25%, transparent)'
                : 'none',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
            }}
          >
            {playing ? '⏸' : '▶'}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              maxWidth: '280px',
              margin: '0 auto',
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Volume</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(e) => changeVolume(parseInt(e.target.value, 10) / 100)}
              aria-label="Volume"
              style={{
                flex: 1,
                accentColor: 'var(--accent)',
              }}
            />
          </div>
        </div>

        <section style={{ marginTop: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              margin: '0 0 1rem',
            }}
          >
            Today&apos;s schedule
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {shows.map((show) => {
              const active = show.name === currentShow.name && show.time === currentShow.time;
              return (
                <li
                  key={`${show.time}-${show.name}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '5.5rem 1fr',
                    gap: '0.75rem',
                    alignItems: 'baseline',
                    padding: '0.55rem 0.65rem',
                    marginBottom: '0.35rem',
                    borderRadius: '8px',
                    background: active
                      ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
                      : 'color-mix(in srgb, var(--surface) 40%, transparent)',
                    border: `1px solid ${
                      active
                        ? 'color-mix(in srgb, var(--accent) 35%, transparent)'
                        : 'color-mix(in srgb, var(--text) 8%, transparent)'
                    }`,
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{show.time}</span>
                  <span>
                    <span
                      style={{
                        display: 'block',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        color: active ? 'var(--accent)' : 'var(--text)',
                      }}
                    >
                      {show.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{show.host}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <p
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
          }}
        >
          The voice of the Mississippi region — live from the river.
        </p>
      </div>
    </>
  );
}
