const express = require('express');
const web = express();
const bodyparser = require('body-parser');
const path = require('path');

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, 'public');
web.use(express.static(publicPath));

// Add a route to check the directory path
web.get('/check-directory', (req, res) => {
  res.send('Static files are served from: ' + publicPath);
});

// Other middleware and routes go here

const prorouter = require('./router/pro.js');
web.use('/pro',prorouter);

web.listen(5500, () => {
  console.log('Server is running on port 5500');
});


