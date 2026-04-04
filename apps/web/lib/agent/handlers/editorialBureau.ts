import { z } from 'zod';
import sharp from 'sharp';
import { prisma } from '@bigmuddy/database';
import { generateImage } from '@/lib/imagen';
import { uploadToGCS } from '@/lib/gcs';
import { ModelTier } from '@/lib/ai/modelTier';
import { generateStyleMatchScore, generateTextRedPen } from '@/lib/ai/openRouter';
import type { ToolRunContext } from '@/lib/agent/agentDispatch';

export const VisualPlaceholderInputSchema = z
  .object({
    jobId: z.string().min(1),
    description: z.string().min(1).max(2000),
  })
  .strict();

export const ContentReviewInputSchema = z
  .object({
    jobId: z.string().min(1).optional(),
    bodyText: z.string().max(80_000).optional(),
    styleGuideId: z.string().min(1),
    /** When true, persist `redPenNotes` and move eligible jobs toward HUMAN_REVIEW. */
    applyToJob: z.boolean().optional(),
  })
  .strict()
  .refine((d) => d.jobId != null || (d.bodyText != null && d.bodyText.length > 0), {
    message: 'Provide jobId or non-empty bodyText',
  });

export const StyleMatchInputSchema = z
  .object({
    draft: z.string().min(1).max(80_000),
    styleGuideId: z.string().min(1),
  })
  .strict();

function redPenPrompt(params: {
  draft: string;
  persona: string;
  name: string;
  forbidden: string[];
  samples: string[];
}): string {
  const sampleBlock = params.samples
    .slice(0, 12)
    .map((s, i) => `SAMPLE_${i + 1}:\n${s}`)
    .join('\n\n---\n\n');
  const forbid = params.forbidden.length ? params.forbidden.join(' | ') : '(none listed)';
  return `You are the Red Pen editor for a regional media company. Compare the DRAFT to the voice samples and forbidden phrases.

Persona label: ${params.persona} (${params.name})
Forbidden phrases (do not let these appear in final copy): ${forbid}

Voice samples (few-shot target style):
${sampleBlock}

DRAFT TO REVIEW:
${params.draft}

Use your reasoning to decide each correction. Return ONLY valid JSON with this shape:
{
  "thinking_summary": "Brief plain-language explanation of stylistic issues you found (why, not just what).",
  "corrections": [ { "issue": "string", "suggestion": "string" } ],
  "severity": "low" | "medium" | "high"
}`;
}

function styleMatchPrompt(params: { draft: string; persona: string; samples: string[] }): string {
  const sampleBlock = params.samples
    .slice(0, 8)
    .map((s, i) => `SAMPLE_${i + 1}:\n${s}`)
    .join('\n\n---\n\n');
  return `Score how well the DRAFT matches the voice in the samples (0-100). 100 = indistinguishable from samples; 0 = wrong register or tone.

Persona: ${params.persona}

Samples:
${sampleBlock}

DRAFT:
${params.draft}

Return ONLY valid JSON: { "score": number, "rationale": "one or two sentences" }`;
}

export async function executeVisualPlaceholder(
  input: z.infer<typeof VisualPlaceholderInputSchema>,
  _ctx?: ToolRunContext
): Promise<unknown> {
  const job = await prisma.job.findUnique({ where: { id: input.jobId } });
  if (!job) return { error: 'job_not_found', jobId: input.jobId };

  const [pngBuffer] = await generateImage(input.description, {
    aspectRatio: '16:9',
    sampleCount: 1,
  });
  const webpBuffer = await sharp(pngBuffer).webp({ quality: 85 }).toBuffer();
  const ts = Date.now();
  const path = `editorial-placeholders/${input.jobId}/${ts}.webp`;
  const url = await uploadToGCS(webpBuffer, path, 'image/webp');

  const asset = await prisma.visualAsset.create({
    data: {
      jobId: input.jobId,
      aiPlaceholderUrl: url,
    },
  });

  return { ok: true, visualAssetId: asset.id, url, path };
}

export async function executeContentReview(
  input: z.infer<typeof ContentReviewInputSchema>,
  ctx?: ToolRunContext
): Promise<unknown> {
  const sg = await prisma.styleGuide.findUnique({ where: { id: input.styleGuideId } });
  if (!sg) return { error: 'style_guide_not_found', styleGuideId: input.styleGuideId };

  let draft = input.bodyText ?? '';

  if (input.jobId) {
    const job = await prisma.job.findUnique({
      where: { id: input.jobId },
      select: { id: true, draftContent: true, humanEditedContent: true },
    });
    if (!job) return { error: 'job_not_found', jobId: input.jobId };
    draft = (job.humanEditedContent || job.draftContent || input.bodyText || '').trim();
    if (!draft) return { error: 'empty_draft', jobId: input.jobId };
  } else if (!draft.trim()) {
    return { error: 'empty_draft' };
  }

  const prompt = redPenPrompt({
    draft,
    persona: sg.persona,
    name: sg.name,
    forbidden: sg.forbiddenPhrases,
    samples: sg.samples,
  });

  const tier = ModelTier.CARPENTER;
  const llm = await generateTextRedPen(prompt, {
    maxOutputTokens: 4096,
    budget: ctx?.budget,
    telemetry: {
      toolId: ctx?.toolId ?? 'system.content-review',
      traceId: ctx?.traceId,
      modelTier: tier,
    },
  });

  let parsed: Record<string, unknown>;
  try {
    const cleaned = llm.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    parsed = JSON.parse(cleaned || '{}') as Record<string, unknown>;
  } catch {
    parsed = { raw: llm.text, parse_error: true };
  }

  const redPenJson = JSON.stringify(parsed);

  if (input.applyToJob === true) {
    if (!input.jobId) return { error: 'applyToJob_requires_jobId' };
    const cur = await prisma.job.findUnique({
      where: { id: input.jobId },
      select: { editorialStatus: true },
    });
    if (!cur) return { error: 'job_not_found', jobId: input.jobId };

    await prisma.job.update({
      where: { id: input.jobId },
      data: {
        redPenNotes: redPenJson,
        ...(cur.editorialStatus === 'AI_READY' || cur.editorialStatus === 'DRAFT'
          ? { editorialStatus: 'HUMAN_REVIEW' }
          : {}),
      },
    });
  }

  const out: Record<string, unknown> = {
    ok: true,
    redPen: parsed,
    model: llm.model,
  };
  if (ctx?.includeTelemetry === true) {
    out._telemetry = {
      model: llm.model,
      usage: llm.usage,
      estimatedCostUsd: llm.estimatedCostUsd,
    };
  }
  return out;
}

export async function executeStyleMatch(
  input: z.infer<typeof StyleMatchInputSchema>,
  ctx?: ToolRunContext
): Promise<unknown> {
  const sg = await prisma.styleGuide.findUnique({ where: { id: input.styleGuideId } });
  if (!sg) return { error: 'style_guide_not_found', styleGuideId: input.styleGuideId };

  const prompt = styleMatchPrompt({
    draft: input.draft,
    persona: sg.persona,
    samples: sg.samples,
  });

  const llm = await generateStyleMatchScore(prompt, {
    maxOutputTokens: 512,
    budget: ctx?.budget,
    telemetry: {
      toolId: ctx?.toolId ?? 'system.editorial.style_match',
      traceId: ctx?.traceId,
      modelTier: ModelTier.INTERN,
    },
  });

  let parsed: Record<string, unknown>;
  try {
    const cleaned = llm.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    parsed = JSON.parse(cleaned || '{}') as Record<string, unknown>;
  } catch {
    parsed = { score: null, rationale: llm.text, parse_error: true };
  }

  const out: Record<string, unknown> = { ok: true, styleMatch: parsed, model: llm.model };
  if (ctx?.includeTelemetry === true) {
    out._telemetry = {
      model: llm.model,
      usage: llm.usage,
      estimatedCostUsd: llm.estimatedCostUsd,
    };
  }
  return out;
}
