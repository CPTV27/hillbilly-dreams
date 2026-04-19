// packages/modules/commerce/index.ts
// Public barrel for the @bigmuddy/commerce module.
// Phase C Block 1 — Commerce subscription billing infrastructure.
//
// Owns: Plan / Subscription / Product / Order CRUD + Stripe checkout +
// Stripe webhook event handlers + customer self-serve portal helpers.
//
// Consumed by: every brand that sells anything recurring or one-time.

export * from './src/types';
export * as plans from './src/plans';
export * as subscriptions from './src/subscriptions';
export * as products from './src/products';
export * as orders from './src/orders';
export * as checkout from './src/checkout';
export * as webhooks from './src/webhooks';
