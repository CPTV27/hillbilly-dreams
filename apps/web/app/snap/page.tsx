'use client';

import { useState, useEffect, useCallback } from 'react';

// Shot list locations with GPS coordinates
// These can be extended via API later, hardcoded for v1
const SHOT_LIST: ShotLocation[] = [
  // Natchez
  { id: 'natchez-bluff', name: 'Natchez Bluff Overlook', lat: 31.5604, lng: -91.4032, desc: 'Sunset over the Mississippi from the bluff — wide angle, golden hour', category: 'landscape', radius: 200 },
  { id: 'fat-mamas', name: "Fat Mama's Tamales", lat: 31.5571, lng: -91.3874, desc: 'Storefront + tamale plate + signage — directory listing demo', category: 'business', radius: 100 },
  { id: 'big-muddy-inn', name: 'Big Muddy Inn', lat: 31.5572, lng: -91.3903, desc: 'Exterior, bar area, stage, hotel rooms — multiple angles needed', category: 'venue', radius: 50 },
  { id: 'main-street-natchez', name: 'Main Street Natchez', lat: 31.5566, lng: -91.3882, desc: 'Walking Main Street — storefronts, people, activity. Show the town alive.', category: 'street', radius: 300 },
  { id: 'under-the-hill', name: 'Under-the-Hill Saloon', lat: 31.5621, lng: -91.4070, desc: 'Historic bar district by the river — atmosphere, signage, river view', category: 'venue', radius: 150 },
  // Clarksdale
  { id: 'ground-zero', name: 'Ground Zero Blues Club', lat: 34.2001, lng: -90.5712, desc: 'Morgan Freeman\'s blues club — exterior, stage, crowd on show night', category: 'venue', radius: 100 },
  { id: 'crossroads', name: 'The Crossroads (Hwy 61 & 49)', lat: 34.1674, lng: -90.5723, desc: 'Iconic crossroads marker — Robert Johnson legend. Get the guitar sculptures.', category: 'landmark', radius: 200 },
  { id: 'delta-blues-museum', name: 'Delta Blues Museum', lat: 34.2003, lng: -90.5731, desc: 'Museum exterior + any exhibits visible from outside', category: 'culture', radius: 100 },
  // Vicksburg
  { id: 'vicksburg-riverfront', name: 'Vicksburg Riverfront', lat: 32.3526, lng: -90.8779, desc: 'River, bridges, murals along the waterfront — corridor vibes', category: 'landscape', radius: 300 },
  // Memphis
  { id: 'beale-street', name: 'Beale Street', lat: 35.1392, lng: -90.0533, desc: 'Neon signs, music venues, street life — the northern anchor of the corridor', category: 'street', radius: 200 },
  // New Orleans
  { id: 'frenchmen-street', name: 'Frenchmen Street', lat: 29.9643, lng: -90.0561, desc: 'Live music strip — the southern anchor. Night shots preferred.', category: 'street', radius: 200 },
];

interface ShotLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  desc: string;
  category: string;
  radius: number; // meters — alert when within this distance
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function SnapPage() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [nearby, setNearby] = useState<(ShotLocation & { distance: number })[]>([]);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkNearby = useCallback((lat: number, lng: number) => {
    const found = SHOT_LIST
      .filter(s => !completed[s.id])
      .map(s => ({ ...s, distance: haversineDistance(lat, lng, s.lat, s.lng) }))
      .filter(s => s.distance < 2000) // show anything within 2km
      .sort((a, b) => a.distance - b.distance);

    setNearby(found);

    // Vibrate if within alert radius of any shot
    const inRange = found.filter(s => s.distance < s.radius);
    if (inRange.length > 0 && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }, [completed]);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setTracking(true);
    navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        checkNearby(pos.coords.latitude, pos.coords.longitude);
        setError(null);
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
  };

  const markComplete = (id: string) => {
    setCompleted(prev => ({ ...prev, [id]: true }));
  };

  const totalShots = SHOT_LIST.length;
  const completedCount = Object.keys(completed).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0d', color: '#e8e0d4', fontFamily: "'Inter', system-ui, sans-serif", padding: '1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: 0 }}>SNAP</h1>
        <p style={{ fontSize: '0.8rem', color: '#8a8074', margin: '0.5rem 0' }}>Shot List Navigator</p>
        <p style={{ fontSize: '0.75rem', color: '#5a5550' }}>
          {completedCount}/{totalShots} shots complete
        </p>
        {/* Progress bar */}
        <div style={{ height: 4, background: '#1a1816', borderRadius: 2, margin: '0.5rem auto', maxWidth: 300 }}>
          <div style={{ height: 4, background: '#c8943e', borderRadius: 2, width: `${(completedCount / totalShots) * 100}%`, transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Start tracking button */}
      {!tracking && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <button
            onClick={startTracking}
            style={{
              padding: '1rem 2rem',
              background: '#c8943e',
              color: '#0f0f0d',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Start Tracking Location
          </button>
          <p style={{ fontSize: '0.75rem', color: '#5a5550', marginTop: '0.5rem' }}>
            Uses GPS to alert you when near a shot location
          </p>
        </div>
      )}

      {error && (
        <div style={{ background: '#3a1a1a', border: '1px solid #b54c4c', padding: '0.75rem', borderRadius: 8, margin: '1rem 0', fontSize: '0.8rem' }}>
          {error}
        </div>
      )}

      {/* Position info */}
      {position && (
        <p style={{ textAlign: 'center', fontSize: '0.65rem', color: '#5a5550' }}>
          {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </p>
      )}

      {/* Nearby shots */}
      {tracking && nearby.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Nearby Shots
          </h2>
          {nearby.map(shot => (
            <div
              key={shot.id}
              style={{
                background: shot.distance < shot.radius ? '#1a2a1a' : '#1a1816',
                border: `1px solid ${shot.distance < shot.radius ? '#22c55e' : '#333'}`,
                borderRadius: 8,
                padding: '1rem',
                marginBottom: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: shot.distance < shot.radius ? '#22c55e' : '#e8e0d4' }}>
                    {shot.distance < shot.radius ? '📍 ' : ''}{shot.name}
                  </h3>
                  <span style={{ fontSize: '0.7rem', color: '#c8943e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {shot.category} · {shot.distance < 1000 ? `${Math.round(shot.distance)}m` : `${(shot.distance / 1000).toFixed(1)}km`}
                  </span>
                </div>
                <button
                  onClick={() => markComplete(shot.id)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    background: 'transparent',
                    color: '#22c55e',
                    border: '1px solid #22c55e',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  Got It
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#8a8074', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                {shot.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* All shots list when nothing nearby or not tracking */}
      {(!tracking || nearby.length === 0) && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Full Shot List
          </h2>
          {SHOT_LIST.map(shot => (
            <div
              key={shot.id}
              style={{
                background: completed[shot.id] ? '#0f1a0f' : '#1a1816',
                border: `1px solid ${completed[shot.id] ? '#1a3a1a' : '#333'}`,
                borderRadius: 8,
                padding: '0.75rem 1rem',
                marginBottom: '0.5rem',
                opacity: completed[shot.id] ? 0.5 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: completed[shot.id] ? '#5a5550' : '#e8e0d4' }}>
                    {completed[shot.id] ? '✓ ' : ''}{shot.name}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#5a5550', marginLeft: '0.5rem' }}>
                    {shot.category}
                  </span>
                </div>
                {!completed[shot.id] && (
                  <button
                    onClick={() => markComplete(shot.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      background: 'transparent',
                      color: '#5a5550',
                      border: '1px solid #333',
                      borderRadius: 4,
                      fontSize: '0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    Done
                  </button>
                )}
              </div>
              <p style={{ fontSize: '0.7rem', color: '#6a6560', margin: '0.25rem 0 0', lineHeight: 1.4 }}>
                {shot.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
