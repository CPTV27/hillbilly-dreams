'use client';
// Amy's custom remote control — v2 inline styles
import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Users, Music, Camera, ClipboardList, Phone, Mail, ChevronRight, Check, AlertCircle, Upload } from 'lucide-react';

// ── Types ──

interface Arrival {
  id: string;
  guest: string;
  email: string;
  phone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  balance: number;
  status: string;
  source: string;
}

interface ArtistSlot {
  name: string;
  genre: string | null;
  setOrder: number;
  setLength: number | null;
  status: string;
  contactEmail: string | null;
  contactPhone: string | null;
  notes: string | null;
}

interface ShowcaseEntry {
  id: number;
  name: string;
  venue: string;
  date: string;
  time: string | null;
  status: string;
  artists: ArtistSlot[];
}

interface Task {
  id: number;
  title: string;
  assignedTo: string | null;
  timeEstimate: string | null;
  session: string;
}

interface ChaseItem {
  id: number;
  name: string;
  category: string | null;
  organization: string | null;
  missingEmail: boolean;
  missingPhone: boolean;
}

interface DashboardData {
  arrivals: Arrival[];
  loadsheet: ShowcaseEntry[];
  tasks: Task[];
  chaseList: ChaseItem[];
  timestamp: string;
}

// ── Main Component ──

export default function AmyDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ops/amy');
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleTask = (id: number) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex items-center gap-3 text-neutral-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-lg font-medium">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchData}
            className="bg-amber-600 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-transform"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { arrivals = [], loadsheet = [], tasks = [], chaseList = [] } = data || {};

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Hey, Amy</h1>
          <p className="text-sm text-neutral-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-3 rounded-full bg-white border border-neutral-200 shadow-sm active:scale-95 transition-transform"
        >
          <RefreshCw className={`w-5 h-5 text-neutral-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        <StatBubble label="Arrivals" value={arrivals.length} icon={<Users className="w-4 h-4" />} color="blue" />
        <StatBubble label="Shows" value={loadsheet.length} icon={<Music className="w-4 h-4" />} color="purple" />
        <StatBubble label="To-Dos" value={tasks.length - completedTasks.size} icon={<ClipboardList className="w-4 h-4" />} color="amber" />
      </div>

      {/* Panel 1: Today's Arrivals */}
      <Panel
        title="Today's Arrivals"
        icon={<Users className="w-5 h-5" />}
        count={arrivals.length}
        emptyMessage="No check-ins today"
        color="blue"
      >
        {arrivals.map((a) => (
          <div key={a.id} className="py-3 border-b border-neutral-100 last:border-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-neutral-900 truncate">{a.guest}</p>
                <p className="text-sm text-neutral-500">{a.room}</p>
              </div>
              {a.balance > 0 && (
                <span className="text-xs font-medium bg-red-50 text-red-700 px-2 py-1 rounded-full flex-shrink-0">
                  ${a.balance.toFixed(0)} due
                </span>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              {a.phone && (
                <a href={`tel:${a.phone}`} className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform">
                  <Phone className="w-3 h-3" /> Call
                </a>
              )}
              {a.email && (
                <a href={`mailto:${a.email}`} className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full active:scale-95 transition-transform">
                  <Mail className="w-3 h-3" /> Email
                </a>
              )}
              <span className="text-xs text-neutral-400 flex items-center gap-1 ml-auto">
                {a.checkIn} → {a.checkOut}
              </span>
            </div>
          </div>
        ))}
      </Panel>

      {/* Panel 2: Artist Loadsheet */}
      <Panel
        title="Artist Loadsheet"
        icon={<Music className="w-5 h-5" />}
        count={loadsheet.reduce((n, s) => n + s.artists.length, 0)}
        emptyMessage="No shows scheduled today"
        color="purple"
      >
        {loadsheet.map((show) => (
          <div key={show.id} className="py-3 border-b border-neutral-100 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-neutral-900">{show.name}</p>
              {show.time && <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-full">{show.time}</span>}
            </div>
            <p className="text-xs text-neutral-500 mb-2">{show.venue}</p>
            <ul className="space-y-2">
              {show.artists.map((artist, i) => (
                <li key={i} className="flex items-center justify-between bg-neutral-50 rounded-lg px-3 py-2">
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-800 text-sm truncate">{artist.name}</p>
                    <p className="text-xs text-neutral-500">
                      {artist.genre && <span>{artist.genre}</span>}
                      {artist.setLength && <span> · {artist.setLength} min</span>}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {artist.contactPhone && (
                      <a href={`tel:${artist.contactPhone}`} className="p-2 text-purple-600 bg-purple-50 rounded-full active:scale-95 transition-transform">
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {artist.contactEmail && (
                      <a href={`mailto:${artist.contactEmail}`} className="p-2 text-purple-600 bg-purple-50 rounded-full active:scale-95 transition-transform">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Panel>

      {/* Panel 3: Media Drop */}
      <Panel
        title="Media Drop"
        icon={<Camera className="w-5 h-5" />}
        color="emerald"
      >
        <MediaDrop />
      </Panel>

      {/* Panel 4: Chase List */}
      <Panel
        title="Chase List"
        icon={<ClipboardList className="w-5 h-5" />}
        count={tasks.length - completedTasks.size}
        emptyMessage="All caught up!"
        color="amber"
      >
        {/* Outstanding tasks */}
        {tasks.map((t) => {
          const done = completedTasks.has(t.id);
          return (
            <button
              key={t.id}
              onClick={() => toggleTask(t.id)}
              className="w-full flex items-center gap-3 py-3 border-b border-neutral-100 last:border-0 text-left active:bg-neutral-50 transition-colors"
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-green-500 border-green-500' : 'border-neutral-300'}`}>
                {done && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`font-medium text-sm ${done ? 'text-neutral-400 line-through' : 'text-neutral-800'}`}>{t.title}</p>
                <p className="text-xs text-neutral-400">{t.session}{t.timeEstimate ? ` · ${t.timeEstimate}` : ''}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-300 flex-shrink-0" />
            </button>
          );
        })}

        {/* Missing contacts info */}
        {chaseList.length > 0 && (
          <>
            <div className="pt-3 pb-1">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Missing Info</p>
            </div>
            {chaseList.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div className="min-w-0">
                  <p className="font-medium text-sm text-neutral-800 truncate">{c.name}</p>
                  <p className="text-xs text-neutral-400">{c.organization || c.category}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {c.missingEmail && (
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">No email</span>
                  )}
                  {c.missingPhone && (
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">No phone</span>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </Panel>

      {/* Last updated */}
      {lastRefresh && (
        <p className="text-center text-xs text-neutral-400 pt-2">
          Updated {lastRefresh.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </p>
      )}
    </div>
  );
}

// ── Sub-components ──

function StatBubble({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    blue: { bg: '#eff6ff', text: '#1d4ed8' },
    purple: { bg: '#f5f3ff', text: '#7c3aed' },
    amber: { bg: '#fffbeb', text: '#b45309' },
    emerald: { bg: '#ecfdf5', text: '#047857' },
  };
  const s = styles[color] || styles.amber;
  return (
    <div style={{ backgroundColor: s.bg, color: s.text, borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
        {icon}
        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</span>
      </div>
      <p style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.8 }}>{label}</p>
    </div>
  );
}

function Panel({
  title,
  icon,
  count,
  emptyMessage,
  color,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  emptyMessage?: string;
  color: string;
  children: React.ReactNode;
}) {
  const colors: Record<string, { border: string; icon: string }> = {
    blue: { border: '#3b82f6', icon: '#2563eb' },
    purple: { border: '#8b5cf6', icon: '#7c3aed' },
    amber: { border: '#f59e0b', icon: '#d97706' },
    emerald: { border: '#10b981', icon: '#059669' },
  };
  const c = colors[color] || colors.amber;
  const isEmpty = count !== undefined && count === 0;

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '0.75rem', border: '1px solid #e5e5e5', borderLeft: `4px solid ${c.border}`, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid #f5f5f5' }}>
        <span style={{ color: c.icon }}>{icon}</span>
        <h2 style={{ fontWeight: 700, color: '#171717', fontSize: '1rem', margin: 0 }}>{title}</h2>
        {count !== undefined && (
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 500, color: '#a3a3a3', backgroundColor: '#f5f5f5', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>{count}</span>
        )}
      </div>
      <div style={{ padding: '0 1rem' }}>
        {isEmpty && emptyMessage ? (
          <div style={{ padding: '2rem 0', textAlign: 'center', color: '#a3a3a3' }}>
            <p style={{ fontWeight: 500 }}>{emptyMessage}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

function MediaDrop() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    // For now, simulate upload — wire to GCS when ready
    await new Promise(r => setTimeout(r, 1500));
    setUploading(false);
    setUploaded(true);
    setFiles([]);
  };

  return (
    <div className="py-4 space-y-3">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-xl p-6 cursor-pointer active:scale-[0.98] transition-transform hover:border-emerald-400 hover:bg-emerald-50/30">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFiles}
        />
        <Upload className="w-8 h-8 text-neutral-400 mb-2" />
        <p className="font-medium text-neutral-600 text-sm">Tap to select photos & videos</p>
        <p className="text-xs text-neutral-400 mt-1">From last night's events</p>
      </label>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-neutral-600 font-medium">{files.length} file{files.length !== 1 ? 's' : ''} selected</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload {files.length} file{files.length !== 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      )}

      {uploaded && (
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl">
          <Check className="w-5 h-5" />
          <p className="font-medium text-sm">Files uploaded to media folder</p>
        </div>
      )}
    </div>
  );
}
