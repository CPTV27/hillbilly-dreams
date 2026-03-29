import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Vibe-to-prompt mapping — no text in any prompt
const VIBE_PROMPTS: Record<string, string> = {
  'dark blues': 'Editorial woodcut illustration of a blues club interior at night, warm golden light, empty stage with single microphone and spotlight, dark atmospheric, burnt orange and cream palette, hand-drawn linocut style — no text no words no letters',
  'fun party': 'Vibrant risograph illustration of a joyful crowd celebrating, colorful confetti, warm tones, screen print texture, energetic — no text no words no letters',
  'intimate acoustic': 'Watercolor illustration of a small listening room, single chair on stage, warm amber light, intimate atmosphere, soft brushstrokes — no text no words no letters',
  'rock and roll': 'Gig poster illustration of electric guitars and amplifiers on a dark stage, neon glow, concert energy, bold lines — no text no words no letters',
  'southern gothic': 'Dark woodcut illustration of a Mississippi porch at twilight, spanish moss, warm light from windows, moody Southern atmosphere — no text no words no letters',
  'festival': 'Folk art illustration of an outdoor festival with bunting and string lights, crowd silhouettes, warm sunset colors — no text no words no letters',
};

const DEFAULT_VIBE = 'Editorial woodcut illustration of a music venue stage at night, warm golden light, atmospheric, burnt orange and cream palette — no text no words no letters';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventName, artist, date, time, venue, vibe } = body as {
      eventName?: string;
      artist: string;
      date: string;
      time?: string;
      venue?: string;
      vibe?: string;
    };

    if (!artist || !date) {
      return NextResponse.json({ error: 'artist and date are required' }, { status: 400 });
    }

    const showName = eventName || `${artist} Live`;
    const showVenue = venue || 'Big Muddy Inn — Blues Room';
    const vibePrompt = VIBE_PROMPTS[vibe?.toLowerCase() || ''] || DEFAULT_VIBE;

    // Step 1: Generate background image via Vertex AI Imagen
    let backgroundUrl = '';
    try {
      const baseUrl = process.env.NEXTAUTH_URL || 'https://bigmuddytouring.com';
      const imgRes = await fetch(`${baseUrl}/api/media/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: vibePrompt,
          album: 'posters',
          negativePrompt: 'text, words, letters, typography, watermark, signature, photorealistic, 3d render',
          aspectRatio: '9:16',
        }),
      });

      if (imgRes.ok) {
        const imgData = await imgRes.json();
        backgroundUrl = imgData.url || '';
      }
    } catch (err) {
      console.error('[poster] Image generation failed:', err);
      // Continue without background — Canva will use a template
    }

    // Step 2: Upsert event in the database
    let eventId: number | null = null;
    try {
      const eventDate = new Date(date);
      const existing = await prisma.event.findFirst({
        where: {
          artist,
          date: {
            gte: new Date(eventDate.getTime() - 86400000),
            lte: new Date(eventDate.getTime() + 86400000),
          },
        },
      });

      if (existing) {
        eventId = existing.id;
      } else {
        const created = await prisma.event.create({
          data: {
            name: showName,
            artist,
            date: eventDate,
            time: time || null,
            venue: showVenue,
            status: 'upcoming',
          },
        });
        eventId = created.id;
      }
    } catch (err) {
      console.error('[poster] Event upsert failed:', err);
      // Non-fatal — poster still works without event record
    }

    // Step 3: Build the poster text content for Canva
    const posterText = {
      headline: showName,
      artist,
      dateDisplay: date,
      timeDisplay: time || '',
      venue: showVenue,
      tagline: 'Big Muddy Presents',
    };

    // Step 4: Build a Canva design query
    // The Canva MCP will be called from the frontend — we return the data needed
    const canvaQuery = `Create a show poster for "${showName}" featuring ${artist} at ${showVenue} on ${date}${time ? ` at ${time}` : ''}. Dark, warm aesthetic with burnt orange and gold accents on a dark background. The poster should be dramatic and eye-catching, suitable for a blues/music venue.`;

    return NextResponse.json({
      success: true,
      poster: {
        backgroundUrl,
        text: posterText,
        canvaQuery,
        eventId,
        vibe: vibe || 'dark blues',
      },
    });
  } catch (err) {
    console.error('[poster] Error:', err);
    return NextResponse.json({ error: 'Failed to generate poster' }, { status: 500 });
  }
}
