'use client';

import { useState } from 'react';

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
    id: 'shows',
    name: 'Live Shows',
    icon: 'S',
    description: 'Watch live from the Blues Room',
    content: 'shows',
  },
];

const GALLERY_IMAGES = [
  'https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/legacy-starter/04d36e95fe24.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/0012e54eecc9.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/legacy-starter/3ea8ea2fa58b.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/012d5deedd36.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-inn-dusk.webp',
  'https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/save-the-hall-ball/010e2ae9e8f2.webp',
];

export default function InRoomTVPage() {
  const [activeChannel, setActiveChannel] = useState('welcome');
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <>
      <div className="tv">
        {/* Channel Content */}
        <div className="tv-content">
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

          {activeChannel === 'gallery' && (
            <div className="tv-gallery" onClick={() => setGalleryIndex((galleryIndex + 1) % GALLERY_IMAGES.length)}>
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
        <nav className="tv-nav">
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              className={`tv-nav__btn ${activeChannel === ch.id ? 'tv-nav__btn--active' : ''}`}
              onClick={() => setActiveChannel(ch.id)}
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
        }

        .tv-content { flex: 1; position: relative; overflow: hidden; }

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

        /* Shows */
        .tv-shows { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
        .tv-shows__title { font-size: 1.5rem; font-weight: 800; margin: 0 0 2rem; }
        .tv-shows__placeholder { text-align: center; color: #5a5550; }
        .tv-shows__placeholder p { margin: 0.5rem 0; }
        .tv-shows__next { font-size: 0.8rem; color: #c8943e; }

        /* Nav */
        .tv-nav {
          display: flex;
          border-top: 1px solid #1a1816;
          background: #0f0f0d;
          padding: 0.5rem;
          gap: 0.5rem;
        }
        .tv-nav__btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem 0.5rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          color: #5a5550;
          cursor: pointer;
          transition: all 0.15s;
        }
        .tv-nav__btn:hover { color: #8a8074; }
        .tv-nav__btn--active { background: rgba(200,148,62,0.08); border-color: rgba(200,148,62,0.2); color: #c8943e; }
        .tv-nav__icon { font-size: 1rem; font-weight: 800; }
        .tv-nav__name { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.05em; }
      `}</style>
    </>
  );
}
