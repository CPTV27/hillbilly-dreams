'use client';

// apps/web/app/(demo)/demo/page.tsx
// KioskMode Pro — Public Demo Mode
// Big Muddy Inn & Blues Room, Natchez MS
// Kiosk-locked viewport. Inline styles only — bypasses cascade failures.

import { useState, useEffect } from 'react';
import {
  Users, Music, ClipboardList, CheckCircle2, X,
  Zap, Clock, Star, AlertCircle, ChevronRight, Sunset,
  Phone, BedDouble, Mic2,
} from 'lucide-react';

// ── Demo State ────────────────────────────────────────────────────────────────

const BOOKINGS = [
  {
    id: 'RES-8829',
    guestName: 'Carter Hayes',
    room: 'The Delta Suite',
    status: 'CHECKED_IN' as const,
    vip: true,
    note: 'Here for the Friday show. Prefers early coffee.',
  },
  {
    id: 'RES-8830',
    guestName: 'Sarah Jenkins',
    room: 'Room 4',
    status: 'ARRIVING_SOON' as const,
    vip: false,
    note: 'ETA 4:00 PM. Needs parking pass.',
  },
  {
    id: 'RES-8831',
    guestName: 'The Harrington Party (4)',
    room: 'Suite 1',
    status: 'TOMORROW' as const,
    vip: false,
    note: 'Anniversary package.',
  },
];

const ARTIST_PIPELINE = [
  {
    id: 'ART-092',
    bandName: 'The Natchez Drifters',
    genre: 'Delta Blues / Southern Rock',
    status: 'PENDING_REVIEW' as const,
    draw: '150+',
    requestedDate: 'Apr 10',
  },
  {
    id: 'ART-093',
    bandName: 'Neon Church',
    genre: 'Alt-Country',
    status: 'APPROVED' as const,
    draw: '200',
    requestedDate: 'Mar 28',
  },
];

const TONIGHT_SHOW = {
  name: 'Blues on the Bayou Night',
  time: '8:00 PM',
  venue: 'Blues Room',
  artists: [
    { name: 'T-Bone Meridian & The Swamp Kings', genre: 'Blues / Soul', soundcheck: '6:30 PM', contact: '601-555-0142' },
    { name: 'Miss Velma June', genre: 'Delta Blues', soundcheck: '7:15 PM', contact: '601-555-0189' },
  ],
};

const OPS_TASKS = [
  { id: 'TSK-01', area: 'Main Stage', title: 'Soundcheck prep — check XLR cables', assignee: 'Amy', status: 'IN_PROGRESS' as const },
  { id: 'TSK-02', area: 'Hospitality', title: 'Turnover Room 4 before 3 PM', assignee: 'Tracy', status: 'PENDING' as const },
  { id: 'TSK-03', area: 'Front Desk', title: 'Update Yelp category to Music Venue + B&B', assignee: 'Tracy', status: 'PENDING' as const },
];

// ── Palette ───────────────────────────────────────────────────────────────────

type Mode = { bg: string; panel: string; panelBorder: string; accent: string; accentBg: string; accentBorder: string; muted: string; dim: string };

function palette(funky: boolean): Mode {
  return funky
    ? { bg: '#07040a', panel: 'rgba(0,0,0,0.45)', panelBorder: 'rgba(245,158,11,0.12)', accent: '#fbbf24', accentBg: 'rgba(245,158,11,0.15)', accentBorder: 'rgba(245,158,11,0.35)', muted: '#78716c', dim: '#44403c' }
    : { bg: '#0a0907', panel: 'rgba(255,255,255,0.025)', panelBorder: 'rgba(255,255,255,0.06)', accent: '#f59e0b', accentBg: 'rgba(245,158,11,0.1)', accentBorder: 'rgba(245,158,11,0.2)', muted: '#64748b', dim: '#334155' };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const [funky, setFunky] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [venueTab, setVenueTab] = useState<'show' | 'pipeline'>('show');
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (new Date().getHours() >= 19) setFunky(true);
  }, []);

  const p = palette(funky);
  const pendingCount = OPS_TASKS.filter((t) => !completedTasks.has(t.id)).length;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: p.bg, display: 'flex', flexDirection: 'column', transition: 'background-color 0.7s ease', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: 0, left: '20%', width: 600, height: 400, background: funky ? 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)' : 'radial-gradient(ellipse, rgba(180,120,30,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Header strip ────────────────────────────────────────── */}
      <div style={{ padding: '0 28px', paddingTop: bannerDismissed ? 14 : 0, flexShrink: 0, position: 'relative', zIndex: 1 }}>
        {/* Dismissible banner */}
        {!bannerDismissed && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '8px 16px', marginBottom: 12, marginTop: 12, borderRadius: 14, background: p.accentBg, border: `1px solid ${p.accentBorder}` }}>
            <span style={{ color: 'rgba(251,191,36,0.8)', fontSize: 12 }}>
              Live preview of the <strong style={{ color: '#fbbf24' }}>Big Muddy Inn & Blues Room</strong> — powered by <strong>KioskMode Pro</strong>. No login required.
            </span>
            <button onClick={() => setBannerDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.accent, padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: 24, height: 24, flexShrink: 0 }}>
              <X size={13} />
            </button>
          </div>
        )}

        {/* Top bar: branding + stats + toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 12, borderBottom: `1px solid ${p.panelBorder}` }}>
          {/* Branding */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: p.accent, marginBottom: 2 }}>KioskMode Pro</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>The Big Muddy Inn &amp; Blues Room</div>
            <div style={{ fontSize: 11, color: p.dim, marginTop: 2 }}>Natchez, MS — {today}</div>
          </div>

          {/* Stat pills */}
          <div style={{ flex: 1, display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
            {[
              { icon: <Users size={13} />, label: 'Occupancy', value: '85%', color: '#f59e0b' },
              { icon: <Music size={13} />, label: "Tonight's Show", value: '1', color: '#fb923c' },
              { icon: <ClipboardList size={13} />, label: 'Pending Tasks', value: String(pendingCount), color: '#facc15' },
              { icon: <CheckCircle2 size={13} />, label: 'Staff Active', value: '2', color: '#34d399' },
            ].map(({ icon, label, value, color }) => (
              <div key={label} style={{ background: p.panel, border: `1px solid ${p.panelBorder}`, borderRadius: 16, padding: '8px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80, transition: 'all 0.5s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: p.muted, marginBottom: 3 }}>
                  <span style={{ color, opacity: 0.7 }}>{icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                </div>
                <span style={{ fontSize: 26, fontWeight: 300, color, lineHeight: 1 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Funky toggle */}
          <button
            onClick={() => setFunky((v) => !v)}
            style={{
              flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, border: `1px solid ${funky ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.1)'}`,
              background: funky ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)', color: funky ? '#fbbf24' : '#64748b',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease',
              boxShadow: funky ? '0 0 20px rgba(245,158,11,0.2)' : 'none',
            }}
          >
            {funky ? <Zap size={15} /> : <Sunset size={15} />}
            {funky ? 'Night Mode' : 'Day Mode'}
          </button>
        </div>
      </div>

      {/* ── SPLIT VIEW ──────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 16, padding: '12px 28px 16px', overflow: 'hidden', position: 'relative', zIndex: 1 }}>

        {/* LEFT — Hospitality */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: p.panel, border: `1px solid ${p.panelBorder}`, borderRadius: 24, overflow: 'hidden', transition: 'all 0.5s ease' }}>
          {/* Panel header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid rgba(255,255,255,0.05)`, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ padding: 10, background: 'rgba(59,130,246,0.15)', borderRadius: 12 }}>
                <BedDouble size={20} color="#60a5fa" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff' }}>Hospitality</div>
                <div style={{ fontSize: 11, color: p.muted, marginTop: 1 }}>Who is sleeping here?</div>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BOOKINGS.map((b, i) => <BookingCard key={b.id} booking={b} funky={funky} p={p} i={i} />)}

            {/* Action items */}
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: 14, marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <ClipboardList size={13} color={p.muted} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: p.muted }}>Action Items</span>
              </div>
              {OPS_TASKS.filter((t) => !completedTasks.has(t.id)).map((t, i) => (
                <TaskCard key={t.id} task={t} funky={funky} p={p} i={i}
                  onComplete={() => setCompletedTasks((prev) => { const next = new Set(prev); next.add(t.id); return next; })} />
              ))}
              {pendingCount === 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: 16, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399', fontSize: 14 }}>
                  <CheckCircle2 size={18} /> All clear — board is clean.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — Venue */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: p.panel, border: `1px solid ${p.panelBorder}`, borderRadius: 24, overflow: 'hidden', transition: 'all 0.5s ease' }}>
          {/* Panel header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid rgba(255,255,255,0.05)`, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ padding: 10, background: 'rgba(16,185,129,0.15)', borderRadius: 12 }}>
                <Mic2 size={20} color="#34d399" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff' }}>Venue</div>
                <div style={{ fontSize: 11, color: p.muted, marginTop: 1 }}>Tonight's lineup & pipeline</div>
              </div>
            </div>
            {/* Sub-tabs */}
            <div style={{ display: 'flex', gap: 4 }}>
              {(['show', 'pipeline'] as const).map((tab) => (
                <button key={tab} onClick={() => setVenueTab(tab)} style={{
                  padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.2s ease',
                  background: venueTab === tab ? p.accentBg : 'transparent',
                  color: venueTab === tab ? p.accent : p.muted,
                  outline: venueTab === tab ? `1px solid ${p.accentBorder}` : 'none',
                }}>
                  {tab === 'show' ? 'Tonight' : 'Pipeline'}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
            {venueTab === 'show' ? <ShowPanel show={TONIGHT_SHOW} funky={funky} p={p} /> : <PipelinePanel artists={ARTIST_PIPELINE} p={p} />}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BookingCard({ booking, p, i }: { booking: typeof BOOKINGS[0]; funky: boolean; p: Mode; i: number }) {
  const statusDot: Record<string, string> = { CHECKED_IN: '#10b981', ARRIVING_SOON: '#f59e0b', TOMORROW: '#475569' };
  const statusLabel: Record<string, string> = { CHECKED_IN: 'In-House', ARRIVING_SOON: 'Arriving Soon', TOMORROW: 'Tomorrow' };
  return (
    <div style={{ padding: '14px 18px', borderRadius: 18, border: `1px solid rgba(255,255,255,0.05)`, background: 'rgba(255,255,255,0.02)', marginBottom: 8, animationDelay: `${i * 50}ms` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusDot[booking.status], marginTop: 5, flexShrink: 0, boxShadow: booking.status !== 'TOMORROW' ? `0 0 8px ${statusDot[booking.status]}80` : 'none' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{booking.guestName}</span>
              {booking.vip && <Star size={13} color="#fbbf24" fill="#fbbf24" />}
            </div>
            <div style={{ fontSize: 12, color: p.muted, marginTop: 2 }}>{booking.room} · {statusLabel[booking.status]}</div>
            <div style={{ fontSize: 11, color: p.dim, marginTop: 2, fontStyle: 'italic' }}>{booking.note}</div>
          </div>
        </div>
        <button style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.15)', color: '#f59e0b', fontSize: 12, fontWeight: 500, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>View</button>
      </div>
    </div>
  );
}

function TaskCard({ task, p, i, onComplete }: { task: typeof OPS_TASKS[0]; funky: boolean; p: Mode; i: number; onComplete: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px', borderRadius: 16, border: `1px solid rgba(255,255,255,0.04)`, background: 'rgba(255,255,255,0.015)', marginBottom: 8 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          {task.status === 'IN_PROGRESS' && <Clock size={13} color="#f59e0b" />}
          <span style={{ fontSize: 14, fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</span>
        </div>
        <div style={{ fontSize: 11, color: p.dim, marginTop: 2 }}>{task.area} · {task.assignee}</div>
      </div>
      <button onClick={onComplete} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.15)', color: '#f59e0b', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
        <ChevronRight size={13} /> Done
      </button>
    </div>
  );
}

function ShowPanel({ show, funky, p }: { show: typeof TONIGHT_SHOW; funky: boolean; p: Mode }) {
  return (
    <div>
      <div style={{ padding: '14px 18px', borderRadius: 18, background: funky ? 'rgba(124,45,18,0.2)' : 'rgba(251,146,60,0.08)', border: `1px solid ${funky ? 'rgba(251,146,60,0.25)' : 'rgba(251,146,60,0.15)'}`, marginBottom: 16, transition: 'all 0.5s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{show.name}</span>
          <span style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(251,146,60,0.2)', border: '1px solid rgba(251,146,60,0.25)', color: '#fb923c', fontSize: 11, fontWeight: 700 }}>Tonight</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(251,146,60,0.7)' }}>{show.venue} · Doors {show.time}</div>
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: p.muted, marginBottom: 10 }}>Loadsheet</div>
      {show.artists.map((artist, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: 18, border: `1px solid rgba(255,255,255,0.05)`, background: 'rgba(255,255,255,0.025)', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{artist.name}</div>
            <div style={{ fontSize: 12, color: p.muted, marginTop: 2 }}>{artist.genre} · Soundcheck {artist.soundcheck}</div>
          </div>
          <a href={`tel:${artist.contact}`} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.muted, flexShrink: 0 }}>
            <Phone size={16} />
          </a>
        </div>
      ))}
    </div>
  );
}

function PipelinePanel({ artists, p }: { artists: typeof ARTIST_PIPELINE; p: Mode }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: p.muted, marginBottom: 14 }}>Artist Applications</div>
      {artists.map((artist, i) => {
        const isPending = artist.status === 'PENDING_REVIEW';
        return (
          <div key={artist.id} style={{ padding: '16px 18px', borderRadius: 18, border: `1px solid rgba(255,255,255,0.06)`, background: 'rgba(255,255,255,0.025)', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{artist.bandName}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, border: '1px solid', background: isPending ? 'rgba(245,158,11,0.15)' : 'rgba(52,211,153,0.15)', borderColor: isPending ? 'rgba(245,158,11,0.25)' : 'rgba(52,211,153,0.25)', color: isPending ? '#fbbf24' : '#34d399' }}>
                    {isPending ? 'Review' : 'Approved'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: p.muted }}>{artist.genre}</div>
                <div style={{ fontSize: 11, color: p.dim, marginTop: 2 }}>Est. draw: {artist.draw} · {artist.requestedDate}</div>
              </div>
              {isPending && <AlertCircle size={16} color="rgba(245,158,11,0.5)" style={{ flexShrink: 0 }} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
