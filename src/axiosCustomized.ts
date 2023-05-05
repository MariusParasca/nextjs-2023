import axios from 'axios';

const axiosCustomized = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const createAxiosSessionForServer = (cookie?: string) => ({
  withCredentials: cookie ? true : false,
  headers: { Cookie: cookie },
});

export const getRequest = (url: string, cookie?: string) =>
  axiosCustomized.get(url, createAxiosSessionForServer(cookie)).then((res) => res.data);

export default axiosCustomized;
