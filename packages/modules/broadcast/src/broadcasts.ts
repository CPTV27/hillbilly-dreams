// packages/modules/broadcast/src/broadcasts.ts
// LiveBroadcast CRUD + lifecycle (scheduled → live → ended | aborted).

import { prisma } from '@bigmuddy/database';
import type {
  LiveBroadcast,
  ScheduleBroadcastInput,
  Brand,
  BroadcastStatus,
} from './types';

export async function list(opts?: {
  brand?: Brand;
  status?: BroadcastStatus;
  upcomingOnly?: boolean;
}): Promise<LiveBroadcast[]> {
  return prisma.liveBroadcast.findMany({
    where: {
      ...(opts?.brand && { brand: opts.brand }),
      ...(opts?.status && { status: opts.status }),
      ...(opts?.upcomingOnly && { scheduledStart: { gte: new Date() } }),
    },
    orderBy: { scheduledStart: 'asc' },
  });
}

export async function get(id: string): Promise<LiveBroadcast | null> {
  return prisma.liveBroadcast.findUnique({
    where: { id },
    include: { clips: true },
  });
}

export async function schedule(
  input: ScheduleBroadcastInput
): Promise<LiveBroadcast> {
  return prisma.liveBroadcast.create({
    data: {
      brand: input.brand,
      title: input.title,
      description: input.description,
      scheduledStart: input.scheduledStart,
      scheduledEnd: input.scheduledEnd,
      platform: input.platform ?? 'tiktok_live',
      obsScene: input.obsScene ?? null,
      cameras: (input.cameras ?? []) as never,
      hostUserIds: input.hostUserIds ?? [],
      associatedShowId: input.associatedShowId ?? null,
    },
  });
}

export async function markLive(id: string): Promise<LiveBroadcast> {
  return prisma.liveBroadcast.update({
    where: { id },
    data: { status: 'live', actualStart: new Date() },
  });
}

export async function markEnded(id: string): Promise<LiveBroadcast> {
  return prisma.liveBroadcast.update({
    where: { id },
    data: { status: 'ended', actualEnd: new Date() },
  });
}

export async function abort(id: string): Promise<LiveBroadcast> {
  return prisma.liveBroadcast.update({
    where: { id },
    data: { status: 'aborted', actualEnd: new Date() },
  });
}
