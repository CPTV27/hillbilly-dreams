// apps/web/app/gallery/demo-data.ts
// Demo data for Venture Gallery marketplace.
// Replace with Prisma queries once schema is migrated.

export interface DemoArtist {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  medium: string;
  bio: string;
  instagram?: string;
  website?: string;
  featured: boolean;
  workCount: number;
  profileImage?: string; // placeholder — initials used if absent
}

export interface DemoArtwork {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  artistName: string;
  artistSlug: string;
  medium: string;
  dimensions: string;
  year: number;
  price: number; // cents
  salePrice?: number; // cents
  category: string;
  edition: string;
  description: string;
  images: string[]; // placeholder color values used client-side
  tags: string[];
  available: boolean;
  featured: boolean;
}

export const DEMO_ARTISTS: DemoArtist[] = [
  {
    id: 'a0',
    name: 'Andrea Brooks',
    slug: 'andrea-brooks',
    city: 'Fayetteville',
    state: 'AR',
    medium: 'Interior Design & Mixed Media',
    bio: 'Andrea Brooks is the designer behind the Big Muddy Inn and the creative force of A Bold Collab. Based in Northwest Arkansas by way of El Dorado, she works at the intersection of interior design, fine art, and editorial storytelling. Her aesthetic — coined "aristo-boho" — marries aristocratic structure with bohemian spirit, collected objects, and fearless color. She designed every room at the Inn and is the founding artist on BCA. Her first book releases April 2026.',
    instagram: 'aboldcollab',
    website: 'https://aboldcollab.com',
    featured: true,
    workCount: 15,
  },
  {
    id: 'a1',
    name: 'Delphine Mouton',
    slug: 'delphine-mouton',
    city: 'Natchez',
    state: 'MS',
    medium: 'Painting',
    bio: 'Delphine Mouton paints the light that falls on things just before dark — the hour when the Mississippi goes copper and every porch in Natchez holds a story. Raised in a shotgun house two blocks from the bluff, she learned color from her grandmother\'s quilt patterns and composition from Sunday drives down the Trace. Her oils range from intimate interiors to sweeping river vistas, always anchored in the specific weight of Southern air.',
    instagram: 'delphinemouton_art',
    website: 'https://delphinemouton.art',
    featured: true,
    workCount: 12,
  },
  {
    id: 'a2',
    name: 'Marcus Tureaud',
    slug: 'marcus-tureaud',
    city: 'Clarksdale',
    state: 'MS',
    medium: 'Photography',
    bio: 'Marcus Tureaud has spent fifteen years photographing the Delta — the juke joints, the crossroads, the faces that carry a century of music in their creases. He shoots on medium format film, processing his own negatives in a darkroom built from a converted smokehouse. His prints are archival silver gelatin, made in editions of twenty-five or fewer. He does not do digital.',
    instagram: 'marcustureaud',
    featured: true,
    workCount: 8,
  },
  {
    id: 'a3',
    name: 'Odessa Chalk',
    slug: 'odessa-chalk',
    city: 'New Orleans',
    state: 'LA',
    medium: 'Mixed Media',
    bio: 'Odessa Chalk builds worlds from what gets thrown away. Salvaged tin roofing, rice sack linen, cypress planks pulled from demolished houses on St. Claude — she assembles them into layered compositions that feel like archaeology. Every piece contains something that once sheltered someone. She shows in New Orleans, New York, and wherever people will have her.',
    instagram: 'odessa.chalk',
    website: 'https://odessachalk.com',
    featured: true,
    workCount: 6,
  },
  {
    id: 'a4',
    name: 'Ray Fontenot',
    slug: 'ray-fontenot',
    city: 'Vicksburg',
    state: 'MS',
    medium: 'Ceramics',
    bio: 'Ray Fontenot throws functional and sculptural work from a river clay body he digs himself from a bank outside Vicksburg. His glazes are wood-fired in an anagama he built over three years with his brother. The results are unpredictable — ash deposits, flame flashing, surfaces that look like they were made by the earth rather than a person, which is more or less true.',
    featured: false,
    workCount: 14,
  },
  {
    id: 'a6',
    name: 'Chase Pierson',
    slug: 'chase-pierson',
    city: 'Natchez',
    state: 'MS',
    medium: 'Photography',
    bio: 'Chase Pierson is a photographer, technologist, and the founder of the Big Muddy. Based in Natchez, Mississippi, he shoots the region — the river, the music, the towns, the people who stay. His work ranges from documentary blues photography to architectural interiors, street portraiture, and fine art landscapes along the Mississippi. Available as archival prints, licensed stock, or commissioned shoots.',
    instagram: 'chasepierson',
    website: 'https://bigmuddytouring.com',
    featured: true,
    workCount: 12,
    profileImage: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/musician-performing.webp',
  },
  {
    id: 'a5',
    name: 'June Breckinridge',
    slug: 'june-breckinridge',
    city: 'Memphis',
    state: 'TN',
    medium: 'Textile',
    bio: 'June Breckinridge quilts with the tradition and breaks it. Her work is rooted in the African American quilt tradition of the rural South — improvised blocks, bold asymmetry, color conversations that don\'t ask permission. She teaches workshops in Whitehaven and sells work through galleries in Memphis, Atlanta, and online. She is also a licensed electrician.',
    instagram: 'junebreckinridge',
    featured: false,
    workCount: 9,
  },
];

export const DEMO_ARTWORKS: DemoArtwork[] = [
  {
    id: 'w0a',
    slug: 'blues-room-commission',
    title: 'The Blues Room — Original Commission',
    artistId: 'a0',
    artistName: 'Andrea Brooks',
    artistSlug: 'andrea-brooks',
    medium: 'Interior design commission',
    dimensions: 'Full room installation',
    year: 2024,
    price: 0,
    category: 'commission',
    edition: 'Site-specific installation',
    description: 'The Blues Room at Big Muddy Inn — a 50-seat performance venue designed by Andrea Brooks as a living piece of art. Every surface, fixture, and sight line was designed to serve the music. The room is both a venue and a portfolio piece: proof that great design can make sound feel different.',
    images: ['/images/gallery/blues-room-commission.png'],
    tags: ['big-muddy-inn', 'interior-design', 'venue', 'commission', 'blues-room'],
    available: false,
    featured: true,
  },
  {
    id: 'w0b',
    slug: 'aristo-boho-collection-i',
    title: 'Aristo-Boho Collection I — Parlor Series',
    artistId: 'a0',
    artistName: 'Andrea Brooks',
    artistSlug: 'andrea-brooks',
    medium: 'Curated art & object collection',
    dimensions: 'Variable',
    year: 2025,
    price: 450000, // $4,500
    category: 'collection',
    edition: 'Limited series',
    description: 'A curated collection of original objects, textiles, and artwork assembled by Andrea Brooks for the Big Muddy Inn parlor. Aristocratic structure meets bohemian spirit — collected pieces from three continents, anchored in the Deep South. Available as a curated package or individual pieces.',
    images: ['/images/gallery/aristo-boho-parlor.png'],
    tags: ['aristo-boho', 'collection', 'curated', 'big-muddy-inn', 'parlor'],
    available: true,
    featured: true,
  },
  {
    id: 'w1',
    slug: 'bluff-at-last-light',
    title: 'Bluff at Last Light',
    artistId: 'a1',
    artistName: 'Delphine Mouton',
    artistSlug: 'delphine-mouton',
    medium: 'Oil on linen',
    dimensions: '30 × 40 inches',
    year: 2025,
    price: 240000, // $2,400
    category: 'original',
    edition: 'Original',
    description: 'The Natchez bluff at the moment the sun drops behind the Louisiana tree line — that fifteen-minute window when the sky goes green-gold and the river below turns to hammered bronze. Painted on location over three evenings in October.',
    images: ['#3d2b1a', '#5c3d20', '#8b5e35'],
    tags: ['natchez', 'landscape', 'river', 'mississippi', 'sunset'],
    available: true,
    featured: true,
  },
  {
    id: 'w2',
    slug: 'ground-zero-midnight',
    title: 'Ground Zero Midnight',
    artistId: 'a2',
    artistName: 'Marcus Tureaud',
    artistSlug: 'marcus-tureaud',
    medium: 'Silver gelatin print',
    dimensions: '16 × 20 inches',
    year: 2024,
    price: 75000, // $750
    category: 'print',
    edition: '8/25',
    description: 'Taken on a Tuesday in January when only six people were in Ground Zero Blues Club and the band played like it was a full house anyway. Mamiya RZ67. Kodak Tri-X pushed to 1600.',
    images: ['#1a1a1a', '#2d2d2d', '#0a0a0a'],
    tags: ['clarksdale', 'blues', 'music', 'portrait', 'documentary'],
    available: true,
    featured: true,
  },
  {
    id: 'w3',
    slug: 'salvage-delta-i',
    title: 'Salvage Delta I',
    artistId: 'a3',
    artistName: 'Odessa Chalk',
    artistSlug: 'odessa-chalk',
    medium: 'Mixed media on panel',
    dimensions: '24 × 36 inches',
    year: 2025,
    price: 185000, // $1,850
    category: 'original',
    edition: 'Original',
    description: 'Tin roofing from a collapsed shotgun house in the Tremé, layered with rice sack linen and cypress veneer. Pigment, encaustic, and the memory of someone\'s living room ceiling.',
    images: ['#4a3728', '#6b4c35', '#2e2018'],
    tags: ['new-orleans', 'mixed-media', 'salvage', 'architectural'],
    available: true,
    featured: true,
  },
  {
    id: 'w4',
    slug: 'porch-light-clarksdale',
    title: 'Porch Light, Clarksdale',
    artistId: 'a1',
    artistName: 'Delphine Mouton',
    artistSlug: 'delphine-mouton',
    medium: 'Oil on canvas',
    dimensions: '18 × 24 inches',
    year: 2024,
    price: 145000, // $1,450
    salePrice: 120000, // $1,200
    category: 'original',
    edition: 'Original',
    description: 'A single porch light on Sunflower Avenue at 2am. The light source is almost secondary — what the painting is about is what\'s outside the circle of it, the density of the dark that makes it matter.',
    images: ['#2a1f14', '#1c1208', '#3d2c1c'],
    tags: ['clarksdale', 'nocturne', 'architecture', 'delta'],
    available: true,
    featured: false,
  },
  {
    id: 'w5',
    slug: 'anagama-vessel-no-14',
    title: 'Anagama Vessel No. 14',
    artistId: 'a4',
    artistName: 'Ray Fontenot',
    artistSlug: 'ray-fontenot',
    medium: 'Wood-fired stoneware',
    dimensions: '11 × 8 inches',
    year: 2025,
    price: 38000, // $380
    category: 'sculpture',
    edition: 'Original',
    description: 'River clay body from outside Vicksburg, fired in a four-day anagama firing in February 2025. Natural ash glaze on one face where the flame path traveled. The form is a simple cylinder that became something else in the fire.',
    images: ['#5a4a3a', '#7a6555', '#3d3025'],
    tags: ['ceramics', 'functional', 'vicksburg', 'stoneware'],
    available: true,
    featured: false,
  },
  {
    id: 'w6',
    slug: 'crossroads-no-7',
    title: 'Crossroads No. 7',
    artistId: 'a2',
    artistName: 'Marcus Tureaud',
    artistSlug: 'marcus-tureaud',
    medium: 'Silver gelatin print',
    dimensions: '11 × 14 inches',
    year: 2023,
    price: 45000, // $450
    category: 'print',
    edition: '12/25',
    description: 'The actual crossroads at Highways 61 and 49. Shot at 4am in August, no other light source except the signal. Robert Johnson supposedly sold his soul here. It looks exactly like you\'d expect.',
    images: ['#0d0d0d', '#1a1a1a', '#262626'],
    tags: ['clarksdale', 'landscape', 'mythology', 'delta', 'blues'],
    available: true,
    featured: false,
  },
  {
    id: 'w7',
    slug: 'river-quilt-no-3',
    title: 'River Quilt No. 3',
    artistId: 'a5',
    artistName: 'June Breckinridge',
    artistSlug: 'june-breckinridge',
    medium: 'Cotton and silk quilt',
    dimensions: '72 × 90 inches',
    year: 2025,
    price: 95000, // $950
    category: 'original',
    edition: 'Original',
    description: 'Full-size bed quilt in a twelve-block improvised pattern. The color palette came from a photograph of the Mississippi at Caruthersville in flood — brown-gray-green with a red mud line at the edge. Cotton batting. Hand-quilted throughout.',
    images: ['#4a5c6a', '#6b7d8a', '#3d4e5a'],
    tags: ['textile', 'quilt', 'memphis', 'functional', 'traditional'],
    available: true,
    featured: false,
  },
  {
    id: 'w8',
    slug: 'bourbon-street-3am',
    title: 'Bourbon Street, 3am',
    artistId: 'a3',
    artistName: 'Odessa Chalk',
    artistSlug: 'odessa-chalk',
    medium: 'Mixed media on canvas',
    dimensions: '36 × 48 inches',
    year: 2024,
    price: 220000, // $2,200
    category: 'original',
    edition: 'Original',
    description: 'Neon bar signs reproduced in wax, cast against a field of salvaged wrought iron flakes pulled from a demolished French Quarter balcony. The iron is what makes the surface. The neon is what makes you look.',
    images: ['#1a0f24', '#2d1a3d', '#3d2855'],
    tags: ['new-orleans', 'mixed-media', 'nocturne', 'neon'],
    available: false,
    featured: false,
  },
];

// Chase Pierson Photography works
const CHASE_WORKS: DemoArtwork[] = [
  {
    id: 'cp1', slug: 'blues-room-harmonica', title: 'Blues Room — Harmonica',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '16 × 24 inches', year: 2026,
    price: 25000, category: 'print', edition: 'Open edition',
    description: 'Live blues performance in the Blues Room at the Big Muddy Inn, Natchez. The harmonica player lit by a single stage spot. Shot on Sony A7ii.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp'],
    tags: ['blues', 'music', 'live', 'natchez', 'big-muddy-inn'], available: true, featured: true,
  },
  {
    id: 'cp2', slug: 'blues-room-live-show', title: 'Friday Night at the Big Muddy',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '20 × 30 inches', year: 2026,
    price: 35000, category: 'print', edition: 'Limited edition of 50',
    description: 'The full room — band, audience, bar, the energy of a Friday night in the Blues Room. This is what it looks like when the music is right and the room is full.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp'],
    tags: ['blues', 'music', 'venue', 'natchez', 'documentary'], available: true, featured: true,
  },
  {
    id: 'cp3', slug: 'mississippi-river-golden-hour', title: 'Mississippi River — Golden Hour',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '24 × 36 inches', year: 2026,
    price: 45000, category: 'print', edition: 'Limited edition of 25',
    description: 'The Mississippi at sunset from the Natchez bluff. The light turns the water to copper and the sky to bruise. This is the view that made us stay.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp'],
    tags: ['landscape', 'river', 'sunset', 'natchez', 'fine-art'], available: true, featured: true,
  },
  {
    id: 'cp4', slug: 'inn-foyer', title: 'The Foyer — Big Muddy Inn',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '16 × 20 inches', year: 2026,
    price: 20000, category: 'print', edition: 'Open edition',
    description: 'The entrance to the Big Muddy Inn. Andrea Brooks designed every detail — this photo tries to capture what it feels like to walk in for the first time.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-foyer.webp'],
    tags: ['architecture', 'interior', 'big-muddy-inn', 'natchez'], available: true, featured: false,
  },
  {
    id: 'cp5', slug: 'juke-joint-interior', title: 'Juke Joint — Interior',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '16 × 24 inches', year: 2025,
    price: 30000, category: 'print', edition: 'Limited edition of 50',
    description: 'The inside of a Delta juke joint. Christmas lights, wood paneling, a bar that\'s seen fifty years of Saturday nights. The kind of place that doesn\'t have a website.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp'],
    tags: ['blues', 'documentary', 'interior', 'delta', 'juke-joint'], available: true, featured: true,
  },
  {
    id: 'cp6', slug: 'main-street-natchez', title: 'Main Street, Natchez',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '20 × 30 inches', year: 2026,
    price: 30000, category: 'print', edition: 'Open edition',
    description: 'Main Street on a weekday afternoon. The light, the storefronts, the pace. This is the town we\'re building the directory for.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-main-street.webp'],
    tags: ['street', 'natchez', 'architecture', 'documentary'], available: true, featured: false,
  },
  {
    id: 'cp7', slug: 'inn-at-dusk', title: 'The Inn at Dusk',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '24 × 36 inches', year: 2026,
    price: 40000, category: 'print', edition: 'Limited edition of 25',
    description: 'The Big Muddy Inn at the blue hour. Warm light from the windows, the street going quiet. 411 North Commerce at its best.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-inn-dusk.webp'],
    tags: ['architecture', 'exterior', 'big-muddy-inn', 'natchez', 'twilight'], available: true, featured: true,
  },
  {
    id: 'cp8', slug: 'record-player', title: 'Vinyl — Still Life',
    artistId: 'a6', artistName: 'Chase Pierson', artistSlug: 'chase-pierson',
    medium: 'Archival pigment print', dimensions: '11 × 14 inches', year: 2025,
    price: 15000, category: 'print', edition: 'Open edition',
    description: 'A turntable and a stack of records in the Blues Room. The analog life.',
    images: ['https://storage.googleapis.com/bmt-media-bigmuddy/real/record-player.webp'],
    tags: ['still-life', 'music', 'vinyl', 'analog'], available: true, featured: false,
  },
];

// Push Chase's works into the main array
DEMO_ARTWORKS.push(...CHASE_WORKS);

// Demo shoots
export const DEMO_SHOOTS: DemoShoot[] = [
  {
    slug: 'save-the-hall-2026',
    title: 'Save the Hall Ball — March 2026',
    date: '2026-03-22',
    location: 'Natchez, Mississippi',
    artistSlug: 'chase-pierson',
    isPublic: false,
    photos: [], // Photos will be added once Chase edits them
  },
];

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export interface DemoShoot {
  slug: string;
  title: string;
  date: string;
  location: string;
  artistSlug: string;
  photos: DemoArtwork[];
  isPublic: boolean;
}

export function getShootsByArtist(artistSlug: string): DemoShoot[] {
  return DEMO_SHOOTS.filter((s) => s.artistSlug === artistSlug);
}

export function getShootBySlug(artistSlug: string, shootSlug: string): DemoShoot | undefined {
  return DEMO_SHOOTS.find((s) => s.artistSlug === artistSlug && s.slug === shootSlug);
}

export function getArtistById(id: string): DemoArtist | undefined {
  return DEMO_ARTISTS.find((a) => a.id === id);
}

export function getArtworksByArtist(artistId: string): DemoArtwork[] {
  return DEMO_ARTWORKS.filter((w) => w.artistId === artistId);
}

export const MEDIUMS = [
  'Painting',
  'Photography',
  'Sculpture',
  'Mixed Media',
  'Textile',
  'Ceramics',
  'Printmaking',
] as const;

export type Medium = (typeof MEDIUMS)[number];
