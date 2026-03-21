// @ts-nocheck
/**
 * Podcast Content Engine — Generate a full content package from podcast transcripts
 *
 * Takes a podcast transcript and uses Claude to generate show notes, social media
 * posts, pull quotes, a blog draft, video clip suggestions, and SEO keywords.
 *
 * Usage:
 *   npx tsx scripts/podcast-content-engine.ts --transcript path/to/transcript.txt --episode 1 --title "How We Got Here"
 *   npx tsx scripts/podcast-content-engine.ts --transcript path/to/transcript.txt --episode 2
 *   cat transcript.txt | npx tsx scripts/podcast-content-engine.ts --episode 3
 */

import * as fs from 'fs';
import * as path from 'path';

// ── Load .env ──
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY in .env');
  process.exit(1);
}

const OUTPUT_DIR = path.resolve(__dirname, '../experiments/results/podcast-content');

// ── CLI args ──
const args = process.argv.slice(2);

function getArg(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const transcriptArg = getArg('--transcript');
const episodeNum = getArg('--episode') || '1';
const episodeTitle = getArg('--title');

// ── Read transcript ──
async function readTranscript(): Promise<string> {
  // From file path
  if (transcriptArg) {
    const resolved = path.resolve(transcriptArg);
    if (fs.existsSync(resolved)) {
      console.log(`Reading transcript from: ${resolved}`);
      return fs.readFileSync(resolved, 'utf-8');
    }
    // Could be a Google Doc ID — for now just error
    console.error(`Transcript file not found: ${resolved}`);
    console.error('Google Doc fetching is not yet implemented. Please provide a local text file.');
    process.exit(1);
  }

  // From stdin
  if (!process.stdin.isTTY) {
    console.log('Reading transcript from stdin...');
    return new Promise((resolve) => {
      let data = '';
      process.stdin.setEncoding('utf-8');
      process.stdin.on('data', (chunk) => (data += chunk));
      process.stdin.on('end', () => resolve(data));
    });
  }

  console.error('No transcript provided. Use --transcript <path> or pipe via stdin.');
  process.exit(1);
}

// ── Build the prompt ──
function buildPrompt(transcript: string): string {
  const titleContext = episodeTitle
    ? `The working title for this episode is "${episodeTitle}", but feel free to suggest a better editorial title.`
    : 'Generate an editorial title for this episode (not "Episode N" — something catchy and descriptive).';

  return `You are a content strategist for Big Muddy Media, a media company covering music, hospitality, food, and culture along the Mississippi corridor (Memphis to New Orleans). Your editorial voice is warm, music-forward, Southern but not corny — think Oxford American meets local alt-weekly.

I'm giving you a full podcast transcript. Generate a complete content package as JSON. ${titleContext}

Return ONLY valid JSON with this exact structure:

{
  "show_notes": {
    "episode_title": "string — catchy editorial title",
    "summary": "string — 3-4 sentence paragraph summarizing the episode",
    "key_topics": ["topic 1", "topic 2", "..."],
    "guests": [{"name": "string", "description": "string — brief bio/context"}],
    "notable_quotes": [{"quote": "exact quote", "speaker": "name or Unknown", "timestamp_approx": "MM:SS"}],
    "places_mentioned": [{"name": "string", "context": "string — why it came up"}]
  },
  "social_media": {
    "twitter": [
      "tweet 1 (under 280 chars, with hook, for @BigMuddyMedia)",
      "tweet 2",
      "tweet 3"
    ],
    "instagram": [
      "caption 1 (longer form, with hashtags, for carousel or reel)",
      "caption 2",
      "caption 3"
    ],
    "tiktok_hooks": [
      "first-line hook 1 (punchy, for short video)",
      "first-line hook 2"
    ],
    "linkedin": "professional angle post — hospitality, community, entrepreneurship",
    "newsletter_blurb": "2-3 paragraphs for Beehiiv email, with CTA to listen"
  },
  "pull_quotes": [
    {
      "quote": "exact quote text",
      "speaker": "name or Unknown",
      "timestamp_approx": "MM:SS",
      "visual_treatment": "suggestion like 'overlay on Blues Room photo' or 'text on river sunset B-roll'"
    }
  ],
  "blog_post": {
    "title": "SEO-optimized blog title",
    "meta_description": "under 160 chars for SEO",
    "body": "500-800 word blog post in Big Muddy editorial voice (warm, music-forward, Southern but not corny)"
  },
  "video_clips": [
    {
      "segment_description": "what happens in this clip",
      "start_approx": "MM:SS",
      "end_approx": "MM:SS",
      "caption": "suggested caption for the clip",
      "why_it_works": "emotional hook / funny moment / great quote / etc."
    }
  ],
  "seo": {
    "primary_keywords": ["keyword 1", "keyword 2"],
    "long_tail_keywords": ["longer phrase 1", "longer phrase 2"],
    "related_topics": ["topic for internal linking 1", "topic 2"]
  }
}

IMPORTANT:
- Return ONLY the JSON object, no markdown code fences, no explanation before or after.
- All quotes must be exact from the transcript.
- Pull quotes should be 5-8 of the most quotable moments.
- Video clips should be 3-5 segments.
- Twitter posts MUST be under 280 characters.
- Blog post should be 500-800 words.

Here is the full transcript:

${transcript}`;
}

// ── Call Claude API ──
async function callClaude(prompt: string): Promise<string> {
  console.log('Calling Claude API (claude-sonnet-4-20250514)...');
  const startTime = Date.now();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorBody}`);
  }

  const result = (await response.json()) as any;
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const usage = result.usage;
  console.log(`API call complete in ${elapsed}s (input: ${usage?.input_tokens || '?'} tokens, output: ${usage?.output_tokens || '?'} tokens)`);

  const text = result.content?.[0]?.text;
  if (!text) {
    throw new Error('No text content in API response');
  }

  return text;
}

// ── Main ──
async function main() {
  console.log(`\nPodcast Content Engine — Episode ${episodeNum}\n`);

  const transcript = await readTranscript();
  console.log(`Transcript length: ${transcript.length.toLocaleString()} characters\n`);

  if (transcript.trim().length < 100) {
    console.error('Transcript seems too short (under 100 characters). Aborting.');
    process.exit(1);
  }

  const prompt = buildPrompt(transcript);
  const rawResponse = await callClaude(prompt);

  // Parse the JSON response — handle possible markdown fences
  let jsonText = rawResponse.trim();
  const fenceMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    jsonText = fenceMatch[1].trim();
  }

  let contentPackage: any;
  try {
    contentPackage = JSON.parse(jsonText);
  } catch (e) {
    console.error('Failed to parse JSON response from Claude.');
    console.error('Raw response (first 500 chars):', jsonText.slice(0, 500));
    // Write raw response for debugging
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const debugPath = path.join(OUTPUT_DIR, `ep${episodeNum}-raw-response.txt`);
    fs.writeFileSync(debugPath, rawResponse);
    console.error(`Raw response saved to: ${debugPath}`);
    process.exit(1);
  }

  // Wrap with metadata
  const output = {
    meta: {
      episode: parseInt(episodeNum),
      title: contentPackage.show_notes?.episode_title || episodeTitle || `Episode ${episodeNum}`,
      generated: new Date().toISOString(),
      transcript_length: transcript.length,
      model: 'claude-sonnet-4-20250514',
    },
    ...contentPackage,
  };

  // Write output
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = path.join(OUTPUT_DIR, `ep${episodeNum}-content.json`);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  // Print summary
  console.log('\n--- Content Package Summary ---\n');
  console.log(`Episode:          ${output.meta.title}`);
  console.log(`Output:           ${outputPath}`);
  console.log('');

  const sn = contentPackage.show_notes;
  if (sn) {
    console.log(`Show Notes:`);
    console.log(`  Title:          ${sn.episode_title || '(none)'}`);
    console.log(`  Key Topics:     ${sn.key_topics?.length || 0}`);
    console.log(`  Guests:         ${sn.guests?.length || 0}`);
    console.log(`  Notable Quotes: ${sn.notable_quotes?.length || 0}`);
    console.log(`  Places:         ${sn.places_mentioned?.length || 0}`);
  }

  const sm = contentPackage.social_media;
  if (sm) {
    console.log(`Social Media:`);
    console.log(`  Twitter:        ${sm.twitter?.length || 0} posts`);
    console.log(`  Instagram:      ${sm.instagram?.length || 0} captions`);
    console.log(`  TikTok:         ${sm.tiktok_hooks?.length || 0} hooks`);
    console.log(`  LinkedIn:       ${sm.linkedin ? 'yes' : 'no'}`);
    console.log(`  Newsletter:     ${sm.newsletter_blurb ? 'yes' : 'no'}`);
  }

  console.log(`Pull Quotes:      ${contentPackage.pull_quotes?.length || 0}`);
  console.log(`Blog Post:        ${contentPackage.blog_post?.body ? `${contentPackage.blog_post.body.split(/\s+/).length} words` : 'no'}`);
  console.log(`Video Clips:      ${contentPackage.video_clips?.length || 0}`);

  const seo = contentPackage.seo;
  if (seo) {
    console.log(`SEO Keywords:`);
    console.log(`  Primary:        ${seo.primary_keywords?.length || 0}`);
    console.log(`  Long-tail:      ${seo.long_tail_keywords?.length || 0}`);
    console.log(`  Related:        ${seo.related_topics?.length || 0}`);
  }

  console.log(`\nDone. Content package written to ${outputPath}\n`);
}

main().catch((err) => {
  console.error('Fatal error:', err.message || err);
  process.exit(1);
});
