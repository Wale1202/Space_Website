const { fetchNasaApi, getCachedData } = require('../utils/apiHelpers');

const NASA_API_KEY = process.env.NASA_API_KEY;

/**
 * Get Astronomy Picture of the Day
 */
exports.getAPOD = async (req, res, next) => {
  try {
    const cacheKey = `apod-${JSON.stringify(req.query)}`;
    
    const data = await getCachedData(cacheKey, async () => {
      return fetchNasaApi('/planetary/apod', req.query);
    });
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};
/**
 * Get Mars Rover Photos
 */
// This Gets Mars Rover Photos
exports.getMarsPhotos = async (req, res, next) => {
  try { 
    const { rover = 'curiosity', ...params } = req.query;
    const cacheKey = `mars-${rover}-${JSON.stringify(params)}`;
    
    const data = await getCachedData(cacheKey, async () => {
      return fetchNasaApi(`/mars-photos/api/v1/rovers/${rover}/photos`, params);
    });
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};
// This Gets PhotosEarth Polychromatic Imaging Camera
exports.getEPIC = async (req, res, next) => {
  try {
    const { collection = 'natural', date, ...params } = req.query;
    let endpoint = `/EPIC/api/${collection}`;
    
    if (date) {
      endpoint += `/date/${date}`;
    }
    
    const cacheKey = `epic-${collection}-${date || 'latest'}-${JSON.stringify(params)}`;
    
    const data = await getCachedData(cacheKey, async () => {
      return fetchNasaApi(endpoint, params);
    });
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};
// This Gets Near Earth Object Web Service
exports.getNeoWs = async (req, res, next) => {
  try {
    const { start_date, end_date, ...params } = req.query;
    
    // Use the feed endpoint if both dates are provided
    let endpoint = '/neo/rest/v1/feed';
    let queryParams = { ...params };
    
    if (start_date && end_date) {
      queryParams = { ...queryParams, start_date, end_date };
    } else {
      // Uses today endpoint
      endpoint = '/neo/rest/v1/feed/today';
    }
    
    const cacheKey = `neows-${JSON.stringify(queryParams)}`;
    
    const data = await getCachedData(cacheKey, async () => {
      return fetchNasaApi(endpoint, queryParams);
    });
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};
// This Gets the Search NASA Image and Video Library
exports.searchNasaLibrary = async (req, res, next) => {
  try {
    const cacheKey = `library-search-${JSON.stringify(req.query)}`;
    
    const data = await getCachedData(cacheKey, async () => {
      // NASA Image and Video Library uses a different base URL
      const axios = require('axios');
      const url = `https://images-api.nasa.gov/search?${new URLSearchParams(req.query).toString()}`;
      const response = await axios.get(url);
      return response.data;
    });
    
    res.json(data);
  } catch (error) {
    next(error);
  }
};
