import Hydrate from '@/components/Hydrate/Hydrate.client';
import { Albums } from '@/components/pages/Parallel/Albums.client';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getAlbumsQueryFn } from '@/queryFns/albumsQueryFns';

export default async function ParallelPageAlbums() {
  const dehydratedState = await prefetch(['albums'], getAlbumsQueryFn);

  return (
    <Hydrate state={dehydratedState}>
      <Albums />
    </Hydrate>
  );
}
