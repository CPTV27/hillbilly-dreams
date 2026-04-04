/**
 * Phase 2.3 — Heuristic tap for "thinking" vs answer text on a token stream.
 * Handles: inline <|think|>…(optional closers), plus separate reasoning channels via feedReasoningChannel().
 */

export type StreamTapHandlers = {
  onReasoningDelta: (text: string) => void;
  onMessageDelta: (text: string) => void;
};

const THINK_OPEN = '<|think|>';
/** Model-dependent; extend as you observe real Gemma/Ollama output. */
const THINK_CLOSES: string[] = ['</think>', '[/think]'];

export class ReasoningStreamTap {
  private buffer = '';
  private inThink = false;

  /** Pass raw model output chunks (e.g. Ollama/OpenRouter aggregated text). */
  feed(chunk: string, handlers: StreamTapHandlers): void {
    this.buffer += chunk;
    this.drain(handlers);
  }

  /**
   * When the provider exposes a separate reasoning channel (e.g. `reasoning` / `reasoning_content`),
   * forward it here — no tag parsing required.
   */
  feedReasoningChannel(text: string, handlers: StreamTapHandlers): void {
    if (text.length > 0) handlers.onReasoningDelta(text);
  }

  feedMessageChannel(text: string, handlers: StreamTapHandlers): void {
    if (text.length > 0) handlers.onMessageDelta(text);
  }

  /** Flush remaining buffer as message or reasoning based on mode. */
  flush(handlers: StreamTapHandlers): void {
    if (this.buffer.length === 0) return;
    if (this.inThink) handlers.onReasoningDelta(this.buffer);
    else handlers.onMessageDelta(this.buffer);
    this.buffer = '';
  }

  reset(): void {
    this.buffer = '';
    this.inThink = false;
  }

  private drain(h: StreamTapHandlers): void {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!this.inThink) {
        const openIdx = this.buffer.indexOf(THINK_OPEN);
        if (openIdx === -1) {
          const keep = THINK_OPEN.length - 1;
          if (this.buffer.length > keep) {
            const emitLen = this.buffer.length - keep;
            h.onMessageDelta(this.buffer.slice(0, emitLen));
            this.buffer = this.buffer.slice(emitLen);
          }
          break;
        }
        if (openIdx > 0) h.onMessageDelta(this.buffer.slice(0, openIdx));
        this.buffer = this.buffer.slice(openIdx + THINK_OPEN.length);
        this.inThink = true;
        continue;
      }

      let closeIdx = -1;
      let closeLen = 0;
      for (const c of THINK_CLOSES) {
        const i = this.buffer.indexOf(c);
        if (i !== -1 && (closeIdx === -1 || i < closeIdx)) {
          closeIdx = i;
          closeLen = c.length;
        }
      }

      if (closeIdx === -1) {
        const keep =
          THINK_CLOSES.length > 0 ? Math.max(...THINK_CLOSES.map((c) => c.length)) - 1 : 0;
        if (keep >= 0 && this.buffer.length > keep) {
          const emitLen = this.buffer.length - keep;
          h.onReasoningDelta(this.buffer.slice(0, emitLen));
          this.buffer = this.buffer.slice(emitLen);
        }
        break;
      }

      if (closeIdx > 0) h.onReasoningDelta(this.buffer.slice(0, closeIdx));
      this.buffer = this.buffer.slice(closeIdx + closeLen);
      this.inThink = false;
    }
  }
}
