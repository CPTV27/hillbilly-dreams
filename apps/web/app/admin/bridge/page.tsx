'use client';

import { useState, useEffect, useCallback } from 'react';

interface BridgeClient {
  id: number;
  name: string;
  apiKey: string;
  apiSecret: string; // Masked in list view
  status: string;
  allowedCategories: string[];
  createdAt: string;
  lastSyncAt: string | null;
  articleCount: number;
}

export default function BridgeClientsPage() {
  const [clients, setClients] = useState<BridgeClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add client modal
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  // Credential reveal (only on creation/rotation)
  const [revealedCreds, setRevealedCreds] = useState<{
    name: string;
    apiKey: string;
    apiSecret: string;
  } | null>(null);

  // Rotate confirmation
  const [rotateId, setRotateId] = useState<number | null>(null);
  const [rotateConfirm, setRotateConfirm] = useState('');

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/bridge-clients');
      if (!res.ok) throw new Error('Failed to load clients');
      const data = await res.json();
      setClients(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  // Create new client
  async function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/bridge-clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to create');

      setRevealedCreds({
        name: json.data.name,
        apiKey: json.data.apiKey,
        apiSecret: json.data.apiSecret,
      });
      setShowModal(false);
      setNewName('');
      fetchClients();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Create failed');
    } finally {
      setCreating(false);
    }
  }

  // Toggle status
  async function handleToggleStatus(client: BridgeClient) {
    const newStatus = client.status === 'active' ? 'suspended' : 'active';
    try {
      const res = await fetch(`/api/admin/bridge-clients/${client.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchClients();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Status update failed');
    }
  }

  // Rotate secret
  async function handleRotate(id: number) {
    if (rotateConfirm !== 'ROTATE') return;
    try {
      const res = await fetch(`/api/admin/bridge-clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rotateSecret: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Rotation failed');

      setRevealedCreds({
        name: json.name,
        apiKey: clients.find(c => c.id === id)?.apiKey ?? '',
        apiSecret: json.apiSecret,
      });
      setRotateId(null);
      setRotateConfirm('');
      fetchClients();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Rotation failed');
    }
  }

  // Copy integration specs
  function copySpecs(client: BridgeClient) {
    const specs = {
      endpoint: `${window.location.origin}/api/bridge/ingest`,
      apiKey: client.apiKey,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': client.apiKey,
      },
      signatureFormat: 'HMAC-SHA256 → version:timestamp:JSON.stringify(data)',
      payloadEnvelope: {
        version: '1.0',
        timestamp: 'ISO-8601',
        data: { article: '{ title, slug, excerpt, body, category, city, author, readTime }', project: '{ ...opaque metadata }' },
        signature: 'hex',
      },
    };
    navigator.clipboard.writeText(JSON.stringify(specs, null, 2));
  }

  function timeAgo(dateStr: string | null): string {
    if (!dateStr) return 'Never';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Bridge Clients</h1>
          <p className="admin-page-sub">
            Multi-tenant Content-as-a-Service — registered data producers
          </p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => setShowModal(true)}>
          + Add Client
        </button>
      </div>

      {error && (
        <div className="admin-error-banner" onClick={() => setError('')} style={{ cursor: 'pointer' }}>
          {error}
        </div>
      )}

      {/* ── Credential Reveal (shown once on creation/rotation) ── */}
      {revealedCreds && (
        <div className="cred-reveal">
          <div className="cred-reveal__header">
            <strong>Credentials for {revealedCreds.name}</strong>
            <span className="cred-reveal__warn">Save these now — the secret will not be shown again</span>
          </div>
          <div className="cred-reveal__grid">
            <div className="cred-reveal__field">
              <label>API Key</label>
              <div className="cred-reveal__value">
                <code>{revealedCreds.apiKey}</code>
                <button onClick={() => navigator.clipboard.writeText(revealedCreds.apiKey)} className="cred-copy-btn">Copy</button>
              </div>
            </div>
            <div className="cred-reveal__field">
              <label>API Secret</label>
              <div className="cred-reveal__value">
                <code className="cred-reveal__secret">{revealedCreds.apiSecret}</code>
                <button onClick={() => navigator.clipboard.writeText(revealedCreds.apiSecret)} className="cred-copy-btn">Copy</button>
              </div>
            </div>
          </div>
          <button className="admin-btn admin-btn--ghost" onClick={() => setRevealedCreds(null)} style={{ marginTop: 12 }}>
            I&apos;ve saved these credentials
          </button>
        </div>
      )}

      {/* ── Client Table ── */}
      {loading ? (
        <div className="admin-empty"><p>Loading clients...</p></div>
      ) : clients.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">&#9783;</div>
          <p className="admin-empty__text">No bridge clients registered yet</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>API Key</th>
                <th>Status</th>
                <th>Articles</th>
                <th>Last Sync</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td><code style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.apiKey.slice(0, 8)}...</code></td>
                  <td>
                    <span className={`admin-badge admin-badge--${c.status}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{c.articleCount}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                    {timeAgo(c.lastSyncAt)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <button
                        className="admin-btn admin-btn--ghost"
                        style={{ fontSize: 11, padding: '2px 8px' }}
                        onClick={() => copySpecs(c)}
                        title="Copy integration specs to clipboard"
                      >
                        Copy Specs
                      </button>
                      <button
                        className="admin-btn admin-btn--ghost"
                        style={{ fontSize: 11, padding: '2px 8px' }}
                        onClick={() => handleToggleStatus(c)}
                      >
                        {c.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button
                        className="admin-btn admin-btn--danger"
                        style={{ fontSize: 11, padding: '2px 8px' }}
                        onClick={() => setRotateId(rotateId === c.id ? null : c.id)}
                      >
                        Rotate Secret
                      </button>
                    </div>
                    {/* Rotate confirmation */}
                    {rotateId === c.id && (
                      <div style={{ marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
                        <input
                          type="text"
                          className="admin-input"
                          style={{ width: 120, fontSize: 11, padding: '4px 8px' }}
                          placeholder='Type "ROTATE"'
                          value={rotateConfirm}
                          onChange={(e) => setRotateConfirm(e.target.value)}
                        />
                        <button
                          className="admin-btn admin-btn--danger"
                          style={{ fontSize: 11, padding: '2px 8px' }}
                          disabled={rotateConfirm !== 'ROTATE'}
                          onClick={() => handleRotate(c.id)}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add Client Modal ── */}
      {showModal && (
        <div className="bridge-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bridge-modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              Register New Client
            </h2>
            <div className="admin-form-group">
              <label className="admin-label admin-label--required">Client Name</label>
              <input
                className="admin-input"
                placeholder="e.g. Scan2Plan, Chase Pierson Photography"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                autoFocus
              />
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
              An API Key and Secret will be generated automatically.
              The secret is shown only once — the client must save it immediately.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="admin-btn admin-btn--ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="admin-btn admin-btn--primary"
                onClick={handleCreate}
                disabled={creating || !newName.trim()}
              >
                {creating ? 'Creating...' : 'Generate Credentials'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Credential Reveal ── */
        .cred-reveal {
          background: #0c1425;
          border: 1px solid #1e3a5f;
          border-radius: var(--radius-md);
          padding: var(--space-6);
          margin-bottom: var(--space-6);
        }
        .cred-reveal__header {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          color: #93c5fd;
          font-size: var(--text-sm);
        }
        .cred-reveal__warn {
          font-size: var(--text-xs);
          color: var(--warning);
          font-weight: 600;
        }
        .cred-reveal__grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .cred-reveal__field label {
          display: block;
          font-size: var(--text-xs);
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .cred-reveal__value {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: var(--radius-sm);
          padding: var(--space-2) var(--space-3);
        }
        .cred-reveal__value code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
          color: #e2e8f0;
          flex: 1;
          word-break: break-all;
        }
        .cred-reveal__secret {
          color: #fbbf24 !important;
        }
        .cred-copy-btn {
          background: none;
          border: 1px solid #334155;
          color: #93c5fd;
          padding: 2px 8px;
          font-size: 11px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          flex-shrink: 0;
          font-family: var(--font-body);
        }
        .cred-copy-btn:hover {
          border-color: #93c5fd;
        }

        /* ── Add Client Modal ── */
        .bridge-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .bridge-modal {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-8);
          width: 90%;
          max-width: 480px;
        }

        /* ── Suspended badge ── */
        .admin-badge--suspended {
          background: var(--error-muted, rgba(239, 68, 68, 0.12));
          color: var(--error, #ef4444);
        }
      `}</style>
    </>
  );
}
