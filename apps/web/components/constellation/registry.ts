/**
 * Presentation registry: colors + copy for constellation entity types.
 * Uses CSS custom properties compatible with app layout tokens.
 */
export const ENTITY_REGISTRY: Record<
  string,
  { hue: string; label: string }
> = {
  venue: { hue: 'var(--constellation-venue, #38bdf8)', label: 'Venue' },
  hotel: { hue: 'var(--constellation-hotel, #fb923c)', label: 'Hotel' },
  restaurant: { hue: 'var(--constellation-restaurant, #a78bfa)', label: 'Restaurant' },
  city: { hue: 'var(--constellation-city, #94a3b8)', label: 'Corridor city' },
  route: { hue: 'var(--constellation-route, #f472b6)', label: 'Tour route' },
  directory_business: {
    hue: 'var(--constellation-directory, #22d3ee)',
    label: 'Directory listing',
  },
};

export function entityStyle(entityType: string): { color: string; kind: string } {
  const r = ENTITY_REGISTRY[entityType];
  if (r) return { color: r.hue, kind: r.label };
  return {
    color: 'var(--constellation-default, #64748b)',
    kind: entityType,
  };
}
