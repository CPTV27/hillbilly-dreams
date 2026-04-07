export interface Node {
  id: string;
  label: string;
  metric: string;
  status: 'ACTIVE' | 'SUMMER 2026';
  photo: string;
  description: string;
  x: number;
  y: number;
}

export interface Edge {
  source: string;
  target: string;
  type: 'hierarchy' | 'flywheel';
}

export const NODES: Node[] = [
  { id: 'hdi', label: 'Hillbilly Dreams Inc', metric: '$160K revenue', status: 'ACTIVE', photo: '/images/corridor/natchez-bluff-river-view.webp', description: '3 equity partners. 14 domains. $167/month infrastructure.', x: 0, y: 0 },
  { id: 'mbt', label: 'Measurably Better Things', metric: '9 modules · 122 models', status: 'ACTIVE', photo: '/images/processed/slideshow/natchez-388.webp', description: 'The Glass Engine. Shared platform powering every brand.', x: 0, y: -150 },
  { id: 'touring', label: 'Big Muddy Touring', metric: '2:1 show multiplier', status: 'ACTIVE', photo: '/images/processed/bearsville/theater-show-04.webp', description: 'Books bands, drives them there, promotes every show.', x: -250, y: -320 },
  { id: 'magazine', label: 'Big Muddy Magazine', metric: '27 articles', status: 'ACTIVE', photo: '/images/processed/slideshow/natchez-340.webp', description: 'Stories from the Deep South. City guides, photo essays.', x: -90, y: -350 },
  { id: 'radio', label: 'Big Muddy Radio', metric: 'Streaming live', status: 'ACTIVE', photo: '/images/corridor/drummer-pearl-kit.webp', description: 'Mac Mini + Icecast. The voice of the region.', x: 90, y: -350 },
  { id: 'records', label: 'Big Muddy Records', metric: '$3K per release', status: 'ACTIVE', photo: '/images/records/anthologist-turntable.webp', description: 'Non-exclusive. Artists keep their masters.', x: 250, y: -320 },
  { id: 'dsd', label: 'Deep South Directory', metric: 'Free – $250/mo', status: 'ACTIVE', photo: '/images/corridor/natchez-downtown-sidewalk.webp', description: 'AI-managed listings for Main Street businesses.', x: -180, y: 120 },
  { id: 'inn', label: 'The Big Muddy Inn', metric: '6 rooms · Blues Room', status: 'ACTIVE', photo: '/images/corridor/bar-interior-floral.webp', description: 'Victorian mansion. Hotel. Bar. Music venue. Radio HQ.', x: 180, y: 120 },
  { id: 'bearsville', label: 'Bearsville Creative', metric: 'Woodstock, NY', status: 'SUMMER 2026', photo: '/images/processed/bearsville/hv-landscape-01.webp', description: 'Northeast node. Same platform, different region.', x: -300, y: 60 },
  { id: 'gallery', label: 'Chase Pierson Photography', metric: '17,956 photos', status: 'ACTIVE', photo: '/images/corridor/street-musician-guitar.webp', description: 'Fine art + editorial. Tracy curates. The system sells.', x: 300, y: 60 },
];

export const EDGES: Edge[] = [
  { source: 'hdi', target: 'mbt', type: 'hierarchy' },
  { source: 'mbt', target: 'touring', type: 'hierarchy' },
  { source: 'mbt', target: 'magazine', type: 'hierarchy' },
  { source: 'mbt', target: 'radio', type: 'hierarchy' },
  { source: 'mbt', target: 'records', type: 'hierarchy' },
  { source: 'mbt', target: 'dsd', type: 'hierarchy' },
  { source: 'mbt', target: 'inn', type: 'hierarchy' },
  { source: 'mbt', target: 'bearsville', type: 'hierarchy' },
  { source: 'mbt', target: 'gallery', type: 'hierarchy' },
  { source: 'touring', target: 'records', type: 'flywheel' },
  { source: 'records', target: 'radio', type: 'flywheel' },
  { source: 'radio', target: 'magazine', type: 'flywheel' },
  { source: 'magazine', target: 'dsd', type: 'flywheel' },
  { source: 'dsd', target: 'inn', type: 'flywheel' },
  { source: 'inn', target: 'touring', type: 'flywheel' },
];
