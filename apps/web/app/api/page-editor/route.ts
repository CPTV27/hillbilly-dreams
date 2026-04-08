import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Map of image IDs to their location in source files
const IMAGE_MAP: Record<string, { file: string; pattern: string }> = {
  // Entertainment page
  'ent-hero': { file: 'app/entertainment/page.tsx', pattern: '/images/corridor/natchez-bluff-river-view.webp' },
  'ent-touring': { file: 'app/entertainment/page.tsx', pattern: '/images/corridor/street-musician-guitar.webp' },
  'ent-houseband': { file: 'app/entertainment/page.tsx', pattern: '/images/corridor/guitarist-chandelier-venue.webp' },
  'ent-records': { file: 'app/entertainment/page.tsx', pattern: '/images/studio-c/utopiademo-day-2.webp' },
  'ent-radio': { file: 'app/entertainment/page.tsx', pattern: '/images/corridor/natchez-night-lounge.webp' },
  'ent-magazine': { file: 'app/entertainment/page.tsx', pattern: '/images/processed/big-muddy/natchez-brick-street-live-oaks.webp' },
  'ent-arrie': { file: 'app/entertainment/page.tsx', pattern: '/images/processed/arrie-aslin-inn-portrait.webp' },
  'ent-closing': { file: 'app/entertainment/page.tsx', pattern: '/images/dsd/mississippi-sunset.webp' },
  // Rea page
  'rea-hero': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/corridor/natchez-bluff-river-view.webp' },
  'rea-town': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/corridor/victorian-mansion-natchez.webp' },
  'rea-touring': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/corridor/street-musician-guitar.webp' },
  'rea-records': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/studio-c/utopiademo-day-2.webp' },
  'rea-radio': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/corridor/natchez-night-lounge.webp' },
  'rea-magazine': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/corridor/historic-home-natchez.webp' },
  'rea-studio': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/studio-c/utopiademo-day-30.webp' },
  'rea-houseband': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/corridor/drummer-pearl-kit.webp' },
  'rea-space': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/processed/bearsville/theater-show-01.webp' },
  'rea-closing': { file: 'app/entertainment/raya/page.tsx', pattern: '/images/dsd/mississippi-sunset.webp' },
};

export async function POST(req: NextRequest) {
  try {
    // This endpoint only works in local dev — filesystem writes are not possible on Vercel
    if (process.env.VERCEL) {
      return NextResponse.json({ error: 'Page editor only works in local development' }, { status: 403 });
    }

    const { overrides } = await req.json() as { overrides: Record<string, string> };

    if (!overrides || typeof overrides !== 'object') {
      return NextResponse.json({ error: 'Invalid overrides' }, { status: 400 });
    }

    const changes: string[] = [];
    const fileChanges: Record<string, { from: string; to: string }[]> = {};

    for (const [imageId, newUrl] of Object.entries(overrides)) {
      const mapping = IMAGE_MAP[imageId];
      if (!mapping) continue;

      if (!fileChanges[mapping.file]) fileChanges[mapping.file] = [];
      fileChanges[mapping.file].push({ from: mapping.pattern, to: newUrl });
    }

    for (const [file, replacements] of Object.entries(fileChanges)) {
      const filePath = path.join(process.cwd(), file);

      if (!fs.existsSync(filePath)) {
        changes.push(`SKIP: ${file} not found`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');

      for (const { from, to } of replacements) {
        if (content.includes(from)) {
          content = content.replace(from, to);
          changes.push(`OK: ${file} — replaced ${from} with ${to}`);

          // Update the IMAGE_MAP pattern so subsequent edits work
          const mapEntry = Object.entries(IMAGE_MAP).find(([, v]) => v.file === file && v.pattern === from);
          if (mapEntry) {
            IMAGE_MAP[mapEntry[0]].pattern = to;
          }
        } else {
          changes.push(`WARN: ${from} not found in ${file}`);
        }
      }

      fs.writeFileSync(filePath, content, 'utf8');
    }

    return NextResponse.json({ success: true, changes });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
