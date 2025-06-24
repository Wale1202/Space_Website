const express = require('express');
const router = express.Router();
const { 
  getAPOD, 
  getMarsPhotos, 
  getEPIC, 
  getNeoWs, 
  searchNasaLibrary 
} = require('../controllers/controller');

// API
// to check if api is working
// NASA API endpoints
router.get('/apod', getAPOD);
// router.get('/mars-photos', getMarsPhotos);
// router.get('/epic', getEPIC);
// router.get('/neows', getNeoWs);
// router.get('/search', searchNasaLibrary);


module.exports = router;