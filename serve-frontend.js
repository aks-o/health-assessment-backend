const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
});

// Add health check endpoint before static files to ensure it's accessible
app.get('/healthz', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'frontend-build')));

// For any request that doesn't match a static file, send the index.html
// This enables React Router to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend-build/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Frontend server is running on port ${port}`);
  console.log(`Serving files from: ${path.join(__dirname, 'frontend-build')}`);
  console.log(`API URL: ${process.env.REACT_APP_API_URL || 'not set'}`);
});

