import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let manifestCache: any[] | null = null;

function getManifest() {
  if (manifestCache) return manifestCache;
  // Try multiple paths — cwd varies between dev and production
  const paths = [
    path.join(process.cwd(), '../../docs/PHOTO_MANIFEST.json'),
    path.join(process.cwd(), 'docs/PHOTO_MANIFEST.json'),
    '/Users/chasethis/hillbilly-dreams/docs/PHOTO_MANIFEST.json',
  ];
  let raw = '';
  for (const p of paths) {
    try {
      raw = fs.readFileSync(p, 'utf8');
      break;
    } catch { continue; }
  }
  if (!raw) return [];
  const data = JSON.parse(raw);
  manifestCache = data.images || (Array.isArray(data) ? data : data.photos || []);
  return manifestCache;
}

function toPublicUrl(gcsPath: string): string {
  return gcsPath.replace('gs://bmt-media-bigmuddy/', 'https://storage.googleapis.com/bmt-media-bigmuddy/');
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.toLowerCase() || '';
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '60');
  const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0');

  if (!q) {
    return NextResponse.json({ results: [], total: 0, query: '' });
  }

  // Expand natural language queries to Vision API vocabulary
  const synonyms: Record<string, string[]> = {
    'horn': ['brass instrument', 'trumpet', 'trombone', 'saxophone', 'french horn', 'tuba', 'wind instrument'],
    'horns': ['brass instrument', 'trumpet', 'trombone', 'saxophone', 'french horn', 'tuba', 'wind instrument'],
    'sax': ['saxophone', 'wind instrument', 'woodwind'],
    'drums': ['drum', 'percussion', 'membranophone', 'cymbal', 'idiophone', 'snare'],
    'piano': ['piano', 'keyboard', 'musical keyboard'],
    'guitar': ['guitar', 'acoustic guitar', 'electric guitar', 'chordophone', 'string instrument'],
    'bass': ['bass guitar', 'double bass', 'bass'],
    'violin': ['violin', 'violin family', 'fiddle', 'string instrument', 'chordophone'],
    'singing': ['singer', 'vocalist', 'microphone', 'singing'],
    'stage': ['stage', 'performance', 'performing arts', 'concert', 'entertainment', 'music venue'],
    'river': ['river', 'water', 'waterway', 'lake', 'reflection'],
    'sunset': ['sunset', 'sunrise', 'afterglow', 'dusk', 'dawn', 'sky', 'red sky'],
    'night': ['night', 'darkness', 'midnight', 'evening'],
    'food': ['food', 'dish', 'cuisine', 'meal', 'plate', 'restaurant'],
    'bar': ['bar', 'pub', 'tavern', 'drink', 'cocktail', 'alcohol'],
    'studio': ['recording', 'studio', 'audio equipment', 'mixing console', 'sound'],
    'console': ['mixing console', 'audio equipment', 'recording', 'studio', 'electronic instrument'],
    'house': ['house', 'building', 'mansion', 'home', 'residential'],
    'church': ['church', 'chapel', 'steeple', 'place of worship'],
    'tree': ['tree', 'plant', 'oak', 'vegetation', 'branch'],
    'crowd': ['crowd', 'audience', 'people', 'spectator', 'fan'],
    'bridge': ['bridge', 'overpass', 'viaduct'],
    'portrait': ['portrait', 'face', 'person', 'selfie'],
    'street': ['street', 'road', 'alley', 'sidewalk', 'town', 'neighborhood'],
    'architecture': ['architecture', 'building', 'facade', 'column', 'balcony', 'historic'],
    'players': ['musician', 'performer', 'musical instrument', 'performing arts'],
    'balcony': ['balcony', 'iron', 'wrought iron', 'railing', 'terrace', 'french quarter'],
    'iron': ['wrought iron', 'iron', 'railing', 'balcony', 'metalwork'],
    'mansion': ['mansion', 'plantation', 'antebellum', 'column', 'portico', 'estate'],
    'jazz': ['jazz', 'brass band', 'second line', 'parade', 'brass instrument'],
    'concert': ['concert', 'performance', 'performing arts', 'entertainment', 'music venue', 'stage'],
    'trumpet': ['trumpet', 'brass instrument', 'cornet', 'flugelhorn'],
    'saxophone': ['saxophone', 'saxophonist', 'woodwind', 'reed instrument'],
    'violin': ['violin', 'violin family', 'fiddle', 'string instrument', 'chordophone'],
    'piano': ['piano', 'keyboard', 'musical keyboard', 'pianist'],
    'portrait': ['portrait', 'face', 'person', 'head', 'selfie', 'close-up'],
    'crowd': ['crowd', 'audience', 'people', 'spectator', 'fan', 'gathering'],
    'tree': ['tree', 'plant', 'oak', 'vegetation', 'branch', 'forest', 'woodland'],
    'bridge': ['bridge', 'overpass', 'viaduct', 'truss'],
    'church': ['church', 'chapel', 'steeple', 'place of worship', 'cathedral'],
  };

  let expandedTerms = q.split(/\s+/).filter(Boolean);
  for (const term of [...expandedTerms]) {
    const lower = term.toLowerCase();
    if (synonyms[lower]) {
      expandedTerms = expandedTerms.concat(synonyms[lower]);
    }
  }
  const terms = [...new Set(expandedTerms)];
  const manifest = getManifest();

  const hideJunk = req.nextUrl.searchParams.get('hideJunk') !== 'false'; // default ON

  // Labels that indicate unedited real estate / throwaway shots
  const junkPrimaryLabels = [
    'furniture', 'flooring', 'eyewear', 'academic dress', 'chin', 'hair',
    'interior design', 'wall', 'ceiling', 'floor', 'shelf', 'table',
    'room', 'bathroom', 'kitchen', 'bedroom', 'countertop', 'cabinetry',
    'plumbing fixture', 'sink', 'toilet', 'tap', 'carpet', 'tile',
    'siding', 'garage', 'driveway', 'lawn', 'property',
    'rectangle', 'parallel', 'symmetry', 'material property',
    'kitchen appliance', 'major appliance', 'gas stove', 'oven',
  ];

  const scored = manifest!.map((photo: any) => {
    let score = 0;

    // Search vision labels
    const labels = (photo.vision_api_labels || []).map((l: any) => l.description?.toLowerCase() || '');
    const objects = (photo.vision_api_objects || []).map((o: any) => o.name?.toLowerCase() || '');
    const tags = (photo.subject_tags || []).map((t: string) => t.toLowerCase());
    const mood = (photo.mood || []).map((m: string) => m.toLowerCase());
    const caption = (photo.caption || '').toLowerCase();
    const slug = (photo.slug || '').toLowerCase();
    const brand = (photo.brand || '').toLowerCase();
    const city = (photo.location?.city || '').toLowerCase();

    const allText = [...labels, ...objects, ...tags, ...mood, caption, slug, brand, city].join(' ');

    for (const term of terms) {
      // Exact match in labels (high value)
      for (const label of labels) {
        if (label.includes(term)) score += 10;
      }
      // Exact match in objects
      for (const obj of objects) {
        if (obj.includes(term)) score += 8;
      }
      // Match in subject tags
      for (const tag of tags) {
        if (tag.includes(term)) score += 6;
      }
      // Match in mood
      for (const m of mood) {
        if (m.includes(term)) score += 4;
      }
      // Match anywhere else
      if (allText.includes(term)) score += 2;
    }

    return { photo, score };
  })
  .filter(({ photo, score }) => {
    if (score <= 0) return false;
    if (!hideJunk) return true;
    // Filter out junk by primary label
    const primary = (photo.vision_api_labels?.[0]?.description || '').toLowerCase();
    return !junkPrimaryLabels.some(j => primary.includes(j));
  })
  .sort((a, b) => b.score - a.score);

  const total = scored.length;
  const results = scored.slice(offset, offset + limit).map(({ photo, score }) => ({
    slug: photo.slug,
    thumb: toPublicUrl(photo.sizes?.thumb || photo.sizes?.grid || ''),
    grid: toPublicUrl(photo.sizes?.grid || ''),
    hero: toPublicUrl(photo.sizes?.hero || ''),
    labels: (photo.vision_api_labels || []).slice(0, 8).map((l: any) => l.description),
    objects: (photo.vision_api_objects || []).slice(0, 5).map((o: any) => o.name),
    tags: photo.subject_tags || [],
    mood: photo.mood || [],
    brand: photo.brand,
    location: photo.location,
    score,
  }));

  return NextResponse.json({ results, total, query: q });
}
