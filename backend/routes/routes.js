const express = require('express');
const router = express.Router();
const { getAPOD} = require('../controllers/controller');

// API
router.get('/apod',getAPOD);

router.get('/test', (req, res) => res.json({ message: "Router is working"}));


module.exports = router;