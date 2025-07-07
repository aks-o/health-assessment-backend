# HealthConnect Backend API Documentation

## Overview

The HealthConnect Backend provides a comprehensive set of mock APIs to support a complete healthcare journey for mobile application development. This backend enables developers to test and implement a full-featured health management application with realistic data flows.

## Core Features

The backend supports the following healthcare workflows:

### 1. User Health Assessment Process
- Complete assessment forms for different health areas
- Receive AI-enhanced assessment reports
- Get doctor recommendations based on assessment results

### 2. Doctor Management
- Find and view doctor profiles
- Register new doctors
- Check doctor availability
- Schedule in-person or virtual appointments
- View upcoming appointments

### 3. Medical Records
- Upload various medical documents (PDF, images, scans)
- Retrieve uploaded reports
- Receive AI analysis of medical documents

### 4. Medication Management
- View and manage prescriptions
- Track medication schedule
- Record medication adherence
- Find medicine centers/pharmacies

### 5. Pathology Services
- Find pathology labs
- View available diagnostic tests
- Schedule tests with home collection options
- Upload and analyze test results

### 6. Blood Donation
- Find blood donation centers
- Search for blood donors by type and location
- Register as a blood donor
- Schedule blood donation appointments
- View donation history

## API Endpoints

### Authentication
- `POST /api/login`: User authentication
- `POST /api/register`: User registration
- `POST /api/reset-password`: Password reset

### Users
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `GET /api/users/:id/health-records`: Get user health records

### Health Assessments
- `GET /api/assessments`: Get all assessment types
- `GET /api/assessments/:id`: Get specific assessment details
- `POST /api/assessments/:id/submit`: Submit assessment answers and get comprehensive report

### Doctors
- `GET /api/doctors`: Get all doctors
- `GET /api/doctors/:id`: Get specific doctor details
- `POST /api/doctors/register`: Register as a doctor
- `GET /api/doctors/:id/availability`: Check doctor's availability
- `POST /api/doctors/appointments`: Book a doctor appointment
- `GET /api/users/:userId/appointments`: Get user's upcoming appointments

### Medical Reports
- `POST /api/reports/upload`: Upload medical report (PDF, image, scan)
- `GET /api/reports/:userId`: Get user's medical reports
- `GET /api/reports/:reportId/analysis`: Get AI analysis of a medical report

### Prescriptions & Medications
- `POST /api/prescriptions`: Create new prescription
- `GET /api/users/:userId/prescriptions`: Get user's prescriptions
- `POST /api/medications/track`: Track medication intake
- `GET /api/users/:userId/medication-schedule`: Get user's medication schedule

### Medicine Centers
- `GET /api/medicine-centers`: Find medicine centers/pharmacies
- `POST /api/medicine-centers/register`: Register a new medicine center

### Pathology Services
- `GET /api/pathology-labs`: Find pathology labs
- `GET /api/pathology-tests`: Get available diagnostic tests
- `POST /api/pathology-labs/book-test`: Schedule a diagnostic test

### Blood Donation
- `GET /api/blood-donation/centers`: Find blood donation centers
- `GET /api/blood-donation/donors`: Search for blood donors
- `POST /api/blood-donation/register-donor`: Register as a blood donor
- `POST /api/blood-donation/appointment`: Schedule donation appointment
- `GET /api/blood-donation/history/:userId`: View donation history

### Voice Assistant
- `POST /api/voice-assistant/query`: Process voice assistant queries with AI-enhanced responses
- `POST /api/voice-assistant/feedback`: Submit feedback on voice assistant responses
- `GET /api/voice-assistant/history/:userId`: Retrieve user's conversation history
- `GET /api/voice-assistant/settings/:userId`: Get user voice assistant preferences
- `POST /api/voice-assistant/settings`: Update voice assistant settings

## How to Use

1. Clone the repository
2. Run `npm install` to install dependencies
3. Start the server with `node index.js`
4. The server will run at `http://localhost:3000`

## Deployment

### Deploying to Render

1. Fork or clone this repository to your own GitHub account
2. Sign up for a Render account at https://render.com
3. Create a new Web Service and connect your GitHub repository
4. Use the following settings:
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Environment Variables: Set `PORT` to `3000` and `NODE_ENV` to `production`

### Environment Variables

Copy `.env.example` to `.env` and configure:

```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=* # In production, set to your frontend domain
OPENAI_API_KEY=your_openai_api_key_here # Optional, for voice assistant
```

## Implementation Notes

- This is a mock backend for development purposes
- All data is generated and not persisted between server restarts
- No authentication is implemented for easier testing
- In a production environment, proper authentication, data validation, and database integration would be required
- The Voice Assistant feature uses simulated responses in development mode
- For production Voice Assistant with real speech recognition, provide an OpenAI API key
