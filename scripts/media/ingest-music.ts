/**
 * MelodyVault Ingestion Script
 *
 * Reads the music library from T7 drive, extracts metadata,
 * uploads to GCS, and creates Artist + Track + Split records.
 *
 * Music directory: /Volumes/T7/Plex-Media/Music/
 * Structure: Artist/Album/Track.mp3
 *
 * Run from Mac Mini: npx tsx scripts/media/ingest-music.ts
 * Requires: ffprobe (metadata), gsutil (upload), database connection
 */

import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';

const prisma = new PrismaClient();

const MUSIC_ROOT = '/Volumes/T7/Plex-Media/Music';
const GCS_BUCKET = 'gs://bmt-media-bigmuddy';
const GCS_PREFIX = 'music';
const GCS_PUBLIC = 'https://storage.googleapis.com/bmt-media-bigmuddy';
const AUDIO_EXTENSIONS = ['.mp3', '.flac', '.wav', '.m4a', '.aac'];

// Artist metadata (hardcoded for our 3 artists — expand as needed)
const ARTIST_META: Record<string, { genre: string; city: string; state: string; bio: string; source: string; status: string }> = {
  'Amy Allen': {
    genre: 'folk',
    city: 'Natchez',
    state: 'MS',
    bio: 'Amy Allen is an equity partner in Hillbilly Dreams Inc and the voice of Big Muddy Radio Singles. Her music blends folk, country, and Southern soul.',
    source: 'rise-up',
    status: 'touring',
  },
  'Chase Pierson': {
    genre: 'country',
    city: 'Natchez',
    state: 'MS',
    bio: 'Chase Pierson is the CEO/CTO of Hillbilly Dreams Inc. His rough mixes are raw country-rock recorded at the Big Muddy Inn.',
    source: 'rise-up',
    status: 'showcasing',
  },
  'Mechanical Bull': {
    genre: 'rock',
    city: 'Natchez',
    state: 'MS',
    bio: 'Mechanical Bull is Chase Pierson\'s band project. Three albums spanning outlaw country, Memphis soul, and Stax-influenced rock.',
    source: 'rise-up',
    status: 'showcasing',
  },
};

interface TrackMetadata {
  duration: number; // seconds
  bitrate: number;
  sampleRate: number;
  channels: number;
  format: string;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getTrackMetadata(filePath: string): TrackMetadata | null {
  try {
    const output = execSync(
      `ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`,
      { encoding: 'utf8', timeout: 10000 }
    );
    const data = JSON.parse(output);
    const format = data.format || {};
    const audioStream = (data.streams || []).find((s: { codec_type: string }) => s.codec_type === 'audio') || {};

    return {
      duration: Math.round(parseFloat(format.duration || '0')),
      bitrate: Math.round(parseInt(format.bit_rate || '0', 10) / 1000),
      sampleRate: parseInt(audioStream.sample_rate || '0', 10),
      channels: parseInt(audioStream.channels || '0', 10),
      format: format.format_name || 'unknown',
    };
  } catch (e) {
    console.error(`  ⚠️  ffprobe failed for ${basename(filePath)}`);
    return null;
  }
}

function uploadToGCS(filePath: string, gcsPath: string): string | null {
  try {
    execSync(`gsutil -q cp "${filePath}" "${GCS_BUCKET}/${gcsPath}"`, { timeout: 60000 });
    return `${GCS_PUBLIC}/${gcsPath}`;
  } catch (e) {
    console.error(`  ⚠️  GCS upload failed for ${basename(filePath)}`);
    return null;
  }
}

async function upsertArtist(name: string): Promise<number> {
  const slug = slugify(name);
  const meta = ARTIST_META[name] || {
    genre: 'other',
    city: 'Natchez',
    state: 'MS',
    bio: `${name} — artist on the Big Muddy Records roster.`,
    source: 'submitted',
    status: 'discovered',
  };

  const existing = await prisma.artist.findUnique({ where: { slug } });
  if (existing) return existing.id;

  const artist = await prisma.artist.create({
    data: {
      name,
      slug,
      genre: meta.genre,
      city: meta.city,
      state: meta.state,
      bio: meta.bio,
      source: meta.source,
      status: meta.status,
    },
  });
  console.log(`  🎤 Created artist: ${name} (id: ${artist.id})`);
  return artist.id;
}

async function upsertTrack(
  artistId: number,
  artistName: string,
  albumTitle: string,
  title: string,
  filePath: string,
): Promise<boolean> {
  const slug = slugify(`${artistName}-${title}`);

  // Check if already exists
  const existing = await prisma.track.findUnique({ where: { slug } });
  if (existing) return false;

  // Get metadata
  const meta = getTrackMetadata(filePath);

  // Upload to GCS
  const ext = extname(filePath);
  const gcsPath = `${GCS_PREFIX}/${slugify(artistName)}/${slugify(albumTitle)}/${slugify(title)}${ext}`;
  const audioUrl = uploadToGCS(filePath, gcsPath);

  // Determine mood from title (basic heuristic — Gemini AI analysis is Phase 2)
  let mood = 'warm';
  const titleLower = title.toLowerCase();
  if (titleLower.includes('sad') || titleLower.includes('alone') || titleLower.includes('cry')) mood = 'melancholic';
  if (titleLower.includes('party') || titleLower.includes('highway') || titleLower.includes('shake')) mood = 'energetic';
  if (titleLower.includes('love') || titleLower.includes('baby') || titleLower.includes('heart')) mood = 'warm';
  if (titleLower.includes('fire') || titleLower.includes('fight') || titleLower.includes('eye')) mood = 'intense';

  await prisma.track.create({
    data: {
      title,
      slug,
      artistId,
      albumTitle,
      duration: meta?.duration || null,
      genre: ARTIST_META[artistName]?.genre || 'other',
      mood,
      audioUrl,
      metadata: {
        bitrate: meta?.bitrate,
        sampleRate: meta?.sampleRate,
        channels: meta?.channels,
        format: meta?.format,
        originalFile: basename(filePath),
        ingestedAt: new Date().toISOString(),
      },
      status: 'active',
    },
  });

  return true;
}

async function createDefaultSplits(artistId: number, artistName: string) {
  // Check if splits already exist for this artist's tracks
  const tracks = await prisma.track.findMany({
    where: { artistId },
    select: { id: true, splits: { select: { id: true } } },
  });

  for (const track of tracks) {
    if (track.splits.length > 0) continue;

    // Default split: 80% artist, 15% label (BMR), 5% platform
    await prisma.split.createMany({
      data: [
        { trackId: track.id, name: artistName, role: 'artist', sharePercent: 80 },
        { trackId: track.id, name: 'Big Muddy Records', role: 'label', sharePercent: 15 },
        { trackId: track.id, name: 'Platform', role: 'distributor', sharePercent: 5 },
      ],
    });
  }
}

async function main() {
  console.log('🎵 MelodyVault Ingestion Script');
  console.log('='.repeat(60));
  console.log(`Music root: ${MUSIC_ROOT}`);
  console.log();

  if (!existsSync(MUSIC_ROOT)) {
    console.error(`❌ Music directory not found: ${MUSIC_ROOT}`);
    console.error('   Make sure the T7 drive is mounted.');
    process.exit(1);
  }

  let totalArtists = 0;
  let totalTracks = 0;
  let skipped = 0;
  let uploaded = 0;

  // Scan artist directories
  const artistDirs = readdirSync(MUSIC_ROOT)
    .filter(d => !d.startsWith('.') && !d.startsWith('_'))
    .filter(d => statSync(join(MUSIC_ROOT, d)).isDirectory());

  for (const artistDir of artistDirs) {
    const artistName = artistDir;
    const artistPath = join(MUSIC_ROOT, artistDir);
    console.log(`\n📂 ${artistName}`);

    const artistId = await upsertArtist(artistName);
    totalArtists++;

    // Scan album directories
    const albumDirs = readdirSync(artistPath)
      .filter(d => !d.startsWith('.') && !d.startsWith('_'))
      .filter(d => statSync(join(artistPath, d)).isDirectory());

    for (const albumDir of albumDirs) {
      const albumPath = join(artistPath, albumDir);
      console.log(`  📀 ${albumDir}`);

      // Scan tracks
      const trackFiles = readdirSync(albumPath)
        .filter(f => !f.startsWith('.') && !f.startsWith('_'))
        .filter(f => AUDIO_EXTENSIONS.includes(extname(f).toLowerCase()));

      for (const trackFile of trackFiles) {
        const trackPath = join(albumPath, trackFile);
        const trackTitle = basename(trackFile, extname(trackFile));

        const isNew = await upsertTrack(artistId, artistName, albumDir, trackTitle, trackPath);
        if (isNew) {
          totalTracks++;
          uploaded++;
          console.log(`    🎶 ${trackTitle}`);
        } else {
          skipped++;
        }
      }
    }

    // Create default splits
    await createDefaultSplits(artistId, artistName);
  }

  // Log the ingestion
  await prisma.melodyVaultLog.create({
    data: {
      flowName: 'ingest-music',
      triggerEvent: 'manual',
      actionTaken: `Ingested ${totalTracks} tracks from ${totalArtists} artists. Skipped ${skipped}. Uploaded ${uploaded} to GCS.`,
      status: 'success',
    },
  });

  // Print summary
  const dbArtists = await prisma.artist.count();
  const dbTracks = await prisma.track.count();
  const dbSplits = await prisma.split.count();

  console.log('\n' + '='.repeat(60));
  console.log('✅ MelodyVault Ingestion Complete');
  console.log(`   Artists: ${totalArtists} processed (${dbArtists} in DB)`);
  console.log(`   Tracks: ${totalTracks} new, ${skipped} skipped (${dbTracks} in DB)`);
  console.log(`   Splits: ${dbSplits} in DB`);
  console.log(`   Uploaded: ${uploaded} files to GCS`);
  console.log('='.repeat(60));

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Fatal:', e);
  process.exit(1);
});
