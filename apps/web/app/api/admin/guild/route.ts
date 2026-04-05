export const dynamic = 'force-dynamic';

// GET /api/admin/guild — List guild members (users with credit activity)
// POST /api/admin/guild — Adjust credits for a user

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(_request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    // Get all users who have credit ledger entries (guild members)
    const ledgerEntries = await prisma.creditLedger.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
    });

    // Aggregate per user
    const userMap = new Map<string, {
      userId: string;
      name: string | null;
      email: string | null;
      image: string | null;
      balance: number;
      totalEarned: number;
      totalSpent: number;
      lastActivity: string;
      entries: Array<{ id: string; change: number; reason: string; createdAt: string }>;
    }>();

    for (const entry of ledgerEntries) {
      const uid = entry.userId;
      if (!userMap.has(uid)) {
        userMap.set(uid, {
          userId: uid,
          name: entry.user.name,
          email: entry.user.email,
          image: entry.user.image,
          balance: 0,
          totalEarned: 0,
          totalSpent: 0,
          lastActivity: entry.createdAt.toISOString(),
          entries: [],
        });
      }
      const u = userMap.get(uid)!;
      u.balance += entry.change;
      if (entry.change > 0) u.totalEarned += entry.change;
      else u.totalSpent += Math.abs(entry.change);
      u.entries.push({
        id: entry.id,
        change: entry.change,
        reason: entry.reason,
        createdAt: entry.createdAt.toISOString(),
      });
    }

    // Also count lore submissions per user
    const loreSubmitters = await prisma.loreEntry.groupBy({
      by: ['submitterId'],
      _count: true,
      where: { submitterId: { not: null } },
    });

    const loreCounts = new Map(loreSubmitters.map(l => [l.submitterId!, l._count]));

    const members = Array.from(userMap.values()).map(m => ({
      ...m,
      loreCount: loreCounts.get(m.userId) || 0,
      entries: m.entries.slice(0, 10), // Last 10 entries only
    }));

    // Sort by balance descending
    members.sort((a, b) => b.balance - a.balance);

    return NextResponse.json({ data: members });
  } catch (err) {
    console.error('[GET /api/admin/guild]', err);
    return NextResponse.json({ data: [] });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { userId, change, reason } = body as { userId: string; change: number; reason: string };

    if (!userId || change === undefined || !reason) {
      return NextResponse.json({ error: 'userId, change, and reason required' }, { status: 400 });
    }

    // Get current balance
    const existing = await prisma.creditLedger.findMany({
      where: { userId },
      select: { change: true },
    });
    const currentBalance = existing.reduce((sum, e) => sum + e.change, 0);

    const entry = await prisma.creditLedger.create({
      data: {
        userId,
        change: parseInt(String(change), 10),
        reason,
        balanceAfter: currentBalance + parseInt(String(change), 10),
      },
    });

    return NextResponse.json({ data: entry });
  } catch (err) {
    console.error('[POST /api/admin/guild]', err);
    return NextResponse.json({ error: 'Credit adjustment failed' }, { status: 500 });
  }
}
