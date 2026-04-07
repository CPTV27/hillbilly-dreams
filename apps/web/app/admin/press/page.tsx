import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Press mocks',
  robots: { index: false, follow: false },
};

const PRESS_PAGES: { href: string; label: string }[] = [
  { href: '/press/index.html', label: 'Index — Morning News' },
  { href: '/press/economist-digital-utility.html', label: 'The Economist' },
  { href: '/press/american-banker-regional-ownership.html', label: 'American Banker' },
  { href: '/press/bloomberg-sovereign-pi-device.html', label: 'Bloomberg' },
  { href: '/press/fast-company-anti-silicon-valley.html', label: 'Fast Company' },
  { href: '/press/the-atlantic-town-gets-ai.html', label: 'The Atlantic' },
  { href: '/press/nyt-natchez-media-revolution.html', label: 'The New York Times' },
  { href: '/press/nyt-amy-allen-profile.html', label: 'The New York Times — Amy Allen profile' },
  { href: '/press/wsj-small-town-ai-platform.html', label: 'The Wall Street Journal' },
  { href: '/press/wired-glass-engine-ai.html', label: 'WIRED' },
  { href: '/press/vanity-fair-chase-pierson-profile.html', label: 'Vanity Fair' },
  { href: '/press/rolling-stone-big-muddy-touring.html', label: 'Rolling Stone' },
  { href: '/press/bon-appetit-big-muddy-inn.html', label: 'Bon Appétit' },
  { href: '/press/podcast-morning-briefing.html', label: 'Podcast — Morning Briefing' },
];

export default async function AdminPressPage() {
  const session = await auth();
  if (!session?.user?.email || !isAllowedUser(session.user.email)) {
    redirect(`/admin/login?callbackUrl=${encodeURIComponent('/admin/press')}`);
  }

  return (
    <div style={{ maxWidth: 720, padding: '2rem 1.5rem' }}>
      <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>
        Press mocks
      </h1>
      <p style={{ color: 'var(--admin-text-muted, #8a8074)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
        Internal-only article layouts. Same access rules as HQ. Raw HTML opens in a new tab; URLs require sign-in.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {PRESS_PAGES.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                borderRadius: 8,
                border: '1px solid var(--admin-border, #2a2822)',
                background: 'var(--admin-surface-raised, #151512)',
                color: 'var(--admin-text, #e8e0d4)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              {p.label}
              <span style={{ float: 'right', opacity: 0.45, fontSize: '0.75rem' }}>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
