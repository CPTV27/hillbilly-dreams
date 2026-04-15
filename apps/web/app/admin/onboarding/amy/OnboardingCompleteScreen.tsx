'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import type { PhotoIndexEntry } from '@/lib/photo-index';

export interface OnboardingCompleteScreenProps {
  completedAt: Date;
  userName?: string;
  onReopen: () => void;
  /** Which onboarding flow — adjusts the share note to Chase */
  variant?: 'amy' | 'tracy';
}

function formatRelativeCompleted(completedAt: Date): string {
  const ms = Date.now() - completedAt.getTime();
  const sec = Math.floor(ms / 1000);
  if (sec < 45) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return min <= 1 ? '1 minute ago' : `${min} minutes ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return hr === 1 ? '1 hour ago' : `${hr} hours ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return 'yesterday';
  if (day < 7) return `${day} days ago`;
  const week = Math.floor(day / 7);
  if (week < 5) return week === 1 ? '1 week ago' : `${week} weeks ago`;
  return completedAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const shell: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '32px 20px 28px',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

const inner: CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  textAlign: 'center',
};

const headline: CSSProperties = {
  margin: '0 0 12px',
  fontSize: 'clamp(1.5rem, 4vw, 1.85rem)',
  fontWeight: 700,
  lineHeight: 1.25,
  color: 'var(--accent, #f97316)',
  fontFamily: 'var(--font-display, var(--font-body, Georgia, serif))',
};

const subhead: CSSProperties = {
  margin: '0 0 28px',
  fontSize: '0.9375rem',
  lineHeight: 1.55,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.65))',
};

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 12,
  marginBottom: 24,
  textAlign: 'left',
};

const cardBase: CSSProperties = {
  display: 'block',
  padding: 16,
  borderRadius: 10,
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.2))',
  background: 'var(--card-bg-color, rgba(30, 27, 24, 0.92))',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
  boxSizing: 'border-box',
};

const cardTitle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '0.875rem',
  fontWeight: 700,
  color: 'var(--text, rgba(240, 235, 224, 0.95))',
};

const cardDesc: CSSProperties = {
  margin: 0,
  fontSize: '0.75rem',
  lineHeight: 1.5,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.55))',
};

const secondaryBtn: CSSProperties = {
  display: 'inline-block',
  marginBottom: 20,
  padding: '10px 20px',
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.7))',
  background: 'var(--surface-2, rgba(255, 255, 255, 0.05))',
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.2))',
  borderRadius: 8,
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const shareBtn: CSSProperties = {
  display: 'inline-block',
  marginBottom: 16,
  padding: '12px 22px',
  fontSize: '0.8125rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color: 'var(--bg, #0c0b09)',
  background: 'var(--accent, #f97316)',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontFamily: 'inherit',
  textDecoration: 'none',
};

const footerNote: CSSProperties = {
  margin: 0,
  fontSize: '0.75rem',
  lineHeight: 1.5,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.4))',
};

const LINKS: readonly {
  title: string;
  desc: string;
  href: string;
  external?: boolean;
}[] = [
  {
    title: 'Go to your dashboard',
    desc: 'Your daily snapshot and shortcuts across Big Muddy Command.',
    href: '/admin',
  },
  {
    title: 'Open Sanity Studio',
    desc: 'Articles, media, and content where your drafts live.',
    href: '/studio',
  },
  {
    title: 'Connect with Delta Dawn anytime',
    desc: 'Ask operations questions or get help with the next task.',
    href: '/dawn',
  },
  {
    title: 'Check your Asana tasks',
    desc: 'See what is assigned to you and what is due next.',
    href: 'https://app.asana.com',
    external: true,
  },
];

export function OnboardingCompleteScreen({
  completedAt,
  userName,
  onReopen,
  variant = 'amy',
}: OnboardingCompleteScreenProps) {
  const rel = formatRelativeCompleted(completedAt);
  const title =
    userName != null && userName.trim() !== ''
      ? `You're all set, ${userName.trim()}.`
      : "You're all set.";

  const [heroPhoto, setHeroPhoto] = useState<PhotoIndexEntry | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/photo-library', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { photos?: PhotoIndexEntry[] } | null) => {
        if (!json?.photos?.length || cancelled) return;
        const sorted = [...json.photos].sort((a, b) => {
          const ta = a.ingestedAt ? Date.parse(a.ingestedAt) : 0;
          const tb = b.ingestedAt ? Date.parse(b.ingestedAt) : 0;
          return tb - ta;
        });
        setHeroPhoto(sorted[0] ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const shareSubject = 'I finished onboarding! 🎉';
  const trimmedName = userName?.trim() || (variant === 'tracy' ? 'Tracy' : 'Amy');
  const completionDateStr = completedAt.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const shareBody =
    `Hi Chase —\n\n` +
    `${trimmedName} here. I just finished the onboarding checklist on ${completionDateStr}. ` +
    `Wanted to let you know I'm all set.\n\n` +
    `— ${trimmedName}\n`;

  const mailto = `mailto:me@chasepierson.tv?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareBody)}`;

  return (
    <div style={shell}>
      <div style={inner}>
        {heroPhoto ? (
          <div
            style={{
              marginBottom: 24,
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.25))',
              maxHeight: 'min(42vh, 320px)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroPhoto.urls.grid}
              alt={heroPhoto.caption || 'Big Muddy library photograph'}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 'min(42vh, 320px)',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ) : null}

        <h1 style={headline}>{title}</h1>
        <p style={subhead}>All 9 steps complete — {rel}.</p>

        <a href={mailto} style={{ ...shareBtn, marginBottom: 20 }}>
          Share this with Chase
        </a>

        <div className="amy-complete-grid" style={grid}>
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="amy-complete-card"
              style={cardBase}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <p style={cardTitle}>{item.title}</p>
              <p style={cardDesc}>{item.desc}</p>
            </a>
          ))}
        </div>

        <button type="button" style={secondaryBtn} onClick={onReopen}>
          Review the onboarding again
        </button>

        <p style={footerNote}>
          You can come back to this page at any time. Delta Dawn remembers where you left off.
        </p>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .amy-complete-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .amy-complete-card:hover {
          transform: translateY(-2px);
          border-color: var(--card-border-color, rgba(200, 148, 62, 0.35));
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default OnboardingCompleteScreen;
