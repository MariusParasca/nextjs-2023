import getQueryClient from '@/utils/getQueryClient';
import { QueryFunction, QueryKey, dehydrate } from '@tanstack/react-query';

export const prefetch = async <T>(queryKey: any[], queryFn: QueryFunction<T, QueryKey>) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKey, queryFn);
  const dehydratedState = dehydrate(queryClient);

  return dehydratedState;
};
