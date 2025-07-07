import React, { useState, useEffect } from 'react';
import './BloodDonation.css';

function BloodDonation() {
  const [donors, setDonors] = useState([]);
  const [searchForm, setSearchForm] = useState({
    bloodGroup: '',
    city: ''
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    bloodGroup: '',
    contact: '',
    city: '',
    lastDonation: '',
    isAvailable: true
  });
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'register'

  // Mock data - replace with API call
  useEffect(() => {
    const mockDonors = [
      { id: 1, name: 'John Doe', bloodGroup: 'O+', city: 'New York', contact: '+1-555-0123', lastDonation: '2024-01-15', isAvailable: true },
      { id: 2, name: 'Jane Smith', bloodGroup: 'A+', city: 'Los Angeles', contact: '+1-555-0124', lastDonation: '2024-02-20', isAvailable: true },
      { id: 3, name: 'Mike Johnson', bloodGroup: 'B+', city: 'Chicago', contact: '+1-555-0125', lastDonation: '2024-01-30', isAvailable: false },
      { id: 4, name: 'Sarah Wilson', bloodGroup: 'O-', city: 'New York', contact: '+1-555-0126', lastDonation: '2024-03-01', isAvailable: true },
      { id: 5, name: 'David Brown', bloodGroup: 'AB+', city: 'Miami', contact: '+1-555-0127', lastDonation: '2024-02-10', isAvailable: true }
    ];
    setDonors(mockDonors);
  }, []);

  const handleSearchChange = e => setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  const handleRegisterChange = e => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleSearch = e => {
    e.preventDefault();
    // Filter donors based on search criteria
    const filtered = donors.filter(donor => 
      (!searchForm.bloodGroup || donor.bloodGroup === searchForm.bloodGroup) &&
      (!searchForm.city || donor.city.toLowerCase().includes(searchForm.city.toLowerCase()))
    );
    setDonors(filtered);
  };

  const handleRegister = e => {
    e.preventDefault();
    const newDonor = {
      id: donors.length + 1,
      ...registerForm,
      lastDonation: registerForm.lastDonation || 'Never'
    };
    setDonors([...donors, newDonor]);
    setMessage('Thank you for registering as a blood donor! Your information will help save lives.');
    setRegisterForm({
      name: '',
      bloodGroup: '',
      contact: '',
      city: '',
      lastDonation: '',
      isAvailable: true
    });
  };

  const filteredDonors = donors.filter(donor => 
    (!searchForm.bloodGroup || donor.bloodGroup === searchForm.bloodGroup) &&
    (!searchForm.city || donor.city.toLowerCase().includes(searchForm.city.toLowerCase()))
  );

  return (
      <div className="blood-donation-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>🩸 Blood Donation Network</h1>
            <p>Connect with blood donors and save lives. Register as a donor or find donors in your area.</p>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              🔍 Find Donors
            </button>
            <button 
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              ➕ Register as Donor
            </button>
          </div>

          {activeTab === 'search' && (
            <div className="search-section">
              <form onSubmit={handleSearch} className="search-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select name="bloodGroup" value={searchForm.bloodGroup} onChange={handleSearchChange}>
                      <option value="">All Blood Groups</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={searchForm.city}
                      onChange={handleSearchChange}
                      placeholder="Enter city name"
                    />
                  </div>
                </div>
                <button type="submit" className="search-btn">Search Donors</button>
              </form>

              <div className="donors-list">
                <h3>Available Donors ({filteredDonors.length})</h3>
                {filteredDonors.length === 0 ? (
                  <div className="no-results">
                    <p>No donors found matching your criteria.</p>
                    <p>Try adjusting your search or register as a donor to help others!</p>
                  </div>
                ) : (
                  <div className="donors-grid">
                    {filteredDonors.map(donor => (
                      <div key={donor.id} className={`donor-card ${!donor.isAvailable ? 'unavailable' : ''}`}>
                        <div className="donor-header">
                          <h4>{donor.name}</h4>
                          <span className={`blood-group ${donor.bloodGroup}`}>
                            {donor.bloodGroup}
                          </span>
                        </div>
                        <div className="donor-details">
                          <p><strong>📍 City:</strong> {donor.city}</p>
                          <p><strong>📞 Contact:</strong> {donor.contact}</p>
                          <p><strong>🩸 Last Donation:</strong> {donor.lastDonation}</p>
                          <p><strong>Status:</strong> 
                            <span className={`status ${donor.isAvailable ? 'available' : 'unavailable'}`}>
                              {donor.isAvailable ? 'Available' : 'Not Available'}
                            </span>
                          </p>
                        </div>
                        {donor.isAvailable && (
                          <button className="contact-btn">Contact Donor</button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="register-section">
              <form onSubmit={handleRegister} className="register-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Blood Group *</label>
                    <select
                      name="bloodGroup"
                      value={registerForm.bloodGroup}
                      onChange={handleRegisterChange}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Number *</label>
                    <input
                      type="tel"
                      name="contact"
                      value={registerForm.contact}
                      onChange={handleRegisterChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={registerForm.city}
                      onChange={handleRegisterChange}
                      required
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Last Blood Donation Date</label>
                  <input
                    type="date"
                    name="lastDonation"
                    value={registerForm.lastDonation}
                    onChange={handleRegisterChange}
                    placeholder="When did you last donate?"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={registerForm.isAvailable}
                      onChange={(e) => setRegisterForm({...registerForm, isAvailable: e.target.checked})}
                    />
                    I am currently available for blood donation
                  </label>
                </div>

                <button type="submit" className="register-btn">Register as Donor</button>
              </form>

              {message && (
                <div className="message success">
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
  );
}

export default BloodDonation;
