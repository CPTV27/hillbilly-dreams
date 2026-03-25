// apps/web/app/economics/field-manual/[slug]/opengraph-image.tsx
// Dynamic OG image per post — shows dispatch number and title

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Outsider Economics Field Manual';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Map slugs to dispatch numbers (matches POST_ORDER in lib/posts.ts)
const POST_ORDER: Record<string, number> = {
  'ch01-the-450000-secret': 1,
  '02-the-extraction-trap': 2,
  '03-the-coordination-premium': 3,
  '04-time-is-the-only-currency-that-cant-leave-town': 4,
  '05-the-task-board': 5,
  '06-building-without-banks': 6,
  '07-federation-not-scale': 7,
  '08-the-first-90-days': 8,
  '09-what-kills-coordination-systems': 9,
  '10-the-off-switch': 10,
  '11-pod-types': 11,
  '12-shared-services-without-money': 12,
  '13-the-scaling-math': 13,
  '14-the-legal-reality': 14,
  '15-technology-sovereignty': 15,
};

// Human-friendly titles (avoids importing fs on edge runtime)
const POST_TITLES: Record<string, string> = {
  'ch01-the-450000-secret': 'The $450,000 Secret',
  '02-the-extraction-trap': 'The Extraction Trap',
  '03-the-coordination-premium': 'The Coordination Premium',
  '04-time-is-the-only-currency-that-cant-leave-town': 'Time Is the Only Currency That Can\'t Leave Town',
  '05-the-task-board': 'The Task Board',
  '06-building-without-banks': 'Building Without Banks',
  '07-federation-not-scale': 'Federation, Not Scale',
  '08-the-first-90-days': 'The First 90 Days',
  '09-what-kills-coordination-systems': 'What Kills Coordination Systems',
  '10-the-off-switch': 'The Off Switch',
  '11-pod-types': 'What Kind of Pod Are You Building?',
  '12-shared-services-without-money': 'Shared Services You Can Launch Without Money',
  '13-the-scaling-math': 'The Scaling Math',
  '14-the-legal-reality': 'The Legal Reality',
  '15-technology-sovereignty': 'Technology Sovereignty',
};

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const order = POST_ORDER[slug] ?? 0;
  const title = POST_TITLES[slug] ?? slug.replace(/-/g, ' ');

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0e0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#b54c4c',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            marginBottom: 24,
          }}
        >
          DISPATCH {String(order).padStart(2, '0')} / FIELD MANUAL
        </div>
        <div
          style={{
            fontSize: title.length > 30 ? 56 : 68,
            fontWeight: 800,
            color: '#f5f0e8',
            lineHeight: 1.15,
            marginBottom: 40,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: '#a09888',
              letterSpacing: '0.02em',
            }}
          >
            Outsider Economics
          </div>
          <div style={{ fontSize: 20, color: '#444' }}>·</div>
          <div
            style={{
              fontSize: 20,
              color: '#666',
            }}
          >
            outsidereconomics.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
