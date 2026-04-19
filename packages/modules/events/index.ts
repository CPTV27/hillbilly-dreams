// packages/modules/events/index.ts
// @bigmuddy/events — Phase C Block 5 Coordination Layer.
// Cross-module event publishing + at-least-once delivery + multi-tenant
// isolation. Backed by Postgres (durable audit log via Prisma) plus an
// in-process dispatcher. PgBoss integration is the next iteration —
// for now, the dispatcher reads from EventDelivery rows directly.

export * from './src/types';
export * as bus from './src/bus';
export * as publish from './src/publish';
export * as register from './src/register';
export * as dispatcher from './src/dispatcher';
