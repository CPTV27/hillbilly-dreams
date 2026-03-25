import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import { disableOpenTelemetry } from '@sentry/nextjs';

const PROJECT_ID = process.env.VERTEX_PROJECT_ID || 'bigmuddy-ff651';

// Initialize the Google Cloud Trace OpenTelemetry Provider
// Note: Only runs on the Next.js Node runtime, not on the Edge runtime.
const provider = new NodeTracerProvider();

// The Google Cloud Trace Exporter automatically assumes Application Default Credentials
// or detects the hosting Cloud Run's attached Service Account permissions.
const exporter = new TraceExporter({
  projectId: PROJECT_ID,
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

console.log('[OpenTelemetry/GCP] Sovereign Edge Tracing initialized for Project:', PROJECT_ID);
