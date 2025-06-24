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