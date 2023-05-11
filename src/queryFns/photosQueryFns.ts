import { axiosJsonPlaceholder } from '@/axiosCustomized';

export const getPhotosQueryFn = async () => axiosJsonPlaceholder.get(`/photos`).then((res) => res.data);

export const getPhotoQueryFn = (id: string) => async () =>
  axiosJsonPlaceholder.get(`/photos/${id}`).then((res) => res.data);
