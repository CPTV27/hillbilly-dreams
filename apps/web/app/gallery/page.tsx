import type { Metadata } from 'next';
import GalleryPageClient from './GalleryPageClient';
import { fetchPhotoIndex } from '@/lib/photo-index';

export const metadata: Metadata = {
  title: 'Venture Gallery — Photography from the Deep South and Hudson Valley',
};

export default async function GalleryPage() {
  const libraryPhotos = await fetchPhotoIndex();
  return <GalleryPageClient libraryPhotos={libraryPhotos} />;
}
