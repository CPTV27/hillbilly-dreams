// apps/web/app/measurably-better/life/chat/page.tsx
// AI Coordinator — coming in Phase 2

export default function ChatPage() {
  return (
    <>
      <section style={{ marginBottom: 20 }}>
        <h1 style={{
          fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
          fontWeight: 800,
          color: 'var(--text, #e8e0d4)',
          margin: '0 0 4px',
          letterSpacing: '-0.02em',
        }}>
          Ask Your Community
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #8a8074)', margin: 0 }}>
          AI that knows your neighborhood. Coming soon.
        </p>
      </section>

      <div style={{
        background: 'var(--surface, #1a1816)',
        border: '1px solid var(--border, #2a2520)',
        borderRadius: 12,
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '1rem',
          fontStyle: 'italic',
          color: 'var(--text-muted, #8a8074)',
          margin: '0 0 16px',
        }}>
          &ldquo;Who in my community can help me build a deck this weekend?&rdquo;
        </p>
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-disabled, #5a5550)',
          margin: 0,
        }}>
          The AI coordinator will search your community&apos;s skills, the local directory,
          and your notes to find the answer. Phase 2 build.
        </p>
      </div>
    </>
  );
}
