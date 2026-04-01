// Shared "Powered by Measurably Better Things" footer.
// Rule 10 in BUSINESS_ARCHITECTURE.md: this appears on every property.

export function PoweredByFooter() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        color: 'var(--text-muted, #888)',
        borderTop: '1px solid var(--border, #222)',
      }}
    >
      Powered by{' '}
      <a
        href="https://measurablybetter.life"
        style={{ color: 'var(--accent, #c8943e)', textDecoration: 'none' }}
      >
        Measurably Better Things
      </a>
    </footer>
  );
}
