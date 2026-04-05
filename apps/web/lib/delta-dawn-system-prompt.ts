import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let cached: string | null = null;

function candidateMarkdownPaths(): string[] {
  const routeDir = path.dirname(fileURLToPath(import.meta.url));
  return [
    path.join(routeDir, '..', '..', 'docs', 'ops', 'DELTA_DAWN_ONBOARDING_PROMPT_V2.md'),
    path.join(process.cwd(), 'docs', 'ops', 'DELTA_DAWN_ONBOARDING_PROMPT_V2.md'),
    path.join(process.cwd(), '..', 'docs', 'ops', 'DELTA_DAWN_ONBOARDING_PROMPT_V2.md'),
  ];
}

/** Full Delta Dawn v2 system instruction from docs/ops/DELTA_DAWN_ONBOARDING_PROMPT_V2.md (fenced block). */
export function getDeltaDawnSystemPromptV2(): string {
  if (cached) return cached;
  for (const p of candidateMarkdownPaths()) {
    if (!existsSync(p)) continue;
    const raw = readFileSync(p, 'utf8');
    const m = raw.match(/## System Instruction\s*\n```\s*\n([\s\S]*?)\n```/);
    if (m?.[1]?.trim()) {
      cached = m[1].trim();
      return cached;
    }
  }
  throw new Error('DELTA_DAWN_ONBOARDING_PROMPT_V2.md not found or system block missing');
}
