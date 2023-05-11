import Hydrate from '@/components/Hydrate/Hydrate.client';
import Photos from '@/components/pages/Photos/Photos.client';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getPhotosQueryFn } from '@/queryFns/photosQueryFns';

export default async function PhotosPage() {
  const dehydratedState = await prefetch(['photos'], getPhotosQueryFn);

  return (
    <Hydrate state={dehydratedState}>
      <Photos />
    </Hydrate>
  );
}
