import React, { useState } from 'react';
import SpecialtyDropdown from './SpecialtyDropdown';
import CityAutocomplete from './CityAutocomplete';
import './Register.css';

export default function DoctorRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    city: '',
    qualification: '',
    experience: '',
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
      setMessage('Doctor registered successfully!');
      setIsLoading(false);
      setForm({
        name: '', email: '', phone: '', specialty: '', city: '', qualification: '', experience: '', about: ''
      });
    }, 1200);
  };

  return (
    
      <div className="register-container">
        <div className="register-card doctor-register-card doctor-register-card">
          <div className="register-header">Doctor Registration</div>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Specialty</label>
                <SpecialtyDropdown value={form.specialty} onChange={e => handleChange({ target: { name: 'specialty', value: e.target.value } })} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <CityAutocomplete value={form.city} onChange={e => handleChange({ target: { name: 'city', value: e.target.value } })} />
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <input name="qualification" value={form.qualification} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Years of Experience</label>
                <input name="experience" type="number" min="0" value={form.experience} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{width: '100%'}}>
                <label>About / Bio</label>
                <textarea name="about" value={form.about} onChange={handleChange} rows={3} />
              </div>
            </div>
            <button type="submit" className="register-btn" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register Doctor'}</button>
            {message && <div className="message success">{message}</div>}
          </form>
        </div>
      </div>
    
  );
}
