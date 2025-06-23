require('dotenv').config();
const express  = require('express');
const axios = require('axios');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
const PORT = process.env.PORT || 5001;

// Right after require statements:
console.log('NASA_API_KEY exists?', !!process.env.NASA_API_KEY); 
console.log('Routes imported?', !!routes);

app.use(cors());
app.use(express.json());
console.log('NASA_API_KEY:', process.env.NASA_API_KEY ? 'Exists' : 'MISSING!');


//app.use('/api', routes);
app.use('/api', (req, res, next) => {
  console.log('Incoming API request to:', req.path);
  routes(req, res, next);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
