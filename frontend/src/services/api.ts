import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just throw the error, let the calling code handle it
    return Promise.reject(error);
  }
);

export default api;
