import { QueryClient, QueryFunction, QueryKey } from '@tanstack/react-query';

export const prefetch = async <T>(queryKey: any[], queryFn: QueryFunction<T, QueryKey>) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKey, queryFn);

  return queryClient;
};
