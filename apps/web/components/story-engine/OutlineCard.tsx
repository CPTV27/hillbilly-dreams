import type { CSSProperties } from 'react';

const card: CSSProperties = {
  padding: '1rem 1.15rem',
  borderRadius: '12px',
  border: '1px solid color-mix(in srgb, var(--accent) 28%, transparent)',
  background: 'color-mix(in srgb, var(--bg) 88%, #0a0a0a)',
  maxWidth: '420px',
};

const title: CSSProperties = {
  margin: '0 0 0.75rem',
  fontFamily: 'var(--font-display, Georgia, serif)',
  fontSize: '1.05rem',
  fontWeight: 600,
  color: 'var(--text, #f5f0eb)',
};

const list: CSSProperties = {
  margin: 0,
  paddingLeft: '1.1rem',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
  fontSize: '0.875rem',
  lineHeight: 1.55,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.65))',
};

export interface OutlineCardProps {
  mockBeat?: string[];
}

export function OutlineCard({
  mockBeat = [
    'Establish the room — size, light, who’s in it',
    'First song lands — band locks in',
    'Crowd turns — the loop closes',
  ],
}: OutlineCardProps) {
  return (
    <aside style={card}>
      <h3 style={title}>Outline</h3>
      <ol style={{ ...list, listStyle: 'decimal' }}>
        {mockBeat.map((line) => (
          <li key={line} style={{ marginBottom: '0.35rem' }}>
            {line}
          </li>
        ))}
      </ol>
    </aside>
  );
}

export default OutlineCard;
