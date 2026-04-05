export const dynamic = 'force-dynamic';

// GET /api/admin/audit — Live codebase audit (PE + Google + Vertex)
// Runs real analysis against the schema, API routes, and codebase

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import fs from 'fs';
import path from 'path';

function getWebRoot(): string {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'next.config.mjs'))) return cwd;
  const nested = path.join(cwd, 'apps', 'web');
  if (fs.existsSync(path.join(nested, 'package.json'))) return nested;
  return cwd;
}

function getRepoRoot(): string {
  return path.resolve(getWebRoot(), '..', '..');
}

function countInFile(filePath: string, pattern: RegExp): number {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return (content.match(pattern) || []).length;
  } catch { return 0; }
}

function fileContains(filePath: string, text: string): boolean {
  try {
    return fs.readFileSync(filePath, 'utf8').includes(text);
  } catch { return false; }
}

function walkFiles(dir: string, ext: string[]): string[] {
  const results: string[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === '.next') continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) results.push(...walkFiles(full, ext));
      else if (ext.some(x => e.name.endsWith(x))) results.push(full);
    }
  } catch {}
  return results;
}

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const repo = getRepoRoot();
  const web = getWebRoot();
  const schemaPath = path.join(repo, 'packages/database/prisma/schema.prisma');
  const apiDir = path.join(web, 'app/api');

  // Schema analysis
  let schemaContent = '';
  try { schemaContent = fs.readFileSync(schemaPath, 'utf8'); } catch {}

  const totalModels = (schemaContent.match(/^model /gm) || []).length;
  const compositeIndexes = (schemaContent.match(/@@index/g) || []).length;
  const uniqueConstraints = (schemaContent.match(/@unique/g) || []).length;

  // API route analysis
  const apiRoutes = walkFiles(apiDir, ['.ts']).filter(f => f.endsWith('route.ts'));
  const totalApiRoutes = apiRoutes.length;

  let authedRoutes = 0;
  let forceDynamicRoutes = 0;
  let callAIRoutes = 0;
  let directVertexRoutes = 0;

  for (const route of apiRoutes) {
    const content = fs.readFileSync(route, 'utf8');
    if (content.includes('requireAdmin') || content.includes('requireCronOrAdmin') || content.includes('CRON_SECRET') || content.includes('auth()')) {
      authedRoutes++;
    }
    if (content.includes('force-dynamic')) forceDynamicRoutes++;
    if (content.includes('callAI')) callAIRoutes++;
    if ((content.includes('getGeminiModel') || content.includes('vertex-client')) && !content.includes('callAI')) {
      directVertexRoutes++;
    }
  }

  const authCoverage = totalApiRoutes > 0 ? Math.round((authedRoutes / totalApiRoutes) * 100) : 0;
  const forceDynamicCoverage = totalApiRoutes > 0 ? Math.round((forceDynamicRoutes / totalApiRoutes) * 100) : 0;

  // Pricing consistency
  const allTsx = walkFiles(path.join(web, 'app'), ['.tsx']);
  let oldPricingRefs = 0;
  let currentPricingRefs = 0;
  for (const f of allTsx) {
    const c = fs.readFileSync(f, 'utf8');
    if (/\$20\/mo|\$49\/mo/.test(c)) oldPricingRefs++;
    if (/\$25.*mo|\$50.*mo|\$99.*mo|\$250.*mo/.test(c)) currentPricingRefs++;
  }

  // Grades
  const dbGrade = compositeIndexes > 200 ? 'A' : compositeIndexes > 150 ? 'B+' : compositeIndexes > 100 ? 'B' : 'C';
  const authGrade = authCoverage >= 90 ? 'A' : authCoverage >= 75 ? 'B' : authCoverage >= 50 ? 'C' : 'F';
  const routingGrade = directVertexRoutes === 0 ? 'A' : directVertexRoutes <= 3 ? 'B' : directVertexRoutes <= 10 ? 'C' : 'D';
  const pricingGrade = oldPricingRefs === 0 ? 'A' : oldPricingRefs <= 2 ? 'B' : 'C';
  const dynamicGrade = forceDynamicCoverage >= 98 ? 'A' : forceDynamicCoverage >= 95 ? 'B' : 'C';

  // Overall
  const gradeValues: Record<string, number> = { A: 4, 'B+': 3.5, B: 3, C: 2, D: 1, F: 0 };
  const grades = [dbGrade, authGrade, routingGrade, pricingGrade, dynamicGrade];
  const avgGrade = grades.reduce((s, g) => s + (gradeValues[g] || 0), 0) / grades.length;
  const overallGrade = avgGrade >= 3.5 ? 'A' : avgGrade >= 3 ? 'A-' : avgGrade >= 2.5 ? 'B+' : avgGrade >= 2 ? 'B' : avgGrade >= 1.5 ? 'C' : 'D';

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    overall: overallGrade,
    categories: {
      database: {
        grade: dbGrade,
        models: totalModels,
        compositeIndexes,
        uniqueConstraints,
      },
      security: {
        grade: authGrade,
        totalRoutes: totalApiRoutes,
        authedRoutes,
        unauthedRoutes: totalApiRoutes - authedRoutes,
        coverage: `${authCoverage}%`,
      },
      aiRouting: {
        grade: routingGrade,
        callAIRoutes,
        directVertexRoutes,
        totalAIRoutes: callAIRoutes + directVertexRoutes,
      },
      pricing: {
        grade: pricingGrade,
        oldPricingRefs,
        currentPricingRefs,
      },
      forceDynamic: {
        grade: dynamicGrade,
        compliant: forceDynamicRoutes,
        total: totalApiRoutes,
        coverage: `${forceDynamicCoverage}%`,
      },
    },
  });
}
