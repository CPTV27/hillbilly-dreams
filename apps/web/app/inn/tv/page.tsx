'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* eslint-disable @next/next/no-img-element */

const CHANNELS = [
  {
    id: 'welcome',
    name: 'Welcome',
    icon: 'W',
    description: 'Big Muddy Inn — Guest Information',
    content: 'welcome',
  },
  {
    id: 'video',
    name: 'Big Muddy TV',
    icon: 'TV',
    description: 'Branded content from the Big Muddy ecosystem',
    content: 'video',
  },
  {
    id: 'radio',
    name: 'Big Muddy Radio',
    icon: 'R',
    description: 'Live radio from Natchez',
    content: 'radio',
  },
  {
    id: 'gallery',
    name: 'Photo Gallery',
    icon: 'G',
    description: 'Photography from the Mississippi Region',
    content: 'gallery',
  },
  {
    id: 'directory',
    name: 'Local Picks',
    icon: 'D',
    description: "Tonight's recommendations",
    content: 'directory',
  },
  {
    id: 'shows',
    name: 'Live Shows',
    icon: 'S',
    description: 'Watch live from the Blues Room',
    content: 'shows',
  },
];

const GALLERY_IMAGES = [
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-foyer.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-inn-dusk.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp',
];

const VIDEO_SPOTS = [
  {
    brand: 'Deep South Directory',
    tagline: 'Main Street marketing for Main Street money.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp',
  },
  {
    brand: 'Big Muddy Touring',
    tagline: 'We book the bands. We drive them there. We put them on the radio.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
  },
  {
    brand: 'Big Muddy Magazine',
    tagline: 'Stories from the Deep South.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp',
  },
  {
    brand: 'Big Muddy Radio',
    tagline: 'The voice of the Mississippi region.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp',
  },
  {
    brand: 'Big Muddy Entertainment',
    tagline: 'Magical musical moments.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-inn-dusk.webp',
  },
  {
    brand: 'Big Muddy Records',
    tagline: 'Artists keep their masters. We keep the system.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-foyer.webp',
  },
  {
    brand: 'Bearsville Creative',
    tagline: 'The northeast node. Woodstock, NY.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp',
  },
  {
    brand: 'Outsider Economics',
    tagline: 'Field manual for building local economies.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
  },
  {
    brand: 'Deep South Directory',
    tagline: 'Your Google listing says you close at 5. We can fix that.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp',
  },
  {
    brand: 'Big Muddy Touring',
    tagline: 'Every show has a 2:1 ecosystem multiplier.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp',
  },
  {
    brand: 'Big Muddy Radio',
    tagline: 'Streaming from a Mac Mini in a Victorian inn.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-inn-dusk.webp',
  },
  {
    brand: 'Big Muddy Records',
    tagline: '$3,000 per release. Not $50,000.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-foyer.webp',
  },
  {
    brand: 'Deep South Directory',
    tagline: 'Three hundred dollars for Birdeye. Ninety-nine for us.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp',
  },
  {
    brand: 'Bearsville Creative',
    tagline: 'Same platform. Different region. Summer 2026.',
    bg: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
  },
];

const DIRECTORY_PICKS = [
  {
    category: 'Dinner Tonight',
    name: "Biscuits & Blues",
    detail: 'Regina Charboneau · Natchez, MS',
  },
  {
    category: 'Live Music',
    name: 'Blues Room at The Big Muddy Inn',
    detail: 'Doors at 7 · On site',
  },
  {
    category: 'Coffee Tomorrow',
    name: 'The Camp',
    detail: 'Downtown Natchez',
  },
  {
    category: 'Antiques',
    name: 'Natchez Antique District',
    detail: 'Franklin Street',
  },
  {
    category: 'History',
    name: 'Stanton Hall',
    detail: 'National Historic Landmark · Built 1857',
  },
  {
    category: 'River Views',
    name: 'Natchez Bluff Park',
    detail: 'Best sunset in Mississippi',
  },
];

// Auto-cycle sequence: channel id + duration in ms
const AUTO_CYCLE_SEQUENCE = [
  { channel: 'welcome',   duration: 15000 },
  { channel: 'video',     duration: 24000 },
  { channel: 'gallery',   duration: 24000 },
  { channel: 'radio',     duration: 15000 },
];
const IDLE_TIMEOUT = 30000;

export default function InRoomTVPage() {
  const [activeChannel, setActiveChannel] = useState('welcome');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoFading, setVideoFading] = useState(false);
  const [directoryIndex, setDirectoryIndex] = useState(0);
  const [autoCycleActive, setAutoCycleActive] = useState(false);
  const [autoCycleStep, setAutoCycleStep] = useState(0);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Auto-cycle logic ---

  const stopAutoCycle = useCallback(() => {
    setAutoCycleActive(false);
    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  }, []);

  const startAutoCycle = useCallback(() => {
    setAutoCycleActive(true);
    setAutoCycleStep(0);
    setActiveChannel(AUTO_CYCLE_SEQUENCE[0].channel);
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      startAutoCycle();
    }, IDLE_TIMEOUT);
  }, [startAutoCycle]);

  // Advance auto-cycle steps
  useEffect(() => {
    if (!autoCycleActive) return;
    const step = AUTO_CYCLE_SEQUENCE[autoCycleStep];
    cycleTimerRef.current = setTimeout(() => {
      const nextStep = (autoCycleStep + 1) % AUTO_CYCLE_SEQUENCE.length;
      setAutoCycleStep(nextStep);
      setActiveChannel(AUTO_CYCLE_SEQUENCE[nextStep].channel);
    }, step.duration);
    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [autoCycleActive, autoCycleStep]);

  // Idle detection on mount
  useEffect(() => {
    resetIdleTimer();
    const events = ['mousedown', 'touchstart', 'keydown', 'pointermove'];
    const onActivity = () => {
      stopAutoCycle();
      resetIdleTimer();
    };
    events.forEach(e => window.addEventListener(e, onActivity, { passive: true }));
    return () => {
      events.forEach(e => window.removeEventListener(e, onActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [resetIdleTimer, stopAutoCycle]);

  // --- Video crossfade cycle ---
  useEffect(() => {
    if (activeChannel !== 'video') return;
    const t = setInterval(() => {
      setVideoFading(true);
      setTimeout(() => {
        setVideoIndex(i => (i + 1) % VIDEO_SPOTS.length);
        setVideoFading(false);
      }, 600);
    }, 8000);
    return () => clearInterval(t);
  }, [activeChannel]);

  // --- Gallery auto-advance when in auto-cycle ---
  useEffect(() => {
    if (activeChannel !== 'gallery') return;
    const t = setInterval(() => {
      setGalleryIndex(i => (i + 1) % GALLERY_IMAGES.length);
    }, 8000);
    return () => clearInterval(t);
  }, [activeChannel]);

  // --- Directory cycle ---
  useEffect(() => {
    if (activeChannel !== 'directory') return;
    const t = setInterval(() => {
      setDirectoryIndex(i => (i + 1) % DIRECTORY_PICKS.length);
    }, 10000);
    return () => clearInterval(t);
  }, [activeChannel]);

  const handleChannelSelect = (id: string) => {
    stopAutoCycle();
    resetIdleTimer();
    setActiveChannel(id);
  };

  const spot = VIDEO_SPOTS[videoIndex];
  const pick = DIRECTORY_PICKS[directoryIndex];

  return (
    <>
      <div className="tv">
        {/* Auto-cycle indicator */}
        {autoCycleActive && (
          <div className="tv-auto-indicator" aria-label="Auto cycling channels">
            <span className="tv-auto-dot" />
            <span className="tv-auto-label">AUTO</span>
          </div>
        )}

        {/* Channel Content */}
        <div className="tv-content">

          {/* WELCOME */}
          {activeChannel === 'welcome' && (
            <div className="tv-welcome">
              <img
                src="https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/10-watercolor/small-town-street.webp"
                alt="Welcome"
                className="tv-welcome__bg"
              />
              <div className="tv-welcome__overlay" />
              <div className="tv-welcome__text">
                <p className="tv-welcome__eyebrow">Welcome to</p>
                <h1 className="tv-welcome__title">The Big Muddy Inn</h1>
                <p className="tv-welcome__tagline">411 North Commerce Street &middot; Natchez, Mississippi</p>
                <div className="tv-welcome__info">
                  <div className="tv-info-card">
                    <span className="tv-info-card__label">WiFi</span>
                    <span className="tv-info-card__value">BigMuddy-Guest</span>
                  </div>
                  <div className="tv-info-card">
                    <span className="tv-info-card__label">Radio</span>
                    <span className="tv-info-card__value">bigmuddyradio.com</span>
                  </div>
                  <div className="tv-info-card">
                    <span className="tv-info-card__label">Front Desk</span>
                    <span className="tv-info-card__value">(769) 376-8045</span>
                  </div>
                </div>
                <p className="tv-welcome__shows">Tonight: Blues Room &middot; Check the Shows channel for details</p>
              </div>
            </div>
          )}

          {/* VIDEO / BIG MUDDY TV */}
          {activeChannel === 'video' && (
            <div className="tv-video">
              <div
                className={`tv-video__card ${videoFading ? 'tv-video__card--fade' : ''}`}
                style={{ '--spot-bg': `url(${spot.bg})` } as React.CSSProperties}
              >
                <div className="tv-video__bg-img" />
                <div className="tv-video__bg-overlay" />
                <div className="tv-video__body">
                  <p className="tv-video__channel-label">Big Muddy TV</p>
                  <h2 className="tv-video__brand">{spot.brand}</h2>
                  <p className="tv-video__tagline">{spot.tagline}</p>
                  <div className="tv-video__pulse-row">
                    <span className="tv-video__pulse" />
                    <span className="tv-video__pulse" style={{ animationDelay: '0.3s' }} />
                    <span className="tv-video__pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                </div>
                <div className="tv-video__counter">
                  {videoIndex + 1} / {VIDEO_SPOTS.length}
                </div>
              </div>
            </div>
          )}

          {/* RADIO */}
          {activeChannel === 'radio' && (
            <div className="tv-radio">
              <div className="tv-radio__vis">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="tv-radio__bar"
                    style={{
                      height: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <h2 className="tv-radio__title">Big Muddy Radio</h2>
              <p className="tv-radio__sub">The Voice of the Mississippi Region</p>
              <p className="tv-radio__now">Now Playing: Late Night Levee with Deacon Slim</p>
            </div>
          )}

          {/* GALLERY */}
          {activeChannel === 'gallery' && (
            <div
              className="tv-gallery"
              onClick={() => setGalleryIndex((galleryIndex + 1) % GALLERY_IMAGES.length)}
            >
              <img
                src={GALLERY_IMAGES[galleryIndex]}
                alt="Gallery"
                className="tv-gallery__img"
              />
              <div className="tv-gallery__caption">
                <span>Chase Pierson Photography</span>
                <span>{galleryIndex + 1} / {GALLERY_IMAGES.length}</span>
              </div>
            </div>
          )}

          {/* DIRECTORY / LOCAL PICKS */}
          {activeChannel === 'directory' && (
            <div className="tv-dir">
              <div className="tv-dir__header">
                <p className="tv-dir__eyebrow">Curated for Tonight</p>
                <h2 className="tv-dir__title">Local Picks</h2>
              </div>
              <div className="tv-dir__card">
                <p className="tv-dir__category">{pick.category}</p>
                <h3 className="tv-dir__name">{pick.name}</h3>
                <p className="tv-dir__detail">{pick.detail}</p>
                <div className="tv-dir__dots">
                  {DIRECTORY_PICKS.map((_, i) => (
                    <span
                      key={i}
                      className={`tv-dir__dot ${i === directoryIndex ? 'tv-dir__dot--active' : ''}`}
                    />
                  ))}
                </div>
                <p className="tv-dir__powered">Powered by Deep South Directory</p>
              </div>
            </div>
          )}

          {/* SHOWS */}
          {activeChannel === 'shows' && (
            <div className="tv-shows">
              <h2 className="tv-shows__title">Blues Room — Live</h2>
              <div className="tv-shows__placeholder">
                <p>No live broadcast right now</p>
                <p className="tv-shows__next">Next show: Check the welcome screen for tonight&apos;s schedule</p>
              </div>
            </div>
          )}
        </div>

        {/* Channel Selector */}
        <nav className="tv-nav" aria-label="Channel navigation">
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              className={`tv-nav__btn ${activeChannel === ch.id ? 'tv-nav__btn--active' : ''}`}
              onClick={() => handleChannelSelect(ch.id)}
              aria-pressed={activeChannel === ch.id}
              aria-label={ch.description}
            >
              <span className="tv-nav__icon">{ch.icon}</span>
              <span className="tv-nav__name">{ch.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        .tv {
          width: 100vw;
          height: 100vh;
          background: #0a0a08;
          color: #e8e0d4;
          font-family: 'Inter', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .tv-content { flex: 1; position: relative; overflow: hidden; }

        /* Auto-cycle indicator */
        .tv-auto-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(10,10,8,0.6);
          border: 1px solid rgba(200,148,62,0.25);
          border-radius: 20px;
          padding: 0.25rem 0.6rem 0.25rem 0.4rem;
          pointer-events: none;
        }
        .tv-auto-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8943e;
          animation: autoPulse 2s ease-in-out infinite;
        }
        .tv-auto-label {
          font-size: 0.5rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #c8943e;
          text-transform: uppercase;
        }
        @keyframes autoPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        /* Welcome */
        .tv-welcome { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .tv-welcome__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3; }
        .tv-welcome__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,10,8,0.4) 0%, rgba(10,10,8,0.85) 100%); }
        .tv-welcome__text { position: relative; text-align: center; padding: 2rem; }
        .tv-welcome__eyebrow { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #c8943e; margin-bottom: 0.5rem; }
        .tv-welcome__title { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; margin: 0 0 0.5rem; letter-spacing: -0.03em; }
        .tv-welcome__tagline { font-size: 1rem; color: #8a8074; margin-bottom: 2rem; }
        .tv-welcome__info { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
        .tv-info-card { background: rgba(200,148,62,0.08); border: 1px solid rgba(200,148,62,0.2); border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; }
        .tv-info-card__label { display: block; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #c8943e; margin-bottom: 0.25rem; }
        .tv-info-card__value { display: block; font-size: 0.9rem; font-weight: 600; }
        .tv-welcome__shows { font-size: 0.8rem; color: #c8943e; font-style: italic; }

        /* Video */
        .tv-video { width: 100%; height: 100%; position: relative; }
        .tv-video__card {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.6s ease;
        }
        .tv-video__card--fade { opacity: 0; }
        .tv-video__bg-img {
          position: absolute;
          inset: 0;
          background-image: var(--spot-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.18;
          animation: slowDrift 20s ease-in-out infinite alternate;
        }
        @keyframes slowDrift {
          from { transform: scale(1) translateX(0); }
          to   { transform: scale(1.06) translateX(-1.5%); }
        }
        .tv-video__bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,10,8,0.75) 0%, rgba(20,14,6,0.88) 100%);
        }
        .tv-video__body {
          position: relative;
          text-align: center;
          padding: 2rem;
          max-width: 700px;
        }
        .tv-video__channel-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #5a5550;
          margin: 0 0 1.25rem;
        }
        .tv-video__brand {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #c8943e;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .tv-video__tagline {
          font-size: clamp(0.85rem, 2vw, 1.15rem);
          color: #e8e0d4;
          margin: 0 0 2rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        .tv-video__pulse-row {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }
        .tv-video__pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c8943e;
          animation: spotPulse 2.4s ease-in-out infinite;
          opacity: 0.5;
        }
        @keyframes spotPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        .tv-video__counter {
          position: absolute;
          bottom: 1.25rem;
          right: 1.5rem;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #5a5550;
        }

        /* Radio */
        .tv-radio { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
        .tv-radio__vis { display: flex; gap: 4px; align-items: flex-end; height: 120px; margin-bottom: 2rem; }
        .tv-radio__bar { width: 8px; background: #c8943e; border-radius: 4px 4px 0 0; animation: radioBar 1.5s ease-in-out infinite; }
        @keyframes radioBar { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .tv-radio__title { font-size: 2rem; font-weight: 800; margin: 0 0 0.25rem; }
        .tv-radio__sub { font-size: 0.85rem; color: #c8943e; margin: 0 0 1.5rem; }
        .tv-radio__now { font-size: 0.9rem; color: #8a8074; }

        /* Gallery */
        .tv-gallery { width: 100%; height: 100%; cursor: pointer; position: relative; }
        .tv-gallery__img { width: 100%; height: 100%; object-fit: cover; }
        .tv-gallery__caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem 2rem; background: linear-gradient(transparent, rgba(0,0,0,0.8)); display: flex; justify-content: space-between; font-size: 0.75rem; color: #8a8074; }

        /* Directory */
        .tv-dir {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 2rem;
          background: radial-gradient(ellipse at 50% 30%, rgba(200,148,62,0.06) 0%, transparent 70%);
        }
        .tv-dir__header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .tv-dir__eyebrow {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #5a5550;
          margin: 0 0 0.4rem;
        }
        .tv-dir__title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #e8e0d4;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .tv-dir__card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(200,148,62,0.15);
          border-radius: 12px;
          padding: 2rem 2.5rem;
          text-align: center;
          max-width: 520px;
          width: 100%;
          position: relative;
        }
        .tv-dir__category {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8943e;
          margin: 0 0 0.75rem;
        }
        .tv-dir__name {
          font-size: clamp(1.4rem, 3.5vw, 2.2rem);
          font-weight: 800;
          color: #e8e0d4;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .tv-dir__detail {
          font-size: 0.9rem;
          color: #8a8074;
          margin: 0 0 1.75rem;
        }
        .tv-dir__dots {
          display: flex;
          gap: 0.4rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .tv-dir__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3a3530;
          transition: background 0.3s;
        }
        .tv-dir__dot--active { background: #c8943e; }
        .tv-dir__powered {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3a3530;
          margin: 0;
        }

        /* Shows */
        .tv-shows { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
        .tv-shows__title { font-size: 1.5rem; font-weight: 800; margin: 0 0 2rem; }
        .tv-shows__placeholder { text-align: center; color: #5a5550; }
        .tv-shows__placeholder p { margin: 0.5rem 0; }
        .tv-shows__next { font-size: 0.8rem; color: #c8943e; }

        /* Nav — 6 channels, tighter */
        .tv-nav {
          display: flex;
          border-top: 1px solid #1a1816;
          background: #0f0f0d;
          padding: 0.4rem 0.35rem;
          gap: 0.35rem;
        }
        .tv-nav__btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          padding: 0.6rem 0.25rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          color: #5a5550;
          cursor: pointer;
          transition: all 0.15s;
          min-width: 0;
        }
        .tv-nav__btn:hover { color: #8a8074; }
        .tv-nav__btn--active { background: rgba(200,148,62,0.08); border-color: rgba(200,148,62,0.2); color: #c8943e; }
        .tv-nav__icon { font-size: 0.8rem; font-weight: 800; line-height: 1; }
        .tv-nav__name {
          font-size: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        @media (min-width: 600px) {
          .tv-nav__icon { font-size: 1rem; }
          .tv-nav__name { font-size: 0.6rem; }
          .tv-nav__btn { padding: 0.75rem 0.5rem; }
        }
      `}</style>
    </>
  );
}
