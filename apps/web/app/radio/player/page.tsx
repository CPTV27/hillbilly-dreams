'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

import type { RadioShowSlot } from '@/config/radio-schedule';

const streamUrl =
  process.env.NEXT_PUBLIC_ICECAST_URL || 'http://192.168.4.37:8010/stream';

type NowPlayingState = {
  online: boolean;
  title: string | null;
  artist: string | null;
};

function parseScheduleHour(time: string): number {
  const [h, minutePart] = time.split(':');
  const isPM = time.toUpperCase().includes('PM');
  let hour = parseInt(h, 10);
  if (Number.isNaN(hour)) return 0;
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  return hour;
}

function getCurrentShowFromList(shows: RadioShowSlot[], date: Date): RadioShowSlot {
  if (shows.length === 0) {
    return { time: '—', name: 'Schedule loading', host: 'Big Muddy Radio' };
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

export default function RadioPlayerPage() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [shows, setShows] = useState<RadioShowSlot[]>([]);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingState>({
    online: false,
    title: null,
    artist: null,
  });
  const [clock, setClock] = useState(() => Date.now());
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/radio/schedule')
      .then((r) => r.json())
      .then((data: { shows?: RadioShowSlot[] }) => {
        if (!cancelled && Array.isArray(data.shows)) setShows(data.shows);
      })
      .catch(() => {
        if (!cancelled) setShows([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshNowPlaying = useCallback(() => {
    fetch('/api/radio/now-playing')
      .then((r) => r.json())
      .then((data: NowPlayingState) => {
        setNowPlaying({
          online: Boolean(data.online),
          title: typeof data.title === 'string' ? data.title : null,
          artist: typeof data.artist === 'string' ? data.artist : null,
        });
      })
      .catch(() => {
        setNowPlaying({ online: false, title: null, artist: null });
      });
  }, []);

  useEffect(() => {
    refreshNowPlaying();
    const id = setInterval(refreshNowPlaying, 30_000);
    return () => clearInterval(id);
  }, [refreshNowPlaying]);

  const currentShow = getCurrentShowFromList(shows, new Date(clock));

  const streamLabel = useMemo(() => {
    if (!nowPlaying.online) return null;
    const { artist, title } = nowPlaying;
    if (artist && title) return `${artist} — ${title}`;
    if (title) return title;
    if (artist) return artist;
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
    el.src = streamUrl;
    el.volume = volume / 100;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  };

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <div className="rp">
        {/* Now Playing */}
        <div className="rp-now">
          <div className="rp-now__badge">Now Playing</div>
          <h1 className="rp-now__show">{currentShow.name}</h1>
          <p className="rp-now__host">{currentShow.host}</p>
          {streamLabel ? (
            <p className="rp-now__stream">{streamLabel}</p>
          ) : null}

          {/* Play Button */}
          <button
            type="button"
            className={`rp-play ${playing ? 'rp-play--active' : ''}`}
            onClick={() => void togglePlay()}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '⏸' : '▶'}
          </button>

          {/* Volume */}
          <div className="rp-volume">
            <span className="rp-volume__label">Vol</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => changeVolume(parseInt(e.target.value, 10))}
              className="rp-volume__slider"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="rp-schedule">
          <h2 className="rp-section-label">Today&apos;s Schedule</h2>
          {shows.map((show) => (
            <div
              key={show.time + show.name}
              className={`rp-show ${show.name === currentShow.name ? 'rp-show--active' : ''}`}
            >
              <span className="rp-show__time">{show.time}</span>
              <span className="rp-show__name">{show.name}</span>
              <span className="rp-show__host">{show.host}</span>
            </div>
          ))}
        </div>

        {/* Station Info */}
        <div className="rp-info">
          <p>Big Muddy Radio — The Voice of the Mississippi Region</p>
          <p>Broadcasting from Natchez, Mississippi</p>
        </div>
      </div>

      <style>{`
        .rp {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), system-ui, sans-serif;
        }

        .rp-now {
          text-align: center;
          padding: 2rem 0 1.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }
        .rp-now__badge {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--success);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .rp-now__badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
          animation: rp-pulse 2s infinite;
        }
        @keyframes rp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .rp-now__show {
          font-family: var(--font-display), var(--font-body), serif;
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 0.25rem;
          letter-spacing: -0.02em;
        }
        .rp-now__host {
          font-size: 0.85rem;
          color: var(--accent);
          margin: 0 0 0.5rem;
        }
        .rp-now__stream {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0 0 1.25rem;
          line-height: 1.4;
        }

        .rp-play {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          background: transparent;
          color: var(--accent);
          font-size: 1.5rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          margin-bottom: 1rem;
        }
        .rp-play:hover { background: var(--accent-muted); }
        .rp-play--active { background: var(--accent); color: var(--bg); }

        .rp-volume { display: flex; align-items: center; gap: 0.75rem; justify-content: center; }
        .rp-volume__label { font-size: 0.7rem; color: var(--text-muted); }
        .rp-volume__slider {
          width: 120px;
          accent-color: var(--accent);
        }

        .rp-section-label {
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .rp-schedule { margin-bottom: 2rem; }
        .rp-show {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
        }
        .rp-show--active { background: var(--accent-muted); }
        .rp-show__time { color: var(--text-muted); min-width: 70px; font-size: 0.7rem; }
        .rp-show__name { flex: 1; font-weight: 600; color: var(--text); }
        .rp-show--active .rp-show__name { color: var(--accent); }
        .rp-show__host { font-size: 0.7rem; color: var(--text-disabled); }

        .rp-info {
          text-align: center;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border);
          font-size: 0.75rem;
          color: var(--text-disabled);
        }
        .rp-info p { margin: 0.25rem 0; }
      `}</style>
    </>
  );
}
