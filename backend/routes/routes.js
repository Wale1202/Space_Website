const express = require('express');
const router = express.Router();
const { getAPOD} = require('../controllers/controller');

// API
// to check if api is working
router.get('/', (req, res) => {
  res.json({ 
    status: 'API is working',
    message: 'Welcome to NASA API Explorer',
    endpoints: {
      apod: '/api/apod',
      test: '/api/test'
    }
  });
});
router.get('/apod',getAPOD);

router.get('/test', (req, res) => res.json({ message: "Router is working"}));


module.exports = router;