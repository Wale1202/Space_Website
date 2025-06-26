import axios from 'axios';
//const API_BASE_URL = 'https://space-website-911e.onrender.com/api';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://space-website-911e.onrender.com'
  : 'http://localhost:3001';

// Create axios instance with base URL and default config
const api = axios.create({
  baseURL: 'https://space-website-911e.onrender.com/api',
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

/**
 * Fetch Mars Rover Photos
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Mars Rover photos data
 */
export const fetchMarsPhotos = async (params = {}) => {
  return api.get('/mars-photos', { params });
};



export default api;