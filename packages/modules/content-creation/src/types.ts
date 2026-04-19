// packages/modules/content-creation/src/types.ts

export type ContentType =
  | 'magazine-article'
  | 'social-post'
  | 'listing-description'
  | 'episode-description'
  | 'pitch-deck-section';

export type Brand =
  | 'inn'
  | 'magazine'
  | 'touring'
  | 'records'
  | 'radio'
  | 'cpp'
  | 'tuthill'
  | 'studio-c';

export interface EntityCandidate {
  id: string;
  name: string;
  category: string;
  city: string | null;
  state: string | null;
  description: string | null;
  url: string | null;
}

export interface PhotoCandidate {
  assetId: string;
  thumbnailUrl: string;
  takenAt: string | null;
  caption?: string;
  /** Relevance score from Immich CLIP, 0-1. */
  score: number;
}

export interface WizardContext {
  topic: string;
  contentType: ContentType;
  brand: Brand;
  entities: EntityCandidate[];
  photos: PhotoCandidate[];
  template: ContentTemplate;
}

export interface ContentTemplate {
  contentType: ContentType;
  audienceProfile: string;
  voiceRules: string[];
  requiredSections: string[];
  lengthTarget: { min: number; max: number };
  forbiddenPhrases: string[];
  systemPrompt: string;
}

export interface GeneratedDraft {
  title: string;
  body: string;
  wizardMeta: {
    topic: string;
    contentType: ContentType;
    brand: Brand;
    entityIds: string[];
    photoAssetIds: string[];
    aiModel: string;
    tokensUsed?: number;
    generatedAt: string;
  };
}

export interface SaveDraftInput {
  draft: GeneratedDraft;
  /** Sanity dataset — typically "production". */
  dataset?: string;
}
