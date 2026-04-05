/**
 * Big Muddy Radio — on-air schedule (config-driven; DB later).
 * Consumed by GET /api/radio/schedule and the /radio/player UI.
 */

export type RadioShowSlot = {
  time: string;
  name: string;
  host: string;
};

export const RADIO_SHOWS: RadioShowSlot[] = [
  { time: '6:00 AM', name: 'Delta Dawn Report', host: 'Delta Dawn' },
  { time: '6:15 AM', name: 'Morning Levee Rise', host: 'Automated' },
  { time: '9:00 AM', name: 'Porch Talk', host: 'Miss Pearline' },
  { time: '10:00 AM', name: 'Region Crossroads', host: 'Automated' },
  { time: '12:00 PM', name: 'The Juke Joint Hour', host: 'Automated' },
  { time: '1:00 PM', name: 'Rotating Specials', host: 'Various' },
  { time: '3:00 PM', name: 'Mechanical Bull Sessions', host: 'Live Studio' },
  { time: '4:00 PM', name: 'Honky Tonk Highway', host: 'Automated' },
  { time: '6:00 PM', name: 'River Rat Radio', host: 'River Rat Ray' },
  { time: '7:00 PM', name: 'Late Night Levee', host: 'Deacon Slim' },
  { time: '10:00 PM', name: 'Catfish Carl After Dark', host: 'Catfish Carl' },
  { time: '12:00 AM', name: 'The Overnight', host: 'Automated' },
];
