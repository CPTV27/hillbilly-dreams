// /api/ops/amy — Amy's dashboard data
// Fetches today's arrivals (Cloudbeds), artist loadsheet (Showcases),
// and outstanding tasks (LaunchTask) in a single call.

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { getReservations } from '@/lib/cloudbeds';

export const dynamic = 'force-dynamic';

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function tomorrowString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

const withTimeout = <T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> =>
  Promise.race([promise, new Promise<T>(resolve => setTimeout(() => resolve(fallback), ms))]);

export async function GET() {
  const today = todayString();
  const tomorrow = tomorrowString();

  // Fetch all data sources in parallel
  const [arrivals, showcases, tasks, contacts] = await Promise.all([
    // Today's check-ins from Cloudbeds — 5s timeout guards against a hung connection
    withTimeout(
      getReservations({
        checkInFrom: today,
        checkInTo: today,
      }).catch((err) => {
        console.error('[amy] Cloudbeds fetch failed:', err.message);
        return [] as Awaited<ReturnType<typeof getReservations>>;
      }),
      5000,
      [] as Awaited<ReturnType<typeof getReservations>>
    ),

    // Today's and tomorrow's showcases with artist slots
    prisma.showcase.findMany({
      where: {
        date: {
          gte: new Date(today),
          lt: new Date(tomorrow + 'T23:59:59Z'),
        },
        status: { not: 'cancelled' },
      },
      include: {
        slots: {
          include: { artist: true },
          orderBy: { setOrder: 'asc' },
        },
      },
      orderBy: { date: 'asc' },
    }).catch((err) => {
      console.error('[amy] Showcase query failed:', err.message);
      return [] as any[];
    }),

    // Outstanding tasks assigned to Amy or unassigned
    prisma.launchTask.findMany({
      where: {
        status: 'pending',
        OR: [
          { assignedTo: 'amy' },
          { assignedTo: null },
        ],
      },
      orderBy: { taskNumber: 'asc' },
      take: 15,
    }).catch((err) => {
      console.error('[amy] LaunchTask query failed:', err.message);
      return [] as any[];
    }),

    // Contacts missing key info (vendor invoices, W9s)
    prisma.contact.findMany({
      where: {
        category: { in: ['vendor', 'artist'] },
        OR: [
          { email: null },
          { email: '' },
          { phone: null },
          { phone: '' },
        ],
      },
      orderBy: { updatedAt: 'desc' },
      take: 10,
    }).catch((err) => {
      console.error('[amy] Contact query failed:', err.message);
      return [] as any[];
    }),
  ]);

  // Filter arrivals to confirmed/not_confirmed (exclude cancelled, no_show)
  const activeArrivals = arrivals.filter(
    (r) => r.status === 'confirmed' || r.status === 'not_confirmed'
  );

  // Build artist loadsheet from showcases
  const loadsheet = showcases.map((s) => ({
    id: s.id,
    name: s.name,
    venue: s.venue,
    date: s.date,
    time: s.time,
    status: s.status,
    artists: s.slots.map((slot: { artist: { name: string; genre: string | null; contactEmail: string | null; contactPhone: string | null }; setOrder: number | null; setLength: number | null; status: string; notes: string | null }) => ({
      name: slot.artist.name,
      genre: slot.artist.genre,
      setOrder: slot.setOrder,
      setLength: slot.setLength,
      status: slot.status,
      contactEmail: slot.artist.contactEmail,
      contactPhone: slot.artist.contactPhone,
      notes: slot.notes,
    })),
  }));

  return NextResponse.json({
    arrivals: activeArrivals.map((r) => ({
      id: r.reservationID,
      guest: r.guestName,
      email: r.guestEmail,
      phone: r.guestPhone,
      room: r.roomTypeName,
      checkIn: r.startDate,
      checkOut: r.endDate,
      balance: r.balanceDue,
      status: r.status,
      source: r.source,
    })),
    loadsheet,
    tasks: tasks.map((t) => ({
      id: t.taskNumber,
      title: t.title,
      assignedTo: t.assignedTo,
      timeEstimate: t.timeEstimate,
      session: t.sessionName,
    })),
    chaseList: contacts.map((c) => ({
      id: c.id,
      name: c.name,
      category: c.category,
      organization: c.organization,
      missingEmail: !c.email,
      missingPhone: !c.phone,
    })),
    timestamp: new Date().toISOString(),
  });
}
