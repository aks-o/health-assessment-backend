import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../utils/authService';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ 
    email: '', 
    password: '',
    rememberMe: false
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    try {
      const result = await authService.login(form.email, form.password);
      
      if (form.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      setMessage(result.message);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login for testing
  const handleDemoLogin = async () => {
    setForm({ email: 'demo@healthconnect.com', password: 'demo123', rememberMe: false });
    setMessage('Demo credentials loaded! Click Sign In to continue.');
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your HealthConnect account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-options">
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          
          <div className="demo-login">
            <button onClick={handleDemoLogin} className="demo-btn">
              🚀 Try Demo Login
            </button>
            <p className="demo-info">
              <strong>Demo Account:</strong><br/>
              Email: demo@healthconnect.com<br/>
              Password: demo123
            </p>
          </div>
          
          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
          </div>
          
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-btn google">
                <span>🔍</span> Google
              </button>
              <button className="social-btn facebook">
                <span>📘</span> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
