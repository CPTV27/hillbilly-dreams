import { z } from 'zod';

export const OrchestrateInputSchema = z
  .object({
    task: z.string().trim().min(1).max(10_000),
    agent: z.string().trim().max(100).optional(),
    context: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type OrchestrateInput = z.infer<typeof OrchestrateInputSchema>;
