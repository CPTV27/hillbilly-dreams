#!/usr/bin/env npx tsx
/**
 * Phase 2.5 — Synology Media Bridge (daemon skeleton)
 *
 * Watches Adobe Bridge `.xmp` sidecars on the NAS mount (SMB), parses XMP/RDF for
 * ratings, labels, and keywords, and prepares rows for `VisualAsset` (or a future
 * `bridgeMetadata` JSON column — see packages/database note below).
 *
 * Run:
 *   pnpm media:synology-indexer
 *   pnpm media:synology-indexer -- --file=scripts/media/fixtures/bridge-sample.xmp
 *   SYNOLOGY_MEDIA_PATH=/Volumes/Synology/Media pnpm media:synology-indexer
 *
 * Env:
 *   SYNOLOGY_MEDIA_PATH — root to watch (default: /Volumes/Synology/Media)
 *   SYNOLOGY_INDEXER_WRITE — set to `1` when Prisma exposes a persistence field (off by default)
 *   SOVEREIGN_VERBOSE — `1` for noisy logs
 */
import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';
import { XMLParser } from 'fast-xml-parser';

// ── Types (handoff to VisualAsset / API) ─────────────────────────────

export type BridgeXmpMetadata = {
  /** Adobe star rating 0–5 (Bridge); 0 if absent */
  rating: number;
  /** Bridge color label name if present */
  label: string | null;
  /** dc:subject keywords */
  keywords: string[];
  /** Absolute path to the .xmp sidecar */
  sidecarPath: string;
  /** Best-effort sibling media path (sidecar basename without .xmp) */
  inferredMediaPath: string;
};

const NAS_MOUNT = process.env.SYNOLOGY_MEDIA_PATH || '/Volumes/Synology/Media';
const VERBOSE = process.env.SOVEREIGN_VERBOSE === '1';
const WRITE_ENABLED = process.env.SYNOLOGY_INDEXER_WRITE === '1';

function log(...args: unknown[]) {
  if (VERBOSE) console.log('[SynologyIndexer]', ...args);
}

function asArray<T>(x: T | T[] | undefined | null): T[] {
  if (x == null) return [];
  return Array.isArray(x) ? x : [x];
}

function textish(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === 'string' || typeof v === 'number') return String(v);
  if (typeof v === 'object' && v !== null && '#text' in (v as object)) {
    const t = (v as { '#text': unknown })['#text'];
    return t == null ? null : String(t);
  }
  return null;
}

function parseRating(v: unknown): number {
  const s = textish(v);
  if (s == null || s === '') return 0;
  const n = parseInt(s, 10);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(5, n);
}

/**
 * Flatten rdf:Bag / rdf:Seq rdf:li entries (Bridge keywords).
 */
function parseKeywordList(li: unknown): string[] {
  const out: string[] = [];
  for (const item of asArray(li)) {
    const t = textish(item);
    if (t && t.trim()) out.push(t.trim());
  }
  return out;
}

function descriptionsFromXmp(root: Record<string, unknown>): Record<string, unknown>[] {
  const xmpmeta =
    (root['x:xmpmeta'] as Record<string, unknown> | undefined) ||
    (root['xmpmeta'] as Record<string, unknown> | undefined);
  if (!xmpmeta) return [];

  const rdf = (xmpmeta['rdf:RDF'] as Record<string, unknown> | undefined) || xmpmeta['RDF'];
  if (!rdf || typeof rdf !== 'object') return [];

  const desc = (rdf as Record<string, unknown>)['rdf:Description'];
  return asArray(desc).filter((d): d is Record<string, unknown> => d != null && typeof d === 'object');
}

/**
 * Adobe Bridge XMP sidecar → structured metadata for downstream VisualAsset sync.
 * Handles multiple rdf:Description blocks and typical fast-xml-parser shapes.
 */
export function extractBridgeXmp(xmpContent: string, sidecarPath: string): BridgeXmpMetadata {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    trimValues: true,
  });

  const root = parser.parse(xmpContent) as Record<string, unknown>;
  const descriptions = descriptionsFromXmp(root);

  let rating = 0;
  let label: string | null = null;
  const keywords: string[] = [];

  for (const d of descriptions) {
    const r = parseRating(d['xmp:Rating']);
    if (r > rating) rating = r;

    const lab = textish(d['xmp:Label']);
    if (lab && !label) label = lab;

    const subj = d['dc:subject'] as Record<string, unknown> | undefined;
    if (subj && typeof subj === 'object') {
      const bag = subj['rdf:Bag'] || subj['rdf:Seq'];
      if (bag && typeof bag === 'object') {
        const li = (bag as Record<string, unknown>)['rdf:li'];
        keywords.push(...parseKeywordList(li));
      }
    }
  }

  const base = path.basename(sidecarPath, '.xmp');
  const inferredMediaPath = path.join(path.dirname(sidecarPath), base);

  return {
    rating,
    label,
    keywords: [...new Set(keywords)],
    sidecarPath,
    inferredMediaPath,
  };
}

/**
 * Persist to DB when schema supports it.
 *
 * TODAY: `VisualAsset` only has jobId, URLs, timestamps — no XMP/Bridge fields.
 * When CC unblocks migrations, prefer e.g. `bridgeMetadata Json` on VisualAsset
 * or a dedicated `NasMediaIndex` row keyed by `inferredMediaPath` or content hash.
 */
export async function persistBridgeMetadata(meta: BridgeXmpMetadata): Promise<void> {
  if (!WRITE_ENABLED) {
    log('SYNOLOGY_INDEXER_WRITE not set — skipping Prisma (skeleton).', meta.sidecarPath);
    return;
  }
  // import { prisma } from '@bigmuddy/database';
  // await prisma.visualAsset.updateMany({ where: { ... }, data: { bridgeMetadata: meta } });
  console.warn('[SynologyIndexer] WRITE_ENABLED but no Prisma field wired yet — no-op.');
}

export class SynologyBridgeDaemon {
  private watchRoot: string;

  constructor(watchRoot: string) {
    this.watchRoot = watchRoot;
  }

  async processSidecar(filePath: string): Promise<BridgeXmpMetadata | null> {
    try {
      console.log(`[SynologyIndexer] XMP: ${path.basename(filePath)}`);
      const xmpText = fs.readFileSync(filePath, 'utf-8');
      const meta = extractBridgeXmp(xmpText, path.resolve(filePath));
      console.log(
        `[SynologyIndexer] rating=${meta.rating} label=${meta.label ?? '—'} keywords=${meta.keywords.length} media→ ${path.basename(meta.inferredMediaPath)}`
      );
      await persistBridgeMetadata(meta);
      return meta;
    } catch (err) {
      console.error(`[SynologyIndexer] parse failed: ${filePath}`, err);
      return null;
    }
  }

  listen(): void {
    let root = this.watchRoot;
    if (!fs.existsSync(root)) {
      console.warn(`[SynologyIndexer] Mount missing: ${root} — using repo tmp stub.`);
      root = path.join(process.cwd(), 'tmp', 'Synology', 'Media');
      fs.mkdirSync(root, { recursive: true });
    }

    console.log(`[SynologyIndexer] watching: ${root}`);

    const watcher = chokidar.watch(root, {
      persistent: true,
      ignored: /(^|[/\\])\../,
      awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 },
    });

    const onXmp = (fp: string) => {
      if (fp.toLowerCase().endsWith('.xmp')) void this.processSidecar(fp);
    };
    watcher.on('add', onXmp);
    watcher.on('change', onXmp);
  }
}

function parseArgs() {
  const argv = process.argv.slice(2).filter((a) => a !== '--');
  const fileArg = argv.find((a) => a.startsWith('--file='))?.slice('--file='.length);
  return { file: fileArg };
}

async function main() {
  const { file } = parseArgs();
  const daemon = new SynologyBridgeDaemon(NAS_MOUNT);

  if (file) {
    const resolved = path.resolve(file);
    if (!fs.existsSync(resolved)) {
      console.error(`File not found: ${resolved}`);
      process.exit(1);
    }
    await daemon.processSidecar(resolved);
    process.exit(0);
  }

  daemon.listen();
}

void main();
