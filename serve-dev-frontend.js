const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 10000;

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static('public'));

// Define a fallback HTML content
const fallbackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HealthConnect</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
        }
        header {
            background-color: #0066cc;
            color: white;
            padding: 1rem;
            text-align: center;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 0.8rem;
            color: #666;
        }
        .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            background-color: white;
        }
        h2 {
            color: #0066cc;
        }
        .btn {
            display: inline-block;
            background-color: #0066cc;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .btn:hover {
            background-color: #004c99;
        }
    </style>
</head>
<body>
    <header>
        <h1>HealthConnect</h1>
    </header>
    <div class="content">
        <div class="card">
            <h2>Welcome to HealthConnect</h2>
            <p>Your comprehensive health assessment platform is now deployed and running!</p>
            <p>The application consists of:</p>
            <ul>
                <li><strong>Backend API</strong>: <a href="https://healthconnect-backend-8q8t.onrender.com">https://healthconnect-backend-8q8t.onrender.com</a></li>
                <li><strong>Frontend App</strong>: This page</li>
            </ul>
            <p>You can test the API connection by accessing: <a href="https://healthconnect-backend-8q8t.onrender.com/api/health">Health Check Endpoint</a></p>
        </div>
        
        <div class="card">
            <h2>Next Steps</h2>
            <p>To complete your deployment:</p>
            <ol>
                <li>Fix the React build process to generate all required files</li>
                <li>Commit the complete build directory to your repository</li>
                <li>Update the frontend service to serve these files</li>
            </ol>
            <p>For now, you can continue to test your backend API independently.</p>
        </div>
    </div>
    <footer>
        <p>HealthConnect &copy; 2025</p>
    </footer>
</body>
</html>
`;

// Create public directory and index.html if they don't exist
app.use((req, res, next) => {
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
    console.log('Created public directory');
  }
  
  if (!fs.existsSync('public/index.html')) {
    fs.writeFileSync('public/index.html', fallbackHtml);
    console.log('Created fallback index.html');
  }
  
  next();
});

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// For any request that doesn't match a static file, send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Frontend server is running on port ${port}`);
});
