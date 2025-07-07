import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../utils/authService';
import './HealthForm.css';

function HealthForm() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    bloodPressure: '',
    heartRate: '',
    diabetes: 'no',
    hypertension: 'no',
    smoking: 'no',
    alcohol: 'no',
    exercise: 'no',
    sleepHours: '',
    stressLevel: 'low',
    diet: 'balanced',
    symptoms: '',
    medications: '',
    allergies: '',
    familyHistory: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save assessment to localStorage
      const assessments = JSON.parse(localStorage.getItem('healthAssessments') || '[]');
      const newAssessment = {
        id: Date.now(),
        userId: authService.getCurrentUser()?.id,
        data: formData,
        date: new Date().toISOString(),
        status: 'completed'
      };
      assessments.push(newAssessment);
      localStorage.setItem('healthAssessments', JSON.stringify(assessments));

      setMessage('Health assessment completed successfully! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      setMessage('Assessment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h3>Basic Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (cm) *</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="100"
            max="250"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg) *</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="20"
            max="300"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>Vital Signs</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="bloodPressure">Blood Pressure (mmHg)</label>
          <input
            type="text"
            id="bloodPressure"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            placeholder="e.g., 120/80"
          />
        </div>
        <div className="form-group">
          <label htmlFor="heartRate">Heart Rate (bpm)</label>
          <input
            type="number"
            id="heartRate"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            min="40"
            max="200"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sleepHours">Sleep Hours per Night</label>
          <select
            id="sleepHours"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
          >
            <option value="">Select Hours</option>
            <option value="less-than-6">Less than 6 hours</option>
            <option value="6-7">6-7 hours</option>
            <option value="7-8">7-8 hours</option>
            <option value="8-9">8-9 hours</option>
            <option value="more-than-9">More than 9 hours</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stressLevel">Stress Level</label>
          <select
            id="stressLevel"
            name="stressLevel"
            value={formData.stressLevel}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="very-high">Very High</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>Medical History</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="diabetes">Diabetes</label>
          <select
            id="diabetes"
            name="diabetes"
            value={formData.diabetes}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="prediabetes">Prediabetes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hypertension">Hypertension</label>
          <select
            id="hypertension"
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="controlled">Controlled with medication</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="smoking">Smoking</label>
          <select
            id="smoking"
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="former">Former smoker</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="alcohol">Alcohol Consumption</label>
          <select
            id="alcohol"
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="occasional">Occasional</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exercise">Regular Exercise</label>
          <select
            id="exercise"
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="light">Light (1-2 times/week)</option>
            <option value="moderate">Moderate (3-4 times/week)</option>
            <option value="intense">Intense (5+ times/week)</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="diet">Diet Type</label>
          <select
            id="diet"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
          >
            <option value="balanced">Balanced</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3>Additional Information</h3>
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="symptoms">Current Symptoms</label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Describe any current symptoms..."
            rows="3"
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="medications">Current Medications</label>
          <textarea
            id="medications"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            placeholder="List current medications..."
            rows="3"
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="allergies">Allergies</label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="List any allergies..."
            rows="2"
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="familyHistory">Family Medical History</label>
          <textarea
            id="familyHistory"
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            placeholder="Relevant family medical history..."
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    
      <div className="health-form-container">
        <div className="form-header">
          <h1>Health Assessment Form</h1>
          <p>Complete this comprehensive health assessment to get personalized recommendations</p>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
          <div className="progress-steps">
            <span className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</span>
            <span className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</span>
            <span className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</span>
            <span className={`step ${currentStep >= 4 ? 'active' : ''}`}>4</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="health-form">
          {renderCurrentStep()}

          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-outline">
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
              </button>
            )}
          </div>
        </form>
      </div>
    
  );
}

export default HealthForm;
