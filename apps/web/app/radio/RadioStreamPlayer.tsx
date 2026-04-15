'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

function formatListenerLine(count: number | null, metaUnavailable: boolean): ReactNode {
  if (metaUnavailable) return <span>Listeners: —</span>;
  if (count == null) return <span>Listeners: —</span>;
  const word = count === 1 ? 'listener' : 'listeners';
  return (
    <>
      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{count.toLocaleString()}</span> {word}
    </>
  );
}

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

/** AzuraCast public now-playing JSON — polled directly from the stream host. */
const NOW_PLAYING_URL = 'https://stream.bigmuddytouring.com/api/nowplaying/bigmuddyradio';
const POLL_MS = 30_000;

type NowPlayingPayload = {
  online: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  artUrl: string | null;
  listeners: number | null;
  metaUnavailable: boolean;
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
    album: null,
    artUrl: null,
    listeners: null,
    metaUnavailable: true,
  });
  const [clock, setClock] = useState(() => Date.now());
  const [artVisible, setArtVisible] = useState(true);
  const [displayArtUrl, setDisplayArtUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const next = nowPlaying.artUrl;
    if (next === displayArtUrl) return;
    if (displayArtUrl == null && next) {
      setDisplayArtUrl(next);
      setArtVisible(true);
      return;
    }
    setArtVisible(false);
    const t = window.setTimeout(() => {
      setDisplayArtUrl(next);
      setArtVisible(true);
    }, 200);
    return () => window.clearTimeout(t);
  }, [nowPlaying.artUrl, displayArtUrl]);

  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const refreshNowPlaying = useCallback(() => {
    fetch(NOW_PLAYING_URL, { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<Record<string, unknown>>;
      })
      .then((data) => {
        const listenersObj = data.listeners as Record<string, unknown> | undefined;
        const station = data.station as Record<string, unknown> | undefined;
        const mounts = station?.mounts as Array<Record<string, unknown>> | undefined;
        const mountListeners = mounts?.[0]?.listeners as Record<string, unknown> | undefined;

        let listeners: number | null = null;
        const lc = listenersObj?.current;
        if (typeof lc === 'number' && Number.isFinite(lc)) listeners = lc;
        else if (typeof lc === 'string') {
          const n = parseInt(lc, 10);
          if (Number.isFinite(n)) listeners = n;
        }
        if (listeners == null && mountListeners) {
          const mc = mountListeners.current;
          if (typeof mc === 'number' && Number.isFinite(mc)) listeners = mc;
          else if (typeof mc === 'string') {
            const n = parseInt(mc, 10);
            if (Number.isFinite(n)) listeners = n;
          }
        }

        const np = data.now_playing as Record<string, unknown> | undefined;
        const song = np?.song as Record<string, unknown> | undefined;
        const title = typeof song?.title === 'string' ? song.title : null;
        const artist = typeof song?.artist === 'string' ? song.artist : null;
        const album = typeof song?.album === 'string' ? song.album : null;
        const artUrl = typeof song?.art === 'string' ? song.art : null;
        const isOnline = data.is_online === true;

        setNowPlaying({
          online: isOnline,
          title,
          artist,
          album,
          artUrl,
          listeners,
          metaUnavailable: false,
        });
      })
      .catch(() => {
        setNowPlaying({
          online: false,
          title: null,
          artist: null,
          album: null,
          artUrl: null,
          listeners: null,
          metaUnavailable: true,
        });
      });
  }, []);

  useEffect(() => {
    refreshNowPlaying();
    const id = setInterval(refreshNowPlaying, POLL_MS);
    return () => clearInterval(id);
  }, [refreshNowPlaying]);

  const currentShow = getCurrentShowFromList(shows, new Date(clock));

  const trackLabel = useMemo(() => {
    if (nowPlaying.metaUnavailable) return null;
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
            position: 'relative',
            textAlign: 'center',
            paddingBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            borderBottom: '1px solid color-mix(in srgb, var(--text) 12%, transparent)',
          }}
        >
          {playing ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.58rem',
                fontWeight: 800,
                letterSpacing: '0.22em',
                color: 'var(--accent)',
              }}
              aria-live="polite"
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'color-mix(in srgb, var(--accent) 85%, var(--bg))',
                  boxShadow: '0 0 0 0 color-mix(in srgb, var(--accent) 45%, transparent)',
                  animation: 'bmrOnAirPulse 1.4s ease-in-out infinite',
                }}
              />
              ON AIR
            </div>
          ) : null}
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
              display: 'grid',
              gridTemplateColumns: displayArtUrl || !nowPlaying.metaUnavailable ? 'minmax(72px, 96px) 1fr' : '1fr',
              gap: '1rem',
              alignItems: 'center',
              minHeight: '3.25rem',
              marginBottom: '1.5rem',
              padding: '0.75rem 0.85rem',
              borderRadius: '10px',
              background: 'color-mix(in srgb, var(--surface) 55%, transparent)',
              border: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
            }}
          >
            {!nowPlaying.metaUnavailable && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 96,
                  aspectRatio: '1',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: `
                    repeating-conic-gradient(
                      color-mix(in srgb, var(--text) 14%, transparent) 0% 2deg,
                      transparent 2deg 4deg
                    ),
                    radial-gradient(
                      circle at 50% 50%,
                      color-mix(in srgb, var(--text) 18%, var(--bg)) 0%,
                      var(--bg) 62%
                    )
                  `,
                }}
              >
                {displayArtUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- external AzuraCast art URL
                  <img
                    src={displayArtUrl}
                    alt=""
                    width={96}
                    height={96}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: artVisible ? 1 : 0,
                      transition: 'opacity 200ms ease-out',
                    }}
                  />
                ) : null}
              </div>
            )}
            <div style={{ minWidth: 0 }}>
              {nowPlaying.metaUnavailable ? (
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Stream loading…
                </p>
              ) : trackLabel ? (
                <>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.05rem, 3.2vw, 1.3rem)',
                      fontWeight: 600,
                      margin: '0 0 0.25rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {trackLabel.line1}
                  </p>
                  {trackLabel.line2 ? (
                    <p style={{ margin: '0 0 0.2rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      {trackLabel.line2}
                    </p>
                  ) : null}
                  {nowPlaying.album ? (
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', opacity: 0.9 }}>
                      {nowPlaying.album}
                    </p>
                  ) : null}
                </>
              ) : (
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {nowPlaying.online ? 'Waiting for track info…' : 'Stream connecting…'}
                </p>
              )}
            </div>
          </div>

          <p style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {formatListenerLine(nowPlaying.listeners, nowPlaying.metaUnavailable)}
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

      <style>{`
        @keyframes bmrOnAirPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 40%, transparent);
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 0%, transparent);
            opacity: 0.85;
          }
        }
      `}</style>
    </>
  );
}
