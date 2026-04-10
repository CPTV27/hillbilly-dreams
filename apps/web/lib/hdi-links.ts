// apps/web/lib/hdi-links.ts
// SINGLE SOURCE OF TRUTH for the HDI link tree at bigmuddytouring.com/links
//
// To add a link anywhere in the HDI ecosystem:
//   1. Pick the right section below (or add a new section)
//   2. Add a new entry with { label, url, note? }
//   3. Ship it — the /links page rebuilds automatically
//
// Rules:
// - Keep labels SHORT (3-5 words max)
// - Use full URLs (https://...) so links work from every domain
// - Mark internal network-only URLs with `localOnly: true` (they only
//   render when user is on the Mac mini LAN)
// - Mark unreleased/broken links with `hidden: true` to hide them
// - Order inside each section = display order, put the most-tapped first
// - Highlighted links get a gold border ring

export type LinkItem = {
  label: string;
  url: string;
  note?: string;
  highlight?: boolean;
  localOnly?: boolean;
  hidden?: boolean;
};

export type LinkSection = {
  id: string;
  title: string;
  subtitle?: string;
  accent?: 'live' | 'gold' | 'cream';
  links: LinkItem[];
};

export const HDI_LINK_TREE: LinkSection[] = [
  // ───────────────────────────────────────────────────────────────
  // LIVE NOW — pulse dot + gold, always at the top
  // ───────────────────────────────────────────────────────────────
  {
    id: 'live',
    title: 'Live Right Now',
    subtitle: 'Natchez, Mississippi — streaming 24/7',
    accent: 'live',
    links: [
      {
        label: 'Watch Now',
        url: 'https://bigmuddytouring.com/radio/live',
        note: 'Big Muddy Radio — live from the Blues Room',
        highlight: true,
      },
      {
        label: 'Listen Now',
        url: 'https://bigmuddytouring.com/radio',
        note: '18 shows · 7 hosts · 24/7',
        highlight: true,
      },
      {
        label: 'Tonight at the Blues Room',
        url: 'https://bigmuddytouring.com/events',
        note: 'Shows, tickets, lineup',
        hidden: true, // TODO: unhide when /events page ships
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // THE BRANDS — everything under Big Muddy Touring
  // ───────────────────────────────────────────────────────────────
  {
    id: 'brands',
    title: 'Big Muddy',
    subtitle: 'The entertainment company',
    accent: 'gold',
    links: [
      {
        label: 'Big Muddy Touring',
        url: 'https://bigmuddytouring.com',
        note: 'Memphis to New Orleans',
      },
      {
        label: 'Big Muddy Radio',
        url: 'https://bigmuddytouring.com/radio',
        note: 'Streaming from Natchez',
      },
      {
        label: 'Big Muddy Magazine',
        url: 'https://bigmuddytouring.com/magazine',
        note: 'Editorial · photography · stories',
      },
      {
        label: 'Big Muddy Records',
        url: 'https://bigmuddytouring.com/records',
        note: 'The label',
      },
      {
        label: 'Big Muddy Entertainment',
        url: 'https://bigmuddytouring.com/entertainment',
        note: 'The media company hub',
      },
      {
        label: 'The House Band',
        url: 'https://bigmuddytouring.com/entertainment/house-band',
        note: 'Swampers model for Natchez',
      },
      {
        label: 'Big Muddy Inn',
        url: 'https://bigmuddytouring.com/inn',
        note: 'Boutique hotel + bar + venue',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // MBT — the product
  // ───────────────────────────────────────────────────────────────
  {
    id: 'mbt',
    title: 'Measurably Better Things',
    subtitle: 'The platform for towns, brokers, and banks',
    accent: 'gold',
    links: [
      {
        label: 'MBT Overview',
        url: 'https://bigmuddytouring.com/mbt',
        note: 'The product story',
      },
      {
        label: 'MBT — Real Estate',
        url: 'https://bigmuddytouring.com/mbt/real-estate',
        note: 'For brokers + agents',
      },
      {
        label: 'MBT — Civic',
        url: 'https://bigmuddytouring.com/mbt/civic',
        note: 'For towns + cities',
      },
      {
        label: 'Deep South Directory',
        url: 'https://deepsouthdirectory.com',
        note: 'Business marketing product',
      },
      {
        label: 'MBT Platform Home',
        url: 'https://measurablybetter.life',
        note: 'Consumer AI + platform overview',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // CHASE + EDITORIAL
  // ───────────────────────────────────────────────────────────────
  {
    id: 'editorial',
    title: 'Writing + Photography',
    subtitle: 'Chase Pierson + Outsider Economics',
    accent: 'cream',
    links: [
      {
        label: 'Outsider Economics',
        url: 'https://outsidereconomics.com',
        note: 'The book + the field manual',
      },
      {
        label: 'About Chase',
        url: 'https://outsidereconomics.com/about',
        note: 'Photographer, filmmaker, writer',
      },
      {
        label: 'Venture Gallery',
        url: 'https://buycurious.art',
        note: 'Photography + print sales',
      },
      {
        label: 'Get the Book',
        url: 'https://www.amazon.com/dp/B0F2HZBZFZ',
        note: 'Outsider Economics on Amazon',
      },
      {
        label: 'Book a Shoot',
        url: 'https://bigmuddytouring.com/photography/book',
        note: 'Chase Pierson Photography rates',
        hidden: true, // TODO: unhide when /photography/book ships
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // THE ROOM — demo + presentation links for in-person meetings
  // ───────────────────────────────────────────────────────────────
  {
    id: 'demos',
    title: 'In the Room',
    subtitle: 'Demo + presentation links',
    accent: 'cream',
    links: [
      {
        label: 'The Whole Story',
        url: 'https://bigmuddytouring.com/demo/presentation',
        note: 'One-page ecosystem walkthrough',
        highlight: true,
      },
      {
        label: 'Photo Search (16,936 photos)',
        url: 'https://bigmuddytouring.com/admin/photos',
        note: 'Searchable library',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // PARTNERS
  // ───────────────────────────────────────────────────────────────
  {
    id: 'partners',
    title: 'Partners + Two-Market Expansion',
    subtitle: 'Studio C + Tuthill + Bearsville',
    accent: 'cream',
    links: [
      {
        label: 'Studio C Video',
        url: 'https://studiocvideo.com',
        note: 'Video + production · expanding to Natchez',
      },
      {
        label: 'Tuthill Design',
        url: 'https://tuthilldesign.com',
        note: 'Design + real estate · expanding to Deep South',
      },
      {
        label: 'Bearsville Creative',
        url: 'https://bearsvillemediagroup.com',
        note: 'NE node · summer 2026 activation',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // HDI CORPORATE
  // ───────────────────────────────────────────────────────────────
  {
    id: 'corporate',
    title: 'Hillbilly Dreams Inc',
    subtitle: 'The parent company',
    accent: 'cream',
    links: [
      {
        label: 'HDI Corporate',
        url: 'https://hillbillydreamsinc.com',
        note: 'The parent',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // ON THE LOCAL NETWORK (Mac mini) — only useful when on the LAN
  // ───────────────────────────────────────────────────────────────
  {
    id: 'local',
    title: 'On the Mac Mini',
    subtitle: 'Visible from the local network only',
    accent: 'cream',
    links: [
      {
        label: 'Hotel TV Slideshow',
        url: 'http://192.168.4.37:8888/tv',
        note: 'In-room photo rotation',
        localOnly: true,
      },
      {
        label: 'Hotel Kiosk',
        url: 'http://192.168.4.37:8888/kiosk',
        note: 'Lobby display',
        localOnly: true,
      },
      {
        label: 'Big Muddy Radio (Icecast)',
        url: 'http://192.168.4.37:8010',
        note: 'Live stream server',
        localOnly: true,
      },
      {
        label: 'Broadcast Control',
        url: 'http://192.168.4.37:8080',
        note: 'OpenBroadcaster',
        localOnly: true,
      },
      {
        label: 'Postiz',
        url: 'http://192.168.4.37:4007',
        note: 'Social scheduler',
        localOnly: true,
      },
      {
        label: 'Open Notebook',
        url: 'http://192.168.4.37:5055',
        note: 'Research notebook',
        localOnly: true,
      },
    ],
  },
];

// Filter out hidden links and return the tree.
//
// Options:
//   - includeLocalOnly: if true, LAN-only URLs (http://192.168.4.37:*) render.
//     Default is false so remote visitors don't see unreachable LAN URLs.
//     The /links page can pass `true` when rendered from a trusted LAN context
//     (e.g. the Mac mini kiosk itself) if it ever needs them visible there.
export function getVisibleLinkTree(options: { includeLocalOnly?: boolean } = {}): LinkSection[] {
  const { includeLocalOnly = false } = options;
  return HDI_LINK_TREE.map((section) => ({
    ...section,
    links: section.links.filter((link) => {
      if (link.hidden) return false;
      if (link.localOnly && !includeLocalOnly) return false;
      return true;
    }),
  })).filter((section) => section.links.length > 0);
}
