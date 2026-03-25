// apps/web/app/(demo)/layout.tsx
// Public wrapper for the KioskMode Pro demo experience.
// Locks the viewport — this is a kiosk, not a webpage.

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#09070a',
        color: '#e2e8f0',
        fontFamily: 'sans-serif',
        WebkitFontSmoothing: 'antialiased',
        touchAction: 'none',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {/* Demo mode badge — fixed top-center */}
      <div style={{ position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 50, pointerEvents: 'none' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 14px', borderRadius: 999,
          background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)',
          color: '#fbbf24', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', backdropFilter: 'blur(12px)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24', animation: 'pulse 2s infinite' }} />
          KioskMode Pro — Live Demo
        </span>
      </div>
      {children}
    </div>
  );
}
