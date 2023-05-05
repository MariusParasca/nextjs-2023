import axios from 'axios';

const axiosCustomized = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default axiosCustomized;
