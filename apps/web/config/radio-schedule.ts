/**
 * Big Muddy Radio — on-air schedule (config-driven; DB later).
 * Consumed by GET /api/radio/schedule and the /radio UI.
 * v1: 18 slots, hardcoded JSON.
 */

export type RadioShowSlot = {
  time: string;
  name: string;
  host: string;
};

export const RADIO_SHOWS: RadioShowSlot[] = [
  { time: '12:00 AM', name: 'The Overnight', host: 'Automated' },
  { time: '2:00 AM', name: 'Still Water Sessions', host: 'Automated' },
  { time: '4:00 AM', name: 'Pre-Dawn Blues', host: 'Automated' },
  { time: '6:00 AM', name: 'Delta Dawn Report', host: 'Delta Dawn' },
  { time: '6:15 AM', name: 'Morning Levee Rise', host: 'Automated' },
  { time: '7:30 AM', name: 'River & Road Report', host: 'Automated' },
  { time: '9:00 AM', name: 'Porch Talk', host: 'Miss Pearline' },
  { time: '10:00 AM', name: 'Region Crossroads', host: 'Automated' },
  { time: '12:00 PM', name: 'The Juke Joint Hour', host: 'Automated' },
  { time: '1:00 PM', name: 'Rotating Specials', host: 'Various' },
  { time: '2:00 PM', name: 'Local Lunch Hour', host: 'Automated' },
  { time: '3:00 PM', name: 'Mechanical Bull Sessions', host: 'Live Studio' },
  { time: '4:00 PM', name: 'Honky Tonk Highway', host: 'Automated' },
  { time: '5:00 PM', name: 'Golden Hour', host: 'Automated' },
  { time: '6:00 PM', name: 'River Rat Radio', host: 'River Rat Ray' },
  { time: '7:00 PM', name: 'Late Night Levee', host: 'Deacon Slim' },
  { time: '8:30 PM', name: 'Front Porch Stories', host: 'Various' },
  { time: '10:00 PM', name: 'Catfish Carl After Dark', host: 'Catfish Carl' },
];
