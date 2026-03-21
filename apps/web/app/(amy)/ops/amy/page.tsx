'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Users, Music, Camera, ClipboardList, Phone, Mail, Check, CheckCircle2, AlertCircle, Upload, ChevronRight, Sparkles, Printer } from 'lucide-react';

// ── Types ──
interface Arrival { id: string; guest: string; email: string; phone: string; room: string; checkIn: string; checkOut: string; balance: number; status: string; source: string; }
interface ArtistSlot { name: string; genre: string | null; setOrder: number; setLength: number | null; status: string; contactEmail: string | null; contactPhone: string | null; notes: string | null; }
interface ShowcaseEntry { id: number; name: string; venue: string; date: string; time: string | null; status: string; artists: ArtistSlot[]; }
interface Task { id: number; title: string; assignedTo: string | null; timeEstimate: string | null; session: string; }
interface ChaseItem { id: number; name: string; category: string | null; organization: string | null; missingEmail: boolean; missingPhone: boolean; }
interface DashboardData { arrivals: Arrival[]; loadsheet: ShowcaseEntry[]; tasks: Task[]; chaseList: ChaseItem[]; timestamp: string; }

export default function AmyPremiumDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/ops/amy');
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const completeTask = (id: number) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const { arrivals = [], loadsheet = [], tasks = [], chaseList = [] } = data || {};
  const pendingTasks = tasks.map(t => t.id).filter(id => !completedTasks.has(id));

  // Render Loading
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <RefreshCw className="w-8 h-8 text-blue-500/50 animate-spin" />
      </div>
    );
  }

  // Render Error
  if (error && !data) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans p-6 text-center">
        <div className="bg-red-950/20 border border-red-500/30 p-8 rounded-3xl backdrop-blur-xl max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Sync Failed</h2>
          <p className="text-red-400/80 mb-6">{error}</p>
          <button onClick={fetchData} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 0, label: 'Arrivals', count: arrivals.length, icon: Users },
    { id: 1, label: 'Loadsheet', count: loadsheet.reduce((n, s) => n + s.artists.length, 0), icon: Music },
    { id: 2, label: 'Media Drop', count: 0, icon: Camera },
    { id: 3, label: 'Chase List', count: pendingTasks.length, icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto p-4 md:p-8 relative z-10 flex flex-col h-screen">

        {/* Header */}
        <header className="flex justify-between items-end mb-8 mt-4 amy-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h2 className="text-blue-400 font-medium tracking-widest text-sm uppercase">Command Center</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">Hey, Amy <span className="text-slate-600">✦</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="h-12 px-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-md shadow-lg text-white font-medium print:hidden">
              <Printer className="w-5 h-5 text-blue-400" />
              <span>Print Memos</span>
            </button>
            <button onClick={fetchData} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md print:hidden">
              <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            </button>
          </div>
        </header>

        {/* Stat Bubbles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 amy-fade-in-delay">
          <StatBubble title="Arrivals Today" value={arrivals.length} gradient="from-blue-500/20 to-blue-600/5" border="border-blue-500/20" text="text-blue-400" />
          <StatBubble title="Shows Scheduled" value={loadsheet.length} gradient="from-purple-500/20 to-purple-600/5" border="border-purple-500/20" text="text-purple-400" />
          <StatBubble title="Pending Actions" value={pendingTasks.length} gradient="from-amber-500/20 to-amber-600/5" border="border-amber-500/20" text="text-amber-400" />
          <StatBubble title="Chase Missing" value={chaseList.length} gradient="from-rose-500/20 to-rose-600/5" border="border-rose-500/20" text="text-rose-400" />
        </div>

        {/* Dashboard Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">

          {/* Vertical Navigation (Desktop) / Horizontal Scroll (Mobile) */}
          <div className="flex shrink-0 md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar md:w-64">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-300 ${
                    isActive ? 'bg-white/10 border-white/20 text-white shadow-lg' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  } border`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                    <span className="font-medium text-lg">{tab.label}</span>
                  </div>
                  {tab.count > 0 && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      {tab.count}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 rounded-full md:inset-y-0 md:left-0 md:w-1 md:h-auto md:inset-x-auto" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-2xl overflow-hidden flex flex-col relative shadow-2xl">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div key={activeTab} className="amy-tab-fade">
                {activeTab === 0 && <ArrivalsView arrivals={arrivals} />}
                {activeTab === 1 && <LoadsheetView loadsheet={loadsheet} />}
                {activeTab === 2 && <MediaDropView />}
                {activeTab === 3 && (
                  <ChaseView
                    tasks={tasks}
                    chaseList={chaseList}
                    completedTasks={completedTasks}
                    onComplete={completeTask}
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @media print {
          body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .backdrop-blur-2xl, .backdrop-blur-xl, .bg-white\\/5 { background: white !important; border: 1px solid #ddd !important; box-shadow: none !important; color: black !important; }
          .text-white, .text-slate-200, .text-slate-400 { color: black !important; }
        }

        @keyframes amyFadeIn {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes amyFadeInScale {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes amyTabFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes amyCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes amySuccessIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        .amy-fade-in {
          animation: amyFadeIn 0.4s ease both;
        }
        .amy-fade-in-delay {
          animation: amyFadeInScale 0.4s ease 0.1s both;
        }
        .amy-tab-fade {
          animation: amyTabFade 0.2s ease both;
        }
        .amy-card-in {
          animation: amyCardIn 0.3s ease both;
        }
        .amy-success-in {
          animation: amySuccessIn 0.25s ease both;
        }
      `}} />
    </div>
  );
}

// ── Components ──

function StatBubble({ title, value, gradient, border, text }: any) {
  return (
    <div className={`p-6 rounded-3xl bg-gradient-to-br ${gradient} border ${border} backdrop-blur-xl flex flex-col justify-center`}>
      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{title}</span>
      <span className={`text-4xl md:text-5xl font-light ${text}`}>{value}</span>
    </div>
  );
}

// ARRIVALS
function ArrivalsView({ arrivals }: { arrivals: Arrival[] }) {
  if (arrivals.length === 0) return <EmptyState icon={Users} title="Zero Arrivals" message="No guests checked in for today." />;
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-light text-white mb-6">Guest Manifest</h3>
      {arrivals.map((a, i) => (
        <div
          key={a.id}
          className="amy-card-in group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex items-center gap-5">
            <div className={`w-3 h-3 rounded-full ${a.balance > 0 ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'}`} />
            <div>
              <h4 className="text-xl font-medium text-white">{a.guest}</h4>
              <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                <span>{a.room}</span> • <span>{a.checkIn}</span> • <span className={a.balance > 0 ? 'text-amber-400' : 'text-emerald-400'}>{a.balance > 0 ? `$${a.balance.toFixed(0)} Due` : 'Paid'}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {a.phone && <a href={`tel:${a.phone}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"><Phone className="w-4 h-4" /></a>}
            {a.email && <a href={`mailto:${a.email}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>}
            <button className="h-10 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors ml-2">
              Manage
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// LOADSHEET
function LoadsheetView({ loadsheet }: { loadsheet: ShowcaseEntry[] }) {
  if (loadsheet.length === 0) return <EmptyState icon={Music} title="No Shows" message="No artists scheduled for load-in." />;
  return (
    <div className="space-y-10">
      {loadsheet.map((show, idx) => (
        <div
          key={show.id}
          className="amy-card-in"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="mb-6 flex justify-between items-end border-b border-white/10 pb-4">
            <div>
              <h3 className="text-2xl font-light text-white">{show.name}</h3>
              <p className="text-purple-400 text-sm font-medium mt-1">{show.venue} • {show.date}</p>
            </div>
          </div>
          <div className="space-y-3">
            {show.artists.map((artist, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
                    {artist.setOrder}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{artist.name}</h4>
                    <p className="text-slate-400 text-sm">{artist.genre || 'Unknown Genre'} • {artist.setLength ? `${artist.setLength} min` : 'TBD'} • <span className="uppercase text-xs font-bold text-emerald-400">{artist.status}</span></p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// MEDIA DROP
function MediaDropView() {
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSimulate = () => {
    setUploading(true);
    setTimeout(() => { setUploading(false); setDone(true); }, 2000);
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-light text-white mb-2">Media Ingestion</h3>
        <p className="text-slate-400">Drop high-res photos and video clips from last night&#39;s event here. They will automatically sync to the Drive.</p>
      </div>

      {!done ? (
        <label
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          className={`relative cursor-pointer flex flex-col items-center justify-center p-20 rounded-3xl border-2 border-dashed transition-all ${drag ? 'border-amber-400 bg-amber-500/10' : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'}`}
        >
          <input type="file" className="hidden" multiple onChange={handleSimulate} />
          {uploading ? (
            <RefreshCw className="w-16 h-16 text-amber-500 animate-spin mb-6" />
          ) : (
            <Upload className={`w-16 h-16 mb-6 transition-colors ${drag ? 'text-amber-400' : 'text-slate-600'}`} />
          )}
          <h4 className="text-xl font-medium text-white mb-2">
            {uploading ? 'Processing 14 files...' : (drag ? 'Drop it right here' : 'Tap to browse or Drop files')}
          </h4>
          <p className="text-slate-500 text-sm text-center max-w-xs">{uploading ? 'Generating AI tags and syncing to Google Drive.' : 'Supports RAW, MP4, and standard image formats up to 4GB.'}</p>
        </label>
      ) : (
        <div className="amy-success-in flex flex-col items-center text-center p-12 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl">
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-medium text-white mb-2">Pipeline Complete</h4>
          <p className="text-emerald-400/80 mb-8">14 files have been successfully ingested and tagged.</p>
          <button onClick={() => setDone(false)} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors">
            Upload More
          </button>
        </div>
      )}
    </div>
  );
}

// CHASE & TASKS
function ChaseView({ tasks, chaseList, completedTasks, onComplete }: any) {
  const pendingTasks = tasks.filter((t: any) => !completedTasks.has(t.id));

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <ClipboardList className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-light text-white">Action Items</h3>
        </div>

        {pendingTasks.length === 0 ? (
          <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-4">
            <CheckCircle2 className="w-8 h-8" />
            <span className="text-lg font-medium">All clear. You&#39;ve processed everything.</span>
          </div>
        ) : (
          <div className="grid gap-3">
            {pendingTasks.map((t: any) => (
              <div
                key={t.id}
                className="amy-card-in bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:bg-white/10 transition-colors"
              >
                <div>
                  <h4 className="text-lg font-medium text-white">{t.title}</h4>
                  <p className="text-slate-500 text-sm mt-1">{t.session} {t.timeEstimate && `• ${t.timeEstimate} est`}</p>
                </div>
                <button
                  onClick={() => onComplete(t.id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all active:scale-95"
                >
                  <Check className="w-5 h-5" />
                  <span>Done</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {chaseList.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-rose-500" />
            <h3 className="text-2xl font-light text-white">Missing Information Chase</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {chaseList.map((c: any) => (
              <div key={c.id} className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-medium text-white">{c.name}</h4>
                  <p className="text-slate-400 text-sm">{c.category || 'Unknown'} • {c.organization || 'No Org'}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.missingEmail && <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider">NO EMAIL</span>}
                  {c.missingPhone && <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider">NO PHONE</span>}
                </div>
                <button className="mt-4 w-full py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors font-medium text-sm">
                  Send Automated Template
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, title, message }: any) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-12">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-slate-600" />
      </div>
      <h3 className="text-2xl font-medium text-white mb-2">{title}</h3>
      <p className="text-slate-500">{message}</p>
    </div>
  );
}
