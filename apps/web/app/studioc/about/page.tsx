import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Studio C — pitch',
  description:
    'Why Studio C exists: regional production infrastructure for the Hudson Valley and Mississippi corridor, tied to Big Muddy media.',
};

export default function StudioAboutPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: 'var(--space-12, 3rem) var(--space-6, 1.5rem)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs, 0.75rem)',
          fontWeight: 700,
          color: 'var(--accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        Studio C
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--text)',
          margin: '0 0 var(--space-6)',
        }}
      >
        Production that feeds the network
      </h1>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--text-muted)',
          lineHeight: 1.75,
        }}
      >
        <p>
          Studio C is the camera-and-console layer for Measurably Better’s media stack. Sessions here become magazine
          features, radio cuts, and directory-ready assets — margin recovery through reuse, not one-off deliverables.
        </p>
        <p>
          We run multi-cam live production, streaming, and post out of Natchez and Woodstock-adjacent sessions. Same
          pipeline whether you are a touring artist, a nonprofit, or a brand shooting in the Hudson Valley.
        </p>
        <p>
          Book through{' '}
          <a href="mailto:studio@thebigmuddyinn.com" style={{ color: 'var(--accent)' }}>
            studio@thebigmuddyinn.com
          </a>
          . If you need the full gear list first, see the{' '}
          <Link href="/studioc/catalog" style={{ color: 'var(--accent)' }}>
            catalog
          </Link>
          .
        </p>
      </div>
      <p style={{ marginTop: 'var(--space-10)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
        <Link href="/studioc" style={{ color: 'var(--accent)' }}>
          ← Studio C home
        </Link>
      </p>
      <p style={{ marginTop: 'var(--space-8)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        We build local. The value stays local. We grow from within.
      </p>
    </div>
  );
}
