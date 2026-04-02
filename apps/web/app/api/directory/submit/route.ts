export const dynamic = 'force-dynamic';
// apps/web/app/api/directory/submit/route.ts
// POST /api/directory/submit
// Handles Deep South Directory listing submissions.
// 1. Validates input
// 2. Creates DirectoryBusiness record in DB
// 3. Generates AI editorial spotlight via Anthropic
// 4. Queues enrichment jobs (Google Places, embedding)
// 5. Sends ntfy notification to ops channel

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@/lib/db';
import { notify } from '@/lib/notify';
import { generateSlug } from '@/lib/google-places';

const client = new Anthropic();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const {
      name,
      category,
      city,
      state = 'MS',
      website,
      description,
      toolsOrigin,
      softwareSpend,
      contactName,
      contactEmail,
      contactPhone,
      hearAbout,
      // Musician-specific fields
      genre,
      streamingLinks,
      availability,
      feeRange,
    } = body;

    if (!name || !category || !city || !description || !contactName || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate URL-safe slug
    const slug = generateSlug(name, city);

    // Check for duplicate slug
    const existingSlug = await prisma.directoryBusiness.findUnique({ where: { slug } });
    if (existingSlug) {
      return NextResponse.json(
        { error: `A business with a similar name already exists in ${city}` },
        { status: 409 }
      );
    }

    // Generate AI editorial spotlight
    let spotlight = '';
    try {
      const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        messages: [
          {
            role: 'user',
            content: category === 'musician'
              ? `Write a 200-word editorial spotlight for a musician listing in the Big Muddy Touring Directory.

Artist details:
- Name: ${name}
- Genre: ${genre || 'not specified'}
- Based in: ${city}, ${state}
- Bio: ${description}

Voice guidelines:
- Direct, warm, music-lover to music-lover
- Sound like someone who has seen them play, not a press release
- No industry jargon, no hyperbole
- Focus on what they sound like and why people should hear them
- End with one sentence connecting them to the corridor music scene

Write only the spotlight text, no headers or labels.`
              : `Write a 200-word editorial spotlight for a business listing in the Deep South Directory.

Business details:
- Name: ${name}
- Category: ${category}
- City: ${city}, ${state}
- Description: ${description}
${website ? `- Website: ${website}` : ''}

Voice guidelines:
- Direct, analog-warm, operator-to-operator
- Sound like a neighbor who knows the town, not a tech company
- No startup jargon, no hyperbole
- Focus on what makes this place real and worth visiting
- End with one sentence that connects this business to the corridor

Write only the spotlight text, no headers or labels.`,
          },
        ],
      });
      spotlight = message.content
        .filter((block): block is Anthropic.TextBlock => block.type === 'text')
        .map((block) => block.text)
        .join('');
    } catch (err) {
      console.error('[directory/submit] Spotlight generation failed:', err);
    }

    // Create DirectoryBusiness record
    const business = await prisma.directoryBusiness.create({
      data: {
        name,
        slug,
        category,
        city,
        state,
        website: website || null,
        description,
        contactName,
        contactEmail,
        phone: contactPhone || null,
        toolsOrigin: toolsOrigin || null,
        softwareSpend: softwareSpend || null,
        hearAbout: hearAbout || null,
        spotlight: spotlight || null,
        tier: 'free',
        active: false, // Admin activates after review
        // Musician-specific fields
        ...(genre && { genre }),
        ...(streamingLinks && { streamingLinks }),
        ...(availability && { availability }),
        ...(feeRange && { feeRange }),
      },
    });

    // Queue enrichment jobs
    const jobTypes = ['google_places', 'embedding'];
    await prisma.enrichmentJob.createMany({
      data: jobTypes.map((jobType) => ({
        entityType: 'directory_business',
        entityId: String(business.id),
        jobType,
      })),
    });

    // Send ntfy notification to ops channel
    await notify({
      title: `New Directory Submission: ${name}`,
      message: category === 'musician'
        ? `Musician · ${genre || 'genre TBD'} · ${city}, ${state}\nContact: ${contactName} <${contactEmail}>\nAvailability: ${availability || 'not set'}\nID: ${business.id} | Slug: ${slug}`
        : `${category} · ${city}, ${state}\nContact: ${contactName} <${contactEmail}>\nSpend: ${softwareSpend || 'not provided'}\nTools: ${toolsOrigin || 'not provided'}\nID: ${business.id} | Slug: ${slug}`,
      topic: 'ops',
      priority: 3,
      tags: ['directory', 'new-listing'],
    });

    return NextResponse.json({
      success: true,
      businessId: business.id,
      slug: business.slug,
      spotlight,
      message: 'Submission received. Business created. Enrichment queued.',
    });
  } catch (err) {
    console.error('[directory/submit] Error:', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
