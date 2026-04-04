import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';
import { ChromaClient, type Collection } from 'chromadb';
import pdfParseDefault from 'pdf-parse';

const WATCH_DIR = process.env.DEEP_LORE_PATH || path.join(process.cwd(), '..', '..', 'DeepLore', 'Inbox');
const CHROMA_URL = 'http://localhost:8000';

/** Untyped default export from `pdf-parse` — contract we rely on for lore ingestion. */
export interface PdfParsePageText {
  text: string;
}

type PdfParseFn = (dataBuffer: Buffer) => Promise<PdfParsePageText>;

const pdfParse = pdfParseDefault as PdfParseFn;

const client = new ChromaClient({ path: CHROMA_URL });

export type LoreCollectionName = 'lore_manuals' | 'lore_journals' | 'lore_sops';

export type LoreCollections = Record<LoreCollectionName, Collection>;

export interface LoreChunkMetadata {
  source: string;
  chunkIndex: number;
}

async function initCollections(): Promise<LoreCollections> {
  console.log('Initializing Chroma Collections...');
  const collections = {} as LoreCollections;

  collections.lore_manuals = await client.getOrCreateCollection({ name: 'lore_manuals' });
  collections.lore_journals = await client.getOrCreateCollection({ name: 'lore_journals' });
  collections.lore_sops = await client.getOrCreateCollection({ name: 'lore_sops' });

  return collections;
}

// High-Memory Chunking (32GB M1 Mainframe): split by paragraphs and group into ~4096 char chunks with deep overlap
function semanticChunk(text: string): string[] {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks: string[] = [];
  let currentChunk = '';
  
  for (const p of paragraphs) {
    if (currentChunk.length + p.length > 4096) {
      if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
      // Start new chunk with trailing overlap (increased to 50 words for dense context)
      const words = currentChunk.split(' ');
      const overlap = words.slice(Math.max(words.length - 50, 0)).join(' ');
      currentChunk = overlap + '\n\n' + p;
    } else {
      currentChunk += '\n\n' + p;
    }
  }
  if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
  return chunks;
}

async function processFile(filePath: string, collections: LoreCollections): Promise<void> {
  console.log(`\nNew Lore Detected: ${path.basename(filePath)}`);
  
  const ext = path.extname(filePath).toLowerCase();
  let text = '';
  
  try {
    if (ext === '.pdf') {
      console.log('Digestion 20%... Parsing PDF');
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (ext === '.md' || ext === '.txt') {
      console.log('Digestion 20%... Reading Text');
      text = fs.readFileSync(filePath, 'utf-8');
    } else {
      console.log(`Skipping unsupported format: ${ext}`);
      return;
    }

    console.log('Digestion 40%... Chunking Content');
    const chunks = semanticChunk(text);
    
    // Determine Namespace
    // Simple heuristic: if it says "manual" or "guide" in title -> manual. If "journal" -> journal. Else Sops.
    const filename = path.basename(filePath).toLowerCase();
    let namespace: LoreCollectionName = 'lore_sops';
    if (filename.includes('manual') || filename.includes('guide') || filename.includes('spec')) {
      namespace = 'lore_manuals';
    } else if (filename.includes('journal') || filename.includes('log') || filename.includes('diary')) {
      namespace = 'lore_journals';
    }

    console.log(`Digestion 60%... Embedding ${chunks.length} chunks into [${namespace}]`);
    const collection = collections[namespace];

    const ids = chunks.map((_, i) => `${filename}_chunk_${i}`);
    const metadatas: LoreChunkMetadata[] = chunks.map((_, i) => ({ source: filename, chunkIndex: i }));
    const documents = chunks;

    if (chunks.length > 0) {
      // NOTE: We rely on ChromaDb's Default Embedding Function (all-MiniLM-L6-v2) for pure local execution!
      await collection.upsert({
        ids,
        metadatas,
        documents
      });
      console.log(`Digestion 100%... Lore Integrated. Expected Collection Size: ${(await collection.count())}`);
    }

  } catch (err: unknown) {
    const fn = path.basename(filePath).toLowerCase();
    console.error(`ERROR Digesting ${fn}:`, err instanceof Error ? err : String(err));
  }
}

async function main() {
  // Ensure watch dir exists
  if (!fs.existsSync(WATCH_DIR)) {
    fs.mkdirSync(WATCH_DIR, { recursive: true });
  }

  const collections = await initCollections();

  console.log(`Sovereign Ambient Watcher active. Monitoring ${WATCH_DIR}...`);
  const watcher = chokidar.watch(WATCH_DIR, {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  });

  watcher.on('add', async (filePath: string) => {
    // Prevent locking issues by waiting a tick
    await new Promise(r => setTimeout(r, 500));
    await processFile(filePath, collections);
  });
}

main().catch(console.error);
