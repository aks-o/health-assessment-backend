// Simple Express server for Render deployment
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  res.send('Health Assessment API is running!');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Service is healthy' });
});

// Placeholder routes for key endpoints
app.post('/api/auth/login', (req, res) => {
  res.status(200).json({ 
    message: 'Login successful', 
    token: 'sample-jwt-token',
    user: { id: 1, name: 'Test User', email: 'user@example.com' }
  });
});

app.post('/api/auth/register', (req, res) => {
  res.status(201).json({ 
    message: 'Registration successful',
    user: { id: 2, name: 'New User', email: 'new@example.com' }
  });
});

app.get('/api/users', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'Test User', email: 'user@example.com' },
    { id: 2, name: 'Another User', email: 'another@example.com' }
  ]);
});

app.get('/api/doctors', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'Dr. Smith', specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Johnson', specialization: 'Neurology' }
  ]);
});

app.get('/api/assessments', (req, res) => {
  res.status(200).json([
    { id: 1, title: 'Heart Health Assessment', category: 'Cardiology' },
    { id: 2, title: 'Mental Health Screening', category: 'Psychology' }
  ]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
