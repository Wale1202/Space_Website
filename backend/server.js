require('dotenv').config();
const express  = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.port || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY
const NASA_BASE_URL = 'https://api.nasa.gov'

app.use(cors());
app.use(express.json());

app.get('/')
