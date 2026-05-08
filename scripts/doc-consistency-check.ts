#!/usr/bin/env -S npx tsx
/**
 * Doc Consistency Check — v0.1 (P-02 from the Handoff Readiness Charter)
 *
 * Scans apps/web/ source + public HTML for drift between what's written
 * and what's currently true. Three rules in v0.1; more to come.
 *
 * USAGE:
 *   npx tsx scripts/doc-consistency-check.ts                # human-readable
 *   npx tsx scripts/doc-consistency-check.ts --json         # JSON for CI
 *   npx tsx scripts/doc-consistency-check.ts --strict       # fail on `partial` too
 *   npx tsx scripts/doc-consistency-check.ts --report-only  # always exit 0
 *
 * EXIT CODES:
 *   0   no `block`-severity violations, OR --report-only
 *   1   one or more `block` violations (or `partial` if --strict)
 *
 * Add a rule:
 *   1. Append to RULES with id, severity, pattern, reason.
 *   2. If the rule self-matches (e.g. it lists misspellings as exemplars),
 *      add the file to EXEMPT_PATTERNS.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

type Severity = 'block' | 'partial' | 'info';

interface Rule {
  id: string;
  severity: Severity;
  pattern: RegExp;
  reason: string;
}

const RULES: Rule[] = [
  {
    id: 'HDI_DEAD_LANGUAGE',
    severity: 'partial',
    pattern: /\bHillbilly Dreams Inc\.?/g,
    reason:
      'HDI dead language since 2026-04-18 — replace with MBT / Measurably Better Things in new pages',
  },
  {
    id: 'DEPRECATED_SMB_TIER_PRICING',
    severity: 'block',
    pattern: /\$(?:25|50|99|250)\s*\/\s*(?:mo|month)\b/g,
    reason:
      'Walk-in SMB tier pricing deprecated 2026-04-19 — Directory ships inside B2B engagements only',
  },
  {
    id: 'ARRIE_ASLIN_MISSPELLED',
    severity: 'block',
    pattern: /\b(?:Arri Aslan|Arri B\.\s*Aslan|Ari Aslan|Ari B\.\s*Aslan)\b/g,
    reason: 'Correct spelling is "Arrie Aslin" (CLAUDE.md QC rules)',
  },
];

// Roots to scan
const ROOTS = [
  'apps/web/app',
  'apps/web/components',
  'apps/web/lib',
  'apps/web/config',
  'apps/web/public',
];

// Skip these paths within ROOTS
const EXEMPT_PATTERNS: RegExp[] = [
  /\/node_modules\//,
  /\/\.next\//,
  /\/\.turbo\//,
  /\/archive\//,
  /\/lib\/hdi-links\.ts$/, // file rename pending — HDI in name only
  /\/app\/hillbilly\//, // legacy /hillbilly route — slated for removal
  /\/scripts\/doc-consistency-check\.ts$/, // self-exempt — RULES list contains exemplars
  /\/docs\/voice\//, // voice corpus may quote misspellings as examples
  /\/public\/press\//, // AI-generated mock press articles, not live customer pages
  /\/public\/sandbox\//, // sandbox playground, not customer-facing
];

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.html', '.md']);

interface Finding {
  rule: string;
  severity: Severity;
  reason: string;
  file: string;
  line: number;
  match: string;
}

function* walk(dir: string): Generator<string> {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (EXEMPT_PATTERNS.some((re) => re.test(full))) continue;
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (st.isFile()) {
      const dot = name.lastIndexOf('.');
      const ext = dot === -1 ? '' : name.slice(dot);
      if (EXTENSIONS.has(ext)) yield full;
    }
  }
}

function scanFile(file: string): Finding[] {
  let text: string;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    return [];
  }
  const lines = text.split('\n');
  const findings: Finding[] = [];
  for (const rule of RULES) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Reset lastIndex each line so /g state can't leak across lines
      rule.pattern.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = rule.pattern.exec(line)) !== null) {
        findings.push({
          rule: rule.id,
          severity: rule.severity,
          reason: rule.reason,
          file: relative(process.cwd(), file),
          line: i + 1,
          match: m[0],
        });
        if (m.index === rule.pattern.lastIndex) rule.pattern.lastIndex++;
      }
    }
  }
  return findings;
}

function printHuman(all: Finding[]): void {
  const buckets = { block: [] as Finding[], partial: [] as Finding[], info: [] as Finding[] };
  for (const f of all) buckets[f.severity].push(f);

  console.log(`Doc Consistency Check — ${new Date().toISOString().slice(0, 10)}`);
  console.log('==========================================');
  console.log(`block:    ${buckets.block.length}`);
  console.log(`partial:  ${buckets.partial.length}`);
  console.log(`info:     ${buckets.info.length}`);
  console.log('');

  if (all.length === 0) {
    console.log('No drift found.');
    return;
  }

  // Group by rule for readability
  const byRule = new Map<string, Finding[]>();
  for (const f of all) {
    if (!byRule.has(f.rule)) byRule.set(f.rule, []);
    byRule.get(f.rule)!.push(f);
  }

  // Order: block → partial → info
  const order: Severity[] = ['block', 'partial', 'info'];
  const sortedRules = Array.from(byRule.keys()).sort((a, b) => {
    const sa = byRule.get(a)![0].severity;
    const sb = byRule.get(b)![0].severity;
    return order.indexOf(sa) - order.indexOf(sb);
  });

  for (const ruleId of sortedRules) {
    const findings = byRule.get(ruleId)!;
    const sev = findings[0].severity.toUpperCase();
    console.log(`[${sev}] ${ruleId} — ${findings[0].reason}`);
    console.log(`  ${findings.length} hit${findings.length === 1 ? '' : 's'}:`);
    for (const f of findings) {
      console.log(`    ${f.file}:${f.line}  ${f.match}`);
    }
    console.log('');
  }
}

function main(): void {
  const jsonMode = process.argv.includes('--json');
  const strict = process.argv.includes('--strict');

  const all: Finding[] = [];
  for (const root of ROOTS) {
    for (const file of walk(root)) {
      all.push(...scanFile(file));
    }
  }

  if (jsonMode) {
    const summary = {
      block: all.filter((f) => f.severity === 'block').length,
      partial: all.filter((f) => f.severity === 'partial').length,
      info: all.filter((f) => f.severity === 'info').length,
    };
    console.log(JSON.stringify({ summary, findings: all }, null, 2));
  } else {
    printHuman(all);
  }

  const reportOnly = process.argv.includes('--report-only');
  const failCount = strict
    ? all.length
    : all.filter((f) => f.severity === 'block').length;
  process.exit(reportOnly || failCount === 0 ? 0 : 1);
}

main();
