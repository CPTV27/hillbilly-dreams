import type { CSSProperties } from 'react';

const wrap: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: '8px',
  maxWidth: '520px',
};

const thumb: CSSProperties = {
  position: 'relative',
  aspectRatio: '16 / 10',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '2px solid transparent',
};

const caption: CSSProperties = {
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
  fontSize: '0.65rem',
  color: 'var(--text-muted, rgba(240, 235, 224, 0.55))',
  marginTop: '0.35rem',
  lineHeight: 1.35,
};

export interface ClipPickerItem {
  id: string;
  label: string;
  color: string;
}

export interface ClipPickerProps {
  mockClips?: ClipPickerItem[];
}

const DEFAULT_CLIPS: ClipPickerItem[] = [
  { id: 'a', label: 'Crowd room tone · 12s', color: 'linear-gradient(135deg, #1e293b, #334155)' },
  { id: 'b', label: 'Guitar line · 8s', color: 'linear-gradient(135deg, #422006, #9a3412)' },
  { id: 'c', label: 'Stage walk · 15s', color: 'linear-gradient(135deg, #134e4a, #0f766e)' },
];

export function ClipPicker({ mockClips = DEFAULT_CLIPS }: ClipPickerProps) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-body, system-ui, sans-serif)',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent, #38bdf8)',
          margin: '0 0 0.75rem',
        }}
      >
        Pick a clip (mock)
      </p>
      <div style={wrap}>
        {mockClips.map((c) => (
          <button
            key={c.id}
            type="button"
            style={{
              display: 'block',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'default',
              textAlign: 'left' as const,
            }}
          >
            <div style={{ ...thumb, background: c.color }} aria-hidden />
            <div style={caption}>{c.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ClipPicker;
