// lib/s2px/types.ts
// ─────────────────────────────────────────────────────────────
// S2PX Spatial Intelligence — Type Definitions
// ─────────────────────────────────────────────────────────────
// Deterministic type contracts for the ingestion pipeline.
// No magic — strict schemas for Vertex AI extraction.
// ─────────────────────────────────────────────────────────────

/** Processing state machine. Linear progression unless error. */
export type ScanStatus = 'PENDING' | 'ANALYZING' | 'MAPPED' | 'ERROR';

/** Material detected by Vertex AI spatial analysis */
export interface DetectedMaterial {
  name: string;         // e.g. "exposed brick", "drywall (painted)", "concrete slab"
  confidence: number;   // 0.0–1.0
  estimatedAreaSqft: number;
  location?: string;    // e.g. "NE wall", "ceiling", "floor"
}

/** Structural element identified in the scan */
export interface StructuralElement {
  type: string;         // e.g. "steel beam", "load-bearing wall", "column"
  count: number;
  material?: string;
  condition?: string;   // e.g. "good", "fair", "requires inspection"
}

/** Hazard flagged during spatial analysis */
export interface IdentifiedHazard {
  type: string;         // e.g. "water_damage", "asbestos_suspect", "structural_crack"
  severity: 'low' | 'moderate' | 'high' | 'critical';
  location: string;     // e.g. "NE corner, ceiling junction"
  notes?: string;
}

/**
 * CapacityMetrics — deterministic Vertex AI output.
 * This is the JSON blob stored in SpatialScan.capacityMetrics.
 */
export interface CapacityMetrics {
  totalSquareFootage: number;
  floorCount: number;
  ceilingHeightFt: number;          // Average ceiling height
  occupancyLimit: number | null;    // Estimated max occupancy (null if indeterminate)
  materials: DetectedMaterial[];
  structuralElements: StructuralElement[];
  hazards: IdentifiedHazard[];
  roomCount: number;
  lotOfDetail: number;              // LOD level (100, 200, 300, 400)
  scanPointCount: number;           // LiDAR point cloud density
  notes: string;                    // Free-text AI observations
}

/** GCS event payload (Eventarc notification format) */
export interface GCSObjectEvent {
  bucket: string;
  name: string;            // Object key (path within bucket)
  contentType?: string;
  size?: string;           // String representation of bytes
  timeCreated?: string;
  metageneration?: string;
  metadata?: Record<string, string>;  // Custom metadata (nodeId, scanId, etc.)
}

/** Ingestion result from the pipeline */
export interface IngestionResult {
  scanId: string;
  nodeId: string;
  status: ScanStatus;
  capacityMetrics?: CapacityMetrics;
  aiModelVersion?: string;
  aiConfidence?: number;
  error?: string;
  durationMs: number;
}

/** Quote line item generated from capacity metrics */
export interface QuoteLineItem {
  label: string;
  amountCents: number;
  unit?: string;
  quantity?: number;
}

/** Auto-generated quote from spatial analysis */
export interface EstimatedQuote {
  lineItems: QuoteLineItem[];
  totalCents: number;
  estimatedMarginPercent: number;
  generatedAt: string;    // ISO 8601
}
