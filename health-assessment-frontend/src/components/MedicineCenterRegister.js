import React, { useState } from 'react';
import CityAutocomplete from './CityAutocomplete';
import './Register.css';

export default function MedicineCenterRegister() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    contact: '',
    email: '',
    about: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMessage('Medicine Centre registered successfully!');
      setIsLoading(false);
      setForm({ name: '', address: '', city: '', contact: '', email: '', about: '' });
    }, 1200);
  };

  return (
    <div className="register-container">
      <div className="register-card medicine-center-register-card medicine-center-register-card">
        <div className="register-header">Medicine Centre Registration</div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Centre Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Contact</label>
                <input name="contact" value={form.contact} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>City</label>
                <CityAutocomplete value={form.city} onChange={e => handleChange({ target: { name: 'city', value: e.target.value } })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{width: '100%'}}>
                <label>Address</label>
                <input name="address" value={form.address} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{width: '100%'}}>
                <label>About / Description</label>
                <textarea name="about" value={form.about} onChange={handleChange} rows={3} />
              </div>
            </div>
            <button type="submit" className="register-btn" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register Centre'}</button>
            {message && <div className="message success">{message}</div>}
          </form>
        </div>
      </div>
  );
}
