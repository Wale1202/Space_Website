const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';

/**
 * Creates a NASA API URL with the provided endpoint and query parameters
 * @param {string} endpoint - The NASA API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} The complete URL
 */
const buildNasaApiUrl = (endpoint, params = {}) => {
  // Add API key to params
  const queryParams = new URLSearchParams({
    api_key: NASA_API_KEY,
    ...params
  });
  
  return `${NASA_BASE_URL}${endpoint}?${queryParams.toString()}`;
};

/**
 * Makes a request to the NASA API
 * @param {string} endpoint - The NASA API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} The API response data
 */
const fetchNasaApi = async (endpoint, params = {}) => {
  try {
    if (!NASA_API_KEY) {
      throw new Error('NASA_API_KEY is missing from environment variables');
    }
    
    const url = buildNasaApiUrl(endpoint, params);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`NASA API Error (${endpoint}):`, error.message);
    throw error;
  }
};

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

/**
 * Gets or sets cached data
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function to fetch data if not in cache
 * @returns {Promise<Object>} The cached or fetched data
 */
const getCachedData = async (key, fetchFn) => {
  const now = Date.now();
  
  if (cache.has(key)) {
    const { data, expiry } = cache.get(key);
    if (now < expiry) {
      return data;
    }
    // Cache expired, remove it
    cache.delete(key);
  }
  
  // Fetch fresh data
  const data = await fetchFn();
  
  // Cache the result
  cache.set(key, {
    data,
    expiry: now + CACHE_TTL
  });
  
  return data;
};

module.exports = {
  buildNasaApiUrl,
  fetchNasaApi,
  getCachedData
};
