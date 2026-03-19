// apps/web/app/api/artists/onboard/route.ts
// Band onboarding endpoint — takes a band name, auto-researches, creates artist profile
// Used by the band sign-up template and admin dashboard

import { NextResponse } from 'next/server';
import { syncOnboardingPipeline } from '@/lib/task-sync';
import { scanArtistEmails } from '@/lib/gmail-service';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, genre, city, state, contactEmail, contactName, contactPhone, bio, socialLinks } = body;

    if (!name) {
      return NextResponse.json({ error: 'Band/artist name is required' }, { status: 400 });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');


    // Check if artist already exists
    const existing = await prisma.artist.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Artist already exists', artist: existing }, { status: 409 });
    }

    // Create the artist record
    const artist = await prisma.artist.create({
      data: {
        name,
        slug,
        genre: genre || 'other',
        city: city || 'Natchez',
        state: state || 'MS',
        bio: bio || null,
        contactName: contactName || null,
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
        socialLinks: socialLinks || {},
        source: 'submitted',
        status: 'discovered',
        notes: `Auto-onboarded via band template on ${new Date().toISOString().split('T')[0]}. Pending research & brand kit creation.`,
      },
    });

    // ── Fire onboarding tasks to Asana + Calendar (non-blocking) ──
    const pipelineAssignee = process.env.ONBOARDING_ASSIGNEE_EMAIL || 'tracyaldersonallen@gmail.com';
    const pipelinePromise = syncOnboardingPipeline(name, pipelineAssignee).catch((err) => {
      console.error(`[onboard] Pipeline sync failed for ${name}:`, err);
      return [];
    });

    // ── Scan Gmail for existing threads about this artist (non-blocking) ──
    const emailPromise = scanArtistEmails(name).catch((err) => {
      console.error(`[onboard] Email scan failed for ${name}:`, err);
      return [];
    });

    // Wait for both (they run concurrently)
    const [pipelineResults, existingEmails] = await Promise.all([pipelinePromise, emailPromise]);

    // Return the new artist with research tasks queued
    return NextResponse.json({
      artist,
      researchTasks: [
        { type: 'social_scan', status: 'queued', desc: 'Scan social media for existing presence' },
        { type: 'music_scan', status: 'queued', desc: 'Check Spotify, Apple Music, Bandcamp, SoundCloud' },
        { type: 'press_scan', status: 'queued', desc: 'Search for press mentions, reviews, interviews' },
        { type: 'brand_kit', status: 'queued', desc: 'Generate brand variation from Amy Allen template' },
        { type: 'photo_session', status: 'queued', desc: 'Schedule photo session with Chase Pierson' },
        { type: 'content_calendar', status: 'queued', desc: 'Generate initial 30-day content calendar' },
      ],
      ecosystem: {
        asanaTasks: pipelineResults.filter((r) => r.asana).length,
        calendarEvents: pipelineResults.filter((r) => r.calendar).length,
        errors: pipelineResults.flatMap((r) => r.errors),
        existingEmailThreads: existingEmails.length,
      },
      pageUrl: `/records/artists/${slug}`,
    });
  } catch (error) {
    console.error('Artist onboard error:', error);
    return NextResponse.json({ error: 'Failed to onboard artist' }, { status: 500 });
  }
}
