'use client';

import { useState, useEffect } from 'react';

/**
 * EditToolbar — floating toolbar that appears in draft mode.
 * Enables contentEditable on text elements and image swapping.
 *
 * Enable: visit /api/draft?enable=1
 * Disable: visit /api/draft?disable=1
 */
export function EditToolbar() {
  const [editing, setEditing] = useState(false);
  const [changes, setChanges] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    // Check if we're in draft mode
    fetch('/api/draft').then(r => r.json()).then(d => {
      if (d.enabled) setEditing(true);
    }).catch(() => {});

    // Load and apply any saved edits for this page
    fetch(`/api/page-edits?path=${encodeURIComponent(window.location.pathname)}`)
      .then(r => r.json())
      .then(data => {
        if (data.edits && data.edits.length > 0) {
          // Wait a tick for DOM to be ready
          requestAnimationFrame(() => {
            data.edits.forEach((edit: { editId: string; editType: string; content: string }) => {
              if (edit.editType === 'text') {
                const el = document.querySelector(`[data-edit-id="${edit.editId}"]`) as HTMLElement;
                if (el) el.innerText = edit.content;
              } else if (edit.editType === 'image') {
                const idx = parseInt(edit.editId.replace('img-', ''), 10);
                const imgs = document.querySelectorAll('img');
                if (imgs[idx]) (imgs[idx] as HTMLImageElement).src = edit.content;
              }
            });
          });
        }
      })
      .catch(() => {});
  }, []);

  const enableEditing = () => {
    // Make all text elements contentEditable
    document.querySelectorAll('h1, h2, h3, h4, p, span, a, li, td, th, label, button').forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.children.length === 0 || htmlEl.innerText.trim().length > 0) {
        htmlEl.contentEditable = 'true';
        htmlEl.style.outline = '1px dashed rgba(200, 148, 62, 0.3)';
        htmlEl.style.cursor = 'text';
        htmlEl.dataset.editId = `edit-${i}`;

        htmlEl.addEventListener('blur', () => {
          setChanges(prev => {
            const next = new Map(prev);
            next.set(`edit-${i}`, htmlEl.innerText);
            return next;
          });
        });
      }
    });

    // Make images clickable for swapping
    document.querySelectorAll('img').forEach((img, i) => {
      const htmlImg = img as HTMLImageElement;
      htmlImg.style.outline = '2px dashed rgba(200, 148, 62, 0.5)';
      htmlImg.style.cursor = 'pointer';
      htmlImg.title = 'Click to change image';
      htmlImg.addEventListener('click', (e) => {
        e.preventDefault();
        const newUrl = prompt('Enter new image URL (from GCS):', htmlImg.src);
        if (newUrl) {
          htmlImg.src = newUrl;
          setChanges(prev => {
            const next = new Map(prev);
            next.set(`img-${i}`, newUrl);
            return next;
          });
        }
      });
    });

    setEditing(true);
  };

  const disableEditing = () => {
    document.querySelectorAll('[contenteditable]').forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.contentEditable = 'false';
      htmlEl.style.outline = '';
      htmlEl.style.cursor = '';
    });
    document.querySelectorAll('img').forEach(img => {
      img.style.outline = '';
      img.style.cursor = '';
    });
    setEditing(false);
  };

  const saveChanges = async () => {
    const edits: Array<{ editId: string; editType: string; content: string }> = [];
    changes.forEach((value, key) => {
      edits.push({
        editId: key,
        editType: key.startsWith('img-') ? 'image' : 'text',
        content: value,
      });
    });

    try {
      const res = await fetch('/api/page-edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: window.location.pathname, edits }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Saved ${data.saved} edits to ${window.location.pathname}`);
        setChanges(new Map());
      } else {
        alert(`Save failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('[EditToolbar] Save error:', err);
      alert('Save failed — check console for details.');
    }
  };

  if (!editing) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      background: 'linear-gradient(180deg, #1a1816 0%, #231f1c 100%)',
      borderBottom: '2px solid #c8943e',
      padding: '0.5rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: "'Inter', system-ui, sans-serif",
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: '#c8943e', fontWeight: 800, fontSize: '0.875rem' }}>✏️ EDIT MODE</span>
        <span style={{ color: '#8a8074', fontSize: '0.75rem' }}>Click any text to edit · Click any image to swap</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={enableEditing} style={{ padding: '0.375rem 0.75rem', background: '#c8943e', color: '#1a1816', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
          Enable Edit
        </button>
        {changes.size > 0 && (
          <button onClick={saveChanges} style={{ padding: '0.375rem 0.75rem', background: '#22c55e', color: '#0f0f0f', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
            Save ({changes.size})
          </button>
        )}
        <a href="/api/draft?disable=1" style={{ padding: '0.375rem 0.75rem', background: 'transparent', color: '#8a8074', border: '1px solid #333', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>
          Exit Edit Mode
        </a>
      </div>
    </div>
  );
}
