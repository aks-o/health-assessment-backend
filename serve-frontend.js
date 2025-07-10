const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'frontend-build')));

// For any request that doesn't match a static file, send the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend-build/index.html'));
});

// Add a simple health check endpoint
app.get('/healthz', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Frontend server is running on port ${port}`);
  console.log(`Serving files from: ${path.join(__dirname, 'frontend-build')}`);
});
