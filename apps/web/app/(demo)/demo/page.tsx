'use client';

// apps/web/app/(demo)/demo/page.tsx
// KioskMode Pro — Public Demo Mode
// Big Muddy Inn & Blues Room, Natchez MS
// No auth, no DB. Split view: Hospitality (left) | Venue (right)

import { useState, useEffect } from 'react';
import {
  Users, Music, ClipboardList, Phone, CheckCircle2, X,
  Zap, Clock, Star, AlertCircle, ChevronRight, Sunset,
} from 'lucide-react';

// ── Demo State (AG schema) ────────────────────────────────────────────────────

const SYSTEM = {
  occupancy: '85%',
  activeStaff: ['Tracy', 'Amy'],
};

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
  name: "Blues on the Bayou Night",
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

// ── Types ─────────────────────────────────────────────────────────────────────

type VenueTab = 'show' | 'pipeline';

// ── Funky Mode palette ────────────────────────────────────────────────────────
// Day = warm amber/neutral; Night (Funky) = neon amber/orange, deeper darks

function getModeClasses(funky: boolean) {
  return {
    bg: funky ? 'bg-[#08050a]' : 'bg-[#0a0907]',
    panelBg: funky ? 'bg-black/40 border-amber-500/10' : 'bg-white/[0.025] border-white/5',
    accent: funky ? 'text-amber-400' : 'text-amber-500',
    accentBorder: funky ? 'border-amber-500/40' : 'border-amber-500/20',
    accentBg: funky ? 'bg-amber-500/15' : 'bg-amber-500/10',
    glow: funky ? 'shadow-[0_0_60px_rgba(245,158,11,0.12)]' : '',
    headerText: funky ? 'text-amber-300' : 'text-white',
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const [funky, setFunky] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [venueTab, setVenueTab] = useState<VenueTab>('show');
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Auto-flip funky mode at 7 PM
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 19) setFunky(true);
  }, []);

  const m = getModeClasses(funky);
  const pendingCount = OPS_TASKS.filter((t) => !completedTasks.has(t.id)).length;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className={`min-h-screen ${m.bg} text-slate-200 font-sans overflow-x-hidden relative transition-colors duration-700 selection:bg-amber-500/30`}>

      {/* Ambient glows */}
      {funky ? (
        <>
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-600/12 rounded-full blur-[160px] pointer-events-none transition-all duration-700" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-700/12 rounded-full blur-[140px] pointer-events-none transition-all duration-700" />
        </>
      ) : (
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-amber-700/8 rounded-full blur-[140px] pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 relative z-10 flex flex-col min-h-screen">

        {/* Preview banner */}
        {!bannerDismissed && (
          <div className="mb-4 flex items-center justify-between gap-4 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 demo-fade-in">
            <p className="text-amber-400/80 text-xs md:text-sm">
              Live preview of the <span className="font-semibold text-amber-300">Big Muddy Inn & Blues Room</span> — powered by <span className="font-semibold">KioskMode Pro</span>. No login required.
            </p>
            <button onClick={() => setBannerDismissed(true)} className="shrink-0 w-6 h-6 rounded-full hover:bg-amber-500/20 flex items-center justify-center text-amber-500/60 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between mb-5 demo-fade-in">
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${m.accent}`}>KioskMode Pro</p>
            <h1 className={`text-2xl md:text-3xl font-light tracking-tight ${m.headerText} transition-colors duration-500`}>
              The Big Muddy Inn &amp; Blues Room
            </h1>
            <p className="text-slate-600 text-xs mt-0.5">Natchez, MS — {today}</p>
          </div>

          {/* Funky mode toggle */}
          <button
            onClick={() => setFunky((v) => !v)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border font-semibold text-sm transition-all duration-300 ${
              funky
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                : 'bg-white/5 border-white/10 text-slate-500 hover:border-amber-500/30 hover:text-amber-400'
            }`}
            aria-pressed={funky}
          >
            {funky ? <Zap className="w-4 h-4" /> : <Sunset className="w-4 h-4" />}
            <span className="hidden sm:inline">{funky ? 'Night Mode' : 'Day Mode'}</span>
          </button>
        </header>

        {/* Stat strip */}
        <div className="grid grid-cols-4 gap-2 md:gap-3 mb-5 demo-fade-in-delay">
          {[
            { label: 'Occupancy', value: SYSTEM.occupancy, color: 'text-amber-400', icon: Users },
            { label: "Tonight's Show", value: '1', color: 'text-orange-400', icon: Music },
            { label: 'Pending Tasks', value: String(pendingCount), color: 'text-yellow-400', icon: ClipboardList },
            { label: 'Staff Active', value: '2', color: 'text-emerald-400', icon: CheckCircle2 },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className={`${m.panelBg} ${m.glow} border rounded-2xl p-3 md:p-4 flex flex-col justify-center min-h-[72px] transition-all duration-500`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={`w-3.5 h-3.5 ${color} opacity-60`} />
                <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">{label}</span>
              </div>
              <span className={`text-2xl md:text-3xl font-light ${color}`}>{value}</span>
            </div>
          ))}
        </div>

        {/* ── SPLIT VIEW — Mac mini layout ─────────────────────────────────── */}
        <div className="flex-1 flex gap-4 min-h-0" style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: '16px' }}>

          {/* LEFT PANEL — Hospitality */}
          <div className={`${m.panelBg} border rounded-3xl flex flex-col overflow-hidden ${m.glow} transition-all duration-500`} style={{ flex: '1 1 0', minWidth: 0 }}>
            <div className={`px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0`}>
              <div className="flex items-center gap-2.5">
                <Users className={`w-4 h-4 ${m.accent}`} />
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Hospitality</h2>
              </div>
              <span className="text-slate-600 text-xs">Who is sleeping here?</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 custom-scrollbar">
              {BOOKINGS.map((b, i) => (
                <BookingCard key={b.id} booking={b} funky={funky} index={i} />
              ))}

              {/* Ops Tasks below bookings */}
              <div className="pt-2 border-t border-white/5 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Action Items</span>
                </div>
                {OPS_TASKS.filter((t) => !completedTasks.has(t.id)).map((t, i) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    funky={funky}
                    index={i}
                    onComplete={() => setCompletedTasks((prev) => new Set([...prev, t.id]))}
                  />
                ))}
                {pendingCount === 0 && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    All clear — board is clean.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — Venue */}
          <div className={`${m.panelBg} border rounded-3xl flex flex-col overflow-hidden ${m.glow} transition-all duration-500`} style={{ flex: '1 1 0', minWidth: 0 }}>
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Music className={`w-4 h-4 ${m.accent}`} />
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Venue</h2>
              </div>
              {/* Sub-tabs */}
              <div className="flex gap-1">
                {(['show', 'pipeline'] as VenueTab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setVenueTab(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      venueTab === t ? `${m.accentBg} ${m.accentBorder} border ${m.accent}` : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    {t === 'show' ? "Tonight" : "Pipeline"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-5 custom-scrollbar">
              {venueTab === 'show' ? (
                <ShowPanel show={TONIGHT_SHOW} funky={funky} />
              ) : (
                <PipelinePanel artists={ARTIST_PIPELINE} funky={funky} />
              )}
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 10px; }

        @keyframes demoFadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes demoFadeInScale { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes demoCardIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .demo-fade-in { animation: demoFadeIn 0.35s ease both; }
        .demo-fade-in-delay { animation: demoFadeInScale 0.4s ease 0.08s both; }
        .demo-card-in { animation: demoCardIn 0.3s ease both; }
      ` }} />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BookingCard({ booking, funky, index }: { booking: typeof BOOKINGS[0]; funky: boolean; index: number }) {
  const statusColor = {
    CHECKED_IN: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    ARRIVING_SOON: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    TOMORROW: 'bg-slate-600',
  }[booking.status];

  const statusLabel = { CHECKED_IN: 'In-House', ARRIVING_SOON: 'Arriving Soon', TOMORROW: 'Tomorrow' }[booking.status];

  return (
    <div
      className={`demo-card-in p-4 rounded-2xl border transition-all ${
        funky ? 'bg-black/30 border-amber-500/10 hover:border-amber-500/25' : 'bg-white/[0.03] border-white/5 hover:border-amber-500/15'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${statusColor}`} />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">{booking.guestName}</h4>
              {booking.vip && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
            </div>
            <p className="text-slate-500 text-xs mt-0.5">{booking.room} · {statusLabel}</p>
            <p className="text-slate-600 text-xs mt-0.5 italic">{booking.note}</p>
          </div>
        </div>
        <button className="shrink-0 h-7 px-3 rounded-full bg-amber-600/15 hover:bg-amber-600/30 border border-amber-500/15 text-amber-400 text-xs font-medium transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

function TaskCard({
  task, funky, index, onComplete,
}: { task: typeof OPS_TASKS[0]; funky: boolean; index: number; onComplete: () => void }) {
  const isInProgress = task.status === 'IN_PROGRESS';
  return (
    <div
      className={`demo-card-in mb-2 p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
        funky ? 'bg-black/30 border-white/5' : 'bg-white/[0.02] border-white/5'
      }`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {isInProgress && <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
          <h4 className="text-sm font-medium text-white truncate">{task.title}</h4>
        </div>
        <p className="text-slate-600 text-xs mt-0.5">{task.area} · {task.assignee}</p>
      </div>
      <button
        onClick={onComplete}
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600/15 hover:bg-amber-600/30 border border-amber-500/15 text-amber-400 text-xs font-medium transition-all active:scale-95"
      >
        <ChevronRight className="w-3.5 h-3.5" />
        Done
      </button>
    </div>
  );
}

function ShowPanel({ show, funky }: { show: typeof TONIGHT_SHOW; funky: boolean }) {
  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-2xl border ${funky ? 'bg-orange-900/20 border-orange-500/20' : 'bg-orange-500/8 border-orange-500/15'} transition-all duration-500`}>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-white">{show.name}</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/25 text-orange-400 text-xs font-bold">Tonight</span>
        </div>
        <p className="text-orange-400/70 text-xs">{show.venue} · Doors {show.time}</p>
      </div>

      <div className="space-y-2.5">
        <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">Loadsheet</p>
        {show.artists.map((artist, i) => (
          <div
            key={i}
            className={`demo-card-in p-4 rounded-2xl border flex items-center justify-between ${
              funky ? 'bg-black/30 border-orange-500/10' : 'bg-white/[0.03] border-white/5'
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div>
              <h4 className="text-sm font-semibold text-white">{artist.name}</h4>
              <p className="text-slate-500 text-xs mt-0.5">{artist.genre} · Soundcheck {artist.soundcheck}</p>
            </div>
            <a href={`tel:${artist.contact}`} className="shrink-0 w-9 h-9 rounded-full bg-white/5 hover:bg-orange-500/30 border border-white/5 flex items-center justify-center text-slate-500 hover:text-orange-300 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelinePanel({ artists, funky }: { artists: typeof ARTIST_PIPELINE; funky: boolean }) {
  return (
    <div className="space-y-3">
      <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-4">Artist Applications</p>
      {artists.map((artist, i) => {
        const isPending = artist.status === 'PENDING_REVIEW';
        return (
          <div
            key={artist.id}
            className={`demo-card-in p-4 rounded-2xl border transition-all ${
              funky ? 'bg-black/30 border-white/5' : 'bg-white/[0.03] border-white/5'
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-semibold text-white">{artist.bandName}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    isPending
                      ? 'bg-amber-500/15 border-amber-500/25 text-amber-400'
                      : 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400'
                  }`}>
                    {isPending ? 'Review' : 'Approved'}
                  </span>
                </div>
                <p className="text-slate-500 text-xs">{artist.genre}</p>
                <p className="text-slate-600 text-xs mt-0.5">Est. draw: {artist.draw} · {artist.requestedDate}</p>
              </div>
              {isPending && (
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-amber-500/60" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
