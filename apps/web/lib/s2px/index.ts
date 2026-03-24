// lib/s2px/index.ts
// ─────────────────────────────────────────────────────────────
// S2PX Spatial Intelligence — Barrel Export
// ─────────────────────────────────────────────────────────────

export { processSpatialScan, handleGCSUploadEvent } from './ingestion';
export { extractCapacityMetrics } from './vertex-spatial';
export type {
  ScanStatus,
  CapacityMetrics,
  DetectedMaterial,
  StructuralElement,
  IdentifiedHazard,
  GCSObjectEvent,
  IngestionResult,
  EstimatedQuote,
  QuoteLineItem,
} from './types';
