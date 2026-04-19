// packages/modules/booking/index.ts
// Public barrel for @bigmuddy/booking — Phase C Block 2.
// Owns: Resource (bookable inventory) · Booking (confirmed seat/slot) ·
// Ticket (per-seat record with QR validation) · QuoteRequest
// (private-event quote-to-deposit workflow).

export * from './src/types';
export * as resources from './src/resources';
export * as bookings from './src/bookings';
export * as tickets from './src/tickets';
export * as quotes from './src/quotes';
