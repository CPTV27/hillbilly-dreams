'use client';

import { useState, useEffect } from 'react';

/* eslint-disable @next/next/no-img-element */

const OB_HOST = 'http://192.168.4.37:8080';
const ICECAST_HOST = 'http://192.168.4.37:8010';

interface OBShow {
  name: string;
  time: string;
  day: string;
  host: string;
  status: 'live' | 'scheduled' | 'off';
  poster: string;
}

const SHOWS: OBShow[] = [
  { name: 'Delta Dawn Report', time: '6:00 AM', day: 'Daily', host: 'Delta Dawn', status: 'scheduled', poster: 'delta-dawn-report' },
  { name: 'Morning Levee Rise', time: '6:15 AM', day: 'Daily', host: 'Automated', status: 'scheduled', poster: 'morning-levee-rise' },
  { name: 'Porch Talk', time: '9:00 AM', day: 'Weekdays', host: 'Miss Pearline', status: 'scheduled', poster: 'porch-talk' },
  { name: 'Region Crossroads', time: '10:00 AM', day: 'Daily', host: 'Automated', status: 'scheduled', poster: 'region-crossroads' },
  { name: 'The Juke Joint Hour', time: '12:00 PM', day: 'Daily', host: 'Automated', status: 'scheduled', poster: 'juke-joint-hour' },
  { name: 'Mechanical Bull Sessions', time: '3:00 PM', day: 'Daily', host: 'Live Studio', status: 'scheduled', poster: 'mechanical-bull-sessions' },
  { name: 'Honky Tonk Highway', time: '4:00 PM', day: 'Daily', host: 'Automated', status: 'scheduled', poster: 'honky-tonk-highway' },
  { name: 'River Rat Radio', time: '6:00 PM', day: 'Weekdays', host: 'River Rat Ray', status: 'scheduled', poster: 'river-rat-radio' },
  { name: 'Late Night Levee', time: '7:00 PM', day: 'Sun-Thu', host: 'Automated', status: 'scheduled', poster: 'late-night-levee' },
  { name: 'Catfish Carl After Dark', time: '10:00 PM', day: 'Fri/Sat', host: 'Catfish Carl', status: 'scheduled', poster: 'catfish-carl-after-dark' },
  { name: 'The Overnight', time: '12:00 AM', day: 'Daily', host: 'Automated', status: 'scheduled', poster: 'the-overnight' },
  { name: 'Sunday Morning Gospel Train', time: '9:00 AM', day: 'Sundays', host: 'Community', status: 'scheduled', poster: 'sunday-morning-gospel-train' },
];

const GCS_POSTER = 'https://storage.googleapis.com/bmt-media-bigmuddy/radio/show-posters';

export default function RadioAdminPage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'nowplaying' | 'media' | 'tv'>('schedule');
  const [obStatus, setObStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [icecastStatus, setIcecastStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    // Check OpenBroadcaster
    fetch(`${OB_HOST}`, { mode: 'no-cors', signal: AbortSignal.timeout(5000) })
      .then(() => setObStatus('online'))
      .catch(() => setObStatus('offline'));

    // Check Icecast
    fetch(`${ICECAST_HOST}`, { mode: 'no-cors', signal: AbortSignal.timeout(5000) })
      .then(() => setIcecastStatus('online'))
      .catch(() => setIcecastStatus('offline'));
  }, []);

  const tabs = [
    { id: 'schedule' as const, label: 'Schedule', icon: 'S' },
    { id: 'nowplaying' as const, label: 'Now Playing', icon: 'N' },
    { id: 'media' as const, label: 'Media Library', icon: 'M' },
    { id: 'tv' as const, label: 'TV Playlists', icon: 'T' },
  ];

  return (
    <>
      <div className="ra">
        {/* Header */}
        <div className="ra-header">
          <div>
            <h1 className="ra-title">Broadcast Control</h1>
            <p className="ra-sub">Radio &amp; TV playout management</p>
          </div>
          <div className="ra-status">
            <span className={`ra-status__dot ra-status__dot--${obStatus}`} />
            <span className="ra-status__label">OpenBroadcaster: {obStatus}</span>
            <span className={`ra-status__dot ra-status__dot--${icecastStatus}`} />
            <span className="ra-status__label">Icecast: {icecastStatus}</span>
            <a href={OB_HOST} target="_blank" rel="noopener noreferrer" className="ra-btn ra-btn--sm">
              Open OB Dashboard
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="ra-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`ra-tab ${activeTab === t.id ? 'ra-tab--active' : ''}`} onClick={() => setActiveTab(t.id)}>
              <span className="ra-tab__icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="ra-panel">
            <div className="ra-section-label">Weekly Schedule — 12 Shows</div>
            <div className="ra-show-grid">
              {SHOWS.map(show => (
                <div key={show.name} className="ra-show">
                  <img src={`${GCS_POSTER}/${show.poster}.webp`} alt={show.name} className="ra-show__poster" loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="ra-show__info">
                    <div className="ra-show__time">{show.time} &middot; {show.day}</div>
                    <div className="ra-show__name">{show.name}</div>
                    <div className="ra-show__host">{show.host}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Now Playing Tab */}
        {activeTab === 'nowplaying' && (
          <div className="ra-panel">
            <div className="ra-section-label">Now Playing</div>
            <div className="ra-now">
              <div className="ra-now__live">
                <span className="ra-now__dot" />
                <span>Stream Status: {icecastStatus === 'online' ? 'Broadcasting' : 'Offline'}</span>
              </div>
              <p className="ra-now__note">
                Connect to the Mac mini OpenBroadcaster dashboard for real-time playout control.
                The schedule runs automatically — shows play according to their timeslots.
              </p>
              <div className="ra-now__actions">
                <a href={OB_HOST} target="_blank" rel="noopener noreferrer" className="ra-btn">
                  OpenBroadcaster Dashboard
                </a>
                <a href={`${ICECAST_HOST}/status.xsl`} target="_blank" rel="noopener noreferrer" className="ra-btn ra-btn--ghost">
                  Icecast Status
                </a>
                <a href="/radio/player" target="_blank" rel="noopener noreferrer" className="ra-btn ra-btn--ghost">
                  Web Player
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Media Library Tab */}
        {activeTab === 'media' && (
          <div className="ra-panel">
            <div className="ra-section-label">Media Library</div>
            <p style={{ color: '#8a8074', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Upload audio to OpenBroadcaster or manage through the admin dashboard.
              33 promo files already uploaded (station IDs, show promos, bumpers, sweepers).
            </p>
            <div className="ra-media-stats">
              <div className="ra-media-stat">
                <span className="ra-media-stat__value">18</span>
                <span className="ra-media-stat__label">Show Promos</span>
              </div>
              <div className="ra-media-stat">
                <span className="ra-media-stat__value">5</span>
                <span className="ra-media-stat__label">Station IDs</span>
              </div>
              <div className="ra-media-stat">
                <span className="ra-media-stat__value">5</span>
                <span className="ra-media-stat__label">Bumpers</span>
              </div>
              <div className="ra-media-stat">
                <span className="ra-media-stat__value">5</span>
                <span className="ra-media-stat__label">Sweepers</span>
              </div>
              <div className="ra-media-stat">
                <span className="ra-media-stat__value">24</span>
                <span className="ra-media-stat__label">Show Posters</span>
              </div>
            </div>
            <div className="ra-now__actions" style={{ marginTop: '1rem' }}>
              <a href={`${OB_HOST}/index.php#/media`} target="_blank" rel="noopener noreferrer" className="ra-btn">
                Upload to OB Media Library
              </a>
              <a href="/admin/upload" className="ra-btn ra-btn--ghost">
                Upload to GCS
              </a>
            </div>
          </div>
        )}

        {/* TV Playlists Tab */}
        {activeTab === 'tv' && (
          <div className="ra-panel">
            <div className="ra-section-label">TV &amp; In-Room Playlists</div>
            <p style={{ color: '#8a8074', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Manage what plays on the hotel room TVs via Plex.
              Slideshows, ambient video, and the in-room entertainment channels.
            </p>
            <div className="ra-tv-channels">
              <div className="ra-tv-channel">
                <span className="ra-tv-channel__icon">W</span>
                <div>
                  <div className="ra-tv-channel__name">Welcome Channel</div>
                  <div className="ra-tv-channel__desc">Guest info, WiFi, show schedule, local attractions</div>
                </div>
              </div>
              <div className="ra-tv-channel">
                <span className="ra-tv-channel__icon">R</span>
                <div>
                  <div className="ra-tv-channel__name">Big Muddy Radio</div>
                  <div className="ra-tv-channel__desc">Audio visualizer + now playing info</div>
                </div>
              </div>
              <div className="ra-tv-channel">
                <span className="ra-tv-channel__icon">G</span>
                <div>
                  <div className="ra-tv-channel__name">Photo Gallery</div>
                  <div className="ra-tv-channel__desc">Chase Pierson Photography slideshow</div>
                </div>
              </div>
              <div className="ra-tv-channel">
                <span className="ra-tv-channel__icon">S</span>
                <div>
                  <div className="ra-tv-channel__name">Live Shows</div>
                  <div className="ra-tv-channel__desc">Live broadcast from the Blues Room</div>
                </div>
              </div>
            </div>
            <div className="ra-now__actions" style={{ marginTop: '1rem' }}>
              <a href="http://192.168.4.37:32400/web" target="_blank" rel="noopener noreferrer" className="ra-btn">
                Plex Dashboard
              </a>
              <a href="/inn/tv" target="_blank" rel="noopener noreferrer" className="ra-btn ra-btn--ghost">
                Preview In-Room TV
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ra { max-width: 1100px; margin: 0 auto; padding: 0 var(--space-4, 1rem); }
        .ra-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; }
        .ra-title { font-size: 1.5rem; font-weight: 800; color: #e8e0d4; margin: 0; }
        .ra-sub { font-size: 0.8rem; color: #6a6560; margin: 0.25rem 0 0; }

        .ra-status { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .ra-status__dot { width: 8px; height: 8px; border-radius: 50%; }
        .ra-status__dot--checking { background: #eab308; }
        .ra-status__dot--online { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.4); }
        .ra-status__dot--offline { background: #ef4444; }
        .ra-status__label { font-size: 0.7rem; color: #6a6560; }

        .ra-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid #2a2520; padding-bottom: 0.5rem; }
        .ra-tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: transparent; border: 1px solid transparent; border-radius: 8px 8px 0 0; color: #6a6560; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
        .ra-tab:hover { color: #8a8074; }
        .ra-tab--active { background: #1a1816; border-color: #2a2520; border-bottom-color: transparent; color: #c8943e; }
        .ra-tab__icon { font-weight: 800; font-size: 0.7rem; }

        .ra-panel { background: #1a1816; border: 1px solid #2a2520; border-radius: 10px; padding: 1.5rem; }
        .ra-section-label { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #6a6560; margin-bottom: 1rem; }

        .ra-show-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
        .ra-show { background: #0f0f0d; border: 1px solid #2a2520; border-radius: 8px; overflow: hidden; }
        .ra-show__poster { width: 100%; height: 120px; object-fit: cover; }
        .ra-show__info { padding: 0.75rem; }
        .ra-show__time { font-size: 0.6rem; color: #c8943e; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .ra-show__name { font-size: 0.85rem; font-weight: 700; color: #e8e0d4; margin: 0.25rem 0; }
        .ra-show__host { font-size: 0.7rem; color: #5a5550; }

        .ra-now { text-align: center; padding: 2rem; }
        .ra-now__live { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.85rem; color: #e8e0d4; }
        .ra-now__dot { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .ra-now__note { font-size: 0.8rem; color: #6a6560; max-width: 500px; margin: 0 auto 1.5rem; line-height: 1.5; }
        .ra-now__actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }

        .ra-btn { display: inline-block; padding: 10px 20px; background: #c8943e; color: #0f0f0d; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none; border: none; cursor: pointer; }
        .ra-btn--ghost { background: transparent; color: #8a8074; border: 1px solid #2a2520; }
        .ra-btn--ghost:hover { border-color: #c8943e; color: #c8943e; }
        .ra-btn--sm { padding: 6px 12px; font-size: 0.7rem; }

        .ra-media-stats { display: flex; gap: 1rem; flex-wrap: wrap; }
        .ra-media-stat { background: #0f0f0d; border: 1px solid #2a2520; border-radius: 8px; padding: 1rem 1.5rem; text-align: center; }
        .ra-media-stat__value { display: block; font-size: 1.5rem; font-weight: 800; color: #c8943e; }
        .ra-media-stat__label { display: block; font-size: 0.65rem; color: #6a6560; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.25rem; }

        .ra-tv-channels { display: grid; gap: 0.75rem; }
        .ra-tv-channel { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: #0f0f0d; border: 1px solid #2a2520; border-radius: 8px; }
        .ra-tv-channel__icon { width: 40px; height: 40px; border-radius: 8px; background: rgba(200,148,62,0.1); border: 1px solid rgba(200,148,62,0.2); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #c8943e; flex-shrink: 0; }
        .ra-tv-channel__name { font-size: 0.85rem; font-weight: 700; color: #e8e0d4; }
        .ra-tv-channel__desc { font-size: 0.7rem; color: #5a5550; margin-top: 0.25rem; }
      `}</style>
    </>
  );
}
