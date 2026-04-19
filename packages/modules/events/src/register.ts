// packages/modules/events/src/register.ts
// register() — module init writes the handler to EventHandler table +
// stores the function in the in-process bus. Idempotent — safe to call
// repeatedly across cold starts.

import { prisma } from '@bigmuddy/database';
import type { RegisterInput } from './types';
import { setHandler } from './bus';

export async function register(input: RegisterInput): Promise<void> {
  // Persist or update the handler row.
  await prisma.eventHandler.upsert({
    where: { name: input.name },
    create: {
      name: input.name,
      eventType: input.eventType,
      module: input.module,
      tenantScope: input.tenantScope ?? 'own',
      enabled: input.enabled ?? true,
      maxRetries: input.maxRetries ?? 5,
      timeoutMs: input.timeoutMs ?? 30000,
    },
    update: {
      eventType: input.eventType,
      module: input.module,
      tenantScope: input.tenantScope ?? 'own',
      enabled: input.enabled ?? true,
      maxRetries: input.maxRetries ?? 5,
      timeoutMs: input.timeoutMs ?? 30000,
    },
  });

  // Wire the function into the in-process registry.
  setHandler(input.name, input.handler);
}

/** Bulk-register many handlers. Useful for module init. */
export async function registerMany(inputs: RegisterInput[]): Promise<void> {
  for (const i of inputs) {
    await register(i);
  }
}
