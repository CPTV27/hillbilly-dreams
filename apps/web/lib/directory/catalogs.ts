// apps/web/lib/directory/catalogs.ts
// Reads the Big Muddy Directory JSON catalogs from data/directory/
// and exposes typed accessors for the admin browse UI.
//
// Data is written by scripts/directory/ingest-*.py at build/research time.
// The server reads these JSON files at request time (no DB yet).

import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type DirectoryCategory =
  | 'venues'
  | 'musicians'
  | 'legacy-artists'
  | 'studios'
  | 'press'
  | 'labels'
  | 'festivals'
  | 'tourism'
  | 'infrastructure'
  | 'editorial-pitches';

// `source` declares the canonical lineage of each catalog:
//   - 'yaml'  → comes from a Perplexity seed YAML, template-conformant, source of truth
//   - 'md'    → derived from a narrative MD file; placeholder until the YAML seed lands
//   - 'empty' → no records yet
// When a YAML seed replaces an MD-derived catalog, flip the source here.
export type CatalogSource = 'yaml' | 'md' | 'empty';

export const DIRECTORY_CATEGORIES: {
  id: DirectoryCategory;
  label: string;
  description: string;
  icon: string;
  source: CatalogSource;
}[] = [
  {
    id: 'venues',
    label: 'Venues',
    description: 'Live music rooms across the corridor',
    icon: '♫',
    source: 'yaml',
  },
  {
    id: 'musicians',
    label: 'Musicians',
    description: 'Working artists 2024–2026',
    icon: '♪',
    source: 'yaml',
  },
  {
    id: 'festivals',
    label: 'Festivals',
    description: 'Recurring events & showcases',
    icon: '✸',
    source: 'yaml',
  },
  {
    id: 'press',
    label: 'Press',
    description: 'Publications, podcasts, creators',
    icon: '✎',
    source: 'md',
  },
  {
    id: 'studios',
    label: 'Studios',
    description: 'Active & historic recording studios',
    icon: '⎕',
    source: 'md',
  },
  {
    id: 'labels',
    label: 'Labels & Management',
    description: 'Record labels, publishers, agencies',
    icon: '◉',
    source: 'md',
  },
  {
    id: 'legacy-artists',
    label: 'Legacy Artists',
    description: 'Deceased figures & estate contacts',
    icon: '★',
    source: 'md',
  },
  {
    id: 'tourism',
    label: 'Tourism',
    description: 'Trails, museums, heritage sites',
    icon: '◈',
    source: 'md',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    description: 'PA, backline, van, merch, rehearsal',
    icon: '⚙',
    source: 'md',
  },
  {
    id: 'editorial-pitches',
    label: 'Editorial',
    description: 'Story angles, pitches, undercovered',
    icon: '✦',
    source: 'md',
  },
];

// A venue record has a fuller schema (from the structured YAML seed)
export interface VenueRecord {
  slug: string;
  name: string;
  category: 'venue';
  city: string | null;
  state: string | null;
  address: string | null;
  zip: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  website: string | null;
  email: string | null;
  status: string | null;
  year_opened: string | null;
  neighborhood: string | null;
  venue_types: string[];
  primary_genres: string[];
  secondary_genres: string[];
  age_policy: string | null;
  capacity_tier: string | null;
  capacity_standing: number | null;
  capacity_seated: number | null;
  booker_name: string | null;
  booker_email: string | null;
  booker_phone: string | null;
  typical_fee_range: string | null;
  deal_structure: string | null;
  socials: Record<string, string | null>;
  confidence: string;
  next_contact_action: string;
  gaps_count: number;
  full_record: Record<string, unknown>;
}

// Other categories share a generic record shape from the MD ingester
export interface GenericRecord {
  slug: string;
  name: string;
  category: string;
  city: string | null;
  state: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  socials: Record<string, string>;
  fields: Record<string, string | string[]>;
  notes: string[];
  sources: string[];
  source_count: number;
  gaps_count: number;
  gap_fields: string[];
}

export type DirectoryRecord = VenueRecord | GenericRecord;

// ==========================================================================
// File location
// ==========================================================================

const DATA_ROOT = path.resolve(process.cwd(), '..', '..', 'data', 'directory');

// Some repos run Next from monorepo root, some from apps/web — handle both
const FALLBACK_DATA_ROOT = path.resolve(process.cwd(), 'data', 'directory');

async function resolveDataDir(category: DirectoryCategory): Promise<string> {
  const candidates = [
    path.join(DATA_ROOT, category),
    path.join(FALLBACK_DATA_ROOT, category),
    path.resolve(process.cwd(), '..', '..', '..', 'data', 'directory', category),
  ];
  for (const c of candidates) {
    try {
      await readFile(path.join(c, `${category}-catalog.json`));
      return c;
    } catch {
      // try next
    }
  }
  throw new Error(`Directory catalog not found for ${category}. Tried: ${candidates.join(', ')}`);
}

// ==========================================================================
// Public API
// ==========================================================================

export async function getCatalog(category: DirectoryCategory): Promise<{
  count: number;
  records: DirectoryRecord[];
}> {
  const dir = await resolveDataDir(category);
  const fileName = category === 'venues'
    ? 'venues-catalog.json'
    : `${category}-catalog.json`;
  const raw = await readFile(path.join(dir, fileName), 'utf8');
  const parsed = JSON.parse(raw) as { count: number; venues?: VenueRecord[]; records?: GenericRecord[] };
  const records = (parsed.venues ?? parsed.records ?? []) as DirectoryRecord[];
  return { count: records.length, records };
}

export async function getRecord(
  category: DirectoryCategory,
  slug: string,
): Promise<DirectoryRecord | null> {
  const { records } = await getCatalog(category);
  return records.find((r) => r.slug === slug) ?? null;
}

export async function getAllCatalogCounts(): Promise<Record<DirectoryCategory, number>> {
  const entries: Partial<Record<DirectoryCategory, number>> = {};
  for (const { id } of DIRECTORY_CATEGORIES) {
    try {
      const { count } = await getCatalog(id);
      entries[id] = count;
    } catch {
      entries[id] = 0;
    }
  }
  return entries as Record<DirectoryCategory, number>;
}

// Helpers

export function isVenueRecord(r: DirectoryRecord): r is VenueRecord {
  return r.category === 'venue';
}

export function recordDisplayLocation(r: DirectoryRecord): string {
  if (r.city && r.state) return `${r.city}, ${r.state}`;
  if (r.city) return r.city;
  if (r.state) return r.state;
  return '';
}

export function recordPrimaryContact(r: DirectoryRecord): string | null {
  if (isVenueRecord(r)) {
    return r.booker_email || r.email || r.booker_phone || r.phone || r.website || null;
  }
  return r.email || r.phone || r.website || null;
}
