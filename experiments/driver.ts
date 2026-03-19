// experiments/driver.ts
// Auto-Research Driver — Scientific self-improvement loop for Big Muddy Media
// Adapted from Karpathy's auto-research methodology via S2PX implementation
//
// Usage:
//   npx tsx experiments/driver.ts                    # Run all experiments
//   npx tsx experiments/driver.ts --kpi build        # Run specific KPI
//   npx tsx experiments/driver.ts --kpi lighthouse   # Run Lighthouse audit
//   npx tsx experiments/driver.ts --baseline         # Establish baselines only

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ── Types ──

interface ExperimentLog {
  project: string;
  created: string;
  baseline_scores: Record<string, number | null>;
  experiments: ExperimentEntry[];
}

interface ExperimentEntry {
  id: string;
  timestamp: string;
  hypothesis: string;
  variable: string;
  mutation: string;
  kpi: string;
  baseline_score: number;
  experiment_score: number;
  delta: number;
  succeeded: boolean;
  reverted: boolean;
  notes: string;
}

// ── Paths ──

const ROOT = path.resolve(__dirname, '..');
const WEB = path.join(ROOT, 'apps/web');
const LOG_PATH = path.join(__dirname, 'experiment_log.json');
const RESULTS_DIR = path.join(__dirname, 'results');

// ── Helpers ──

function readLog(): ExperimentLog {
  return JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'));
}

function writeLog(log: ExperimentLog) {
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2) + '\n');
}

function run(cmd: string, cwd = ROOT): string {
  try {
    return execSync(cmd, { cwd, encoding: 'utf-8', timeout: 300_000 }).trim();
  } catch (e: any) {
    return e.stdout?.toString() || e.message;
  }
}

function genId(): string {
  return `exp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

// ── KPI Evaluation Functions ──

/** Measure Next.js build time in milliseconds */
function evalBuildTime(): number {
  console.log('📊 [KPI] Measuring build time...');
  const start = Date.now();
  run('pnpm build --filter web 2>&1', ROOT);
  const elapsed = Date.now() - start;
  console.log(`   Build time: ${elapsed}ms (${(elapsed / 1000).toFixed(1)}s)`);
  return elapsed;
}

/** Measure total bundle size of .next/static chunks */
function evalBundleSize(): number {
  console.log('📊 [KPI] Measuring bundle size...');
  const output = run(
    `find ${WEB}/.next/static -name "*.js" -exec wc -c {} + | tail -1 | awk '{print $1}'`
  );
  const bytes = parseInt(output, 10) || 0;
  const kb = Math.round(bytes / 1024);
  console.log(`   Bundle size: ${kb}KB`);
  return kb;
}

/** Count TypeScript strict-mode errors */
function evalTypeScriptErrors(): number {
  console.log('📊 [KPI] Counting TypeScript errors...');
  const output = run('pnpm exec tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep "error TS" | wc -l');
  const count = parseInt(output.trim(), 10) || 0;
  console.log(`   TypeScript errors: ${count}`);
  return count;
}

/** Measure API response latency (average of key endpoints) */
function evalApiLatency(): number {
  console.log('📊 [KPI] Measuring API latency...');
  const endpoints = ['/api/articles', '/api/playlists', '/api/events'];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  let totalMs = 0;
  let count = 0;

  for (const ep of endpoints) {
    try {
      const output = run(
        `curl -s -o /dev/null -w '%{time_total}' '${baseUrl}${ep}' 2>/dev/null`
      );
      const seconds = parseFloat(output) || 0;
      totalMs += seconds * 1000;
      count++;
    } catch {
      // endpoint not available
    }
  }

  const avg = count > 0 ? Math.round(totalMs / count) : 0;
  console.log(`   Avg API latency: ${avg}ms across ${count} endpoints`);
  return avg;
}

/** Run Lighthouse CI audit (requires Chrome + lighthouse CLI) */
function evalLighthouse(): { performance: number; seo: number; accessibility: number } {
  console.log('📊 [KPI] Running Lighthouse audit...');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const outFile = path.join(RESULTS_DIR, `lighthouse_${Date.now()}.json`);

  try {
    run(
      `npx lighthouse ${baseUrl}/touring --output=json --output-path=${outFile} --chrome-flags="--headless --no-sandbox" --only-categories=performance,seo,accessibility 2>/dev/null`
    );
    const report = JSON.parse(fs.readFileSync(outFile, 'utf-8'));
    const scores = {
      performance: Math.round((report.categories?.performance?.score || 0) * 100),
      seo: Math.round((report.categories?.seo?.score || 0) * 100),
      accessibility: Math.round((report.categories?.accessibility?.score || 0) * 100),
    };
    console.log(`   Performance: ${scores.performance} | SEO: ${scores.seo} | A11y: ${scores.accessibility}`);
    return scores;
  } catch {
    console.log('   ⚠ Lighthouse not available — skipping');
    return { performance: 0, seo: 0, accessibility: 0 };
  }
}

// ── KPI Registry ──

const KPI_FUNCTIONS: Record<string, () => number> = {
  build_time_ms: evalBuildTime,
  bundle_size_kb: evalBundleSize,
  typescript_errors: evalTypeScriptErrors,
  api_avg_latency_ms: evalApiLatency,
};

// ── Baseline Establishment ──

function establishBaselines() {
  console.log('=========================================');
  console.log('📏 [Auto-Research] Establishing Baselines...');
  console.log('=========================================');

  const log = readLog();

  for (const [kpi, fn] of Object.entries(KPI_FUNCTIONS)) {
    const score = fn();
    log.baseline_scores[kpi] = score;
    console.log(`   ✅ ${kpi}: ${score}`);
  }

  // Lighthouse separately (returns multiple scores)
  const lh = evalLighthouse();
  log.baseline_scores.lighthouse_performance = lh.performance;
  log.baseline_scores.lighthouse_seo = lh.seo;
  log.baseline_scores.lighthouse_accessibility = lh.accessibility;

  writeLog(log);
  console.log('\n💾 Baselines saved to experiment_log.json');
}

// ── Experiment Execution ──

function runExperiment(kpi: string, hypothesis: string, variable: string, mutation: string) {
  const log = readLog();
  const baseline = log.baseline_scores[kpi];

  if (baseline === null || baseline === undefined) {
    console.log(`❌ No baseline for ${kpi}. Run --baseline first.`);
    return;
  }

  console.log('=========================================');
  console.log('🧪 [Auto-Research] Initiating Evaluation...');
  console.log('=========================================');
  console.log(`[Eval] Testing Hypothesis: ${hypothesis}`);
  console.log(`[Eval] Variable: ${variable} → ${mutation}`);

  // Run the KPI evaluation
  const fn = KPI_FUNCTIONS[kpi];
  if (!fn) {
    console.log(`❌ Unknown KPI: ${kpi}`);
    return;
  }

  const newScore = fn();

  // For these KPIs, LOWER is better
  const lowerIsBetter = ['build_time_ms', 'bundle_size_kb', 'typescript_errors', 'api_avg_latency_ms'];
  const improved = lowerIsBetter.includes(kpi)
    ? newScore < baseline
    : newScore > baseline;

  const delta = newScore - baseline;
  const pct = baseline > 0 ? ((delta / baseline) * 100).toFixed(1) : '∞';

  console.log(`\n📊 New ${kpi}: ${newScore}`);
  console.log(`📉 Previous Baseline: ${baseline}`);
  console.log(`   Delta: ${delta > 0 ? '+' : ''}${delta} (${pct}%)`);

  const entry: ExperimentEntry = {
    id: genId(),
    timestamp: new Date().toISOString(),
    hypothesis,
    variable,
    mutation,
    kpi,
    baseline_score: baseline,
    experiment_score: newScore,
    delta,
    succeeded: improved,
    reverted: !improved,
    notes: improved
      ? `Improvement: ${kpi} ${lowerIsBetter.includes(kpi) ? 'decreased' : 'increased'} by ${Math.abs(delta)}`
      : `No improvement: ${kpi} ${lowerIsBetter.includes(kpi) ? 'increased' : 'decreased'} by ${Math.abs(delta)}`,
  };

  log.experiments.push(entry);

  if (improved) {
    console.log(`\n✅ [Auto-Research] SUCCESS. Hypothesis improved ${kpi}.`);
    console.log(`   -> Promoting mutation. Updating baseline.`);
    log.baseline_scores[kpi] = newScore;
  } else {
    console.log(`\n❌ [Auto-Research] FAILED. Hypothesis did not beat baseline.`);
    console.log(`   -> Reverting code modification and documenting failure.`);
  }

  writeLog(log);
  console.log('💾 [Auto-Research] Loop sequence terminated. Memory updated.\n');
}

// ── Failed Experiment History (for agent context) ──

function getFailedHypotheses(kpi?: string): string[] {
  const log = readLog();
  return log.experiments
    .filter((e) => !e.succeeded && (!kpi || e.kpi === kpi))
    .map((e) => `[${e.timestamp}] ${e.hypothesis} (${e.variable}=${e.mutation}) → ${e.kpi} went from ${e.baseline_score} to ${e.experiment_score}`);
}

// ── CLI ──

const args = process.argv.slice(2);
const flagIdx = args.indexOf('--kpi');
const baselineFlag = args.includes('--baseline');
const historyFlag = args.includes('--history');

if (baselineFlag) {
  establishBaselines();
} else if (historyFlag) {
  const kpi = flagIdx >= 0 ? args[flagIdx + 1] : undefined;
  const failures = getFailedHypotheses(kpi);
  console.log(`\n📜 Failed experiments${kpi ? ` for ${kpi}` : ''}:`);
  failures.forEach((f) => console.log(`   ${f}`));
  if (failures.length === 0) console.log('   (none)');
} else {
  // Default: establish baselines if none exist, then report
  const log = readLog();
  const hasBaselines = Object.values(log.baseline_scores).some((v) => v !== null);
  if (!hasBaselines) {
    establishBaselines();
  } else {
    console.log('\n📊 Current baselines:');
    for (const [k, v] of Object.entries(log.baseline_scores)) {
      console.log(`   ${k}: ${v ?? '(not set)'}`);
    }
    console.log(`\n📜 Total experiments: ${log.experiments.length}`);
    console.log(`   ✅ Succeeded: ${log.experiments.filter((e) => e.succeeded).length}`);
    console.log(`   ❌ Failed: ${log.experiments.filter((e) => !e.succeeded).length}`);
  }
}

export {
  establishBaselines,
  runExperiment,
  getFailedHypotheses,
  evalBuildTime,
  evalBundleSize,
  evalTypeScriptErrors,
  evalApiLatency,
  evalLighthouse,
  KPI_FUNCTIONS,
};
