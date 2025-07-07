import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../utils/authService';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [healthStats, setHealthStats] = useState({
    assessments: 0,
    doctors: 0,
    bloodDonations: 0,
    reports: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      loadDashboardData();
    }
  }, []);

  const loadDashboardData = () => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setHealthStats({
        assessments: 3,
        doctors: 5,
        bloodDonations: 2,
        reports: 8
      });
      
      setRecentActivity([
        {
          id: 1,
          type: 'assessment',
          title: 'Health Assessment Completed',
          description: 'Your latest health assessment shows excellent results',
          date: '2024-01-15',
          icon: '📊'
        },
        {
          id: 2,
          type: 'doctor',
          title: 'Doctor Appointment Booked',
          description: 'Appointment with Dr. Sarah Johnson confirmed',
          date: '2024-01-14',
          icon: '👩‍⚕️'
        },
        {
          id: 3,
          type: 'blood',
          title: 'Blood Donation Scheduled',
          description: 'Your blood donation is scheduled for next week',
          date: '2024-01-13',
          icon: '🩸'
        },
        {
          id: 4,
          type: 'report',
          title: 'Medical Report Uploaded',
          description: 'New medical report has been analyzed',
          date: '2024-01-12',
          icon: '📋'
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  };

  const upgradeToPremium = () => {
    authService.upgradeToPremium();
    setUser(authService.getCurrentUser());
  };

  if (isLoading) {
    return (
      
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your health dashboard...</p>
        </div>
      
    );
  }

  return (
    
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome back, {user?.firstName || 'User'}! 👋</h1>
            <p>Here's your health overview for today</p>
            {!user?.isPremium && (
              <div className="premium-upgrade">
                <div className="premium-content">
                  <h3>🚀 Upgrade to Premium</h3>
                  <p>Get unlimited health assessments, priority doctor bookings, and exclusive features</p>
                  <button onClick={upgradeToPremium} className="upgrade-btn">
                    Upgrade Now - $9.99/month
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="user-avatar">
            <div className="avatar-circle">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            {user?.isPremium && <span className="premium-star">⭐</span>}
          </div>
        </div>

        {/* Health Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{healthStats.assessments}</h3>
              <p>Health Assessments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👩‍⚕️</div>
            <div className="stat-content">
              <h3>{healthStats.doctors}</h3>
              <p>Doctors Connected</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🩸</div>
            <div className="stat-content">
              <h3>{healthStats.bloodDonations}</h3>
              <p>Blood Donations</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3>{healthStats.reports}</h3>
              <p>Medical Reports</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/health-form" className="action-card">
              <div className="action-icon">📝</div>
              <h3>New Assessment</h3>
              <p>Complete a health assessment</p>
            </Link>
            <Link to="/doctor-recommendation" className="action-card">
              <div className="action-icon">🔍</div>
              <h3>Find Doctors</h3>
              <p>Search and book appointments</p>
            </Link>
            <Link to="/blood-donation" className="action-card">
              <div className="action-icon">🩸</div>
              <h3>Blood Donation</h3>
              <p>Schedule blood donation</p>
            </Link>
            <Link to="/upload" className="action-card">
              <div className="action-icon">📤</div>
              <h3>Upload Report</h3>
              <p>Upload medical reports</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <span className="activity-date">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Tips */}
        <div className="health-tips">
          <h2>Today's Health Tip</h2>
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <h3>Stay Hydrated</h3>
              <p>Drinking 8 glasses of water daily helps maintain optimal health, improves skin, and boosts energy levels. Remember to carry a water bottle with you!</p>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Dashboard;
