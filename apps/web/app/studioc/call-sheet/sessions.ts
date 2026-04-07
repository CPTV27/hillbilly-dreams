// apps/web/app/studioc/call-sheet/sessions.ts
// Mock session data for Utopia Call Sheet demo

export type SessionStatus = 'confirmed' | 'in-progress' | 'wrapped' | 'delivered';

export type VideoService =
  | 'multi-cam'
  | 'live-stream'
  | 'highlight-reel'
  | 'behind-the-scenes'
  | 'social-clips';

export interface Session {
  id: string;
  band: string;
  subtitle: string;
  date: string;
  time: string;
  duration: string;
  engineer: string;
  room: string;
  equipment: string[];
  notes: string;
  status: SessionStatus;
  videoServices: VideoService[];
  contact: string;
}

export const VIDEO_SERVICE_LABELS: Record<VideoService, string> = {
  'multi-cam': 'Multi-Cam Recording',
  'live-stream': 'Live Stream',
  'highlight-reel': 'Highlight Reel',
  'behind-the-scenes': 'Behind-the-Scenes',
  'social-clips': 'Social Media Clips',
};

export const STATUS_LABELS: Record<SessionStatus, string> = {
  confirmed: 'Confirmed',
  'in-progress': 'In Progress',
  wrapped: 'Wrapped',
  delivered: 'Delivered',
};

export const STATUS_COLORS: Record<SessionStatus, string> = {
  confirmed: '#c9a84c',
  'in-progress': '#4caf50',
  wrapped: '#2196f3',
  delivered: '#9c27b0',
};

export const SESSIONS: Session[] = [
  {
    id: 'river-rats-bearsville',
    band: 'River Rats',
    subtitle: 'Live at Bearsville',
    date: 'April 12, 2026',
    time: '10:00 AM — 8:00 PM',
    duration: 'Full Day',
    engineer: 'Chase Pierson',
    room: 'Blues Room — Main Stage',
    equipment: [
      'ATEM Mini Extreme ISO (4-cam)',
      'Blackmagic Pocket Cinema 6K (x3)',
      'Sony Alpha 7IV (handheld)',
      'Hollyland Mars 4K wireless',
      'Audio-Technica AT4050 (x4)',
      'Steinway Grand Piano',
      'Pearl drum kit',
      'Aputure 300d III (x2)',
      'DaVinci Resolve — live color',
    ],
    notes:
      'Blues band — full day session with live audience. Recording for Big Muddy Records release. Streaming live on YouTube and bigmuddyradio.com. Sound check at 9 AM, doors at 6 PM for evening show.',
    status: 'confirmed',
    videoServices: ['multi-cam', 'live-stream', 'highlight-reel', 'social-clips'],
    contact: 'studio@thebigmuddyinn.com',
  },
  {
    id: 'amy-allen-radio-singles',
    band: 'Amy Allen',
    subtitle: 'Radio Singles',
    date: 'April 15, 2026',
    time: '1:00 PM — 6:00 PM',
    duration: 'Half Day',
    engineer: 'Arrie Aslin',
    room: 'Parlor — Vocal Booth',
    equipment: [
      'Audio-Technica AT4050 (vocal)',
      'Universal Audio Apollo Twin',
      'Steinway Grand Piano',
      'Aputure Amaran 200d',
      'Blackmagic Pocket Cinema 6K (x2)',
      'Logic Pro — tracking',
    ],
    notes:
      'Solo artist — vocal tracking for two radio singles. Intimate parlor setup. Piano accompaniment by Arrie. Light video coverage for social content.',
    status: 'confirmed',
    videoServices: ['behind-the-scenes', 'social-clips'],
    contact: 'studio@thebigmuddyinn.com',
  },
  {
    id: 'mechanical-bull-album',
    band: 'Mechanical Bull',
    subtitle: 'Songs To Get Divorced To',
    date: 'April 18 — 20, 2026',
    time: '10:00 AM — 10:00 PM daily',
    duration: '3-Day Album Session',
    engineer: 'Chase Pierson & Arrie Aslin',
    room: 'Blues Room — Full Studio',
    equipment: [
      'ATEM Mini Extreme ISO (8-cam)',
      'Blackmagic Pocket Cinema 6K (x4)',
      'Sony Alpha 7IV (x2)',
      'Hollyland Mars 4K wireless (x3)',
      'Audio-Technica AT4050 (x6)',
      'Audio-Technica AT2020 (x4)',
      'Steinway Grand Piano',
      'Pearl drum kit',
      'Fender Twin Reverb',
      'Marshall JCM800',
      'Aputure 300d III (x4)',
      'Godox SL150II (x4)',
      'Pro Tools — multi-track',
      'DaVinci Resolve Studio',
    ],
    notes:
      'Rock band — 3-day residency. Full album tracking. Band is 5 pieces: guitar, bass, drums, keys, vocals. Lodging at The Big Muddy Inn. Day 1: rhythm section. Day 2: overdubs and vocals. Day 3: mixing and live performance.',
    status: 'in-progress',
    videoServices: ['multi-cam', 'live-stream', 'highlight-reel', 'behind-the-scenes', 'social-clips'],
    contact: 'studio@thebigmuddyinn.com',
  },
  {
    id: 'bearsville-open-mic-april',
    band: 'Bearsville Open Mic',
    subtitle: 'April 2026',
    date: 'April 24, 2026',
    time: '7:00 PM — 11:00 PM',
    duration: 'Evening',
    engineer: 'Miles (house engineer)',
    room: 'Blues Room — Open Format',
    equipment: [
      'ATEM Mini Extreme ISO (3-cam)',
      'Blackmagic Pocket Cinema 6K (x2)',
      'Audio-Technica AT2020 (x3)',
      'Steinway Grand Piano',
      'Pearl drum kit',
      'House PA system',
      'Aputure Amaran 200d (x2)',
      'OBS — live stream',
    ],
    notes:
      'Community open mic night. Sign-up sheet at the door. 10-minute slots. Streaming on YouTube. Light multi-cam coverage. Casual atmosphere — encourage new artists.',
    status: 'confirmed',
    videoServices: ['multi-cam', 'live-stream'],
    contact: 'studio@thebigmuddyinn.com',
  },
];

export function getSession(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id);
}
