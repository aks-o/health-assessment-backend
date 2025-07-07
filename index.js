// Simple Express server for Render deployment
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Define a basic GET route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the HealthConnect API' });
});

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Basic routes
app.get('/', (req, res) => {
  res.send('Health Assessment API is running!');
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
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      age: 35,
      gender: 'Male',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, USA',
      bloodType: 'O+',
      emergencyContact: 'Jane Doe (Wife) - (555) 987-6543'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com',
      age: 42,
      gender: 'Female',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Somewhere, USA',
      bloodType: 'A-',
      emergencyContact: 'Bob Smith (Husband) - (555) 876-5432'
    },
    { 
      id: 3, 
      name: 'Raj Patel', 
      email: 'raj@example.com',
      age: 28,
      gender: 'Male',
      phone: '(555) 345-6789',
      address: '789 Pine Rd, Nowhere, USA',
      bloodType: 'B+',
      emergencyContact: 'Priya Patel (Sister) - (555) 765-4321'
    }
  ]);
});

// Get a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      age: 35,
      gender: 'Male',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, USA',
      bloodType: 'O+',
      emergencyContact: 'Jane Doe (Wife) - (555) 987-6543',
      medicalConditions: ['Hypertension', 'High Cholesterol'],
      allergies: ['Penicillin'],
      medications: ['Lisinopril 10mg daily', 'Atorvastatin 20mg daily'],
      height: '5\'10"',
      weight: '185 lbs'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com',
      age: 42,
      gender: 'Female',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Somewhere, USA',
      bloodType: 'A-',
      emergencyContact: 'Bob Smith (Husband) - (555) 876-5432',
      medicalConditions: ['Asthma', 'Seasonal allergies'],
      allergies: ['Pollen', 'Dust mites', 'Shellfish'],
      medications: ['Albuterol inhaler as needed', 'Loratadine 10mg daily'],
      height: '5\'6"',
      weight: '142 lbs'
    },
    { 
      id: 3, 
      name: 'Raj Patel', 
      email: 'raj@example.com',
      age: 28,
      gender: 'Male',
      phone: '(555) 345-6789',
      address: '789 Pine Rd, Nowhere, USA',
      bloodType: 'B+',
      emergencyContact: 'Priya Patel (Sister) - (555) 765-4321',
      medicalConditions: ['None'],
      allergies: ['None'],
      medications: ['None'],
      height: '5\'9"',
      weight: '165 lbs'
    }
  ];
  
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

app.get('/api/doctors', (req, res) => {
  res.status(200).json([
    { 
      id: 1, 
      name: 'Dr. Sarah Smith', 
      specialization: 'Cardiology',
      qualifications: 'MD, FACC',
      experience: '15 years',
      hospital: 'City Medical Center',
      bio: 'Dr. Smith is a board-certified cardiologist specializing in preventive cardiology and heart disease management.',
      languages: ['English', 'Spanish'],
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      rating: 4.8,
      imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      contactInfo: {
        email: 'dr.smith@citymedical.com',
        phone: '(555) 111-2222',
        office: 'Suite 302, City Medical Center'
      }
    },
    { 
      id: 2, 
      name: 'Dr. Michael Johnson', 
      specialization: 'Neurology',
      qualifications: 'MD, PhD, FAAN',
      experience: '12 years',
      hospital: 'University Hospital',
      bio: 'Dr. Johnson focuses on neurological disorders and has pioneered several treatments for migraines and seizure disorders.',
      languages: ['English', 'French'],
      availableDays: ['Tuesday', 'Thursday', 'Saturday'],
      rating: 4.7,
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      contactInfo: {
        email: 'dr.johnson@unihealth.org',
        phone: '(555) 222-3333',
        office: 'Neurology Wing, Room 415, University Hospital'
      }
    },
    { 
      id: 3, 
      name: 'Dr. Aisha Patel', 
      specialization: 'Endocrinology',
      qualifications: 'MD, FACE',
      experience: '10 years',
      hospital: 'Wellness Medical Group',
      bio: 'Dr. Patel specializes in diabetes management, thyroid disorders, and metabolic conditions.',
      languages: ['English', 'Hindi', 'Gujarati'],
      availableDays: ['Monday', 'Tuesday', 'Thursday'],
      rating: 4.9,
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      contactInfo: {
        email: 'dr.patel@wellnessmedical.com',
        phone: '(555) 333-4444',
        office: 'Wellness Medical Plaza, Suite 210'
      }
    },
    { 
      id: 4, 
      name: 'Dr. Robert Chen', 
      specialization: 'Pulmonology',
      qualifications: 'MD, FCCP',
      experience: '18 years',
      hospital: 'Respiratory Care Institute',
      bio: 'Dr. Chen is an expert in respiratory conditions including asthma, COPD, and sleep disorders.',
      languages: ['English', 'Mandarin'],
      availableDays: ['Wednesday', 'Friday', 'Saturday'],
      rating: 4.6,
      imageUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
      contactInfo: {
        email: 'dr.chen@respiratorycare.org',
        phone: '(555) 444-5555',
        office: 'Respiratory Care Institute, Building B'
      }
    }
  ]);
});

app.get('/api/assessments', (req, res) => {
  res.status(200).json([
    { 
      id: 1, 
      title: 'Heart Health Assessment', 
      category: 'Cardiology',
      description: 'Evaluate your cardiovascular health with this comprehensive assessment',
      estimatedTime: '5-10 minutes',
      recommendedFor: 'Adults over 30, especially those with family history of heart disease',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3',
      doctorId: 1
    },
    { 
      id: 2, 
      title: 'Mental Health Screening', 
      category: 'Psychology',
      description: 'Check your psychological well-being with our validated screening tool',
      estimatedTime: '8-12 minutes',
      recommendedFor: 'Anyone experiencing stress, anxiety, or mood changes',
      imageUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3',
      doctorId: 2
    },
    { 
      id: 3, 
      title: 'Diabetes Risk Assessment', 
      category: 'Endocrinology',
      description: 'Evaluate your risk factors for developing Type 2 Diabetes',
      estimatedTime: '3-5 minutes',
      recommendedFor: 'Adults with family history of diabetes, overweight individuals',
      imageUrl: 'https://images.unsplash.com/photo-1505684084851-933683afc391?ixlib=rb-4.0.3',
      doctorId: 3
    },
    { 
      id: 4, 
      title: 'Respiratory Health Check', 
      category: 'Pulmonology',
      description: 'Assess your lung function and respiratory symptoms',
      estimatedTime: '5-7 minutes',
      recommendedFor: 'Smokers, those with breathing difficulties, asthma or COPD patients',
      imageUrl: 'https://images.unsplash.com/photo-1631815585553-6e9981c7e128?ixlib=rb-4.0.3',
      doctorId: 4
    }
  ]);
});

// Get a specific assessment with questions by ID
app.get('/api/assessments/:id', (req, res) => {
  const assessmentId = parseInt(req.params.id);
  
  const assessments = {
    1: { // Heart Health Assessment
      id: 1, 
      title: 'Heart Health Assessment', 
      category: 'Cardiology',
      description: 'Evaluate your cardiovascular health with this comprehensive assessment',
      estimatedTime: '5-10 minutes',
      recommendedFor: 'Adults over 30, especially those with family history of heart disease',
      doctorId: 1,
      questions: [
        {
          id: 1,
          text: 'Do you have a family history of heart disease?',
          type: 'multiple-choice',
          options: ['Yes', 'No', 'Not sure'],
          required: true
        },
        {
          id: 2,
          text: 'Do you currently smoke or have you smoked in the past?',
          type: 'multiple-choice',
          options: ['Current smoker', 'Former smoker', 'Never smoked'],
          required: true
        },
        {
          id: 3,
          text: 'How many days per week do you engage in moderate to intense physical activity for at least 30 minutes?',
          type: 'multiple-choice',
          options: ['0-1 days', '2-3 days', '4-5 days', '6-7 days'],
          required: true
        },
        {
          id: 4,
          text: 'What is your blood pressure? (If known)',
          type: 'text',
          placeholder: 'e.g., 120/80',
          required: false
        },
        {
          id: 5,
          text: 'What is your total cholesterol level? (If known)',
          type: 'text',
          placeholder: 'e.g., 200 mg/dL',
          required: false
        },
        {
          id: 6,
          text: 'Have you experienced any chest pain or discomfort during physical activity?',
          type: 'multiple-choice',
          options: ['Yes', 'No', 'Occasionally'],
          required: true
        },
        {
          id: 7,
          text: 'Rate your overall stress level on a scale of 1-10',
          type: 'slider',
          min: 1,
          max: 10,
          required: true
        }
      ]
    },
    2: { // Mental Health Assessment
      id: 2, 
      title: 'Mental Health Screening', 
      category: 'Psychology',
      description: 'Check your psychological well-being with our validated screening tool',
      estimatedTime: '8-12 minutes',
      recommendedFor: 'Anyone experiencing stress, anxiety, or mood changes',
      doctorId: 2,
      questions: [
        {
          id: 1,
          text: 'Over the last 2 weeks, how often have you felt down, depressed, or hopeless?',
          type: 'multiple-choice',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
          required: true
        },
        {
          id: 2,
          text: 'Over the last 2 weeks, how often have you had little interest or pleasure in doing things?',
          type: 'multiple-choice',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
          required: true
        },
        {
          id: 3,
          text: 'How often do you feel nervous, anxious, or on edge?',
          type: 'multiple-choice',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
          required: true
        },
        {
          id: 4,
          text: 'How would you rate your sleep quality over the past month?',
          type: 'multiple-choice',
          options: ['Very good', 'Fairly good', 'Fairly bad', 'Very bad'],
          required: true
        },
        {
          id: 5,
          text: 'Are you currently taking any medication for psychological or emotional issues?',
          type: 'multiple-choice',
          options: ['Yes', 'No', 'Prefer not to say'],
          required: false
        },
        {
          id: 6,
          text: 'Do you have thoughts that you would be better off dead or of hurting yourself in some way?',
          type: 'multiple-choice',
          options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
          required: true,
          warningText: 'If you are experiencing thoughts of self-harm, please contact a mental health professional or crisis hotline immediately.'
        }
      ]
    },
    3: { // Diabetes Risk Assessment
      id: 3, 
      title: 'Diabetes Risk Assessment', 
      category: 'Endocrinology',
      description: 'Evaluate your risk factors for developing Type 2 Diabetes',
      estimatedTime: '3-5 minutes',
      recommendedFor: 'Adults with family history of diabetes, overweight individuals',
      doctorId: 3,
      questions: [
        {
          id: 1,
          text: 'What is your age group?',
          type: 'multiple-choice',
          options: ['Under 40 years', '40-49 years', '50-59 years', '60 years or older'],
          required: true
        },
        {
          id: 2,
          text: 'What is your BMI? (Body Mass Index)',
          type: 'multiple-choice',
          options: ['Less than 25', '25-30', '30-35', 'Greater than 35', 'I don\'t know'],
          required: true,
          helpText: 'BMI = weight(kg) / height(m)²'
        },
        {
          id: 3,
          text: 'Do you have a parent, brother, or sister with diabetes?',
          type: 'multiple-choice',
          options: ['Yes', 'No', 'Not sure'],
          required: true
        },
        {
          id: 4,
          text: 'Have you ever been diagnosed with high blood pressure?',
          type: 'multiple-choice',
          options: ['Yes', 'No', 'Not sure'],
          required: true
        },
        {
          id: 5,
          text: 'How physically active are you on a typical day?',
          type: 'multiple-choice',
          options: ['Not active', 'Somewhat active', 'Very active'],
          required: true
        }
      ]
    },
    4: { // Respiratory Health Check
      id: 4, 
      title: 'Respiratory Health Check', 
      category: 'Pulmonology',
      description: 'Assess your lung function and respiratory symptoms',
      estimatedTime: '5-7 minutes',
      recommendedFor: 'Smokers, those with breathing difficulties, asthma or COPD patients',
      doctorId: 4,
      questions: [
        {
          id: 1,
          text: 'Do you cough regularly?',
          type: 'multiple-choice',
          options: ['No', 'Occasionally', 'Most days', 'Every day'],
          required: true
        },
        {
          id: 2,
          text: 'Do you get short of breath with mild exercise or while performing daily activities?',
          type: 'multiple-choice',
          options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
          required: true
        },
        {
          id: 3,
          text: 'Do you currently smoke cigarettes or other tobacco products?',
          type: 'multiple-choice',
          options: ['Never smoked', 'Former smoker', 'Current smoker (less than 1 pack per day)', 'Current smoker (1 or more packs per day)'],
          required: true
        },
        {
          id: 4,
          text: 'Are you exposed to dust, fumes, or chemicals at work or home?',
          type: 'multiple-choice',
          options: ['No exposure', 'Occasional exposure', 'Regular exposure', 'Constant exposure'],
          required: true
        },
        {
          id: 5,
          text: 'Have you been diagnosed with any of the following conditions? (Select all that apply)',
          type: 'checkbox',
          options: ['Asthma', 'COPD/Emphysema', 'Chronic bronchitis', 'Sleep apnea', 'Pulmonary fibrosis', 'None of the above'],
          required: true
        },
        {
          id: 6,
          text: 'Have you had a recent chest X-ray or pulmonary function test?',
          type: 'multiple-choice',
          options: ['Yes, within the last year', 'Yes, 1-3 years ago', 'Yes, more than 3 years ago', 'Never'],
          required: true
        }
      ]
    }
  };
  
  const assessment = assessments[assessmentId];
  if (!assessment) {
    return res.status(404).json({ message: 'Assessment not found' });
  }
  res.status(200).json(assessment);
});

// User health records
app.get('/api/users/:id/health-records', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Mock data for user health records
  const healthRecords = {
    1: [
      {
        id: 1,
        date: '2025-06-01',
        type: 'Annual Checkup',
        doctor: 'Dr. Sarah Smith',
        facility: 'City Medical Center',
        summary: 'General health in good condition. Blood pressure slightly elevated.',
        vitals: {
          bloodPressure: '135/85',
          heartRate: 72,
          temperature: 98.6,
          oxygenSaturation: 98,
          weight: '185 lbs',
          height: '5\'10"',
          bmi: 26.5
        },
        labResults: [
          { test: 'Complete Blood Count', result: 'Normal', units: '', referenceRange: '', notes: 'All values within normal limits' },
          { test: 'Cholesterol, Total', result: '210', units: 'mg/dL', referenceRange: '< 200', notes: 'Slightly elevated' },
          { test: 'HDL', result: '45', units: 'mg/dL', referenceRange: '> 40', notes: 'Acceptable' },
          { test: 'LDL', result: '130', units: 'mg/dL', referenceRange: '< 100', notes: 'Elevated' },
          { test: 'Triglycerides', result: '175', units: 'mg/dL', referenceRange: '< 150', notes: 'Elevated' },
          { test: 'Glucose', result: '98', units: 'mg/dL', referenceRange: '70-99', notes: 'Normal' }
        ],
        recommendations: [
          'Reduce saturated fat intake',
          'Increase physical activity to 150 minutes per week',
          'Follow-up in 6 months',
          'Continue current medications'
        ]
      },
      {
        id: 2,
        date: '2025-02-15',
        type: 'Cardiac Consultation',
        doctor: 'Dr. Sarah Smith',
        facility: 'City Medical Center',
        summary: 'Consultation for occasional chest discomfort during exercise. ECG normal at rest.',
        vitals: {
          bloodPressure: '140/88',
          heartRate: 78,
          oxygenSaturation: 97
        },
        tests: [
          { name: 'ECG', result: 'Normal sinus rhythm. No acute changes.', date: '2025-02-15' }
        ],
        recommendations: [
          'Scheduled stress test for 2025-03-01',
          'Daily 81mg aspirin',
          'Follow heart-healthy diet',
          'Call if chest pain worsens or occurs at rest'
        ]
      },
      {
        id: 3,
        date: '2024-10-10',
        type: 'Respiratory Infection',
        doctor: 'Dr. Robert Chen',
        facility: 'Urgent Care Clinic',
        summary: 'Acute bronchitis diagnosed. No signs of pneumonia.',
        vitals: {
          bloodPressure: '130/82',
          heartRate: 88,
          temperature: 100.2,
          oxygenSaturation: 96,
        },
        medications: [
          { name: 'Azithromycin', dosage: '500mg on day 1, then 250mg daily', duration: '5 days' },
          { name: 'Benzonatate', dosage: '200mg', frequency: 'three times daily', duration: '7 days' }
        ],
        recommendations: [
          'Rest and hydration',
          'Follow-up if symptoms worsen or do not improve within 5 days',
          'Avoid strenuous activity until symptoms resolve'
        ]
      }
    ],
    2: [
      {
        id: 1,
        date: '2025-05-20',
        type: 'Wellness Exam',
        doctor: 'Dr. Aisha Patel',
        facility: 'Wellness Medical Group',
        summary: 'Overall good health. Vitamin D levels low.',
        vitals: {
          bloodPressure: '118/75',
          heartRate: 65,
          temperature: 98.4,
          oxygenSaturation: 99,
          weight: '142 lbs',
          height: '5\'6"',
          bmi: 22.9
        },
        recommendations: [
          'Vitamin D supplement 2000 IU daily',
          'Continue regular exercise regimen',
          'Annual follow-up recommended'
        ]
      }
    ]
  };
  
  const records = healthRecords[userId] || [];
  res.status(200).json(records);
});

// Submit assessment results
app.post('/api/assessments/:id/submit', (req, res) => {
  const assessmentId = parseInt(req.params.id);
  const { userId, answers } = req.body;
  
  // Get the assessment type to provide tailored results
  const assessments = [
    {
      id: 1,
      title: 'Heart Health Assessment',
      category: 'Cardiology',
      primarySpecialty: 'Cardiology',
      relatedSpecialties: ['Internal Medicine', 'Family Medicine']
    },
    {
      id: 2,
      title: 'Mental Health Assessment',
      category: 'Mental Health',
      primarySpecialty: 'Psychiatry',
      relatedSpecialties: ['Psychology', 'Therapy']
    },
    {
      id: 3,
      title: 'Diabetes Risk Assessment',
      category: 'Endocrinology',
      primarySpecialty: 'Endocrinology',
      relatedSpecialties: ['Internal Medicine', 'Dietitian']
    },
    {
      id: 4,
      title: 'Respiratory Health Evaluation',
      category: 'Pulmonology',
      primarySpecialty: 'Pulmonology',
      relatedSpecialties: ['Allergy & Immunology', 'Internal Medicine']
    }
  ];
  
  // Find the assessment
  const assessment = assessments.find(a => a.id === assessmentId) || assessments[0];
  
  // Generate a score - in a real app would be calculated from answers
  const score = Math.floor(Math.random() * 100);
  
  // Define risk level based on score
  let riskLevel, urgency;
  if (score < 30) {
    riskLevel = 'Low';
    urgency = 'Routine';
  } else if (score < 70) {
    riskLevel = 'Moderate';
    urgency = 'Soon';
  } else {
    riskLevel = 'High';
    urgency = 'Urgent';
  }
  
  // Find relevant doctors based on assessment type and risk level
  const doctorsBySpecialty = {
    'Cardiology': [1, 3], // IDs of doctors with this specialty
    'Psychiatry': [5],
    'Psychology': [7],
    'Therapy': [8],
    'Endocrinology': [4],
    'Pulmonology': [2],
    'Allergy & Immunology': [6],
    'Internal Medicine': [3, 9],
    'Family Medicine': [10, 11],
    'Dietitian': [12]
  };
  
  // Get doctor IDs for primary and related specialties
  const recommendedDoctorIds = [
    ...doctorsBySpecialty[assessment.primarySpecialty] || [],
    ...assessment.relatedSpecialties.flatMap(specialty => doctorsBySpecialty[specialty] || [])
  ];
  
  // Remove duplicates
  const uniqueDoctorIds = [...new Set(recommendedDoctorIds)];
  
  // Mock doctor recommendations
  const doctorRecommendations = uniqueDoctorIds.map(doctorId => {
    // Find the doctor from our doctors list - this would come from a database
    // Using a simple mapping for this mock
    const doctors = [
      { id: 1, name: 'Dr. Jennifer Wilson', specialty: 'Cardiology', rating: 4.9 },
      { id: 2, name: 'Dr. Michael Chen', specialty: 'Pulmonology', rating: 4.7 },
      { id: 3, name: 'Dr. Sarah Johnson', specialty: 'Internal Medicine', rating: 4.8 },
      { id: 4, name: 'Dr. Robert Patel', specialty: 'Endocrinology', rating: 4.6 },
      { id: 5, name: 'Dr. Maria Rodriguez', specialty: 'Psychiatry', rating: 4.9 },
      { id: 6, name: 'Dr. James Lee', specialty: 'Allergy & Immunology', rating: 4.5 },
      { id: 7, name: 'Dr. Emily Thompson', specialty: 'Psychology', rating: 4.8 },
      { id: 8, name: 'Dr. David Murphy', specialty: 'Therapy', rating: 4.7 },
      { id: 9, name: 'Dr. Lisa Garcia', specialty: 'Internal Medicine', rating: 4.6 },
      { id: 10, name: 'Dr. John Smith', specialty: 'Family Medicine', rating: 4.5 },
      { id: 11, name: 'Dr. Aisha Khan', specialty: 'Family Medicine', rating: 4.8 },
      { id: 12, name: 'Susan Johnson, RD', specialty: 'Dietitian', rating: 4.7 }
    ];
    
    const doctor = doctors.find(d => d.id === doctorId) || {
      id: doctorId,
      name: `Dr. Provider ${doctorId}`,
      specialty: 'General Practice',
      rating: 4.0
    };
    
    return {
      doctorId: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      rating: doctor.rating,
      reasonForReferral: doctor.specialty === assessment.primarySpecialty ?
        `Primary specialist for ${assessment.category} issues` :
        `Supporting care for ${assessment.category} management`,
      urgency: doctor.specialty === assessment.primarySpecialty ? urgency : 'As needed'
    };
  });
  
  // Create detailed assessment report sections based on assessment type
  const reportSections = [];
  
  // Heart Health Assessment specific report
  if (assessmentId === 1) {
    reportSections.push(
      {
        title: 'Cardiovascular Risk Factors',
        data: {
          'Blood Pressure Category': score > 70 ? 'Elevated' : 'Normal',
          'Cholesterol Levels': score > 50 ? 'Above Optimal' : 'Optimal',
          'Family History Risk': score > 60 ? 'Significant' : 'Low',
          'Lifestyle Factors': score > 40 ? 'Some concerns' : 'Good habits'
        }
      },
      {
        title: 'Heart Health Metrics',
        data: {
          'Heart Age': `${Math.floor(35 + (score / 10))} years`,
          '10-Year Risk': `${Math.floor(score / 10)}%`,
          'Metabolic Health': score < 50 ? 'Good' : 'Needs attention'
        }
      }
    );
  }
  // Mental Health Assessment specific report
  else if (assessmentId === 2) {
    reportSections.push(
      {
        title: 'Emotional Wellbeing',
        data: {
          'Anxiety Level': score > 60 ? 'Elevated' : 'Normal range',
          'Depression Indicators': score > 65 ? 'Present' : 'Minimal',
          'Stress Management': score > 50 ? 'Needs improvement' : 'Effective',
          'Sleep Quality': score > 40 ? 'Disrupted' : 'Adequate'
        }
      },
      {
        title: 'Support Systems',
        data: {
          'Social Connections': score > 70 ? 'Limited' : 'Strong',
          'Coping Mechanisms': score > 50 ? 'Could be improved' : 'Effective'
        }
      }
    );
  }
  // Diabetes Risk Assessment
  else if (assessmentId === 3) {
    reportSections.push(
      {
        title: 'Metabolic Indicators',
        data: {
          'Blood Sugar Range': score > 60 ? 'Elevated' : 'Normal range',
          'Weight Category': score > 50 ? 'Above recommended' : 'Healthy range',
          'Insulin Sensitivity': score > 65 ? 'Potential resistance' : 'Normal'
        }
      },
      {
        title: 'Lifestyle Factors',
        data: {
          'Diet Quality': score > 50 ? 'Needs improvement' : 'Good',
          'Physical Activity': score > 60 ? 'Insufficient' : 'Adequate',
          'Family History Risk': score > 70 ? 'Significant' : 'Low'
        }
      }
    );
  }
  // Respiratory Health Evaluation
  else if (assessmentId === 4) {
    reportSections.push(
      {
        title: 'Lung Function Indicators',
        data: {
          'Breathing Capacity': score > 60 ? 'Reduced' : 'Normal',
          'Respiratory Symptoms': score > 50 ? 'Present' : 'Minimal',
          'Exercise Tolerance': score > 65 ? 'Limited' : 'Good'
        }
      },
      {
        title: 'Environmental Factors',
        data: {
          'Allergen Exposure': score > 50 ? 'Significant' : 'Low',
          'Air Quality Impact': score > 60 ? 'Concerning' : 'Minimal effect',
          'Smoking Status': score > 40 ? 'Current or former smoker' : 'Non-smoker'
        }
      }
    );
  }
  
  // Generic recommendations based on risk level
  let recommendations = [];
  if (riskLevel === 'Low') {
    recommendations = [
      'Continue your current health practices',
      'Schedule routine check-ups annually',
      'Monitor any changes in your symptoms'
    ];
  } else if (riskLevel === 'Moderate') {
    recommendations = [
      `Schedule a follow-up with a ${assessment.primarySpecialty} specialist within 30 days`,
      'Consider lifestyle modifications to address risk factors',
      'Begin monitoring relevant health metrics more regularly',
      'Follow up with your primary care physician to discuss these results'
    ];
  } else {
    recommendations = [
      `Urgent consultation with a ${assessment.primarySpecialty} specialist is recommended within 7-14 days`,
      'Immediate lifestyle interventions are recommended',
      'Start daily monitoring of relevant health metrics',
      'Share these results with your healthcare provider as soon as possible'
    ];
  }
  
  // Create comprehensive result object
  const assessmentResult = {
    id: Math.floor(Math.random() * 10000),
    assessmentId,
    assessmentTitle: assessment.title,
    assessmentCategory: assessment.category,
    userId,
    completedDate: new Date().toISOString(),
    overallScore: score,
    riskLevel,
    urgencyLevel: urgency,
    summary: `Based on your responses, we've identified a ${riskLevel.toLowerCase()} risk level for issues related to ${assessment.category.toLowerCase()}. ${riskLevel === 'High' ? 'We strongly recommend consulting with a healthcare professional soon.' : riskLevel === 'Moderate' ? 'We recommend discussing these results with a healthcare provider.' : 'Continue with regular health check-ups as recommended.'}`,
    reportSections,
    recommendations,
    doctorRecommendations,
    followUpDate: riskLevel === 'High' ? '7-14 days' : riskLevel === 'Moderate' ? '30 days' : '6-12 months',
    nextSteps: [
      'Review your detailed assessment report',
      'Consider scheduling an appointment with one of our recommended specialists',
      'Download your results to share with your healthcare provider',
      'Set a reminder for your recommended follow-up timeline'
    ]
  };
  
  res.status(200).json(assessmentResult);
});

// Blood Donation Endpoints
app.get('/api/blood-donation/centers', (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: 'City Blood Bank',
      address: '123 Main Street, Downtown',
      phone: '(555) 111-2222',
      email: 'info@citybloodbank.org',
      hours: 'Mon-Fri: 8am-7pm, Sat: 9am-5pm, Sun: Closed',
      acceptingDonations: true,
      bloodTypesNeeded: ['O-', 'A+', 'B-'],
      appointmentRequired: true,
      imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: 2,
      name: 'Red Cross Donation Center',
      address: '456 Park Avenue, Midtown',
      phone: '(555) 222-3333',
      email: 'donate@redcross.org',
      hours: 'Mon-Sat: 7am-8pm, Sun: 10am-4pm',
      acceptingDonations: true,
      bloodTypesNeeded: ['All types needed'],
      appointmentRequired: false,
      imageUrl: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa',
      coordinates: { lat: 37.7833, lng: -122.4167 }
    },
    {
      id: 3,
      name: 'Community Health Foundation',
      address: '789 Oak Drive, Westside',
      phone: '(555) 333-4444',
      email: 'donate@communityhealthfdn.org',
      hours: 'Mon-Fri: 9am-6pm, Sat-Sun: Closed',
      acceptingDonations: true,
      bloodTypesNeeded: ['O+', 'AB+', 'AB-'],
      appointmentRequired: true,
      imageUrl: 'https://images.unsplash.com/photo-1631815585553-6e9981c7e128',
      coordinates: { lat: 37.7694, lng: -122.4862 }
    }
  ]);
});

// Find Blood Donors - Search by blood type and location
app.get('/api/blood-donation/donors', (req, res) => {
  // Get query parameters with defaults
  const bloodType = req.query.bloodType || 'all';
  const maxDistance = parseInt(req.query.distance) || 25; // in miles/km
  const location = req.query.location || 'any';
  
  // Mock donors data
  const donors = [
    {
      id: 101,
      name: 'James Wilson',
      bloodType: 'O+',
      lastDonation: '2025-04-15',
      location: 'Downtown',
      distance: 3.2, // in miles or km
      contactMethod: 'app', // contact through app only
      isAvailable: true,
      donationsCount: 15,
      badges: ['Platinum Donor', 'Regular Donor']
    },
    {
      id: 102,
      name: 'Maria Garcia',
      bloodType: 'A-',
      lastDonation: '2025-05-22',
      location: 'Midtown',
      distance: 5.7,
      contactMethod: 'phone',
      isAvailable: true,
      donationsCount: 8,
      badges: ['Gold Donor']
    },
    {
      id: 103,
      name: 'Ahmed Hassan',
      bloodType: 'B+',
      lastDonation: '2025-02-10',
      location: 'Westside',
      distance: 12.3,
      contactMethod: 'app',
      isAvailable: true,
      donationsCount: 22,
      badges: ['Platinum Donor', 'Emergency Donor']
    },
    {
      id: 104,
      name: 'Priya Patel',
      bloodType: 'AB+',
      lastDonation: '2025-06-05',
      location: 'Northside',
      distance: 8.1,
      contactMethod: 'app',
      isAvailable: false, // not currently available
      donationsCount: 5,
      badges: ['Silver Donor']
    },
    {
      id: 105,
      name: 'David Johnson',
      bloodType: 'O-',
      lastDonation: '2025-01-30',
      location: 'Eastside',
      distance: 15.6,
      contactMethod: 'phone',
      isAvailable: true,
      donationsCount: 30,
      badges: ['Universal Donor', 'Platinum Donor', 'Lifetime Achievement']
    },
    {
      id: 106,
      name: 'Sofia Rodriguez',
      bloodType: 'A+',
      lastDonation: '2025-03-12',
      location: 'Southside',
      distance: 6.8,
      contactMethod: 'app',
      isAvailable: true,
      donationsCount: 12,
      badges: ['Gold Donor', 'Regular Donor']
    }
  ];
  
  // Filter by blood type if specified
  let filteredDonors = donors;
  if (bloodType !== 'all') {
    filteredDonors = donors.filter(donor => donor.bloodType === bloodType);
  }
  
  // Filter by distance if specified
  filteredDonors = filteredDonors.filter(donor => donor.distance <= maxDistance);
  
  // Filter by location if specified
  if (location !== 'any') {
    filteredDonors = filteredDonors.filter(donor => donor.location.toLowerCase().includes(location.toLowerCase()));
  }
  
  // Filter by availability
  filteredDonors = filteredDonors.filter(donor => donor.isAvailable);
  
  res.status(200).json(filteredDonors);
});

// Register for blood donation appointment
app.post('/api/blood-donation/appointment', (req, res) => {
  const { userId, donationCenterId, appointmentDate, bloodType } = req.body;
  
  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    userId,
    donationCenterId,
    appointmentDate,
    bloodType,
    status: 'Scheduled',
    confirmationCode: `BD${Math.floor(Math.random() * 10000)}`,
    createdAt: new Date().toISOString()
  });
});

// Register as a blood donor
app.post('/api/blood-donation/register-donor', (req, res) => {
  const { 
    userId, 
    bloodType, 
    frequency, // how often they want to donate
    medicalConditions,
    medications,
    weight,
    lastDonationDate,
    contactPreference,
    emergencyAvailability, // willing to donate in emergencies
    address,
    location,
    travelDistance // how far willing to travel
  } = req.body;
  
  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    userId,
    bloodType,
    donorStatus: 'Active',
    donorSince: new Date().toISOString(),
    frequency,
    medicalApproved: true, // In real app, this would be pending until verified
    lastDonationDate: lastDonationDate || null,
    nextEligibleDate: lastDonationDate ? new Date(new Date(lastDonationDate).setDate(new Date(lastDonationDate).getDate() + 56)).toISOString() : new Date().toISOString(),
    contactPreference,
    emergencyAvailability,
    location,
    travelDistance,
    donationsCount: 0,
    badges: ['New Donor'],
    message: 'Thank you for registering as a blood donor! Your profile is now active.'
  });
});

app.get('/api/blood-donation/history/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  res.status(200).json([
    {
      id: 1,
      userId,
      donationCenter: 'City Blood Bank',
      donationDate: '2025-05-15',
      bloodType: 'O+',
      status: 'Completed',
      amount: '470ml',
      nextEligibleDate: '2025-07-15'
    },
    {
      id: 2,
      userId,
      donationCenter: 'Red Cross Donation Center',
      donationDate: '2025-01-10',
      bloodType: 'O+',
      status: 'Completed',
      amount: '450ml',
      nextEligibleDate: '2025-03-10'
    },
    {
      id: 3,
      userId,
      donationCenter: 'Community Health Foundation',
      donationDate: '2024-09-22',
      bloodType: 'O+',
      status: 'Completed',
      amount: '500ml',
      nextEligibleDate: '2024-11-22'
    }
  ]);
});

// Doctor Registration Endpoints
app.post('/api/doctors/register', (req, res) => {
  const { name, email, specialization, hospital, qualifications, experience } = req.body;
  
  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    name,
    email,
    specialization,
    hospital,
    qualifications,
    experience,
    status: 'Pending Verification',
    createdAt: new Date().toISOString(),
    message: 'Thank you for registering. Your profile is under review and will be activated soon.'
  });
});

// Doctor Availability Endpoints
app.get('/api/doctors/:id/availability', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const startDate = req.query.startDate || new Date().toISOString().split('T')[0]; // Default to today
  
  // Generate 14 days of availability slots starting from startDate
  const availabilitySlots = [];
  
  // Parse the start date
  const currentDate = new Date(startDate);
  
  // Generate slots for the next 14 days
  for (let day = 0; day < 14; day++) {
    // Clone the date to avoid modifying the original
    const slotDate = new Date(currentDate);
    slotDate.setDate(currentDate.getDate() + day);
    
    // Skip Sundays (assuming doctorId 2 doesn't work Sundays)
    if (slotDate.getDay() === 0 && doctorId === 2) {
      continue;
    }
    
    // Format the date as YYYY-MM-DD
    const dateString = slotDate.toISOString().split('T')[0];
    
    // Generate morning slots (9 AM to 12 PM)
    for (let hour = 9; hour < 12; hour++) {
      // Skip 11 AM on Wednesdays for doctorId 1 (reserved for meetings)
      if (slotDate.getDay() === 3 && hour === 11 && doctorId === 1) {
        continue;
      }
      
      availabilitySlots.push({
        doctorId,
        date: dateString,
        time: `${hour}:00 AM`,
        available: Math.random() > 0.3, // 70% chance of being available
        slotDuration: 30, // minutes
        appointmentType: 'In-person'
      });
      
      availabilitySlots.push({
        doctorId,
        date: dateString,
        time: `${hour}:30 AM`,
        available: Math.random() > 0.3,
        slotDuration: 30,
        appointmentType: 'In-person'
      });
    }
    
    // Generate afternoon slots (1 PM to 5 PM)
    for (let hour = 1; hour < 6; hour++) {
      // Doctor 3 only works until 3 PM
      if (hour > 3 && doctorId === 3) {
        continue;
      }
      
      availabilitySlots.push({
        doctorId,
        date: dateString,
        time: `${hour}:00 PM`,
        available: Math.random() > 0.3,
        slotDuration: 30,
        appointmentType: 'In-person'
      });
      
      availabilitySlots.push({
        doctorId,
        date: dateString,
        time: `${hour}:30 PM`,
        available: Math.random() > 0.3,
        slotDuration: 30,
        appointmentType: 'In-person'
      });
    }
    
    // Add virtual consultation slots in the evening
    // Only doctors 1 and 4 offer virtual consultations
    if ([1, 4].includes(doctorId)) {
      for (let hour = 6; hour < 8; hour++) {
        availabilitySlots.push({
          doctorId,
          date: dateString,
          time: `${hour}:00 PM`,
          available: Math.random() > 0.2, // 80% chance of being available
          slotDuration: 20, // Virtual consultations are shorter
          appointmentType: 'Virtual'
        });
        
        availabilitySlots.push({
          doctorId,
          date: dateString,
          time: `${hour}:30 PM`,
          available: Math.random() > 0.2,
          slotDuration: 20,
          appointmentType: 'Virtual'
        });
      }
    }
  }
  
  // Filter to only show available slots
  const availableSlots = availabilitySlots.filter(slot => slot.available);
  
  res.status(200).json(availableSlots);
});

// Book a doctor appointment
app.post('/api/doctors/appointments', (req, res) => {
  const { userId, doctorId, date, time, appointmentType, reason, symptoms, isFollowUp } = req.body;
  
  // In a real app, you would check if this slot is actually available
  
  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    userId,
    doctorId,
    date,
    time,
    appointmentType,
    reason,
    symptoms: symptoms || [],
    isFollowUp: isFollowUp || false,
    status: 'Confirmed',
    confirmationCode: `APT${Math.floor(Math.random() * 10000)}`,
    createdAt: new Date().toISOString(),
    instructions: appointmentType === 'Virtual' ? 
      'You will receive a video call link 15 minutes before your appointment time.' :
      'Please arrive 15 minutes before your appointment with your ID and insurance card.'
  });
});

// Get upcoming doctor appointments for a user
app.get('/api/users/:userId/appointments', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  // Mock data for demonstration
  const appointments = [
    {
      id: 1001,
      userId,
      doctorId: 1,
      doctorName: 'Dr. Jennifer Wilson',
      specialty: 'Cardiology',
      date: '2025-07-15',
      time: '10:30 AM',
      appointmentType: 'In-person',
      location: 'City Medical Center, Room 305',
      reason: 'Annual heart checkup',
      status: 'Confirmed',
      confirmationCode: 'APT4832'
    },
    {
      id: 1002,
      userId,
      doctorId: 3,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Internal Medicine',
      date: '2025-07-22',
      time: '2:00 PM',
      appointmentType: 'In-person',
      location: 'Downtown Health Clinic, Suite 210',
      reason: 'Follow-up on blood pressure medication',
      status: 'Confirmed',
      confirmationCode: 'APT6721'
    },
    {
      id: 1003,
      userId,
      doctorId: 5,
      doctorName: 'Dr. Maria Rodriguez',
      specialty: 'Psychiatry',
      date: '2025-08-03',
      time: '6:30 PM',
      appointmentType: 'Virtual',
      location: 'Video consultation',
      reason: 'Mental health check-in',
      status: 'Scheduled',
      confirmationCode: 'APT1290',
      videoLink: 'https://teleconsult.example.com/dr-rodriguez/APT1290'
    }
  ];
  
  res.status(200).json(appointments);
});

// Prescription Management Endpoints
app.post('/api/prescriptions', (req, res) => {
  const { userId, doctorId, doctorName, medications, instructions, startDate, endDate, refills } = req.body;
  
  const prescriptionId = Math.floor(Math.random() * 10000);
  
  // Format medications with unique IDs for each medication in the prescription
  const prescriptionMedications = medications.map((med, index) => ({
    id: `${prescriptionId}-${index + 1}`,
    name: med.name,
    dosage: med.dosage,
    frequency: med.frequency,
    timing: med.timing || 'As needed',
    specialInstructions: med.specialInstructions || '',
    sideEffects: [
      'Dizziness',
      'Nausea',
      'Headache',
      'Drowsiness'
    ].slice(0, Math.floor(Math.random() * 3) + 1) // Random side effects
  }));
  
  res.status(201).json({
    id: prescriptionId,
    userId,
    doctorId,
    doctorName,
    medications: prescriptionMedications,
    instructions,
    startDate,
    endDate,
    refills: refills || 0,
    status: 'Active',
    createdAt: new Date().toISOString(),
    prescription_url: `https://example.com/prescriptions/${prescriptionId}.pdf`
  });
});

app.get('/api/users/:userId/prescriptions', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  // Mock data for demonstration
  const prescriptions = [
    {
      id: 5001,
      userId,
      doctorId: 1,
      doctorName: 'Dr. Jennifer Wilson',
      medications: [
        {
          id: '5001-1',
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          timing: 'Morning with food',
          specialInstructions: 'Avoid grapefruit juice',
          sideEffects: ['Dizziness', 'Dry cough']
        }
      ],
      instructions: 'Take as directed for blood pressure control. Avoid salt.',
      startDate: '2025-07-01',
      endDate: '2025-10-01',
      refills: 2,
      status: 'Active',
      createdAt: '2025-07-01T10:30:00Z',
      prescription_url: 'https://example.com/prescriptions/5001.pdf'
    },
    {
      id: 5002,
      userId,
      doctorId: 3,
      doctorName: 'Dr. Sarah Johnson',
      medications: [
        {
          id: '5002-1',
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          timing: 'With meals',
          specialInstructions: '',
          sideEffects: ['Nausea', 'Diarrhea']
        },
        {
          id: '5002-2',
          name: 'Simvastatin',
          dosage: '20mg',
          frequency: 'Once daily',
          timing: 'Evening',
          specialInstructions: 'Take at bedtime',
          sideEffects: ['Muscle pain', 'Weakness']
        }
      ],
      instructions: 'Take as directed for diabetes and cholesterol management.',
      startDate: '2025-06-15',
      endDate: '2025-09-15',
      refills: 3,
      status: 'Active',
      createdAt: '2025-06-15T14:45:00Z',
      prescription_url: 'https://example.com/prescriptions/5002.pdf'
    },
    {
      id: 5003,
      userId,
      doctorId: 2,
      doctorName: 'Dr. Michael Brown',
      medications: [
        {
          id: '5003-1',
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          timing: 'Every 8 hours',
          specialInstructions: 'Complete entire course even if feeling better',
          sideEffects: ['Diarrhea', 'Rash']
        }
      ],
      instructions: 'Take for bacterial infection. Complete full course.',
      startDate: '2025-05-20',
      endDate: '2025-05-30',
      refills: 0,
      status: 'Completed',
      createdAt: '2025-05-20T09:15:00Z',
      prescription_url: 'https://example.com/prescriptions/5003.pdf'
    }
  ];
  
  res.status(200).json(prescriptions);
});

// Medication Tracking Endpoints
app.post('/api/medications/track', (req, res) => {
  const { userId, medicationId, prescriptionId, taken, scheduledTime, actualTime, skipped, skipReason } = req.body;
  
  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    userId,
    medicationId,
    prescriptionId,
    scheduled: scheduledTime,
    taken: taken || false,
    takenAt: taken ? actualTime : null,
    skipped: skipped || false,
    skipReason: skipped ? skipReason : null,
    recorded: new Date().toISOString()
  });
});

app.get('/api/users/:userId/medication-schedule', (req, res) => {
  const userId = parseInt(req.params.userId);
  const date = req.query.date || new Date().toISOString().split('T')[0]; // Default to today
  
  // Mock data for demonstration
  const morningMedications = [
    {
      id: '5001-1',
      prescriptionId: 5001,
      name: 'Lisinopril',
      dosage: '10mg',
      time: '08:00 AM',
      status: 'taken',
      takenAt: '2025-07-07T08:15:00Z'
    },
    {
      id: '5002-1',
      prescriptionId: 5002,
      name: 'Metformin',
      dosage: '500mg',
      time: '08:00 AM',
      status: 'taken',
      takenAt: '2025-07-07T08:15:00Z'
    }
  ];
  
  const afternoonMedications = [
    {
      id: '5002-1',
      prescriptionId: 5002,
      name: 'Metformin',
      dosage: '500mg',
      time: '01:00 PM',
      status: 'upcoming',
      takenAt: null
    }
  ];
  
  const eveningMedications = [
    {
      id: '5002-2',
      prescriptionId: 5002,
      name: 'Simvastatin',
      dosage: '20mg',
      time: '09:00 PM',
      status: 'upcoming',
      takenAt: null
    }
  ];
  
  // Calculate adherence stats
  const adherenceStats = {
    totalDoses: 4,
    dosesTaken: 2,
    dosesMissed: 0,
    dosesUpcoming: 2,
    adherenceRate: '100%', // (taken / (taken + missed)) * 100
    currentStreak: 15 // days
  };
  
  res.status(200).json({
    userId,
    date,
    schedule: {
      morning: morningMedications,
      afternoon: afternoonMedications,
      evening: eveningMedications
    },
    adherenceStats
  });
});

// Medicine Centers Endpoints
app.get('/api/medicine-centers', (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: 'City Pharmacy',
      type: 'Retail Pharmacy',
      address: '123 Main Street, Downtown',
      phone: '(555) 555-1234',
      email: 'info@citypharmacy.com',
      hours: 'Mon-Fri: 8am-10pm, Sat-Sun: 9am-9pm',
      services: ['Prescription Filling', '24-Hour Service', 'Vaccination', 'Medication Counseling'],
      insurance: ['Medicare', 'Blue Cross', 'Aetna', 'UnitedHealth'],
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      rating: 4.5
    },
    {
      id: 2,
      name: 'MediQuick',
      type: 'Hospital Pharmacy',
      address: '456 Hospital Drive, Medical District',
      phone: '(555) 555-2345',
      email: 'pharmacy@mediquick.org',
      hours: '24 hours daily',
      services: ['Specialized Medications', 'Compounding', 'Home Delivery', 'Medication Therapy Management'],
      insurance: ['All major insurances accepted'],
      imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b3db3f2',
      coordinates: { lat: 37.7833, lng: -122.4167 },
      rating: 4.8
    },
    {
      id: 3,
      name: 'Community Drug Store',
      type: 'Independent Pharmacy',
      address: '789 Neighborhood Ave, Westside',
      phone: '(555) 555-3456',
      email: 'help@communitydrugs.com',
      hours: 'Mon-Sat: 9am-7pm, Sun: 10am-4pm',
      services: ['Free Delivery', 'Medication Synchronization', 'Medication Reviews', 'Diabetes Care'],
      insurance: ['Medicare', 'Medicaid', 'Blue Cross', 'UnitedHealth'],
      imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b348586bc6f',
      coordinates: { lat: 37.7694, lng: -122.4862 },
      rating: 4.7
    }
  ]);
});

app.post('/api/medicine-centers/register', (req, res) => {
  const { name, type, address, phone, email, hours, services } = req.body;
  
  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    name,
    type,
    address,
    phone,
    email,
    hours,
    services,
    status: 'Pending Verification',
    createdAt: new Date().toISOString(),
    message: 'Thank you for registering your medical center. Your information is under review.'
  });
});

// Medical Report Upload Endpoints
app.post('/api/reports/upload', (req, res) => {
  const { userId, reportType, reportDate, doctorId, description, fileType } = req.body;
  
  // Generate a realistic file URL based on file type
  let fileUrl;
  const fileId = Math.floor(Math.random() * 10000);
  
  // Handle different file types
  switch(fileType) {
    case 'pdf':
      fileUrl = `https://example.com/reports/${userId}/${fileId}.pdf`;
      break;
    case 'image':
      fileUrl = `https://example.com/reports/${userId}/${fileId}.jpg`;
      break;
    case 'scan':
      fileUrl = `https://example.com/reports/${userId}/${fileId}.dcm`; // DICOM format for medical images
      break;
    case 'lab':
      fileUrl = `https://example.com/reports/${userId}/${fileId}.xlsx`;
      break;
    default:
      fileUrl = `https://example.com/reports/${userId}/${fileId}.pdf`;
  }
  
  // In a real app, you'd actually store the file on a server or cloud storage
  
  const reportId = Math.floor(Math.random() * 10000);
  
  res.status(201).json({
    id: reportId,
    userId,
    reportType,
    reportDate,
    doctorId,
    description,
    uploadedAt: new Date().toISOString(),
    status: 'Uploaded',
    fileType,
    fileUrl,
    aiAnalysisPending: true,
    message: 'Report uploaded successfully. AI analysis will be available shortly.'
  });
});

// AI Analysis of Medical Reports
app.get('/api/reports/:reportId/analysis', (req, res) => {
  const reportId = parseInt(req.params.reportId);
  
  // In a real app, this would retrieve an actual AI analysis
  // Here we're providing mock AI analysis based on report type
  
  // Sample reports for demonstration
  const mockReports = {
    // Blood Test Report
    1001: {
      reportType: 'Blood Test',
      analysis: {
        summary: 'Complete Blood Count shows values within normal range with slight elevation in white blood cell count, possibly indicating a mild infection.',
        abnormalFindings: [
          {
            parameter: 'White Blood Cell Count',
            value: '11,500/µL',
            normalRange: '4,500-11,000/µL',
            interpretation: 'Slightly elevated, may indicate ongoing immune response to infection or inflammation',
            urgency: 'Low'
          }
        ],
        normalFindings: [
          'Red Blood Cell Count: 5.1 million/µL (Normal)',
          'Hemoglobin: 14.2 g/dL (Normal)',
          'Hematocrit: 42% (Normal)',
          'Platelet Count: 250,000/µL (Normal)'
        ],
        recommendations: [
          'Follow up with primary care physician if symptoms persist',
          'Consider repeat CBC in 4-6 weeks if white count remains elevated',
          'Stay hydrated and maintain rest during recovery'
        ]
      }
    },
    // X-Ray Report
    1002: {
      reportType: 'Chest X-Ray',
      analysis: {
        summary: 'Chest X-ray shows clear lung fields with no evidence of pneumonia, effusion, or other acute processes. Heart size appears normal.',
        findings: [
          'Lungs: Clear with no infiltrates or effusions',
          'Heart: Normal size and contour',
          'Mediastinum: Within normal limits',
          'Bony structures: No acute abnormalities'
        ],
        impression: 'Normal chest radiograph',
        recommendations: ['No follow-up imaging needed at this time']
      }
    },
    // MRI Report
    1003: {
      reportType: 'MRI Knee',
      analysis: {
        summary: 'MRI of the right knee demonstrates a partial tear of the anterior cruciate ligament (ACL) with mild joint effusion.',
        findings: [
          {
            structure: 'ACL',
            finding: 'Partial tear with surrounding edema',
            severity: 'Moderate',
            urgency: 'Medium'
          },
          {
            structure: 'Joint Space',
            finding: 'Mild effusion present',
            severity: 'Mild',
            urgency: 'Low'
          },
          {
            structure: 'Menisci',
            finding: 'No meniscal tears identified',
            severity: 'Normal',
            urgency: 'None'
          }
        ],
        recommendations: [
          'Orthopedic consultation recommended',
          'Consider physical therapy for strengthening',
          'Activity modification to avoid further injury'
        ]
      }
    },
    // Default analysis for any other report
    default: {
      reportType: 'Medical Report',
      analysis: {
        summary: 'Analysis of uploaded medical document shows all parameters within normal limits.',
        recommendations: ['Follow up with your healthcare provider as needed']
      }
    }
  };
  
  // Return specific analysis if available, otherwise return default
  const reportAnalysis = mockReports[reportId] || mockReports.default;
  
  res.status(200).json({
    reportId,
    analysisCompleted: new Date().toISOString(),
    aiConfidenceScore: 92, // Percentage confidence in analysis
    ...reportAnalysis,
    disclaimerMessage: 'This AI analysis is for informational purposes only and does not replace professional medical advice. Always consult with a qualified healthcare provider.'
  });
});

// Pathology Services Endpoints
app.get('/api/pathology-labs', (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: 'City Diagnostic Center',
      address: '123 Medical Plaza, Downtown',
      phone: '(555) 444-1234',
      email: 'info@citydiagnostics.com',
      hours: 'Mon-Fri: 7am-7pm, Sat: 8am-2pm, Sun: Closed',
      services: [
        'Blood Tests',
        'Urinalysis',
        'Microbiology',
        'Histopathology',
        'Molecular Diagnostics'
      ],
      acceptsInsurance: true,
      hasHomeCollection: true,
      ratings: 4.7,
      turnaroundTime: '24-48 hours',
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: 2,
      name: 'LifeLabs Medical Center',
      address: '456 Health Avenue, Midtown',
      phone: '(555) 444-5678',
      email: 'contact@lifelabs.org',
      hours: 'Mon-Sat: 6am-9pm, Sun: 8am-4pm',
      services: [
        'Comprehensive Blood Work',
        'Genetic Testing',
        'Allergy Testing',
        'Cancer Markers',
        'Covid-19 Testing'
      ],
      acceptsInsurance: true,
      hasHomeCollection: true,
      ratings: 4.9,
      turnaroundTime: '12-24 hours',
      imageUrl: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322',
      coordinates: { lat: 37.7833, lng: -122.4167 }
    },
    {
      id: 3,
      name: 'Wellness Pathology Services',
      address: '789 Medical Drive, Westside',
      phone: '(555) 444-9012',
      email: 'labs@wellnesspathology.com',
      hours: 'Mon-Fri: 7am-5pm, Sat-Sun: Closed',
      services: [
        'Blood Chemistry',
        'Hormone Testing',
        'Nutritional Panels',
        'Toxicology',
        'Wellness Screenings'
      ],
      acceptsInsurance: false,
      hasHomeCollection: false,
      ratings: 4.5,
      turnaroundTime: '48-72 hours',
      imageUrl: 'https://images.unsplash.com/photo-1559757175-7b21e5afae9b',
      coordinates: { lat: 37.7694, lng: -122.4862 }
    }
  ]);
});

app.post('/api/pathology-labs/book-test', (req, res) => {
  const { userId, labId, testType, preferredDate, preferredTime, requiresHomeCollection, insuranceInfo } = req.body;
  
  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    userId,
    labId,
    testType,
    scheduledDate: preferredDate,
    scheduledTime: preferredTime,
    homeCollection: requiresHomeCollection,
    status: 'Scheduled',
    paymentStatus: 'Pending',
    confirmationCode: `LAB${Math.floor(Math.random() * 10000)}`,
    instructions: 'Please fast for 12 hours before your blood test. Bring your ID and insurance card.',
    createdAt: new Date().toISOString()
  });
});

app.get('/api/pathology-tests', (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      description: 'Evaluates overall health and detects a wide range of disorders including anemia, infection, and leukemia.',
      preparation: 'No special preparation needed.',
      price: 1200,
      turnaroundTime: '24 hours',
      commonlyUsedFor: ['General checkup', 'Fatigue', 'Infection', 'Anemia screening']
    },
    {
      id: 2,
      name: 'Comprehensive Metabolic Panel (CMP)',
      description: 'Measures blood sugar, electrolyte and fluid balance, kidney and liver function.',
      preparation: 'Fast for 8-12 hours before test.',
      price: 1800,
      turnaroundTime: '24 hours',
      commonlyUsedFor: ['General health checkup', 'Medication monitoring', 'Kidney and liver function']
    },
    {
      id: 3,
      name: 'Lipid Panel',
      description: 'Measures cholesterol and triglycerides to assess risk of cardiovascular disease.',
      preparation: 'Fast for 9-12 hours before test.',
      price: 1500,
      turnaroundTime: '24 hours',
      commonlyUsedFor: ['Heart disease risk assessment', 'Cholesterol monitoring']
    },
    {
      id: 4,
      name: 'Hemoglobin A1C',
      description: 'Measures average blood glucose levels over the past 2-3 months.',
      preparation: 'No fasting required.',
      price: 1400,
      turnaroundTime: '24 hours',
      commonlyUsedFor: ['Diabetes diagnosis', 'Diabetes management']
    },
    {
      id: 5,
      name: 'Thyroid Function Panel',
      description: 'Evaluates thyroid function by measuring various hormones.',
      preparation: 'No special preparation needed.',
      price: 2200,
      turnaroundTime: '24-48 hours',
      commonlyUsedFor: ['Fatigue', 'Weight changes', 'Thyroid disorders']
    },
    {
      id: 6,
      name: 'COVID-19 PCR Test',
      description: 'Detects genetic material of the virus that causes COVID-19.',
      preparation: 'Avoid eating, drinking, or brushing teeth 30 minutes before test.',
      price: 2500,
      turnaroundTime: '24-48 hours',
      commonlyUsedFor: ['COVID-19 diagnosis', 'Travel requirements']
    }
  ]);
});

app.get('/api/reports/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  res.status(200).json([
    {
      id: 1,
      userId,
      reportType: 'Blood Test',
      reportDate: '2025-06-01',
      doctor: 'Dr. Sarah Smith',
      description: 'Complete Blood Count (CBC)',
      uploadedAt: '2025-06-02T10:30:00Z',
      status: 'Reviewed',
      fileUrl: 'https://example.com/reports/1/blood_test_cbc.pdf'
    },
    {
      id: 2,
      userId,
      reportType: 'X-Ray',
      reportDate: '2025-05-15',
      doctor: 'Dr. Robert Chen',
      description: 'Chest X-Ray',
      uploadedAt: '2025-05-16T14:22:00Z',
      status: 'Reviewed',
      fileUrl: 'https://example.com/reports/1/chest_xray.pdf'
    },
    {
      id: 3,
      userId,
      reportType: 'Echocardiogram',
      reportDate: '2025-02-20',
      doctor: 'Dr. Sarah Smith',
      description: 'Cardiac Echo',
      uploadedAt: '2025-02-21T09:15:00Z',
      status: 'Reviewed',
      fileUrl: 'https://example.com/reports/1/cardiac_echo.pdf'
    }
  ]);
});

// Voice Assistant AI Endpoints
app.post('/api/voice-assistant/query', async (req, res) => {
  const { query, userId, context } = req.body;
  
  // In a real implementation, this would make an API call to the external service
  // https://healthconnect-ai-472017321000.us-central1.run.app/
  
  // Mock response based on common healthcare queries
  let response;
  const queryLower = query.toLowerCase();
  
  // Simulate different responses based on query contents
  if (queryLower.includes('appointment') || queryLower.includes('schedule')) {
    response = {
      type: 'appointment',
      text: 'I can help you schedule an appointment. Would you like to see available doctors or schedule with a specific doctor?',
      suggestions: ['Show available doctors', 'Schedule with my doctor', 'Cancel']
    };
  } 
  else if (queryLower.includes('medication') || queryLower.includes('medicine')) {
    response = {
      type: 'medication',
      text: 'I can help with your medications. Do you need information about a specific medication, or would you like me to remind you of your medication schedule?',
      suggestions: ['Medication schedule', 'Medication information', 'Set reminder']
    };
  }
  else if (queryLower.includes('blood') || queryLower.includes('donation')) {
    response = {
      type: 'blood_donation',
      text: 'Would you like to find a blood donation center, register as a donor, or search for blood donors?',
      suggestions: ['Find donation center', 'Register as donor', 'Search for donors']
    };
  }
  else if (queryLower.includes('test') || queryLower.includes('lab')) {
    response = {
      type: 'pathology',
      text: 'I can help you find a pathology lab or schedule a diagnostic test. What would you like to do?',
      suggestions: ['Find labs near me', 'Schedule a test', 'View my test results']
    };
  }
  else if (queryLower.includes('doctor') || queryLower.includes('specialist')) {
    response = {
      type: 'doctor',
      text: 'I can help you find doctors or specialists. Would you like to see doctors near you, or search by specialty?',
      suggestions: ['Doctors near me', 'Search by specialty', 'Recommended doctors']
    };
  }
  else if (queryLower.includes('emergency') || queryLower.includes('urgent')) {
    response = {
      type: 'emergency',
      text: 'If this is a medical emergency, please call emergency services immediately at 911. Would you like me to call for you?',
      suggestions: ['Call emergency services', 'Show nearest ER', 'Cancel'],
      priority: 'high'
    };
  }
  else {
    // General health information response
    response = {
      type: 'general',
      text: 'I am your HealthConnect assistant. I can help you with appointments, medications, finding doctors, blood donation, and more. How can I assist you today?',
      suggestions: ['Health assessment', 'My appointments', 'My medications', 'Find doctor']
    };
  }
  
  // Add response metadata
  const aiResponse = {
    id: `query-${Math.floor(Math.random() * 10000)}`,
    timestamp: new Date().toISOString(),
    query: query,
    response: response.text,
    suggestions: response.suggestions,
    type: response.type,
    priority: response.priority || 'normal',
    source: 'HealthConnect AI',
    audioUrl: null // In a real implementation, this could point to a speech audio file
  };
  
  res.status(200).json(aiResponse);
});

app.post('/api/voice-assistant/feedback', (req, res) => {
  const { queryId, feedback, userId } = req.body;
  
  // In a real implementation, this would send the feedback to improve the AI
  
  res.status(200).json({
    success: true,
    message: 'Feedback received. Thank you for helping us improve!',
    queryId,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/voice-assistant/history/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Mock conversation history
  const history = [
    {
      id: 'query-1001',
      timestamp: '2025-07-06T12:30:00Z',
      query: 'When should I take my blood pressure medication?',
      response: 'Based on your prescription for Lisinopril, you should take it once daily in the morning with food.',
      type: 'medication',
      priority: 'normal'
    },
    {
      id: 'query-1002',
      timestamp: '2025-07-06T18:45:00Z',
      query: 'Find me a cardiologist near downtown',
      response: 'I found 3 cardiologists within 5 miles of downtown. The highest rated is Dr. Jennifer Wilson at City Medical Center.',
      type: 'doctor',
      priority: 'normal'
    },
    {
      id: 'query-1003',
      timestamp: '2025-07-07T09:15:00Z',
      query: 'What were the results of my last blood test?',
      response: 'Your last blood test on June 28th showed all values within normal range, with a slight elevation in white blood cell count. Would you like me to explain what this means?',
      type: 'pathology',
      priority: 'normal'
    }
  ];
  
  res.status(200).json(history);
});

// Voice Assistant Settings
app.get('/api/voice-assistant/settings/:userId', (req, res) => {
  const userId = req.params.userId;
  
  res.status(200).json({
    userId,
    voiceEnabled: true,
    preferredVoice: 'female',
    responseSpeed: 'normal',
    wakeWord: 'Hey Health Connect',
    notificationsEnabled: true,
    proactiveAssistant: true,
    privacySettings: {
      recordConversations: false,
      shareDataForImprovement: true,
      locationAccess: 'while_using'
    }
  });
});

app.post('/api/voice-assistant/settings', (req, res) => {
  const { userId, settings } = req.body;
  
  // In a real implementation, this would update the user's settings
  
  res.status(200).json({
    success: true,
    message: 'Voice assistant settings updated successfully',
    userId,
    settings,
    updatedAt: new Date().toISOString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
