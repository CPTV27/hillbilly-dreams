'use client';

// apps/web/app/admin/create/page.tsx
// Content Creation Wizard — landing page. Pick a content type → routes to
// /admin/create/[contentType] for the 4-step flow.

import Link from 'next/link';

const CONTENT_TYPES = [
  {
    id: 'magazine-article',
    title: 'Magazine article',
    blurb: 'Long-form editorial for Big Muddy Magazine. Targets Inn guests.',
    brand: 'magazine',
    icon: '📰',
  },
  {
    id: 'social-post',
    title: 'Social post',
    blurb: 'IG / TikTok / X / Facebook. Pick brand voice on the next screen.',
    brand: 'magazine',
    icon: '◢',
  },
  {
    id: 'listing-description',
    title: 'Listing description',
    blurb: 'Real estate listing copy. Tuthill voice. Fair Housing compliant.',
    brand: 'tuthill',
    icon: '◷',
  },
  {
    id: 'episode-description',
    title: 'Podcast episode description',
    blurb: 'Big Muddy Radio. Music-first voice — distinct from Magazine.',
    brand: 'radio',
    icon: '◉',
  },
  {
    id: 'pitch-deck-section',
    title: 'Pitch deck section',
    blurb: 'B2B pitch one-pager section. Per-audience voice.',
    brand: 'magazine',
    icon: '▣',
  },
];

export default function CreateLandingPage() {
  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          Create
        </h1>
        <p style={{ color: 'var(--text-muted, #888)', margin: 0, fontSize: '14px' }}>
          What are you making today?
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px',
        }}
      >
        {CONTENT_TYPES.map((c) => (
          <Link
            key={c.id}
            href={`/admin/create/${c.id}?brand=${c.brand}`}
            style={{
              display: 'block',
              padding: '20px 22px',
              background: 'var(--surface, #191715)',
              border: '1px solid var(--border, #2a2723)',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'var(--text, #d8cfbe)',
              transition: 'border-color 0.15s',
            }}
          >
            <div
              style={{
                fontSize: '22px',
                marginBottom: '12px',
                color: 'var(--accent, #c8a676)',
              }}
            >
              {c.icon}
            </div>
            <h3 style={{ fontSize: '17px', margin: '0 0 6px', fontFamily: 'var(--font-display)' }}>
              {c.title}
            </h3>
            <p style={{ color: 'var(--text-muted, #a89e8d)', fontSize: '13px', margin: 0, lineHeight: 1.4 }}>
              {c.blurb}
            </p>
          </Link>
        ))}
      </div>

      <p
        style={{
          marginTop: '32px',
          color: 'var(--text-muted, #6b6254)',
          fontSize: '12px',
          fontStyle: 'italic',
        }}
      >
        The wizard pulls relevant entities from the corridor directory and photos
        from the Immich library, then drafts in the right brand voice. Drafts
        save to Sanity — you promote to published in Studio.
      </p>
    </div>
  );
}
