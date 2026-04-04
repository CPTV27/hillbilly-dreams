/**
 * Sovereign Glass — kiosk skeleton (Natchez Protocol).
 * Raw inline styles + CSS variables only (no Tailwind).
 */
export const dynamic = 'force-dynamic';

const S = {
  shell: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, 25vw) 1fr',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
      "credit credit"
      "rail trace"
    `,
    background: 'var(--kiosk-bg, #0a0a0f)',
    color: 'var(--kiosk-fg, #e2e8f0)',
    fontFamily: 'var(--font-body, system-ui, sans-serif)',
  } as const,
  credit: {
    gridArea: 'credit',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid var(--kiosk-border, #1e293b)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    background: 'var(--kiosk-credit-bg, #0f172a)',
  } as const,
  rail: {
    gridArea: 'rail',
    borderRight: '1px solid var(--kiosk-border, #1e293b)',
    padding: '1rem',
    overflow: 'auto',
    background: 'var(--kiosk-rail-bg, #020617)',
  } as const,
  trace: {
    gridArea: 'trace',
    padding: '1.25rem',
    overflow: 'auto',
    position: 'relative',
  } as const,
  label: {
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--kiosk-muted, #64748b)',
    marginBottom: '0.5rem',
  },
  placeholder: {
    border: '1px dashed var(--kiosk-border, #334155)',
    borderRadius: '8px',
    padding: '1rem',
    minHeight: '120px',
    color: 'var(--kiosk-muted, #94a3b8)',
    fontSize: '0.9rem',
  },
  neon: {
    color: 'var(--kiosk-accent, #38bdf8)',
  },
};

export default function KioskSkeletonPage() {
  return (
    <main style={S.shell}>
      <header style={S.credit}>
        <div>
          <div style={S.label}>Credit balance</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            <span style={S.neon}>—</span>
            <span style={{ marginLeft: '0.35rem', fontSize: '0.85rem', fontWeight: 500 }}>credits</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={S.label}>Tier</div>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>Connect hub + session</div>
        </div>
      </header>

      <aside style={S.rail}>
        <div style={S.label}>Provenance rail</div>
        <div style={S.placeholder}>
          Sources, lore citations, and entity links render here (left rail, ~25%).
        </div>
      </aside>

      <section style={S.trace}>
        <div style={S.label}>Cognitive trace</div>
        <div
          style={{
            ...S.placeholder,
            minHeight: 'min(65vh, 520px)',
            background: 'linear-gradient(180deg, rgba(56,189,248,0.06), transparent)',
          }}
        >
          Reasoning deltas and tool telemetry stream here when Socket.io hub is live.
        </div>
      </section>
    </main>
  );
}
