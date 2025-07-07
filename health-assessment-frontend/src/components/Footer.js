import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HealthConnect</h3>
          <p>Your comprehensive health assessment and medical services platform.</p>
          <div className="social-links">
            <a href="#" className="social-link"><span>📱</span></a>
            <a href="#" className="social-link"><span>💻</span></a>
            <a href="#" className="social-link"><span>📧</span></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/health-form">Health Assessment</Link></li>
            <li><Link to="/doctors">Find Doctors</Link></li>
            <li><Link to="/medicine-centers">Medicine Centers</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            <li><Link to="/blood-donation">Blood Donation</Link></li>
            <li><Link to="/upload">Report Analysis</Link></li>
            <li><Link to="/doctor-register">Register as Doctor</Link></li>
            <li><Link to="/medicine-center-register">Register Medical Center</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📍 123 Health Street</p>
          <p>📞 +1 234 567 8900</p>
          <p>📧 contact@healthconnect.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HealthConnect | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
