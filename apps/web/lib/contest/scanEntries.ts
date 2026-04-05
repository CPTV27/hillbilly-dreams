import fs from 'fs';
import path from 'path';
// Lazy-load DOMPurify to avoid jsdom loading default-stylesheet.css at webpack build time
let _purify: typeof import('isomorphic-dompurify').default | null = null;
function getPurify() {
  if (!_purify) {
    // Runtime require keeps isomorphic-dompurify (and jsdom CSS) out of the static webpack graph.
    _purify = require('isomorphic-dompurify').default || require('isomorphic-dompurify');
  }
  return _purify;
}

export const CONTEST_TRACKS = [
  {
    id: 'parent',
    experimentDir: '00_Parent_Hillbilly_Dreams',
    title: 'Hillbilly Dreams (Parent)',
    subtitle: 'Holding company · sovereign infrastructure narrative',
  },
  {
    id: 'dsd',
    experimentDir: '01_DSD_Intelligence',
    title: 'DSD Intelligence',
    subtitle: 'Deep South Directory · local-first clearinghouse',
  },
  {
    id: 'muddy',
    experimentDir: '02_Big_Muddy_Signal',
    title: 'Big Muddy Signal',
    subtitle: 'Radio · Inn · neon delta culture',
  },
  {
    id: 'utility',
    experimentDir: '03_Better_Things_Utility',
    title: 'Better Things Utility',
    subtitle: 'Operator tier · measurably better mainspring',
  },
  {
    id: 'oe',
    experimentDir: '04_Outsider_Economics_Manual',
    title: 'Outsider Economics Manual',
    subtitle: 'Sovereign Scholar · book → Lore task → credits',
  },
] as const;

export type ContestTrackId = (typeof CONTEST_TRACKS)[number]['id'];

export type ContestImage = { url: string; name: string };

export type ContestSnippet = {
  name: string;
  kind: 'html' | 'md';
  previewHtml: string | null;
  rawLength: number;
};

export type ContestTrackPayload = {
  id: ContestTrackId;
  title: string;
  subtitle: string;
  experimentDir: string;
  briefExists: boolean;
  images: ContestImage[];
  snippets: ContestSnippet[];
};

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;
const HTML_EXT = /\.html?$/i;
const MD_EXT = /\.md$/i;

function getAppsWebRoot(): string {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'next.config.mjs')) || fs.existsSync(path.join(cwd, 'next.config.js'))) {
    return cwd;
  }
  const nested = path.join(cwd, 'apps', 'web');
  if (fs.existsSync(path.join(nested, 'package.json'))) return nested;
  return cwd;
}

function getRepoRoot(): string {
  return path.resolve(getAppsWebRoot(), '..', '..');
}

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).map((d) => d.name);
  } catch {
    return [];
  }
}

function listImagesInDir(absDir: string, publicUrlBase: string): ContestImage[] {
  const names = safeReadDir(absDir).filter((n) => IMAGE_EXT.test(n));
  return names.sort().map((name) => ({ name, url: `${publicUrlBase}/${encodeURIComponent(name)}` }));
}

function snippetFromFile(absPath: string, name: string): ContestSnippet {
  const raw = fs.readFileSync(absPath, 'utf8');
  const rawLength = raw.length;
  if (HTML_EXT.test(name)) {
    const purify = getPurify();
    const clean = purify ? purify.sanitize(raw, { WHOLE_DOCUMENT: true }) : raw;
    return { name, kind: 'html', previewHtml: clean || null, rawLength };
  }
  if (MD_EXT.test(name)) {
    const purify = getPurify();
    const escaped = purify ? purify.sanitize(raw.slice(0, 12000), { ALLOWED_TAGS: [] }) : raw.slice(0, 12000);
    const wrapped = `<pre style="white-space:pre-wrap;font:inherit;margin:0">${escaped}</pre>`;
    return { name, kind: 'md', previewHtml: wrapped, rawLength };
  }
  return { name, kind: 'md', previewHtml: null, rawLength };
}

/**
 * Scans `public/contest/{trackId}/` and `experiments/design-contest/{experimentDir}/`.
 * Dynamic: refresh on navigation (force-dynamic page).
 */
export function scanContestEntries(): ContestTrackPayload[] {
  const webRoot = getAppsWebRoot();
  const repoRoot = getRepoRoot();
  const experimentRoot = path.join(repoRoot, 'experiments', 'design-contest');

  return CONTEST_TRACKS.map((t) => {
    const contestDir = path.join(webRoot, 'public', 'contest', t.id);
    const images = listImagesInDir(contestDir, `/contest/${t.id}`);

    const expDir = path.join(experimentRoot, t.experimentDir);
    const briefExists = fs.existsSync(path.join(expDir, 'PROMPT_BRIEF.md'));

    const snippets: ContestSnippet[] = [];
    for (const name of safeReadDir(expDir)) {
      if (HTML_EXT.test(name) || MD_EXT.test(name)) {
        try {
          snippets.push(snippetFromFile(path.join(expDir, name), name));
        } catch {
          snippets.push({ name, kind: MD_EXT.test(name) ? 'md' : 'html', previewHtml: null, rawLength: 0 });
        }
      }
    }
    snippets.sort((a, b) => a.name.localeCompare(b.name));

    return {
      id: t.id,
      title: t.title,
      subtitle: t.subtitle,
      experimentDir: t.experimentDir,
      briefExists,
      images,
      snippets,
    };
  });
}
