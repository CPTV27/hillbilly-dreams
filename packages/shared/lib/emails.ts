/**
 * Centralized email routing config — Master Alias & Routing Table
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all email addresses used in the BMT
 * ecosystem. Update THIS file when aliases change — every mailto
 * link and backend dispatch target references these constants.
 *
 * Routing table managed by Hillbilly Dreams, Inc.
 * Last updated: 2026-03-22
 */

export const BMT_EMAILS = {
  // ── Hillbilly Dreams Inc. (Master Holding Company) ──
  admin: 'chase@hillbillydreamsinc.com',
  legal: 'legal@hillbillydreamsinc.com',
  billing: 'billing@hillbillydreamsinc.com',

  // ── Big Muddy Touring ──
  ops: 'ops@bigmuddytouring.com',
  artists: 'artists@bigmuddytouring.com',
  tracy: 'tracy@bigmuddytouring.com',
  amy: 'amy@bigmuddytouring.com',

  // ── Chase Pierson (Creator Brand) ──
  chase: 'chase@chasepierson.tv',
  hello: 'hello@chasepierson.tv',

  // ── Sub-brands (not yet migrated — keep existing addresses) ──
  directory: 'directory@hillbillydreamsinc.com',
  studio: 'studio@thebigmuddyinn.com',
  radio: 'radio@thebigmuddyinn.com',
  weddings: 'weddings@bigmuddyinn.com',
  records: 'music@bigmuddyrecordlabel.com',
  riseup: 'riseup@outsidereconomics.com',
  design: 'design@tuthilldesign.com',
} as const;

export type BMTEmailKey = keyof typeof BMT_EMAILS;
