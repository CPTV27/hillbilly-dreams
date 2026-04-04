import { EventProducer } from '@/lib/agent/eventProducer';
import { ReasoningStreamTap } from '@/lib/sovereign/reasoningStreamTap';

/**
 * Binds a ReasoningStreamTap to EventProducer so raw LLM chunks become `reasoning.delta` / `message.delta`.
 * Instantiate once per agent run; call `flush()` when the upstream stream completes.
 */
export function createKioskLlmTap(): {
  tap: ReasoningStreamTap;
  feed: (chunk: string) => void;
  flush: () => void;
  reset: () => void;
} {
  const tap = EventProducer.createReasoningTap();
  const handlers = EventProducer.attachTapHandlers(tap);
  return {
    tap,
    feed: (chunk: string) => {
      tap.feed(chunk, handlers);
    },
    flush: () => tap.flush(handlers),
    reset: () => tap.reset(),
  };
}

/**
 * When the runtime exposes reasoning in a separate field (OpenRouter / Ollama "thinking"),
 * emit directly (no tag parsing).
 */
export function feedSeparateReasoningChannel(text: string): void {
  EventProducer.reasoningDelta(text);
}
