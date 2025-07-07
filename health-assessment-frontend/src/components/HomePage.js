import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <>
    {/* Hero Section */}
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>Comprehensive health assessments, expert doctor recommendations, and seamless healthcare management all in one platform.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/health-form" className="btn btn-outline">Take Assessment</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">🏥</div>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-title">
          <h2>About HealthConnect</h2>
          <p>We're revolutionizing healthcare by connecting patients with the best medical professionals and providing comprehensive health management tools.</p>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🎯</div>
            <h3>Personalized Care</h3>
            <p>Tailored health assessments and recommendations based on your unique medical profile and needs.</p>
          </div>
          <div className="about-card">
            <div className="about-icon">👩‍⚕️</div>
            <h3>Expert Doctors</h3>
            <p>Connect with verified healthcare professionals across all specialties with verified credentials.</p>
          </div>
          <div className="about-card">
            <div className="about-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your health data is protected with enterprise-grade security and HIPAA compliance.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section id="services" className="services-section section">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Comprehensive healthcare solutions designed to meet all your medical needs.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">📊</div>
            <h3>Health Assessments</h3>
            <p>Comprehensive health evaluations with detailed reports and personalized recommendations.</p>
            <Link to="/health-form" className="service-link">Start Assessment →</Link>
          </div>
          <div className="service-card">
            <div className="service-icon">👨‍⚕️</div>
            <h3>Doctor Recommendations</h3>
            <p>Find and book appointments with top-rated doctors in your area and specialty.</p>
            <Link to="/doctor-recommendation" className="service-link">Find Doctors →</Link>
          </div>
          <div className="service-card">
            <div className="service-icon">🩸</div>
            <h3>Blood Donation</h3>
            <p>Connect with blood donation centers and schedule your life-saving donation.</p>
            <Link to="/blood-donation" className="service-link">Donate Blood →</Link>
          </div>
          <div className="service-card">
            <div className="service-icon">📤</div>
            <h3>Report Analysis</h3>
            <p>Upload medical reports for AI-powered analysis and expert insights.</p>
            <Link to="/upload" className="service-link">Upload Report →</Link>
          </div>
          <div className="service-card">
            <div className="service-icon">💊</div>
            <h3>Medicine Centers</h3>
            <p>Find nearby pharmacies and medicine centers with real-time availability.</p>
            <Link to="/medicine-centers" className="service-link">Find Centers →</Link>
          </div>
          <div className="service-card">
            <div className="service-icon">⭐</div>
            <h3>Premium Features</h3>
            <p>Unlock advanced features, priority bookings, and exclusive healthcare benefits.</p>
            <Link to="/register" className="service-link">Upgrade Now →</Link>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="features-section section">
      <div className="container">
        <div className="section-title">
          <h2>Why Choose HealthConnect?</h2>
          <p>Experience healthcare like never before with our innovative platform.</p>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-number">01</div>
            <div className="feature-content">
              <h3>Instant Access</h3>
              <p>Get immediate access to health assessments and doctor recommendations without waiting.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-number">02</div>
            <div className="feature-content">
              <h3>AI-Powered Analysis</h3>
              <p>Advanced AI technology provides accurate health insights and personalized recommendations.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-number">03</div>
            <div className="feature-content">
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support to assist you with any healthcare needs.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-number">04</div>
            <div className="feature-content">
              <h3>Mobile Friendly</h3>
              <p>Access your health information anywhere, anytime with our responsive mobile platform.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="cta-section section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Take Control of Your Health?</h2>
          <p>Join thousands of users who trust HealthConnect for their healthcare needs.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Create Account</Link>
            <Link to="/login" className="btn btn-outline">Sign In</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default HomePage;