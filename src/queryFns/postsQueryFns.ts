import { axiosJsonPlaceholder } from '@/axiosCustomized';

export const getPostsQueryFn = async ({ pageParam = 1 }) =>
  axiosJsonPlaceholder.get(`/posts`, { params: { _page: pageParam } }).then((res) => res.data);
