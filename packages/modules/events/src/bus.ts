// packages/modules/events/src/bus.ts
// In-process registry of handler functions. Rebuilt per cold start —
// each module calls events.on() in its init path. The HANDLERS map links
// EventHandler.name (string, persisted) to the actual function.

import type { HandlerFn } from './types';

const HANDLERS = new Map<string, HandlerFn>();

export function getHandler(name: string): HandlerFn | undefined {
  return HANDLERS.get(name);
}

export function setHandler(name: string, fn: HandlerFn): void {
  HANDLERS.set(name, fn);
}

export function hasHandler(name: string): boolean {
  return HANDLERS.has(name);
}

export function listHandlerNames(): string[] {
  return Array.from(HANDLERS.keys()).sort();
}
