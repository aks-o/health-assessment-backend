import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      {/* This is a completely separate section to ensure heading visibility */}
      <div className="about-heading-section">
        <h1>About HealthConnect</h1>
      </div>
      
      <div className="about-container">
        <div className="about-header">
          <div className="single-line-container">
            <p>Comprehensive healthcare solutions designed to meet all your medical needs.</p>
          </div>
        </div>
        
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h2>Personalized Care</h2>
            <p>Tailored health assessments and recommendations based on your unique medical profile and needs.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h2>Doctor Recommendations</h2>
            <p>Find and book appointments with top-rated doctors in your area and specialty.</p>
            <Link to="/doctors" className="feature-link">Find Doctors →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h2>Secure & Private</h2>
            <p>Your health data is protected with enterprise-grade security and HIPAA compliance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
