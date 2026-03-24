// apps/web/app/api/directory/submit/route.ts
// POST /api/directory/submit
// Handles Deep South Directory listing submissions.
// 1. Validates input
// 2. Generates AI editorial spotlight via Anthropic
// 3. Sends ntfy notification to ops channel
// 4. Returns spotlight in response

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { notify } from '@/lib/notify';

const client = new Anthropic();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const {
      name,
      category,
      city,
      website,
      description,
      toolsOrigin,
      softwareSpend,
      contactName,
      contactEmail,
      hearAbout,
    } = body;

    if (!name || !category || !city || !description || !contactName || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
            content: `Write a 200-word editorial spotlight for a business listing in the Deep South Directory.

Business details:
- Name: ${name}
- Category: ${category}
- City: ${city}
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
      // Non-fatal — submission still succeeds
    }

    // Send ntfy notification to ops channel
    await notify({
      title: `New Directory Submission: ${name}`,
      message: `${category} · ${city}\nContact: ${contactName} <${contactEmail}>\nSpend: ${softwareSpend || 'not provided'}\nTools: ${toolsOrigin || 'not provided'}`,
      topic: 'ops',
      priority: 3,
      tags: ['directory', 'new-listing'],
    });

    return NextResponse.json({
      success: true,
      spotlight,
      message: 'Submission received. Spotlight generated.',
    });
  } catch (err) {
    console.error('[directory/submit] Error:', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
