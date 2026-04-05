'use client';

import { useState, useEffect } from 'react';

interface Vendor {
  id: string;
  namespace: string;
  name: string;
  stores: Array<{ id: string; name: string }>;
}

interface BusinessProfile {
  id: string;
  namespace: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  store: { id: string; name: string } | null;
}

interface MarketplaceStore {
  id: string;
  namespace: string;
  name: string;
  description: string | null;
  vendor: { id: string; name: string };
  businessProfile: { id: string; name: string; city: string | null; state: string | null } | null;
  supplies: Array<{ id: string; title: string; priceInCents: number | null; status: string }>;
}

export default function MarketplacePage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [profiles, setProfiles] = useState<BusinessProfile[]>([]);
  const [stores, setStores] = useState<MarketplaceStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'stores' | 'vendors' | 'profiles' | 'new'>('stores');
  const [form, setForm] = useState({ vendorName: '', storeName: '', namespace: 'DEEP_SOUTH_DIRECTORY', address: '', city: '', state: 'MS', description: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/marketplace')
      .then(r => r.json())
      .then(d => {
        setVendors(d.vendors || []);
        setProfiles(d.profiles || []);
        setStores(d.stores || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const createEntry = async () => {
    if (!form.vendorName || !form.storeName || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/admin/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ vendorName: '', storeName: '', namespace: 'DEEP_SOUTH_DIRECTORY', address: '', city: '', state: 'MS', description: '' });
      setTab('stores');
      load();
    } catch (err) {
      console.error('Create failed:', err);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Marketplace</h1>
          <p className="admin-page-sub">Business profiles (discovery) + vendor storefronts (commerce)</p>
        </div>
        <button onClick={load} className="admin-btn admin-btn--ghost">Refresh</button>
      </div>

      {/* Tabs — scroll horizontally on small screens (#88) */}
      <div className="mp-tabs-scroll" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 'var(--space-4)' }}>
        <div className="admin-filter-bar" style={{ flexWrap: 'nowrap', width: 'max-content', minWidth: '100%' }}>
          {(['stores', 'vendors', 'profiles', 'new'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`admin-filter-btn ${tab === t ? 'admin-filter-btn--active' : ''}`} style={{ flexShrink: 0, minHeight: 44 }}>
              {t === 'new' ? '+ New' : t.charAt(0).toUpperCase() + t.slice(1)} {t !== 'new' ? `(${t === 'stores' ? stores.length : t === 'vendors' ? vendors.length : profiles.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>Loading...</div>
      ) : (
        <>
          {/* Stores */}
          {tab === 'stores' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {stores.length === 0 ? (
                <div className="admin-empty">
                  <p className="admin-empty__text">No storefronts yet. Create one from the "+ New" tab.</p>
                </div>
              ) : stores.map(store => (
                <div key={store.id} className="admin-card" style={{ borderLeft: '3px solid var(--accent)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>{store.name}</span>
                      <span className="admin-badge admin-badge--upcoming" style={{ marginLeft: 'var(--space-2)' }}>{store.namespace}</span>
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Vendor: {store.vendor.name}</span>
                  </div>
                  {store.description && (
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 var(--space-2)' }}>{store.description}</p>
                  )}
                  {store.businessProfile && (
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
                      Location: {store.businessProfile.city || '?'}, {store.businessProfile.state || '?'}
                    </p>
                  )}
                  {store.supplies.length > 0 && (
                    <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {store.supplies.length} product(s)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Vendors */}
          {tab === 'vendors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {vendors.map(v => (
                <div key={v.id} className="admin-card">
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>{v.name}</span>
                  <span className="admin-badge admin-badge--media" style={{ marginLeft: 'var(--space-2)' }}>{v.namespace}</span>
                  {v.stores.length > 0 && (
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
                      Stores: {v.stores.map(s => s.name).join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Profiles */}
          {tab === 'profiles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {profiles.map(p => (
                <div key={p.id} className="admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>{p.name}</span>
                      {p.city && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginLeft: 'var(--space-2)' }}>{p.city}, {p.state}</span>}
                    </div>
                    {p.store ? (
                      <span className="admin-badge admin-badge--published">Has store</span>
                    ) : (
                      <span className="admin-badge admin-badge--draft">Discovery only</span>
                    )}
                  </div>
                  {p.address && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', margin: 'var(--space-1) 0 0' }}>{p.address}</p>}
                </div>
              ))}
            </div>
          )}

          {/* New Entry Form */}
          {tab === 'new' && (
            <div className="admin-card mp-new-form">
              <h2 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--space-4)' }}>Create Marketplace Entry</h2>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>Creates a vendor, business profile, and storefront in one step.</p>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-label admin-label--required">Vendor Name</label>
                  <input className="admin-input" value={form.vendorName} onChange={e => setForm({ ...form, vendorName: e.target.value })} placeholder="e.g., Regina Charboneau" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label admin-label--required">Store Name</label>
                  <input className="admin-input" value={form.storeName} onChange={e => setForm({ ...form, storeName: e.target.value })} placeholder="e.g., Biscuits & Blues Shop" />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-label admin-label--required">Namespace</label>
                  <select className="admin-select" value={form.namespace} onChange={e => setForm({ ...form, namespace: e.target.value })}>
                    <option value="DEEP_SOUTH_DIRECTORY">Deep South Directory</option>
                    <option value="BEARSVILLE_CREATIVE">Bearsville Creative</option>
                    <option value="TUTHILL_DESIGN">Tuthill Design</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">City / State</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input className="admin-input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Natchez" style={{ flex: 2 }} />
                    <input className="admin-input" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} placeholder="MS" style={{ flex: 1 }} />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Description</label>
                <textarea className="admin-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What does this vendor sell?" rows={3} />
              </div>

              <div className="admin-form-actions">
                <button onClick={createEntry} disabled={submitting || !form.vendorName || !form.storeName} className="admin-btn admin-btn--primary" style={{ minHeight: 44 }}>
                  {submitting ? 'Creating...' : 'Create Entry'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <style>{`
        @media (max-width: 480px) {
          .mp-new-form .admin-form-row {
            flex-direction: column;
            gap: var(--space-4);
          }
          .mp-new-form .admin-form-group {
            width: 100%;
            min-width: 0;
          }
          .mp-new-form .admin-input,
          .mp-new-form .admin-select,
          .mp-new-form .admin-textarea {
            width: 100%;
            min-height: 44px;
            font-size: 16px;
          }
          .mp-new-form .admin-textarea {
            min-height: 120px;
          }
        }
      `}</style>
    </div>
  );
}
