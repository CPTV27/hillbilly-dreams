import GalleryPageClient from './GalleryPageClient';
import { fetchPhotoIndex } from '@/lib/photo-index';

export default async function GalleryPage() {
  const libraryPhotos = await fetchPhotoIndex();
  return <GalleryPageClient libraryPhotos={libraryPhotos} />;
}
