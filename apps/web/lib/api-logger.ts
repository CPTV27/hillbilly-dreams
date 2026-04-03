/**
 * JSON-line structured logging for API routes (webhooks, cron).
 * Avoid logging secrets, raw bodies, or full card/PII payloads.
 */

type Level = 'error' | 'warn' | 'info';

function line(level: Level, scope: string, message: string, extra?: Record<string, unknown>): string {
  return JSON.stringify({
    ts: new Date().toISOString(),
    level,
    scope,
    message,
    ...extra,
  });
}

export const apiLog = {
  info(scope: string, message: string, extra?: Record<string, unknown>): void {
    console.log(line('info', scope, message, extra));
  },
  warn(scope: string, message: string, extra?: Record<string, unknown>): void {
    console.warn(line('warn', scope, message, extra));
  },
  error(scope: string, message: string, err?: unknown, extra?: Record<string, unknown>): void {
    const error =
      err instanceof Error
        ? { name: err.name, message: err.message }
        : { message: String(err) };
    console.error(line('error', scope, message, { ...extra, error }));
  },
};
