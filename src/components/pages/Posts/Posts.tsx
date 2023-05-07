import { getPostsQueryFn } from '@/queryFns/postsQueryFns';
import { Post } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment } from 'react';

export const Posts = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPostsQueryFn,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Not found</div>;

  return (
    <div>
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
              <hr />
            </div>
          ))}
        </Fragment>
      ))}
      {isFetchingNextPage ? (
        <div>Loading more...</div>
      ) : hasNextPage ? (
        <button onClick={() => fetchNextPage()}>Load more</button>
      ) : null}
    </div>
  );
};
