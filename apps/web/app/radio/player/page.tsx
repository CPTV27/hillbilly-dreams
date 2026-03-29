'use client';

import { useState, useRef } from 'react';

/* eslint-disable @next/next/no-img-element */

// Icecast stream URL — Mac mini at the Inn
const STREAM_URL = 'http://localhost:8010/stream';
// Fallback: public test stream for when not on local network
const FALLBACK_URL = '';

const SHOWS = [
  { time: '6:00 AM', name: 'Delta Dawn Report', host: 'Delta Dawn' },
  { time: '6:15 AM', name: 'Morning Levee Rise', host: 'Automated' },
  { time: '9:00 AM', name: 'Porch Talk', host: 'Miss Pearline' },
  { time: '10:00 AM', name: 'Corridor Crossroads', host: 'Automated' },
  { time: '12:00 PM', name: 'The Juke Joint Hour', host: 'Automated' },
  { time: '1:00 PM', name: 'Rotating Specials', host: 'Various' },
  { time: '3:00 PM', name: 'Mechanical Bull Sessions', host: 'Live Studio' },
  { time: '4:00 PM', name: 'Honky Tonk Highway', host: 'Automated' },
  { time: '6:00 PM', name: 'River Rat Radio', host: 'River Rat Ray' },
  { time: '7:00 PM', name: 'Late Night Levee', host: 'Deacon Slim' },
  { time: '10:00 PM', name: 'Catfish Carl After Dark', host: 'Catfish Carl' },
  { time: '12:00 AM', name: 'The Overnight', host: 'Automated' },
];

export default function RadioPlayerPage() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = STREAM_URL || FALLBACK_URL;
      audioRef.current.volume = volume / 100;
      audioRef.current.play().catch(() => {
        // Stream not available — show message
        setPlaying(false);
      });
    }
    setPlaying(!playing);
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  };

  // Determine current show based on time
  const now = new Date();
  const currentHour = now.getHours();
  let currentShow = SHOWS[SHOWS.length - 1]; // default to overnight
  for (let i = SHOWS.length - 1; i >= 0; i--) {
    const [h] = SHOWS[i].time.split(':');
    const isPM = SHOWS[i].time.includes('PM');
    let hour = parseInt(h);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    if (currentHour >= hour) { currentShow = SHOWS[i]; break; }
  }

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <div className="rp">
        {/* Now Playing */}
        <div className="rp-now">
          <div className="rp-now__badge">Now Playing</div>
          <h1 className="rp-now__show">{currentShow.name}</h1>
          <p className="rp-now__host">{currentShow.host}</p>

          {/* Play Button */}
          <button className={`rp-play ${playing ? 'rp-play--active' : ''}`} onClick={togglePlay}>
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
              onChange={e => changeVolume(parseInt(e.target.value))}
              className="rp-volume__slider"
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="rp-schedule">
          <h2 className="rp-section-label">Today&apos;s Schedule</h2>
          {SHOWS.map(show => (
            <div key={show.time} className={`rp-show ${show.name === currentShow.name ? 'rp-show--active' : ''}`}>
              <span className="rp-show__time">{show.time}</span>
              <span className="rp-show__name">{show.name}</span>
              <span className="rp-show__host">{show.host}</span>
            </div>
          ))}
        </div>

        {/* Station Info */}
        <div className="rp-info">
          <p>Big Muddy Radio — The Voice of the Mississippi Corridor</p>
          <p>Broadcasting from Natchez, Mississippi</p>
        </div>
      </div>

      <style>{`
        .rp {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          background: #0f0f0d;
          color: #e8e0d4;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .rp-now {
          text-align: center;
          padding: 2rem 0 1.5rem;
          border-bottom: 1px solid #2a2520;
          margin-bottom: 1.5rem;
        }
        .rp-now__badge {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #22c55e;
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
          background: #22c55e;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .rp-now__show {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 0.25rem;
          letter-spacing: -0.02em;
        }
        .rp-now__host { font-size: 0.85rem; color: #c8943e; margin: 0 0 1.5rem; }

        .rp-play {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2px solid #c8943e;
          background: transparent;
          color: #c8943e;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 1rem;
        }
        .rp-play:hover { background: rgba(200, 148, 62, 0.1); }
        .rp-play--active { background: #c8943e; color: #0f0f0d; }

        .rp-volume { display: flex; align-items: center; gap: 0.75rem; justify-content: center; }
        .rp-volume__label { font-size: 0.7rem; color: #6a6560; }
        .rp-volume__slider {
          width: 120px;
          accent-color: #c8943e;
        }

        .rp-section-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6a6560;
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
        .rp-show--active { background: rgba(200, 148, 62, 0.08); }
        .rp-show__time { color: #6a6560; min-width: 70px; font-size: 0.7rem; }
        .rp-show__name { flex: 1; font-weight: 600; color: #e8e0d4; }
        .rp-show--active .rp-show__name { color: #c8943e; }
        .rp-show__host { font-size: 0.7rem; color: #5a5550; }

        .rp-info {
          text-align: center;
          padding: 1.5rem 0;
          border-top: 1px solid #2a2520;
          font-size: 0.75rem;
          color: #5a5550;
        }
        .rp-info p { margin: 0.25rem 0; }
      `}</style>
    </>
  );
}
