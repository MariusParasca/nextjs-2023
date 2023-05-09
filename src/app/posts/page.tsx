import Hydrate from '@/components/Hydrate/Hydrate.client';
import { Posts } from '@/components/pages/Posts/Posts.client';
import { getPostsQueryFn } from '@/queryFns/postsQueryFns';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

export default async function PostsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(['posts'], getPostsQueryFn);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Posts />
    </Hydrate>
  );
}
