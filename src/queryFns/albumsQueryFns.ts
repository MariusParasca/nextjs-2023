import { axiosJsonPlaceholder } from '@/axiosCustomized';

export const getAlbumsQueryFn = async () => axiosJsonPlaceholder.get(`/albums`).then((res) => res.data);
