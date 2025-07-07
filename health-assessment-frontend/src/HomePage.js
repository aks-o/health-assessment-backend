import React from 'react';
import { Link } from 'react-router-dom';
import HealthForm from './HealthForm';
import './HomePage.css';

function HomePage() {
  return (
    <>
      {/* Header */}
      <header>
        <nav className="container">
          <div className="logo">
            <div className="logo-icon">⚕️</div>
            <span>HealthConnect</span>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#healthform">Health Form</a></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/blood-donation">Blood Donation</Link></li>
          </ul>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <h1>Your Health, Our Priority</h1>
          <p>
            Comprehensive health assessment connecting you with the right medical professionals. Get personalized recommendations for Allopathic, Homeopathic, and Ayurvedic treatments based on your health profile.
          </p>
          <a href="#healthform" className="cta-button">Start Health Assessment</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Comprehensive Assessment</h3>
              <p>Complete health evaluation covering all major body systems and conditions for accurate diagnosis and treatment recommendations.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Multi-Treatment Approach</h3>
              <p>Get recommendations for Allopathic, Homeopathic, and Ayurvedic doctors in your locality with complete address details.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Image Analysis</h3>
              <p>Upload images of affected body parts or injuries for AI-powered analysis and enhanced diagnostic accuracy.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3>Personalized Care</h3>
              <p>Receive tailored treatment suggestions based on your unique health profile, symptoms, and medical history.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📍</div>
              <h3>Local Doctors</h3>
              <p>Find qualified healthcare professionals in your area with verified credentials and patient reviews.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💊</div>
              <h3>Medication Tracking</h3>
              <p>Monitor your current medications and get alerts for potential interactions or side effects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Assessment Form */}
      <section id="healthform" className="health-form-section">
        <div className="container">
          <div className="form-container">
            <div>Test Render</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About HealthConnect</h2>
              <p>HealthConnect is a revolutionary health assessment platform that bridges the gap between patients and healthcare providers. Our comprehensive approach combines modern technology with traditional healing methods.</p>
              <p>We believe in providing personalized healthcare recommendations that consider your unique health profile, preferences, and local healthcare availability.</p>
              <ul className="about-features">
                <li>AI-powered health analysis</li>
                <li>Multi-treatment approach integration</li>
                <li>Local healthcare provider network</li>
                <li>Secure and confidential data handling</li>
                <li>24/7 health monitoring support</li>
                <li>Evidence-based recommendations</li>
              </ul>
            </div>
            <div className="about-image">
              🏥
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
