'use client';

// apps/web/app/(admin)/contacts/page.tsx
// Contact CRM — fetches from /api/contacts, supports category filter, search, delete

import { useState, useMemo, useEffect, useCallback } from 'react';

const CATEGORIES = ['all', 'artist', 'vendor', 'media', 'partner', 'guest', 'team'];

function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '70%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '50%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '60%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '80%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '55%' }} /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '40%' }} /></td>
    </tr>
  );
}

interface Contact {
  id: number;
  name: string;
  role: string | null;
  organization: string | null;
  email: string | null;
  phone: string | null;
  category: string | null;
  notes: string | null;
  lastContact: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch('/api/contacts');
      const json = await res.json();
      setContacts(json.data ?? []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
      setError('Failed to load contacts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete contact.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch = !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.email ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (c.organization ?? '').toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'all' || c.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [contacts, search, categoryFilter]);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Contacts</h1>
          <p className="admin-page-sub">
            {loading ? '…' : `${contacts.length} contacts total · ${filtered.length} shown`}
          </p>
        </div>
        <a href="/contacts/new" className="admin-btn admin-btn--primary">+ New Contact</a>
      </div>

      {error && (
        <div className="admin-error-banner">
          {error}
          <button onClick={fetchContacts} className="admin-btn admin-btn--ghost" style={{ marginLeft: 'var(--space-3)' }}>Retry</button>
        </div>
      )}

      <div className="contacts-filters">
        <input
          type="search"
          placeholder="Search contacts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input contacts-search"
          aria-label="Search contacts"
        />
        <div className="admin-filter-bar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`admin-filter-btn ${categoryFilter === c ? 'admin-filter-btn--active' : ''}`}
            >
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="admin-table-wrap contacts-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Role</th><th>Organization</th><th>Email</th><th>Category</th><th>Last Contact</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}</>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7}>
                <div className="admin-empty">
                  <div className="admin-empty__icon">◻</div>
                  <p className="admin-empty__text">No contacts match your filters.</p>
                </div>
              </td></tr>
            ) : (
              filtered.map((contact) => (
                <tr key={contact.id} className={actionLoading === contact.id ? 'row-loading' : ''}>
                  <td>
                    <a href={`/contacts/${contact.id}/edit`} className="contacts-name-link">{contact.name}</a>
                  </td>
                  <td><span className="contacts-meta">{contact.role ?? '—'}</span></td>
                  <td><span className="contacts-meta">{contact.organization ?? '—'}</span></td>
                  <td>
                    {contact.email ? (
                      <a href={`mailto:${contact.email}`} className="contacts-email">{contact.email}</a>
                    ) : '—'}
                  </td>
                  <td>
                    {contact.category ? (
                      <span className={`admin-badge admin-badge--${contact.category}`}>{contact.category}</span>
                    ) : '—'}
                  </td>
                  <td><span className="contacts-date">{formatDate(contact.lastContact)}</span></td>
                  <td>
                    <div className="contacts-actions">
                      <a href={`/contacts/${contact.id}/edit`} className="admin-btn admin-btn--ghost contacts-action-btn">Edit</a>
                      <button
                        onClick={() => handleDelete(contact.id, contact.name)}
                        className="admin-btn admin-btn--danger contacts-action-btn"
                        disabled={actionLoading === contact.id}
                      >
                        {actionLoading === contact.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="contacts-mobile-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="contact-mobile-card">
              <div className="skeleton skeleton--badge" style={{ marginBottom: 'var(--space-3)' }} />
              <div className="skeleton skeleton--text" style={{ width: '80%', marginBottom: 'var(--space-2)' }} />
              <div className="skeleton skeleton--text" style={{ width: '50%' }} />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">◻</div>
            <p className="admin-empty__text">No contacts match your filters.</p>
          </div>
        ) : (
          filtered.map((contact) => (
            <div key={contact.id} className={`contact-mobile-card ${actionLoading === contact.id ? 'row-loading' : ''}`}>
              <div className="contact-mobile-card__top">
                {contact.category && <span className={`admin-badge admin-badge--${contact.category}`}>{contact.category}</span>}
                <span className="contacts-date">{formatDate(contact.lastContact)}</span>
              </div>
              <a href={`/contacts/${contact.id}/edit`} className="contacts-name-link contact-mobile-card__name">{contact.name}</a>
              <div className="contact-mobile-card__meta">
                {contact.role && <span className="contacts-meta">{contact.role}</span>}
                {contact.organization && <span className="contacts-meta">{contact.organization}</span>}
              </div>
              {contact.email && <a href={`mailto:${contact.email}`} className="contacts-email">{contact.email}</a>}
              <div className="contacts-actions" style={{ marginTop: 'var(--space-3)' }}>
                <a href={`/contacts/${contact.id}/edit`} className="admin-btn admin-btn--ghost contacts-action-btn">Edit</a>
                <button
                  onClick={() => handleDelete(contact.id, contact.name)}
                  className="admin-btn admin-btn--danger contacts-action-btn"
                  disabled={actionLoading === contact.id}
                >
                  {actionLoading === contact.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .contacts-filters {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .contacts-search {
          flex: 1;
          min-width: 200px;
        }
        .contacts-table-wrap { display: none; }
        @media (min-width: 768px) {
          .contacts-table-wrap { display: block; }
          .contacts-mobile-list { display: none; }
        }
        .contacts-name-link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .contacts-name-link:hover { color: var(--accent-hover); text-decoration: underline; }
        .contacts-meta {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .contacts-email {
          font-size: var(--text-sm);
          color: var(--accent);
          text-decoration: none;
        }
        .contacts-email:hover { text-decoration: underline; }
        .contacts-date {
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .contacts-actions {
          display: flex;
          gap: var(--space-2);
        }
        .contacts-action-btn {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
        }
        .contacts-mobile-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .contact-mobile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
        }
        .contact-mobile-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-2);
        }
        .contact-mobile-card__name {
          display: block;
          font-size: var(--text-md);
          margin-bottom: var(--space-2);
        }
        .contact-mobile-card__meta {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: var(--space-1);
        }
        .contact-mobile-card__meta > * { font-size: var(--text-xs); }
      `}</style>
    </>
  );
}
