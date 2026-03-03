import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

// GET /api/contacts
// Query params: ?category=artist|vendor|media|partner|guest|team&q=search&limit=20&page=1
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const where = {
      ...(category && { category }),
      ...(q && {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { email: { contains: q, mode: 'insensitive' as const } },
          { organization: { contains: q, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { name: 'asc' },
        take: limit,
        skip,
      }),
      prisma.contact.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[API Error] GET /api/contacts', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/contacts
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        role: body.role || null,
        organization: body.organization || null,
        email: body.email || null,
        phone: body.phone || null,
        category: body.category || null,
        notes: body.notes || null,
        lastContact: body.lastContact ? new Date(body.lastContact) : null,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('[API Error] POST /api/contacts', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
