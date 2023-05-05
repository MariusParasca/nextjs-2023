import { Posts } from '@/components/pages/Posts/Posts';
import { getPostsQueryFn } from '@/queryFns/postsQueryFns';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

function PostsPage() {
  return <Posts />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(['posts'], getPostsQueryFn);

  queryClient.setQueryData(['posts'], (old: any) => {
    return {
      ...old,
      pageParams: [1],
    };
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PostsPage;
