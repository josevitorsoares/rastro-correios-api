import { EXTERNAL_API } from '@env/env';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: EXTERNAL_API,
  timeout: 8 * 1000, // 5 seconds
});
