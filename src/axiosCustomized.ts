import axios from 'axios';

const axiosCustomized = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getRequest = (url: string) => axiosCustomized.get(url).then((res) => res.data);

export default axiosCustomized;

export const axiosJsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
