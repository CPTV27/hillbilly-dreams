/**
 * Structured JSON logs for API routes (Vercel / Cloud Logging ingest stdout).
 * Prefer over raw console.log for money, auth, and AI paths.
 */

export type CloudLogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface CloudLogFields {
  route: string;
  message: string;
  level?: CloudLogLevel;
  durationMs?: number;
  error?: { name?: string; message: string };
  [key: string]: unknown;
}

function emit(fields: CloudLogFields): void {
  const { route, message, level = 'info', ...rest } = fields;
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    route,
    message,
    ...rest,
  });
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

export const cloudLog = {
  info(route: string, message: string, extra?: Record<string, unknown>): void {
    emit({ route, message, level: 'info', ...extra });
  },
  warn(route: string, message: string, extra?: Record<string, unknown>): void {
    emit({ route, message, level: 'warn', ...extra });
  },
  error(route: string, message: string, err?: unknown, extra?: Record<string, unknown>): void {
    const error =
      err instanceof Error
        ? { name: err.name, message: err.message }
        : { message: String(err) };
    emit({ route, message, level: 'error', error, ...extra });
  },
};
