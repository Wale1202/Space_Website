const express = require('express');
const router = express.Router();
const { getAPOD} = require('../controllers/controller');

// API
router.get('/api/apod',getAPOD);

module.exports = router;