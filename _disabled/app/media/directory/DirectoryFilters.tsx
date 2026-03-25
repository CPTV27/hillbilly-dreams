'use client';

// apps/web/app/media/directory/DirectoryFilters.tsx
// Client component: city and business-type filter pills.
// Pushes URL searchParams so the server component re-renders with ISR bypass.

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const CITIES = [
  'Memphis',
  'Clarksdale',
  'Vicksburg',
  'Natchez',
  'St. Francisville',
  'Baton Rouge',
  'New Orleans',
  'Lafayette',
  'Alexandria',
  'Monroe',
  'Ruston',
  'Natchitoches',
  'Shreveport',
  'El Dorado',
  'Little Rock',
  'Fayetteville',
  'Bentonville',
  'Branson',
];

const TYPES = [
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'venue', label: 'Venues' },
  { value: 'hotel', label: 'Hotels' },
  { value: 'shop', label: 'Shops' },
  { value: 'tour', label: 'Tours' },
  { value: 'service', label: 'Services' },
];

export default function DirectoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCity = searchParams.get('city') ?? '';
  const activeType = searchParams.get('type') ?? '';

  const push = useCallback(
    (key: 'city' | 'type', value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/media/directory${params.size ? '?' + params.toString() : ''}`);
    },
    [router, searchParams],
  );

  const clearAll = useCallback(() => {
    router.push('/media/directory');
  }, [router]);

  const hasFilters = activeCity || activeType;

  return (
    <div className="dir-filters">
      {/* Category row */}
      <div className="dir-filters__row">
        <span className="dir-filters__label" aria-label="Filter by business type">Type</span>
        <div className="dir-filters__pills" role="group" aria-label="Business type filters">
          {TYPES.map((t) => (
            <button
              key={t.value}
              className={`dir-pill${activeType === t.value ? ' dir-pill--active' : ''}`}
              onClick={() => push('type', t.value)}
              aria-pressed={activeType === t.value}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* City row */}
      <div className="dir-filters__row">
        <span className="dir-filters__label" aria-label="Filter by city">City</span>
        <div className="dir-filters__pills dir-filters__pills--cities" role="group" aria-label="City filters">
          {CITIES.map((city) => (
            <button
              key={city}
              className={`dir-pill${activeCity === city ? ' dir-pill--active' : ''}`}
              onClick={() => push('city', city)}
              aria-pressed={activeCity === city}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <div className="dir-filters__clear-row">
          <button className="dir-filters__clear" onClick={clearAll}>
            Clear filters
          </button>
          {activeCity && (
            <span className="dir-filters__active-tag">
              {activeCity}
              <button
                className="dir-filters__active-tag-x"
                onClick={() => push('city', activeCity)}
                aria-label={`Remove city filter: ${activeCity}`}
              >
                ×
              </button>
            </span>
          )}
          {activeType && (
            <span className="dir-filters__active-tag">
              {TYPES.find((t) => t.value === activeType)?.label ?? activeType}
              <button
                className="dir-filters__active-tag-x"
                onClick={() => push('type', activeType)}
                aria-label={`Remove type filter: ${activeType}`}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      <style>{`
        .dir-filters {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          padding: var(--space-6) 0;
          border-bottom: 1px solid var(--border);
        }
        .dir-filters__row {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
        }
        .dir-filters__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding-top: var(--space-2);
          white-space: nowrap;
          min-width: 3.5rem;
          flex-shrink: 0;
        }
        .dir-filters__pills {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .dir-filters__pills--cities {
          gap: var(--space-2);
        }
        .dir-pill {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: var(--space-1) var(--space-3);
          cursor: pointer;
          transition:
            color var(--duration-fast) var(--ease-default),
            border-color var(--duration-fast) var(--ease-default),
            background var(--duration-fast) var(--ease-default);
          line-height: 1.6;
        }
        .dir-pill:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
        .dir-pill--active {
          color: var(--bg);
          background: var(--accent);
          border-color: var(--accent);
        }
        .dir-pill--active:hover {
          color: var(--bg);
        }
        .dir-filters__clear-row {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
          padding-top: var(--space-2);
        }
        .dir-filters__clear {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          background: transparent;
          border: none;
          cursor: pointer;
          letter-spacing: var(--tracking-wide);
          text-decoration: underline;
          text-underline-offset: 3px;
          padding: 0;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .dir-filters__clear:hover {
          color: var(--text-muted);
        }
        .dir-filters__active-tag {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-subtle);
          border: 1px solid rgba(200, 148, 62, 0.3);
          border-radius: var(--radius-full);
          padding: var(--space-1) var(--space-3);
          line-height: 1.6;
        }
        .dir-filters__active-tag-x {
          font-size: var(--text-base);
          line-height: 1;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--accent);
          padding: 0;
          opacity: 0.7;
          transition: opacity var(--duration-fast) var(--ease-default);
        }
        .dir-filters__active-tag-x:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
