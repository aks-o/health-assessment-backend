import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpecialtyDropdown from './SpecialtyDropdown';
import CityAutocomplete from './CityAutocomplete';
import './DoctorRecommendation.css';

function DoctorRecommendation() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchForm, setSearchForm] = useState({
    specialty: '',
    city: '',
    treatmentType: '',
    rating: ''
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
  });

  // Mock data - replace with API call
  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        treatmentType: 'Allopathic',
        city: 'New York',
        rating: 4.8,
        experience: '15 years',
        consultationFee: 150,
        availability: ['Monday', 'Wednesday', 'Friday'],
        image: '👩‍⚕️',
        description: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
        languages: ['English', 'Spanish'],
        education: 'MD - Harvard Medical School',
        certifications: ['Board Certified Cardiologist', 'Fellow of American College of Cardiology']
      },
      {
        id: 2,
        name: 'Dr. Rajesh Patel',
        specialty: 'Ayurveda',
        treatmentType: 'Ayurvedic',
        city: 'Los Angeles',
        rating: 4.9,
        experience: '20 years',
        consultationFee: 120,
        availability: ['Tuesday', 'Thursday', 'Saturday'],
        image: '👨‍⚕️',
        description: 'Traditional Ayurvedic practitioner with expertise in holistic healing and wellness.',
        languages: ['English', 'Hindi', 'Gujarati'],
        education: 'BAMS - Gujarat Ayurved University',
        certifications: ['Ayurvedic Physician', 'Panchakarma Specialist']
      },
      {
        id: 3,
        name: 'Dr. Maria Garcia',
        specialty: 'Homeopathy',
        treatmentType: 'Homeopathic',
        city: 'Chicago',
        rating: 4.7,
        experience: '12 years',
        consultationFee: 100,
        availability: ['Monday', 'Tuesday', 'Thursday'],
        image: '👩‍⚕️',
        description: 'Homeopathic doctor specializing in chronic conditions and natural remedies.',
        languages: ['English', 'Spanish'],
        education: 'DHMS - National Center for Homeopathy',
        certifications: ['Licensed Homeopath', 'Member of American Institute of Homeopathy']
      },
      {
        id: 4,
        name: 'Dr. Michael Chen',
        specialty: 'Neurology',
        treatmentType: 'Allopathic',
        city: 'San Francisco',
        rating: 4.9,
        experience: '18 years',
        consultationFee: 200,
        availability: ['Wednesday', 'Friday', 'Saturday'],
        image: '👨‍⚕️',
        description: 'Neurologist with expertise in stroke treatment and neurological disorders.',
        languages: ['English', 'Mandarin'],
        education: 'MD - Stanford University',
        certifications: ['Board Certified Neurologist', 'Stroke Specialist']
      },
      {
        id: 5,
        name: 'Dr. Priya Sharma',
        specialty: 'Dermatology',
        treatmentType: 'Allopathic',
        city: 'Miami',
        rating: 4.6,
        experience: '10 years',
        consultationFee: 180,
        availability: ['Monday', 'Wednesday', 'Friday'],
        image: '👩‍⚕️',
        description: 'Dermatologist specializing in skin conditions and cosmetic procedures.',
        languages: ['English', 'Hindi'],
        education: 'MD - Johns Hopkins University',
        certifications: ['Board Certified Dermatologist', 'Cosmetic Dermatology Specialist']
      }
    ];
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  const handleSearchChange = e => {
    const { name, value } = e.target;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const handleSearch = e => {
    e.preventDefault();
    const filtered = doctors.filter(doctor => {
      const specialtyMatch = !searchForm.specialty || doctor.specialty === searchForm.specialty;
      const cityMatch = !searchForm.city || doctor.city === searchForm.city;
      const treatmentMatch = !searchForm.treatmentType || doctor.treatmentType === searchForm.treatmentType;
      const ratingMatch = !searchForm.rating || doctor.rating >= parseFloat(searchForm.rating);
      return specialtyMatch && cityMatch && treatmentMatch && ratingMatch;
    });
    setFilteredDoctors(filtered);
  };

  const handleReset = () => {
    setSearchForm({ specialty: '', city: '', treatmentType: '', rating: '' });
    setFilteredDoctors(doctors);
  };


  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = e => {
    e.preventDefault();
    // Here you would send the booking to your backend
    alert(`Appointment booked with ${selectedDoctor.name} for ${bookingForm.date} at ${bookingForm.time}`);
    setShowBookingModal(false);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      symptoms: ''
    });
  };

  const handleBookingChange = e => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  return (
      <div className="doctor-recommendation-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>👨‍⚕️ Find the Right Doctor</h1>
            <p>Get personalized doctor recommendations based on your health needs and preferences.</p>
          </div>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label>Specialty</label>
                <SpecialtyDropdown
                  value={searchForm.specialty}
                  onChange={handleSearchChange}
                  required={false}
                  placeholder="Select Specialty"
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <CityAutocomplete
                  value={searchForm.city}
                  onChange={handleSearchChange}
                  name="city"
                  placeholder="Select or type city"
                  required={false}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Treatment Type</label>
                <select name="treatmentType" value={searchForm.treatmentType} onChange={handleSearchChange}>
                  <option value="">-- Choose Treatment Type --</option>
                  <option value="Allopathic">Allopathic</option>
                  <option value="Ayurvedic">Ayurvedic</option>
                  <option value="Homeopathic">Homeopathic</option>
                </select>
              </div>
              <div className="form-group">
                <label>Minimum Rating</label>
                <select name="rating" value={searchForm.rating} onChange={handleSearchChange}>
                  <option value="">-- Minimum Rating --</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>
            </div>
            <button type="submit" className="search-btn">Search Doctors</button>
<button type="button" className="reset-btn" style={{marginLeft: 12}} onClick={handleReset}>Reset</button>
          </form>
        </div>

        <div className="doctors-section">
          <h3>Available Doctors ({filteredDoctors.length})</h3>
          {filteredDoctors.length === 0 ? (
            <div className="no-results">
              <p>No doctors found matching your criteria.</p>
              <p>Try adjusting your search parameters.</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-header">
                    <div className="doctor-image">{doctor.image}</div>
                    <div className="doctor-info">
                      <h4>{doctor.name}</h4>
                      <p className="specialty">{doctor.specialty}</p>
                      <p className="treatment-type">{doctor.treatmentType}</p>
                    </div>
                    <div className="doctor-rating">
                      <span className="rating">⭐ {doctor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="doctor-details">
                    <p><strong>📍 Location:</strong> {doctor.city}</p>
                    <p><strong>💼 Experience:</strong> {doctor.experience}</p>
                    <p><strong>💰 Consultation Fee:</strong> ${doctor.consultationFee}</p>
                    <p><strong>📅 Available:</strong> {doctor.availability.join(', ')}</p>
                    <p className="description">{doctor.description}</p>
                  </div>
                  
                  <div className="doctor-actions">
                    <button 
                      className="book-btn"
                      onClick={() => handleBookAppointment(doctor)}
                    >
                      Book Appointment
                    </button>
                    <button className="view-profile-btn">View Profile</button>
                  </div>
                </div>
              ))}

              {/* Ad Card (Dynamic & Image Example) */}
              <div className="doctor-card ad-card">
                {/* Example Ad Image */}
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16}}>
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Ad Banner" style={{width: '90%', maxWidth: 260, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.10)'}} />
                </div>
                <div className="doctor-header">
                  <div className="doctor-image" style={{background: '#fffbe6', color: '#f59e42', fontSize: '2.5rem'}}>
                    📢
                  </div>
                  <div className="doctor-info">
                    <h4 style={{color: '#f59e42'}}>Grand Opening: City Health Clinic</h4>
                    <p className="specialty" style={{color: '#f59e42'}}>Modern care, expert doctors, 24/7 support!</p>
                  </div>
                </div>
                <div className="doctor-details">
                  <p style={{color: '#f59e42', fontWeight: 600}}>Special discounts for first-time visitors. Book your appointment now!</p>
                  <p style={{fontSize: '0.95rem', color: '#b7791f'}}>Visit us or advertise your service here.</p>
                </div>
                <div className="doctor-actions">
                  <Link to="/advertise" className="book-btn" style={{background: '#f59e42', color: '#fff', textDecoration: 'none', display: 'inline-block'}}>Advertise Now</Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedDoctor && (
          <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Book Appointment with {selectedDoctor.name}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowBookingModal(false)}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Time *</label>
                    <select name="time" value={bookingForm.time} onChange={handleBookingChange} required>
                      <option value="">Select Time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Consultation Fee</label>
                    <input
                      type="text"
                      value={`$${selectedDoctor.consultationFee}`}
                      disabled
                      className="fee-display"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Symptoms/Reason for Visit</label>
                  <textarea
                    name="symptoms"
                    value={bookingForm.symptoms}
                    onChange={handleBookingChange}
                    rows="3"
                    placeholder="Describe your symptoms or reason for consultation"
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowBookingModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="confirm-btn">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
}

export default DoctorRecommendation;