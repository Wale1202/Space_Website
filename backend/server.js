require('dotenv').config();
const express  = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/routes');
const app = express();
const PORT = process.env.PORT || 10000;


app.use(cors());
app.use(express.json());

//app.use('/api', routes);
app.use('/api', (req, res, next) => {
  console.log('Incoming API request to:', req.path);
  routes(req, res, next);
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/my-react-app/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/my-react-app/build', 'index.html'));
  });
}

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested resource does not exist' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal Server Error' : errorMessage,
    message: process.env.NODE_ENV === 'production' && statusCode === 500 
      ? 'An unexpected error occurred' 
      : errorMessage
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  
  // Verify NASA API key is set
  if (!process.env.NASA_API_KEY) {
    console.warn('WARNING: NASA_API_KEY is not set in environment variables');
  }
});
