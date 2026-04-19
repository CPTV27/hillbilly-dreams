// packages/modules/email/index.ts
// @bigmuddy/email — transactional + lifecycle email sends.
// Thin wrapper over Resend API. Templates are plain string builders —
// we do NOT use React Email; simpler output path, no render dep.
//
// Consumed by Commerce webhook handlers, Booking quote flow, Inn
// pre-arrival cron, etc. Never silently-fails — send() errors bubble
// up for the caller to log/alert.

export * from './src/types';
export * as send from './src/send';
export * as templates from './src/templates';
