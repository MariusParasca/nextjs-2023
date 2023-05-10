import { axiosJsonPlaceholder } from '@/axiosCustomized';

export const getTodosQueryFn = async () => axiosJsonPlaceholder.get(`/todos`).then((res) => res.data);
