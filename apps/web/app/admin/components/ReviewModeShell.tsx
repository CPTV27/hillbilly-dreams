'use client';

/**
 * Visual Review Mode (#46) — when on, clicking h1/h2/h3/p in admin content opens a copy-edit request modal.
 * Submits to POST /api/studio-c/request (requestType: copy-edit → StudioCRequest; not ProductionJob — schema is campaign-scoped).
 */

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'admin-review-mode';

export function ReviewModeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reviewMode, setReviewMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [modal, setModal] = useState<null | { text: string; tag: string }>(null);
  const [requestText, setRequestText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    setReviewMode(typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1');
  }, []);

  const persistMode = useCallback((on: boolean) => {
    setReviewMode(on);
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch {
      /* ignore */
    }
    setBanner(null);
  }, []);

  useEffect(() => {
    if (!reviewMode || !hydrated) return;
    const root = document.querySelector('[data-review-shell]');
    if (!root) return;

    const onPointerDown = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest('[data-review-modal-root], [data-review-toolbar]')) return;
      if (t.closest('button, a, input, textarea, select, label, [role="button"], [contenteditable="true"]')) return;
      const el = t.closest('h1, h2, h3, p');
      if (!el || !root.contains(el)) return;
      e.preventDefault();
      e.stopPropagation();
      const text = el.textContent?.trim() ?? '';
      if (text.length < 2) return;
      setModal({ text, tag: el.tagName.toLowerCase() });
      setRequestText('');
      setBanner(null);
    };

    document.addEventListener('click', onPointerDown, true);
    return () => document.removeEventListener('click', onPointerDown, true);
  }, [reviewMode, hydrated]);

  const closeModal = () => {
    setModal(null);
    setRequestText('');
  };

  const submit = async () => {
    if (!modal) return;
    const trimmed = requestText.trim();
    if (trimmed.length < 3) {
      setBanner('Add a short change request (3+ characters).');
      return;
    }
    const brief = [
      '[Visual review mode — copy edit]',
      `Page: ${pathname}`,
      `Element: <${modal.tag}>`,
      '--- Original ---',
      modal.text,
      '--- Request ---',
      trimmed,
    ].join('\n');

    setSubmitting(true);
    setBanner(null);
    try {
      const res = await fetch('/api/studio-c/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          clientBrand: 'big-muddy',
          requestType: 'copy-edit',
          brief,
          location: 'Not applicable',
          budget: 'n/a',
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setBanner(data.error || 'Submit failed');
        return;
      }
      setBanner('Submitted. Editorial queue will pick it up.');
      closeModal();
    } catch {
      setBanner('Network error — try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-review-shell style={{ position: 'relative', minHeight: '100%' }}>
      <div
        data-review-toolbar
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          padding: '0.5rem 0 1rem',
          marginBottom: '0.25rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
        }}
      >
        <button
          type="button"
          onClick={() => persistMode(!reviewMode)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '0.45rem 0.9rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: reviewMode ? 'var(--accent-muted)' : 'var(--surface-2)',
            color: reviewMode ? 'var(--accent)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          Review mode: {reviewMode ? 'On' : 'Off'}
        </button>
        {reviewMode ? (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', maxWidth: 'min(100%, 420px)' }}>
            Click any heading or paragraph to request a copy edit.
          </span>
        ) : null}
      </div>

      {banner ? (
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--accent)',
            margin: '0 0 1rem',
          }}
        >
          {banner}
        </p>
      ) : null}

      {children}

      {modal ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          data-review-modal-root
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            background: 'rgba(0,0,0,0.55)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeModal();
          }}
        >
          <div
            data-review-modal
            style={{
              width: '100%',
              maxWidth: '520px',
              maxHeight: '90vh',
              overflow: 'auto',
              background: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <h2
              id="review-modal-title"
              style={{
                fontFamily: 'var(--font-display), var(--font-body)',
                fontSize: 'var(--text-lg)',
                margin: '0 0 var(--space-4)',
                color: 'var(--text)',
              }}
            >
              Copy change request
            </h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-2)' }}>
              Current text ({modal.tag})
            </p>
            <pre
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.5,
                color: 'var(--text-muted)',
                margin: '0 0 var(--space-5)',
                padding: 'var(--space-3)',
                background: 'var(--bg)',
                borderRadius: 'var(--radius-sm)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: '160px',
                overflow: 'auto',
              }}
            >
              {modal.text}
            </pre>
            <label
              htmlFor="review-change-request"
              style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Change request
            </label>
            <textarea
              id="review-change-request"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              rows={5}
              placeholder="What should change?"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--text)',
                resize: 'vertical',
                marginBottom: 'var(--space-4)',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={closeModal}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => void submit()}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  cursor: submitting ? 'wait' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
