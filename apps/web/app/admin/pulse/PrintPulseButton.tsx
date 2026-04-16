'use client';

export default function PrintPulseButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        display: 'inline-block',
        padding: '0.55rem 1rem',
        border: '1px solid color-mix(in srgb, var(--accent) 55%, transparent)',
        background: 'color-mix(in srgb, var(--surface) 65%, transparent)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        borderRadius: 6,
        cursor: 'pointer',
      }}
      className="pulse-print-btn"
    >
      Print Tear-Sheet
    </button>
  );
}
