'use client';
import { useState, useEffect } from 'react';

export default function CommandCenter() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [synthesis, setSynthesis] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [harvesting, setHarvesting] = useState(false);
  const [harvestResult, setHarvestResult] = useState<string | null>(null);
  const [scoutName, setScoutName] = useState('');
  const [scoutResult, setScoutResult] = useState<any>(null);
  const [scouting, setScouting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [taskItems, setTaskItems] = useState<any[]>([]);
  const [taskFilter, setTaskFilter] = useState<'all' | 'agent' | 'production'>('all');
  const [taskUpdating, setTaskUpdating] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/agent/context?domain=marketing&topic=harvest-audit&limit=100').then(r => r.json()),
      fetch('/api/agent/context?topic=synthesis&limit=10').then(r => r.json()),
    ]).then(([bizData, synthData]) => {
      const parsed = (bizData.results || []).map((r: any) => { try { return JSON.parse(r.content); } catch { return null; } }).filter(Boolean);
      setBusinesses(parsed);
      setSynthesis((synthData.results || []).map((r: any) => ({ key: r.key, content: r.content })));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const runHarvest = async (category: string) => {
    setHarvesting(true); setHarvestResult(null);
    try {
      const res = await fetch('/api/agent/harvest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ city: 'Natchez, MS', category, limit: 15 }) });
      const data = await res.json();
      setHarvestResult(data.success ? `Found ${data.found}, Saved ${data.saved}` : data.error);
      const bizRes = await fetch('/api/agent/context?domain=marketing&topic=harvest-audit&limit=100');
      const newBiz = (await bizRes.json()).results?.map((r: any) => { try { return JSON.parse(r.content); } catch { return null; } }).filter(Boolean) || [];
      setBusinesses(newBiz);
    } catch (err: any) { setHarvestResult('Error: ' + err.message); }
    setHarvesting(false);
  };

  const searchContext = async () => {
    if (!searchQuery.trim()) return;
    const res = await fetch(`/api/agent/context?q=${encodeURIComponent(searchQuery)}&limit=10`);
    setSearchResults((await res.json()).results || []);
  };

  const runScout = async () => {
    if (!scoutName.trim()) return;
    setScouting(true); setScoutResult(null);
    try {
      const res = await fetch('/api/marketing/scout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ businessName: scoutName, city: 'Natchez, MS' }) });
      setScoutResult((await res.json()).data);
    } catch (err: any) { setScoutResult({ error: err.message }); }
    setScouting(false);
  };

  const loadTasks = () => {
    fetch(`/api/admin/tasks?type=${taskFilter}`)
      .then(r => r.json())
      .then(d => setTaskItems(d.data || []))
      .catch(() => {});
  };

  useEffect(() => { if (activeTab === 'tasks') loadTasks(); }, [activeTab, taskFilter]);

  const updateTaskStatus = async (id: string, type: string, newStatus: string) => {
    setTaskUpdating(id);
    try {
      await fetch('/api/admin/tasks', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, type, status: newStatus }) });
      setTaskItems(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch {}
    setTaskUpdating(null);
  };

  const agentStatuses = ['pending', 'running', 'completed', 'failed', 'cancelled'];
  const prodStages = ['script', 'voiceover', 'video', 'review', 'published'];
  const taskStatusColor: Record<string, string> = { pending: '#c89e3e', running: '#c8943e', completed: '#4a7c59', failed: '#b54c4c', cancelled: '#6b635a', script: '#c89e3e', voiceover: '#c8943e', video: '#4a6274', review: '#c89e3e', published: '#4a7c59' };

  const tc: Record<string, string> = { engine_99: '#22c55e', growth_50: '#f59e0b', starter_20: '#8a8074', operator_499: '#c8943e' };
  const domains = [
    { n: 'MBT', u: 'https://measurablybetterthings.com' }, { n: 'Touring', u: 'https://bigmuddytouring.com' },
    { n: 'DSD', u: 'https://deepsouthdirectory.com' }, { n: 'Magazine', u: 'https://bigmuddymagazine.com' },
    { n: 'Radio', u: 'https://bigmuddyradio.com' }, { n: 'Entertainment', u: 'https://bigmuddyentertainment.com' },
    { n: 'Economics', u: 'https://outsidereconomics.com' }, { n: 'Gallery', u: 'https://buycurious.art' },
    { n: 'HDI', u: 'https://hillbillydreamsinc.com' },
  ];

  if (loading) return <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#c8943e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui', fontSize: '1.25rem' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#e8e4de', fontFamily: "'Inter', system-ui", padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2725', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c8943e', margin: 0 }}>HDI Command Center</h1>
        <a href="/admin/scout" style={{ padding: '0.5rem 1rem', border: '1px solid #c8943e', borderRadius: '8px', color: '#c8943e', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>📷 Scout</a>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[['overview','📊 Overview'],['tasks','📋 Tasks'],['businesses','🏪 Businesses'],['engine','🚀 Engine'],['brain','🧠 Brain']].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: activeTab === id ? '1px solid #c8943e' : '1px solid #333', background: activeTab === id ? '#c8943e' : 'transparent', color: activeTab === id ? '#0f0f0f' : '#8a8074', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>{label}</button>
        ))}
      </div>

      {activeTab === 'overview' && (<>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[[businesses.length,'Businesses'],[businesses.filter((b:any)=>b.urgency==='high').length,'High Priority'],['11','Domains'],['4,387','Fragments'],['613','Assets']].map(([n,l],i) => (
            <div key={i} style={{ background: '#1a1816', borderRadius: '12px', padding: '1rem', border: '1px solid #2a2725', textAlign: 'center' }}>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c8943e', margin: 0 }}>{n}</p>
              <p style={{ fontSize: '0.7rem', color: '#8a8074', margin: '0.25rem 0 0' }}>{l}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1rem', border: '1px solid #2a2725', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Domains</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {domains.map(d => <a key={d.u} href={d.u} target="_blank" rel="noopener" style={{ padding: '0.4rem 0.8rem', background: '#231f1c', border: '1px solid #2a2725', borderRadius: '6px', color: '#e8e4de', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}>{d.n} ↗</a>)}
          </div>
        </div>
        <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1rem', border: '1px solid #2a2725' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Top Targets</div>
          {businesses.sort((a:any,b:any)=>(b.digitalGapScore||0)-(a.digitalGapScore||0)).slice(0,8).map((b:any,i:number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1f1d1a' }}>
              <div><span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{b.name}</span><span style={{ fontSize: '0.7rem', color: '#6a6460', marginLeft: '0.5rem' }}>{b.category}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ padding: '0.1rem 0.4rem', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 700, background: tc[b.tier]||'#333', color: '#0f0f0f' }}>{b.tier}</span>
                <span style={{ fontWeight: 800, color: b.digitalGapScore>80?'#ef4444':'#f59e0b' }}>{b.digitalGapScore}</span>
              </div>
            </div>
          ))}
        </div>
      </>)}

      {activeTab === 'businesses' && (<>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[['🍽 Food','restaurants, food'],['🏨 Lodging','lodging, hotels'],['🛍 Retail','retail, shops'],['🎭 Arts','arts, entertainment']].map(([l,c]) => (
            <button key={c} style={{ padding: '0.5rem 1rem', background: '#c8943e', color: '#0f0f0f', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', opacity: harvesting?0.6:1 }} disabled={harvesting} onClick={()=>runHarvest(c as string)}>{l}</button>
          ))}
        </div>
        {harvestResult && <div style={{ background: '#1a2e1a', border: '1px solid #22c55e', borderRadius: '8px', padding: '0.6rem', color: '#22c55e', marginBottom: '1rem', fontSize: '0.8rem' }}>{harvestResult}</div>}
        <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1rem', border: '1px solid #2a2725' }}>
          {businesses.sort((a:any,b:any)=>(b.digitalGapScore||0)-(a.digitalGapScore||0)).map((b:any,i:number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #1f1d1a', fontSize: '0.8125rem' }}>
              <div style={{ flex: 1 }}><span style={{ fontWeight: 600 }}>{b.name}</span> <span style={{ color: '#6a6460', fontSize: '0.7rem' }}>{b.category}</span></div>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ padding: '0.1rem 0.4rem', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 700, background: tc[b.tier]||'#333', color: '#0f0f0f' }}>{b.tier}</span>
                <span style={{ fontWeight: 800, width: '24px', textAlign: 'right', color: b.digitalGapScore>80?'#ef4444':'#f59e0b' }}>{b.digitalGapScore}</span>
              </div>
            </div>
          ))}
        </div>
      </>)}

      {activeTab === 'engine' && (
        <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2725' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Scout a Business</div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input style={{ flex: 1, padding: '0.75rem', background: '#231f1c', border: '1px solid #333', borderRadius: '8px', color: '#e8e4de', fontSize: '0.9rem', outline: 'none' }} placeholder="Business name..." value={scoutName} onChange={e=>setScoutName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&runScout()} />
            <button style={{ padding: '0.75rem 1.5rem', background: '#c8943e', color: '#0f0f0f', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', opacity: scouting?0.6:1 }} onClick={runScout} disabled={scouting}>{scouting?'⟳':'Scout'}</button>
          </div>
          {scoutResult && <pre style={{ background: '#231f1c', borderRadius: '8px', padding: '1rem', fontSize: '0.75rem', color: '#b8b0a4', whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: '400px', margin: 0 }}>{JSON.stringify(scoutResult,null,2)}</pre>}
        </div>
      )}

      {activeTab === 'tasks' && (<>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
          {(['all', 'agent', 'production'] as const).map(f => (
            <button key={f} onClick={() => setTaskFilter(f)} style={{ padding: '0.4rem 1rem', borderRadius: '999px', border: taskFilter === f ? '1px solid #c8943e' : '1px solid #333', background: taskFilter === f ? 'rgba(200,148,62,0.1)' : 'transparent', color: taskFilter === f ? '#c8943e' : '#8a8074', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {f === 'all' ? 'All' : f === 'agent' ? 'Agent Tasks' : 'Production'}
            </button>
          ))}
          <button onClick={loadTasks} style={{ marginLeft: 'auto', padding: '0.4rem 1rem', background: 'transparent', border: '1px solid #333', borderRadius: '999px', color: '#8a8074', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}>Refresh</button>
        </div>

        {taskItems.length === 0 ? (
          <div style={{ background: '#1a1816', borderRadius: '12px', padding: '2rem', border: '1px solid #2a2725', textAlign: 'center', color: '#4a4440' }}>No tasks found.</div>
        ) : taskItems.map((item: any) => (
          <div key={`${item.type}-${item.id}`} style={{ background: '#1a1816', borderRadius: '10px', padding: '1rem', border: '1px solid #2a2725', marginBottom: '0.6rem', borderLeft: `3px solid ${taskStatusColor[item.status] || '#333'}`, opacity: taskUpdating === item.id ? 0.5 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 700, background: item.type === 'agent' ? 'rgba(200,148,62,0.15)' : 'rgba(74,98,116,0.15)', color: item.type === 'agent' ? '#c8943e' : '#4a6274', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.type === 'agent' ? 'Agent' : 'Prod'}</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#e8e4de' }}>{item.title}</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#6a6460' }}>{new Date(item.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#8a8074' }}>{item.assignee}</span>
              <select value={item.status} onChange={e => updateTaskStatus(item.id, item.type, e.target.value)} disabled={taskUpdating === item.id} style={{ padding: '4px 28px 4px 8px', fontSize: '0.7rem', background: '#231f1c', border: '1px solid #333', borderRadius: '6px', color: taskStatusColor[item.status] || '#e8e4de', fontWeight: 600, cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8074' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}>
                {(item.type === 'agent' ? agentStatuses : prodStages).map((s: string) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
      </>)}

      {activeTab === 'brain' && (<>
        <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2725', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Search Knowledge Base</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input style={{ flex: 1, padding: '0.75rem', background: '#231f1c', border: '1px solid #333', borderRadius: '8px', color: '#e8e4de', fontSize: '0.9rem', outline: 'none' }} placeholder="pricing, wedding revenue, cap table..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&searchContext()} />
            <button style={{ padding: '0.75rem 1.5rem', background: '#c8943e', color: '#0f0f0f', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }} onClick={searchContext}>Search</button>
          </div>
        </div>
        {searchResults.map((r:any,i:number) => (
          <div key={i} style={{ background: '#1a1816', borderRadius: '10px', padding: '1rem', border: '1px solid #2a2725', marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ padding: '0.1rem 0.4rem', background: '#2a2725', color: '#c8943e', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 700 }}>{r.domain}</span>
              <span style={{ fontSize: '0.7rem', color: '#6a6460' }}>{r.topic}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#b8b0a4', lineHeight: 1.6, margin: 0 }}>{r.content?.substring(0,300)}...</p>
          </div>
        ))}
        <div style={{ background: '#1a1816', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2725' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c8943e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Agent Synthesis</div>
          {synthesis.map((s:any,i:number) => (
            <details key={i} style={{ marginBottom: '0.6rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#c8943e', fontSize: '0.875rem' }}>{s.key.replace('synthesis.','').replace('.2026-03-27','').toUpperCase()}</summary>
              <div style={{ fontSize: '0.8125rem', color: '#b8b0a4', marginTop: '0.5rem', whiteSpace: 'pre-wrap', maxHeight: '300px', overflow: 'auto' }}>{s.content.substring(0,1500)}</div>
            </details>
          ))}
        </div>
      </>)}
    </div>
  );
}
