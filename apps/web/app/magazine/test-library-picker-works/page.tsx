import { redirect } from 'next/navigation';

/** Short URL requested for QA — canonical article lives at /magazine/articles/[slug]. */
export default function MagazineTestLibraryPickerRedirect() {
  redirect('/magazine/articles/test-library-picker-works');
}
