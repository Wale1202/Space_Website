const axios = require('axios');
//const {cacheResponse} = require('../utils/cache')

const NASA_API_KEY = process.env.NASA_API_KEY
//const NASA_BASE_URL = 'https://api.nasa.gov'

exports.getAPOD = async (req, res, next) => {
  try {
    const { date, start_date, end_date, count, thumbs } = req.query;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${
      date ? `&date=${date}` : ''}${start_date ? `&start_date=${start_date}` : ''}${end_date ? `&end_date=${end_date}` : ''}${count ? `&count=${count}` : ''}${thumbs ? `&thumbs=${thumbs}` : ''}`;
    
    const response = await axios.get(url);
    cacheResponse('apod', response.data);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};