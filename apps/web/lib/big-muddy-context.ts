// apps/web/lib/big-muddy-context.ts
//
// Big Muddy assistant — context loader
//
// Loads the canonical Big Muddy / MBT docs at request time and assembles
// a single system prompt the chat endpoint hands to Claude. Cached in
// memory for 5 minutes so we are not re-reading 5 files per turn while
// developing locally.
//
// Open Notebook backend integration is deferred (per Chase 2026-04-29) —
// once it ships, this module will fetch from the Notebook API instead of
// reading from disk. The shape of `loadBigMuddyContext()` will not change.

import { promises as fs } from 'fs';
import path from 'path';

const REPO_ROOT = path.resolve(process.cwd(), '..', '..');

// Doc paths are relative to repo root. If a file is missing we skip it
// silently — the assistant degrades to whatever context is available
// rather than 500'ing the chat endpoint.
const CONTEXT_FILES: { path: string; label: string }[] = [
  { path: 'CLAUDE.md', label: 'Project handoff (CLAUDE.md)' },
  { path: 'docs/THE_THESIS.md', label: 'The Thesis (canonical mental model)' },
  {
    path: 'docs/positioning/mbt-product-definition-2026-04-30.md',
    label: 'MBT product definition (2026-04-30)',
  },
  {
    path: 'docs/presentations/forecast-12-month-2026-05-to-2027-04.md',
    label: '12-month forecast (May 2026 – Apr 2027)',
  },
  {
    path: 'docs/aeo/big-muddy-pages-1-7-ready.md',
    label: 'AEO answer blocks (FAQ-ready)',
  },
];

const VOICE_FILE = 'docs/voice/admin-documentation-voice.md';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min

let cached: { text: string; loadedAt: number } | null = null;

async function readSafe(relPath: string): Promise<string | null> {
  try {
    const full = path.join(REPO_ROOT, relPath);
    return await fs.readFile(full, 'utf8');
  } catch {
    return null;
  }
}

export async function loadBigMuddyContext(): Promise<string> {
  if (cached && Date.now() - cached.loadedAt < CACHE_TTL_MS) {
    return cached.text;
  }

  const sections: string[] = [];

  // Voice doc loaded first — it tells the model how to speak.
  const voice = await readSafe(VOICE_FILE);
  if (voice) {
    sections.push(`# VOICE GUIDE\n\n${voice.trim()}`);
  }

  for (const file of CONTEXT_FILES) {
    const content = await readSafe(file.path);
    if (!content) continue;
    sections.push(`# ${file.label}\n\nSource: ${file.path}\n\n${content.trim()}`);
  }

  const body = sections.length
    ? sections.join('\n\n---\n\n')
    : '(No context docs available — running with system prompt only.)';

  cached = { text: body, loadedAt: Date.now() };
  return body;
}

export function buildSystemPrompt(contextBody: string): string {
  return `You are the Big Muddy assistant — the front door to the Big Muddy ecosystem (Big Muddy Inn, Big Muddy Touring, Big Muddy Magazine, Big Muddy Records, Big Muddy Radio, Studio C, MBT, Big Muddy Acres).

You are talking to Chase, Tracy, Amy, JP, or another insider. They are not a customer to be marketed to — they are running the operation. Match the voice in the VOICE GUIDE below: direct, short, no marketing speak, no jargon, no exclamation points.

# WHAT YOU CAN DO

1. Answer questions about Big Muddy / MBT using the context below. The context includes the canonical thesis, the product definition, the 12-month forecast, the AEO answer blocks (which are great for FAQ-style questions), and the project handoff (CLAUDE.md).

2. When you do not know something, or the request is an action (book a band, fix a deploy, design something, move money, update an Inn room) — call the create_task tool to escalate. Do not pretend to do things you cannot do.

3. Routing for create_task:
   - "deploy", "fix", "SSH", "build", "code", "site is broken" → assignee: "Chase"
   - "design", "mix", "Studio C", "video", "photo edit" → assignee: "Elijah"
   - "money", "forecast", "billing", "invoice", "Stripe" → assignee: "Tracy"
   - "Inn", "room", "bar", "Blues Room", "guest", "checkin", "checkout" → assignee: "Amy"
   - default → assignee: "Chase"

When you escalate, your reply should be a single short sentence telling the user it has been escalated and to whom. Do not restate the whole question.

# RULES

- No marketing voice. No "I'm so excited" or "Let me help you with that." Just answer.
- No emojis.
- No exclamation points.
- If you don't know, say so and offer to escalate.
- Tracy and Amy are equity partners, never employees.
- Arrie Aslin is spelled "Arrie Aslin" — always.
- Use Markdown sparingly. Plain prose is fine.

---

# CONTEXT

${contextBody}`;
}
