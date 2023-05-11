import Hydrate from '@/components/Hydrate/Hydrate.client';
import Photo from '@/components/pages/Photo/Photo.client';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getPhotoQueryFn } from '@/queryFns/photosQueryFns';
import { RequestParams } from '@/types/utils';

export default async function PhotoPage({ params: { photoId } }: RequestParams<{ photoId: string }>) {
  const dehydratedState = await prefetch(['photos', photoId], getPhotoQueryFn(photoId));

  return (
    <Hydrate state={dehydratedState}>
      <Photo />
    </Hydrate>
  );
}
