// packages/ui/index.ts
// Barrel export for all shared UI components

export { Navigation } from './components/Navigation';
export type { } from './components/Navigation';

export { ArticleCard } from './components/ArticleCard';
export { PlaylistCard } from './components/PlaylistCard';
export { EventCard } from './components/EventCard';
export { Footer } from './components/Footer';
export { NewsletterSignup } from './components/NewsletterSignup';
export { VideoHero } from './components/VideoHero';

// Tiny dark placeholder for blur-up image loading (matches site dark theme)
export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAACx95DEAAAAG0lEQVQIW2NkYPj/n4EBCBgZGUE0IwMDAwMAJNgDBfOlnacAAAAASUVORK5CYII=';
