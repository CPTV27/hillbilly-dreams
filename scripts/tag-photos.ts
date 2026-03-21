#!/usr/bin/env npx tsx
/**
 * Photo Tagger — EXIF metadata + AI vision tagging for corridor photos
 *
 * Reads EXIF data (GPS, orientation, date, camera) and uses Claude's vision
 * to generate semantic tags, descriptions, and alt text for each image.
 *
 * Usage:
 *   npx tsx scripts/tag-photos.ts                          # Tag all corridor photos
 *   npx tsx scripts/tag-photos.ts --dir images/portraits   # Tag specific directory
 *   npx tsx scripts/tag-photos.ts --fix-orientation        # Also fix rotated images
 *   npx tsx scripts/tag-photos.ts --output tags.json       # Custom output file
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_DIR = path.resolve(__dirname, '../apps/web/public');
const DEFAULT_DIR = 'images/corridor';
const DEFAULT_OUTPUT = path.resolve(__dirname, '../experiments/results/photo-tags.json');

// ── CLI args ──
const args = process.argv.slice(2);
const dirArg = args.find((_, i) => args[i - 1] === '--dir') || DEFAULT_DIR;
const outputArg = args.find((_, i) => args[i - 1] === '--output') || DEFAULT_OUTPUT;
const fixOrientation = args.includes('--fix-orientation');
const targetDir = path.join(PUBLIC_DIR, dirArg);

interface PhotoTag {
  filename: string;
  path: string;
  size_kb: number;
  exif: {
    date?: string;
    camera?: string;
    lens?: string;
    gps_lat?: number;
    gps_lon?: number;
    orientation?: number;
    width?: number;
    height?: number;
    iso?: number;
    aperture?: string;
    shutter_speed?: string;
  };
  tags: string[];
  scene: string;
  suggested_alt: string;
  suggested_name?: string;
  orientation_issue: boolean;
}

function getExifData(filePath: string): PhotoTag['exif'] {
  try {
    // Use exiftool if available, fall back to identify
    const raw = execSync(
      `exiftool -json -DateTimeOriginal -Model -LensModel -GPSLatitude -GPSLongitude -Orientation -ImageWidth -ImageHeight -ISO -FNumber -ExposureTime "${filePath}" 2>/dev/null`,
      { encoding: 'utf-8', timeout: 10000 }
    );
    const data = JSON.parse(raw)[0];
    return {
      date: data.DateTimeOriginal || undefined,
      camera: data.Model || undefined,
      lens: data.LensModel || undefined,
      gps_lat: data.GPSLatitude ? parseFloat(String(data.GPSLatitude)) : undefined,
      gps_lon: data.GPSLongitude ? parseFloat(String(data.GPSLongitude)) : undefined,
      orientation: data.Orientation ? parseInt(String(data.Orientation)) : undefined,
      width: data.ImageWidth ? parseInt(String(data.ImageWidth)) : undefined,
      height: data.ImageHeight ? parseInt(String(data.ImageHeight)) : undefined,
      iso: data.ISO ? parseInt(String(data.ISO)) : undefined,
      aperture: data.FNumber || undefined,
      shutter_speed: data.ExposureTime || undefined,
    };
  } catch {
    // Try with sips (macOS built-in)
    try {
      const width = execSync(`sips -g pixelWidth "${filePath}" 2>/dev/null | tail -1 | awk '{print $2}'`, { encoding: 'utf-8' }).trim();
      const height = execSync(`sips -g pixelHeight "${filePath}" 2>/dev/null | tail -1 | awk '{print $2}'`, { encoding: 'utf-8' }).trim();
      return {
        width: parseInt(width) || undefined,
        height: parseInt(height) || undefined,
      };
    } catch {
      return {};
    }
  }
}

function detectOrientationIssue(exif: PhotoTag['exif']): boolean {
  if (!exif.width || !exif.height) return false;
  // Portrait orientation in a landscape context is suspicious for web hero images
  // Also check EXIF orientation tag (6 or 8 = rotated 90/270)
  if (exif.orientation && [6, 8].includes(exif.orientation)) return true;
  // If width < height significantly, it's portrait — might be wrong for a web banner
  if (exif.height > exif.width * 1.3) return true;
  return false;
}

function fixImageOrientation(filePath: string): void {
  try {
    // Use sips to auto-rotate based on EXIF orientation
    execSync(`sips --rotate 0 "${filePath}" 2>/dev/null`, { timeout: 10000 });
    console.log(`  ↻ Fixed orientation: ${path.basename(filePath)}`);
  } catch {
    console.log(`  ⚠ Could not fix orientation: ${path.basename(filePath)}`);
  }
}

async function tagWithVision(filePath: string): Promise<{ tags: string[]; scene: string; suggested_alt: string; suggested_name: string }> {
  // Check if we have Anthropic API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Fall back to filename-based tagging
    return tagFromFilename(filePath);
  }

  try {
    const imageData = fs.readFileSync(filePath);
    const base64 = imageData.toString('base64');
    const ext = path.extname(filePath).toLowerCase();
    const mediaType = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            {
              type: 'text',
              text: `Analyze this photo for a travel/editorial website about the Mississippi corridor (Memphis to New Orleans). Return JSON only:
{"tags": ["tag1", "tag2", ...], "scene": "one sentence description", "suggested_alt": "accessible alt text for web", "suggested_name": "kebab-case-descriptive-filename"}
Tags should include: subject, location type, time of day, mood, architectural style if relevant. Keep it factual.`,
            },
          ],
        }],
      }),
    });

    const result = await response.json() as any;
    const text = result.content?.[0]?.text || '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.log(`  ⚠ Vision API failed for ${path.basename(filePath)}: ${e}`);
  }

  return tagFromFilename(filePath);
}

function tagFromFilename(filePath: string): { tags: string[]; scene: string; suggested_alt: string; suggested_name: string } {
  const name = path.basename(filePath, path.extname(filePath));
  const tags: string[] = ['corridor', 'editorial'];

  // Extract clues from filename
  if (name.includes('natchez')) tags.push('natchez');
  if (name.includes('oceansprings') || name.includes('ocean-springs')) tags.push('ocean-springs');
  if (name.includes('night') || name.includes('neon')) tags.push('nighttime');
  if (name.includes('river') || name.includes('bluff')) tags.push('mississippi-river');
  if (name.includes('inn') || name.includes('hotel') || name.includes('mansion')) tags.push('lodging');
  if (name.includes('music') || name.includes('guitar') || name.includes('blues')) tags.push('music');
  if (name.includes('food') || name.includes('cafe') || name.includes('restaurant')) tags.push('food');
  if (name.includes('porch') || name.includes('victorian') || name.includes('craftsman')) tags.push('architecture');

  return {
    tags,
    scene: `Editorial photo from the Mississippi corridor: ${name}`,
    suggested_alt: `Photo from the Mississippi corridor — ${name.replace(/-/g, ' ')}`,
    suggested_name: name,
  };
}

async function main() {
  console.log(`\n📷 Photo Tagger — ${targetDir}\n`);

  if (!fs.existsSync(targetDir)) {
    console.error(`Directory not found: ${targetDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(targetDir)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .sort();

  console.log(`Found ${files.length} images\n`);

  const results: PhotoTag[] = [];
  let orientationIssues = 0;
  let tagged = 0;

  for (const file of files) {
    const filePath = path.join(targetDir, file);
    const stat = fs.statSync(filePath);
    const sizeKb = Math.round(stat.size / 1024);

    process.stdout.write(`  [${++tagged}/${files.length}] ${file} (${sizeKb}KB)...`);

    // Get EXIF metadata
    const exif = getExifData(filePath);
    const orientationIssue = detectOrientationIssue(exif);

    if (orientationIssue) {
      orientationIssues++;
      process.stdout.write(' ⚠️ ORIENTATION');
      if (fixOrientation) {
        fixImageOrientation(filePath);
      }
    }

    // Get vision tags (uses API if available, filename heuristics otherwise)
    const vision = await tagWithVision(filePath);

    const tag: PhotoTag = {
      filename: file,
      path: `/${dirArg}/${file}`,
      size_kb: sizeKb,
      exif,
      tags: vision.tags,
      scene: vision.scene,
      suggested_alt: vision.suggested_alt,
      suggested_name: vision.suggested_name,
      orientation_issue: orientationIssue,
    };

    results.push(tag);
    console.log(` → ${vision.tags.slice(0, 4).join(', ')}`);
  }

  // Write results
  const output = {
    generated: new Date().toISOString(),
    directory: dirArg,
    total_images: results.length,
    orientation_issues: orientationIssues,
    total_size_mb: Math.round(results.reduce((sum, r) => sum + r.size_kb, 0) / 1024),
    tags_index: buildTagIndex(results),
    images: results,
  };

  fs.mkdirSync(path.dirname(outputArg), { recursive: true });
  fs.writeFileSync(outputArg, JSON.stringify(output, null, 2));

  console.log(`\n✅ Tagged ${results.length} images`);
  console.log(`⚠️  ${orientationIssues} orientation issues found`);
  console.log(`📁 Results: ${outputArg}\n`);

  // Print tag summary
  const tagIndex = output.tags_index as Record<string, number>;
  console.log('Tag frequency:');
  Object.entries(tagIndex)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .forEach(([tag, count]) => console.log(`  ${tag}: ${count}`));
}

function buildTagIndex(results: PhotoTag[]): Record<string, number> {
  const index: Record<string, number> = {};
  for (const r of results) {
    for (const tag of r.tags) {
      index[tag] = (index[tag] || 0) + 1;
    }
  }
  return index;
}

main().catch(console.error);
