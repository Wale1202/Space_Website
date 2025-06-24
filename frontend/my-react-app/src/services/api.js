import axios from 'axios';
const API_BASE_URL = 'https://space-website-911e.onrender.com/api';

// Create axios instance with base URL and default config
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);
/**
 * Fetch Astronomy Picture of the Day
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} APOD data
 */
export const fetchAPOD = async (params = {}) => {
  return api.get('/apod', {params});
};

export default api;