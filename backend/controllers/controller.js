const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY;

exports.getAPOD = async (req, res, next) => {
  try {
    // Validate API key exists
    if (!NASA_API_KEY) {
      throw new Error('NASA_API_KEY is missing from environment variables');
    }

    const { date, start_date, end_date, count, thumbs } = req.query;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${
      date ? `&date=${date}` : ''}${start_date ? `&start_date=${start_date}` : ''}${
      end_date ? `&end_date=${end_date}` : ''}${count ? `&count=${count}` : ''}${
      thumbs ? `&thumbs=${thumbs}` : ''}`;

    // Log the URL for debugging (optional)
    console.log('NASA API URL:', url);

    const response = await axios.get(url);
    
    // Remove or implement caching properly
    // cacheResponse('apod', response.data); // Either remove or uncomment the import
    
    res.json(response.data);
  } catch (error) {
    console.error('APOD Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch APOD',
      details: error.message
    });
  }
};